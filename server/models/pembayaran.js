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
      Pembayaran.belongsTo(Penghuni, { foreignKey: 'ID_Penghuni', onDelete: 'CASCADE' });
      Pembayaran.belongsTo(Iuran_Bulanan, { foreignKey: 'ID_Iuran', onDelete: 'CASCADE' });
    }
  }
  Pembayaran.init({
    Tanggal_Pembayaran: DataTypes.DATE,
    Jumlah_Pembayaran: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pembayaran',
  });
  return Pembayaran;
};