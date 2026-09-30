import { absoluteUrl, SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { getSeoPage } from "@/lib/seo";

const sectionNames: Record<string, string> = {
  "/explore": "Explore", "/use-cases": "Use cases", "/examples": "Examples",
  "/how-it-works": "How it works", "/safety": "Safety", "/updates": "Updates",
};

export function PageSchema({ path, name }: { path: string; name?: string }) {
  if (!SITE_ORIGIN) return null;
  const page = getSeoPage(path);
  if (!page) return null;
  const parent = `/${path.split("/")[1]}`;
  const crumbs = [
    { name: "Overview", path: "/" },
    ...(parent !== path ? [{ name: sectionNames[parent], path: parent }] : []),
    { name: name ?? sectionNames[path] ?? page.title, path },
  ];
  const data = path === "/" ? {
    "@context": "https://schema.org", "@type": "WebSite",
    name: SITE_NAME, url: absoluteUrl("/"), description: page.description,
  } : {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem", position: index + 1,
      name: crumb.name, item: absoluteUrl(crumb.path),
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}/>;
}
