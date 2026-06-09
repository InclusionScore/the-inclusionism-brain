import DebateForm from "@/components/DebateForm";

export default function DebatePage() {
  return (
    <main className="brain-grid mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Debate Inclusionism</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Challenge the canon without flattening it.</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">
        Ask a hard question, name a disagreement, or test a weak point. Debate Mode grounds its response in the Inclusionism canon and keeps critique, synthesis, and canon updates in view.
      </p>
      <div className="mt-8">
        <DebateForm />
      </div>
    </main>
  );
}
