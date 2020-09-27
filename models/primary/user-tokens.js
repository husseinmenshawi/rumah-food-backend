module.exports = (sequelize, Sequelize) => {
  const tableName = 'UserTokens';

  const tableDefintion = {
    id: {
      primaryKey: true,
      type: Sequelize.STRING(512),
      unique: true,
    },
    expirationDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    ttl: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    refreshToken: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    userAgent: {
      type: Sequelize.STRING,
      allowNull: true,
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
    models.Users.hasMany(table, {
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
