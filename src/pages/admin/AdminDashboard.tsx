import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Box, TextField, Button, Typography } from "@mui/material"
import { Link, ThemeProvider } from "react-admin"
import muiTheme from "@/util/muiTheme"
import { AdminSidebar } from "@/components/layout/sidebar/AdminSidebar"
import TitlePage from "@/components/ui/TitlePage"
import { AppDispatch } from "@/services/toolkit/store"


const AdminDashboard: React.FC = () => {
  const dispatch:AppDispatch = useDispatch()
  const [productName, setProductName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [productID, setProductID] = useState("")

  return (
    
    <ThemeProvider theme={muiTheme}>
      <TitlePage title="Admin Dashboard" /> 
     
      <div
        className="product-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "80vh"
        }}
      >
        <Typography variant="h5" component="div" sx={{ my: 2 }}>
     
        </Typography>
        <AdminSidebar />

      </div>
        
      
     
    </ThemeProvider>
  )
}

export default AdminDashboard
