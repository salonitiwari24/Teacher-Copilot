import type { TeacherLogEntry } from '../types'

function formatTime(ts: number) {
  const d = new Date(ts)
  return d.toLocaleString()
}

export function HistoryList({
  entries,
  onOpen,
}: {
  entries: TeacherLogEntry[]
  onOpen: (id: string) => void
}) {
  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-md">
        <div className="text-4xl mb-3">📝</div>
        <div className="text-sm font-semibold text-slate-900 mb-1">No questions yet</div>
        <div className="text-xs text-slate-600">
          Ask your first question from the <span className="font-semibold text-orange-600">Ask</span> tab.
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((e) => (
        <button
          key={e.id}
          onClick={() => onOpen(e.id)}
          className="w-full rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:bg-orange-50 hover:border-orange-200 hover:shadow-md active:scale-[0.98]"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold text-slate-900 mb-1">{e.title}</div>
              <div className="text-xs text-slate-600 mb-1">
                Class {e.input.classLevel} · {e.input.subject} · {e.input.issueType}
              </div>
              <div className="text-xs text-slate-500">{formatTime(e.createdAt)}</div>
            </div>
            <span
              className={[
                'shrink-0 rounded-full px-3 py-1 text-xs font-semibold',
                e.status === 'Resolved'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  : e.status === 'Need more help'
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-slate-100 text-slate-700 border border-slate-200',
              ].join(' ')}
            >
              {e.status}
            </span>
          </div>
        </button>
      ))}
    </div>
  )
}

