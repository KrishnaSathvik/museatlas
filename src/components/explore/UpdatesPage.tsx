"use client";
import { useState } from "react";
import { updates, type UpdateCategory } from "@/data/security-updates";
import { PageIntro } from "@/components/guide/Visuals";
const filterOptions:{label:string;ids:UpdateCategory[]}[]=[{label:"All",ids:[]},{label:"Products",ids:["muse","developer-tools"]},{label:"Models",ids:["models"]},{label:"Devices",ids:["devices"]},{label:"Safety",ids:["security"]}];
const filters = filterOptions.filter(filter => !filter.ids.length || updates.some(update => update.category.some(category => filter.ids.includes(category))));
export function UpdatesPage(){const [active,setActive]=useState(0);const visible=updates.filter(u=>!active||u.category.some(c=>filters[active].ids.includes(c)));return <main id="main" className="guide container-wide"><PageIntro title="What’s new">Follow the products, models and experiences that make up Muse.</PageIntro><div className="filter-bar">{filters.map((f,i)=><button key={f.label} aria-pressed={active===i} onClick={()=>setActive(i)}>{f.label}</button>)}</div><div className="timeline" aria-live="polite">{visible.map(u=><article id={u.id} key={u.id}><time>{u.date}</time><div><h2>{u.title}</h2><p>{u.summary}</p></div></article>)}{!visible.length&&<p>No updates in this category yet.</p>}</div></main>;}
