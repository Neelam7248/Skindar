const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["jackets", "t-shirts", "shoes", "caps"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Unisex"],
    },
    size: {
      type: [String], // Example: ["S", "M", "L", "XL"]
      default: [],
    },
    color: {
      type: [String], // Example: ["Red", "Blue", "Black"]
      default: [],
    },
    images: {
  type: [String], // array of image URLs
  default: [],    // agar image nahi di gayi to empty array
},

    stock: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or seller reference
    },
    rating: {
      average: { type: Number, default: 0, min: 0 },
      count: { type: Number, default: 0, min: 0 },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
