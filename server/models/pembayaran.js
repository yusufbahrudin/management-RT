'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pembayaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pembayaran.belongsTo(models.User, { foreignKey: 'UserId' });
    }
  }
  Pembayaran.init({
    Nomor_Pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Nomor Pembayaran is requied !"},
        notNull: {msg: "Nomor Pembayaran is required !"},
      }
    },
    Nama_Pembayaran: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Nama Pembayaran is requied !"},
        notNull: {msg: "Nama Pembayaran is required !"},
      }
    },
    Tanggal_Pembayaran: DataTypes.DATE,
    Jumlah_Pembayaran: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Jumlah Pembayaran is requied !"},
        notNull: {msg: "Jumlah Pembayaran is required !"},
      }
    },
    UserId: DataTypes.INTEGER,
    Status_Pembayaran: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Pembayaran',
  });
  return Pembayaran;
};