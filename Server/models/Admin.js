const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema(
  {
    admin_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    full_name: {
      type: String,
      required: [true, "Admin name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Invalid email address",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    phone: {
      type: String,
      required: [true, "Phone is required"],
      match: [/^[0-9]{10}$/, "Invalid phone number"],
      default: "",
    },

    // ROLE BASED
    role: {
      type: String,
      enum: ["SuperAdmin", "Admin", "Manager", "Approver", "Support"],
      default: "Admin",
    },

    assigned_retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      default: null,
    },

    // PRODUCT APPROVAL HISTORY
    approvals: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        approved_at: { type: Date },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
        remarks: { type: String, default: "" },
      },
    ],

    is_active: { type: Boolean, default: true },

    last_login: {
      type: Date,
      default: null,
    },

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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/* ==========================================================
   🔐 HASH PASSWORD
========================================================== */
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

/* ==========================================================
   🔑 MATCH PASSWORD
========================================================== */
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* ==========================================================
   🕒 UPDATE LAST LOGIN
========================================================== */
adminSchema.methods.updateLoginTime = async function () {
  this.last_login = new Date();
  await this.save();
};

/* ==========================================================
   📊 VIRTUAL FIELD
========================================================== */
adminSchema.virtual("total_approvals").get(function () {
  return this.approvals.filter((a) => a.status === "Approved").length;
});

/* ==========================================================
   🔍 INDEXES
========================================================== */
adminSchema.index({ role: 1 });
adminSchema.index({ assigned_retailer: 1 });
adminSchema.index({ "approvals.status": 1 });

module.exports = mongoose.model("Admin", adminSchema, "admin");
