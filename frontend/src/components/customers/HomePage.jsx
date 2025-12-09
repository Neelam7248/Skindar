import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../components/admin/ProductManagement/ProductContext";
import { CartContext } from "./CartContext";
import CartPage from "./CartPage";
import "./Home.css";
import "./CartPopup.css"; // Add popup styles

function Home() {
  const { products, fetchProducts, loading, error } = useContext(ProductContext);
  const { addToCart, cartItems, showPopup,increaseQty,decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 10);

  // Get last added product for popup
  const latestItem = cartItems[cartItems.length - 1];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1><i>Denim Studio</i></h1>
        <p>Discover the latest trends in men’s fashion</p>
      </section>

      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product._id} className="product-card">
                <img src={product.images[0]} alt={product.name} />
                <h6>{product.name}</h6>
                <p>
                  <del className="product-price">{product.realPrice || "NA"}</del><br/>
                  <ins className="product-price">Rs {product.discountPrice}</ins>
                </p>
                <div>
                  <Link to={`/productpage/${product._id}`} className="btn-view">
                    View
                  </Link>
                  <button
                    className="btn-shop"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Popup for Add to Cart */}
      {showPopup && latestItem && (
        <div className="cart-popup-overlay">
          <div className="cart-popup">
            <h4>Added to Cart!</h4>
            <div className="cart-popup-item">
              <img src={latestItem.images[0]} alt={latestItem.name} />
                <div className="cart-popup-buttons button">
            
                <p>{latestItem.name}</p>
                <p>Rs {latestItem.realPrice}</p>
                <p>Rs {latestItem.discountPrice}</p>
                     <button
                        
                        onClick={() => decreaseQty(latestItem._id)}
                      >
                        -
                      </button>
                      <span>{latestItem.quantity}</span>
                      <button
                        
                        onClick={() => increaseQty(latestItem._id)}
                      >
                        +
                      </button>
            
              </div>
            
                  
            </div>
            <div className="cart-popup-buttons">
              <button onClick={() => navigate(`/productpage/${latestItem._id}`)}>
                View
              </button>
              <button onClick={() => navigate("/cartpage")}>
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Page */}
      <CartPage />

      {/* Footer */}
      <footer>
        <address>
          Address: Shop no 1, United Plaza, nearest Levis factory outlet
        </address>
      </footer>
    </div>
  );
}

export default React.memo(Home);
