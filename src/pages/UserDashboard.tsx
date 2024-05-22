import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Box, TextField, Button, Typography } from "@mui/material"
import { Link, ThemeProvider } from "react-admin"
import muiTheme from "@/util/muiTheme"
import { UserSidebar } from "@/components/layout/sidebar/UserSidebar"
import { AppDispatch } from "@/services/toolkit/store"

const UserDashboard: React.FC = () => {
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

export default UserDashboard
