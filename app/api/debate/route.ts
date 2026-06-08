import { NextResponse } from "next/server";
import { searchNotes } from "@/lib/content";

export async function POST(request: Request) {
  const { question } = await request.json();
  const userQuestion = String(question || "").trim();
  if (!userQuestion) {
    return NextResponse.json({ error: "Question is required." }, { status: 400 });
  }

  const relevantNotes = searchNotes(userQuestion, 6);
  const titles = relevantNotes.map((note) => note.title).join(", ") || "the current canon";
  const hasApiKey = Boolean(process.env.OPENAI_API_KEY);

  return NextResponse.json({
    mode: hasApiKey ? "ai-ready-placeholder" : "local-placeholder",
    sections: {
      "Inclusionist Position": `Based on ${titles}, Inclusionism would frame this critique through interaction, value emergence, recognition, agency, legitimacy, fairness, and belonging rather than through a single partisan ideology.`,
      "Strongest Critique": `The strongest challenge is that the framework may overstate the possibility of recognizing and distributing emergent value without creating new institutions of measurement, coercion, or status hierarchy.`,
      "Possible Synthesis": `A useful synthesis would preserve Inclusionism's concern for participation and legitimate attribution while demanding clearer limits, adversarial tests, and safeguards against concentrated control over recognition systems.`,
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
    },
    relevantNotes: relevantNotes.map(({ slug, title, category, excerpt }) => ({ slug, title, category, excerpt }))
  });
}
