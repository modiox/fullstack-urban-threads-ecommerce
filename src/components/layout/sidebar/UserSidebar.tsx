import muiTheme from '@/util/muiTheme'
import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link, ThemeProvider } from 'react-admin'
import { UserState, User } from '@/types'
import { RootState } from '@/services/toolkit/store'
import { useSelector } from 'react-redux'

export const UserSidebar = () => {
    const { userData } = useSelector((state: RootState) => state.userR) 
    //const userData = useSelector((state: RootState) => state.userR.userData);
  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ padding: "100px", alignContent: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          <aside>
            <div>
              {" "}
              <h5> User Profile</h5>{" "}
            </div>
            <p> Username: {userData?.username} </p>
            <p> Email: {userData?.email} </p>
            <ul>
              <li>
                <Link to="/dashboard/user/profile"> Profile </Link>
              </li>
              <li>
                <Link to="/dashboard/user/orders"> Orders </Link>
              </li>
            </ul>
          </aside>
          {/* Main content here */}
        </Typography>
      </Box>
    </ThemeProvider>
  )
}
