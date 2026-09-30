import Link from "next/link";
import { useCases } from "@/data/use-cases";
import { projects } from "@/data/projects";
import { updates } from "@/data/security-updates";
import { Eyebrow, Section, ButtonLink } from "@/components/ui/primitives";

export function UseCasesPreview() {
  const featured = useCases.slice(0, 6);
  return (
    <Section id="use-cases" wash>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Use cases</Eyebrow>
          <h2 className="font-display text-section font-bold">What Can Muse Be Used For?</h2>
        </div>
        <ButtonLink href="/use-cases" variant="secondary">
          All use cases
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((u) => (
          <Link
            key={u.id}
            href={`/use-cases#${u.id}`}
            className="rounded-2xl border border-rule bg-paper px-5 py-5 no-underline transition hover:border-signal"
          >
            <h3 className="font-display text-lg font-semibold">{u.title}</h3>
            <p className="mt-2 text-sm text-muted">{u.summary}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function FeaturedProjects() {
  const featured = projects.slice(0, 4);
  return (
    <Section id="projects">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Projects</Eyebrow>
          <h2 className="font-display text-section font-bold">Featured Projects</h2>
          <p className="mt-3 max-w-xl text-muted">
            Real examples of software and workflows built using Muse technologies.
          </p>
        </div>
        <ButtonLink href="/projects" variant="secondary">
          Browse projects
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {featured.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="rounded-2xl border border-rule p-6 no-underline transition hover:border-signal"
          >

            <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-muted">{p.summary}</p>
            <p className="mt-4 text-xs text-subtle">{p.stack.join(" · ")}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export function GlimmerTeaser() {
  return (
    <Section id="local-ai" wash>
      <Eyebrow>Local AI</Eyebrow>
      <h2 className="max-w-2xl font-display text-section font-bold">
        Local AI with Muse Glimmer
      </h2>
      <p className="mt-4 max-w-2xl text-muted">
        Muse Glimmer is an open-weight model designed for agent workflows on your own hardware —
        useful when privacy, offline operation or continuous local use matter more than calling a
        hosted frontier model for every step.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/models/glimmer">Muse Glimmer</ButtonLink>
        <ButtonLink href="/use-cases#local-ai" variant="secondary">
          Local AI use cases
        </ButtonLink>
      </div>
    </Section>
  );
}

export function SecurityTeaser() {
  return (
    <Section id="security-home">
      <Eyebrow>Security</Eyebrow>
      <h2 className="max-w-2xl font-display text-section font-bold">Muse Security</h2>
      <p className="mt-4 max-w-2xl text-muted">
        AI agents can access software, files and online services. Muse uses multiple controls to
        restrict what an agent can access and what actions it can perform.
      </p>
      <div className="mt-8 flex flex-wrap gap-3 text-sm">
        {["Work Environment", "Credentials", "Permissions", "External Content"].map((label) => (
          <span key={label} className="rounded-lg border border-rule px-3 py-2">
            {label}
          </span>
        ))}
      </div>
      <div className="mt-8">
        <ButtonLink href="/security" variant="secondary">
          Security overview
        </ButtonLink>
      </div>
    </Section>
  );
}

export function LatestUpdates() {
  const latest = updates.slice(0, 3);
  return (
    <Section id="updates" wash>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Updates</Eyebrow>
          <h2 className="font-display text-section font-bold">Latest Updates</h2>
        </div>
        <ButtonLink href="/updates" variant="secondary">
          All updates
        </ButtonLink>
      </div>
      <div className="mt-10 space-y-4">
        {latest.map((u) => (
          <article key={u.id} className="rounded-2xl border border-rule bg-paper p-5 md:p-6">
            <p className="text-xs text-subtle">{u.date}</p>
            <h3 className="mt-2 font-display text-lg font-semibold">{u.title}</h3>
            <p className="mt-2 text-sm text-muted">{u.summary}</p>

          </article>
        ))}
      </div>
    </Section>
  );
}
