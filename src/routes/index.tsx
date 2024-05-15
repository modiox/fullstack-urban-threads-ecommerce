import React from "react"
import main from "../util/main" 
import { BrowserRouter, Route, Routes } from "react-router-dom"
// import "@/index.css"

import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Error from "../pages/Error"
import ProductList from "../components/ui/Product"

const Index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Index
