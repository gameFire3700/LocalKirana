const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    contact_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email address",
      ],
    },

    phone: {
      type: String,
      match: [/^[0-9]{10}$/, "Invalid phone number"],
      default: "",
    },

    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      maxlength: [100, "Subject cannot exceed 100 characters"],
    },

    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },

    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved", "Closed"],
      default: "New",
    },

    // optional - to track which user submitted it
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    admin_notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

// ✅ Pre-save hook to auto-trim messages
contactSchema.pre("save", function (next) {
  if (this.message) {
    this.message = this.message.trim();
  }
  next();
});

const Contact = mongoose.model("Contact", contactSchema, "contacts");
module.exports = Contact;
