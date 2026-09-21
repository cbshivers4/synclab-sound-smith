import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "AI Tools — SYNCLAB Vocal Forge";
const description = "AI-assisted music creation tools for vocals, beats, co-production, stem separation, voice removal and mastering.";

export const Route = createFileRoute("/ai-tools")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/ai-tools" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/ai-tools" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="ai" />;
}
