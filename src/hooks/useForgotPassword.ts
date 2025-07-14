import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

type UseForgotPasswordReturn = {
  loading: boolean;
  error: string | null;
  sendCode: (email: string) => Promise<boolean>;
  verifyCode: (email: string, code: string) => Promise<boolean>;
  resetPassword: (email: string, password: string, code: string) => Promise<boolean>;
};

export const useForgotPassword = (): UseForgotPasswordReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async (email: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{ message: string }>(
        `${API_URL}auth/forgot-password/request`,
        { email }
      );
      return res.status === 200;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Error de red'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{ message: string }>(
        `${API_URL}auth/forgot-password/verify`,
        { email, code }
      );
      return res.status === 200;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : 'Error de red'
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    email: string,
    password: string,
    code: string
    ): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
        const res = await axios.post<{ message: string }>(
        `${API_URL}auth/forgot-password/reset`,
        {
            email,
            password,
            password_confirmation: password, // <-- clave si usas 'confirmed' en Laravel
            code,
        }
        );
        return res.status === 200;
    } catch (err) {
        const error = err as AxiosError<{ error: string }>;
        setError(
        axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : 'Error de red'
        );
        return false;
    } finally {
        setLoading(false);
    }
    };

  return {
    loading,
    error,
    sendCode,
    verifyCode,
    resetPassword,
  };
};
