const express = require("express");
const router = express.Router();

const retailerProductController = require("../controllers/retailerProductController");
const { protect, isRetailer } = require("../middleware/authMiddleware");

/* 🟢 Retailer */
router.post("/", protect, isRetailer, retailerProductController.addRetailerProduct);
router.get("/my-products", protect, isRetailer, retailerProductController.getMyRetailerProducts);
router.put("/:id", protect, isRetailer, retailerProductController.updateRetailerProduct);
router.delete("/:id", protect, isRetailer, retailerProductController.deleteRetailerProduct);

module.exports = router;
