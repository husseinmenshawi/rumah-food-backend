"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "KitchenItemFlavours";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.KitchenItems.hasMany(table);
    table.belongsTo(models.KitchenItems);

    models.Flavours.hasMany(table);
    table.belongsTo(models.Flavours);
  };

  return table;
};
