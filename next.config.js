/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY_WOOCOMMERCE: process.env.API_KEY_WOOCOMMERCE,
    WC_URL: process.env.WC_URL,
  },
};

module.exports = nextConfig;
