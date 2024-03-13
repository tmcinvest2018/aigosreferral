// next.config.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // Remove this line (not needed for disabling minification)
  webpack: (config, { dev, isServer }) => {
    // Disable minification in production build
    if (!dev && !isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },
};

module.exports = nextConfig;
