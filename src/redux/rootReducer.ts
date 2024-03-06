import { combineReducers } from "redux";
import pokeModalSlice from "./slices/pokeModalSlice";
import pokemonApiSlice from './slices/api/pokemonApiSlice'
import jsonPlaceholderSlice from './slices/api/jsonPlaceholderSlice'
import mongoNotesSlice from './slices/api/mongoNotesSlice'

const rootReducer = combineReducers({
    pokeModalSlice: pokeModalSlice,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
    [jsonPlaceholderSlice.reducerPath]: jsonPlaceholderSlice.reducer,
    [mongoNotesSlice.reducerPath]: mongoNotesSlice.reducer
})

export default rootReducer