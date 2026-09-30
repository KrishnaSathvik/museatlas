import type { MetadataRoute } from "next";
import { seoPages } from "@/lib/seo";
import { absoluteUrl, SITE_INDEXABLE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SITE_INDEXABLE) return [];
  return seoPages.map(page => ({ url: absoluteUrl(page.path) }));
}
