import { createFileRoute } from "@tanstack/react-router";

import { SynclabSite } from "@/components/synclab/SynclabSite";

const pageTitle = "Download SYNCLAB — macOS and Windows";
const pageDescription =
  "Download SYNCLAB for macOS and Windows. Find release notes and installation guides.";

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
