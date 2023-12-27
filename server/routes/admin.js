const router = require("express").Router();
const { authentication } = require("../middlewares/authentication");
const { Auth, Admin } = require("../controllers/index");

// Authentication Routes
router.post("/register", Auth.register);
router.post("/login", Auth.login);


router.use(authentication);
// Rumah Routes
router.post("/rumah", Admin.createRumah);
router.get("/rumah", Admin.getAllRumah);
router.get("/rumah/:id", Admin.getRumahById);
router.put("/rumah/:id", Admin.updateRumah);
router.delete("/rumah/:id", Admin.deleteRumah);

// Pembayaran Routes
router.post("/pembayaran", Admin.createPembayaran);
router.get("/pembayaran", Admin.getAllPembayaran);
router.get("/pembayaran/:id", Admin.getPembayaranById);
router.put("/pembayaran/:id", Admin.updatePembayaran);
router.delete("/pembayaran/:id", Admin.deletePembayaran);

module.exports = router;
