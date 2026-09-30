import { models } from "@/data/models";
import { additionalProducts } from "@/data/products";
import { projects } from "@/data/projects";
import { useCases } from "@/data/use-cases";
import { useCaseStories } from "@/data/scenarios";
import { updates, securityAreas } from "@/data/security-updates";
import { navLinks } from "@/data/nav";

export type SearchResult = { group: string; href: string; label: string; hint: string };
type Entry = SearchResult & { aliases: string[]; content: string; pricing?: boolean };
const products = [...models, ...additionalProducts];
const conceptAliases: Record<string, string[]> = {
  "/": ["what is muse", "what is meta muse", "muse atlas", "muse explained", "overview"],
  "/use-cases": ["what can muse do", "what can meta muse do", "what can it do", "muse capabilities", "use cases"],
  "/safety": ["privacy", "safety", "security", "is muse safe", "is meta muse safe"],
  "/how-it-works": ["how does muse work", "how muse works", "how does meta muse work", "architecture"],
};
const entries: Entry[] = [
  ...products.map(product => ({
    group: "Products", href: `/explore/${product.slug}`, label: product.name, hint: product.purpose,
    aliases: [product.slug, product.name, `meta ${product.name}`, ...(product.slug === "voice" ? ["voice transcribe", "muse voice transcribe"] : [])],
    content: [product.summary, product.howItWorks, ...product.capabilities, ...product.limitations, ...product.specs.map(spec => `${spec.label} ${spec.value}`)].join(" "),
  })),
  ...useCases.map(useCase => ({
    group: "Use cases", href: `/use-cases/${useCase.id}`, label: useCase.title, hint: useCase.summary,
    aliases: [useCase.id.replaceAll("-", " "), ...(useCase.id === "business-workflows" ? ["can it send emails", "send email", "small business", "muse for small business"] : [])],
    content: [useCase.summary, ...useCase.capabilities, ...useCase.products.map(product => `${product.name} ${product.role}`), ...useCaseStories[useCase.id].scenarios.map(scenario => `${scenario.title} ${scenario.request}`)].join(" "),
  })),
  ...projects.map(project => ({
    group: "Examples", href: `/examples/${project.slug}`, label: project.title, hint: project.summary,
    aliases: [], content: [project.whatItDoes, project.whyUseful, ...project.stack, ...project.process, ...project.limitations].join(" "),
  })),
  ...navLinks.map(link => ({
    group: "Concepts", href: link.href, label: link.label,
    hint: link.href === "/safety" ? "Privacy, connected accounts, approvals and security boundaries." : "Explore this section of the guide.",
    aliases: conceptAliases[link.href] ?? [], content: conceptAliases[link.href]?.join(" ") ?? link.label,
  })),
  ...securityAreas.map(area => ({
    group: "Concepts", href: `/safety#${area.id}`,
    label: area.id === "permissions" ? "Your approval — permissions" : area.name,
    hint: area.summary,
    aliases: area.id === "permissions" ? ["approval", "approvals", "permissions", "permission", "sensitive actions"] : [area.name],
    content: `${area.summary} ${area.detail}`,
  })),
  { group: "Products", href: "/explore/muse", label: "Muse goals, memory and Artifacts", hint: "Background tasks, editable memory, activity history and interactive results.", aliases: ["memory", "artifacts", "background goals", "activity history"], content: "consumer goals background memory artifacts" },
  { group: "Concepts", href: "/how-it-works#architecture", label: "Architecture, context and planning", hint: "How the model, tools and controls fit together.", aliases: ["context", "planning"], content: "Models tools software context memory architecture" },
  ...updates.map(update => ({ group: "Updates", href: `/updates#${update.id}`, label: update.title, hint: update.date, aliases: [], content: update.summary })),
  { group: "Concepts", href: "/updates", label: "What’s new", hint: "Dated product announcements.", aliases: ["updates", "announcements"], content: "releases" },
  ...products.flatMap(product => {
    const price = product.specs.find(spec => /pric(e|ing)|cost/i.test(spec.label));
    const aliases = [product.slug, product.name, `meta ${product.name}`].flatMap(name => ["pricing", "price", "cost", "free"].map(term => `${name} ${term}`).concat([`how much does ${name} cost`, `is ${name} free`]));
    return [{
      group: price ? "Product specifications" : "Official resources",
      href: price ? `/explore/${product.slug}#specifications` : "/#sources",
      label: price ? `${product.name} pricing` : `${product.name}: check pricing and access`,
      hint: price ? price.value : "Current pricing is not established here. Open Official Meta resources in the footer.",
      aliases: [...aliases, ...(product.slug === "muse" ? ["pricing", "price", "cost", "free", "is it free"] : [])],
      content: `${product.name} ${product.slug} pricing price cost free`, pricing: true,
    }];
  }),
  { group: "Official resources", href: "/#sources", label: "Official resources — access and setup", hint: "Use the footer's official product pages and developer docs to check access, pricing or installation.", aliases: ["official resources", "sources", "how to start", "get started", "install", "installation", "free", "is it free"], content: "setup download account pricing", pricing: true },
];

function normalize(value: string) {
  return value.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

export function searchGuide(input: string): SearchResult[] {
  const query = normalize(input);
  const tokens = query.split(" ").filter(Boolean);
  const pricingIntent = tokens.some(token => ["pricing", "price", "cost", "free"].includes(token));
  const results = entries.map((entry, index) => {
    if (!query) return { entry, score: entry.pricing ? 0 : 1, index };
    if (pricingIntent && !entry.pricing) return { entry, score: 0, index };
    const aliases = entry.aliases.map(normalize);
    const label = normalize(entry.label);
    const words = new Set(normalize(`${entry.label} ${entry.hint} ${entry.aliases.join(" ")} ${entry.content}`).split(" "));
    const score = label === query || aliases.includes(query) ? 1000
      : !tokens.every((token, index) => words.has(token) || (index === tokens.length - 1 && token.length >= 2 && Array.from(words).some(word => word.startsWith(token)))) ? 0
      : label.includes(query) ? 100
      : aliases.some(alias => alias.includes(query)) ? 80 : 20;
    return { entry, score, index };
  }).filter(result => result.score > 0).sort((a, b) => b.score - a.score || a.index - b.index);
  const seen = new Set<string>();
  return results.flatMap(({ entry }) => {
    if (seen.has(entry.href)) return [];
    seen.add(entry.href);
    return [{ group: entry.group, href: entry.href, label: entry.label, hint: entry.hint }];
  });
}
