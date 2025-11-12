//import React from "react"; // ✅ required for React.memo
import React, { useState, useContext } from "react";
import { Link ,useNavigate} from "react-router-dom";
import "./Navbar.css";
import {
  FaHome, FaUser, FaShoppingBag, FaShoppingCart,
  FaSignInAlt, FaInfoCircle, FaProductHunt
} from "react-icons/fa";
import { ProductContext } from "./admin/ProductManagement/ProductContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
const navigate=useNavigate();
  const { handleCategorySelect} = useContext(ProductContext); // ✅ from context
const handleCategoryClick = (category) => {
  handleCategorySelect(category); // fetch products by category
  setIsDropdownOpen(false);      // close dropdown
  navigate("/selectedcategory");      // go to product page
};

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/"><FaShoppingBag /> GentsShop</Link>
      </div>

      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        &#9776;
      </div>

      <ul className={`nav-links ${isOpen ? "show" : ""}`}>
        <li><Link to="/" onClick={() => setIsOpen(false)}><FaHome /> Home</Link></li>

        {/* 🧠 Dropdown */}
        <li
          className="dropdown"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          <button className="dropbtn"><FaProductHunt /> Products ▼</button>
          {isDropdownOpen && (
            <ul className="dropdown-content">
              <li onClick={() => handleCategoryClick("jackets")}>Jackets</li>
              <li onClick={() => handleCategoryClick("t-shirts")}>TShirts</li>
            <li onClick={() => handleCategoryClick("caps")}>Caps</li>
          </ul>
          )}
        </li>

        <li><Link to="/cart" onClick={() => setIsOpen(false)}><FaShoppingCart /> Cart</Link></li>
        <li><Link to="/orders" onClick={() => setIsOpen(false)}><FaShoppingBag /> Orders</Link></li>
        <li><Link to="/profile" onClick={() => setIsOpen(false)}><FaUser /> Profile</Link></li>
        <li><Link to="/signin" onClick={() => setIsOpen(false)}><FaSignInAlt /> Signin</Link></li>
        <li><Link to="/register" onClick={() => setIsOpen(false)}><FaInfoCircle /> Register</Link></li>
      </ul>
    </nav>
  );
}

export default React.memo(Navbar) ;
