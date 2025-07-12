import type { NextConfig } from 'next';
import type { Configuration } from 'webpack';
import type { WebpackConfigContext } from 'next/dist/server/config-shared';

const nextConfig: NextConfig = {
  experimental: {
    nextScriptWorkers: true
  },
  reactStrictMode: true,
  webpack(config: Configuration, context: WebpackConfigContext): Configuration {
    if (context.dev) {
      config.watchOptions = {
        poll: 10000,
        aggregateTimeout: 300
      };
    }
    return config;
  }
};

export default nextConfig;
