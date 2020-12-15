"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "Reviews";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    stars: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.Users.hasMany(table);
    table.belongsTo(models.Users, { foreignKey: "userId" });

    models.Kitchens.hasMany(table);
    table.belongsTo(models.Kitchens, { foreignKey: "kitchenId" });

    models.KitchenItems.hasMany(table);
    table.belongsTo(models.KitchenItems, { foreignKey: "kitchenItemId" });

    models.Orders.hasMany(table);
    table.belongsTo(models.Orders, { foreignKey: "orderId" });
  };

  return table;
};
