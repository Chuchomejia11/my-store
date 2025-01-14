import '@/styles/globals.css';
import { Provider } from 'react-redux';
import { store, persistor } from '@/redux/store';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import customTheme from '@/styles/theme';
import { PersistGate } from 'redux-persist/integration/react';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Store 01</title>
                <meta name="description" content="Todo lo que buscas lo encuentras aquí" />
                <link rel="icon" href="/images/logo.svg" />
            </Head>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ChakraProvider theme={customTheme}>
                        <Component {...pageProps} />
                    </ChakraProvider>
                </PersistGate>
            </Provider>
        </>
    );
}

export default MyApp;
