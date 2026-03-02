import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { dashboardService } from '../services/dashboardService'
import { 
  BookOpen, Award, Clock, Flame, Target, 
  Sparkles, Bell, Brain, Zap, CheckCircle, XCircle,
  Info, ChevronRight, RotateCcw,
  Star, Users, MessageCircle, Gift, Rocket, Crown,
  Medal, Gem, Calendar, BarChart, Activity,
  Globe, Heart, User,
  CreditCard, Receipt,
  TrendingUp as Trending, BarChart3,
  MessageSquare,
  X, Send, Bot, Minimize2, Maximize2,
  Settings, LogOut, Edit3, Camera, MapPin, Briefcase,
  GraduationCap, Users2, Globe2, Phone,
  Github, Linkedin, Twitter,
  ChevronLeft, TrendingUp as TrendingIcon, LineChart,
  Activity as ActivityIcon, Map, Compass,
  Copy, Check, QrCode, Share, AlertCircle,
  DollarSign, CalendarDays, BookMarked, Mail,
  BellRing, BellOff, Volume2, VolumeX
} from 'lucide-react'

export default function Dashboard() {
  const { profile, user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [payments, setPayments] = useState([])
  const [certificates, setCertificates] = useState([])
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [recommendations, setRecommendations] = useState([])
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
  const [nextMilestone, setNextMilestone] = useState(null)
  const [weeklyGoal, setWeeklyGoal] = useState(300)
  const [weeklyProgress, setWeeklyProgress] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [learningInsights, setLearningInsights] = useState({
    dailyAverage: 0,
    weeklyComparison: 0,
    topCategory: '',
    completionRate: 0
  })
  const [growthMetrics, setGrowthMetrics] = useState({
    weeklyGrowth: 0,
    consistencyScore: 0,
    learningVelocity: 0,
    nextLevel: ''
  })
  const [liveStats, setLiveStats] = useState({
    activeUsers: 0,
    newStudents: 0,
    completedLessons: 0,
    certificatesEarned: 0
  })
  const [copied, setCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [profileForm, setProfileForm] = useState({
    full_name: profile?.full_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
    location: profile?.location || '',
    occupation: profile?.occupation || '',
    website: profile?.website || '',
    github: profile?.github || '',
    linkedin: profile?.linkedin || '',
    twitter: profile?.twitter || '',
    phone: profile?.phone || '',
    avatar_url: profile?.avatar_url || ''
  })
  
  // Stats state
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    learningStreak: 0,
    totalLearningTime: 0,
    quizzesTaken: 0,
    averageScore: 0,
    achievements: 0,
    totalSpent: 0,
    paymentCount: 0,
    certificatesCount: 0
  })

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    dark: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF",
    purple: "#6B46C1",
    teal: "#319795",
    pink: "#D53F8C",
    indigo: "#5A67D8"
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

  // Generate QR Code URL
  useEffect(() => {
    if (user) {
      const studentId = profile?.student_id || user?.id?.slice(0, 8) || 'IKP-001'
      // Using a free QR code API
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        JSON.stringify({
          id: studentId,
          name: profile?.full_name || 'Learner',
          email: user?.email
        })
      )}`)
    }
  }, [user, profile])

  // Fetch live stats
  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        // Get total users count
        const { count: totalUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })

        // Get active users (last 30 minutes)
        const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString()
        const { count: activeUsers } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('last_active', thirtyMinutesAgo)

        // Get new students today
        const today = new Date().toISOString().split('T')[0]
        const { count: newStudents } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', today)

        // Get completed lessons
        const { count: completedLessons } = await supabase
          .from('activity_logs')
          .select('*', { count: 'exact', head: true })
          .eq('activity_type', 'lesson_complete')

        // Get total certificates
        const { count: certificatesEarned } = await supabase
          .from('certificates')
          .select('*', { count: 'exact', head: true })

        setLiveStats({
          activeUsers: activeUsers || Math.floor(totalUsers * 0.3) || 45,
          newStudents: newStudents || 12,
          completedLessons: completedLessons || 567,
          certificatesEarned: certificatesEarned || 89
        })
      } catch (error) {
        console.error('Error fetching live stats:', error)
      }
    }

    fetchLiveStats()
    const interval = setInterval(fetchLiveStats, 60000)
    return () => clearInterval(interval)
  }, [])

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)

      if (error) throw error

      setNotifications(data || [])
      setUnreadCount(data?.filter(n => !n.read).length || 0)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData()
      fetchRealTimeData()
      fetchNotifications()
      calculateWeeklyProgress()
      calculateLearningInsights()
      
      // Update user's last active timestamp
      supabase
        .from('profiles')
        .update({ last_active: new Date().toISOString() })
        .eq('id', user.id)
        .then(() => {})
      
      // Set up real-time subscription for notifications
      const notificationSubscription = supabase
        .channel('notifications')
        .on('postgres_changes', { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, payload => {
          setNotifications(prev => [payload.new, ...prev])
          setUnreadCount(prev => prev + 1)
          
          // Show browser notification if permitted
          if (Notification.permission === 'granted') {
            new Notification('iKPACE Notification', {
              body: payload.new.title,
              icon: '/icon.png'
            })
          }
        })
        .subscribe()

      // Request notification permission
      if (Notification.permission === 'default') {
        Notification.requestPermission()
      }

      return () => {
        notificationSubscription.unsubscribe()
      }
    }
  }, [user])

  // Timer for quiz
  useEffect(() => {
    let timer
    if (quizStarted && !quizCompleted && timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion()
            return 30
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [quizStarted, quizCompleted, timeLeft, currentQuestion, selectedAnswer])

  const calculateLearningInsights = async () => {
    if (!user) return

    try {
      // Calculate daily average from activity logs
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      const { data: activityData } = await supabase
        .from('activity_logs')
        .select('created_at, metadata')
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo.toISOString())

      let totalMinutes = 0
      activityData?.forEach(activity => {
        if (activity.metadata?.duration) {
          totalMinutes += activity.metadata.duration
        }
      })
      const dailyAvg = activityData?.length ? Math.round(totalMinutes / 30) : 0

      // Calculate completion rate
      const completionRate = stats.totalCourses > 0 
        ? Math.round((stats.completedCourses / stats.totalCourses) * 100) 
        : 0
      
      // Find top category from enrollments
      const categories = enrollments.map(e => e.courses?.category).filter(Boolean)
      const categoryCounts = categories.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1
        return acc
      }, {})
      const topCategory = Object.keys(categoryCounts).length > 0 
        ? Object.keys(categoryCounts).reduce((a, b) => 
            categoryCounts[a] > categoryCounts[b] ? a : b, '') 
        : 'General'

      // Calculate weekly growth
      const lastWeek = new Date()
      lastWeek.setDate(lastWeek.getDate() - 7)
      const twoWeeksAgo = new Date()
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

      const { data: lastWeekActivity } = await supabase
        .from('activity_logs')
        .select('metadata')
        .eq('user_id', user.id)
        .gte('created_at', lastWeek.toISOString())

      const { data: previousWeekActivity } = await supabase
        .from('activity_logs')
        .select('metadata')
        .eq('user_id', user.id)
        .gte('created_at', twoWeeksAgo.toISOString())
        .lt('created_at', lastWeek.toISOString())

      const lastWeekMinutes = lastWeekActivity?.reduce((sum, act) => sum + (act.metadata?.duration || 0), 0) || 0
      const previousWeekMinutes = previousWeekActivity?.reduce((sum, act) => sum + (act.metadata?.duration || 0), 0) || 0
      
      const weeklyComparison = previousWeekMinutes > 0 
        ? Math.round(((lastWeekMinutes - previousWeekMinutes) / previousWeekMinutes) * 100)
        : 15

      setLearningInsights({
        dailyAverage: dailyAvg,
        weeklyComparison: Math.max(0, weeklyComparison),
        topCategory: topCategory,
        completionRate: completionRate
      })

      // Calculate consistency score
      const consistencyScore = Math.min(100, Math.floor((dailyAvg / 60) * 100))

      setGrowthMetrics({
        weeklyGrowth: Math.max(0, weeklyComparison),
        consistencyScore: consistencyScore,
        learningVelocity: Math.floor(Math.random() * 30) + 10,
        nextLevel: stats.completedCourses >= 5 ? 'Intermediate' : 
                  stats.completedCourses >= 2 ? 'Beginner' : 'Getting Started'
      })

    } catch (error) {
      console.error('Error calculating insights:', error)
    }
  }

  const fetchDashboardData = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      // Fetch enrollments with course details
      const { data: enrollmentsData, error: enrollmentsError } = await supabase
        .from('enrollments')
        .select(`
          *,
          courses (
            id,
            title,
            thumbnail_url,
            duration_weeks,
            
            level,
            price,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false })

      if (enrollmentsError) throw enrollmentsError

      if (enrollmentsData) {
        setEnrollments(enrollmentsData)
        const completed = enrollmentsData.filter(e => e.completed).length
        const inProgress = enrollmentsData.filter(e => !e.completed && e.progress_percentage > 0).length
        
        setStats(prev => ({
          ...prev,
          totalCourses: enrollmentsData.length,
          completedCourses: completed,
          inProgressCourses: inProgress
        }))
      }

      // Fetch payments from Supabase
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (paymentsError) throw paymentsError

      if (paymentsData) {
        setPayments(paymentsData)
        const spent = paymentsData.reduce((sum, p) => sum + (p.amount || 0), 0)
        setTotalSpent(spent)
        setStats(prev => ({ ...prev, totalSpent: spent, paymentCount: paymentsData.length }))
      }

      // Fetch certificates
      const { data: certificatesData } = await supabase
        .from('certificates')
        .select(`
          *,
          courses (
            title
          )
        `)
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false })

      if (certificatesData) {
        setCertificates(certificatesData)
        setStats(prev => ({ ...prev, certificatesCount: certificatesData.length }))
      }

      // Fetch recommendations
      const userCategories = enrollmentsData?.map(e => e.courses?.category).filter(Boolean) || []
      
      const { data: allCourses } = await supabase
        .from('courses')
        .select('*')
        .limit(10)

      if (allCourses) {
        const enrolledIds = enrollmentsData?.map(e => e.course_id) || []
        const availableCourses = allCourses.filter(c => !enrolledIds.includes(c.id))
        
        const recommended = availableCourses
          .sort((a, b) => {
            const aMatch = userCategories.includes(a.category) ? 1 : 0
            const bMatch = userCategories.includes(b.category) ? 1 : 0
            if (aMatch !== bMatch) return bMatch - aMatch
            return (b.rating || 0) - (a.rating || 0)
          })
          .slice(0, 6)
          .map(course => ({
            id: course.id,
            title: course.title,
            reason: userCategories.includes(course.category) 
              ? `Based on your interest in ${course.category}`
              : `Popular in ${course.category}`,
            image: course.thumbnail_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200',
            category: course.category,
            price: course.price
          }))
        
        setRecommendations(recommended)
      }

      // Calculate next milestone
      const totalCompleted = enrollmentsData?.filter(e => e.completed).length || 0
      const milestones = [1, 3, 5, 10, 25]
      const next = milestones.find(m => m > totalCompleted) || 25
      setNextMilestone({ target: next, current: totalCompleted })

      // Fetch user stats from profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (profileData) {
        setStats(prev => ({
          ...prev,
          learningStreak: profileData.learning_streak || 0,
          totalLearningTime: profileData.total_hours_learned || 0,
          quizzesTaken: profileData.quizzes_taken || 0,
          averageScore: profileData.avg_quiz_score || 0,
          achievements: profileData.achievements_count || 0
        }))
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRealTimeData = async () => {
    if (!user) return
    
    const { data: activityData } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10)

    if (activityData) {
      setRecentActivity(activityData)
    }
  }

  const calculateWeeklyProgress = async () => {
    if (!user) return

    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const { data: weeklyActivity } = await supabase
      .from('activity_logs')
      .select('metadata')
      .eq('user_id', user.id)
      .gte('created_at', sevenDaysAgo.toISOString())

    const totalMinutes = weeklyActivity?.reduce((sum, act) => sum + (act.metadata?.duration || 0), 0) || 0
    setWeeklyProgress(Math.min(totalMinutes, weeklyGoal))
  }

  const getDisplayName = () => {
    if (profile?.username) {
      return profile.username;
    }
    if (profile?.full_name) {
      return profile.full_name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'Learner';
  }

  const copyStudentId = () => {
    const studentId = profile?.student_id || user?.id?.slice(0, 8) || 'IKP-001'
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
      
      if (user) {
        // Save quiz result
        const finalScore = Math.round((score / quizQuestions.length) * 100)
        
        supabase
          .from('profiles')
          .update({ 
            quizzes_taken: (stats.quizzesTaken || 0) + 1,
            avg_quiz_score: stats.averageScore 
              ? Math.round((stats.averageScore + finalScore) / 2)
              : finalScore
          })
          .eq('id', user.id)
          .then(() => {
            setStats(prev => ({
              ...prev,
              quizzesTaken: (prev.quizzesTaken || 0) + 1,
              averageScore: prev.averageScore 
                ? Math.round((prev.averageScore + finalScore) / 2)
                : finalScore
            }))
          })

        // Create activity log
        supabase
          .from('activity_logs')
          .insert([{
            user_id: user.id,
            activity_type: 'quiz',
            metadata: {
              description: `Completed quiz with score ${score}/${quizQuestions.length}`,
              score: score,
              total: quizQuestions.length,
              date: new Date().toISOString()
            }
          }])
          .then(() => {})
      }
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

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-700 border-green-200'
      case 'completed': return 'bg-green-100 text-green-700 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'failed': return 'bg-red-100 text-red-700 border-red-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const handleProfileUpdate = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileForm)
        .eq('id', user?.id)

      if (error) throw error
      setEditingProfile(false)
      setShowProfileCard(false)
      fetchDashboardData()
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const markNotificationAsRead = async (notificationId) => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId)
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      )
      setUnreadCount(prev => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const markAllAsRead = async () => {
    try {
      await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('read', false)
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      )
      setUnreadCount(0)
    } catch (error) {
      console.error('Error marking all as read:', error)
    }
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
              
              {/* AI Learning Assistant */}
              <div 
                onClick={() => setActiveTab('insights')}
                className="cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-l-4 hover:shadow-xl transition-all" 
                style={{ borderLeftColor: colors.secondary }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.secondary + '20' }}>
                    <Bot size={20} className="sm:w-6 sm:h-6" style={{ color: colors.secondary }} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-xl font-bold" style={{ color: colors.primary }}>Your Learning Assistant</h3>
                    <p className="text-xs sm:text-sm text-gray-600">Personalized insights based on your progress</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
                  <div className="p-3 sm:p-4 rounded-xl bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Daily Average</p>
                    <p className="text-lg sm:text-2xl font-bold" style={{ color: colors.primary }}>{learningInsights.dailyAverage} <span className="text-xs sm:text-sm font-normal text-gray-500">min</span></p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingIcon size={10} /> {learningInsights.weeklyComparison}% vs last week
                    </p>
                  </div>
                  <div className="p-3 sm:p-4 rounded-xl bg-gray-50">
                    <p className="text-xs text-gray-500 mb-1">Top Interest</p>
                    <p className="text-base sm:text-lg font-bold" style={{ color: colors.secondary }}>{learningInsights.topCategory}</p>
                    <p className="text-xs text-gray-500 mt-1">Keep exploring!</p>
                  </div>
                </div>

                <div className="p-3 sm:p-4 rounded-xl" style={{ background: colors.primary + '05' }}>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2">
                    🎯 <span className="font-bold">Next milestone:</span> Complete {nextMilestone?.target} courses
                  </p>
                  <p className="text-xs sm:text-sm text-gray-700">
                    ⏱️ <span className="font-bold">At your current pace:</span> Complete in {Math.floor(Math.random() * 5) + 2} days
                  </p>
                </div>
              </div>

              {/* AI Quiz Challenge */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <div 
                    onClick={() => setActiveTab('quiz')}
                    className="flex items-center gap-2 sm:gap-3 cursor-pointer hover:opacity-80 transition-all"
                  >
                    <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.secondary + '20' }}>
                      <Brain size={20} className="sm:w-6 sm:h-6" style={{ color: colors.secondary }} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold" style={{ color: colors.primary }}>AI Daily Challenge</h3>
                      <p className="text-xs sm:text-sm text-gray-600">Test your knowledge</p>
                    </div>
                  </div>
                  {!showQuiz && (
                    <button
                      onClick={handleStartQuiz}
                      className="w-full sm:w-auto px-4 sm:px-6 py-2 rounded-full text-white font-medium hover:scale-105 transition-all text-xs sm:text-sm"
                      style={{ background: colors.secondary }}
                    >
                      Start Quiz
                    </button>
                  )}
                </div>

                {showQuiz && !quizCompleted ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span style={{ color: colors.primary }}>Q{currentQuestion + 1}/{quizQuestions.length}</span>
                      <span className="flex items-center gap-2">
                        <Flame size={12} className={streak > 0 ? 'text-orange-500' : 'text-gray-400'} />
                        <span>Streak: {streak}</span>
                      </span>
                    </div>
                    
                    <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                        }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock size={14} className="text-gray-500" />
                        <span className={`text-xs sm:text-sm font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                          {timeLeft}s
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">Score: {score}/{quizQuestions.length}</span>
                    </div>

                    <div className="p-3 sm:p-4 rounded-xl" style={{ background: colors.lightGray }}>
                      <div className="flex items-center gap-2 mb-2 sm:mb-3">
                        <span className="text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full" style={{ background: colors.primary + '20', color: colors.primary }}>
                          {quizQuestions[currentQuestion].category}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">
                        {quizQuestions[currentQuestion].question}
                      </h4>
                      <div className="space-y-1.5 sm:space-y-2">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-2 sm:p-3 rounded-lg text-xs sm:text-sm transition-all ${
                              selectedAnswer === index
                                ? index === quizQuestions[currentQuestion].correct
                                  ? 'bg-green-100 border border-green-500'
                                  : 'bg-red-100 border border-red-500'
                                : 'bg-white border border-gray-200 hover:border-orange-500'
                            }`}
                            disabled={selectedAnswer !== null}
                          >
                            <span className="flex items-center gap-2 sm:gap-3">
                              <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-200 flex items-center justify-center text-[10px] sm:text-xs">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-xs sm:text-sm">{option}</span>
                              {selectedAnswer === index && (
                                index === quizQuestions[currentQuestion].correct
                                  ? <CheckCircle size={12} className="ml-auto text-green-500" />
                                  : <XCircle size={12} className="ml-auto text-red-500" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedAnswer !== null && (
                      <div className="p-2 sm:p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start gap-1 sm:gap-2">
                          <Info size={12} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-[10px] sm:text-xs text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="w-full py-2 sm:py-2.5 rounded-lg text-white font-medium transition-all disabled:opacity-50 text-xs sm:text-sm"
                      style={{ background: colors.primary }}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                ) : showResult ? (
                  <div className="text-center py-4 sm:py-6">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '20' }}>
                      <Award size={24} className="sm:w-8 sm:h-8" style={{ color: colors.secondary }} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.primary }}>Quiz Completed!</h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4">You scored {score} out of {quizQuestions.length}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                      <button
                        onClick={handleRestartQuiz}
                        className="px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
                        style={{ background: colors.primary + '10', color: colors.primary }}
                      >
                        <RotateCcw size={14} />
                        Try Again
                      </button>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="px-4 sm:px-6 py-2 rounded-full text-white text-sm font-medium transition-all hover:scale-105"
                        style={{ background: colors.secondary }}
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* My Courses Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div 
                    onClick={() => setActiveTab('courses')}
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-all"
                  >
                    <h3 className="text-base sm:text-lg font-bold flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                      <BookOpen size={16} />
                      Continue Learning
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="text-xs font-medium hover:underline flex items-center gap-1" 
                    style={{ color: colors.secondary }}
                  >
                    View All <ChevronRight size={12} />
                  </button>
                </div>

                {enrollments.length === 0 ? (
                  <div className="text-center py-4 sm:py-6">
                    <BookOpen size={32} className="mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600 mb-3">Start your learning journey today!</p>
                    <button
                      onClick={() => window.location.href = '/courses'}
                      className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-medium hover:scale-105 transition-all"
                      style={{ background: colors.primary }}
                    >
                      Browse Courses
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 sm:space-y-3">
                    {enrollments.slice(0, 2).map((enrollment) => (
                      <div
                        key={enrollment.id}
                        onClick={() => window.location.href = `/learn/${enrollment.course_id}`}
                        className="cursor-pointer block p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-all border border-gray-100"
                      >
                        <div className="flex gap-2 sm:gap-3">
                          <img
                            src={enrollment.courses?.thumbnail_url || 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=100'}
                            alt={enrollment.courses?.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-1 truncate">{enrollment.courses?.title}</h4>
                            <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 mb-1">
                              <span>{enrollment.courses?.duration_weeks} weeks</span>
                              <span>•</span>
                              <span>{enrollment.courses?.level}</span>
                            </div>
                            <div className="mt-1">
                              <div className="flex items-center justify-between text-[10px] sm:text-xs mb-0.5">
                                <span>Progress</span>
                                <span className="font-bold" style={{ color: colors.primary }}>{Math.round(enrollment.progress_percentage || 0)}%</span>
                              </div>
                              <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full"
                                  style={{ 
                                    width: `${enrollment.progress_percentage || 0}%`,
                                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div 
                    onClick={() => setActiveTab('activity')}
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-all"
                  >
                    <h3 className="text-base sm:text-lg font-bold flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                      <Activity size={16} />
                      Recent Activity
                    </h3>
                  </div>
                  <button 
                    onClick={() => setActiveTab('activity')}
                    className="text-xs font-medium hover:underline flex items-center gap-1" 
                    style={{ color: colors.secondary }}
                  >
                    View All <ChevronRight size={12} />
                  </button>
                </div>

                {recentActivity.length === 0 ? (
                  <p className="text-xs sm:text-sm text-gray-500 text-center py-3">No recent activity</p>
                ) : (
                  <div className="space-y-2">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-center gap-2 sm:gap-3 p-2 rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                        onClick={() => {
                          if (activity.metadata?.link) {
                            window.location.href = activity.metadata.link
                          }
                        }}
                      >
                        <div className={`p-1 sm:p-1.5 rounded-lg flex-shrink-0 ${
                          activity.activity_type === 'payment' ? 'bg-green-100' :
                          activity.activity_type === 'quiz' ? 'bg-purple-100' :
                          'bg-blue-100'
                        }`}>
                          {activity.activity_type === 'payment' && <CreditCard size={12} className="text-green-600" />}
                          {activity.activity_type === 'quiz' && <Brain size={12} className="text-purple-600" />}
                          {activity.activity_type === 'course' && <BookOpen size={12} className="text-blue-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-gray-700 truncate">{activity.metadata?.description || 'Activity'}</p>
                          <p className="text-[10px] sm:text-xs text-gray-400">{new Date(activity.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Global Stats Card */}
              <div 
                onClick={() => setActiveTab('community')}
                className="cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border-t-4 hover:shadow-xl transition-all" 
                style={{ borderTopColor: colors.secondary }}
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.secondary + '10' }}>
                    <Globe size={14} className="sm:w-4 sm:h-4" style={{ color: colors.secondary }} />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold" style={{ color: colors.primary }}>iKPACE Global Stats</h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 rounded-lg bg-gray-50">
                    <p className="text-[10px] sm:text-xs text-gray-500">Active Learners</p>
                    <p className="text-base sm:text-lg font-bold" style={{ color: colors.primary }}>{liveStats.activeUsers}+</p>
                  </div>
                  <div className="p-2 sm:p-3 rounded-lg bg-gray-50">
                    <p className="text-[10px] sm:text-xs text-gray-500">Countries</p>
                    <p className="text-base sm:text-lg font-bold" style={{ color: colors.secondary }}>15+</p>
                  </div>
                </div>
                <div className="text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-3">
                  🎉 You're among <span className="font-bold text-green-600">{liveStats.activeUsers}+ learners</span> worldwide!
                </div>
                <div className="relative h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="absolute top-0 left-0 h-full bg-green-500" style={{ width: '65%' }}></div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">You're ahead of 65% of learners</p>
              </div>

              {/* Weekly Goal Progress */}
              <div 
                onClick={() => setActiveTab('insights')}
                className="cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all"
              >
                <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                  <Target size={14} />
                  Weekly Goal
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="text-gray-600">Learning Time</span>
                    <span className="font-bold" style={{ color: colors.primary }}>{weeklyProgress} / {weeklyGoal} min</span>
                  </div>
                  <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full"
                      style={{ 
                        width: `${(weeklyProgress / weeklyGoal) * 100}%`,
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                      }}
                    ></div>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500">{weeklyGoal - weeklyProgress} minutes to go</p>
                </div>
              </div>

              {/* Next Milestone */}
              {nextMilestone && (
                <div 
                  onClick={() => setActiveTab('achievements')}
                  className="cursor-pointer bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all"
                >
                  <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                    <Medal size={14} />
                    Next Milestone
                  </h3>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold mb-1" style={{ color: colors.secondary }}>{nextMilestone.current}/{nextMilestone.target}</div>
                    <p className="text-[10px] sm:text-xs text-gray-600 mb-2">Courses Completed</p>
                    <div className="h-1 sm:h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full"
                        style={{ 
                          width: `${(nextMilestone.current / nextMilestone.target) * 100}%`,
                          background: colors.secondary
                        }}
                      ></div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2">{nextMilestone.target - nextMilestone.current} more to go</p>
                  </div>
                </div>
              )}

              {/* AI Recommendations */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <div 
                    onClick={() => setActiveTab('recommendations')}
                    className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition-all"
                  >
                    <h3 className="text-sm sm:text-base font-bold flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                      <Sparkles size={14} />
                      For You
                    </h3>
                  </div>
                </div>

                {recommendations.length === 0 ? (
                  <p className="text-xs sm:text-sm text-gray-500 text-center py-3">Complete courses to get recommendations</p>
                ) : (
                  <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                    {recommendations.map((rec, index) => (
                      <div 
                        key={index} 
                        onClick={() => window.location.href = `/course/${rec.id}`}
                        className="cursor-pointer flex-none w-28 sm:w-36 snap-start bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all overflow-hidden"
                      >
                        <img src={rec.image} alt={rec.title} className="w-full h-12 sm:h-16 object-cover" />
                        <div className="p-1.5 sm:p-2">
                          <h4 className="font-bold text-[10px] sm:text-xs text-gray-900 mb-1 line-clamp-1">{rec.title}</h4>
                          <p className="text-[8px] sm:text-[10px] text-gray-500 mb-1 line-clamp-2">{rec.reason}</p>
                          <span className="text-[8px] sm:text-[10px] font-medium flex items-center gap-1 hover:underline" style={{ color: colors.secondary }}>
                            View <ChevronRight size={6} className="sm:w-2 sm:h-2" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h3 className="text-sm sm:text-base font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>Quick Actions</h3>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  <button 
                    onClick={() => window.location.href = '/courses'}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-center"
                  >
                    <BookOpen size={12} className="mx-auto mb-1" style={{ color: colors.primary }} />
                    <span className="text-[10px] sm:text-xs">Browse</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('community')}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-center"
                  >
                    <Users size={12} className="mx-auto mb-1" style={{ color: colors.secondary }} />
                    <span className="text-[10px] sm:text-xs">Community</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('certificates')}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-center"
                  >
                    <Award size={12} className="mx-auto mb-1" style={{ color: colors.success }} />
                    <span className="text-[10px] sm:text-xs">Certs</span>
                  </button>
                  <button 
                    onClick={() => setShowProfileCard(true)}
                    className="p-1.5 sm:p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-center"
                  >
                    <User size={12} className="mx-auto mb-1" style={{ color: colors.warning }} />
                    <span className="text-[10px] sm:text-xs">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'insights':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>📊 Your Learning Insights</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 rounded-xl" style={{ background: colors.primary + '05' }}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.primary + '15' }}>
                    <Clock size={20} className="sm:w-6 sm:h-6" style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Daily Average</p>
                    <p className="text-lg sm:text-2xl font-bold">{learningInsights.dailyAverage} <span className="text-xs sm:text-sm font-normal">min</span></p>
                  </div>
                </div>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingIcon size={12} /> {learningInsights.weeklyComparison}% vs last week
                </p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl" style={{ background: colors.secondary + '05' }}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.secondary + '15' }}>
                    <Target size={20} className="sm:w-6 sm:h-6" style={{ color: colors.secondary }} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Completion Rate</p>
                    <p className="text-lg sm:text-2xl font-bold">{learningInsights.completionRate}%</p>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{stats.completedCourses} of {stats.totalCourses} courses</p>
              </div>

              <div className="p-4 sm:p-6 rounded-xl" style={{ background: colors.success + '05' }}>
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <div className="p-2 sm:p-3 rounded-xl" style={{ background: colors.success + '15' }}>
                    <Compass size={20} className="sm:w-6 sm:h-6" style={{ color: colors.success }} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">Current Level</p>
                    <p className="text-lg sm:text-2xl font-bold">{growthMetrics.nextLevel}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Learning Patterns</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3 sm:p-4 border rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Most Productive Day</p>
                  <p className="text-sm sm:text-base font-bold">Wednesday <span className="text-xs font-normal text-gray-500">(avg 45 min)</span></p>
                </div>
                <div className="p-3 sm:p-4 border rounded-xl">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1">Peak Learning Hour</p>
                  <p className="text-sm sm:text-base font-bold">10:00 AM <span className="text-xs font-normal text-gray-500">GMT</span></p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'growth':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>📈 Your Growth Metrics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="p-4 sm:p-6 rounded-xl border">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-600">Learning Velocity</p>
                  <span className="text-xl sm:text-2xl font-bold" style={{ color: colors.secondary }}>{growthMetrics.learningVelocity}%</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Faster than last week</p>
              </div>
              <div className="p-4 sm:p-6 rounded-xl border">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-600">Consistency Score</p>
                  <span className="text-xl sm:text-2xl font-bold" style={{ color: colors.primary }}>{growthMetrics.consistencyScore}</span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">Out of 100</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Growth Projection</h4>
              <p className="text-xs sm:text-sm text-gray-600">At your current pace, you'll reach <span className="font-bold">Advanced</span> level in approximately 3 months.</p>
              <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500" style={{ width: `${growthMetrics.consistencyScore}%` }}></div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500">{growthMetrics.consistencyScore}% to next level</p>
            </div>
          </div>
        )

      case 'courses':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>My Courses</h3>
            {enrollments.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <BookOpen size={48} className="sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2">No Courses Yet</h4>
                <p className="text-sm text-gray-500 mb-4">Start your learning journey today</p>
                <button
                  onClick={() => window.location.href = '/courses'}
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white text-sm font-medium"
                  style={{ background: colors.primary }}
                >
                  Browse Courses <ChevronRight size={14} />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                {enrollments.map((enrollment) => (
                  <div
                    key={enrollment.id}
                    onClick={() => window.location.href = `/learn/${enrollment.course_id}`}
                    className="cursor-pointer p-3 sm:p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-2 sm:gap-3">
                      <img
                        src={enrollment.courses?.thumbnail_url || 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={enrollment.courses?.title}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1 truncate">{enrollment.courses?.title}</h4>
                        <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs text-gray-500 mb-2">
                          <span>{enrollment.courses?.duration_weeks} weeks</span>
                          <span>•</span>
                          <span>{enrollment.courses?.level}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                            <span>Progress</span>
                            <span className="font-bold" style={{ color: colors.primary }}>
                              {Math.round(enrollment.progress_percentage || 0)}%
                            </span>
                          </div>
                          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full"
                              style={{ 
                                width: `${enrollment.progress_percentage || 0}%`,
                                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'payments':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold" style={{ color: colors.primary }}>Payment History</h3>
              <div className="text-right">
                <p className="text-xs sm:text-sm text-gray-500">Total Spent</p>
                <p className="text-xl sm:text-2xl font-bold" style={{ color: colors.primary }}>GHS {totalSpent.toFixed(2)}</p>
              </div>
            </div>
            {payments.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Receipt size={48} className="sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                <p className="text-sm text-gray-500">No payment history yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="min-w-full text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-3 font-bold text-gray-700">Reference</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-3 font-bold text-gray-700">Amount</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-3 font-bold text-gray-700">Status</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-3 font-bold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-2 sm:py-3 px-2 sm:px-3 font-mono text-[10px] sm:text-xs">{payment.reference || payment.id.slice(0, 8)}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-3 font-bold text-xs sm:text-sm">GHS {parseFloat(payment.amount).toFixed(2)}</td>
                          <td className="py-2 sm:py-3 px-2 sm:px-3">
                            <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full ${getStatusColor(payment.status)}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-2 sm:py-3 px-2 sm:px-3 text-[10px] sm:text-xs text-gray-600">
                            {new Date(payment.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )

      case 'certificates':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>My Certificates</h3>
            {certificates.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Award size={48} className="sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                <p className="text-sm text-gray-500">No certificates yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all" style={{ borderColor: colors.primary + '20' }}>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.primary + '10' }}>
                        <Award size={20} className="sm:w-6 sm:h-6" style={{ color: colors.primary }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-1 truncate">{cert.courses?.title}</h4>
                        <p className="text-[10px] sm:text-xs text-gray-600 mb-1">Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
                        <p className="text-[8px] sm:text-[10px] text-gray-500 mb-2">ID: {cert.certificate_id?.slice(0, 12)}</p>
                        <button 
                          onClick={() => window.open(`/certificate/${cert.id}`, '_blank')}
                          className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 rounded-full border flex items-center gap-1 hover:bg-gray-50 transition-all"
                        >
                          <Download size={10} className="sm:w-3 sm:h-3" /> View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'quiz':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Daily Quiz Challenge</h3>
            {!showQuiz ? (
              <div className="text-center py-8 sm:py-12">
                <Brain size={48} className="sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4" style={{ color: colors.secondary }} />
                <h4 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Test Your Knowledge</h4>
                <p className="text-sm text-gray-500 mb-4 sm:mb-6">Answer questions and earn streak points</p>
                <button
                  onClick={handleStartQuiz}
                  className="px-6 sm:px-8 py-2 sm:py-3 rounded-full text-white font-bold hover:scale-105 transition-all text-sm sm:text-base"
                  style={{ background: colors.primary }}
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                {!quizCompleted ? (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span style={{ color: colors.primary }}>Question {currentQuestion + 1}/{quizQuestions.length}</span>
                      <span className="flex items-center gap-2">
                        <Flame size={14} className={streak > 0 ? 'text-orange-500' : 'text-gray-400'} />
                        <span>Streak: {streak}</span>
                      </span>
                    </div>
                    
                    <div className="h-2 sm:h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                        }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Clock size={16} className="text-gray-500" />
                        <span className={`text-sm sm:text-base font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                          {timeLeft}s
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-gray-500">Score: {score}/{quizQuestions.length}</span>
                    </div>

                    <div className="p-4 sm:p-6 rounded-xl" style={{ background: colors.lightGray }}>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: colors.primary + '20', color: colors.primary }}>
                          {quizQuestions[currentQuestion].category}
                        </span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                        {quizQuestions[currentQuestion].question}
                      </h4>
                      <div className="space-y-2 sm:space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-3 sm:p-4 rounded-lg text-sm sm:text-base transition-all ${
                              selectedAnswer === index
                                ? index === quizQuestions[currentQuestion].correct
                                  ? 'bg-green-100 border border-green-500'
                                  : 'bg-red-100 border border-red-500'
                                : 'bg-white border border-gray-200 hover:border-orange-500'
                            }`}
                            disabled={selectedAnswer !== null}
                          >
                            <span className="flex items-center gap-2 sm:gap-3">
                              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="text-sm sm:text-base">{option}</span>
                              {selectedAnswer === index && (
                                index === quizQuestions[currentQuestion].correct
                                  ? <CheckCircle size={16} className="ml-auto text-green-500" />
                                  : <XCircle size={16} className="ml-auto text-red-500" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedAnswer !== null && (
                      <div className="p-3 sm:p-4 rounded-lg bg-blue-50 border border-blue-200">
                        <div className="flex items-start gap-2">
                          <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <p className="text-xs sm:text-sm text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                        </div>
                      </div>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="w-full py-3 sm:py-4 rounded-lg text-white font-medium transition-all disabled:opacity-50 text-sm sm:text-base"
                      style={{ background: colors.primary }}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '20' }}>
                      <Award size={32} className="sm:w-10 sm:h-10" style={{ color: colors.secondary }} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: colors.primary }}>Quiz Completed!</h3>
                    <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">You scored {score} out of {quizQuestions.length}</p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={handleRestartQuiz}
                        className="px-6 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all hover:scale-105 flex items-center justify-center gap-2"
                        style={{ background: colors.primary + '10', color: colors.primary }}
                      >
                        <RotateCcw size={16} />
                        Try Again
                      </button>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="px-6 sm:px-8 py-2 sm:py-3 rounded-full text-white text-sm sm:text-base font-medium transition-all hover:scale-105"
                        style={{ background: colors.secondary }}
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )

      case 'activity':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Recent Activity</h3>
            {recentActivity.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <Activity size={48} className="sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-gray-300" />
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-2 sm:space-y-3">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-all cursor-pointer"
                    onClick={() => {
                      if (activity.metadata?.link) {
                        window.location.href = activity.metadata.link
                      }
                    }}
                  >
                    <div className={`p-2 sm:p-3 rounded-lg flex-shrink-0 ${
                      activity.activity_type === 'payment' ? 'bg-green-100' :
                      activity.activity_type === 'quiz' ? 'bg-purple-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.activity_type === 'payment' && <CreditCard size={16} className="text-green-600" />}
                      {activity.activity_type === 'quiz' && <Brain size={16} className="text-purple-600" />}
                      {activity.activity_type === 'course' && <BookOpen size={16} className="text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm sm:text-base font-medium text-gray-900">{activity.metadata?.description || 'Activity'}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'community':
        return (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Community</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div 
                onClick={() => window.location.href = '/community/students'}
                className="p-4 sm:p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-all cursor-pointer"
              >
                <Users2 size={32} className="sm:w-10 sm:h-10 mx-auto mb-3" style={{ color: colors.primary }} />
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">Student Community</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">Connect with {liveStats.activeUsers}+ learners</p>
                <span className="inline-block px-4 sm:px-6 py-2 rounded-full text-white text-xs sm:text-sm font-medium" style={{ background: colors.primary }}>
                  Join Discussion
                </span>
              </div>
              <a 
                href="https://chat.whatsapp.com/example" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 sm:p-6 rounded-xl border border-gray-200 text-center hover:shadow-lg transition-all block"
              >
                <MessageSquare size={32} className="sm:w-10 sm:h-10 mx-auto mb-3" style={{ color: colors.secondary }} />
                <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">WhatsApp Group</h4>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">Active daily discussions</p>
                <span className="inline-block px-4 sm:px-6 py-2 rounded-full text-white text-xs sm:text-sm font-medium" style={{ background: colors.secondary }}>
                  Join Now
                </span>
              </a>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 sm:py-8 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Live Stats Bar */}
        <div className="mb-3 sm:mb-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>
              </span>
              <span className="text-xs sm:text-sm font-medium text-gray-700">iKPACE Live</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs">
              <button onClick={() => setActiveTab('community')} className="flex items-center gap-1 hover:opacity-80 transition-all">
                <Users size={12} className="text-primary" /> {liveStats.activeUsers} active
              </button>
              <button onClick={() => setActiveTab('community')} className="flex items-center gap-1 hover:opacity-80 transition-all">
                <User size={12} className="text-secondary" /> {liveStats.newStudents} new
              </button>
              <button onClick={() => setActiveTab('activity')} className="flex items-center gap-1 hover:opacity-80 transition-all">
                <BookOpen size={12} className="text-green-600" /> {liveStats.completedLessons} lessons
              </button>
              <button onClick={() => setActiveTab('certificates')} className="flex items-center gap-1 hover:opacity-80 transition-all">
                <Award size={12} className="text-purple-600" /> {liveStats.certificatesEarned} certs
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Banner - Updated to show HELLO, username! */}
        <div className="mb-4 sm:mb-8 p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles size={100} className="sm:w-[150px] sm:h-[150px]" />
          </div>
          <div className="relative z-10">
            {/* Top Row with Notifications */}
            <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
                  HELLO, <span className="text-yellow-300">{getDisplayName().toUpperCase()}</span>!
                </h1>
                {streak > 0 && (
                  <span className="px-2 sm:px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 animate-pulse">
                    <Flame size={12} />
                    {streak}x Streak!
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all relative"
                  >
                    <Bell size={16} className="sm:w-5 sm:h-5" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 border-b border-gray-200 flex items-center justify-between">
                        <h3 className="text-sm font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                          <BellRing size={14} />
                          Notifications
                        </h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs text-primary hover:underline"
                          >
                            Mark all as read
                          </button>
                        )}
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center text-gray-500">
                            <BellOff size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No notifications yet</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className={`p-3 border-b border-gray-100 hover:bg-gray-50 transition-all cursor-pointer ${
                                !notification.read ? 'bg-primary/5' : ''
                              }`}
                              onClick={() => {
                                markNotificationAsRead(notification.id)
                                if (notification.link) {
                                  window.location.href = notification.link
                                }
                                setShowNotifications(false)
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-lg ${!notification.read ? 'bg-primary/20' : 'bg-gray-100'}`}>
                                  {notification.type === 'achievement' && <Award size={14} style={{ color: colors.primary }} />}
                                  {notification.type === 'course' && <BookOpen size={14} style={{ color: colors.secondary }} />}
                                  {notification.type === 'payment' && <CreditCard size={14} style={{ color: colors.success }} />}
                                  {notification.type === 'quiz' && <Brain size={14} style={{ color: colors.purple }} />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                  <p className="text-xs text-gray-500">{notification.message}</p>
                                  <p className="text-[10px] text-gray-400 mt-1">
                                    {new Date(notification.created_at).toLocaleDateString()} • {new Date(notification.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      {notifications.length > 0 && (
                        <div className="p-2 text-center border-t border-gray-200">
                          <button
                            onClick={() => {
                              setActiveTab('notifications')
                              setShowNotifications(false)
                            }}
                            className="text-xs text-primary hover:underline"
                          >
                            View all notifications
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile Button */}
                <button
                  onClick={() => setShowProfileCard(!showProfileCard)}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all text-xs sm:text-sm"
                >
                  <User size={12} />
                  <span className="hidden sm:inline">Profile</span>
                </button>
              </div>
            </div>

            {/* ID Section with Visible QR Code */}
            <div className="mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-white/20 shadow-xl">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-2 sm:p-3 rounded-xl shadow-lg">
                  <Crown size={16} className="sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-white/60 font-medium tracking-wider">STUDENT ID</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-base md:text-lg font-mono font-bold tracking-wider text-white">
                      {profile?.student_id || user?.id?.slice(0, 8).toUpperCase() || 'IKP-001'}
                    </span>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={copyStudentId}
                        className="p-1 hover:bg-white/20 rounded-lg transition-all group relative"
                        title="Copy ID"
                      >
                        {copied ? (
                          <Check size={12} className="sm:w-4 sm:h-4 text-green-300" />
                        ) : (
                          <Copy size={12} className="sm:w-4 sm:h-4 text-white/70 group-hover:text-white" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* QR Code - Always Visible and Clickable */}
                <button
                  onClick={() => setShowQR(!showQR)}
                  className="ml-2 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all relative group"
                  title="View QR Code"
                >
                  <QrCode size={20} className="sm:w-6 sm:h-6 text-white" />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Scan QR Code
                  </span>
                </button>
                
                <div className="flex items-center gap-1 bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-[8px] sm:text-xs text-white/80">Active</span>
                </div>
              </div>
              
              {/* QR Code Modal */}
              {showQR && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowQR(false)}>
                  <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full" onClick={e => e.stopPropagation()}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold" style={{ color: colors.primary }}>Your Student QR Code</h3>
                      <button onClick={() => setShowQR(false)} className="p-1 hover:bg-gray-100 rounded-full">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex justify-center mb-4">
                      <img 
                        src={qrCodeUrl} 
                        alt="Student QR Code" 
                        className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-gray-200 rounded-xl p-2"
                      />
                    </div>
                    <p className="text-sm text-gray-600 text-center mb-4">
                      Scan this code to view your student profile
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = qrCodeUrl
                          link.download = `student-qr-${profile?.student_id || 'id'}.png`
                          link.click()
                        }}
                        className="flex-1 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2"
                        style={{ background: colors.primary }}
                      >
                        <Download size={16} />
                        Download
                      </button>
                      <button
                        onClick={() => setShowQR(false)}
                        className="px-4 py-2 rounded-lg border font-medium hover:bg-gray-50"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3">
              <button onClick={() => setActiveTab('insights')} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-all">
                <Flame size={12} className="text-yellow-300" />
                <span>{stats.learningStreak} day streak</span>
              </button>
              <button onClick={() => setActiveTab('growth')} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-all">
                <TrendingIcon size={12} className="text-green-300" />
                <span>{growthMetrics.weeklyGrowth}% growth</span>
              </button>
              <button onClick={() => setActiveTab('insights')} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-all">
                <Target size={12} className="text-yellow-300" />
                <span>{weeklyProgress}/{weeklyGoal} min</span>
              </button>
              <button onClick={() => setActiveTab('certificates')} className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-all">
                <Award size={12} className="text-yellow-300" />
                <span>{certificates.length} certs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Card Popup */}
        {showProfileCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => !editingProfile && setShowProfileCard(false)}>
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-4 sm:p-6 border-b flex items-center justify-between sticky top-0 bg-white z-10">
                <h2 className="text-xl sm:text-2xl font-bold" style={{ color: colors.primary }}>My Profile</h2>
                <button onClick={() => setShowProfileCard(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={18} />
                </button>
              </div>
              
              {editingProfile ? (
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-center mb-4 sm:mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {profileForm.avatar_url ? (
                          <img src={profileForm.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={32} className="sm:w-12 sm:h-12 text-gray-400" />
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 p-1.5 sm:p-2 rounded-full bg-white shadow-lg border">
                        <Camera size={12} className="sm:w-4 sm:h-4" style={{ color: colors.primary }} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent"
                      />
                    </div>
                    <div className="col-span-1 sm:col-span-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg"
                        placeholder="Accra, Ghana"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={profileForm.occupation}
                        onChange={(e) => setProfileForm({...profileForm, occupation: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 text-sm border rounded-lg"
                        placeholder="Student"
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Social Links</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Github size={16} className="text-gray-500" />
                        <input
                          type="text"
                          value={profileForm.github}
                          onChange={(e) => setProfileForm({...profileForm, github: e.target.value})}
                          placeholder="GitHub username"
                          className="flex-1 px-3 py-1 border rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin size={16} className="text-gray-500" />
                        <input
                          type="text"
                          value={profileForm.linkedin}
                          onChange={(e) => setProfileForm({...profileForm, linkedin: e.target.value})}
                          placeholder="LinkedIn username"
                          className="flex-1 px-3 py-1 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleProfileUpdate}
                      className="flex-1 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white rounded-xl font-medium hover:opacity-90 transition-all"
                      style={{ background: colors.primary }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base border rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User size={32} className="sm:w-12 sm:h-12 text-gray-400" />
                      )}
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{profile?.full_name || 'Learner'}</h3>
                      <p className="text-sm text-gray-600">@{profile?.username || 'student'}</p>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">Member since {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {profile?.bio && (
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-xl">
                      <p className="text-sm text-gray-700">{profile.bio}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6">
                    {profile?.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={14} />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile?.occupation && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase size={14} />
                        <span>{profile.occupation}</span>
                      </div>
                    )}
                    {profile?.website && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe size={14} />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: colors.primary }}>
                          Website
                        </a>
                      </div>
                    )}
                    {profile?.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone size={14} />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mb-4 sm:mb-6">
                    {profile?.github && (
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                        <Github size={16} />
                      </a>
                    )}
                    {profile?.linkedin && (
                      <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                        <Linkedin size={16} />
                      </a>
                    )}
                    {profile?.twitter && (
                      <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                        <Twitter size={16} />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setEditingProfile(true)}
                    className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-105 text-sm sm:text-base"
                    style={{ background: colors.primary + '10', color: colors.primary }}
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex gap-1 sm:gap-2 mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-hide -mx-3 sm:mx-0 px-3 sm:px-0">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'insights', label: 'Insights', icon: TrendingIcon },
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'certificates', label: 'Certs', icon: Award },
            { id: 'quiz', label: 'Quiz', icon: Brain },
            { id: 'activity', label: 'Activity', icon: Activity },
            { id: 'growth', label: 'Growth', icon: LineChart },
            { id: 'community', label: 'Community', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ background: activeTab === tab.id ? colors.primary : 'transparent' }}
            >
              <tab.icon size={12} className="sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:hidden">{tab.label}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 xs:grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-1.5 sm:gap-2 mb-4 sm:mb-8">
          <button onClick={() => setActiveTab('courses')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.primary + '10' }}>
                <BookOpen size={10} className="sm:w-3 sm:h-3" style={{ color: colors.primary }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.primary }}>{stats.totalCourses}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Enrolled</p>
          </button>

          <button onClick={() => setActiveTab('courses')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.success + '10' }}>
                <CheckCircle size={10} className="sm:w-3 sm:h-3" style={{ color: colors.success }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.success }}>{stats.completedCourses}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Completed</p>
          </button>

          <button onClick={() => setActiveTab('insights')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.secondary + '10' }}>
                <Flame size={10} className="sm:w-3 sm:h-3" style={{ color: colors.secondary }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.secondary }}>{stats.learningStreak}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Streak</p>
          </button>

          <button onClick={() => setActiveTab('insights')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.warning + '10' }}>
                <Clock size={10} className="sm:w-3 sm:h-3" style={{ color: colors.warning }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.warning }}>{formatTime(stats.totalLearningTime)}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Time</p>
          </button>

          <button onClick={() => setActiveTab('payments')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.purple + '10' }}>
                <CreditCard size={10} className="sm:w-3 sm:h-3" style={{ color: colors.purple }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.purple }}>GHS {totalSpent.toFixed(0)}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Spent</p>
          </button>

          <button onClick={() => setActiveTab('certificates')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.teal + '10' }}>
                <Award size={10} className="sm:w-3 sm:h-3" style={{ color: colors.teal }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.teal }}>{certificates.length}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Certs</p>
          </button>

          <button onClick={() => setActiveTab('quiz')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.pink + '10' }}>
                <Brain size={10} className="sm:w-3 sm:h-3" style={{ color: colors.pink }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.pink }}>{stats.quizzesTaken}</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Quizzes</p>
          </button>

          <button onClick={() => setActiveTab('growth')} className="bg-white rounded-lg sm:rounded-xl shadow-sm p-1.5 sm:p-2 border border-gray-100 hover:shadow-md transition-all hover:scale-105">
            <div className="flex items-center justify-between mb-0.5 sm:mb-1">
              <div className="p-0.5 sm:p-1 rounded-lg" style={{ background: colors.indigo + '10' }}>
                <TrendingIcon size={10} className="sm:w-3 sm:h-3" style={{ color: colors.indigo }} />
              </div>
              <span className="text-xs sm:text-sm font-bold" style={{ color: colors.indigo }}>{growthMetrics.consistencyScore}%</span>
            </div>
            <p className="text-[10px] sm:text-xs text-gray-600 truncate">Consistency</p>
          </button>
        </div>

        {/* Render current tab content */}
        {renderTabContent()}
      </div>
    </div>
  )
}