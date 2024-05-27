import api from "@/api";
import { Category, CategoryState, CreateCategoryFormData, ProductState } from "@/types";
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

  //update/edit category
  export const updateCategory = createAsyncThunk(
    "categories/updateCategory",
    async (category: Category) => {
      const token = getToken();
      const response = await api.put(`/account/dashboard/categories/${category.categoryID}/update`, category, {
        headers: { Authorization: `Bearer ${token}` } //passing the token
      });
      return response.data;
    }
  );
  

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

    //Delete Category

    builder.addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter((category) => category.categoryID != action.payload)
        console.log(state.categories)
        state.isLoading = false;
      
      })

      builder.addCase(createCategory.fulfilled, (state, action) => {
       state.categories.push(action.payload)
    
      })

      //Edit Category 
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.categories.findIndex(category => category.categoryID === action.payload.categoryID);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update category';
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

