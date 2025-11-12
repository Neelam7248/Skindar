import React from "react"; // ✅ required for React.memo// src/components/admin/ProductManagement/DeleteProduct.jsx
import { useState, useContext } from "react";
import { ProductContext } from "./ProductContext";

function DeleteProduct() {
  const { products, deleteProduct } = useContext(ProductContext);
  const [selectedId, setSelectedId] = useState("");
  const [message, setMessage] = useState("");

  const selectedProduct = products.find((p) => p._id === selectedId);

  const handleDelete = () => {
    if (!selectedId) {
      setMessage("⚠️ Select a product first!");
      return;
    }
    deleteProduct(selectedId); // delete from context/backend
    setMessage("✅ Product deleted successfully!");
    setSelectedId(""); // reset dropdown
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h3>Delete Product</h3>

      {/* Select Product */}
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "5px" }}
      >
        <option value="">Select Product</option>
        {products.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      {/* Display selected product info */}
      {selectedProduct && (
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
            marginBottom: "10px",
            textAlign: "left",
            display: "flex",
            gap: "10px",
          }}
        >
          {selectedProduct.image && (
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "5px" }}
            />
          )}
          <div>
            <p><strong>Name:</strong> {selectedProduct.name}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>
            <p><strong>Size:</strong> {selectedProduct.size}</p>
            <p><strong>Price:</strong> {selectedProduct.price} PKR</p>
            <p><strong>Stock:</strong> {selectedProduct.stock}</p>
          </div>
        </div>
      )}

      <button
        onClick={handleDelete}
        style={{
          backgroundColor: "red",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Delete Product
      </button>

      {message && (
        <p style={{ color: "green", marginTop: "10px", textAlign: "center" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default React.memo(DeleteProduct);
