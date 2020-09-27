"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "CuisineTypes";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true,
    },
    cuisineName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.Kitchens.belongsToMany(table, {
      through: models.KitchenCuisineTypes,
      foreignKey: {
        allowNull: false,
        fieldName: "kitchenId",
        as: "CuisineTypes",
      },
      onDelete: "CASCADE",
    });

    table.belongsToMany(models.Kitchens, {
      through: models.KitchenCuisineTypes,
      foreignKey: {
        allowNull: false,
        fieldName: "cuisineTypeId",
        as: "Kitchens",
      },
    });
  };

  return table;
};
