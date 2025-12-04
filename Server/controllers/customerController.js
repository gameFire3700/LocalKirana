const User = require("../models/User");

/* ===============================================
   🔵 Admin: Get All Customers
================================================ */
exports.getAllCustomers = async (req, res) => {
  const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 });

  res.json({
    success: true,
    count: customers.length,
    customers,
  });
};

/* ===============================================
   🔵 Admin: Get Customer By ID
================================================ */
exports.getCustomerById = async (req, res) => {
  const customer = await User.findOne({
    _id: req.params.id,
    role: "customer",
  });

  if (!customer) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({ success: true, customer });
};

/* ===============================================
   🟢 Public: Add Customer (Registration)
================================================ */
exports.addCustomer = async (req, res) => {
  const { full_name, email, phone, password, date_of_birth, city } = req.body;

  if (!full_name || !email || !phone || !password || !date_of_birth) {
    return res.status(400).json({ message: "All fields required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Customer already exists" });
  }

  // Auto increment user_id
  const lastUser = await User.findOne().sort({ user_id: -1 });
  const user_id = lastUser ? lastUser.user_id + 1 : 1;

  const newCustomer = await User.create({
    user_id,
    full_name,
    email,
    phone,
    password,
    date_of_birth,
    role: "customer",
  });

  res.status(201).json({
    message: "Customer registered successfully",
    customer: newCustomer,
  });
};

/* ===============================================
   🔵 Admin: Update Customer
================================================ */
exports.updateCustomer = async (req, res) => {
  const updated = await User.findOneAndUpdate(
    { _id: req.params.id, role: "customer" },
    req.body,
    { new: true, runValidators: true }
  );

  if (!updated) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({
    message: "Customer updated successfully",
    customer: updated,
  });
};

/* ===============================================
   🔵 Admin: Delete Customer
================================================ */
exports.deleteCustomer = async (req, res) => {
  const deleted = await User.findOneAndDelete({
    _id: req.params.id,
    role: "customer",
  });

  if (!deleted) {
    return res.status(404).json({ message: "Customer not found" });
  }

  res.json({
    message: "Customer deleted successfully",
    deleted,
  });
};

