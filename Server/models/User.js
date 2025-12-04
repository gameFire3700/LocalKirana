const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true, unique: true, index: true },

    full_name: { type: String, required: true, trim: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{10}$/],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },

    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" },

    date_of_birth: { type: Date, required: true },

    age: { type: Number, default: 0 },

    addresses: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Address",
      // require: false,
      
    },

    profile_pic: { type: String, default: "" },

    role: {
      type: String,
      default: "customer",
    },

    status: {
      type: String,
      enum: ["active", "inactive", "banned"],
      default: "active",
    },

    is_email_verified: { type: Boolean, default: false },
    is_phone_verified: { type: Boolean, default: false },

    last_login: Date,
    reset_password_token: String,
    reset_password_expires: Date,
  },
  { timestamps: true }
);

// Auto calculate age
userSchema.pre("save", function (next) {
  if (this.date_of_birth) {
    const today = new Date();
    const dob = new Date(this.date_of_birth);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
    this.age = age;
  }
  next();
});

// Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Correct compare function (fixed)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema, "users");
