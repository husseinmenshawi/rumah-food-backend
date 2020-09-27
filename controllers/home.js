const express = require('express');
const router = express.Router();

const SwaggerUi = require('swagger-ui-express');
const OpenApiSpec = require('./open-api-spec');

module.exports = (app) => {
  app.use('/', router);
};

router.get('/', (req, res) => {
  res.status(200);
  res.json({
    status: 'Great Hussein! The server actually runs!',
    timeStamp: new Date().toISOString(),
    headers: Object.assign({}, req.headers),
  });
});

router.use('/explorer', SwaggerUi.serve);
router.get('/explorer', SwaggerUi.setup(OpenApiSpec));

router.get('/explorer/spec', (req, res, next) => {
  try {
    res.header('Content-Type', 'application/json');
    res.send(JSON.stringify(OpenApiSpec, null, 1));
  } catch (error) {
    next(error);
  }
});
