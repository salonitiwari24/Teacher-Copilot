const CHIP_COLORS: Record<string, string> = {
  'Class': 'bg-blue-100 text-blue-800 border-blue-200',
  'Math': 'bg-purple-100 text-purple-800 border-purple-200',
  'Language': 'bg-green-100 text-green-800 border-green-200',
  'EVS': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Subtraction': 'bg-pink-100 text-pink-800 border-pink-200',
  'Concept confusion': 'bg-orange-100 text-orange-800 border-orange-200',
  'Behaviour': 'bg-red-100 text-red-800 border-red-200',
  'Fast finishers': 'bg-amber-100 text-amber-800 border-amber-200',
}

function getChipColor(chip: string): string {
  for (const [key, color] of Object.entries(CHIP_COLORS)) {
    if (chip.includes(key)) return color
  }
  return 'bg-slate-100 text-slate-800 border-slate-200'
}

export function ChipRow({ chips }: { chips: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((c) => (
        <span
          key={c}
          className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getChipColor(c)}`}
        >
          {c}
        </span>
      ))}
    </div>
  )
}

