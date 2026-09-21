import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Studio — SYNCLAB Vocal Forge";
const description = "See the connected SYNCLAB production environment with timeline, piano roll, mixer, automation and XY control.";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/studio" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/studio" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="studio" />;
}
