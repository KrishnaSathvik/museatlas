import { useCaseAvailability } from "@/data/availability";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { Choices } from "@/components/guide/Choices";
import { PageIntro } from "@/components/guide/Visuals";
import { useCases } from "@/data/use-cases";
export function UseCasesPage(){return <main id="main" className="guide container-wide"><PageIntro title="What can Muse help with?">Choose what you’re interested in. See what’s possible, what’s involved, and how it looks in practice.</PageIntro><h2 className="sr-only">Choose a task</h2><Choices/><section className="guide-section"><h2>More ways to explore</h2><div className="related-links">{useCases.slice(8).map(u=><Link id={u.id} key={u.id} href={`/use-cases/${u.id}`}><h3>{u.title} <ArrowIcon/></h3>{useCaseAvailability[u.id] && <span className="availability-label">{useCaseAvailability[u.id]}</span>}<p>{u.summary}</p></Link>)}</div></section></main>;}
