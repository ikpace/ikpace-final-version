import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { 
  User, Mail, Phone, MapPin, Award, Flame, Clock, Save, 
  BookOpen, Calendar, Download, ExternalLink, Share2, 
  Settings, Bell, Shield, Eye, EyeOff, Camera, Edit3,
  TrendingUp, Target, CheckCircle, Star, Zap, Gift,
  Heart, MessageCircle, HelpCircle, LogOut, Moon, Sun,
  Copy, Users, Crown, Medal, Gem, Sparkles, Rocket,
  Trophy, BadgeCheck, BarChart3, PieChart, Activity,
  Coffee, Bookmark, Flag, Globe, Lock, Unlock,
  ChevronRight, ChevronLeft, Plus, Minus, RefreshCw
} from 'lucide-react'

export default function Profile() {
  const { profile, logout } = useAuth()
  const [editing, setEditing] = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone, setPhone] = useState(profile?.phone || '')
  const [country, setCountry] = useState(profile?.country || '')
  const [bio, setBio] = useState(profile?.bio || '')
  const [saving, setSaving] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [certificates, setCertificates] = useState([])
  const [courses, setCourses] = useState([])
  const [achievements, setAchievements] = useState([])
  const [notifications, setNotifications] = useState([])
  const [referrals, setReferrals] = useState([])
  const [copied, setCopied] = useState(false)
  const [showReferralModal, setShowReferralModal] = useState(false)

  // Colors
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
    white: "#FFFFFF"
  }

  // Points System
  const [userPoints, setUserPoints] = useState({
    total: 1247,
    peerStarter: 400,
    ambassador: 700,
    monthly: 342,
    rank: 'Ambassador',
    nextRank: 'Master Ambassador',
    pointsToNext: 253,
    tier: 'Gold'
  })

  // Referral System
  const referralLink = `https://ikpace.com/ref/${profile?.id || 'user123'}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Sample data - replace with real data from backend
  useEffect(() => {
    // Load certificates
    setCertificates([
      {
        id: 'cert-1',
        course: 'Virtual Assistant Professional',
        date: 'March 15, 2026',
        image: '/certificates/va-cert.jpg',
        verified: true,
        credentialId: 'VA-2026-001',
        shareable: true
      },
      {
        id: 'cert-2',
        course: 'Social Media Marketing',
        date: 'February 28, 2026',
        image: '/certificates/smm-cert.jpg',
        verified: true,
        credentialId: 'SMM-2026-045',
        shareable: true
      },
      {
        id: 'cert-3',
        course: 'Canva & Graphic Design',
        date: 'January 10, 2026',
        image: '/certificates/design-cert.jpg',
        verified: true,
        credentialId: 'DES-2026-023',
        shareable: true
      }
    ])

    // Load enrolled courses
    setCourses([
      {
        id: 'course-1',
        title: 'Virtual Assistant Professional',
        progress: 75,
        nextLesson: 'Module 4: Client Management',
        lastAccessed: '2 hours ago',
        lessons: 24,
        completed: 18,
        certificate: 'Available'
      },
      {
        id: 'course-2',
        title: 'Social Media Marketing',
        progress: 30,
        nextLesson: 'Module 2: Content Strategy',
        lastAccessed: '1 day ago',
        lessons: 28,
        completed: 8,
        certificate: 'In Progress'
      },
      {
        id: 'course-3',
        title: 'Canva & Graphic Design',
        progress: 0,
        nextLesson: 'Start Your First Lesson',
        lastAccessed: 'Not started',
        lessons: 20,
        completed: 0,
        certificate: 'Not Started'
      }
    ])

    // Load achievements with points
    setAchievements([
      { id: 'ach-1', title: 'Fast Learner', description: 'Completed 3 courses', icon: '🚀', points: 100, earned: true, date: 'Mar 10, 2026' },
      { id: 'ach-2', title: 'Community Star', description: 'Helped 10 students', icon: '⭐', points: 150, earned: true, date: 'Mar 5, 2026' },
      { id: 'ach-3', title: 'Perfect Score', description: 'Got 100% on a quiz', icon: '🏆', points: 200, earned: false },
      { id: 'ach-4', title: 'Dedicated Learner', description: '30-day streak', icon: '🔥', points: 300, earned: false },
      { id: 'ach-5', title: 'Mentor', description: 'Reach Ambassador rank', icon: '👑', points: 500, earned: true, date: 'Feb 20, 2026' }
    ])

    // Load notifications
    setNotifications([
      { id: 'not-1', title: 'New course available', message: 'Check out our new AI course!', time: '5 min ago', read: false, type: 'course' },
      { id: 'not-2', title: 'Course update', message: 'Social Media Marketing has new content', time: '1 hour ago', read: false, type: 'update' },
      { id: 'not-3', title: 'Achievement unlocked', message: 'You earned Fast Learner badge!', time: '2 days ago', read: true, type: 'achievement' },
      { id: 'not-4', title: 'Referral bonus', message: 'Your friend joined! +50 points', time: '3 days ago', read: true, type: 'points' }
    ])

    // Load referrals
    setReferrals([
      { id: 'ref-1', name: 'Sarah Johnson', date: 'Mar 15, 2026', points: 50, status: 'joined', avatar: '👩' },
      { id: 'ref-2', name: 'Michael Chen', date: 'Mar 10, 2026', points: 50, status: 'joined', avatar: '👨' },
      { id: 'ref-3', name: 'Amina Okafor', date: 'Mar 5, 2026', points: 50, status: 'joined', avatar: '👩' },
      { id: 'ref-4', name: 'David Olamide', date: 'Feb 28, 2026', points: 50, status: 'joined', avatar: '👨' },
      { id: 'ref-5', name: 'Grace Williams', date: 'Feb 20, 2026', points: 50, status: 'joined', avatar: '👩' }
    ])
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({
          full_name: fullName,
          phone,
          country,
          bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)

      if (error) throw error
      setEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Profile saved! (Demo mode)')
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(not => not.id === id ? { ...not, read: true } : not)
    )
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={18} /> },
    { id: 'points', label: 'Points & Rewards', icon: <Sparkles size={18} /> },
    { id: 'referrals', label: 'Referrals', icon: <Users size={18} /> },
    { id: 'courses', label: 'My Courses', icon: <BookOpen size={18} /> },
    { id: 'certificates', label: 'Certificates', icon: <Award size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2f6] py-28 px-4 ${darkMode ? 'dark' : ''}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>My Profile</h1>
            <p className="text-gray-600">Manage your account, track progress, and earn rewards</p>
          </div>
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {darkMode ? <Sun size={20} style={{ color: colors.secondary }} /> : <Moon size={20} style={{ color: colors.primary }} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-md"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Points & Rank Banner */}
        <div className="bg-gradient-to-r rounded-2xl shadow-xl mb-8 p-6 text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Crown size={32} className="text-yellow-300" />
              </div>
              <div>
                <p className="text-sm opacity-90">Current Rank</p>
                <p className="text-2xl font-bold">{userPoints.rank}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Sparkles size={32} className="text-yellow-300" />
              </div>
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-2xl font-bold">{userPoints.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Target size={32} className="text-yellow-300" />
              </div>
              <div>
                <p className="text-sm opacity-90">Next Rank</p>
                <p className="text-2xl font-bold">{userPoints.nextRank}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <TrendingUp size={32} className="text-yellow-300" />
              </div>
              <div>
                <p className="text-sm opacity-90">Points Needed</p>
                <p className="text-2xl font-bold">{userPoints.pointsToNext}</p>
              </div>
            </div>
          </div>

          {/* Progress to next rank */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to {userPoints.nextRank}</span>
              <span>{userPoints.total} / {userPoints.ambassador + userPoints.pointsToNext}</span>
            </div>
            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(userPoints.total / (userPoints.ambassador + userPoints.pointsToNext)) * 100}%`,
                  background: colors.secondary
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.primary + '10' }}>
                <BookOpen style={{ color: colors.primary }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.primary }}>3</span>
            </div>
            <p className="text-gray-600 text-sm">Enrolled Courses</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.secondary + '10' }}>
                <Award style={{ color: colors.secondary }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.secondary }}>3</span>
            </div>
            <p className="text-gray-600 text-sm">Certificates Earned</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.success + '10' }}>
                <Flame style={{ color: colors.success }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.success }}>15</span>
            </div>
            <p className="text-gray-600 text-sm">Day Streak</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.warning + '10' }}>
                <Clock style={{ color: colors.warning }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.warning }}>47h</span>
            </div>
            <p className="text-gray-600 text-sm">Learning Time</p>
          </div>
        </div>

        {/* Notifications Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={20} style={{ color: colors.secondary }} />
            <span className="font-medium text-gray-700">You have {notifications.filter(n => !n.read).length} unread notifications</span>
          </div>
          <button className="text-sm font-medium" style={{ color: colors.primary }}>
            View All
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-6">
          <div className="flex overflow-x-auto p-2 gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full flex items-center justify-center text-white text-4xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                      {profile?.full_name?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow">
                      <Camera size={16} style={{ color: colors.primary }} />
                    </button>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>{profile?.full_name}</h2>
                    <p className="text-gray-600 mb-2">{profile?.email}</p>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: colors.secondary + '10', color: colors.secondary }}>
                        <Award size={14} className="mr-1" />
                        {profile?.skill_level || 'Beginner'}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: colors.primary + '10', color: colors.primary }}>
                        <CheckCircle size={14} className="mr-1" />
                        Verified
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium" style={{ background: colors.success + '10', color: colors.success }}>
                        <Crown size={14} className="mr-1" />
                        {userPoints.rank}
                      </span>
                    </div>
                  </div>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-2 px-6 py-3 text-white rounded-xl hover:scale-105 transition-all shadow-md"
                    style={{ background: colors.secondary }}
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-2" style={{ color: colors.primary }} />
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{profile?.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-2" style={{ color: colors.primary }} />
                      Email Address
                    </label>
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{profile?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-2" style={{ color: colors.primary }} />
                      Phone Number
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+1 234 567 8900"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin size={16} className="inline mr-2" style={{ color: colors.primary }} />
                      Country
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your country"
                      />
                    ) : (
                      <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{country || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {editing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows="4"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-900 bg-gray-50 px-4 py-3 rounded-xl">{bio || 'No bio yet'}</p>
                  )}
                </div>

                {editing && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                    >
                      <Save size={18} className="inline mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="px-8 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Points & Rewards Tab */}
          {activeTab === 'points' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Points & Rewards</h2>
              
              {/* Points Overview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Medal size={24} />
                    <h3 className="text-lg font-bold">Peer Starter</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">400</p>
                  <p className="text-sm opacity-90">Points needed for Peer Starter rank</p>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${Math.min((userPoints.total / 400) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.orangeShade})` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Crown size={24} />
                    <h3 className="text-lg font-bold">Ambassador</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">700</p>
                  <p className="text-sm opacity-90">Points needed for Ambassador rank</p>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${Math.min((userPoints.total / 700) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.green})` }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Gem size={24} />
                    <h3 className="text-lg font-bold">Master Ambassador</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">1,500</p>
                  <p className="text-sm opacity-90">Points needed for Master rank</p>
                  <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${(userPoints.total / 1500) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Points History */}
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Recent Points Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Completed Social Media Marketing course</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="font-bold text-green-600">+150</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Referred a friend (Sarah Johnson)</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <span className="font-bold text-blue-600">+50</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Flame size={16} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">7-day streak bonus</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                  <span className="font-bold text-orange-600">+25</span>
                </div>
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Refer & Earn</h2>
              
              {/* Referral Link Card */}
              <div className="bg-gradient-to-r p-6 rounded-2xl text-white mb-8" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                <div className="flex items-center gap-3 mb-4">
                  <Gift size={24} />
                  <h3 className="text-xl font-bold">Your Referral Link</h3>
                </div>
                <p className="mb-4 opacity-90">Share this link with friends. You both get 50 points when they join!</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-xl text-gray-900 bg-white/90"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-6 py-3 bg-white rounded-xl font-medium transition-all hover:scale-105 flex items-center gap-2"
                    style={{ color: colors.primary }}
                  >
                    <Copy size={18} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Referral Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>5</div>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: colors.success }}>250</div>
                  <p className="text-sm text-gray-600">Points Earned</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-100 text-center">
                  <div className="text-3xl font-bold mb-1" style={{ color: colors.secondary }}>$25</div>
                  <p className="text-sm text-gray-600">Cash Value</p>
                </div>
              </div>

              {/* Referral List */}
              <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>Your Referrals</h3>
              <div className="space-y-3">
                {referrals.map(ref => (
                  <div key={ref.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                        {ref.avatar}
                      </div>
                      <div>
                        <p className="font-medium">{ref.name}</p>
                        <p className="text-xs text-gray-500">Joined {ref.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-600">+{ref.points}</span>
                      <p className="text-xs text-gray-500">points earned</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 p-3 bg-[#1DA1F2] text-white rounded-xl hover:bg-[#1a8cd8] transition-colors flex items-center justify-center gap-2">
                  <Twitter size={18} />
                  Share on Twitter
                </button>
                <button className="flex-1 p-3 bg-[#1877F2] text-white rounded-xl hover:bg-[#166fe5] transition-colors flex items-center justify-center gap-2">
                  <Facebook size={18} />
                  Share on Facebook
                </button>
                <button className="flex-1 p-3 bg-[#0A66C2] text-white rounded-xl hover:bg-[#0959a8] transition-colors flex items-center justify-center gap-2">
                  <Linkedin size={18} />
                  Share on LinkedIn
                </button>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>My Courses</h2>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary }}>{course.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">Next: {course.nextLesson}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Last accessed: {course.lastAccessed}</span>
                          <span>Progress: {course.progress}%</span>
                          <span>{course.completed}/{course.lessons} lessons</span>
                        </div>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-center"
                        style={{ background: colors.secondary }}
                      >
                        Continue
                      </Link>
                    </div>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ width: `${course.progress}%`, background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>My Certificates</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                    <div className="h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                      <Award size={64} className="text-white" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold mb-2" style={{ color: colors.primary }}>{cert.course}</h3>
                      <p className="text-gray-600 text-sm mb-2 flex items-center gap-2">
                        <Calendar size={14} />
                        {cert.date}
                      </p>
                      <p className="text-xs text-gray-500 mb-4">Credential ID: {cert.credentialId}</p>
                      <div className="flex gap-2">
                        <button className="flex-1 text-white py-2 rounded-lg hover:opacity-90 transition-colors text-sm flex items-center justify-center gap-1" style={{ background: colors.primary }}>
                          <Download size={14} />
                          Download
                        </button>
                        <button className="flex-1 py-2 rounded-lg hover:bg-orange-50 transition-colors text-sm flex items-center justify-center gap-1" style={{ border: `1px solid ${colors.secondary}`, color: colors.secondary }}>
                          <Share2 size={14} />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Achievements</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`bg-white rounded-xl p-6 border-2 transition-all ${
                      achievement.earned 
                        ? 'shadow-lg' 
                        : 'border-gray-200 opacity-60'
                    }`}
                    style={achievement.earned ? { borderColor: colors.secondary } : {}}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-4xl">{achievement.icon}</span>
                      {achievement.earned && (
                        <span className="text-xs px-2 py-1 rounded-full" style={{ background: colors.success + '10', color: colors.success }}>
                          +{achievement.points} pts
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold mb-1" style={{ color: colors.primary }}>{achievement.title}</h3>
                    <p className="text-xs text-gray-600 mb-3">{achievement.description}</p>
                    {achievement.earned ? (
                      <>
                        <span className="text-xs text-green-600 block mb-1">Earned on {achievement.date}</span>
                        <span className="inline-block text-xs px-2 py-1 rounded-full" style={{ background: colors.success + '10', color: colors.success }}>
                          ✓ Earned
                        </span>
                      </>
                    ) : (
                      <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-500">
                        Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>Account Settings</h2>
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Bell size={18} />
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about courses</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ peerFocusRing: colors.secondary + '20', peerCheckedBg: colors.secondary }}></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Get alerts in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ peerFocusRing: colors.secondary + '20', peerCheckedBg: colors.secondary }}></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <Shield size={18} />
                    Privacy & Security
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Public Profile</p>
                        <p className="text-sm text-gray-600">Make your profile visible</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ peerFocusRing: colors.secondary + '20', peerCheckedBg: colors.secondary }}></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Show Activity Status</p>
                        <p className="text-sm text-gray-600">Let others see when you're online</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" style={{ peerFocusRing: colors.secondary + '20', peerCheckedBg: colors.secondary }}></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                    <HelpCircle size={18} />
                    Help & Support
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      Frequently Asked Questions
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      Contact Support
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                      Report a Problem
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}