import TitlePage from "@/components/ui/TitlePage"
import React from "react"
import muiTheme from "@/util/muiTheme"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Button, Container, ThemeProvider, Typography } from "@mui/material"
import "@/util/App.css"
import { Link } from "react-router-dom"
import Products from "@/components/ui/Products"
import Wallpaper from "@/components/ui/Wallpaper"

export const HomePage = () => {
  return (
    <ThemeProvider theme={muiTheme}>
    <CssBaseline />
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <TitlePage title="Home" />
       
      <Typography variant="h4" component="h1" sx={{py:10}} gutterBottom>
      URBAN THREADS
      </Typography>
      <Link to="/products" style={{ textDecoration: 'none' }}>
        <Button variant="contained" color="primary" size="large" sx={{color: "secondary.light"}}>
          Shop Now
        </Button>
      </Link>
    </Box>
    <Container sx={{ mt: 4 }}>
      <Products />
    </Container>
    <Container> 
    <Box
        sx={{
          position: 'relative',
          textAlign: 'center',
          py: 30,
          mt: 10, 
          background: `url('footwear.png') no-repeat center center`,
          backgroundSize: 'cover',
          color: 'primary.contrastText',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: -1,
          },
        }}
      > </Box> 

    </Container>
  </ThemeProvider>
  )
}
export default HomePage
