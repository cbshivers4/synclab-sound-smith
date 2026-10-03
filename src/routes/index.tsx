import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const pageTitle = "SYNCLAB — Create. Record. Produce. Finish.";
const pageDescription =
  "SYNCLAB is a connected music-production workstation for recording, producing, drum sequencing, synthesis, sampling, mixing and exporting.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "product" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "SYNCLAB",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "macOS, Windows",
          description: pageDescription,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SynclabSite />;
}
