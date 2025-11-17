const express = require('express');
const router = express.Router();
const {
  registerRetailer,
  loginRetailer,
  retailerProfile
} = require('../controllers/retailerAuthController');

const { retailerProtect } = require('../middleware/retailerProtect');

router.post("/register", registerRetailer);
router.post("/login", loginRetailer); 

// protected
router.get("/profile", retailerProtect, retailerProfile); 

module.exports = router;
