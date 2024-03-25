import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";


interface InitialState {
    user: string | null;
    accessToken: string | null;
}

const initialState: InitialState = {
    user: null,
    accessToken: null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState: initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: string; accessToken: string }>) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.accessToken = accessToken
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
        }
    }
})

export const selectUsername = createSelector(
    (state: { authSlice: InitialState }) => state.authSlice.user,
    (user) => user
);

export const { setCredentials, logOut } = authSlice.actions
export default authSlice.reducer
