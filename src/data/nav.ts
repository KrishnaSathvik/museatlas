export const navLinks = [
 { href: "/", label: "Overview" },
 { href: "/explore", label: "Explore" },
 { href: "/how-it-works", label: "How it works" },
 { href: "/use-cases", label: "Use cases" },
 { href: "/examples", label: "Examples" },
 { href: "/safety", label: "Safety" },
] as const;

export type PlatformItem = {
  id: string;
  name: string;
  summary: string;
  href: string;
  tags?: string[];
};

export const platformItems: PlatformItem[] = [
  {
    id: "spark",
    name: "Muse Spark",
    summary: "General-purpose AI model designed for agent and coding workflows.",
    href: "/explore/spark",
    tags: ["Coding", "Reasoning", "Tools"],
  },
  {
    id: "glimmer",
    name: "Muse Glimmer",
    summary: "Open-weight model designed for local agent workflows.",
    href: "/explore/glimmer",
    tags: ["Local AI", "Tool use", "Open weights"],
  },
  {
    id: "code",
    name: "Muse Code",
    summary: "Coding and software-development workflows powered by Muse Spark.",
    href: "/explore/code",
    tags: ["Development", "Terminal"],
  },
  {
    id: "image",
    name: "Muse Image",
    summary: "Image generation and editing through Meta's Model API.",
    href: "/explore/image",
    tags: ["Images", "Editing"],
  },
  {
    id: "voice",
    name: "Muse Voice",
    summary: "Speech recognition and voice input for applications and agents.",
    href: "/explore/voice",
    tags: ["Speech", "Transcription"],
  },
  {
    id: "video",
    name: "Muse Video",
    summary: "Video-generation technology in Meta's Muse media family.",
    href: "/explore/video",
    tags: ["Video"],
  },
];

export const platformDiagram = {
  center: "Muse",
  columns: [
    {
      title: "Models",
      items: [
        { label: "Spark", href: "/explore/spark" },
        { label: "Glimmer", href: "/explore/glimmer" },
        { label: "Image", href: "/explore/image" },
        { label: "Voice", href: "/explore/voice" },
      ],
    },
    {
      title: "Software",
      items: [
        { label: "Code", href: "/explore/code" },
        { label: "API", href: "/resources" },
        { label: "Tools", href: "/how-it-works#tools" },
      ],
    },
    {
      title: "Experiences",
      items: [
        { label: "Muse app", href: "/#what-is-muse" },
        { label: "Glasses", href: "/updates" },
        { label: "Voice mode", href: "/explore/voice" },
      ],
    },
  ],
} as const;
