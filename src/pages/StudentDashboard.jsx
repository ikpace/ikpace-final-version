import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { dashboardService } from '../services/dashboardService';
import {
  BookOpen, TrendingUp, Award, Clock, Flame, Target,
  Sparkles, Bell, Brain, Zap, CheckCircle, XCircle,
  HelpCircle, ChevronRight, Play, Pause, RotateCcw,
  Star, Users, MessageCircle, Gift, Rocket, Crown,
  Medal, Gem, Calendar, BarChart3, Activity,
  Coffee, Headphones, Download, Share2, ThumbsUp,
  AlertCircle, Info, Shield, Globe, Heart, User,
  CreditCard, DollarSign, ShoppingBag, Receipt,
  Wallet, TrendingUp as Trending, Video,
  BookMarked, Clock3, CalendarDays,
  MessageSquare, ThumbsUp as ThumbsUpIcon,
  Settings, LogOut, Menu, X
} from 'lucide-react';

export default function StudentDashboard() {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();
  
  // State Management
  const [loading, setLoading] = useState(true);
  const [enrollments, setEnrollments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [dailyQuiz, setDailyQuiz] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalSpent: 0,
    certificatesCount: 0,
    learningStreak: 0,
    totalLearningTime: 0,
    avgQuizScore: 0,
    achievements: 0
  });

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
    teal: "#319795"
  };

  // Quiz Questions
  const quizQuestions = dailyQuiz?.questions || [
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
      explanation: "React is a JavaScript library for building user interfaces.",
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
      explanation: "CSS is used to style and layout web pages.",
      category: "Web Development"
    }
  ];

  // Fetch all dashboard data
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
    
    // Set up real-time subscriptions
    const notificationSub = dashboardService.subscribeToNotifications(user.id, (newNotification) => {
      setNotifications(prev => [newNotification, ...prev]);
    });

    const progressSub = dashboardService.subscribeToProgress(user.id, (progressUpdate) => {
      // Update enrollment progress in real-time
      setEnrollments(prev => prev.map(e => 
        e.id === progressUpdate.enrollment_id 
          ? { ...e, progress_percentage: progressUpdate.progress_percentage }
          : e
      ));
    });

    return () => {
      notificationSub.unsubscribe();
      progressSub.unsubscribe();
    };
  }, [user]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch all data in parallel
      const [
        enrollmentsData,
        transactionsData,
        certificatesData,
        notificationsData,
        recommendedData,
        userStats,
        dailyQuizData
      ] = await Promise.all([
        dashboardService.getUserEnrollments(user.id),
        dashboardService.getUserTransactions(user.id),
        dashboardService.getUserCertificates(user.id),
        dashboardService.getUserNotifications(user.id),
        dashboardService.getRecommendedCourses(user.id, profile?.interests || []),
        dashboardService.getUserStats(user.id),
        dashboardService.getDailyQuiz()
      ]);

      setEnrollments(enrollmentsData || []);
      setTransactions(transactionsData || []);
      setCertificates(certificatesData || []);
      setNotifications(notificationsData || []);
      setRecommendedCourses(recommendedData || []);
      setDailyQuiz(dailyQuizData);
      setStats(userStats);

      // Generate recent activity
      const activity = [];
      
      // Add recent enrollments
      enrollmentsData?.slice(0, 2).forEach(e => {
        activity.push({
          id: `enroll-${e.id}`,
          type: 'enrollment',
          message: `Enrolled in ${e.courses?.title}`,
          time: new Date(e.enrolled_at).toLocaleDateString(),
          icon: <BookOpen size={16} />
        });
      });

      // Add recent transactions
      transactionsData?.slice(0, 2).forEach(t => {
        if (t.status === 'success') {
          activity.push({
            id: `payment-${t.id}`,
            type: 'payment',
            message: `Payment of $${t.amount} confirmed`,
            time: new Date(t.created_at).toLocaleDateString(),
            icon: <CreditCard size={16} />
          });
        }
      });

      // Add recent certificates
      certificatesData?.slice(0, 2).forEach(c => {
        activity.push({
          id: `cert-${c.id}`,
          type: 'certificate',
          message: `Earned certificate in ${c.courses?.title}`,
          time: new Date(c.issued_at).toLocaleDateString(),
          icon: <Award size={16} />
        });
      });

      setRecentActivity(activity.sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 5));

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  // Quiz Handlers
  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    if (index === quizQuestions[currentQuestion].correct) {
      setQuizScore(prev => prev + 1);
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      setQuizCompleted(true);
      setShowResult(true);
      
      // Save quiz result
      dashboardService.saveQuizResult(user.id, dailyQuiz?.id, quizScore, quizQuestions);
      dashboardService.logActivity(user.id, 'quiz_completed', { score: quizScore, total: quizQuestions.length });
    }
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (showQuiz && !quizCompleted && timeLeft > 0 && selectedAnswer === null) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQuiz, quizCompleted, timeLeft, selectedAnswer, currentQuestion]);

  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl" style={{ color: colors.primary }}>iKPACE</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/courses" className="text-gray-600 hover:text-orange-500 transition-colors">
                Browse Courses
              </Link>
              <Link to="/community" className="text-gray-600 hover:text-orange-500 transition-colors">
                Community
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-orange-500 transition-colors">
                Support
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: colors.primary }}>
                    <User size={16} />
                  </div>
                  <span className="hidden md:block text-sm font-medium">{profile?.full_name?.split(' ')[0] || 'User'}</span>
                </button>

                {showMobileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </Link>
                    <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8 p-6 rounded-2xl text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="absolute top-0 right-0 opacity-10">
            <Sparkles size={200} />
          </div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {getGreeting()}, {profile?.full_name?.split(' ')[0] || 'Learner'}!
            </h1>
            <p className="text-lg opacity-90 mb-4">
              {stats.learningStreak > 0 
                ? `🔥 ${stats.learningStreak} day streak! Keep up the great work!` 
                : "Ready to continue your learning journey?"}
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                Student ID: {profile?.student_id || user?.id?.slice(0, 8)}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {stats.totalCourses} Courses Enrolled
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                {stats.certificatesCount} Certificates
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg" style={{ background: colors.primary + '10' }}>
                <BookOpen size={18} style={{ color: colors.primary }} />
              </div>
              <span className="text-xl font-bold" style={{ color: colors.primary }}>{stats.totalCourses}</span>
            </div>
            <p className="text-xs text-gray-600">Enrolled</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg" style={{ background: colors.success + '10' }}>
                <CheckCircle size={18} style={{ color: colors.success }} />
              </div>
              <span className="text-xl font-bold" style={{ color: colors.success }}>{stats.completedCourses}</span>
            </div>
            <p className="text-xs text-gray-600">Completed</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg" style={{ background: colors.secondary + '10' }}>
                <Flame size={18} style={{ color: colors.secondary }} />
              </div>
              <span className="text-xl font-bold" style={{ color: colors.secondary }}>{stats.learningStreak}</span>
            </div>
            <p className="text-xs text-gray-600">Day Streak</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg" style={{ background: colors.warning + '10' }}>
                <Clock size={18} style={{ color: colors.warning }} />
              </div>
              <span className="text-xl font-bold" style={{ color: colors.warning }}>{formatTime(stats.totalLearningTime)}</span>
            </div>
            <p className="text-xs text-gray-600">Learning Time</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg" style={{ background: colors.purple + '10' }}>
                <DollarSign size={18} style={{ color: colors.purple }} />
              </div>
              <span className="text-xl font-bold" style={{ color: colors.purple }}>${stats.totalSpent.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-600">Total Spent</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg" style={{ background: colors.teal + '10' }}>
                <Award size={18} style={{ color: colors.teal }} />
              </div>
              <span className="text-xl font-bold" style={{ color: colors.teal }}>{stats.achievements}</span>
            </div>
            <p className="text-xs text-gray-600">Achievements</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-1 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'payments', label: 'Payments', icon: CreditCard },
            { id: 'certificates', label: 'Certificates', icon: Award },
            { id: 'quiz', label: 'Daily Quiz', icon: Brain },
            { id: 'activity', label: 'Activity', icon: Activity }
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

        {/* Tab Content */}
        <div className="space-y-6">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - My Courses */}
              <div className="lg:col-span-2 space-y-6">
                {/* Continue Learning */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Play size={18} />
                    Continue Learning
                  </h3>
                  {enrollments.filter(e => !e.completed).length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-gray-500 mb-3">No courses in progress</p>
                      <Link
                        to="/courses"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white text-sm font-medium"
                        style={{ background: colors.primary }}
                      >
                        Browse Courses <ChevronRight size={14} />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enrollments.filter(e => !e.completed).slice(0, 2).map((enrollment) => (
                        <Link
                          key={enrollment.id}
                          to={`/learn/${enrollment.course_id}`}
                          className="block p-4 rounded-xl hover:bg-gray-50 transition-all border border-gray-100"
                        >
                          <div className="flex gap-4">
                            <img
                              src={enrollment.courses?.thumbnail_url || 'https://via.placeholder.com/80'}
                              alt={enrollment.courses?.title}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-bold text-gray-900 mb-1">{enrollment.courses?.title}</h4>
                              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {enrollment.courses?.duration_weeks} weeks
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users size={12} />
                                  {enrollment.courses?.level}
                                </span>
                              </div>
                              <div className="mt-2">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Progress</span>
                                  <span className="font-bold" style={{ color: colors.primary }}>
                                    {Math.round(enrollment.progress_percentage || 0)}%
                                  </span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full transition-all"
                                    style={{ 
                                      width: `${enrollment.progress_percentage || 0}%`,
                                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Activity size={18} />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50">
                        <div className={`p-2 rounded-lg ${
                          activity.type === 'payment' ? 'bg-green-100' :
                          activity.type === 'certificate' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-700">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Notifications */}
              <div className="space-y-6">
                {/* Daily Quiz Card */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Brain size={18} />
                    Daily Quiz
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Test your knowledge and earn streak points</p>
                  <button
                    onClick={handleStartQuiz}
                    className="w-full py-2 rounded-xl text-white font-medium hover:scale-105 transition-all"
                    style={{ background: colors.secondary }}
                  >
                    Start Quiz
                  </button>
                </div>

                {/* Notifications */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Bell size={18} />
                    Notifications
                    {notifications.filter(n => !n.read).length > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                        {notifications.filter(n => !n.read).length}
                      </span>
                    )}
                  </h3>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-center text-gray-500 py-4">No notifications</p>
                    ) : (
                      notifications.map((notif) => (
                        <div key={notif.id} className={`p-3 rounded-lg ${!notif.read ? 'bg-orange-50' : 'hover:bg-gray-50'}`}>
                          <p className="text-sm text-gray-700">{notif.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(notif.created_at).toLocaleDateString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Recommended Courses */}
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Sparkles size={18} />
                    Recommended
                  </h3>
                  <div className="space-y-3">
                    {recommendedCourses.map((course) => (
                      <Link
                        key={course.id}
                        to={`/course/${course.slug}`}
                        className="block p-3 rounded-lg hover:bg-gray-50 border border-gray-100"
                      >
                        <p className="font-bold text-sm text-gray-900 mb-1">{course.title}</p>
                        <p className="text-xs text-gray-500 mb-2">{course.category}</p>
                        <span className="text-xs font-medium" style={{ color: colors.secondary }}>
                          View Course →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COURSES TAB */}
          {activeTab === 'courses' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
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
                          src={enrollment.courses?.thumbnail_url || 'https://via.placeholder.com/80'}
                          alt={enrollment.courses?.title}
                          className="w-20 h-20 object-cover rounded-lg"
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
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
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

          {/* PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold" style={{ color: colors.primary }}>Payment History</h3>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold" style={{ color: colors.primary }}>${stats.totalSpent.toFixed(2)}</p>
                </div>
              </div>
              {transactions.length === 0 ? (
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
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4 font-mono text-sm">{transaction.reference || transaction.id.slice(0, 8)}</td>
                          <td className="py-3 px-4 font-bold">${parseFloat(transaction.amount).toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(transaction.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
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
                            <button className="text-xs font-medium px-3 py-1 rounded-full border flex items-center gap-1">
                              <Download size={12} /> Download
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

          {/* QUIZ TAB */}
          {activeTab === 'quiz' && !showQuiz && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center py-8">
                <Brain size={64} className="mx-auto mb-4" style={{ color: colors.secondary }} />
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Daily Quiz Challenge</h3>
                <p className="text-gray-600 mb-6">Test your knowledge with 5 questions</p>
                <button
                  onClick={handleStartQuiz}
                  className="px-8 py-3 rounded-full text-white font-medium hover:scale-105 transition-all"
                  style={{ background: colors.secondary }}
                >
                  Start Quiz
                </button>
              </div>
            </div>
          )}

          {/* QUIZ ACTIVE */}
          {activeTab === 'quiz' && showQuiz && !quizCompleted && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span style={{ color: colors.primary }}>Question {currentQuestion + 1}/{quizQuestions.length}</span>
                  <div className="flex items-center gap-2">
                    <Flame size={16} className={streak > 0 ? 'text-orange-500' : 'text-gray-400'} />
                    <span>Streak: {streak}</span>
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
                      background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-gray-500" />
                    <span className={timeLeft < 10 ? 'text-red-500 font-bold' : ''}>{timeLeft}s</span>
                  </div>
                  <span className="text-sm text-gray-500">Score: {quizScore}/{quizQuestions.length}</span>
                </div>
                <div className="p-6 rounded-xl bg-gray-50">
                  <h4 className="text-lg font-bold mb-4">{quizQuestions[currentQuestion].question}</h4>
                  <div className="space-y-3">
                    {quizQuestions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        disabled={selectedAnswer !== null}
                        className={`w-full text-left p-4 rounded-xl transition-all ${
                          selectedAnswer === index
                            ? index === quizQuestions[currentQuestion].correct
                              ? 'bg-green-100 border-2 border-green-500'
                              : 'bg-red-100 border-2 border-red-500'
                            : 'bg-white border-2 border-gray-200 hover:border-orange-500'
                        }`}
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
                {selectedAnswer !== null && (
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <div className="flex gap-3">
                      <Info size={18} className="text-blue-600" />
                      <div>
                        <p className="font-bold text-blue-800 mb-1">Explanation:</p>
                        <p className="text-sm text-blue-700">{quizQuestions[currentQuestion].explanation}</p>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="w-full py-3 rounded-xl text-white font-medium transition-all disabled:opacity-50"
                  style={{ background: colors.primary }}
                >
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </button>
              </div>
            </div>
          )}

          {/* QUIZ RESULTS */}
          {activeTab === 'quiz' && quizCompleted && showResult && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="text-center py-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '20' }}>
                  <Award size={48} style={{ color: colors.secondary }} />
                </div>
                <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Quiz Completed!</h3>
                <p className="text-gray-600 mb-6">You scored {quizScore} out of {quizQuestions.length}</p>
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="60" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                    <circle
                      cx="64"
                      cy="64"
                      r="60"
                      stroke={colors.secondary}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={377}
                      strokeDashoffset={377 - (377 * quizScore) / quizQuestions.length}
                      style={{ transition: 'stroke-dashoffset 0.5s' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold" style={{ color: colors.primary }}>
                      {Math.round((quizScore / quizQuestions.length) * 100)}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowQuiz(false);
                    setQuizCompleted(false);
                    setShowResult(false);
                  }}
                  className="px-6 py-2 rounded-full text-white font-medium"
                  style={{ background: colors.secondary }}
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}

          {/* ACTIVITY TAB */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="text-xl font-bold mb-6" style={{ color: colors.primary }}>Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100">
                    <div className={`p-3 rounded-xl ${
                      activity.type === 'payment' ? 'bg-green-100' :
                      activity.type === 'certificate' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}