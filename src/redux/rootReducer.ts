import { combineReducers } from "redux";
import pokeModalSlice from "./slices/pokeModalSlice";
import pokemonApiSlice from './slices/api/pokemonApiSlice'

const rootReducer = combineReducers({
    pokeModalSlice: pokeModalSlice,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer
})

export default rootReducer