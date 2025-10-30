const express = require('express');
const router = express.Router();
let products = require('../Data/products');

// ✅ GET all products
router.get('/', (req, res) => {
  res.json(products);
});

// ✅ GET product by ID
router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }
  res.json(product);
});

// ✅ POST - Add new product
router.post('/', (req, res, next) => {
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
});

// ✅ PUT - Update product by ID
router.put('/:id', (req, res, next) => {
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
});

// ✅ DELETE - Remove product by ID
router.delete('/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    return next(error);
  }

  const deletedProduct = products.splice(index, 1);
  res.json({
    message: "🗑️ Product deleted successfully!",
    deleted: deletedProduct[0]
  });
});

module.exports = router;
