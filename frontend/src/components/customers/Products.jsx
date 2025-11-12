import React from "react";
import "./ProductPage.css"; // Optional: for styling
import axios from 'axios';
import{useEffect,useState}from 'react';
import { isLoggedIn } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

function ProductPage() {
    const [products,setProducts]=useState([]);
  const[cart,setCart]=useState([]);
  const navigate = useNavigate();
useEffect(() => {
  axios.get("http://localhost:5000/api/products")
       .then(res => setProducts(res.data))
       .catch(err => console.error(err));
}, []);
const handleAddToCart = (product) => {
    setCart((prevCart) => {
      // Check if product already in cart
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        // Increase quantity if already in cart
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn()) {
      // Not logged in → redirect to Signin page
      alert("Please login or register before buying!");
      navigate("/signin");
      return;
    }}
    
    return (
    <div className="product-page">
      <h2>Our Products</h2>
      <div className="product-grid">
        {Array.isArray(products)&&products.length>0?(products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>))
        ):(
            <p>No product found</p>
        )}
       
      </div>
    </div>
  );
}

export default ProductPage;
