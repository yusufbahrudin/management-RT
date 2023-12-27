const { Pembayaran, Rumah, User } = require("../models/index");

class Admin {
  // Create Rumah
  static async createRumah(req, res, next) {
    try {
      const { Nomor_Rumah, Nama_Pemilik, Status } = req.body;

      const newRumah = await Rumah.create({
        Nomor_Rumah,
        Nama_Pemilik,
        Status,
        UserId:req.user.id,
      });

      res.status(201).json(newRumah);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Read All Rumah
  static async getAllRumah(req, res, next) {
    try {
      const rumahs = await Rumah.findAll({
        include: [{ model: User }],
      });

      res.status(200).json(rumahs);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Read One Rumah by ID
  static async getRumahById(req, res, next) {
    try {
      const { id } = req.params;

      const rumah = await Rumah.findByPk(id, {
        include: [{ model: User }],
      });

      if (!rumah) {
        return res.status(404).json({ message: "Rumah not found" });
      }

      res.status(200).json(rumah);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Update Rumah by ID
  static async updateRumah(req, res, next) {
    try {
      const { id } = req.params;
      const { Nomor_Rumah, Nama_Pemilik, Status } = req.body;

      const rumah = await Rumah.findByPk(id);

      if (!rumah) {
        return res.status(404).json({ message: "Rumah not found" });
      }

      await rumah.update({
        Nomor_Rumah,
        Nama_Pemilik,
        Status,
      });

      res.status(200).json(rumah);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Delete Rumah by ID
  static async deleteRumah(req, res, next) {
    try {
      // console.log("udah nyampe controller");
      let id = +req.params.id;
      let rumah = await Rumah.destroy({ where: { id } });
      // console.log(product);
      if (!rumah) throw { name: "NotFound" };
      res.status(200).json({ msg: `Rumah success to delete` });
    } catch (error) {
      next(error);
    }
  }
  
  // Create Pembayaran
  static async createPembayaran(req, res, next) {
    try {
      const { Nomor_Pembayaran, Nama_Pembayaran, Tanggal_Pembayaran, Jumlah_Pembayaran, Status_Pembayaran } = req.body;

      const newPembayaran = await Pembayaran.create({
        Nomor_Pembayaran,
        Nama_Pembayaran,
        Tanggal_Pembayaran,
        Jumlah_Pembayaran,
        Status_Pembayaran,
      });

      res.status(201).json(newPembayaran);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Read All Pembayaran
  static async getAllPembayaran(req, res, next) {
    try {
      const pembayarans = await Pembayaran.findAll();

      res.status(200).json(pembayarans);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Read One Pembayaran by ID
  static async getPembayaranById(req, res, next) {
    try {
      const { id } = req.params;

      const pembayaran = await Pembayaran.findByPk(id);

      if (!pembayaran) {
        return res.status(404).json({ message: "Pembayaran not found" });
      }

      res.status(200).json(pembayaran);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Update Pembayaran by ID
  static async updatePembayaran(req, res, next) {
    try {
      const { id } = req.params;
      const { Nomor_Pembayaran, Nama_Pembayaran, Tanggal_Pembayaran, Jumlah_Pembayaran, Status_Pembayaran } = req.body;

      const pembayaran = await Pembayaran.findByPk(id);

      if (!pembayaran) {
        return res.status(404).json({ message: "Pembayaran not found" });
      }

      await pembayaran.update({
        Nomor_Pembayaran,
        Nama_Pembayaran,
        Tanggal_Pembayaran,
        Jumlah_Pembayaran,
        Status_Pembayaran,
      });

      res.status(200).json(pembayaran);
    } catch (error) {
      console.log(error.name, "<<<< error ini");
      next(error);
    }
  }

  // Delete Pembayaran by ID
  static async deletePembayaran(req, res, next) {
    try {
      // console.log("udah nyampe controller");
      let id = +req.params.id;
      let user = await User.destroy({ where: { id } });
      // console.log(product);
      if (!user) throw { name: "NotFound" };
      res.status(200).json({ msg: ` Pembayaran success to delete` });
    } catch (error) {
      next(error);
    }
  }
  
}

module.exports = Admin;

