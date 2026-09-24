import { siteConfig, siteUrl } from "@/lib/site";

export const entityIds = {
  website: siteUrl("/#website"),
  inclusionism: siteUrl("/what-is-inclusionism#inclusionism"),
  canon: siteUrl("/notes#canon"),
  jamesFeltonKeith: siteUrl("/about/james-felton-keith#person"),
  keithInstitute: siteUrl("/about/keith-institute#organization")
};

export const jamesFeltonKeithEntity = {
  "@type": "Person",
  "@id": entityIds.jamesFeltonKeith,
  name: "James Felton Keith",
  url: siteUrl("/about/james-felton-keith"),
  description: "Engineer, labor economist, author, and founder of Inclusionism.",
  sameAs: [
    "https://www.jamesfeltonkeith.com/",
    "https://www.jamesfeltonkeith.com/bio",
    "https://jamesfeltonkeith.substack.com/"
  ],
  affiliation: { "@id": entityIds.keithInstitute }
};

export const keithInstituteEntity = {
  "@type": "Organization",
  "@id": entityIds.keithInstitute,
  name: "Keith Institute",
  url: siteUrl("/about/keith-institute"),
  logo: siteUrl("/brand/inclusionism-logo-border.png"),
  description: "An action-oriented think tank supporting research and programs for economic and educational inclusion.",
  sameAs: ["https://www.keithinstitute.org/", "https://www.linkedin.com/company/keithinstitute/"]
};

export const inclusionismEntity = {
  "@type": "CreativeWork",
  "@id": entityIds.inclusionism,
  name: "Inclusionism",
  url: siteUrl("/what-is-inclusionism"),
  description: siteConfig.description,
  creator: { "@id": entityIds.jamesFeltonKeith },
  publisher: { "@id": entityIds.keithInstitute },
  hasPart: { "@id": entityIds.canon }
};

export const websiteEntity = {
  "@type": "WebSite",
  "@id": entityIds.website,
  name: "Inclusionism",
  alternateName: "Inclusionism Canon",
  url: siteUrl("/"),
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": entityIds.keithInstitute },
  about: { "@id": entityIds.inclusionism }
};

export function breadcrumb(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path)
    }))
  };
}
