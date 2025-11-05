// controllers/categoryController.js
let categories = require('../Data/categories');

// ✅ Get all categories
exports.getAllCategories = (req, res) => {
  console.log("📦 Categories data:", categories);
  res.json(categories);
};

// ✅ Get single category by ID
exports.getCategoryById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }

  res.json(category);
};

// ✅ Add new category
exports.addCategory = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || !description) {
    const error = new Error("Please provide name and description");
    error.statusCode = 400;
    return next(error);
  }

  const newCategory = {
    id: categories.length + 1,
    name,
    description
  };

  categories.push(newCategory);
  res.status(201).json({
    message: "✅ Category added successfully!",
    category: newCategory
  });
};

// ✅ Update category by ID
exports.updateCategory = (req, res, next) => {
  const id = parseInt(req.params.id);
  const category = categories.find(c => c.id === id);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }

  const { name, description } = req.body;
  if (name) category.name = name;
  if (description) category.description = description;

  res.json({
    message: "✅ Category updated successfully!",
    category
  });
};

// ✅ Delete category by ID
exports.deleteCategory = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = categories.findIndex(c => c.id === id);

  if (index === -1) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    return next(error);
  }

  const deleted = categories.splice(index, 1);
  res.json({
    message: "🗑️ Category deleted successfully!",
    deleted: deleted[0]
  });
};
