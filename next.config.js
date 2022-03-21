/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  target: 'serverless',
  nextConfig,
  images: {
    domains: ['cdn.pixabay.com', 'images.unsplash.com']
  }
}
