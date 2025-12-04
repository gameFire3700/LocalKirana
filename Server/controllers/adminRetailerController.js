const Retailer = require("../models/Retailer");

exports.getAllRetailers = async (req, res) => {
  try {
    const retailers = await Retailer.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      retailers,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
