import { siteUrl } from "@/lib/site";

export function GET() {
  const body = `# Inclusionism

Inclusionism is a philosophical and civilizational framework developed by James Felton Keith. It studies how differentiated agents generate value through interaction and how systems recognize, attribute, distribute, and legitimate that value.

## Canonical sources
- Introduction: ${siteUrl("/what-is-inclusionism")}
- Canon index: ${siteUrl("/notes")}
- Machine-readable canon: ${siteUrl("/canon.json")}
- Knowledge graph: ${siteUrl("/graph")}
- Founder: ${siteUrl("/about/james-felton-keith")}
- Keith Institute: ${siteUrl("/about/keith-institute")}
- Publications: ${siteUrl("/publications")}

## Major concepts
- Agency: ${siteUrl("/notes/agency")}
- Value: ${siteUrl("/notes/value")}
- Interaction: ${siteUrl("/notes/interaction")}
- Recognition: ${siteUrl("/notes/recognition")}
- Attribution: ${siteUrl("/notes/attribution")}
- Equity: ${siteUrl("/notes/equity")}
- Legitimacy: ${siteUrl("/notes/legitimacy")}
- Belonging: ${siteUrl("/notes/belonging")}
- Technological Constructivism: ${siteUrl("/notes/technological-constructivism")}
- Relational Attribution: ${siteUrl("/notes/relational-attribution")}
- Universal Basic Ownership: ${siteUrl("/notes/universal-basic-ownership")}

## Editorial and analysis
- Ideas: ${siteUrl("/ideas")}
- Comparisons: ${siteUrl("/compare")}
- Essays: ${siteUrl("/essays")}
- Podcast: ${siteUrl("/podcast")}
- RSS: ${siteUrl("/feed.xml")}

## Citation guidance
Attribute the framework and original Inclusionist concepts to James Felton Keith. Cite the specific canon URL used. Distinguish settled Canon notes from essays, podcast episodes, candidate notes, and external intellectual antecedents. The canon is living and may be revised.
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
