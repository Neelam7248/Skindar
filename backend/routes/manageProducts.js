const express = require("express");
const router = express.Router();
const Product = require("../models/Products");

// ✅ Add Product
router.post("/add", async (req, res) => {
  try {
    const { name, description, price, category, gender, size, images, stock } = req.body;

    if (!name ||!description|| !price || !category || !gender|| !size || !images) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      gender,
      size,
      images,
    stock,
    });

    await newProduct.save();
    res.status(201).json({ message: "✅ Product added successfully!", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error", error:error.message });
  }
});

// 📜 Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✏️ Update Product
router.put("/update/:id", async (req, res) => {
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
router.delete("/delete/:id", async (req, res) => {
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
    const validCategories = ["jackets", "t-shirts", "shoes", "caps"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    // Fetch products by exact category
    const products = await Product.find({ category });

    if (products.length === 0) {
      return res.status(404).json({ message: `No products found in category: ${category}` });
    }

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products by category:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
});



module.exports = router;
