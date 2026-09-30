import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { Illustration } from "./Illustration";
import Link from "next/link";
import type { ReactNode } from "react";
import type { MuseProject } from "@/data/projects";

export function Symbol({ kind = "spark" }: { kind?: string }) {
  return <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    {kind === "voice" ? [18,28,38,48,58].map((x,i)=><path key={x} d={`M${x} ${26-Math.sin(i)*12}v${28+Math.sin(i)*24}`} strokeLinecap="round" strokeWidth="4"/>) : kind === "image" || kind === "video" ? <><rect x="12" y="16" width="56" height="48" rx="5"/><circle cx="52" cy="30" r="5"/><path d="m13 57 18-20 14 14 9-8 14 14"/>{kind === "video" && <path d="m34 27 15 12-15 12Z"/>}</> : kind === "code" ? <><path d="m27 26-15 14 15 14m26-28 15 14-15 14M45 20 35 60"/></> : kind === "glimmer" ? <><rect x="20" y="20" width="40" height="40" rx="8"/><rect x="30" y="30" width="20" height="20" rx="3"/>{[28,40,52].map(n=><path key={n} d={`M${n} 12v8m0 40v8M12 ${n}h8m40 0h8`}/>)}</> : <>{[0,45,90,135].map(r=><ellipse key={r} cx="40" cy="40" rx="13" ry="31" transform={`rotate(${r} 40 40)`}/>)}<circle cx="40" cy="40" r="4" fill="currentColor"/></>}
  </svg>;
}
export { SystemMap } from "./SystemMap";
export function Process({ steps }: { steps: string[] }) {
  return <ol className="process">{steps.map((s,i)=><li key={`${i}-${s}`}><span className="process-dot">{i+1}</span><strong>{s}</strong></li>)}</ol>;
}
export function ExampleCard({ project }: { project: MuseProject }) {
  return <Link href={`/examples/${project.slug}`} className="example-card"><div className="example-art"><Illustration id={project.slug} alt={`Illustrative workflow: ${project.title}`}/><div className="example-workflow">{project.process.slice(0,3).map((step,i)=><span key={step}>{i+1}. {step}</span>)}</div></div><div className="example-copy"><h3>{project.title}</h3><p>{project.summary}</p><span className="text-link">View example <ArrowIcon/></span></div></Link>;
}

export function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return <header className="page-intro"><h1>{title}</h1><p>{children}</p></header>;
}
export function FactRow({ label, children }: { label: string; children: ReactNode }) { return <div className="fact-row"><dt>{label}</dt><dd>{children}</dd></div>; }
