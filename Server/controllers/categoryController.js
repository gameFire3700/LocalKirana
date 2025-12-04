const Category = require("../models/Category");

/* ==========================================================
   🟢 Get All Active Categories (for dropdown)
========================================================== */
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ is_deleted: false, is_active: true })
      .sort({ display_order: 1 });

    res.json({
      success: true,
      count: categories.length,
      data: categories,
    });

  } 
  catch (err) 
  {
    next(err);
  }
};
