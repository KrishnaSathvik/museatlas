import { useCaseAvailability } from "@/data/availability";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { useCases } from "@/data/use-cases";
import { projects } from "@/data/projects";
import { Symbol } from "./Visuals";
export function Choices({ limit = 8, compact = false }: { limit?: number; compact?: boolean }) {
  return <div className={`choice-grid ${compact ? "compact-choices" : ""}`}>{useCases.slice(0, limit).map((u, i) => {
    const example = projects.find(p => u.projectSlugs.includes(p.slug));
    return <Link className="choice-tile" href={`/use-cases/${u.id}`} key={u.id}>
      <Symbol kind={["code", "spark", "code", "glimmer", "voice", "image", "spark", "glimmer"][i % 8]} />
      <div><h3>{u.title}</h3>{useCaseAvailability[u.id] && <span className="availability-label">{useCaseAvailability[u.id]}</span>}{!compact && <p>{u.summary}</p>}
        {!compact && <div className="choice-preview"><ul>{u.capabilities.slice(0,3).map(c=><li key={c}>{c}</li>)}</ul><small>Works with {u.products[0].name}</small>{example&&<small>Example: {example.title}</small>}</div>}
      </div><ArrowIcon/>
    </Link>;
  })}</div>;
}
