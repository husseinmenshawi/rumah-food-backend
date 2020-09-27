'use strict';

const pino = require('pino');

const config = require('../config');

const logger = pino({
  name: config.app.name,
  level: config.logging.level,
  prettyPrint: { colorize: true },
});

module.exports = logger;
