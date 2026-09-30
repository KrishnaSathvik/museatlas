# Muse Atlas

A clear technical guide to Meta’s Muse platform — models, how it works, use cases, projects, security and updates.

Independent educational site. Not affiliated with Meta.

## Run locally

```sh
npm ci
cp .env.example .env.local
npm run dev
```

## Production handoff

Use Node.js 24 LTS and a Next.js-compatible Node host. Static-only hosting is not supported by this configuration.

Set these environment variables on the hosting platform **before building**:

```env
NEXT_PUBLIC_SITE_URL=https://www.museatlas.app
SITE_NOINDEX=false
```

```sh
npm ci
npm run typecheck
npm run lint
npm run check:seo
npm run check:user-flow
npm run build
npm run start
```

Development and production builds explicitly use Webpack because this app encountered a font-loader issue with Turbopack. The build needs access to Google Fonts; Next.js then serves the downloaded fonts locally.

Configure the host to redirect the apex domain `museatlas.app` to `www.museatlas.app`, enable HTTPS, and verify the live sitemap, social previews, mobile navigation, search and footer dialogs after deployment. No deployment has been performed from this repository.

See [production readiness review](docs/production-readiness-2026-09-30.md) for validation results and remaining manual checks.

Set `NEXT_PUBLIC_SITE_URL` to the confirmed production origin before building (see `.env.example`). Without it, canonical URLs and structured data are omitted, the sitemap is empty, and pages are noindex. Local and Vercel preview builds are also noindex. For other staging hosts, set `SITE_NOINDEX=true` before building. Changing these values requires a rebuild.

Run `npm run check:seo` to verify metadata, images, structured data, redirects, and indexing configuration. See [SEO review](docs/seo-review.md) for scope and remaining launch checks.

## Navigation

| Page | Purpose |
|---|---|
| Overview | What Muse is and why it matters |
| Explore | Muse, Spark, Glimmer, Code, Image, Voice, Video |
| How It Works | Architecture, tools, memory, computer use |
| Use Cases | What Muse can be used for |
| Examples | Documented implementations and workflows |
| Safety | Permissions, environments, privacy, risks |
| Updates | Releases and announcements |

## Content

Structured content lives in `src/data/`. Primary sources are accessible only through the shared footer and in `docs/research/SOURCES.md`.

## Stack

Next.js 16 · React 19 · Tailwind CSS 4 · TypeScript · Syne + IBM Plex

## Google Analytics and Search Console

Google Analytics uses the site's public GA4 measurement ID `G-Y4EHHM14HF`. The tag loads after hydration on indexable production builds and initializes only on `www.museatlas.app`, keeping local and preview traffic out of the property. Page views use Google's automatic measurement; keep **Enhanced measurement → Page views → Page changes based on browser history events** enabled in the web stream so client-side navigation is recorded. No additional manual page-view handler is installed, avoiding duplicate events.

Search Console ownership uses `/google4ab21dcd5cd8bd84.html`. Keep this file published after verification. Once the deployment containing it is live, choose **Verify** in Search Console and submit `https://www.museatlas.app/sitemap.xml`. Confirm real visits in Analytics Realtime or Google Tag Assistant; a successful build alone does not confirm receipt by Google.

Implementation reference: [Google's page-view measurement guidance](https://developers.google.com/analytics/devguides/collection/ga4/views).
