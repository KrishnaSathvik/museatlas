"use client";

import { platformDiagram } from "@/data/nav";
import { PlatformMap } from "@/components/diagrams/Diagrams";
import { ButtonLink, Container } from "@/components/ui/primitives";

export function Hero() {
  return (
    <div className="border-b border-rule">
      <Container className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-[0.7rem] font-medium tracking-[0.16em] text-subtle uppercase">
            Muse Atlas
          </p>
          <h1 className="font-display text-hero font-bold text-ink">
            Understand Meta&apos;s Muse platform.
          </h1>
          <p className="mt-5 max-w-xl text-lede text-muted">
            Models, agents, computer use, local AI, developer tools and real-world applications.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#what-is-muse">Understand Muse</ButtonLink>
            <ButtonLink href="/projects" variant="secondary">
              View Projects
            </ButtonLink>
          </div>
        </div>
        <PlatformMap
          root={{ id: "muse", label: "Muse", href: "#what-is-muse", role: "root" }}
          columns={platformDiagram.columns.map((col, ci) => ({
            title: col.title,
            nodes: col.items.map((item, ni) => ({
              id: `${ci}-${ni}`,
              label: item.label,
              href: item.href,
              role: ci === 0 && ni === 0 ? ("primary" as const) : ("tool" as const),
            })),
          }))}
        />
      </Container>
    </div>
  );
}
