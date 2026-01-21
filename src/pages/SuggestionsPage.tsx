import { useState, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SuggestionCard } from '../components/SuggestionCard'
import { useTeacherLog } from '../store/TeacherLogContext'

export function SuggestionsPage() {
  const { id } = useParams()
  const nav = useNavigate()
  const { getById, markHelpful, toggleSavedToNotes, entries } = useTeacherLog()
  const [showFollowUp, setShowFollowUp] = useState(false)
  const [feedbackReason, setFeedbackReason] = useState('')

  const entry = useMemo(() => (id ? getById(id) : undefined), [getById, id])

  // Find related topics based on subject and class
  const relatedTopics = useMemo(() => {
    if (!entry) return []
    const sameSubject = entries.filter(
      (e) => e.id !== entry.id && e.input.subject === entry.input.subject && e.input.classLevel === entry.input.classLevel
    )
    if (sameSubject.length === 0) return []
    const topics = new Set<string>()
    sameSubject.slice(0, 3).forEach((e) => {
      if (e.input.issueType !== entry.input.issueType) {
        topics.add(e.input.issueType)
      }
    })
    return Array.from(topics).slice(0, 2)
  }, [entry, entries])

  const handleHelpful = (helpful: boolean) => {
    markHelpful(entry!.id, helpful)
    if (helpful) {
      setShowFollowUp(true)
    }
  }

  if (!id || !entry) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center shadow-md">
        <div className="text-lg font-bold text-red-900 mb-2">Suggestion not found</div>
        <div className="text-sm text-red-700 mb-4">
          This suggestion is not available. It may have been deleted or the link is incorrect.
        </div>
        <Link 
          className="inline-block rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:from-green-600 hover:to-emerald-700 transition-all" 
          to="/ask"
        >
          Go to Ask
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SuggestionCard suggestions={entry.suggestions} />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-md">
        <div className="text-sm font-bold text-slate-900 mb-4">Was this helpful?</div>
        <div className="flex gap-3">
          <button
            className={[
              'flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all shadow-sm',
              entry.helpful === true
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
                : 'border-2 border-slate-300 bg-white text-slate-800 hover:bg-emerald-50 hover:border-emerald-300 active:scale-95',
            ].join(' ')}
            onClick={() => handleHelpful(true)}
          >
            👍 Helpful
          </button>
          <button
            className={[
              'flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all shadow-sm',
              entry.helpful === false
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-md'
                : 'border-2 border-slate-300 bg-white text-slate-800 hover:bg-rose-50 hover:border-rose-300 active:scale-95',
            ].join(' ')}
            onClick={() => {
              markHelpful(entry.id, false)
              setShowFollowUp(true)
            }}
          >
            👎 Not helpful
          </button>
        </div>

        {entry.helpful === false && showFollowUp && (
          <div className="mt-4 rounded-lg bg-rose-50 border border-rose-200 p-4">
            <div className="text-xs font-semibold text-rose-900 mb-2">Tell us why (1 word)</div>
            <div className="flex gap-2 mb-2">
              {['Too complex', 'Not relevant', 'Need more', 'Other'].map((reason) => (
                <button
                  key={reason}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    feedbackReason === reason
                      ? 'bg-rose-600 text-white'
                      : 'bg-white text-rose-700 border border-rose-300 hover:bg-rose-100'
                  }`}
                  onClick={() => {
                    setFeedbackReason(reason)
                    // In production: send feedback to backend
                  }}
                >
                  {reason}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex gap-3">
          <button
            className={[
              'flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-all shadow-sm',
              entry.savedToNotes 
                ? 'bg-gradient-to-r from-slate-700 to-slate-900 text-white shadow-md' 
                : 'border-2 border-slate-300 bg-white text-slate-800 hover:bg-slate-50 active:scale-95',
            ].join(' ')}
            onClick={() => toggleSavedToNotes(entry.id, !entry.savedToNotes)}
          >
            {entry.savedToNotes ? '✓ Saved to my notes' : 'Save to my notes'}
          </button>
          <button
            className="flex-1 rounded-lg border-2 border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-all hover:bg-slate-50 active:scale-95 shadow-sm"
            onClick={() => nav('/ask')}
          >
            Ask another
          </button>
        </div>
      </div>

      {showFollowUp && entry.helpful === true && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 shadow-md">
          <div className="text-sm font-bold text-emerald-900 mb-2">Great! Want a follow-up activity for tomorrow?</div>
          <div className="text-xs text-emerald-700 mb-4">
            Continue building on this concept with a related activity.
          </div>
          {relatedTopics.length > 0 && (
            <div className="mb-4">
              <div className="text-xs font-semibold text-emerald-800 mb-2">Common next issue: {relatedTopics.join(', ')}</div>
              <button
                className="text-xs text-emerald-700 underline hover:text-emerald-900"
                onClick={() => nav('/ask')}
              >
                Ask about this →
              </button>
            </div>
          )}
          <button
            className="w-full rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-emerald-600 hover:to-green-700 transition-all"
            onClick={() => nav('/ask')}
          >
            Get follow-up activity
          </button>
        </div>
      )}
    </div>
  )
}

