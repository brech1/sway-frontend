/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "./",
  reactStrictMode: true,
  trailingSlash: true,
  // Without this config the next build would break. See:
  // - https://github.com/vercel/next.js/issues/30750
  // - https://github.com/vercel/next.js/issues/39030
  experimental: { esmExternals: false },
};

module.exports = nextConfig;
