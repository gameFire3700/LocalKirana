const mongoose = require("mongoose");

const retailerProductSchema = new mongoose.Schema(
  {
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: true,
      index: true
    },

    product_master: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductMaster",
      required: true,
      index: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true
    },

    image: {
      type: String,
      default: ""
    },

    brand: {
      type: String,
      default: ""
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    mrp: {
      type: Number,
      min: 0
    },

    discount: {
      type: Number,
      default: 0,
      min: 0
    },

    tax_rate: {
      type: Number,
      default: 0,
      min: 0
    },

    cost_price: {
      type: Number,
      min: 0
    },

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    low_stock_alert: {
      type: Number,
      default: 5
    },

    warehouse_location: {
      type: String,
      default: ""
    },

    is_available: {
      type: Boolean,
      default: true
    },

    is_featured: {
      type: Boolean,
      default: false
    },

    delivery_time: {
      type: String,
      default: ""
    },

    return_policy: {
      type: String,
      default: ""
    },

    expiry_date: Date,
    manufacture_date: Date,

    batch_number: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    rejection_reason: {
      type: String,
      default: ""
    },

    is_deleted: {
      type: Boolean,
      default: false,
      index: true
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer"
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer"
    }
  },
  { timestamps: true }
);

/* ✅ SAFE UNIQUE INDEX (ONLY ACTIVE PRODUCTS) */
retailerProductSchema.index(
  { retailer: 1, product_master: 1 },
  {
    unique: true,
    partialFilterExpression: {
      is_deleted: false
    }

  }
);

module.exports = mongoose.model(
  "RetailerProduct",
  retailerProductSchema,
  "retailer_products"
);
