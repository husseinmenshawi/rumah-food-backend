"use strict";

const constants = require("../../constants");

const paths = (tags = ["Authorization"]) => {
  return {
    [`${constants.API.VERSIONS["V1.0"].BASE_PATH}/gatekeeper/me`]: {
      get: {
        tags,
        security: [
          {
            bearerAuth: [],
          },
        ],
        description: "Gets current user metadata",
        operationId: "getCurrentUserMetadata",
        responses: {
          200: {
            description: "Successful upload response.",
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
    [`${constants.API.VERSIONS["V1.0"].BASE_PATH}/gatekeeper/me/token`]: {
      post: {
        tags,
        description: "Login user.",
        requestBody: {
          description: "Payload to submit login credentials.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginCredentials",
              },
            },
          },
        },
        operationId: "loginUser",
        responses: {
          200: {
            description: "Successful login",
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
        security: [
          {
            bearerAuth: [],
          },
        ],
        description: `Introspects the current user's token`,
        operationId: "introspectUserToken",
        responses: {
          200: {
            description: "Successful introspection response.",
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
        security: [
          {
            bearerAuth: [],
          },
        ],
        description: `Logs out user based on current access token.`,
        operationId: "logoutViaAccessToken",
        responses: {
          204: {
            description: "Successful logout response.",
          },
        },
      },
    },
    [`${constants.API.VERSIONS["V1.0"].BASE_PATH}/gatekeeper/me/token/refresh/{refreshToken}`]: {
      post: {
        tags,
        security: [
          {
            bearerAuth: [],
          },
        ],
        description: `Refreshes current user's session with a new token via refresh token`,
        operationId: "refreshSession",
        parameters: [
          {
            in: "path",
            name: "refreshToken",
            schema: {
              type: "string",
            },
            required: true,
            description: "JWT refresh token",
          },
        ],
        responses: {
          200: {
            description: "Successful login",
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
  email: {
    type: "string",
    description: "Email of the user.",
    required: true,
    example: "menshawi98@gmail.com",
  },
  password: {
    type: "string",
    minimum: 8,
    description: "User's password. Minimum length 8 characters.",
    required: true,
    example: "Test123!",
  },
  roleId: {
    type: "integer",
    description: "Role id of the user",
    required: true,
    example: constants.USER_ROLES.ROLE_ENUMS.SUPER_USER.id,
  },
  LoginCredentials: {
    type: "object",
    properties: {
      email: {
        $ref: "#/components/schemas/email",
      },
      password: {
        $ref: "#/components/schemas/password",
      },
      roleId: {
        $ref: "#/components/schemas/roleId",
      },
    },
  },
};

module.exports = {
  paths,
  schemas,
};
