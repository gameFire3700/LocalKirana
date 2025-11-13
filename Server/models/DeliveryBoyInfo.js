// models/DeliveryBoyInfo.js
const mongoose = require("mongoose");

const deliveryBoyInfoSchema = new mongoose.Schema(
  {
    info_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Personal details
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Male",
    },

    date_of_birth: {
      type: Date,
      required: false,
    },

    contact_number: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^[0-9]{10}$/, "Invalid mobile number"],
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
      default: null,
    },

    // ✅ Address Info (can also link to Address model later)
    address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
      pincode: { type: String, match: [/^[0-9]{6}$/, "Invalid pincode"] },
    },

    // ✅ Govt & Identity Details
    aadhar_no: {
      type: String,
      match: [/^[0-9]{12}$/, "Invalid Aadhar number"],
      unique: true,
      sparse: true,
    },

    license_no: {
      type: String,
      default: "",
    },

    pan_no: {
      type: String,
      match: [/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format"],
      sparse: true,
    },

    emergency_contact: {
      name: { type: String, default: "" },
      relation: { type: String, default: "" },
      phone: { type: String, match: [/^[0-9]{10}$/, "Invalid phone number"] },
    },

    blood_group: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", "Unknown"],
      default: "Unknown",
    },

    profile_photo: {
      type: String,
      default: "", // store image URL
    },

    // ✅ Verification & Status
    is_verified: {
      type: Boolean,
      default: false,
    },

    verification_date: {
      type: Date,
      default: null,
    },

    documents: [
      {
        doc_type: { type: String }, // e.g. Aadhar, License, Police Verification
        doc_number: { type: String },
        file_url: { type: String },
        verified: { type: Boolean, default: false },
      },
    ],

    // ✅ Meta Info
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

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

//
// 📊 Indexes for fast search
//
deliveryBoyInfoSchema.index({ name: "text", contact_number: 1 });
deliveryBoyInfoSchema.index({ city: 1, state: 1 });
deliveryBoyInfoSchema.index({ is_verified: 1 });

//
// ✅ Export model
//
const DeliveryBoyInfo = mongoose.model(
  "DeliveryBoyInfo",
  deliveryBoyInfoSchema,
  "delivery_boy_info"
);
module.exports = DeliveryBoyInfo;
