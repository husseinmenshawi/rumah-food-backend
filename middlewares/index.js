'use strict';

module.exports = {
  passport: {
    jwtToken: require('./passport-jwt'),
  },
  authorization: require('./authorization'),
  jtwTokenValidator: require('./jwt-token-validator'),
};
