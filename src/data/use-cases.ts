export type UseCase = {
  id: string;
  title: string;
  summary: string;
  capabilities: string[];
  products: { name: string; role: string; href: string }[];
  architecture: string[];
  projectSlugs: string[];
};

export const useCases: UseCase[] = [
  {
    id: "software-development",
    title: "Build software",
    summary: "Understand repositories, change code, run tools and validate results.",
    capabilities: [
      "Understand a codebase",
      "Modify files",
      "Run development tools",
      "Execute tests",
      "Inspect failures",
      "Iterate on changes",
    ],
    products: [
      { name: "Muse Spark", role: "Understands the repository, reasons about the problem and proposes code changes.", href: "/explore/spark" },
      { name: "Muse Code", role: "Connects the model to source files, commands and tests so changes can be checked.", href: "/explore/code" },
      { name: "Muse Glimmer", role: "Processes permitted code on your own hardware with a compatible local runtime.", href: "/explore/glimmer" },
    ],
    architecture: ["Developer", "Muse Code", "Muse Spark", "Repository", "Validate"],
    projectSlugs: [
      "browser-based-website-development",
      "multi-agent-product-studio",
      "github-automation",
      "parallel-worktrees",
    ],
  },
  {
    id: "research",
    title: "Research information",
    summary: "Search across sources, compare what they say and turn the findings into a clear report.",
    capabilities: [
      "Search the web and documents",
      "Compare conflicting sources",
      "Summarize long material",
      "Produce structured reports",
    ],
    products: [
      { name: "Muse Spark", role: "Connects information across documents and coordinates a sourced answer.", href: "/explore/spark" },
      { name: "Muse Glimmer", role: "Processes selected local documents without requiring a hosted model for inference.", href: "/explore/glimmer" },
    ],
    architecture: ["User", "Planner", "Search & files", "Synthesis", "Report"],
    projectSlugs: [],
  },
  {
    id: "computer-automation",
    title: "Work on a computer",
    summary: "See what’s on screen, navigate software and complete tasks with your approval when needed.",
    capabilities: [
      "Observe interfaces",
      "Click, type and navigate",
      "Verify outcomes",
      "Request approval for high-impact steps",
    ],
    products: [
      { name: "Muse Spark", role: "Interprets the screen and plans actions that the application executes with permitted tools.", href: "/explore/spark" },
      { name: "Muse Secure VM", role: "Provides a separated workspace for browser sessions, files and software, with access determined by permissions.", href: "/safety" },
    ],
    architecture: ["Goal", "Observe UI", "Plan", "Act", "Verify"],
    projectSlugs: ["computer-use-on-linux", "browser-based-website-development"],
  },
  {
    id: "local-ai",
    title: "Run AI locally",
    summary: "Process selected files on your own hardware with Muse Glimmer and locally configured tools.",
    capabilities: [
      "Run models locally",
      "Call local tools and files",
      "Reduce continuous API dependence",
      "Support offline-capable workflows",
    ],
    products: [{ name: "Muse Glimmer", role: "Runs inference on your hardware so selected files can be processed in your own environment.", href: "/explore/glimmer" }],
    architecture: ["Local runtime", "Muse Glimmer", "Local tools", "Results"],
    projectSlugs: ["local-code-review-with-glimmer"],
  },
  {
    id: "voice",
    title: "Work with voice",
    summary: "Turn speech into structured input for agents and applications.",
    capabilities: [
      "Stream speech to text",
      "Attribute speakers",
      "Detect turns",
      "Drive application actions from speech",
    ],
    products: [
      { name: "Muse Voice", role: "Converts spoken audio into text that you can search, review or pass to an application.", href: "/explore/voice" },
      { name: "Muse Spark", role: "Interprets the transcript and proposes actions for the application to execute with permission.", href: "/explore/spark" },
    ],
    architecture: ["Microphone", "Voice Transcribe", "Intent", "Application"],
    projectSlugs: ["voice-controlled-application"],
  },
  {
    id: "images",
    title: "Create and edit images",
    summary: "Create images, make edits and refine a visual idea.",
    capabilities: [
      "Generate images from text",
      "Edit existing images",
      "Refine results across turns",
    ],
    products: [
      { name: "Muse Image", role: "Creates visual candidates from a brief and refines an existing image through requested edits.", href: "/explore/image" },
      { name: "Muse Spark", role: "Helps interpret reference images and reason about whether a visual meets the brief.", href: "/explore/spark" },
    ],
    architecture: ["Brief", "Generate", "Inspect", "Refine"],
    projectSlugs: [],
  },
  {
    id: "business-workflows",
    title: "Organize work",
    summary: "Use Muse’s business skills and connected tools to prepare campaigns, review business information and organize work under approval controls.",
    capabilities: [
      "Work with authorized business accounts and connectors such as Shopify, Canva and QuickBooks",
      "Draft and prepare actions",
      "Request permission before sending or purchasing",
      "Continue tasks in the background",
    ],
    products: [
      { name: "Muse", role: "Brings context, connected tools and approval controls together around your task.", href: "/explore/muse" },
      { name: "Muse Spark", role: "Breaks the task into steps and reasons about information returned by permitted tools.", href: "/explore/spark" },
    ],
    architecture: ["Goal", "Connectors", "Plan", "Approval", "Action"],
    projectSlugs: ["scheduled-monitoring"],
  },
  {
    id: "personal-productivity",
    title: "Personal tasks",
    summary: "Scheduling, reminders, shopping and ongoing goals with human oversight.",
    capabilities: [
      "Track goals over time",
      "Monitor prices or status",
      "Coordinate calendar and email",
      "Ask before consequential actions",
    ],
    products: [{ name: "Muse", role: "Helps organize personal tasks using the context and connected services you provide.", href: "/explore/muse" }],
    architecture: ["User goal", "Muse", "Work environment", "Connectors", "Action"],
    projectSlugs: ["scheduled-monitoring"],
  },
  {
    id: "smart-devices",
    title: "Muse on devices",
    summary: "Explore Meta’s announced plans for Muse on AI glasses and Muse Charm. The Connect announcement describes future access, not general availability.",
    capabilities: [
      "Act on what you are looking at",
      "Hands-free conversation",
      "Background work during voice interaction",
    ],
    products: [
      { name: "Muse", role: "The personal agent Meta plans to bring to glasses and dedicated hardware; check current rollout details.", href: "/explore/muse" },
    ],
    architecture: ["Device", "Muse", "Context", "Action"],
    projectSlugs: [],
  },
  {
    id: "multi-agent",
    title: "Coordinated AI work",
    summary: "Coordinate specialized workers with review and isolated workspaces.",
    capabilities: [
      "Split work across roles",
      "Isolate parallel changes",
      "Review before merge",
      "Validate end-to-end results",
    ],
    products: [
      { name: "Muse Spark", role: "Reasons about the overall plan or a bounded task assigned to an individual worker.", href: "/explore/spark" },
      { name: "Muse Code", role: "Supports repository work and development tools around separately assigned coding tasks.", href: "/explore/code" },
    ],
    architecture: ["Coordinator", "Workers", "Reviewer", "Merge"],
    projectSlugs: ["multi-agent-product-studio", "parallel-worktrees"],
  },
];

export function getUseCase(id: string): UseCase | undefined {
  return useCases.find((u) => u.id === id);
}
