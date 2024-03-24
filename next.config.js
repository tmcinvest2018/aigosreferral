const { i18n } = require('next-i18next');

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, { dev, isServer }) {
    // Set webpack mode to "production" if not in development mode
    if (!dev) {
      config.mode = 'production';
      // Use 'source-map' for production builds
      config.devtool = 'source-map';
    } else {
      // In development mode, you might want to use a different devtool setting
      // For example, 'eval-source-map' provides fast rebuilds with reasonable quality
      config.devtool = 'eval-source-map';
    }

    // Add any other webpack configurations here if needed

    return config;
  },
  i18n: {
    defaultLocale: 'en',
    locales: ["en","ru","hi","es","ko","tr","fr","nl","zh","ar","de","it","ja","pt"],
  },
};
