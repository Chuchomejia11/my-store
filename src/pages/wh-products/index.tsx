import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import { DashboardHeader } from '@/components/structure/dashboardHeader/DashboardHeader';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import { login } from '@/redux/slices/authSlice';
import NavBarDesktop from '@/components/action/navBarDesktop/navBarDesktop';
import { Box, Divider, Grid, GridItem, Text, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';
import { Producto } from '@/types/types';
import { ProductCreateForm } from '@/components/action/productCreateForm/productCreateForm';
import { ProductUpdateForm } from '@/components/action/productUpdateForm/productUpdateForm';

export default function ProductsPage() {
    const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const isMobile = useBreakpointValue({ base: true, md: false });
    const router = useRouter();
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const userAuth = useSelector((state: RootState) => state.auth);
    const [productos, setProductos] = useState<Producto[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchProducts = useCallback(async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/api/products/products?page=${currentPage}&limit=10`);
            const data = await response.json();

            if (Array.isArray(data.productos)) {
                setProductos((prevProductos) => {
                    const newProductos = data.productos.filter(
                        (producto: Producto) => !prevProductos.some((p: Producto) => p.id === producto.id)
                    );
                    return [...prevProductos, ...newProductos];
                });

                if (data.productos.length === 0) {
                    setHasMore(false); // Si no hay más datos, dejamos de cargar
                }
            } else {
                console.error('La respuesta de la API no tiene el formato esperado:', data);
            }
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        } finally {
            setLoading(false); // Cambiar el estado de 'loading' a false una vez que se termina la consulta
        }
    }, [loading, hasMore, currentPage, apiBaseUrl]);

    useEffect(() => {
        if (!userAuth.token) {
            router.push('/login');
        } else {
            if (userAuth.firstLogin) {
                setTimeout(() => {
                    if (userAuth.employeeNumber) {
                        dispatch(
                            login({
                                token: userAuth.token ?? '',
                                employeeNumber: userAuth.employeeNumber,
                                firstLogin: false
                            })
                        );
                    }
                }, 5000);
            }
        }
    }, [dispatch, router, userAuth]);

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    // Hook para detectar cuando el usuario hace scroll cerca del final
    const handleScroll = () => {
        const box = boxRef.current;
        if (box && box.scrollHeight - box.scrollTop <= box.clientHeight + 100) {
            // Si no estamos esperando la respuesta de la API y hay más páginas, avanzamos a la siguiente página
            if (!loading && hasMore) {
                setCurrentPage((prevPage) => prevPage + 1);
            }
        }
    };

    const boxRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        const box = boxRef.current;
        if (box) {
            box.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (box) {
                box.removeEventListener('scroll', handleScroll);
            }
        };
    }, [loading, hasMore]);

    

    return (
        <div role="main">
            <DashboardHeader />
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
            <Box p={4} marginLeft={{ base: '0px', sm: '0px', md: '250px', lg: '250px', xl: '250px' }}>
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                    <GridItem colSpan={12} p={4}>
                        <Box
                            ref={boxRef}
                            overflowY="auto"
                            overflowX="hidden"
                            h="75vh"
                            sx={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: '#888 transparent',
                                '&::-webkit-scrollbar': {
                                    width: '5px',
                                    opacity: '1',
                                    transition: 'opacity 0.2s ease-in-out'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    borderRadius: '5px',
                                    background: '#888'
                                },
                                '&::-webkit-scrollbar-thumb:hover': {
                                    background: '#555'
                                },
                                '&::-webkit-scrollbar-thumb:active': {
                                    background: '#333'
                                }
                            }}
                        >
                            <ProductCreateForm />
                            <Divider my={4} />
                            <Box w={{ base: '100%', lg: '75%' }} mx="auto">
                                {productos.length > 0
                                    ? productos.map((producto) => (
                                        <Box key={producto.id} borderBottomWidth={1} borderRadius="md" p={4} my={2}>
                                            <ProductUpdateForm productId={producto.id} initialData={producto} />  
                                        </Box>
                                    ))
                                    : null}
                            </Box>
                            {productos.length === 0 && (
                                <Text textAlign="center" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
                                    No hay productos disponibles.
                                </Text>
                            )}
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}
