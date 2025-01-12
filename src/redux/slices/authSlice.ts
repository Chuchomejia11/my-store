// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    employeeNumber: string | null;
}

const initialState: AuthState = {
    token: null,
    employeeNumber: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; employeeNumber: string }>) => {
            state.token = action.payload.token;
            state.employeeNumber = action.payload.employeeNumber;
        },
        logout: (state) => {
            state.token = null;
            state.employeeNumber = null;
        }
    }
});

// Exportamos las acciones y el reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
