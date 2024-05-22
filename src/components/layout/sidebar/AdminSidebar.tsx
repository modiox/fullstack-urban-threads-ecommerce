import muiTheme from "@/util/muiTheme"
import { Box, Typography } from "@mui/material"
import React from "react"
import { Link, ThemeProvider } from "react-admin"
import { UserState, User } from "@/types"
import { RootState } from "@/services/toolkit/store"
import { useSelector } from "react-redux"
import userSlice from "@/services/toolkit/slices/userSlice"

export const AdminSidebar = () => {
  const { userData } = useSelector((state: RootState) => state.userR)
  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ padding: "100px", alignContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <aside>
            <div>
              {" "}
              <h5> Admin Profile</h5>{" "}
            </div>
            <p> Username: {userData?.username} </p>
            <p> Email: {userData?.email} </p>
            <ul>
              <li>
                <Link to="/dashboard/admin/categories"> Categories </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/products"> Products </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/orders"> UsersOrders </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/users"> Users </Link>
              </li>
            </ul>
          </aside>
          {/* Main content here */}
        </Typography>
      </Box>
    </ThemeProvider>
  )
}
