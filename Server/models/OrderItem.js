// models/OrderItem.js
const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order reference is required"],
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },

    name: {
      type: String,
      required: [true, "Product name is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    mrp: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
    },

    subtotal: {
      type: Number,
      required: [true, "Subtotal is required"],
    },

    status: {
      type: String,
      enum: ["Pending", "Packed", "Shipped", "Delivered", "Cancelled", "Returned"],
      default: "Pending",
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

// ✅ Auto calculate subtotal before save
orderItemSchema.pre("save", function (next) {
  this.subtotal = this.quantity * this.price;
  next();
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema, "order_items");
module.exports = OrderItem;
