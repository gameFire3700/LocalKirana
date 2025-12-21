// models/SubCategory.js
const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    subcategory_id: {
      type: Number,
      required: true,
      unique: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    image_url: {
      type: String,
      default: ""
    },

    is_active: {
      type: Boolean,
      default: true
    },

    display_order: {
      type: Number,
      default: 0
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    is_deleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

/* Slug auto-generate */
subCategorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

/* Prevent duplicate subcategory in same category */
subCategorySchema.index(
  { name: 1, category: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "SubCategory",
  subCategorySchema,
  "subcategories"
);
