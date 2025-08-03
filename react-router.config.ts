import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Enable static site generation (prerendering)
  ssr: true,
  prerender: ["/"], // Prerender the home page to static HTML
} satisfies Config;
