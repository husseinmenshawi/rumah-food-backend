"use strict";

const CONSTANTS = require("../../constants");

const paths = (tags = ["Kitchen"]) => {
  return {
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen`]: {
      get: {
        tags,
        description: "Endpoint to get kitchens.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findKitchens",
        responses: {
          200: {
            description: "Successful kitchen fetch.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/one/{id}`]: {
      get: {
        tags,
        description: "Endpoint to get kitchen.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findKitchenById",
        parameters: [
          {
            in: "path",
            name: "id",
            minLength: 1,
            required: true,
            description: `Kitchen id`,
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Successful kitchen fetch.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/item`]: {
      post: {
        tags,
        description: "Endpoint to create item.",
        // consumes: "multipart/form-data",
        // parameters: [
        //   {
        //     in: "formData",
        //     name: "image",
        //     type: "file",
        //     description: `Item image`,
        //     required: false,
        //   },
        // ],
        requestBody: {
          description: "Payload to create new item.",
          content: {
            "multipart/form-data": {
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/item/{id}`]: {
      get: {
        tags,
        description: "Endpoint to get item by id.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findItemById",
        parameters: [
          {
            in: "path",
            name: "id",
            minLength: 1,
            required: true,
            description: `Item id`,
            type: "string",
            format: "uuid",
          },
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
      delete: {
        tags,
        description: "Endpoint to delete item.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "deleteItem",
        parameters: [
          {
            in: "path",
            name: "id",
            minLength: 1,
            required: true,
            description: `Item id.`,
            type: "string",
            format: "uuid",
          },
        ],
        responses: {
          200: {
            description: "Successful item deletion.",
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
        description: "Endpoint to update item by id.",
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
        operationId: "findItemById",
        parameters: [
          {
            in: "path",
            name: "id",
            minLength: 1,
            required: true,
            description: `Item id`,
            type: "string",
            format: "uuid",
          },
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
          {
            in: 'query',
            name: 'excludeInactiveItems',
            minLength: 1,
            required: false,
            description: `Exclude Inactive items.`,
            type: 'boolean',
          },
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
    },
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/flavours`]: {
      get: {
        tags,
        description: "Endpoint to get flavours.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findMyItems",
        responses: {
          200: {
            description: "Successful flavours fetch.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/capacity`]: {
      post: {
        tags,
        description: "Endpoint to create capacity.",
        requestBody: {
          description: "Payload to create capacity.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CreateCapacity",
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "createCapacity",
        responses: {
          200: {
            description: "Successful capacity creation.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/capacities/me`]: {
      get: {
        tags,
        description: "Endpoint to get my capacities.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findMycapacities",
        parameters: [
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
        ],
        responses: {
          200: {
            description: "Successful capacities fetch.",
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
    [`${CONSTANTS.API.VERSIONS["V1.0"].BASE_PATH}/kitchen/capacities/item/{id}`]: {
      get: {
        tags,
        description: "Endpoint to get capacities available for a specific item.",
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: "findCapacitiesByKitchenItemId",
        parameters: [
          {
            in: "path",
            name: "id",
            minLength: 1,
            required: true,
            description: `Kitchen item id`,
            type: "string",
          },
        ],
        responses: {
          200: {
            description: "Successful capacities fetch.",
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
      flavours: {
        type: "array",
        description:
          "List of flavours. This is the flavour id which is an integer.",
        required: true,
        items: {
          type: "integer",
          // enum: [
          //   CONSTANTS.FLAVOURS.DB_FLAVOUR.map((x) => {
          //     return x.id;
          //   }),
          // ],
        },
        // example: [CONSTANTS.FLAVOURS.FLAVOUR_ENUMS.VANILLA.id],
      },
      kitchenId: {
        type: "integer",
        description: "kitchen id of the user",
        required: true,
        example: 1,
      },
      file: {
        type: "file",
        description: "image of the item",
        required: true,
      },
    },
  },
  UpdateMyItemDetails: {
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
      flavours: {
        type: "array",
        description:
          "List of flavours. This is the flavour id which is an integer.",
        required: true,
        items: {
          type: "integer",
          enum: [
            CONSTANTS.FLAVOURS.DB_FLAVOUR.map((x) => {
              return x.id;
            }),
          ],
        },
        example: [CONSTANTS.FLAVOURS.FLAVOUR_ENUMS.VANILLA.id],
      },
    },
  },
  CreateCapacity: {
    type: "object",
    properties: {
      date: {
        type: "string",
        description: "Start date of capacity.",
        required: true,
        example: "2020-10-28",
      },
      kitchenId: {
        type: "integer",
        description: "kitchen id of the user",
        required: true,
        example: 1,
      },
      kitchenItemId: {
        //uuid
        type: "string",
        description: "Kitchen item id.",
        required: true,
        example: "1b762adb-7652-42b7-b61c-85c57078629f",
      },
      amount: {
        type: "integer",
        description: "Amount of capacities to add.",
        required: true,
        example: 1,
      },
    },
  },
};

module.exports = {
  paths,
  schemas,
};
