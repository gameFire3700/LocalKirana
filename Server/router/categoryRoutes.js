const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  createCategory,
  getAllCategories
} = require("../controllers/categoryController");

const { adminProtect, authorizeRoles } = require("../middleware/adminMiddleware");

// 🔐 isAdmin middleware baad me laga sakte ho
router.post("/create", adminProtect, 
  upload.single("image"), createCategory);

router.get("/", adminProtect, getAllCategories);

module.exports = router;
