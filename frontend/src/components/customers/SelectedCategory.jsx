import React, { useContext, useEffect } from "react";
import { useParams ,Link} from "react-router-dom";
import { ProductContext } from "../admin/ProductManagement/ProductContext";
import CartPage from "./CartPage";
import "./CategoryPage.css";
import { CartContext } from "./CartContext";
const SelectedCategory = () => {
  const { category } = useParams();
  const { selectedCategoryProducts, handleCategorySelect, loading, error } = useContext(ProductContext);
const {cartItems,increaseQty, decreaseQty,addToCart, removeFromCart, clearCart, totalPrice }=useContext(CartContext);
  useEffect(() => {
    if (category) {
      handleCategorySelect(category); // fetch products for this category
    }
  }, [category, handleCategorySelect]);

  return (
    <div className="category-page-container">
      <h2>category</h2>

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
<img src={product.images[0]} alt={product.name} />

                <h3>{product.name}</h3>
                <p>Rs. {product.price}</p>
                <Link to={`/productpage/${product._id}`} className="btn-view">View</Link>
<button onClick={() => addToCart(product)}>Add to Cart</button>
    
 </div>))}
        </div>
      )}

      <CartPage/>
            {/* Footer */}
            <footer>
              <p>© 2025 GentsShop | All Rights Reserved</p>
            </footer>
    </div>
  );
};

export default React.memo(SelectedCategory);
