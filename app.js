const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();

// Parsea el body de una peticion http
app.use(bodyParser.json());

// Configuracion de la base de datos
const dataBase = new Sequelize('login-register', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

// Se define el modelo de la base de datos
const modelUser = dataBase.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.TIME, allowNull: false },
  updatedAt: { type: DataTypes.TIME, allowNull: false },
});

// Conexion con la base de datos
try {
  dataBase.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Registro de usaurio
app.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !password || !role) {
    res.json({ message: 'The filds name or password are required' });
  } else if (!email) {
    res.json({ message: 'The filds email is required' });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          res.json({ message: 'User already registed' });
        } else {
          bcrypt.hash(password, 10, (error, passEncrypt) => {
            if (error) {
              res.json(error);
            } else {
              const newUser = modelUser.build({
                name: name,
                email: email,
                password: passEncrypt,
                role: role,
              });
              newUser
                .save()
                .then((user) => {
                  res.json({ message: 'User created correctly', user });
                })
                .catch((error) => {
                  console.log(error);
                });
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ message: 'The filds email or password are required' });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          res.json({ message: 'User no found' });
        } else {
          bcrypt
            .compare(password, user.getDataValue('password'))
            .then((isCorrect) => {
              if (isCorrect) {
                if (user.getDataValue('role') === 'Admin') {
                  modelUser
                    .findAll({ attributes: ['name', 'email', 'role'] })
                    .then((users) => {
                      res.json({
                        id: user.getDataValue('id'),
                        name: user.getDataValue('name'),
                        data: users,
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } else {
                  res.json({
                    id: user.getDataValue('id'),
                    name: user.getDataValue('name'),
                  });
                }
              } else {
                res.json({ message: 'Password invalid' });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

app.listen(5000, () => {
  console.log('Server running http://localhost:5000');
});
