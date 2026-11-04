
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://json-toolbox.zjy15827189621.workers.dev/sitemap.xml",
  };
}
