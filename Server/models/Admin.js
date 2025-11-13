const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employee_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: [true, "Employee name is required"],
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
      select: false, // hide by default
    },

    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
      default: "",
    },

    // ✅ Role determines authority level
    role: {
      type: String,
      enum: ["Admin", "Manager", "Approver", "Support"],
      default: "Approver",
    },

    // ✅ Employee assigned retailer (if applicable)
    assigned_retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      default: null,
    },

    // ✅ Product approval tracking
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

    // ✅ Account status
    is_active: {
      type: Boolean,
      default: true,
    },

    last_login: {
      type: Date,
      default: null,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee", // who added this employee
      default: null,
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ✅ Hook — Update last_login when logged in
employeeSchema.methods.updateLoginTime = async function () {
  this.last_login = new Date();
  await this.save();
};

// ✅ Virtual — total approvals given
employeeSchema.virtual("total_approvals").get(function () {
  return this.approvals.filter((a) => a.status === "Approved").length;
});

// ✅ Indexes for better query performance
employeeSchema.index({ role: 1 });
employeeSchema.index({ "approvals.status": 1 });
employeeSchema.index({ assigned_retailer: 1 });

const Employee = mongoose.model("Employee", employeeSchema, "employees");
module.exports = Employee;
