"use strict";

const CONSTANTS = require("../../constants");

const paths = (tags = ["Review"]) => {
  return {
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/review`]: {
      post: {
        tags,
        description: "Endpoint to create a review",
        requestBody: {
          description: "Payload to create a a review.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateReview",
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "createReview",
        responses: {
          201: {
            description: "Successful review creation.",
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
      get: {
        tags,
        description: "Endpoint to fetch review average",
        parameters: [
          {
            name: "kitchenId",
            in: "query",
            minLength: 1,
            required: false,
            description: `Kitchen Id.`,
            type: "integer",
          },
          {
            name: "kitchenItemId",
            in: "query",
            minLength: 1,
            required: false,
            description: `Kitchen Item Id.`,
            type: "string",
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "fetchReviewAverage",
        responses: {
          200: {
            description: "Successful review average fetch.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/review/{id}`]: {
      get: {
        tags,
        description: "Endpoint to fetch a review",
        parameters: [
          {
            name: "id",
            in: "path",
            minLength: 1,
            required: true,
            description: `Id of the order.`,
            type: "string",
          },
        ],
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "fetchReview",
        responses: {
          200: {
            description: "Successful review fetch.",
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
  CreateReview: {
    type: "object",
    properties: {
      stars: {
        type: "integer",
        description: "Star ratings.",
        required: true,
        example: 5,
      },
      comment: {
        type: "string",
        description: "comment.",
        required: false,
        example: "Fast delivery.",
      },
      kitchenId: {
        type: "string",
        description: "Id of ordered item",
        required: true,
        example: "02906c6d-889c-431d-ac0b-5fc8af8eb9d3",
      },
      kitchenItemId: {
        type: "integer",
        description: "Id of kitchen",
        required: true,
        example: 1,
      },
      orderId: {
        type: "string",
        description: "Id of order",
        required: true,
        example: "c40a07b1-b9ec-4bff-8f3c-b5c6a8839880",
      },
    },
  },
};

module.exports = {
  paths,
  schemas,
};
