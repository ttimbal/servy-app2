/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["default","en", "es"],
    defaultLocale: 'en',
    localeDetection: true,
    fallbackLng:"en",
    debug:false
  },
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
