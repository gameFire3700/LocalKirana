const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/adminAuthController");
const { adminProtect } = require("../middleware/adminMiddleware");
const { approveProduct, rejectProduct } = require("../controllers/adminProductController");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

router.put("/admin/approve/:id", adminProtect, approveProduct);
router.put("/admin/reject/:id", adminProtect, rejectProduct)

module.exports = router;
