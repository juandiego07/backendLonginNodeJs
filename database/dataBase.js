const { Sequelize } = require("sequelize");

const HOST = "localhost";
const NAME_DATABASE = "login-register";
const USER_DATABASE = "root";
const PASSWORD_DATABASE = "";
const DIALECT = "mysql";

const dataBase = new Sequelize(NAME_DATABASE, USER_DATABASE, PASSWORD_DATABASE, {
  host: HOST,
  dialect: DIALECT,
});

module.exports = dataBase;
