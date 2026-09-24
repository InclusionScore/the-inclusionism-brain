import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, jamesFeltonKeithEntity } from "@/lib/entities";
import { publications } from "@/lib/publications";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("James Felton Keith | Founder of Inclusionism"),
  description: "James Felton Keith is an engineer, labor economist, author, and founder of Inclusionism whose work examines data, AI, ownership, agency, and equity.",
  alternates: { canonical: siteUrl("/about/james-felton-keith") },
  openGraph: {
    title: socialTitle("James Felton Keith | Founder of Inclusionism"),
    description: "Author and founder of Inclusionism, a code of equity connecting value, agency, ownership, legitimacy, and belonging.",
    url: siteUrl("/about/james-felton-keith"),
    siteName: siteConfig.name,
    type: "profile",
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function JamesFeltonKeithPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          name: "James Felton Keith",
          url: siteUrl("/about/james-felton-keith"),
          mainEntity: jamesFeltonKeithEntity,
          hasPart: publications.map((publication) => ({
            "@type": "Book",
            name: publication.title,
            datePublished: String(publication.year),
            author: { "@id": jamesFeltonKeithEntity["@id"] },
            url: publication.url
          }))
        },
        breadcrumb([
          { name: "About", path: "/about/james-felton-keith" },
          { name: "James Felton Keith", path: "/about/james-felton-keith" }
        ])
      ]} />
      <p className="brand-kicker">Founder / Author</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">James Felton Keith</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-xl font-bold leading-9 text-white">
        Engineer, labor economist, author, and founder of Inclusionism.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <article className="max-w-4xl space-y-6 text-base leading-8 text-white/72">
          <p>
            James Felton Keith developed Inclusionism as a philosophical and civilizational framework for examining how differentiated agents generate value through interaction and how systems recognize, attribute, distribute, and legitimate that value.
          </p>
          <p>
            His research connects data economics, information ownership, artificial intelligence, labor, institutional design, and the future of work. Across this body of work, a recurring question is whether the people and communities whose participation creates value receive meaningful ownership, influence, and self-determination in return.
          </p>
          <p>
            Keith is the founder of InclusionScore and serves as chair of the Keith Institute. His work on Data Is Labor and data unions extends Inclusionism into the political economy of personal data and collective intelligence.
          </p>
          <section className="border-y border-white/15 py-7">
            <h2 className="brand-title text-4xl leading-none text-signal">Inclusionism</h2>
            <p className="mt-4">
              Inclusionism is a code of equity: a framework for recognizing, attributing, distributing, and legitimizing value so that the agents and communities who contribute to its creation receive meaningful ownership, participation, influence, and self-determination in the systems they help create.
            </p>
            <Link href="/what-is-inclusionism" className="outline-button mt-5 inline-block px-4 py-3 text-xs">Read the Introduction</Link>
          </section>
        </article>

        <aside className="space-y-5">
          <section className="ink-panel brand-rule p-5">
            <h2 className="brand-title text-3xl leading-none">Authoritative Profiles</h2>
            <div className="mt-4 space-y-2 text-sm font-bold">
              <a href="https://www.jamesfeltonkeith.com/bio" rel="me" className="block border border-white/15 bg-black px-3 py-2 hover:border-signal">Official biography</a>
              <a href="https://jamesfeltonkeith.substack.com/" rel="me" className="block border border-white/15 bg-black px-3 py-2 hover:border-signal">Essays on Substack</a>
              <a href="https://www.keithinstitute.org/" className="block border border-white/15 bg-black px-3 py-2 hover:border-signal">Keith Institute</a>
            </div>
          </section>
          <section className="ink-panel p-5">
            <h2 className="brand-title text-3xl leading-none text-signal">Continue Reading</h2>
            <div className="mt-4 space-y-2 text-sm font-bold">
              <Link href="/publications" className="block border border-white/15 bg-black px-3 py-2 hover:border-signal">Books and Publications</Link>
              <Link href="/essays" className="block border border-white/15 bg-black px-3 py-2 hover:border-signal">Essays</Link>
              <Link href="/notes" className="block border border-white/15 bg-black px-3 py-2 hover:border-signal">Inclusionism Canon</Link>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
