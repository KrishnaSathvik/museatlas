import type { DiagramNode } from "@/components/diagrams/types";

export function architectureToNodes(architecture: string): DiagramNode[] {
  return architecture
    .split(/\s*→\s*|\s*->\s*/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((label, i, arr) => ({
      id: `n-${i}`,
      label,
      role: (i === arr.length - 1 ? "output" : i === 0 ? "secondary" : "tool") as DiagramNode["role"],
    }));
}
