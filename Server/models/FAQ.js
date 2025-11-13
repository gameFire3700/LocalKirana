// models/FAQ.js
const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    faq_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    question: {
      type: String,
      required: [true, "FAQ question is required"],
      trim: true,
      minlength: [5, "Question should be at least 5 characters long"],
      maxlength: [500, "Question too long"],
    },

    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
      minlength: [5, "Answer should be at least 5 characters long"],
    },

    // ✅ Which category this FAQ belongs to (optional)
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },

    // ✅ Related Product (optional)
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: null,
    },

    // ✅ Who created this FAQ (Admin or Retailer)
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // or "Retailer"
      required: false,
    },

    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ✅ Type of FAQ (for filtering)
    type: {
      type: String,
      enum: ["General", "Retailer", "Customer", "Product"],
      default: "General",
    },

    // ✅ Visibility controls
    is_published: {
      type: Boolean,
      default: false, // publish after admin approval
    },

    is_deleted: {
      type: Boolean,
      default: false,
    },

    // ✅ Status for moderation
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // ✅ Tags for search
    tags: {
      type: [String],
      default: [],
    },

    // ✅ SEO fields (if you display FAQs on frontend)
    meta_title: {
      type: String,
      default: "",
    },
    meta_description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

faqSchema.index({ question: "text", answer: "text", tags: 1 });
faqSchema.index({ category: 1 });
faqSchema.index({ status: 1 });
faqSchema.index({ is_published: 1 });

// ✅ Export Model
const FAQ = mongoose.model("FAQ", faqSchema, "faqs");
module.exports = FAQ;
