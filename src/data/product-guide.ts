/** Deliberate learning paths, not inferred product associations. */
type RelatedLink = { title: string; href: string; description: string };
type ProductGuide = { examples: string[]; related: RelatedLink[]; task: { label: string; href: string } };
export const productGuide: Record<string, ProductGuide> = {
  spark: {
    examples: ["browser-based-website-development", "iterative-game-development", "multi-agent-product-studio"],
    related: [{ title: "Muse Code", href: "/explore/code", description: "The coding product that connects Spark to repository files, commands and tests." }],
    task: { label: "Explore software-development tasks", href: "/use-cases/software-development" },
  },
  glimmer: {
    examples: ["local-code-review-with-glimmer"], related: [],
    task: { label: "Explore local AI tasks", href: "/use-cases/local-ai" },
  },
  code: {
    examples: ["parallel-worktrees", "scheduled-monitoring"],
    related: [{ title: "Muse Spark", href: "/explore/spark", description: "The model supplying reasoning and coding capabilities inside Muse Code." }],
    task: { label: "Explore software-development tasks", href: "/use-cases/software-development" },
  },
  image: {
    examples: [],
    related: [
      { title: "Muse Spark", href: "/explore/spark", description: "Understands visual inputs and reasons about a brief; distinct from generating an image." },
      { title: "Muse Video — preview", href: "/explore/video", description: "The announced audiovisual direction, with availability still qualified in this guide." },
    ],
    task: { label: "Explore image use cases", href: "/use-cases/images" },
  },
  voice: {
    examples: ["voice-controlled-application"],
    related: [{ title: "Muse Spark", href: "/explore/spark", description: "Can interpret transcript text and plan an action through an application's tools." }],
    task: { label: "Explore voice-input tasks", href: "/use-cases/voice" },
  },
  video: {
    examples: [],
    related: [{ title: "Muse Image", href: "/explore/image", description: "Image generation and editing with documented developer workflows." }],
    task: { label: "Read about the media announcement", href: "/updates#image-video" },
  },
  muse: {
    examples: [],
    related: [{ title: "Muse Spark", href: "/explore/spark", description: "A model behind the experience; the surrounding product supplies connected tools and controls." }],
    task: { label: "Explore personal tasks", href: "/use-cases/personal-productivity" },
  },
};
