const SubCategory = require("../models/SubCategory");
const Category = require("../models/Category");

/* =========================================
   CREATE SUBCATEGORY (ADMIN)
========================================= */
exports.createSubCategory = async (req, res, next) => {
  try {
    const {
      name,
      category,
      image_url,
      display_order,
      is_active
    } = req.body;

    // ✅ Required fields
    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Subcategory name and category are required"
      });
    }

    // ✅ Check category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found"
      });
    }

    // ✅ Duplicate subcategory in same category
    const exists = await SubCategory.findOne({
      name: name.trim(),
      category,
      is_deleted: false
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "SubCategory already exists in this category"
      });
    }

    // ✅ AUTO INCREMENT subcategory_id
    const lastSubCategory = await SubCategory.findOne()
      .sort({ subcategory_id: -1 });

    const newSubCategoryId = lastSubCategory
      ? lastSubCategory.subcategory_id + 1
      : 1;

    const subCategory = await SubCategory.create({
      subcategory_id: newSubCategoryId,
      name: name.trim(),
      category,
      image_url,
      display_order,
      is_active,
      created_by: req.admin?.id || null
    });

    res.status(201).json({
      success: true,
      message: "SubCategory created successfully",
      data: subCategory
    });

  } catch (error) {
    next(error);
  }
};

/* =========================================
   GET SUBCATEGORIES BY CATEGORY
========================================= */
exports.getSubCategoriesByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const subcategories = await SubCategory.find({
      category: categoryId,
      is_active: true,
      is_deleted: false
    }).sort({ display_order: 1 });

    res.json({
      success: true,
      data: subcategories
    });
  } catch (error) {
    next(error);
  }
};
