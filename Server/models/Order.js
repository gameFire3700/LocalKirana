// models/Order.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    order_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // 👤 User placing the order
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // 🏪 Retailer fulfilling the order
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      default: null,
    },

    // 📦 List of ordered products
    

    // 💰 Order Summary
    total_items: {
      type: Number,
      required: true,
    },
    subtotal_amount: {
      type: Number,
      required: true,
    },
    tax_amount: {
      type: Number,
      default: 0,
    },
    shipping_charge: {
      type: Number,
      default: 0,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    discount_amount: {
      type: Number,
      default: 0,
    },

    // 📍 Delivery Address (linked from Address table)
    shipping_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    billing_address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: null,
    },

    // 💳 Payment Details
    payment_method: {
      type: String,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net Banking", "Wallet"],
      required: [true, "Payment method is required"],
    },
    payment_status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },
    transaction_id: {
      type: String,
      default: null,
    },

    // 🚚 Delivery Status
    order_status: {
      type: String,
      enum: ["Pending", "Confirmed", "Packed", "Shipped", "Delivered", "Cancelled", "Returned"],
      default: "Pending",
    },

    delivery_date: {
      type: Date,
    },

    expected_delivery: {
      type: Date,
    },

    // 🧾 Tracking and Audit
    notes: {
      type: String,
      default: "",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Virtual relation: link to OrderItems
orderSchema.virtual("items", {
  ref: "OrderItem",
  localField: "_id",
  foreignField: "order",
});


// ✅ Auto-calculate subtotal and total before saving
orderSchema.pre("save", function (next) {
  if (this.items && this.items.length > 0) {
    this.subtotal_amount = this.items.reduce((sum, item) => sum + item.subtotal, 0);
    this.total_items = this.items.length;
    this.total_amount =
      this.subtotal_amount + this.tax_amount + this.shipping_charge - this.discount_amount;
  }
  next();
});

// ✅ Export Model
const Order = mongoose.model("Order", orderSchema, "orders");
module.exports = Order;
