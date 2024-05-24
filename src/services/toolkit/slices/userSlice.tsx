import api from "@/api"
import {  LoginFormData, UpdateUserProfile, User, UserState } from "@/types"
import { getLocalStorage, getToken, setLocalStorage } from "@/util/localStorage";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
 


const data = getLocalStorage("loginData", {
  userData: null,
  token: null,
  isLoggedIn: false
})
//localStorage.getItem("loginData") != null ? JSON.parse(String(localStorage.getItem("loginData"))) : []

//type definition of the initialState


const initialState: UserState = {
  error: null,
  isLoading: false,
  users: [],
  isAdmin: data.isLoggedIn,
  userData: data.userData || null,
  token: data.token || null,
  isLoggedIn: !!data.token,
  user: null,
  totalPages: 1,
};

//fetch users 
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
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
    const token = getToken();
    const response = await api.get(
      `account/dashboard/users?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {headers: { Authorization: `Bearer ${token}`}} //passing the token 
    )
    console.log(response.data)
    return response.data
    console.log(response.data)
  }
)
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
//Update user info
export const updateUser = createAsyncThunk(
  "userSlice/updateUser",
  async ({ updateUserData, userId }: { updateUserData: UpdateUserProfile, userId: string | undefined }) => {
    if (!userId) {
      throw new Error("User ID is undefined"); 
    }
    const token = getToken();
    const response = await api.put(`/account/my-profile/update/${userId}`, updateUserData, 
    {headers: { Authorization: `Bearer ${token}`}}); //passing the token 
    console.log(response.data.message);
    return response.data;
  }
);
// Block/Unblock user action
export const blockUnblockUser = createAsyncThunk(
  "users/blockUnblockUser",
  async ({ userId, isBanned }: { userId: string; isBanned: boolean }) => {
    const response = await api.put('/api/account/my-profile/update', {
      userId,
      isBanned,
    });
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
      setLocalStorage("loginData", {isLoggedIn: state.isLoggedIn,
      userData: state.userData,
      token: state.token })

    }
  },
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoggedIn = true
      state.userData = action.payload.data.loggedInUser
      state.token = action.payload.data.token
      setLocalStorage("loginData", {isLoggedIn: state.isLoggedIn,
        userData: state.userData,
        token: state.token })
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      console.log(action.payload)
      if (state.userData) {
        state.userData.firstName = action.payload.data.firstName
        state.userData.lastName = action.payload.data.lastName 
        state.userData.address = action.payload.data.address
        setLocalStorage("loginData", {isLoggedIn: state.isLoggedIn,
          userData: state.userData,
          token: state.token })
      }
    })
    //fetch users 
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data
      state.totalPages = action.payload.data.totalPages
      state.error = null
      state.isLoading = false
    })
    //Block/unblock user
    builder.addCase(blockUnblockUser.fulfilled, (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex((user) => user.userId === action.payload.userId);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
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
