import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { saveAuthData } from "../utils/auth";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Agar redirect location pass hua hai (from CartPage / Checkout)
  const from = location.state?.from || "/cartpage";

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      saveAuthData(res.data.token, res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userType", res.data.user.userType);

      // Agar customer login hai, to 'from' page pe redirect karein
      if (res.data.user.userType === "customer") {
        navigate(from); // ✅ Redirect to intended page
      } else if (res.data.user.userType === "admin") {
        navigate("/adminportal");
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
        />
        <br /><br />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />
        <button type="submit">Signin</button>
      </form>
      <p>If you are not register then please first signup.</p>
      <button onClick={() => navigate("/register")}>Signup/Register</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default React.memo(Signin);
