import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/AboutPage"
import Contact from "../pages/ContactPage"
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
import ContactPage from "../pages/ContactPage"
import AboutPage from "../pages/AboutPage"
import CategoryPage from "@/pages/CategoryPage"
import CartPage from "@/pages/CartPage"



const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/products/:productID" element={<ProductDetails />} />
        <Route path="/category/:categoryId" element={<CategoryPage/>} />
    

        {/* admin routes */}
        {/* Protected route with common path */}
         <Route  path="/dashboard"element={<AdminRoute/>} >
           <Route path="admin" element={<AdminDashboard />} />
           <Route path="admin/products" element={<ProductsMangement />} />
           <Route path="admin/orders" element={<OrdersManagement />} />
           <Route path="admin/users" element={<UsersManagement />} />
           <Route path="admin/categories" element={<CategoriesManagement />} />
         </Route>

        {/* user routes */}
        {/* Protected Route with a common path */}
        <Route path="/dashboard"element={<ProtectedRoute/>}>
           <Route path="user" element={<UserDashboard/>}/>
           <Route path="user/profile" element={<UserProfile />}/>
           <Route path="user/orders" element={<UserOrder />}/>
        </Route>

       

        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
