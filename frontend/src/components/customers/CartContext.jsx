// src/context/CartContext.js
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, getToken,logout } from "../../utils/auth";   // ← IMPORT HERE
import axios from "axios";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
   const [profile, setProfile] = useState(null); // ✅ Profile state
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [adminContacts, setAdminContacts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({}); // productId -> size
const backendURL = process.env.REACT_APP_API_BACKEND_URL || "http://localhost:5000";
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

      triggerAddToCartPopup();
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
    (sum, item) => sum + item.discountPrice * item.quantity,
    0
  );

  
const fetchOrders = async () => {
    try {
      const token = getToken();
      if (!token) return; // user not logged in

      const res = await axios.get(`${backendURL}/api/orders`, {
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
    setTimeout(() => navigate("/signin"), 10);
    return;
  }
for (let item of cartItems) {
    if (!selectedSizes[item._id]) {
      alert(`Please select a size for ${item.name}`);
      return;
    }
  }
  // Attach selected sizes to cartItems
  const itemsWithSizes = cartItems.map((item) => ({
    ...item,
    selectedSize: selectedSizes[item._id] || null,
  }));

  // Save to context for checkout page
  setCartItems(itemsWithSizes); // optional if cartItems are already in context
  navigate("/checkout");
};

// 🧑‍💼 Fetch User Profile
  const fetchProfile = async () => {
    setProfileLoading(true);
    setProfileError("");

    try {
      if (!isLoggedIn()) {
        setProfileError("User not logged in");
        setProfileLoading(false);
        return;
      }

      const token =getToken();
      if (!token) {
        setProfileError("Token not found");
        setProfileLoading(false);
        return;
      }
      const res = await axios.get(`${backendURL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (err) {
      console.error(err);
      setProfileError(err.response?.data?.message || "Failed to fetch profile");
    } finally {
      setProfileLoading(false);
    }
  };
const logOut = () => {
    // 1️⃣ Remove token
    logout() ;

    // 2️⃣ Clear cart
    clearCart();

    // 3️⃣ Redirect to login
    navigate("/signin", { replace: true });
  };
// Fetch Admin Contact Info (example of another utility function)
 const fetchAdminContact = async () => {
  try {
    const token = getToken();

    const res = await axios.get(`${backendURL}/api/admin/contact`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("Admin contact fetched:", res.data);
    setAdminContacts(res.data.adminContacts);

  } catch (err) {
    console.error("Failed to fetch admin contact", err);
  }
};


  // 🧑‍💼 Update User Profile
const updateProfile = async (updatedData) => {
  setProfileLoading(true);
  setProfileError("");

  try {
    if (!isLoggedIn()) {
      setProfileError("User not logged in");
      setProfileLoading(false);
      return;
    }

    const token = getToken();
    if (!token) {
      setProfileError("Token not found");
      setProfileLoading(false);
      return;
    }

    // Send PUT request to update profile
    const res = await axios.put(
      `${backendURL}/api/auth/UPprofile`, 
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log("Profile updated:", res.data);
    // Update local state with the new profile
    setProfile(res.data.user);

  } catch (err) {
    console.error(err);
    setProfileError(err.response?.data?.message || "Failed to update profile");
  } finally {
    setProfileLoading(false);
  }
};

   const [showPopup, setShowPopup] = useState(false);

const triggerAddToCartPopup = () => {
  setShowPopup(true);
  setTimeout(() => setShowPopup(false), 3000);
};

//helper function to update selected size
const updateSelectedSize = (productId, size) => {
  setSelectedSizes((prev) => ({
    ...prev,
    [productId]: size,
  }));
};


  return (
    <CartContext.Provider
      value={{
       fetchProfile,
       profile,
       logOut,
       profileLoading,
       triggerAddToCartPopup,
       showPopup,
        updateProfile,
       profileError,
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
        fetchAdminContact,
        adminContacts,
setAdminContacts, 
updateSelectedSize,
        selectedSizes,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
