import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api';
import { Order } from '@/types';
import { getToken } from '@/util/localStorage';
import { RootState } from '../store';

// Define the initial state
interface OrderState {
  orders: Order[];
  orderDetails: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

type PaymentMethod =  1
//'Credit Card' | 'Debit Card' | 'PayPal' | 'Bank Transfer' | 'Cash';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get('/history/my-orders');
  return response.data;
});

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ productID, paymentMethod }: { productID: string; paymentMethod: PaymentMethod }) => {
    const token = getToken();
    const response = await api.post(`/post/${productID}/create-order`, { paymentMethod }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
);

export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderID: string) => {
  await api.delete(`/api/history/my-orders/${orderID}/delete`);
  return orderID;
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async () => {
  const response = await api.get('/api/history/orders');
  return response.data;
});

// Define the order slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch orders';
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      });
  },
});

export default orderSlice.reducer;
