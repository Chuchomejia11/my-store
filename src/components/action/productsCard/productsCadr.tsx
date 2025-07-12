import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Center,
    Divider,
    Spinner,
    Text,
    useColorMode,
} from '@chakra-ui/react';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    estatus?: string;
}

export const ProductsCard: React.FC = () => {
    const { colorMode } = useColorMode();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Datos de prueba hardcodeados
            const mockProducts: Product[] = [
            { id: 1, name: "Producto A", estatus: "Disponible" },
            { id: 2, name: "Producto B", estatus: "Agotado" },
            { id: 3, name: "Producto C" },
            ];
            // Simular retardo de red
            await new Promise((resolve) => setTimeout(resolve, 500));
            setProducts(mockProducts);
        } catch (err) {
            setError("Error loading products");
            console.error('Error loading products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading && products.length === 0) {
        return (
            <Box
                bg={colorMode === 'light' ? 'gray.100' : 'teal.800'}
                p={4}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="350px"
            >
                <Center>
                    <Spinner size="xl" color={colorMode === 'light' ? 'teal.800' : 'white'} />
                </Center>
            </Box>
        );
    }

    if (error && products.length === 0) {
        return (
            <Box
                bg={colorMode === 'light' ? 'gray.100' : 'teal.800'}
                p={4}
                borderRadius="md"
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="350px"
            >
                <Text color={colorMode === 'light' ? 'teal.800' : 'teal.400'} fontSize="lg">
                    Error: {error}
                </Text>
            </Box>
        );
    }

    return (
        <Box
            width="100%"
            height="350px"
            overflowY="auto"
            bg={colorMode === 'light' ? 'white' : 'gray.700'}
            borderRadius="md"
            p={4}
            boxShadow="md"
            sx={{
                // Personalizar el estilo del scroll
                scrollbarWidth: 'thin', // Ancho del scroll (puede ser "thin", "auto" o "none")
                scrollbarColor: '#888 transparent', // Color del scroll (primero es el scroll y luego el fondo)
                '&::-webkit-scrollbar': {
                    width: '5px', // Ancho del scroll para navegadores webkit (Chrome, Safari)
                    opacity: '1', // Mostrar el scroll solo si el usuario está interactuando
                    transition: 'opacity 0.2s ease-in-out' // Añadir una transición suave para mostrar/ocultar el scroll
                },
                '&::-webkit-scrollbar-thumb': {
                    borderRadius: '5px', // Bordes redondeados del scroll para navegadores webkit
                    background: '#888' // Color del scroll para navegadores webkit
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    background: '#555' // Color del scroll al pasar el mouse para navegadores webkit
                },
                '&::-webkit-scrollbar-thumb:active': {
                    background: '#333' // Color del scroll al hacer clic para navegadores webkit
                }
            }}
        >
            <Text color={colorMode === 'light' ? 'teal.800' : 'teal.400'} fontSize="xl" mb={4} fontWeight="bold">
                            Inventario de productos:
                        </Text>
            {products.map((product, index) => (
                <React.Fragment key={product.id}>
                    <Box py={2}>
                        <Text fontWeight="bold">{product.name}</Text>
                        <Text color="gray.500">
                            {product.estatus || 'Disponible'}
                        </Text>
                    </Box>
                    {index < products.length - 1 && <Divider />}
                </React.Fragment>
            ))}
            <Center mt={4}>
            <Link href="/wh-products" passHref>
                <Button
                    colorScheme="teal"
                >
                    Ver más
                </Button>
            </Link>
            </Center>
        </Box>
    );
};
