"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "Orders";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    orderDateTime: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    reviewComment: {
      type: Sequelize.STRING,
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
    table.belongsTo(models.Users, { foreignKey: "userId" });

    models.OrderStatuses.hasOne(table);
    table.belongsTo(models.OrderStatuses, { foreignKey: "orderStatusId" });

    models.Flavours.hasOne(table);
    table.belongsTo(models.Flavours, { foreignKey: "flavourId" });
  };

  return table;
};
