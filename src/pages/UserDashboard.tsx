import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Box, TextField, Button, Typography } from "@mui/material"
import { Link, ThemeProvider } from "react-admin"
import muiTheme from "@/util/muiTheme"
import { UserSidebar } from "@/components/layout/sidebar/UserSidebar"
import { AppDispatch } from "@/services/toolkit/store"
import TitlePage from "@/components/ui/TitlePage"

 const UserDashboard: React.FC = () => {
  const dispatch:AppDispatch = useDispatch()
  

  return (
    <ThemeProvider theme={muiTheme}>
    <TitlePage title="User Dashboard" /> 
   <div
      className="product-container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "80vh",
        margin: 70
      }} >
      <Typography variant="h5" component="div" sx={{ my: 2 }}>
      </Typography>
      <UserSidebar />

    </div>
  </ThemeProvider>
  )
}

export default UserDashboard
