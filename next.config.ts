import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/architecture", destination: "/how-it-works", permanent: true },
      { source: "/timeline", destination: "/updates", permanent: true },
      { source: "/labs", destination: "/how-it-works", permanent: true },
      { source: "/labs/:path*", destination: "/how-it-works", permanent: true },
      { source: "/code", destination: "/explore/code", permanent: true },
      { source: "/local", destination: "/explore/glimmer", permanent: true },
      { source: "/compare", destination: "/use-cases", permanent: true },
      { source: "/hardware", destination: "/updates", permanent: true },
      {
        source: "/projects/browser-verified-web-designer",
        destination: "/examples/browser-based-website-development",
        permanent: true,
      },
      {
        source: "/projects/iterative-game-developer",
        destination: "/examples/iterative-game-development",
        permanent: true,
      },
      {
        source: "/projects/four-agent-product-studio",
        destination: "/examples/multi-agent-product-studio",
        permanent: true,
      },
      {
        source: "/projects/autonomous-github-bot",
        destination: "/examples/github-automation",
        permanent: true,
      },
      {
        source: "/projects/computer-use-linux",
        destination: "/examples/computer-use-on-linux",
        permanent: true,
      },
      {
        source: "/projects/glimmer-local-code-review",
        destination: "/examples/local-code-review-with-glimmer",
        permanent: true,
      },
      {
        source: "/projects/screenshot-bug-fixer",
        destination: "/examples/screenshot-bug-fixing",
        permanent: true,
      },
      {
        source: "/projects/scheduled-agents",
        destination: "/examples/scheduled-monitoring",
        permanent: true,
      },
      {
        source: "/projects/agent-fan-out",
        destination: "/examples/parallel-worktrees",
        permanent: true,
      },
      {
        source: "/projects/voice-controlled-chess",
        destination: "/examples/voice-controlled-application",
        permanent: true,
      },
      { source: "/models/:path*", destination: "/explore/:path*", permanent: true },
      { source: "/projects/:path*", destination: "/examples/:path*", permanent: true },
      { source: "/security", destination: "/safety", permanent: true },
      { source: "/resources", destination: "/#sources", permanent: true },
    ];
  },
};

export default nextConfig;
