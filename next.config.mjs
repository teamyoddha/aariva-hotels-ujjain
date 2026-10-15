/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes a self-contained site to /out that can be
  // uploaded to any static host (the current aarivahotels.com hosting included).
  output: "export",
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
