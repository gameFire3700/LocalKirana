const Category = require("../models/Category");
const path = require("path");
/* =========================================
   CREATE CATEGORY (ADMIN)
========================================= */
exports.createCategory = async (req, res, next) => {
  try {
    const {
      name,
      description,
      display_order,
      is_active,
      meta_title,
      meta_description,
      meta_keywords
    } = req.body;

    // ✅ Only name is required (model ke according)
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    // ✅ Duplicate name check
    const exists = await Category.findOne({
      name: name.trim(),
      is_deleted: false
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Category already exists"
      });
    }

    // ✅ AUTO INCREMENT category_id
    const lastCategory = await Category.findOne().sort({ category_id: -1 });
    const newCategoryId = lastCategory ? lastCategory.category_id + 1 : 1;

    // ✅ IMAGE PATH FROM UPLOAD
    let imageUrl = "";
    if (req.file) {
      imageUrl = `/uploads/categories/${req.file.filename}`;
    } else if (req.body.image_url) {
      imageUrl = req.body.image_url; // fallback if admin provides URL
    }

    const category = await Category.create({
      category_id: newCategoryId,
      name: name.trim(),
      description,
      image_url:imageUrl,
      display_order,
      is_active,
      meta_title,
      meta_description,
      meta_keywords: 
        meta_keywords && typeof meta_keywords === "string"
          ? meta_keywords.split(",").map((k) => k.trim())
          : [],
      created_by: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      data: category
    });

  } catch (error) {
    next(error);
  }
};

/* =========================================
   GET ALL CATEGORIES
========================================= */
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({
      is_deleted: false
    }).sort({ display_order: 1 });

    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};
