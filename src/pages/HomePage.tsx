import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white shadow-lg">
        <div className="text-3xl font-bold mb-2">👩‍🏫 Shiksha Sathi</div>
        <div className="text-lg font-semibold mb-3">Teacher Copilot</div>
        <div className="text-sm opacity-95">
          Just-in-time, contextual coaching for government school teachers in India
        </div>
      </div>

      {/* Problem Statement */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="text-base font-bold text-slate-900 mb-3">The Challenge</div>
        <div className="text-sm text-slate-700 leading-relaxed">
          Teachers like <strong>Sunita</strong> face classroom challenges daily, but only get support from their CRP once a month. When students struggle with concepts like "zero in tens place" or fast finishers disrupt the class, there's no one to turn to for immediate help.
        </div>
      </div>

      {/* Solution */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-5 shadow-md">
        <div className="text-base font-bold text-green-900 mb-3">Our Solution</div>
        <div className="text-sm text-green-800 leading-relaxed mb-4">
          Shiksha Sathi provides <strong>instant, actionable coaching</strong> right when teachers need it most. Get context-specific strategies in seconds, not weeks.
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎤</span>
            <div>
              <div className="text-sm font-semibold text-green-900">Voice Input</div>
              <div className="text-xs text-green-700">Speak in Hindi or English - works offline in Chrome</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <div className="text-sm font-semibold text-green-900">Instant Suggestions</div>
              <div className="text-xs text-green-700">3 quick steps + 1 activity using local materials</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📊</span>
            <div>
              <div className="text-sm font-semibold text-green-900">CRP Dashboard</div>
              <div className="text-xs text-green-700">Track patterns and trends across clusters</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="text-base font-bold text-slate-900 mb-4">Get Started</div>
        <div className="space-y-3">
          <Link
            to="/ask"
            className="block w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 text-center text-sm font-semibold text-white shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            🚀 Ask Your First Question
          </Link>
          <Link
            to="/history"
            className="block w-full rounded-lg border-2 border-slate-300 bg-white px-6 py-4 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all"
          >
            📝 View History
          </Link>
          <Link
            to="/coach"
            className="block w-full rounded-lg border-2 border-slate-300 bg-white px-6 py-4 text-center text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-all"
          >
            👨‍💼 CRP Dashboard
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="text-base font-bold text-slate-900 mb-4">Key Features</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
            <div className="text-xs font-semibold text-blue-900 mb-1">Mobile-First</div>
            <div className="text-xs text-blue-700">Works on any smartphone</div>
          </div>
          <div className="rounded-lg bg-purple-50 border border-purple-200 p-3">
            <div className="text-xs font-semibold text-purple-900 mb-1">Offline Ready</div>
            <div className="text-xs text-purple-700">Works without internet</div>
          </div>
          <div className="rounded-lg bg-orange-50 border border-orange-200 p-3">
            <div className="text-xs font-semibold text-orange-900 mb-1">Hindi Support</div>
            <div className="text-xs text-orange-700">Voice input in Hindi</div>
          </div>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
            <div className="text-xs font-semibold text-emerald-900 mb-1">NCERT Aligned</div>
            <div className="text-xs text-emerald-700">Curriculum-based strategies</div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="text-base font-bold text-slate-900 mb-4">Impact</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">Weeks</div>
            <div className="text-xs text-slate-600 mt-1">Before</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">Seconds</div>
            <div className="text-xs text-slate-600 mt-1">After</div>
          </div>
        </div>
        <div className="mt-4 text-center text-xs text-slate-600">
          Query-to-resolution time reduced from weeks to seconds
        </div>
      </div>
    </div>
  )
}
