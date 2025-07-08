// NavBarDesktop.tsx
import React, { useEffect, useState } from 'react';
import { Box, VStack, Button, Icon, Text, useColorMode, Image } from '@chakra-ui/react';
import { AiOutlineHome } from "react-icons/ai";
import { PiUsers } from "react-icons/pi";
import { FaUserLock } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavBarDesktop = () => {
    const router = useRouter();
    const { colorMode } = useColorMode();
    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname]);

    const buttons = [
        { name: 'Dashboard', icon: AiOutlineHome, path: '/' },
        { name: 'Lista de usuarios', icon: PiUsers, path: '/sale-history' },
        { name: 'Perfil', icon: FaUserLock, path: '/wh-products' },
        { name: 'Ajustes', icon: IoSettingsOutline, path: '/go-sales' }
    ];

    const baseMargin = { base: '80px', sm: '90px', md: '100px', lg: '110px', xl: '120px' };

    return (
        <Box
            as="nav"
            position="fixed"
            left={0}
            top={0}
            bottom={0}
            width="250px"
            bg={colorMode === 'light' ? '#ffffff' : '#2D3748'}
            color="white"
            paddingY={4}
            paddingX={3}
            marginTop={baseMargin}
            overflowY="auto"
        >
            <VStack spacing={4} align="stretch">
                <Image src="/images/logo.svg" alt="Logo" boxSize="130px" objectFit="cover" margin="auto" />
                {buttons.map((btn) => (
                    <Link key={btn.name} href={btn.path} style={{ textDecoration: 'none' }}>
                        <Button
                            leftIcon={<Icon as={btn.icon} />}
                            justifyContent="flex-start"
                            color={currentPath === btn.path ? 'white' : colorMode === 'light' ? '#0D47A1' : '#90CAF9'}
                            _active={{ bg: colorMode === 'light' ? '#BBDEFB' : '#42A5F5', color: 'white' }}
                            variant={currentPath === btn.path ? 'solid' : 'ghost'}
                            _hover={{ bg: colorMode === 'light' ? '#DBECFF' : 'blue.400', color: 'white' }}
                            size="lg"
                            w="100%"
                        >
                            <Text>{btn.name}</Text>
                        </Button>
                    </Link>
                ))}
            </VStack>
        </Box>
    );
};

export default NavBarDesktop; // Exportando como default
