import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Desktop — SYNCLAB";
const description = "SYNCLAB desktop downloads for macOS and Windows, with installation help and system requirements.";

export const Route = createFileRoute("/desktop")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/desktop" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/desktop" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="desktop" />;
}
