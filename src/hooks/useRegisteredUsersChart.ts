// hooks/useRegisteredUsersChart.ts
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
    ChartData,
    ChartType,
    ApiResponse,
    UseRegisteredUsersChartReturn,
} from '@/types/registeredUsers';

export const useRegisteredUsersChart = (
    selectedType: ChartType
): UseRegisteredUsersChartReturn => {
    // Estado
    const [data, setData] = useState<ChartData[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // 🔥 TU AUTHSTATE + FECHA
    const { token } = useSelector((state: RootState) => state.auth); // ← EXACTO
    const fecha = useSelector((state: RootState) => state.dateHome.fecha);

    // Función para calcular start/end de la semana
    const getWeekRange = (dateString: string): { start: string; end: string } => {
      const date = new Date(dateString);
      const startDate = new Date(date);
      const day = date.getDay();
      
      startDate.setDate(startDate.getDate() - ((day === 0 ? 6 : day - 1)));
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const formatDate = (date: Date): string => 
          date.toISOString().split('T')[0];

      return {
          start: formatDate(startDate),
          end: formatDate(endDate),
      };
    };

    // Fetch con tu TOKEN
    const fetchData = useCallback(async () => {
      if (!fecha) {
          setError('No hay fecha seleccionada');
          setLoading(false);
          return;
      }

      // 🔐 VERIFICAR TOKEN
      if (!token) {
          setError('No estás autenticado. Por favor, inicia sesión.');
          setLoading(false);
          return;
      }

      setLoading(true);
      setError(null);

      try {
          const { start, end } = getWeekRange(fecha);
          const params = new URLSearchParams({ start, end });
          const url = `${process.env.NEXT_PUBLIC_API_URL || 'api/'}users-count/registered-users?${params.toString()}`;

          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);

          console.log('🔐 Enviando token:', token ? 'SÍ' : 'NO'); // Debug temporal
          console.log('🌐 URL:', url); // Debug temporal

          const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // ← TU TOKEN
            },
            credentials: 'include', // Para cookies también
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            if (response.status === 401) {
                setError('Sesión expirada. Redirigiendo al login...');
                // Opcional: dispatch(logout()) aquí
                throw new Error('No autorizado');
            }
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const responseData: ApiResponse = await response.json();
          if (!responseData[selectedType]) {
            throw new Error(`Tipo de datos "${selectedType}" no encontrado`);
          }

          setData(responseData[selectedType]);
      } catch (err) {
          let errorMessage = 'Error al cargar los datos';
          if (err instanceof Error) {
            if (err.name === 'AbortError') {
                errorMessage = 'Tiempo de espera agotado';
            } else {
                errorMessage = err.message;
            }
          }
          console.error('Error fetching registered users:', err);
          setError(errorMessage);
          setData(null);
      } finally {
          setLoading(false);
      }
    }, [fecha, selectedType, token]); // ← token en dependencias

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
      return fetchData();
    }, [fetchData]);

    return {
      data,
      loading,
      error,
      refetch,
    };
};