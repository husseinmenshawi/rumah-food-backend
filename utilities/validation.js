"use strict";

const Yup = require("yup");

const isNumberArray = (input) => {
  return numberArray().isValidSync(input);
};

const isUserObject = (input) => {
  return Yup.object()
    .shape({
      user: Yup.object()
        .shape({
          userId: requiredInteger(),
        })
        .required(),
    })
    .required()
    .isValidSync(input);
};

const isCreateUserObject = (input) => {
  return Yup.object()
    .shape({
      name: requiredString(),
      email: email(),
      password: password(),
      kitchenName: optionalString(),
      phoneNumber: requiredString(),
      roleId: requiredInteger(),
    })
    .required()
    .isValidSync(input);
};

const isUpdateUserObject = (input) => {
  return Yup.object()
    .shape({
      name: optionalString(),
      email: optionalEmail(),
      phoneNumber: optionalString(),
      addressLine1: optionalString(),
      addressLine2: optionalString(),
      addressLine3: optionalString(),
    })
    .required()
    .isValidSync(input);
};

const isRoleObject = (input) => {
  return Yup.object()
    .shape({
      Roles: Yup.array()
        .of(
          Yup.object()
            .shape({
              id: requiredInteger(),
              roleName: string(),
            })
            .required()
        )
        .required()
        .min(1),
    })
    .required()
    .isValidSync(input);
};

const isCredentialObject = (input) => {
  return Yup.object()
    .shape({
      email: email(),
      password: password(),
    })
    .isValidSync(input);
};

const isRefreshTokenObject = (input) => {
  return Yup.object()
    .shape({
      bearerToken: requiredString(),
      refreshToken: requiredUUID(),
      userId: requiredInteger(),
      userAgent: optionalString(),
      username: requiredString(),
    })
    .isValidSync(input);
};

const isFindUsersObject = (input) => {
  return Yup.object()
    .shape({
      keyword: optionalString(),
      pageSize: optionalInteger(),
      pageNumber: Yup.number().notRequired().integer().min(0),
      showInactive: optionalString(),
      storeId: optionalInteger(),
    })
    .required()
    .isValidSync(input);
};

const isCreateItemObject = (input) => {
  return Yup.object()
    .shape({
      itemName: requiredString(),
      itemPrice: requiredInteger(),
      itemDesc: requiredString(),
      isEnabled: requiredBoolean(),
      flavours: numberArray(),
      kitchenId: requiredInteger(),
    })
    .required()
    .isValidSync(input);
};

const isFindItemsObject = (input) => {
  return Yup.object()
    .shape({
      keyword: optionalString(),
      pageSize: optionalInteger(),
      pageNumber: Yup.number().notRequired().integer().min(0),
      showInactive: optionalString(),
      kitchenId: requiredInteger(),
    })
    .required()
    .isValidSync(input);
};

const isUpdateItemObject = (input) => {
  return Yup.object()
    .shape({
      itemName: requiredString(),
      itemPrice: requiredInteger(),
      itemDesc: requiredString(),
      isEnabled: requiredBoolean(),
      flavours: numberArray(),
    })
    .required()
    .isValidSync(input);
};

const isString = (input) => {
  return requiredString().isValidSync(input);
};

const isInteger = (input) => {
  return requiredInteger().isValidSync(input);
};

const isUUID = (input) => {
  return requiredUUID().isValidSync(input);
};

const dateStringFormat = () => {
  //Matches YYYY-MM-DD
  return Yup.string()
    .trim()
    .matches(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/);
};

const year = () => {
  return Yup.number().integer().min(1900).max(3000);
};

const week = () => {
  return Yup.number().integer().min(1).max(53);
};

const postalCode = () => {
  return Yup.number().integer().min(1000).max(9999);
};

const personnel = () => {
  return Yup.number().integer().min(1).max(2);
};
const requiredInteger = () => {
  return Yup.number().required().integer().min(1);
};

const requiredUUID = () => {
  return Yup.string().required().min(36).max(36).trim().strict();
};

const optionalInteger = () => {
  return Yup.number().notRequired().integer().min(1);
};

const requiredString = () => {
  return Yup.string().min(1).required();
};

const optionalString = () => {
  return Yup.string().trim().min(1).notRequired();
};

const string = () => {
  return Yup.string().required().min(1).trim().strict();
};

const email = () => {
  return Yup.string().required().min(1).trim().strict().email();
};

const optionalEmail = () => {
  return Yup.string().notRequired().min(1).trim().email();
};

const password = () => {
  return Yup.string().required().min(8).trim().strict();
};

const numberArray = () => {
  return Yup.array().of(requiredInteger()).required().min(1);
};

const optionalPassword = () => {
  return Yup.string().notRequired().min(8).trim().strict();
};

const optionalNumberArray = () => {
  return Yup.array().of(requiredInteger()).notRequired().min(1);
};

const requiredBoolean = () => {
  return Yup.bool().required();
};

const optionalBoolean = () => {
  return Yup.bool().notRequired();
};

module.exports = {
  isNumberArray,
  isUserObject,
  isCreateUserObject,
  isRoleObject,
  isCredentialObject,
  isRefreshTokenObject,
  isString,
  isInteger,
  isUpdateUserObject,
  isFindUsersObject,
  isCreateItemObject,
  isFindItemsObject,
  isUUID,
  isUpdateItemObject,
};
