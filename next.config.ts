import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All production photography is already resized and compressed as WebP.
  // Serving it directly avoids Vinext's runtime image endpoint, whose ASSETS
  // binding is not available on every Sites execution path.
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bermudashotel.com" }],
        destination: "https://bermudashotel.com/:path*",
        permanent: true,
      },
      { source: "/tienda", destination: "/", permanent: true },
      { source: "/tienda/:path*", destination: "/", permanent: true },
      { source: "/contingentes", destination: "/contacto", permanent: true },
      { source: "/contingentes/:path*", destination: "/contacto", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
