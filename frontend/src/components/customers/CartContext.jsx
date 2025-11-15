// src/context/CartContext.js
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getToken } from "../../utils/auth";   // ← IMPORT HERE
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
const [orders, setOrders] = useState([]);
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
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
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

  
const fetchOrders = async () => {
    try {
      const token = getToken();
      if (!token) return; // user not logged in

      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched orders:", res.data);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  
  const buyNowAll = () => {
if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    } else if (!isLoggedIn()) {
     setTimeout(() => navigate("/signin"), 10);  // Correct route// ← user logged in na ho to signup page
      return;
    } 
    navigate("/checkout");
   };


  return (
    <CartContext.Provider
      value={{
        cartItems,
       isLoggedIn,
       fetchOrders,
        orders,
        buyNowAll,
        increaseQty,
        decreaseQty,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
