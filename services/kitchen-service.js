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
    const kitchenExist = await super.KitchenRepo.FindKitchenById({
      id: kitchenId,
    });
    if (!kitchenExist) {
      throw super.ErrorUtil.KitchenDoesNotExistError();
    }

    return await super.KitchenRepo.CreateItem({ payload });
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
};
