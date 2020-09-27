"use strict";

/**
 * Generates an error object that allows the specification of HTTP error status.
 * @param {Object} param0 Input payload
 * @param {String} param0.message Error message to be displayed.
 * @param {Number} [param0.httpErrorCode=500] HTTP Error status code. Defaults to 500.
 */
const GenerateHttpError = ({ message, httpErrorCode = 500 }) => {
  const error = new Error(message);
  error.httpErrorCode = httpErrorCode;

  return error;
};

const ConvertErrorToHttpError = ({ error, httpErrorCode = 500 }) => {
  Object.assign(error, { httpErrorCode });

  return error;
};

//Token
const TokenInvalidError = () => {
  return GenerateHttpError({
    message: "Token is invalid",
    httpErrorCode: 400,
  });
};

const RefreshTokenInvalidError = () => {
  return GenerateHttpError({
    message: "Refresh token is invalid",
    httpErrorCode: 400,
  });
};

//Authorization
const DefaultAuthorizationError = () => {
  return GenerateHttpError({
    message: "Unhandled exception while processing authorization metadata",
    httpErrorCode: 500,
  });
};

const InvalidUserCredentialError = () => {
  return GenerateHttpError({
    message: "invalid user credential.",
    httpErrorCode: 400,
  });
};

const UnauthorizedError = () => {
  return GenerateHttpError({
    message: "user not authorized.",
    httpErrorCode: 403,
  });
};

//User
const UserMetadataInvalidError = () => {
  return GenerateHttpError({
    message: "user metadata is invalid.",
    httpErrorCode: 400,
  });
};

const UserNotFoundError = () => {
  return GenerateHttpError({
    message: "user not found.",
    httpErrorCode: 404,
  });
};

const UserEmailExistError = () => {
  return GenerateHttpError({
    message: "User email exist in database.",
    httpErrorCode: 409,
  });
};

const UserDisabledError = () => {
  return GenerateHttpError({
    message: "User is disabled. Login prohibited.",
    httpErrorCode: 409,
  });
};

const PasswordInvalidError = () => {
  return GenerateHttpError({
    message: "Invalid credentials.",
    httpErrorCode: 401,
  });
};

const UserIdInvalidError = () => {
  return GenerateHttpError({
    message: "User id is invalid",
    httpErrorCode: 400,
  });
};

const StoreExistError = () => {
  return GenerateHttpError({
    message: "Store code exist in database.",
    httpErrorCode: 409,
  });
};

const StoreMetadataInvalidError = () => {
  return GenerateHttpError({
    message: "Store metadata is invalid",
    httpErrorCode: 400,
  });
};

const StoreNotFoundError = () => {
  return GenerateHttpError({
    message: "Store code does not exist in database.",
    httpErrorCode: 404,
  });
};

const StoreIdInvalidError = () => {
  return GenerateHttpError({
    message: "Store id is invalid.",
    httpErrorCode: 400,
  });
};

const EmptyPayloadError = () => {
  return GenerateHttpError({
    message: "Payload is empty.",
    httpErrorCode: 400,
  });
};

const FindUsersPayloadInvalidError = () => {
  return GenerateHttpError({
    message: "Find users payload is invalid.",
    httpErrorCode: 400,
  });
};

const ItemMetadataInvalidError = () => {
  return GenerateHttpError({
    message: "item metadata is invalid.",
    httpErrorCode: 400,
  });
};

const KitchenDoesNotExistError = () => {
  return GenerateHttpError({
    message: "Kitchen does not exist!.",
    httpErrorCode: 400,
  });
};

const FindItemsParamsInvalidError = () => {
  return GenerateHttpError({
    message: "Find items params is invalid.",
    httpErrorCode: 400,
  });
};

module.exports = {
  GenerateHttpError,
  ConvertErrorToHttpError,
  TokenInvalidError,
  RefreshTokenInvalidError,
  DefaultAuthorizationError,
  InvalidUserCredentialError,
  UnauthorizedError,
  UserMetadataInvalidError,
  UserNotFoundError,
  UserEmailExistError,
  UserDisabledError,
  PasswordInvalidError,
  UserIdInvalidError,
  StoreExistError,
  StoreMetadataInvalidError,
  StoreNotFoundError,
  StoreIdInvalidError,
  EmptyPayloadError,
  FindUsersPayloadInvalidError,
  ItemMetadataInvalidError,
  KitchenDoesNotExistError,
  FindItemsParamsInvalidError,
};