// src/components/admin/CustomerManagement/CustomerList.jsx
import React, { useContext, useEffect, useState } from "react";
import { CustomerContext } from "../CustomerManagement/CustomerContext";
import { useNavigate } from "react-router-dom";

export default function CustomerList() {
  const { customers, loading, fetchAllCustomers, searchCustomers,restoreCustomer, deleteCustomer } =
    useContext(CustomerContext);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllCustomers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    searchCustomers(value);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Customer List</h3>
      <input
        type="text"
        placeholder="Search by name or email..."
        value={searchQuery}
        onChange={handleSearch}
        className="form-control mb-3"
      />

      {loading ? (
        <p>Loading customers...</p>
      ) : customers?.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>IsActive</th>
                <th>Address</th>
                <th>Signup Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone || "N/A"}</td>
                  <td>{user.isActive}</td>
                  <td>{user.address || "N/A"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => navigate(`/admin/customers/${user._id}`)}
                    >
                      View
                    </button>
                    <button
  className="btn btn-sm btn-danger"
  disabled={loading}       // <-- yahan lagayen
  onClick={() => {
    if (window.confirm("Are you sure you want to soft delete this customer?")) {
      deleteCustomer(user._id);
    }
  }}
>
  {loading ? "Deleting..." : "Delete"}  {/* <-- text correct */}
</button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => {
                        if (window.confirm("Are you want restore this customer?")) {
                         restoreCustomer(user._id);

                        }
                        

                      }}
                    >
                      Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
