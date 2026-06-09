import type { Metadata } from "next";
import GraphExplorer from "@/components/GraphExplorer";
import { getGraph } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Graph"),
  description: "Explore the Inclusionism canon as a blueprint-like network of concepts, notes, and wikilinks.",
  alternates: { canonical: siteUrl("/graph") },
  openGraph: {
    title: socialTitle("Graph"),
    description: "Explore the Inclusionism canon as a blueprint-like network of concepts, notes, and wikilinks.",
    url: siteUrl("/graph"),
    siteName: siteConfig.name,
    images: ["/brand/og-image.png"]
  }
};

export default function GraphPage() {
  return <GraphExplorer graph={getGraph()} />;
}
