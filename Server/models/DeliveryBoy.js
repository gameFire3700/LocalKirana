// models/DeliveryBoy.js
const mongoose = require("mongoose");

const deliveryBoySchema = new mongoose.Schema(
  {
    delivery_boy_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Basic info
    info: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DeliveryBoyInfo", // Personal info table
      required: true,
    },

    // ✅ Work status
    status: {
      type: String,
      enum: ["Active", "Inactive", "On-Delivery", "Offline"],
      default: "Active",
    },

    is_verified: {
      type: Boolean,
      default: false,
    },

    // ✅ Current Order Info
    current_order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      default: null,
    },

    // ✅ Pickup (Retailer) Info
    pickup_details: {
      retailer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Retailer",
        default: null,
      },
      retailer_name: { type: String, default: "" },
      pickup_address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" },
        pincode: { type: String, match: [/^[0-9]{6}$/, "Invalid pincode"] },
        coordinates: {
          lat: { type: Number, default: 0 },
          lng: { type: Number, default: 0 },
        },
      },
      contact_number: { type: String, default: "" },
    },

    // ✅ Delivery (User) Info
    delivery_details: {
      user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
      },
      user_name: { type: String, default: "" },
      delivery_address: {
        street: { type: String, default: "" },
        city: { type: String, default: "" },
        state: { type: String, default: "" },
        country: { type: String, default: "India" },
        pincode: { type: String, match: [/^[0-9]{6}$/, "Invalid pincode"] },
        coordinates: {
          lat: { type: Number, default: 0 },
          lng: { type: Number, default: 0 },
        },
      },
      contact_number: { type: String, default: "" },
    },

    // ✅ Delivery status tracking
    delivery_status: {
      type: String,
      enum: [
        "Assigned",
        "Picked-Up",
        "In-Transit",
        "Delivered",
        "Cancelled",
        "Failed",
      ],
      default: "Assigned",
    },

    // ✅ Live tracking timestamps
    pickup_time: { type: Date, default: null },
    delivery_time: { type: Date, default: null },
    estimated_delivery_time: { type: Date, default: null },

    // ✅ Performance
    total_deliveries: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    success_rate: { type: Number, default: 0, min: 0, max: 100 },

    // ✅ Earnings
    salary: {
      base_salary: { type: Number, default: 0 },
      per_delivery_fee: { type: Number, default: 0 },
      total_earnings: { type: Number, default: 0 },
    },

    // ✅ Created/Updated by
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },

    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

//
// 🧠 Hooks
//
deliveryBoySchema.pre("save", function (next) {
  if (this.total_deliveries > 0 && this.rating > 0) {
    this.success_rate = Math.min(((this.rating / 5) * 100).toFixed(2), 100);
  }

  // Auto set timestamps
  if (this.delivery_status === "Picked-Up" && !this.pickup_time) {
    this.pickup_time = new Date();
  }
  if (this.delivery_status === "Delivered" && !this.delivery_time) {
    this.delivery_time = new Date();
  }
  next();
});

//
// 📊 Indexes for Performance
//
deliveryBoySchema.index({ status: 1 });
deliveryBoySchema.index({ delivery_status: 1 });
deliveryBoySchema.index({ is_verified: 1 });
deliveryBoySchema.index({ "pickup_details.city": 1 });
deliveryBoySchema.index({ "delivery_details.city": 1 });

//
// ✅ Export model
//
const DeliveryBoy = mongoose.model("DeliveryBoy", deliveryBoySchema, "delivery_boys");
module.exports = DeliveryBoy;
