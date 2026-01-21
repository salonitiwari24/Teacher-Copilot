export type Subject = 'Math' | 'Language' | 'EVS' | 'Other'

export type IssueType =
  | 'Concept confusion'
  | 'Behaviour'
  | 'Multi-grade management'
  | 'Activity instructions'
  | 'Assessment'
  | 'TLM/Materials'

export type TeacherQueryInput = {
  classLevel: number
  subject: Subject
  issueType: IssueType
  description: string
  languageHint?: 'English' | 'Hindi'
}

export type CopilotSuggestions = {
  summaryChips: string[]
  immediateSteps: string[]
  activityIdea: {
    title: string
    steps: string[]
    materials: string[]
  }
  fastFinisherTips: string[]
}

export type LogStatus = 'Resolved' | 'Need more help' | 'Unmarked'

export type TeacherLogEntry = {
  id: string
  createdAt: number
  input: TeacherQueryInput
  title: string
  suggestions: CopilotSuggestions
  helpful?: boolean
  savedToNotes?: boolean
  status: LogStatus
}

