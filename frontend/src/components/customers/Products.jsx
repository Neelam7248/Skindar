import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utils/auth";
import "./ProductPage.css";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedImages, setSelectedImages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find(item => item.id === product.id);
      if (exists) {
        return prevCart.map(item => item.id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const handleBuyNow = (product) => {
    if (!isLoggedIn()) {
      alert("Please login or register before buying!");
      navigate("/signin");
      return;
    }
  };

  const handleImageClick = (productId, image) => {
    setSelectedImages(prev => ({ ...prev, [productId]: image }));
  };

  return (
    <div className="product-page">
      <h2>Our Products</h2>
      <div className="product-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map(product => {
            const mainImage = selectedImages[product._id] || product.images[0];

            return (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  {/* Zoom component wrapping main image */}
                  <Zoom>
                    <img 
                      src={mainImage} 
                      alt={product.name} 
                      className="zoomable"
                    />
                  </Zoom>

                  {/* Thumbnail images */}
                  <div className="thumbnail-container">
                    {product.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={product.name + idx}
                        className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                        onClick={() => handleImageClick(product._id, img)}
                      />
                    ))}
                  </div>
                </div>

                <h3>{product.name}</h3>
                <p>${product.price}</p>
                <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                <button onClick={() => handleBuyNow(product)}>Buy Now</button>
              </div>
            );
          })
        ) : (
          <p>No product found</p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
