import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // app/layout.tsx reads these via fs.readFileSync() at module load time —
  // that's not a static import, so Vercel's output file tracing doesn't
  // pick it up on its own and the deployed function 404s on it at runtime
  // (ENOENT for /var/task/legacy/favicon-data-uri.txt). Every route goes
  // through the root layout, so include it for all of them.
  outputFileTracingIncludes: {
    "/**": ["./legacy/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
