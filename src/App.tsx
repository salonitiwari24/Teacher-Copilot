import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AskPage } from './pages/AskPage'
import { CoachPage } from './pages/CoachPage'
import { HistoryPage } from './pages/HistoryPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SuggestionsPage } from './pages/SuggestionsPage'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/ask" replace />} />
        <Route path="/ask" element={<AskPage />} />
        <Route path="/suggestions/:id" element={<SuggestionsPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/coach" element={<CoachPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppLayout>
  )
}

export default App
