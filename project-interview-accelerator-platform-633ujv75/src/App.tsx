import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider } from './contexts/AuthContext'
import { useAuth } from './hooks/useAuth'
import HomePage from './pages/HomePage'
import JourneyPage from './pages/JourneyPage'
import MentorsPage from './pages/MentorsPage'
import BookingPage from './pages/BookingPage'
import DashboardPage from './pages/DashboardPage'
import PortfolioTemplatesPage from './pages/PortfolioTemplatesPage'
import AIAssistantPage from './pages/AIAssistantPage'
import ResumeReviewPage from './pages/ResumeReviewPage'
import ResumeRebuildPage from './pages/ResumeRebuildPage'
import InterviewPrepPage from './pages/InterviewPrepPage'
import MockInterviewPage from './pages/MockInterviewPage'
import LinkedInStrategyPage from './pages/LinkedInStrategyPage'
import InterviewCheatsheetPage from './pages/InterviewCheatsheetPage'
import SignInPage from './pages/SignInPage'
import Navbar from './components/layout/Navbar'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/signin" replace />
  }
  
  return <>{children}</>
}

function AppContent() {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-background">
      {user && <Navbar />}
      <Routes>
        <Route path="/signin" element={user ? <Navigate to="/dashboard" replace /> : <SignInPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/journey" element={
          <ProtectedRoute>
            <JourneyPage />
          </ProtectedRoute>
        } />
        <Route path="/mentors" element={
          <ProtectedRoute>
            <MentorsPage />
          </ProtectedRoute>
        } />
        <Route path="/booking" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path="/booking/:mentorId" element={
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/portfolio-templates" element={
          <ProtectedRoute>
            <PortfolioTemplatesPage />
          </ProtectedRoute>
        } />
        <Route path="/ai-assistant" element={
          <ProtectedRoute>
            <AIAssistantPage />
          </ProtectedRoute>
        } />
        <Route path="/resume-review" element={
          <ProtectedRoute>
            <ResumeReviewPage />
          </ProtectedRoute>
        } />
        <Route path="/resume-rebuild" element={
          <ProtectedRoute>
            <ResumeRebuildPage />
          </ProtectedRoute>
        } />
        <Route path="/interview-prep" element={
          <ProtectedRoute>
            <InterviewPrepPage />
          </ProtectedRoute>
        } />
        <Route path="/mock-interviews" element={
          <ProtectedRoute>
            <MockInterviewPage />
          </ProtectedRoute>
        } />
        <Route path="/linkedin-strategy" element={
          <ProtectedRoute>
            <LinkedInStrategyPage />
          </ProtectedRoute>
        } />
        <Route path="/interview-cheatsheet" element={
          <ProtectedRoute>
            <InterviewCheatsheetPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/signin"} replace />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App