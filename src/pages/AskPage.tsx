import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { QuestionForm } from '../components/QuestionForm'
import { useTeacherLog } from '../store/TeacherLogContext'
import type { TeacherQueryInput } from '../types'

export function AskPage() {
  const nav = useNavigate()
  const { addQuery } = useTeacherLog()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (input: TeacherQueryInput) => {
    setIsSubmitting(true)
    try {
      const entry = addQuery(input)
      nav(`/suggestions/${entry.id}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 p-4 shadow-sm">
        <div className="font-semibold text-slate-900">Quick help, right now</div>
        <div className="mt-1 text-sm text-slate-700">
          You'll get 2–3 simple steps and one short activity you can run immediately.
        </div>
      </div>

      <QuestionForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  )
}

