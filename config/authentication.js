"use strict";

const { EnvVariable } = require("../utilities");

module.exports = {
  defaultTokenTtl: EnvVariable.getEnvVariableAsInteger({
    defaultValue: 28800,
    fieldName: "DEFAULT_TOKEN_TTL",
  }),
  defaultJwtTokenSecret: EnvVariable.getEnvVariableAsString({
    defaultValue: "rumah-food-secret",
    fieldName: "DEFAULT_JWT_TOKEN_SECRET",
  }),
};
