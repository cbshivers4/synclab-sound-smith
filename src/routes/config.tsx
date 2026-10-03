import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Launch Settings — SYNCLAB";
const description = "Configure SYNCLAB download links, support routing, pricing and release information.";

export const Route = createFileRoute("/config")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/config" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/config" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="config" />;
}
