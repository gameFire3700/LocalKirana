// router/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, adminOnly, retailerOnly } = require("../middleware/authMiddleware");

// Public routes -no login required
router.get('/', productController.getAllProducts);          // GET /product
router.get('/:id', productController.getProductById);      // GET /product/:id


// ✅ Retailer Routes (can add / manage own products)
router.post("/", protect, retailerOnly, productController.createProduct);
router.put("/:id", protect, retailerOnly, productController.updateOwnProduct);
router.delete("/:id", protect, retailerOnly, productController.deleteOwnProduct);

// ✅ Admin Routes (manage all)
router.put("/admin/:id", protect, adminOnly, productController.updateProduct);
router.delete("/admin/:id", protect, adminOnly, productController.deleteProduct);

module.exports = router;
