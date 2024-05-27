import React, { useEffect } from 'react';
import useCartState from '@/hooks/useCartState';
import { AppDispatch } from '@/services/toolkit/store';
import { useDispatch } from 'react-redux';
import { removeAllFromCart, increaseQuantity, decreaseQuantity } from '@/services/toolkit/slices/cartSlice';
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  ThemeProvider
} from '@mui/material';
import { Link } from 'react-router-dom';
import muiTheme from '@/util/muiTheme';
import useUserState from '@/hooks/useUserState';
import api from '@/api';
import { toast } from 'react-toastify';
import { createOrder, deleteOrder, fetchOrders } from '@/services/toolkit/slices/orderSlice';

interface CartItem {
  productID: string;
  productName: string;
  price: number;
  quantity: number;
}

const CartPage = () => {
  const { cartItems } = useCartState();
  const { userData, isLoggedIn } = useUserState();
  const dispatch: AppDispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCreateOrder = (productID: string) => {
    dispatch(createOrder({productID, paymentMethod: 'Credit Card' }))
      .then(() => {
        toast.success('Order placed successfully!');
        dispatch(removeAllFromCart()); 
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        toast.error('Failed to place order. Please try again.');
      });
  };


  const handleRemoveFromCart = () => {
    dispatch(removeAllFromCart());
  };

  const handleIncreaseQuantity = (productID: string) => {
    dispatch(increaseQuantity(productID));
  };

  const handleDecreaseQuantity = (productID: string) => {
    dispatch(decreaseQuantity(productID));
  };



  const cartTotal = () => {
    return cartItems.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Container maxWidth="md" sx={{ padding: 4, bgcolor: 'background.paper', borderRadius: 4, marginTop: 10 }}>
        <Typography variant="h4" gutterBottom>
          Cart Items
        </Typography>
        {cartItems && cartItems.length > 0 ? (
          <>
            <Typography variant="h6" gutterBottom>
              Shopping Cart: {cartItems.length} items
            </Typography>
            <Grid container spacing={2}>
              {cartItems.map((cartItem: CartItem) => (
                <Grid item xs={12} key={cartItem.productID}>
                  <Card sx={{ mb: 2, boxShadow: 2, borderRadius: 4 }}>
                    <CardContent>
                      <Typography variant="h6">{cartItem.productName}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body1">Price: ${cartItem.price}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Button onClick={() => handleDecreaseQuantity(cartItem.productID)}>-</Button>
                          <Typography sx={{ mx: 2 }}>{cartItem.quantity}</Typography>
                          <Button onClick={() => handleIncreaseQuantity(cartItem.productID)}>+</Button>
                        </Box>
                      </Box>

                      {/* <Button
                variant="contained"
                sx={{ mt: 2 }}
                onClick={() => handleCreateOrder(cartItem.productID)}
                disabled={!isLoggedIn}
              >
                Place Order
              </Button> */} 
              
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Typography variant="h6">Summary</Typography>
            <Typography variant="body1">Total Price: ${cartTotal().toFixed(2)}</Typography>
            {isLoggedIn ? (
              <Box>
                <Typography variant="body1">Address: {userData && userData.address}</Typography>
                <Button variant="contained" sx={{ mt: 2, mr: 2 }}>
                  Edit Address
                </Button>
                <Button variant="contained" sx={{ mt: 2 }} onClick={() => handleCreateOrder(cartItem.productID)}>
                  Place Order
                </Button>
              </Box>
                  
            ) : (
              <Box mt={2}>
                <Link to="/login">
                  <Button variant="contained" color="primary">
                    Login to checkout
                  </Button>
                </Link>
              </Box>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRemoveFromCart}
              sx={{ mt: 2 }}
            >
              Clear Cart
            </Button>
          </>
        ) : (
          <Typography variant="h6" color="textSecondary">
            No items in the cart
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default CartPage;
