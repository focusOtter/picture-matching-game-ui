/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['vm-rsi6mdugub7ifixy319unv.vusercontent.net'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
