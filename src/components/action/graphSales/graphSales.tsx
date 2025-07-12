import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useColorMode, Box, Text, Button, Spinner, Center } from '@chakra-ui/react';
import Link from 'next/link';

// Definir el tipo de los datos para la gráfica
interface SalesData {
    dia: string;
    compras: number;
}

export const GraphSales: React.FC = () => {
    const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const { colorMode } = useColorMode();
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Lunes
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6)); // Domingo
    const formattedStartDate = startOfWeek.toLocaleDateString();
    const formattedEndDate = endOfWeek.toLocaleDateString();

    useEffect(() => {
        const fetchSalesData = async () => {
            try {
                const response = await fetch(`${apiBaseUrl}/api/sales/sales`);
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
    }, [apiBaseUrl]);

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
            _hover={{ transform: 'scale(1.05)', cursor: 'pointer' }}
            transition="transform 0.3s"
        >
            <Text color={colorMode === 'light' ? 'teal.800' : 'teal.400'} fontSize="xl" mb={4} fontWeight="bold">
                Ventas de la semana: {formattedStartDate} - {formattedEndDate}
            </Text>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" stroke={colorMode === 'light' ? '#010101' : '#d1d1d2d2'} />
                    <YAxis label={{ value: 'compras', angle: -90, position: 'insideLeft', fill: colorMode === 'light' ? '#010101' : '#d1d1d2d2' }} stroke={colorMode === 'light' ? '#010101' : '#d1d1d2d2'} />
                    <Tooltip contentStyle={{ backgroundColor: colorMode === 'light' ? '#f0f0f0' : '#333' }} />
                    <Line type="monotone" dataKey="compras" stroke= '#82ca9d' />
                </LineChart>
            </ResponsiveContainer>
            <Link href="/sale-history" passHref>
                <Button mt={4} colorScheme="teal" size="sm" _hover={{ bg: 'teal.700' }} width="full">
                    Ver historial de ventas
                </Button>
            </Link>
        </Box>
    );
};
