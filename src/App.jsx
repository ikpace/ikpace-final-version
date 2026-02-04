import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Navbar from './components/Navbar'
import LiveChatSupport from './components/LiveChatSupport'
import Footer from './components/Footer'
import PromotionalBanner from './components/PromotionalBanner'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import CoursePlayer from './pages/CoursePlayer'
import EnhancedCoursePlayer from './pages/EnhancedCoursePlayer'
import Community from './pages/Community'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/Profile'
import Certificates from './pages/Certificates'
import Enrollment from './pages/Enrollment'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import Pricing from './pages/Pricing'
import CareerReady from './pages/CareerReady'
import ProtectedCourseRoute from './components/ProtectedCourseRoute'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" />
  }

  return children
}

function AppContent() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-neutral-gray">
      <PromotionalBanner />
      <Navbar />
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/enroll/:slug" element={<Enrollment />} />
        <Route path="/checkout/:courseId" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/career-ready" element={<CareerReady />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        <Route path="/learn/:courseId" element={
          <ProtectedRoute>
            <ProtectedCourseRoute>
              <EnhancedCoursePlayer />
            </ProtectedCourseRoute>
          </ProtectedRoute>
        } />

        <Route path="/learn-classic/:courseId" element={
          <ProtectedRoute>
            <ProtectedCourseRoute>
              <CoursePlayer />
            </ProtectedCourseRoute>
          </ProtectedRoute>
        } />

        <Route path="/community" element={
          <ProtectedRoute>
            <Community />
          </ProtectedRoute>
        } />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />

        <Route path="/certificates" element={
          <ProtectedRoute>
            <Certificates />
          </ProtectedRoute>
        } />

        <Route path="/admin" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />
      </Routes>
      <Footer />
      <LiveChatSupport />
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
