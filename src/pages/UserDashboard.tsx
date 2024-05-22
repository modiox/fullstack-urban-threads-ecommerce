import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { addProduct, updateProduct, deleteProduct } from "@/services/api/productService"
import { Box, TextField, Button, Typography } from "@mui/material"
import { Link, ThemeProvider } from "react-admin"
import muiTheme from "@/util/muiTheme"
import { RootState } from "@/services/toolkit/store"
import { UserState } from "@/types"
import { UserSidebar } from "@/components/layout/sidebar/UserSidebar"

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch()
  



  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ padding: "100px", alignContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to your dashboard!
          <UserSidebar/>
          {/* Main content here */}
        </Typography>
      </Box>
    </ThemeProvider>
  )
}

export default DashboardPage
