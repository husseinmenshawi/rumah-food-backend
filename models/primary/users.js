module.exports = (sequelize, Sequelize) => {
  const tableName = "Users";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.DECIMAL(38, 0),
      autoIncrement: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      // unique: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    addressLine1: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    addressLine2: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    addressLine3: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = (models) => {
    models.Roles.hasOne(table);
    table.belongsTo(models.Roles, { foreignKey: "roleId" });

    models.Kitchens.hasOne(table);
    table.belongsTo(models.Kitchens, { foreignKey: "kitchenId" });
  };

  return table;
};
