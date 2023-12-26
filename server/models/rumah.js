'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rumah extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rumah.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Rumah.init({
    Nomor_Rumah: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Nomor Rumah must be unique."
      },
      validate: {
        notEmpty: { msg: "Nomor Rumah is requied !"},
        notNull: {msg: "Nomor Rumah is required !"},
      }
    },
    Nama_Pemilik: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Nama Pemilik must be unique."
      },
      validate: {
        notEmpty: { msg: "Nama Pemilik  is requied !"},
        notNull: {msg: "Nama Pemilik is required !"},
      }
    },
    Status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Rumah',
  });
  return Rumah;
};