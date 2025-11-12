import { useEffect, useState } from "react";
import axios from "axios";
import React from "react"; // ✅ required for React.memo
function AdminInventory() {
  const [inventory, setInventory] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/inventory");
        setInventory(res.data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      }
    };
    fetchInventory();
  }, []);

  if (!inventory) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ border: "1px solid #101010ff",backgroundColor:"powderblue", padding: "8px" }}>Admin Inventory Dashboard</h2>
      <p><strong>Total Products:</strong> {inventory.totalProducts}</p>
      <p><strong>Total Stock:</strong> {inventory.totalStock}</p>

      <h3 style={{ border: "1px solid #101010ff",backgroundColor:"powderblue", padding: "8px" }}>Products List:</h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #101010ff",backgroundColor:"powderblue", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #181717ff",backgroundColor:"powderblue", padding: "8px" }}>Category</th>
            <th style={{ border: "1px solid #060606ff", backgroundColor:"powderblue",padding: "8px" }}>Gender</th>
            <th style={{ border: "1px solid #050505ff", backgroundColor:"powderblue",padding: "8px" }}>Size</th>
            <th style={{ border: "1px solid #000000ff", backgroundColor:"powderblue",padding: "8px" }}>Price (PKR)</th>
            <th style={{ border: "1px solid #050505ff", backgroundColor:"powderblue",padding: "8px" }}>Description</th>
            
            <th style={{ border: "1px solid #020202ff", backgroundColor:"powderblue",padding: "8px" }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {inventory.products.map((product) => (
            <tr key={product._id}>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.category}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.gender}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{Array.isArray(product.size) ? product.size.join(", ") : product.size}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.price}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.description}</td>
              
              <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(AdminInventory);
