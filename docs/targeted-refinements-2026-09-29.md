# Targeted refinements — September 29, 2026

Implementation follow-up to the [full user-flow audit](full-app-user-flow-audit-2026-09-29.md). The audit remains a record of the previous state; the changes below address its confirmed content and selection issues.

## Completed

- Search uses a curated local index, word matching with a partial final word, question aliases, exact-match ranking and deduplicated destinations. Result groups follow their best-ranked match, so a concept can appear before incidental product mentions.
- Search includes product specifications and safety descriptions. “What is Muse” reaches Overview, “what can Muse do” reaches Use cases, “privacy” reaches Safety, and “approval”/“permissions” reach the approval section. Muse/Spark/Glimmer/Code exact matches rank first.
- Pricing searches point to the existing advertised Voice transcription specification when relevant. Products with no documented price in the guide point to the existing footer resources, with an explicit instruction to check current terms. “Free” no longer matches hands-free devices as a pricing answer. No AI search service or invented prices were added.
- Overview distinguishes the personal Muse experience from the wider model/tool family within its existing explanation. A trip-itinerary request makes that distinction concrete. The Muse product's existing scenario now follows the supplied bookings through preparation, review of consequential changes, and a proposed itinerary.
- Product examples and related links are explicitly curated. Muse Code features Parallel Work Across Git Worktrees and Scheduled Monitoring. Spark links directly to Code and software-development tasks; Glimmer links to local tasks and its existing example; Image connects to image tasks and the qualified Video preview.
- Video discovery and detail pages show Preview. Glimmer shows Open weights. Device discovery/detail pages show Announced. No unsupported Available or Rolling out states were assigned.
- Inline definitions explain API, runtime, inference, open weights, tokens, quantization and Git worktrees. The explanation remains visible without tooltips.
- Media is renamed Vision & Voice to match the current examples.
- Personal/business task pages identify their monitoring example as a developer workflow requiring a running Muse Code session, rather than consumer reminders.
- Safety explicitly limits the documented controls to the applicable Meta Muse product; local models, custom tools and third-party integrations can have different boundaries.

No new content pages, homepage sections, duplicate navigation blocks, or footer redesign were introduced. Sources remain in the footer. The removed homepage/footer updates entrances remain removed.

## Validation

`npm run check:user-flow` covers 22 expected search rankings, normalization, partial queries, empty/no-match states, duplicate results, internal-only destinations, Code-specific examples, and valid editorial relationships. `npm run check:seo` checks the existing 34 canonical pages and indexing rules.

TypeScript, lint and the webpack production build pass. The generated-page audit covers 40 HTML routes, 489 internal-link occurrences and 92 image occurrences. Route, anchor, asset and footer-only source checks pass, with no repeated main-content destinations or self-links. Rendered HTML checks confirm the Code associations, Voice pricing anchor, availability labels, trip scenario, Vision & Voice filter, monitoring handoffs and Safety scope statement.

These checks establish content and implementation behavior; they do not replace the pending live interaction and reading tests.

## Pending browser-only work

Browser selection was retried and still reported no available browser. Following the request to reproduce before redesigning, these behaviors were not changed or marked passed:

- Updates → Models filter → Search → Connect fragment visibility and scrolling.
- Dynamic-detail 404 recovery after client rendering, and with delayed/unavailable JavaScript.
- Mobile walkthrough selection, diagram legibility at 390/430px and 200% zoom.
- Keyboard navigation, dialog focus restoration, VoiceOver and unfamiliar-user comprehension.

The raster architecture diagram was not redrawn without the requested visual verification. These remain release-validation tasks in [Visual & Responsive QA](visual-responsive-qa.md).
