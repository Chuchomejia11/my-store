import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    useToast,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    useColorMode
} from '@chakra-ui/react';

export const ProductCreateForm = () => {
    const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const [formData, setFormData] = useState({
        name: '',
        tipoProductoId: '1',
        precioSugerido: '',
        precioTienda: '',
        estatus: ''
    });

    const [loading, setLoading] = useState(false);
    const { colorMode } = useColorMode(); // Obtener el modo de color actual
    const toast = useToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    // Actualizar datos del formulario
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    // Enviar datos del formulario a la API
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${apiBaseUrl}/api/products/createProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    tipoProductoId: parseInt(formData.tipoProductoId, 10),
                    precioSugerido: parseFloat(formData.precioSugerido),
                    precioTienda: parseFloat(formData.precioTienda),
                    estatus: formData.estatus
                })
            });

            if (response.status === 201) {
                setLoading(false);
                onOpen();
                setTimeout(() => {
                    window.location.reload(); // Refresca la página después de 5 segundos
                }, 5000);
            }
            if (response.status === 400) {
                setLoading(false);
                toast({
                    title: 'Error',
                    description: 'Algo salió mal. Intenta de nuevo más tarde.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
            if (response.status === 500) {
                setLoading(false);
                toast({
                    title: 'Error',
                    description: 'Algo salió mal. Intenta de nuevo más tarde.',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
        } catch (err) {
            setLoading(false);
            toast({
                title: 'Error',
                description: 'Algo salió mal. Intenta de nuevo más tarde.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            console.error('Error al crear el producto:', err);
        }
    };

    return (
        <Box
            w={{ base: '100%', md: '80%' }}
            mx="auto"
            p={4}
            bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            borderRadius="md"
            boxShadow="lg"
        >
            <Box textAlign="center" mb={4}>
                <h2>Agregar producto al Inventario</h2>
            </Box>
            <form onSubmit={handleSubmit}>
                <Box display="grid" gridTemplateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={4}>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Nombre del Producto</FormLabel>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            focusBorderColor="teal.500"
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Tipo de Producto</FormLabel>
                        <Select
                            name="tipoProductoId"
                            value={formData.tipoProductoId}
                            onChange={handleChange}
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            focusBorderColor="teal.500"
                            placeholder="Seleccionar"
                        >
                            <option value="1">Pegatina</option>
                            <option value="2">Ropa</option>
                            <option value="3">Figuras</option>
                            <option value="4">TCG</option>
                            <option value="5">Consola</option>
                        </Select>
                    </FormControl>
                    <FormControl isRequired mb={4}>
                        <FormLabel>Estado del producto</FormLabel>
                        <Select
                            name="estatus"
                            value={formData.estatus}
                            onChange={handleChange}
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            focusBorderColor="teal.500"
                            placeholder="Seleccionar"
                        >
                            <option value="Disponible">Nuevo</option>
                            <option value="Usado">Usado</option>
                            <option value="Reparado">Reparado</option>
                            <option value="Defecuso">Defectuoso</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Precio Sugerido (MXN)</FormLabel>
                        <Input
                            type="text"
                            name="precioSugerido"
                            value={formData.precioSugerido}
                            onChange={(e) => {
                                const { value } = e.target;
                                const regex = /^[0-9]*\.?[0-9]*$/;
                                if (regex.test(value)) {
                                    handleChange(e);
                                }
                            }}
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            focusBorderColor="teal.500"
                            placeholder="0.00"
                        />
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Precio Tienda</FormLabel>
                        <Input
                            type="number"
                            name="precioTienda"
                            value={formData.precioTienda}
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            focusBorderColor="teal.500"
                            onChange={(e) => {
                                const { value } = e.target;
                                const regex = /^[0-9]*\.?[0-9]*$/;
                                if (regex.test(value)) {
                                    handleChange(e);
                                }
                            }}
                            placeholder="0.00"
                        />
                    </FormControl>
                </Box>

                <Box display="flex" justifyContent="flex-end">
                    <Button
                        type="submit"
                        colorScheme="teal"
                        isLoading={loading}
                        loadingText="Cargando..."
                        width={{ base: '50%', md: '30%' }}
                    >
                        Subir Producto
                    </Button>
                </Box>
            </form>
            {/* Modal de éxito */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>¡Producto creado con éxito!</ModalHeader>
                    <ModalCloseButton display="none" />
                    <ModalBody display="flex" justifyContent="center" alignItems="center">
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
        </Box>
    );
};
