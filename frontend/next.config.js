const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../'),
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
    outputFileTracingExcludes: {
      '*': [
        'node_modules/sharp/**/*',
        '**/sharp/**/*',
      ],
    },
}

module.exports = nextConfig
