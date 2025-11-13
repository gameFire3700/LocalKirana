const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    stock_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Link to Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },

    // ✅ Link to Retailer (each retailer has its own stock)
    retailer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Retailer",
      required: [true, "Retailer reference is required"],
    },

    // ✅ Optional link to category (for reports)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    available_quantity: {
      type: Number,
      required: [true, "Available quantity is required"],
      min: [0, "Available quantity cannot be negative"],
    },

    reserved_quantity: {
      type: Number,
      default: 0,
      min: [0, "Reserved quantity cannot be negative"],
    },

    damaged_quantity: {
      type: Number,
      default: 0,
      min: [0, "Damaged quantity cannot be negative"],
    },

    reorder_level: {
      type: Number,
      default: 10,
      min: [0, "Reorder level cannot be negative"],
    },

    reorder_quantity: {
      type: Number,
      default: 50,
      min: [0, "Reorder quantity cannot be negative"],
    },

    last_restock_date: {
      type: Date,
      default: null,
    },

    last_sold_date: {
      type: Date,
      default: null,
    },

    stock_status: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock", "Reserved", "Damaged"],
      default: "In Stock",
    },

    // ✅ Location will be auto-synced from Retailer
    location: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
      pincode: {
        type: String,
        match: [/^[0-9]{6}$/, "Invalid pincode format"],
      },
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



// ✅ Pre-save hook — Auto-fill stock_status & retailer location
stockSchema.pre("save", async function (next) {
  try {
    // 1️⃣ Auto-update stock status
    if (this.available_quantity <= 0) {
      this.stock_status = "Out of Stock";
    } else if (this.available_quantity <= this.reorder_level) {
      this.stock_status = "Low Stock";
    } else {
      this.stock_status = "In Stock";
    }

    // 2️⃣ Sync location from retailer
    if (this.isModified("retailer") || !this.location.city) {
      const Retailer = mongoose.model("Retailer");
      const retailer = await Retailer.findById(this.retailer).select("shop_address");

      if (retailer && retailer.shop_address) {
        this.location = {
          ...this.location,
          street: retailer.shop_address.street || "",
          city: retailer.shop_address.city || "",
          state: retailer.shop_address.state || "",
          country: retailer.shop_address.country || "India",
          pincode: retailer.shop_address.pincode || "",
        };
      }
    }

    next();
  } catch (err) {
    next(err);
  }
});



// ✅ Virtual field — Total quantity
stockSchema.virtual("total_quantity").get(function () {
  return (
    this.available_quantity +
    this.reserved_quantity +
    this.damaged_quantity
  );
});


// ✅ Indexing for better performance
stockSchema.index({ product: 1, retailer: 1 });
stockSchema.index({ stock_status: 1 });
stockSchema.index({ last_restock_date: -1 });


// ✅ Export model
const Stock = mongoose.model("Stock", stockSchema, "stocks");
module.exports = Stock;
