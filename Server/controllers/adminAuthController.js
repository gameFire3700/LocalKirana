const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const generateAdminToken = (admin) => {
  return jwt.sign(
    { id: admin._id, email: admin.email, type: "admin", role: admin.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

exports.registerAdmin = async (req, res) => {
  try {
    const { full_name, email, password, phone, role } = req.body;

    if (!full_name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already registered" });
    }

    // Compute admin_id
    const lastAdmin = await Admin.findOne().sort({ admin_id: -1 });
    const admin_id = lastAdmin ? lastAdmin.admin_id + 1 : 1001;

    const admin = await Admin.create({
      admin_id,
      full_name,
      email,
      password,
      phone,
      role
    });

    // DO NOT return password
    const safeAdmin = {
      id: admin._id,
      admin_id: admin.admin_id,
      full_name: admin.full_name,
      email: admin.email,
      role: admin.role
    };

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      admin: safeAdmin
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ---------------------- Login Admin ---------------------- */
exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // check active
    if (admin.is_deleted || !admin.is_active) {
      return res.status(403).json({ message: "Admin account is inactive" });
    }

    const match = await admin.matchPassword(password);
    if (!match) {
      // TODO: add failed login tracking to prevent brute force
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // update last login
    await admin.updateLoginTime();

    const token = generateAdminToken(admin);

    // Set cookie
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      success: true,
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        full_name: admin.full_name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
