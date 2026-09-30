# Visual & Responsive QA

September 28, 2026. Companion to the [Muse Explained User-Flow Review](user-flow-review.md).

## Status: NOT YET VERIFIED

Browser discovery returned no connected browser. No live screenshots, click tests, viewport measurements, VoiceOver sessions, or participant observations were obtained. This document is the executable release checklist, not evidence that those checks passed. The information architecture and footer design remain frozen unless testing identifies a concrete defect.

## Viewport matrix

Run the route coverage below at each size. Record browser/version, route, screenshot, actual result, and any defect before changing a row to PASS.

| Device | Viewport | Status |
| --- | --- | --- |
| Desktop | 1440 × 900 | Pending |
| Desktop | 1512 × 982 | Pending |
| Desktop | 1920 × 1080 | Pending |
| Tablet | 1024 × 1366 | Pending |
| Tablet | 834 × 1194 | Pending |
| Mobile | 390 × 844 | Pending |
| Mobile | 393 × 852 | Pending |
| Mobile | 430 × 932 | Pending |

Cover Overview, Explore and all seven products, Use cases and all ten details, Examples and all ten details, How it works and deeper architecture, Safety, Updates, old Models/Projects/Security URLs, the Resources redirect, and an invalid URL. Include both footer dialogs on long and short pages.

Desktop: check content width, whitespace, hero balance, illustrations, card heights, footer density, and consistency. Tablet: inspect navigation breakpoint, cramped columns, grids, and illustration scaling. Mobile: check horizontal overflow, text wrapping, touch targets, vertical walkthroughs, and footer/dialog scrolling. At every size, confirm source links remain accessible through the original footer layout.

## Interaction and keyboard checks — pending

Use Tab, Shift+Tab, Enter, Space, and Escape with no mouse. Links activate with Enter; buttons and native disclosures support their expected keyboard behavior. Focus must remain visible and reachable.

| Flow | Expected result |
| --- | --- |
| Skip link → main | Focus reaches the main content, including the 404 page. |
| Menu → destination → Back | Destination opens, menu closes, current section remains correct. |
| Menu → a navigation link → Escape | Menu closes and focus returns to Menu. Explicit focus restoration added; runtime check pending. |
| Search button → query → result → Back | Results are understandable and destination matches selection. |
| Search → Escape / close | Focus returns to its opener. Test button and keyboard-shortcut openings. |
| Open Search while Menu is open | Menu closes; focus moves into Search. |
| Search no matches → revise query | Empty state is clear and recovery works. |
| Example and Update filters | Results match the selection, state is announced, and reset works. |
| Every example walkthrough | Each stage changes explanatory content and exposes selected state. |
| Technical disclosures | Expanded state and revealed content are reachable and understandable. |
| Each footer dialog → close / Escape | Focus stays in the open modal, returns to its opener, and long content scrolls. |
| Footer source link | Original material opens as intended; returning preserves usable navigation. |

Inspect focus styling and order rather than inferring them from ARIA attributes. Exercise browser Back/Forward and direct deep links as well as in-site navigation.

## Screen reader sanity check — pending

Use VoiceOver on macOS or iOS. Record platform/browser versions. Check page titles, main landmark, heading hierarchy, distinct navigation labels, useful image alt text, active filters, selected walkthrough steps, expanded/collapsed states, search result announcements, modal names, and focus restoration. Structural checks alone do not establish accessibility conformance.

## Unassisted reading test — pending

Recruit someone unfamiliar with Muse. Give no navigation hints. Ask in order:

1. What is Muse?
2. What is the difference between Spark and Glimmer?
3. Show me something Muse can actually do.
4. How does Muse work?
5. What happens when Muse wants to do something sensitive?

Record their answer, path, hesitation, repeated sections, and any misleading inference for each question. Success means they locate and explain the answer without coaching, distinguish a model from a product, and understand approval boundaries. No participant has performed this test; an agent reading the copy is not a substitute.

## Release gate

Complete all viewport, interaction, focus, screen-reader, and reading checks; fix concrete defects and retest the affected flows. Attach actual evidence before marking this report PASS. Release readiness remains conditional.
