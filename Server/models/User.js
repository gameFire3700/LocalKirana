// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define Schema
const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    full_name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^[0-9]{10}$/, "Phone number must be 10 digits"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
      select: false,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },

    date_of_birth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },

    age: {
      type: Number,
      default: 0, // automatically computed before save
    },

    addresses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },

    profile_pic: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["customer", "admin", "retailer"],
      default: "customer",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },

    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },

    last_login: { type: Date },
    reset_password_token: { type: String },
    reset_password_expires: { type: Date },
  },
  { timestamps: true }
);



// ✅ Hook 1: Calculate Age Automatically Before Save
userSchema.pre("save", function (next) {
  if (this.date_of_birth) {
    const today = new Date();
    const dob = new Date(this.date_of_birth);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    this.age = age; // save the calculated age in DB
  }
  next();
});


// ✅ Hook 2: Hash Password Before Save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// ✅ Compare Password Method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};



// ✅ Virtual Example
userSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state}, ${this.address.country} - ${this.address.pincode}`;
});


// ✅ Export Model
const User = mongoose.model("User", userSchema, "users");
module.exports = User;
