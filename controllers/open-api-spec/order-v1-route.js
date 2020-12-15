"use strict";

const CONSTANTS = require("../../constants");

const paths = (tags = ["Order"]) => {
  return {
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/order`]: {
      post: {
        tags,
        description: "Endpoint to create order",
        requestBody: {
          description: "Payload to create an order.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateOrder",
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "createOrder",
        responses: {
          201: {
            description: "Successful order creation.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/order/me`]: {
      get: {
        tags,
        description: "Endpoint to get my order",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findOrder",
        responses: {
          200: {
            description: "Successful order fetch.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/order/buyer/me`]: {
      get: {
        tags,
        description: "Endpoint to get order made by me",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findOrdersMadeByMe",
        responses: {
          200: {
            description: "Successful order fetch.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/order/{id}`]: {
      get: {
        tags,
        description: "Endpoint to get order by id",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findOrderById",
        parameters: [
          {
            name: "id",
            in: "path",
            minLength: 1,
            required: true,
            description: `Id of the order for retrieval.`,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Successful order fetch by id.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/order/deliver/{id}`]: {
      patch: {
        tags,
        description: "Endpoint to mark order as deliverd",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "deliverOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            minLength: 1,
            required: true,
            description: `Id of the order for to be delivered.`,
            type: "string",
          },
        ],
        responses: {
          204: {
            description: "Successfully marked order as delivered.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/order/confirm/{id}`]: {
      patch: {
        tags,
        description: "Endpoint to mark order as confirm",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "confirmOrder",
        parameters: [
          {
            name: "id",
            in: "path",
            minLength: 1,
            required: true,
            description: `Id of the order for to be confirm.`,
            type: "string",
          },
        ],
        responses: {
          204: {
            description: "Successfully marked order as confirm.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                },
              },
            },
          },
        },
      },
    },
  };
};

const schemas = {
  CreateOrder: {
    type: "object",
    properties: {
      orderDateTime: {
        type: "string",
        description: "Order delivery date.",
        required: true,
        example: "2020-11-22",
      },
      amount: {
        type: "integer",
        description: "Amount of item ordered",
        format: "email",
        required: true,
        example: 2,
      },
      comment: {
        type: "string",
        description: "comment.",
        required: false,
        example: "Not to sweet.",
      },
      flavourId: {
        type: "integer",
        description: "Id of the flavour",
        required: true,
        example: 1,
      },
      kitchenItemId: {
        type: "string",
        description: "Id of ordered item",
        required: true,
        example: "02906c6d-889c-431d-ac0b-5fc8af8eb9d3",
      },
      userId: {
        type: "integer",
        description: "Id of the User",
        required: true,
        example: 2,
      },
    },
  },
};

module.exports = {
  paths,
  schemas,
};
