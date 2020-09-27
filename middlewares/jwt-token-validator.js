"use strict";

const { Error, Http } = require("../utilities");
const Repositories = require("../repositories");

async function validateToken(accessToken, introspectedToken) {
  const { userId } = introspectedToken;

  const tokenMetadata = await new Repositories.Db.Primary.User().FindAccessToken(
    { accessToken }
  );

  if (
    !tokenMetadata ||
    !tokenMetadata.isEnabled ||
    tokenMetadata.userId !== userId
  ) {
    throw Error.TokenInvalidError();
  }
}

module.exports = {
  validate: (req, res, next) => {
    const accessTokenMetadata = Http.getAuthorizationHeader({ request: req });
    const { bearerToken } = accessTokenMetadata;

    validateToken(bearerToken, req.user)
      .then(() => {
        req.bearerToken = bearerToken;
        next();
      })
      .catch((error) => next(error));
  },
};
