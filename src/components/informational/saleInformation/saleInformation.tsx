import React from 'react';
import {
    Box,
    Button,
    Text,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    VStack,
    Divider
} from '@chakra-ui/react';
import { Venta } from '@/types/types';

interface SaleInformationProps {
    venta: Venta;
}

export const SaleInformation: React.FC<SaleInformationProps> = ({ venta }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box borderWidth={1} borderRadius="md" p={4} mb={4}>
            <Text fontSize="lg" fontWeight="bold">
                Venta del {new Date(venta.fecha).toLocaleDateString()}
            </Text>
            <Box mt={2} display="flex" justifyContent="space-between">
                <Text>Vendedor: {venta.employeeNumber}</Text>
                <Text>Pago: ${venta.pago.toFixed(2)}</Text>
                <Text>Cambio: ${venta.cambio.toFixed(2)}</Text>
                <Text>Descuento aplicado: {venta.descuento}%</Text>
            </Box>
            <Button mt={4} colorScheme="teal" onClick={onOpen}>
                Ver más
            </Button>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detalles de la Venta</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack align="start" spacing={4}>
                            <Text fontWeight="bold">Información del Vendedor:</Text>
                            <Text>Número de empleado: {venta.employeeNumber}</Text>
                            {venta.employee && (
                                <Text>
                                    Nombre: {venta.employee.firstName} {venta.employee.lastName}{' '}
                                    {venta.employee.secondLastName}
                                </Text>
                            )}
                            <Divider />
                            <Text fontWeight="bold">Información de la Venta:</Text>
                            <Text>Fecha: {new Date(venta.fecha).toLocaleDateString()}</Text>
                            <Text>Pago: ${venta.pago.toFixed(2)}</Text>
                            <Text>Cambio: ${venta.cambio.toFixed(2)}</Text>
                            <Text>Descuento aplicado: {venta.descuento}%</Text>
                            <Text>Tipo de Pago: {venta.tipoPago.name}</Text>
                            <Divider />
                            <Text fontWeight="bold">Productos Vendidos:</Text>
                            {JSON.parse(venta.ventas).map(
                                (ventaProducto: { productoId: number; cantidad: number }, index: number) => (
                                    <Box key={index} borderWidth={1} borderRadius="md" p={2} w="100%">
                                        <Text color="gray.500">Producto ID: {ventaProducto.productoId}</Text>
                                        <Text color="gray.500">Cantidad: {ventaProducto.cantidad}</Text>
                                    </Box>
                                )
                            )}
                        </VStack>
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
