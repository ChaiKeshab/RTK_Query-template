// import {
//     useGetAllPokemonQuery,
//     useGetSpecificPokemonQuery,
// } from "../redux/slices/api/Test/pokemonApiSlice"

// import {
//     useGetPostsQuery,
//     useAddPostMutation
// } from '../redux/slices/api/Test/jsonPlaceholderSlice'

import {
    useGetAllNotesQuery,
    useAddNoteMutation,
    useUpdateNoteMutation
} from '../redux/slices/api/Test/mongoNotesSlice'


import { NoteBody } from "../types/apiTypes"
import { useState } from "react"
import { Button } from "../components"


/**
 * how to intercept an api call.
 * 
 */

const Home = () => {

    /************************************************************************************************************* */
    // const { data: allPokemon } = useGetAllPokemonQuery({ offset: 20 })
    // const names = allPokemon?.results.map(val => val.name) || []

    // // Conditional api call
    // const { data: specificPokemon } = useGetSpecificPokemonQuery(names[0], {
    //     skip: names[0] ? false : true
    // })

    /************************************************************************************************************* */


    // const { data: posts } = useGetPostsQuery()
    // const body: PostType = {
    //     id: 9,
    //     userId: 456,
    //     title: "broke",
    //     body: "contents"
    // }
    // const [addPost, { data: postMutateData, isLoading }] = useAddPostMutation()

    /************************************************************************************************************* */

    const [triggerEditMode, setTriggerEditMode] = useState(false)
    const [bodyTodo, setBodyTodo] = useState<NoteBody>({
        title: "",
        description: "",
        tags: []
    })
    const [selectedNote, setSelectedNote] = useState<NoteBody & { id: string }>({
        id: "",
        title: "",
        description: "",
        tags: []
    })

    const { data: allNotes } = useGetAllNotesQuery()
    const [addTodo] = useAddNoteMutation()
    const [updateTodo] = useUpdateNoteMutation()

    const handleSubmit = () => {
        if (!triggerEditMode) {
            addTodo(bodyTodo)
        } else {
            updateTodo({
                ...bodyTodo,
                tags: [...bodyTodo.tags ?? "", ...selectedNote.tags ?? ""],
                id: selectedNote.id
            })
        }
        setTriggerEditMode(false)
        setBodyTodo({
            title: "",
            description: "",
            tags: []
        })
    }

    const handleEditNote = ({ title, description, id, tags }: NoteBody & { id: string }) => {

        setBodyTodo({
            ...bodyTodo,
            title,
            description,
        })
        setSelectedNote({
            id,
            title,
            description,
            tags
        })
        setTriggerEditMode(true)
    }


    /************************************************************************************************************* */


    return (
        <div className="px-4 md:px-10 lg:px-16 space-y-3">
            <div className="">Home</div>

            <div className="flex justify-center items-center gap-4 flex-col w-full">

                <div>
                    {Object.keys(bodyTodo).map((val, index) => (
                        <div key={index}>
                            <label htmlFor={`${val}`}>{val}</label>
                            <div className="rounded-md w-96 border overflow-hidden">
                                <input
                                    id={`${val}`}
                                    className="w-full px-3 py-2 outline-none border-none"
                                    type="text"
                                    value={bodyTodo[val as keyof NoteBody]}
                                    onChange={(e) => {

                                        if (val !== "tags") {
                                            setBodyTodo({
                                                ...bodyTodo,
                                                [val]: e.target.value
                                            })
                                        } else {
                                            setBodyTodo({
                                                ...bodyTodo,
                                                [val]: [e.target.value]
                                            })
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>


                <Button
                    onClick={handleSubmit}
                    variants={{ color: "primary", flat: true }}
                >Label
                </Button>


                {/* <Button
                    disabled={!bodyTodo.title}
                    variants={{ color: "primary", size: "md", disabled: !bodyTodo.title }}
                    // className="bg-blue-500 px-4 py-2 rounded-md text-white disabled:bg-gray-300 disabled:text-black duration-300"
                    onClick={handleSubmit}
                >
                    {!triggerEditMode ? "Submit" : "Edit"}
                </Button> */}
            </div>

            <div className="flex justify-start items-start flex-wrap gap-3">
                {allNotes?.map((note) => {
                    const { title, description, tags, _id } = note

                    return (
                        <div key={_id} className="relative p-6 pb-3 bg-slate-200 w-fit rounded-md border border-gray-700 shadow-md">
                            <div>Title: {title}</div>
                            {description && <div>Description: {description}</div>}
                            {!!tags[0] &&
                                <div className="mt-3 flex justify-start items-start gap-2 flex-wrap">
                                    {tags?.map((tag, index) => (
                                        <div key={`${tag}${index}`} className="bg-slate-400 rounded-md text-xs py-1 px-2">
                                            {tag}
                                        </div>
                                    ))}
                                </div>
                            }

                            <button
                                className="absolute top-0 right-0 -translate-x-1 translate-y-1 w-5 aspect-square bg-slate-500 rounded-full text-xs"
                                onClick={() => handleEditNote({ title, description, id: _id, tags })}
                            >
                                E
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* <Button label="Secondary Medium" variants={{ size: 'md', color: 'secondary' }} />
            <Button label="Primary Large" variants={{ size: 'lg', color: 'primary' }} />
            <Button label="Secondary Small" variants={{ size: 'sm', color: 'secondary' }} />
            <Button label="default" variants={{
                color: {
                    initial: 'primary',
                    sm: 'success',
                    md: 'secondary'
                },
                size: {
                    initial: 'small',
                    sm: 'medium',
                    md: 'large'
                }
            }}
            /> */}

            {/* <pre>{JSON.stringify(allPokemon, null, 2)}</pre> */}


        </div>
    )
}

export default Home