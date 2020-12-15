"use strict";

const BaseClass = require("../_base-db-repository");
const { Op } = require("sequelize");

module.exports = class DbPrimaryReviewRepository extends (
  BaseClass
) {
  async Create({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.Reviews.create(payload);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindAll({ params, returnAsJson = true }) {
    const { orderId, kitchenItemId, kitchenId } = params;
    const options = {
      where: { [Op.and]: [] },
    };

    if (orderId) {
      options.where[Op.and].push({ orderId });
    }

    if (kitchenId) {
      options.where[Op.and].push({ kitchenId });
    }

    if (kitchenItemId) {
      options.where[Op.and].push({ kitchenItemId });
    }

    const dbResult = await super.PrimaryDbModels.Reviews.findAll(options);
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindOneByOrderId({ orderId, returnAsJson = true }) {
    const options = {
      where: { orderId },
    };

    const dbResult = await super.PrimaryDbModels.Reviews.findOne(options);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }
};
