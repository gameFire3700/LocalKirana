const mongoose = require("mongoose");

const retailerProductSchema = new mongoose.Schema({
  retailerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  price: Number,
  stock: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

retailerProductSchema.index(
  { retailerId: 1, productId: 1 },
  { unique: true }
);

module.exports = mongoose.model("RetailerProduct", retailerProductSchema);
