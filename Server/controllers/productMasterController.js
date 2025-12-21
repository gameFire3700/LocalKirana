const ProductMaster = require("../models/ProductMaster");

/* =====================================================
   CREATE PRODUCT MASTER (ADMIN)
===================================================== */
exports.createProductMaster = async (req, res, next) => {
  try {
    const {
      sku,
      name,
      description,
      images,
      category,
      subcategory,
      brand,
      tags,
      unit,
      weight,
      dimensions,
      product_type,
      is_returnable,
      warranty_period
    } = req.body;

    /* -----------------------------
       BASIC VALIDATION
    ----------------------------- */
    if (!name || !category || !subcategory) {
      return res.status(400).json({
        success: false,
        message: "Name, category and subcategory are required"
      });
    }

    /* -----------------------------
       DUPLICATE PRODUCT CHECK
       (Same name + category + subcategory)
    ----------------------------- */
    const alreadyExists = await ProductMaster.findOne({
      name: name.trim(),
      category,
      subcategory,
      is_deleted: false
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Product already exists in Product Master"
      });
    }

    /* -----------------------------
       CREATE PRODUCT MASTER
    ----------------------------- */
    const product = await ProductMaster.create({
      sku,
      name,
      description,
      images,
      category,
      subcategory,
      brand,
      tags,
      unit,
      weight,
      dimensions,
      product_type,
      is_returnable,
      warranty_period,
      created_by: req.user?._id // admin user
    });

    res.status(201).json({
      success: true,
      message: "Product Master created successfully",
      data: product
    });

  } catch (error) {
    next(error);
  }
};

/* =====================================================
   GET ALL PRODUCT MASTER (ADMIN / SELLER)
===================================================== */
exports.getAllProductMasters = async (req, res, next) => {
  try {
    const products = await ProductMaster.find({
      is_deleted: false,
      status: "active"
    })
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   GET SINGLE PRODUCT MASTER
===================================================== */
exports.getProductMasterById = async (req, res, next) => {
  try {
    const product = await ProductMaster.findById(req.params.id)
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product || product.is_deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    next(error);
  }
};


/* =====================================================
   UPDATE PRODUCT MASTER (ADMIN)
===================================================== */
exports.updateProductMaster = async (req, res, next) => {
  try {
    const product = await ProductMaster.findById(req.params.id);

    if (!product || product.is_deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // ❗ name/category/subcategory change hone par duplicate check
    if (
      (req.body.name && req.body.name !== product.name) ||
      (req.body.category && req.body.category.toString() !== product.category.toString()) ||
      (req.body.subcategory &&
        req.body.subcategory.toString() !== product.subcategory.toString())
    ) {
      const duplicate = await ProductMaster.findOne({
        name: req.body.name || product.name,
        category: req.body.category || product.category,
        subcategory: req.body.subcategory || product.subcategory,
        is_deleted: false,
        _id: { $ne: product._id }
      });

      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "Another product already exists with same details"
        });
      }
    }

    Object.assign(product, req.body, {
      updated_by: req.user?._id
    });

    await product.save();

    res.json({
      success: true,
      message: "Product Master updated successfully",
      data: product
    });
  } catch (error) {
    next(error);
  }
};

/* =====================================================
   DELETE PRODUCT MASTER (SOFT DELETE)
===================================================== */
exports.deleteProductMaster = async (req, res, next) => {
  try {
    const product = await ProductMaster.findById(req.params.id);

    if (!product || product.is_deleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.is_deleted = true;
    product.status = "inactive";
    product.updated_by = req.user?._id;

    await product.save();

    res.json({
      success: true,
      message: "Product Master deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};