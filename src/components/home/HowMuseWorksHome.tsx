"use client";

import { useState } from "react";
import Link from "next/link";
import { ArchitectureMap, WorkflowDiagram } from "@/components/diagrams/Diagrams";
import { Eyebrow, Section, ButtonLink } from "@/components/ui/primitives";

const detailedLayers = [
  {
    id: "input",
    title: "Input",
    nodes: [{ id: "user", label: "User", role: "secondary" as const }],
  },
  {
    id: "intelligence",
    title: "Intelligence",
    nodes: [
      { id: "model", label: "Muse Model", role: "primary" as const },
      { id: "plan", label: "Planning & Reasoning", role: "secondary" as const },
    ],
  },
  {
    id: "support",
    title: "Support",
    nodes: [
      { id: "memory", label: "Memory", role: "tool" as const },
      { id: "tools", label: "Tools", role: "tool" as const },
      { id: "agents", label: "Other Agents", role: "tool" as const },
    ],
  },
  {
    id: "environment",
    title: "Execution Environment",
    nodes: [
      { id: "vm", label: "Secure Work Environment", role: "secondary" as const },
      { id: "browser", label: "Browser", role: "tool" as const },
      { id: "code", label: "Code", role: "tool" as const },
      { id: "files", label: "Files", role: "tool" as const },
    ],
  },
  {
    id: "outside",
    title: "Output / Services",
    nodes: [{ id: "services", label: "Connected Services", role: "output" as const }],
  },
];

export function HowMuseWorksHome() {
  const [expanded, setExpanded] = useState(false);

  return (
    <Section id="how-it-works-home">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="font-display text-section font-bold">How Muse Works</h2>
      <p className="mt-4 max-w-2xl text-muted">
        A system map, not a checklist — request, reasoning, parallel tools, then result.
      </p>

      <p className="mt-8 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
        {expanded ? "Detailed architecture" : "Core workflow"}
      </p>
      <div className="mt-3">
        {!expanded ? <WorkflowDiagram /> : <ArchitectureMap layers={detailedLayers} />}
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="rounded-lg border border-rule-strong px-4 py-2.5 text-sm font-medium hover:border-signal hover:text-signal"
        >
          {expanded ? "Show core workflow" : "See detailed architecture"}
        </button>
        <ButtonLink href="/how-it-works" variant="ghost">
          How It Works page →
        </ButtonLink>
        <Link href="/security" className="text-sm text-muted no-underline hover:text-signal">
          Security
        </Link>
      </div>
    </Section>
  );
}
