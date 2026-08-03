import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All production photography is already resized and compressed as WebP.
  // Serving it directly avoids Vinext's runtime image endpoint, whose ASSETS
  // binding is not available on every Sites execution path.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
