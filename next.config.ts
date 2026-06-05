import type { NextConfig } from "next";

// Static export is enabled only when EXPORT=true (used by the GitHub Pages
// CI build). Locally, `next dev` and `next build` run normally so the CMS
// API routes keep working. See README.md for the deploy workflow.
const isExport = process.env.EXPORT === "true";

// For project pages (https://<user>.github.io/<repo>) set
// NEXT_PUBLIC_BASE_PATH=/<repo>. Leave empty for a user/custom-domain site at
// the root. Using NEXT_PUBLIC_ so client code can prefix asset URLs too.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(isExport ? { output: "export" } : {}),
  basePath: basePath || undefined,
  images: {
    unoptimized: true,
  },
  // GitHub Pages serves from folders, so emit index.html in each route dir.
  trailingSlash: isExport,
};

export default nextConfig;
