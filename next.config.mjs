/** @type {import('next').NextConfig} */
const nextConfig = {
  // ¡Añade esta línea!
  output: 'export', 
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