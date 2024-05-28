import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home, { HomePage } from "../pages/HomePage"
import Navbar from "@/components/layout/Navbar"
import Products from "../components/ui/Products"
import UserDashboard from "@/pages/UserDashboard"
import AdminDashboard from "@/pages/admin/AdminDashboard"
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
import RegisterPage from "@/pages/RegisterPage"
import UserProfilePage from "@/pages/UserProfilePage"
import UserOrderPage from "@/pages/UserOrderPage"
import ErrorPage from "../pages/ErrorPage"
import ProductDetailsPage from "@/pages/ProductDetailsPage"
import { LoginPage } from "@/pages/LoginPage"




const Index = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:productID" element={<ProductDetailsPage />} />
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
         
          <Route path="/dashboard" element={<ProtectedRoute/>} />
         <Route path="/dashboard/user" element={<UserDashboard/>}/>
         <Route path="/dashboard/user/profile" element={<UserProfilePage />}/>
         <Route path="/dashboard/user/orders" element={<UserOrderPage />}/> 

         {/* <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfilePage />} />
          <Route path="user/orders" element={<UserOrderPage />} />
          </Route> */}

       

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
