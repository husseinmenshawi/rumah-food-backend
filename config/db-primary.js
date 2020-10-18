"use strict";

const { EnvVariable } = require("../utilities");

const dbConfig = {
  dbDialect: EnvVariable.getEnvVariableAsString({
    defaultValue: "mssql",
    fieldName: "PRIMARY_DB_DIALECT",
  }),
  dbUser: EnvVariable.getEnvVariableAsString({
    defaultValue: "sa",
    fieldName: "PRIMARY_DB_USER",
  }),
  dbPassword: EnvVariable.getEnvVariableAsString({
    defaultValue: "Pintu123!",
    fieldName: "PRIMARY_DB_PASSWORD",
  }),
  dbHost: EnvVariable.getEnvVariableAsString({
    defaultValue: "localhost",
    fieldName: "PRIMARY_DB_HOST",
  }),
  dbPort: EnvVariable.getEnvVariableAsInteger({
    defaultValue: 1433,
    fieldName: "PRIMARY_DB_PORT",
  }),
  dbName: EnvVariable.getEnvVariableAsString({
    defaultValue: "rumah-food-db",
    fieldName: "PRIMARY_DB_NAME",
  }),
  dbUri: null,
  dbSyncEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_SYNC_ENABLED",
    defaultValue: false,
  }),
  dbMasterDataRoleSeedEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_MASTER_DATA_ROLE_SEED_ENABLED",
    defaultValue: false,
  }),
  dbMasterDataRoleSeedOverwriteEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_MASTER_DATA_ROLE_SEED_OVERWRITE_ENABLED",
    defaultValue: false,
  }),
  dbMasterDataCuisineTypeSeedEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_MASTER_DATA_CUISINE_TYPE_SEED_ENABLED",
    defaultValue: false,
  }),
  dbMasterDataCuisineTypeSeedOverwriteEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_MASTER_DATA_CUISINE_TYPE_SEED_OVERWRITE_ENABLED",
    defaultValue: false,
  }),
  dbMasterDataFlavourSeedEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_MASTER_DATA_FLAVOUR_SEED_ENABLED",
    defaultValue: false,
  }),
  dbMasterDataFlavourSeedOverwriteEnabled: EnvVariable.getEnVarAsBoolean({
    fieldName: "PRIMARY_DB_MASTER_DATA_FLAVOUR_SEED_OVERWRITE_ENABLED",
    defaultValue: false,
  }),
  dbDefaultSuperUser: {
    seedEnabled: EnvVariable.getEnVarAsBoolean({
      defaultValue: false,
      fieldName: "PRIMARY_DB_SUPER_USER_SEED_ENABLED",
    }),
    email: EnvVariable.getEnvVariableAsString({
      defaultValue: "menshawi98@gmail.com",
      fieldName: "PRIMARY_DB_SUPER_USER_SEED_EMAIL",
    }),
    password: EnvVariable.getEnvVariableAsString({
      defaultValue: "Test123!",
      fieldName: "PRIMARY_DB_SUPER_USER_SEED_PASSWORD",
    }),
  },
  // dbMasterDataOrderTypesSeedEnabled: EnvVariable.getEnVarAsBoolean({
  //   fieldName: 'PRIMARY_DB_MASTER_DATA_ORDER_TYPES_SEED_ENABLED',
  //   defaultValue: false,
  // }),
  // dbMasterDataOrderTypesSeedOverwriteEnabled: EnvVariable.getEnVarAsBoolean({
  //   fieldName: 'PRIMARY_DB_MASTER_DATA_ORDER_TYPES_SEED_OVERWRITE_ENABLED',
  //   defaultValue: false,
  // }),
};

function getDbUri() {
  return [
    dbConfig.dbDialect,
    "://",
    encodeURIComponent(dbConfig.dbUser),
    ":",
    encodeURIComponent(dbConfig.dbPassword),
    "@",
    dbConfig.dbHost,
    ":",
    dbConfig.dbPort,
    "/",
    dbConfig.dbName,
  ].join("");
}

dbConfig.dbUri = getDbUri();

module.exports = dbConfig;
