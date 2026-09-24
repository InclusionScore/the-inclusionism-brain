import type { NextConfig } from "next";

const canonicalSite = (
  process.env.NEXT_PUBLIC_CANONICAL_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://www.inclusionism.org"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "substackcdn.com" },
      { protocol: "https", hostname: "substack-post-media.s3.amazonaws.com" },
      { protocol: "https", hostname: "d3t3ozftmdmh3i.cloudfront.net" },
      { protocol: "https", hostname: "d3ctxlq1ktw2nl.cloudfront.net" }
    ]
  },
  async redirects() {
    return [
      {
        source: "/en",
        destination: "/",
        permanent: true
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "brain.inclusionism.org" }],
        destination: `${canonicalSite}/:path*`,
        permanent: true
      }
    ];
  }
};

export default nextConfig;
