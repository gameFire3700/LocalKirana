const mongoose = require("mongoose");

const rationListSchema = new mongoose.Schema(
  {
    list_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Who created the list
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // ✅ Optional: Retailer (if user wants to order from a specific shop)
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      default: null,
    },

    name: {
      type: String,
      required: [true, "List name is required"],
      trim: true,
      minlength: [2, "List name must be at least 2 characters"],
      maxlength: [100, "List name too long"],
    },

    description: {
      type: String,
      default: "",
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    is_favorite: {
      type: Boolean,
      default: false,
    },

    is_active: {
      type: Boolean,
      default: true,
    },

    total_items: {
      type: Number,
      default: 0,
    },

    total_value: {
      type: Number,
      default: 0,
    },

    last_used_date: {
      type: Date,
      default: null,
    },

    shared_with: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// ✅ Virtual: Ration items linked to this list
rationListSchema.virtual("items", {
  ref: "RationItem",
  localField: "_id",
  foreignField: "ration_list",
});

// ✅ Hook: Update timestamps and maintain active status
rationListSchema.pre("save", function (next) {
  if (this.total_items > 0) this.is_active = true;
  next();
});

const RationList = mongoose.model("RationList", rationListSchema, "ration_lists");
module.exports = RationList;
