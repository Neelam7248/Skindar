import React, { useContext, useEffect } from "react";
import { CartContext } from "../customers/CartContext";
import "./OrderHistory.css";

const OrderHistory = () => {
  const { orders, fetchOrders } = useContext(CartContext);

  useEffect(() => {
    fetchOrders(); // fetch orders on component mount
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <h3>Order ID: {order._id}</h3>
            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Address:</strong> {order.customer.address}</p>
            <p><strong>Payment:</strong> {order.customer.paymentMethod}</p>
            <h4>Items:</h4>
            {order.items.map((item, idx) => (
            <>
            <ul key={idx}>
                {item.name} - Qty: {item.quantity} - Price: {item.price}
              
            </ul>
            </>))}
            <h4>Totals:</h4>
            <p>
               <b> Subtotal:</b> {order.subtotal},<b> Service Charges:</b> {order.serviceCharge},<b> Grand Total: </b>{order.grandTotal}
              </p>
            
            <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default React.memo(OrderHistory) ;
