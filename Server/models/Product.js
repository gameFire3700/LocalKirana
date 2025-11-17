const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    unique: true,
    index: true
  },

  sku: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },

  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true
  },

  description: {
    type: String,
    default: "Product description not available"
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"]
  },

  cost_price: { type: Number, min: 0 },
  mrp: { type: Number, min: 0 },
  discount: { type: Number, default: 0, min: 0 },
  tax_rate: { type: Number, default: 0, min: 0 },

  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock cannot be negative"]
  },

  unit: { type: String, default: "" },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false 
  },

  category_name: { type: String, default: "" },
  brand: { type: String, default: "" },

  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer',
    required: true      
  },

  tags: { type: [String], default: [] },
  expiry_date: { type: Date },
  manufacture_date: { type: Date },

  weight: {
    type: String,
    enum: ["gm", "kg", "ml", "liter"]
  },

  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 }
  },

  warehouse_location: { type: String, default: "" },

  rating: { type: Number, default: 0, min: 0, max: 5 },
  views_count: { type: Number, default: 0 },
  sold_count: { type: Number, default: 0 },

  is_available: { type: Boolean, default: true },
  is_featured: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },

  created_by: { type: String, default: "System" },
  updated_by: { type: String, default: "System" }

}, { timestamps: true });

// =====================================================
//  FIXED AUTO INCREMENT LOGIC (WITHOUT CHANGING COLUMNS)
// =====================================================
productSchema.pre("save", async function (next) {
  if (this.product_id) return next();

  const lastProduct = await mongoose
    .model("Product")
    .findOne()
    .sort({ product_id: -1 });

  this.product_id = lastProduct ? lastProduct.product_id + 1 : 1001;

  next();
});

// 🔍 Indexes (DON’T CHANGE ANYTHING)
productSchema.index({ name: "text", description: "text", tags: "text" });
productSchema.index({ category_name: 1 });
productSchema.index({ price: 1 });
productSchema.index({ is_available: 1, is_deleted: 1 });
productSchema.index({ sold_count: -1 });

// Export model (MOVED BEFORE HOOK)
module.exports = mongoose.model('Product', productSchema, 'products');
