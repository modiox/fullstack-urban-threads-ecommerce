import api from "@/api"
import {  LoginFormData, Product, UpdateUserProfile, User, UserState } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/util/localStorage";
import { PayloadAction, createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store";
 

const data = getLocalStorage("cart", {cartItems: []})
const selectCartItems = (state: RootState) => state.cartR.cartItems;

const selectCartItemCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, item) => total + item.quantity, 0)
  );

export type CartItem = Product & {quantity: number}
export type CartState = {
    cartItems: CartItem[]
}

const initialState: CartState = {
    cartItems: getLocalStorage('cartItems', [])
  };



const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
        const existingItem = state.cartItems.find(
          (item) => item.productID === action.payload.productID
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.cartItems.push({ ...action.payload, quantity: 1 });
        }
        setLocalStorage('cartItems', state.cartItems);
      },
    removeFromCart:(state,action) => { 
        const productid = action.payload
        state.cartItems = state.cartItems.filter((cartItem)=> (cartItem.productID != productid))
        setLocalStorage('cartItems', state.cartItems);
    },
    removeAllFromCart: (state) => {
        state.cartItems = []
        setLocalStorage('cartItems', state.cartItems);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
        const itemIndex = state.cartItems.findIndex(item => item.productID === action.payload);
        if (itemIndex >= 0) {
          state.cartItems[itemIndex].quantity += 1;
          setLocalStorage("cartItems", state.cartItems);
        }

      },
      decreaseQuantity: (state, action: PayloadAction<string>) => {
        const itemIndex = state.cartItems.findIndex(item => item.productID === action.payload);
        if (itemIndex >= 0 && state.cartItems[itemIndex].quantity > 1) {
          state.cartItems[itemIndex].quantity -= 1;
          setLocalStorage("cartItems", state.cartItems);
        } else {
          state.cartItems = state.cartItems.filter(item => item.productID !== action.payload);
        }
      },

    
  },
  extraReducers(builder) {
    
  }
})

export { selectCartItemCount };
export const { addToCart, removeFromCart, removeAllFromCart, decreaseQuantity, increaseQuantity }= cartSlice.actions 
export default cartSlice.reducer
