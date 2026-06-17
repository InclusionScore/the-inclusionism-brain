export default function Loading() {
  return (
    <main className="grid min-h-[calc(100vh-65px)] place-items-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="grid h-16 w-16 place-items-center overflow-hidden border-2 border-signal bg-black">
          <img src="/brand/inclusionism-logo-border.png" alt="" className="h-full w-full object-cover" />
        </div>
        <p className="brand-kicker">Loading Inclusionism</p>
      </div>
    </main>
  );
}
