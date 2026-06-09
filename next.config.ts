import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    if (process.env.FORCE_CANONICAL_HOST_REDIRECT !== "true") {
      return [];
    }

    const canonicalHost = process.env.CANONICAL_HOST || "inclusionism.org";
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.inclusionism.org" }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "brain.inclusionism.org" }],
        destination: `https://${canonicalHost}/:path*`,
        permanent: true
      }
    ];
  }
};

export default nextConfig;
