import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { comparisonAxes, dynamicChain, frameworkComparisons, getFrameworkComparison } from "@/lib/frameworks";
import { searchNotes } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return frameworkComparisons.map((framework) => ({ slug: framework.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const framework = getFrameworkComparison(slug);
  if (!framework) return {};

  return {
    title: metadataTitle(`Inclusionism vs ${framework.name}`),
    description: `Compare Inclusionism with ${framework.name} across value, agency, ownership, legitimacy, and belonging.`,
    keywords: ["Inclusionism", framework.name, `Inclusionism vs ${framework.name}`, "value", "agency", "ownership", "legitimacy", "belonging"],
    alternates: { canonical: siteUrl(`/compare/${framework.slug}`) },
    openGraph: {
      title: socialTitle(`Inclusionism vs ${framework.name}`),
      description: `Compare Inclusionism with ${framework.name} across value, agency, ownership, legitimacy, and belonging.`,
      url: siteUrl(`/compare/${framework.slug}`),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(`Inclusionism vs ${framework.name}`),
      description: `Compare Inclusionism with ${framework.name} across value, agency, ownership, legitimacy, and belonging.`,
      images: ["/brand/og-image.png"]
    }
  };
}

function AxisRow({ label, left, right, value }: { label: string; left: string; right: string; value: number }) {
  return (
    <div className="border-b border-white/15 py-4 last:border-b-0">
      <div className="flex items-center justify-between gap-4">
        <p className="brand-title text-2xl leading-none text-signal">{label}</p>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-white/45">{value}/100</p>
      </div>
      <div className="mt-3 h-3 border border-white/30 bg-white/10">
        <div className="h-full bg-signal" style={{ width: `${value}%` }} />
      </div>
      <div className="mt-2 flex justify-between gap-4 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white/45">
        <span>{left}</span>
        <span className="text-right">{right}</span>
      </div>
    </div>
  );
}

export default async function FrameworkComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const framework = getFrameworkComparison(slug);
  if (!framework) notFound();

  const relatedNotes = searchNotes(`${framework.name} value agency ownership legitimacy belonging interaction civilization AI democracy race class`, 8);
  const sections = [
    ["Summary of the other framework", framework.summary],
    ["Where Inclusionism agrees", framework.agrees],
    ["Where Inclusionism disagrees", framework.disagrees],
    ["Core distinction", framework.coreDistinction],
    ["View of value", framework.valueView],
    ["View of agency", framework.agencyView],
    ["View of ownership", framework.ownershipView],
    ["View of legitimacy", framework.legitimacyView],
    ["View of belonging", framework.belongingView],
    ["Inclusionist critique", framework.inclusionistCritique],
    ["Strongest critique of Inclusionism from this framework", framework.strongestCritique],
    ["Possible synthesis", framework.possibleSynthesis]
  ];

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `Inclusionism vs ${framework.name}`,
            description: `Compare Inclusionism with ${framework.name} across value, agency, ownership, legitimacy, and belonging.`,
            author: { "@type": "Organization", name: "Inclusionism" },
            publisher: { "@type": "Organization", name: "Inclusionism" },
            mainEntityOfPage: siteUrl(`/compare/${framework.slug}`),
            about: [
              { "@type": "Thing", name: "Inclusionism" },
              { "@type": "Thing", name: framework.name },
              { "@type": "Thing", name: "value" },
              { "@type": "Thing", name: "agency" },
              { "@type": "Thing", name: "legitimacy" },
              { "@type": "Thing", name: "belonging" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Compare", item: siteUrl("/compare") },
              { "@type": "ListItem", position: 2, name: `Inclusionism vs ${framework.name}`, item: siteUrl(`/compare/${framework.slug}`) }
            ]
          }
        ]}
      />
      <article className="max-w-4xl">
        <p className="brand-kicker">Compare / {framework.group}</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">Inclusionism vs {framework.name}</h1>
        <p className="mt-6 max-w-3xl border-l-4 border-red pl-5 text-lg leading-8 text-white/70">
          Inclusionism is a theory of how value and agency should remain connected. This comparison tests whether it explains more than {framework.name}
          without flattening the other framework into a simple left-right spectrum.
        </p>

        <section className="mt-10 border-y border-white/15 py-5">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-red">Interaction → Value → Recognition → Attribution → Ownership → Agency → Equity → Legitimacy → Belonging</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-9">
            {dynamicChain.map((item) => (
              <div key={item} className="border border-white/15 bg-black p-3">
                <span className="brand-title text-xl leading-none">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {sections.map(([title, body]) => (
            <div key={title} className="grid gap-3 py-6 md:grid-cols-[260px_1fr]">
              <h2 className="brand-title text-3xl leading-none text-signal">{title}</h2>
              <p className="text-sm leading-7 text-white/72">{body}</p>
            </div>
          ))}
        </section>
      </article>

      <aside className="space-y-5">
        <section className="ink-panel brand-rule p-5">
          <h2 className="brand-title text-3xl leading-none">Axis Map</h2>
          <div className="mt-4">
            {comparisonAxes.map((axis) => (
              <AxisRow
                key={axis.key}
                label={axis.label}
                left={axis.left}
                right={axis.right}
                value={framework.axes[axis.key]}
              />
            ))}
          </div>
        </section>

        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl leading-none text-red">Related Canon Notes</h2>
          <div className="mt-4 space-y-3">
            {relatedNotes.map((note) => (
              <Link key={note.slug} href={`/notes/${note.slug}`} className="block border border-white/15 bg-black p-3 hover:border-signal">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-signal">{note.category}</p>
                <p className="brand-title mt-2 text-2xl leading-none">{note.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/45">{note.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
