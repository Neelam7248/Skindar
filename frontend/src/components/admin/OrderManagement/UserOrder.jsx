import React, { useContext, useEffect, useState } from "react";
import { OrderContext } from "./OrderContext";

export default function UserOrders({ email }) {
  const { orders, updateOrderStatus, fetchUserOrders } = useContext(OrderContext);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    if (email) fetchUserOrders(email);
  }, [email]);

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdateStatus = (orderId) => {
    if (selectedStatus[orderId] && selectedStatus[orderId] !== orders.find(o => o._id === orderId).status) {
      updateOrderStatus(orderId, selectedStatus[orderId]);
    }
  };

  if (!orders || orders.length === 0) {
    return <p className="text-center text-muted">No orders found for {email}</p>;
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Order ID</th>
            <th>Created At</th>
            <th>Email</th>
            <th>Customer</th>
            <th>Items</th>
            <th>Subtotal</th>
            <th>Service Charge</th>
            <th>Grand Total</th>
            <th>Status / Updated</th>
            <th>Update Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>{order.customer.email}</td>
              <td>{order.customer.name}</td>
              <td>
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.name} x {item.quantity}
                  </div>
                ))}
              </td>
              <td>Rs. {order.subtotal}</td>
              <td>Rs. {order.serviceCharge}</td>
              <td>Rs. {order.grandTotal}</td>
              <td>
                {order.status || "Pending"} <br />
                <small className="text-muted">{new Date(order.updatedAt).toLocaleString()}</small>
              </td>
              <td>
                <select
                  className="form-select mb-1"
                  value={selectedStatus[order._id] || order.status || "Pending"}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => handleUpdateStatus(order._id)}
                  disabled={selectedStatus[order._id] === order.status}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
