import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GraphExplorer from "@/components/GraphExplorer";
import { getGraph } from "@/lib/content";
import { isLocale, localePath, t } from "@/lib/i18n";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const labels = t[locale];
  return {
    title: metadataTitle(labels.nav.graph),
    description: labels.meta.graph,
    alternates: { canonical: siteUrl(localePath(locale, "/graph")) },
    openGraph: {
      title: socialTitle(labels.nav.graph),
      description: labels.meta.graph,
      url: siteUrl(localePath(locale, "/graph")),
      siteName: siteConfig.name,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

export default async function LocalizedGraphPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];
  return <GraphExplorer graph={getGraph()} labels={{ ...labels.graph, openNote: labels.common.openNote }} noteHrefPrefix={localePath(locale, "/notes")} />;
}
