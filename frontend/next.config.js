const dotenvExpand = require("dotenv-expand");

dotenvExpand.expand({ parsed: { ...process.env } });

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

// module.exports = {
//   images: {
//     domains: ["lens.infura-ipfs.io"],
//   },
//   reactStrictMode: true,
// };
