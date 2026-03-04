import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import { 
  Users, BookOpen, CreditCard, TrendingUp, Activity, 
  Calendar, DollarSign, Award, Star, Clock, CheckCircle,
  XCircle, AlertCircle, Download, RefreshCw, Filter,
  BarChart, PieChart, LineChart, Mail, Phone, MapPin,
  Shield, Settings, LogOut, Menu, X, ChevronRight,
  Home, UserCheck, UserX, Video, FileText, MessageCircle,
  Bell, Globe, Smartphone, Tablet, Laptop, Monitor,
  Sun, Moon, Zap, Target, Flag, Heart, Gift, Crown,
  Medal, Gem, Rocket, Sparkles, Brain, Code, Coffee,
  Wallet, Banknote, Receipt, ShoppingCart, Truck,
  Package, Box, Archive, Layers, Grid, List,
  DownloadCloud, UploadCloud, RefreshCcw, Eye, EyeOff,
  Lock, Unlock, Key, Shield as ShieldIcon, Bell as BellIcon,
  MessageSquare, ThumbsUp, ThumbsDown, Share2, Link2
} from 'lucide-react'

export default function AdminDashboard() {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dateRange, setDateRange] = useState('week')
  
  // Stats
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersToday: 0,
    totalCourses: 0,
    totalEnrollments: 0,
    completedCourses: 0,
    totalRevenue: 0,
    revenueToday: 0,
    averageRating: 0,
    totalCertificates: 0,
    pendingIssues: 0,
    serverUptime: '99.9%'
  })

  // Data
  const [recentUsers, setRecentUsers] = useState([])
  const [recentPayments, setRecentPayments] = useState([])
  const [popularCourses, setPopularCourses] = useState([])
  const [userGrowth, setUserGrowth] = useState([])
  const [revenueData, setRevenueData] = useState([])
  const [activityLog, setActivityLog] = useState([])
  const [alerts, setAlerts] = useState([])

  // Colors
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    danger: "#DC2626",
    info: "#3B82F6",
    lightGray: "#F3F4F6",
    white: "#FFFFFF",
    purple: "#8B5CF6",
    pink: "#EC4899",
    teal: "#14B8A6"
  }

  // Check admin status on component mount
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        // Not logged in - redirect to login
        navigate('/login')
        return
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single()

        if (error || data?.role !== 'admin') {
          // Not an admin - redirect to dashboard
          navigate('/dashboard')
          return
        }

        setIsAdmin(true)
        // Only fetch data if user is admin
        fetchDashboardData()
      } catch (error) {
        console.error('Error checking admin status:', error)
        navigate('/dashboard')
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [user, navigate, dateRange])

  const fetchDashboardData = async () => {
    setLoading(true)
    try {
      // Fetch total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

      // Fetch users today
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const { count: newUsersToday } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', today.toISOString())

      // Fetch active users (logged in last 24h)
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gte('last_sign_in', yesterday.toISOString())

      // Fetch total courses
      const { count: totalCourses } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true })

      // Fetch total enrollments
      const { count: totalEnrollments } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })

      // Fetch completed courses
      const { count: completedCourses } = await supabase
        .from('enrollments')
        .select('*', { count: 'exact', head: true })
        .eq('progress', 100)

      // Fetch total revenue
      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'success')

      const totalRevenue = payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

      // Fetch revenue today
      const { data: paymentsToday } = await supabase
        .from('payments')
        .select('amount')
        .eq('status', 'success')
        .gte('created_at', today.toISOString())

      const revenueToday = paymentsToday?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0

      // Fetch total certificates
      const { count: totalCertificates } = await supabase
        .from('certificates')
        .select('*', { count: 'exact', head: true })

      // Fetch recent users
      const { data: recentUsersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentUsers(recentUsersData || [])

      // Fetch recent payments
      const { data: recentPaymentsData } = await supabase
        .from('payments')
        .select('*, profiles(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(5)

      setRecentPayments(recentPaymentsData || [])

      // Fetch popular courses
      const { data: popularCoursesData } = await supabase
        .from('courses')
        .select('*, enrollments(count)')
        .order('enrollment_count', { ascending: false })
        .limit(5)

      setPopularCourses(popularCoursesData || [])

      // Set stats
      setStats({
        totalUsers: totalUsers || 0,
        activeUsers: activeUsers || 0,
        newUsersToday: newUsersToday || 0,
        totalCourses: totalCourses || 0,
        totalEnrollments: totalEnrollments || 0,
        completedCourses: completedCourses || 0,
        totalRevenue,
        revenueToday,
        averageRating: 4.8,
        totalCertificates: totalCertificates || 0,
        pendingIssues: 3,
        serverUptime: '99.9%'
      })

      // Generate sample data for charts
      generateChartData()
      
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const generateChartData = () => {
    // User growth data (last 7 days)
    const growth = []
    const revenue = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      growth.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        users: Math.floor(Math.random() * 10) + 5,
        revenue: Math.floor(Math.random() * 500) + 200
      })
    }
    setUserGrowth(growth)
    setRevenueData(growth)

    // Activity log
    setActivityLog([
      { id: 1, action: 'New user registered', user: 'john@example.com', time: '5 min ago', type: 'user' },
      { id: 2, action: 'Course purchased', user: 'sarah@example.com', time: '15 min ago', type: 'payment' },
      { id: 3, action: 'Certificate issued', user: 'mike@example.com', time: '1 hour ago', type: 'certificate' },
      { id: 4, action: 'Course completed', user: 'emma@example.com', time: '2 hours ago', type: 'course' },
      { id: 5, action: 'New enrollment', user: 'david@example.com', time: '3 hours ago', type: 'enrollment' }
    ])

    // Alerts
    setAlerts([
      { id: 1, type: 'warning', message: 'Server load high (85%)', time: '10 min ago' },
      { id: 2, type: 'info', message: 'New course pending approval', time: '1 hour ago' },
      { id: 3, type: 'success', message: 'Backup completed successfully', time: '2 hours ago' }
    ])
  }

  const formatCurrency = (amount) => {
    return `GHS ${amount.toLocaleString()}`
  }

  // Show loading while checking admin status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent mx-auto mb-4" style={{ borderColor: colors.primary, borderTopColor: 'transparent' }}></div>
          <p className="text-gray-600">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  // If not admin, don't render anything (redirect will happen)
  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-lg"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-40 w-64 bg-white shadow-xl`}>
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold" style={{ color: colors.primary }}>iKPACE Admin</h1>
            <p className="text-xs text-gray-500 mt-1">v1.0.0</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {[
                { id: 'overview', icon: Home, label: 'Overview' },
                { id: 'users', icon: Users, label: 'Users' },
                { id: 'courses', icon: BookOpen, label: 'Courses' },
                { id: 'payments', icon: CreditCard, label: 'Payments' },
                { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
                { id: 'certificates', icon: Award, label: 'Certificates' },
                { id: 'reports', icon: BarChart, label: 'Reports' },
                { id: 'settings', icon: Settings, label: 'Settings' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={activeTab === item.id ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
                >
                  <item.icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                {profile?.full_name?.[0] || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{profile?.full_name || 'Admin'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 capitalize">{activeTab} Dashboard</h2>
            
            <div className="flex items-center gap-4">
              {/* Date Range Selector */}
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                style={{ focusRingColor: colors.primary }}
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>

              {/* Refresh Button */}
              <button
                onClick={fetchDashboardData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw size={20} className="text-gray-600" />
              </button>

              {/* Logout */}
              <button
                onClick={() => supabase.auth.signOut()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Total Users"
                  value={stats.totalUsers}
                  icon={Users}
                  color={colors.primary}
                  trend="+12%"
                  subtitle={`${stats.newUsersToday} new today`}
                />
                <StatCard
                  title="Active Users"
                  value={stats.activeUsers}
                  icon={UserCheck}
                  color={colors.success}
                  trend="+5%"
                  subtitle="Last 24 hours"
                />
                <StatCard
                  title="Total Revenue"
                  value={formatCurrency(stats.totalRevenue)}
                  icon={DollarSign}
                  color={colors.secondary}
                  trend="+8%"
                  subtitle={formatCurrency(stats.revenueToday) + ' today'}
                />
                <StatCard
                  title="Enrollments"
                  value={stats.totalEnrollments}
                  icon={BookOpen}
                  color={colors.purple}
                  trend="+15%"
                  subtitle={`${stats.completedCourses} completed`}
                />
              </div>

              {/* Charts */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp size={20} style={{ color: colors.primary }} />
                    User Growth
                  </h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {userGrowth.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-blue-100 rounded-t-lg transition-all hover:bg-blue-200"
                          style={{ 
                            height: `${(day.users / 20) * 100}%`,
                            background: `linear-gradient(to top, ${colors.primary}, ${colors.accent})`
                          }}
                        />
                        <span className="text-xs text-gray-500 mt-2">{day.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Revenue Chart */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign size={20} style={{ color: colors.secondary }} />
                    Revenue
                  </h3>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {revenueData.map((day, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-orange-100 rounded-t-lg transition-all hover:bg-orange-200"
                          style={{ 
                            height: `${(day.revenue / 800) * 100}%`,
                            background: `linear-gradient(to top, ${colors.secondary}, ${colors.orangeShade})`
                          }}
                        />
                        <span className="text-xs text-gray-500 mt-2">{day.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tables */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Users size={20} style={{ color: colors.primary }} />
                      Recent Users
                    </span>
                    <Link to="/admin/users" className="text-sm text-blue-600 hover:underline">View All</Link>
                  </h3>
                  <div className="space-y-3">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-sm font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                            {user.full_name?.[0] || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.full_name || 'New User'}</p>
                            <p className="text-xs text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{new Date(user.created_at).toLocaleDateString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Payments */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CreditCard size={20} style={{ color: colors.secondary }} />
                      Recent Payments
                    </span>
                    <Link to="/admin/payments" className="text-sm text-blue-600 hover:underline">View All</Link>
                  </h3>
                  <div className="space-y-3">
                    {recentPayments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{payment.profiles?.full_name || 'User'}</p>
                          <p className="text-xs text-gray-500">{payment.reference?.slice(0, 8)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold" style={{ color: colors.primary }}>GHS {payment.amount}</p>
                          <p className="text-xs text-gray-400">{new Date(payment.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Popular Courses */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <BookOpen size={20} style={{ color: colors.purple }} />
                    Popular Courses
                  </span>
                  <Link to="/admin/courses" className="text-sm text-blue-600 hover:underline">Manage Courses</Link>
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {popularCourses.map((course) => (
                    <div key={course.id} className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{course.title}</h4>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Enrollments:</span>
                        <span className="font-bold" style={{ color: colors.primary }}>{course.enrollments?.length || 0}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-1">
                        <span className="text-gray-500">Price:</span>
                        <span className="font-bold" style={{ color: colors.secondary }}>GHS {course.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Log & Alerts */}
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Activity Log */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity size={20} style={{ color: colors.info }} />
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    {activityLog.map((log) => (
                      <div key={log.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full`} style={{ background: colors[log.type === 'payment' ? 'secondary' : log.type === 'user' ? 'primary' : 'success'] }} />
                        <p className="text-sm text-gray-600 flex-1">{log.action}</p>
                        <p className="text-xs text-gray-400">{log.time}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alerts */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Bell size={20} style={{ color: colors.warning }} />
                    Alerts ({alerts.length})
                  </h3>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className={`p-3 rounded-lg ${
                        alert.type === 'warning' ? 'bg-yellow-50' :
                        alert.type === 'success' ? 'bg-green-50' : 'bg-blue-50'
                      }`}>
                        <p className="text-sm font-medium" style={{ 
                          color: alert.type === 'warning' ? colors.warning :
                                 alert.type === 'success' ? colors.success : colors.info
                        }}>{alert.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs - Add similar sections for users, courses, payments, etc. */}
        </main>
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, icon: Icon, color, trend, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <div className="p-2 rounded-lg" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
      <div className="flex items-center justify-between">
        {trend && <span className="text-xs text-green-600">{trend}</span>}
        {subtitle && <span className="text-xs text-gray-400">{subtitle}</span>}
      </div>
    </div>
  )
}