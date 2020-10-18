"use strict";

const BaseClass = require("../_base-db-repository");
const { Op } = require("sequelize");

module.exports = class DbPrimaryUserRepository extends BaseClass {
  async Create({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.Kitchens.create(payload);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async CreateKitchenCuisineType({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.KitchenCuisineTypes.create(
      payload
    );
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async CreateKitchenItemFlavour({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.KitchenItemFlavours.create(
      payload
    );
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindKitchenById({ id, returnAsJson = true }) {
    const options = {
      where: {
        id,
      },
    };
    const dbResult = await super.PrimaryDbModels.Kitchens.findOne(options);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async CreateItem({ payload, returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.KitchenItems.create(payload);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async FindItems({
    keyword,
    pageNumber = 0,
    pageSize = 10,
    kitchenId,
    returnAsJson = true,
  }) {
    const options = {
      where: {
        [Op.and]: [],
      },
      include: [],
      offset: pageNumber * pageSize,
      limit: pageSize,
      order: [["created_at", "DESC"]],
    };

    if (keyword) {
      options.where[Op.and].push({
        itemName: { [Op.like]: `%${keyword}%` },
      });
    }

    if (kitchenId) {
      options.where[Op.and].push({ kitchenId });
    }

    const dbResult = await super.PrimaryDbModels.KitchenItems.findAll(options);
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindItemById({ id, returnAsJson = true, includeFlavours = true }) {
    const query = {
      where: { id },
      include: [],
    };
    if (includeFlavours) {
      query.include.push({
        model: super.PrimaryDbModels.Flavours,
      });
    }
    const dbResult = await super.PrimaryDbModels.KitchenItems.findOne(query);
    return super.handleSingObjectReturn({ dbResult, returnAsJson });
  }

  async DeleteItemById({ id }) {
    const query = {
      where: { id },
    };

    return await super.PrimaryDbModels.KitchenItems.destroy(query);
  }

  async UpdateItemById({ payload, id }) {
    const query = {
      where: { id },
    };

    return await super.PrimaryDbModels.KitchenItems.update(payload, query);
  }
};
