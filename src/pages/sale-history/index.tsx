import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';
import { DashboardHeader } from '@/components/structure/dashboardHeader/DashboardHeader';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import { login } from '@/redux/slices/authSlice';
import NavBarDesktop from '@/components/action/navBarDesktop/navBarDesktop';
import { Box, Grid, GridItem, Text, useColorMode } from '@chakra-ui/react';
import { Venta } from '@/types/types';
import { GraphSalesWithPeriod } from '@/components/action/graphSales/graphSalesWithPeriod';

export default function Home() {
    const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const router = useRouter();
    const { colorMode } = useColorMode();
    const dispatch = useDispatch();
    const userAuth = useSelector((state: RootState) => state.auth);
    const [ventas, setVentas] = useState<Venta[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Control de si hay más páginas
    const [currentPage, setCurrentPage] = useState(1);

    // Función para cargar las ventas de la API
    const fetchVentas = useCallback(async () => {
        if (loading || !hasMore) return; // No hacer la consulta si ya estamos cargando o si no hay más datos

        setLoading(true); // Cambiar estado a 'loading' cuando iniciamos la solicitud

        try {
            const response = await fetch(`${apiBaseUrl}/api/sales/all_sales?page=${currentPage}`);
            const data = await response.json();

            // Verificar si la respuesta es un array o contiene un objeto con ventas
            if (Array.isArray(data.ventas)) {
                // Filtramos para evitar duplicados
                // setVentas((prevVentas) => {
                //     const newVentas = data.filter((venta: Venta) => !prevVentas.some((v: Venta) => v.id === venta.id));
                //     return [...prevVentas, ...newVentas];
                // });

                setVentas((prevVentas) => {
                    const newVentas = data.ventas.filter(
                        (venta: Venta) => !prevVentas.some((v: Venta) => v.id === venta.id)
                    );
                    return [...prevVentas, ...newVentas];
                });
                if (data.length === 0) {
                    setHasMore(false); // Si no hay más datos, dejamos de cargar
                }
            } else if (data?.sales) {
                const ventasFromAPI = data.sales; // Si la respuesta tiene un objeto con 'sales'
                setVentas((prevVentas) => {
                    const newVentas = ventasFromAPI.filter(
                        (venta: Venta) => !prevVentas.some((v: Venta) => v.id === venta.id)
                    );
                    return [...prevVentas, ...newVentas];
                });

                if (ventasFromAPI.length === 0) {
                    setHasMore(false); // Si no hay más datos, dejamos de cargar
                }
            } else {
                console.error('La respuesta de la API no tiene el formato esperado:', data);
            }
        } catch (error) {
            console.error('Error al cargar las ventas:', error);
        } finally {
            setLoading(false); // Cambiar el estado de 'loading' a false una vez que se termina la consulta
        }
    }, [loading, hasMore, currentPage, apiBaseUrl]);

    // Ejecutar la solicitud cuando cambie la página
    useEffect(() => {
        fetchVentas(); // Solo se llama cuando currentPage cambia
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

    return (
        <div>
            <DashboardHeader />
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            <NavBarDesktop />
            <Box p={4} marginLeft={{ base: '0px', sm: '0px', md: '250px', lg: '250px', xl: '250px' }}>
                <Grid templateColumns={{ base: 'repeat(24, 1fr)', lg: 'repeat(12, 1fr)' }} gap={4}>
                    <GridItem colSpan={{ base: 24, lg: 12 }} p={4}>
                        <Box
                            ref={boxRef}
                            overflowY="auto"
                            overflowX="hidden"
                            h="75vh"
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
                            <Box w='75%' mx='auto'>
                            <GraphSalesWithPeriod />
                            </Box>
                            {ventas.length > 0
                                ? ventas.map((venta) => (
                                      <Box key={venta.id} borderWidth={1} borderRadius="md" p={4} my={2}>
                                          <h2>Ventas</h2>
                                          <ul>
                                              {ventas.map((venta) => (
                                                  <li key={venta.id}>
                                                      <p>{venta.id}</p>
                                                      <p>{venta.fecha}</p>
                                                  </li>
                                              ))}
                                          </ul>
                                      </Box>
                                  ))
                                : null}
                            {ventas.length === 0 && (
                                <Text textAlign="center" color={colorMode === 'light' ? 'gray.500' : 'gray.400'}>
                                    No hay ventas.
                                </Text>
                            )}
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </div>
    );
}
