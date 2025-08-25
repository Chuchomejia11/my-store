import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import customTheme from '@/styles/theme';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
    // Crear el QueryClient solo una vez por sesión
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            <Head>
                <title>ASSA Log Addmin</title>
                <meta name="description" content="Todo lo que buscas lo encuentras aquí" />
                <link rel="icon" href="/images/logo.svg" />
            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ChakraProvider theme={customTheme}>
                        <QueryClientProvider client={queryClient}>
                            <Component {...pageProps} />
                        </QueryClientProvider>
                    </ChakraProvider>
                </PersistGate>
            </Provider>
        </>
    );
}

export default MyApp;
