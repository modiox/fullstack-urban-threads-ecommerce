import api from "@/api";
import { CategoryState, ProductState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState: CategoryState = { 
    categories: [],
    totalPages: 0,
    category: null,
    error: null,
    isLoading: false
}
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
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
      const response = await api.get(`categories`,{
        params: { pageNumber, pageSize, keyword, sortBy }
      });
      console.log(response.data)
      return response.data
      console.log(response.data)
    }
  )

//cases: pending, fulfilling, rejected
const categorySlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategories.pending, (state) => {
      state.error = null
      state.isLoading = true
    })

    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload
      state.totalPages = action.payload.totalPages
      console.log('Categories:', state.categories); 
      state.error = null
      state.isLoading = false
    })
    builder.addCase(fetchCategories.rejected, (state) => {
      state.error = null
      state.isLoading = false
    })

  
  } 

})

export default categorySlice.reducer

