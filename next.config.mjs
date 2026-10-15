/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger Node.js deployment: build with Next.js and start with npm start.
  outputFileTracingRoot: import.meta.dirname,
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Must match WIDTHS in scripts/optimize-images.mjs
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [320],
  },
};

export default nextConfig;
