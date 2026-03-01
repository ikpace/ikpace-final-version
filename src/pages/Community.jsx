import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { 
  MessageCircle, ThumbsUp, Send, Plus, TrendingUp, Users,
  Share2, Heart, Award, Star, Clock, Calendar, Bell,
  Coffee, Globe, Link, Download, Camera, Video, Mic,
  Music, BookOpen, GraduationCap, Target, Zap, Shield,
  Gift, Rocket, Crown, Medal, Gem, Sparkles, Flame,
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  Phone, Mail, MapPin, ChevronRight, ChevronLeft,
  CheckCircle, AlertCircle, HelpCircle, Info,
  Palette, Code
} from 'lucide-react'

export default function Community() {
  const { profile } = useAuth()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostTitle, setNewPostTitle] = useState('')
  const [newPostContent, setNewPostContent] = useState('')
  const [activeTab, setActiveTab] = useState('feed')
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const [copied, setCopied] = useState(false)

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

  // WhatsApp channel link
  const whatsappLink = "https://chat.whatsapp.com/KpngD94AEgkEwBr3RDOXwE"

  const handleCopyLink = () => {
    navigator.clipboard.writeText(whatsappLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          user_profiles (full_name, avatar_url)
        `)
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
    } catch (error) {
      console.error('Error fetching posts:', error)
      setPosts(getMockPosts())
    } finally {
      setLoading(false)
    }
  }

  const getMockPosts = () => [
    {
      id: '1',
      title: 'Just started my first course!',
      content: 'Excited to begin my learning journey with iKPACE. Anyone else starting this week?',
      likes_count: 8,
      comments_count: 3,
      created_at: '2024-03-01T10:30:00Z',
      user_profiles: { full_name: 'Sarah Johnson', avatar_url: null }
    },
    {
      id: '2',
      title: 'Tips for staying motivated',
      content: 'I try to study at the same time every day. Small habits make a big difference!',
      likes_count: 12,
      comments_count: 5,
      created_at: '2024-02-28T14:20:00Z',
      user_profiles: { full_name: 'Michael Chen', avatar_url: null }
    },
    {
      id: '3',
      title: 'Looking for study partners',
      content: 'Anyone interested in forming a study group for the Web Development course?',
      likes_count: 6,
      comments_count: 4,
      created_at: '2024-02-27T09:15:00Z',
      user_profiles: { full_name: 'Amina Okafor', avatar_url: null }
    },
    {
      id: '4',
      title: 'My first project completed!',
      content: 'Just finished my first project and feeling proud. Thanks to everyone who helped!',
      likes_count: 15,
      comments_count: 7,
      created_at: '2024-02-26T16:45:00Z',
      user_profiles: { full_name: 'David Mensah', avatar_url: null }
    }
  ]

  const handleCreatePost = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Please fill in both title and content')
      return
    }

    try {
      const { data, error } = await supabase
        .from('community_posts')
        .insert({
          user_id: profile.id,
          title: newPostTitle,
          content: newPostContent
        })
        .select()
        .single()

      if (error) throw error

      setPosts([data, ...posts])
      setNewPostTitle('')
      setNewPostContent('')
      setShowNewPost(false)
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Post created successfully!')
      setShowNewPost(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    if (diffInHours < 48) return 'Yesterday'
    return date.toLocaleDateString()
  }

  const tabs = [
    { id: 'feed', label: 'Community Feed', icon: <MessageCircle size={18} /> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <MessageCircle size={18} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={18} /> },
    { id: 'groups', label: 'Study Groups', icon: <Users size={18} /> }
  ]

  const onlineMembers = [
    { name: 'Sarah K.', role: 'Member', avatar: '👩', active: true },
    { name: 'Michael C.', role: 'Member', avatar: '👨', active: true },
    { name: 'Amina O.', role: 'Member', avatar: '👩', active: true },
    { name: 'David M.', role: 'Member', avatar: '👨', active: true },
    { name: 'Grace W.', role: 'Member', avatar: '👩', active: false },
    { name: 'John P.', role: 'Member', avatar: '👨', active: false }
  ]

  const upcomingEvents = [
    {
      title: 'Study Session: JavaScript Basics',
      date: 'Today, 6:00 PM',
      attendees: 12,
      host: 'Sarah K.',
      type: 'Study Group'
    },
    {
      title: 'Q&A with Mentor',
      date: 'Tomorrow, 3:00 PM',
      attendees: 8,
      host: 'Michael C.',
      type: 'Mentorship'
    },
    {
      title: 'Portfolio Tips Workshop',
      date: 'Fri, 4:00 PM',
      attendees: 15,
      host: 'Amina O.',
      type: 'Workshop'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: colors.primary }}></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-4 sm:py-6 md:py-8 px-3 sm:px-4">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header - Responsive */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2" style={{ color: colors.primary }}>Community</h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Connect with fellow learners, share experiences, and grow together</p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.primary + '10' }}>
                <Users style={{ color: colors.primary }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>247</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Active Members</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.secondary + '10' }}>
                <MessageCircle style={{ color: colors.secondary }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.secondary }}>89</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Discussions</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.success + '10' }}>
                <TrendingUp style={{ color: colors.success }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.success }}>12</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">New Today</p>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 md:p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl" style={{ background: colors.warning + '10' }}>
                <Bell style={{ color: colors.warning }} size={20} />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.warning }}>18</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 truncate">Online Now</p>
          </div>
        </div>

        {/* WhatsApp Channel Banner - Responsive */}
        <div className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center">
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 truncate">Join WhatsApp Channel</h3>
                <p className="text-xs sm:text-sm text-white/90 truncate">Connect with 200+ members</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full md:w-auto">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white rounded-lg sm:rounded-xl font-bold hover:scale-105 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-lg"
                style={{ color: colors.primary }}
              >
                <MessageCircle size={16} />
                Join Now
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl font-bold hover:bg-white/30 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                {copied ? <CheckCircle size={16} /> : <Link size={16} />}
                <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs - Horizontal Scroll on Mobile */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-6 overflow-x-auto">
          <div className="flex min-w-max sm:min-w-0">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg font-medium transition-all flex items-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
          {/* Left Column - Feed or WhatsApp Channel */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <>
                {/* Create Post */}
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-5 md:mb-6">
                  <button
                    onClick={() => setShowNewPost(!showNewPost)}
                    className="w-full flex items-center justify-center py-2 sm:py-2.5 md:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl text-white font-medium transition-all hover:scale-105 text-sm sm:text-base"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    <Plus size={18} className="mr-1 sm:mr-2" />
                    Create New Post
                  </button>

                  {showNewPost && (
                    <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200">
                      <input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Post title..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl mb-3 sm:mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 text-sm border border-gray-200 rounded-lg sm:rounded-xl mb-3 sm:mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows="4"
                      />
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                          onClick={handleCreatePost}
                          className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl text-white font-medium transition-all hover:scale-105 text-sm"
                          style={{ background: colors.primary }}
                        >
                          <Send size={16} className="inline mr-1 sm:mr-2" />
                          Post
                        </button>
                        <button
                          onClick={() => setShowNewPost(false)}
                          className="w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl border-2 font-medium hover:bg-gray-50 transition-all text-sm"
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Posts Feed */}
                <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                      <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm md:text-base flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                          {post.user_profiles?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1 mb-1">
                            <div className="truncate">
                              <span className="text-xs sm:text-sm font-bold text-gray-900">{post.user_profiles?.full_name || 'User'}</span>
                              <span className="text-xs text-gray-500 ml-1 sm:ml-2">• {formatDate(post.created_at)}</span>
                            </div>
                          </div>
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 break-words">{post.title}</h3>
                          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3 break-words">{post.content}</p>
                          <div className="flex items-center gap-3 sm:gap-4 pt-3 border-t border-gray-100">
                            <button className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-orange-500 transition-colors text-xs sm:text-sm">
                              <ThumbsUp size={16} />
                              <span>{post.likes_count}</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-orange-500 transition-colors text-xs sm:text-sm">
                              <MessageCircle size={16} />
                              <span>{post.comments_count}</span>
                            </button>
                            <button className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-orange-500 transition-colors text-xs sm:text-sm ml-auto">
                              <Share2 size={16} />
                              <span className="hidden sm:inline">Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-4 sm:mt-5 md:mt-6 lg:mt-8">
                  <button className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-medium border-2 hover:bg-gray-50 transition-all text-xs sm:text-sm" style={{ borderColor: colors.primary, color: colors.primary }}>
                    Load More Posts
                  </button>
                </div>
              </>
            )}

            {activeTab === 'whatsapp' && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 lg:p-8">
                <div className="text-center mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-3 sm:mb-4 rounded-xl sm:rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.primary }}>iKPACE Community</h2>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">Join 200+ members on WhatsApp for discussions and updates</p>
                </div>

                {/* Channel Features - Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.primary + '20' }}>
                        <MessageCircle size={16} style={{ color: colors.primary }} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900">Discussions</span>
                    </div>
                    <p className="text-xs text-gray-600">Daily conversations</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.secondary + '20' }}>
                        <Users size={16} style={{ color: colors.secondary }} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900">Study Groups</span>
                    </div>
                    <p className="text-xs text-gray-600">Learn together</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.success + '20' }}>
                        <Award size={16} style={{ color: colors.success }} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900">Mentorship</span>
                    </div>
                    <p className="text-xs text-gray-600">Get help</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-gray-50 rounded-lg sm:rounded-xl">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.warning + '20' }}>
                        <Bell size={16} style={{ color: colors.warning }} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-gray-900">Updates</span>
                    </div>
                    <p className="text-xs text-gray-600">Latest news</p>
                  </div>
                </div>

                {/* Join Button */}
                <div className="text-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg sm:rounded-xl text-white font-bold text-sm sm:text-base hover:scale-105 transition-all shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    <MessageCircle size={18} />
                    Join WhatsApp Channel
                  </a>
                  <p className="text-xs text-gray-500 mt-2 sm:mt-3">🔒 200+ active members</p>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-3 sm:space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0" style={{ background: colors.primary + '10' }}>
                        <Calendar size={18} style={{ color: colors.primary }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: colors.secondary + '20', color: colors.secondary }}>
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 truncate">{event.title}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 mb-2">{event.date}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Host: {event.host}</span>
                          <span className="text-xs flex items-center gap-1">
                            <Users size={12} className="text-gray-400" />
                            {event.attendees}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.primary + '20' }}>
                      <BookOpen size={16} style={{ color: colors.primary }} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">JavaScript</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-3">24 members • 8 active</p>
                  <button className="w-full py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all" style={{ background: colors.primary + '10', color: colors.primary }}>
                    Join Group
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.secondary + '20' }}>
                      <GraduationCap size={16} style={{ color: colors.secondary }} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Data Science</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-3">18 members • 5 active</p>
                  <button className="w-full py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all" style={{ background: colors.secondary + '10', color: colors.secondary }}>
                    Join Group
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.success + '20' }}>
                      <Palette size={16} style={{ color: colors.success }} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">UI/UX Design</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-3">15 members • 4 active</p>
                  <button className="w-full py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all" style={{ background: colors.success + '10', color: colors.success }}>
                    Join Group
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 rounded-lg" style={{ background: colors.warning + '20' }}>
                      <Code size={16} style={{ color: colors.warning }} />
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold text-gray-900 truncate">Python</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 sm:mb-3">32 members • 12 active</p>
                  <button className="w-full py-1.5 sm:py-2 rounded-lg text-xs font-medium transition-all" style={{ background: colors.warning + '10', color: colors.warning }}>
                    Join Group
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Online Members & Quick Actions */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            {/* Online Members */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2" style={{ color: colors.primary }}>
                <Users size={16} />
                Online ({onlineMembers.filter(m => m.active).length})
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {onlineMembers.filter(m => m.active).map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                      <div className="relative flex-shrink-0">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm">
                          {member.avatar}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{member.name}</p>
                        <p className="text-xs text-gray-500 truncate">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600 hidden sm:inline">● Online</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6">
              <h3 className="text-sm sm:text-base md:text-lg font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ background: colors.primary + '10' }}>
                    <MessageCircle size={14} style={{ color: colors.primary }} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 truncate">Start Discussion</span>
                </button>
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                    <Users size={14} style={{ color: colors.secondary }} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 truncate">Find Study Partners</span>
                </button>
                <button className="w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-2 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-lg flex-shrink-0" style={{ background: colors.success + '10' }}>
                    <Award size={14} style={{ color: colors.success }} />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-700 truncate">Become Ambassador</span>
                </button>
              </div>
            </div>

            {/* Channel Preview */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 border-2" style={{ borderColor: colors.primary + '20' }}>
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                  <MessageCircle size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 truncate">WhatsApp Channel</h4>
                  <p className="text-xs text-gray-500">200+ members</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Join our WhatsApp community.</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium hover:underline"
                style={{ color: colors.secondary }}
              >
                Join <ChevronRight size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}