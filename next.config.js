/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    reactCompiler: true,
    // dynamicIO: true,
  },
  devIndicators: {
    appIsrStatus: false,
  },
  // TODO: REMOVE WHEN DONE
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
