const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    // ✅ Reference to Product
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
    },

    // ✅ Reference to User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },

    // ✅ Review details
    title: {
      type: String,
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },

    comment: {
      type: String,
      required: [true, "Comment is required"],
      maxlength: [1000, "Comment cannot exceed 1000 characters"],
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Minimum rating is 1"],
      max: [5, "Maximum rating is 5"],
    },

    // ✅ Helpful votes (like Amazon)
    helpful_votes: {
      type: Number,
      default: 0,
      min: 0,
    },

    // ✅ Admin moderation
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // ✅ Optional: Attach images for product review
    images: {
      type: [String], // URLs of uploaded review images
      default: [],
    },

    // ✅ Flag if review edited
    is_edited: {
      type: Boolean,
      default: false,
    },

    // ✅ Soft delete
    is_deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ✅ Hook — mark as edited on update
reviewSchema.pre("save", function (next) {
  if (this.isModified("comment") || this.isModified("rating")) {
    this.is_edited = true;
  }
  next();
});

// ✅ Index for performance
reviewSchema.index({ product: 1, user: 1 }, { unique: true }); // One review per user per product
reviewSchema.index({ rating: -1 });

const Review = mongoose.model("Review", reviewSchema, "reviews");
module.exports = Review;
