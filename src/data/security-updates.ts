export type UpdateCategory =
  | "models"
  | "developer-tools"
  | "muse"
  | "research"
  | "devices"
  | "security";

export type MuseUpdate = {
  id: string;
  date: string;
  title: string;
  summary: string;
  category: UpdateCategory[];
  href?: string;
};

export const updates: MuseUpdate[] = [
  {
    id: "small-business-2026",
    date: "September 29, 2026",
    title: "Muse for Small Business",
    summary: "Meta added business skills and connectors inside Muse, including Facebook and Instagram business accounts and services such as Shopify, Canva and QuickBooks. Connected campaigns and business tasks remain subject to access and approval controls.",
    category: ["muse", "developer-tools"],
    href: "https://about.fb.com/news/2026/09/introducing-muse-small-business/",
  },
  {
    id: "connect-2026",
    date: "September 2026",
    title: "Meta Connect: Muse on glasses, Charm and expanded connectors",
    summary:
      "Meta announced Muse on AI glasses, Muse Charm, Muse email, expanded commerce and productivity connectors, and realtime voice directions.",
    category: ["muse", "devices", "developer-tools"],
    href: "https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/",
  },
  {
    id: "muse-launch",
    date: "September 8, 2026",
    title: "Muse consumer launch",
    summary:
      "Meta launched Muse, a personal AI agent with Secure VM, connectors, background goals and approval controls.",
    category: ["muse"],
    href: "https://ai.meta.com/muse/",
  },
  {
    id: "spark-1-3",
    date: "September 2, 2026",
    title: "Muse Spark 1.3",
    summary:
      "Muse Spark 1.3 became available for Muse Code and Meta Model API, with a 1,048,576-token context window.",
    category: ["models", "developer-tools"],
    href: "https://research.meta.ai/blog/introducing-muse-spark-1-3",
  },
  {
    id: "glimmer",
    date: "August 2026",
    title: "Muse Glimmer open weights",
    summary:
      "Meta released Muse Glimmer, an open-weight multimodal model for local agent workflows under Apache 2.0.",
    category: ["models", "research"],
    href: "https://huggingface.co/meta-models/Muse-Glimmer-30B",
  },
  {
    id: "image-video",
    date: "July 7, 2026",
    title: "Muse Image launch and Muse Video preview",
    summary:
      "Meta introduced Muse Image and Muse Video as part of its Muse media model family.",
    category: ["models", "research"],
    href: "https://ai.meta.com/blog/introducing-muse-image-muse-video-msl/",
  },
];

export const updateFilters: { id: UpdateCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "models", label: "Models" },
  { id: "developer-tools", label: "Developer Tools" },
  { id: "muse", label: "Muse" },
  { id: "research", label: "Research" },
  { id: "devices", label: "Devices" },
  { id: "security", label: "Security" },
];

export type SecurityArea = {
  id: string;
  name: string;
  summary: string;
  detail: string;
  flow: string[];
};

export const securityAreas: SecurityArea[] = [
  {
    id: "environment",
    name: "Work Environment",
    summary: "Isolated computer where Muse can browse, store files and run software.",
    detail:
      "Meta describes Muse Secure VM as a persistent, isolated Linux computer with a full browser that you and your agent can use together. You can intervene at any point. The September launch announcement described Confidential VM as a future feature; do not assume current Secure VM data is inaccessible to Meta.",
    flow: ["Muse", "Secure work environment", "Browser / files / code", "Result"],
  },
  {
    id: "credentials",
    name: "Credentials",
    summary: "Secrets kept away from the model whenever possible.",
    detail:
      "Meta says you can disconnect services, opt out of consumer interactions being used for model training, and ask Muse to forget saved information. Logins live in a secure credential store the agent cannot read. For shopping, one-time card numbers can be used so the real card is never exposed to the merchant or the agent.",
    flow: ["Muse", "Permission check", "Credential service", "Approved service"],
  },
  {
    id: "permissions",
    name: "Permissions",
    summary: "Human approval before consequential actions.",
    detail:
      "Muse is designed to ask before actions such as sending messages, making purchases or sharing information with connected apps. Users can allow once, always allow or deny, and review activity and previously approved permissions.",
    flow: ["Proposed action", "Permission check", "User decision", "Allow or deny"],
  },
  {
    id: "external-content",
    name: "External Content",
    summary: "Controls around webpages, documents and other untrusted inputs.",
    detail:
      "Prompt injection is not solved. Meta's approach combines classifiers, permission isolation, restricted credentials and human approvals rather than relying on the model alone.",
    flow: ["External content", "Agent reads content", "Safety checks", "Restricted action or block"],
  },
];

export const primarySources = [
  { label: "Muse launch and consumer privacy controls", href: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/" },
  { label: "How Muse was designed", href: "https://introducing.muse.ai/" },
  { label: "API pricing and data-use tiers", href: "https://dev.meta.ai/docs/pricing-rate-limits" },
  { label: "Meta AI — Muse", href: "https://ai.meta.com/muse/" },
  { label: "Meta Model API documentation", href: "https://dev.meta.ai/docs/overview/" },
  { label: "Meta Model API examples", href: "https://github.com/meta-models/meta-model-cookbook" },
  { label: "Muse Glimmer examples", href: "https://github.com/meta-models/meta-oss-cookbook" },
  {
    label: "Connect 2026 newsroom",
    href: "https://about.fb.com/news/2026/09/the-biggest-news-from-connect-2026/",
  },
] as const;
