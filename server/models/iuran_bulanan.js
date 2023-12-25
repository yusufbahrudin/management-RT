'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Iuran_Bulanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Iuran_Bulanan.hasMany(Pembayaran, { foreignKey: 'ID_Iuran' });
    }
  }
  Iuran_Bulanan.init({
    Nama_Iuran: DataTypes.STRING,
    Jumlah_Iuran: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Iuran_Bulanan',
  });
  return Iuran_Bulanan;
};