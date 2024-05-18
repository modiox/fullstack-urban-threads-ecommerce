import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  ThemeProvider,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material"
import { useTheme, useMediaQuery } from "@mui/material"
import muiTheme from "@/util/muiTheme"
import MenuIcon from "@mui/icons-material/Menu"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const navItemStyle = {
    textDecoration: "none",
    color: "inherit",
    marginRight: "14px",
    display: "inline-block"
  }

  const drawer = (
    <div onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} style={{ width: 250 }}>
      <List>
        <ListItem
          button
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText primary="Home"/>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/products"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText primary="Shop" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          style={{ textDecoration: "none", color: "inherit" }}
        >
        <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/register"
          style={{ textDecoration: "none", color: "inherit" }}
        >
        <ListItemText primary="Register" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/login"
          style={{ textDecoration: "none", color: "inherit" }}
        >
        <ListItemText primary="Login" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/contact"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <ListItemText primary="Contact" />
        </ListItem>
      </List>
    </div>
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md")) //collapse the navbar on medium screens 

  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img src={"Logo.png"} alt="Logo" style={{ height: "50px", marginRight: "20px" }} />
          <div style={{ display: "flex", alignItems: "center" }}>
            <ul
              style={{
                listStyleType: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                justifyContent: "flex-end"
              }}
            >
              {!isMobile && (
                <>
                  <li style={navItemStyle}>
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                      Home
                    </Link>
                  </li>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    {!isMobile && (
                      <Button
                        onClick={handleMenuOpen}
                        style={navItemStyle}
                        sx={{
                          textTransform: "capitalize",
                          display: "flex",
                          alignItems: "center",
                          padding: 0
                        }}
                      >
                        Shop <KeyboardArrowDownIcon />
                      </Button>
                    )}
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
                      <MenuItem component={Link} to="/products" onClick={handleMenuClose}>
                        Shop All
                      </MenuItem>
                    </Menu>
                  </div>
                  <li style={navItemStyle}>
                    <Link to="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
                      Dashboard
                    </Link>
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
                  <li style={navItemStyle}>
                    <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {isMobile && (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawer}
            </Drawer>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

export default Navbar
