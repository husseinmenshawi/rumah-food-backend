"use strict";

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const { authentication } = require("../config");
const { defaultJwtTokenSecret } = authentication;

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: defaultJwtTokenSecret,
    },
    (jwtPayload, done) => {
      const expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return done(null, false);
      }
      var user = jwtPayload;
      done(null, user);
    }
  )
);

module.exports = passport;
