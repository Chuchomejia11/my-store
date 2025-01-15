import React, { useState, useEffect } from 'react';
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
    ModalBody,
    useColorMode,
    Text
} from '@chakra-ui/react';
import { Producto } from '@/types/types';

type ProductUpdateFormProps = {
    productId: number;
    initialData: Producto;
};

export const ProductUpdateForm = ({ productId, initialData }: ProductUpdateFormProps) => {
    const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const [formData, setFormData] = useState({
        name: '',
        tipoProductoId: '1',
        precioSugerido: '',
        precioTienda: '',
        estatus: ''
    });

    const [loading, setLoading] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                tipoProductoId: initialData.tipoProductoId?.toString() || '1',
                precioSugerido: initialData.precioSugerido?.toString() || '',
                precioTienda: initialData.precioTienda?.toString() || '',
                estatus: initialData.estatus || ''
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${apiBaseUrl}/api/products/updateProduct`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: productId,
                    name: formData.name,
                    tipoProductoId: parseInt(formData.tipoProductoId, 10),
                    precioSugerido: parseFloat(formData.precioSugerido),
                    precioTienda: parseFloat(formData.precioTienda),
                    estatus: formData.estatus
                })
            });

            if (response.status === 200) {
                setLoading(false);
                onOpen();
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            } else {
                throw new Error('Error al actualizar el producto.');
            }
        } catch (error) {
            setLoading(false);
            toast({
                title: 'Error',
                description: 'Hubo un problema al actualizar el producto. Intenta de nuevo.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            console.error('Error:', error);
        }
    };

    return (
        <Box mx="auto" p={4} bg={colorMode === 'dark' ? 'gray.800' : 'white'} borderRadius="md" boxShadow="lg">
            <Box textAlign="center" mb={4}>
                <h2>{initialData.name}</h2>
                <Text fontSize="lg" color="gray.500">
                    producto agregado el {new Date(initialData.fechaAñadido).toLocaleDateString()}
                </Text>
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
                        >
                            <option value="1">Pegatina</option>
                            <option value="2">Ropa</option>
                            <option value="3">Figuras</option>
                            <option value="4">TCG</option>
                            <option value="5">Consola</option>
                        </Select>
                    </FormControl>

                    <FormControl isRequired mb={4}>
                        <FormLabel>Estado del Producto</FormLabel>
                        <Select
                            name="estatus"
                            value={formData.estatus}
                            onChange={handleChange}
                            bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                            focusBorderColor="teal.500"
                        >
                            <option value="Disponible">Nuevo</option>
                            <option value="Usado">Usado</option>
                            <option value="Reparado">Reparado</option>
                            <option value="Defectuoso">Defectuoso</option>
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
                        <FormLabel>Precio Tienda (MXN)</FormLabel>
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
                        Actualizar
                    </Button>
                </Box>
            </form>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>¡Producto actualizado con éxito!</ModalHeader>
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
        </Box>
    );
};
