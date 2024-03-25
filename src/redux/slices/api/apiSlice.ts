import { RootState } from '../../store';
import { logOut, setCredentials } from '../authSlice'
import { Mutex } from 'async-mutex'
import {
    BaseQueryFn,
    fetchBaseQuery,
    type FetchArgs,
    type FetchBaseQueryError,
    createApi
} from "@reduxjs/toolkit/query/react";


export interface LoginReturn {
    accessToken: string
}

const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3500/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState
        const accessToken = state.authSlice.accessToken
        if (accessToken) {
            headers.set("authorization", `Bearer ${accessToken}`)
        }
        return headers
    }
})


const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    // wait until the mutex is available without locking it
    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions)

    // Configure the error code that your backend sends and the error keys, types!!! 
    if (result.error && result.error.status === "PARSING_ERROR" && (result.error.originalStatus === 401 || result.error.originalStatus === 403)) {
        // checking whether the mutex is locked
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                // try to get a new token
                const refreshResult = await baseQuery('/refresh', api, extraOptions)

                if (refreshResult.data) {
                    // store the new token

                    const accessToken = refreshResult.data as LoginReturn
                    const state = api.getState() as RootState
                    const user = state.authSlice.user || ""
                    api.dispatch(setCredentials({ user, ...accessToken }))

                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions)
                } else {
                    console.log("logged out")
                    // refresh token expired so no need to send request to backend to invalidate the refresh token.
                    api.dispatch(logOut())
                }
            }
            finally {
                // release must be called once the mutex should be released again.
                release()
            }
        } else {
            // wait until the mutex is available without locking it
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}


const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});


export default apiSlice;