"use strict";

const yup = require("yup");

const getAuthorizationHeader = ({ request }) => {
  const auhorizationHeader = request.headers.authorization;

  const payload = {
    auhorizationHeader,
    fullBearerToken: null,
  };

  if (
    !yup
      .string()
      .required()
      .min(5)
      .trim()
      .strict()
      .isValidSync(auhorizationHeader)
  ) {
    return payload;
  }

  payload.bearerToken = auhorizationHeader.substring(7);

  return { ...payload };
};

module.exports = {
  getAuthorizationHeader,
};
