import { Box, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useFilteredBarChart } from '@/hooks/useFilteredBarChart';
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  Cell,
} from 'recharts';

export const FilteredBarChart: React.FC = () => {
  const { chartData, loading, error } = useFilteredBarChart();

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

  if (chartData.length === 0) {
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