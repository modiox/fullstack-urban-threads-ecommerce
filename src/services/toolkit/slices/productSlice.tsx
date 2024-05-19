import api from "@/api";
import { ProductState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//type definition of the initialState

const initialState: ProductState = { 
    products: [],
    totalPages: 0,
    product: null,
    error: null,
    isLoading: false
}
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({
    pageNumber,
    pageSize,
    keyword,
    sortBy
  }: {
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy: string
  }) => {
    const response = await api.get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&keyword=${keyword}&sortBy=${sortBy}`
    )
    return response.data
  }
)

export const fetchProductsById = createAsyncThunk("products/fetchProductsById", async (productID: string | undefined) => {
  const response = await api.get(`/products/post/${productID}`)
   console.log(response.data)
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
      state.products = action.payload.data.items
      state.totalPages = action.payload.data.totalPages
      state.error = null
      state.isLoading = false 
    })
    builder.addCase(fetchProducts.rejected, (state) => {
      state.error = null
      state.isLoading = false
    })

    //ProductbyName states 
        builder.addCase(fetchProductsById.pending, (state) => {
          state.error = null
          state.isLoading = true
        })
        builder.addCase(fetchProductsById.fulfilled, (state, action) => {
          console.log(action.payload.data.items)
          state.product = action.payload.data
          state.error = null
          state.isLoading = false
        })
        builder.addCase(fetchProductsById.rejected, (state) => {
          state.error = null
          state.isLoading = false
        })
  }
})

export default productSlice.reducer

