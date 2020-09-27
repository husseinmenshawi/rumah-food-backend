"use strict";

const BaseClass = require("../_base-db-repository");
const { Op } = require("sequelize");

module.exports = class DbPrimaryUserRepository extends BaseClass {
  get MainTableName() {
    return "Users";
  }

  get UserCredentialsTableName() {
    return "UserCredentials";
  }

  get AccessTokenTableName() {
    return "UserTokens";
  }

  get RolesMasterDataTableName() {
    return "Roles";
  }

  get UserRolesTableName() {
    return "UserRoles";
  }

  async Create({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels[this.MainTableName].create(
      payload
    );
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async CreateUserCredential({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels[
      this.UserCredentialsTableName
    ].create(payload);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async CreateUserRole({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels[
      this.UserRolesTableName
    ].create(payload);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindUserByParams({
    email,
    roleId,
    not_id,
    includeCredentials = false,
    returnAsJson = true,
  }) {
    const options = {
      where: {},
      include: [
        {
          model: super.PrimaryDbModels.Kitchens,
        },
      ],
    };

    if (email) {
      options.where.email = email;
    }
    if (roleId) {
      options.where.roleId = roleId;
    }

    if (not_id) {
      options.where.id = { [Op.ne]: not_id };
    }

    if (includeCredentials) {
      options.include.push({
        model: super.PrimaryDbModels[this.UserCredentialsTableName],
      });
    }

    const dbResult = await super.PrimaryDbModels[this.MainTableName].findOne(
      options
    );
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindUsersByParams({
    keyword,
    pageSize = 50,
    pageNumber = 0,
    storeId,
    showInactive = false,
    superUserIdToExclude,
    returnAsJson = true,
    currentUserId,
  }) {
    const options = {
      where: {
        [Op.and]: [
          {
            id: {
              [Op.ne]: currentUserId,
            },
          },
        ],
      },
      include: [
        {
          model: super.PrimaryDbModels[this.RolesMasterDataTableName],
          where: {},
        },
        {
          model: super.PrimaryDbModels.Stores,
        },
      ],
      offset: pageNumber * pageSize,
      limit: pageSize,
      order: [["id", "DESC"]],
    };

    if (keyword) {
      options.where[Op.and].push({
        [Op.or]: {
          firstName: { [Op.like]: `%${keyword}%` },
          lastName: {
            [Op.like]: `%${keyword}%`,
          },
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      });
    }

    if (storeId) {
      options.where.storeId = storeId;
    }

    if (showInactive === false) {
      options.where[Op.and].push({
        enabled: true,
      });
    }

    if (superUserIdToExclude) {
      options.include[0].where.id = {
        [Op.ne]: superUserIdToExclude,
      };
    }

    const dbResult = await super.PrimaryDbModels[this.MainTableName].findAll(
      options
    );
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindUsersByParamsCount({
    keyword,
    storeId,
    currentUserId,
    showInactive = false,
    superUserIdToExclude,
  }) {
    const options = {
      where: {
        [Op.and]: [
          {
            id: {
              [Op.ne]: currentUserId,
            },
          },
        ],
      },
      include: [
        {
          model: super.PrimaryDbModels[this.RolesMasterDataTableName],
          where: {},
        },
      ],
    };

    if (keyword) {
      options.where[Op.and].push({
        [Op.or]: {
          firstName: { [Op.like]: `%${keyword}%` },
          lastName: {
            [Op.like]: `%${keyword}%`,
          },
          email: {
            [Op.like]: `%${keyword}%`,
          },
        },
      });
    }

    if (showInactive === false) {
      options.where[Op.and].push({
        enabled: true,
      });
    }

    if (storeId) {
      options.where.storeId = storeId;
    }

    if (superUserIdToExclude) {
      options.include[0].where.id = {
        [Op.ne]: superUserIdToExclude,
      };
    }

    return await super.PrimaryDbModels[this.MainTableName].count(options);
  }

  async CreateUserToken({ input, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels[
      this.AccessTokenTableName
    ].create(input);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindAccessToken({ accessToken, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels[
      this.AccessTokenTableName
    ].findByPk(accessToken);

    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindUserById({ id, includeCredentials = false, returnAsJson = true }) {
    const options = {
      include: [
        {
          model: super.PrimaryDbModels.Kitchens,
        },
      ],
    };

    if (includeCredentials) {
      options.include.push({
        model: super.PrimaryDbModels[this.UserCredentialsTableName],
      });
    }

    const dbResult = await super.PrimaryDbModels[this.MainTableName].findByPk(
      id,
      {
        ...options,
      }
    );

    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async UpdateUserTokenEnabledStatus({ accessToken, isEnabled = false }) {
    const queryOptions = {
      where: {
        id: accessToken,
        isEnabled: !isEnabled,
      },
    };

    return await this.UpdateUserTokens({
      updatedValues: { isEnabled },
      queryOptions,
    });
  }

  async UpdateUserTokens({ updatedValues, queryOptions }) {
    await this.PrimaryDbModels[this.AccessTokenTableName].update(
      updatedValues,
      queryOptions
    );
  }

  async UpdateUserById({ payload, id }) {
    const query = {
      where: {
        id,
      },
    };

    await super.PrimaryDbModels[this.MainTableName].update(payload, query);
  }

  async UpdateUserCredentialByUserId({ payload, userId }) {
    const query = {
      where: {
        userId,
      },
    };
    await super.PrimaryDbModels[this.UserCredentialsTableName].update(
      payload,
      query
    );
  }

  async DeleteUserRolesByUserId({ userId }) {
    const query = {
      where: {
        userId,
      },
    };
    await super.PrimaryDbModels[this.UserRolesTableName].destroy(query);
  }
};
