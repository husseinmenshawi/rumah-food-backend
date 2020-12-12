"use strict";

const BaseClass = require("../_base-db-repository");
const { Op } = require("sequelize");

module.exports = class DbPrimaryKitchenRepository extends (
  BaseClass
) {
  async FindAll({ returnAsJson = true }) {
    const dbResult = await super.PrimaryDbModels.Kitchens.findAll({});
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }
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
    includeFlavours = true,
    returnAsJson = true,
  }) {
    const options = {
      attributes: { exclude: ["kitchenId"] },
      where: {
        [Op.and]: [{ isEnabled: true }],
      },
      include: [],
      offset: pageNumber * pageSize,
      limit: pageSize,
      order: [["created_at", "DESC"]],
    };

    if (includeFlavours) {
      options.include.push({
        model: super.PrimaryDbModels.Flavours,
      });
    }

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

  async DeleteItemFlavoursByItemId({ id }) {
    const query = {
      where: { kitchen_item_id: id },
    };

    return await super.PrimaryDbModels.KitchenItemFlavours.destroy(query);
  }

  async FindFlavours() {
    return await super.PrimaryDbModels.Flavours.findAll({});
  }

  async CreateCapacity({ payload }) {
    return await super.PrimaryDbModels.KitchenItemCapacities.create(payload);
  }

  async FindCapacities({
    // pageNumber = 0,
    // pageSize = 10,
    kitchenId,
    includeItem = true,
    returnAsJson = true,
  }) {
    const options = {
      where: {
        [Op.and]: [],
      },
      include: [],
      // offset: pageNumber * pageSize,
      // limit: pageSize,
      order: [["created_at", "DESC"]],
    };

    if (kitchenId) {
      options.where[Op.and].push({ kitchenId });
    }
    if (includeItem) {
      options.include.push({
        model: super.PrimaryDbModels.KitchenItems,
      });
    }

    const dbResult = await super.PrimaryDbModels.KitchenItemCapacities.findAll(
      options
    );
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindAvailableCapacities({ kitchenItemId, returnAsJson = true }) {
    const options = {
      where: {
        [Op.and]: [{ orderDateTime: null }, { userId: null }],
      },
      order: [["date", "ASC"]],
    };
    if (kitchenItemId) {
      options.where[Op.and].push({ kitchenItemId });
    }

    const dbResult = await super.PrimaryDbModels.KitchenItemCapacities.findAll(
      options
    );
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async reserveCapacity({ updatePayload, availableCapacityIds }) {
    const query = {
      where: {
        id: {
          [Op.in]: availableCapacityIds,
        },
      },
    };

    return await super.PrimaryDbModels.KitchenItemCapacities.update(
      updatePayload,
      query
    );
  }

  async FindAvailableFlavoursByKitchenItemId({
    kitchenItemId,
    returnAsJson = true,
  }) {
    const options = {
      where: {
        kitchenItemId,
      },
    };

    const dbResult = await super.PrimaryDbModels.KitchenItemFlavours.findAll(
      options
    );
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }

  async FindItemsCountByKitchenId({ id }) {
    const options = {
      where: {
        kitchenId: id,
      },
    };
    return super.PrimaryDbModels.KitchenItems.count(options);
  }

  async FindItemFlavours({ kitchenItemId, returnAsJson }) {
    const options = {
      where: {
        kitchenItemId,
      },
      include: [
        {
          model: super.PrimaryDbModels.Flavours,
        },
      ],
    };
    const dbResult = await super.PrimaryDbModels.KitchenItemFlavours.findAll(
      options
    );
    return super.handleArrayObjectReturn({ dbResult, returnAsJson });
  }
};
