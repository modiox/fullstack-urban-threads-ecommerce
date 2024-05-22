import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
    reducer: {
        productR: productReducer,
        userR: userReducer,
        categoryR: categoryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;