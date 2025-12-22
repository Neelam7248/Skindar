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
    realPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["jackets", "t-shirts", "caps", "suits","shirts","hoodies","pants","jeans"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Unisex"],
    },

    // ✅ Sizes with individual stock
    sizes: {
      S: { type: Number, default: 0 },
      M: { type: Number, default: 0 },
      L: { type: Number, default: 0 },
      XL: { type: Number, default: 0 },
      XXL: { type: Number, default: 0 },
    },

    color: {
      type: [String], // Example: ["Red", "Blue", "Black"]
      default: [],
    },
    images: {
      type: [String], // array of image URLs
      default: [],
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
productSchema.index({ createdAt: -1 });
productSchema.index({ category: 1 });
productSchema.index({ gender: 1 });

module.exports = mongoose.model("Product", productSchema);
