const path = require('path');
const rootPath = path.normalize(__dirname + '/..');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  rootPath,
  app: {
    name: process.env.APP_NAME || 'rumah-food-backend',
  },
  env,
  port: process.env.PORT || 3000,
  logging: require('./logging'),
  db: {
    primary: require('./db-primary'),
  },
  authentication: require('./authentication'),
};
