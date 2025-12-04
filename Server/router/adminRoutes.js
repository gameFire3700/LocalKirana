const express = require("express");
const rateLimit = require("express-rate-limit");
const { registerAdmin, loginAdmin } = require("../controllers/adminAuthController");
const { adminProtect, authorizeRoles, requireAdminSecret } = require("../middleware/adminMiddleware");
const { approveProduct, rejectProduct } = require("../controllers/adminProductController");
const { getAllRetailers } = require("../controllers/adminRetailerController");

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

// Example: only Admins or SuperAdmin can approve/reject
router.put("/admin/approve/:id", adminProtect, authorizeRoles("SuperAdmin","Approver","Admin"), approveProduct);
router.put("/admin/reject/:id", adminProtect, authorizeRoles("SuperAdmin","Approver","Admin"), rejectProduct);

module.exports = router;
