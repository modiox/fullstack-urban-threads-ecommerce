import api from "@/api"
import {  LoginFormData, UpdateUserProfile, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
 


const data = localStorage.getItem("loginData") != null ? JSON.parse(String(localStorage.getItem("loginData"))) : []

//type definition of the initialState


const initialState: UserState = {
  error: null,
  isLoading: false,
  userData: data.userData || null,
  token: data.token || null,
  isLoggedIn: !!data.token,
  user: null,
  totalPages: 0,
};
export const registerUser = createAsyncThunk(
  "userSlice/registerUser",
  async (newUser: User) => {
    const response = await api.post("/signup", newUser)
    console.log(response)
    return response.data
  }
)
export const loginUser = createAsyncThunk("userSlice/loginUser", async (userData: LoginFormData) => {
  const response = await api.post("/login", userData)
  console.log(response.data.message)
  return response.data
})
//update user info
export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async ({ updateUserData, userId }: { updateUserData: UpdateUserProfile, userId: string | undefined }) => {
    if (!userId) {
      throw new Error("User ID is undefined"); 
    }
    const response = await api.put(`/account/my-profile/update/${userId}`, updateUserData);
    console.log(response.data.message);
    return response.data;
  }
);
//cases: pending, fulfilling, rejected
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.userData = null
      state.token = null
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token
        })
      )
    })
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.error = null
        state.isLoading = true
      }
    )
    builder.addMatcher(
      (action) => action.type.endsWith("/rejected"),
      (state) => {
        state.error = "An error occured"
        state.isLoading = false
      }
    )
  }
})
export const {logoutUser} = userSlice.actions
export default userSlice.reducer
