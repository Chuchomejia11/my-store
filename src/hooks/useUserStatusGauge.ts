import { RootState } from '@/redux/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

interface UserStatusData {
  total: number;
  completed: number;
}

export const useUserStatusGauge = () => {
  const [data, setData] = useState<UserStatusData>({ total: 0, completed: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || '/api/'}users-count/user-status`;
        const url = `${baseUrl}`;
        console.log('Solicitando URL:', url);
        console.log('Token enviado:', token);
        if (!token) {
          throw new Error('No se encontró un token de autenticación');
        }
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Respuesta de error:', { status: response.status, text: errorText });
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        const result = await response.json();
        console.log('Datos recibidos en useUserStatusGauge:', result);
        setData({
          total: result.total || 0,
          completed: result.completed || 0,
        });
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos';
        console.error('Error en useUserStatusGauge:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  return { data, loading, error };
};