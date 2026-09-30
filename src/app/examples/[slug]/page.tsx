import { PageSchema } from "@/components/seo/PageSchema";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { exampleMedia } from "@/data/example-media";
import { exampleStepDetails } from "@/data/example-steps";
import { Illustration } from "@/components/guide/Illustration";
import { ExampleJourney } from "@/components/guide/ExampleJourney";
import { ExampleScreenshot } from "@/components/guide/ExampleScreenshot";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";
import { PageIntro, FactRow } from "@/components/guide/Visuals";
import { ProjectArchitecture } from "@/components/diagrams/ProjectArchitecture";
import { pageMetadata } from "@/lib/site";
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const p=getProject(slug);if (!p) notFound();return pageMetadata(`/examples/${slug}`);}
export default async function ProjectDetailPage({params}:Props){const {slug}=await params;const p=getProject(slug);if(!p)notFound();return <main id="main" className="guide container-wide"><PageSchema path={`/examples/${slug}`} name={p.title}/><Link href="/examples" className="back-link"><ArrowIcon direction="left"/> All examples</Link><PageIntro title={p.title}>{p.summary}</PageIntro><div className="example-story"><Illustration id={p.slug} alt={`Illustrative workflow: ${p.title}`} priority/><section><h2>What does it do?</h2><p>{p.whatItDoes}</p><h3>Why it’s useful</h3><p>{p.whyUseful}</p></section></div>{!exampleMedia[p.slug]?.caption.startsWith("Recipe page capture")&&<section className="guide-section"><h2>Example in practice</h2><ExampleScreenshot project={p}/></section>}<section className="guide-section"><h2>Follow the work</h2><ExampleJourney key={p.slug} steps={p.process} descriptions={exampleStepDetails[p.slug]}/></section><section className="guide-section"><h2>Architecture and technologies</h2><ProjectArchitecture slug={p.slug} architecture={p.architecture}/><dl><FactRow label="Works with">{p.stack.join(", ")}</FactRow></dl></section><section className="reading-section"><h2>Keep in mind</h2><ul className="plain-list">{p.limitations.map(l=><li key={l}>{l}</li>)}</ul></section><nav className="reading-next" aria-label="Continue exploring"><Link href="/how-it-works#architecture">Understand the architecture <ArrowIcon/></Link><Link href="/safety">Review safety and permissions <ArrowIcon/></Link></nav></main>;}
