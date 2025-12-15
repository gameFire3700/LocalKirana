const RetailerProduct = require("../models/RetailerProduct");
const Product = require("../models/Product");

/* ==========================================================
   🟢 Retailer: Add product from master list
========================================================== */
exports.addRetailerProduct = async (req, res, next) => {
  try {
    const { productId, price, stock } = req.body;
    const retailerId = req.user.id;

    // 1️⃣ Product master check
    const product = await Product.findById(productId);
    if (!product || product.is_deleted) {
      return res.status(400).json({
        success: false,
        message: "Invalid product selected"
      });
    }

    // 2️⃣ Already added?
    const already = await RetailerProduct.findOne({
      retailerId,
      productId
    });

    if (already) {
      return res.status(409).json({
        success: false,
        message: "Product already added by you"
      });
    }

    // 3️⃣ Create retailer-product mapping
    const retailerProduct = await RetailerProduct.create({
      retailerId,
      productId,
      price,
      stock,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      message: "✅ Product added, waiting for admin approval",
      data: retailerProduct
    });

  } catch (err) {
    next(err);
  }
};


/* ==========================================================
   🟢 Retailer: Get my products
========================================================== */
exports.getMyRetailerProducts = async (req, res, next) => {
  try {
    const retailerId = req.user.id;

    const products = await RetailerProduct.find({ retailerId })
      .populate("productId")
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
   🟠 Retailer: Update price / stock
========================================================== */
exports.updateRetailerProduct = async (req, res, next) => {
  try {
    const retailerProduct = await RetailerProduct.findOne({
      _id: req.params.id,
      retailerId: req.user.id
    });

    if (!retailerProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not owned by you"
      });
    }

    const allowedFields = ["price", "stock"];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        retailerProduct[field] = req.body[field];
      }
    });

    await retailerProduct.save();

    res.json({
      success: true,
      message: "✅ Product updated successfully",
      data: retailerProduct
    });

  } catch (err) {
    next(err);
  }
};


/* ==========================================================
   🔴 Retailer: Remove product from my store
========================================================== */
exports.deleteRetailerProduct = async (req, res, next) => {
  try {
    const deleted = await RetailerProduct.findOneAndDelete({
      _id: req.params.id,
      retailerId: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found or not owned by you"
      });
    }

    res.json({
      success: true,
      message: "🗑️ Product removed from your store"
    });

  } catch (err) {
    next(err);
  }
};
