const express = require('express');
const router = express.Router();
const retailerController = require('../controllers/retailerController');

// CRUD Routes
router.post('/', retailerController.addRetailer);
router.get('/', retailerController.getAllRetailers);
router.get('/:id', retailerController.getRetailerById);
router.put('/:id', retailerController.updateRetailer);
router.delete('/:id', retailerController.deleteRetailer);

module.exports = router;

