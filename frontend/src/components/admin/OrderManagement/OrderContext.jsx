import React, { createContext, useState } from "react";
import axios from "axios";
import { getToken } from "./../../../utils/auth";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const token = getToken();
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Orders:", res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = getToken();
      const res = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data.order : o))
      );
    } catch (err) {
      console.error(err);
    }
  };

const fetchUserOrders = async (email) => {
  try {
    const token = getToken();
    const res = await axios.get(`http://localhost:5000/api/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
console.log("Fetched User Orders:", res.data);
    // Filter by email manually for admin view
   setOrders(
  res.data.filter(
    (o) =>
      o.customer?.email?.trim().toLowerCase() === email.trim().toLowerCase()
  )
);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <OrderContext.Provider
      value={{ orders, fetchAllOrders, updateOrderStatus, fetchUserOrders }}
    >
      {children}
    </OrderContext.Provider>
  );
};
