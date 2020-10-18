"use strict";

const moment = require("moment");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const constants = require("../constants");

const BaseClass = require("./_base-service");

module.exports = class KitchenService extends BaseClass {
  constructor() {
    super();
    super.ClassBinder.bind(this, KitchenService);
  }

  async CreateItem({ payload }) {
    if (!this.ValidationUtil.isCreateItemObject(payload)) {
      console.log("Item metadata invalid");
      throw super.ErrorUtil.ItemMetadataInvalidError();
    }
    const { kitchenId } = payload;
    const { flavours } = payload;
    delete payload.flavours;
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

    const { keyword, pageNumber, pageSize, kitchenId } = params;
    const kitchenExist = await super.KitchenRepo.FindKitchenById({
      id: kitchenId,
    });
    if (!kitchenExist) {
      throw super.ErrorUtil.KitchenDoesNotExistError();
    }

    return await super.KitchenRepo.FindItems({
      keyword,
      pageNumber,
      pageSize,
      kitchenId,
    });
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

    const itemExist = await super.KitchenRepo.FindItemById({
      id,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }

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

    const itemExist = await super.KitchenRepo.FindItemById({
      id,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }

    await super.KitchenRepo.UpdateItemById({ payload, id });
  }
};
