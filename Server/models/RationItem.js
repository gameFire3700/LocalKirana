const mongoose = require("mongoose");

const rationItemSchema = new mongoose.Schema(
  {
    ration_item_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    ration_list: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "RationList",
      required: [true, "Ration list reference is required"],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },

    product_name: {
      type: String,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    unit: {
      type: String,
      default: "pcs",
    },

    price_at_time: {
      type: Number,
      required: [true, "Price at the time of adding is required"],
      min: [0, "Price cannot be negative"],
    },

    total_price: {
      type: Number,
      default: 0,
    },

    notes: {
      type: String,
      default: "",
      maxlength: [200, "Notes too long"],
    },

    is_checked: {
      type: Boolean,
      default: false, // user can check/uncheck during shopping
    },

    added_date: {
      type: Date,
      default: Date.now,
    },

    updated_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Hook: Auto calculate total price
rationItemSchema.pre("save", function (next) {
  this.total_price = this.quantity * this.price_at_time;
  this.updated_date = new Date();
  next();
});

const RationItem = mongoose.model("RationItem", rationItemSchema, "ration_items");
module.exports = RationItem;
