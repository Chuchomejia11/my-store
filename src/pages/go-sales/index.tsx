import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/structure/dashboardHeader/DashboardHeader';
import { LoadingCurtaing } from '@/components/informational/loadingCurtain/loadingCurtain';
import { login } from '@/redux/slices/authSlice';
import NavBarDesktop from '@/components/action/navBarDesktop/navBarDesktop';
import {
    Box,
    Grid,
    GridItem,
    useBreakpointValue,
    Select,
    Button,
    Input,
    Text,
    Flex,
    useColorMode,
    Divider,
    Checkbox,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import NavBarMobile from '@/components/navBarMobile/navBarMobile';
import { Producto } from '@/types/types';

export default function Home() {
    const router = useRouter();
    const { colorMode } = useColorMode();
    const toast = useToast();
    const dispatch = useDispatch();
    const userAuth = useSelector((state: RootState) => state.auth);
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [discount, setDiscount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(1); // 1 para Efectivo, 2 para Tarjeta
    const [amountPaid, setAmountPaid] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [products, setProducts] = useState([] as Producto[]); // Arreglo de productos.
    const [selectedProducts, setSelectedProducts] = useState<{ productoId: string; cantidad: number }[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isLoadingSale, setIsLoadingSale] = useState(false);

    useEffect(() => {
        if (!userAuth.token) {
            router.push('/login');
        } else if (userAuth.firstLogin && userAuth.employeeNumber) {
            setTimeout(() => {
                dispatch(
                    login({
                        token: userAuth.token ?? '',
                        employeeNumber: userAuth.employeeNumber ?? '',
                        firstLogin: false
                    })
                );
            }, 5000);
        }
    }, [userAuth.token, userAuth.firstLogin, userAuth.employeeNumber, dispatch, router]);

    const fetchProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const response = await fetch(`${apiBaseUrl}/api/products/products_for_sale`);
            if (!response.ok) throw new Error('Error al cargar los productos.');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError((err as Error).message || 'Error inesperado.');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = selectedProducts.reduce((acc, item) => {
                const product = products.find((product) => product.id === Number(item.productoId));
                if (product) {
                    return acc + product.precioTienda * item.cantidad;
                }
                return acc;
            }, 0);
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [selectedProducts, products]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = selectedProducts.reduce((acc, item) => {
                const product = products.find((product) => product.id === Number(item.productoId));
                if (product) {
                    return acc + product.precioTienda * item.cantidad;
                }
                return acc;
            }, 0);

            const discountedPrice = total * (1 - discount / 100);
            setTotalPrice(discountedPrice);
        };

        calculateTotalPrice();
    }, [selectedProducts, products, discount]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const total = selectedProducts.reduce((acc, item) => {
                const product = products.find((product) => product.id === Number(item.productoId));
                if (product) {
                    return acc + product.precioTienda * item.cantidad;
                }
                return acc;
            }, 0);

            const discountedPrice = total * (1 - discount / 100);
            setTotalPrice(discountedPrice);
        };

        calculateTotalPrice();
    }, [selectedProducts, products, discount]);

    const handleAddProduct = (productoId: string) => {
        if (!selectedProducts.find((item) => item.productoId === productoId)) {
            setSelectedProducts([...selectedProducts, { productoId, cantidad: 1 }]);
        }
    };

    const handleUpdatecantidad = (productoId: string, cantidad: number) => {
        if (cantidad > 0) {
            setSelectedProducts((prev) =>
                prev.map((item) => (item.productoId === productoId ? { ...item, cantidad } : item))
            );
        }
    };

    const handleRemoveProduct = (productoId: string) => {
        setSelectedProducts((prev) => prev.filter((item) => item.productoId !== productoId));
    };

    const handleSubmit = async () => {
        setIsLoadingSale(true);
        if (selectedProducts.length === 0) {
            setError('Debes seleccionar al menos un producto.');
            setIsLoadingSale(false);
            return;
        }
        if (paymentMethod === 1 && amountPaid < totalPrice) {
            toast({
                title: 'Error',
                description: 'El monto pagado no puede ser menor al total a pagar.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });

            setIsLoadingSale(false);
            return;
        }
        try {
            const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const response = await fetch(`${apiBaseUrl}/api/sales/create_sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userAuth.token}` // Usando el token de autorización si es necesario
                },
                body: JSON.stringify({
                    employeeNumber: userAuth.employeeNumber,
                    ventas: selectedProducts,
                    pago: paymentMethod === 1 ? amountPaid : totalPrice,
                    cambio: paymentMethod === 1 ? Math.max(amountPaid - totalPrice, 0) : 0,
                    tipoPagoId: paymentMethod,
                    descuento: discount
                })
            });

            if (!response.ok) {
                toast({
                    title: 'Error',
                    description: 'Hubo un problema al procesar la venta. Intenta de nuevo.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
                setIsLoadingSale(false);
                return;
            }
            if (response.ok) {
                onOpen(); 
                setTimeout(() => {
                    router.reload();
                }, 2000);
            }

            setSelectedProducts([]);
            setDiscount(0);
            setAmountPaid(0);
        } catch (err) {
            setError((err as Error).message || 'Error inesperado.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div role="main">
            <DashboardHeader />
            {userAuth.firstLogin && <LoadingCurtaing cargado={true} />}
            {isMobile ? <NavBarMobile /> : <NavBarDesktop />}
            <Box
                p={4}
                marginLeft={{ base: '0px', sm: '0px', md: '250px', lg: '250px', xl: '250px' }}
                marginBottom={{ base: 10, sm: 10, md: 0, lg: 0, xl: 0 }}
                h={'75vh'}
                mb={10}
                overflowY={'auto'}
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
                <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                    {/* //Body */}
                    <GridItem colSpan={12}>
                        <Text fontSize="xl" mb={4}>
                            Formulario de Ventas
                        </Text>

                        {loading && <Text>Cargando productos...</Text>}
                        {error && (
                            <Flex direction="column" align="center">
                                <Text color="red.500">{error}</Text>
                                <Button mt={2} colorScheme="teal" onClick={fetchProducts}>
                                    Reintentar
                                </Button>
                            </Flex>
                        )}

                        {!loading && !error && (
                            <Flex
                                justify="center"
                                direction={{ base: 'column', md: 'row' }}
                                justifyContent={{ base: 'center', md: 'space-between' }}
                            >
                                <Box w={{ base: '100%', md: '30%' }} mb={{ base: 4, md: 0 }} top={0}>
                                    <Text fontSize="xl" mb={4} fontWeight="bold">
                                        Agregar productos
                                    </Text>
                                    <Select
                                        placeholder="Selecciona un producto"
                                        onChange={(e) => handleAddProduct(e.target.value)}
                                        mb={4}
                                    >
                                        {products.map((product) => (
                                            <option
                                                key={product.id}
                                                value={product.id}
                                                disabled={selectedProducts.some(
                                                    (item) => item.productoId === product.id.toString()
                                                )}
                                            >
                                                {product.name} - ${product.precioTienda}
                                            </option>
                                        ))}
                                    </Select>
                                </Box>
                                <Box
                                    w={{ base: '100%', md: '60%' }}
                                    backgroundColor={colorMode === 'dark' ? 'gray.600' : 'gray.100'}
                                    p={4}
                                    borderRadius="md"
                                    boxShadow="lg"
                                    maxH={'350px'}
                                    overflowY={'auto'}
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
                                    <Text fontSize="xl" mb={4} fontWeight="bold">
                                        Productos seleccionados
                                    </Text>
                                    {selectedProducts.map((item) => {
                                        const product = products.find(
                                            (product) => product.id === Number(item.productoId)
                                        );
                                        return (
                                            <Flex w={'100%'} direction="column" key={item.productoId}>
                                                <Text fontSize="md" fontWeight="semibold" mb={1}>
                                                    {`Nombre de producto: ${product?.name}`}
                                                </Text>
                                                <Flex align="center" justify="space-between" flexDirection={'row'}>
                                                    <Text fontSize="lg">Cantidad:</Text>
                                                    <Input
                                                        type="number"
                                                        value={item.cantidad}
                                                        min={1}
                                                        onChange={(e) =>
                                                            handleUpdatecantidad(
                                                                item.productoId,
                                                                Number(e.target.value)
                                                            )
                                                        }
                                                        w={'25%'}
                                                    />
                                                    <Text fontSize="lg">
                                                        Precio por unidad: ${product?.precioTienda}
                                                    </Text>
                                                    <Button
                                                        colorScheme="red"
                                                        onClick={() => handleRemoveProduct(item.productoId)}
                                                    >
                                                        Quitar
                                                    </Button>
                                                </Flex>
                                                <Divider my={4} />
                                            </Flex>
                                        );
                                    })}
                                </Box>
                            </Flex>
                        )}
                    </GridItem>
                    <GridItem colSpan={12}>
                        <Flex justify="space-between" flexDirection={{ base: 'column', md: 'row' }}>
                            <Box w={{ base: '100%', md: '30%' }} mb={{ base: 4, md: 0 }} top={0} alignSelf="flex-start">
                                <Box bottom={0}>
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        Descuento (%):
                                    </Text>

                                    {/* Input de descuento */}
                                    <Input
                                        type="number"
                                        value={discount}
                                        onChange={(e) =>
                                            setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))
                                        }
                                        placeholder="0"
                                        min={0}
                                        max={100}
                                        textAlign="center"
                                    />
                                </Box>
                            </Box>
                            <Box
                                mt={4}
                                p={4}
                                border="1px solid"
                                borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                                borderRadius="md"
                                backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                                w={{ base: '100%', md: '25%' }}
                                alignSelf="flex-end"
                            >
                                {/* Total a pagar */}
                                <Box>
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        Total a pagar:
                                    </Text>
                                    <Text fontSize="2xl" color="green.500">
                                        ${totalPrice.toFixed(2)}
                                    </Text>
                                </Box>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={12}>
                        <Flex justify="space-between" flexDirection="row" align={'center'}>
                            <Box mt={4} w={{ base: '100%', md: '25%' }}>
                                <Text fontSize="lg" fontWeight="bold" mb={2}>
                                    Método de pago:
                                </Text>
                                <Checkbox
                                    isChecked={paymentMethod === 1} // 1 es para Efectivo
                                    onChange={() => setPaymentMethod(paymentMethod === 1 ? 0 : 1)} // Cambiar entre 1 y 0
                                    margin={2}
                                >
                                    Efectivo
                                </Checkbox>
                                <Checkbox
                                    isChecked={paymentMethod === 2} // 2 es para Tarjeta
                                    onChange={() => setPaymentMethod(paymentMethod === 2 ? 0 : 2)} // Cambiar entre 2 y 0
                                    margin={2}
                                >
                                    Tarjeta
                                </Checkbox>
                            </Box>

                            {paymentMethod === 1 && ( // Efectivo
                                <Box
                                    mt={4}
                                    p={4}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                                    borderRadius="md"
                                    backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                                    w={{ base: '100%', md: '25%' }}
                                    alignSelf="flex-end"
                                >
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        Pago de cliente:
                                    </Text>
                                    <Input
                                        type="number"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(Number(e.target.value))}
                                        placeholder="0"
                                        min={0}
                                        max={totalPrice}
                                        textAlign="center"
                                    />
                                    <Text fontSize="lg" fontWeight="bold" mt={2}>
                                        Cambio:
                                    </Text>
                                    <Text fontSize="xl" color="red.500">
                                        ${Math.max(amountPaid - totalPrice, 0).toFixed(2)}
                                    </Text>
                                </Box>
                            )}

                            {paymentMethod === 2 && ( // Tarjeta
                                <Box
                                    mt={4}
                                    p={4}
                                    border="1px solid"
                                    borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.200'}
                                    borderRadius="md"
                                    backgroundColor={colorMode === 'dark' ? 'gray.700' : 'gray.50'}
                                    w={{ base: '100%', md: '25%' }}
                                    alignSelf="flex-end"
                                >
                                    <Text fontSize="lg" fontWeight="bold" mb={2}>
                                        Pago de cliente:
                                    </Text>
                                    <Text fontSize="2xl" color="green.500">
                                        ${totalPrice.toFixed(2)}
                                    </Text>
                                </Box>
                            )}
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 3 }} colEnd={{ base: 13, md: 13 }}>
                        <Button
                            colorScheme="blue"
                            onClick={handleSubmit}
                            isDisabled={loading || selectedProducts.length === 0 || amountPaid <= 0}
                            mt={4}
                            isLoading={isLoadingSale}
                            w={'100%'}
                        >
                            Procesar Venta
                        </Button>
                        {error && (
                            <Text color="red.500" mt={4}>
                                {error}
                            </Text>
                        )}
                    </GridItem>
                </Grid>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>¡Felicidades se ha completado la venta!</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <span
                                role="img"
                                aria-label="carita feliz"
                                style={{ fontSize: '50px', textAlign: 'center', margin: 'auto' }}
                            >
                                😊
                            </span>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
}
