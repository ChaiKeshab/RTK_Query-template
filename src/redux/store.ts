import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from './rootReducer'
import pokemonApiSlice from './slices/api/pokemonApiSlice'
import jsonPlaceholderSlice from './slices/api/jsonPlaceholderSlice'
import mongoNotesSlice from './slices/api/mongoNotesSlice'

const store = configureStore({
    reducer: rootReducer,
    middleware: gDM =>
        gDM().concat(
            pokemonApiSlice.middleware,
            jsonPlaceholderSlice.middleware,
            mongoNotesSlice.middleware
        ),
})

// enable listener behavior if you have refetchOnFocus: true alongside skip: true
// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store