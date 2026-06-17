export const locales = ["en", "es", "fr", "de", "pt"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  de: "Deutsch",
  pt: "Português"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function localePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return normalized === "/" ? "/en" : `/en${normalized}`;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export const t = {
  en: {
    nav: {
      whatIs: "What Is",
      graph: "Graph",
      compare: "Compare",
      issues: "Issues",
      canon: "Canon",
      essays: "Essays",
      podcast: "Podcast",
      debate: "Debate",
      pest: "PEST"
    },
    common: {
      sourceLanguage: "Canon notes are currently shown in English while translated canon versions are prepared.",
      coreDynamic: "Core Dynamic",
      openNote: "Open note",
      relatedCanonNotes: "Related Canon Notes",
      keepExploring: "Keep Exploring",
      whatIs: "What Is Inclusionism?",
      compareFrameworks: "Compare Frameworks",
      readCanon: "Read the Canon",
      debateInclusionism: "Debate Inclusionism"
    },
    home: {
      kicker: "A living philosophy engine",
      title: "Inclusionism",
      subtitle: "A Code of Equity",
      description: "A guided doorway into a canon about value, agency, ownership, legitimacy, and belonging.",
      graph: "Explore the Graph",
      introduction: "Read the Introduction",
      canon: "Explore the Canon",
      issues: "Explore Issues",
      essays: "Read the Essays",
      podcast: "Hear the Podcast",
      startHere: "Start Here",
      narrative: [
        "A civilization is built through participation.",
        "Every interaction creates value.",
        "Value becomes meaningful when it is recognized and attributed.",
        "A just society returns value as agency to the people and communities who help create it.",
        "Inclusionism is a code of equity built around that idea."
      ]
    },
    graph: {
      kicker: "Obsidian-style graph",
      title: "Explore the Canon",
      description:
        "Each note is a square block. Wikilinks become engineered paths. Node size follows backlinks, revealing which concepts act as load-bearing structures in the canon.",
      select: "Select a node to inspect its role in the Inclusionist knowledge graph.",
      all: "All",
      backlinks: "backlinks",
      outgoing: "outgoing links"
    },
    notes: {
      kicker: "Canon reader",
      title: "Read the Inclusionism Canon",
      description: "Search settled Canon notes across the vault. Draft and Deprecated notes stay private, while Candidate notes are separated from the canon workflow.",
      underDevelopment: "Under Development",
      placeholder: "Search value, agency, ownership, AI, democracy..."
    },
    debate: {
      kicker: "Debate Inclusionism",
      title: "Challenge the canon without flattening it.",
      description:
        "Ask a hard question, name a disagreement, or test a weak point. Debate Mode grounds its response in the Inclusionism canon and keeps critique, synthesis, and canon updates in view.",
      prompt: "What part of Inclusionism do you disagree with?",
      placeholder: "Example: Does Universal Basic Ownership risk weakening individual liberty or productive incentives?",
      submit: "Generate debate brief",
      loading: "Reading the canon...",
      sourceExcerpts: "Source Excerpts"
    },
    compare: {
      kicker: "Compare Frameworks",
      title: "A civilizational framework map.",
      description:
        "Inclusionism does not seek to win by proving every other philosophy wrong. Philosophies win by explaining more phenomena with fewer contradictions.",
      moral:
        "Inclusionism may be left of progressive in moral orientation, but it is presented here as a broader civilizational framework rather than merely another left-wing ideology.",
      political: "Political",
      economic: "Economic",
      civilizational: "Civilizational",
      technological: "Technological"
    },
    meta: {
      home: "Explore, challenge, and debate a living theory of how value and agency should remain connected.",
      graph: "Explore the Inclusionism canon as a blueprint-like network of concepts, notes, and wikilinks.",
      notes: "Read and search the Inclusionism canon: notes, backlinks, concepts, and internal wikilinks.",
      debate: "Challenge, critique, and refine Inclusionism with responses grounded in the canon.",
      compare: "Compare Inclusionism with political, economic, and future-oriented frameworks."
    }
  },
  es: {
    nav: { whatIs: "Qué es", graph: "Grafo", compare: "Comparar", issues: "Temas", canon: "Canon", essays: "Ensayos", podcast: "Podcast", debate: "Debate", pest: "PEST" },
    common: {
      sourceLanguage: "Las notas del canon se muestran actualmente en inglés mientras se prepara un flujo de traducción.",
      coreDynamic: "Dinámica central",
      openNote: "Abrir nota",
      relatedCanonNotes: "Notas del canon relacionadas",
      keepExploring: "Seguir explorando",
      whatIs: "¿Qué es Inclusionism?",
      compareFrameworks: "Comparar marcos",
      readCanon: "Leer el canon",
      debateInclusionism: "Debatir Inclusionism"
    },
    home: {
      kicker: "Un motor vivo de filosofía",
      title: "Inclusionism",
      subtitle: "Un código de equidad",
      description: "Una entrada guiada a un canon sobre valor, agencia, propiedad, legitimidad y pertenencia.",
      graph: "Explorar el grafo",
      introduction: "Leer la introducción",
      canon: "Explorar el canon",
      issues: "Explorar temas",
      essays: "Leer ensayos",
      podcast: "Escuchar podcast",
      startHere: "Empezar aquí",
      narrative: [
        "Una civilización se construye mediante la participación.",
        "Cada interacción crea valor.",
        "El valor se vuelve significativo cuando se reconoce y se atribuye.",
        "Una sociedad justa devuelve valor como agencia a las personas y comunidades que ayudan a crearlo.",
        "Inclusionism es un código de equidad construido alrededor de esa idea."
      ]
    },
    graph: {
      kicker: "Grafo estilo Obsidian",
      title: "Explorar el canon",
      description:
        "Cada nota es un bloque cuadrado. Los wikilinks se convierten en rutas diseñadas. El tamaño del nodo sigue los backlinks.",
      select: "Selecciona un nodo para inspeccionar su papel en el grafo de conocimiento Inclusionist.",
      all: "Todos",
      backlinks: "backlinks",
      outgoing: "enlaces salientes"
    },
    notes: {
      kicker: "Lector del canon",
      title: "Leer el canon de Inclusionism",
      description: "Busca notas Canon establecidas. Las notas Draft y Deprecated permanecen privadas, y las Candidate se separan del canon.",
      underDevelopment: "En desarrollo",
      placeholder: "Buscar valor, agencia, propiedad, IA, democracia..."
    },
    debate: {
      kicker: "Debatir Inclusionism",
      title: "Desafía el canon sin simplificarlo.",
      description: "Haz una pregunta difícil, nombra un desacuerdo o prueba un punto débil. Debate Mode responde desde el canon.",
      prompt: "¿Con qué parte de Inclusionism no estás de acuerdo?",
      placeholder: "Ejemplo: ¿Universal Basic Ownership debilita la libertad individual o los incentivos productivos?",
      submit: "Generar informe de debate",
      loading: "Leyendo el canon...",
      sourceExcerpts: "Extractos fuente"
    },
    compare: {
      kicker: "Comparar marcos",
      title: "Un mapa de marco civilizacional.",
      description: "Inclusionism no busca ganar demostrando que toda otra filosofía está equivocada.",
      moral: "Puede estar a la izquierda de lo progresista en orientación moral, pero es un marco civilizacional más amplio.",
      political: "Político",
      economic: "Económico",
      civilizational: "Civilizacional",
      technological: "Tecnológico"
    },
    meta: {
      home: "Explora, desafía y debate una teoría viva de cómo el valor y la agencia deben permanecer conectados.",
      graph: "Explora el canon de Inclusionism como una red de conceptos y wikilinks.",
      notes: "Lee y busca en el canon de Inclusionism.",
      debate: "Desafía, critica y refina Inclusionism con respuestas basadas en el canon.",
      compare: "Compara Inclusionism con marcos políticos, económicos y futuros."
    }
  },
  fr: {
    nav: { whatIs: "Définition", graph: "Graphe", compare: "Comparer", issues: "Enjeux", canon: "Canon", essays: "Essais", podcast: "Podcast", debate: "Débat", pest: "PEST" },
    common: {
      sourceLanguage: "Les notes du canon sont actuellement affichées en anglais pendant la préparation d’un flux de traduction.",
      coreDynamic: "Dynamique centrale",
      openNote: "Ouvrir la note",
      relatedCanonNotes: "Notes du canon liées",
      keepExploring: "Continuer",
      whatIs: "Qu’est-ce que l’Inclusionism ?",
      compareFrameworks: "Comparer les cadres",
      readCanon: "Lire le canon",
      debateInclusionism: "Débattre"
    },
    home: {
      kicker: "Un moteur philosophique vivant",
      title: "Inclusionism",
      subtitle: "Un code d’équité",
      description: "Une entrée guidée vers un canon sur la valeur, l’agence, la propriété, la légitimité et l’appartenance.",
      graph: "Explorer le graphe",
      introduction: "Lire l’introduction",
      canon: "Explorer le canon",
      issues: "Explorer les enjeux",
      essays: "Lire les essais",
      podcast: "Écouter le podcast",
      startHere: "Commencer ici",
      narrative: [
        "Une civilisation se construit par la participation.",
        "Chaque interaction crée de la valeur.",
        "La valeur devient signifiante lorsqu’elle est reconnue et attribuée.",
        "Une société juste rend la valeur comme agence aux personnes et communautés qui contribuent à la créer.",
        "Inclusionism est un code d’équité construit autour de cette idée."
      ]
    },
    graph: {
      kicker: "Graphe style Obsidian",
      title: "Explorer le canon",
      description: "Chaque note est un bloc carré. Les wikilinks deviennent des chemins architecturés. La taille du nœud suit les backlinks.",
      select: "Sélectionnez un nœud pour inspecter son rôle dans le graphe de connaissance Inclusionist.",
      all: "Tous",
      backlinks: "backlinks",
      outgoing: "liens sortants"
    },
    notes: {
      kicker: "Lecteur du canon",
      title: "Lire le canon d’Inclusionism",
      description: "Recherchez les notes Canon établies. Les notes Draft et Deprecated restent privées; les Candidate sont séparées.",
      underDevelopment: "En développement",
      placeholder: "Rechercher valeur, agence, propriété, IA, démocratie..."
    },
    debate: {
      kicker: "Débattre Inclusionism",
      title: "Contester le canon sans l’aplatir.",
      description: "Posez une question difficile, formulez un désaccord ou testez un point faible. Le mode Débat s’appuie sur le canon.",
      prompt: "Avec quelle partie d’Inclusionism êtes-vous en désaccord ?",
      placeholder: "Exemple : Universal Basic Ownership affaiblit-il la liberté individuelle ?",
      submit: "Générer un dossier",
      loading: "Lecture du canon...",
      sourceExcerpts: "Extraits sources"
    },
    compare: {
      kicker: "Comparer les cadres",
      title: "Une carte de cadre civilisationnel.",
      description: "Inclusionism ne cherche pas à gagner en prouvant que toute autre philosophie a tort.",
      moral: "Il peut être à gauche du progressisme moralement, mais il est présenté comme un cadre civilisationnel plus large.",
      political: "Politique",
      economic: "Économique",
      civilizational: "Civilisationnel",
      technological: "Technologique"
    },
    meta: {
      home: "Explorer, contester et débattre une théorie vivante de la manière dont la valeur et l’agence doivent rester connectées.",
      graph: "Explorer le canon d’Inclusionism comme réseau de concepts et wikilinks.",
      notes: "Lire et rechercher dans le canon d’Inclusionism.",
      debate: "Contester, critiquer et affiner Inclusionism avec des réponses fondées sur le canon.",
      compare: "Comparer Inclusionism avec des cadres politiques, économiques et futurs."
    }
  },
  de: {
    nav: { whatIs: "Was ist", graph: "Graph", compare: "Vergleich", issues: "Themen", canon: "Kanon", essays: "Essays", podcast: "Podcast", debate: "Debatte", pest: "PEST" },
    common: {
      sourceLanguage: "Kanon-Notizen werden derzeit auf Englisch angezeigt, während ein Übersetzungsworkflow vorbereitet wird.",
      coreDynamic: "Kerndynamik",
      openNote: "Notiz öffnen",
      relatedCanonNotes: "Verwandte Kanon-Notizen",
      keepExploring: "Weiter erkunden",
      whatIs: "Was ist Inclusionism?",
      compareFrameworks: "Frameworks vergleichen",
      readCanon: "Kanon lesen",
      debateInclusionism: "Inclusionism debattieren"
    },
    home: {
      kicker: "Eine lebendige Philosophie-Maschine",
      title: "Inclusionism",
      subtitle: "Ein Code of Equity",
      description: "Ein geführter Einstieg in einen Kanon über Wert, Agency, Eigentum, Legitimität und Zugehörigkeit.",
      graph: "Graph erkunden",
      introduction: "Einführung lesen",
      canon: "Kanon erkunden",
      issues: "Themen erkunden",
      essays: "Essays lesen",
      podcast: "Podcast hören",
      startHere: "Hier beginnen",
      narrative: [
        "Eine Zivilisation wird durch Teilhabe gebaut.",
        "Jede Interaktion schafft Wert.",
        "Wert wird bedeutungsvoll, wenn er anerkannt und zugeschrieben wird.",
        "Eine gerechte Gesellschaft gibt Wert als Agency an die Menschen und Gemeinschaften zurück, die ihn miterschaffen.",
        "Inclusionism ist ein Code of Equity, der um diese Idee gebaut ist."
      ]
    },
    graph: {
      kicker: "Graph im Obsidian-Stil",
      title: "Kanon erkunden",
      description: "Jede Notiz ist ein quadratischer Block. Wikilinks werden zu konstruierten Pfaden. Die Knotengröße folgt Backlinks.",
      select: "Wählen Sie einen Knoten aus, um seine Rolle im Inclusionism-Wissensgraphen zu prüfen.",
      all: "Alle",
      backlinks: "Backlinks",
      outgoing: "ausgehende Links"
    },
    notes: {
      kicker: "Kanon-Leser",
      title: "Den Inclusionism-Kanon lesen",
      description: "Durchsuchen Sie gesetzte Kanon-Notizen. Draft und Deprecated bleiben privat; Candidate wird getrennt.",
      underDevelopment: "In Entwicklung",
      placeholder: "Wert, Agency, Eigentum, KI, Demokratie suchen..."
    },
    debate: {
      kicker: "Inclusionism debattieren",
      title: "Den Kanon herausfordern, ohne ihn zu verflachen.",
      description: "Stellen Sie eine harte Frage, benennen Sie einen Widerspruch oder testen Sie eine Schwachstelle.",
      prompt: "Welchem Teil von Inclusionism widersprechen Sie?",
      placeholder: "Beispiel: Schwächt Universal Basic Ownership individuelle Freiheit?",
      submit: "Debattenbrief erzeugen",
      loading: "Kanon wird gelesen...",
      sourceExcerpts: "Quellenauszüge"
    },
    compare: {
      kicker: "Frameworks vergleichen",
      title: "Eine zivilisatorische Framework-Karte.",
      description: "Inclusionism will nicht gewinnen, indem jede andere Philosophie als falsch bewiesen wird.",
      moral: "Moralisch kann es links von progressiv liegen, wird aber als breiterer zivilisatorischer Rahmen dargestellt.",
      political: "Politisch",
      economic: "Ökonomisch",
      civilizational: "Zivilisatorisch",
      technological: "Technologisch"
    },
    meta: {
      home: "Erkunden, hinterfragen und debattieren Sie eine lebendige Theorie darüber, wie Wert und Agency verbunden bleiben sollten.",
      graph: "Erkunden Sie den Inclusionism-Kanon als Netzwerk von Konzepten und Wikilinks.",
      notes: "Lesen und durchsuchen Sie den Inclusionism-Kanon.",
      debate: "Hinterfragen, kritisieren und verfeinern Sie Inclusionism mit kanonbasierten Antworten.",
      compare: "Vergleichen Sie Inclusionism mit politischen, ökonomischen und zukünftigen Frameworks."
    }
  },
  pt: {
    nav: { whatIs: "O que é", graph: "Grafo", compare: "Comparar", issues: "Temas", canon: "Cânone", essays: "Ensaios", podcast: "Podcast", debate: "Debate", pest: "PEST" },
    common: {
      sourceLanguage: "As notas do cânone são exibidas em inglês enquanto um fluxo de tradução é preparado.",
      coreDynamic: "Dinâmica central",
      openNote: "Abrir nota",
      relatedCanonNotes: "Notas relacionadas do cânone",
      keepExploring: "Continuar explorando",
      whatIs: "O que é Inclusionism?",
      compareFrameworks: "Comparar estruturas",
      readCanon: "Ler o cânone",
      debateInclusionism: "Debater Inclusionism"
    },
    home: {
      kicker: "Um motor filosófico vivo",
      title: "Inclusionism",
      subtitle: "Um código de equidade",
      description: "Uma entrada guiada para um cânone sobre valor, agência, propriedade, legitimidade e pertencimento.",
      graph: "Explorar o grafo",
      introduction: "Ler a introdução",
      canon: "Explorar o cânone",
      issues: "Explorar temas",
      essays: "Ler ensaios",
      podcast: "Ouvir podcast",
      startHere: "Comece aqui",
      narrative: [
        "Uma civilização é construída por meio da participação.",
        "Toda interação cria valor.",
        "O valor se torna significativo quando é reconhecido e atribuído.",
        "Uma sociedade justa devolve valor como agência às pessoas e comunidades que ajudam a criá-lo.",
        "Inclusionism é um código de equidade construído em torno dessa ideia."
      ]
    },
    graph: {
      kicker: "Grafo estilo Obsidian",
      title: "Explorar o cânone",
      description: "Cada nota é um bloco quadrado. Wikilinks viram caminhos projetados. O tamanho do nó segue backlinks.",
      select: "Selecione um nó para inspecionar seu papel no grafo de conhecimento Inclusionist.",
      all: "Todos",
      backlinks: "backlinks",
      outgoing: "links de saída"
    },
    notes: {
      kicker: "Leitor do cânone",
      title: "Ler o cânone de Inclusionism",
      description: "Pesquise notas Canon estabelecidas. Draft e Deprecated ficam privadas; Candidate fica separado.",
      underDevelopment: "Em desenvolvimento",
      placeholder: "Pesquisar valor, agência, propriedade, IA, democracia..."
    },
    debate: {
      kicker: "Debater Inclusionism",
      title: "Desafie o cânone sem achatá-lo.",
      description: "Faça uma pergunta difícil, nomeie uma discordância ou teste um ponto fraco. Debate Mode responde a partir do cânone.",
      prompt: "De qual parte de Inclusionism você discorda?",
      placeholder: "Exemplo: Universal Basic Ownership enfraquece a liberdade individual?",
      submit: "Gerar resumo de debate",
      loading: "Lendo o cânone...",
      sourceExcerpts: "Trechos de fonte"
    },
    compare: {
      kicker: "Comparar estruturas",
      title: "Um mapa de estrutura civilizacional.",
      description: "Inclusionism não busca vencer provando que toda outra filosofia está errada.",
      moral: "Pode estar à esquerda do progressismo em orientação moral, mas é uma estrutura civilizacional mais ampla.",
      political: "Político",
      economic: "Econômico",
      civilizational: "Civilizacional",
      technological: "Tecnológico"
    },
    meta: {
      home: "Explore, desafie e debata uma teoria viva de como valor e agência devem permanecer conectados.",
      graph: "Explore o cânone de Inclusionism como uma rede de conceitos e wikilinks.",
      notes: "Leia e pesquise o cânone de Inclusionism.",
      debate: "Desafie, critique e refine Inclusionism com respostas baseadas no cânone.",
      compare: "Compare Inclusionism com estruturas políticas, econômicas e futuras."
    }
  }
} as const;
