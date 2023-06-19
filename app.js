const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const controllers = require("./controllers/");
const dataBase = require("./database/dataBase");


const app = express();
var cookieParser = require("cookie-parser");
app.use(express.json(), cors(), cookieParser());

// Registro de usaurio
app.post("/register", controllers.register);

// Login de usuario
app.post("/login", controllers.login);

// Se obtienen todos los usuarios
app.post("/getallusers", controllers.getAllUsers);


app.listen(5000, async () => {
  console.log("Server running http://localhost:5000");
  try {
    await dataBase.authenticate();
  } catch (error) {
    console.error(error);
  }
});
