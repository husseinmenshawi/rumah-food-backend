"use strict";

const moment = require("moment");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const constants = require("../constants");

const BaseClass = require("./_base-service");

module.exports = class UserService extends (
  BaseClass
) {
  constructor() {
    super();
    super.ClassBinder.bind(this, UserService);
  }

  async Create({ payload }) {
    if (!this.ValidationUtil.isCreateUserObject(payload)) {
      throw this.ErrorUtil.UserMetadataInvalidError();
    }
    const { email, name, password, phoneNumber, roleId, kitchenName } = payload;
    const bakeryCuisineId = 1;
    const emailExist = await super.UserRepo.FindUserByParams({
      email,
      roleId,
    });
    if (emailExist) {
      throw super.ErrorUtil.UserEmailExistError();
    }
    let kitchenCreated = null;

    if (roleId === 2) {
      const kitchenMetadata = {
        name: kitchenName,
        email,
      };
      kitchenCreated = await super.KitchenRepo.Create({
        payload: kitchenMetadata,
      });
    }

    const kitchenId = kitchenCreated ? kitchenCreated.id : null;

    if (kitchenId) {
      await super.KitchenRepo.CreateKitchenCuisineType({
        payload: {
          kitchenId,
          cuisineTypeId: bakeryCuisineId,
        },
      });
    }

    const userMetadata = {
      name,
      email,
      phoneNumber,
      kitchenId,
      roleId,
    };

    const userCreated = await super.UserRepo.Create({ payload: userMetadata });
    const hashedPassword = await super.CryptoUtil.Bcrypt.hashPassword({
      password,
    });

    const userId = userCreated.id;
    await super.UserRepo.CreateUserCredential({
      payload: { userId, password: hashedPassword },
    });

    return await this.FindUserById({ id: userCreated.id });
  }

  async AuthenticateUser({ email, password, roleId, userAgent }) {
    const credentials = { email, password };
    if (!super.ValidationUtil.isCredentialObject(credentials)) {
      throw super.ErrorUtil.InvalidUserCredentialError();
    }

    const currentUser = await super.UserRepo.FindUserByParams({
      email,
      roleId,
      includeCredentials: true,
    });

    if (!currentUser) {
      throw super.ErrorUtil.UserNotFoundError();
    }

    const passwordIsValid = await super.CryptoUtil.Bcrypt.comparePasword({
      password,
      hashedPassword: currentUser.UserCredential.password,
    });

    if (!passwordIsValid) {
      throw super.ErrorUtil.PasswordInvalidError();
    }

    const {
      defaultJwtTokenSecret: secret,
      defaultTokenTtl: ttl,
    } = super.SystemConfig.authentication;
    const { id: userId } = currentUser;
    const accessTokenMetadata = this._generateAccessTokenMetadataForUser({
      secret,
      ttl,
      userId,
      email,
    });

    if (super.ValidationUtil.isString(userAgent)) {
      accessTokenMetadata.userAgent = userAgent;
    }

    const dbEntry = await super.UserRepo.CreateUserToken({
      input: accessTokenMetadata,
    });
    const { id: accessToken, expirationDate, refreshToken } = dbEntry;

    return {
      accessToken,
      expirationDate,
      refreshToken,
      kitchenId: currentUser.Kitchen ? currentUser.Kitchen.id : null,
      userId: currentUser.id
    };
  }

  _generateAccessTokenMetadataForUser({ email, userId, secret, ttl }) {
    const currentMoment = moment();
    const expirationMoment = currentMoment.clone().add(ttl, "seconds");
    const expirationDate = expirationMoment.toISOString();

    const token = jwt.sign({ email, userId, expirationDate }, secret, {
      expiresIn: ttl,
    });
    const refreshToken = uuid.v4();

    return {
      id: token,
      expirationDate,
      ttl,
      refreshToken,
      userId,
    };
  }

  async FindUserById({ id }) {
    if (!super.ValidationUtil.isInteger(id)) {
      throw super.ErrorUtil.UserIdInvalidError();
    }

    return new this.Repositories.Db.Primary.User().FindUserById({
      id,
    });
  }

  async GetOneById({ id, currentUser }) {
    if (!super.ValidationUtil.isInteger(id)) {
      throw super.ErrorUtil.UserIdInvalidError();
    }

    const user = await new this.Repositories.Db.Primary.User().FindUserById({
      id,
      includeRoles: true,
    });
    if (!user) {
      throw super.ErrorUtil.UserNotFoundError();
    }

    const currentUserProfile = await this.FindUserById({
      id: currentUser.userId,
    });
    const currentUserRoleIds = currentUserProfile.Roles.map((x) => x.id);

    const userRoleIds = user.Roles.map((x) => x.id);
    const isCurrentUserSuperUser = currentUserRoleIds.includes(
      constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id
    );
    if (
      (!isCurrentUserSuperUser && currentUserProfile.storeId != user.storeId) ||
      (!isCurrentUserSuperUser &&
        userRoleIds.includes(constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id))
    ) {
      throw super.ErrorUtil.UnauthorizedError();
    }
    return user;
  }

  async LogoutUserByBearerToken({ bearerToken }) {
    if (!super.ValidationUtil.isString(bearerToken)) {
      throw super.ErrorUtil.TokenInvalidError();
    }

    const currentEntry = await super.UserRepo.FindAccessToken({
      accessToken: bearerToken,
    });

    if (!currentEntry || !currentEntry.isEnabled) {
      throw super.ErrorUtil.TokenInvalidError();
    }

    await super.UserRepo.UpdateUserTokenEnabledStatus({
      accessToken: bearerToken,
      isEnabled: false,
    });
  }

  async RefreshToken({
    bearerToken,
    refreshToken,
    userId,
    userAgent,
    username,
  }) {
    if (
      !super.ValidationUtil.isRefreshTokenObject({
        bearerToken,
        refreshToken,
        userId,
        userAgent,
        username,
      })
    ) {
      throw super.ErrorUtil.RefreshTokenInvalidError();
    }

    const currentUserTokenMetadata = await super.UserRepo.FindAccessToken({
      accessToken: bearerToken,
    });

    if (!currentUserTokenMetadata) {
      throw super.ErrorUtil.RefreshTokenInvalidError();
    }

    const {
      refreshToken: dbRowRefreshToken,
      userId: dbRowUserId,
    } = currentUserTokenMetadata;

    if (refreshToken !== dbRowRefreshToken || userId !== dbRowUserId) {
      throw super.ErrorUtil.RefreshTokenInvalidError();
    }

    const {
      defaultJwtTokenSecret: secret,
      defaultTokenTtl: ttl,
    } = super.SystemConfig.authentication;
    const accessTokenMetadata = this._generateAccessTokenMetadataForUser({
      secret,
      ttl,
      userId,
      username,
    });

    if (super.ValidationUtil.isString(userAgent)) {
      accessTokenMetadata.userAgent = userAgent;
    }

    const dbEntry = await super.UserRepo.CreateUserToken({
      input: accessTokenMetadata,
    });
    const {
      id: accessToken,
      expirationDate,
      refreshToken: newRefreshToken,
    } = dbEntry;

    return {
      accessToken,
      expirationDate,
      refreshToken: newRefreshToken,
    };
  }

  async UpdateMyUserDetails({ payload, currentUser }) {
    if (Object.keys(payload).length === 0) {
      throw super.ErrorUtil.EmptyPayloadError();
    }

    const id = currentUser.userId;
    const {
      name,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      addressLine3,
    } = payload;

    if (!this.ValidationUtil.isUpdateUserObject(payload)) {
      throw this.ErrorUtil.UserMetadataInvalidError();
    }

    if (email) {
      const emailExist = await super.UserRepo.FindUserByParams({
        email,
        not_id: id,
      });
      if (emailExist) {
        throw super.ErrorUtil.UserEmailExistError();
      }
    }

    const userMetadata = {
      name,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      addressLine3,
    };

    if (Object.keys(userMetadata).length !== 0) {
      await super.UserRepo.UpdateUserById({ payload: userMetadata, id });
    }
  }

  async UpdateUserDetailsById({ payload, id, currentUser }) {
    if (Object.keys(payload).length === 0) {
      throw super.ErrorUtil.EmptyPayloadError();
    }

    if (!this.ValidationUtil.isUpdateUserObject(payload)) {
      throw this.ErrorUtil.UserMetadataInvalidError();
    }

    const adminId = currentUser.userId;
    const adminDetails = await this.FindUserById({ id: adminId });
    const adminRoleIds = adminDetails.Roles.map((x) => x.id);

    const existingUser = await this.FindUserById({ id });

    if (!existingUser) {
      throw super.ErrorUtil.UserNotFoundError();
    }

    if (
      !adminRoleIds.includes(constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id) &&
      adminDetails.storeId != existingUser.storeId
    ) {
      throw super.ErrorUtil.UnauthorizedError();
    }

    const {
      password,
      roles,
      email,
      firstName,
      lastName,
      enabled,
      storeId,
    } = payload;

    if (email) {
      const emailExist = await super.UserRepo.FindUserByParams({
        email,
        not_id: id,
      });
      if (emailExist) {
        throw super.ErrorUtil.UserEmailExistError();
      }
    }

    if (roles) {
      if (
        !adminRoleIds.includes(constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id)
      ) {
        throw super.ErrorUtil.UnauthorizedError();
      }
      await super.UserRepo.DeleteUserRolesByUserId({ userId: id });
      await Promise.all(
        roles.map(async (roleId) => {
          await super.UserRepo.CreateUserRole({
            payload: {
              userId: id,
              roleId,
            },
          });
        })
      );
    }

    if (password) {
      const hashedPassword = await super.CryptoUtil.Bcrypt.hashPassword({
        password,
      });
      await super.UserRepo.UpdateUserCredentialByUserId({
        payload: { password: hashedPassword },
        userId: id,
      });
    }

    const userMetadata = {
      email,
      firstName,
      lastName,
      enabled,
    };

    if (email) {
      userMetadata.username = email;
    }

    if (
      adminRoleIds.includes(constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id) &&
      storeId
    ) {
      userMetadata.storeId = storeId;
    }

    if (Object.keys(userMetadata).length !== 0) {
      await super.UserRepo.UpdateUserById({ payload: userMetadata, id });
    }
  }

  async FindUsers({ params, currentUser }) {
    let { keyword, pageNumber, pageSize, showInactive, storeId } = params;
    let superUserIdToExclude;

    if (keyword == "") {
      delete params.keyword;
    }

    if (storeId == "") {
      delete params.storeId;
    }

    if (!this.ValidationUtil.isFindUsersObject(params)) {
      throw this.ErrorUtil.FindUsersPayloadInvalidError();
    }

    const userId = currentUser.userId;
    const userDetails = await this.FindUserById({ id: userId });
    const RoleIds = userDetails.Roles.map((x) => x.id);

    if (!RoleIds.includes(constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id)) {
      storeId = userDetails.storeId;
      superUserIdToExclude = 1;
    }

    let showInactiveBoolean = false;
    if (showInactive.toUpperCase() === "TRUE") {
      showInactiveBoolean = true;
    }

    const record = await super.UserRepo.FindUsersByParams({
      keyword,
      pageNumber: Number(pageNumber),
      pageSize: Number(pageSize),
      storeId,
      superUserIdToExclude,
      currentUserId: userId,
      showInactive: showInactiveBoolean,
    });

    const count = await super.UserRepo.FindUsersByParamsCount({
      keyword,
      storeId,
      superUserIdToExclude,
      currentUserId: userId,
      showInactive: showInactiveBoolean,
    });

    return { record, count };
  }
};
