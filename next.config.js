const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { dev, isServer }) {
    // Use a suitable devtool configuration for development mode
    if (dev) {
      config.devtool = 'source-map'; // or any other suitable devtool option
    }

    // Add any other webpack configurations here if needed

    return config;
  },
};

module.exports = nextConfig;
