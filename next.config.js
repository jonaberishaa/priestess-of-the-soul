/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['nodemailer'],
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: 'priestessofthesoul.com' },
      { protocol: 'https', hostname: 'img.lightshot.app' },
    ],
  },
};

module.exports = nextConfig;
