# Muse Atlas — current-source content audit

Reviewed September 29, 2026. Scope: compare the current local product data, use cases, Safety, Updates and search behavior with freshly retrieved official publications. This is a content audit, not a live product, regional-access, API or browser test. The findings below describe the pre-fix state; the user subsequently authorized the implementation recorded next.

## Implementation follow-up

Applied the recommended edits to existing pages: qualified device access and removed unverified Voice attribution; added consumer privacy and API-tier distinctions; added the Small Business update and campaign scenario; clarified Muse goals, memory, activity and Artifacts; added dated pricing and regional access notes; documented Spark audio and Code platform/default-model caveats; added Glimmer context and Image references/grounding. Pricing search now distinguishes consumer, CLI and API specifications. Sources remain in the footer and homepage product cards remain badge-free.

Validation: typecheck, lint, SEO and search/relationship tests passed. Production build passed with network access for the Google Font download. Rendered checks confirmed the revised Safety, Spark, devices and Updates content, new product specifications, no external source links in those page bodies, and the unchanged badge-free/no-news homepage. Product accounts and live integrations were not exercised.

## Verdict

The main product distinction remains sound. The app needs targeted corrections and useful context, not more navigation or a larger page catalogue. Highest priorities are device attribution, privacy, and the new business announcement. The earlier September 28 source report is historical; this report adds newer evidence and closes its Spark release-date gap.

## Priority findings

### 1. Correct device availability and voice attribution

`src/data/use-cases.ts`, `smart-devices`: the summary reads as a usable current offering, and its product list connects Muse Voice to the device workflow. The existing Announced badge does not fully correct that implication. Describe the announced direction in the prose and remove the implied implementation relationship unless Meta documents it. Connect describes glasses access as forthcoming and Charm as awaiting further detail. [Connect recap, September 24](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/).

The speech-to-text product should remain distinct from conversational voice. [Speech documentation](https://dev.meta.ai/docs/speech-to-text).

### 2. Expand privacy within the existing Safety page

`src/components/explore/SecurityPage.tsx` and `src/data/security-updates.ts` focus on runtime boundaries. Explain training opt-out, disconnecting services, reviewing activity and forgetting saved information. Attribute these to Meta's consumer product. Distinguish the currently described Secure VM from Confidential VM, which the launch post presents as a future feature; do not imply Meta cannot access current VM data. [Consumer launch, September 8](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/).

Separately explain API Standard versus Contributor data use on Spark/Safety. These are different policies from consumer settings. No-training does not itself establish zero retention. [API pricing and tiers](https://dev.meta.ai/docs/pricing-rate-limits).

### 3. Incorporate today's Small Business announcement

The existing Updates list stops at Connect. Add the September 29 announcement there and update the existing Organize work use case with a concrete campaign or connected-business example. Meta describes new skills and connectors inside Muse, including business accounts and tools such as Shopify and QuickBooks. This does not require an eighth product-family card. The announcement also establishes consumer availability in the US and Canada; avoid presenting that as worldwide access. [Small Business announcement](https://about.fb.com/news/2026/09/introducing-muse-small-business/).

### 4. Explain the consumer experience more concretely

`src/data/products.ts` and `src/data/product-stories.ts` remain abstract for newcomers. Add brief explanations within existing sections of background goals, editable memory, activity history and interactive outputs called Artifacts. A single example of a goal becoming a reviewable itinerary/dashboard would explain more than another generic capability list. [How We Designed Muse](https://introducing.muse.ai/).

### 5. Replace the incomplete pricing/search experience

`src/lib/search.ts` sends generic pricing queries to Voice because it is the sole product with a price specification. Spark and Code queries say pricing is not established here. That is a content gap, not evidence prices are unavailable publicly.

Official published API rates at review: Spark Standard input/output $1.25/$4.25 per million tokens; Contributor $0.10/$0.20, with different data-use terms; Muse Image $0.01 per generated image; transcription $0.18/hour. Summarize the billing models with a checked date in existing specifications and link the source through the footer. Do not mix consumer plans, CLI subscriptions and metered API billing. [API pricing](https://dev.meta.ai/docs/pricing-rate-limits).

Code help lists $5/$15/$50 monthly tiers and says other API keys remain pay-as-you-go; benefits and availability vary by region. A short billing note is more useful than a new pricing page. [Muse Code subscriptions](https://dev.meta.ai/help/subscriptions/what-is-a-muse-code-subscription).

If prices are added, generalize the search hint: it currently appends “advertised for transcription” to every priced product.

### 6. Add a small Spark limitation and handle inconsistent docs

The model catalogue confirms Spark 1.3 and its 1,048,576-token context. It warns audio understanding in 1.3 is not fully supported. Add that caveat to the existing limitations. Standard/Contributor eligibility also matters for reasoning options. SAM is in the API catalogue but is not a Muse-branded family member; its omission does not warrant expanding this guide. [Model catalogue](https://dev.meta.ai/docs/models).

Code's landing page still names 1.2 as its default and describes build/platform-dependent workflow features. Avoid claiming all installations use 1.3 by default; also qualify advanced workflows and Windows differences. [Muse Code documentation](https://dev.meta.ai/docs/muse-code).

## Claims that still hold

- Spark 1.3's September 2 release is now supported by a directly dated official announcement, replacing the earlier indirect events-index evidence. [Research announcement](https://research.meta.ai/blog/introducing-muse-spark-1-3).
- Glimmer remains a roughly 30B, Apache-2.0, locally deployable text/image model. The card states August 2026 and 131,072+ context length. The latter is an optional useful spec, with runtime/memory qualifications. [Official model card](https://huggingface.co/meta-models/Muse-Glimmer-30B).
- Muse Image generation, editing and conversational refinement remain supported. Optional useful additions: multiple reference images and automatic grounding. [Image guide](https://dev.meta.ai/docs/image-generation).
- Voice's existing transcription-only explanation and turn-level timing distinction remain appropriate. [Speech guide](https://dev.meta.ai/docs/speech-to-text).
- The July 7 media announcement distinguishes Image launch from Video preview. This pass did not establish a newer public Video API; retain qualified detail-page language even though homepage badges were removed. [Media announcement](https://ai.meta.com/blog/introducing-muse-image-muse-video-msl/).

## Minimal implementation scope

Update the existing Muse, Spark, Code, Image, Safety, business-use-case, device-use-case and Updates content. Correct pricing search destinations/hints after specifications are added. Add new official sources to the existing footer resource collection. Preserve the current navigation, footer design, badge-free homepage family row and absence of a homepage What's new section.

## Limits and unresolved evidence

- `ai.meta.com/muse/` returned no extractable text this time; findings use accessible official launch/design publications instead.
- `security.muse.ai` could not be fetched because of an authorization/robots error. Its full current architecture was not reverified; do not claim otherwise.
- Code's default-model text conflicts with newer model guidance. Confirm installed behavior before making a universal default claim.
- Account eligibility, regional rollouts and actual connector access were not authenticated or exercised.
- Ten recipe workflows were not rerun or individually reaudited here. Prior documentation review is not execution evidence.
- No claim that every sentence or outbound URL has been independently verified; this pass prioritized central product claims and material gaps.
