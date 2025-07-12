import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useColorMode, Box, Text, Select, Spinner, Center } from '@chakra-ui/react';

// Definir el tipo de los datos para la gráfica
interface SalesData {
    periodo: string;
    compras: number;
}

export const GraphSalesWithPeriod: React.FC = () => {
    const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const { colorMode } = useColorMode();
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [period, setPeriod] = useState<string>('semana');

    useEffect(() => {
        const fetchSalesData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiBaseUrl}/api/sales/sales_period?period=${period}`);
                if (!response.ok) {
                    throw new Error('Error al obtener los datos.');
                }
                const data = await response.json();
                setSalesData(data);
            } catch (error: unknown) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchSalesData();
    }, [period, apiBaseUrl]);

    if (loading) {
        return (
            <Box
                bg={colorMode === 'light' ? 'gray.100' : 'teal.800'}
                p={4}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="300px"
            >
                <Center>
                    <Spinner size="xl" color={colorMode === 'light' ? 'teal.800' : 'white'} />
                </Center>
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                bg={colorMode === 'light' ? 'gray.100' : 'teal.800'}
                p={4}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="300px"
            >
                <Text color={colorMode === 'light' ? 'teal.800' : 'teal.400'} fontSize="lg">
                    Error: {error}
                </Text>
            </Box>
        );
    }

    return (
        <Box
            bg={colorMode === 'light' ? 'gray.100' : 'teal.800'}
            p={4}
            borderRadius="md"
            boxShadow="lg"
        >
            <Text color={colorMode === 'light' ? 'teal.800' : 'teal.400'} fontSize="xl" mb={4} fontWeight="bold">
                Ventas por periodo: {period}
            </Text>
            <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                bg={colorMode === 'light' ? 'white' : 'teal.600'}
                color={colorMode === 'light' ? 'black' : 'white'}
                mb={4}
            >
                <option value="semana">Semana</option>
                <option value="mes">Mes</option>
                <option value="trimestre">Trimestre</option>
                <option value="año">Año</option>
            </Select>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="periodo" stroke={colorMode === 'light' ? '#010101' : '#d1d1d2d2'} />
                    <YAxis label={{ value: 'Compras', angle: -90, position: 'insideLeft', fill: colorMode === 'light' ? '#010101' : '#d1d1d2d2' }} stroke={colorMode === 'light' ? '#010101' : '#d1d1d2d2'} />
                    <Tooltip contentStyle={{ backgroundColor: colorMode === 'light' ? '#f0f0f0' : '#333' }} />
                    <Line type="monotone" dataKey="compras" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};
