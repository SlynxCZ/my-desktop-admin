/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "out",
    images: {
      unoptimized: true
    },
    assetPrefix: process.env.NODE_ENV === "production" ? "/static/" : "",
    trailingSlash: true,
  };

module.exports = nextConfig;