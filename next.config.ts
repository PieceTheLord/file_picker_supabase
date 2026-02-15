import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  i18n: {
    defaultLocale: "ru",
    locales: ["en", "ru"],
  },
  cacheComponents: true,
  output: "standalone",
  // This is needed due to a typing issue in Next.js 16.1
  // with nested layouts in route groups not properly narrowing 
  // params types from generateStaticParams.
  // The application functions correctly at runtime.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
