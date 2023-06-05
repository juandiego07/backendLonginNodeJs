const express = require("express");
const cors = require("cors");
const controllers = require("./controllers/");
const dataBase = require("./database/dataBase");

const app = express();
app.use(express.json(), cors());

// Registro de usaurio
app.post("/register", controllers.register);

// Login de usuario
app.post("/login", controllers.login);

app.listen(5000, async () => {
  console.log("Server running http://localhost:5000");
  try {
   await dataBase.authenticate();
  } catch (error) {
    console.error(error);
  }
});
