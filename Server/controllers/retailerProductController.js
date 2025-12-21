const RetailerProduct = require("../models/RetailerProduct");
const ProductMaster = require("../models/ProductMaster");
const upload = require("../middleware/upload"); // 👈 tumhara multer file

/* =====================================================
   RETAILER → ADD PRODUCT (GOES TO ADMIN)
===================================================== */

exports.requestAddRetailerProduct = async (req, res, next) => {
  try {
    const retailerId = req.user._id;

    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    const {
      product_master,
      price,
      mrp,
      discount,
      tax_rate,
      cost_price,
      stock,
      warehouse_location,
      delivery_time,
      expiry_date,
      manufacture_date,
      batch_number
    } = req.body;

    if (!product_master || price == null || stock == null) {
      return res.status(400).json({
        success: false,
        message: "product_master, price and stock are required"
      });
    }

    const master = await ProductMaster.findOne({
      _id: product_master,
      is_deleted: false,
      status: "active"
    });

    if (!master) {
      return res.status(404).json({
        success: false,
        message: "Product Master not found or inactive"
      });
    }

    // ✅ CHECK ONLY FOR SAME RETAILER
    const exists = await RetailerProduct.findOne({
      retailer: retailerId,
      product_master: master._id,
      is_deleted: false
    });

    if (exists) {
      return res.status(409).json({
        success: false,
        message: "You have already added this product"
      });
    }

    const product = await RetailerProduct.create({
      retailer: retailerId,
      product_master: master._id,

      category: master.category,
      subcategory: master.subcategory,
      brand: master.brand,

      image: imagePath,

      price,
      mrp,
      discount,
      tax_rate,
      cost_price,
      stock,
      warehouse_location,
      delivery_time,
      expiry_date,
      manufacture_date,
      batch_number,

      status: "pending",
      is_deleted: false,
      created_by: retailerId
    });

    res.status(201).json({
      success: true,
      message: "Product sent to admin for approval",
      data: product
    });

  } catch (error) {
    // ✅ Final safety for race condition
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already added this product"
      });
    }
    next(error);
  }
};


/* =====================================================
   ADMIN → GET PENDING RETAILER PRODUCTS
===================================================== */
exports.getPendingRetailerProducts = async (req, res, next) => {
  try {
    const products = await RetailerProduct.find({
      status: "pending",
      is_deleted: false
    })
      .populate("retailer", "name email")
      .populate("product_master", "name");

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
   ADMIN → APPROVE / REJECT PRODUCT
===================================================== */
exports.updateRetailerProductStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status"
      });
    }

    const product = await RetailerProduct.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Retailer product request not found"
      });
    }

    product.status = status;
    product.rejection_reason =
      status === "rejected" ? rejection_reason : "";
    product.updated_by = req.user._id;

    await product.save();

    res.json({
      success: true,
      message: `Product ${status} successfully`,
      data: product
    });

  } catch (error) {
    next(error);
  }
};

/* =====================================================
   RETAILER → GET HIS PRODUCTS
===================================================== */
exports.getRetailerProducts = async (req, res, next) => {
  try {
    const retailerId = req.user._id;

    const products = await RetailerProduct.find({
      retailer: retailerId,
      is_deleted: false
    })
      .populate("product_master", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    next(error);
  }
};
/* =====================================================
   RETAILER → UPDATE PRODUCT
===================================================== */
exports.updateRetailerProduct = async (req, res, next) => {
  try {
    const retailerId = req.user._id;
    const { id } = req.params;

    const product = await RetailerProduct.findOne({
      _id: id,
      retailer: retailerId,
      is_deleted: false
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // ❌ Rejected product cannot be updated
    if (product.status === "rejected") {
      return res.status(403).json({
        success: false,
        message: "Rejected product cannot be updated. Create new request."
      });
    }

    const allowedFields = [
      "price",
      "mrp",
      "discount",
      "tax_rate",
      "cost_price",
      "stock",
      "warehouse_location",
      "delivery_time",
      "expiry_date",
      "manufacture_date",
      "batch_number",
      "is_available",
      "is_featured"
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    // 🔁 If approved product updated → re-approval optional
    if (product.status === "approved") {
      product.status = "pending";
    }

    product.updated_by = retailerId;
    await product.save();

    res.json({
      success: true,
      message: "Product updated and sent for admin review",
      data: product
    });

  } catch (error) {
    next(error);
  }
};

/* =====================================================
   RETAILER → DELETE PRODUCT
===================================================== */
exports.deleteRetailerProduct = async (req, res, next) => {
  try {
    const retailerId = req.user._id;
    const { id } = req.params;

    const product = await RetailerProduct.findOne({
      _id: id,
      retailer: retailerId,
      is_deleted: false
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.is_deleted = true;
    product.status = "inactive";
    product.updated_by = retailerId;

    await product.save();

    res.json({
      success: true,
      message: "Product removed successfully"
    });

  } catch (error) {
    next(error);
  }
};
