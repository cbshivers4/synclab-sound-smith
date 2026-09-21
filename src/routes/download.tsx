import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const pageTitle = "Download SYNCLAB Vocal Forge — macOS, Windows and Web";
const pageDescription =
  "Download SYNCLAB Vocal Forge for macOS, Windows or the Web. Version details, file sizes, checksums, release notes, installation guides and system requirements.";

export const Route = createFileRoute("/download")({
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/download" }],
  }),
  component: DownloadPage,
});

function DownloadPage() {
  return <SynclabSite mode="download" />;
}
