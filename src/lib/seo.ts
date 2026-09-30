import { models } from "@/data/models";
import { additionalProducts } from "@/data/products";
import { projects } from "@/data/projects";
import { useCases } from "@/data/use-cases";

export type SeoPage = {
  path: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
};

const productCopy: Record<string, { title: string; description: string }> = {
  muse: { title: "Meta Muse AI Agent: Tools, Tasks & Approval Controls", description: "Understand Meta Muse as a personal AI agent: how models, connected tools, a work environment and permissions come together to complete tasks." },
  spark: { title: "Muse Spark 1.3: Capabilities, Context & Use Cases", description: "Explore Muse Spark’s reasoning, coding and multimodal capabilities, its context window, practical workflows and how it differs from Glimmer." },
  glimmer: { title: "Muse Glimmer: 30B Local AI, Hardware & Use Cases", description: "Understand Meta’s open-weight Glimmer model, local hardware considerations, runtime setup, code-review workflows and tradeoffs against hosted Spark." },
  code: { title: "Muse Code Explained: Meta’s Terminal Coding Agent", description: "See how Muse Code uses Spark to inspect repositories, edit files, run commands and check changes, with approvals, sandboxing and human review." },
  image: { title: "Muse Image: Image Generation, Editing & Use Cases", description: "Follow Muse Image from a prompt to a generated image, targeted edits and review. Explore its API specifications, practical uses and limitations." },
  voice: { title: "Muse Voice Transcribe: Speech Recognition & Applications", description: "Understand Muse Voice Transcribe, including streaming and file transcription, speaker attribution, turn timestamps and speech-to-text limitations." },
  video: { title: "Muse Video Preview: Native Audio & Announced Capabilities", description: "Explore Meta’s Muse Video preview, its announced video and native-audio direction, an illustrative storyboard and what remains unverified about access." },
};

export const seoPages: SeoPage[] = [
  { path: "/", title: "Muse Atlas — A Visual Guide to Meta Muse", description: "A visual guide to Meta Muse: Spark, Glimmer, Code, Image and Voice, with practical workflows, architecture diagrams, examples and safety controls.", image: "/og/overview.jpg", imageAlt: "Muse Atlas: Overview — Understand Meta Muse clearly", imageWidth: 1200, imageHeight: 630 },
  { path: "/explore", title: "Meta Muse Models & Products: Spark, Glimmer, Code & More", description: "Compare the roles of Muse’s models and software: Spark for reasoning, Glimmer for local AI, Code for development, and Image, Voice and Video for media.", image: "/og/explore.jpg", imageAlt: "Muse Atlas: Explore — See the Muse product family", imageWidth: 1200, imageHeight: 630 },
  { path: "/how-it-works", title: "How Meta Muse Works: Models, Tools & Architecture", description: "Follow a request through Muse’s model, context, tools and work environment. Visual explanations cover execution, memory, permissions and review.", image: "/og/how-it-works.jpg", imageAlt: "Muse Atlas: How It Works — How Muse understands, works, and checks results", imageWidth: 1200, imageHeight: 630 },
  { path: "/use-cases", title: "Meta Muse Use Cases: Software, Research & Everyday Tasks", description: "Start with a task: building software, researching information, automating computer work or running AI locally. See relevant products and practical limits.", image: "/og/use-cases.jpg", imageAlt: "Muse Atlas: Use Cases — What Muse can help with", imageWidth: 1200, imageHeight: 630 },
  { path: "/examples", title: "Meta Muse Examples: Workflows With Spark, Glimmer & Code", description: "Explore ten documented Muse workflows, including web development, local code review and computer use, with step-by-step explanations and architecture.", image: "/og/examples.jpg", imageAlt: "Muse Atlas: Examples — See real Muse workflows", imageWidth: 1200, imageHeight: 630 },
  { path: "/safety", title: "Meta Muse Safety: Privacy, Permissions & Security Controls", description: "Understand Muse’s isolated workspace, credential handling, approval controls and treatment of untrusted content, with clear explanations of remaining risks.", image: "/og/safety.jpg", imageAlt: "Muse Atlas: Safety — Understand privacy, permissions, and control", imageWidth: 1200, imageHeight: 630 },
  { path: "/updates", title: "Meta Muse Updates: Product Releases & Announcements", description: "Review dated Meta Muse announcements, including Spark 1.3, Glimmer open weights, the consumer launch and media previews, with links to original material in the footer.", image: "/illustrations/product-muse.png", imageAlt: "Concept illustration of the Muse platform" },
  ...[...models, ...additionalProducts].map(product => ({
    path: `/explore/${product.slug}`,
    ...productCopy[product.slug],
    image: `/illustrations/product-${product.slug}.png`,
    imageAlt: `Concept illustration of ${product.name}`,
  })),
  ...useCases.map(useCase => ({
    path: `/use-cases/${useCase.id}`,
    title: `${useCase.title} | Meta Muse Use Cases`,
    description: useCase.summary,
    image: `/illustrations/${useCase.id === "smart-devices" ? "product-muse" : useCase.id === "multi-agent" ? "multi-agent-product-studio" : `use-${useCase.id}`}.png`,
    imageAlt: `Concept illustration: ${useCase.title.toLowerCase()}`,
  })),
  ...projects.map(project => ({
    path: `/examples/${project.slug}`,
    title: `${project.title} | Muse Workflow Example`,
    description: project.summary,
    image: `/illustrations/${project.slug}.png`,
    imageAlt: `Illustrative workflow: ${project.title}`,
  })),
];

export function getSeoPage(path: string) {
  return seoPages.find(page => page.path === path);
}
