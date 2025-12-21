// models/ProductMaster.js
const mongoose = require("mongoose");

const productMasterSchema = new mongoose.Schema(
  {
    /* ===============================
       AUTO PRODUCT ID
    =============================== */
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

    /* ===============================
       BASIC PRODUCT INFO
    =============================== */
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true
    },

    slug: {
      type: String,
      lowercase: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    images: {
      type: [String],
      default: []
    },

    /* ===============================
       CATEGORY MAPPING
    =============================== */
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

    brand: {
      type: String,
      trim: true,
      default: ""
    },

    tags: {
      type: [String],
      default: []
    },

    /* ===============================
       PRODUCT ATTRIBUTES
    =============================== */
    unit: {
      type: String,
      default: ""
    },

    weight: {
      value: { type: Number },
      unit: {
        type: String,
        enum: ["gm", "kg", "ml", "liter"]
      }
    },

    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number }
    },

    /* ===============================
       PRODUCT META (ADMIN)
    =============================== */
    product_type: {
      type: String,
      enum: ["physical", "digital"],
      default: "physical"
    },

    is_returnable: {
      type: Boolean,
      default: true
    },

    warranty_period: {
      type: String,
      default: ""
    },

    /* ===============================
       STATUS & VISIBILITY
    =============================== */
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    },

    is_deleted: {
      type: Boolean,
      default: false
    },

    /* ===============================
       AUDIT
    =============================== */
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

/* ===============================
   AUTO PRODUCT ID
================================ */
productMasterSchema.pre("save", async function (next) {
  if (this.product_id) return next();

  const last = await mongoose
    .model("ProductMaster")
    .findOne()
    .sort({ product_id: -1 });

  this.product_id = last ? last.product_id + 1 : 1001;
  next();
});

/* ===============================
   SLUG AUTO
================================ */
productMasterSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

/* ===============================
   INDEXES
================================ */
productMasterSchema.index({ name: "text", tags: "text" });
productMasterSchema.index({ category: 1, subcategory: 1 });
productMasterSchema.index({ brand: 1 });

module.exports = mongoose.model(
  "ProductMaster",
  productMasterSchema,
  "product_master"
);
