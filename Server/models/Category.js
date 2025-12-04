// models/Category.js
const mongoose = require("mongoose");

// ✅ Define the Category Schema
const categorySchema = new mongoose.Schema(
  {
    category_id: {
      type: Number,
      required: true,
      unique: true,
      index: true, // Fast searching
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      minlength: [2, "Category name must be at least 2 characters long"],
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: false,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      maxlength: [200, "Description cannot exceed 500 characters"],
    },

    // ✅ Parent category for hierarchy
    parent_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Self-reference
      default: null,
    },

    image_url: {
      type: String,
      default: "",
    },

    is_active: {
      type: Boolean,
      default: true,
    },
    display_order: {
      type: Number,
      default: 0,
    },

    meta_title: {
      type: String,
      default: "",
    },

    meta_description: {
      type: String,
      default: "",
    },

    meta_keywords: {
      type: [String],
      default: [],
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Hook: Generate slug automatically from name
categorySchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  next();
});

// ✅ Virtual Field: Subcategories (link to all children)
categorySchema.virtual("subcategories", { 
  ref: "Category", // reference the same model
  localField: "_id", // parent id
  foreignField: "parent_category", // child’s parent_category
});  

// ✅ Virtual Field: Show full hierarchy (breadcrumb)
categorySchema.virtual("fullHierarchy").get(function () {
  return this.parent_category
    ? `${this.parent_category.name} > ${this.name}`
    : this.name;
});

// ✅ Export Model
const Category = mongoose.model("Category", categorySchema, "categories");
module.exports = Category;
