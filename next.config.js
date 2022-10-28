/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/server/:path*',
        destination: 'http://localhost:8000/:path*'
      },
    ]
  }
}

module.exports = nextConfig
