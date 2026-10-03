import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Help Center — SYNCLAB";
const description = "Search SYNCLAB Help Center topics for recording, MIDI, synth, drums, sampling, mixing, export and desktop apps.";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/help-center" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/help-center" }],
  }),
  component: Page,
});

function Page() {
  return <SynclabSite mode="help" />;
}
