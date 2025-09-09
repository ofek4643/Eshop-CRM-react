import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import OrderManagement from "./pages/OrderManagement/OrderManagement";
import Layout from "./Components/Layout/Layout";
import Order from "./pages/OrderPage/OrderPage";
import UserManagement from "./pages/UserManagement/UserManagement";
import ProductManagement from "./pages/ProductManagement/ProductManagement";
import UserPage from "./pages/UserPage/UserPage";
import AddProduct from "./pages/AddProduct/AddProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";
import { getUserThunk } from "./store/slices/userSlice";
const App = () => {
  
  // מושך את היוזר בשביל ProtectedRoute
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserThunk());
  }, [dispatch]);

  return (
    <>
      <Router>
        <ToastContainer
          position="bottom-right"
          closeOnClick
          rtl
          draggable
          theme="light"
        />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/products/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:id" element={<EditProduct />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
