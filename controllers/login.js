const bcrypt = require("bcrypt");
const modelUser = require("../models/users");

const login = async (req, res) =>  {

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
                res.json({
                  status: true,
                  message: "User logged",
                  data: {
                    id: user.getDataValue("id"),
                    name: user.getDataValue("name"),
                    lastName: user.getDataValue("lastName"),
                    role: user.getDataValue("role"),
                  },
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
