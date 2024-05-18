import React, { useState } from "react"
import { Link } from "react-router-dom"
import { AppBar, Toolbar, Typography, ThemeProvider, Button, Menu, MenuItem } from "@mui/material"
import muiTheme from "@/util/muiTheme"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Import the arrow icon



const Navbar = () => {
      const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const navItemStyle = {
      textDecoration: "capitalize",
      color: "inherit",
      marginRight: "14px",
     
      display: "inline-block"
    }
  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="fixed">
        <Toolbar>
          <img src={"Logo.png"} alt="Logo" style={{ height: "100px", marginRight: "30px" }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 0.5, margin: 0 }}>
            <h3> </h3>
          </Typography>
          <ul
            style={{
              listStyleType: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              alignItems: "center"
            }}
          >
            <li style={navItemStyle}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/products" style={{ textDecoration: "none", color: "inherit" }}>
                Shop
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
                Dashboard
              </Link>
            </li>

            <li>
              <Button
                onClick={handleMenuOpen}
                style={navItemStyle}
                sx={{
                  textTransform: "capitalize",
                  display: "flex",
                  alignItems: "center",
                  padding: "0",
                  paddingTop: "0"
                }}
              >
                Categories <KeyboardArrowDownIcon sx={{ marginBottom: "0" }} />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                MenuListProps={{ onMouseLeave: handleMenuClose }}
              >
                <MenuItem component={Link} to="/category/1" onClick={handleMenuClose}>
                  New Arrival
                </MenuItem>
                <MenuItem component={Link} to="/category/2" onClick={handleMenuClose}>
                  Tops
                </MenuItem>
                <MenuItem component={Link} to="/category/3" onClick={handleMenuClose}>
                  Outwear
                </MenuItem>
                <MenuItem component={Link} to="/category/4" onClick={handleMenuClose}>
                  Accessories
                </MenuItem>
                <MenuItem component={Link} to="/category/4" onClick={handleMenuClose}>
                  Shop All
                </MenuItem>
              </Menu>
            </li>
            <li style={navItemStyle}>
              <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>
                Register
              </Link>
            </li>
            <li style={navItemStyle}>
              <Link to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Login
              </Link>
            </li>
            {/* <li style={navItemStyle}>
              <Link to="/about" style={{ textDecoration: "none", color: "inherit" }}>
                About
              </Link>
            </li> */}
            <li style={navItemStyle}>
              <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                Contact
              </Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
} 

export default Navbar
