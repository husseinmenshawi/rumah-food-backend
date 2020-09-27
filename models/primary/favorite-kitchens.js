"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "FavoriteKitchens";

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
    models.Kitchens.hasMany(table);
    table.belongsTo(models.Kitchens, { foreignKey: "kitchenId" });

    models.Users.hasMany(table);
    table.belongsTo(models.Users, { foreignKey: "userId" });
  };

  return table;
};
