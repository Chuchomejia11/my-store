import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light', 
    useSystemColorMode: true 
};

const customTheme = extendTheme({
    config,
    styles: {
        global: (props: { colorMode: 'light' | 'dark' }) => ({
            body: {
                bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
                color: props.colorMode === 'dark' ? 'white' : 'gray.800'
            }
        })
    },
    colors: {
        brand: {
            50: '#f5f5f5',
            100: '#eaeaea',
            200: '#d5d5d5',
            300: '#b8b8b8',
            400: '#8d8d8d',
            500: '#6e6e6e',
            600: '#4e4e4e',
            700: '#383838',
            800: '#222222',
            900: '#1a1a1a'
        }
    }
});

export default customTheme;
