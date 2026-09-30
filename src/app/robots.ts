import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_INDEXABLE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Allow crawling so crawlers can see noindex on non-production pages.
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(SITE_INDEXABLE ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
