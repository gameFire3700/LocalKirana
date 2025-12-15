const express = require("express");
const rateLimit = require("express-rate-limit");
const { registerAdmin, loginAdmin } = require("../controllers/adminAuthController");
const { adminProtect, authorizeRoles, requireAdminSecret } = require("../middleware/adminMiddleware");
const { approveProduct, rejectProduct } = require("../controllers/adminProductController");
const { getAllRetailers } = require("../controllers/adminRetailerController");
const {getPendingProducts}= require ("../controllers/adminProductController");
const {getApprovedProducts}= require ("../controllers/adminProductController");
const {getRejectedProducts}= require ("../controllers/adminProductController");


const router = express.Router();
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { message: "Too many attempts, try again later" },
});


// Register: require secret key (see middleware)
router.post("/register", requireAdminSecret, registerAdmin);


// Login: public but rate-limited in controller (or use express-rate-limit at route level)
router.post("/login", loginAdmin);

// Protected routes
router.get("/retailers", adminProtect, getAllRetailers);


router.get("/products/pending", adminProtect, getPendingProducts);


// Example: only Admins or SuperAdmin can approve/reject
router.put("/products/approve/:id", adminProtect, authorizeRoles("SuperAdmin","Approver","Admin"), approveProduct);


router.put("/products/reject/:id", adminProtect, authorizeRoles("SuperAdmin","Approver","Admin"), rejectProduct);

router.get("/products/approved", adminProtect, getApprovedProducts);

router.get("/products/rejected", adminProtect, getRejectedProducts);

module.exports = router;