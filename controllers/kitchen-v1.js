const express = require("express");
const router = express.Router();

const constants = require("../constants");
const Services = require("../services");
const middlewares = require("../middlewares");

module.exports = (app) => {
  app.use(`${constants.API.VERSIONS["V1.0"].BASE_PATH}/kitchen`, router);
};

router.get(
  "/item/me",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { query } = req;
    try {
      const dbResult = await new Services.Kitchen().FindItems({
        params: query,
      });
      res.status(200);
      res.json(dbResult);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/item",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { body } = req;
    try {
      const createdEntry = await new Services.Kitchen().CreateItem({
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
  "/item/:id",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { params } = req;
    const { id } = params;
    try {
      const dbResult = await new Services.Kitchen().FindItemById({
        id,
      });
      res.status(200);
      res.json(dbResult);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/item/:id",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { params } = req;
    const { id } = params;
    try {
      await new Services.Kitchen().DeleteItem({
        id,
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/item/:id",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    const { body, params } = req;
    const { id } = params;
    try {
      await new Services.Kitchen().UpdateItem({
        payload: body,
        id,
      });
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/flavours/",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
  ]),
  async (req, res, next) => {
    try {
      const dbResult = await new Services.Kitchen().FindFlavours();
      res.status(200);
      res.json(dbResult);
    } catch (error) {
      next(error);
    }
  }
);
