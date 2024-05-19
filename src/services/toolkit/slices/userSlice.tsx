import api from "@/api"
import {  LoginFormData, User, UserState } from "@/types"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

//type definition of the initialState

const initialState: UserState = {

  error: null,
  isLoading: false
}
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
  return response.data.data.message
})

//cases: pending, fulfilling, rejected
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {},
  
})

export default userSlice.reducer
