# Content & Source Verification

Reviewed September 28, 2026. Separate from the [UX review](user-flow-review.md).

## Status: PARTIALLY VERIFIED

The claims below were checked against official Meta product pages, public developer documentation, announcements, model cards, and repositories. “Supported” means the documentation supports the claim; it does not mean the model, API, recipe, or security control was independently exercised. Current regional/account access and every sentence across the site have not been certified. Release readiness remains conditional.

Undated means the page exposes no publication date in the retrieved content. All sources were accessed September 28, 2026; crawl timestamps are not publication dates. Repository links target mutable main branches, not pinned reproduction environments.

## Product claims

| Claim | Primary source | Source date | Verified? | Qualification |
| --- | --- | --- | --- | --- |
| Muse is a personal agent with background work, connectors, and a dedicated cloud environment | [Launch announcement](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/) | September 8, 2026 | Supported | Initial rollout is not a promise of access for every region or account. |
| Secure VM includes an isolated Linux environment and browser | [Muse product page](https://ai.meta.com/muse/) | Undated | Supported | Product architecture description, not an isolation test. |
| Credentials can be used without exposing secrets to the agent; payment flow can use a one-time card | [Muse product page](https://ai.meta.com/muse/) | Undated | Supported | Applies to documented managed flows, not arbitrary tools or all payments. |
| Sensitive actions have allow-once, ongoing permission, and deny controls | [Muse product page](https://ai.meta.com/muse/) | Undated | Supported | Existing user permissions affect when a prompt appears. |
| Sentinel and separate security services mediate tools, network access, and credentials | [Meta security research](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse) | Not established in this pass | Supported | Architectural controls reduce risk; they do not prove immunity to attacks. Confidential VM future plans must not be confused with current isolation. |
| Spark is a hosted model for reasoning, coding, tools, and multimodal understanding | [Spark product page](https://dev.meta.ai/models/muse-spark) | Undated | Supported | Capability descriptions are not accuracy guarantees. |
| Spark identifier is muse-spark-1.3, context is 1,048,576 tokens, base URL is api.meta.ai/v1 | [Developer overview](https://dev.meta.ai/docs/overview) | Undated | Supported | Snapshot of published API specifications, not an authenticated request test. |
| Model API supports OpenAI and Anthropic compatible surfaces, parallel tools, streamed arguments, and cross-turn reasoning | [Developer overview](https://dev.meta.ai/docs/overview) | Undated | Supported | Compatibility does not imply every third-party extension works unchanged. |
| Glimmer has approximately 30B parameters, is distilled from Spark, and uses Apache 2.0 | [Official model card](https://huggingface.co/meta-models/Muse-Glimmer-30B) | Release: August 2026 | Supported; date corrected | Approximate size; inspect license obligations for an actual deployment. |
| Glimmer supports self-hosting with vLLM, SGLang, llama.cpp, or ExecuTorch and is not served through Meta Model API | [Glimmer docs](https://dev.meta.ai/docs/muse-glimmer), [developer overview](https://dev.meta.ai/docs/overview) | Undated | Supported | Self-hosting is an option; other providers may host it. |
| Local use depends on hardware, quantization, and runtime setup | [Official model card](https://huggingface.co/meta-models/Muse-Glimmer-30B), [OSS cookbook](https://github.com/meta-models/meta-oss-cookbook) | Model release August 2026; cookbook undated | Supported | Four-bit weights below 20 GB do not mean every device with that much RAM can run the workload. Setup/downloads may need connectivity. |
| Muse Code plans, edits, and executes tasks with approvals and OS sandbox enabled initially | [Muse Code docs](https://dev.meta.ai/docs/muse-code) | Undated | Supported | Workflows require a supported build and rollout. Some Windows capabilities differ. No local installation was exercised. |
| Image model muse-image-1.0 generates, edits, and refines images over multiple turns | [Image guide](https://dev.meta.ai/docs/image-generation) | Undated | Supported | Responses API supports conversational editing; one-off generation/edit endpoints also exist. |
| Voice model muse-voice-transcribe-1.0 supports streaming/file transcription, speakers, and code-switching at $0.18/hour | [Speech guide](https://dev.meta.ai/docs/speech-to-text) | Undated | Supported at review date | Pricing may change; language coverage and recognition quality vary. |
| Voice provides turn timestamps, not word timestamps; it is speech-to-text, not TTS | [Speech guide](https://dev.meta.ai/docs/speech-to-text), [developer overview](https://dev.meta.ai/docs/overview) | Undated | Supported | A voice application still needs its own action logic and any speech output. |
| Image launched and Video with native audio was previewed | [Media announcement](https://ai.meta.com/blog/introducing-muse-image-muse-video-msl/) | July 7, 2026 | Supported; title clarified | Current Video API/access is not established by that announcement. Removed unsupported September maturity comparison. |
| Connect announced glasses, Charm, connectors, and other Muse directions | [Connect recap](https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/) | September 24, 2026; event September 23 | Supported as announcements | Several features are future-facing; announcement does not establish universal availability. |
| Spark 1.3 announcement date is September 2 | [Meta events index](https://ai.meta.com/events/) | Listed event: September 2, 2026 | Partially supported | Date found in official indexed listing; opening the index redirected to a sign-in page. Retain direct dated announcement evidence before final sign-off. Current product page supports the version and context size. |

## Example claim checks

Source dates below are undated living repository pages. All ten were inspected as documentation, not executed. Walkthrough text is an educational explanation; illustrations and repository pages are not proof that this site ran an example.

| Example | Official recipe | Verified scope / qualification |
| --- | --- | --- |
| Browser-driven web design | [Web design](https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/05_web_design) | Documented build, browser inspection, and iteration. |
| Iterative game development | [Game development](https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/06_iterative_game_dev) | Documented game creation and browser playtesting. |
| Multi-agent studio | [Orchestration](https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/08_multi_agent_orchestration) | Coordinated specialist roles and shared tasks; not a guarantee of conflict-free collaboration. |
| GitHub repository agent | [Repository agent](https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/11_github_repo_agent) | Triage, review, and bug fixing with human controls; not automatic merging. |
| Linux computer use | [Computer use](https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/12_computer_use) | Documented screenshot/click/type loop in a Linux environment. |
| Local code review | [Agent fundamentals](https://github.com/meta-models/meta-oss-cookbook/tree/main/agentic-fundamentals) | Local file review and report-writing pattern; hardware/runtime setup required. |
| Screenshot bug fixing | [Screenshot bug fix](https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/02_screenshot_bugfix) | Screenshot-guided diagnosis and code changes. |
| Scheduled monitoring | [Loop and cron](https://github.com/meta-models/meta-model-cookbook/tree/main/04_muse_code/09_loop_and_cron) | Corrected: Code must stay running; jobs are session-scoped and recurring jobs expire after seven days. |
| Parallel worktrees | [Subagent fanout](https://github.com/meta-models/meta-model-cookbook/tree/main/04_muse_code/06_subagent_fanout) | Separate worktrees and combined validation; merges still need review. |
| Voice-controlled application | [Voice chess](https://github.com/meta-models/meta-model-cookbook/tree/main/06_muse_voice/02_voice_chess_cua) | Corrected: deterministic supported commands; unmatched text rejected, accepted commands act without a separate confirmation prompt. |

## Corrections and source access

Corrected Glimmer's release month from September to August, distinguished the Image launch from the Video preview, qualified Video availability, and corrected scheduling and voice-command limitations. No information-architecture or footer-layout changes were made.

The original ai.developer.meta.com documentation URLs returned sign-in pages. Verified public dev.meta.ai/docs equivalents for overview, Muse Code, Glimmer, image generation, and speech-to-text now replace those source targets. Glimmer's update links directly to its official model card. Source links remain in the footer; this internal verification report does not add citations to product-page content.

## Open release items

- Capture a direct dated Spark 1.3 announcement beyond the indexed event listing.
- Recheck current Video access and region/account-specific availability immediately before release. Preserve qualified wording until established.
- Verify all remaining individual claims and every footer destination, including redirected or gated URLs; this pass is not an exhaustive external-link availability test.
- Pin recipe revisions if reproducibility is required. Published examples were not independently executed.
- Complete the separate [live visual and accessibility checks](visual-responsive-qa.md). Source verification cannot substitute for usability testing.
