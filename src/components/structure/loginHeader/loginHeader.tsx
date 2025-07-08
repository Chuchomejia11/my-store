// components/Header.tsx
import { useState } from 'react';
import { Box, IconButton, useColorMode, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Button, Flex, Text, Image, useBreakpointValue } from '@chakra-ui/react';
import { IoSettingsOutline } from "react-icons/io5";


export const LoginHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { colorMode, toggleColorMode } = useColorMode();
    const isMovil = useBreakpointValue({ base: true, md: false });
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <Box as="header" p={4} bg={colorMode === 'light' ? 'gray.100' : 'gray.600'}>
            <Flex justify="space-between" align="center">
                {!isMovil && <Text fontSize="xl" fontWeight="bold">ASSA Admin</Text>}
                <Image src="/images/logo.svg" alt="Logo" width={20} height={20} background={'transparent'} />
                <IconButton
                    aria-label="Configuración"
                    icon={<IoSettingsOutline  />}
                    onClick={openModal}
                    variant="ghost"
                    size="lg"
                />
            </Flex>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cambiar configuración</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Button
                            onClick={toggleColorMode}
                            w="full"
                            colorScheme={colorMode === 'light' ? 'blue' : 'yellow'}
                        >
                            Cambiar a {colorMode === 'light' ? 'Modo Oscuro' : 'Modo Luminoso'}
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};
