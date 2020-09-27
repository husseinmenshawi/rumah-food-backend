'use strict';

module.exports = (sequelize, Sequelize) => {
  const tableName = 'UserRoles';

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

  table.associate = models => {
    models.Users.hasMany(table);
    table.belongsTo(models.Users);

    models.Roles.hasMany(table);
    table.belongsTo(models.Roles);
  };

  return table;
};
