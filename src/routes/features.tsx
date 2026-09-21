import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Features — SYNCLAB Vocal Forge";
const description = "Explore SYNCLAB Vocal Forge features for AI vocals, beat creation, synthesis, sampling, mixing and mastering.";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/features" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/features" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="features" />;
}
