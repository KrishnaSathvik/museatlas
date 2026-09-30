import { ArrowIcon } from "@/components/ui/ArrowIcon";
import Link from "next/link";
import { platformItems } from "@/data/nav";
import { Symbol } from "./Visuals";
export function Directory() { return <div className="product-directory">{[{label:"Core AI",ids:["spark","glimmer"]},{label:"Create",ids:["image","voice","video"]},{label:"Build",ids:["code"]}].map(g=><div className="directory-group" key={g.label}><h3>{g.label}</h3>{platformItems.filter(p=>g.ids.includes(p.id)).map(p=><Link href={`/explore/${p.id}`} className="directory-item" key={p.id}><Symbol kind={p.id}/><div><h3>{p.name.replace("Muse ","")}</h3><p>{p.summary}</p></div><ArrowIcon/></Link>)}</div>)}</div>; }
