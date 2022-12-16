import { buildCacheLifecycleHandler } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//define a service user a base url

const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4000'
    }),

    endpoints: (builder) => ({
        //creating the user
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/users",
                method: "POST",
                body: user,
            }),
        }),

        //login
        login: builder.mutation({
            query: (user) => ({
                url: "/user/login",
                method: "POST",
                body: user,
            }),
        }),


        //logout
        logout: builder.mutation({
            query: (payload) => ({
                url: "/logout",
                method: "DELETE",
                body: payload,
            }),
        }),


    }),

});


export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi

export default appApi;