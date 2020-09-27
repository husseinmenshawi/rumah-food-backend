"use strict";

const CONSTANTS = require("../../constants");

const paths = (tags = ["Kitchen"]) => {
  return {
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/item`]: {
      get: {
        tags,
        description: "Endpoint to get items.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findAllItems",
        parameters: [
          {
            in: "query",
            name: "keyword",
            minLength: 1,
            required: false,
            description: `Keyword to search for item.`,
            type: "string",
          },
          {
            in: "query",
            name: "pageNumber",
            minLength: 1,
            required: false,
            description: `The page number.`,
            type: "string",
          },
          {
            in: "query",
            name: "pageSize",
            minLength: 1,
            required: false,
            description: `The page size.`,
            type: "string",
          },
          {
            in: "query",
            name: "kitchenId",
            minLength: 1,
            required: false,
            description: `The kitchen id.`,
            type: "integer",
          },
          // {
          //   in: 'query',
          //   name: 'showInactive',
          //   minLength: 1,
          //   required: false,
          //   description: `Show Inactive Kitchens.`,
          //   type: 'string',
          // },
        ],
        responses: {
          200: {
            description: "Successful items fetch.",
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
      post: {
        tags,
        description: "Endpoint to create item.",
        requestBody: {
          description: "Payload to create new item.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateItem",
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "createItem",
        responses: {
          201: {
            description: "Successful item creation.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/item/me`]: {
      get: {
        tags,
        description: "Endpoint to get my items.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findMyItems",
        parameters: [
          {
            in: "query",
            name: "keyword",
            minLength: 1,
            required: false,
            description: `Keyword to search for item.`,
            type: "string",
          },
          {
            in: "query",
            name: "pageNumber",
            minLength: 1,
            required: false,
            description: `The page number.`,
            type: "string",
          },
          {
            in: "query",
            name: "pageSize",
            minLength: 1,
            required: false,
            description: `The page size.`,
            type: "string",
          },
          {
            in: "query",
            name: "kitchenId",
            minLength: 1,
            required: false,
            description: `The kitchen id.`,
            type: "integer",
          },
          // {
          //   in: 'query',
          //   name: 'showInactive',
          //   minLength: 1,
          //   required: false,
          //   description: `Show Inactive items.`,
          //   type: 'string',
          // },
        ],
        responses: {
          200: {
            description: "Successful items fetch.",
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

      patch: {
        tags,
        description: "Endpoint to edit item details.",
        requestBody: {
          description: "Payload to edit item details.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateMyItemDetails",
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "updateItem",
        responses: {
          200: {
            description: "Successful item update.",
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
  CreateItem: {
    type: "object",
    properties: {
      itemName: {
        type: "string",
        description: "Item's name.",
        required: true,
        example: "Cupcake",
      },
      itemPrice: {
        type: "integer",
        description: "Item's price",
        required: true,
        example: "15",
      },
      itemDesc: {
        type: "string",
        description: "Item's description",
        required: true,
        example: "Choclate baked cake",
      },
      isEnabled: {
        type: "boolean",
        description: "Item activity",
        required: true,
        example: true,
      },
      kitchenId: {
        type: "integer",
        description: "kitchen id of the user",
        required: true,
        example: 10002,
      },
    },
  },
  UpdateMyItemDetails: {
    type: "object",
    properties: {
      email: {
        $ref: "#/components/schemas/username",
      },
      password: {
        $ref: "#/components/schemas/password",
      },
      firstName: {
        type: "string",
        description: "User's first name.",
        required: false,
      },
      lastName: {
        type: "string",
        description: "User's last name.",
        required: false,
      },
      roles: {
        type: "array",
        description: "List of roles. This is the role id which is an integer.",
        required: false,
        items: {
          type: "integer",
        },
        example: [CONSTANTS.USER_ROLES.ROLE_ENUMS.BUYER.id],
      },
      storeId: {
        type: "integer",
        description: "Store id the user belongs to.",
        required: false,
        example: 1,
      },
    },
  },
};

module.exports = {
  paths,
  schemas,
};
