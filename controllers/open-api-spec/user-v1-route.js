'use strict';

const CONSTANTS = require('../../constants');

const paths = (tags = ['User']) => {
  return {
    [`${CONSTANTS.API.VERSIONS['V1.0'].BASE_PATH}/user`]: {
      get: {
        tags,
        description: 'Endpoint to get users.',
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: 'findAllUsers',
        parameters: [
          {
            in: 'query',
            name: 'keyword',
            minLength: 1,
            required: false,
            description: `Keyword for searching user.`,
            type: 'string',
          },
          {
            in: 'query',
            name: 'pageNumber',
            minLength: 1,
            required: false,
            description: `The page number.`,
            type: 'string',
          },
          {
            in: 'query',
            name: 'pageSize',
            minLength: 1,
            required: false,
            description: `The page size.`,
            type: 'string',
          },
          {
            in: 'query',
            name: 'storeId',
            minLength: 1,
            required: false,
            description: `The store id.`,
            type: 'integer',
          },
          {
            in: 'query',
            name: 'showInactive',
            minLength: 1,
            required: false,
            description: `Show Inactive users.`,
            type: 'string',
          },
        ],
        responses: {
          '200': {
            description: 'Successful user fetch.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
      post: {
        tags,
        description: 'Endpoint to create user for super user.',
        requestBody: {
          description: 'Payload to create new user.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUser',
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: 'createSuperUser',
        responses: {
          '201': {
            description: 'Successful user creation.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS['V1.0'].BASE_PATH}/user/me`]: {
      patch: {
        tags,
        description: 'Endpoint to edit user details.',
        requestBody: {
          description: 'Payload to edit user details.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateMyUserDetails',
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: 'updateUser',
        responses: {
          '200': {
            description: 'Successful user update.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
    },
    [`${CONSTANTS.API.VERSIONS['V1.0'].BASE_PATH}/user/{id}`]: {
      get: {
        tags,
        security: [
          {
            bearerAuth: [],
          },
        ],
        description: 'Endpoint to get user by id.',
        operationId: 'getUserById',
        parameters: [
          {
            name: 'id',
            in: 'path',
            minLength: 1,
            required: true,
            description: `Id of the user for retrieval.`,
            type: 'integer',
          },
        ],
        responses: {
          '200': {
            description: 'Successful get user by id.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
        },
      },
      patch: {
        tags,
        description: 'Endpoint to update user by id',
        parameters: [
          {
            name: 'id',
            in: 'path',
            minLength: 1,
            required: true,
            description: `User id that will be updated.`,
            type: 'integer',
          },
        ],
        requestBody: {
          description: 'Payload to update user by id',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateUserById',
              },
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        operationId: 'updateUserById',
        responses: {
          '200': {
            description: 'Successful user update.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
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
  CreateUser: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: "User's first name.",
        required: true,
        example: 'firstName',
      },
      email: {
        type: 'string',
        description: 'Email of the user.',
        format: 'email',
        required: true,
        example: 'info@pintu.dk',
      },
      password: {
        $ref: '#/components/schemas/password',
      },
      kitchenName: {
        type: 'string',
        description: 'Kitchen name of the seller.',
        required: true,
        example: 'Seller Kitchen',
      },
      phoneNumber: {
        type: 'string',
        description: 'Phone No. of the user.',
        required: true,
        example: '0176291725',
      },
      roleId: {
        type: "integer",
        description: "Role id of the user",
        required: true,
        example: CONSTANTS.USER_ROLES.ROLE_ENUMS.BUYER.id,
      },
    },
  },
  UpdateMyUserDetails: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/username',
      },
      password: {
        $ref: '#/components/schemas/password',
      },
      firstName: {
        type: 'string',
        description: "User's first name.",
        required: false,
      },
      lastName: {
        type: 'string',
        description: "User's last name.",
        required: false,
      },
      roles: {
        type: 'array',
        description: 'List of roles. This is the role id which is an integer.',
        required: false,
        items: {
          type: 'integer',
        },
        example: [CONSTANTS.USER_ROLES.ROLE_ENUMS.BUYER.id],
      },
      storeId: {
        type: 'integer',
        description: 'Store id the user belongs to.',
        required: false,
        example: 1,
      },
    },
  },
  UpdateUserById: {
    type: 'object',
    properties: {
      email: {
        $ref: '#/components/schemas/username',
      },
      password: {
        $ref: '#/components/schemas/password',
      },
      firstName: {
        type: 'string',
        description: "User's first name.",
        required: false,
      },
      lastName: {
        type: 'string',
        description: "User's last name.",
        required: false,
      },
      enabled: {
        type: 'boolean',
        description: 'User activity status',
        required: false,
        example: true,
      },
      roles: {
        type: 'array',
        description: 'List of roles. This is the role id which is an integer.',
        required: false,
        items: {
          type: 'integer',
        },
        example: [CONSTANTS.USER_ROLES.ROLE_ENUMS.BUYER.id],
      },
      storeId: {
        type: 'integer',
        description: 'Store id the user belongs to.',
        required: false,
        example: 1,
      },
    },
  },
  FindAllUsers: {
    type: 'object',
    properties: {
      keyword: {
        type: 'string',
        description: 'Keyword filter',
        required: false,
      },
    },
  },
};

module.exports = {
  paths,
  schemas,
};
