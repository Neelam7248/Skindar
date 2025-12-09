import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../admin/ProductManagement/ProductContext";
import { CartContext } from "./CartContext";
import CartPage from "./CartPage";
import "./ProductDetailPage.css"; // <-- CSS file import karein

function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const product = products.find((p) => p._id === id);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="product-detail">
      
      {/* IMAGE SECTION */}
      <div className="image-wrapper">
        {product.images && product.images.length > 0 ? (
          product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} ${index + 1}`}
              className="product-image"
            />
          ))
        ) : (
          <p>No image available</p>
        )}
      </div>

      {/* PRODUCT INFO */}
      <h2 className="product-title">{product.name}</h2>
      <p className="product-description">{product.description}</p>

      <p className="product-price">
        <strong>Price:</strong> Rs. {product.discountPrice}
      </p>

      <button className="add-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>

      <CartPage />
    </div>
  );
}

export default React.memo(ProductDetail);
