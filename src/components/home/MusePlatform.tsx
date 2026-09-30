import Link from "next/link";
import { platformItems } from "@/data/nav";
import { Eyebrow, Section } from "@/components/ui/primitives";

export function MusePlatform() {
  return (
    <Section id="platform" wash>
      <Eyebrow>Platform</Eyebrow>
      <h2 className="font-display text-section font-bold">The Muse Platform</h2>
      <p className="mt-4 max-w-2xl text-muted">
        The main products and models Meta has introduced under Muse.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platformItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="rounded-2xl border border-rule bg-paper p-6 no-underline transition hover:border-signal"
          >
            <h3 className="font-display text-lg font-semibold text-ink">{item.name}</h3>
            <p className="mt-3 text-sm text-muted">{item.summary}</p>
            {item.tags ? (
              <p className="mt-4 text-xs text-subtle">{item.tags.join(" · ")}</p>
            ) : null}
            <p className="mt-5 text-sm font-medium text-signal">Learn more →</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
