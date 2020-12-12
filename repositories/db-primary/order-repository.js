"use strict";

const BaseClass = require("../_base-db-repository");
const { Op } = require("sequelize");

module.exports = class DbPrimaryOrderRepository extends (
  BaseClass
) {
  async Create({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.Orders.create(payload);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindOrdersByKitchenId({
    kitchenId,
    orderStatusId,
    returnAsJson = true,
  }) {
    const options = {
      where: {},
      include: [
        {
          model: super.PrimaryDbModels.KitchenItems,
          where: { kitchenId },
        },
        {
          model: super.PrimaryDbModels.Users,
        },
        {
          model: super.PrimaryDbModels.OrderStatuses,
        },
      ],
      order: [["created_at", "DESC"]],
    };
    if (orderStatusId) {
      options.where.orderStatusId = orderStatusId;
    }
    const dbResult = await super.PrimaryDbModels.Orders.findAll(options);
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindOrdersByUserId({ id, orderStatusId, returnAsJson = true }) {
    const options = {
      where: {
        userId: id,
      },
      include: [
        {
          model: super.PrimaryDbModels.KitchenItems,
          // where: { kitchenId },
        },
        {
          model: super.PrimaryDbModels.Users,
        },
        {
          model: super.PrimaryDbModels.OrderStatuses,
        },
      ],
      order: [["created_at", "DESC"]],
    };
    if (orderStatusId) {
      options.where.orderStatusId = orderStatusId;
    }
    const dbResult = await super.PrimaryDbModels.Orders.findAll(options);
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindOrderById({ id, returnAsJson = true }) {
    const options = {
      where: { id },
      include: [
        {
          model: super.PrimaryDbModels.KitchenItems,
        },
        {
          model: super.PrimaryDbModels.Users,
        },
        {
          model: super.PrimaryDbModels.OrderStatuses,
        },
        {
          model: super.PrimaryDbModels.Flavours,
        },
      ],
      order: [["created_at", "DESC"]],
    };
    const dbResult = await super.PrimaryDbModels.Orders.findOne(options);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async DeliverOrder({ id, updatePayload }) {
    const query = {
      where: {
        id,
      },
    };
    await super.PrimaryDbModels.Orders.update(updatePayload, query);
  }

  async ConfirmOrder({ id, updatePayload }) {
    const query = {
      where: {
        id,
      },
    };
    await super.PrimaryDbModels.Orders.update(updatePayload, query);
  }
};
