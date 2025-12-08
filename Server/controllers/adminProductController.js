const Product = require("../models/Product");

// GET all pending products
const getPendingProducts = async (req, res) => {
  try {
    const products = await Product.find({ product_status: "pending" });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// APPROVE product
const approveProduct = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, { 
      product_status: "approved" ,
      is_available: true
    },
      {new:true}
    );
    res.json({ success: true, message: "Product approved" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// REJECT product
const rejectProduct = async (req, res) => {
   try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { product_status: "rejected" },
      { new: true }
    );

    if (!product) {
      return res.json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      message: "Product rejected",
      product
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_available: true, is_deleted: false });
    res.json({
      success: true,
      count: products.length,
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getApprovedProducts,
};
