"use strict";

module.exports = {
  Db: {
    Primary: {
      User: require("./db-primary/user-repository"),
      Kitchen: require("./db-primary/kitchen-repository"),
      Order: require("./db-primary/order-repository"),
      Review: require("./db-primary/review-repository"),
    },
  },
};
