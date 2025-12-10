const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { retailerProtect } = require('../middleware/retailerMiddleware');
const { adminProtect } = require('../middleware/adminMiddleware');
const adminProductController = require('../controllers/adminProductController');
const upload = require("../middleware/upload");

// ================== RETAILER ROUTES ==================

router.get('/retailer/my-products', retailerProtect, productController.getMyProducts);

router.post('/retailer/create', retailerProtect, upload.single("image"), productController.createProduct);

router.put('/retailer/update/:id', retailerProtect, productController.updateOwnProduct);
router.delete('/retailer/delete/:id', retailerProtect, productController.deleteOwnProduct);


// ================== PUBLIC ROUTES (KEEP LAST) ==================

router.get('/', productController.getAllProducts);
router.get('/product/:id', productController.getProductById);   // SAFE FIX


module.exports = router;
