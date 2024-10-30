import type { NextConfig } from "next";
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  devIndicators: {
    appIsrStatus: false,
  },
};

export default nextConfig;
