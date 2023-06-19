const jwt = require("jsonwebtoken");

const SECRET = "jwtSecretPassword";

const sign = ({ id, name, lastName, email, roleId }) => {
  return jwt.sign(
    {
      id,
      name,
      lastName,
      email,
      roleId,
      exp: Math.floor(Date.now() + 60 * 1000), // Math.floor(Date.now() / 1000) + 60,
    },
    SECRET
  );
};

const verify = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { sign, verify };
