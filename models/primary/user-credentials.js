module.exports = (sequelize, Sequelize) => {
  const tableName = 'UserCredentials';

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  };

  const table = sequelize.define(tableName, tableDefintion, {
    underscored: true,
  });

  table.associate = models => {
    models.Users.hasOne(table, {
      foreignKey: {
        allowNull: false,
        fieldName: 'userId',
      },
      onDelete: 'CASCADE',
    });

    table.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false,
        fieldName: 'userId',
      },
    });
  };

  return table;
};
