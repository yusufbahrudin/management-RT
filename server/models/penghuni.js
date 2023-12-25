'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penghuni extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penghuni.belongsTo(Rumah, { foreignKey: 'ID_Rumah', onDelete: 'CASCADE' });
      Rumah.hasMany(Penghuni, { foreignKey: 'ID_Rumah' });

    }

  }
  Penghuni.init({
    Nama_Penghuni: DataTypes.STRING,
    Tanggal_Mulai_Sewa: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Penghuni',
  });
  return Penghuni;
};