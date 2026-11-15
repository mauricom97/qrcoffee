import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /** Override with NEXT_DIST_DIR when default `.next` is not writable. */
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
