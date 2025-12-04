const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  retailer_id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  name: {
    type: String,
    required: [true, "Retailer name is required"],
    trim: true
  },
  contact: {
    type: String,
    required: [true, "Contact number is required"],
    trim: true,
    match: [/^\d{10}$/, "Contact must be exactly 10 digits"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"]
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  gst_no: {
    type: String,
    required: [true, "GST number is required"],
    unique: true,
    uppercase: true,
    trim: true,
   match: [
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/,
  "Invalid GST format"
],

  },
  shop_addresses: {
    type: String,
    required: [true, "Shop address is required"],
    trim: true
  },
  role: { type: String, default: "retailer" },
  registration_date: { type: Date, default: Date.now },
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

retailerSchema.index({ name: 1 });
retailerSchema.index({ shop_addresses: "text" });

module.exports = mongoose.model("Retailer", retailerSchema, "retailers");
