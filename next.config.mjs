/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['vm-vajkbpws5082xr8ieikr2e.vusercontent.net'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
