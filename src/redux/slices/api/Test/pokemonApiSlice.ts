import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AllPokemonLResponse } from '../../../../types/apiTypes'

const baseURL = import.meta.env.VITE_BASE_URL as string

const pokemonApiSlice = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),

    /**default; refetchOnMountOrArgChange: false 
     * @param {boolean | number} refetchOnMountOrArgChange
     * */
    refetchOnMountOrArgChange: false,
    /*
    https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#default-cache-behavior
    
    refetchOnMountOrArgChange is used to encourage re-fetching in additional situations where the default behavior would instead serve cached data.
    refetchOnMountOrArgChange accepts either a boolean value, or a number as time in seconds.
   
    # Passing a number as a value in seconds will use the following behavior:

    At the time a query subscription is created:
    if there is an existing query in the cache, it will compare the current time vs the last fulfilled timestamp for that query,
    It will refetch if the provided amount of time in seconds has elapsed.
    If there is no query, it will fetch the data.
    If there is an existing query, but the amount of time specified since the last query has not elapsed, it will serve the existing cached data
    */


    //The refetchOnFocus option allows you to control whether RTK Query will try to refetch all subscribed queries after the application window regains focus.
    /** defalult; refetchOnFocus: false, 
     * @param {boolean} refetchOnFocus 
     */
    refetchOnFocus: true,
    //If you specify this option alongside skip: true, this will not be evaluated until skip is false.

    /**@Note this requires {setupListeners} to have been called in store. CHECK DOCS*/
    //setupListeners(store.dispatch)

    endpoints: (builder) => ({
        getAllPokemon: builder.query<AllPokemonLResponse, { offset: number, limit?: number }>({
            query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
            transformResponse(baseQueryReturnValue: AllPokemonLResponse, meta, arg) {
                console.log(meta, arg)
                // **Parameters:**
                // * `arg`: This object contains the **arguments passed to the query function**, in this case, `{ offset, limit }`.
                // * `meta`: This object provides **meta information** about the query execution, such as the **request URL**, **HTTP headers**, and **response status code**.
                return baseQueryReturnValue
            },
        }),

        getSpecificPokemon: builder.query<any, string>({
            query: (pokemonName) => `pokemon/${pokemonName}`,
            transformErrorResponse(baseQueryReturnValue, meta, arg) {
                console.log(meta, arg)
                return baseQueryReturnValue
            },
            //60seconds (default)
            keepUnusedDataFor: 60
            // when all the components that uses this query data are unmounted, the cached data is deleted after 60 seconds.
            //https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#default-cache-behavior

        }),
    }),
})

export const { useGetAllPokemonQuery, useGetSpecificPokemonQuery } = pokemonApiSlice
export default pokemonApiSlice