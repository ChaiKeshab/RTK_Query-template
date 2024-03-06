import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NoteBody, NoteResponse, NoteType, UpdateNoteType } from "../../../types/apiTypes";

const baseURL = "http://localhost:5000/api/notes"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlODA4MzQ0NTFmODIxYjQ1ZDRmZjhhIn0sImlhdCI6MTcwOTcwNTI2OH0.CPtMs6R1Z40_6BTGeGsnYBtZyo7kE2K4YARHuTLFkdo"

const mongoNotesSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURL, headers: { "auth-token": token } }),

    /**This is used by TypeScript to understand the types of tags used in the queries. It's purely for type checking. 
     * write all the tags that are used on queries below @providesTags */

    tagTypes: ['Post'],
    endpoints: (builder) => ({

        getAllNotes: builder.query<NoteResponse, void>({
            query: () => "fetchallnotes",
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Post' as const, id: _id })),
                        { type: 'Post', id: 'LIST' },
                    ]
                    : [{ type: 'Post', id: 'LIST' }],
            /**
             * may look like this
             *  [
                    { "type": "Post", "id": "65e8271a451f821b45d4ffa8" },
                    { "type": "Post", "id": "65e8277b451f821b45d4ffac" },
                    { "type": "Post", "id": "LIST" }
                ]

                If results are available, it creates tags for each note ({ type: 'Post', id: _id }) and 
                a generic "LIST" tag. If no results exist, it only provides the "LIST" tag.
             */
        }),

        addNote: builder.mutation<NoteType, NoteBody>({
            query: (body) => ({
                url: "addnote",
                method: "POST",
                body: body
            }),

            /** invalidates all "getAllNotes" cache entries using the 'LIST' tag, triggering a refetch to get the updated data with the new note. */
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),

        updateNote: builder.mutation<UpdateNoteType, NoteBody & { id: string }>({
            query: ({ id, title, description, tags }) => ({
                url: `updatenote/${id}`,
                method: "PUT",
                body: { title, description, tags }
            }),

            /**dynamically creates a tag specific to the updated note ({ type: 'Post', id }) using the provided "id" in the mutation argument. This invalidates only the cached entry for that specific note. */
            invalidatesTags: (_, __, { id }) => [{ type: "Post", id }]
        }),


    })
})

export const { useGetAllNotesQuery, useAddNoteMutation, useUpdateNoteMutation } = mongoNotesSlice
export default mongoNotesSlice

/*
   While the backend API's getAllNotes endpoint always returns all notes, RTK Query can intelligently optimize refetching using cache invalidation tags, even if you invalidate a specific note's cache based on its ID.
  
   Here's how RTK Query handles this scenario:
   
   # Cache Invalidation and Refetch:
   
    - When a mutation like updateNote is triggered that invalidates a specific note's cache using its ID-based tag, RTK Query marks that note's cached data as invalid.
    - If a component is subscribed to the getAllNotes query, RTK Query recognizes the invalid note and initiates a refetch of getAllNotes to retrieve the latest data.
      
   # Optimized Fetching:
   
    - RTK Query makes a call to the backend's getAllNotes endpoint, but it doesn't simply replace the entire cached data with the new response. It leverages the cache invalidation tags to update only the necessary parts of the cache.
    
   # Cache Update:
   
    - RTK Query parses the response from the getAllNotes refetch and locates the updated note using its ID.
      Instead of replacing the entire cache, it selectively merges the updated note with the existing cached data.
      This means that RTK Query only updates the cache for the invalidated note, leaving the rest of the cached notes intact.
      
   # Data Consistency:
   
   - After this process, the cached data for getAllNotes remains consistent with the latest server state, even though a full refetch occurred.
   - Components subscribed to getAllNotes will now receive the updated data, including the successfully updated note.
    
   # Key Points:
   
   - RTK Query optimizes refetches by minimizing unnecessary network calls and data updates.
   - This optimization is only possible due to the granularity provided by individual cache invalidation tags for each note.
   - By invalidating only specific notes, RTK Query can strategically update only those necessary parts of the cache, ensuring data consistency while reducing data fetching overhead.
   
  */