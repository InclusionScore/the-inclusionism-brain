import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { inclusionismEntity, jamesFeltonKeithEntity, keithInstituteEntity, websiteEntity } from "@/lib/entities";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "James Felton Keith", url: siteUrl("/about/james-felton-keith") }],
  creator: "James Felton Keith",
  publisher: "Keith Institute",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  },
  alternates: {
    types: { "application/rss+xml": siteUrl("/feed.xml") }
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl(),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/brand/inclusionism-logo-border.png",
        width: 1080,
        height: 1080,
        alt: "Inclusionism"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [websiteEntity, inclusionismEntity, jamesFeltonKeithEntity, keithInstituteEntity]
          }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
