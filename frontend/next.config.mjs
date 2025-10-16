/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // static export
  images: {
    unoptimized: true,  // disables image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
}

export default nextConfig;  // ✅ Changed from module.exports