const express = require("express");
const router = express.Router();

const {
  getPendingRetailerProducts,
  approveRetailerProduct,
  getApprovedRetailerProducts,
  getRejectedRetailerProducts,
  rejectRetailerProduct,
  getRetailerProductById
} = require("../controllers/adminRetailerProductController");

const {
  adminProtect,
  authorizeRoles
} = require("../middleware/adminMiddleware");

// GET pending retailer products
router.get(
  "/pending",
  adminProtect,
  getPendingRetailerProducts
);

router.get("/approved", adminProtect,getApprovedRetailerProducts);

router.get("/rejected", adminProtect,getRejectedRetailerProducts);

// APPROVE retailer product
router.put(
  "/approve/:id",
  adminProtect,
  approveRetailerProduct
);

// REJECT retailer product
router.put(
  "/reject/:id",
  adminProtect,
  rejectRetailerProduct
);

router.get("/:id", getRetailerProductById);

module.exports = router;
