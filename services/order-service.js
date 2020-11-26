"use strict";

const moment = require("moment");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");
const constants = require("../constants");

const BaseClass = require("./_base-service");

module.exports = class UserService extends (
  BaseClass
) {
  constructor() {
    super();
    super.ClassBinder.bind(this, UserService);
  }

  async Create({ payload }) {
    if (!this.ValidationUtil.isCreateOrderObject(payload)) {
      throw this.ErrorUtil.OrderMetadataInvalidError();
    }
    const {
      orderDateTime,
      userId,
      kitchenItemId,
      amount,
      comment,
      flavourId,
    } = payload;
    if (!comment) {
      delete payload.comment;
    }

    const availableFlavours = await super.KitchenRepo.FindAvailableFlavoursByKitchenItemId(
      { kitchenItemId }
    );

    const availableFlavourIds = availableFlavours.map((x) => x.flavourId);
    if (!availableFlavourIds.includes(flavourId)) {
      throw this.ErrorUtil.FlavourNotAvailableError();
    }

    const availableCapacities = await super.KitchenRepo.FindAvailableCapacities(
      { kitchenItemId }
    );

    if (availableCapacities.length < amount) {
      throw this.ErrorUtil.InsufficientCapacitiesError();
    }

    const ids = availableCapacities.map((x) => x.id);

    const availableCapacityIds = ids.slice(0, amount);
    const updatePayload = {
      orderDateTime,
      userId,
    };
    await super.KitchenRepo.reserveCapacity({
      updatePayload,
      availableCapacityIds,
    });
    payload.orderStatusId = 1;
    return await super.OrderRepo.Create({ payload });
  }

  async FindMyOrders({ currentUser }) {
    const email = currentUser.email;
    const userDetails = await super.UserRepo.FindUserByParams({ email });
    const { kitchenId } = userDetails;

    return await super.OrderRepo.FindOrdersByKitchenId({ kitchenId });
  }

  async FindOrdersMadeByMe({ currentUser }) {
    const id = currentUser.userId;
    return await super.OrderRepo.FindOrdersByUserId({ id });
  }

  async FindOrderById({ id }) {
    if (!this.ValidationUtil.isUUID(id)) {
      throw super.ErrorUtil.OrderIdInvalidError();
    }

    return await super.OrderRepo.FindOrderById({ id });
  }

  async DeliverOrder({ id, currentUser }) {
    const email = currentUser.email;
    const userDetails = await super.UserRepo.FindUserByParams({ email });
    const { kitchenId } = userDetails;

    const orderDetails = await this.FindOrderById({ id });
    if (orderDetails.KitchenItem.kitchenId != kitchenId) {
      throw this.ErrorUtil.UnauthorizedError();
    }
    const updatePayload = {
      orderStatusId: 3,
    };
    return await super.OrderRepo.DeliverOrder({ updatePayload, id });
  }

  async ConfirmOrder({ id, currentUser }) {
    const email = currentUser.email;
    const userDetails = await super.UserRepo.FindUserByParams({ email });
    const { kitchenId } = userDetails;

    const orderDetails = await this.FindOrderById({ id });
    if (orderDetails.KitchenItem.kitchenId != kitchenId) {
      throw this.ErrorUtil.UnauthorizedError();
    }
    const updatePayload = {
      orderStatusId: 2,
    };
    return await super.OrderRepo.ConfirmOrder({ updatePayload, id });
  }
};
