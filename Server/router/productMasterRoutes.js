const express = require("express");
const router = express.Router();

const {
  createProductMaster,
  getAllProductMasters,
  getProductMasterById,
  updateProductMaster,
  deleteProductMaster
} = require("../controllers/productMasterController");

// 🔐 Middleware placeholders
// const { isAdmin } = require("../middleware/auth");

const {
  adminProtect,
  authorizeRoles
} = require("../middleware/adminMiddleware");

/* ================================
   ADMIN ROUTES
================================ */

// Admin create product master
router.post(
  "/create",
  adminProtect,

  /* isAdmin, */
  createProductMaster
);

// Get all product masters (admin / seller)
router.get(
  "/",
  getAllProductMasters
);

// Get single product master
router.get(
  "/:id",
  getProductMasterById
);

router.put(
  "/:id",
  adminProtect,
  
  updateProductMaster
);

router.delete(
  "/:id",
  adminProtect,

  deleteProductMaster
);

module.exports = router;
