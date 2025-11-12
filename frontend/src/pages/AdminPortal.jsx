import { useState } from "react";
import ProductManagement from "../components/admin/ProductManagement/ProductManagement";
//import OrderManagement from "./OrderManagement";
//import CustomerManagement from "./CustomerManagement";
//import AnalyticsDashboard from "./AnalyticsDashboard";
import {getToken,logout } from "../utils/auth";

function AdminPortal() {
  const [activeTab, setActiveTab] = useState("products");

  const handleLogout = () => {
    logout();
    window.location.href = "/signin";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductManagement />;
      // "orders":
        //return <OrderManagement />;
      // "customers":
//return <CustomerManagement />;
//case "analytics":
//return <AnalyticsDashboard />;
//default:
        return <ProductManagement />;
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Admin Portal</h2>
      <ul style={styles.nav}>
        <li
          style={activeTab === "products" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("products")}
        >
          Product Management
        </li>
        <li
          style={activeTab === "orders" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("orders")}
        >
          Order Management
        </li>
        <li
          style={activeTab === "customers" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("customers")}
        >
          Customer Management
        </li>
        <li
          style={activeTab === "analytics" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics Dashboard
        </li>
        <li style={styles.logout} onClick={handleLogout}>
          Logout
        </li>
      </ul>

      <div style={styles.content}>{renderContent()}</div>
    </div>
  );
}

const styles = {
  container: {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    marginTop: "30px",
    background: "#f8f9fa",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
  },
  header: {
    color: "#0077b6",
  },
  nav: {
    display: "flex",
    justifyContent: "space-around",
    listStyle: "none",
    padding: "10px 0",
    background: "#0077b6",
    borderRadius: "8px",
  },
  tab: {
    color: "#fff",
    cursor: "pointer",
    padding: "10px 15px",
  },
  activeTab: {
    color: "#0077b6",
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  logout: {
    color: "#ffdddd",
    cursor: "pointer",
    padding: "10px 15px",
  },
  content: {
    marginTop: "20px",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
};

export default AdminPortal;
