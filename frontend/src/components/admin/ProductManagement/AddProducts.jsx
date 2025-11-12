import React from "react"; // ✅ required for React.memo// src/components/admin/ProductManagement/AddProduct.jsx
import { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

function AddProduct() {
  const { addProduct } = useContext(ProductContext);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    gender:"",
    size:"",
    images: [] ,
    stock: "", // ← add this// this will store the uploaded image URL or base64
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
 const categories = ["jackets", "shoes","t-shirts","caps"];
 const gender = [ "Male"];
 
 // Handle text input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  const imageArray = [];

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      imageArray.push(reader.result);

      // when all images are read
      if (imageArray.length === files.length) {
        setFormData((prev) => ({
          ...prev,
          images: imageArray,
        }));

        setPreview(imageArray[0]); // show first image as preview
      }
    };
    reader.readAsDataURL(file);
  });
};

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.price || !formData.category||!formData.images) {
      setMessage("⚠️ Please fill all required fields");
      return;
    }

    addProduct(formData); // Send data to context or backend
    setMessage("✅ Product added successfully!");

    // Reset form
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "",
      gender:"",
      size:"",
      images: [],
      stock:"",
    });
    setPreview(null);

    // Clear success message after 2 sec
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h3>Add New Product</h3>

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
          type="number"
          name="price"
          placeholder="Price (PKR)"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* ✅ Category Dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

 
       <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          {gender.map((gender, index) => (
            <option key={index} value={gender}>
              {gender}
            </option>
          ))}
        </select>
       
<select
  name="size"
  value={formData.size}
  onChange={handleChange}
  required
>
  <option value="">Select Size</option>
  <option value="S">Small</option>
  <option value="M">Medium</option>
  <option value="L">Large</option>
  <option value="XL">Extra Large</option>
  <option value="XXL">Double Extra Large</option>
</select>


        {/* ✅ Image Upload Field */}
        <input
          type="file"
          accept="image/*"
           multiple   
          onChange={handleImageChange}
        />

        {/* ✅ Preview Image */}
{formData.images.length > 0 && (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "10px",
    }}
  >
    {formData.images.map((img, index) => (
      <img
        key={index}
        src={img}
        alt={`Preview ${index + 1}`}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    ))}
  </div>
)}

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

        <button
          type="submit"
          style={{
            backgroundColor: "#0077b6",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add Product
        </button>
      </form>

      {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
    </div>
  );
}

export default React.memo(AddProduct);
