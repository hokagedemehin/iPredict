/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.api-sports.io', 'res.cloudinary.com'],
  },
};
module.exports = nextConfig;
