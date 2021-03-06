"use strict";

const homeRoute = require("./home-route");
const gatekeeperV1Route = require("./gatekeeper-v1-route");
const userV1Route = require("./user-v1-route");
const kitchenV1Route = require("./kitchen-v1-route");
const orderV1Route = require("./order-v1-route");
const reviewV1Route = require("./review-v1-route");
module.exports = {
  openapi: "3.0.1",
  info: {
    title: "Rumah Food System API",
    description: "API server to handle Rumah Food services.",
    version: "1.0.0",
  },
  servers: [
    {
      url: "/",
      description: "Currently mounted server.",
    },
  ],
  tags: [
    { name: "Server Health Check" },
    { name: "Authorization" },
    { name: "User" },
    { name: "Kitchen" },
    { name: "Order" },
    { name: "Review" },
  ],
  paths: {
    ...homeRoute.paths(),
    ...gatekeeperV1Route.paths(),
    ...userV1Route.paths(),
    ...kitchenV1Route.paths(),
    ...orderV1Route.paths(),
    ...reviewV1Route.paths(),
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      ...homeRoute.schemas,
      ...gatekeeperV1Route.schemas,
      ...userV1Route.schemas,
      ...kitchenV1Route.schemas,
      ...orderV1Route.schemas,
      ...reviewV1Route.schemas,
    },
  },
};
