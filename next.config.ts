import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // Enable server components optimizations
  },
  // Ensure environment variables are properly handled
  env: {
    // Public vars only — GEMINI_API_KEY must remain server-side only
  },
};

export default nextConfig;
