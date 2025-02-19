// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['@coinbase/wallet-sdk', 'preact'],
  }
  
  module.exports = nextConfig