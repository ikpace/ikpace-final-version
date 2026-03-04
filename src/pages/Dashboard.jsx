import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import { 
  BookOpen, Award, Clock, Flame, Target, Sparkles, Bell, 
  Brain, Zap, CheckCircle, XCircle, Info, ChevronRight, 
  RotateCcw, Star, Users, MessageCircle, Gift, Rocket, Crown,
  Medal, Gem, Calendar, BarChart, Activity, Globe, Heart, User,
  CreditCard, Receipt, TrendingUp, MessageSquare, X, Send, Bot,
  Settings, LogOut, Edit3, Camera, MapPin, Briefcase, GraduationCap,
  Users2, Globe2, Phone, Github, Linkedin, Twitter, Copy, Check,
  QrCode, Share, AlertCircle, DollarSign, CalendarDays, BookMarked,
  Mail, BellRing, BellOff, Volume2, VolumeX, PlayCircle, ArrowRight,
  Home, PieChart, BarChart2, Download, Eye, EyeOff, Filter, Search,
  Menu, Maximize, Minimize, RefreshCw, Facebook, Instagram, Youtube,
  ChevronDown, LogIn, Flag, Grid, List, LayoutGrid, LayoutList,
  Sidebar, PanelLeft, PanelRight, PanelTop, PanelBottom,
  Tablet, Smartphone, Laptop, Monitor, Maximize2, Minimize2
} from 'lucide-react'

export default function Dashboard() {
  const { user, profile } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [payments, setPayments] = useState([])
  const [certificates, setCertificates] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [streak, setStreak] = useState(0)
  const [totalSpent, setTotalSpent] = useState(0)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('courses')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list' for mobile
  
  // New state for additional features
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New course available', message: 'Check out our new AI course', read: false, time: '5 min ago' },
    { id: 2, title: 'Quiz reminder', message: 'Complete today\'s quiz to maintain streak', read: false, time: '1 hour ago' },
    { id: 3, title: 'Certificate earned', message: 'You earned a certificate in VA course', read: true, time: '2 days ago' }
  ])
  const [recommendedCourses, setRecommendedCourses] = useState([])
  const [learningPath, setLearningPath] = useState([])
  const [achievements, setAchievements] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [goals, setGoals] = useState([
    { id: 1, title: 'Complete 5 courses', progress: 60, target: 5, current: 3 },
    { id: 2, title: '30-day streak', progress: 70, target: 30, current: 21 },
    { id: 3, title: 'Earn 3 certificates', progress: 33, target: 3, current: 1 }
  ])
  const [upcomingDeadlines, setUpcomingDeadlines] = useState([])
  const [studyTime, setStudyTime] = useState(0)
  const [studyTimerActive, setStudyTimerActive] = useState(false)
  const [selectedCourseForTimer, setSelectedCourseForTimer] = useState(null)

  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    learningStreak: 7,
    totalLearningTime: 42,
    quizzesTaken: 12,
    averageScore: 85,
    totalHoursWatched: 156,
    coursesInProgress: 3,
    achievementsEarned: 8,
    rankPoints: 1250,
    rankLevel: 'Silver Learner'
  })

  // Brand Colors
  const colors = {
    primary: "#1A3D7C",    // Ikpace Deep Blue
    secondary: "#FF7A00",   // Ikpace Vibrant Orange
    accent: "#2F5EA8",      // Stronger blue accent
    success: "#008F4C",     // Brand green
    warning: "#E6B800",     // Brand yellow
    danger: "#DC2626",      // Red for errors
    lightGray: "#F3F4F6",
    white: "#FFFFFF",
    purple: "#6B46C1",
    teal: "#319795",
    pink: "#D53F8C",
    indigo: "#4F46E5",
    amber: "#F59E0B",
    emerald: "#10B981",
    cyan: "#06B6D4",
    violet: "#8B5CF6"
  }

  // Quiz Questions
  const quizQuestions = [
    {
      id: 1,
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Home Tool Markup Language"
      ],
      correct: 0,
      explanation: "HTML stands for Hyper Text Markup Language - the standard language for creating web pages.",
      category: "Web Development"
    },
    {
      id: 2,
      question: "Which of the following is a JavaScript framework?",
      options: [
        "Django",
        "Laravel",
        "React",
        "Flask"
      ],
      correct: 2,
      explanation: "React is a JavaScript library for building user interfaces, developed by Facebook.",
      category: "JavaScript"
    },
    {
      id: 3,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Colorful Style Sheets"
      ],
      correct: 2,
      explanation: "CSS stands for Cascading Style Sheets, used for styling web pages.",
      category: "Web Development"
    }
  ]

  useEffect(() => {
    if (user) {
      fetchDashboardData()
      fetchPayments()
      fetchRecentActivity()
      fetchRecommendedCourses()
      fetchLearningPath()
      fetchAchievements()
      fetchLeaderboard()
      fetchUpcomingDeadlines()
    }
  }, [user])

  useEffect(() => {
    if (enrollments.length > 0 && !selectedCourse) {
      setSelectedCourse(enrollments[0])
    }
  }, [enrollments])

  const fetchDashboardData = async () => {
    try {
      const { data: enrollmentsData } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            id,
            title,
            slug,
            thumbnail_url,
            duration_weeks,
            level,
            price,
            category
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('enrolled_at', { ascending: false })

      if (enrollmentsData) {
        setEnrollments(enrollmentsData)
        const completed = enrollmentsData.filter(e => e.progress === 100).length
        setStats(prev => ({ 
          ...prev, 
          totalCourses: enrollmentsData.length,
          completedCourses: completed,
          coursesInProgress: enrollmentsData.length - completed
        }))
      }

      // Fix: Handle case where certificates table might not exist
      try {
        const { data: certificatesData } = await supabase
          .from('certificates')
          .select('*')
          .eq('user_id', user.id)

        if (certificatesData) {
          setCertificates(certificatesData)
          setStats(prev => ({ ...prev, achievementsEarned: certificatesData.length }))
        }
      } catch (certError) {
        console.log('Certificates table might not exist yet:', certError)
        setCertificates([])
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPayments = async () => {
    try {
      const { data } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'success')
        .order('created_at', { ascending: false })

      if (data) {
        setPayments(data)
        const spent = data.reduce((sum, p) => sum + (p.amount || 0), 0)
        setTotalSpent(spent)
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    }
  }

  const fetchRecentActivity = async () => {
    try {
      // Fix: Handle case where activity_logs table might not exist
      try {
        const { data } = await supabase
          .from('activity_logs')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5)

        if (data) {
          setRecentActivity(data)
        }
      } catch (activityError) {
        console.log('Activity logs table might not exist yet:', activityError)
        setRecentActivity([])
      }
    } catch (error) {
      console.error('Error fetching activity:', error)
    }
  }

  // New fetch functions
  const fetchRecommendedCourses = async () => {
    setRecommendedCourses([
      {
        id: 1,
        title: 'Advanced AI Prompt Engineering',
        category: 'AI & Tech',
        duration: '6 weeks',
        level: 'Intermediate',
        rating: 4.9,
        students: 234,
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg'
      },
      {
        id: 2,
        title: 'Digital Marketing Mastery',
        category: 'Marketing',
        duration: '8 weeks',
        level: 'Beginner',
        rating: 4.8,
        students: 567,
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg'
      },
      {
        id: 3,
        title: 'UX/UI Design Fundamentals',
        category: 'Design',
        duration: '6 weeks',
        level: 'Beginner',
        rating: 4.7,
        students: 345,
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg'
      }
    ])
  }

  const fetchLearningPath = async () => {
    setLearningPath([
      { id: 1, title: 'Virtual Assistant Pro', progress: 100, completed: true },
      { id: 2, title: 'Social Media Marketing', progress: 65, completed: false },
      { id: 3, title: 'Canva Design', progress: 30, completed: false },
      { id: 4, title: 'AI Prompt Engineering', progress: 0, completed: false }
    ])
  }

  const fetchAchievements = async () => {
    setAchievements([
      { id: 1, title: 'Quick Learner', description: 'Complete 3 courses', progress: 2, target: 3 },
      { id: 2, title: 'Streak Master', description: '30-day learning streak', progress: 21, target: 30 },
      { id: 3, title: 'Knowledge Seeker', description: 'Watch 100 hours', progress: 156, target: 100 },
      { id: 4, title: 'Quiz Champion', description: 'Score 90% on 10 quizzes', progress: 8, target: 10 }
    ])
  }

  const fetchLeaderboard = async () => {
    setLeaderboard([
      { id: 1, name: 'Sarah Johnson', points: 2450, avatar: 'SJ', rank: 1 },
      { id: 2, name: 'Michael Chen', points: 2320, avatar: 'MC', rank: 2 },
      { id: 3, name: 'Emma Williams', points: 2180, avatar: 'EW', rank: 3 },
      { id: 4, name: 'James Brown', points: 2050, avatar: 'JB', rank: 4 },
      { id: 5, name: 'You', points: stats.rankPoints, avatar: 'ME', rank: 5, isUser: true }
    ])
  }

  const fetchUpcomingDeadlines = async () => {
    setUpcomingDeadlines([
      { id: 1, title: 'VA Course Quiz', due: 'Tomorrow', type: 'quiz' },
      { id: 2, title: 'Design Project Submission', due: 'In 3 days', type: 'project' },
      { id: 3, title: 'Marketing Assignment', due: 'In 5 days', type: 'assignment' }
    ])
  }

  const getDisplayName = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Learner';
  }

  const copyStudentId = () => {
    const studentId = user?.id?.slice(0, 8).toUpperCase()
    navigator.clipboard.writeText(studentId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleStartQuiz = () => {
    setShowQuiz(true)
    setQuizStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setTimeLeft(30)
    setQuizCompleted(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index)
    if (index === quizQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1)
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
      setSelectedAnswer(null)
      setTimeLeft(30)
    } else {
      setQuizCompleted(true)
      setShowResult(true)
    }
  }

  const handleRestartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(30)
    setQuizCompleted(false)
    setShowResult(false)
    setStreak(0)
  }

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hrs}h ${mins}m`
  }

  const unreadNotifications = notifications.filter(n => !n.read).length

  // Study timer functions
  const startStudyTimer = (courseId) => {
    setStudyTimerActive(true)
    setSelectedCourseForTimer(courseId)
  }

  const stopStudyTimer = () => {
    setStudyTimerActive(false)
    setSelectedCourseForTimer(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-t-transparent mx-auto mb-4" style={{ borderColor: colors.primary, borderTopColor: 'transparent' }}></div>
          <p className="text-sm sm:text-base text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Welcome Banner - Fully Responsive */}
      <div className="w-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {/* Mobile Header with Menu */}
          <div className="flex items-center justify-between lg:hidden mb-3">
            <Link to="/" className="font-bold text-xl text-white">iKPACE</Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mb-4 bg-white/10 backdrop-blur-md rounded-xl p-3 animate-slideDown">
              <div className="space-y-1">
                <Link to="/profile" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg text-sm">Profile</Link>
                <Link to="/settings" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg text-sm">Settings</Link>
                <Link to="/community" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg text-sm">Community</Link>
                <button className="w-full text-left px-4 py-3 text-white hover:bg-white/10 rounded-lg text-sm">Logout</button>
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Left side - Greeting */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-xs font-medium">
                  {stats.rankLevel}
                </span>
                <span className="text-white/80 text-xs">• {stats.rankPoints} pts</span>
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 break-words">
                Hello, <span className="text-yellow-300">{getDisplayName()}</span>!
              </h1>
              <p className="text-blue-100 text-xs sm:text-sm">Continue your learning journey</p>
            </div>
            
            {/* Right side - Student ID and Notifications */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Notifications Bell */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-2.5 sm:p-3 border border-white/20 hover:bg-white/20 transition-colors"
                >
                  <Bell size={18} className="sm:w-5 sm:h-5 text-white" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                      <h3 className="font-bold text-sm sm:text-base text-gray-900">Notifications</h3>
                      <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div key={notif.id} className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notif.read ? 'bg-blue-50' : ''}`}>
                          <div className="flex items-start gap-2">
                            <div className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <div className="flex-1">
                              <p className="text-xs sm:text-sm font-medium text-gray-900">{notif.title}</p>
                              <p className="text-xs text-gray-600 mt-0.5">{notif.message}</p>
                              <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Student ID Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-white/20 flex items-center gap-2">
                <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.secondary }}>
                  <Crown size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-blue-200">STUDENT ID</p>
                  <div className="flex items-center gap-1">
                    <span className="font-mono font-bold text-xs sm:text-sm text-white">
                      {user?.id?.slice(0, 6).toUpperCase()}
                    </span>
                    <button onClick={copyStudentId} className="p-0.5 hover:bg-white/20 rounded">
                      {copied ? <Check size={12} className="text-green-300" /> : <Copy size={12} className="text-white/70" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Stats Cards - Fully Responsive Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: colors.primary }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Enrolled</p>
                <p className="text-lg sm:text-xl font-bold" style={{ color: colors.primary }}>{enrollments.length}</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: `${colors.primary}15` }}>
                <BookOpen size={18} className="sm:w-5 sm:h-5" style={{ color: colors.primary }} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{stats.coursesInProgress} in progress</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: colors.success }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Completed</p>
                <p className="text-lg sm:text-xl font-bold" style={{ color: colors.success }}>{stats.completedCourses}</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: `${colors.success}15` }}>
                <CheckCircle size={18} className="sm:w-5 sm:h-5" style={{ color: colors.success }} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{stats.achievementsEarned} achievements</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: colors.secondary }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Streak</p>
                <p className="text-lg sm:text-xl font-bold" style={{ color: colors.secondary }}>{stats.learningStreak}</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: `${colors.secondary}15` }}>
                <Flame size={18} className="sm:w-5 sm:h-5" style={{ color: colors.secondary }} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Keep it up! 🔥</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border-l-4 hover:shadow-md transition-shadow" style={{ borderLeftColor: colors.purple }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Hours</p>
                <p className="text-lg sm:text-xl font-bold" style={{ color: colors.purple }}>{stats.totalHoursWatched}</p>
              </div>
              <div className="p-2 rounded-lg" style={{ background: `${colors.purple}15` }}>
                <Clock size={18} className="sm:w-5 sm:h-5" style={{ color: colors.purple }} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Total learning time</p>
          </div>
        </div>

        {/* Dashboard Tabs - Scrollable on Mobile */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
            {[
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'payments', label: 'Payments', icon: CreditCard },
              { id: 'quiz', label: 'Quiz', icon: Brain },
              { id: 'activity', label: 'Activity', icon: Activity },
              { id: 'certificates', label: 'Certs', icon: Award },
              { id: 'community', label: 'Community', icon: Users },
              { id: 'path', label: 'Path', icon: Target },
              { id: 'achievements', label: 'Achievements', icon: Medal },
              { id: 'leaderboard', label: 'Leaderboard', icon: Crown },
              { id: 'goals', label: 'Goals', icon: Flag }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'text-white shadow-md' 
                    : 'text-gray-600 bg-white hover:bg-gray-100 border border-gray-200'
                }`}
                style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
              >
                <tab.icon size={14} />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            ))}
          </div>
          
          {/* View Toggle for Mobile - Only shows on courses tab */}
          {activeTab === 'courses' && enrollments.length > 0 && (
            <div className="flex items-center gap-1 ml-2 bg-white rounded-lg border border-gray-200 p-1 lg:hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
              >
                <List size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Courses Tab - Fully Responsive with Multiple View Modes */}
        {activeTab === 'courses' && (
          <>
            {enrollments.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
                <BookOpen size={48} className="sm:w-16 sm:h-16 mx-auto mb-4" style={{ color: colors.primary }} />
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6">Start your learning journey today!</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-all text-sm sm:text-base"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                >
                  Browse Courses
                </Link>
              </div>
            ) : (
              <>
                {/* Desktop Layout (lg and up) - Sidebar Style */}
                <div className="hidden lg:flex lg:flex-row gap-6">
                  {/* Sidebar - Course List */}
                  <div className="w-80 xl:w-96 bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                      <h3 className="font-bold text-white flex items-center gap-2">
                        <BookOpen size={18} />
                        My Courses ({enrollments.length})
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                      {enrollments.map((enrollment, index) => (
                        <button
                          key={enrollment.id}
                          onClick={() => setSelectedCourse(enrollment)}
                          className={`w-full text-left p-4 hover:bg-gray-50 transition-all ${
                            selectedCourse?.id === enrollment.id ? 'bg-blue-50/50 border-l-4' : ''
                          }`}
                          style={selectedCourse?.id === enrollment.id ? { borderLeftColor: colors.primary } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-100">
                              {enrollment.courses?.thumbnail_url ? (
                                <img src={enrollment.courses.thumbnail_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <BookOpen size={18} style={{ color: colors.primary }} />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-gray-900 truncate">{enrollment.courses?.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                <span className="px-1.5 py-0.5 rounded-full text-[10px]" style={{ background: `${colors.primary}10`, color: colors.primary }}>
                                  {enrollment.courses?.level || 'Beginner'}
                                </span>
                                <span>•</span>
                                <span>{enrollment.courses?.duration_weeks || 6}w</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold mb-1" style={{ color: colors.primary }}>{enrollment.progress || 0}%</div>
                              <div className="w-12 h-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${enrollment.progress || 0}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main Content - Selected Course */}
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
                    {selectedCourse && (
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                            {selectedCourse.courses?.thumbnail_url ? (
                              <img src={selectedCourse.courses.thumbnail_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen size={28} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedCourse.courses?.title}</h2>
                            <div className="flex flex-wrap items-center gap-3 text-sm">
                              <span className="px-2 py-1 rounded-full text-xs font-medium" style={{ background: `${colors.primary}10`, color: colors.primary }}>
                                {selectedCourse.courses?.level || 'Beginner'}
                              </span>
                              <span className="flex items-center gap-1 text-gray-500">
                                <Clock size={14} /> {selectedCourse.courses?.duration_weeks || 6} weeks
                              </span>
                              <span className="flex items-center gap-1 text-gray-500">
                                <Target size={14} /> {selectedCourse.progress || 0}% complete
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">Progress</span>
                            <span className="font-bold" style={{ color: colors.primary }}>{selectedCourse.progress || 0}%</span>
                          </div>
                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${selectedCourse.progress || 0}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                          </div>
                        </div>

                        <Link
                          to={`/course-curriculum/${selectedCourse.courses?.slug || selectedCourse.course_id}`}
                          className="block w-full py-3 px-4 rounded-xl text-white font-medium text-center hover:opacity-90 transition-all"
                          style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                        >
                          Continue Learning
                        </Link>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Lessons</p>
                            <p className="text-lg font-bold" style={{ color: colors.primary }}>12</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Projects</p>
                            <p className="text-lg font-bold" style={{ color: colors.secondary }}>3</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Hours</p>
                            <p className="text-lg font-bold" style={{ color: colors.success }}>24</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xs text-gray-500">Certificate</p>
                            <p className="text-lg font-bold" style={{ color: selectedCourse.progress === 100 ? colors.success : colors.warning }}>
                              {selectedCourse.progress === 100 ? '✓' : '⏳'}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <Link to={`/course-curriculum/${selectedCourse.courses?.slug || selectedCourse.course_id}/resources`} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                            <BookOpen size={16} style={{ color: colors.primary }} />
                            <span className="text-sm text-gray-700">Resources</span>
                          </Link>
                          <Link to={`/course-curriculum/${selectedCourse.courses?.slug || selectedCourse.course_id}/discussion`} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all">
                            <MessageCircle size={16} style={{ color: colors.secondary }} />
                            <span className="text-sm text-gray-700">Discussion</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile/Tablet Layout (below lg) - Grid or List View */}
                <div className="lg:hidden">
                  {viewMode === 'grid' ? (
                    // Grid View
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {enrollments.map((enrollment) => (
                        <Link
                          key={enrollment.id}
                          to={`/course-curriculum/${enrollment.courses?.slug || enrollment.course_id}`}
                          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all active:scale-[0.99]"
                        >
                          <div className="h-32 sm:h-40 relative bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                            {enrollment.courses?.thumbnail_url ? (
                              <img src={enrollment.courses.thumbnail_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen size={32} className="text-white/50" />
                              </div>
                            )}
                            <div className="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white">
                              {enrollment.courses?.level}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{enrollment.courses?.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                              <Clock size={12} /> {enrollment.courses?.duration_weeks} weeks
                            </div>
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-bold" style={{ color: colors.primary }}>{enrollment.progress || 0}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${enrollment.progress || 0}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    // List View
                    <div className="space-y-3">
                      {enrollments.map((enrollment) => (
                        <Link
                          key={enrollment.id}
                          to={`/course-curriculum/${enrollment.courses?.slug || enrollment.course_id}`}
                          className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                            {enrollment.courses?.thumbnail_url ? (
                              <img src={enrollment.courses.thumbnail_url} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen size={20} className="text-white" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 truncate">{enrollment.courses?.title}</h3>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <span className="px-1.5 py-0.5 rounded-full" style={{ background: `${colors.primary}10`, color: colors.primary }}>
                                {enrollment.courses?.level}
                              </span>
                              <span>•</span>
                              <span>{enrollment.courses?.duration_weeks} weeks</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs font-bold mb-1" style={{ color: colors.primary }}>{enrollment.progress || 0}%</div>
                            <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${enrollment.progress || 0}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* Other Tabs remain the same but with responsive improvements */}
        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Join Our Community</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Student Community Card */}
                <div className="p-4 sm:p-6 border-2 rounded-xl hover:shadow-lg transition-all group" style={{ borderColor: colors.primary + '20' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.primary + '10' }}>
                      <Users2 size={20} className="sm:w-6 sm:h-6" style={{ color: colors.primary }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">Student Community</h3>
                      <p className="text-xs text-gray-500">Connect with learners</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">Join 130+ students sharing ideas and growing together.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Active daily</span>
                    <Link to="/community" className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: colors.primary }}>
                      Join <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>

                {/* WhatsApp Group Card */}
                <a href="#" className="p-4 sm:p-6 border-2 rounded-xl hover:shadow-lg transition-all block group" style={{ borderColor: colors.secondary + '20' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.secondary + '10' }}>
                      <MessageCircle size={20} className="sm:w-6 sm:h-6" style={{ color: colors.secondary }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm sm:text-base">WhatsApp Group</h3>
                      <p className="text-xs text-gray-500">Instant discussions</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">Get real-time help and network with peers.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">200+ members</span>
                    <span className="text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: colors.secondary }}>
                      Join <ChevronRight size={14} />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Payment History</h2>
            {payments.length === 0 ? (
              <div className="text-center py-8">
                <Receipt size={40} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm text-gray-500">No payment history yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Ref</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.slice(0, 5).map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-mono text-xs">{payment.reference?.slice(0, 6)}</td>
                          <td className="py-3 px-4 font-bold text-sm" style={{ color: colors.primary }}>GHS {payment.amount}</td>
                          <td className="py-3 px-4 text-xs text-gray-600">{new Date(payment.created_at).toLocaleDateString()}</td>
                          <td className="py-3 px-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Success</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Daily Quiz</h2>
            {!showQuiz ? (
              <div className="text-center py-8">
                <Brain size={48} className="mx-auto mb-4" style={{ color: colors.secondary }} />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Test Your Knowledge</h3>
                <p className="text-sm text-gray-500 mb-6">Answer questions and earn streak points</p>
                <button onClick={handleStartQuiz} className="px-6 py-3 text-white rounded-lg font-bold hover:opacity-90 transition-all" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                  Start Quiz
                </button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                {!quizCompleted ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold" style={{ color: colors.primary }}>Q{currentQuestion + 1}/{quizQuestions.length}</span>
                      <span className="flex items-center gap-2"><Flame size={14} className={streak > 0 ? 'text-orange-500' : 'text-gray-400'} /> {streak}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full transition-all" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                    </div>
                    <p className="text-gray-900 font-medium">{quizQuestions[currentQuestion].question}</p>
                    <div className="space-y-2">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button key={index} onClick={() => handleAnswerSelect(index)} className={`w-full text-left p-3 rounded-lg text-sm transition-all ${selectedAnswer === index ? (index === quizQuestions[currentQuestion].correct ? 'bg-green-100 border border-green-500' : 'bg-red-100 border border-red-500') : 'bg-gray-50 border border-gray-200 hover:border-orange-500'}`} disabled={selectedAnswer !== null}>
                          {option}
                        </button>
                      ))}
                    </div>
                    {selectedAnswer !== null && (
                      <>
                        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">{quizQuestions[currentQuestion].explanation}</div>
                        <button onClick={handleNextQuestion} className="w-full py-3 text-white rounded-lg font-bold" style={{ background: colors.primary }}>
                          {currentQuestion === quizQuestions.length - 1 ? 'Finish' : 'Next'}
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Award size={48} className="mx-auto mb-4" style={{ color: colors.secondary }} />
                    <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>Quiz Completed!</h3>
                    <p className="text-gray-600 mb-6">Score: {score}/{quizQuestions.length}</p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={handleRestartQuiz} className="px-4 py-2 rounded-full text-sm font-medium border border-gray-300 hover:bg-gray-50">Try Again</button>
                      <button onClick={() => setShowQuiz(false)} className="px-4 py-2 text-white rounded-full text-sm font-medium" style={{ background: colors.secondary }}>Done</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Recent Activity</h2>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <Activity size={40} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <BookOpen size={14} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.metadata?.description || 'Activity'}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Certificates</h2>
            {certificates.length === 0 ? (
              <div className="text-center py-8">
                <Award size={40} className="mx-auto mb-4 text-gray-300" />
                <p className="text-sm text-gray-500 mb-4">Complete courses to earn certificates</p>
                <Link to="/courses" className="inline-flex items-center gap-2 px-4 py-2 text-white rounded-lg text-sm" style={{ background: colors.primary }}>
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-4 flex items-center gap-3">
                    <div className="p-2 rounded-lg" style={{ background: `${colors.secondary}20` }}>
                      <Award size={20} style={{ color: colors.secondary }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{cert.course_title}</h3>
                      <p className="text-xs text-gray-500">{new Date(cert.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Learning Path Tab */}
        {activeTab === 'path' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Learning Path</h2>
            <div className="space-y-4">
              {learningPath.map((path, index) => (
                <div key={path.id} className="relative pl-6">
                  {index < learningPath.length - 1 && <div className="absolute left-2 top-6 bottom-0 w-0.5 bg-gray-200"></div>}
                  <div className="absolute left-0 top-1 w-4 h-4 rounded-full border-2 bg-white" style={{ borderColor: path.completed ? colors.success : colors.primary }} />
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-bold text-gray-900 mb-2">{path.title}</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${path.progress}%`, background: path.completed ? colors.success : `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                      </div>
                      <span className="text-sm font-bold" style={{ color: path.completed ? colors.success : colors.primary }}>{path.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Achievements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: `${colors.secondary}15` }}>
                      <Medal size={20} style={{ color: colors.secondary }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                      <p className="text-xs text-gray-500">{achievement.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-bold" style={{ color: colors.primary }}>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(achievement.progress / achievement.target) * 100}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Leaderboard</h2>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.id} className={`flex items-center gap-3 p-3 rounded-lg ${user.isUser ? 'bg-orange-50' : ''}`}>
                  <div className={`w-8 text-center font-bold ${user.rank === 1 ? 'text-yellow-500' : user.rank === 2 ? 'text-gray-400' : user.rank === 3 ? 'text-orange-600' : 'text-gray-500'}`}>#{user.rank}</div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${user.isUser ? 'bg-orange-500' : 'bg-gray-400'}`}>{user.avatar}</div>
                  <div className="flex-1">
                    <p className={`font-medium ${user.isUser ? 'text-orange-600' : 'text-gray-900'}`}>{user.name}</p>
                    <p className="text-xs text-gray-500">{user.points} points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold mb-4" style={{ color: colors.primary }}>Learning Goals</h2>
            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-600">{goal.title}</p>
                    <p className="text-xs font-bold" style={{ color: colors.primary }}>{goal.current}/{goal.target}</p>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${goal.progress}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }} />
                  </div>
                </div>
              ))}
              <button className="w-full mt-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors" style={{ color: colors.primary }}>
                Set New Goal
              </button>
            </div>
          </div>
        )}

        {/* Upcoming Deadlines - Shows on all tabs */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold mb-3" style={{ color: colors.primary }}>Upcoming</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 rounded-lg" style={{ background: `${colors.warning}15` }}>
                  <Clock size={16} style={{ color: colors.warning }} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{deadline.title}</p>
                  <p className="text-xs" style={{ color: colors.warning }}>{deadline.due}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Timer */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base sm:text-lg font-bold" style={{ color: colors.primary }}>Study Timer</h3>
            {studyTimerActive ? (
              <button onClick={stopStudyTimer} className="px-3 py-1 bg-red-100 text-red-600 rounded-lg text-sm">Stop</button>
            ) : (
              <button onClick={() => startStudyTimer('all')} className="px-3 py-1 rounded-lg text-sm text-white" style={{ background: colors.primary }}>Start</button>
            )}
          </div>
          <p className="text-sm text-gray-600">{studyTimerActive ? 'Session in progress...' : 'Track your study time'}</p>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        @media (max-width: 640px) {
          input, select, button { font-size: 16px !important; }
          .min-h-screen { padding-bottom: env(safe-area-inset-bottom); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (min-width: 480px) { .xs\\:inline { display: inline; } }
      `}</style>
    </div>
  )
}