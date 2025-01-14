// NavBarDesktop.tsx
import React, { useEffect, useState } from 'react';
import { Box, VStack, Button, Icon, Text, useColorMode } from '@chakra-ui/react';
import { FaHome, FaChartBar, FaCog } from 'react-icons/fa';
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
        { name: 'Dashboard', icon: FaHome, path: '/' },
        { name: 'Historial de ventas', icon: FaChartBar, path: '/sale-history' },
        { name: 'Settings', icon: FaCog, path: '/settings' }
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
            bg={colorMode === 'light' ? 'teal.400' : 'teal.600'}
            color="white"
            paddingY={4}
            paddingX={3}
            marginTop={baseMargin}
            overflowY="auto"
        >
            <VStack spacing={4} align="stretch">
            {buttons.map((btn) => (
                <Link key={btn.name} href={btn.path} style={{ textDecoration: 'none' }}>
                <Button
                    leftIcon={<Icon as={btn.icon} />}
                    justifyContent="flex-start"
                    colorScheme={currentPath === btn.path ? 'teal' : 'gray'}
                    variant={currentPath === btn.path ? 'solid' : 'ghost'}
                    _hover={{ bg: colorMode === 'light' ? 'teal.600' : 'teal.400', color: 'white' }}
                    size="lg"
                    w='100%'
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
