import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

function TabLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          'flex-1 rounded-xl px-4 py-3 text-center text-sm font-semibold transition-all',
          isActive 
            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md' 
            : 'bg-white text-slate-800 hover:bg-orange-50 active:bg-orange-100',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh text-slate-900">
      <header className="sticky top-0 z-10 border-b border-orange-200/50 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-xl px-4 py-4">
          <div className="mb-3">
            <div className="text-lg font-bold text-slate-900">Shiksha Sathi – Teacher Copilot</div>
            <div className="mt-1 text-xs font-medium text-orange-700">Quick help for real classroom moments</div>
          </div>

          <nav className="flex gap-2 rounded-2xl bg-white/80 p-2 shadow-sm">
            <TabLink to="/home" label="Home" />
            <TabLink to="/ask" label="Ask" />
            <TabLink to="/history" label="History" />
            <TabLink to="/coach" label="Coach" />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-6 min-w-[375px]">{children}</main>
    </div>
  )
}

