import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { 
  ChevronLeft, ChevronRight, CheckCircle, Circle, PlayCircle, 
  FileText, Award, Sparkles, Menu, X, BookOpen, Clock, 
  Calendar, Users, Star, Download, Bookmark, Share2,
  MessageCircle, HelpCircle, Lightbulb, Target, Zap,
  Maximize2, Minimize2, Volume2, VolumeX, Settings,
  ChevronDown, ChevronUp, Home, BarChart3, Trophy,
  GraduationCap, Brain, Globe, Cpu, Shield, Cloud,
  Code, Database, Wifi, Smartphone, Layout, Users2,
  PenTool, Briefcase, Laptop, Network, HardDrive,
  Server, Lock, GitBranch, Terminal, Coffee, Heart,
  Award as AwardIcon, Gift, Rocket, TrendingUp,
  AlertCircle, CheckSquare, ListChecks, RefreshCw,
  Timer, PieChart, ThumbsUp, ThumbsDown, Flag,
  Link, ExternalLink, Video, Headphones, Image,
  Mail, Megaphone, BookMarked, Grid3x3, BarChart, Bell,
  CalendarCheck, ClipboardList, MessageSquare
} from 'lucide-react'

export default function CoursePlayer() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { profile } = useAuth()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [currentLesson, setCurrentLesson] = useState(null)
  const [currentSection, setCurrentSection] = useState(null)
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [deviceType, setDeviceType] = useState('desktop')
  const [fontSize, setFontSize] = useState('medium')
  const [bookmarked, setBookmarked] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notes, setNotes] = useState('')
  const [videoExpanded, setVideoExpanded] = useState(false)
  const [expandedModules, setExpandedModules] = useState({})
  const [expandedLessons, setExpandedLessons] = useState({})
  const [showResources, setShowResources] = useState(false)
  const [showDiscussions, setShowDiscussions] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizResults, setQuizResults] = useState(null)
  const [activeTab, setActiveTab] = useState('content')
  const [streak, setStreak] = useState(0)
  const [points, setPoints] = useState(0)
  const [showAchievements, setShowAchievements] = useState(false)
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [studyTime, setStudyTime] = useState(0)
  
  // Right sidebar sections state
  const [activeRightSection, setActiveRightSection] = useState('todo')
  const [showRightContent, setShowRightContent] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [inbox, setInbox] = useState([])
  const [grades, setGrades] = useState([])
  const [todo, setTodo] = useState([])
  const [syllabus, setSyllabus] = useState(null)
  
  // Enhanced features state
  const [showFlashcards, setShowFlashcards] = useState(false)
  const [currentFlashcard, setCurrentFlashcard] = useState(0)
  const [flashcardFlipped, setFlashcardFlipped] = useState(false)
  const [showPracticeExercises, setShowPracticeExercises] = useState(false)
  const [exerciseAnswers, setExerciseAnswers] = useState({})
  const [exerciseFeedback, setExerciseFeedback] = useState({})
  const [showLabExercise, setShowLabExercise] = useState(false)
  const [showCheatSheet, setShowCheatSheet] = useState(false)
  const [showGlossary, setShowGlossary] = useState(false)
  const [showStudyTips, setShowStudyTips] = useState(false)
  const [quizTimer, setQuizTimer] = useState(0)
  const [quizActive, setQuizActive] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(1)

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    green: "#008F4C",
    yellow: "#E6B800",
    darkGray: "#1F2937",
    lightGray: "#F3F4F6",
    white: "#FFFFFF",
    purple: "#6B46C1",
    red: "#DC2626",
    blue: "#2563EB"
  }

  // Detect device type
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width < 640) {
        setDeviceType('mobile')
        setSidebarOpen(false)
        setRightSidebarOpen(false)
      } else if (width < 1024) {
        setDeviceType('tablet')
        setSidebarOpen(true)
        setRightSidebarOpen(false)
      } else {
        setDeviceType('desktop')
        setSidebarOpen(true)
        setRightSidebarOpen(true)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    fetchCourseData()
    loadUserProgress()
    loadMockData()
  }, [courseId])

  const loadMockData = () => {
    // Mock announcements for all weeks
    setAnnouncements([
      {
        id: 1,
        week: 1,
        title: "Welcome to Week 1!",
        content: "Welcome to Information Technology Fundamentals. This week we'll cover the basics of IT, including hardware, software, and how computers work.",
        date: "2024-03-07",
        author: "Dr. Sarah Johnson",
        important: true
      },
      {
        id: 2,
        week: 1,
        title: "Week 1 Midweek Announcement",
        content: "Great progress everyone! Don't forget to complete the 'What is Information Technology?' lesson and quiz by Friday. Join office hours tomorrow if you need help.",
        date: "2024-03-06",
        author: "Dr. Sarah Johnson",
        important: false
      },
      {
        id: 3,
        week: 2,
        title: "Week 2: Computer Hardware",
        content: "This week we dive into computer hardware. We'll learn about CPUs, RAM, storage devices, and how to build a computer.",
        date: "2024-03-10",
        author: "Dr. Sarah Johnson",
        important: true
      },
      {
        id: 4,
        week: 2,
        title: "Hardware Lab Materials",
        content: "Lab materials for the computer building exercise are now available for download in the resources section.",
        date: "2024-03-11",
        author: "Dr. Sarah Johnson",
        important: false
      },
      {
        id: 5,
        week: 3,
        title: "Week 3: Operating Systems",
        content: "This week we explore Windows, Linux, and macOS. Learn about file systems, processes, and system administration.",
        date: "2024-03-14",
        author: "Dr. Sarah Johnson",
        important: true
      },
      {
        id: 6,
        week: 4,
        title: "Week 4: Networking Fundamentals",
        content: "This week covers network topologies, protocols, IP addressing, and basic network configuration.",
        date: "2024-03-17",
        author: "Dr. Sarah Johnson",
        important: true
      },
      {
        id: 7,
        week: 5,
        title: "Week 5: Cybersecurity Basics",
        content: "Learn about security threats, encryption, firewalls, and best practices for keeping systems secure.",
        date: "2024-03-21",
        author: "Dr. Sarah Johnson",
        important: true
      },
      {
        id: 8,
        week: 6,
        title: "Week 6: Cloud Computing & Career",
        content: "Final week! We'll cover cloud computing, career paths, and certification preparation.",
        date: "2024-03-24",
        author: "Dr. Sarah Johnson",
        important: true
      }
    ])

    // Mock inbox messages
    setInbox([
      {
        id: 1,
        from: "Dr. Sarah Johnson",
        subject: "Question about CPU Architecture",
        preview: "Great question about multi-core processors...",
        date: "2024-03-07",
        unread: true,
        week: 2
      },
      {
        id: 2,
        from: "System",
        subject: "Week 1 Quiz Results Available",
        preview: "Your quiz results for 'What is Information Technology?' are now available.",
        date: "2024-03-06",
        unread: false,
        week: 1
      },
      {
        id: 3,
        from: "Academic Advisor",
        subject: "Course Progress - Week 1 Complete",
        preview: "Congratulations on completing Week 1! You're making great progress.",
        date: "2024-03-05",
        unread: true,
        week: 1
      },
      {
        id: 4,
        from: "Teaching Assistant",
        subject: "Lab Exercise Help",
        preview: "For the hardware lab, remember to ground yourself before handling components...",
        date: "2024-03-08",
        unread: true,
        week: 2
      }
    ])

    // Mock grades
    setGrades([
      { id: 1, week: 1, assignment: "Week 1: IT Fundamentals Quiz", score: 85, total: 100, percentage: 85, submitted: "2024-03-06", feedback: "Good understanding of basics" },
      { id: 2, week: 1, assignment: "Week 1: Discussion Post", score: 90, total: 100, percentage: 90, submitted: "2024-03-05", feedback: "Excellent contribution" },
      { id: 3, week: 2, assignment: "Week 2: Hardware Identification Lab", score: 95, total: 100, percentage: 95, submitted: "2024-03-09", feedback: "Perfect! All components correctly identified" },
      { id: 4, week: 2, assignment: "Week 2: CPU Architecture Quiz", score: 88, total: 100, percentage: 88, submitted: "2024-03-10", feedback: "Good work on the quiz" },
      { id: 5, week: 3, assignment: "Week 3: OS Comparison Assignment", score: 92, total: 100, percentage: 92, submitted: "2024-03-14", feedback: "Great analysis" },
      { id: 6, week: 4, assignment: "Week 4: Network Design Project", score: 87, total: 100, percentage: 87, submitted: "2024-03-18", feedback: "Good network design" },
      { id: 7, week: 5, assignment: "Week 5: Security Assessment", score: 94, total: 100, percentage: 94, submitted: "2024-03-22", feedback: "Excellent security analysis" }
    ])

    // Mock To-Do list for all weeks
    setTodo([
      // Week 1
      { id: 1, week: 1, task: "Watch 'Welcome to IT Mastery' video", due: "2024-03-08", course: "IT Fundamentals", completed: true, type: "video" },
      { id: 2, week: 1, task: "Complete 'What is Information Technology?' reading", due: "2024-03-09", course: "IT Fundamentals", completed: true, type: "reading" },
      { id: 3, week: 1, task: "Take Week 1 Fundamentals Quiz", due: "2024-03-10", course: "IT Fundamentals", completed: false, type: "quiz" },
      { id: 4, week: 1, task: "Post in Week 1 Introduction Discussion", due: "2024-03-11", course: "IT Fundamentals", completed: false, type: "discussion" },
      
      // Week 2
      { id: 5, week: 2, task: "Watch 'CPU Architecture' video", due: "2024-03-12", course: "IT Fundamentals", completed: false, type: "video" },
      { id: 6, week: 2, task: "Complete 'Understanding Computer Components' reading", due: "2024-03-13", course: "IT Fundamentals", completed: false, type: "reading" },
      { id: 7, week: 2, task: "Complete Hardware Identification Lab", due: "2024-03-14", course: "IT Fundamentals", completed: false, type: "lab" },
      { id: 8, week: 2, task: "Take Week 2 Hardware Quiz", due: "2024-03-15", course: "IT Fundamentals", completed: false, type: "quiz" },
      
      // Week 3
      { id: 9, week: 3, task: "Watch 'Operating Systems Overview' video", due: "2024-03-16", course: "IT Fundamentals", completed: false, type: "video" },
      { id: 10, week: 3, task: "Complete 'Windows vs Linux' reading", due: "2024-03-17", course: "IT Fundamentals", completed: false, type: "reading" },
      { id: 11, week: 3, task: "Practice Linux Command Line exercises", due: "2024-03-18", course: "IT Fundamentals", completed: false, type: "practice" },
      { id: 12, week: 3, task: "Take Week 3 OS Quiz", due: "2024-03-19", course: "IT Fundamentals", completed: false, type: "quiz" },
      
      // Week 4
      { id: 13, week: 4, task: "Watch 'Network Topologies' video", due: "2024-03-20", course: "IT Fundamentals", completed: false, type: "video" },
      { id: 14, week: 4, task: "Complete 'OSI Model Deep Dive' reading", due: "2024-03-21", course: "IT Fundamentals", completed: false, type: "reading" },
      { id: 15, week: 4, task: "Network Design Project", due: "2024-03-22", course: "IT Fundamentals", completed: false, type: "project" },
      { id: 16, week: 4, task: "Take Week 4 Networking Quiz", due: "2024-03-23", course: "IT Fundamentals", completed: false, type: "quiz" },
      
      // Week 5
      { id: 17, week: 5, task: "Watch 'Cybersecurity Fundamentals' video", due: "2024-03-24", course: "IT Fundamentals", completed: false, type: "video" },
      { id: 18, week: 5, task: "Complete 'Security Threats' reading", due: "2024-03-25", course: "IT Fundamentals", completed: false, type: "reading" },
      { id: 19, week: 5, task: "Security Assessment Project", due: "2024-03-26", course: "IT Fundamentals", completed: false, type: "project" },
      { id: 20, week: 5, task: "Take Week 5 Security Quiz", due: "2024-03-27", course: "IT Fundamentals", completed: false, type: "quiz" },
      
      // Week 6
      { id: 21, week: 6, task: "Watch 'Cloud Computing' video", due: "2024-03-28", course: "IT Fundamentals", completed: false, type: "video" },
      { id: 22, week: 6, task: "Complete 'Career Paths' reading", due: "2024-03-29", course: "IT Fundamentals", completed: false, type: "reading" },
      { id: 23, week: 6, task: "Final Course Project", due: "2024-03-30", course: "IT Fundamentals", completed: false, type: "project" },
      { id: 24, week: 6, task: "Take Final Course Assessment", due: "2024-03-31", course: "IT Fundamentals", completed: false, type: "quiz" }
    ])

    // Mock syllabus
    setSyllabus({
      course: "Complete Information Technology Mastery",
      instructor: "Dr. Sarah Johnson",
      email: "s.johnson@university.edu",
      office: "Tech Building, Room 405",
      officeHours: "Wed 2-4 PM, Thu 10 AM-12 PM",
      description: "This comprehensive course covers all aspects of Information Technology from fundamentals to advanced concepts, preparing you for a career in IT.",
      textbook: "IT Essentials: Complete Guide to Information Technology (8th Edition)",
      grading: {
        quizzes: "25%",
        assignments: "20%",
        labs: "25%",
        projects: "20%",
        participation: "10%"
      },
      schedule: [
        { week: 1, topic: "IT Fundamentals", description: "Introduction to IT, hardware basics, software concepts", readings: "Chapters 1-2", assignments: "Discussion Post, Quiz" },
        { week: 2, topic: "Computer Hardware", description: "CPU architecture, memory, storage, peripherals", readings: "Chapters 3-4", assignments: "Hardware Lab, Quiz" },
        { week: 3, topic: "Operating Systems", description: "Windows, Linux, macOS, file systems, processes", readings: "Chapters 5-6", assignments: "OS Comparison, Quiz" },
        { week: 4, topic: "Networking", description: "Network topologies, OSI model, TCP/IP, protocols", readings: "Chapters 7-8", assignments: "Network Design, Quiz" },
        { week: 5, topic: "Cybersecurity", description: "Security threats, encryption, firewalls, best practices", readings: "Chapters 9-10", assignments: "Security Assessment, Quiz" },
        { week: 6, topic: "Cloud & Career", description: "Cloud computing, certifications, career paths", readings: "Chapters 11-12", assignments: "Final Project, Final Quiz" }
      ]
    })
  }

  const loadUserProgress = () => {
    const savedStreak = localStorage.getItem('learningStreak')
    const savedPoints = localStorage.getItem('learningPoints')
    const savedStudyTime = localStorage.getItem('studyTime')
    if (savedStreak) setStreak(parseInt(savedStreak))
    if (savedPoints) setPoints(parseInt(savedPoints))
    if (savedStudyTime) setStudyTime(parseInt(savedStudyTime))
  }

  const updateUserProgress = (pointsEarned = 10) => {
    const newStreak = streak + 1
    const newPoints = points + pointsEarned
    const newStudyTime = studyTime + (currentLesson?.duration ? parseInt(currentLesson.duration) : 5)
    
    setStreak(newStreak)
    setPoints(newPoints)
    setStudyTime(newStudyTime)
    
    localStorage.setItem('learningStreak', newStreak.toString())
    localStorage.setItem('learningPoints', newPoints.toString())
    localStorage.setItem('studyTime', newStudyTime.toString())
  }

  const fetchCourseData = async () => {
    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single()

      if (courseData) {
        setCourse(courseData)

        const { data: modulesData } = await supabase
          .from('modules')
          .select(`
            *,
            lessons (*)
          `)
          .eq('course_id', courseId)
          .order('order_index')

        if (modulesData) {
          setModules(modulesData)
          setExpandedModules({ [modulesData[0]?.id]: true })
          
          const { data: progressData } = await supabase
            .from('lesson_progress')
            .select('lesson_id, is_completed')
            .eq('user_id', profile?.id)

          const progressMap = {}
          progressData?.forEach(p => {
            progressMap[p.lesson_id] = p.is_completed
          })
          setProgress(progressMap)
        }
      } else {
        const mockData = createEnhancedMockCourseData()
        setCourse(mockData.course)
        setModules(mockData.modules)
        setExpandedModules({ [mockData.modules[0]?.id]: true })
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      const mockData = createEnhancedMockCourseData()
      setCourse(mockData.course)
      setModules(mockData.modules)
      setExpandedModules({ [mockData.modules[0]?.id]: true })
    } finally {
      setLoading(false)
    }
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const toggleLesson = (lessonId) => {
    setExpandedLessons(prev => ({
      ...prev,
      [lessonId]: !prev[lessonId]
    }))
  }

  const selectLesson = (lesson) => {
    setCurrentLesson(lesson)
    setCurrentSection(null)
    setActiveTab('content')
    setQuizResults(null)
    setQuizAnswers({})
    setShowQuiz(false)
    setShowFlashcards(false)
    setShowPracticeExercises(false)
    setShowLabExercise(false)
    setShowCheatSheet(false)
    if (deviceType === 'mobile') {
      setSidebarOpen(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectSection = (lesson, section, index) => {
    setCurrentLesson(lesson)
    setCurrentSection({ ...section, index })
    setActiveTab('content')
    if (deviceType === 'mobile') {
      setSidebarOpen(false)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const markLessonComplete = async (lessonId, pointsEarned = 10) => {
    try {
      await supabase
        .from('lesson_progress')
        .upsert({
          user_id: profile.id,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date().toISOString()
        })

      setProgress(prev => ({ ...prev, [lessonId]: true }))
      updateUserProgress(pointsEarned)

      const allLessons = modules.flatMap(m => m.lessons)
      const completedCount = Object.values({ ...progress, [lessonId]: true }).filter(Boolean).length
      const progressPercentage = (completedCount / allLessons.length) * 100

      await supabase
        .from('enrollments')
        .update({ progress_percentage: progressPercentage })
        .eq('user_id', profile.id)
        .eq('course_id', courseId)

      if (completedCount === 1) {
        showAchievementNotification('First Steps', 'Completed your first lesson!', '🎉')
      }
      if (progressPercentage === 100) {
        showAchievementNotification('Course Master', 'Completed the entire course!', '🏆')
      }

    } catch (error) {
      console.error('Error marking lesson complete:', error)
      setProgress(prev => ({ ...prev, [lessonId]: true }))
    }
  }

  const showAchievementNotification = (title, message, emoji) => {
    const notification = document.createElement('div')
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-slideIn'
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${emoji}</span>
        <div>
          <div class="font-bold">${title}</div>
          <div class="text-sm">${message}</div>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    setTimeout(() => notification.remove(), 5000)
  }

  const handleQuizSubmit = () => {
    if (!currentLesson?.quiz) return
    
    let correct = 0
    currentLesson.quiz.questions.forEach((q, index) => {
      if (quizAnswers[index] === q.correct) correct++
    })
    
    const score = (correct / currentLesson.quiz.questions.length) * 100
    const timeBonus = quizTimer < 300 ? 5 : 0
    setQuizResults({ score, correct, total: currentLesson.quiz.questions.length, timeBonus })
    
    if (score >= 70) {
      markLessonComplete(currentLesson.id, 10 + timeBonus)
      if (score === 100) {
        showAchievementNotification('Perfect Score', 'Got all questions right!', '🌟')
      }
    }
    
    setQuizActive(false)
  }

  const startQuiz = () => {
    setShowQuiz(true)
    setQuizActive(true)
    setQuizTimer(0)
    setQuizAnswers({})
    setQuizResults(null)
  }

  const handleExerciseSubmit = (exerciseId) => {
    const exercise = currentLesson?.practiceExercises?.find(e => e.id === exerciseId)
    if (!exercise) return
    
    const isCorrect = exerciseAnswers[exerciseId] === exercise.correctAnswer
    setExerciseFeedback(prev => ({
      ...prev,
      [exerciseId]: {
        show: true,
        correct: isCorrect,
        message: isCorrect ? '✅ Correct! Great job!' : `❌ Not quite. The correct answer is: ${exercise.correctAnswer}`
      }
    }))
    
    if (isCorrect) {
      updateUserProgress(5)
    }
  }

  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now(),
        user: profile?.email?.split('@')[0] || 'Student',
        content: newComment,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: []
      }
      setComments([newCommentObj, ...comments])
      setNewComment('')
      
      showAchievementNotification('Comment Added', 'Your comment has been posted', '💬')
    }
  }

  const likeComment = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, likes: comment.likes + 1 } 
        : comment
    ))
  }

  const replyToComment = (commentId, replyText) => {
    if (replyText.trim()) {
      setComments(comments.map(comment => 
        comment.id === commentId
          ? { 
              ...comment, 
              replies: [
                ...(comment.replies || []), 
                {
                  id: Date.now(),
                  user: profile?.email?.split('@')[0] || 'Student',
                  content: replyText,
                  timestamp: new Date().toISOString()
                }
              ] 
            }
          : comment
      ))
    }
  }

  const getNextLesson = () => {
    const allLessons = modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id)
    return allLessons[currentIndex + 1] || null
  }

  const getPreviousLesson = () => {
    const allLessons = modules.flatMap(m => m.lessons)
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson?.id)
    return allLessons[currentIndex - 1] || null
  }

  const calculateProgress = () => {
    const allLessons = modules.flatMap(m => m.lessons)
    const completed = Object.values(progress).filter(Boolean).length
    return allLessons.length > 0 ? (completed / allLessons.length) * 100 : 0
  }

  const getFontSizeClass = () => {
    switch(fontSize) {
      case 'small': return 'text-sm'
      case 'large': return 'text-lg'
      default: return 'text-base'
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const toggleTodo = (todoId) => {
    setTodo(todo.map(item => 
      item.id === todoId ? { ...item, completed: !item.completed } : item
    ))
  }

  // Handle right section click
  const handleRightSectionClick = (section) => {
    setActiveRightSection(section)
    setShowRightContent(true)
    if (deviceType === 'mobile') {
      setRightSidebarOpen(true)
    }
  }

  // Close right content
  const closeRightContent = () => {
    setShowRightContent(false)
    if (deviceType === 'mobile') {
      setRightSidebarOpen(false)
    }
  }

  const createEnhancedMockCourseData = () => ({
    course: {
      id: courseId,
      title: 'Complete Information Technology Mastery',
      description: 'Master the fundamentals of IT and advance your career with hands-on projects and real-world scenarios',
      duration: '6 weeks',
      students: 2547,
      rating: 4.9,
      level: 'Beginner to Advanced',
      language: 'English',
      certificate: true,
      lastUpdated: '2024',
      instructor: 'Dr. Sarah Johnson',
      objectives: [
        'Understand core IT concepts and terminology',
        'Build and troubleshoot computer systems',
        'Design and manage networks',
        'Implement security best practices',
        'Master operating systems',
        'Prepare for industry certifications'
      ]
    },
    modules: [
      {
        id: 'module-1',
        title: 'Week 1: IT Fundamentals',
        order_index: 0,
        icon: '💻',
        lessons: [
          {
            id: 'lesson-1',
            title: 'Welcome to IT Mastery',
            content_type: 'video',
            content_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '8',
            description: 'Start your journey into Information Technology',
            resources: [
              { name: 'Course Syllabus', type: 'PDF', size: '2.5 MB', url: '#' },
              { name: 'Learning Roadmap', type: 'PDF', size: '1.8 MB', url: '#' },
              { name: 'Glossary of Terms', type: 'DOC', size: '1.2 MB', url: '#' }
            ]
          },
          {
            id: 'lesson-2',
            title: 'What is Information Technology?',
            content_type: 'text',
            duration: '25',
            description: 'Understanding the fundamentals of IT and its role in modern business',
            quiz: {
              questions: [
                {
                  question: 'What does CPU stand for?',
                  options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Core Processing Unit'],
                  correct: 0,
                  explanation: 'CPU stands for Central Processing Unit - the brain of the computer'
                },
                {
                  question: 'Which of these is an example of hardware?',
                  options: ['Windows 10', 'Microsoft Word', 'RAM', 'Chrome Browser'],
                  correct: 2,
                  explanation: 'RAM (Random Access Memory) is physical hardware, while the others are software'
                },
                {
                  question: 'What is the main function of an operating system?',
                  options: ['Browse the internet', 'Manage hardware and software resources', 'Create documents', 'Play games'],
                  correct: 1,
                  explanation: 'The OS manages all hardware and software resources on a computer'
                }
              ]
            },
            flashcards: [
              { front: 'CPU', back: 'Central Processing Unit - The brain of the computer' },
              { front: 'RAM', back: 'Random Access Memory - Temporary storage for running programs' },
              { front: 'Hardware', back: 'Physical components of a computer system' },
              { front: 'Software', back: 'Programs and instructions that tell hardware what to do' }
            ],
            practiceExercises: [
              {
                id: 'ex1',
                type: 'multiple-choice',
                question: 'Which component stores data permanently?',
                options: ['RAM', 'CPU', 'Hard Drive', 'Cache'],
                correctAnswer: 'Hard Drive',
                explanation: 'Hard drives store data permanently, even when power is off'
              }
            ],
            sections: [
              {
                title: 'Understanding Information Technology',
                content: `Information Technology, or IT, is the use of computers, storage, networking and other physical devices, infrastructure and processes to create, process, store, secure and exchange all forms of electronic data. It's the backbone of modern business and communication.`,
                keyPoints: [
                  'IT encompasses all technology used to manage and process information',
                  'Includes hardware, software, networks, and data management',
                  'Critical for business operations and communication'
                ]
              },
              {
                title: 'The Evolution of IT',
                content: `The history of IT is fascinating and rapid. In the 1940s, computers were room-sized machines used for complex calculations. The 1970s brought personal computers to homes and offices. The 1990s saw the internet explode into public consciousness. Today, we have artificial intelligence, cloud computing, and the Internet of Things connecting billions of devices.`,
                keyPoints: [
                  '1940s: Room-sized mainframe computers',
                  '1970s: Personal computers emerge',
                  '1990s: Internet becomes mainstream',
                  'Today: AI, Cloud, IoT revolutionize IT'
                ]
              }
            ]
          },
          {
            id: 'lesson-3',
            title: 'The Digital Revolution',
            content_type: 'text',
            duration: '20',
            description: 'How technology has transformed our world and continues to evolve',
            sections: [
              {
                title: 'The Information Age',
                content: `We live in the Information Age, where data is more valuable than ever. The digital revolution has transformed how we work, communicate, learn, and entertain ourselves. From smartphones to smart homes, technology is everywhere.`,
                keyPoints: [
                  'Data is the new oil - valuable and transformative',
                  'Digital transformation affects all industries',
                  'Technology enables new ways of working and living'
                ]
              },
              {
                title: 'Emerging Technologies',
                content: `AI and machine learning are automating complex tasks. IoT connects billions of devices. Blockchain is changing how we handle transactions. 5G enables faster, more reliable connections.`,
                keyPoints: [
                  'AI/ML: Automating cognitive tasks',
                  'IoT: Connecting physical devices',
                  'Blockchain: Secure, decentralized transactions',
                  '5G: Next-generation mobile networks'
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Week 2: Computer Hardware',
        order_index: 1,
        icon: '🖥️',
        lessons: [
          {
            id: 'lesson-4',
            title: 'Understanding Computer Components',
            content_type: 'text',
            duration: '35',
            description: 'Learn about the physical parts of a computer and how they work together',
            quiz: {
              questions: [
                {
                  question: 'Which component is considered the "brain" of the computer?',
                  options: ['RAM', 'Hard Drive', 'CPU', 'Motherboard'],
                  correct: 2,
                  explanation: 'CPU (Central Processing Unit) executes instructions and processes data'
                },
                {
                  question: 'What does RAM stand for?',
                  options: ['Random Access Memory', 'Read-Only Memory', 'Rapid Access Module', 'Runtime Application Manager'],
                  correct: 0,
                  explanation: 'RAM is Random Access Memory - temporary storage for running programs'
                },
                {
                  question: 'Which storage type is fastest?',
                  options: ['HDD', 'SSD', 'NVMe SSD', 'USB Drive'],
                  correct: 2,
                  explanation: 'NVMe SSDs connect directly to PCIe for fastest speeds'
                }
              ]
            },
            flashcards: [
              { front: 'CPU', back: 'Central Processing Unit - Executes instructions' },
              { front: 'RAM', back: 'Random Access Memory - Temporary storage' },
              { front: 'SSD', back: 'Solid State Drive - Fast permanent storage' },
              { front: 'Motherboard', back: 'Main circuit board connecting all components' }
            ],
            sections: [
              {
                title: 'The Motherboard',
                content: `The motherboard is the main circuit board that connects all components. It houses the CPU, RAM, and provides connectors for other parts. Think of it as the nervous system of the computer.`,
                keyPoints: [
                  'Central circuit board connecting all components',
                  'Contains chipset for data flow management',
                  'Provides expansion slots for additional cards',
                  'Includes BIOS/UEFI for system startup'
                ]
              },
              {
                title: 'CPU Architecture',
                content: `The Central Processing Unit executes instructions. Modern CPUs have multiple cores, allowing them to process multiple tasks simultaneously. Clock speed, cache size, and core count all affect performance.`,
                keyPoints: [
                  'Cores: Number of independent processing units',
                  'Clock speed: Instructions per second (GHz)',
                  'Cache: Fast onboard memory (L1, L2, L3)',
                  'Thermal design power (TDP): Heat output'
                ]
              },
              {
                title: 'Memory and Storage',
                content: `Computers use different types of memory: Cache (fastest, smallest), RAM (fast, moderate size), and Storage (slower, largest). HDDs use magnetic platters, SSDs use flash memory for faster access.`,
                keyPoints: [
                  'RAM: Temporary storage for active programs',
                  'HDD: High capacity, lower cost, mechanical',
                  'SSD: Faster, durable, more expensive',
                  'NVMe: Fastest, direct PCIe connection'
                ]
              }
            ],
            labExercise: {
              title: 'Identify Computer Components',
              steps: [
                'Open your computer or laptop case (if possible)',
                'Identify the CPU, RAM, and storage devices',
                'Take photos of each component',
                'Create a diagram labeling all parts',
                'Write a brief description of each component\'s function'
              ],
              materials: ['Computer', 'Camera', 'Notepad'],
              timeEstimate: '30 minutes'
            }
          },
          {
            id: 'lesson-5',
            title: 'Building a PC',
            content_type: 'video',
            content_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            duration: '45',
            description: 'Step-by-step guide to building your own computer from components',
            resources: [
              { name: 'Parts List Template', type: 'XLS', size: '500 KB', url: '#' },
              { name: 'Troubleshooting Guide', type: 'PDF', size: '3 MB', url: '#' }
            ]
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Week 3: Operating Systems',
        order_index: 2,
        icon: '⚙️',
        lessons: [
          {
            id: 'lesson-6',
            title: 'Windows Operating System',
            content_type: 'text',
            duration: '30',
            description: 'Learn about Windows architecture and administration',
            quiz: {
              questions: [
                {
                  question: 'What is the main Windows file system?',
                  options: ['FAT32', 'NTFS', 'ext4', 'APFS'],
                  correct: 1,
                  explanation: 'NTFS (New Technology File System) is the primary Windows file system'
                },
                {
                  question: 'Which tool manages users and computers in Windows networks?',
                  options: ['Task Manager', 'Control Panel', 'Active Directory', 'Registry Editor'],
                  correct: 2,
                  explanation: 'Active Directory provides centralized management of users and computers'
                }
              ]
            },
            sections: [
              {
                title: 'Windows Architecture',
                content: `Windows is a modular operating system with kernel, user mode, and hardware abstraction layers. The Windows kernel handles core functions like process management, memory management, and hardware interaction.`,
                keyPoints: [
                  'Kernel mode: Core OS functions',
                  'User mode: Applications and services',
                  'Hardware Abstraction Layer: Hardware independence',
                  'Registry: Configuration database'
                ]
              },
              {
                title: 'Windows Administration',
                content: `Windows provides various administrative tools. Control Panel and Settings app for configuration. PowerShell for automation. Group Policy for managing multiple computers.`,
                keyPoints: [
                  'Control Panel: Traditional settings',
                  'PowerShell: Command-line automation',
                  'Group Policy: Centralized configuration',
                  'Task Manager: Monitor processes and performance'
                ]
              }
            ]
          },
          {
            id: 'lesson-7',
            title: 'Linux Fundamentals',
            content_type: 'text',
            duration: '35',
            description: 'Getting started with Linux command line',
            sections: [
              {
                title: 'Command Line Basics',
                content: `Linux command line is powerful for administration. Navigate files with ls, cd, pwd. Manage processes with ps, top. Edit text with vim, nano.`,
                keyPoints: [
                  'ls, cd, pwd: Navigation commands',
                  'grep, find: Search tools',
                  'ps, top: Process management',
                  'chmod, chown: Permission management'
                ]
              },
              {
                title: 'File System Structure',
                content: `Linux uses a hierarchical file system. /home for user files, /etc for configuration, /var for variable data, /bin for essential commands.`,
                keyPoints: [
                  '/: Root directory',
                  '/home: User home directories',
                  '/etc: Configuration files',
                  '/var: Logs and variable data',
                  '/bin: Essential binaries'
                ]
              }
            ],
            practiceExercises: [
              {
                id: 'ex2',
                type: 'command',
                question: 'Write a command to list all files in the current directory',
                correctAnswer: 'ls -la',
                explanation: 'ls lists files, -l for detailed, -a for all files including hidden'
              }
            ]
          }
        ]
      },
      {
        id: 'module-4',
        title: 'Week 4: Networking',
        order_index: 3,
        icon: '🌐',
        lessons: [
          {
            id: 'lesson-8',
            title: 'Network Topologies',
            content_type: 'text',
            duration: '25',
            description: 'How networks are structured and connected',
            quiz: {
              questions: [
                {
                  question: 'Which topology is most common in modern networks?',
                  options: ['Bus', 'Ring', 'Star', 'Mesh'],
                  correct: 2,
                  explanation: 'Star topology is most common with all devices connecting to a central switch'
                },
                {
                  question: 'What is the main advantage of mesh topology?',
                  options: ['Low cost', 'Easy setup', 'Redundancy', 'Simple cabling'],
                  correct: 2,
                  explanation: 'Mesh provides multiple paths for redundancy'
                }
              ]
            },
            sections: [
              {
                title: 'Physical Topologies',
                content: `Star topology connects all devices to a central switch. Bus topology uses a single cable. Ring topology connects devices in a circle. Mesh provides redundant connections.`,
                keyPoints: [
                  'Star: All devices connect to central switch',
                  'Bus: Single cable, all devices share',
                  'Ring: Devices connected in circle',
                  'Mesh: Multiple redundant connections'
                ]
              }
            ]
          },
          {
            id: 'lesson-9',
            title: 'OSI Model',
            content_type: 'text',
            duration: '40',
            description: 'Understanding the 7 layers of networking',
            sections: [
              {
                title: 'The 7 Layers',
                content: `Physical (Layer 1): Cables and signals. Data Link (Layer 2): MAC addresses and switching. Network (Layer 3): IP addressing and routing. Transport (Layer 4): TCP/UDP. Session (Layer 5): Session management. Presentation (Layer 6): Data formatting. Application (Layer 7): User applications.`,
                keyPoints: [
                  'Layer 1: Physical - Hardware and signals',
                  'Layer 2: Data Link - MAC addresses, switching',
                  'Layer 3: Network - IP addresses, routing',
                  'Layer 4: Transport - TCP/UDP, port numbers',
                  'Layers 5-7: Session, Presentation, Application'
                ]
              }
            ],
            flashcards: [
              { front: 'Layer 1', back: 'Physical - Cables and signals' },
              { front: 'Layer 2', back: 'Data Link - MAC addresses' },
              { front: 'Layer 3', back: 'Network - IP addresses' },
              { front: 'Layer 4', back: 'Transport - TCP/UDP' }
            ]
          },
          {
            id: 'lesson-10',
            title: 'TCP/IP Protocol Suite',
            content_type: 'text',
            duration: '30',
            description: 'The protocols that run the internet',
            sections: [
              {
                title: 'TCP vs UDP',
                content: `TCP ensures reliable delivery with error checking and retransmission. UDP is faster but connectionless, perfect for streaming and real-time applications.`,
                keyPoints: [
                  'TCP: Reliable, ordered, error-checked',
                  'UDP: Fast, low overhead, no guarantee',
                  'TCP uses for web, email, FTP',
                  'UDP uses for streaming, VoIP, gaming'
                ]
              },
              {
                title: 'IP Addressing',
                content: `IPv4 uses 32-bit addresses (e.g., 192.168.1.1). IPv6 uses 128-bit addresses for more space. Subnet masks divide networks into smaller segments.`,
                keyPoints: [
                  'IPv4: 32-bit, 4.3 billion addresses',
                  'IPv6: 128-bit, vast address space',
                  'Subnet mask: Network vs host portion',
                  'Public vs Private addresses'
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'module-5',
        title: 'Week 5: Cybersecurity',
        order_index: 4,
        icon: '🔒',
        lessons: [
          {
            id: 'lesson-11',
            title: 'Security Fundamentals',
            content_type: 'text',
            duration: '35',
            description: 'Core security concepts every IT pro should know',
            quiz: {
              questions: [
                {
                  question: 'What does "C" in CIA triad stand for?',
                  options: ['Confidentiality', 'Complexity', 'Certification', 'Cryptography'],
                  correct: 0,
                  explanation: 'CIA stands for Confidentiality, Integrity, Availability'
                },
                {
                  question: 'Which authentication factor is "something you have"?',
                  options: ['Password', 'Biometric', 'Security token', 'PIN'],
                  correct: 2,
                  explanation: 'Security token is a possession factor (something you have)'
                }
              ]
            },
            sections: [
              {
                title: 'CIA Triad',
                content: `Confidentiality ensures data is accessible only to authorized users. Integrity maintains data accuracy. Availability ensures systems are accessible when needed.`,
                keyPoints: [
                  'Confidentiality: Prevent unauthorized access',
                  'Integrity: Ensure data accuracy',
                  'Availability: Systems accessible when needed',
                  'Balance: Security vs usability'
                ]
              },
              {
                title: 'Authentication Methods',
                content: `Passwords (knowledge), tokens (possession), biometrics (inherence). Multi-factor authentication combines multiple methods for stronger security.`,
                keyPoints: [
                  'Knowledge: Passwords, PINs',
                  'Possession: Tokens, phones',
                  'Inherence: Fingerprints, face recognition',
                  'MFA: Multiple factors together'
                ]
              }
            ]
          },
          {
            id: 'lesson-12',
            title: 'Threats and Vulnerabilities',
            content_type: 'text',
            duration: '30',
            description: 'Understanding security risks and how to mitigate them',
            sections: [
              {
                title: 'Malware Types',
                content: `Viruses attach to legitimate files. Worms self-replicate across networks. Trojans disguise as legitimate software. Ransomware encrypts files for payment.`,
                keyPoints: [
                  'Virus: Attaches to legitimate files',
                  'Worm: Self-replicating network spread',
                  'Trojan: Disguised as legitimate software',
                  'Ransomware: Encrypts files for payment'
                ]
              },
              {
                title: 'Social Engineering',
                content: `Phishing uses fraudulent emails to steal credentials. Pretexting creates false scenarios. Baiting offers something enticing to deliver malware.`,
                keyPoints: [
                  'Phishing: Fraudulent emails',
                  'Spear phishing: Targeted attacks',
                  'Pretexting: Creating false scenarios',
                  'Tailgating: Following authorized people'
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'module-6',
        title: 'Week 6: Cloud & Career',
        order_index: 5,
        icon: '☁️',
        lessons: [
          {
            id: 'lesson-13',
            title: 'Cloud Computing',
            content_type: 'text',
            duration: '30',
            description: 'Understanding cloud service models and deployment',
            quiz: {
              questions: [
                {
                  question: 'Which cloud model provides virtual machines?',
                  options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
                  correct: 2,
                  explanation: 'IaaS (Infrastructure as a Service) provides virtual infrastructure including VMs'
                },
                {
                  question: 'What is an example of SaaS?',
                  options: ['AWS EC2', 'Microsoft Office 365', 'Google App Engine', 'Azure VMs'],
                  correct: 1,
                  explanation: 'Office 365 is Software as a Service - ready-to-use application'
                }
              ]
            },
            sections: [
              {
                title: 'Cloud Service Models',
                content: `IaaS provides virtual machines, storage, networking. PaaS provides managed runtime for applications. SaaS provides ready-to-use software applications.`,
                keyPoints: [
                  'IaaS: Virtual machines, storage, networking',
                  'PaaS: Managed application platform',
                  'SaaS: Ready-to-use software',
                  'FaaS: Serverless functions'
                ]
              },
              {
                title: 'Major Cloud Providers',
                content: `AWS is market leader with most services. Azure integrates well with Microsoft products. Google Cloud excels in data analytics and machine learning.`,
                keyPoints: [
                  'AWS: EC2, S3, RDS - broadest services',
                  'Azure: Strong Microsoft integration',
                  'GCP: Big data and ML focus',
                  'Multi-cloud: Using multiple providers'
                ]
              }
            ]
          },
          {
            id: 'lesson-14',
            title: 'IT Certifications',
            content_type: 'text',
            duration: '25',
            description: 'Certification paths and preparation',
            sections: [
              {
                title: 'Entry Level Certs',
                content: `CompTIA A+ covers hardware and troubleshooting. Network+ focuses on networking fundamentals. Security+ introduces security basics.`,
                keyPoints: [
                  'A+: Hardware and troubleshooting',
                  'Network+: Networking fundamentals',
                  'Security+: Security basics',
                  'Start here for IT career'
                ]
              },
              {
                title: 'Advanced Certifications',
                content: `CCNA for Cisco networking. CISSP for security professionals. AWS certifications for cloud architects. Choose based on career goals.`,
                keyPoints: [
                  'CCNA: Cisco networking',
                  'CISSP: Security professional',
                  'AWS Certified: Cloud architect',
                  'Microsoft Certified: Azure expert'
                ]
              }
            ]
          },
          {
            id: 'lesson-15',
            title: 'Career Development',
            content_type: 'text',
            duration: '20',
            description: 'Building your IT career',
            sections: [
              {
                title: 'Building Your Portfolio',
                content: `Create a home lab to practice. Contribute to open source projects. Document your projects on GitHub. Write a tech blog to share knowledge.`,
                keyPoints: [
                  'Home lab: Practice environment',
                  'Open source: Contribute to projects',
                  'GitHub: Show your code',
                  'Blog: Document your learning'
                ]
              },
              {
                title: 'Interview Preparation',
                content: `Use STAR method for behavioral questions (Situation, Task, Action, Result). Practice technical questions. Build a professional network.`,
                keyPoints: [
                  'STAR method: Structure answers',
                  'Technical prep: Review fundamentals',
                  'Networking: Attend meetups',
                  'LinkedIn: Professional presence'
                ]
              }
            ]
          }
        ]
      }
    ]
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            style={{ color: colors.primary }}
          >
            <Home size={20} />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          <div className="h-6 w-px bg-gray-300"></div>
          <span className="text-sm font-medium text-gray-600 truncate max-w-[200px] sm:max-w-xs">
            {course?.title}
          </span>
        </div>
        
        {/* User Stats */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3">
            <div className="flex items-center gap-1 text-sm" style={{ color: colors.secondary }}>
              <Zap size={16} />
              <span className="font-medium">{streak} day streak</span>
            </div>
            <div className="flex items-center gap-1 text-sm" style={{ color: colors.primary }}>
              <AwardIcon size={16} />
              <span className="font-medium">{points} points</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock size={16} />
              <span className="font-medium">{studyTime} min studied</span>
            </div>
          </div>
          <button
            onClick={() => setShowAchievements(!showAchievements)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Trophy size={20} style={{ color: colors.yellow }} />
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="pt-14 flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar Toggle for Mobile */}
        {deviceType === 'mobile' && (
          <div className="sticky top-14 z-40 bg-white shadow-md px-4 py-3 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              <span className="text-sm font-medium">Course Menu</span>
            </button>
            <button
              onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="text-sm font-medium">Tools</span>
            </button>
          </div>
        )}

        {/* Left Sidebar - Course Curriculum */}
        <div className={`
          ${sidebarOpen ? 'block' : 'hidden'} 
          ${deviceType === 'mobile' ? 'fixed inset-0 z-40 pt-32' : 'w-80 flex-shrink-0'} 
          bg-white border-r border-gray-200 overflow-y-auto transition-all
        `}>
          <div className="p-4 sm:p-5 md:p-6 border-b border-gray-200">
            <h2 className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.primary }}>{course?.title}</h2>
            
            {/* Progress Circle */}
            <div className="flex items-center gap-4 mb-3">
              <div className="relative w-16 h-16">
                <svg className="w-16 h-16 transform -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke={colors.secondary}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={2 * Math.PI * 28}
                    strokeDashoffset={2 * Math.PI * 28 * (1 - calculateProgress() / 100)}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{Math.round(calculateProgress())}%</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="text-sm text-gray-600">Course Progress</div>
                <div className="text-xs text-gray-500">
                  {Object.values(progress).filter(Boolean).length} / {modules.flatMap(m => m.lessons).length} lessons
                </div>
              </div>
            </div>
            
            {/* Course Stats */}
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-3">
              <span className="flex items-center gap-1"><BookOpen size={12} /> {modules.length} weeks</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {course?.duration || '6 weeks'}</span>
              <span className="flex items-center gap-1"><Users size={12} /> {course?.students?.toLocaleString() || '2.5k'}</span>
              <span className="flex items-center gap-1"><Star size={12} className="fill-yellow-400 text-yellow-400" /> {course?.rating || '4.9'}</span>
            </div>

            {/* Week Selector */}
            <div className="mt-3">
              <label className="text-xs font-medium text-gray-600 mb-1 block">Jump to Week:</label>
              <select
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(parseInt(e.target.value))}
                className="w-full p-2 text-sm border rounded-lg"
              >
                <option value={1}>Week 1: IT Fundamentals</option>
                <option value={2}>Week 2: Computer Hardware</option>
                <option value={3}>Week 3: Operating Systems</option>
                <option value={4}>Week 4: Networking</option>
                <option value={5}>Week 5: Cybersecurity</option>
                <option value={6}>Week 6: Cloud & Career</option>
              </select>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setShowGlossary(!showGlossary)}
                className="flex-1 text-xs px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
              >
                <BookOpen size={12} /> Glossary
              </button>
              <button
                onClick={() => setShowStudyTips(!showStudyTips)}
                className="flex-1 text-xs px-2 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-1"
              >
                <Lightbulb size={12} /> Study Tips
              </button>
            </div>

            {/* Course Objectives */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <h3 className="text-xs font-bold mb-2" style={{ color: colors.primary }}>What you'll learn:</h3>
              <ul className="space-y-1">
                {course?.objectives?.map((obj, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-3 sm:p-4">
            {modules.filter(m => m.order_index === selectedWeek - 1).map((module) => (
              <div key={module.id} className="mb-3 border border-gray-100 rounded-lg overflow-hidden">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{module.icon || '📚'}</span>
                    <div className="text-left">
                      <span className="font-medium text-sm sm:text-base block" style={{ color: colors.primary }}>
                        {module.title}
                      </span>
                      <span className="text-xs text-gray-500">{module.lessons?.length} lessons</span>
                    </div>
                  </div>
                  {expandedModules[module.id] ? (
                    <ChevronUp size={18} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={18} className="text-gray-500" />
                  )}
                </button>

                {/* Module Lessons */}
                {expandedModules[module.id] && (
                  <div className="p-2 space-y-2">
                    {module.lessons?.map((lesson) => {
                      const lessonCompleted = progress[lesson.id]
                      return (
                        <div key={lesson.id} className="border border-gray-100 rounded-lg overflow-hidden">
                          {/* Lesson Header */}
                          <button
                            onClick={() => toggleLesson(lesson.id)}
                            className={`w-full flex items-center justify-between p-2 hover:bg-gray-50 transition-colors ${
                              currentLesson?.id === lesson.id ? 'bg-blue-50' : ''
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className="flex-shrink-0">
                                {lessonCompleted ? (
                                  <CheckCircle size={16} className="text-green-500" />
                                ) : (
                                  <Circle size={16} className="text-gray-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0 text-left">
                                <div className="text-xs sm:text-sm font-medium truncate flex items-center gap-1">
                                  {lesson.title}
                                  {lesson.quiz && <HelpCircle size={12} className="text-purple-500" />}
                                </div>
                                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                                  {lesson.content_type === 'video' ? (
                                    <PlayCircle size={10} className="mr-1" />
                                  ) : (
                                    <FileText size={10} className="mr-1" />
                                  )}
                                  <span className="capitalize">{lesson.content_type}</span>
                                  {lesson.duration && <span className="ml-1">• {lesson.duration} min</span>}
                                </div>
                              </div>
                            </div>
                            {expandedLessons[lesson.id] ? (
                              <ChevronUp size={14} className="text-gray-400 ml-2" />
                            ) : (
                              <ChevronDown size={14} className="text-gray-400 ml-2" />
                            )}
                          </button>

                          {/* Lesson Sections */}
                          {expandedLessons[lesson.id] && lesson.sections && lesson.sections.length > 0 && (
                            <div className="pl-8 pr-2 pb-2 space-y-1 bg-gray-50">
                              {lesson.sections.map((section, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => selectSection(lesson, section, idx)}
                                  className={`w-full text-left text-xs py-1.5 px-2 rounded hover:bg-gray-200 transition-colors truncate ${
                                    currentSection?.title === section.title && currentLesson?.id === lesson.id
                                      ? 'bg-blue-100 text-blue-700 font-medium'
                                      : 'text-gray-700'
                                  }`}
                                >
                                  {section.title}
                                </button>
                              ))}
                              <button
                                onClick={() => selectLesson(lesson)}
                                className={`w-full text-left text-xs py-1.5 px-2 rounded hover:bg-gray-200 transition-colors mt-1 ${
                                  currentLesson?.id === lesson.id && !currentSection
                                    ? 'bg-blue-100 text-blue-700 font-medium'
                                    : lessonCompleted 
                                      ? 'bg-green-50 text-green-700' 
                                      : 'bg-gray-100 text-gray-700'
                                }`}
                              >
                                {lessonCompleted ? '✓ Completed' : '📖 Read full lesson'}
                              </button>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area - Center */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
            {/* Welcome Header with Course Tools Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                Welcome to {course?.title}
              </h1>
              
              {/* Course Tools Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowRightContent(!showRightContent)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Grid3x3 size={18} className="text-blue-600" />
                  <span className="text-sm font-medium">Course Tools</span>
                  <ChevronDown size={16} className={`text-gray-500 transition-transform ${showRightContent ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Dropdown Menu - Now clickable and shows content in right panel */}
                {showRightContent && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setActiveRightSection('todo')
                          if (deviceType === 'mobile') setRightSidebarOpen(true)
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <ClipboardList size={16} className="text-gray-600" />
                          To Do
                        </span>
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                          {todo.filter(t => !t.completed && t.week === selectedWeek).length}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setActiveRightSection('inbox')
                          if (deviceType === 'mobile') setRightSidebarOpen(true)
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <Mail size={16} className="text-gray-600" />
                          Inbox
                        </span>
                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                          {inbox.filter(m => m.unread).length}
                        </span>
                      </button>
                      
                      <button
                        onClick={() => {
                          setActiveRightSection('announcements')
                          if (deviceType === 'mobile') setRightSidebarOpen(true)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Megaphone size={16} className="text-gray-600" />
                        Announcements
                      </button>
                      
                      <button
                        onClick={() => {
                          setActiveRightSection('syllabus')
                          if (deviceType === 'mobile') setRightSidebarOpen(true)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <BookMarked size={16} className="text-gray-600" />
                        Syllabus
                      </button>
                      
                      <button
                        onClick={() => {
                          setActiveRightSection('modules')
                          if (deviceType === 'mobile') setRightSidebarOpen(true)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Grid3x3 size={16} className="text-gray-600" />
                        Modules
                      </button>
                      
                      <button
                        onClick={() => {
                          setActiveRightSection('grades')
                          if (deviceType === 'mobile') setRightSidebarOpen(true)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <BarChart size={16} className="text-gray-600" />
                        Grades
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {currentLesson ? (
              <>
                {/* Lesson Header */}
                <div className="mb-4 sm:mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.primary }}>
                      {currentLesson.title}
                      {currentSection && <span className="text-lg sm:text-xl text-gray-600 ml-2">- {currentSection.title}</span>}
                    </h1>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <button
                        onClick={() => setBookmarked(!bookmarked)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Bookmark"
                      >
                        <Bookmark size={18} className={bookmarked ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'} />
                      </button>
                      <button
                        onClick={() => setShowNotes(!showNotes)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Notes"
                      >
                        <FileText size={18} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => setShowAIAssistant(!showAIAssistant)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="AI Assistant"
                      >
                        <Sparkles size={18} style={{ color: colors.secondary }} />
                      </button>
                      <select
                        value={fontSize}
                        onChange={(e) => setFontSize(e.target.value)}
                        className="text-xs border rounded-lg px-2 py-1"
                      >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                      </select>
                    </div>
                  </div>

                  {/* Lesson Meta */}
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 flex-wrap">
                    <span className="flex items-center gap-1">
                      {currentLesson.content_type === 'video' ? <PlayCircle size={14} /> : <FileText size={14} />}
                      {currentLesson.content_type === 'video' ? 'Video Lesson' : 'Text Lesson'}
                    </span>
                    {currentLesson.duration && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {currentLesson.duration} min
                        </span>
                      </>
                    )}
                    {currentLesson.quiz && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-purple-600">
                          <HelpCircle size={14} />
                          Quiz ({currentLesson.quiz.questions.length} questions)
                        </span>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  {currentLesson.description && !currentSection && (
                    <p className="mt-3 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                      {currentLesson.description}
                    </p>
                  )}
                </div>

                {/* Content Tabs */}
                <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'content'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    style={activeTab === 'content' ? { borderColor: colors.secondary, color: colors.secondary } : {}}
                  >
                    Content
                  </button>
                  {currentLesson.quiz && (
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                        activeTab === 'quiz'
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                      style={activeTab === 'quiz' ? { borderColor: colors.secondary, color: colors.secondary } : {}}
                    >
                      Quiz
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('discussion')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'discussion'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    style={activeTab === 'discussion' ? { borderColor: colors.secondary, color: colors.secondary } : {}}
                  >
                    Discussion
                  </button>
                  <button
                    onClick={() => setActiveTab('resources')}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === 'resources'
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                    style={activeTab === 'resources' ? { borderColor: colors.secondary, color: colors.secondary } : {}}
                  >
                    Resources
                  </button>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {/* Content Tab */}
                  {activeTab === 'content' && (
                    <>
                      {/* Video Player */}
                      {currentLesson.content_type === 'video' && currentLesson.content_url && (
                        <div className={`mb-6 transition-all ${videoExpanded ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}>
                          <div className={`relative ${videoExpanded ? 'h-full' : 'aspect-video max-w-2xl mx-auto'}`}>
                            <div className="relative bg-black rounded-lg overflow-hidden">
                              <iframe
                                src={currentLesson.content_url}
                                className="w-full h-full"
                                style={{ height: videoExpanded ? 'calc(100vh - 80px)' : '300px' }}
                                allowFullScreen
                                title={currentLesson.title}
                              />
                              <button
                                onClick={() => setVideoExpanded(!videoExpanded)}
                                className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition-colors"
                              >
                                {videoExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Text Content */}
                      {currentLesson.content_type === 'text' && currentLesson.sections && (
                        <div className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 mb-6 ${getFontSizeClass()}`}>
                          {currentSection ? (
                            // Show single section
                            <div className="mb-8">
                              <h2 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b" style={{ color: colors.primary }}>
                                {currentSection.title}
                              </h2>
                              <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                                {currentSection.content}
                              </div>
                              {currentSection.keyPoints && (
                                <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                  <h3 className="font-medium mb-2 text-sm" style={{ color: colors.primary }}>Key Points:</h3>
                                  <ul className="list-disc list-inside space-y-1">
                                    {currentSection.keyPoints.map((point, idx) => (
                                      <li key={idx} className="text-sm text-gray-700">{point}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ) : (
                            // Show all sections
                            currentLesson.sections.map((section, idx) => (
                              <div 
                                key={idx} 
                                id={`section-${currentLesson.id}-${idx}`}
                                className="mb-8 scroll-mt-20"
                              >
                                <h2 className="text-xl sm:text-2xl font-bold mb-4 pb-2 border-b" style={{ color: colors.primary }}>
                                  {section.title}
                                </h2>
                                <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                                  {section.content}
                                </div>
                                {section.keyPoints && (
                                  <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                    <h3 className="font-medium mb-2 text-sm" style={{ color: colors.primary }}>Key Points:</h3>
                                    <ul className="list-disc list-inside space-y-1">
                                      {section.keyPoints.map((point, idx) => (
                                        <li key={idx} className="text-sm text-gray-700">{point}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Quiz Tab */}
                  {activeTab === 'quiz' && currentLesson.quiz && (
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold" style={{ color: colors.primary }}>Knowledge Check</h3>
                        {quizActive && (
                          <div className="flex items-center gap-2 text-sm">
                            <Timer size={16} className="text-gray-500" />
                            <span className="font-mono">{formatTime(quizTimer)}</span>
                          </div>
                        )}
                      </div>
                      
                      {quizResults ? (
                        <div className="text-center py-6">
                          <div className="text-4xl font-bold mb-2" style={{ color: quizResults.score >= 70 ? colors.green : colors.secondary }}>
                            {quizResults.score}%
                          </div>
                          <p className="mb-2">
                            You got {quizResults.correct} out of {quizResults.total} questions correct
                          </p>
                          {quizResults.timeBonus > 0 && (
                            <p className="text-sm text-green-600 mb-4">
                              +{quizResults.timeBonus} points for speed!
                            </p>
                          )}
                          {quizResults.score >= 70 ? (
                            <div className="bg-green-50 text-green-700 p-4 rounded-lg">
                              🎉 Great job! You've mastered this lesson.
                            </div>
                          ) : (
                            <div>
                              <p className="text-red-600 mb-4">You need 70% to pass. Keep studying!</p>
                              <button
                                onClick={() => {
                                  setQuizAnswers({})
                                  setQuizResults(null)
                                  setQuizTimer(0)
                                  setQuizActive(true)
                                }}
                                className="px-4 py-2 text-white rounded-lg text-sm font-medium"
                                style={{ background: colors.primary }}
                              >
                                Try Again
                              </button>
                            </div>
                          )}
                        </div>
                      ) : !showQuiz ? (
                        <div className="text-center py-8">
                          <HelpCircle size={48} className="mx-auto text-gray-300 mb-3" />
                          <h4 className="font-medium mb-2">Ready to test your knowledge?</h4>
                          <p className="text-sm text-gray-500 mb-4">
                            This quiz has {currentLesson.quiz.questions.length} questions
                          </p>
                          <button
                            onClick={startQuiz}
                            className="px-6 py-2 text-white rounded-lg text-sm font-medium"
                            style={{ background: colors.primary }}
                          >
                            Start Quiz
                          </button>
                        </div>
                      ) : (
                        <>
                          {currentLesson.quiz.questions.map((q, qIdx) => (
                            <div key={qIdx} className="mb-6 last:mb-0">
                              <p className="font-medium mb-3">{qIdx + 1}. {q.question}</p>
                              <div className="space-y-2">
                                {q.options.map((opt, oIdx) => (
                                  <label
                                    key={oIdx}
                                    className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                                      quizAnswers[qIdx] === oIdx
                                        ? 'border-orange-500 bg-orange-50'
                                        : 'hover:bg-gray-50'
                                    }`}
                                    style={quizAnswers[qIdx] === oIdx ? { borderColor: colors.secondary } : {}}
                                  >
                                    <input
                                      type="radio"
                                      name={`q${qIdx}`}
                                      value={oIdx}
                                      checked={quizAnswers[qIdx] === oIdx}
                                      onChange={() => setQuizAnswers({...quizAnswers, [qIdx]: oIdx})}
                                      className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                      quizAnswers[qIdx] === oIdx ? 'border-orange-500' : 'border-gray-300'
                                    }`}>
                                      {quizAnswers[qIdx] === oIdx && (
                                        <div className="w-2 h-2 rounded-full" style={{ background: colors.secondary }}></div>
                                      )}
                                    </div>
                                    <span className="text-sm">{opt}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          ))}
                          
                          <div className="flex gap-3 mt-6">
                            <button
                              onClick={handleQuizSubmit}
                              disabled={Object.keys(quizAnswers).length !== currentLesson.quiz.questions.length}
                              className="flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                              style={{ background: colors.primary }}
                            >
                              Submit Answers
                            </button>
                            <button
                              onClick={() => setShowQuiz(false)}
                              className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Discussion Tab */}
                  {activeTab === 'discussion' && (
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold" style={{ color: colors.primary }}>Discussion</h3>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          {comments.length} comments
                        </span>
                      </div>
                      
                      {/* Add Comment */}
                      <div className="mb-6">
                        <div className="flex gap-2">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {profile?.email?.split('@')[0]?.charAt(0).toUpperCase() || 'S'}
                            </div>
                          </div>
                          <div className="flex-1">
                            <textarea
                              value={newComment}
                              onChange={(e) => setNewComment(e.target.value)}
                              placeholder="Share your thoughts or ask a question..."
                              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                              rows="2"
                            />
                            <div className="flex justify-end mt-2">
                              <button
                                onClick={addComment}
                                disabled={!newComment.trim()}
                                className="px-4 py-1.5 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: colors.primary }}
                              >
                                Post Comment
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Comments List */}
                      <div className="space-y-4">
                        {comments.length > 0 ? (
                          comments.map(comment => (
                            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0">
                              <div className="flex gap-3">
                                <div className="flex-shrink-0">
                                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-bold">
                                    {comment.user.charAt(0).toUpperCase()}
                                  </div>
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-medium">{comment.user}</span>
                                    <span className="text-xs text-gray-500">
                                      {new Date(comment.timestamp).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                                  
                                  {/* Comment Actions */}
                                  <div className="flex items-center gap-4">
                                    <button
                                      onClick={() => likeComment(comment.id)}
                                      className="text-xs text-gray-500 hover:text-blue-600 flex items-center gap-1"
                                    >
                                      <ThumbsUp size={12} />
                                      <span>Like {comment.likes > 0 && `(${comment.likes})`}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <MessageCircle size={40} className="mx-auto text-gray-300 mb-2" />
                            <p className="text-sm text-gray-500">No comments yet. Be the first to start the discussion!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Resources Tab */}
                  {activeTab === 'resources' && (
                    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                      <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Lesson Resources</h3>
                      
                      {currentLesson.resources ? (
                        <div className="space-y-3">
                          {currentLesson.resources.map((resource, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                              <div className="flex items-center gap-3">
                                <FileText size={18} className="text-gray-500" />
                                <div>
                                  <p className="text-sm font-medium">{resource.name}</p>
                                  <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                                </div>
                              </div>
                              <a
                                href={resource.url}
                                download
                                className="p-2 hover:bg-gray-200 rounded-lg"
                              >
                                <Download size={16} />
                              </a>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500 text-center py-4">No resources available for this lesson</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Notes Section */}
                {showNotes && (
                  <div className="bg-yellow-50 rounded-xl shadow-lg p-4 sm:p-6 mb-6 border border-yellow-200">
                    <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
                      <FileText size={18} />
                      Your Notes
                    </h3>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg mb-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                      rows="4"
                      placeholder="Take notes for this lesson..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                      style={{ background: colors.primary }}
                    >
                      Save Notes
                    </button>
                  </div>
                )}

                {/* Lesson Actions */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      onClick={() => {
                        const prev = getPreviousLesson()
                        if (prev) {
                          selectLesson(prev)
                        }
                      }}
                      disabled={!getPreviousLesson()}
                      className="w-full sm:w-auto px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      <ChevronLeft size={18} />
                      Previous
                    </button>

                    {!progress[currentLesson.id] ? (
                      <button
                        onClick={() => markLessonComplete(currentLesson.id)}
                        className="w-full sm:w-auto px-6 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-colors flex items-center justify-center gap-2 text-sm"
                        style={{ background: colors.green }}
                      >
                        <CheckCircle size={18} />
                        Mark Complete (+10 pts)
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-green-600 font-medium">
                        <CheckCircle size={20} />
                        <span>Completed!</span>
                      </div>
                    )}

                    <button
                      onClick={() => {
                        const next = getNextLesson()
                        if (next) {
                          selectLesson(next)
                        }
                      }}
                      disabled={!getNextLesson()}
                      className="w-full sm:w-auto px-4 py-2 border rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-400 mb-2">Welcome to {course?.title}</h2>
                <p className="text-gray-500 mb-4">Choose a lesson from the sidebar to start learning</p>
                
                {/* Course Overview */}
                <div className="max-w-2xl mx-auto mt-8 bg-white rounded-xl shadow-lg p-6 text-left">
                  <h3 className="font-bold text-lg mb-4" style={{ color: colors.primary }}>6-Week Course Overview</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Week 1: IT Fundamentals</h4>
                        <p className="text-xs text-gray-600">Introduction to IT, hardware basics, software concepts</p>
                      </div>
                      <div className="p-3 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Week 2: Computer Hardware</h4>
                        <p className="text-xs text-gray-600">CPU, memory, storage, building computers</p>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Week 3: Operating Systems</h4>
                        <p className="text-xs text-gray-600">Windows, Linux, macOS, system administration</p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Week 4: Networking</h4>
                        <p className="text-xs text-gray-600">Topologies, OSI model, TCP/IP, protocols</p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Week 5: Cybersecurity</h4>
                        <p className="text-xs text-gray-600">Security threats, encryption, firewalls</p>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-1">Week 6: Cloud & Career</h4>
                        <p className="text-xs text-gray-600">Cloud computing, certifications, career paths</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Content Panel (Always visible on desktop, slides in on mobile) */}
        <div className={`
          ${rightSidebarOpen || deviceType === 'desktop' ? 'block' : 'hidden'}
          ${deviceType === 'mobile' ? 'fixed inset-0 z-40 pt-20' : 'w-80 flex-shrink-0 border-l border-gray-200'}
          bg-white overflow-y-auto transition-all
        `}>
          {deviceType === 'mobile' && (
            <div className="sticky top-0 bg-white p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: colors.primary }}>Course Tools</h3>
              <button
                onClick={() => setRightSidebarOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>
          )}

          <div className="p-4">
            {/* To Do Section */}
            {activeRightSection === 'todo' && (
              <div>
                <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <ClipboardList size={20} className="text-blue-600" />
                  Week {selectedWeek} Tasks
                </h4>
                <div className="space-y-3">
                  {todo.filter(item => item.week === selectedWeek).map(item => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => toggleTodo(item.id)}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        {item.completed ? (
                          <CheckCircle size={18} className="text-green-500" />
                        ) : (
                          <Circle size={18} className="text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-medium ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {item.task}
                          </span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                            item.type === 'video' ? 'bg-red-100 text-red-600' :
                            item.type === 'quiz' ? 'bg-purple-100 text-purple-600' :
                            item.type === 'lab' ? 'bg-green-100 text-green-600' :
                            item.type === 'project' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Due: {formatDate(item.due)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Welcome to Week X Banner */}
                  <div className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg text-white">
                    <h5 className="font-bold text-base mb-1">🎉 Welcome to Week {selectedWeek}!</h5>
                    <p className="text-sm opacity-90">
                      {selectedWeek === 1 && "Start your IT journey with fundamentals."}
                      {selectedWeek === 2 && "Dive into computer hardware this week."}
                      {selectedWeek === 3 && "Explore operating systems and command line."}
                      {selectedWeek === 4 && "Learn how networks connect the world."}
                      {selectedWeek === 5 && "Master cybersecurity essentials."}
                      {selectedWeek === 6 && "Final week! Cloud computing and career prep."}
                    </p>
                  </div>

                  {/* Week X Midweek Announcement */}
                  <div className="mt-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <h5 className="font-medium text-sm text-orange-700 mb-2 flex items-center gap-1">
                      <Megaphone size={14} />
                      WEEK {selectedWeek} MIDWEEK ANNOUNCEMENT
                    </h5>
                    <p className="text-sm text-gray-600">
                      {selectedWeek === 1 && "Don't forget to complete the 'What is Information Technology?' lesson and quiz by Friday."}
                      {selectedWeek === 2 && "Hardware lab this week! Make sure to complete all components identification."}
                      {selectedWeek === 3 && "Practice Linux commands - they're essential for IT professionals."}
                      {selectedWeek === 4 && "Network design project due Friday. Join office hours for help."}
                      {selectedWeek === 5 && "Security assessment this week. Review the CIA triad and threat types."}
                      {selectedWeek === 6 && "Final project and assessment this week. You've got this!"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Inbox Section */}
            {activeRightSection === 'inbox' && (
              <div>
                <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-blue-600" />
                  Messages
                </h4>
                <div className="space-y-3">
                  {inbox.map(message => (
                    <div
                      key={message.id}
                      className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer ${
                        message.unread ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{message.from}</span>
                        <span className="text-xs text-gray-500">{formatDate(message.date)}</span>
                      </div>
                      <p className="text-sm font-medium mb-1">{message.subject}</p>
                      <p className="text-sm text-gray-600 mb-2">{message.preview}</p>
                      {message.unread && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      <div className="text-xs text-gray-400 mt-2">
                        Week {message.week}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Announcements Section */}
            {activeRightSection === 'announcements' && (
              <div>
                <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <Megaphone size={20} className="text-blue-600" />
                  Announcements
                </h4>
                <div className="space-y-4">
                  {announcements.filter(a => a.week === selectedWeek).map(announcement => (
                    <div
                      key={announcement.id}
                      className={`p-4 border rounded-lg ${
                        announcement.important ? 'border-orange-200 bg-orange-50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{announcement.title}</span>
                        <span className="text-xs text-gray-500">{formatDate(announcement.date)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{announcement.content}</p>
                      <p className="text-xs text-gray-500">— {announcement.author}</p>
                      {announcement.important && (
                        <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full mt-2 inline-block">
                          Important
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Syllabus Section */}
            {activeRightSection === 'syllabus' && syllabus && (
              <div>
                <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <BookMarked size={20} className="text-blue-600" />
                  Course Syllabus
                </h4>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm mb-3">Course Information</h5>
                    <p className="text-sm mb-2"><span className="font-medium">Instructor:</span> {syllabus.instructor}</p>
                    <p className="text-sm mb-2"><span className="font-medium">Email:</span> {syllabus.email}</p>
                    <p className="text-sm mb-2"><span className="font-medium">Office:</span> {syllabus.office}</p>
                    <p className="text-sm"><span className="font-medium">Office Hours:</span> {syllabus.officeHours}</p>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm mb-3">Grading Breakdown</h5>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Quizzes</span>
                        <span className="font-medium">{syllabus.grading.quizzes}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Assignments</span>
                        <span className="font-medium">{syllabus.grading.assignments}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Labs</span>
                        <span className="font-medium">{syllabus.grading.labs}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Projects</span>
                        <span className="font-medium">{syllabus.grading.projects}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Participation</span>
                        <span className="font-medium">{syllabus.grading.participation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h5 className="font-medium text-sm mb-3">Course Schedule</h5>
                    <div className="space-y-3">
                      {syllabus.schedule.map((week, idx) => (
                        <div key={idx} className="text-sm border-b last:border-0 pb-2 last:pb-0">
                          <div className="font-medium mb-1">Week {week.week}: {week.topic}</div>
                          <p className="text-xs text-gray-600 mb-1">{week.description}</p>
                          <p className="text-xs text-gray-500">Readings: {week.readings}</p>
                          <p className="text-xs text-gray-500">Assignments: {week.assignments}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modules Section */}
            {activeRightSection === 'modules' && (
              <div>
                <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <Grid3x3 size={20} className="text-blue-600" />
                  Course Modules
                </h4>
                <div className="space-y-3">
                  {modules.map((module, idx) => {
                    const weekNum = idx + 1
                    const weekProgress = module.lessons?.filter(l => progress[l.id])?.length || 0
                    const weekTotal = module.lessons?.length || 0
                    const weekPercentage = weekTotal > 0 ? Math.round((weekProgress / weekTotal) * 100) : 0
                    
                    return (
                      <div 
                        key={module.id} 
                        className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${
                          weekNum === selectedWeek ? 'border-blue-500 bg-blue-50' : ''
                        }`}
                        onClick={() => setSelectedWeek(weekNum)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{module.icon}</span>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Week {weekNum}: {module.title}</p>
                            <p className="text-xs text-gray-500">{weekTotal} lessons</p>
                          </div>
                          <span className="text-sm font-bold text-blue-600">{weekPercentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all" 
                            style={{ width: `${weekPercentage}%` }}
                          ></div>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {weekProgress} of {weekTotal} lessons completed
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Grades Section */}
            {activeRightSection === 'grades' && (
              <div>
                <h4 className="font-medium text-lg mb-4 flex items-center gap-2">
                  <BarChart size={20} className="text-blue-600" />
                  Your Grades
                </h4>
                <div className="space-y-3">
                  {grades.filter(g => g.week === selectedWeek).map(grade => (
                    <div key={grade.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{grade.assignment}</span>
                        <span className={`text-lg font-bold ${
                          grade.percentage >= 90 ? 'text-green-600' :
                          grade.percentage >= 80 ? 'text-blue-600' :
                          grade.percentage >= 70 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {grade.percentage}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                        <span>Score: {grade.score}/{grade.total}</span>
                        <span>Submitted: {formatDate(grade.submitted)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className={`h-2 rounded-full ${
                            grade.percentage >= 90 ? 'bg-green-600' :
                            grade.percentage >= 80 ? 'bg-blue-600' :
                            grade.percentage >= 70 ? 'bg-yellow-600' :
                            'bg-red-600'
                          }`} 
                          style={{ width: `${grade.percentage}%` }}
                        ></div>
                      </div>
                      {grade.feedback && (
                        <p className="text-xs text-gray-600 mt-2 p-2 bg-gray-50 rounded">
                          Feedback: {grade.feedback}
                        </p>
                      )}
                    </div>
                  ))}
                  
                  {/* Overall Grade for the Week */}
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Week {selectedWeek} Average</span>
                      <span className="text-xl font-bold text-blue-700">
                        {Math.round(grades.filter(g => g.week === selectedWeek).reduce((acc, g) => acc + g.percentage, 0) / 
                          (grades.filter(g => g.week === selectedWeek).length || 1))}%
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${grades.filter(g => g.week === selectedWeek).reduce((acc, g) => acc + g.percentage, 0) / 
                          (grades.filter(g => g.week === selectedWeek).length || 1)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile overlays */}
        {sidebarOpen && deviceType === 'mobile' && (
          <div 
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
      </div>

      {/* Achievements Panel */}
      {showAchievements && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: colors.primary }}>Your Achievements</h3>
              <button
                onClick={() => setShowAchievements(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="border rounded-lg p-3 text-center">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Zap size={20} className="text-yellow-600" />
                  </div>
                  <div className="text-xs font-medium">{streak} Day Streak</div>
                  <div className="text-xs text-gray-500">Keep it up!</div>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Award size={20} className="text-blue-600" />
                  </div>
                  <div className="text-xs font-medium">{points} Points</div>
                  <div className="text-xs text-gray-500">Total earned</div>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BookOpen size={20} className="text-green-600" />
                  </div>
                  <div className="text-xs font-medium">{Object.values(progress).filter(Boolean).length} Lessons</div>
                  <div className="text-xs text-gray-500">Completed</div>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy size={20} className="text-purple-600" />
                  </div>
                  <div className="text-xs font-medium">Beginner</div>
                  <div className="text-xs text-gray-500">Level 1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Glossary Panel */}
      {showGlossary && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: colors.primary }}>IT Glossary</h3>
              <button
                onClick={() => setShowGlossary(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Search terms..."
                className="w-full p-2 border rounded-lg mb-4 text-sm"
              />
              <div className="space-y-3">
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">CPU</h4>
                  <p className="text-xs text-gray-600">Central Processing Unit - The brain of the computer that executes instructions</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">RAM</h4>
                  <p className="text-xs text-gray-600">Random Access Memory - Temporary storage for running programs</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">SSD</h4>
                  <p className="text-xs text-gray-600">Solid State Drive - Fast permanent storage using flash memory</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">HDD</h4>
                  <p className="text-xs text-gray-600">Hard Disk Drive - Mechanical permanent storage using magnetic platters</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">IP Address</h4>
                  <p className="text-xs text-gray-600">Internet Protocol address - Unique identifier for devices on a network</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">DNS</h4>
                  <p className="text-xs text-gray-600">Domain Name System - Converts domain names to IP addresses</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">HTTP</h4>
                  <p className="text-xs text-gray-600">Hypertext Transfer Protocol - Protocol for web communication</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">HTTPS</h4>
                  <p className="text-xs text-gray-600">HTTP Secure - Encrypted web communication</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">VPN</h4>
                  <p className="text-xs text-gray-600">Virtual Private Network - Encrypted tunnel for secure communication</p>
                </div>
                <div className="border-b pb-2">
                  <h4 className="font-medium text-sm">Firewall</h4>
                  <p className="text-xs text-gray-600">Security system that monitors and controls network traffic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Study Tips Panel */}
      {showStudyTips && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-4 border-b sticky top-0 bg-white flex items-center justify-between">
              <h3 className="font-bold text-lg" style={{ color: colors.primary }}>Study Tips</h3>
              <button
                onClick={() => setShowStudyTips(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lightbulb size={20} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Active Recall</h4>
                    <p className="text-xs text-gray-600">Test yourself regularly instead of just re-reading notes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Timer size={20} className="text-blue-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Pomodoro Technique</h4>
                    <p className="text-xs text-gray-600">Study for 25 minutes, then take a 5-minute break</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Brain size={20} className="text-purple-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Spaced Repetition</h4>
                    <p className="text-xs text-gray-600">Review material at increasing intervals over time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PenTool size={20} className="text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Teach Others</h4>
                    <p className="text-xs text-gray-600">Explaining concepts to others reinforces your understanding</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Coffee size={20} className="text-brown-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Take Breaks</h4>
                    <p className="text-xs text-gray-600">Regular breaks improve focus and retention</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}