export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
        <span className="mb-4 rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-neutral-300">
          Monarch & Grain AI
        </span>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
          Lead Management Dashboard for Monarch &amp; Grain
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-400 sm:text-lg">
          Organize inquiries, review lead details, track follow-ups, and manage
          AI-assisted responses in one clean workspace.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="/dashboard"
            className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-neutral-200"
          >
            Open Dashboard
          </a>

          <a
            href="#features"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
          >
            View Features
          </a>
        </div>

        <div
          id="features"
          className="mt-20 grid w-full max-w-5xl gap-4 text-left sm:grid-cols-2 lg:grid-cols-4"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Lead Tracking</p>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              View and organize new, contacted, quoting, booked, and lost leads.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">AI Drafts</p>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Review initial responses and follow-up drafts before sending.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Pricing Guidance</p>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Keep internal quote notes and pricing context visible in one place.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Workflow Control</p>
            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Update statuses, track sent messages, and keep the pipeline moving.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}