"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "OrderStatuses";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  return table;
};
