import React from "react"; // ✅ required for React.memo
import { useState } from "react";
import axios from "axios";
import "./CustomerRegister.css"; // Styling file
import { useNavigate } from "react-router-dom";
function CustomerRegister() {
const navigate=useNavigate();

    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    userType: "customer",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      alert("Registration Successful!");
      console.log("frontend received data", res.data);
      
if(formData.userType==='customer'){
    navigate('/productpage');
}
setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        userType: "customer",
      });

    } catch (err) {
      alert("Registration Failed!");
      console.log(err);
    }
  };

  return (
    <div className="register-page">
      <h2>Customer Registration</h2>
      <div className="register-card">
        <form onSubmit={handleSubmit}>
         <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
 <label>Email</label>
 
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
         <label>Password</label>
 
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Phone</label>
 
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label>Address</label>
 
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label>UserType</label>
 
          <select
            name="userType"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="customer">Customer</option>
          </select>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default React.memo(CustomerRegister);
