import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Pricing — SYNCLAB Vocal Forge";
const description = "SYNCLAB Vocal Forge pricing plans for free, creator and professional studio workflows.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/pricing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="pricing" />;
}
