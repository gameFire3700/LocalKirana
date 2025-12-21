const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  registerAdmin,
  loginAdmin
} = require("../controllers/adminAuthController");

const {
  adminProtect,
  authorizeRoles,
  requireAdminSecret
} = require("../middleware/adminMiddleware");

// Admin Product Controller
const adminProductController = require("../controllers/adminProductController");

// Admin Retailer Product Controller
const adminRetailerProductController = require("../controllers/adminRetailerProductController");

// Admin Product Request Controller
const adminProductRequestController = require("../controllers/adminProductRequestController");

// Admin Category Controller
const { createCategory, getAllCategories } = require("../controllers/categoryController");

const { createSubCategory, getSubCategoriesByCategory } = require("../controllers/subCategoryController");

// Admin Retailer Controller
const { getAllRetailers } = require("../controllers/adminRetailerController");

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { message: "Too many attempts, try again later" }
});

// -------------------------
// AUTH ROUTES
// -------------------------
router.post("/register", requireAdminSecret, registerAdmin);
router.post("/login", loginAdmin);

// -------------------------
// RETAILERS
// -------------------------
router.get("/retailers", adminProtect, getAllRetailers);

// -------------------------
// PRODUCTS
// -------------------------
router.get("/products/pending", adminProtect, adminProductController.getPendingProducts);

router.get("/products/approved", adminProtect, adminProductController.getApprovedProducts);

router.get("/products/rejected", adminProtect, adminProductController.getRejectedProducts);

router.put(
  "/products/approve/:id",
  adminProtect,
  authorizeRoles("SuperAdmin","Approver","Admin"),
  adminProductController.approveProduct
);

router.put(
  "/products/reject/:id",
  adminProtect,
  authorizeRoles("SuperAdmin","Approver","Admin"),
  adminProductController.rejectProduct
);

// -------------------------
// RETAILER PRODUCTS
// -------------------------
router.get(
  "/retailer-products/pending",
  adminProtect,
  authorizeRoles("Admin","SuperAdmin"),
  adminRetailerProductController.getPendingRetailerProducts
);

router.put(
  "/retailer-products/approve/:id",
  adminProtect,
  authorizeRoles("Admin","SuperAdmin"),
  adminRetailerProductController.approveRetailerProduct
);

router.put(
  "/retailer-products/reject/:id",
  adminProtect,
  authorizeRoles("Admin","SuperAdmin"),
  adminRetailerProductController.rejectRetailerProduct
);

// -------------------------
// PRODUCT REQUESTS
// -------------------------
router.get(
  "/product-requests/pending",
  adminProtect,
  authorizeRoles("admin","SuperAdmin"),
  adminProductRequestController.getPendingRequests
);

router.put(
  "/product-requests/approve/:id",
  adminProtect,
  authorizeRoles("admin"),
  adminProductRequestController.approveRequest
);

router.put(
  "/product-requests/reject/:id",
  adminProtect,
 
  adminProductRequestController.rejectRequest
);

// -------------------------
// CATEGORIES
// -------------------------
router.post(
  "/create",
  adminProtect,
  
  createCategory
);

router.get(
  "/",
  adminProtect,
  getAllCategories
);
router.post(
  "/create",
  adminProtect,
  createSubCategory
);

router.get(
  "/by-category/:categoryId",
  adminProtect,
  getSubCategoriesByCategory
);

module.exports = router;
