const bcrypt = require("bcrypt");
const modelUser = require("../models/users");
const { sign } = require("./tokenJwt");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({
      status: false,
      message: "The filds email or password are required",
    });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          res.json({ status: false, message: "User no found" });
        } else {
          bcrypt
            .compare(password, user.getDataValue("password"))
            .then((isCorrect) => {
              if (isCorrect) {
                const token = sign({
                  id: user.getDataValue("id"),
                  name: user.getDataValue("name"),
                  lastName: user.getDataValue("lastName"),
                  email: user.getDataValue("email"),
                  roleId: user.getDataValue("roleId"),
                });
                return res.status(200).json({
                  status: true,
                  message: "User logged",
                  token,
                });
              } else {
                res.json({ status: false, message: "Password invalid" });
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
};

module.exports = login;
