import { ThemeConfig, extendTheme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const customTheme = extendTheme({
  config,
  styles: {
    global: (props: { colorMode: 'light' | 'dark' }) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
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
      900: '#1a1a1a',
    },

    // 🔵 Azul personalizado
    customBlue: {
      50: '#e3eaf2',
      100: '#bfd2e6',
      200: '#90afd1',
      300: '#608bbd',
      400: '#396da8',
      500: '#013469', // Color base
      600: '#012e5d',
      700: '#01264e',
      800: '#011e3e',
      900: '#011530',
    },

    // 🔵 Azul buttonsBlue (base: #1565C0)
    buttonsBlue: {
      50:  '#e3f0fa',
      100: '#b8daf3',
      200: '#8ac1eb',
      300: '#5ca8e2',
      400: '#388fd7',
      500: '#1565C0', // Color base
      600: '#1258a8',
      700: '#104b90',
      800: '#0d3e78',
      900: '#0a3261',
    },

    // 🔴 Rojo personalizado
    customRed: {
      50: '#ffe9e4',
      100: '#ffccc0',
      200: '#ffa28e',
      300: '#ff785c',
      400: '#ff4d2a',
      500: '#ED330C', // Color base
      600: '#c82809',
      700: '#a31f07',
      800: '#7d1605',
      900: '#580e03',
    },
  },
});

export default customTheme;
