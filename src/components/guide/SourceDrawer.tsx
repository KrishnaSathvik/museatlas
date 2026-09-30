import { ArrowIcon } from "@/components/ui/ArrowIcon";
export function SourceDrawer({ items }: { items: readonly { label: string; href: string }[] }) {
  const sources = Array.from(new Map(items.map(item => [item.href, item])).values());
  if (!sources.length) return null;
  return <details className="sources-inline source-disclosure">
    <summary>Sources <ArrowIcon/></summary>
    <h2>Official resources</h2>
    <p>Documentation, announcements and examples used throughout this independent guide.</p>
    <ul>{sources.map(s => <li key={s.href}><a href={s.href} target="_blank" rel="noreferrer">{s.label} <ArrowIcon direction="external"/></a><small>{new URL(s.href).hostname}</small></li>)}</ul>
  </details>;
}
