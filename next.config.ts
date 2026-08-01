import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
	  remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
      {
        protocol: 'https',
        hostname: 'goit.global',
      }
    ]
	},
  reactCompiler: true,
};

export default nextConfig;
