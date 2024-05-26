import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const theme = createTheme();

const products = [
  { id: 1, name: 'Product 1', image: 'https://via.placeholder.com/150', price: '$10.00' },
  { id: 2, name: 'Product 2', image: 'https://via.placeholder.com/150', price: '$20.00' },
  { id: 3, name: 'Product 3', image: 'https://via.placeholder.com/150', price: '$30.00' },
  { id: 4, name: 'Product 4', image: 'https://via.placeholder.com/150', price: '$40.00' },
];

const Wallpaper = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            E-Commerce
          </Typography>
          <Button color="inherit" startIcon={<ShoppingCartIcon />}>
            Cart
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }}>
          <Typography variant="h4" gutterBottom>
            Welcome to Our Store
          </Typography>
          <Paper elevation={3} sx={{ p: 2, mb: 4, textAlign: 'center' }}>
            <Typography variant="h5">Exclusive Products</Typography>
            <Typography variant="body1">
              Check out our exclusive collection of products.
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Shop Now
            </Button>
          </Paper>
          <Typography variant="h5" gutterBottom>
            Featured Products
          </Typography>
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid>
                <Card>
                
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Add to Cart</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Box component="footer" sx={{ p: 2, backgroundColor: theme.palette.background.paper }}>
        <Container>
          <Typography variant="body1">E-Commerce © {new Date().getFullYear()}</Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Wallpaper;
