// controllers/productController.js
let products = require('../Data/products');

// ✅ Get all products
exports.getAllProducts = (req, res) => {
  res.json(products);
};

// ✅ Get product by ID
exports.getProductById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  res.json(product);
};

// ✅ Add new product
exports.addProduct = (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || !price || !category) {
    const error = new Error("Please provide name, price, and category");
    error.statusCode = 400;
    return next(error);
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    category
  };

  products.push(newProduct);
  res.status(201).json({
    message: "✅ Product added successfully!",
    product: newProduct
  });
};

// ✅ Update product by ID
exports.updateProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  const { name, price, category } = req.body;
  if (name) product.name = name;
  if (price) product.price = price;
  if (category) product.category = category;

  res.json({
    message: "✅ Product updated successfully!",
    product
  });
};

// ✅ Delete product by ID
exports.deleteProduct = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  const deleted = products.splice(index, 1);
  res.json({
    message: "🗑️ Product deleted successfully!",
    deleted: deleted[0]
  });
};
