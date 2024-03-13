const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_ALCHEMY_ID: process.env.NEXT_PUBLIC_ALCHEMY_ID,
    NEXT_PUBLIC_CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NEXT_PUBLIC_PRESALE_ID: process.env.NEXT_PUBLIC_PRESALE_ID,
    NEXT_PUBLIC_CHAIN_ID: process.env.NEXT_PUBLIC_CHAIN_ID,
    NEXT_PUBLIC_CONTRACT_ABI: process.env.NEXT_PUBLIC_CONTRACT_ABI,
    NEXT_PUBLIC_STABLE_COIN_CONTRACT_ABI: process.env.NEXT_PUBLIC_STABLE_COIN_CONTRACT_ABI,
  },
  // Other configurations...
};

module.exports = nextConfig;
