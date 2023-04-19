/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    domains: ['preql-providers.s3.amazonaws.com'],
  },
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
