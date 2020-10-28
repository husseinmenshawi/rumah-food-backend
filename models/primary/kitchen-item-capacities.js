"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "KitchenItemCapacities";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    startDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    endDateTime: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    orderDateTime: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.KitchenItems.hasMany(table);
    table.belongsTo(models.KitchenItems, { foreignKey: "kitchenItemId" });

    models.Users.hasMany(table);
    table.belongsTo(models.Users);
  };

  return table;
};
