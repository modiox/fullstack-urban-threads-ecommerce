import React from "react"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Error from "../pages/Error"
import ProductList from "../components/ui/Products"
import Navbar from "@/components/layout/Navbar"
// import Category from "../components/ui/Category"
import ProductDetails from "@/pages/ProductDetails"
import Products from "../components/ui/Products"
import Dashboard from "@/pages/Dashboard"
import Register from "@/pages/Register"
import { Login } from "react-admin"
import { LoginUser } from "@/pages/LoginUser"


const Index = () => {
  return (
   
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginUser/>} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>

  )
}

export default Index
