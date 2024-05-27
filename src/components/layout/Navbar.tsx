import React, { useEffect, useState } from "react"
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
  ListItemText,
  BadgeProps,
  styled,
  Badge
} from "@mui/material"
import { useTheme, useMediaQuery } from "@mui/material"
import muiTheme from "@/util/muiTheme"
import MenuIcon from "@mui/icons-material/Menu"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/services/toolkit/store"
import { logoutUser } from "@/services/toolkit/slices/userSlice"
import { ShoppingCartIcon } from "lucide-react"
import useCategoryState from "@/hooks/useCategoryState"
import { fetchCategories } from "@/services/toolkit/slices/categorySlice"
import useUserState from "@/hooks/useUserState"
import useCartState from "@/hooks/useCartState"
import { selectCartItemCount } from "@/services/toolkit/slices/cartSlice";


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)



  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  //const {isLoggedIn} = useSelector((state:RootState)=> state.userR) 
  const isLoggedIn = useSelector((state: RootState) => state.userR.isLoggedIn);
  const isAdmin = useSelector((state: RootState) => state.userR.isAdmin);
  const cart = useSelector((state: RootState) => state.cartR);
  const { categories, isLoading, error, totalPages } = useCategoryState();

  const cartItemCount = useSelector(selectCartItemCount);




  const dispatch:AppDispatch = useDispatch()
  const handleLogout = () => { 
    dispatch(logoutUser()) }

    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(3);
    const [keyword, setSearchKeyword] = useState("");
    const [sortBy, setSortBy] = useState("keyword");
    //const {isLoggedIn, userData} = useUserState()
    const {cartItems} = useCartState()

    useEffect(() => {
      dispatch(fetchCategories({ pageNumber, pageSize, keyword, sortBy }));
    }, [dispatch, pageNumber, pageSize, keyword, sortBy]);
  


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

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

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
        <ListItem
          button
          component={Link}
          to="/cart"
          style={{ textDecoration: "none" }}
          sx={{color:"secondary.light"}}
        >
          <IconButton aria-label="cart">
           <StyledBadge badgeContent={cartItemCount} sx={{color:"secondary.main"}}> 
            <ShoppingCartIcon />
            </StyledBadge>
            </IconButton>
          <ListItemText/>
        </ListItem>
        

        {isLoggedIn && (
          <>
            <ListItem style={navItemStyle}>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </ListItem>
          </>
        )}
        {!isLoggedIn && (
          <>
            <ListItem
              button
              component={Link}
              to="/register"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  )

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md")) //collapse the navbar on medium screens 

  return (
    <ThemeProvider theme={muiTheme}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <img
            src={"img/Logo.png"}
            alt="Logo"
            style={{ height: "100px", width: "100px", marginRight: "20px" }}
          />
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
                          fontSize: "15",
                          padding: 0
                        }}
                      >
                        Shop
                      </Button>
                    )}
                   <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      MenuListProps={{ onMouseLeave: handleMenuClose }}
    >
      {categories.map(category => (
        <MenuItem
          key={category.categoryID} 
          component={Link}
          to={`/category/${category.categoryID}`} 
          onClick={handleMenuClose}
        >
          {category.name} 
        </MenuItem>
      ))}
      <MenuItem component={Link} to="/products" onClick={handleMenuClose}>
        Shop All
      </MenuItem>
    </Menu>
                  </div>
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
                  <li>

                 
        {isLoggedIn && (
          <>
            <li style={navItemStyle}>
              <Link
                to="/"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </>
        )}
        {!isLoggedIn && (
          <>
            <ListItem
              button
              component={Link}
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            > 
            </ListItem>
          </>
        )}
                  </li>
                  <li style={navItemStyle}>
                    <Link to="/contact" style={{ textDecoration: "none", color: "inherit" }}>
                      Contact
                    </Link>
                  </li>
                  <li> 
              <ListItem
          button
          component={Link}
          to="/cart"
          style={{ textDecoration: "none" }}
          sx={{color:"secondary.main"}}
        >
          <IconButton aria-label="cart">
           <StyledBadge badgeContent={cartItemCount} sx={{color:"primary.light"}} > 
            <ShoppingCartIcon />
            </StyledBadge>
            </IconButton>
          <ListItemText/>
        </ListItem>
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
