"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "KitchenItems";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    itemName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    itemPrice: {
      type: Sequelize.DECIMAL(6, 2),
      allowNull: false,
    },
    itemDesc: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isEnabled: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.Kitchens.hasMany(table);
    table.belongsTo(models.Kitchens, { foreignKey: "kitchenId" });
  };

  return table;
};
