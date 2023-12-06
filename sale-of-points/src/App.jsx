import LoginPage from "./components/login.component";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import  NavBar  from "./components/navbar.component";
import MyTable from "./components/product/product.component";
import AddProductForm from "./components/product/addproduct.component";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/product/productdetail.componet";
import Order from "./components/order/order.component";
import { useEffect, useState } from "react";
import ProductCategories from "./components/category/category";
import ConfirmOrder from "./components/order/ConfirmOrder";
import CustomerDetail from "./components/customer/CustomerDetail";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('token') ? true : false);

  const handleLogin = (loginStatus) => {
    setIsAuthenticated(loginStatus);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };
  return (
    <>
    {isAuthenticated ? (
        <>
        <NavBar onLogout={handleLogout} />
        <Routes>
          <Route path="/products" element={<MyTable />} />
          <Route path="/products/add" element={<AddProductForm />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/orders" element={<Order/>} />
          <Route path="/categories" element={<ProductCategories/>}/>
          <Route path="/checkout" element={<ConfirmOrder/>}/>
          <Route path="/customers/:customerId" element={<CustomerDetail/>}/>
          {/* <Route path="/example" element={<DataTable />} /> */}
          {/* Other routes */}
        </Routes>
      </>
    ):(
      <LoginPage onLogin={handleLogin} />
    )}
</>
  );
}

export default App;
