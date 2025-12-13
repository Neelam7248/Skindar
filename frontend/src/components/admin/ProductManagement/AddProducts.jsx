import React, { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";
import "../../customers/CustomerRegister.css";

function AddProduct() {
  const { addProduct } = useContext(ProductContext);
  const sizes = ["S", "M", "L", "XL", "XXL"];
  const [formData, setFormData] = useState({
    name: "",
    realPrice: "",
    discountPrice: "",
    category: "",
    description: "",
    gender: "",
    images: [],
    stock: "",
    sizes: {
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
  });

  const [message, setMessage] = useState("");

  const categories = ["jackets", "shirts", "t-shirts", "pants","jeans","hoddies","suits","caps"];
  const gender = ["Male"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSizeChange = (size, value) => {
  setFormData({
    ...formData,
    sizes: { ...formData.sizes, [size]: Number(value) },
  });
};

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageArray = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        imageArray.push(reader.result);

        if (imageArray.length === files.length) {
          setFormData((prev) => ({
            ...prev,
            images: imageArray,
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Required validation
    if (
      !formData.name ||
      !formData.realPrice ||
      !formData.discountPrice ||
      !formData.category ||
      !formData.description ||
      !formData.gender ||
      !formData.images.length
    ) {
      setMessage("⚠️ Please fill all required fields");
      return;
    }

    // Add product to context / backend
    addProduct(formData);

    setMessage("✅ Product added successfully!");

    // Reset form after submission
    setFormData({
      name: "",
      realPrice: "",
      discountPrice: "",
      category: "",
      description: "",
      gender: "",
      images: [],
      stock: "",
      sizes: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      },
    });

    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="register-page">
      <h2>Add New Product</h2>

      <div className="register-card">
        <form onSubmit={handleSubmit}>

          {/* Product Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Prices */}
          <input
            type="number"
            name="realPrice"
            placeholder="Real Price (PKR)"
            value={formData.realPrice}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="discountPrice"
            placeholder="Discount Price (PKR)"
            value={formData.discountPrice}
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

          {/* Description */}
          <input
            type="text"
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {gender.map((g, i) => (
              <option key={i} value={g}>
                {g}
              </option>
            ))}
          </select>

         <div>
  <label>Quantity by Size:</label>
  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "5px" }}>
    {sizes.map((s) => (
      <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span>{s}</span>
        <input
          type="number"
          min="0"
          value={formData.sizes[s]}
          onChange={(e) => handleSizeChange(s, e.target.value)}
          style={{ width: "60px", textAlign: "center" }}
        />
      </div>
    ))}
  </div>
</div>

          {/* Images */}
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />

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
                  alt="preview"
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

          {/* Stock */}
          <input
            type="number"
            name="stock"
            placeholder="Total Stock"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
            required
          />

          <button type="submit">Add Product</button>
        </form>

        {message && (
          <p style={{ color: "green", marginTop: "10px" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default React.memo(AddProduct);
