const express = require("express");
const router = express.Router();

const constants = require("../constants");
const Services = require("../services");
const middlewares = require("../middlewares");

module.exports = (app) => {
  app.use(`${constants.API.VERSIONS["V1.0"].BASE_PATH}/review`, router);
};

router.post(
  "/",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.BUYER.id,
  ]),
  async (req, res, next) => {
    const { body, user } = req;
    try {
      const createdEntry = await new Services.Review().Create({
        payload: body,
        currentUser: user,
      });
      res.status(201);
      res.json(createdEntry);
    } catch (error) {
      next(error);
    }
  }
);

// router.get(
//   "/",
//   middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
//   middlewares.jtwTokenValidator.validate,
//   middlewares.authorization.authorizeRole([
//     constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
//     constants.USER_ROLES.ROLE_ENUMS.BUYER.id,
//   ]),
//   async (req, res, next) => {
//     const { query } = req;
//     try {
//       const dbResult = await new Services.Review().FindReviewByParams({
//         params: query,
//       });
//       res.status(200);
//       res.json(dbResult);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

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
      const dbResult = await new Services.Review().FindReviewByOrderId({
        id,
      });
      res.status(200);
      res.json(dbResult);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/",
  middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
  middlewares.jtwTokenValidator.validate,
  middlewares.authorization.authorizeRole([
    constants.USER_ROLES.ROLE_ENUMS.SELLER.id,
    constants.USER_ROLES.ROLE_ENUMS.BUYER.id,
  ]),
  async (req, res, next) => {
    try {
      const dbResult = await new Services.Review().GetRatingAverage({
        params: req.query,
      });
      res.status(200);
      res.json(dbResult);
    } catch (error) {
      next(error);
    }
  }
);
