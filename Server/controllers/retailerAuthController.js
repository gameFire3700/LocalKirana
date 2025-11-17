// controllers/retailerAuthController.js
const Retailer = require("../models/Retailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/* ---------------------- Generate JWT Token ---------------------- */
const generateRetailerToken = (retailer) => {
  return jwt.sign(
    { id: retailer._id, email: retailer.email, type: "retailer" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

/* ---------------------- Register Retailer ---------------------- */
exports.registerRetailer = async (req, res, next) => {
  try {
    const { retailer_id, name, email, contact, gst_no, password,shop_addresses } = req.body;

    if (!retailer_id || !name || !email || !contact || !gst_no || !password || !shop_addresses) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const exists = await Retailer.findOne({ email });
    if (exists) return res.status(400).json({ message: "Retailer already exists" });

    // Hash password
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

    res.status(201).json({
      message: "Retailer registered successfully",
      retailer: {
        id: newRetailer._id,
        name: newRetailer.name,
        email: newRetailer.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------- Login Retailer ---------------------- */
exports.loginRetailer = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const retailer = await Retailer.findOne({ email }).select("+password");
    if (!retailer) return res.status(404).json({ message: "Retailer not found" });

    const isMatch = await bcrypt.compare(password, retailer.password);
    if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

    const token = generateRetailerToken(retailer);

    // 🟢 Set cookie
    res.cookie("retailerToken", token, {
      httpOnly: true,
      secure: false,       // true if HTTPS
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: "Retailer login successful",
      token:  generateRetailerToken(retailer),
      retailer: {
        id: retailer._id,
        name: retailer.name,
        email: retailer.email
      }
    });
  } catch (err) {
    next(err);
  }
};

/* ---------------------- Retailer Profile ---------------------- */
exports.retailerProfile = async (req, res) => {
  res.json({
    message: "Retailer profile loaded",
    retailer: req.user,
  });
};





// const Retailer = require('../models/Retailer');

// // Add Retailer
// exports.addRetailer = async (req, res, next) => {
//   try {
//     const retailer = new Retailer(req.body);
//     await retailer.save();
//     res.status(201).json({ message: "✅ Retailer added successfully!", retailer }); 
//   } catch (err) {
//     next(err);
//   }
// };

// exports.getAllRetailers = async (req, res, next) => {
//   try {
//     const retailers = await Retailer.find();
//     console.log('Fetched retailers from DB:', retailers);   // <- debug
//     res.status(200).json({ success: true, count: retailers.length, data: retailers });
//   } catch (err) {
//     next(err);
//   }
// };

// // controllers/retailerController.js
// exports.getRetailerById = async (req, res, next) => {
//   try {
//     const id = Number(req.params.id);            // ← important
//     const retailer = await Retailer.findOne({ retailerId: id });
//     if (!retailer) return res.status(404).json({ message: 'Retailer not found' });
//     res.json(retailer);
//   } catch (err) {
//     next(err);
//   }
// };

// // Update Retailer
// exports.updateRetailer = async (req, res, next) => {
//   try {
//     const retailer = await Retailer.findOneAndUpdate(
//       { retailerId: req.params.id },
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!retailer) return res.status(404).json({ message: "Retailer not found" });
//     res.json({ message: "✅ Retailer updated successfully!", retailer });
//   } catch (err) {
//     next(err);
//   }
// };

// // Delete Retailer
// exports.deleteRetailer = async (req, res, next) => {
//   try {
//     const deleted = await Retailer.findOneAndDelete({ retailerId: req.params.id });
//     if (!deleted) return res.status(404).json({ message: "Retailer not found" });
//     res.json({ message: "🗑️ Retailer deleted successfully!", deleted });
//   } catch (err) {
//     next(err);
//   }
// };
