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
  async ({ updateUserData, userID }: { updateUserData: UpdateUserProfile, userID: string | undefined }) => {
    if (!userID) {
      throw new Error("User ID is undefined"); 
    }
    const token = getToken();
    const response = await api.put(`/account/my-profile/update/`,  { ...updateUserData, userID }, 
    {headers: { Authorization: `Bearer ${token}`}}); //passing the token 
    console.log(response.data.data);
    return response.data.data;
  }
);
// Block/Unblock user action
export const blockUnblockUser = createAsyncThunk(
  "users/blockUnblockUser",
  async (userID: string) => {
    const response = await api.put(`/users/banUnban/${userID}`, {} ,{
      headers: { Authorization: `Bearer ${getToken()}`}
    })
    return response.data
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
      if (state.userData) {
        const updatedUserData = {
          ...state.userData,
          firstName: action.payload.data.firstName,
          lastName: action.payload.data.lastName,
          address: action.payload.data.address,
          email: action.payload.data.email,
        };
        state.userData = updatedUserData;
        setLocalStorage("loginData", {
          isLoggedIn: state.isLoggedIn,
          userData: updatedUserData,
          token: state.token,
        });
      }
    });
    //fetch users 
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data
      state.totalPages = action.payload.data.totalPages
      state.error = null
      state.isLoading = false
    })
    //Block/unblock user
    builder.addCase(blockUnblockUser.fulfilled, (state, action) => {
      const foundUser = state.users.find((user) => user.userID === action.payload.data.userID);
      if (foundUser) {
        foundUser.isBanned = action.payload.data.isBanned
        state.isLoading = false

       
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
