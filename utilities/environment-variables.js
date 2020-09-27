'use strict';

const yup = require('yup');

const getEnvVariableSync = (fieldName) => {
  if (yup.string().required().min(1).isValidSync(process.env[fieldName])) {
    return process.env[fieldName];
  }

  return null;
};

const getEnvVariableAsString = ({ fieldName, defaultValue }) => {
  const value = getEnvVariableSync(fieldName);

  if (!value) {
    return defaultValue;
  }

  return value;
};

const getEnvVariableAsInteger = ({ fieldName, defaultValue, minValue = 0 }) => {
  const value = getEnvVariableSync(fieldName);

  if (!value) {
    return defaultValue;
  }

  const isNumber = yup.number().required().integer().min(minValue).isValidSync(value);

  if (!isNumber) {
    return defaultValue;
  }

  return Number.parseInt(value, 10);
};

const getEnVarAsBoolean = ({ fieldName, defaultValue = false }) => {
  const value = getEnvVariableAsInteger({ fieldName, defaultValue: !defaultValue ? 0 : 1 });

  if (!value) {
    return defaultValue;
  }

  return value == 1 ? true : false;
};

module.exports = {
  getEnvVariableSync,
  getEnvVariableAsString,
  getEnvVariableAsInteger,
  getEnVarAsBoolean,
};
