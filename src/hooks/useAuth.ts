import { useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
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


const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

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
    console.log('API_URL:', API_URL);
    const loginRes = await axios.post(`${API_URL}auth/login`, credentials);
    const token = loginRes.data.token;
    const userData = loginRes.data.user;

    dispatch(login({
      token: token,
      employeeNumber: "1",
      firstLogin: true,
    }));

    setAuthState({
      user: userData,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });

    localStorage.setItem('authToken', token);
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message || 'Error al iniciar sesión.';
    setAuthState(prev => ({
      ...prev,
      isLoading: false,
      error: message,
    }));
  }
}, [dispatch]);

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
