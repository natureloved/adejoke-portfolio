/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  },
];

const nextConfig = {
  reactStrictMode: true,
  env: {
    // The footer colophon reads this. Stamping it at build time means the
    // "last updated" line describes when this build was made, which is the
    // only date that is true of what a visitor is looking at. Computed at
    // render instead, it would change on every request and mean nothing.
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString().slice(0, 10),
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
