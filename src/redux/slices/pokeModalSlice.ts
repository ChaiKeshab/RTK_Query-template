import { PayloadAction, createSlice } from '@reduxjs/toolkit';

/**
 * COMPLETELY UNRELATED TO RTK QUERY OR FETCHING API. JUST BASIC REDUX TOOLKIT USE
 */
const initialState = {
    isModalOpen: false,
    isTeamPanelOpen: false,
    isPokeListPanelOpen: false,
};

const pokeModalSlice = createSlice({
    name: 'pokeModal',
    initialState,
    reducers: {
        toggleModal: (state, actions: PayloadAction<boolean>) => {
            state.isModalOpen = actions.payload;
        },
        toggleTeamPanel: (state, actions: PayloadAction<boolean>) => {
            state.isTeamPanelOpen = actions.payload;
        },
        togglePokeListPanel: (state, actions: PayloadAction<boolean>) => {
            state.isPokeListPanelOpen = actions.payload;
        },
    },
});

export const {
    toggleModal,
    toggleTeamPanel,
    togglePokeListPanel,
} = pokeModalSlice.actions;

export default pokeModalSlice.reducer