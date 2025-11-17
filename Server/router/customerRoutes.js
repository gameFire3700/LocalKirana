const express = require('express');
const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');

const { adminProtect } = require("../middleware/adminMiddleware");

// 🟢 Public → Register Customer
router.post('/', addCustomer);

// 🔵 Admin Only Routes
router.get('/', adminProtect, getAllCustomers);
router.get('/:id', adminProtect, getCustomerById);
router.put('/:id', adminProtect, updateCustomer);
router.delete('/:id', adminProtect, deleteCustomer);

module.exports = router;
