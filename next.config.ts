/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  images: {
    unoptimized: true
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "" : undefined, // Dynamicky nastavíme jen v produkci
};

module.exports = nextConfig;
