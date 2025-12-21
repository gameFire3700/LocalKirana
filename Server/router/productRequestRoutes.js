const express = require("express");
const router = express.Router();

/* ✅ CONTROLLER — THIS WAS MISSING */
const productRequestController = require(
  "../controllers/productRequestController"
);

/* ✅ MIDDLEWARES */
const { protect } = require("../middleware/authMiddleware");
const { retailerProtect } = require("../middleware/retailerMiddleware");
const upload = require("../middleware/upload");

/* ===============================
   ROUTE: Retailer → Add Product
================================ */
router.post(
  "/",
  protect,
  retailerProtect,
  upload.single("image"),
  productRequestController.createRequest
);

module.exports = router;
