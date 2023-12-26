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
router.get("/rumah/:rumahId", Admin.getRumahById);
router.put("/rumah/:rumahId", Admin.updateRumah);
router.delete("/rumah/:id", Admin.deleteRumah);

// User Routes
router.post("/user", Admin.createUser);
router.get("/user", Admin.getAllUsers);
router.get("/user/:userId", Admin.getUserById);
router.put("/user/:userId", Admin.updateUser);
router.delete("/user/:id", Admin.deleteUser);

// Pembayaran Routes
router.post("/pembayaran", Admin.createPembayaran);
router.get("/pembayaran", Admin.getAllPembayaran);
router.get("/pembayaran/:pembayaranId", Admin.getPembayaranById);
router.put("/pembayaran/:pembayaranId", Admin.updatePembayaran);
router.delete("/pembayaran/:id", Admin.deletePembayaran);

module.exports = router;
