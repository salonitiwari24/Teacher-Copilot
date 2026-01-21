import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type { TeacherLogEntry, TeacherQueryInput } from '../types'
import { getMockSuggestions } from '../lib/mockCopilot'
import { createId } from '../lib/id'

type State = {
  entries: TeacherLogEntry[]
}

type Action =
  | { type: 'hydrate'; entries: TeacherLogEntry[] }
  | { type: 'add'; entry: TeacherLogEntry }
  | {
      type: 'update'
      id: string
      patch: Partial<Omit<TeacherLogEntry, 'id' | 'createdAt' | 'input' | 'suggestions' | 'title'>>
    }

const STORAGE_KEY = 'shiksha-sathi.teacherLog.v1'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return { entries: action.entries }
    case 'add':
      return { entries: [action.entry, ...state.entries] }
    case 'update':
      return {
        entries: state.entries.map((e) => {
          if (e.id !== action.id) return e
          return { ...e, ...action.patch }
        }),
      }
    default:
      return state
  }
}

function makeTitle(input: TeacherQueryInput) {
  const d = input.description.trim().replace(/\s+/g, ' ')
  if (!d) return `${input.subject}: Help needed`
  return d.length <= 56 ? d : `${d.slice(0, 56)}…`
}

type TeacherLogApi = {
  entries: TeacherLogEntry[]
  addQuery: (input: TeacherQueryInput) => TeacherLogEntry
  markHelpful: (id: string, helpful: boolean) => void
  toggleSavedToNotes: (id: string, saved: boolean) => void
  setStatus: (id: string, status: TeacherLogEntry['status']) => void
  getById: (id: string) => TeacherLogEntry | undefined
  clearAll: () => void
}

const TeacherLogContext = createContext<TeacherLogApi | null>(null)

export function TeacherLogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { entries: [] })

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as TeacherLogEntry[]
      if (Array.isArray(parsed)) dispatch({ type: 'hydrate', entries: parsed })
    } catch {
      // Ignore: localStorage may be blocked, or data may be corrupted.
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.entries))
    } catch {
      // Ignore localStorage write failures in low-resource environments.
    }
  }, [state.entries])

  const api = useMemo<TeacherLogApi>(() => {
    return {
      entries: state.entries,
      addQuery: (input) => {
        const suggestions = getMockSuggestions(input)
        const entry: TeacherLogEntry = {
          id: createId('q'),
          createdAt: Date.now(),
          input,
          title: makeTitle(input),
          suggestions,
          status: 'Unmarked',
        }
        dispatch({ type: 'add', entry })
        return entry
      },
      markHelpful: (id, helpful) => {
        dispatch({
          type: 'update',
          id,
          patch: { helpful, status: helpful ? 'Resolved' : 'Need more help' },
        })
      },
      toggleSavedToNotes: (id, savedToNotes) => {
        dispatch({ type: 'update', id, patch: { savedToNotes } })
      },
      setStatus: (id, status) => dispatch({ type: 'update', id, patch: { status } }),
      getById: (id) => state.entries.find((e) => e.id === id),
      clearAll: () => {
        dispatch({ type: 'hydrate', entries: [] })
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch {
          // ignore
        }
      },
    }
  }, [state.entries])

  return <TeacherLogContext.Provider value={api}>{children}</TeacherLogContext.Provider>
}

export function useTeacherLog() {
  const ctx = useContext(TeacherLogContext)
  if (!ctx) throw new Error('useTeacherLog must be used within TeacherLogProvider')
  return ctx
}

