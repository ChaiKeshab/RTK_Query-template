import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PostResponse, PostType } from '../../../../types/apiTypes'

const baseURL = "https://jsonplaceholder.typicode.com"

const jsonPlaceholderSlice = createApi({
    reducerPath: "jsonPlaceholder",
    baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
    endpoints: (builder) => ({

        getPosts: builder.query<PostResponse, void>({
            query: () => '/posts'
        }),

        addPost: builder.mutation<any, Partial<PostType> & Pick<PostType, "id">>({
            query: ({ id, body, title, userId }) => {

                const newBody = { body, title, userId }
                return {
                    url: `/posts/${id}`,
                    method: "PUT",
                    body: newBody
                }
            }
        })
    })
})

export const { useGetPostsQuery, useAddPostMutation } = jsonPlaceholderSlice;
export default jsonPlaceholderSlice