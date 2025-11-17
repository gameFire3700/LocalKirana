const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
};

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { full_name, email, phone, password, role, date_of_birth } = req.body;

    if (!full_name || !email || !password || !phone || !date_of_birth) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Auto increment user_id
    const lastUser = await User.findOne().sort({ user_id: -1 });
    const user_id = lastUser ? lastUser.user_id + 1 : 1;

    const user = await User.create({
      user_id,
      full_name,
      email,
      phone,
      password,
      role: role || "customer",
      date_of_birth,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token: generateToken(user),
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

const token = generateToken(user);

// 🟢 Cookie set
res.cookie("userToken", token, {
  httpOnly: true,
  secure: false,
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

    res.json({
      success: true,
      message: "Login successful",
      token: generateToken(user),
      user: {
        id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
