// controllers/productController.js
const Product = require('../models/Product');

/* ==========================================================
   🟢 Public: Get all products (visible to everyone)
========================================================== */
exports.getAllProducts = async (req, res, next) => {
  try {
    // Only show active (approved, available) products
    const products = await Product.find({ is_deleted: false, is_available: true })
      .populate("category")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (err) {
    next(err);
  }
};


/* ==========================================================
   🟢 Public: Get product by ID (either _id or product_id)
========================================================== */
exports.getProductById = async (req, res, next) => {
  try {
    const idParam = req.params.id;
    let product = null;

    // Try numeric product_id first
    if (!isNaN(Number(idParam))) {
      product = await Product.findOne({ product_id: Number(idParam) })
        .populate("category");
    }

    // Fallback: try MongoDB _id
    if (!product) {
      product = await Product.findById(idParam).populate("category");
    }

    if (!product || product.is_deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

/* ==========================================================
   🟡 Retailer: Create Product
========================================================== */
exports.createProduct = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      supplier_id: req.user?.id || null,   // Retailer ID (if logged in)
      created_by: req.user?.email || "System"
    };

    const product = await Product.create(payload);

    res.status(201).json({
      success: true,
      message: "✅ Product added successfully",
      data: product
    });
  } catch (err) {
    next(err);
  }
};

/* ==========================================================
   🟠 Retailer: Update only their own product
========================================================== */
exports.updateOwnProduct = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      supplier_id: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not owned by you"
      });
    }

    Object.assign(product, req.body);
    await product.save();

    res.json({
      success: true,
      message: "✅ Product updated successfully",
      data: product
    });
  } catch (err) {
    next(err);
  }
};

/* ==========================================================
   🔴 Retailer: Delete only their own product
========================================================== */
exports.deleteOwnProduct = async (req, res, next) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      supplier_id: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not owned by you"
      });
    }

    res.json({
      success: true,
      message: "🗑️ Product deleted successfully",
      data: product
    });
  } catch (err) {
    next(err);
  }
};

/* ==========================================================
   🔵 Admin: Update any product
========================================================== */
exports.updateProduct = async (req, res, next) => {
  try {
    const idParam = req.params.id;
    let filter = {};

    if (!isNaN(Number(idParam))) filter = { product_id: Number(idParam) };
    else filter = { _id: idParam };

    const updated = await Product.findOneAndUpdate(filter, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      message: "✅ Product updated (admin)",
      data: updated
    });
  } catch (err) {
    next(err);
  }
};

/* ==========================================================
   🔵 Admin: Delete any product
========================================================== */
exports.deleteProduct = async (req, res, next) => {
  try {
    const idParam = req.params.id;
    let filter = {};

    if (!isNaN(Number(idParam))) filter = { product_id: Number(idParam) };
    else filter = { _id: idParam };

    const deleted = await Product.findOneAndDelete(filter);

    if (!deleted)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({
      success: true,
      message: "🗑️ Product deleted (admin)",
      data: deleted
    });
  } catch (err) {
    next(err);
  }
};
