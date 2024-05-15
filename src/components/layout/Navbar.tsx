import React from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, ThemeProvider } from "@mui/material"
import muiTheme from "@/util/muiTheme"


const pages = ["Home", "Prodcuts", "Category", "About", "Contact"]
const settings = ["Profile", "Account", "Dashboard", "Logout"]


const Navbar = () => {
  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.45, margin: 0}}>
            <h3> Logo goes here</h3>
          </Typography>
          <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
                Products
              </Link>
            </li>
            <li style={{ display: "inline-block", marginRight: "10px" }}>
              <Link to="/category" style={{ textDecoration: "none", color: "inherit" }}>
                Category
              </Link>
            </li>
            <li style={{ display: "inline-block" }}>
              <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                Contact
              </Link>
            </li>
            <li style={{ display: "inline-block" }}>
              <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                About
              </Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
