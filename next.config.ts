import type { NextConfig } from "next";
import { appUrl } from "./lib/config";

const nextConfig: NextConfig = {
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
