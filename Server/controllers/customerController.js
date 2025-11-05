// controllers/customerController.js
let customers = require('../Data/customers');

// ✅ Get all customers
exports.getAllCustomers = (req, res) => {
  res.json(customers);
};

// ✅ Get single customer by ID 
exports.getCustomerById = (req, res, next) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    return next(error);
  }

  res.json(customer);
};

// ✅ Add new customer
exports.addCustomer = (req, res, next) => {
  const { name, email, city } = req.body;

  if (!name || !email || !city) {
    const error = new Error("Please provide name, email, and city");
    error.statusCode = 400;
    return next(error);
  }

  const newCustomer = {
    id: customers.length + 1,
    name,
    email,
    city
  };

  customers.push(newCustomer);
  res.status(201).json({
    message: "✅ Customer added successfully!",
    customer: newCustomer
  });
};

// ✅ Update customer by ID
exports.updateCustomer = (req, res, next) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(c => c.id === id);

  if (!customer) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    return next(error);
  }

  const { name, email, city } = req.body;
  if (name) customer.name = name;
  if (email) customer.email = email;
  if (city) customer.city = city;

  res.json({
    message: "✅ Customer updated successfully!",
    customer
  });
};

// ✅ Delete customer by ID
exports.deleteCustomer = (req, res, next) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(c => c.id === id);

  if (index === -1) {
    const error = new Error("Customer not found");
    error.statusCode = 404;
    return next(error);
  }

  const deleted = customers.splice(index, 1);
  res.json({
    message: "🗑️ Customer deleted successfully!",
    deleted: deleted[0]
  });
};
