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
      Rumah.hasMany(Penghuni, { foreignKey: 'ID_Rumah' });
    }
  }
  Rumah.init({
    Nomor_Rumah: DataTypes.STRING,
    Status_Occupancy: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Rumah',
  });
  return Rumah;
};