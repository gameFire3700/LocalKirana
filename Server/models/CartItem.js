const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    cart_item_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Reference to cart
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: [true, "Cart reference is required"],
    },

    // ✅ Reference to product
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
      required: true,
      min: [1, "Quantity must be at least 1"],
    },

    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },

    discount_per_item: {
      type: Number,
      default: 0,
      min: [0, "Discount cannot be negative"],
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

    is_saved_for_later: {
      type: Boolean,
      default: false,
    },

    added_date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// ✅ Hook — Auto-calculate total price
cartItemSchema.pre("save", function (next) {
  this.total_price = (this.price - this.discount_per_item) * this.quantity;
  next();
});

const CartItem = mongoose.model("CartItem", cartItemSchema, "cart_items");
module.exports = CartItem;
