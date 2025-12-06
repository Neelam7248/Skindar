import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ProductContext } from "../admin/ProductManagement/ProductContext";
import CartPage from "./CartPage";
import "./Home.css"; 
import { CartContext } from "./CartContext";
import ProductPage from "./Products";
const SelectedCategory = () => {
  const { category } = useParams();
  const { selectedCategoryProducts, handleCategorySelect, loading, error } =
    useContext(ProductContext);

  const {
    addToCart,
  } = useContext(CartContext);

  useEffect(() => {
    if (category) {
      handleCategorySelect(category);
    }
  }, [category, handleCategorySelect]);

  return (
    <div className="category-page-container">
      
      <h2 style={{ textTransform: "capitalize", marginBottom: "10px" }}>
        {category}
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : selectedCategoryProducts.length === 0 ? (
        <p>No products found in this category.</p>
      ) : (
        <div className="product-grid">
          {selectedCategoryProducts.map((product) => (
            <div key={product._id} className="product-card">

              {/* Product Image */}
              <img src={product.images[0]} alt={product.name} />

              {/* Product Title */}
              <h6>{product.name}</h6>

              {/* Price Section */}
              <p className="product-price">
                <del style={{ color: "#8a0620" }}>Rs 10000</del>{" "}
                <ins style={{ color: "green" }}>
                  now Only <i>Rs {product.price}</i>
                </ins>
              </p>

              {/* Buttons */}
              <div className="product-buttons">
                <Link to={`/productpage/${product._id}`} className="btn-view">
                  View
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="btn-view"
                 
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CartPage />

      {/* Footer */}
      <footer>
        <p>© 2025 GentsShop | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default React.memo(SelectedCategory);
