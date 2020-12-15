"use strict";

const config = require("../config");
const utils = require("../utilities");
const repositories = require("../repositories");

module.exports = class BaseService {
  get SystemConfig() {
    return config;
  }

  get ClassBinder() {
    return utils.ClassBinder;
  }

  get ErrorUtil() {
    return utils.Error;
  }

  get CryptoUtil() {
    return {
      Bcrypt: utils.Bcrypt,
    };
  }

  get ValidationUtil() {
    return utils.Validation;
  }

  get Repositories() {
    return repositories;
  }

  get UserRepo() {
    return new this.Repositories.Db.Primary.User();
  }

  get KitchenRepo() {
    return new this.Repositories.Db.Primary.Kitchen();
  }

  get OrderRepo() {
    return new this.Repositories.Db.Primary.Order();
  }

  get ReviewRepo() {
    return new this.Repositories.Db.Primary.Review();
  }
};
