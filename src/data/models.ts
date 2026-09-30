export type ModelKind = "hosted" | "open-weight" | "media" | "speech" | "upcoming";

export type MuseModel = {
  slug: string;
  name: string;
  shortName: string;
  kind: ModelKind;
  purpose: string;
  summary: string;
  howItWorks: string;
  bestFor: string[];
  capabilities: string[];
  useCases: string[];
  limitations: string[];
  specs: { label: string; value: string }[];
  sources: { label: string; href: string }[];
};

export const models: MuseModel[] = [
  {
    slug: "spark",
    name: "Muse Spark",
    shortName: "Spark",
    kind: "hosted",
    purpose: "General-purpose model for coding, reasoning and agent-based tasks.",
    summary:
      "Muse Spark is Meta's cloud-hosted AI model for software development, computer use, tool calling and long multi-step work. It powers Muse Code and much of the consumer Muse product. Developers can also use Meta Model API, an interface that lets their software send requests to the model.",
    howItWorks:
      "Spark runs through Meta Model API (and Muse Code). Applications send requests to Meta's hosted service, where the model can plan, call tools, read multimodal inputs and continue across long contexts.",
    bestFor: [
      "Software development",
      "Computer use",
      "Tool-based workflows",
      "Long tasks",
      "Text, image and document processing",
    ],
    capabilities: [
      "Parallel and streamed tool calls",
      "Reasoning that carries across turns",
      "Image, document and video understanding",
      "Search grounding and structured output",
      "OpenAI- and Anthropic-compatible API surfaces",
    ],
    useCases: [
      "Coding agents and repository work",
      "Research and report generation",
      "Browser and desktop automation",
      "Multi-step business workflows",
    ],
    limitations: [
      "Runs in the cloud — requests are processed by Meta. Standard API prompts and completions are not used for training; Contributor requests permit training. No-training is not the same as zero retention.",
      "Audio understanding in Spark 1.3 is not fully supported; use Spark 1.2 for audio understanding or Voice Transcribe for speech-to-text.",
      "Useful results still depend on good tooling, approvals and review",
      "Not a substitute for human judgment on consequential actions",
    ],
    specs: [
      { label: "Current version", value: "muse-spark-1.3" },
      { label: "API pricing — checked September 29, 2026", value: "Standard: $1.25 input / $4.25 output per million tokens. Contributor: $0.10 input / $0.20 output, with permission to train on requests. Cached input is discounted; web search is billed separately. Check current terms in the footer resources." },
      { label: "Context window", value: "1,048,576 tokens — small units used to measure model input and output" },
      { label: "Availability", value: "Meta Model API · Muse Code · Muse" },
      { label: "Base URL", value: "https://api.meta.ai/v1" },
    ],
    sources: [
      { label: "Developer overview", href: "https://dev.meta.ai/docs/overview/" },
      { label: "Spark 1.3 announcement", href: "https://research.meta.ai/blog/introducing-muse-spark-1-3" },
      { label: "Model capabilities and limitations", href: "https://dev.meta.ai/docs/models" },
      { label: "API pricing and data-use tiers", href: "https://dev.meta.ai/docs/pricing-rate-limits" },
      { label: "Muse Spark model page", href: "https://dev.meta.ai/models/muse-spark" },
      { label: "Meta Model API examples", href: "https://github.com/meta-models/meta-model-cookbook" },
    ],
  },
  {
    slug: "glimmer",
    name: "Muse Glimmer",
    shortName: "Glimmer",
    kind: "open-weight",
    purpose: "A model you can run on your own hardware for private and local AI tasks.",
    summary:
      "Muse Glimmer is Meta's open-weight model: its model files are available to download and run yourself. It understands text and images, is distilled from Spark—trained using the larger model—and is released under Apache 2.0 for workflows on your own hardware.",
    howItWorks:
      "Unlike Spark, Glimmer is downloaded and run on your own hardware using a runtime, the software that runs the model (for example vLLM, SGLang, llama.cpp or ExecuTorch). It is not called through Meta Model API.",
    bestFor: [
      "Local AI",
      "Private files and code",
      "Local coding workflows",
      "Tool use on-device",
      "Custom deployments",
    ],
    capabilities: [
      "Multimodal understanding with tool calling",
      "Self-hosted inference",
      "Official local agent examples from Meta",
      "Apache 2.0 open weights",
    ],
    useCases: [
      "Private document assistants",
      "Always-on local agents",
      "Offline-capable tool loops",
      "Workstation and edge deployments",
    ],
    limitations: [
      "Smaller than Spark — not a drop-in replacement for its capabilities on complex tasks",
      "Requires suitable hardware and serving setup",
      "You own security, updates and evaluation for production use",
    ],
    specs: [
      { label: "Size class", value: "~30B multimodal" },
      { label: "Context length", value: "131,072+ tokens in the model card; practical capacity depends on runtime and available memory" },
      { label: "License", value: "Apache 2.0" },
      { label: "Availability", value: "Open weights · local runtimes" },
      { label: "Serving", value: "Not via Meta Model API" },
    ],
    sources: [
      { label: "Glimmer documentation", href: "https://dev.meta.ai/docs/muse-glimmer" },
      { label: "Hugging Face", href: "https://huggingface.co/meta-models/Muse-Glimmer-30B" },
      { label: "Open-source examples", href: "https://github.com/meta-models/meta-oss-cookbook" },
    ],
  },
  {
    slug: "image",
    name: "Muse Image",
    shortName: "Image",
    kind: "media",
    purpose: "Image generation and editing for applications and creative workflows.",
    summary:
      "Muse Image generates and edits images through Meta Model API, an interface that lets software request model outputs, including refinement across multiple requests.",
    howItWorks:
      "Applications call Meta Model API image endpoints with the same authentication as Spark. Results can be refined across turns.",
    bestFor: [
      "Product and marketing imagery",
      "Iterative visual editing",
      "Programmatic image pipelines",
      "UI and mock concepts",
    ],
    capabilities: [
      "Text-to-image generation",
      "Image editing",
      "Multi-turn refinement with multiple reference images",
      "Automatic reference search and code-assisted layouts, with controls to restrict tools",
      "Shared auth and base URL with Spark",
    ],
    useCases: [
      "Ad and product variants",
      "Story or character continuity",
      "Application-generated assets",
    ],
    limitations: [
      "Not a substitute for a design system or brand guidelines",
      "Output rights and data use depend on API terms",
    ],
    specs: [
      { label: "Model ID", value: "muse-image-1.0" },
      { label: "API pricing — checked September 29, 2026", value: "$0.01 per successfully returned image, including built-in image/web search. Check current terms in the footer resources." },
      { label: "Availability", value: "Meta Model API" },
      { label: "Endpoints", value: "Image generation and edits" },
    ],
    sources: [
      { label: "Image generation guide", href: "https://dev.meta.ai/docs/image-generation" },
      { label: "Developer overview", href: "https://dev.meta.ai/docs/overview/" },
    ],
  },
  {
    slug: "voice",
    name: "Muse Voice",
    shortName: "Voice",
    kind: "speech",
    purpose: "Speech recognition for applications, meetings and voice interfaces.",
    summary:
      "Muse Voice Transcribe is Meta's speech-to-text model. Applications access it through Model API, an interface for sending audio and receiving text, with streaming and file transcription, speaker labels and detection of speech turns.",
    howItWorks:
      "Audio is sent to Meta Model API over realtime WebSocket or file upload endpoints. The model returns transcript text with turn-level timing and optional speaker labels.",
    bestFor: [
      "Voice interfaces",
      "Meeting transcription",
      "Call and contact-center transcripts",
      "Live captioning and dictation",
    ],
    capabilities: [
      "Streaming and recorded-file transcription",
      "Speaker diarization",
      "Voice activity detection and endpointing",
      "Keyword and context biasing",
      "Multiple languages with code-switching",
    ],
    useCases: [
      "Agent voice input",
      "Searchable meeting notes",
      "Accessibility captioning",
    ],
    limitations: [
      "Speech-to-text only — no text-to-speech in this model",
      "Turn-level timestamps, not word-level",
      "Separate from Muse realtime conversational voice and avatar experiences",
    ],
    specs: [
      { label: "Model ID", value: "muse-voice-transcribe-1.0" },
      { label: "API pricing — checked September 29, 2026", value: "$0.18 per hour of processed audio; streaming and file transcription share the rate. Check current terms in the footer resources." },
      { label: "Availability", value: "Meta Model API" },
    ],
    sources: [
      { label: "Speech-to-text guide", href: "https://dev.meta.ai/docs/speech-to-text" },
      { label: "Developer overview", href: "https://dev.meta.ai/docs/overview/" },
    ],
  },
  {
    slug: "video",
    name: "Muse Video",
    shortName: "Video",
    kind: "upcoming",
    purpose: "Video-generation technology with native audio in Meta's Muse media family.",
    summary:
      "Meta previewed Muse Video with native audio on July 7, 2026. That announcement describes a planned creator capability; it does not establish current developer availability.",
    howItWorks:
      "The preview describes audiovisual generation. Confirm current access and integration options before planning a product around it.",
    bestFor: ["Creator media planning", "Future audiovisual applications"],
    capabilities: ["High-fidelity video (announced)", "Native audio (announced)"],
    useCases: ["Creative previews when generally available"],
    limitations: [
      "Current access is not established by the preview announcement",
      "No developer API is verified in this guide",
    ],
    specs: [
      { label: "Status", value: "Preview / roadmap" },
      { label: "Family", value: "Muse media models" },
    ],
    sources: [
      {
        label: "Image and Video announcement",
        href: "https://ai.meta.com/blog/introducing-muse-image-muse-video-msl/",
      },
    ],
  },
];

export function getModel(slug: string): MuseModel | undefined {
  return models.find((m) => m.slug === slug);
}
