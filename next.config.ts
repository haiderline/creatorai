import type { NextConfig } from "next";

// Static export: produces a plain `out/` folder that Cloudflare Pages serves from its CDN.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
