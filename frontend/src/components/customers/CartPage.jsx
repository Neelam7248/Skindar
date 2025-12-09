import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

function CartPage() {
  const {
    buyNowAll,
    isLoggedIn,
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    totalPrice,
    clearCart,
    selectedSizes,
    updateSelectedSize,
  } = useContext(CartContext);

  const navigate = useNavigate();
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <>        <p className="empty-text">No items yet.</p>
        {/* Footer */}
      <footer>
        <address>
          Address: Shop no 1, United Plaza, nearest Levis factory outlet
        </address>
        <p>Skindar Javeid</p>
        <p>Contact No:0323-6667743</p>
      </footer></>

      ) : (
        <>
          {/* PRODUCT GRID */}
          <div className="product-grid">
            {cartItems.map((item) => (
              <div key={item._id} className="product-card">
                
                {/* IMAGE */}
                {item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="product-img"
                  />
                )}

                {/* CARD BODY */}
                <h6 className="card-title">{item.name}</h6>
                <p className="price">Rs {item.discountPrice}</p>

                {/* QUANTITY BUTTONS */}
                <div className="qty-box">
                  <button className="qty-btn" onClick={() => decreaseQty(item._id)}>-</button>
                  <span className="qty-value">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => increaseQty(item._id)}>+</button>
                </div>
<select
  value={selectedSizes[item._id] || ""}
  onChange={(e) => updateSelectedSize(item._id, e.target.value)}
  required
>
  <option value=""> Please Select Size</option>
  {Object.keys(item.sizes).map((size) => (
    <option key={size} value={size}>
      {size} ({item.sizes[size]} in stock)
    </option>
  ))}
</select>



                <p className="subtotal">Subtotal: Rs {item.discountPrice * item.quantity}</p>

                {/* REMOVE BUTTON */}
                <button
                  className="remove-btn"
                  onClick={() => {
                    if (window.confirm("Remove this item?")) {
                      removeFromCart(item._id);
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className="cart-summary">
            <h4>Total: Rs {totalPrice}</h4>

            <button
              className="clear-btn"
              onClick={() => {
                if (window.confirm("Clear entire cart?")) {
                  clearCart();
                }
              }}
            >
              Clear Cart
            </button>

            <button
              className="checkout-btn"
              onClick={() => {
                if (!isLoggedIn()) {
                  navigate("/signin");
                  return;
                }
                buyNowAll();
              }}
            >
              Buy Now
            </button>
          </div>
        </>
        
      )
      }
      
    </div>
    
  );
}

export default React.memo(CartPage);
