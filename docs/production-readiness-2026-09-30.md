# Production readiness — September 30, 2026

The application passed the automated production checks below. It is ready for a deployment preview; a fresh browser accessibility and visual walkthrough remains a release check. No deployment was performed.

## Confirmed production configuration

- Canonical origin: `https://www.museatlas.app` (confirmed by the owner).
- Node.js 24 recommended; validated with Node 24.9.0.
- Install: `npm ci`; build: `npm run build`; serve: `npm run start`.
- Hosting must support Next.js / Node, including redirects and image optimization.
- Configure `NEXT_PUBLIC_SITE_URL=https://www.museatlas.app` and `SITE_NOINDEX=false` before building. A missing origin intentionally disables indexing.
- The private local environment remains noindex and is excluded from Git. `.env.example` is tracked.
- Configure HTTPS and apex-to-www redirection at the host.

## Checks passed

- TypeScript, ESLint, SEO fixtures for 34 canonical pages, and 27 search queries plus product relationship checks.
- Production dependency audit: zero reported vulnerabilities (`npm audit --omit=dev`). This is an advisory database check, not a complete security guarantee.
- Production Webpack build completed successfully using the confirmed origin and indexing enabled.
- Live local production server: all 34 canonical routes returned 200, each with one main landmark and one H1, the correct canonical origin, and indexable robots metadata.
- Sitemap contains all 34 canonical routes; robots references the production sitemap.
- 32 unique social-image/icon URLs returned successfully; image optimization returned an image.
- 22 configured redirects returned 308 with the expected destinations; four unknown routes returned 404.
- Rendered HTML audit: 40 HTML routes, 488 internal links and 162 image elements checked; no missing targets, anchors, image files or alt attributes. Source links remained in the footer.
- Credential-pattern scan found no matches in application, content, scripts and text assets. No private environment files, build output, dependencies or local review screenshots are included in Git.

## Fixes in this pass

- Default dev/build scripts use the working Webpack bundler, avoiding the observed Turbopack font-loader failure.
- Package name matches Muse Atlas; minimum Node version and production instructions are recorded.
- Replaced the default framework favicon with the existing Muse Atlas brand icon.
- Search input has a visible keyboard focus outline.
- Search links to update articles use a full navigation so a retained category filter cannot hide the target article.
- Removed local absolute paths from generated-asset provenance files.

## Remaining manual release checks

Browser automation was unavailable in this session. HTTP and rendered-HTML checks do not verify hydration, interactive controls, visual layout, screen-reader behavior or real-device performance. On a deployment preview, check desktop/mobile navigation, search (including an update after filtering), footer dialogs, keyboard focus/Escape, readable headings and zoom. Review social previews on the live domain and run Lighthouse there.

Meta content was researched and corrected on September 29; this pass validated the application rather than repeating that external research. See the research audit for source confidence and access limitations. No authenticated Meta workflow or API integration is implemented or tested by this educational site.

## Repeat production HTTP checks

After building with the production environment and starting on port 3105:

```sh
python3 scripts/check-production.py
```

Use `CHECK_BASE_URL` to target another local port or your deployment preview. Keep the canonical origin in `NEXT_PUBLIC_SITE_URL`. The redirect checks read the local build manifest, so build the matching revision first.
