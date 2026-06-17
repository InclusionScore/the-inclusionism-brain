import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, localePath, t } from "@/lib/i18n";
import { issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const labels = t[locale];
  return {
    title: metadataTitle(labels.nav.issues),
    description: labels.meta.home,
    alternates: { canonical: siteUrl(localePath(locale, "/issues")) },
    openGraph: {
      title: socialTitle(labels.nav.issues),
      description: labels.meta.home,
      url: siteUrl(localePath(locale, "/issues")),
      siteName: siteConfig.name,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

export default async function LocalizedIssuesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">{labels.nav.issues}</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">{labels.home.issues}</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">{labels.meta.home}</p>
      <div className="mt-10 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
        {issueLandings.map((issue) => (
          <Link key={issue.slug} href={localePath(locale, `/issues/${issue.slug}`)} className="group min-h-64 border-b border-r border-white/15 bg-black p-5 hover:bg-white hover:text-black">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red group-hover:text-black">{labels.nav.issues}</p>
            <h2 className="brand-title mt-4 text-4xl leading-none group-hover:text-black">{issue.title}</h2>
            <p className="mt-4 text-sm leading-6 text-white/60 group-hover:text-black/70">{issue.question}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
