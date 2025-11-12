// src/components/admin/ProductManagement/UpdateProduct.jsx
import React from "react"; // ✅ required for React.memo
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "./ProductContext";

function EditProduct() {
  const { products, editProduct } = useContext(ProductContext);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    gender: "",
    size: "",
    stock: "",
    image: "",
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const categories = ["Jackets", "Clothes"];
  const genders = ["Male", "Female"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  // Load selected product details
  useEffect(() => {
    if (!selectedId) return;
    const product = products.find((p) => p._id === selectedId);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        gender: product.gender,
        size: product.size,
        stock: product.stock,
        image: product.image,
      });
      setPreview(product.image);
    }
  }, [selectedId, products]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFormData({ ...formData, image: reader.result }); // for preview only
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit updated product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) {
      setMessage("⚠️ Select a product first");
      return;
    }

    editProduct(selectedId, formData); // Context function
    setMessage("✅ Product updated successfully!");

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h3>Update Product</h3>

      {/* Select Product */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {selectedId && (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price (PKR)"
            value={formData.price}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genders.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>

          {/* Size */}
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
          >
            <option value="">Select Size</option>
            {sizes.map((s, i) => (
              <option key={i} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock"
            placeholder="Stock Quantity"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
            required
          />

          {/* Image Upload */}
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: "200px",
                objectFit: "cover",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            />
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#0077b6",
              color: "white",
              padding: "10px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Update Product
          </button>
        </form>
      )}

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default React.memo(EditProduct);
