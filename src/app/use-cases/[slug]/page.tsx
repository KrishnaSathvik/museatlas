import { useCaseAvailability } from "@/data/availability";
import { PageSchema } from "@/components/seo/PageSchema";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCases } from "@/data/use-cases";
import { projects } from "@/data/projects";
import { useCaseStories } from "@/data/scenarios";
import { PageIntro, Process, ExampleCard } from "@/components/guide/Visuals";
import { Illustration } from "@/components/guide/Illustration";
import { pageMetadata } from "@/lib/site";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return useCases.map(u => ({ slug: u.id })); }
export async function generateMetadata({ params }: Props) { const { slug } = await params; const u = useCases.find(u => u.id === slug); if (!u) notFound(); return pageMetadata(`/use-cases/${slug}`); }
export default async function UseCaseDetail({ params }: Props) {
  const { slug } = await params; const u = useCases.find(u => u.id === slug); if (!u) notFound();
  const story = useCaseStories[slug];
  const related = projects.filter(p => u.projectSlugs.includes(p.slug)).slice(0, 3);
  const asset = slug === "smart-devices" ? "product-muse" : slug === "multi-agent" ? "multi-agent-product-studio" : `use-${slug}`;
  return <main id="main" className="guide container-wide"><PageSchema path={`/use-cases/${slug}`} name={u.title}/>
    <Link className="back-link" href="/use-cases"><ArrowIcon direction="left"/> All use cases</Link>
    <div className="scenario-hero"><div>{useCaseAvailability[slug] && <span className="availability-label">{useCaseAvailability[slug]}</span>}<PageIntro title={u.title}>{u.summary}</PageIntro></div><Illustration id={asset} alt={`Concept: ${u.title.toLowerCase()}`} priority/></div>
    <section className="guide-section"><h2>What this is useful for</h2><p className="section-lede">Illustrative tasks you could bring to Muse. The tools and access you provide determine what can be completed.</p><div className="scenario-list">{story.scenarios.map((s,i)=><article key={s.title}><div className="scenario-number">{i+1}</div><div><h3>{s.title}</h3><blockquote>“{s.request}”</blockquote><ol>{s.steps.map(step=><li key={step}>{step}</li>)}</ol><p className="scenario-result"><strong>What you get</strong>{s.result}</p></div></article>)}</div></section>
    <section className="guide-section workflow-section"><h2>How the work happens</h2><Process steps={story.flow}/></section>
    <section className="guide-section"><h2>What Muse can do</h2><ul className="capability-list">{u.capabilities.map(capability=><li key={capability}>{capability}</li>)}</ul></section>
    <section className="guide-section"><h2>Which Muse products are involved?</h2><div className="related-links">{u.products.map(p=><Link href={p.href} key={p.name}><h3>{p.name} <ArrowIcon/></h3><p>{p.role}</p></Link>)}</div></section>
    <section className="guide-section"><h2>{related.length ? "See it in practice" : "Explore this workflow"}</h2>{["business-workflows", "personal-productivity"].includes(slug) && <p className="section-lede">The example below is a developer workflow in Muse Code, not a demonstration of consumer Muse reminders. It requires a running Code session; its scheduling limits are explained on the example page.</p>}{related.length?<div className="example-grid two">{related.map(p=><ExampleCard key={p.slug} project={p}/>)}</div>:<div className="example-context"><p>{slug === "smart-devices" ? "Device experiences are described in the announcement; this guide does not yet include a hands-on device example." : "This guide does not yet include a dedicated implementation of this workflow. The scenarios above illustrate how you could approach it."}</p>{slug === "smart-devices" && <Link className="text-link" href="/updates#connect-2026">Explore device updates <ArrowIcon/></Link>}</div>}</section>
    <section className="limitations-section"><h2>What to keep in mind</h2><ul className="plain-list">{story.limitations.map(l=><li key={l}>{l}</li>)}</ul></section>
    <nav className="reading-next" aria-label="Continue exploring"><Link href="/how-it-works">Understand the workflow <ArrowIcon/></Link>{!u.products.some(product => product.href === "/safety") && <Link href="/safety">Review safety and permissions <ArrowIcon/></Link>}</nav>
  </main>;
}
