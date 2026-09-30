import type { MuseModel } from "./models";
export const additionalProducts: MuseModel[] = [
  {
    slug:"muse", name:"Muse", shortName:"Muse", kind:"hosted",
    purpose:"Meta’s personal AI experience for tasks across information and connected software.",
    summary:"Muse is Meta’s personal AI experience: you give it a goal and it uses available information, software and connected services to help complete the task. Muse is also the name of the wider family of models and tools. Using the personal product differs from building with a model API—an interface for software to call a model—or setting up Glimmer yourself.",
    howItWorks:"The model reasons about the task; the surrounding software supplies tools, context, permissions and an execution environment. Available connections and approvals determine which actions can be taken. Goals can continue while the app is closed. You can review activity and edit saved memory; interactive outputs such as itineraries and dashboards are called Artifacts.",
    bestFor:["Multi-step personal tasks","Connected software workflows"],capabilities:["Understand a goal","Use tools","Prepare and review actions"],useCases:["Research","Organizing work","Personal tasks"],
    limitations:["Capabilities depend on the tools and services available to the account.","Important actions and final results need human review.","Safety controls reduce risk but cannot eliminate every problem."],
    specs:[{label:"Role",value:"Personal AI agent experience"},{label:"Access — checked September 29, 2026",value:"Meta describes availability in the US and Canada. Check current account and regional access through the official footer resources."},{label:"Consumer pricing — checked September 29, 2026",value:"Free for most uses, with optional subscriptions for higher usage. Consumer plans are separate from Muse Code subscriptions and metered API billing."},{label:"Workspace",value:"Secure VM and connected tools"},{label:"Control",value:"Permissions and approvals"}],
    sources:[{label:"Muse consumer launch",href:"https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/"},{label:"How Muse was designed",href:"https://introducing.muse.ai/"},{label:"Muse product",href:"https://ai.meta.com/muse/"}],
  },
  {
    slug:"code",name:"Muse Code",shortName:"Code",kind:"hosted",
    purpose:"Understand, change and check software in a development environment.",
    summary:"Muse Code is Meta’s coding product for a terminal—a text-based command interface—built around Muse Spark. It can plan changes, edit repositories, run commands and validate results, with approvals and an OS sandbox enabled by default.",
    howItWorks:"Muse Spark provides the reasoning and coding capabilities. Muse Code supplies repository context, command execution, approvals and the surrounding development workflow.",
    bestFor:["Repository work","Software changes","Testing"],capabilities:["Inspect repositories","Edit files","Run development tools","Check results"],useCases:["Fix bugs","Add features","Explain a codebase"],
    limitations:["Review generated changes and commands before consequential actions.","A successful tool run or test suite is not a guarantee of correctness.","Access to files and commands depends on the workspace configuration.","Advanced workflows depend on the installed build and rollout. Windows lacks voice input and session messaging.","Spark 1.3 is available, but the Code getting-started page still names 1.2 as its default. Check your selected model rather than assuming every installation uses the same version."],
    specs:[{label:"Interface",value:"Terminal and CI development workflows"},{label:"Code pricing — checked September 29, 2026",value:"CLI subscriptions: Everyday $5/month, High $15/month, Power $50/month, subject to usage limits and regional availability. Alternatively, pay per token. Additional API keys remain pay-as-you-go."},{label:"Model",value:"Muse Spark"},{label:"Work context",value:"Repository, files and commands"},{label:"Controls",value:"Approvals and OS sandbox"}],
    sources:[{label:"Muse Code subscriptions and billing",href:"https://dev.meta.ai/help/subscriptions/what-is-a-muse-code-subscription"},{label:"Muse Code documentation",href:"https://dev.meta.ai/docs/muse-code"},{label:"Meta Model API examples",href:"https://github.com/meta-models/meta-model-cookbook"}],
  },
];
