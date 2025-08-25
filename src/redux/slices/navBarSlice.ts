import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    navbarOpen: true,
};  

const navBarSlice = createSlice({
    name: 'navBar',
    initialState,
    reducers: {
        toggleNavbar: (state) => {
            state.navbarOpen = !state.navbarOpen;
        }
    },
});

export const { toggleNavbar } = navBarSlice.actions;
export default navBarSlice.reducer;
