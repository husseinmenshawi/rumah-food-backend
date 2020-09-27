module.exports = (sequelize, Sequelize) => {
  const tableName = "Kitchens";

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
      allowNull: true,
      unique: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
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

  return table;
};
