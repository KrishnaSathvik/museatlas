# Muse Atlas sharing images

Six images generated with the built-in ChatGPT image tool using the existing icon and the user's page headings and subtitles. Exported as opaque 1200 × 630 JPEGs for social sharing. Full generation prompts are recorded in `og-image-prompts.json`.

| Page | Asset |
| --- | --- |
| Overview | `public/og/overview.jpg` |
| Explore | `public/og/explore.jpg` |
| How It Works | `public/og/how-it-works.jpg` |
| Use Cases | `public/og/use-cases.jpg` |
| Examples | `public/og/examples.jpg` |
| Safety | `public/og/safety.jpg` |

The six existing page metadata entries use these images for Open Graph and Twitter cards, including descriptive alt text and dimensions. Detail pages retain their relevant existing images. The root metadata uses Overview as its fallback.

These are sharing assets, not new visible page sections. Public sharing previews require deployment and the real domain configured in `NEXT_PUBLIC_SITE_URL`.
