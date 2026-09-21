import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const pageTitle = "SYNCLAB Vocal Forge — Create. Record. Produce. Finish.";
const pageDescription =
  "SYNCLAB Vocal Forge is a connected music-production workstation for recording, producing, AI vocals, beats, synthesis, sampling, mixing and mastering.";

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
          name: "SYNCLAB Vocal Forge",
          applicationCategory: "MultimediaApplication",
          operatingSystem: "macOS, Windows, Web",
          description: pageDescription,
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
            availability: "https://schema.org/PreOrder",
          },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <SynclabSite />;
}
