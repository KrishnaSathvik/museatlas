export type ProjectBadge = "official-meta" | "open-source" | "community" | "research";

export type ProjectCategory =
  | "software-development"
  | "web"
  | "research"
  | "automation"
  | "local-ai"
  | "voice"
  | "images"
  | "computer-use"
  | "multi-agent";

export type MuseProject = {
  slug: string;
  title: string;
  summary: string;
  whatItDoes: string;
  whyUseful: string;
  architecture: string;
  stack: string[];
  process: string[];
  category: ProjectCategory[];
  badges: ProjectBadge[];
  sourceHref?: string;
  sourceLabel?: string;
  limitations: string[];
};

export const badgeLabels: Record<ProjectBadge, string> = {
  "official-meta": "Official Meta",
  "open-source": "Open Source",
  community: "Community Project",
  research: "Research",
};

export const projects: MuseProject[] = [
  {
    slug: "browser-based-website-development",
    title: "Browser-Based Website Development",
    summary:
      "An AI workflow that creates a website, opens it in a browser, inspects the result and makes corrections.",
    whatItDoes:
      "Builds a user interface, launches it in a browser, takes screenshots or visual checks, and iterates until the layout matches the intended result.",
    whyUseful:
      "Closes the gap between generating code and verifying that the running product looks and behaves correctly.",
    architecture: "Model writes code → browser opens the result → visual inspection → corrections",
    stack: ["Muse Spark", "Browser tools", "Vision"],
    process: [
      "Receive task",
      "Generate code",
      "Run application",
      "Inspect result",
      "Identify issues",
      "Make corrections",
      "Validate output",
    ],
    category: ["software-development", "web", "computer-use"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/05_web_design",
    sourceLabel: "Meta Model API examples",
    limitations: [
      "Visual checks depend on tooling quality",
      "Does not replace product design judgment",
    ],
  },
  {
    slug: "iterative-game-development",
    title: "Iterative Game Development",
    summary:
      "Builds a game, runs it, playtests through a browser and improves based on observed failures.",
    whatItDoes:
      "Creates game code, launches it, interacts with the running game, detects problems and patches them in a loop.",
    whyUseful:
      "Treats the running product as ground truth rather than stopping at generated source files.",
    architecture: "Generate → execute → interact → detect issues → modify → rerun",
    stack: ["Muse Spark", "Browser tools", "Three.js"],
    process: [
      "Receive task",
      "Generate game code",
      "Launch in browser",
      "Playtest",
      "Detect failures",
      "Patch",
      "Rerun",
    ],
    category: ["software-development", "web"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/06_iterative_game_dev",
    sourceLabel: "Meta Model API examples",
    limitations: ["Long loops can be costly", "Game quality still needs human taste"],
  },
  {
    slug: "multi-agent-product-studio",
    title: "Multi-Agent Product Studio",
    summary:
      "Product, frontend, backend and writing roles coordinate on a software project.",
    whatItDoes:
      "Splits work across specialized agents, keeps changes isolated where possible, then reviews and combines results.",
    whyUseful:
      "Shows Muse as a coordination problem across roles, not a single chat turn.",
    architecture: "Coordinator → specialized workers → review → merge",
    stack: ["Muse Spark", "Isolated workspaces", "Git"],
    process: [
      "Define brief",
      "Plan work",
      "Build in parallel",
      "Review",
      "Document",
      "Validate",
    ],
    category: ["software-development", "multi-agent"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/08_multi_agent_orchestration",
    sourceLabel: "Meta Model API examples",
    limitations: ["Coordination overhead", "Merges still need careful review"],
  },
  {
    slug: "github-automation",
    title: "GitHub Automation",
    summary: "Triages issues, reviews pull requests and proposes fixes.",
    whatItDoes:
      "Responds to repository events by classifying work, reviewing changes and suggesting patches under approval controls.",
    whyUseful: "Turns ongoing development operations into a continuous agent workflow.",
    architecture: "Repository event → triage → review → patch → validate",
    stack: ["Muse Spark", "GitHub", "Muse Code patterns"],
    process: ["Receive event", "Triage", "Review", "Propose fix", "Validate"],
    category: ["software-development", "automation"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/11_github_repo_agent",
    sourceLabel: "Meta Model API examples",
    limitations: ["Needs tight permission scopes", "Review quality varies by task"],
  },
  {
    slug: "computer-use-on-linux",
    title: "Computer Use on Linux",
    summary: "Operates a Linux desktop from screenshots and interface actions.",
    whatItDoes:
      "Observes the graphical interface, plans actions such as clicks and typing, then verifies the result.",
    whyUseful: "Extends agents beyond APIs into real graphical software.",
    architecture: "Observe interface → plan → act → verify",
    stack: ["Muse Spark", "Computer-use tooling"],
    process: ["Observe", "Plan", "Act", "Verify"],
    category: ["computer-use", "automation"],
    badges: ["official-meta", "research"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/12_computer_use",
    sourceLabel: "Meta computer-use documentation",
    limitations: [
      "Interface changes can break workflows",
      "On-screen content can contain hostile instructions",
    ],
  },
  {
    slug: "local-code-review-with-glimmer",
    title: "Local Code Review with Glimmer",
    summary:
      "A fully local workflow where Glimmer reads source files, reviews them and writes a report to disk.",
    whatItDoes:
      "Runs without Meta Model API: the local model calls filesystem tools, inspects code and produces a written review.",
    whyUseful:
      "Lets you review selected code in your own environment and keep the resulting report on your machine.",
    architecture: "Local model → filesystem tools → review → report on disk",
    stack: ["Muse Glimmer", "Filesystem tools", "Local runtime"],
    process: ["Reason", "Read files", "Review", "Write report"],
    category: ["local-ai", "software-development"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-oss-cookbook/tree/main/agentic-fundamentals",
    sourceLabel: "Meta open-source examples",
    limitations: ["Hardware dependent", "Weaker than Spark on difficult tasks"],
  },
  {
    slug: "screenshot-bug-fixing",
    title: "Screenshot Bug Fixing",
    summary: "From a UI screenshot: diagnose the problem, locate code and repair it.",
    whatItDoes:
      "Uses visual input to find UI issues, maps them to code, applies a fix and validates.",
    whyUseful: "Turns a screenshot into a concrete engineering workflow.",
    architecture: "Screenshot → diagnose → locate code → patch → validate",
    stack: ["Muse Spark", "Vision", "Repository tools"],
    process: ["Capture screenshot", "Diagnose", "Locate code", "Patch", "Validate"],
    category: ["software-development", "images"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/03_use_cases/02_screenshot_bugfix",
    sourceLabel: "Meta Model API examples",
    limitations: ["Needs a reliable mapping from UI to code"],
  },
  {
    slug: "scheduled-monitoring",
    title: "Scheduled Monitoring",
    summary: "Recurring checks while a Muse Code session stays running.",
    whatItDoes:
      "Wakes on a schedule, inspects a target, acts or alerts, then waits for the next run.",
    whyUseful: "Saves repeated manual checks and brings changes to your attention when they matter.",
    architecture: "Schedule → wake → inspect → act or alert → sleep",
    stack: ["Muse Spark", "Schedulers", "Muse Code workflows"],
    process: ["Schedule", "Wake", "Inspect", "Act or alert", "Sleep"],
    category: ["automation"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/04_muse_code/09_loop_and_cron",
    sourceLabel: "Meta Model API examples",
    limitations: ["Muse Code must remain running; jobs belong to the current session and recurring jobs expire after seven days", "Continuous runs have cost", "Repeating a check should not accidentally repeat a purchase, message or other consequential action"],
  },
  {
    slug: "parallel-worktrees",
    title: "Parallel Work Across Git Worktrees",
    summary:
      "Multiple agents work in isolated Git worktrees—separate working copies of a repository—so parallel changes do not overwrite each other.",
    whatItDoes:
      "Splits tasks, assigns workers to separate worktrees, then merges and validates results.",
    whyUseful: "A practical pattern Meta emphasizes for Muse Code multi-agent work.",
    architecture: "Split tasks → isolated workers → merge → validate",
    stack: ["Muse Code", "Git worktrees", "Muse Spark"],
    process: ["Split", "Spawn workers", "Isolate worktrees", "Merge", "Validate"],
    category: ["software-development", "multi-agent"],
    badges: ["official-meta"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/04_muse_code/06_subagent_fanout",
    sourceLabel: "Muse Code documentation",
    limitations: ["Merges still need judgment", "Parallel workers can compete for the same computing resources"],
  },
  {
    slug: "voice-controlled-application",
    title: "Voice-Controlled Application",
    summary: "Speech recognition connected to an interactive application.",
    whatItDoes:
      "Streams speech, interprets intent and drives application actions such as game moves.",
    whyUseful: "Lets people control a chess application with supported spoken commands.",
    architecture: "Speech → transcription → intent → application action",
    stack: ["Muse Voice Transcribe", "Interactive application"],
    process: ["Speak", "Transcribe", "Parse intent", "Act", "Confirm"],
    category: ["voice"],
    badges: ["official-meta", "open-source"],
    sourceHref: "https://github.com/meta-models/meta-model-cookbook/tree/main/06_muse_voice/02_voice_chess_cua",
    sourceLabel: "Meta Model API examples",
    limitations: ["Only supported command patterns are accepted; other transcripts are rejected", "Accepted commands act automatically without a separate confirmation prompt"],
  },
];

export const projectCategories: { id: ProjectCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "software-development", label: "Software Development" },
  { id: "web", label: "Web" },
  { id: "research", label: "Research" },
  { id: "automation", label: "Automation" },
  { id: "local-ai", label: "Local AI" },
  { id: "voice", label: "Voice" },
  { id: "images", label: "Images" },
  { id: "computer-use", label: "Computer Use" },
  { id: "multi-agent", label: "Multi-Agent" },
];

export function getProject(slug: string): MuseProject | undefined {
  return projects.find((p) => p.slug === slug);
}
