const express = require('express');
const router = express.Router();

const constants = require('../constants');
const Services = require('../services');
const middlewares = require('../middlewares');

module.exports = (app) => {
  app.use(`${constants.API.VERSIONS['V1.0'].BASE_PATH}/gatekeeper`, router);
};

router.get(
  '/me',
  middlewares.passport.jwtToken.authenticate('jwt', { session: false }),
  middlewares.jtwTokenValidator.validate,
  (req, res, next) => {
    new Services.User()
      .FindUserById({ id: req.user.userId })
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((error) => {
        next(error);
      });
  },
);

// TODO: Discuss if we should use login path instead of using verbs purely.
router.post('/me/token', (req, res, next) => {
  const { body, headers } = req;
  const userAgent = headers['user-agent'];
  new Services.User()
    .AuthenticateUser({ ...body, userAgent })
    .then((result) => {
      res.status(201);
      res.json(result);
    })
    .catch((error) => {
      next(error);
    });
});

router.get(
  '/me/token',
  middlewares.passport.jwtToken.authenticate('jwt', { session: false }),
  middlewares.jtwTokenValidator.validate,
  (req, res) => {
    res.status(200);
    res.json(req.user);
  },
);

router.delete(
  '/me/token',
  middlewares.passport.jwtToken.authenticate('jwt', { session: false }),
  middlewares.jtwTokenValidator.validate,
  (req, res, next) => {
    const { bearerToken } = req;
    new Services.User()
      .LogoutUserByBearerToken({ bearerToken })
      .then(() => {
        res.status(204);
        res.send();
      })
      .catch((error) => {
        next(error);
      });
  },
);

router.post(
  '/me/token/refresh/:refreshToken',
  middlewares.passport.jwtToken.authenticate('jwt', { session: false }),
  middlewares.jtwTokenValidator.validate,
  (req, res, next) => {
    const {
      params: { refreshToken },
      bearerToken,
      user: { userId, username },
      headers,
    } = req;
    const userAgent = headers['user-agent'];

    new Services.User()
      .RefreshToken({ bearerToken, refreshToken, userAgent, userId, username })
      .then((result) => {
        res.status(201);
        res.json(result);
      })
      .catch((error) => {
        next(error);
      });
  },
);
