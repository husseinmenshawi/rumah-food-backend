"use strict";
const moment = require("moment");

const BaseClass = require("./_base-service");

const maxSize = 5000000;
module.exports = class KitchenService extends (
  BaseClass
) {
  constructor() {
    super();
    super.ClassBinder.bind(this, KitchenService);
  }

  async FindAll({}) {
    const kitchens = await super.KitchenRepo.FindAll({});

    for (let i = 0; i < kitchens.length; i++) {
      const kitchen = kitchens[i];
      if (kitchen.Reviews.length == 0) {
        kitchen.reviewAverage = 0;
        kitchen.reviewsLength = 0;
      } else {
        let total = 0;
        const reviewsLength = kitchen.Reviews.length;
        kitchen.Reviews.map((x) => {
          total = total + x.stars;
        });
        const average = Number((total / reviewsLength).toFixed(2));
        kitchen.reviewAverage = average;
        kitchen.reviewsLength = reviewsLength;
      }
    }
    // TODO: double check this with more load
    await Promise.all(
      kitchens.map(async (x) => {
        const itemsCount = await super.KitchenRepo.FindItemsCountByKitchenId({
          id: x.id,
        });
        const index = kitchens.indexOf(x);
        kitchens[index].itemsCount = itemsCount;
      })
    );

    return kitchens;
  }

  async FindOneById({ id }) {
    if (!this.ValidationUtil.isInteger(id)) {
      throw super.ErrorUtil.ItemIdInvalidError();
    }

    return await super.KitchenRepo.FindKitchenById({
      id,
    });
  }

  async CreateItem({ payload }) {
    const { fileMimeType } = payload;

    if (!this.ValidationUtil.isCreateItemObject(payload)) {
      console.log("Item metadata invalid");
      throw super.ErrorUtil.ItemMetadataInvalidError();
    }
    if (fileMimeType != "png" && fileMimeType != "jpg") {
      throw super.ErrorUtil.InvalidFileType();
    }

    // if (file && file.size > maxSize) {
    //   throw super.ErrorUtil.InvalidFileSize();
    // }
    const { kitchenId } = payload;
    const { flavours } = payload;
    const kitchenExist = await super.KitchenRepo.FindKitchenById({
      id: kitchenId,
    });

    if (!kitchenExist) {
      throw super.ErrorUtil.KitchenDoesNotExistError();
    }

    const kitchenItem = await super.KitchenRepo.CreateItem({ payload });
    const kitchenItemId = kitchenItem.id;

    await Promise.all(
      flavours.map((flavourId) =>
        super.KitchenRepo.CreateKitchenItemFlavour({
          payload: {
            flavourId,
            kitchenItemId,
          },
        })
      )
    );

    return kitchenItem;
  }

  async FindItems({ params }) {
    if (!this.ValidationUtil.isFindItemsObject(params)) {
      throw super.ErrorUtil.FindItemsParamsInvalidError();
    }

    const {
      keyword,
      pageNumber,
      pageSize,
      kitchenId,
      excludeInactiveItems,
    } = params;
    const kitchenExist = await super.KitchenRepo.FindKitchenById({
      id: kitchenId,
    });
    if (!kitchenExist) {
      throw super.ErrorUtil.KitchenDoesNotExistError();
    }

    const kitchenItems = await super.KitchenRepo.FindItems({
      keyword,
      pageNumber,
      pageSize,
      kitchenId,
      excludeInactiveItems,
    });

    for (let i = 0; i < kitchenItems.length; i++) {
      const kitchenItem = kitchenItems[i];
      if (kitchenItem.Reviews.length == 0) {
        kitchenItem.reviewAverage = 0;
        kitchenItem.reviewsLength = 0;
      } else {
        let total = 0;
        const reviewsLength = kitchenItem.Reviews.length;
        kitchenItem.Reviews.map((x) => {
          total = total + x.stars;
        });
        const average = Number((total / reviewsLength).toFixed(2));
        kitchenItem.reviewAverage = average;
        kitchenItem.reviewsLength = reviewsLength;
      }
    }

    return kitchenItems;
  }

  async FindItemById({ id }) {
    if (!this.ValidationUtil.isUUID(id)) {
      throw super.ErrorUtil.ItemIdInvalidError();
    }

    return await super.KitchenRepo.FindItemById({
      id,
    });
  }

  async DeleteItem({ id }) {
    if (!this.ValidationUtil.isUUID(id)) {
      throw super.ErrorUtil.ItemIdInvalidError();
    }

    const itemExist = await this.FindItemById({
      id,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }
    const capacities = await super.KitchenRepo.FindCapacities({
      kitchenId: itemExist.kitchenId,
    });
    if (capacities.length > 0) {
      throw super.ErrorUtil.UnableToDeletItemDueToCapacities();
    }
    await super.KitchenRepo.DeleteItemFlavoursByItemId({ id });
    await super.KitchenRepo.DeleteItemById({ id });
    return;
  }

  async UpdateItem({ payload, id }) {
    if (!this.ValidationUtil.isUUID(id)) {
      throw super.ErrorUtil.ItemIdInvalidError();
    }
    if (Object.keys(payload).length === 0) {
      throw super.ErrorUtil.EmptyPayloadError();
    }

    if (!this.ValidationUtil.isUpdateItemObject(payload)) {
      throw super.ErrorUtil.ItemMetadataInvalidError();
    }
    const { flavours } = payload;
    delete payload.flavours;
    const itemExist = await this.FindItemById({
      id,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }
    await super.KitchenRepo.DeleteItemFlavoursByItemId({ id });
    await Promise.all(
      flavours.map((flavourId) =>
        super.KitchenRepo.CreateKitchenItemFlavour({
          payload: {
            flavourId,
            kitchenItemId: id,
          },
        })
      )
    );
    await super.KitchenRepo.UpdateItemById({ payload, id });
  }

  async FindFlavours() {
    return await super.KitchenRepo.FindFlavours();
  }

  async CreateCapacity({ payload }) {
    if (!this.ValidationUtil.isCreateCapacityObject(payload)) {
      throw super.ErrorUtil.CapacityMetadataInvalidError();
    }

    const { kitchenId, kitchenItemId, amount } = payload;
    delete payload.amount;

    const kitchenExist = await super.KitchenRepo.FindKitchenById({
      id: kitchenId,
    });
    if (!kitchenExist) {
      throw super.ErrorUtil.KitchenDoesNotExistError();
    }
    const itemExist = await this.FindItemById({
      id: kitchenItemId,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }
    let promises = [];
    for (let i = 0; i < amount; i++) {
      promises.push(super.KitchenRepo.CreateCapacity({ payload }));
    }
    // await super.KitchenRepo.CreateCapacity({payload});
    await Promise.all(promises);
  }

  async FindCapacities({ params }) {
    if (!this.ValidationUtil.isFindCapacitiesObject(params)) {
      throw super.ErrorUtil.FindCapacitiesParamsInvalidError();
    }

    const { pageNumber, pageSize, kitchenId } = params;
    const kitchenExist = await super.KitchenRepo.FindKitchenById({
      id: kitchenId,
    });
    if (!kitchenExist) {
      throw super.ErrorUtil.KitchenDoesNotExistError();
    }

    return await super.KitchenRepo.FindCapacities({
      pageNumber,
      pageSize,
      kitchenId,
    });
  }

  async FindCapacitiesByKitchenItemId({ kitchenItemId }) {
    if (!this.ValidationUtil.isUUID(kitchenItemId)) {
      throw super.ErrorUtil.ItemIdInvalidError();
    }

    const itemExist = await this.FindItemById({
      id: kitchenItemId,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }
    const today = moment().format("YYYY-MM-DD");
    return await super.KitchenRepo.FindAvailableCapacities({
      kitchenItemId,
      today,
    });
  }

  async FindItemFlavours({ kitchenItemId }) {
    if (!this.ValidationUtil.isUUID(kitchenItemId)) {
      throw super.ErrorUtil.ItemIdInvalidError();
    }

    const itemExist = await this.FindItemById({
      id: kitchenItemId,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }

    return await super.KitchenRepo.FindItemFlavours({
      kitchenItemId,
    });
  }
};
