import apiSlice, { type LoginReturn } from './apiSlice'

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginReturn, { user: string, pwd: string }>({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: credentials
            }),
        }),

        refresh: builder.query<{ accessToken: string }, void>({
            query: () => "/refresh",
            keepUnusedDataFor: 0.001,
        }),

        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/logout",
                method: "GET",
            }),
        })
    })
})

export const { useLoginMutation, useRefreshQuery, useLogoutMutation } = authApiSlice
