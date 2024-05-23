import api from "@/api";
import { CategoryState, CreateCategoryFormData, ProductState } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getToken } from "@/util/localStorage";


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
    }
  )

  export const deleteCategory = createAsyncThunk(
    "categories/deleteCategories",
    async (categoryID: string) => {
        const token = getToken();
      const response = await api.delete(`account/dashboard/categories/${categoryID}/delete`,{
        headers: { Authorization: `Bearer ${token}`} //passing the token 
      });
      console.log(response.data)
      return categoryID

    }
  )

  export const createCategory = createAsyncThunk("categories/createCategory", async (newCategory: CreateCategoryFormData) => {
    const token = getToken();
    const response = await api.post("/account/dashboard/categories/new-category", newCategory,{
        headers: { Authorization: `Bearer ${token}`} //passing the token 
      })
    console.log(response.data.data)
    return response.data.data

  })

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
      state.categories = action.payload.data
      state.totalPages = action.payload.totalPages
      console.log('Categories:', state.categories); 
      state.error = null
      state.isLoading = false
    })
    builder.addCase(fetchCategories.rejected, (state) => {
      state.error = null
      state.isLoading = false
    })

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.categoryID != action.payload)
        console.log(state.categories)
        state.isLoading = false;
      
      })

      builder.addCase(createCategory.fulfilled, (state, action) => {
       state.categories.push(action.payload)
        //state.totalPages = action.payload.totalPages
    
      })

      builder.addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
            state.error =null
            state.isLoading = true
        }
      )
  

  
  } 

})

export default categorySlice.reducer

