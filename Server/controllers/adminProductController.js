const Product = require("../models/Product");

exports.approveProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  product.is_available = true;
  await product.save();

  res.json({
    success: true,
    message: "Product approved by admin",
    product
  });
};

exports.rejectProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "Product not found" });

  product.is_available = false;
  product.is_deleted = true;

  await product.save();

  res.json({
    success: true,
    message: "Product rejected by admin",
    product
  });
};
