import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { dashboardService } from '../services/dashboardService'
import { 
  BookOpen, TrendingUp, Award, Clock, Flame, Target, 
  Sparkles, Bell, Brain, Zap, CheckCircle, XCircle,
  HelpCircle, ChevronRight, Play, Pause, RotateCcw,
  Star, Users, MessageCircle, Gift, Rocket, Crown,
  Medal, Gem, Calendar, BarChart, PieChart, Activity,
  Coffee, Headphones, Download, Share2, ThumbsUp,
  AlertCircle, Info, Shield, Globe, Heart, User,
  CreditCard, DollarSign, ShoppingBag, Receipt,
  Wallet, TrendingUp as Trending, BarChart3,
  Video, BookMarked, Clock3, CalendarDays,
  MessageSquare, ThumbsUp as ThumbsUpIcon, X,
  Send, Bot, Minimize2, Maximize2, Volume2, VolumeX,
  Settings, LogOut, Edit3, Camera, MapPin, Briefcase,
  GraduationCap, Users2, Globe2, Smartphone, Mail,
  Phone, Github, Linkedin, Twitter, Instagram,
  Facebook, Youtube, Twitch, Disc, Code, Coffee as CoffeeIcon,
  ChevronLeft
} from 'lucide-react'
import VideoPlayer from '../components/VideoPlayer'
import { videoConfig } from '../config/videos'
// import WhatsAppCommunity from '../components/WhatsAppCommunity'

export default function Dashboard() {
  const { profile, user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [payments, setPayments] = useState([])
  const [certificates, setCertificates] = useState([])
  const [notifications, setNotifications] = useState([])
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
  const [learningPath, setLearningPath] = useState([])
  const [weeklyGoal, setWeeklyGoal] = useState(300) // minutes
  const [weeklyProgress, setWeeklyProgress] = useState(0)
  const [showChat, setShowChat] = useState(false)
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [activeTab, setActiveTab] = useState('overview')
  const [chatMinimized, setChatMinimized] = useState(false)
  const [chatNotifications, setChatNotifications] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showProfileCard, setShowProfileCard] = useState(false)
  const [editingProfile, setEditingProfile] = useState(false)
  const [recScrollPosition, setRecScrollPosition] = useState(0)
  const recommendationsRef = useRef(null)
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
  
  // FIXED: Added missing stats state
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

  // AI Quiz Questions
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
      options: ["Django", "Laravel", "React", "Flask"],
      correct: 2,
      explanation: "React is a JavaScript library for building user interfaces, while Django, Laravel, and Flask are backend frameworks.",
      category: "Web Development"
    },
    {
      id: 3,
      question: "What is the purpose of CSS?",
      options: [
        "To add interactivity",
        "To style web pages",
        "To handle databases",
        "To create servers"
      ],
      correct: 1,
      explanation: "CSS (Cascading Style Sheets) is used to style and layout web pages.",
      category: "Web Development"
    },
    {
      id: 4,
      question: "Which symbol is used for comments in Python?",
      options: ["//", "/* */", "#", "<!-- -->"],
      correct: 2,
      explanation: "In Python, the '#' symbol is used for single-line comments.",
      category: "Programming"
    },
    {
      id: 5,
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Advanced Program Integration",
        "Application Process Integration",
        "Automated Program Interface"
      ],
      correct: 0,
      explanation: "API stands for Application Programming Interface - a set of rules for software communication.",
      category: "General"
    },
    {
      id: 6,
      question: "What is the primary purpose of SEO?",
      options: [
        "Social Media Engagement",
        "Search Engine Optimization",
        "Sales Email Optimization",
        "System Error Operations"
      ],
      correct: 1,
      explanation: "SEO (Search Engine Optimization) improves website visibility in search engines.",
      category: "Digital Marketing"
    },
    {
      id: 7,
      question: "Which platform is best for B2B marketing?",
      options: ["Instagram", "TikTok", "LinkedIn", "Snapchat"],
      correct: 2,
      explanation: "LinkedIn is the leading platform for professional networking and B2B marketing.",
      category: "Digital Marketing"
    },
    {
      id: 8,
      question: "What is a Virtual Assistant's primary role?",
      options: [
        "Software Development",
        "Administrative Support",
        "Graphic Design",
        "Network Security"
      ],
      correct: 1,
      explanation: "Virtual Assistants provide administrative, creative, or technical support remotely.",
      category: "VA Skills"
    },
    {
      id: 9,
      question: "What does UX stand for in design?",
      options: [
        "User Experience",
        "Universal XML",
        "Unix Extension",
        "Ultra X-ray"
      ],
      correct: 0,
      explanation: "UX stands for User Experience - it's about how users interact with and feel about a product.",
      category: "Design"
    },
    {
      id: 10,
      question: "Which color model is used for digital screens?",
      options: ["CMYK", "RGB", "PANTONE", "RAL"],
      correct: 1,
      explanation: "RGB (Red, Green, Blue) is the color model used for digital displays.",
      category: "Design"
    }
  ]

  // Chat bot responses
  const getBotResponse = (message) => {
    const msg = message.toLowerCase()
    
    if (msg.includes('hello') || msg.includes('hi')) {
      return `Hello ${profile?.full_name?.split(' ')[0] || 'there'}! How can I help you with your learning today?`
    }
    if (msg.includes('course') || msg.includes('learn')) {
      return `You're currently enrolled in ${enrollments.length} courses. Would you like to continue where you left off?`
    }
    if (msg.includes('progress')) {
      return `You've completed ${stats.completedCourses} courses and have a ${stats.learningStreak}-day learning streak! Great job!`
    }
    if (msg.includes('certificate')) {
      return `You have ${certificates.length} certificates. You can download them from the Certificates tab.`
    }
    if (msg.includes('payment') || msg.includes('spent')) {
      return `You've spent GHS ${totalSpent.toFixed(2)} on ${payments.length} courses.`
    }
    if (msg.includes('help') || msg.includes('support')) {
      return `I'm here to help! You can ask me about courses, progress, certificates, payments, or anything about iKPACE.`
    }
    if (msg.includes('quiz') || msg.includes('challenge')) {
      return `Ready for a challenge? Go to the Daily Quiz tab to test your knowledge and earn streak points!`
    }
    if (msg.includes('thank')) {
      return `You're welcome! 😊 Anything else I can help with?`
    }
    if (msg.includes('bye')) {
      return `Goodbye! Keep up the great learning! 👋`
    }
    
    return `I understand you're asking about "${message}". I'll help you with that! Could you be more specific?`
  }

  useEffect(() => {
    if (user) {
      fetchDashboardData()
      fetchRealTimeData()
      calculateWeeklyProgress()
      loadChatHistory()
      
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
          if (soundEnabled) {
            playNotificationSound()
          }
        })
        .subscribe()

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

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3')
    audio.play().catch(() => {})
  }

  const loadChatHistory = async () => {
    try {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: true })
        .limit(50)
      
      if (data) {
        setChatMessages(data.map(msg => ({
          id: msg.id,
          text: msg.message,
          sender: msg.sender,
          time: new Date(msg.created_at).toLocaleTimeString()
        })))
      }
    } catch (error) {
      console.error('Error loading chat history:', error)
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
            slug,
            thumbnail_url,
            duration_weeks,
            description,
            instructor,
            level,
            price,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false })

      if (enrollmentsError) {
        console.error('Error fetching enrollments:', enrollmentsError)
      }

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

      // Fetch payments from dashboardService
      try {
        const paymentData = await dashboardService.getUserPayments(user.id)
        if (paymentData) {
          setPayments(paymentData)
          const spent = paymentData.reduce((sum, p) => sum + (p.amount || 0), 0)
          setTotalSpent(spent)
          setStats(prev => ({ ...prev, totalSpent: spent, paymentCount: paymentData.length }))
        }
      } catch (paymentError) {
        console.error('Error fetching payments:', paymentError)
      }

      // Fetch certificates
      const { data: certificatesData } = await supabase
        .from('certificates')
        .select(`
          *,
          courses (
            title,
            duration_weeks
          )
        `)
        .eq('user_id', user.id)
        .order('issued_at', { ascending: false })

      if (certificatesData) {
        setCertificates(certificatesData)
        setStats(prev => ({ ...prev, certificatesCount: certificatesData.length }))
      }

      // Fetch real notifications from Supabase
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5)

      if (notificationsData && notificationsData.length > 0) {
        setNotifications(notificationsData)
      }

      // Get user stats from dashboardService
      try {
        const userStats = await dashboardService.getUserStats(user.id)
        setStats(prev => ({
          ...prev,
          totalSpent: userStats.totalSpent || prev.totalSpent,
          paymentCount: userStats.paymentCount || prev.paymentCount
        }))
      } catch (statsError) {
        console.error('Error fetching user stats:', statsError)
      }

      // Fetch AI-powered recommendations based on user's interests
      const userCategories = enrollmentsData?.map(e => e.courses?.category).filter(Boolean) || []
      
      // Get all courses except enrolled ones
      const { data: allCourses } = await supabase
        .from('courses')
        .select('*')
        .limit(10)

      if (allCourses) {
        // Filter out enrolled courses
        const enrolledIds = enrollmentsData?.map(e => e.course_id) || []
        const availableCourses = allCourses.filter(c => !enrolledIds.includes(c.id))
        
        // Sort by category match and rating
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
            course: course.title,
            reason: userCategories.includes(course.category) 
              ? `Based on your interest in ${course.category}`
              : `Popular in ${course.category}`,
            image: course.thumbnail_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=200',
            category: course.category,
            rating: course.rating,
            price: course.price,
            duration: course.duration_weeks
          }))
        
        setRecommendations(recommended)
      }

      // Generate learning path
      if (enrollmentsData) {
        const nextCourses = enrollmentsData
          .filter(e => !e.completed)
          .sort((a, b) => b.progress_percentage - a.progress_percentage)
          .slice(0, 2)
        setLearningPath(nextCourses)
      }

      // Calculate next milestone
      const totalCompleted = enrollmentsData?.filter(e => e.completed).length || 0
      const milestones = [1, 3, 5, 10, 25]
      const next = milestones.find(m => m > totalCompleted) || 25
      setNextMilestone({ target: next, current: totalCompleted })

      // Set profile stats
      setStats(prev => ({
        ...prev,
        learningStreak: profile?.learning_streak || 7,
        totalLearningTime: profile?.total_hours_learned || 42,
        quizzesTaken: profile?.quizzes_taken || 12,
        averageScore: profile?.avg_quiz_score || 85,
        achievements: profile?.achievements_count || 5
      }))

    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRealTimeData = async () => {
    if (!user) return
    
    // Fetch recent activity
    const { data: activityData } = await supabase
      .from('activity_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    if (activityData) {
      setRecentActivity(activityData)
    }
  }

  const calculateWeeklyProgress = () => {
    // Calculate total minutes learned this week from actual data
    // This would ideally come from your database
    const total = Math.min(weeklyProgress + 45, weeklyGoal) // Simulated progress for now
    setWeeklyProgress(total)
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
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
      
      // Save quiz result to Supabase
      if (user) {
        dashboardService.saveIQResult(user.id, score, quizQuestions)
          .catch(err => console.error('Error saving quiz result:', err))
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

  const sendChatMessage = async () => {
    if (!newMessage.trim()) return

    const userMsg = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString()
    }
    setChatMessages(prev => [...prev, userMsg])
    setNewMessage('')
    
    // Save user message to Supabase
    try {
      await supabase.from('chat_messages').insert([{
        user_id: user?.id,
        message: newMessage,
        sender: 'user'
      }])
    } catch (error) {
      console.error('Error saving message:', error)
    }
    
    // Simulate bot response
    setTimeout(async () => {
      const botResponse = getBotResponse(newMessage)
      const botMsg = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString()
      }
      setChatMessages(prev => [...prev, botMsg])
      setChatNotifications(prev => prev + 1)
      
      // Save bot response to Supabase
      try {
        await supabase.from('chat_messages').insert([{
          user_id: user?.id,
          message: botResponse,
          sender: 'bot'
        }])
      } catch (error) {
        console.error('Error saving bot response:', error)
      }
    }, 1000)
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
      // Refresh profile
      window.location.reload()
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const scrollRecommendations = (direction) => {
    if (recommendationsRef.current) {
      const scrollAmount = 300
      const newPosition = direction === 'left' 
        ? recScrollPosition - scrollAmount 
        : recScrollPosition + scrollAmount
      
      recommendationsRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setRecScrollPosition(newPosition)
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Banner - FIXED HEADER LAYOUT */}
        <div className="mb-8 p-6 rounded-2xl text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles size={150} />
          </div>
          <div className="relative z-10">
            {/* Top Row - Greeting and Profile Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold">
                  {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Learner'}!
                </h1>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs md:text-sm">
                  ID: {profile?.student_id || user?.id?.slice(0, 8) || 'IKP-001'}
                </span>
                {streak > 0 && (
                  <span className="px-3 py-1 bg-yellow-500 text-gray-900 rounded-full text-xs md:text-sm font-bold flex items-center gap-1 animate-pulse">
                    <Flame size={14} />
                    {streak}x Streak!
                  </span>
                )}
              </div>
              <button
                onClick={() => setShowProfileCard(!showProfileCard)}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all text-sm"
              >
                <User size={14} />
                <span className="hidden sm:inline">Profile</span>
              </button>
            </div>

            {/* Message */}
            <p className="text-base md:text-lg text-white/90 mb-4">
              {enrollments.length > 0 
                ? `You're making great progress! Keep up the momentum.` 
                : `Ready to start your learning journey?`}
            </p>

            {/* Stats Row - FIXED LAYOUT */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm">
                <Flame size={14} className="text-yellow-300" />
                <span>{stats.learningStreak} day streak</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm">
                <Brain size={14} className="text-yellow-300" />
                <span>{stats.quizzesTaken} quizzes</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm">
                <CreditCard size={14} className="text-yellow-300" />
                <span>GHS {totalSpent.toFixed(2)} spent</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs md:text-sm">
                <Award size={14} className="text-yellow-300" />
                <span>{certificates.length} certificates</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card - Popup */}
        {showProfileCard && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => !editingProfile && setShowProfileCard(false)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="p-6 border-b flex items-center justify-between">
                <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>My Profile</h2>
                <button onClick={() => setShowProfileCard(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>
              
              {editingProfile ? (
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {profileForm.avatar_url ? (
                          <img src={profileForm.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={48} className="text-gray-400" />
                        )}
                      </div>
                      <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white shadow-lg border">
                        <Camera size={16} style={{ color: colors.primary }} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({...profileForm, full_name: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                      <input
                        type="text"
                        value={profileForm.username}
                        onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                        placeholder="Accra, Ghana"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
                      <input
                        type="text"
                        value={profileForm.occupation}
                        onChange={(e) => setProfileForm({...profileForm, occupation: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                        placeholder="Student"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      <input
                        type="url"
                        value={profileForm.website}
                        onChange={(e) => setProfileForm({...profileForm, website: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                        placeholder="https://"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent"
                        style={{ focusRing: colors.primary }}
                        placeholder="+233..."
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="font-bold text-gray-900 mb-3">Social Links</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Github size={18} className="text-gray-500" />
                        <input
                          type="text"
                          value={profileForm.github}
                          onChange={(e) => setProfileForm({...profileForm, github: e.target.value})}
                          placeholder="GitHub username"
                          className="flex-1 px-3 py-1 border rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Linkedin size={18} className="text-gray-500" />
                        <input
                          type="text"
                          value={profileForm.linkedin}
                          onChange={(e) => setProfileForm({...profileForm, linkedin: e.target.value})}
                          placeholder="LinkedIn username"
                          className="flex-1 px-3 py-1 border rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Twitter size={18} className="text-gray-500" />
                        <input
                          type="text"
                          value={profileForm.twitter}
                          onChange={(e) => setProfileForm({...profileForm, twitter: e.target.value})}
                          placeholder="Twitter handle"
                          className="flex-1 px-3 py-1 border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleProfileUpdate}
                      className="flex-1 px-6 py-3 text-white rounded-xl font-medium hover:opacity-90 transition-all"
                      style={{ background: colors.primary }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingProfile(false)}
                      className="px-6 py-3 border rounded-xl font-medium hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User size={48} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{profile?.full_name || 'Learner'}</h3>
                      <p className="text-gray-600">@{profile?.username || 'student'}</p>
                      <p className="text-sm text-gray-500 mt-1">Member since {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {profile?.bio && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                      <p className="text-gray-700">{profile.bio}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {profile?.location && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin size={16} />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                    )}
                    {profile?.occupation && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase size={16} />
                        <span className="text-sm">{profile.occupation}</span>
                      </div>
                    )}
                    {profile?.website && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe size={16} />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline" style={{ color: colors.primary }}>
                          Website
                        </a>
                      </div>
                    )}
                    {profile?.phone && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2 mb-6">
                    {profile?.github && (
                      <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                        <Github size={18} />
                      </a>
                    )}
                    {profile?.linkedin && (
                      <a href={`https://linkedin.com/in/${profile.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                        <Linkedin size={18} />
                      </a>
                    )}
                    {profile?.twitter && (
                      <a href={`https://twitter.com/${profile.twitter}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all">
                        <Twitter size={18} />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setEditingProfile(true)}
                    className="w-full px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:scale-105"
                    style={{ background: colors.primary + '10', color: colors.primary }}
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Dashboard Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'quiz', label: 'Daily Quiz', icon: Brain },
            { id: 'activity', label: 'Activity', icon: Activity },
            { id: 'community', label: 'Community', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={{ background: activeTab === tab.id ? colors.primary : 'transparent' }}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stats Cards - Always Visible */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.primary + '10' }}>
                <BookOpen size={14} style={{ color: colors.primary }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.primary }}>{stats.totalCourses}</span>
            </div>
            <p className="text-xs text-gray-600">Enrolled</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.success + '10' }}>
                <CheckCircle size={14} style={{ color: colors.success }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.success }}>{stats.completedCourses}</span>
            </div>
            <p className="text-xs text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.secondary + '10' }}>
                <Flame size={14} style={{ color: colors.secondary }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.secondary }}>{stats.learningStreak}</span>
            </div>
            <p className="text-xs text-gray-600">Streak</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.warning + '10' }}>
                <Clock size={14} style={{ color: colors.warning }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.warning }}>{formatTime(stats.totalLearningTime)}</span>
            </div>
            <p className="text-xs text-gray-600">Time</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.purple + '10' }}>
                <CreditCard size={14} style={{ color: colors.purple }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.purple }}>GHS {totalSpent.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-600">Spent</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.teal + '10' }}>
                <Award size={14} style={{ color: colors.teal }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.teal }}>{certificates.length}</span>
            </div>
            <p className="text-xs text-gray-600">Certs</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-3 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-1">
              <div className="p-1.5 rounded-lg" style={{ background: colors.pink + '10' }}>
                <Brain size={14} style={{ color: colors.pink }} />
              </div>
              <span className="text-lg font-bold" style={{ color: colors.pink }}>{stats.quizzesTaken}</span>
            </div>
            <p className="text-xs text-gray-600">Quizzes</p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Videos, Quiz, My Courses */}
            <div className="lg:col-span-2 space-y-8">
              {/* Welcome Video Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                  <Video size={20} />
                  Welcome & Orientation
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <VideoPlayer
                      videoId={videoConfig.welcome.youtubeId}
                      title={videoConfig.welcome.title}
                      className="rounded-xl overflow-hidden shadow-md"
                    />
                    <p className="text-sm text-gray-600 mt-2">{videoConfig.welcome.description}</p>
                  </div>
                  <div>
                    <VideoPlayer
                      videoId={videoConfig.orientation.youtubeId}
                      title={videoConfig.orientation.title}
                      className="rounded-xl overflow-hidden shadow-md"
                    />
                    <p className="text-sm text-gray-600 mt-2">{videoConfig.orientation.description}</p>
                  </div>
                </div>
              </div>

              {/* AI Quiz Challenge */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl" style={{ background: colors.secondary + '20' }}>
                      <Brain size={24} style={{ color: colors.secondary }} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: colors.primary }}>AI Daily Challenge</h3>
                      <p className="text-sm text-gray-600">Test your knowledge and earn streak points</p>
                    </div>
                  </div>
                  {!showQuiz && (
                    <button
                      onClick={handleStartQuiz}
                      className="px-6 py-2 rounded-full text-white font-medium hover:scale-105 transition-all"
                      style={{ background: colors.secondary }}
                    >
                      Start Quiz
                    </button>
                  )}
                </div>

                {showQuiz && !quizCompleted ? (
                  <div className="space-y-6">
                    {/* Progress Bar */}
                    <div className="flex items-center justify-between text-sm">
                      <span style={{ color: colors.primary }}>Question {currentQuestion + 1}/{quizQuestions.length}</span>
                      <span className="flex items-center gap-2">
                        <Flame size={16} className={streak > 0 ? 'text-orange-500' : 'text-gray-400'} />
                        <span>Streak: {streak}</span>
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full transition-all duration-300"
                        style={{ 
                          width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                          background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                        }}
                      ></div>
                    </div>

                    {/* Timer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-gray-500" />
                        <span className={`font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-gray-700'}`}>
                          {timeLeft}s remaining
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">Score: {score}/{quizQuestions.length}</span>
                    </div>

                    {/* Question */}
                    <div className="p-6 rounded-xl" style={{ background: colors.lightGray }}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: colors.primary + '20', color: colors.primary }}>
                          {quizQuestions[currentQuestion].category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        {quizQuestions[currentQuestion].question}
                      </h4>
                      <div className="space-y-3">
                        {quizQuestions[currentQuestion].options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            className={`w-full text-left p-4 rounded-xl transition-all ${
                              selectedAnswer === index
                                ? index === quizQuestions[currentQuestion].correct
                                  ? 'bg-green-100 border-2 border-green-500'
                                  : 'bg-red-100 border-2 border-red-500'
                                : 'bg-white border-2 border-gray-200 hover:border-orange-500'
                            }`}
                            disabled={selectedAnswer !== null}
                          >
                            <span className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                                {String.fromCharCode(65 + index)}
                              </span>
                              {option}
                              {selectedAnswer === index && (
                                index === quizQuestions[currentQuestion].correct
                                  ? <CheckCircle size={18} className="ml-auto text-green-500" />
                                  : <XCircle size={18} className="ml-auto text-red-500" />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Explanation (if answer selected) */}
                    {selectedAnswer !== null && (
                      <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                        <div className="flex items-start gap-3">
                          <Info size={18} className="text-blue-600 mt-1" />
                          <div>
                            <p className="font-bold text-blue-800 mb-1">Explanation:</p>
                            <p className="text-sm text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Next Button */}
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="w-full py-3 rounded-xl text-white font-medium transition-all disabled:opacity-50"
                      style={{ background: colors.primary }}
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                ) : showResult ? (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '20' }}>
                      <Award size={48} style={{ color: colors.secondary }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Quiz Completed!</h3>
                    <p className="text-gray-600 mb-4">You scored {score} out of {quizQuestions.length}</p>
                    
                    {/* Score Circle */}
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-gray-200"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="60"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={377}
                          strokeDashoffset={377 - (377 * score) / quizQuestions.length}
                          style={{ color: colors.secondary, transition: 'stroke-dashoffset 0.5s' }}
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <span className="text-3xl font-bold" style={{ color: colors.primary }}>{Math.round((score / quizQuestions.length) * 100)}%</span>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={handleRestartQuiz}
                        className="px-6 py-2 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2"
                        style={{ background: colors.primary + '10', color: colors.primary }}
                      >
                        <RotateCcw size={16} />
                        Try Again
                      </button>
                      <button
                        onClick={() => setShowQuiz(false)}
                        className="px-6 py-2 rounded-full text-white font-medium transition-all hover:scale-105"
                        style={{ background: colors.secondary }}
                      >
                        Back to Dashboard
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* My Courses Section with Progress - FIXED DISPLAY */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                    <BookOpen size={20} />
                    My Courses
                  </h3>
                  <button onClick={() => setActiveTab('courses')} className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: colors.secondary }}>
                    View All <ChevronRight size={14} />
                  </button>
                </div>

                {enrollments.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen size={48} className="mx-auto mb-3 text-gray-400" />
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Start Your Learning Journey</h4>
                    <p className="text-gray-600 mb-4">Browse our courses and begin learning today!</p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium hover:scale-105 transition-all"
                      style={{ background: colors.primary }}
                    >
                      Browse Courses <ChevronRight size={16} />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enrollments.slice(0, 2).map((enrollment) => (
                      <Link
                        key={enrollment.id}
                        to={`/learn/${enrollment.course_id}`}
                        className="block p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={enrollment.courses?.thumbnail_url || 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=200'}
                            alt={enrollment.courses?.title}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <h4 className="font-bold text-gray-900 mb-1">{enrollment.courses?.title}</h4>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                enrollment.completed ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {enrollment.completed ? 'Completed' : 'In Progress'}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 mb-2 line-clamp-1">{enrollment.courses?.description?.substring(0, 60)}...</p>
                            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                              <span className="flex items-center gap-1">
                                <Clock size={10} />
                                {enrollment.courses?.duration_weeks} weeks
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={10} />
                                {enrollment.courses?.level}
                              </span>
                            </div>
                            <div className="mt-2">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span>Progress</span>
                                <span className="font-bold" style={{ color: colors.primary }}>{Math.round(enrollment.progress_percentage || 0)}%</span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full transition-all duration-500"
                                  style={{ 
                                    width: `${enrollment.progress_percentage || 0}%`, 
                                    background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` 
                                  }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Payment History Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                    <CreditCard size={20} />
                    Recent Payments
                  </h3>
                  <button onClick={() => setActiveTab('payments')} className="text-sm font-medium hover:underline flex items-center gap-1" style={{ color: colors.secondary }}>
                    View All <ChevronRight size={14} />
                  </button>
                </div>

                {payments.length === 0 ? (
                  <div className="text-center py-6">
                    <Receipt size={48} className="mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-500">No payment history yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {payments.slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-all">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            payment.status === 'success' ? 'bg-green-100' : 'bg-yellow-100'
                          }`}>
                            <DollarSign size={16} className={
                              payment.status === 'success' ? 'text-green-600' : 'text-yellow-600'
                            } />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">GHS {parseFloat(payment.amount).toFixed(2)}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(payment.created_at).toLocaleDateString()} • Ref: {payment.reference?.slice(-8) || payment.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Progress, Notifications, Achievements */}
            <div className="space-y-6">
              {/* Weekly Goal Progress */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                  <Target size={18} />
                  Weekly Goal
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Learning Time</span>
                    <span className="font-bold" style={{ color: colors.primary }}>{weeklyProgress} / {weeklyGoal} min</span>
                  </div>
                  <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500"
                      style={{ 
                        width: `${(weeklyProgress / weeklyGoal) * 100}%`,
                        background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{weeklyGoal - weeklyProgress} minutes remaining this week</p>
                </div>
              </div>

              {/* Next Milestone */}
              {nextMilestone && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Medal size={18} />
                    Next Milestone
                  </h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2" style={{ color: colors.secondary }}>{nextMilestone.current}/{nextMilestone.target}</div>
                    <p className="text-sm text-gray-600 mb-3">Courses Completed</p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full"
                        style={{ 
                          width: `${(nextMilestone.current / nextMilestone.target) * 100}%`,
                          background: colors.secondary
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">{nextMilestone.target - nextMilestone.current} more to unlock next achievement</p>
                  </div>
                </div>
              )}

              {/* Learning Path */}
              {learningPath.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <TrendingUp size={18} />
                    Your Learning Path
                  </h3>
                  <div className="space-y-3">
                    {learningPath.map((enrollment, index) => (
                      <div key={enrollment.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.primary + '10' }}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{enrollment.courses?.title}</p>
                          <p className="text-xs text-gray-500">{Math.round(enrollment.progress_percentage || 0)}% complete</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notifications */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                    <Bell size={18} />
                    Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-gray-400 hover:text-gray-600">
                      {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No notifications</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className={`flex items-start gap-3 p-3 rounded-xl transition-all ${!notif.read ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
                        <div className={`w-2 h-2 rounded-full mt-2 ${!notif.read ? 'bg-orange-500' : 'bg-gray-300'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(notif.created_at).toLocaleDateString()}</p>
                        </div>
                        {notif.type === 'payment' && <CreditCard size={14} className="text-green-500" />}
                        {notif.type === 'progress' && <TrendingUp size={14} className="text-blue-500" />}
                        {notif.type === 'certificate' && <Award size={14} className="text-yellow-500" />}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* AI Recommendations - SLIDING CAROUSEL */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: colors.primary }}>
                    <Sparkles size={18} />
                    Recommended for You
                  </h3>
                  {recommendations.length > 3 && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => scrollRecommendations('left')}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => scrollRecommendations('right')}
                        className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>

                {recommendations.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500">Complete more courses to get personalized recommendations</p>
                  </div>
                ) : (
                  <div 
                    ref={recommendationsRef}
                    className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {recommendations.map((rec, index) => (
                      <div 
                        key={index} 
                        className="flex-none w-48 snap-start bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-all overflow-hidden"
                      >
                        <img 
                          src={rec.image} 
                          alt={rec.course}
                          className="w-full h-24 object-cover"
                        />
                        <div className="p-3">
                          <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-1">{rec.course}</h4>
                          <div className="flex items-center gap-1 mb-2">
                            <Star size={12} className="text-yellow-400 fill-current" />
                            <span className="text-xs text-gray-600">{rec.rating || 4.5}</span>
                          </div>
                          <p className="text-xs text-gray-500 mb-2 line-clamp-2">{rec.reason}</p>
                          <Link 
                            to={`/course/${rec.id}`} 
                            className="text-xs font-medium flex items-center gap-1 hover:underline"
                            style={{ color: colors.secondary }}
                          >
                            View Course <ChevronRight size={10} />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Achievements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Recent Achievements</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 group hover:scale-105 transition-all cursor-pointer">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center group-hover:shadow-lg transition-all" style={{ background: colors.primary + '20' }}>
                      <Flame size={20} style={{ color: colors.primary }} />
                    </div>
                    <p className="text-xs font-bold">7 Day Streak</p>
                  </div>
                  <div className="text-center p-2 group hover:scale-105 transition-all cursor-pointer">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center group-hover:shadow-lg transition-all" style={{ background: colors.secondary + '20' }}>
                      <Brain size={20} style={{ color: colors.secondary }} />
                    </div>
                    <p className="text-xs font-bold">Quiz Master</p>
                  </div>
                  <div className="text-center p-2 group hover:scale-105 transition-all cursor-pointer">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center group-hover:shadow-lg transition-all" style={{ background: colors.success + '20' }}>
                      <BookOpen size={20} style={{ color: colors.success }} />
                    </div>
                    <p className="text-xs font-bold">First Course</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Quick Actions</h3>
                <div className="space-y-2">
                  <Link to="/courses" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
                    <div className="p-2 rounded-lg" style={{ background: colors.primary + '10' }}>
                      <BookOpen size={16} style={{ color: colors.primary }} />
                    </div>
                    <span className="text-sm text-gray-700">Browse Courses</span>
                  </Link>
                  <Link to="/community" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
                    <div className="p-2 rounded-lg" style={{ background: colors.secondary + '10' }}>
                      <Users size={16} style={{ color: colors.secondary }} />
                    </div>
                    <span className="text-sm text-gray-700">Join Community</span>
                  </Link>
                  <Link to="/certificates" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
                    <div className="p-2 rounded-lg" style={{ background: colors.success + '10' }}>
                      <Award size={16} style={{ color: colors.success }} />
                    </div>
                    <span className="text-sm text-gray-700">View Certificates</span>
                  </Link>
                  <button onClick={() => setShowProfileCard(true)} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all">
                    <div className="p-2 rounded-lg" style={{ background: colors.warning + '10' }}>
                      <User size={16} style={{ color: colors.warning }} />
                    </div>
                    <span className="text-sm text-gray-700">Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>My Courses</h3>
            {enrollments.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Courses Yet</h4>
                <p className="text-gray-500 mb-4">Start your learning journey today</p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium"
                  style={{ background: colors.primary }}
                >
                  Browse Courses <ChevronRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {enrollments.map((enrollment) => (
                  <Link
                    key={enrollment.id}
                    to={`/learn/${enrollment.course_id}`}
                    className="block p-4 rounded-xl border border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="flex gap-4">
                      <img
                        src={enrollment.courses?.thumbnail_url || 'https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=200'}
                        alt={enrollment.courses?.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 mb-1">{enrollment.courses?.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                          <span>{enrollment.courses?.duration_weeks} weeks</span>
                          <span>•</span>
                          <span>{enrollment.courses?.level}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Progress</span>
                            <span className="font-bold" style={{ color: colors.primary }}>
                              {Math.round(enrollment.progress_percentage || 0)}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full"
                              style={{ 
                                width: `${enrollment.progress_percentage || 0}%`,
                                background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                              }}
                            />
                          </div>
                        </div>
                        {enrollment.completed && (
                          <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                            Completed ✓
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold" style={{ color: colors.primary }}>Payment History</h3>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold" style={{ color: colors.primary }}>GHS {totalSpent.toFixed(2)}</p>
              </div>
            </div>
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <Receipt size={64} className="mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Payment History</h4>
                <p className="text-gray-500">You haven't made any purchases yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Reference</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-sm">{payment.reference || payment.id.slice(0, 8)}</td>
                        <td className="py-3 px-4 font-bold">GHS {parseFloat(payment.amount).toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {new Date(payment.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Certificates Tab */}
        {activeTab === 'certificates' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>My Certificates</h3>
            {certificates.length === 0 ? (
              <div className="text-center py-12">
                <Award size={64} className="mx-auto mb-4 text-gray-300" />
                <h4 className="text-lg font-bold text-gray-900 mb-2">No Certificates Yet</h4>
                <p className="text-gray-500 mb-4">Complete courses to earn certificates</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border-2 rounded-xl p-6" style={{ borderColor: colors.primary + '20' }}>
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl" style={{ background: colors.primary + '10' }}>
                        <Award size={32} style={{ color: colors.primary }} />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{cert.courses?.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">Issued: {new Date(cert.issued_at).toLocaleDateString()}</p>
                        <p className="text-xs text-gray-500 mb-3">Certificate ID: {cert.certificate_id}</p>
                        <div className="flex gap-2">
                          <button className="text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1 hover:bg-gray-50">
                            <Download size={12} /> Download
                          </button>
                          <button className="text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1 hover:bg-gray-50">
                            <Share2 size={12} /> Share
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>Daily Quiz Challenge</h3>
            {!showQuiz ? (
              <div className="text-center py-12">
                <Brain size={64} className="mx-auto mb-4" style={{ color: colors.secondary }} />
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Test Your Knowledge</h4>
                <p className="text-gray-500 mb-6">Answer 10 questions and earn streak points</p>
                <button
                  onClick={handleStartQuiz}
                  className="px-8 py-3 rounded-full text-white font-bold hover:scale-105 transition-all"
                  style={{ background: colors.primary }}
                >
                  Start Quiz
                </button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                {/* Quiz UI - Same as overview tab */}
                {/* ... */}
              </div>
            )}
          </div>
        )}

        {/* Activity Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>Recent Activity</h3>
            {recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <Activity size={64} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">No recent activity</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100">
                    <div className={`p-3 rounded-xl ${
                      activity.activity_type === 'payment' ? 'bg-green-100' :
                      activity.activity_type === 'quiz' ? 'bg-purple-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.activity_type === 'payment' && <CreditCard size={16} className="text-green-600" />}
                      {activity.activity_type === 'quiz' && <Brain size={16} className="text-purple-600" />}
                      {activity.activity_type === 'course' && <BookOpen size={16} className="text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.metadata?.description || 'Activity'}</p>
                      <p className="text-sm text-gray-500">{new Date(activity.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>Community</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-gray-200 text-center">
                <Users2 size={48} className="mx-auto mb-3" style={{ color: colors.primary }} />
                <h4 className="font-bold text-gray-900 mb-2">Student Community</h4>
                <p className="text-sm text-gray-600 mb-4">Connect with fellow learners</p>
                <button className="px-6 py-2 rounded-full text-white font-medium" style={{ background: colors.primary }}>
                  Join Discussion
                </button>
              </div>
              <div className="p-6 rounded-xl border border-gray-200 text-center">
                <MessageSquare size={48} className="mx-auto mb-3" style={{ color: colors.secondary }} />
                <h4 className="font-bold text-gray-900 mb-2">WhatsApp Group</h4>
                <p className="text-sm text-gray-600 mb-4">Join our active WhatsApp community</p>
                <a 
                  href="https://chat.whatsapp.com/example" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-2 rounded-full text-white font-medium" 
                  style={{ background: colors.secondary }}
                >
                  Join Now
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Live Chat Support (Advanced) */}
        {showChat && (
          <div className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 transition-all ${chatMinimized ? 'h-14' : 'h-[500px]'}`}>
            {/* Chat Header */}
            <div className="p-4 text-white flex items-center justify-between cursor-pointer" style={{ background: colors.primary }} onClick={() => setChatMinimized(!chatMinimized)}>
              <div className="flex items-center gap-2">
                <MessageCircle size={20} />
                <h4 className="font-bold">Live Support</h4>
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              </div>
              <div className="flex items-center gap-2">
                {chatNotifications > 0 && (
                  <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                    {chatNotifications}
                  </span>
                )}
                <button className="text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); setChatMinimized(!chatMinimized); }}>
                  {chatMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button className="text-white/80 hover:text-white" onClick={(e) => { e.stopPropagation(); setShowChat(false); }}>
                  <X size={16} />
                </button>
              </div>
            </div>

            {!chatMinimized && (
              <>
                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-3 bg-gray-50">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-xl ${
                        msg.sender === 'user' 
                          ? 'text-white' 
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`} style={msg.sender === 'user' ? { background: colors.primary } : {}}>
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-3 border-t bg-white flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-3 py-2 border rounded-xl text-sm focus:outline-none focus:ring-2"
                    style={{ focusRing: colors.secondary }}
                  />
                  <button
                    onClick={sendChatMessage}
                    className="px-4 py-2 rounded-xl text-white text-sm font-medium flex items-center gap-2 hover:scale-105 transition-all"
                    style={{ background: colors.secondary }}
                  >
                    <Send size={16} />
                  </button>
                </div>

                {/* Chat Footer */}
                <div className="px-3 pb-2 text-center">
                  <p className="text-[10px] text-gray-400">Powered by iKPACE AI • Online 24/7</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Chat Toggle Button */}
        <button
          onClick={() => {
            setShowChat(!showChat)
            setChatNotifications(0)
          }}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full text-white shadow-lg hover:scale-110 transition-all flex items-center justify-center z-50 relative"
          style={{ background: colors.secondary }}
        >
          <MessageCircle size={24} />
          {chatNotifications > 0 && !showChat && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              {chatNotifications}
            </span>
          )}
        </button>
      </div>
    </div>
  )
}