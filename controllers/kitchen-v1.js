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

// router.patch(
//   "/me",
//   middlewares.passport.jwtToken.authenticate("jwt", { session: false }),
//   middlewares.jtwTokenValidator.validate,
//   async (req, res, next) => {
//     const { body, user } = req;
//     try {
//       await new Services.User().UpdateMyUserDetails({
//         payload: body,
//         currentUser: user,
//       });
//       res.status(200);
//       res.json({ message: "User Updated Successfully!" });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
