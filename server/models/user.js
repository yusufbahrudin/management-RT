'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require("../helpers/hash")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Rumah, { foreignKey: 'UserId' });
      User.hasMany(models.Pembayaran, { foreignKey: 'UserId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "Username is required"},
        notEmpty: {msg : "please enter your username"},
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "password is required"},
        notEmpty: {msg : "please enter your password"},
      },
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate: (user)=>{
        user.password = hash(user.password)
      }
    }
  });
  return User;
};