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
};

function localPlaceholderResponse(userQuestion: string, relevantNotes: RetrievedNote[], mode = "local-placeholder") {
  const titles = relevantNotes.map((note) => note.title).join(", ") || "the current canon";

  return {
    mode,
    question: userQuestion,
    sections: {
      "Inclusionist Position": `Based on ${titles}, Inclusionism would frame this critique through interaction, value emergence, recognition, agency, legitimacy, fairness, and belonging rather than through a single partisan ideology.`,
      "Strongest Critique": "The strongest challenge is that the framework may overstate the possibility of recognizing and distributing emergent value without creating new institutions of measurement, coercion, or status hierarchy.",
      "Possible Synthesis": "A useful synthesis would preserve Inclusionism's concern for participation and legitimate attribution while demanding clearer limits, adversarial tests, and safeguards against concentrated control over recognition systems.",
      "Relevant Notes": relevantNotes.map((note) => `${note.title} (${note.category})`),
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

async function generateAiDebate(userQuestion: string, relevantNotes: RetrievedNote[]) {
  const noteContext = relevantNotes
    .map((note, index) => {
      return [
        `Note ${index + 1}`,
        `Title: ${note.title}`,
        `Category: ${note.category}`,
        `Slug: ${note.slug}`,
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
            "If the excerpts are insufficient, say what is uncertain in Open Questions or Suggested Canon Updates."
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
    sections: parsed.sections,
    relevantNotes
  };
}

export async function POST(request: Request) {
  const { question } = await request.json();
  const userQuestion = String(question || "").trim();
  if (!userQuestion) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const relevantNotes = searchNotes(userQuestion, 6).map(({ slug, title, category, excerpt }) => ({ slug, title, category, excerpt }));
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
