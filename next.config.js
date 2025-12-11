/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/aicoding' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/aicoding/' : '',
}

module.exports = nextConfig
