import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, ThemeProvider } from "@mui/material"
import muiTheme from "@/util/muiTheme"




const Navbar = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 0.5, margin: 0 }}
          >
            <h3> </h3>
          </Typography>
          <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link
                to="/products"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Products
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link
                to="/category"
                style={{ textDecoration: "none", color: "inherit"}}
              >
                Category
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link
                to="/contact"
                style={{ textDecoration: "none", color: "inherit"}}
              >
                Contact
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                About
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link
                to="/dashboard"
                style={{ textDecoration: "none", color: "inherit"}}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
