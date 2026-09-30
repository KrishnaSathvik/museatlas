import { Eyebrow, Section } from "@/components/ui/primitives";

const concepts = [
  {
    title: "Understand",
    body: "Process text, images, documents, audio and visual information.",
  },
  {
    title: "Work",
    body: "Use software, browsers, code and connected services.",
  },
  {
    title: "Continue",
    body: "Handle multi-step work instead of producing only a single response.",
  },
];

export function WhatIsMuse() {
  return (
    <Section id="what-is-muse">
      <Eyebrow>Overview</Eyebrow>
      <h2 className="max-w-3xl font-display text-section font-bold">What is Meta Muse?</h2>
      <p className="mt-5 max-w-2xl text-lede text-muted">
        Muse is Meta&apos;s platform for AI models and agent-based software that can reason, use
        tools, work with computers, process different types of media and perform multi-step tasks.
      </p>
      <div className="mt-12 grid gap-8 border-t border-rule pt-10 md:grid-cols-3">
        {concepts.map((c) => (
          <div key={c.title}>
            <h3 className="font-display text-xl font-semibold">{c.title}</h3>
            <p className="mt-3 text-sm text-muted">{c.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
