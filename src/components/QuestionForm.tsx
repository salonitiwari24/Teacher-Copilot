import { useEffect, useMemo, useRef, useState } from 'react'
import type { IssueType, Subject, TeacherQueryInput } from '../types'

const SUBJECTS: Subject[] = ['Math', 'Language', 'EVS', 'Other']
const ISSUE_TYPES: IssueType[] = [
  'Concept confusion',
  'Behaviour',
  'Multi-grade management',
  'Activity instructions',
  'Assessment',
  'TLM/Materials',
]

// Type declaration for Web Speech API
interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start(): void
  stop(): void
  abort(): void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onend: (() => void) | null
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  length: number
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

declare var SpeechRecognition: {
  new (): SpeechRecognition
}

declare var webkitSpeechRecognition: {
  new (): SpeechRecognition
}

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}

export function QuestionForm({
  defaultValue,
  onSubmit,
  isSubmitting,
}: {
  defaultValue?: Partial<TeacherQueryInput>
  onSubmit: (input: TeacherQueryInput) => void
  isSubmitting?: boolean
}) {
  const defaultClass = defaultValue?.classLevel ?? 4
  const [classLevel, setClassLevel] = useState<number>(defaultClass)
  const [subject, setSubject] = useState<Subject>(defaultValue?.subject ?? 'Math')
  const [issueType, setIssueType] = useState<IssueType>(defaultValue?.issueType ?? 'Concept confusion')
  const [description, setDescription] = useState<string>(defaultValue?.description ?? '')
  const [isListening, setIsListening] = useState(false)
  const [showToast, setShowToast] = useState<string | null>(null)
  const [isVoiceSupported, setIsVoiceSupported] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  const canSubmit = useMemo(() => {
    return description.trim().length >= 8
  }, [description])

  // Check if voice recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    setIsVoiceSupported(!!SpeechRecognition)
  }, [])

  // Voice recognition setup
  useEffect(() => {
    if (!isListening) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setIsListening(false)
      setShowToast('Voice works on Chrome/Android. Type if needed.')
      setTimeout(() => setShowToast(null), 3000)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'hi-IN' // Hindi first, fallback to en-IN

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setDescription((prev) => (prev ? `${prev} ${transcript}` : transcript))
      if (textareaRef.current) {
        textareaRef.current.value = description ? `${description} ${transcript}` : transcript
      }
      setShowToast('✓ Voice captured!')
      setTimeout(() => setShowToast(null), 2000)
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      if (event.error === 'no-speech') {
        setShowToast('No speech detected. Try again.')
      } else {
        setShowToast('Voice error. Please type instead.')
      }
      setTimeout(() => setShowToast(null), 3000)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.start()
    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop()
        } catch (e) {
          // Ignore errors on cleanup
        }
      }
    }
  }, [isListening, description])

  return (
    <>
      <form
        className="rounded-xl border border-orange-200/50 bg-white p-5 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault()
          if (!canSubmit) return
          onSubmit({ classLevel, subject, issueType, description: description.trim() })
        }}
      >
        <div className="text-lg font-bold text-slate-900">What is happening in your class right now?</div>
        <div className="mt-1 text-sm text-slate-600">
          Share the situation in your own words. Short is okay.
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <label className="block">
            <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700">
              <span>👨‍🎓</span> Class
            </div>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={classLevel}
              onChange={(e) => setClassLevel(Number(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700">
              <span>📚</span> Subject
            </div>
            <select
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={subject}
              onChange={(e) => setSubject(e.target.value as Subject)}
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <div className="mb-1 flex items-center gap-1 text-xs font-semibold text-slate-700">
            <span>💡</span> Type of issue
          </div>
          <select
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            value={issueType}
            onChange={(e) => setIssueType(e.target.value as IssueType)}
          >
            {ISSUE_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-4 block">
          <div className="mb-1 text-xs font-semibold text-slate-700">Describe the situation</div>
          <textarea
            ref={textareaRef}
            className="mt-1 min-h-[120px] w-full resize-none rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm leading-6 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="What is happening in your class right now? (e.g. Class 4 subtraction, kids confused about zero in tens place)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-1 text-xs text-slate-500">
            Tip: 1–2 sentences is enough. Hold to speak in Hindi – works offline in Chrome!
          </div>
        </label>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            className={`flex-1 rounded-lg border-2 px-4 py-3 text-sm font-semibold transition-all ${
              isListening
                ? 'border-red-400 bg-red-50 text-red-700 animate-pulse'
                : isVoiceSupported
                  ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50 active:bg-slate-100'
                  : 'border-slate-300 bg-white text-slate-400 cursor-not-allowed'
            }`}
            onMouseDown={() => isVoiceSupported && setIsListening(true)}
            onMouseUp={() => setIsListening(false)}
            onMouseLeave={() => setIsListening(false)}
            onTouchStart={() => isVoiceSupported && setIsListening(true)}
            onTouchEnd={() => setIsListening(false)}
            disabled={!isVoiceSupported}
          >
            <span className="mr-2">🎤</span>
            {isListening ? 'Listening...' : isVoiceSupported ? 'Hold to speak' : 'Voice not supported'}
          </button>
          <button
            type="submit"
            disabled={!canSubmit || isSubmitting}
            className={[
              'flex-1 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-md transition-all',
              !canSubmit || isSubmitting
                ? 'bg-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 active:scale-95',
            ].join(' ')}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="spinner"></span>
                Loading...
              </span>
            ) : (
              'Get suggestions'
            )}
          </button>
        </div>
      </form>
      {showToast && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
          <div className="rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
            {showToast}
          </div>
        </div>
      )}
      {!isVoiceSupported && (
        <div className="mt-2 rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs text-blue-700">
          💡 Voice works on Chrome/Android. Type if needed.
        </div>
      )}
    </>
  )
}

