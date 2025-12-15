const mongoose = require("mongoose");

const pendingProductSchema = new mongoose.Schema({
  // SAME FIELDS AS PRODUCT (no auto product_id)
  name: { type: String, required: true },
  description: { type: String, default: "Product description not available" },
  price: { type: Number, required: true },
  cost_price: { type: Number, min: 0 },
  mrp: { type: Number, min: 0 },
  discount: { type: Number, default: 0 },
  tax_rate: { type: Number, default: 0 },

  stock: { type: Number, required: true, min: 0 },

  image: { type: String, default: null },
  unit: { type: String, default: "" },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },

  brand: { type: String, default: "" },

  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Retailer",
    required: true
  },

  tags: { type: [String], default: [] },
  expiry_date: Date,
  manufacture_date: Date,

  weight: {
    type: String,
    enum: ["gm", "kg", "ml", "liter"]
  },

  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 }
  },

  warehouse_location: String,

  status: {
    type: String,
    enum: ["pending", "rejected"],
    default: "pending"
  },

  rejection_reason: String,
  created_by: String

}, { timestamps: true });


module.exports = mongoose.model('PendingProduct', pendingProductSchema,'pending_products');
