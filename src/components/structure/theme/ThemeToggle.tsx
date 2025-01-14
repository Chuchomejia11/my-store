// components/ThemeToggle.tsx
import { IconButton, useColorMode } from '@chakra-ui/react';
import { HiMoon, HiSun } from 'react-icons/hi';

export const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <IconButton
            aria-label="Toggle theme"
            icon={colorMode === 'light' ? <HiMoon /> : <HiSun />}
            onClick={toggleColorMode}
            size="lg"
            variant="ghost"
            fontSize="24px"
            color={colorMode === 'light' ? 'gray.800' : 'yellow.300'} // Cambia el color dinámicamente
        />
    );
};
