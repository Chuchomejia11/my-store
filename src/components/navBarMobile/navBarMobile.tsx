import React, { useEffect, useState } from 'react';
import { Box, VStack, Button, Icon, Text, useColorMode } from '@chakra-ui/react';
import { FaHome, FaChartBar } from 'react-icons/fa';
import { FaBoxesStacked } from "react-icons/fa6";
import { MdPointOfSale } from "react-icons/md";
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavBarMobile = () => {
    const router = useRouter();
    const { colorMode } = useColorMode();
    const [currentPath, setCurrentPath] = useState('/');

    useEffect(() => {
        setCurrentPath(router.pathname);
    }, [router.pathname]);

    const buttons = [
        { name: 'Dashboard', icon: FaHome, path: '/' },
        { name: 'Historial', icon: FaChartBar, path: '/sale-history' },
        { name: 'Invetario', icon: FaBoxesStacked, path: '/wh-products'},
        { name: 'Venntas', icon: MdPointOfSale, path: '/go-sales'},
    ];

    return (
        <Box
            as="nav"
            position="fixed"
            bottom={0}
            left={0}
            width="100%"
            bg={colorMode === 'light' ? 'teal.400' : 'teal.600'}
            color="white"
            paddingY={2}
            zIndex={10} // Asegura que esté sobre otros elementos excepto modales
            display={{ base: 'flex', md: 'none' }} // Solo visible en dispositivos pequeños
            justifyContent="space-around"
            borderTopLeftRadius="lg"
            borderTopRightRadius="lg"
        >
            {buttons.map((btn) => (
                <Link key={btn.name} href={btn.path} style={{ textDecoration: 'none' }}>
                    <VStack
                        spacing={1}
                        as={Button}
                        variant="ghost"
                        colorScheme={currentPath === btn.path ? 'teal' : 'gray'}
                        _hover={{ bg: colorMode === 'light' ? 'teal.600' : 'teal.400', color: 'white' }}
                    >
                        <Icon as={btn.icon} boxSize={6} />
                        <Text fontSize="xs">{btn.name}</Text>
                    </VStack>
                </Link>
            ))}
        </Box>
    );
};

export default NavBarMobile;