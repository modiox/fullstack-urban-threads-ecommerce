import { UserSidebar } from '@/components/layout/sidebar/UserSidebar'
import TitlePage from '@/components/ui/TitlePage'
import muiTheme from '@/util/muiTheme'
import { ThemeProvider, Typography } from '@mui/material'
import React from 'react'

const UserOrder = () => {
  return (
    <ThemeProvider theme={muiTheme}>
    <TitlePage title="Orders" /> 
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

export default UserOrder