import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { GuideProcess } from "@/components/guide/GuideProcess";
import { PageIntro } from "@/components/guide/Visuals";
import { Architecture } from "@/components/guide/Architecture";
export function HowItWorksPage() {
  return <main id="main" className="guide container-wide"><PageIntro title="How Muse works">Start with the simple view, then follow the model, tools and controls underneath it.</PageIntro>
    <section className="guide-section"><h2>The simple view</h2><GuideProcess/></section>
    <section id="architecture" className="guide-section"><h2>What actually happens</h2><p className="section-lede">A model does not operate software on its own. The application supplies context, executes tools and controls access to the work environment.</p><Architecture/></section>
    <section id="tools" className="guide-section"><h2>Separate responsibilities, working together.</h2><div className="related-links"><div><h3>The model reasons</h3><p>Interprets information and proposes the next step.</p></div><div><h3>The software executes</h3><p>Runs tools, manages state and returns observations.</p></div><div><h3>The controls set limits</h3><p>Restrict access and request approval where configured.</p></div></div></section>
    <section className="technical-details advanced-view"><h2>Advanced architecture</h2><div className="advanced-grid">{[{t:"Context and memory",d:"The application decides what task history and saved context are available across steps and sessions."},{t:"Other agents",d:"Some workflows delegate bounded tasks to separate workers, then review and combine their results."},{t:"Credentials",d:"A credential service can authorize access without exposing the underlying secret to the model."},{t:"Approvals",d:"Sensitive actions can pause at a permission check before software executes them."},{t:"Network restrictions",d:"Runtime and workspace configuration determine which external systems tools may contact."},{t:"Untrusted content",d:"Webpages and files can contain hostile instructions. Controls need to distinguish source content from the user’s authority."}].map(x=><div key={x.t}><h3>{x.t}</h3><p>{x.d}</p></div>)}</div></section>
    <section id="software" className="reading-section"><h2>See the system in a development workflow.</h2><p>Muse Code puts the model alongside a repository and development tools, with checks and review around changes.</p><Link href="/explore/code" className="text-link">Explore Muse Code <ArrowIcon/></Link></section>
  </main>;
}
