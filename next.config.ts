import type { NextConfig } from "next";
import { appUrl } from "./lib/config";

const nextConfig: NextConfig = {

  /**
   * tesseract.js spawns a worker and loads its WASM core by resolving paths
   * inside its own package at runtime. Bundling it rewrites those paths to a
   * build-time placeholder, so OCR dies on the first request in a production
   * build while working perfectly in dev. Load it from node_modules instead.
   */
  serverExternalPackages: ["tesseract.js"],
  devIndicators: false,

  /**
   * The platform backend builds every link in outbound email from its
   * APP_BASE_URL. When that is set to zoikomeds.com, links land on this site —
   * so the paths it uses must all resolve here.
   *
   * `/forgot-password` and `/reset-password` are real pages (they only need the
   * emailed token, no session). The rest belong to the authenticated app, so
   * forward them there rather than 404.
   */
  async redirects() {
    return [
      { source: "/login", destination: appUrl("/login"), permanent: false },
      { source: "/dashboard", destination: appUrl("/dashboard"), permanent: false },
      { source: "/register", destination: appUrl("/register"), permanent: false },
      { source: "/create-account", destination: appUrl("/register"), permanent: false },
      { source: "/support", destination: "/contact", permanent: false },
    ];
  },
};

export default nextConfig;
