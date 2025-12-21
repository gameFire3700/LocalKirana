const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // 👈 tumhara multer file

const {
  requestAddRetailerProduct,
  getPendingRetailerProducts,
  updateRetailerProductStatus,
  getRetailerProducts,
  updateRetailerProduct,
  deleteRetailerProduct
} = require("../controllers/retailerProductController");


// 🔐 Middleware placeholders
// const { isRetailer, isAdmin } = require("../middleware/auth");


const { retailerProtect } = require("../middleware/retailerMiddleware");
const { adminProtect, authorizeRoles } = require("../middleware/adminMiddleware");

/* ===============================
   RETAILER
================================ */


router.post(
  "/request",
  /* isRetailer, */
  retailerProtect,
  upload.single("image"),
  requestAddRetailerProduct
);


router.get(
  "/my-products",
  /* isRetailer, */
  retailerProtect,
  getRetailerProducts
);

/* ===============================
   ADMIN
================================ */
router.get(
  "/admin/pending",
  adminProtect,
  /* isAdmin, */
  getPendingRetailerProducts
);

router.patch(
  "/admin/:id/status",
  adminProtect,
  authorizeRoles("admin"),
  /* isAdmin, */
  updateRetailerProductStatus
);

// Update product
router.put("/:id", retailerProtect, updateRetailerProduct);

// Delete product
router.delete("/:id", retailerProtect, deleteRetailerProduct);

module.exports = router;
