import { combineReducers } from "redux";
import pokeModalSlice from "./slices/pokeModalSlice";
import authSlice from './slices/authSlice'
import pokemonApiSlice from './slices/api/Test/pokemonApiSlice'
import jsonPlaceholderSlice from './slices/api/Test/jsonPlaceholderSlice'
import mongoNotesSlice from './slices/api/Test/mongoNotesSlice'
import apiSlice from './slices/api/apiSlice'

const rootReducer = combineReducers({
    pokeModalSlice: pokeModalSlice,
    authSlice: authSlice,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
    [jsonPlaceholderSlice.reducerPath]: jsonPlaceholderSlice.reducer,
    [mongoNotesSlice.reducerPath]: mongoNotesSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer
})

export default rootReducer