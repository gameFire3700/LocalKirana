// controllers/retailerController.js
const Retailer = require("../models/Retailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateRetailerToken = (retailer) => {
  return jwt.sign(
    { id: retailer._id, email: retailer.email, type: "retailer" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

const GST_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
const CONTACT_REGEX = /^[0-9]{10}$/;

exports.registerRetailer = async (req, res) => {
  try {
    let { retailer_id, name, email, contact, gst_no, password, shop_addresses } = req.body;

    // Basic required checks
    if (!retailer_id || !name || !email || !contact || !gst_no || !password || !shop_addresses) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Format validations
    if (!CONTACT_REGEX.test(contact)) {
      return res.status(400).json({ message: "Contact must be a 10 digit number" });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!GST_REGEX.test(gst_no)) {
      return res.status(400).json({ message: "Invalid GST format" });
    }

    // Prevent duplicate email or GST
    const existingByEmail = await Retailer.findOne({ email });
    if (existingByEmail) return res.status(400).json({ message: "Retailer with this email already exists" });

    const existingByGST = await Retailer.findOne({ gst_no });
    if (existingByGST) return res.status(400).json({ message: "Retailer with this GST number already exists" });

    // prevent duplicate retailer_id (regenerate if collision)
    const existsId = await Retailer.findOne({ retailer_id });
    if (existsId) {
      // generate new id
      retailer_id = Math.floor(100000 + Math.random() * 900000);
      // ensure uniqueness (simple loop, but safe for typical loads)
      let tries = 0;
      while (await Retailer.findOne({ retailer_id }) && tries < 5) {
        retailer_id = Math.floor(100000 + Math.random() * 900000);
        tries++;
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newRetailer = await Retailer.create({
      retailer_id,
      name,
      email,
      contact,
      gst_no,
      password: hashedPassword,
      shop_addresses
    });

    return res.status(201).json({
      success: true,
      message: "Retailer registered successfully",
      retailer: {
        id: newRetailer._id,
        name: newRetailer.name,
        email: newRetailer.email
      }
    });

  } catch (err) {
    // Mongoose validation errors
    if (err.name === "ValidationError") {
      // build clean errors object
      const errors = {};
      Object.keys(err.errors).forEach((k) => {
        errors[k] = err.errors[k].message;
      });
      return res.status(400).json({ message: "Validation failed", errors });
    }

    // Duplicate key error (extra safety)
    if (err.code === 11000) {
      // e.g. duplicate key: { email: 1 } -> err.keyValue
      return res.status(400).json({
        message: "Duplicate value",
        errors: err.keyValue
      });
    }

    console.error("registerRetailer ERROR:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.loginRetailer = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const retailer = await Retailer.findOne({ email }).select("+password");
    if (!retailer) return res.status(404).json({ message: "Retailer not found" });

    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = generateRetailerToken(retailer);

    // Set cookie (optional)
    res.cookie("retailerToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      message: "Retailer login successful",
      token,
      retailer: {
        id: retailer._id,
        name: retailer.name,
        email: retailer.email
      }
    });

  } catch (err) {
    console.error("loginRetailer ERROR:", err);
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
};

exports.retailerProfile = async (req, res) => {
  return res.json({
    success: true,
    message: "Retailer profile loaded",
    retailer: req.user
  });
};
