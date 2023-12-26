'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pembayarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Tanggal_Pembayaran: {
        type: Sequelize.DATE
      },
      Jumlah_Pembayaran: {
        type: Sequelize.INTEGER
      },
      Nomor_Pembayaran: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
      },
      Nama_Pembayaran:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      Status_Pembayaran: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pembayarans');
  }
};