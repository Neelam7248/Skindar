const express = require("express");
const router = express.Router();
const Product = require("../models/Products");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");

// Configure multer storage (memory storage for Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // Cloud URL
      }
    );
    stream.end(fileBuffer);
  });
};

// Add Product route
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { name, description, realPrice, discountPrice, category, gender, sizes, colors, stock } = req.body;

    if (!name || !description || !realPrice || !discountPrice || !category || !gender || !sizes|| !colors) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Upload images to Cloudinary
    const uploadedImages = [];
    for (const file of req.files) {
      const url = await uploadToCloudinary(file.buffer);
      uploadedImages.push(url);
    }

    // Parse sizes
    const parsedSizes = sizes ? JSON.parse(sizes) : { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
const parsedColors = colors ? JSON.parse(colors) : { SelectedProduct:0,Red:0,Blue:0,Green:0,Black:0,White:0,Yellow:0,Purple:0,Orange:0,Brown:0,Gray:0};
    const newProduct = new Product({
      name,
      description,
      realPrice,
      discountPrice,
      category,
      gender,
      sizes: parsedSizes,
      images: uploadedImages,
      colors: parsedColors,
      stock,
    });

    await newProduct.save();

    res.status(201).json({ message: "✅ Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});




router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // fetch 20 products at a time

    const products = await Product.find({}, "name realPrice discountPrice images sizes colors category stock")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✏️ Update Product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "✅ Product updated", product: updatedProduct });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ❌ Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "🗑️ Product deleted successfully!" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/inventory", async (req, res) => {
  try {
    const products = await Product.find(); // get all products
    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

    res.json({
      totalProducts,
      
      totalStock,
      products, // optional: send full product list if needed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET products by category
router.get("/byCategory", async (req, res) => {
  try {
    let { category } = req.query; // get query param

    if (!category) {
      return res.status(400).json({ message: "Category query is required" });
    }

    // Normalize category (e.g., "T-Shirts" -> "t-shirts")
    category = category.toLowerCase();

    // Only allow valid categories
    const validCategories = ["jackets", "t-shirts", "jeans", "caps","shirts","pants","suits","hoodies"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Fetch products by exact category
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: `New products are comming soon in this category.All ${category} are sold . ` });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});



module.exports = router;
