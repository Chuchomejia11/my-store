// components/Header.tsx
import { useEffect, useState } from 'react';
import {
    Box,
    IconButton,
    useColorMode,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    Flex,
    Text,
    Image,
    useBreakpointValue
} from '@chakra-ui/react';
import { IoSettingsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/router';
import { logout } from '@/redux/slices/authSlice';  

export const DashboardHeader = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const [error, setError] = useState<string | null>(null);
    const userAuth = useSelector((state: RootState) => state.auth);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const isMovil = useBreakpointValue({ base: true, md: false });

    const handleLogout = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        setError(null);
        const apiBaseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        try {
            const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ employeeNumber: userAuth.employeeNumber, token: userAuth.token })
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(logout());
                router.push('/login');
            } else {
                setError(data.message || 'Error en el inicio de sesión.');
            }
        } catch (err) {
            setError('Error en la conexión al servidor.');
            console.error('Error de conexión:', err);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        console.error('Error en el logout:', error);
    }, [error]);

    return (
        <Box
            as="header"
            p={4}
            bg={colorMode === 'light' ? 'gray.100' : 'gray.600'} // Color dependiendo del modo
            h={{ base: '80px', sm: '90px', md: '100px', lg: '110px', xl: '120px' }} // Altura responsiva
        >
            <Flex justify="space-between" direction="row" h="100%" marginY={'auto'}>
                {!isMovil && (
                    <Text fontSize={{ base: 'lg', sm: 'xl', md: '2xl', lg: '3xl' }} fontWeight="bold" marginY={'auto'}>
                        ASSA Admin
                    </Text>
                )}
                    <Image src="/images/logo.svg" alt="Logo" background={'transparent'} onClick={() => router.push('/')} />
                <Box position={'relative'} right={''} w={'-moz-max-content'} display={'flex'} alignItems={'center'}>
                    <IconButton
                        aria-label="Configuración"
                        icon={<IoSettingsOutline size="1.5em" />} // Aumentar el tamaño del icono
                        onClick={openModal}
                        variant="ghost"
                        size={{ base: 'md', sm: 'lg' }}
                        position={'absolute'}
                        right={'4'}
                        bottom={'0'}
                    />
                </Box>
            </Flex>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Configuración</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button
                            onClick={toggleColorMode}
                            w="full"
                            colorScheme={colorMode === 'light' ? 'blue' : 'yellow'}
                            mb={4}
                        >
                            Cambiar a {colorMode === 'light' ? 'Modo Oscuro' : 'Modo Luminoso'}
                        </Button>
                        <Button onClick={handleLogout} w="full" colorScheme="red" isLoading={loading}>
                            Cerrar Sesión
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
