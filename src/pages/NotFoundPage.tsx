import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="rounded-xl border border-orange-200 bg-white p-8 shadow-lg max-w-md">
        <div className="text-6xl mb-4">🔍</div>
        <div className="text-2xl font-bold text-slate-900 mb-2">Page not found</div>
        <div className="text-sm text-slate-600 mb-6">
          The page you're looking for doesn't exist. Try the Ask tab 👆
        </div>
        <Link
          to="/ask"
          className="inline-block rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-green-600 hover:to-emerald-700 transition-all"
        >
          Go to Ask
        </Link>
      </div>
    </div>
  )
}
