import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NoteBody, NoteResponse, NoteType, UpdateNoteType } from "../../../types/apiTypes";

const baseURL = "http://localhost:5000/api/notes"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlODA4MzQ0NTFmODIxYjQ1ZDRmZjhhIn0sImlhdCI6MTcwOTcwNTI2OH0.CPtMs6R1Z40_6BTGeGsnYBtZyo7kE2K4YARHuTLFkdo"

const mongoNotesSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURL, headers: { "auth-token": token } }),
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
             * should look like this
             *  [
                    { "type": "Post", "id": "65e8271a451f821b45d4ffa8" },
                    { "type": "Post", "id": "65e8277b451f821b45d4ffac" },
                    { "type": "Post", "id": "LIST" }
                ]
             */
        }),

        addNote: builder.mutation<NoteType, NoteBody>({
            query: (body) => ({
                url: "addnote",
                method: "POST",
                body: body
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),

        updateNote: builder.mutation<UpdateNoteType, NoteBody & { id: string }>({
            query: ({ id, title, description, tags }) => ({
                url: `updatenote/${id}`,
                method: "PUT",
                body: { title, description, tags }
            }),
            invalidatesTags: (_, __, { id }) => [{ type: "Post", id }]
        }),


    })
})

export const { useGetAllNotesQuery, useAddNoteMutation, useUpdateNoteMutation } = mongoNotesSlice
export default mongoNotesSlice