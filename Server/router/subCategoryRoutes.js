const express = require("express");
const router = express.Router();

const {
  createSubCategory,
  getSubCategoriesByCategory
} = require("../controllers/subCategoryController");

const { adminProtect, authorizeRoles } = require("../middleware/adminMiddleware");

router.post(
  "/create",
  adminProtect,
  createSubCategory
);

router.get(
  "/by-category/:categoryId",
  adminProtect,
  getSubCategoriesByCategory
);

module.exports = router;
