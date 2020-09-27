"use strict";

const Constants = require("../constants");
const { Error, Validation } = require("../utilities");
const Services = require("../services");
const Logger = require("../logger");

async function authorizeRoleHandler(authorizedRoleIds = [], request) {
  const defaultRouteLogMetadata = {
    authorizedRoleIds,
    path: request.originalUrl,
  };
  if (!Validation.isNumberArray(authorizedRoleIds)) {
    Logger.error(
      defaultRouteLogMetadata,
      "Middleware is not properly configured, please ensure that the `authorizedRoleIds` parameter is populated with integers"
    );
    throw Error.DefaultAuthorizationError();
  }

  if (!Validation.isUserObject(request)) {
    Logger.error(
      { ...defaultRouteLogMetadata, request },
      "Http request does not contain appropriate credential headers to derive user metadata"
    );
    throw Error.InvalidUserCredentialError();
  }

  const userService = new Services.User();

  const userProfile = await userService.FindUserById({
    id: request.user.userId,
  });

  if (!userProfile) {
    Logger.error(
      { ...defaultRouteLogMetadata, requestUserMedata: request.user },
      `User ${request.user.userId} not found`
    );
    throw Error.InvalidUserCredentialError();
  }

  const roleId = userProfile.roleId;
  if (roleId === Constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id) {
    Logger.info(
      { ...defaultRouteLogMetadata, userProfile },
      `User ${request.user.userId} is a super user, aborting role checks and passing user through.`
    );
    return;
  }

  let roleFound = false;
  const authorizedRoleId = authorizedRoleIds.find((x) => x === roleId);

  if (authorizedRoleId) {
    roleFound = true;
  }

  if (!roleFound) {
    Logger.error(
      { ...defaultRouteLogMetadata, userProfile },
      "User does not have appropriate authorization for route"
    );
    throw Error.UnauthorizedError();
  }
}

module.exports = {
  authorizeRole: (authorizedRoleIds = []) => (req, res, next) => {
    Logger.info("Checking user authorization");

    authorizeRoleHandler(authorizedRoleIds, req)
      .then(() => next())
      .catch((error) => next(error));
  },
};
