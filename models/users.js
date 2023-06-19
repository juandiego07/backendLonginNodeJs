const dataBase = require("../database/dataBase");
const { DataTypes } = require("sequelize");

// Se define el modelo de la base de datos
const users = dataBase.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  roleId: { type: DataTypes.STRING, allowNull: true },
  createdAt: { type: DataTypes.TIME, allowNull: false },
  updatedAt: { type: DataTypes.TIME, allowNull: false },
});

module.exports = users;
