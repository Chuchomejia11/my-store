import { useState, useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/slices/authSlice';
export interface User {
  id: string;
  email: string;
  username?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const API_URL = 'http://localhost:8000/api/v1/'; // Cambia si es necesario

export const useAuth = () => {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  });

  const loginApi = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
    }));

    try {
      // 1. Hacer login
      const loginRes = await axios.post(`${API_URL}auth/login`, credentials);
      const token = loginRes.data.token;
      // 2. Obtener datos del usuario
      // Usar los datos del usuario de la respuesta de login
      const userData = loginRes.data.user;
      dispatch(login({
              token: token,
              employeeNumber: "1",
              firstLogin: true,
            }));
      // 3. Guardar en estado
      setAuthState({
        user: userData,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // 4. Guardar token en localStorage
      localStorage.setItem('authToken', token);
    } catch (error: any) {
      const message = error.response?.data?.message || 'Error al iniciar sesión.';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: message,
      }));
    }
  }, []);

  const logout = useCallback((): void => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    localStorage.removeItem('authToken');
  }, []);

  const clearError = useCallback((): void => {
    setAuthState(prev => ({
      ...prev,
      error: null,
    }));
  }, []);

  return {
    ...authState,
    loginApi,
    logout,
    clearError,
  };
};
