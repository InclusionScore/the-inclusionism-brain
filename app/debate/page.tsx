import DebateForm from "@/components/DebateForm";

export default function DebatePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <p className="text-sm uppercase tracking-[0.3em] text-signal">Debate Inclusionism</p>
      <h1 className="mt-3 text-4xl font-semibold">Challenge the canon without flattening it.</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        Ask a hard question, name a disagreement, or test a weak point. Debate Mode grounds its response in the Inclusionism canon and keeps critique, synthesis, and canon updates in view.
      </p>
      <div className="mt-8">
        <DebateForm />
      </div>
    </main>
  );
}
