/** @type {import('next').NextConfig} */
// JB_STATIC=1 produces a static public export (out/) for jon-beatz.com.
// Unset (normal dev/build) keeps the live local dashboard with API routes.
const isStatic = process.env.JB_STATIC === "1";

const nextConfig = {
  reactStrictMode: true,
  ...(isStatic
    ? {
        output: "export",
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
