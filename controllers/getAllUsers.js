const modelUsers = require("../models/users");
const { verify } = require("./tokenJwt");

const getAllUsers = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const payload = verify(token);
  if (Date.now() > payload.exp) {
    return res.status(401).json({
      status: false,
      message: "Token expired",
    });
  } else if (payload.roleId === 1) {
    await modelUsers
      .findAll({ attributes: ["id", "name", "lastName", "email", "roleId"] })
      .then((users) => {
        res.status(200).json({
          status: true,
          roleId: payload.roleId,
          message: "All users registered",
          data: users,
        });
      })
      .catch((error) => console.error(error));
  } else {
    return res.status(200).json({
      status: true,
      roleId: payload.roleId,
      message: "User without Admin role",
      data: null,
    });
  }
};

module.exports = getAllUsers;
