import api from "@/api";
import { Product } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//type definition of the initialState
export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
}

const initialState = { 
    products: [],
    error: null,
    isLoading: false
}
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    const response = await api.get(`/products`)
    return response.data
})

//cases: pending, fulfilling, rejected
const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload
      state.error = null
      state.isLoading = false // Corrected: set isLoading to false
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.error = null
      state.isLoading = false
    })
  }
})

export default productSlice.reducer

