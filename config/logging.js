"use strict";

const { EnvVariable } = require("../utilities");

module.exports = {
  level: (() => {
    const envVar = EnvVariable.getEnvVariableSync("LOG_LEVEL");

    if (envVar) {
      return envVar;
    }

    return "debug";
  })(),
};
