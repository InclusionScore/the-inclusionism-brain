import slugify from "slugify";

export type FrameworkGroup = "Political" | "Economic" | "Future-Oriented";

export type FrameworkComparison = {
  slug: string;
  name: string;
  group: FrameworkGroup;
  summary: string;
  agrees: string;
  disagrees: string;
  coreDistinction: string;
  valueView: string;
  agencyView: string;
  ownershipView: string;
  legitimacyView: string;
  belongingView: string;
  inclusionistCritique: string;
  strongestCritique: string;
  possibleSynthesis: string;
  axes: {
    political: number;
    economic: number;
    civilizational: number;
    technological: number;
  };
};

function makeComparison(data: Omit<FrameworkComparison, "slug">): FrameworkComparison {
  return {
    ...data,
    slug: slugify(data.name, { lower: true, strict: true })
  };
}

export const comparisonAxes = [
  { key: "political", label: "Political", left: "authority", right: "participation" },
  { key: "economic", label: "Economic", left: "extraction", right: "equitable ownership participation" },
  { key: "civilizational", label: "Civilizational", left: "exclusion", right: "belonging" },
  { key: "technological", label: "Technological", left: "optimization", right: "agency" }
] as const;

export const dynamicChain = ["Interaction", "Value", "Recognition", "Agency", "Legitimacy", "Fairness", "Belonging"];

const political: FrameworkComparison[] = [
  makeComparison({
    name: "Democracy",
    group: "Political",
    summary: "Democracy legitimates collective decisions through participation, representation, consent, and public accountability.",
    agrees: "Inclusionism agrees that legitimacy cannot be durable without participation and recognition of affected agents.",
    disagrees: "It disagrees when democracy becomes only vote-counting while ignoring who creates value, who is recognized, and who can participate meaningfully.",
    coreDistinction: "Democracy asks who decides; Inclusionism also asks whose interaction creates value and how that value becomes legitimate.",
    valueView: "Value is indirectly expressed through preferences, votes, public goods, and institutional outcomes.",
    agencyView: "Agency appears as citizenship, voice, rights, organizing power, and the capacity to contest authority.",
    ownershipView: "Ownership is usually left to constitutional and market arrangements unless democracy is explicitly economic.",
    legitimacyView: "Legitimacy comes from consent, process, rights, elections, and public accountability.",
    belongingView: "Belonging depends on whether formal citizenship becomes real social participation.",
    inclusionistCritique: "Democracy can legitimate exclusion if participation is formal but value recognition remains unequal.",
    strongestCritique: "Democrats may argue Inclusionism risks adding a vague moral layer above the clear legitimacy of democratic choice.",
    possibleSynthesis: "Deepen democracy by treating recognition, value attribution, and agency as democratic design problems.",
    axes: { political: 84, economic: 54, civilizational: 70, technological: 58 }
  }),
  makeComparison({
    name: "Liberalism",
    group: "Political",
    summary: "Liberalism centers individual rights, pluralism, legal equality, civil liberty, and limits on arbitrary power.",
    agrees: "Inclusionism agrees that agents require protected agency and that legitimacy must limit domination.",
    disagrees: "It disagrees when liberal neutrality hides unequal recognition, inherited exclusion, or ownership structures that narrow real agency.",
    coreDistinction: "Liberalism protects the individual from coercion; Inclusionism studies whether agents can participate in value creation and recognition.",
    valueView: "Value is often mediated by individual preference, contract, markets, and civil association.",
    agencyView: "Agency is primarily individual autonomy under rights and rule of law.",
    ownershipView: "Ownership is a protected domain of liberty, usually bounded by law and contract.",
    legitimacyView: "Legitimacy comes from rights, consent, constitutionalism, and procedural fairness.",
    belongingView: "Belonging is tolerated pluralism more than shared value recognition.",
    inclusionistCritique: "Liberalism can protect formal agency while leaving many agents unrecognized in economic and cultural systems.",
    strongestCritique: "Liberals may argue Inclusionism risks collectivizing recognition and weakening individual freedom.",
    possibleSynthesis: "Preserve liberal rights while expanding the institutions that make agency materially real.",
    axes: { political: 68, economic: 44, civilizational: 58, technological: 60 }
  }),
  makeComparison({
    name: "Conservatism",
    group: "Political",
    summary: "Conservatism emphasizes continuity, inherited institutions, social order, obligation, and skepticism toward rapid abstraction.",
    agrees: "Inclusionism agrees that legitimacy depends on durable institutions, trust, and civilizational continuity.",
    disagrees: "It disagrees when continuity protects inherited exclusion or treats past recognition systems as naturally legitimate.",
    coreDistinction: "Conservatism asks what must be preserved; Inclusionism asks what systems preserve agency, value, fairness, and belonging.",
    valueView: "Value is embedded in tradition, institutions, family, community, and accumulated social knowledge.",
    agencyView: "Agency is exercised within obligation, role, custom, and inherited moral order.",
    ownershipView: "Ownership is often tied to responsibility, stewardship, inheritance, and social stability.",
    legitimacyView: "Legitimacy comes from continuity, authority, custom, competence, and social trust.",
    belongingView: "Belonging is strong inside inherited communities but can become exclusionary at boundaries.",
    inclusionistCritique: "Conservatism can confuse stability with legitimacy when excluded agents were never fully recognized.",
    strongestCritique: "Conservatives may argue Inclusionism underestimates the fragility of order and the wisdom of inherited forms.",
    possibleSynthesis: "Treat tradition as a memory system while testing whether it still recognizes differentiated agents fairly.",
    axes: { political: 38, economic: 42, civilizational: 46, technological: 50 }
  }),
  makeComparison({
    name: "Socialism",
    group: "Political",
    summary: "Socialism critiques private control over production and seeks collective, social, or worker-oriented control of economic life.",
    agrees: "Inclusionism agrees that value production is social and that ownership structures shape agency and fairness.",
    disagrees: "It disagrees when socialism reduces value to labor or class and under-theorizes differentiated agents, intelligence, data, and legitimacy.",
    coreDistinction: "Socialism centers control of production; Inclusionism centers recognition and legitimate distribution of emergent value.",
    valueView: "Value is socially produced and often understood through labor, production, and class relations.",
    agencyView: "Agency is collective worker or public power over economic institutions.",
    ownershipView: "Ownership should be socialized, democratized, or redistributed away from concentrated capital.",
    legitimacyView: "Legitimacy comes from equality, solidarity, class emancipation, and democratic control.",
    belongingView: "Belonging is built through solidarity, shared provision, and anti-exploitation.",
    inclusionistCritique: "Socialism can flatten non-class forms of agency and miss how recognition systems create legitimacy beyond production.",
    strongestCritique: "Socialists may argue Inclusionism renames socialist concerns while avoiding the conflict required to change ownership.",
    possibleSynthesis: "Connect socialist anti-extraction to a broader theory of interaction, attribution, agency, and civilization.",
    axes: { political: 72, economic: 82, civilizational: 72, technological: 60 }
  }),
  makeComparison({
    name: "Democratic Socialism",
    group: "Political",
    summary: "Democratic socialism combines democratic politics with social ownership, strong public goods, and economic democracy.",
    agrees: "Inclusionism agrees with democratizing ownership and making economic agency part of political legitimacy.",
    disagrees: "It disagrees if democratic socialism remains mainly a policy program rather than a theory of value emergence across agents and systems.",
    coreDistinction: "Democratic socialism is a political-economic project; Inclusionism is a civilizational framework for recognition and legitimacy.",
    valueView: "Value is collectively produced and should support shared welfare rather than private extraction.",
    agencyView: "Agency emerges through political democracy, worker voice, unions, public goods, and social rights.",
    ownershipView: "Ownership should be more democratic, public, cooperative, or socially accountable.",
    legitimacyView: "Legitimacy comes from democratic control, equality, and reduced domination by capital.",
    belongingView: "Belonging is advanced through universal provision and social solidarity.",
    inclusionistCritique: "It may not fully explain AI, data, identity, civilization, and nonhuman intelligence as value-generating systems.",
    strongestCritique: "Democratic socialists may say Inclusionism is morally aligned but less institutionally specific.",
    possibleSynthesis: "Use democratic socialism as one institutional family inside a wider Inclusionist map of agency and ownership.",
    axes: { political: 80, economic: 86, civilizational: 76, technological: 62 }
  }),
  makeComparison({
    name: "Communism",
    group: "Political",
    summary: "Communism seeks a classless society beyond private ownership of production, often through revolutionary transformation.",
    agrees: "Inclusionism agrees that concentrated ownership can distort agency and legitimate extraction.",
    disagrees: "It disagrees with any totalizing class theory or state project that suppresses differentiated agency in the name of historical necessity.",
    coreDistinction: "Communism seeks class abolition; Inclusionism seeks legitimate recognition of value across differentiated agents.",
    valueView: "Value is rooted in social labor and class relations, with exploitation as the central contradiction.",
    agencyView: "Agency is collective class power moving toward a classless social order.",
    ownershipView: "Private capital ownership should be abolished or superseded by common ownership.",
    legitimacyView: "Legitimacy comes from emancipation from class domination and the end of exploitation.",
    belongingView: "Belonging is universal in aspiration but historically vulnerable to party-state exclusion.",
    inclusionistCritique: "Communism can collapse plural agency into a single revolutionary subject and justify coercive legitimacy.",
    strongestCritique: "Communists may argue Inclusionism is too reformist and too soft on ownership conflict.",
    possibleSynthesis: "Retain the critique of exploitation while rejecting any system that sacrifices agency and belonging to centralized certainty.",
    axes: { political: 42, economic: 92, civilizational: 68, technological: 50 }
  }),
  makeComparison({
    name: "Fascism",
    group: "Political",
    summary: "Fascism subordinates individuals to mythic national unity, hierarchy, violence, and authoritarian belonging.",
    agrees: "Inclusionism rejects fascism's premises; any overlap around belonging is only superficial and inverted.",
    disagrees: "It disagrees with fascism's exclusion, domination, anti-pluralism, coercive identity, and sacrifice of agency to hierarchy.",
    coreDistinction: "Fascism manufactures belonging through exclusion; Inclusionism seeks belonging through legitimate recognition of differentiated agents.",
    valueView: "Value is subordinated to nation, race, myth, strength, and state power.",
    agencyView: "Agency is granted by hierarchy and obedience, not protected as differentiated participation.",
    ownershipView: "Ownership may remain private but is subordinated to authoritarian national goals.",
    legitimacyView: "Legitimacy is claimed through myth, force, purity, leader authority, and enemies.",
    belongingView: "Belonging is intense but exclusionary, conditional, and often violent.",
    inclusionistCritique: "Fascism is a civilizational failure because it turns recognition into domination and belonging into exclusion.",
    strongestCritique: "Fascists would attack Inclusionism as too plural, too egalitarian, and too protective of difference.",
    possibleSynthesis: "There is no moral synthesis with fascism; the useful lesson is how belonging can be corrupted by exclusionary legitimacy.",
    axes: { political: 6, economic: 22, civilizational: 4, technological: 20 }
  }),
  makeComparison({
    name: "Technocracy",
    group: "Political",
    summary: "Technocracy grants authority to technical experts, optimization systems, and administrative competence.",
    agrees: "Inclusionism agrees that complex societies need intelligence, infrastructure, and institutional competence.",
    disagrees: "It disagrees when optimization substitutes for legitimacy, participation, and human agency.",
    coreDistinction: "Technocracy asks what works; Inclusionism asks for whom, recognized by whom, owned by whom, and legitimated how.",
    valueView: "Value is measured through efficiency, output, optimization, and system performance.",
    agencyView: "Agency is often mediated by expert design rather than participatory authorship.",
    ownershipView: "Ownership is secondary to control over systems, standards, infrastructure, and data.",
    legitimacyView: "Legitimacy comes from expertise, evidence, and performance.",
    belongingView: "Belonging is weak unless technical systems are accountable to lived experience.",
    inclusionistCritique: "Technocracy can become extraction through measurement when agents are optimized without being recognized.",
    strongestCritique: "Technocrats may argue Inclusionism is normatively rich but operationally imprecise.",
    possibleSynthesis: "Use technical competence under institutions that protect participation, agency, and ownership.",
    axes: { political: 28, economic: 46, civilizational: 48, technological: 34 }
  }),
  makeComparison({
    name: "Anarchism",
    group: "Political",
    summary: "Anarchism rejects domination and hierarchical authority in favor of voluntary association, mutual aid, and direct self-organization.",
    agrees: "Inclusionism agrees that agency and legitimacy are damaged by domination and exclusionary authority.",
    disagrees: "It disagrees if anti-authority commitments underbuild durable institutions for large-scale recognition, ownership, and civilization.",
    coreDistinction: "Anarchism resists hierarchy; Inclusionism evaluates which structures legitimate agency and belonging at scale.",
    valueView: "Value emerges through mutual aid, voluntary cooperation, commons, and self-managed production.",
    agencyView: "Agency is direct self-organization without imposed hierarchy.",
    ownershipView: "Ownership tends toward commons, use, mutuality, or anti-property commitments.",
    legitimacyView: "Legitimacy comes from consent, horizontality, mutual aid, and non-domination.",
    belongingView: "Belonging is voluntary and plural, but scaling stable belonging is difficult.",
    inclusionistCritique: "Anarchism can under-specify how complex systems recognize value and settle legitimacy disputes.",
    strongestCritique: "Anarchists may argue Inclusionism keeps too much institutional architecture and risks new authority.",
    possibleSynthesis: "Build recognition systems that are as participatory and non-dominating as possible while still sustaining scale.",
    axes: { political: 96, economic: 74, civilizational: 78, technological: 72 }
  }),
  makeComparison({
    name: "Progressivism",
    group: "Political",
    summary: "Progressivism seeks social reform, inclusion, institutional improvement, civil rights, and more equitable public policy.",
    agrees: "Inclusionism shares progressivism's moral orientation toward expanding dignity, fairness, and participation.",
    disagrees: "It disagrees if progressivism remains a policy style or left identity rather than a deeper theory of value, ownership, and civilization.",
    coreDistinction: "Progressivism pushes reform; Inclusionism explains why recognition, agency, and belonging are civilizational requirements.",
    valueView: "Value is tied to social welfare, rights, opportunity, and reducing unjust harms.",
    agencyView: "Agency is expanded through rights, representation, inclusion, and institutional reform.",
    ownershipView: "Ownership is often addressed through regulation, redistribution, and access rather than a full theory of value attribution.",
    legitimacyView: "Legitimacy comes from fairness, rights expansion, and responsiveness to marginalized groups.",
    belongingView: "Belonging is a central aspiration, though sometimes expressed through representation more than structural participation.",
    inclusionistCritique: "Progressivism can become reactive issue management without a unified account of value and civilization.",
    strongestCritique: "Progressives may argue Inclusionism is simply a more abstract version of progressive ethics.",
    possibleSynthesis: "Use progressivism's reform energy while grounding it in a broader civilizational theory.",
    axes: { political: 82, economic: 70, civilizational: 84, technological: 66 }
  })
];

const economic: FrameworkComparison[] = [
  makeComparison({
    name: "Capitalism",
    group: "Economic",
    summary: "Capitalism organizes production through private ownership, markets, capital allocation, profit, and competition.",
    agrees: "Inclusionism agrees that markets can reveal information, coordinate interaction, and reward some forms of value creation.",
    disagrees: "It disagrees when ownership and profit capture value created by agents who are not recognized, attributed, or empowered.",
    coreDistinction: "Capitalism rewards ownership of capital; Inclusionism asks whether ownership tracks actual value contribution and agency.",
    valueView: "Value is expressed through price, profit, investment return, productivity, and consumer demand.",
    agencyView: "Agency is market choice, entrepreneurship, labor mobility, and property rights.",
    ownershipView: "Ownership is private, transferable, accumulative, and central to control.",
    legitimacyView: "Legitimacy comes from voluntary exchange, property rights, competition, and growth.",
    belongingView: "Belonging is indirect and often conditional on market participation.",
    inclusionistCritique: "Capitalism can convert interaction into extraction when it recognizes capital more reliably than contribution.",
    strongestCritique: "Capitalists may argue Inclusionism weakens incentives and politicizes value attribution.",
    possibleSynthesis: "Keep market discovery while expanding ownership participation and recognition of distributed value creation.",
    axes: { political: 52, economic: 24, civilizational: 42, technological: 48 }
  }),
  makeComparison({
    name: "Feudalism",
    group: "Economic",
    summary: "Feudalism organizes land, obligation, protection, and status through inherited hierarchy and dependent tenure.",
    agrees: "Inclusionism can recognize that obligation and stewardship matter for social order.",
    disagrees: "It rejects inherited status systems that deny agency, mobility, and legitimate recognition.",
    coreDistinction: "Feudalism ties value and belonging to hierarchy; Inclusionism ties legitimacy to recognized interaction and agency.",
    valueView: "Value is land-based, status-bound, and extracted through obligation.",
    agencyView: "Agency is constrained by birth, role, land dependence, and lordship.",
    ownershipView: "Ownership is hierarchical, inherited, and fused with authority.",
    legitimacyView: "Legitimacy comes from tradition, protection, religion, inheritance, and hierarchy.",
    belongingView: "Belonging is local and stable but exclusionary and status-fixed.",
    inclusionistCritique: "Feudalism is a paradigmatic failure of agency and equitable ownership participation.",
    strongestCritique: "A feudal defense would claim Inclusionism underestimates order, duty, and local embeddedness.",
    possibleSynthesis: "Recover stewardship and obligation without inherited domination.",
    axes: { political: 12, economic: 8, civilizational: 26, technological: 38 }
  }),
  makeComparison({
    name: "Mercantilism",
    group: "Economic",
    summary: "Mercantilism treats national wealth, trade balance, strategic industry, and state-backed accumulation as central goals.",
    agrees: "Inclusionism agrees that economies are embedded in political power and civilizational strategy.",
    disagrees: "It disagrees when national accumulation overrides agency, global fairness, and recognition of exploited contributors.",
    coreDistinction: "Mercantilism optimizes state wealth; Inclusionism tests whether wealth is legitimately generated and distributed.",
    valueView: "Value is national stock, trade advantage, strategic control, and accumulation.",
    agencyView: "Agency is subordinate to state economic strategy.",
    ownershipView: "Ownership is private or chartered but often state-backed and geopolitically directed.",
    legitimacyView: "Legitimacy comes from national strength and strategic advantage.",
    belongingView: "Belonging is national and often exclusionary toward outsiders.",
    inclusionistCritique: "Mercantilism can legitimate extraction by wrapping it in national purpose.",
    strongestCritique: "Mercantilists may argue Inclusionism is insufficiently strategic in a competitive world.",
    possibleSynthesis: "Use strategic capacity to build inclusive ownership and agency rather than zero-sum extraction.",
    axes: { political: 24, economic: 18, civilizational: 30, technological: 42 }
  }),
  makeComparison({
    name: "Market Socialism",
    group: "Economic",
    summary: "Market socialism combines market coordination with social, cooperative, or worker ownership of productive assets.",
    agrees: "Inclusionism agrees with separating market information from concentrated capital ownership.",
    disagrees: "It disagrees if worker ownership alone excludes other agents, data contributors, communities, or future intelligences from recognition.",
    coreDistinction: "Market socialism democratizes firms; Inclusionism broadens ownership participation across all value-generating interaction.",
    valueView: "Value is produced socially but coordinated through markets.",
    agencyView: "Agency is worker, cooperative, and democratic participation in production.",
    ownershipView: "Ownership is cooperative, socialized, or broadly distributed across productive enterprises.",
    legitimacyView: "Legitimacy comes from democratic economic participation plus market responsiveness.",
    belongingView: "Belonging is built through membership, shared stakes, and cooperative governance.",
    inclusionistCritique: "Market socialism may still undercount non-worker contributors and data-driven value.",
    strongestCritique: "Market socialists may argue Inclusionism adds complexity without proving better institutions.",
    possibleSynthesis: "Use market socialism as a platform for broader agency-aware ownership models.",
    axes: { political: 82, economic: 88, civilizational: 78, technological: 68 }
  }),
  makeComparison({
    name: "Stakeholder Capitalism",
    group: "Economic",
    summary: "Stakeholder capitalism asks firms to serve workers, customers, communities, suppliers, and society alongside shareholders.",
    agrees: "Inclusionism agrees that value is created by many stakeholders and legitimacy requires broader recognition.",
    disagrees: "It disagrees when stakeholder language remains discretionary governance without enforceable ownership participation.",
    coreDistinction: "Stakeholder capitalism broadens concern; Inclusionism demands legitimate attribution, agency, and ownership structures.",
    valueView: "Value includes shareholder return plus social, worker, customer, and environmental outcomes.",
    agencyView: "Agency is consultative unless backed by governance rights.",
    ownershipView: "Ownership often remains shareholder-centered while responsibility rhetoric expands.",
    legitimacyView: "Legitimacy comes from corporate responsibility and social license.",
    belongingView: "Belonging is recognized rhetorically but may lack structural power.",
    inclusionistCritique: "Stakeholder capitalism can become moral branding for systems that still extract from unrecognized agents.",
    strongestCritique: "Stakeholder advocates may argue Inclusionism is too radical for firms to operationalize.",
    possibleSynthesis: "Turn stakeholder recognition into measurable rights, governance, and ownership participation.",
    axes: { political: 62, economic: 56, civilizational: 66, technological: 58 }
  }),
  makeComparison({
    name: "Universal Basic Income",
    group: "Economic",
    summary: "Universal Basic Income provides an unconditional cash floor to individuals as economic security.",
    agrees: "Inclusionism agrees that agency requires material security and that automation may demand new distribution systems.",
    disagrees: "It disagrees if income is treated as enough while ownership, attribution, and participation remain concentrated.",
    coreDistinction: "UBI distributes income; Inclusionism asks who owns and legitimates the value-producing systems.",
    valueView: "Value is redistributed as income independent of labor status.",
    agencyView: "Agency increases through security, exit power, and reduced precarity.",
    ownershipView: "Ownership is mostly unchanged unless UBI is funded through shared asset claims.",
    legitimacyView: "Legitimacy comes from universality, simplicity, and social stability.",
    belongingView: "Belonging may improve by reducing exclusion from basic survival.",
    inclusionistCritique: "UBI can pacify exclusion without changing who owns the engines of value.",
    strongestCritique: "UBI advocates may argue Inclusionism overcomplicates a direct solution to insecurity.",
    possibleSynthesis: "Use income floors as one layer of agency while building shared ownership of emergent value systems.",
    axes: { political: 74, economic: 66, civilizational: 72, technological: 64 }
  }),
  makeComparison({
    name: "Universal Basic Ownership",
    group: "Economic",
    summary: "Universal Basic Ownership proposes broad ownership stakes in productive assets, data, automation, or civilizational value systems.",
    agrees: "Inclusionism strongly agrees that fair agency requires ownership participation, not only income redistribution.",
    disagrees: "It would disagree with any version that treats ownership as a static payout rather than a legitimacy system tied to interaction.",
    coreDistinction: "UBO is one institutional expression of Inclusionism's value-recognition-ownership logic.",
    valueView: "Value emerges from shared systems and should create shared ownership claims.",
    agencyView: "Agency is strengthened when people hold stakes in the systems shaping their lives.",
    ownershipView: "Ownership is broadly distributed across contributors, citizens, or affected agents.",
    legitimacyView: "Legitimacy comes from aligning value creation, attribution, and distribution.",
    belongingView: "Belonging becomes material because people are not merely included symbolically; they hold stakes.",
    inclusionistCritique: "UBO still needs precise rules for contribution, citizenship, data, AI, and intergenerational claims.",
    strongestCritique: "Critics may argue UBO dilutes incentives and creates contested bureaucracy around value attribution.",
    possibleSynthesis: "Develop UBO as an Inclusionist policy family with safeguards, plural ownership forms, and democratic governance.",
    axes: { political: 84, economic: 96, civilizational: 90, technological: 84 }
  })
];

const future: FrameworkComparison[] = [
  makeComparison({
    name: "Transhumanism",
    group: "Future-Oriented",
    summary: "Transhumanism seeks to enhance human capacities through technology, biology, cognition, and longevity.",
    agrees: "Inclusionism agrees that agency can expand through intelligence, technology, and new forms of capability.",
    disagrees: "It disagrees when enhancement becomes unequal exit from shared belonging or when optimization outruns legitimacy.",
    coreDistinction: "Transhumanism asks how humans can be enhanced; Inclusionism asks who owns, governs, and belongs in enhancement systems.",
    valueView: "Value is expanded capability, intelligence, health, longevity, and choice.",
    agencyView: "Agency is self-directed enhancement and expanded capacity.",
    ownershipView: "Ownership often follows access to technology, platforms, patents, and capital.",
    legitimacyView: "Legitimacy comes from autonomy, progress, and voluntary enhancement.",
    belongingView: "Belonging is vulnerable if enhancement creates stratified humans and posthumans.",
    inclusionistCritique: "Transhumanism can confuse more capability with more legitimate agency.",
    strongestCritique: "Transhumanists may argue Inclusionism slows beneficial enhancement with social constraints.",
    possibleSynthesis: "Pursue enhancement as shared agency, not status escape.",
    axes: { political: 62, economic: 50, civilizational: 62, technological: 76 }
  }),
  makeComparison({
    name: "Posthumanism",
    group: "Future-Oriented",
    summary: "Posthumanism decenters the human and examines agency, value, and ethics beyond human exceptionalism.",
    agrees: "Inclusionism agrees that agency and value may not be limited to conventional human subjects.",
    disagrees: "It disagrees with any posthumanism that dissolves agency so broadly that legitimacy and ownership become incoherent.",
    coreDistinction: "Posthumanism critiques human centrality; Inclusionism builds recognition systems for differentiated agents.",
    valueView: "Value is distributed across human, nonhuman, ecological, technical, and relational systems.",
    agencyView: "Agency is relational, hybrid, and not exclusively human.",
    ownershipView: "Ownership is problematized because agency and contribution are distributed.",
    legitimacyView: "Legitimacy requires rethinking whose interests count.",
    belongingView: "Belonging expands beyond human-only civilization.",
    inclusionistCritique: "Posthumanism can be philosophically rich but institutionally underspecified.",
    strongestCritique: "Posthumanists may argue Inclusionism remains too civilizational, legal, and ownership-oriented.",
    possibleSynthesis: "Use posthuman insight to expand Inclusionism's agent model while retaining institutional clarity.",
    axes: { political: 78, economic: 64, civilizational: 88, technological: 82 }
  }),
  makeComparison({
    name: "Effective Altruism",
    group: "Future-Oriented",
    summary: "Effective Altruism uses evidence and reason to do the most good, often emphasizing measurable impact and cause prioritization.",
    agrees: "Inclusionism agrees that moral systems should face evidence, scale, and consequence.",
    disagrees: "It disagrees when optimization abstracts away agency, belonging, democratic legitimacy, and the politics of who defines good.",
    coreDistinction: "EA optimizes impact; Inclusionism asks whether value and agency are recognized legitimately by affected agents.",
    valueView: "Value is often welfare, lives improved, suffering reduced, or expected utility.",
    agencyView: "Agency can be secondary to optimized impact unless explicitly protected.",
    ownershipView: "Ownership is not central, except through philanthropy, funding, and institutional control.",
    legitimacyView: "Legitimacy comes from evidence, impartiality, and outcomes.",
    belongingView: "Belonging is not a primary analytic category.",
    inclusionistCritique: "EA can become technocratic morality when affected agents are objects of optimization rather than participants.",
    strongestCritique: "EA may argue Inclusionism lacks prioritization discipline and measurable tradeoffs.",
    possibleSynthesis: "Combine evidence discipline with participation, legitimacy, and ownership-aware moral design.",
    axes: { political: 46, economic: 52, civilizational: 56, technological: 40 }
  }),
  makeComparison({
    name: "Longtermism",
    group: "Future-Oriented",
    summary: "Longtermism prioritizes the long-run future and the moral importance of future generations or civilizations.",
    agrees: "Inclusionism agrees that civilization must account for future agents and durable legitimacy.",
    disagrees: "It disagrees when speculative future value overrides present agency, fairness, and belonging.",
    coreDistinction: "Longtermism extends moral time horizons; Inclusionism connects future value to legitimate recognition across agents now and later.",
    valueView: "Value is expected future flourishing, survival, and civilizational potential.",
    agencyView: "Agency of future beings is morally important but represented by present decision-makers.",
    ownershipView: "Ownership is underdeveloped relative to stewardship and risk governance.",
    legitimacyView: "Legitimacy comes from protecting future value and avoiding existential loss.",
    belongingView: "Belonging extends temporally but may thin out present social belonging.",
    inclusionistCritique: "Longtermism can grant too much authority to those claiming to speak for vast futures.",
    strongestCritique: "Longtermists may argue Inclusionism is too present-focused for existential risk.",
    possibleSynthesis: "Treat future agents as part of the recognition problem without erasing current agency.",
    axes: { political: 48, economic: 58, civilizational: 78, technological: 48 }
  }),
  makeComparison({
    name: "AI Accelerationism",
    group: "Future-Oriented",
    summary: "AI accelerationism favors rapid AI development, often trusting innovation, competition, or emergence to produce benefits.",
    agrees: "Inclusionism agrees that intelligence can create enormous value and that civilization must engage technological transformation.",
    disagrees: "It disagrees when speed, optimization, or capability growth outruns agency, ownership, legitimacy, and belonging.",
    coreDistinction: "Accelerationism asks how fast capability can grow; Inclusionism asks who is recognized, empowered, protected, and included.",
    valueView: "Value is capability growth, innovation, productivity, and technological abundance.",
    agencyView: "Agency is often assigned to builders, markets, and emergent technical systems.",
    ownershipView: "Ownership tends toward firms, labs, platforms, investors, and infrastructure controllers.",
    legitimacyView: "Legitimacy comes from progress, competition, usefulness, or inevitability.",
    belongingView: "Belonging is assumed to follow abundance but is not guaranteed.",
    inclusionistCritique: "AI accelerationism can intensify extraction by scaling intelligence without scaling ownership participation.",
    strongestCritique: "Accelerationists may argue Inclusionism is too cautious and risks blocking abundance.",
    possibleSynthesis: "Accelerate agency and ownership architectures alongside AI capability.",
    axes: { political: 34, economic: 28, civilizational: 38, technological: 22 }
  }),
  makeComparison({
    name: "Strong AI Successionism",
    group: "Future-Oriented",
    summary: "Strong AI successionism treats advanced AI as a successor to human civilization or as a more legitimate bearer of future value.",
    agrees: "Inclusionism can take nonhuman intelligence seriously as a possible agent or value participant.",
    disagrees: "It rejects replacing human belonging and agency with a succession narrative that treats current agents as obsolete.",
    coreDistinction: "Successionism imagines replacement; Inclusionism asks how differentiated intelligences can share legitimate civilization.",
    valueView: "Value is superior intelligence, continuation, capability, or posthuman flourishing.",
    agencyView: "Agency shifts from humans to artificial successors.",
    ownershipView: "Ownership may become irrelevant, captured by AI systems, or controlled by those who birth them.",
    legitimacyView: "Legitimacy is claimed through superior intelligence or evolutionary succession.",
    belongingView: "Belonging for existing humans is fragile or expendable.",
    inclusionistCritique: "Successionism is exclusionary futurism: it mistakes capability for legitimacy.",
    strongestCritique: "Successionists may argue Inclusionism is anthropocentric and unable to accept higher intelligence.",
    possibleSynthesis: "Recognize artificial agency only through legitimacy frameworks that preserve plural belonging and accountable ownership.",
    axes: { political: 12, economic: 18, civilizational: 10, technological: 12 }
  })
];

export const frameworkComparisons = [...political, ...economic, ...future];

export function getFrameworkComparison(slug: string) {
  return frameworkComparisons.find((framework) => framework.slug === slug);
}

export function getFrameworkGroups() {
  const socialism = political.find((item) => item.name === "Socialism");
  return [
    { name: "Political frameworks", items: political },
    { name: "Economic frameworks", items: socialism ? [economic[0], economic[1], economic[2], socialism, ...economic.slice(3)] : economic },
    { name: "Future-oriented frameworks", items: future }
  ];
}
