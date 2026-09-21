import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const title = "Desktop — SYNCLAB Vocal Forge";
const description = "SYNCLAB Vocal Forge desktop plans for macOS, Windows, native audio, MIDI, project recovery and local rendering.";

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
