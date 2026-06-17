import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
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
  authors: [{ name: "Inclusionism" }],
  creator: "Inclusionism",
  publisher: "Inclusionism",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png"
  },
  alternates: {
    canonical: siteUrl()
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
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Inclusionism",
              url: siteUrl("/"),
              logo: siteUrl("/brand/inclusionism-logo-border.png"),
              description: siteConfig.description
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Inclusionism",
              url: siteUrl("/"),
              description: siteConfig.description,
              inLanguage: "en"
            }
          ]}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
