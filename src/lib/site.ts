import type { Metadata } from "next";
import { getSeoPage } from "@/lib/seo";

function configuredOrigin(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return;
  const url = new URL(configured);
  if (!["https:", "http:"].includes(url.protocol) || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a bare HTTP(S) origin, without a path, credentials, query or fragment.");
  }
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".test") || host === "[::1]" || /^127\./.test(host) || /(^|\.)example\.(com|org|net)$/.test(host)) return;
  return url.origin;
}

export const SITE_ORIGIN = configuredOrigin();
export const SITE_URL = SITE_ORIGIN ?? "http://localhost:3000";
export const SITE_NAME = "Muse Atlas";
export const SITE_TITLE = getSeoPage("/")!.title;
export const SITE_DESCRIPTION = getSeoPage("/")!.description;
export const SITE_INDEXABLE = Boolean(SITE_ORIGIN)
  && process.env.NODE_ENV === "production"
  && (!process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production")
  && process.env.SITE_NOINDEX !== "true";

export function absoluteUrl(href: string): string {
  return new URL(href, `${SITE_URL}/`).toString();
}

export function pageMetadata(href: string): Metadata {
  const page = getSeoPage(href);
  if (!page) throw new Error(`Missing SEO metadata for ${href}`);
  const { title, description, image, imageAlt, imageWidth, imageHeight } = page;
  return {
    title: { absolute: title },
    description,
    alternates: SITE_ORIGIN ? { canonical: absoluteUrl(href) } : undefined,
    openGraph: {
      type: "website", title, description,
      url: SITE_ORIGIN ? absoluteUrl(href) : undefined,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [{ url: absoluteUrl(image), alt: imageAlt, ...(imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : {}) }],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: [{ url: absoluteUrl(image), alt: imageAlt, ...(imageWidth && imageHeight ? { width: imageWidth, height: imageHeight } : {}) }],
    },
  };
}
