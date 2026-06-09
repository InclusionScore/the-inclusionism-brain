import slugify from "slugify";

export type IssueLanding = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  question: string;
  inclusionistFrame: string;
  whyItMatters: string;
  keywords: string[];
  canonQueries: string[];
  compareSlugs: string[];
};

function issue(data: Omit<IssueLanding, "slug">): IssueLanding {
  return {
    ...data,
    slug: slugify(data.title, { lower: true, strict: true })
  };
}

export const issueLandings = [
  issue({
    title: "AI",
    seoTitle: "What does Inclusionism say about AI?",
    description: "Explore AI through value creation, ownership, agency, legitimacy, and belonging.",
    question: "Who owns the value created by artificial intelligence, data, automation, and human-machine interaction?",
    inclusionistFrame:
      "Inclusionism treats AI as a civilizational test of recognition. If intelligence systems generate value from human data, labor, culture, infrastructure, and interaction, then legitimacy depends on how that value is attributed, owned, governed, and shared.",
    whyItMatters:
      "AI can accelerate abundance, extraction, surveillance, or shared agency. The question is not only whether AI is powerful, but whether AI systems expand or narrow legitimate participation.",
    keywords: ["AI ownership", "artificial intelligence ethics", "AI and democracy", "AI agency", "AI value creation"],
    canonQueries: ["AI intelligence ownership agency data value", "artificial intelligence data systems ownership legitimacy", "intelligence agency value participation"],
    compareSlugs: ["technocracy", "ai-accelerationism", "strong-ai-successionism", "transhumanism"]
  }),
  issue({
    title: "Democracy",
    seoTitle: "Inclusionism and democracy",
    description: "A framework for democracy beyond voting: participation, recognition, agency, and legitimacy.",
    question: "Can democracy remain legitimate if economic, technological, and cultural value is created by many agents but recognized by only a few?",
    inclusionistFrame:
      "Inclusionism agrees that political participation matters, but asks whether participation is real when ownership, data, recognition, and institutional agency remain concentrated.",
    whyItMatters:
      "The 21st century democracy question is not only who votes. It is who has agency in the systems that shape value, identity, information, ownership, and belonging.",
    keywords: ["democracy", "economic democracy", "legitimacy", "participation", "civilizational democracy"],
    canonQueries: ["democracy agency legitimacy participation governance", "recognition agency legitimacy fairness belonging", "governance participation ownership value"],
    compareSlugs: ["democracy", "liberalism", "democratic-socialism", "technocracy"]
  }),
  issue({
    title: "Economics",
    seoTitle: "Inclusionism and economics",
    description: "Economic questions of value, extraction, ownership, participation, and fairness.",
    question: "What economic system can recognize value creation without turning interaction into extraction?",
    inclusionistFrame:
      "Inclusionism begins from the claim that value emerges through interaction among differentiated agents. Economics must therefore ask who contributes, who is recognized, who owns, and who belongs.",
    whyItMatters:
      "Markets, states, platforms, data systems, and AI all allocate recognition. A 21st century economics must explain value beyond wages, prices, and capital ownership alone.",
    keywords: ["economic justice", "ownership economy", "capitalism alternatives", "value creation", "equitable ownership"],
    canonQueries: ["economics value ownership extraction participation", "universal basic ownership value agency", "capitalism ownership value legitimacy"],
    compareSlugs: ["capitalism", "socialism", "market-socialism", "universal-basic-ownership"]
  }),
  issue({
    title: "Race and Class",
    seoTitle: "Inclusionism on race, class, and caste",
    description: "Race and class as systems of recognition, exclusion, ownership, and belonging.",
    question: "How do race, class, and caste shape whose value is recognized and whose agency is legitimated?",
    inclusionistFrame:
      "Inclusionism treats race and class as civilizational recognition systems. They are not merely identities or income groups; they are histories of value attribution, exclusion, agency denial, and contested belonging.",
    whyItMatters:
      "A society cannot claim fairness if entire groups have been structurally included as sources of value while excluded from ownership, legitimacy, and belonging.",
    keywords: ["race and class", "caste", "equity", "belonging", "recognition"],
    canonQueries: ["race class caste recognition belonging equity", "human systems fairness legitimacy belonging", "exclusion recognition agency ownership"],
    compareSlugs: ["progressivism", "democratic-socialism", "liberalism", "fascism"]
  }),
  issue({
    title: "Ownership",
    seoTitle: "Inclusionism and ownership",
    description: "Ownership as a question of value attribution, agency, participation, and legitimacy.",
    question: "Who should own the systems that generate value from interaction, data, labor, culture, intelligence, and civilization?",
    inclusionistFrame:
      "Inclusionism sees ownership as more than possession. Ownership is a legitimacy structure that determines who has agency over value-generating systems.",
    whyItMatters:
      "The future of AI, platforms, data, housing, work, and democracy depends on whether ownership follows contribution and affectedness or only capital control.",
    keywords: ["ownership", "Universal Basic Ownership", "data ownership", "AI ownership", "economic agency"],
    canonQueries: ["ownership universal basic ownership value agency", "data ownership AI ownership participation", "legitimacy ownership value recognition"],
    compareSlugs: ["capitalism", "universal-basic-ownership", "stakeholder-capitalism", "universal-basic-income"]
  }),
  issue({
    title: "Transhumanism",
    seoTitle: "Inclusionism and transhumanism",
    description: "Technology, enhancement, posthuman futures, agency, and belonging.",
    question: "Can human enhancement expand agency without creating new castes of capability, ownership, and belonging?",
    inclusionistFrame:
      "Inclusionism can welcome expanded capability, but it asks whether enhancement systems are legitimate, participatory, and owned in ways that preserve belonging.",
    whyItMatters:
      "The future of enhancement will test whether technology deepens shared agency or becomes a civilizational exit for those already closest to power.",
    keywords: ["transhumanism", "posthumanism", "human enhancement", "AI future", "agency"],
    canonQueries: ["transhumanism posthumanism intelligence agency belonging", "technology agency optimization ownership", "AI intelligence civilization belonging"],
    compareSlugs: ["transhumanism", "posthumanism", "longtermism", "strong-ai-successionism"]
  }),
  issue({
    title: "Belonging",
    seoTitle: "Inclusionism and belonging",
    description: "Belonging as a civilizational outcome of interaction, recognition, agency, legitimacy, and fairness.",
    question: "What makes people belong to a civilization rather than merely exist inside its institutions?",
    inclusionistFrame:
      "Inclusionism treats belonging as the end of a social chain: interaction creates value; recognition grants agency; legitimacy and fairness make belonging durable.",
    whyItMatters:
      "Belonging cannot be reduced to culture, citizenship, or representation. It becomes real when people are recognized as agents in the systems that shape their lives.",
    keywords: ["belonging", "social cohesion", "civilization", "recognition", "agency"],
    canonQueries: ["belonging recognition agency legitimacy fairness", "human systems civilization belonging", "interaction value recognition agency belonging"],
    compareSlugs: ["conservatism", "fascism", "progressivism", "posthumanism"]
  }),
  issue({
    title: "Legitimacy",
    seoTitle: "Inclusionism and legitimacy",
    description: "Legitimacy as the bridge between recognized value, agency, fairness, and civilizational trust.",
    question: "When does a system deserve obedience, trust, ownership, or authority?",
    inclusionistFrame:
      "Inclusionism treats legitimacy as the test of whether value recognition and agency are fair enough to sustain belonging.",
    whyItMatters:
      "Institutions, markets, AI systems, democracies, and ownership regimes all face legitimacy crises when affected agents are excluded from recognition and participation.",
    keywords: ["legitimacy", "institutional trust", "agency", "fairness", "governance"],
    canonQueries: ["legitimacy agency recognition fairness governance", "value recognition legitimacy ownership", "civilization legitimacy belonging agency"],
    compareSlugs: ["democracy", "technocracy", "liberalism", "longtermism"]
  })
];

export function getIssueLanding(slug: string) {
  return issueLandings.find((issue) => issue.slug === slug);
}
