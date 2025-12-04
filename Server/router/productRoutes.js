const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { retailerProtect } = require('../middleware/retailerMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');
const adminProductController = require('../controllers/adminProductController');
const upload = require("../middleware/upload");

// ================== PUBLIC ROUTES ==================
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// ================== RETAILER ROUTES ==================

// Get logged-in retailer products (NO :id PARAM)
router.get('/retailer/my-products', retailerProtect, productController.getMyProducts);

// Create Product
router.post('/retailer/create', retailerProtect, upload.single("image"), productController.createProduct);

// Update & Delete only own product
router.put('/retailer/update/:id', retailerProtect, productController.updateOwnProduct);
router.delete('/retailer/delete/:id', retailerProtect, productController.deleteOwnProduct);

// ================== ADMIN ROUTES ==================
router.put('/admin/:id', adminProtect, productController.updateProduct);
router.delete('/admin/:id', adminProtect, productController.deleteProduct);

router.put('/admin/approve/:id', adminProtect, adminProductController.approveProduct);
router.put('/admin/reject/:id', adminProtect, adminProductController.rejectProduct);

module.exports = router;
