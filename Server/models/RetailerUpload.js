const mongoose = require("mongoose");

const retailerUploadSchema = new mongoose.Schema(
  {
    upload_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
     
    // ✅ Which retailer uploaded this file
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: [true, "Retailer reference is required"],
    },

    // ✅ File details
    file_name: {
      type: String,
      required: [true, "File name is required"],
    },

    file_path: {
      type: String,
      required: [true, "File path is required"],
    },

    file_type: {
      type: String,
      enum: ["xlsx", "xls", "csv"],
      default: "xlsx",
    },

    total_rows: {
      type: Number,
      default: 0,
    },

    valid_rows: {
      type: Number,
      default: 0,
    },

    invalid_rows: {
      type: Number,
      default: 0,
    },

    // ✅ Current processing status
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed", "Failed"],
      default: "Pending", 
    },
      
    // ✅ Validation or processing errors
    error_logs: [
      {
        row_number: Number,
        message: String,
      },
    ],

    // ✅ Products parsed from the Excel (stored temporarily)
    parsed_products: [
      {
        name: String,
        description: String,
        price: Number,
        mrp: Number,
        discount: Number,
        stock: Number,
        unit: String,
        category_name: String,
        brand: String,
        expiry_date: Date,
        manufacture_date: Date,
        approval_status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
      },
    ],

    // ✅ Final admin who approved this upload
    approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null,
    },

    remarks: {
      type: String,
      default: "",
    },

    uploaded_at: {
      type: Date,
      default: Date.now,
    },

    completed_at: {
      type: Date,
      default: null,
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Hook — auto-update timestamps and status
retailerUploadSchema.pre("save", function (next) {
  if (this.status === "Completed" && !this.completed_at) {
    this.completed_at = new Date();
  }
  next();
});

// ✅ Virtual: Count success rate
retailerUploadSchema.virtual("success_rate").get(function () {
  if (!this.total_rows || this.total_rows === 0) return 0;
  return ((this.valid_rows / this.total_rows) * 100).toFixed(2);
});

// ✅ Indexing for better performance
retailerUploadSchema.index({ retailer: 1 });
retailerUploadSchema.index({ status: 1 });
retailerUploadSchema.index({ uploaded_at: -1 });

const RetailerUpload = mongoose.model("RetailerUpload", retailerUploadSchema, "retailer_uploads");
module.exports = RetailerUpload;
