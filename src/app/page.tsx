import { PageSchema } from "@/components/seo/PageSchema";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { Process, Symbol } from "@/components/guide/Visuals";
import { ExampleScreenshot } from "@/components/guide/ExampleScreenshot";
import { projects } from "@/data/projects";
import { Illustration } from "@/components/guide/Illustration";
import { Choices } from "@/components/guide/Choices";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata("/");
export default function HomePage() {
  return <main id="main" className="guide overview-compact container-wide"><PageSchema path="/"/>
    <section className="hero-editorial"><div><p className="intro-label">A visual guide to Meta Muse</p><h1>Understand Meta&apos;s Muse platform.</h1><p className="hero-description">The AI, the software, and what you can do with it. Start with the whole picture.</p><div className="actions"><Link className="primary-link" href="/explore">Explore Muse <ArrowIcon/></Link></div></div><Illustration id="product-muse" alt="Concept: a request becomes work across software and a result to review" priority/></section>
    <section id="what-is-muse" className="guide-section explanation"><div><h2>More than an answer.</h2><p className="statement">Muse is Meta’s personal AI experience. Give it a goal, and it can work with information, software and connected services to help carry the task through.</p><p>Muse is also the name of the broader family of models and tools, including Spark, Glimmer, Code, Image, Voice and Video.</p><p>For example: “Organize my trip bookings and notes into an itinerary, flag conflicts, and ask before changing anything.” Available tools and permissions determine what can be completed.</p></div><div><Process steps={["Understand","Work","Complete"]}/><div className="explain-captions"><p>Your goal<br/>Your information</p><p>Browser & files<br/>Permitted tools</p><p>A result<br/>Ready for review</p></div></div></section>
    <section className="guide-section"><div className="section-heading"><h2>A family with different roles.</h2></div><div className="product-highlights">{[{id:"spark",title:"Spark",text:"Reason through complex work."},{id:"glimmer",title:"Glimmer",text:"Run AI on your hardware."},{id:"code",title:"Code",text:"Build and check software."},{id:"image",title:"Image",text:"Create and refine visuals."},{id:"voice",title:"Voice",text:"Turn speech into text."},{id:"video",title:"Video",text:"Explore moving images."}].map(p=><Link href={`/explore/${p.id}`} key={p.id}><Symbol kind={p.id}/><h3>{p.title}</h3><p>{p.text}</p></Link>)}</div></section>
    <section className="guide-section"><div className="section-heading"><h2>Start with something you want to do.</h2><Link href="/use-cases" className="text-link">All use cases <ArrowIcon/></Link></div><Choices limit={6} compact/></section>
    <section className="guide-section overview-process"><div className="section-heading"><h2>From a request to a result.</h2><Link className="text-link" href="/how-it-works">See how Muse works <ArrowIcon/></Link></div><Process steps={["Ask", "Understand", "Work", "Check"]}/><p>Describe your goal. Muse uses context and permitted tools to work toward it, then checks the result for you to review.</p></section>
    <section className="guide-section featured-story"><ExampleScreenshot project={projects[0]}/><div><p className="intro-label">See Muse work</p><h2>Build it. Open it.<br/>Make it better.</h2><p>A website is more than its source code. Follow a workflow that builds a page, inspects it in a browser, and corrects the result.</p><Link className="text-link" href="/examples/browser-based-website-development">Follow the example <ArrowIcon/></Link></div></section>
    <aside className="safety-statement"><div><h2>Capability needs control.</h2><p>Permissions, isolated environments and approval controls matter when AI works with software and connected services.</p></div><Link className="text-link" href="/safety">Safety and control <ArrowIcon/></Link></aside>
  </main>;
}
