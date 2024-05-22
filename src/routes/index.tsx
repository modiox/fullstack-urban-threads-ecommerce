import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Error from "../pages/Error"
import Navbar from "@/components/layout/Navbar"
// import Category from "../components/ui/Category"
import ProductDetails from "@/pages/ProductDetails"
import Products from "../components/ui/Products"
import Register from "@/pages/Register"
import { LoginUser } from "@/pages/LoginUser"
import UserDashboard from "@/pages/UserDashboard"
import AdminDashboard from "@/pages/admin/AdminDashboard"
import UserProfile from "@/pages/UserProfile"
import UserOrder from "@/pages/UserOrder"
import ProductsMangement from "@/pages/admin/ProductsMangement"
import OrdersManagement from "@/pages/admin/OrdersManagement"
import UsersManagement from "@/pages/admin/UsersManagement"
import CategoriesManagement from "@/pages/admin/CategoriesManagement"
import ProtectedRoute from "@/routes"
import AdminRoute from "./AdminRoute"



const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/products/:productID" element={<ProductDetails />} />

        {/* user routes */}
        {/* Protected Route with a common path */}
        <Route path="/dashboard"element={<ProtectedRoute/>} >
           <Route path="user" element={<UserDashboard/>} />
           <Route path="user/profile" element={<UserProfile />} />
           <Route path="user/orders" element={<UserOrder />} />
        </Route>
    

        {/* admin routes */}
        {/* Protected route with common path */}
         <Route  path="/dashboard"element={<AdminRoute/>} >
           <Route path="admin" element={<AdminDashboard />} />
           <Route path="admin/products" element={<ProductsMangement />} />
           <Route path="admin/orders" element={<OrdersManagement />} />
           <Route path="admin/users" element={<UsersManagement />} />
           <Route path="admin/categories" element={<CategoriesManagement />} />
         </Route>
       

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
