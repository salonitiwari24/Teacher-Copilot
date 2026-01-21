import type { CopilotSuggestions } from '../types'
import { ChipRow } from './ChipRow'

function Section({ 
  title, 
  children, 
  color = 'blue' 
}: { 
  title: string
  children: React.ReactNode
  color?: 'blue' | 'green' | 'orange' | 'purple'
}) {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50/50',
    green: 'border-green-200 bg-green-50/50',
    orange: 'border-orange-200 bg-orange-50/50',
    purple: 'border-purple-200 bg-purple-50/50',
  }
  
  const headerColors = {
    blue: 'text-blue-700',
    green: 'text-green-700',
    orange: 'text-orange-700',
    purple: 'text-purple-700',
  }

  return (
    <section className={`rounded-xl border bg-white p-5 shadow-md ${colorClasses[color]}`}>
      <div className={`text-sm font-bold ${headerColors[color]} mb-3`}>{title}</div>
      <div className="text-sm text-slate-800 leading-relaxed">{children}</div>
    </section>
  )
}

export function SuggestionCard({ suggestions }: { suggestions: CopilotSuggestions }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="text-sm font-bold text-slate-900 mb-3">Detected context</div>
        <div>
          <ChipRow chips={suggestions.summaryChips} />
        </div>
      </div>

      <Section title="Next 5 min" color="blue">
        <ul className="list-disc space-y-2 pl-5">
          {suggestions.immediateSteps.slice(0, 3).map((s, i) => (
            <li key={i} className="leading-relaxed">{s}</li>
          ))}
        </ul>
      </Section>

      <Section title="Activity idea" color="green">
        <div className="font-bold text-slate-900 mb-3">{suggestions.activityIdea.title}</div>
        <div className="mt-3 text-xs font-semibold text-slate-600 uppercase tracking-wide">Materials (local / easy)</div>
        <ul className="mt-2 list-disc space-y-1.5 pl-5">
          {suggestions.activityIdea.materials.map((m, i) => (
            <li key={i} className="text-sm">{m}</li>
          ))}
        </ul>
        <div className="mt-4 text-xs font-semibold text-slate-600 uppercase tracking-wide">Steps</div>
        <ol className="mt-2 list-decimal space-y-1.5 pl-5">
          {suggestions.activityIdea.steps.map((st, i) => (
            <li key={i} className="text-sm leading-relaxed">{st}</li>
          ))}
        </ol>
      </Section>

      <Section title="Fast finishers" color="orange">
        <ul className="list-disc space-y-2 pl-5">
          {suggestions.fastFinisherTips.slice(0, 2).map((s, i) => (
            <li key={i} className="leading-relaxed">{s}</li>
          ))}
        </ul>
      </Section>
    </div>
  )
}

