import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css"; // optional, can create CSS for styling
import CartPage from "./CartPage";

const ProductCard = React.memo(({ product, addToCart }) => {
if (!product) return null;
  return (
    <div className="product-card">
      <Link to={`/productcard`}>
<div className="product-gallery">
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
          <img
            src="/placeholder.png"
            alt="No Image"
            className="product-image"
          />
        )}
      </div>
      </Link>

      <h4>Product:{product.name}</h4>
<li className="product-card" style={{backgroundColor:"powderblue"}}>Images, description, price, sizes, colors
  <div className="product-info">
    <span>
      <strong>Size:</strong> {product.size} <br />
      <strong>Rs:</strong> {product.price} <br />
      <strong>Stock:</strong> {product.stock} <br />
      <strong>Color:</strong> {product.color}
    </span>
  </div>

  {addToCart && (
<>
<button onClick={() => addToCart(product)} className="add-btn">
      Add to Cart
    </button>
    
 </>)}
</li>

   </div>
   
  );
  <CartPage/>
  
});

export default ProductCard;
