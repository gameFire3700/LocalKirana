const RetailerProduct = require("../models/RetailerProduct");

/* ===============================
   GET PENDING RETAILER PRODUCTS
================================ */
const getPendingRetailerProducts = async (req, res) => {
  try {
    const products = await RetailerProduct.find({ status: "pending" })
      .populate("retailer", "name email")
      .populate("product_master", "name")
      .populate("category", "name")
      .populate("subcategory", "name");

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET APPROVED RETAILER PRODUCTS
================================ */
const getApprovedRetailerProducts = async (req, res) => {
  try {
    const products = await RetailerProduct.find({ status: "approved" })
      .populate("retailer", "name email")
      .populate("product_master", "name")
      .populate("category", "name")
      .populate("subcategory", "name");

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   GET REJECTED RETAILER PRODUCTS
================================ */
const getRejectedRetailerProducts = async (req, res) => {
  try {
    const products = await RetailerProduct.find({ status: "rejected" })
      .populate("retailer", "name email")
      .populate("product_master", "name")
      .populate("category", "name")
      .populate("subcategory", "name");

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   APPROVE PRODUCT
================================ */
const approveRetailerProduct = async (req, res) => {
  try {
    const product = await RetailerProduct.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Retailer product not found"
      });
    }

    product.status = "approved";
    product.approved_at = new Date();
    product.approved_by = req.admin?._id || null;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product approved successfully",
      data: product
    });
  } catch (error) {
    console.error("Approve error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ===============================
   REJECT PRODUCT
================================ */
const rejectRetailerProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await RetailerProduct.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Retailer product not found"
      });
    }

    product.status = "rejected";
    product.rejected_at = new Date();
    product.rejected_by = req.admin?._id || null;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product rejected successfully",
      data: product
    });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getRetailerProductById = async (req, res) => {
  try {
    const product = await RetailerProduct.findById(req.params.id)
      .populate("retailer", "name email")
      .populate("product_master")
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Retailer product not found"
      });
    }

    // 🔒 SECURITY CHECK
    if (product.status !== "approved") {
      return res.status(404).json({
        success: false,
        message: "Product not available"
      });
    }

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error("Get product by id error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


/* ===============================
   EXPORTS (ONLY ONE WAY)
================================ */
module.exports = {
  getPendingRetailerProducts,
  getApprovedRetailerProducts,
  getRejectedRetailerProducts,
  approveRetailerProduct,
  rejectRetailerProduct,
  getRetailerProductById
};
