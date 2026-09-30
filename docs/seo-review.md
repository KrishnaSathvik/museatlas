# SEO review — existing site

September 29, 2026.

The supplied plan is useful as a technical foundation. This pass applies it to the 34 existing canonical pages: seven indexes, seven products, ten use cases, and ten examples. It adds no articles, guides, comparisons, separate architecture page, search page, category URLs, or new visible navigation. The homepage’s removed updates section remains removed, and sources remain footer-only.

## Implemented

- A single metadata catalogue assigns a distinct title and description to each canonical page. Product titles describe their actual scope; Video remains explicitly a preview. Existing task/example summaries are reused where they already describe the page well.
- Canonical and Open Graph URLs use the configured production origin. Query/filter state does not create a new canonical page. Existing search and filters are client state, so there is no search-results route to mark separately.
- Open Graph and Twitter cards reuse existing relevant diagrams and illustrations, including image alt descriptions. These are editorial visuals, not claims of Muse-generated output. No new graphics or invented publisher/social account details were added.
- A sitemap includes only canonical content routes, with no aliases, fragments, query strings, 404, or fabricated modification dates.
- A robots route advertises that sitemap only when indexing is enabled. Crawling remains allowed so search engines can observe the HTML noindex directive on non-production builds. Robots rules are not access control for private staging.
- Models, Projects, Security, Resources, and historical example slugs permanently redirect to their final destinations. Existing redirects to intermediate legacy URLs were shortened. Canonical example pages now own their implementation rather than importing the legacy route.
- Homepage WebSite schema and BreadcrumbList schema on other content pages describe the existing hierarchy. Existing detail back links remain; no duplicate breadcrumb buttons were added. No invented author, ratings, NewsArticle, FAQ, or AI-product markup.
- Existing headings, descriptive asset names, alt text, and contextual links were retained. The recent removal of repetitive actions was preserved.

## Configuration and release limits

The production domain has not been confirmed. Set `NEXT_PUBLIC_SITE_URL` to the real origin before building. Until then the site stays noindex, canonical URLs and JSON-LD are omitted, and the sitemap is empty. Social images use the local fallback during unconfigured development; production previews require a real domain.

Local builds and Vercel preview/development deployments stay noindex even if a production origin is configured. Set `SITE_NOINDEX=true` for other staging hosts. These settings are evaluated at build time; rebuild after changing them. A public domain configured for a non-Vercel production build is treated as the intended production site unless explicitly disabled.

No deployment, Search Console registration, sitemap submission, analytics integration, or indexing request was performed. Search positions and inclusion in search/AI answers are not guaranteed. The attachment’s competition and domain-ownership claims were not adopted as established facts.

## Validation

`npm run check:seo` verifies all 34 metadata entries, uniqueness of titles/descriptions, existing social assets, canonical/OG consistency, breadcrumb targets and JSON escaping, sitemap coverage, redirect configuration, and production/preview/staging/unconfigured environment behavior. Test domains are isolated fixtures and do not change deployment configuration.

Production build and TypeScript validation pass. All 34 canonical pages render unique titles/descriptions, exactly one H1, social-image metadata, and noindex with no canonical while the origin is unconfigured. Across 40 generated HTML files, 494 internal links and 92 images pass destination/fragment/asset checks. No duplicate main-content destinations, self-links, or external sources outside the footer were found.

Local production HTTP checks confirm 308 redirects for a model detail, historical example slug, Security and Resources; the canonical product returns 200 and an unknown route returns 404. Production-origin metadata and schema are tested with isolated fixtures, not a deployed domain. Browser appearance and live search-engine validation remain separate checks.

## Assessment of the notes

The most useful immediate recommendations are distinct page intent, descriptive metadata, crawlable existing navigation, canonical consolidation, and production indexing controls. Google supports permanent 301 and 308 redirects; Next.js uses 308 for `permanent: true`. [Google migration guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)

Special AI markup or an llms.txt file is not required for Google's AI search features, so neither was added. The existing explanatory content remains the focus. [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)

Before launch, confirm the origin, rebuild with production indexing enabled, inspect the deployed canonical/robots/sitemap responses, and validate the public structured data. Submit the sitemap in an owned Search Console property once deployment and ownership are established.
