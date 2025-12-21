const mongoose = require("mongoose");

const productRequestSchema = new mongoose.Schema(
  {
    retailer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      default: ""
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },

    brand: {
      type: String,
      default: ""
    },

    image: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    rejection_reason: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "ProductRequest",
  productRequestSchema,
  "product_requests"
);
