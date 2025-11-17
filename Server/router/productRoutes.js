const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { retailerProtect } = require('../middleware/retailerMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');
const adminProductController = require('../controllers/adminProductController');

// Public Routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Retailer Routes
router.post('/', retailerProtect, productController.createProduct);
router.put('/:id', retailerProtect, productController.updateOwnProduct);
router.delete('/:id', retailerProtect, productController.deleteOwnProduct);

// Admin Routes
router.put('/admin/:id', adminProtect, productController.updateProduct);
router.delete('/admin/:id', adminProtect, productController.deleteProduct);

router.put('/admin/approve/:id', adminProtect, adminProductController.approveProduct);
router.put('/admin/reject/:id', adminProtect, adminProductController.rejectProduct);



module.exports = router;
