import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Box, Text, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  Cell,
} from "recharts";

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

const colorMap: Record<string, string> = {
  ESB: "#ED330C",
  "Sob.": "#01346B",
  "ESB A": "#ED330C",
  "Sob. A": "#386CB0",
  "ESB o Sob. B": "#F9A825",
  "6x4": "#2E7D32",
  MEX: "#D81B60",
  GDL: "#8E24AA",
  MTY: "#546E7A",
  CUN: "#0097A7",
  TIJ: "#8D6E63",
};

// Datos de prueba
const fallbackUsers: User[] = [
  { id: 1, no_sindical: "002", no_escalafon: "B456", nombre: "Luis Gómez", correo: "luis@example.com", nombre_rol: "Técnico", categoria: "Sob.", apartado: "Sob. A", base_o_dvt: "MEX" },
  { id: 2, no_sindical: "003", no_escalafon: "C789", nombre: "Ana Martínez", correo: "ana@example.com", nombre_rol: "Supervisor", categoria: "ESB", apartado: "ESB A", base_o_dvt: "GDL" },
  { id: 3, no_sindical: "004", no_escalafon: "D123", nombre: "Carlos Rivera", correo: "carlos@example.com", nombre_rol: "Analista", categoria: "Sob.", apartado: "Sob. B", base_o_dvt: "MTY" },
  { id: 4, no_sindical: "005", no_escalafon: "E234", nombre: "Sofía Hernández", correo: "sofia@example.com", nombre_rol: "Ingeniero", categoria: "ESB", apartado: "ESB A", base_o_dvt: "MEX" },
];

// Orden predefinido
const ordenDeseado = [
  "ESB", "Sob.",
  "ESB A", "Sob. A", "ESB o Sob. B", "6x4",
  "MEX", "GDL", "MTY", "CUN", "TIJ"
];

export const FilteredBarChart: React.FC = () => {
  const activeFilters = useSelector((state: RootState) => state.search.activeFilters);

  const [users, setUsers] = useState<User[]>(fallbackUsers);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Simulación de llamada a API

  // Simulación de llamada a API
  useEffect(() => {
  setLoading(true);
  setError(null);

  // Simula un retraso de carga pero usa datos locales
  setTimeout(() => {
    try {
      // 🚀 Datos de prueba (simulando que vienen de la API)
      setUsers(fallbackUsers);
    } catch {
      setError("Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  }, 1500);
}, []);


  const chartData = useMemo(() => {
    const counts: Record<string, number> = {};

    // Inicializar todos los filtros activos con 0
    activeFilters.forEach((filter) => {
      counts[filter] = 0;
    });

    // Contar coincidencias
    users.forEach((user) => {
      activeFilters.forEach((filter) => {
        if (
          user.categoria === filter ||
          user.apartado === filter ||
          user.base_o_dvt === filter
        ) {
          counts[filter] = (counts[filter] || 0) + 1;
        }
      });
    });

    // Convertir a arreglo y ordenar según ordenDeseado
    return Object.keys(counts)
      .map((key) => ({
        name: key,
        value: counts[key],
        fill: colorMap[key] || "#ccc",
      }))
      .sort((a, b) => ordenDeseado.indexOf(a.name) - ordenDeseado.indexOf(b.name));
  }, [users, activeFilters]);

  if (loading) {
    return (
      <Box p={4} display="flex" alignItems="center">
        <Spinner size="lg" mr={3} />
        <Text>Cargando datos...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (activeFilters.length === 0) {
    return (
      <Box p={4}>
        <Text color="gray.500">No hay filtros activos para mostrar la gráfica.</Text>
      </Box>
    );
  }

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md" height="400px">
      <Text mb={4} fontSize="lg" fontWeight="bold">
        Usuarios por filtro activo
      </Text>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} width={600}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="value" width={56}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
