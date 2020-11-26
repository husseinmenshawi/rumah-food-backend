"use strict";

module.exports = {
  API: {
    VERSIONS: {
      "V1.0": {
        BASE_PATH: "/api/v1.0",
      },
    },
  },
  USER_ROLES: require("./user-roles"),
  CUISINE_TYPES: require("./cuisine-types"),
  FLAVOURS: require("./flavours"),
  ORDER_STATUSES: require("./order-statuses"),
};
