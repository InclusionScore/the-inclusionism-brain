import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, keithInstituteEntity } from "@/lib/entities";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Keith Institute"),
  description: "Keith Institute is an action-oriented think tank supporting research and programs for economic and educational inclusion.",
  alternates: { canonical: siteUrl("/about/keith-institute") },
  openGraph: {
    title: socialTitle("Keith Institute"),
    description: "The institutional home supporting the public Inclusionism canon.",
    url: siteUrl("/about/keith-institute"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function KeithInstitutePage() {
  return (
    <main className="brain-grid mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "ProfilePage", name: "Keith Institute", url: siteUrl("/about/keith-institute"), mainEntity: keithInstituteEntity },
        breadcrumb([{ name: "Keith Institute", path: "/about/keith-institute" }])
      ]} />
      <p className="brand-kicker">Institution</p>
      <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">Keith Institute</h1>
      <p className="mt-6 border-l-4 border-signal pl-5 text-xl font-bold leading-9 text-white">
        An action-oriented think tank supporting research and programs for economic and educational inclusion.
      </p>
      <div className="mt-10 space-y-6 text-base leading-8 text-white/72">
        <p>
          Keith Institute supports the public development and circulation of Inclusionism as an intellectual system. The canon connects philosophical work on value and agency with applied questions in data governance, artificial intelligence, ownership, labor, institutions, and belonging.
        </p>
        <p>
          The Institute's relationship to Inclusionism is one of stewardship and publication. Canon concepts remain open to critique, debate, clarification, and revision through the site's public workflow.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href="https://www.keithinstitute.org/" className="hard-button px-5 py-3 text-xs">Visit Keith Institute</a>
        <Link href="/about/james-felton-keith" className="outline-button px-5 py-3 text-xs">James Felton Keith</Link>
        <Link href="/notes" className="outline-button px-5 py-3 text-xs">Read the Canon</Link>
      </div>
    </main>
  );
}
