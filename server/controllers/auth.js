const { User } = require("../models/index");
const { compareHash } = require("../helpers/hash");
const { createToken } = require("../helpers/token");

class Auth {
    static async register(req, res, next) {
      // console.log(req.body);
      const { username, password, role } = req.body;
      try {
        if (!username || !password) {
          throw { name: "UsernamePasswordRequired" };
        }
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
          throw { name: "UsernameAlreadyExists" };
        }
        let user = await User.create({
          username,
          password,
          role,
        });
        // res.json(user)
        res.status(201).json({
          user: {
            id: user.id,
            user: user.username,
          },
        });
      } catch (error) {
        next(error);
      }
    }
    static async login(req, res, next) {
      try {
        const { username, password } = req.body;
        if (!username || !password) {
          throw { name: "UsernamePasswordRequired" };
        }
  
        let user = await User.findOne({ where: { username: username } });
  
        if (!user || !compareHash(password, user.password)) {
          throw { name: "InvalidUserPassword" };
        }
  
        let access_token = createToken({ id: user.id });
        console.log(access_token);
        res
          .status(200)
          .json({
            access_token,
          });
      } catch (error) {
        console.log(error);
        next(error);
      }
    }
  }
  
  module.exports = Auth;
  