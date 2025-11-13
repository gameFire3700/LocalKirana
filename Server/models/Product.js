const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    required: [true, "product_id is required"],
    unique: true,
    index: true
  },
 //Stock Keeping Unit — internal unique code for inventory tracking (like AMUL500G-01).
  sku: {
    type: String,
    unique: true,
    sparse: true,  // allows many nulls
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
  cost_price: {
    type: Number,
    min: [0, "Cost price cannot be negative"]
  },
  mrp: {
    type: Number,
    min: [0, "MRP cannot be negative"]
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"]
  },
  tax_rate: {
    type: Number,
    default: 0,
    min: [0, "Tax rate cannot be negative"]
  },
  stock: {
    type: Number,
    required: [true, "Stock is required"],
    min: [0, "Stock cannot be negative"]
  },
  unit: {
    type: String,
    default: ""
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: false 
  },
  category_name: {
    type: String,
    default: ""
  },
  brand: {
    type: String,
    default: ""
  },
  supplier_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retailer', // optional link to retailer model
    required: false
  },
  tags: {
    type: [String],
    default: []
  },
  expiry_date: {
    type: Date
  },
  manufacture_date: {
    type: Date
  },
  weight: {
    type: String,
    enum: ["gm" , "kg"," ml" ,"liter"]
  },
  dimensions: {
    length: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 }
  },
  warehouse_location: {
    type: String,
    default: ""
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  views_count: {
    type: Number,
    default: 0
  },
  sold_count: {
    type: Number,
    default: 0
  },
  is_available: {
    type: Boolean,
    default: true
  },
  is_featured: {
    type: Boolean,
    default: false
  },
  is_deleted: {
    type: Boolean,
    default: false
  },
  created_by: {
    type: String,
    default: "System"  
  },
  updated_by: {
    type: String,
    default: "System"
  }
}, { timestamps: true });

// 🔍 Indexes for performance
productSchema.index({ name: "text", description: "text", tags: "text" }); // full-text search
productSchema.index({ category_name: 1 });
productSchema.index({ price: 1 });
productSchema.index({ is_available: 1, is_deleted: 1 });
productSchema.index({ sold_count: -1 }); // for "bestsellers"

// ✅ Export Model
const Product = mongoose.model('Product', productSchema, 'products');
module.exports = Product;


// New Field	Type	Description / Why it helps
// sku	String	Stock Keeping Unit — internal unique code for inventory tracking (like AMUL500G-01).
// barcode	String	For integration with barcode scanners / POS systems.
// supplier_id	Number / ObjectId	If you have a Retailer or Supplier model — helps track who sells this product.
// tags	[String]	For searching/filtering (like ["butter", "dairy", "amul"]).
// tax_rate	Number	GST/VAT % — helps in billing.
// cost_price	Number	Internal price (for profit calculations).
// is_featured	Boolean	Mark product as “featured” for homepage promotions.
// views_count	Number	Analytics — how many times this product was viewed.
// sold_count	Number	For analytics (most popular items).
// created_by / updated_by	String	Track who added/edited the product (admin name/id).
// is_deleted	Boolean	For soft delete instead of physical deletion (never lose data).
// weight	String / Number	Optional — for logistics info (shipping calculation).
// dimensions	{ length, width, height }	Useful if you add delivery later.
// warehouse_location	String	Optional — to manage multi-warehouse stock.