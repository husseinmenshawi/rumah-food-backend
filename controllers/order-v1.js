const express = require("express");
const router = express.Router();

const constants = require("../constants");
const Services = require("../services");
const middlewares = require("../middlewares");

module.exports = (app) => {
  app.use(`${constants.API.VERSIONS["V1.0"].BASE_PATH}/order`, router);
};

router.post(
  "/",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.BUYER.id,
  ]),
  async (req, res, next) => {
    const { body } = req;
    try {
      const createdEntry = await new Services.Order().Create({
        payload: body,
      });
      res.status(201);
      res.json(createdEntry);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/me",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { user } = req;
    try {
      const orders = await new Services.Order().FindMyOrders({
        currentUser: user,
      });
      res.status(200);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/buyer/me",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.BUYER.id,
  ]),
  async (req, res, next) => {
    const { user } = req;
    try {
      const orders = await new Services.Order().FindOrdersMadeByMe({
        currentUser: user,
      });
      res.status(200);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
    constants.USER_ROLES.ROLE_ENUMS.BUYER.id,
  ]),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const orders = await new Services.Order().FindOrderById({
        id,
      });
      res.status(200);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/deliver/:id",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { user, params } = req;
    const { id } = params;
    try {
      await new Services.Order().DeliverOrder({
        id,
        currentUser: user,
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/confirm/:id",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { user, params } = req;
    const { id } = params;
    try {
      await new Services.Order().ConfirmOrder({
        id,
        currentUser: user,
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);
