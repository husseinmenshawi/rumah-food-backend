"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize } = require("sequelize");
const config = require("../../config");
const {
  db: { primary: primaryDbConfig },
} = config;

const db = {};

const sequelizeInstance = new Sequelize(primaryDbConfig.dbUri, {
  dialect: "mssql",
  dialectOptions: { options: { encrypt: true, requestTimeout: 120000 } },
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    const model = sequelizeInstance["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelizeInstance = sequelizeInstance;
db.Sequelize = Sequelize;

module.exports = db;
