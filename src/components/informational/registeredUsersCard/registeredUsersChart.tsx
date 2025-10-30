import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from 'recharts';
import { Box, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useRegisteredUsersChart } from '@/hooks/useRegisteredUsersChart';
import { ChartType } from '@/types/registeredUsers';
import { useColorModeValue } from '@chakra-ui/react';

const colorMap: Record<string, string> = {
  'ESB.': '#8B6D1B',
  'Sob.': '#9EA7AA',
  'ESB A': '#ED330C',
  'ESB B': '#C62828', // Variante de ESB A
  'Sob. A': '#386CB0',
  'Sob. B': '#5E92C8', // Variante de Sob. A
  'ESB o Sob. B': '#F9A825',
  '6x4': '#2E7D32',
  'MEX': '#D81B60',
  'GDL': '#8E24AA',
  'MTY': '#546E7A',
  'CUN': '#0097A7',
  'TIJ': '#8D6E63',
};



interface RegisteredUsersChartProps {
  selectedType: ChartType;
}

export const RegisteredUsersChart = ({ selectedType }: RegisteredUsersChartProps) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const { data, loading, error } = useRegisteredUsersChart(selectedType);

  if (loading) {
    return (
      <Box 
        px={6} 
        py={4} 
        bg={bg} 
        border="1px solid" 
        borderColor={borderColor}
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="300px"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        px={6} 
        py={4} 
        bg={bg} 
        border="1px solid" 
        borderColor={borderColor}
        height="300px"
      >
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          <Text fontSize="sm">{error}</Text>
        </Alert>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box 
        px={6} 
        py={4} 
        bg={bg} 
        border="1px solid" 
        borderColor={borderColor}
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="gray.500" textAlign="center">
          No hay datos disponibles
        </Text>
      </Box>
    );
  }

  // Obtener las keys dinámicamente (excluyendo 'name')
  const keys = Object.keys(data[0]).filter((k) => k !== 'name');

  return (
    <Box px={6} py={4} bg={bg} border="1px solid" borderColor={borderColor}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={10}>
          <CartesianGrid stroke="#454459" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: '#0D47A1', fontSize: 12, fontWeight: 'regular' }}
            axisLine={{ stroke: '#454459' }}
            tickLine={{ stroke: '#454459' }}
          />
          <YAxis
            domain={[0, 'dataMax']}
            tick={{ fill: '#0D47A1', fontSize: 12, fontWeight: 'regular' }}
            axisLine={{ stroke: '#454459' }}
            tickLine={{ stroke: '#454459' }}
          />
          <Tooltip />
          {keys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={colorMap[key] || '#64748b'}
              name={key}
              radius={index === keys.length - 1 ? [10, 10, 0, 0] : [0, 0, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
