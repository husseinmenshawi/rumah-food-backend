"use strict";

const paths = (tags = ["Server Health Check"]) => {
  return {
    "/": {
      get: {
        tags,
        description: "Ping server's heartbeat",
        operationId: "getHealth",
        responses: {
          "200": {
            description: "Successful heartbeat response",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/GoodHealthResponse"
                }
              }
            }
          }
        }
      }
    }
  };
};

const schemas = {
  GoodHealthResponse: {
    type: "object",
    properties: {
      greeting: {
        type: "string"
      },
      date: {
        type: "date"
      },
      url: {
        type: "string"
      },
      headers: {
        type: "object"
      }
    }
  }
};

module.exports = {
  paths,
  schemas
};
