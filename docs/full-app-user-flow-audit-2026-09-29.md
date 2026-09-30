# Muse Explained — full app user-flow audit

Reviewed September 29, 2026. Audit only; no application code, content, navigation or footer design was changed during this audit.

Subsequent implementation: see [Targeted refinements](targeted-refinements-2026-09-29.md) for corrections made after this snapshot and the remaining live-QA limits.

## Overall assessment

The site has a coherent structure and useful explanations. A motivated visitor can learn the product family, find practical task scenarios, compare hosted Spark with local Glimmer, and understand why permissions and review matter. The use-case pages are particularly effective because they connect a request to steps and an expected result.

It is not yet reasonable to say it is clear to **anyone** or that every interaction works. A nontechnical newcomer still encounters an abstract introduction to the consumer Muse experience, weak search matching, some misleading example associations, and technical vocabulary that assumes prior knowledge. Live browser interaction and participant comprehension have not been verified.

The next work should be targeted corrections to the existing experience, not another information-architecture redesign or a larger content library.

| Area | Assessment | Evidence boundary |
| --- | --- | --- |
| Overall information architecture | Coherent | Content and route review |
| Understanding what Muse is | Partially successful | Platform explanation is clearer than the personal-agent explanation |
| Understanding practical capabilities | Strong, with availability caveats | All ten use-case pages reviewed |
| Distinguishing products | Mostly successful | Spark/Glimmer comparison is useful; diagram and related-link issues remain |
| Finding an answer through navigation | Good baseline | Routes and links resolve; some next steps are generic |
| Finding an answer through Search | Needs improvement | Executed current matching logic against 24 queries |
| Page and asset integrity | Pass for checked content routes | HTTP responses and HTML/asset checks |
| Browser interaction and accessibility | Not verified end to end | No connected browser available |
| Comprehension by an unfamiliar person | Not tested | Expert walkthrough is not participant evidence |

## Scope and verification

Reviewed all **34 canonical content pages**: seven main/index pages, seven products, ten use cases, and ten examples. Reviewed shared navigation, Search, footer dialogs, example/update filters, walkthrough controls, advanced disclosure, redirects, and recovery routes. Read the underlying scenario/step content as well as the rendered initial state. Inspected the family and main architecture diagram image files directly; this does not establish how they look at a particular viewport.

Evidence obtained in this pass:

- All 34 canonical pages returned HTTP 200 from the running local app.
- Six legacy-entry checks reached the expected canonical page or footer: Models index/detail, Projects index/historical detail, Security, Resources.
- Four invalid URLs returned HTTP 404: an unknown top-level URL and unknown product, example, and use-case slugs.
- Across canonical-page responses, **483 internal-link occurrences** and **92 image occurrences** passed route/fragment/asset checks. All images have alt attributes; this checks presence, not the quality of every description.
- Each canonical page has one H1 and a main landmark with the skip-link target.
- No duplicate destinations within main-content links, main-content self-links, or external source links outside the footer were found.
- All ten walkthroughs have descriptions matching their step counts; use-case example references resolve.
- The existing SEO regression checks pass for all 34 canonical pages.

Important limits:

- Browser selection failed and discovery returned no connected browsers. No desktop/mobile screenshots of the running app, clicks, focus-restoration tests, keyboard-only sessions, or VoiceOver sessions were performed.
- HTTP checks verify responses, not client-side interaction or whether a person notices and understands a control.
- Search results below come from executing the current search-matching code with the current data, not typing into the browser.
- Filter membership and selection logic were inspected/evaluated; interactive filtering and Back/Forward state behavior still need a browser.
- No real unfamiliar participant took the reading test. No new factual verification of Meta’s external product claims or exhaustive external-link availability testing was performed; see the separate content/source report.

## Newcomer journeys

| Question or goal | Reviewed path | What succeeds | What remains unclear |
| --- | --- | --- | --- |
| What is Meta Muse? | Overview → Explore → Muse | Establishes a family of models, software and tools | The personal agent versus the family name is not explicit enough early on; Muse’s own scenario is generic |
| What can it do for me? | Overview → Use cases → task | Specific requests, steps, outcomes and caveats | Homepage emphasizes technical tasks; personal/work organization is only on the full use-case index |
| Which product do I need? | Explore → product → comparison/related content | Clear hosted/local split; separate media/software roles | No simple early distinction between using a ready-made product and building with a model/API |
| Show me an example | Use case → example → walkthrough | Existing workflows have explanations and limits | Muse Code’s related examples are selected by category, not demonstrated Code usage |
| How does it work? | How it works → architecture → advanced details | Separates model reasoning, software execution and controls | Diagram says “Muse / Spark”; some terms are unexplained |
| Can I use it privately on my computer? | Glimmer → local AI → local code review | Local inference and tool/network boundaries are explained | Hardware section explains factors but cannot answer whether a specific machine is suitable |
| Can it make images or understand speech? | Image/Voice → task/scenario | Image refinement and speech-to-text boundaries are clear | “Voice” is broader than the precise model name; Media filter includes screenshot debugging |
| What happens before a sensitive action? | Safety → approval section | Concrete examples and permission choices, plus risk caveat | Some general scenario wording sounds more absolute than configurable approvals |
| Where do I start using the real product? | Product → footer resources | Official material exists in the required footer location | There is no concise handoff explaining which existing footer resource fits consumer, developer or local setup |
| Can I recover from an old/bad link? | Legacy route or invalid URL | Redirects resolve and invalid paths return 404 | Dynamic-detail 404 recovery needs browser validation; see F10 |

## Findings, ordered by impact

P1 = important to the site's educational purpose. P2 = targeted improvement or an interaction concern to verify. “Confirmed” means the stated content/logic/output was observed; inferred user impact is identified separately.

### F01 — P1: Search misses the questions this guide is supposed to answer

**Confirmed matching behavior.** Search uses a literal substring against selected fields. It does not search all visible page copy, product specifications, or safety descriptions. Concept matching uses labels only. [Search implementation](../src/components/layout/CommandPalette.tsx)

| Query | Current result |
| --- | --- |
| `what is muse` | No results |
| `what can muse do` | No results |
| `privacy` | No results, despite the Safety page's title and content |
| `pricing` | No results, despite Voice's displayed pricing specification |
| `approval` | Four results, but not the Safety permissions section |
| `permissions` | Includes the Safety permissions section |
| `free` | Device use case, from “hands-free”; not a cost answer |
| `price` | Personal tasks, from price-monitoring content; not product pricing |
| `Muse` | 32 matches; the exact Muse product is sixth in the Products group |
| `Spark`, `Glimmer`, `email`, `local`, `image generation` | Useful matches exist |

**Impact:** a newcomer may conclude the guide lacks information that is already present, or misread an incidental substring match as an answer.

**Suggested correction:** index the relevant existing descriptions/specifications, add a small set of aliases for the guide’s central questions, and rank exact product/concept matches first. No AI search service is needed. Do not make searches for install/cost return invented answers; point to the existing official-resource path where appropriate.

**Acceptance:** the first three questions above reach Overview, Use cases and Safety respectively; approval reaches permissions; exact Muse ranks before incidental mentions; cost words do not imply that “hands-free” means free pricing.

### F02 — P1: The consumer Muse experience is less concrete than the platform explanation

**Confirmed copy; inferred comprehension risk.** The hero says “The AI, the software,” the definition says models and software help complete a task, and the Muse product headline says “One place to bring a goal, context and tools together.” Its illustrative scenario is Request → Prepare → Approve → Result without a specific everyday task. The clearest personal scenarios already exist elsewhere. [Overview](../src/app/page.tsx), [product stories](../src/data/product-stories.ts), [personal/work scenarios](../src/data/scenarios.ts)

**Impact:** a visitor may understand that Muse involves AI without understanding whether it is an assistant they use, a model they download, or software they must build. The same name is used for the family and consumer experience.

**Suggested correction:** tighten the existing opening definition to distinguish the family from the personal-agent product, and reuse one existing personal/work scenario in the Muse explanation. Explain the difference between a ready-made experience, a hosted model/API, and a self-managed local model in plain language. This does not require another page or another group of buttons.

**Acceptance:** an unfamiliar reader can describe the personal product in one sentence and explain why using it differs from running Glimmer or integrating an API.

### F03 — P1: Muse Code's “Real examples” selection implies an association the page data does not establish

**Confirmed selection.** The Code branch selects the first two projects categorized as software development. The result is Browser-Based Website Development and Iterative Game Development. Their displayed stacks identify Spark and browser tooling, not Muse Code. Meanwhile, existing Scheduled Monitoring and Parallel Work Across Git Worktrees explicitly name Muse Code. [Selection logic](../src/components/models/ModelDetail.tsx), [project data](../src/data/projects.ts)

**Impact:** readers can mistake a general Spark-based development workflow for evidence of a specific Muse Code implementation. It also gives Spark and Code overlapping featured examples after the copy carefully distinguishes the two.

**Suggested correction:** use explicit product-to-example relationships and select the existing Code-specific workflows. Generic related patterns can be labeled as such if retained.

**Acceptance:** every example presented as a Code example has a supported Code association; the available Code-specific material is reachable from Code.

### F04 — P2: Availability qualifications arrive later than some discovery cards

**Confirmed.** The homepage lists Video alongside other products with “Explore moving images,” without identifying it as a preview. The Video detail page is appropriately qualified, and the Explore family diagram already says “Media preview.” Device scenarios explain rollout limits lower on their page. [Homepage](../src/app/page.tsx), [Video data](../src/data/models.ts), [device scenarios](../src/data/scenarios.ts)

**Impact:** a skimming visitor may assume equal current availability before reaching the caveats.

**Suggested correction:** use the existing preview/availability wording at the relevant entry points. Preserve the qualified detail text; do not invent a current rollout status.

### F05 — P2: Some related links are generic rather than chosen for the current learning task

**Confirmed.** The non-comparison product branch takes the first two models from a fixed Spark/Image/Voice list. Code and Muse therefore link to Spark and Image; Voice also gets Spark and Image. Spark's comparison links to Glimmer but does not link directly to Code despite saying it powers Code. [Product relationships](../src/components/models/ModelDetail.tsx)

Safety contains no main-content onward link, and How it works ends with Code as its only main-content destination. Global navigation still makes all sections reachable; these are contextual-navigation weaknesses, not broken links.

**Suggested correction:** choose a small number of explicit, relevant relationships from the content already present. Replace weak links rather than adding a large repeated navigation block. Keep global navigation and useful recovery links.

### F06 — P2: Some beginner-facing terms require technical background

**Confirmed language.** “Hosted frontier model,” “open-weight multimodal,” “distilled,” “inference,” “runtime,” “quantization,” “tokens,” “API,” and “Git worktrees” appear without consistent short definitions at first use. The Glimmer hardware heading explains considerations rather than an actionable hardware compatibility answer. [Models](../src/data/models.ts), [Glimmer section](../src/components/models/ModelDetail.tsx)

**Suggested correction:** add brief inline explanations where the term matters. For example, define a runtime as the software that runs the model. Keep exact technical specifications for interested readers; do not invent a universal hardware minimum. If compatibility is not established, say what must be checked in the footer documentation.

### F07 — P2: An active Updates filter can hide a Search destination

**Confirmed code path; browser reproduction pending.** Updates renders only the active category. Search independently links to every update’s fragment. There is no hash-based filter reset or reveal logic. [Updates](../src/components/explore/UpdatesPage.tsx), [Search](../src/components/layout/CommandPalette.tsx)

**Reproduction to run:** open Updates → select Models → open Search → search Connect → select the Connect announcement. If the page instance remains mounted during the same-path hash navigation, the active Models filter excludes the target article, so the destination ID is absent. The filter state would need to reset/reveal the item.

The Updates route remains useful to Video/device detail links even though its homepage/footer entry was intentionally removed. This audit does not recommend restoring those removed buttons.

### F08 — P2: Mobile walkthrough selection may change content out of view

**Confirmed structure; viewport impact unverified.** At widths up to 760px, all step buttons stack before the one explanatory panel. Seven-step examples put a substantial list above the changing explanation. Clicking a step only sets state; there is no scroll or focus movement toward the panel. [Walkthrough](../src/components/guide/ExampleJourney.tsx), [styles](../src/app/globals.css)

**Impact to test:** a person taps an early step, sees the selected style change, and misses the explanation below the screen. Screen-reader live announcements do not establish sighted mobile usability.

**Suggested correction if reproduced:** bring the active explanation closer to its selection or offer a predictable view of the changed panel. Preserve direct step selection and Previous/Next controls: they support different useful reading behaviors.

### F09 — P2: Diagrams need a mobile legibility check, and one diagram weakens a key distinction

**Confirmed assets/CSS; viewport impact unverified.** The family and architecture visuals contain rasterized text. They scale to container width and have no dedicated enlarge control. The main architecture image groups “Muse / Spark” in one reasoning box and is reused on Muse, Spark and Code pages. [Diagram renderer](../src/components/guide/DiagramImage.tsx), [architecture image](../public/diagrams/architecture-main.png)

**Impact:** small diagram labels may be hard to read on a phone; the shared Muse/Spark label can blur the product/model distinction that the surrounding prose teaches.

**Suggested correction:** test actual phone sizes and 200% zoom. Keep the nearby text explanations and meaningful alt. Clarify the model/application distinction in the relevant caption or visual. Do not redesign the entire diagram system without observing an actual legibility problem.

### F10 — P2: Unknown detail pages return 404, but immediate HTML recovery is incomplete

**Confirmed HTTP/HTML output; JavaScript recovery unverified.** The unknown top-level route includes the custom main content and recovery links in its initial HTML. Unknown product, example and use-case slugs return 404 but have no parsed main, H1 or links in their initial HTML, in both the development server and production build. Custom recovery content is present in serialized framework data.

**Implication:** correct status codes are verified; a useful recovery screen without client rendering is not. This is not evidence that the hydrated browser screen is blank. It is a progressive-rendering concern and an explicit browser test case. [Dynamic metadata/not-found paths](../src/app/explore/[slug]/page.tsx), [recovery page](../src/app/not-found.tsx)

**Suggested correction if needed:** ensure the existing recovery screen is rendered reliably for invalid detail slugs, including when JavaScript is delayed or unavailable. No new error-page design is needed.

### F11 — P2: “Media” combines input understanding with media creation

**Confirmed filter membership.** The Media filter contains Screenshot Bug Fixing and Voice-Controlled Application. Screenshot debugging uses visual input to repair code; it does not demonstrate Muse Image generation. Research is correctly omitted because it has no examples. [Example filters](../src/components/projects/ProjectsExplorer.tsx), [categories](../src/data/projects.ts)

**Suggested correction:** use a label that reflects the existing material, or adjust the category assignment. Do not invent an image-generation example to populate a filter.

## Page-by-page coverage

“Clear” below is an editorial judgment, not a participant-tested usability pass. Every listed page returned 200.

### Main pages

| Page | Assessment |
| --- | --- |
| Overview `/` | Concise, useful product/task entrances; improve consumer definition and Video preview cue. The three-step and four-step summaries partially repeat one another but are short and serve different levels of explanation. |
| Explore `/explore` | Coherent product grouping; clear descriptions and one destination per product section. The overview labels deliberately do not duplicate those links. |
| Use cases `/use-cases` | Strong task-first entry. Eight main cards plus two secondary entries cover all ten tasks without duplication. Personal and work organization are less prominent from home, but reachable. |
| Examples `/examples` | Useful workflow directory with ten entries and meaningful previews. Media label needs adjustment; filters overlap legitimately. |
| How it works `/how-it-works` | Clear distinction between reasoning, execution and controls; advanced material stays optional. Coding dominates the example and final destination. |
| Safety `/safety` | Accessible organization around workspace, accounts, approval and outside information; useful hostile-webpage example and risk caveat. Does not establish all local/custom tools have consumer-product protections. A concise scope reminder would help. |
| Updates `/updates` | Short dated timeline; still reachable from relevant detail pages and Search. Check filter/fragment interaction; no need to restore removed promotional entrances. |

### Product pages

| Page | Assessment |
| --- | --- |
| Muse `/explore/muse` | Roles and controls are present; needs a concrete personal task and clearer family-versus-product definition. |
| Spark `/explore/spark` | Capabilities, scenario, comparison and specifications form a useful explanation. Define technical terms and improve the direct Code connection. |
| Glimmer `/explore/glimmer` | Hosted/local comparison and network cautions are helpful. Hardware section is honest but not a machine-specific eligibility answer; define runtime/inference/quantization. |
| Code `/explore/code` | Repository inspection, edits, tests and review are concrete. Related examples and generic Image connection undermine otherwise clear positioning. |
| Image `/explore/image` | Prompt → generation → editing → review is clear. Correctly discloses the absence of a dedicated implementation example and the illustration's origin. |
| Voice `/explore/voice` | Strong separation of transcription from application reasoning and speech generation. “Voice Transcribe” would be more precise wherever a shorter “Voice” label risks confusion with conversational voice. |
| Video `/explore/video` | Proper preview and access qualifications; storyboard is labeled illustrative. Preserve this honesty and carry a short preview cue to discovery cards. |

### Use-case details

| Page | Assessment |
| --- | --- |
| Software development | Concrete requests and outputs; relevant products/examples. Checkout repetition across Spark/Code/task pages is understandable when each keeps its distinct purpose. |
| Research | Clear compare/read/research scenarios and source-quality caveats. Honest absence of a dedicated example. |
| Computer automation | Helpful observe/act/verify model with review boundaries. Appropriate examples and Safety reference. |
| Local AI | Good selected-file and offline-configuration explanation; appropriately warns that local inference does not isolate tools. |
| Voice | Separates audio transcription from application actions. Illustrative confirmation behavior should not be confused with the chess recipe's automatic accepted commands. |
| Images | Clear generation and refinement tasks; no fake implementation association. |
| Business workflows | Familiar drafts, briefings and recurring checks. The linked monitoring example is a Code-session recipe, so the handoff should make that distinction explicit. |
| Personal productivity | Useful planning/travel/monitoring scenarios. Same consumer-task-to-Code-monitoring distinction as business workflows. |
| Smart devices | Scenarios and rollout caveats are present; avoid implying every illustrated scenario is currently delivered on all devices. |
| Multi-agent | Clear division, coordination, integration and review pattern. Some role and Git terms remain developer-oriented. |

### Example details

| Example | Assessment |
| --- | --- |
| Browser-Based Website Development | Good concrete flagship; steps cover running and inspecting the actual result. Seven-step mobile selection needs testing. |
| Iterative Game Development | Distinguishes launch from playtesting and improving game quality. Same mobile walkthrough concern. |
| Multi-Agent Product Studio | Roles and integration are useful; isolation is described conditionally. Technical coordination terms may need short explanations. |
| GitHub Automation | Proposal versus merge distinction is helpful. Correctly avoids presenting the repository-page capture as an execution screenshot. |
| Computer Use on Linux | Simple observe/plan/act/verify loop; meaningful warning about hostile screen content. |
| Local Code Review with Glimmer | Clear local report outcome; no false execution screenshot. “Weaker than Spark on difficult tasks” is broad wording to keep qualified in the separate factual review. |
| Screenshot Bug Fixing | Coherent screenshot-to-code story; belongs primarily to development/visual understanding rather than image generation. |
| Scheduled Monitoring | Important process-running, session and expiry limitations are now explicit. A consumer-user handoff should identify this as a Code example. |
| Parallel Work Across Git Worktrees | Good Code-specific example currently missing from Code's featured pair. Step explanation helps, though the title assumes Git familiarity. |
| Voice-Controlled Application | Deterministic commands and automatic accepted actions are correctly qualified. Rename the final “Confirm” stage to “Check result” if readers interpret it as prior permission; the description already explains the intended meaning. |

## Repetition and unnecessary controls

The recent duplicate-action cleanup holds: no repeated main-content link destinations or self-links were found. There is no reason to remove controls simply because they appear on different pages.

Keep the global navigation, detail back links, example filters, direct step selectors plus Previous/Next, advanced disclosure, Search, and the two footer controls. They serve distinct purposes. Static approval choices on Safety are explicitly labeled as an illustration, not presented as live authorization buttons.

The most worthwhile reduction is conceptual repetition: make each section answer its own question. Product capability lists, task scenarios and workflow steps can coexist if they provide capability, application and sequence respectively. The shared architecture image and generic related-link selection currently contribute less tailored information than those sections.

The footer contains 22 original-resource links in one mixed list. This follows the requested footer-only placement. If users struggle to find the right document, group or clarify labels inside that existing drawer; moving citations back into page bodies or redesigning the footer is not recommended by this audit.

## Accessibility and responsive checks still required

Code provides native links/buttons/dialogs, a skip link, main landmarks, active-navigation markers, pressed filter states, selected-step state, live result/step announcements, and reduced-motion handling. These are good foundations, not a complete accessibility pass.

Run the following in a connected browser:

- Desktop, tablet and mobile at the sizes in [Visual & Responsive QA](visual-responsive-qa.md), plus text zoom.
- Menu → destination → Back; Menu → Escape → focus returns to Menu.
- Search from its button and shortcut → query → result; Escape/close → focus returns to an appropriate opener. Include opening Search while the mobile menu is open.
- Search input focus visibility: it uses `outline-none`; confirm a visible alternative rather than assuming the global focus rule wins.
- Footer dialogs: names, scrolling, keyboard containment, close/backdrop/Escape, opener focus, and external-link return.
- Example filters, all ten walkthroughs, Next/Previous endpoints and the advanced architecture disclosure.
- Updates filter plus same-page Search/fragment navigation from F07.
- Unknown dynamic details with JavaScript enabled, delayed and disabled from F10.
- VoiceOver titles, headings, landmarks, image descriptions, selected states, live changes and recovery paths.

## Real comprehension test

Give the site to someone unfamiliar with Muse and avoid coaching. Ask:

1. What is Meta Muse?
2. What is the difference between Muse, Spark, Glimmer and Code?
3. Show something it could help you do, and explain what result you would expect.
4. Which example is documented, and which scenario is illustrative?
5. What happens if it wants to send a message, buy something or share information?
6. Where would you go to check availability or start using the appropriate product?

Record their answer and route, what they misunderstand, where they hesitate, and whether they recover. A good result is a correct explanation and a sensible next destination without hints—not just reaching a page. No participant results exist yet.

## Recommended order

1. Correct existing Search matching/ranking and the Code example associations.
2. Tighten the consumer-product definition, reuse a concrete personal scenario, and bring preview qualifications to discovery points.
3. Replace generic related links, explain essential terms briefly, and clarify the Media filter and consumer-to-Code handoffs.
4. Reproduce the Updates/fragment issue and verify dynamic 404 recovery in the browser.
5. Complete mobile, keyboard, focus and screen-reader tests, then run the unfamiliar-reader test.

These are improvements to the existing app. The evidence does not call for new pages, additional repeated buttons, restoring “What’s new” on home/footer, or another footer redesign.
