import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductPage from './components/customers/Products';
import CustomerRegister from './components/customers/Customers';
import Navbar from './components/Navbar';
import Signin from './components/Signin';
import AdminPortal from './pages/AdminPortal';
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Import protected route
import Home from './components/customers/HomePage';
import ProductDetail from './components/customers/ProductDetailPage';
import SelectedCategory from './components/customers/SelectedCategory';
import ProductCard from './components/customers/ProductCard';
import CheckoutPage from './pages/CheckoutPage';
import CartPage from './components/customers/CartPage';
import OrderHistory from './components/customers/OrderHistory';
function App() {
  return (
  <>
      <Navbar /> {/* Always visible */}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        
        <Route path="/register" element={<CustomerRegister />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/productpage" element={<ProductPage />} /> {/* Public page */}
          <Route path="/productpage/:id" element={<ProductDetail />} /> 
<Route path="/selectedCategory"element={<SelectedCategory/>}/>
<Route path="/productcard" element={<ProductCard />} /> 
 <Route path="/checkout" element={<CheckoutPage />} />
 <Route path="orders" element={<OrderHistory />} />
 <Route path="/cartpage" element={<CartPage />} />
        {/* Admin-only Protected Route */}
        <Route
          path="/adminportal"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminPortal />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>  );
}

export default App;
