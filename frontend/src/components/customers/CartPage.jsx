import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./CartPage.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

function CartPage() {
  const {buyNowAll,isLoggedIn, cartItems, increaseQty, decreaseQty,removeFromCart, totalPrice, clearCart } = useContext(CartContext);
const navigate = useNavigate(); 
  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">No items yet.</p>
      ) : (
        <>
          <div className="table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Price (Rs)</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={item._id} className={index % 2 === 0 ? "even-row" : "odd-row"}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
<td>
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQty(item._id)}
                      >
                        -
                      </button>
                      <span className="qty-number">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increaseQty(item._id)}
                      >
                        +
                      </button>
                    </td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                      <button className="remove-btn" onClick={
                                        () =>{  if(window.confirm("Are you sure you want to remove "))
      { removeFromCart(item._id)}}}>
Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="cart-summary">
            <h3>Total: Rs. {totalPrice}</h3><button
  className="clear-btn"
  onClick={() => {
    if (window.confirm("Are you sure you want to cancel?")) {
      clearCart(); // ✅ call the function
    }
  }}
>
  Clear Cart
</button>

<button
  className="buy-btn"
  onClick={() => {
    console.log("TOKEN:", localStorage.getItem("token"));
    console.log("isLoggedIn():", isLoggedIn());

    if (!isLoggedIn()) {
      navigate("/signin");  // ← user login nahi, to register page per bhej do
      return;
    }

    buyNowAll(); // user logged in ho to previous logic chale
  }}
>
  Buy Now All
</button>

          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(CartPage);
