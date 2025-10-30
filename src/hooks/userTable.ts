import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface User {
  id: number;
  no_sindical: string;
  no_escalafon: string;
  nombre: string;
  correo: string;
  nombre_rol: string;
  categoria: string;
  apartado: string;
  base_o_dvt: string;
}

interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
}

interface ApiResponse {
  data: User[];
  pagination: Pagination;
  counts: Record<string, number>;
}

export const useUsersTable = (page: number = 1, perPage: number = 100) => {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
  const { value: searchField, selectedField } = useSelector((state: RootState) => state.search);
  const { orderBy, activeFilters } = useSelector((state: RootState) => state.search);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || '/api/'}users-count/users-list`;
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('per_page', perPage.toString());
        if (searchField && selectedField) {
          params.append('search', searchField);
          params.append('field', selectedField);
        }
        activeFilters.forEach((filter) => params.append('filters[]', filter));
        if (orderBy) {
          params.append('order_by', orderBy.field);
          params.append('order_direction', orderBy.direction);
        }
        const url = `${baseUrl}${params.toString() ? '?' + params.toString() : ''}`;
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
        const result: ApiResponse = await response.json();
        console.log('Datos recibidos en useUsersTable:', result);
        setUsers(result.data);
        setPagination(result.pagination);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos';
        console.error('Error en useUsersTable:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, searchField, selectedField, orderBy, activeFilters, page, perPage]);

  return { users, pagination, loading, error };
};