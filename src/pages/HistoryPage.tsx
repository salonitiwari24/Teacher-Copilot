import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HistoryList } from '../components/HistoryList'
import { useTeacherLog } from '../store/TeacherLogContext'
import type { Subject } from '../types'

export function HistoryPage() {
  const nav = useNavigate()
  const { entries, clearAll } = useTeacherLog()

  const [subject, setSubject] = useState<Subject | 'All'>('All')
  const [classLevel, setClassLevel] = useState<number | 'All'>('All')

  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (subject !== 'All' && e.input.subject !== subject) return false
      if (classLevel !== 'All' && e.input.classLevel !== classLevel) return false
      return true
    })
  }, [classLevel, entries, subject])

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div>
            <div className="text-base font-bold text-slate-900">Your recent questions</div>
            <div className="mt-1 text-xs text-slate-600">
              This helps you (and later, your CRP) spot common patterns.
            </div>
          </div>
          <button
            className="rounded-lg border-2 border-slate-300 bg-white px-3 py-2 text-xs font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all"
            onClick={() => {
              if (confirm('Clear history on this device?')) clearAll()
            }}
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <div className="text-xs font-semibold text-slate-700 mb-1">Filter: Subject</div>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject | 'All')}
            >
              <option value="All">All</option>
              <option value="Math">Math</option>
              <option value="Language">Language</option>
              <option value="EVS">EVS</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label className="block">
            <div className="text-xs font-semibold text-slate-700 mb-1">Filter: Class</div>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={classLevel}
              onChange={(e) => {
                const v = e.target.value
                setClassLevel(v === 'All' ? 'All' : Number(v))
              }}
            >
              <option value="All">All</option>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <HistoryList entries={filtered} onOpen={(id) => nav(`/suggestions/${id}`)} />
    </div>
  )
}

