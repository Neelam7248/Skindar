import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../components/admin/ProductManagement/ProductContext";
import "./Home.css";
import { CartContext } from "./CartContext";
import CartPage from "./CartPage";

function Home() {
  const { products, fetchProducts, loading, handleCategorySelect,error } = useContext(ProductContext);
 const { cartItems,addToCart, removeFromCart, totalPrice, decreaseQty,increaseQty,clearCart } = useContext(CartContext);
  useEffect(() => {
    fetchProducts(); // Fetch products when Home mounts
  }, []);

  // Get first 6 featured products
  const featuredProducts = products.slice(0, 10);

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to GentsShop</h1>
        <p>Discover the latest trends in men’s fashion</p>
     
      </section>

      {/* Categories */}
      
      {/* Featured Products */}
      <section className="featured">
        <h2>Featured Products</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((p) => (
              <div key={p._id} className="product-card">
<img src={p.images[0]} alt={p.name} />

                <h3>{p.name}</h3>
                <p>Rs. {p.price}</p>
                <Link to={`/productpage/${p._id}`} className="btn-view">View</Link>
<button onClick={() => addToCart(p)}>Add to Cart</button>
    
 </div>

))}

          </div>

)}
      </section>
     
     
     <CartPage/>
      {/* Footer */}
      <footer>
        <p>© 2025 GentsShop | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default React.memo(Home);
