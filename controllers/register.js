const bcrypt = require("bcrypt");
const modelUser = require("../models/users");

const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;
  if (!name || !lastName || !password) {
    res
      .status(402)
      .json({
        status: false,
        message: "The filds name, lastName or password are required",
      });
  } else if (!email) {
    res
      .status(402)
      .json({ status: false, message: "The fild email is required" });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          res
            .status(200)
            .json({ status: false, message: "User already registed" });
        } else {
          bcrypt.hash(password, 10, (error, passEncrypt) => {
            if (error) {
              res.json(error);
            } else {
              const newUser = modelUser.build({
                name: name,
                lastName: lastName,
                email: email,
                password: passEncrypt,
              });
              newUser
                .save()
                .then((user) => {
                  res.status(201).json({
                    status: true,
                    message: "User created correctly",
                    user: {
                      id: user.getDataValue("id"),
                      name: user.getDataValue("name"),
                      lastName: user.getDataValue("lastName"),
                    },
                  });
                })
                .catch((error) => {
                  res.status(500).json({status: false, message: error});
                });
            }
          });
        }
      })
      .catch((error) => {
        res.status(500).json({ status: false, message: error });
      });
  }
};

module.exports = register;
