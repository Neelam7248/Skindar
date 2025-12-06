import React, { use, useState } from "react";
import axios from "axios";


function AdminCreateAdmin() {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "admin",
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const createAdmin = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/create-admin",
        adminData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
console.log("Admin created:", res.data);
      alert("Admin Created Successfully!");
      setAdminData({ name: "", email: "", password: "", phone: "", userType: "admin" });
    } catch (error) {
      alert(error.response.data.message || "Error creating admin");
    }
  };

  return (
    <div className="admin-form-container">
     <div>
      <h2>Create New Admin</h2>

      <form onSubmit={createAdmin} className="admin-form">
      
      <div> <label>  Name     </label>
        <input
          type="text"
          name="name"
          placeholder="Admin Name"
          value={adminData.name}
          onChange={handleChange}
          required
        />
        </div>
       <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={adminData.email}
          onChange={handleChange}
          required
        /></div>
       <div>
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={adminData.phone}
          onChange={handleChange}
          required
        /></div>
       <div>
       <label>Password</label>
 

       <input
          type="password"
          name="password"
          placeholder="Password"
          value={adminData.password}
          onChange={handleChange}
          required
        /></div>
        <label>UserType</label>
 <div>
          <select
            name="userType"
            value={adminData.userType}
            onChange={handleChange}
          >
            <option value="admin">Admin</option>
          </select>
</div>
        <button type="submit">Create Admin</button>
      </form>
      </div>
    </div>  


    
);
}

export default AdminCreateAdmin;
