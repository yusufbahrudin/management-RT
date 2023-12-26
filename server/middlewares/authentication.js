const { verifyToken } = require("../helpers/token");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "Unauthorized", message: "Invalid Token" };
    }

    const payload = verifyToken(access_token);

    if (!payload || !payload.id) {
      throw { name: "Unauthorized", message: "Invalid Token Payload" };
    }

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "Unauthorized", message: "User not found" };
    }

    // Set user information in req.user
    req.user = {
      id: user.id,
      role: user.role,
      username: user.username,
    };

    console.log(req.user); // Tambahkan log ini untuk melihat isi req.user

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authentication };
