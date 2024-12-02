import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      
      },
    ],
  },
  experimental: {
    
    turbo: {
      rules: {
        "*.mdx": ["mdx-loader"],
        // Add other file types as needed
      },
    },
  
  },
};

export default nextConfig;
// images: {
//   domains: ['res.cloudinary.com'], // Replace with your actual Cloudinary domain
// },