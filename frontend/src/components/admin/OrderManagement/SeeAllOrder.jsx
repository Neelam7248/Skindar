// src/components/admin/OrderManagement.jsx
import React, { useEffect, useContext, useState } from "react";
import { OrderContext } from "../OrderManagement/OrderContext"  ;
import "./SeeAllOrder.css";
const OrderManagement = () => {
  const { orders, fetchAllOrders, updateOrderStatus } = useContext(OrderContext);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchAllOrders(); // Fetch all orders when component mounts
  }, []);

  const handleStatusChange = (orderId, status) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdateStatus = (orderId) => {
    if (selectedStatus[orderId]) {
      updateOrderStatus(orderId, selectedStatus[orderId]);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Admin Order Management</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders found</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>Customer Name</th>
              <th>Order Date</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Items</th>
              <th>Subtotal</th>
              <th>Service Charge</th>
              <th>Grand Total</th>
              <th>Status with Date</th>

              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customer.name}</td>
                <td> {new Date(order.createdAt).toLocaleString()}</td>
                <td>{order.customer.email}</td>
                <td>{order.customer.phone}</td>
                <td>
                  {order.items.map((item, index) => (
                    <div key={index}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                <td>Rs. {order.subtotal}</td>
                <td>Rs. {order.serviceCharge}</td>
                <td>Rs. {order.grandTotal}</td>
                <td>{order.status || "Pending"}<span>{new Date(order.updatedAt).toLocaleString()}</span> </td>
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
                    onClick={() => 
                      handleUpdateStatus(order._id)}
                                                   >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderManagement;
