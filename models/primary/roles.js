"use strict";

module.exports = (sequelize, Sequelize) => {
  const tableName = "Roles";

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      unique: true,
    },
    roleName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  // table.associate = (models) => {
  //   models.Users.belongsToMany(table, {
  //     through: models.UserRoles,
  //     foreignKey: {
  //       allowNull: false,
  //       fieldName: "userId",
  //       as: "Roles",
  //     },
  //     onDelete: "CASCADE",
  //   });

  //   table.belongsToMany(models.Users, {
  //     through: models.UserRoles,
  //     foreignKey: {
  //       allowNull: false,
  //       fieldName: "roleId",
  //       as: "Users",
  //     },
  //   });
  // };

  return table;
};
