"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "Flavours";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true,
    },
    flavourName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.KitchenItems.belongsToMany(table, {
      through: models.KitchenItemFlavours,
      foreignKey: {
        allowNull: false,
        fieldName: "kitchenItemId",
        as: "KitchenItemFlavours",
      },
      onDelete: "CASCADE",
    });

    table.belongsToMany(models.KitchenItems, {
      through: models.KitchenItemFlavours,
      foreignKey: {
        allowNull: false,
        fieldName: "flavourId",
        as: "KitchenItems",
      },
    });
  };

  return table;
};
