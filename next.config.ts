import type { NextConfig } from 'next';
import { Configuration } from 'webpack';

const nextConfig: NextConfig = {
    experimental: {
        nextScriptWorkers: true
    },
    reactStrictMode: true,
    webpack(config: Configuration, { dev }) {
        if (dev) {
            config.watchOptions = {
                poll: 10000,
                aggregateTimeout: 300 // Tiempo de espera para re-cargar
            };
        }
        return config;
    }
};

export default nextConfig;
