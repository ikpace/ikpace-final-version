import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { 
  User, Mail, Phone, MapPin, Award, Flame, Clock, Save, 
  BookOpen, Calendar, Download, Share2, 
  Settings, Bell, Shield, Camera, Edit3,
  TrendingUp, Target, CheckCircle, Star, Zap, Gift,
  Heart, MessageCircle, HelpCircle, LogOut, Moon, Sun,
  Copy, Users, Crown, Medal, Gem, Sparkles, Rocket,
  Trophy, BadgeCheck, BarChart3, PieChart, Activity,
  Coffee, Bookmark, Flag, Globe, Lock, Unlock,
  ChevronRight, ChevronLeft, Plus, Minus, RefreshCw,
  Twitter, Facebook, Linkedin
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
  const [activeTab, setActiveTab] = useState('profile')
  const [certificates, setCertificates] = useState([])
  const [courses, setCourses] = useState([])
  const [achievements, setAchievements] = useState([])
  const [notifications, setNotifications] = useState([])
  const [referrals, setReferrals] = useState([])
  const [copied, setCopied] = useState(false)
  
  // Profile image states
  const [profileImage, setProfileImage] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imageUrl, setImageUrl] = useState(profile?.avatar_url || null)

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

  // Enhanced Profile Image Upload Handler with debugging
  const handleImageUpload = async (event) => {
    try {
      setUploadingImage(true)
      const file = event.target.files[0]
      if (!file) return

      console.log('1. File selected:', file.name, file.type, file.size)

      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        return
      }

      // Create a temporary URL for preview
      const objectUrl = URL.createObjectURL(file)
      setProfileImage(objectUrl)
      console.log('2. Preview created')

      // Upload to Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`
      const filePath = `profile-images/${fileName}`
      console.log('3. Upload path:', filePath)

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (uploadError) {
        console.error('4. Upload error:', uploadError)
        throw uploadError
      }

      console.log('5. Upload successful:', uploadData)

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      console.log('6. Public URL:', publicUrl)

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', profile.id)

      if (updateError) {
        console.error('7. Profile update error:', updateError)
        throw updateError
      }

      console.log('8. Profile updated successfully')
      setImageUrl(publicUrl)
      alert('Profile image updated successfully!')
      
    } catch (error) {
      console.error('Error uploading image:', error)
      
      // More specific error messages
      if (error.message?.includes('permission')) {
        alert('Permission denied. Please check your storage permissions.')
      } else if (error.message?.includes('bucket')) {
        alert('Storage bucket not found. Please create the "avatars" bucket.')
      } else if (error.statusCode === '403') {
        alert('Access forbidden. Please check your RLS policies.')
      } else if (error.message?.includes('JWT')) {
        alert('Authentication error. Please log out and log in again.')
      } else {
        alert(`Upload failed: ${error.message || 'Please try again.'}`)
      }
    } finally {
      setUploadingImage(false)
    }
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
      if (!profile?.id) {
        throw new Error('No user profile found')
      }

      const updates = {
        full_name: fullName,
        phone,
        country,
        bio,
        updated_at: new Date().toISOString()
      }

      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', profile.id)

      if (error) throw error
      
      setEditing(false)
      alert('Profile updated successfully!')
      
    } catch (error) {
      console.error('Error updating profile:', error)
      alert(`Failed to update: ${error.message}`)
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
    { id: 'points', label: 'Points', icon: <Sparkles size={18} /> },
    { id: 'referrals', label: 'Referrals', icon: <Users size={18} /> },
    { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> },
    { id: 'certificates', label: 'Certs', icon: <Award size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> }
  ]

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#eef2f6] py-4 sm:py-8 px-3 sm:px-4 ${darkMode ? 'dark' : ''}`}>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2" style={{ color: colors.primary }}>My Profile</h1>
            <p className="text-sm sm:text-base text-gray-600">Manage your account, track progress, and earn rewards</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 sm:p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              {darkMode ? <Sun size={20} style={{ color: colors.secondary }} /> : <Moon size={20} style={{ color: colors.primary }} />}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-md text-sm sm:text-base"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Points & Rank Banner - Responsive Grid */}
        <div className="bg-gradient-to-r rounded-xl sm:rounded-2xl shadow-xl mb-6 sm:mb-8 p-4 sm:p-6 text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
                <Crown size={24} className="text-yellow-300" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm opacity-90 truncate">Rank</p>
                <p className="text-sm sm:text-base md:text-xl font-bold truncate">{userPoints.rank}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
                <Sparkles size={24} className="text-yellow-300" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm opacity-90 truncate">Points</p>
                <p className="text-sm sm:text-base md:text-xl font-bold truncate">{userPoints.total.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
                <Target size={24} className="text-yellow-300" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm opacity-90 truncate">Next</p>
                <p className="text-sm sm:text-base md:text-xl font-bold truncate">{userPoints.nextRank}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-3 bg-white/20 rounded-lg sm:rounded-xl">
                <TrendingUp size={24} className="text-yellow-300" />
              </div>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm opacity-90 truncate">Needed</p>
                <p className="text-sm sm:text-base md:text-xl font-bold truncate">{userPoints.pointsToNext}</p>
              </div>
            </div>
          </div>

          {/* Progress to next rank */}
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
              <span>Progress to {userPoints.nextRank}</span>
              <span>{userPoints.total} / {userPoints.ambassador + userPoints.pointsToNext}</span>
            </div>
            <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
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

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.primary + '10' }}>
                <BookOpen style={{ color: colors.primary }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>3</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Enrolled Courses</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.secondary + '10' }}>
                <Award style={{ color: colors.secondary }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.secondary }}>3</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Certificates</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.success + '10' }}>
                <Flame style={{ color: colors.success }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.success }}>15</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Day Streak</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.warning + '10' }}>
                <Clock style={{ color: colors.warning }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.warning }}>47h</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Learning Time</p>
          </div>
        </div>

        {/* Notifications Bar - Responsive */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 mb-4 sm:mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Bell size={20} style={{ color: colors.secondary }} className="flex-shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-gray-700 truncate">
              {notifications.filter(n => !n.read).length} unread notifications
            </span>
          </div>
          <button className="text-xs sm:text-sm font-medium whitespace-nowrap ml-2" style={{ color: colors.primary }}>
            View All
          </button>
        </div>

        {/* Tabs - Horizontal Scroll on Mobile */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl mb-4 sm:mb-6">
          <div className="flex overflow-x-auto p-1 sm:p-2 gap-1 sm:gap-2 scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all whitespace-nowrap text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content - Responsive Padding */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt="Profile" className="w-full h-full object-cover" />
                      ) : profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        profile?.full_name?.charAt(0) || 'U'
                      )}
                    </div>
                    <label className="absolute -bottom-1 -right-1 p-1.5 sm:p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                      {uploadingImage ? (
                        <RefreshCw size={16} className="animate-spin" style={{ color: colors.primary }} />
                      ) : (
                        <Camera size={16} style={{ color: colors.primary }} />
                      )}
                    </label>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 truncate" style={{ color: colors.primary }}>{profile?.full_name}</h2>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{profile?.email}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium" style={{ background: colors.secondary + '10', color: colors.secondary }}>
                        <Award size={12} className="mr-1" />
                        <span className="truncate">{profile?.skill_level || 'Beginner'}</span>
                      </span>
                      <span className="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-medium" style={{ background: colors.primary + '10', color: colors.primary }}>
                        <CheckCircle size={12} className="mr-1" />
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white rounded-xl hover:scale-105 transition-all shadow-md text-sm sm:text-base"
                    style={{ background: colors.secondary }}
                  >
                    <Edit3 size={18} />
                    Edit Profile
                  </button>
                )}
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <User size={14} className="inline mr-1 sm:mr-2" style={{ color: colors.primary }} />
                      Full Name
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">{profile?.full_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <Mail size={14} className="inline mr-1 sm:mr-2" style={{ color: colors.primary }} />
                      Email Address
                    </label>
                    <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">{profile?.email}</p>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <Phone size={14} className="inline mr-1 sm:mr-2" style={{ color: colors.primary }} />
                      Phone Number
                    </label>
                    {editing ? (
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="+1 234 567 8900"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">{phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      <MapPin size={14} className="inline mr-1 sm:mr-2" style={{ color: colors.primary }} />
                      Country
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your country"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl truncate">{country || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                    Bio
                  </label>
                  {editing ? (
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows="3"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900 bg-gray-50 px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl">{bio || 'No bio yet'}</p>
                  )}
                </div>

                {editing && (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="w-full sm:flex-1 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:shadow-lg transition-all disabled:opacity-50 text-sm sm:text-base"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                    >
                      <Save size={18} className="inline mr-1 sm:mr-2" />
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Points & Rewards</h2>
              
              {/* Points Overview - Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Medal size={20} />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold">Peer Starter</h3>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">400</p>
                  <p className="text-xs sm:text-sm opacity-90">Points needed</p>
                  <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${Math.min((userPoints.total / 400) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.orangeShade})` }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Crown size={20} />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold">Ambassador</h3>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">700</p>
                  <p className="text-xs sm:text-sm opacity-90">Points needed</p>
                  <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${Math.min((userPoints.total / 700) * 100, 100)}%` }}></div>
                  </div>
                </div>

                <div className="bg-gradient-to-br p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-white sm:col-span-2 md:col-span-1" style={{ background: `linear-gradient(135deg, ${colors.success}, #00a85a)` }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <Gem size={20} />
                    <h3 className="text-sm sm:text-base md:text-lg font-bold">Master Ambassador</h3>
                  </div>
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2">1,500</p>
                  <p className="text-xs sm:text-sm opacity-90">Points needed</p>
                  <div className="mt-3 sm:mt-4 h-1.5 sm:h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: `${(userPoints.total / 1500) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Points History */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>Recent Points Activity</h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="p-1.5 sm:p-2 bg-green-100 rounded-lg flex-shrink-0">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Completed Social Media Marketing course</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-green-600 whitespace-nowrap ml-2">+150</span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="p-1.5 sm:p-2 bg-blue-100 rounded-lg flex-shrink-0">
                      <Users size={14} className="text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">Referred a friend (Sarah Johnson)</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-blue-600 whitespace-nowrap ml-2">+50</span>
                </div>

                <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                    <div className="p-1.5 sm:p-2 bg-orange-100 rounded-lg flex-shrink-0">
                      <Flame size={14} className="text-orange-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">7-day streak bonus</p>
                      <p className="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-orange-600 whitespace-nowrap ml-2">+25</span>
                </div>
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Refer & Earn</h2>
              
              {/* Referral Link Card */}
              <div className="bg-gradient-to-r p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-white mb-6 sm:mb-8" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Gift size={20} />
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">Your Referral Link</h3>
                </div>
                <p className="text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">Share this link with friends. You both get 50 points when they join!</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={referralLink}
                    readOnly
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl text-gray-900 bg-white/90"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-white rounded-lg sm:rounded-xl font-medium transition-all hover:scale-105 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    style={{ color: colors.primary }}
                  >
                    <Copy size={16} />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              {/* Referral Stats - Responsive Grid */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-100 text-center">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.primary }}>5</div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Referrals</p>
                </div>
                <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-100 text-center">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.success }}>250</div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Points</p>
                </div>
                <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg sm:rounded-xl border border-gray-100 text-center">
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.secondary }}>$25</div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Cash</p>
                </div>
              </div>

              {/* Referral List */}
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>Your Referrals</h3>
              <div className="space-y-2 sm:space-y-3">
                {referrals.map(ref => (
                  <div key={ref.id} className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-gray-200 flex items-center justify-center text-base sm:text-lg md:text-xl flex-shrink-0">
                        {ref.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">{ref.name}</p>
                        <p className="text-xs text-gray-500">Joined {ref.date}</p>
                      </div>
                    </div>
                    <div className="text-right ml-2">
                      <span className="text-xs sm:text-sm font-bold text-green-600 whitespace-nowrap">+{ref.points}</span>
                      <p className="text-xs text-gray-500 hidden sm:block">points</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share Buttons - Responsive Grid */}
              <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2">
                <a 
                  href={`https://twitter.com/intent/tweet?text=Join%20me%20on%20IKpace%20and%20earn%20points!%20${referralLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-[#1DA1F2] text-white rounded-lg sm:rounded-xl hover:bg-[#1a8cd8] transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Twitter size={16} />
                  <span className="hidden sm:inline">Twitter</span>
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-[#1877F2] text-white rounded-lg sm:rounded-xl hover:bg-[#166fe5] transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Facebook size={16} />
                  <span className="hidden sm:inline">Facebook</span>
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 sm:p-3 bg-[#0A66C2] text-white rounded-lg sm:rounded-xl hover:bg-[#0959a8] transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
                >
                  <Linkedin size={16} />
                  <span className="hidden sm:inline">LinkedIn</span>
                </a>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>My Courses</h2>
              <div className="space-y-3 sm:space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 hover:shadow-lg transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 sm:mb-2 truncate" style={{ color: colors.primary }}>{course.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 truncate">Next: {course.nextLesson}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-gray-500">
                          <span>Last: {course.lastAccessed}</span>
                          <span>Progress: {course.progress}%</span>
                          <span>{course.completed}/{course.lessons}</span>
                        </div>
                      </div>
                      <Link
                        to={`/course/${course.id}`}
                        className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-center text-xs sm:text-sm"
                        style={{ background: colors.secondary }}
                      >
                        Continue
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-4 w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                      <div 
                        className="h-1.5 sm:h-2 rounded-full" 
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>My Certificates</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white rounded-lg sm:rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                    <div className="h-28 sm:h-32 md:h-36 lg:h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                      <Award size={48} className="text-white" />
                    </div>
                    <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                      <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold mb-1 sm:mb-2 truncate" style={{ color: colors.primary }}>{cert.course}</h3>
                      <p className="text-xs text-gray-600 mb-1 sm:mb-2 flex items-center gap-1 sm:gap-2">
                        <Calendar size={12} />
                        <span className="truncate">{cert.date}</span>
                      </p>
                      <p className="text-xs text-gray-500 mb-2 sm:mb-3 md:mb-4 truncate">ID: {cert.credentialId}</p>
                      <div className="flex gap-1 sm:gap-2">
                        <button className="flex-1 text-white py-1 sm:py-1.5 md:py-2 rounded-lg hover:opacity-90 transition-colors text-xs flex items-center justify-center gap-1" style={{ background: colors.primary }}>
                          <Download size={12} />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                        <button className="flex-1 py-1 sm:py-1.5 md:py-2 rounded-lg hover:bg-orange-50 transition-colors text-xs flex items-center justify-center gap-1" style={{ border: `1px solid ${colors.secondary}`, color: colors.secondary }}>
                          <Share2 size={12} />
                          <span className="hidden sm:inline">Share</span>
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id} 
                    className={`bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border-2 transition-all ${
                      achievement.earned 
                        ? 'shadow-lg' 
                        : 'border-gray-200 opacity-60'
                    }`}
                    style={achievement.earned ? { borderColor: colors.secondary } : {}}
                  >
                    <div className="flex items-start justify-between mb-2 sm:mb-3">
                      <span className="text-2xl sm:text-3xl md:text-4xl">{achievement.icon}</span>
                      {achievement.earned && (
                        <span className="text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ml-1" style={{ background: colors.success + '10', color: colors.success }}>
                          +{achievement.points}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm md:text-base font-bold mb-0.5 sm:mb-1 truncate" style={{ color: colors.primary }}>{achievement.title}</h3>
                    <p className="text-xs text-gray-600 mb-2 sm:mb-3 line-clamp-2">{achievement.description}</p>
                    {achievement.earned ? (
                      <>
                        <span className="text-xs text-green-600 block mb-1 truncate">Earned {achievement.date}</span>
                        <span className="inline-block text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap" style={{ background: colors.success + '10', color: colors.success }}>
                          ✓ Earned
                        </span>
                      </>
                    ) : (
                      <span className="inline-block text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>Account Settings</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                    <Bell size={16} />
                    Notifications
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium">Email Notifications</p>
                        <p className="text-xs text-gray-600 truncate">Receive updates about courses</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-8 sm:w-9 md:w-11 h-4 sm:h-5 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 sm:after:h-4 md:after:h-5 after:w-3 sm:after:w-4 md:after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium">Push Notifications</p>
                        <p className="text-xs text-gray-600 truncate">Get alerts in browser</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-8 sm:w-9 md:w-11 h-4 sm:h-5 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 sm:after:h-4 md:after:h-5 after:w-3 sm:after:w-4 md:after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                    <Shield size={16} />
                    Privacy & Security
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium">Public Profile</p>
                        <p className="text-xs text-gray-600 truncate">Make your profile visible</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-8 sm:w-9 md:w-11 h-4 sm:h-5 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 sm:after:h-4 md:after:h-5 after:w-3 sm:after:w-4 md:after:w-5 after:transition-all"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium">Show Activity Status</p>
                        <p className="text-xs text-gray-600 truncate">Let others see when you're online</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-8 sm:w-9 md:w-11 h-4 sm:h-5 md:h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 sm:after:h-4 md:after:h-5 after:w-3 sm:after:w-4 md:after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                    <HelpCircle size={16} />
                    Help & Support
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <Link to="/faq" className="block w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                      Frequently Asked Questions
                    </Link>
                    <Link to="/support" className="block w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                      Contact Support
                    </Link>
                    <Link to="/report" className="block w-full text-left px-3 sm:px-4 py-2 sm:py-3 bg-white rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm">
                      Report a Problem
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}