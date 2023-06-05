const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { name, lastName, email, password, role } = req.body;
  console.log({ name, lastName, email, password, role });
  if (!name || !lastName || !password || !role) {
    res.json({ message: "The filds name, lastName or password are required" });
  } else if (!email) {
    res.json({ message: "The fild email is required" });
  } else {
    modelUser
      .findOne({ where: { email: email } })
      .then((user) => {
        if (user) {
          res.json({ message: "User already registed" });
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
                role: role,
              });
              newUser
                .save()
                .then((user) => {
                  res.json({
                    message: "User created correctly",
                    user: {
                      id: user.getDataValue("id"),
                      name: user.getDataValue("name"),
                      lastName: user.getDataValue("lastName"),
                      role: user.getDataValue("role"),
                    },
                  });
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
};

module.exports = register;
