"use strict";

module.exports = {
  Db: {
    Primary: {
      User: require("./db-primary/user-repository"),
      Kitchen: require("./db-primary/kitchen-repository"),
      Order: require("./db-primary/order-repository"),
      // Roles: require('./db-primary/roles-repository'),
      // Country: require('./db-primary/country-repository'),
      // OrderTypes: require('./db-primary/order-types-repository'),
      // Reservation: require('./db-primary/reservation-repository'),
    },
  },
};
