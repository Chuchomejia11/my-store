import { useState, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

interface ChartData {
  name: string;
  value: number;
  fill: string;
}

export const useFilteredBarChart = () => {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useSelector((state: RootState) => state.auth);
    const { activeFilters } = useSelector((state: RootState) => state.search);

const colorMap: Record<string, string> = useMemo(() => ({
    "ESB.": "#8B6D1B",
    "Sob.": "#9EA7AA",
    "ESB. A": "#ED330C",
    "Sob. A": "#386CB0",
    "ESB o Sob. B": "#F9A825",
    "6x4": "#2E7D32",
    MEX: "#D81B60",
    GDL: "#8E24AA",
    MTY: "#546E7A",
    CUN: "#0097A7",
    TIJ: "#8D6E63",
}), []);

const ordenDeseado = useMemo(() => [
    "ESB", "Sob.",
    "ESB A", "Sob. A", "ESB o Sob. B", "6x4",
    "MEX", "GDL", "MTY", "CUN", "TIJ"
], []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL || '/api/'}users-count/users-list`;
        const params = new URLSearchParams();
        activeFilters.forEach((filter) => params.append('filters[]', filter));
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
        const result = await response.json();
        console.log('Datos recibidos en useFilteredBarChart:', result);
        const counts = result.counts || {};
        const data = Object.keys(counts)
          .map((key) => ({
            name: key,
            value: counts[key] || 0,
            fill: colorMap[key] || "#ccc",
          }))
          .sort((a, b) => ordenDeseado.indexOf(a.name) - ordenDeseado.indexOf(b.name));
        setChartData(data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar los datos';
        console.error('Error en useFilteredBarChart:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, activeFilters, colorMap, ordenDeseado]);

  return { chartData, loading, error };
};