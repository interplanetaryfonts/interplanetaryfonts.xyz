/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     domains: ["lens.infura-ipfs.io"],
//   },
//   reactStrictMode: true,
// };
