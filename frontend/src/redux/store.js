import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice';
import { userApiSlice } from "./userApiSlice";

export const store = configureStore({
    reducer: {
        user: userSlice,
        [userApiSlice.reducerPath]: userApiSlice.reducer
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApiSlice.middleware)
})