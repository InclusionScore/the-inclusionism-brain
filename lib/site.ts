export const siteConfig = {
  name: "Inclusionism",
  title: "Inclusionism | A Code of Equity",
  description: "Inclusionism is James Felton Keith's philosophical and civilizational framework for connecting value, agency, equity, legitimacy, and belonging.",
  domains: ["inclusionism.org", "www.inclusionism.org", "brain.inclusionism.org"]
};

export function siteUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_CANONICAL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://www.inclusionism.org");
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function metadataTitle(title?: string) {
  return title || siteConfig.name;
}

export function socialTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}
