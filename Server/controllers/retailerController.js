const Retailer = require('../models/Retailer');

// Add Retailer
exports.addRetailer = async (req, res, next) => {
  try {
    const retailer = new Retailer(req.body);
    await retailer.save();
    res.status(201).json({ message: "✅ Retailer added successfully!", retailer }); 
  } catch (err) {
    next(err);
  }
};

exports.getAllRetailers = async (req, res, next) => {
  try {
    const retailers = await Retailer.find();
    console.log('Fetched retailers from DB:', retailers);   // <- debug
    res.status(200).json({ success: true, count: retailers.length, data: retailers });
  } catch (err) {
    next(err);
  }
};

// controllers/retailerController.js
exports.getRetailerById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);            // ← important
    const retailer = await Retailer.findOne({ retailerId: id });
    if (!retailer) return res.status(404).json({ message: 'Retailer not found' });
    res.json(retailer);
  } catch (err) {
    next(err);
  }
};

// Update Retailer
exports.updateRetailer = async (req, res, next) => {
  try {
    const retailer = await Retailer.findOneAndUpdate(
      { retailerId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!retailer) return res.status(404).json({ message: "Retailer not found" });
    res.json({ message: "✅ Retailer updated successfully!", retailer });
  } catch (err) {
    next(err);
  }
};

// Delete Retailer
exports.deleteRetailer = async (req, res, next) => {
  try {
    const deleted = await Retailer.findOneAndDelete({ retailerId: req.params.id });
    if (!deleted) return res.status(404).json({ message: "Retailer not found" });
    res.json({ message: "🗑️ Retailer deleted successfully!", deleted });
  } catch (err) {
    next(err);
  }
};
