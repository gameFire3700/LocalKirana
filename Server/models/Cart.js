const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    cart_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Which user owns this cart
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // ✅ Optional — Retailer (if cart belongs to specific shop)
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      default: null,
    },

    // ✅ Cart status
    status: {
      type: String,
      enum: ["Active", "Ordered", "Abandoned", "Saved"],
      default: "Active",
    },

    // ✅ Summary totals
    total_items: {
      type: Number,
      default: 0,
    },
    total_quantity: {
      type: Number,
      default: 0,
    },
    subtotal: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    delivery_charges: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    grand_total: {
      type: Number,
      default: 0,
    },

    // ✅ Optional coupon or promo code
    coupon_code: {
      type: String,
      default: "",
    },

    // ✅ Timestamps and flags
    is_active: {
      type: Boolean,
      default: true,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Virtual — link cart items
cartSchema.virtual("items", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "cart",
});

// ✅ Hook — Auto-calculate grand total before save
cartSchema.pre("save", function (next) {
  this.grand_total =
    this.subtotal - this.discount + this.delivery_charges + this.tax;
  next();
});

const Cart = mongoose.model("Cart", cartSchema, "carts");
module.exports = Cart;
