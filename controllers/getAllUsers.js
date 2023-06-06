const modelUsers = require("../models/users");

const getAllUsers = async (req, res) => {
  await modelUsers
    .findAll({ attributes: ["name", "lastName", "email", "role"] })
    .then((users) => {
      res.json({
        status: true,
        message: "",
        data: users
      });
    })
    .catch((error) => console.error(error));
};

module.exports = getAllUsers;
