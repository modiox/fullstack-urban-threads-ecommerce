import api from "@/api";
import { ProductState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

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
    sortBy,
  
  }: {
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy: string
    
  }) => {
    const response = await api.get(
      `products?pageNumber=${pageNumber}&pageSize=${pageSize}`
    )
    return response.data
  }
)
export const searchProducts = createAsyncThunk(
  "products/searchProducts",
  async({
    pageNumber,
    pageSize,
    keyword,
    sortBy,
    isAscending
  }:{
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy: string
    isAscending: string
  } ) => {
    const response = await api.get(
      `products/search?keyword=${keyword}&isAscending=${isAscending}&pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}`

    )
     return response.data 
  }
  
 
)

export const sortProducts = createAsyncThunk(
  "products/searchProducts",
  async({
    pageNumber,
    pageSize,
    keyword,
    sortBy,
    isAscending
  }:{
    pageNumber: number
    pageSize: number
    keyword: string
    sortBy: string
    isAscending: string
  } ) => {
    const response = await api.get(
      `products/search?keyword=${keyword}&isAscending=${isAscending}&pageNumber=${pageNumber}&pageSize=${pageSize}`

    )
     return response.data 
  } )

//http://localhost:5343/api/products/search?keyword=urban&isAscending=true&page=1&pageSize=3

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

    //ProductbyId states
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

    //Searching Products

    builder.addCase(searchProducts.pending, (state) => {
      state.error = null
      state.isLoading = true
    })
    builder.addCase(searchProducts.fulfilled, (state, action) => {
      console.log(action.payload); 
      state.products = action.payload || []; 
      // Check if data and totalPages are defined
      if (action.payload && action.payload.totalPages !== undefined) {
        state.totalPages = action.payload.totalPages;
      } else {
        state.totalPages = 0; // Default value if totalPages is not defined
      }
      state.error = null;
      state.isLoading = false;
    });

    builder.addCase(searchProducts.rejected, (state) => {
      state.error = null
      state.isLoading = false
   
    }) 
  }
 

})
export const selectProducts = (state:RootState) => state.productR.products
export const selectTotalPages = (state:RootState) => state.productR.totalPages
export const selectIsLoading = (state:RootState) => state.productR.isLoading
export const selectError = (state:RootState) => state.productR.error

export default productSlice.reducer