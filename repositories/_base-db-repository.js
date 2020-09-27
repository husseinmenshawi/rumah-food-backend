"use strict";

const isEqual = require("lodash/isEqual");

const primaryDbSetup = require("../models/primary");

module.exports = class BaseDbRepository {
  constructor(defaultPageSize = 50) {
    this._defaultPageSize = defaultPageSize;
  }

  get PrimaryDbInstance() {
    return primaryDbSetup.sequelizeInstance;
  }

  get PrimaryDbModels() {
    return primaryDbSetup.sequelizeInstance.models;
  }

  get SequelizeUtils() {
    return {
      Op: Sequelize.Op,
      QueryTypes: Sequelize.QueryTypes,
    };
  }

  get DefaultPageSize() {
    return this.DefaultPageSize;
  }

  handleSingObjectReturn({ dbResult, returnAsJson }) {
    if (!dbResult || !returnAsJson) {
      return dbResult;
    }

    return dbResult.toJSON();
  }
  handleArrayObjectReturn({ dbResult, returnAsJson }) {
    if (!dbResult || !returnAsJson) {
      return dbResult;
    }
    return dbResult.map((x) => {
      return x.toJSON();
    });
  }

  async handleFindOrCreate(payload, row, created, ignoreUpdates = false) {
    if (ignoreUpdates || created) {
      return {
        row,
        created,
      };
    }

    const payloadKeys = Object.keys(payload);
    const numberOfPayloadKeys = payloadKeys.length;
    let changesFound = false;

    for (let i = 0; i < numberOfPayloadKeys; i++) {
      const payloadKey = payloadKeys[i];
      const referenceValue = payload[payloadKey];
      const currentValue = row[payloadKey];

      if (isEqual(referenceValue, currentValue)) {
        continue;
      }

      row[payloadKey] = referenceValue;
      changesFound = true;
    }

    if (!changesFound) {
      return {
        row,
        created,
      };
    }

    const result = await row.save();

    return {
      row: result,
      created,
    };
  }
};
