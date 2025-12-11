// src/components/admin/ProductManagement/ProductContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState([]); // 🆕 for dropdown
const [selectedCategoryProducts,setSelectedCategoryProducts]=useState([]);
const backendURL = process.env.REACT_APP_API_BACKEND_URL || "http://localhost:5000"; 
// Fetch products on load
  useEffect(() => {
    fetchProducts();
  }, []);

const handleCategorySelect = async (category) => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.get(
      `${backendURL}/api/products/byCategory?category=${category}`
    );
    console.log("frontend received data", res.data);

    // Overwrite products with selected category only
    setSelectedCategoryProducts(res.data);
    setSelectedCategory(category); // optional: track selected category
  } catch (err) {
    setError(err.response?.data?.message || "Failed to fetch category products");
    setProducts([]); // reset products on error
  } finally {
    setLoading(false);
  }
};


//for fetch Products
  const fetchProducts = async () => {
    setLoading(true);
setError(null);
    try {
      const res = await axios.get(`${backendURL}/api/products`);
     console.log("frontend received data",res.data);
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
   setError(error.message);
} finally {
  setLoading(false);
}}


//for add Products
  const addProduct = async (newProduct) => {
 setLoading(true);
setError(null);
    try {
      const res = await axios.post(`${backendURL}/api/products/add`, newProduct);
    console.log("frontend received data", res.data);
      setProducts(prev => [...prev, res.data]);
  return res.data; 
    } catch (error) {
      console.error("Error adding product:", error);
    setError(error.message);
} finally {
  setLoading(false);
}
  }
  // for edit Products
  const editProduct = async (id, updatedProduct) => {
    setLoading(true);
setError(null);
    try {
      const res = await axios.put(`${backendURL}/api/products/${id}`, updatedProduct);
 setProducts(prev => prev.map(p => (p._id === id ? res.data : p)));
    } catch (error) {
      console.error("Error updating product:", error);
       setError(error.message);
} finally {
  setLoading(false);
}}

// for delete 
const deleteProduct = async (id) => {
      setLoading(true);
  setError(null);

    try {
      await axios.delete(`${backendURL}/api/products/${id}`);
      setProducts(products.filter(p => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
       setError(error.message);
} finally {
  setLoading(false);
}}
  return (
    <ProductContext.Provider
      value={{ products, loading, error, selectedCategoryProducts, handleCategorySelect, addProduct, editProduct, deleteProduct,fetchProducts}}
    >
      {children}
    </ProductContext.Provider>
  );
};
