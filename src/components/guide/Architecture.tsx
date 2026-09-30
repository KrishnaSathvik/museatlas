import { DiagramImage } from "./DiagramImage";
export function Architecture({ local = false }: { local?: boolean }) {
  return <DiagramImage id={local ? "architecture-local" : "architecture-main"}
    alt={local ? "Your request passes to Glimmer, context and planning, local browser, file and code tools, then result and review. External services require permissions." : "Your request passes to Muse / Spark for reasoning, context and planning, then browser, file and code tools, and result and review. Connected services require permissions. Review feeds back into planning."}
    caption="Conceptual flow. The model proposes work; software executes tools and enforces configured controls. Steps may repeat." />;
}
