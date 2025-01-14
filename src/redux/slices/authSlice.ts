import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    employeeNumber: string | null;
    firstLogin: boolean; // Corregir el nombre del campo
}

const initialState: AuthState = {
    token: null,
    employeeNumber: null,
    firstLogin: true // Corregir el nombre del campo
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{ token: string; employeeNumber: string; firstLogin: boolean }>) => {
            state.employeeNumber = action.payload.employeeNumber;
            state.token = action.payload.token;
            state.firstLogin = action.payload.firstLogin; // Corregir el nombre del campo
        },
        logout: (state) => {
            state.token = null;
            state.employeeNumber = null;
            state.firstLogin = true; // Corregir el nombre del campo
        }
    }
});

// Exportamos las acciones y el reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
