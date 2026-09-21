import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "SYNCLAB Support — Vocal Forge";
const description = "Contact SYNCLAB Support, report product problems and find help for music-production workflows.";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/support" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/support" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="support" />;
}
