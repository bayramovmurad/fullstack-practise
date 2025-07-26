import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';


export const userApiSlice = createApi({
    reducerPath: "userApi",
    tagTypes: ["Users"],

    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_KEY }),
    endpoints: (builder) => ({
        addRegisterUser: builder.mutation({
            query: (user) => ({
                url: "/register",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["Users"]
        }),
        addLoginUser: builder.mutation({
            query: (user) => ({
                url: "/login",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["Users"]
        })
    })
});

export const { useAddRegisterUserMutation, useAddLoginUserMutation } = userApiSlice;