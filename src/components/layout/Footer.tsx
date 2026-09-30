import Link from "next/link";
import Image from "next/image";
import { FooterLinks } from "./FooterLinks";
import { models } from "@/data/models";
import { additionalProducts } from "@/data/products";
import { exampleMedia } from "@/data/example-media";
import { projects } from "@/data/projects";
import { primarySources, updates } from "@/data/security-updates";

const sources = [
  ...primarySources,
  ...[...models, ...additionalProducts].flatMap(product => product.sources),
  ...projects.flatMap(project => {
    const href = exampleMedia[project.slug]?.recipe ?? project.sourceHref;
    return href ? [{ label: project.title, href }] : [];
  }),
  ...updates.flatMap(update => update.href ? [{ label: update.title, href: update.href }] : []),
];

export function Footer() {
  return <footer className="site-footer" id="sources"><div className="container-wide footer-compact">
    <div><Link href="/" className="brand-lockup font-display font-bold text-lg"><Image src="/brand/muse-icon.png" alt="" width={48} height={48} className="brand-icon" /><span>Muse Atlas</span></Link><p>Independent guide. Not affiliated with Meta.</p></div>
    <FooterLinks sources={Array.from(new Map(sources.map(source => [source.href, source])).values())}/>
  </div></footer>;
}
