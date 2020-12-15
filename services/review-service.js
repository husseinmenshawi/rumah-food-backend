"use strict";

const moment = require("moment");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const constants = require("../constants");

const BaseClass = require("./_base-service");

module.exports = class ReviewService extends (
  BaseClass
) {
  constructor() {
    super();
    super.ClassBinder.bind(this, ReviewService);
  }

  async Create({ payload, currentUser }) {
    if (!this.ValidationUtil.isCreateReviewObject(payload)) {
      throw this.ErrorUtil.ReviewMetadataInvalidError();
    }

    const { stars, kitchenId, kitchenItemId, comment, orderId } = payload;
    const { userId } = currentUser;

    const itemExist = await super.KitchenRepo.FindItemById({
      id: kitchenItemId,
    });

    if (!itemExist) {
      throw super.ErrorUtil.ItemNotFoundError();
    }

    const updateOrderPaylaod = {
      reviewComment: comment,
    };
    const createReviewPayload = {
      stars,
      kitchenId,
      kitchenItemId,
      comment,
      userId,
      orderId
    };

    await super.OrderRepo.Update({
      id: orderId,
      updatePayload: updateOrderPaylaod,
    });
    return await super.ReviewRepo.Create({ payload: createReviewPayload });
  }

  async FindReviewByParams({ params }) {
    if (!this.ValidationUtil.isFindReviewsObject(params)) {
      throw this.ErrorUtil.ReviewMetadataInvalidError();
    }

    return await super.ReviewRepo.FindAll({ params });
  }

  async FindReviewByOrderId({ id }) {
    if (!this.ValidationUtil.isUUID(id)) {
      throw this.ErrorUtil.OrderIdInvalidError();
    }

    return await super.ReviewRepo.FindOneByOrderId({ orderId: id });
  }
};
