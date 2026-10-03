import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Features — SYNCLAB Studio";
const description = "Explore SYNCLAB studio instruments, drum sequencing, recording, mixing and export.";

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
