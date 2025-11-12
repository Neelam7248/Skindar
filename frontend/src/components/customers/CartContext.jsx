// src/context/CartContext.js
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
const navigate=useNavigate();
  // ➕ Add to Cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };
const increaseQty = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

const decreaseQty = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // quantity can’t go below 1
          : item
      )
  );
};

  // ➖ Remove from Cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  // ♻️ Clear Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // 💰 Total Price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
const buyNowAll = () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Example: redirect to checkout page
  console.log("Proceeding to checkout with items:", cartItems);

  // You can navigate to a checkout route (React Router useNavigate)
  // Example:
  // navigate("/checkout", { state: { items: cartItems } });
   navigate("/checkout"); // ✅ Redirect to CheckoutPage
  
};

  return (
    <CartContext.Provider
      value={{ cartItems,buyNowAll,increaseQty, decreaseQty,addToCart, removeFromCart, clearCart, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};
