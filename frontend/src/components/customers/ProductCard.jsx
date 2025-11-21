import React from "react";
import { Link } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import "./ProductCard.css";

const ProductCard = React.memo(({ product, addToCart }) => {
  if (!product) return null;

  // OLD PRICE LOGIC (agar discount ho)
  const oldPrice = product.oldPrice || product.price + 1000;

  return (
    <div className="product-card">

      {/* ================= IMAGE SECTION ================= */}
      <Link to={`/productpage/${product._id}`} className="image-link">
        <div className="product-image-wrapper">

          <Zoom zoomMargin={40}>
            <img
              src={product.images?.[0] || "/placeholder.png"}
              alt={product.name}
              className="product-image"
            />
          </Zoom>

          {/* SALE TAG (dynamic, attractive) */}
          {oldPrice > product.price && (
            <span className="sale-tag">
              🔥 Sale — {Math.round(((oldPrice - product.price) / oldPrice) * 100)}% Off
            </span>
          )}
        </div>
      </Link>

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="product-details">
        <h3 className="product-title">{product.name}</h3>

        <p className="price-line">
          <span className="old-price">Rs {oldPrice}</span>
          <span className="new-price">Rs {product.price}</span>
        </p>

        <p className="info-line">
          Size: <b>{product.size}</b>
        </p>
        <p className="info-line">
          Color: <b>{product.color}</b>
        </p>
      </div>

      {/* ================= ACTION BUTTONS ================= */}
      <div className="buttons">

        {/* View Button */}
        <Link to={`/productpage/${product._id}`} className="btn-view">
          View Details
        </Link>

        {/* Add to Cart */}
        {addToCart && (
          <button onClick={() => addToCart(product)} className="btn-cart">
            Add to Cart
          </button>
        )}

      </div>
    </div>
  );
});

export default ProductCard;
