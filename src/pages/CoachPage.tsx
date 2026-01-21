import { useMemo } from 'react'
import { useTeacherLog } from '../store/TeacherLogContext'
import type { TeacherLogEntry } from '../types'

function groupBy<T>(items: T[], keyFn: (t: T) => string) {
  const m = new Map<string, T[]>()
  for (const it of items) {
    const k = keyFn(it)
    const arr = m.get(k) ?? []
    arr.push(it)
    m.set(k, arr)
  }
  return m
}

// Mock cluster names for demo
const MOCK_CLUSTERS = ['Bibwewadi Cluster A', 'Bibwewadi Cluster B', 'Hadapsar Cluster', 'Kothrud Cluster']

function getMockCluster(entry: TeacherLogEntry): string {
  // Mock assignment based on hash of entry id
  const hash = entry.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return MOCK_CLUSTERS[hash % MOCK_CLUSTERS.length]
}

function getTrends(entries: TeacherLogEntry[]) {
  const now = Date.now()
  const weekAgo = now - 7 * 24 * 60 * 60 * 1000
  
  const thisWeek = entries.filter((e) => e.createdAt >= weekAgo)
  const bySubject = groupBy(thisWeek, (e) => e.input.subject)
  const byIssue = groupBy(thisWeek, (e) => e.input.issueType)
  
  const topSubject = Array.from(bySubject.entries())
    .sort((a, b) => b[1].length - a[1].length)[0]
  
  const topIssue = Array.from(byIssue.entries())
    .sort((a, b) => b[1].length - a[1].length)[0]
  
  return { thisWeek: thisWeek.length, topSubject, topIssue }
}

function exportCSV(entries: TeacherLogEntry[]) {
  const headers = ['Date', 'Class', 'Subject', 'Issue Type', 'Status', 'Title']
  const rows = entries.map((e) => {
    const date = new Date(e.createdAt).toLocaleDateString()
    return [date, e.input.classLevel, e.input.subject, e.input.issueType, e.status, e.title]
  })
  
  const csv = [headers.join(','), ...rows.map((r) => r.map((cell) => `"${cell}"`).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `teacher-queries-${new Date().toISOString().split('T')[0]}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

/**
 * Optional / future-facing screen:
 * For now it just groups this device’s history as a “cluster overview”.
 * In a real build, this would query a backend with CRP permissions.
 */
export function CoachPage() {
  const { entries } = useTeacherLog()

  const trends = useMemo(() => getTrends(entries), [entries])
  
  const groupedByCluster = useMemo(() => {
    return groupBy(entries, getMockCluster)
  }, [entries])

  const groupedBySubject = useMemo(() => {
    return groupBy(entries, (e) => e.input.subject)
  }, [entries])

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 p-5 text-white shadow-lg">
        <div className="font-bold text-base mb-2">CRP Dashboard</div>
        <div className="text-sm text-white/90">
          Cluster-level insights and trends from teacher queries
        </div>
      </div>

      {entries.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-md">
          <div className="text-4xl mb-3">📊</div>
          <div className="text-sm font-semibold text-slate-900 mb-1">No data yet</div>
          <div className="text-xs text-slate-600">Ask a few questions first to see patterns.</div>
        </div>
      ) : (
        <>
          {/* Trends Section */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
            <div className="text-base font-bold text-slate-900 mb-4">This Week's Trends</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                <div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-1">Total Queries</div>
                <div className="text-2xl font-bold text-blue-900">{trends.thisWeek}</div>
                <div className="text-xs text-blue-600 mt-1">Last 7 days</div>
              </div>
              {trends.topSubject && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <div className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Top Subject</div>
                  <div className="text-lg font-bold text-green-900">{trends.topSubject[0]}</div>
                  <div className="text-xs text-green-600 mt-1">{trends.topSubject[1].length} queries this week</div>
                </div>
              )}
              {trends.topIssue && (
                <div className="rounded-lg bg-orange-50 border border-orange-200 p-4">
                  <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-1">Top Issue</div>
                  <div className="text-lg font-bold text-orange-900">{trends.topIssue[0]}</div>
                  <div className="text-xs text-orange-600 mt-1">{trends.topIssue[1].length} queries this week</div>
                </div>
              )}
            </div>
          </div>

          {/* Export Button */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
            <button
              onClick={() => exportCSV(entries)}
              className="w-full rounded-lg bg-gradient-to-r from-slate-700 to-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:from-slate-800 hover:to-slate-950 transition-all"
            >
              📥 Export Training Needs Report (CSV)
            </button>
          </div>

          {/* By Cluster */}
          <div className="text-sm font-bold text-slate-900 mb-2">By Cluster</div>
          {Array.from(groupedByCluster.entries()).map(([cluster, es]) => (
            <div key={cluster} className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <div className="text-base font-bold text-slate-900">{cluster}</div>
                  <div className="text-xs text-slate-600 mt-1">
                    {es.filter((e) => e.status === 'Resolved').length} resolved ·{' '}
                    {es.filter((e) => e.status === 'Need more help').length} need help
                  </div>
                </div>
                <div className="rounded-full bg-orange-100 text-orange-800 border border-orange-200 px-3 py-1 text-xs font-semibold">
                  {es.length} queries
                </div>
              </div>

              <div className="space-y-3">
                {es.slice(0, 5).map((e) => (
                  <div key={e.id} className="rounded-lg bg-gradient-to-r from-slate-50 to-orange-50 border border-slate-200 p-3 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900 mb-1">{e.title}</div>
                        <div className="text-xs text-slate-600">
                          Class {e.input.classLevel} · {e.input.subject} · {e.input.issueType}
                        </div>
                      </div>
                      <span
                        className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${
                          e.status === 'Resolved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : e.status === 'Need more help'
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {e.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* By Subject */}
          <div className="text-sm font-bold text-slate-900 mb-2 mt-4">By Subject</div>
          {Array.from(groupedBySubject.entries()).map(([subject, es]) => (
            <div key={subject} className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="text-base font-bold text-slate-900">{subject}</div>
                <div className="rounded-full bg-purple-100 text-purple-800 border border-purple-200 px-3 py-1 text-xs font-semibold">
                  {es.length} queries
                </div>
              </div>
              <div className="text-xs text-slate-600 mb-3">
                Common issues: {Array.from(new Set(es.map((e) => e.input.issueType))).join(', ')}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  )
}

