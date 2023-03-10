const { useRouter } = require('next/router');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    appDir: true,
    typeRoutes: true,
    serverComponentsExternalPackages: ['bcrypt'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
