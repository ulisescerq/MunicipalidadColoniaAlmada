/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ¡Esta línea debe estar!
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com'],
    unoptimized: true,
  },
}

export default nextConfig