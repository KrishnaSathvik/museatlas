import { DiagramImage } from "@/components/guide/DiagramImage";
export function ProjectArchitecture({ slug, architecture }: { slug: string; architecture: string }) {
  return <DiagramImage id={slug} alt={architecture} caption={architecture} />;
}
