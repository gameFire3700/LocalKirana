const Product = require("../models/Product");
const PendingProduct = require("../models/PendingProduct");

// GET all pending products
const getPendingProducts = async (req, res) => {
  try {
    const products = await PendingProduct.find({ status: "pending" })
      .populate("supplier_id", "name email")
      .populate("category");

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// APPROVE product
const approveProduct = async (req, res) => {
  try {
    const pending = await PendingProduct.findById(req.params.id);
    if (!pending) {
      return res.status(404).json({ success: false, message: "Pending product not found" });
    }

    // CREATE real product
    const product = await Product.create({
      name: pending.name,
      description: pending.description,
      price: pending.price,
      cost_price: pending.cost_price,
      mrp: pending.mrp,
      discount: pending.discount,
      tax_rate: pending.tax_rate,
      stock: pending.stock,
      image: pending.image,
      unit: pending.unit,
      category: pending.category,
      brand: pending.brand,
      supplier_id: pending.supplier_id,
      tags: pending.tags,
      expiry_date: pending.expiry_date,
      manufacture_date: pending.manufacture_date,
      weight: pending.weight,
      dimensions: pending.dimensions,
      warehouse_location: pending.warehouse_location,
      product_status: "approved",
      is_available: true,
      created_by: pending.created_by,
    });

    // REMOVE from pending
    await PendingProduct.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product approved & published",
      product,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// REJECT product
const rejectProduct = async (req, res) => {
  try {
    const pending = await PendingProduct.findById(req.params.id);
    if (!pending) {
      return res.status(404).json({ success: false, message: "Pending product not found" });
    }

    pending.status = "rejected";
    pending.rejection_reason = req.body.reason || "No reason provided";
    await pending.save();

    res.json({
      success: true,
      message: "Product rejected",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// GET all approved products
const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ is_available: true, is_deleted: false });
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// GET all rejected products
const getRejectedProducts = async (req, res) => {
  try {
    const products = await Product.find({ product_status: "rejected", is_deleted: false }).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = {
  getPendingProducts,
  approveProduct,
  rejectProduct,
  getApprovedProducts,
  getRejectedProducts,
};
