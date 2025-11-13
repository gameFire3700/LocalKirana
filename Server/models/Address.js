// models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    address_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // optional link to user
    },

    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      default: null, // optional link to retailer
    },

    type: {
      type: String,
      enum: ["Home", "Office", "Shop", "Billing", "Shipping"],
      default: "Home",
    },

    street: {
      type: String,
      required: [true, "Street address is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
    },

    state: {
      type: String,
      required: [true, "State is required"],
    },

    country: {
      type: String,
      default: "India",
    },

    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^[0-9]{6}$/, "Invalid pincode format"],
    },

    landmark: {
      type: String,
      default: "",
    },

    is_default: {
      type: Boolean,
      default: false,
    },

    latitude: {
      type: Number, // optional for map integration
    },

    longitude: {
      type: Number,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Export the model
const Address = mongoose.model("Address", addressSchema, "addresses");
module.exports = Address;
