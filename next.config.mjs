/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, 
  },
    allowedDevOrigins: ['192.168.1.145'],
};

export default nextConfig;
