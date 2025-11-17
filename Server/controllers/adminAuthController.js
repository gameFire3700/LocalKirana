const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

/* ---------------------- Generate JWT Token ---------------------- */
const generateAdminToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, type: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ---------------------- Register Admin ---------------------- */
exports.registerAdmin = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.json({ message: "Admin already registered" });
    }

    const lastAdmin = await Admin.findOne().sort({ admin_id: -1 });
    const admin_id = lastAdmin ? lastAdmin.admin_id + 1 : 1001;

    const admin = await Admin.create({
      admin_id,
      full_name,
      email,
      password
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------------- Login Admin ---------------------- */
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const match = await admin.matchPassword(password);
    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = generateAdminToken(admin);

    // 🟢 Set cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false,       // true if HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: "Admin login successful",
      token: generateAdminToken(admin),
      admin: {
        id: admin._id,
        full_name: admin.full_name,
        email: admin.email
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
