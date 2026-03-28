/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['https://vm-qyx7dhzcbdl2bwyhthhvvr.vusercontent.net'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
