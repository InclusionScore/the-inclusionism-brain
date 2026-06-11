import { NextResponse } from "next/server";
import { searchNotes } from "@/lib/content";

type DebateSections = {
  "Inclusionist Position": string;
  "Strongest Critique": string;
  "Possible Synthesis": string;
  "Relevant Notes": string[];
  "Open Questions": string[];
  "Suggested Canon Updates": string[];
};

type RetrievedNote = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  url: string;
};

const DISCLAIMER = "This response is generated from the Inclusionism canon and may be revised as the canon evolves.";

function noteCitation(note: RetrievedNote) {
  return `${note.title} (${note.category}) - ${note.url}`;
}

function localPlaceholderResponse(userQuestion: string, relevantNotes: RetrievedNote[], mode = "local-placeholder") {
  const titles = relevantNotes.map((note) => note.title).join(", ");

  if (relevantNotes.length === 0) {
    return {
      mode,
      question: userQuestion,
      disclaimer: DISCLAIMER,
      sections: {
        "Inclusionist Position":
          "No sufficiently relevant notes were retrieved from the local Inclusionism canon for this question, so this mode cannot make a canon-backed Inclusionist claim yet.",
        "Strongest Critique":
          "The strongest critique is procedural: if the canon cannot surface relevant material for this question, the framework may need clearer notes, tags, or unresolved-question entries before it can answer responsibly.",
        "Possible Synthesis":
          "Treat this as a canon gap rather than a settled position. The useful next move is to add or refine source notes before asking Debate Mode to produce a stronger synthesis.",
        "Relevant Notes": [],
        "Open Questions": [
          "Which canon notes should govern this question?",
          "Is this a missing concept, a weak retrieval path, or a genuine unresolved tension in Inclusionism?",
          "What evidence or argument would make the canon answer more legitimate?"
        ],
        "Suggested Canon Updates": [
          "Add a note that directly addresses this critique or question.",
          "Create backlinks from related concepts so future retrieval can find the relevant canon.",
          "Mark the issue as unresolved until there is enough source material to support a stronger answer."
        ]
      } satisfies DebateSections,
      relevantNotes
    };
  }

  return {
    mode,
    question: userQuestion,
    disclaimer: DISCLAIMER,
    sections: {
      "Inclusionist Position": `Based on ${titles}, Inclusionism would frame this critique through interaction, value emergence, recognition, agency, legitimacy, fairness, and belonging rather than through a single partisan ideology.`,
      "Strongest Critique": "The strongest challenge is that the framework may overstate the possibility of recognizing and distributing emergent value without creating new institutions of measurement, coercion, or status hierarchy.",
      "Possible Synthesis": "A useful synthesis would preserve Inclusionism's concern for participation and legitimate attribution while demanding clearer limits, adversarial tests, and safeguards against concentrated control over recognition systems.",
      "Relevant Notes": relevantNotes.map(noteCitation),
      "Open Questions": [
        "Which agents are being recognized, and who has authority to recognize them?",
        "How does the framework prevent value attribution from becoming surveillance or technocracy?",
        "Where should ownership, agency, and legitimacy remain individual rather than collective?"
      ],
      "Suggested Canon Updates": [
        "Add explicit counterarguments to the most central notes, especially around ownership, incentives, and institutional abuse.",
        "Create PEST-specific debate maps that separate political legitimacy, economic distribution, sociocultural belonging, and technological agency.",
        "Mark unresolved tensions as first-class canon objects instead of treating them as objections outside the system."
      ]
    } satisfies DebateSections,
    relevantNotes
  };
}

function responseText(data: unknown): string | undefined {
  if (!data || typeof data !== "object") return undefined;
  if ("output_text" in data && typeof data.output_text === "string") return data.output_text;

  const output = "output" in data && Array.isArray(data.output) ? data.output : [];
  for (const item of output) {
    if (!item || typeof item !== "object" || !("content" in item) || !Array.isArray(item.content)) continue;
    for (const content of item.content) {
      if (content && typeof content === "object" && "text" in content && typeof content.text === "string") {
        return content.text;
      }
    }
  }

  return undefined;
}

function normalizeSections(sections: DebateSections, relevantNotes: RetrievedNote[]): DebateSections {
  return {
    ...sections,
    "Relevant Notes": relevantNotes.map(noteCitation)
  };
}

function responseLanguage(question: string) {
  const normalized = question.toLowerCase();
  if (/[¿¡]| de la | que | con | para | por | una | el | los | las | cómo | qué /.test(normalized)) return "Spanish";
  if (/ qu[’']| avec | pour | une | les | des | pourquoi | légitim| appartenance|équité/.test(normalized)) return "French";
  if (/ der | die | das | und | nicht | mit | für | warum | eigentum|zugehörigkeit/.test(normalized)) return "German";
  if (/ção|ções| você | com | para | uma | que | propriedade|pertencimento|legitimidade/.test(normalized)) return "Portuguese";
  return "English";
}

async function generateAiDebate(userQuestion: string, relevantNotes: RetrievedNote[]) {
  const language = responseLanguage(userQuestion);
  const noteContext = relevantNotes
    .map((note, index) => {
      return [
        `Note ${index + 1}`,
        `Title: ${note.title}`,
        `Category: ${note.category}`,
        `Slug: ${note.slug}`,
        `URL: ${note.url}`,
        `Excerpt: ${note.excerpt || "No excerpt available."}`
      ].join("\n");
    })
    .join("\n\n");

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "developer",
          content: [
            "You are Debate Mode for Inclusionism.",
            "Use only the retrieved Inclusionism note excerpts as source material.",
            "Do not treat Inclusionism as democratic socialism, libertarianism, or generic DEI.",
            "Frame Inclusionism around interaction, value emergence, recognition, agency, legitimacy, fairness, belonging, equity, ownership, participation, civilization, AI, and intelligence.",
            "Do not merely agree with the user. Steelman the critique and help refine the canon.",
            "Do not invent canon claims when relevant notes are missing or thin.",
            "If the excerpts are insufficient, say so plainly in the substantive sections and identify what the canon still needs.",
            "Cite relevant notes by title and URL where applicable.",
            `Respond in ${language} unless the user explicitly asks for another language. Keep section names in English exactly as required by the JSON schema, but translate the section content.`
          ].join(" ")
        },
        {
          role: "user",
          content: [
            `User question or critique: ${userQuestion}`,
            "",
            "Retrieved Inclusionism notes:",
            noteContext || "No relevant notes were retrieved."
          ].join("\n")
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "inclusionism_debate_response",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["sections"],
            properties: {
              sections: {
                type: "object",
                additionalProperties: false,
                required: [
                  "Inclusionist Position",
                  "Strongest Critique",
                  "Possible Synthesis",
                  "Relevant Notes",
                  "Open Questions",
                  "Suggested Canon Updates"
                ],
                properties: {
                  "Inclusionist Position": { type: "string" },
                  "Strongest Critique": { type: "string" },
                  "Possible Synthesis": { type: "string" },
                  "Relevant Notes": {
                    type: "array",
                    items: { type: "string" }
                  },
                  "Open Questions": {
                    type: "array",
                    items: { type: "string" }
                  },
                  "Suggested Canon Updates": {
                    type: "array",
                    items: { type: "string" }
                  }
                }
              }
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI API returned ${response.status}`);
  }

  const data = await response.json();
  const text = responseText(data);
  if (!text) {
    throw new Error("OpenAI API returned no text output.");
  }

  const parsed = JSON.parse(text) as { sections: DebateSections };
  return {
    mode: "openai",
    model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
    disclaimer: DISCLAIMER,
    sections: normalizeSections(parsed.sections, relevantNotes),
    relevantNotes
  };
}

export async function POST(request: Request) {
  const { question } = await request.json();
  const userQuestion = String(question || "").trim();
  if (!userQuestion) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const relevantNotes = searchNotes(userQuestion, 6).map(({ slug, title, category, excerpt }) => ({
    slug,
    title,
    category,
    excerpt,
    url: `/notes/${slug}`
  }));
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(localPlaceholderResponse(userQuestion, relevantNotes));
  }

  try {
    return NextResponse.json(await generateAiDebate(userQuestion, relevantNotes));
  } catch (error) {
    console.error(error);
    return NextResponse.json(localPlaceholderResponse(userQuestion, relevantNotes, "openai-error-fallback"));
  }
}
