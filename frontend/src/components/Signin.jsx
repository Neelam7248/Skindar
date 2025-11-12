import React from "react"; // ✅ required for React.memo// src/AdminLogin.js
import { useState } from "react";
import axios from "axios";
import { saveAuthData } from "../utils/auth";
function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      setMessage(res.data.message);
saveAuthData(res.data.token,res.data.user);
      // Save token in localStorage (optional but recommended)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.user.userType);

      // Redirect based on user type
      if (res.data.user.userType === "admin") {
        window.location.href = "/adminportal";
      } else if (res.data.user.userType === "customer") {
        window.location.href = "/productpage";
      }
    } catch (error) {
  if (error.code === "ERR_NETWORK") {
    setMessage("Server not reachable. Please check if backend is running.");
  } else {
    setMessage(error.response?.data?.message || "Login failed");
  }
}

  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Signin</h2>
      <form onSubmit={handleSignin}>
<label>Email</label>
<input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <label>Password</label>
 
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Signin</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default React.memo(Signin);
