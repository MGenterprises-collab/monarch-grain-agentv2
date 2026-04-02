export default function Dashboard() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Lead Dashboard</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Manage inquiries, track statuses, and review lead activity.
            </p>
          </div>

          <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black">
            Refresh
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { label: 'New', count: 0 },
            { label: 'Contacted', count: 0 },
            { label: 'Quoting', count: 0 },
            { label: 'Booked', count: 0 },
            { label: 'Lost', count: 0 },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-neutral-400">{item.label}</p>
              <p className="mt-3 text-3xl font-semibold">{item.count}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">
            <option>All Statuses</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Quoting</option>
            <option>Booked</option>
            <option>Lost</option>
          </select>

          <select className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none">
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-neutral-400">Lead List</p>
          <div className="mt-4 rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-500">
            No leads yet
          </div>
        </div>
      </div>
    </main>
  )
}