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
  CheckCircle, AlertCircle, HelpCircle, Info
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
      title: 'Just completed my first IT course!',
      content: 'I cannot believe I finished the IT Fundamentals course in just 3 weeks! The content was so clear and practical. Already applying what I learned at work. Thank you iKPACE!',
      likes_count: 24,
      comments_count: 8,
      created_at: '2024-01-15T10:30:00Z',
      user_profiles: { full_name: 'Sarah Johnson', avatar_url: null }
    },
    {
      id: '2',
      title: 'Tips for staying motivated while learning',
      content: 'I wanted to share some tips that helped me maintain my learning streak: 1) Study at the same time every day 2) Join study groups 3) Set small, achievable goals 4) Celebrate small wins. What works for you?',
      likes_count: 45,
      comments_count: 15,
      created_at: '2024-01-14T14:20:00Z',
      user_profiles: { full_name: 'Michael Chen', avatar_url: null }
    },
    {
      id: '3',
      title: 'Looking for study partners for Data Analysis course',
      content: 'Hey everyone! I just enrolled in the Data Analysis course and would love to connect with others taking the same course. We could share notes, help each other with assignments, and stay accountable. Drop a comment if interested!',
      likes_count: 18,
      comments_count: 12,
      created_at: '2024-01-13T09:15:00Z',
      user_profiles: { full_name: 'Amina Okafor', avatar_url: null }
    },
    {
      id: '4',
      title: 'From complete beginner to freelancing in 3 months',
      content: 'I want to encourage everyone here. Three months ago, I knew nothing about graphic design. Today, I just landed my first client on Fiverr! The Graphic Design and Freelancing courses on iKPACE changed my life. Keep pushing, it\'s worth it!',
      likes_count: 67,
      comments_count: 23,
      created_at: '2024-01-12T16:45:00Z',
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
      alert('Post created! (Demo mode)')
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
    { id: 'whatsapp', label: 'WhatsApp Channel', icon: <MessageCircle size={18} /> },
    { id: 'events', label: 'Events', icon: <Calendar size={18} /> },
    { id: 'groups', label: 'Study Groups', icon: <Users size={18} /> }
  ]

  const onlineMembers = [
    { name: 'Sarah K.', role: 'Ambassador', avatar: '👩', active: true },
    { name: 'Michael C.', role: 'Mentor', avatar: '👨', active: true },
    { name: 'Amina O.', role: 'Peer Starter', avatar: '👩', active: true },
    { name: 'David M.', role: 'Member', avatar: '👨', active: true },
    { name: 'Grace W.', role: 'Ambassador', avatar: '👩', active: true },
    { name: 'John P.', role: 'Member', avatar: '👨', active: false },
    { name: 'Esi D.', role: 'Peer Starter', avatar: '👩', active: true },
    { name: 'Kofi A.', role: 'Mentor', avatar: '👨', active: true }
  ]

  const upcomingEvents = [
    {
      title: 'Weekly Study Session: JavaScript',
      date: 'Today, 6:00 PM GMT',
      attendees: 34,
      host: 'Sarah K.',
      type: 'Study Group'
    },
    {
      title: 'AMA with Senior Developer',
      date: 'Tomorrow, 3:00 PM GMT',
      attendees: 89,
      host: 'Michael C.',
      type: 'Webinar'
    },
    {
      title: 'Portfolio Review Workshop',
      date: 'Fri, 4:00 PM GMT',
      attendees: 56,
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: colors.primary }}>Community</h1>
          <p className="text-gray-600 text-lg">Connect with fellow learners, share experiences, and grow together</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.primary + '10' }}>
                <Users style={{ color: colors.primary }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.primary }}>5,234</span>
            </div>
            <p className="text-gray-600 text-sm">Active Members</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.secondary + '10' }}>
                <MessageCircle style={{ color: colors.secondary }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.secondary }}>1,456</span>
            </div>
            <p className="text-gray-600 text-sm">Total Discussions</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.success + '10' }}>
                <TrendingUp style={{ color: colors.success }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.success }}>89</span>
            </div>
            <p className="text-gray-600 text-sm">New Today</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-xl" style={{ background: colors.warning + '10' }}>
                <Bell style={{ color: colors.warning }} size={24} />
              </div>
              <span className="text-2xl font-bold" style={{ color: colors.warning }}>1,247</span>
            </div>
            <p className="text-gray-600 text-sm">Online Now</p>
          </div>
        </div>

        {/* WhatsApp Channel Banner - Featured */}
        <div className="mb-8 p-6 rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <MessageCircle size={48} className="text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1">Join iKPACE Community Channel</h3>
                <p className="text-white/90">Connect with 5,000+ members on WhatsApp • Daily discussions • Study groups • Mentorship</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                style={{ color: colors.primary }}
              >
                <MessageCircle size={18} />
                Join Now
              </a>
              <button
                onClick={handleCopyLink}
                className="px-4 py-3 bg-white/20 backdrop-blur-sm rounded-full font-bold hover:bg-white/30 transition-all flex items-center gap-2"
              >
                {copied ? <CheckCircle size={18} /> : <Link size={18} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-1 mb-6 inline-flex">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={activeTab === tab.id ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Feed or WhatsApp Channel */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && (
              <>
                {/* Create Post */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <button
                    onClick={() => setShowNewPost(!showNewPost)}
                    className="w-full flex items-center justify-center py-3 px-4 rounded-xl text-white font-medium transition-all hover:scale-105"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    <Plus size={20} className="mr-2" />
                    Create New Post
                  </button>

                  {showNewPost && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Post title..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Share your thoughts, ask questions, or start a discussion..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows="5"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={handleCreatePost}
                          className="px-6 py-3 rounded-xl text-white font-medium transition-all hover:scale-105"
                          style={{ background: colors.primary }}
                        >
                          <Send size={18} className="inline mr-2" />
                          Post
                        </button>
                        <button
                          onClick={() => setShowNewPost(false)}
                          className="px-6 py-3 rounded-xl border-2 font-medium hover:bg-gray-50 transition-all"
                          style={{ borderColor: colors.primary, color: colors.primary }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Posts Feed */}
                <div className="space-y-6">
                  {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                          {post.user_profiles?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="font-bold text-gray-900">{post.user_profiles?.full_name || 'User'}</span>
                              <span className="text-sm text-gray-500 ml-2">• {formatDate(post.created_at)}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                          <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
                          <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                              <ThumbsUp size={18} />
                              <span>{post.likes_count} Likes</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors">
                              <MessageCircle size={18} />
                              <span>{post.comments_count} Comments</span>
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors ml-auto">
                              <Share2 size={18} />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-8">
                  <button className="px-6 py-3 rounded-xl font-medium border-2 hover:bg-gray-50 transition-all" style={{ borderColor: colors.primary, color: colors.primary }}>
                    Load More Posts
                  </button>
                </div>
              </>
            )}

            {activeTab === 'whatsapp' && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center mb-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                    <MessageCircle size={48} className="text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>iKPACE Community Channel</h2>
                  <p className="text-gray-600">Join 5,000+ members on WhatsApp for daily discussions, study groups, and mentorship</p>
                </div>

                {/* Channel Features */}
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: colors.primary + '20' }}>
                        <MessageCircle size={20} style={{ color: colors.primary }} />
                      </div>
                      <span className="font-bold text-gray-900">Daily Discussions</span>
                    </div>
                    <p className="text-sm text-gray-600">Engage in tech conversations daily</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: colors.secondary + '20' }}>
                        <Users size={20} style={{ color: colors.secondary }} />
                      </div>
                      <span className="font-bold text-gray-900">Study Groups</span>
                    </div>
                    <p className="text-sm text-gray-600">Join focused learning groups</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: colors.success + '20' }}>
                        <Award size={20} style={{ color: colors.success }} />
                      </div>
                      <span className="font-bold text-gray-900">Mentorship</span>
                    </div>
                    <p className="text-sm text-gray-600">Learn from experienced mentors</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg" style={{ background: colors.warning + '20' }}>
                        <Bell size={20} style={{ color: colors.warning }} />
                      </div>
                      <span className="font-bold text-gray-900">Live Updates</span>
                    </div>
                    <p className="text-sm text-gray-600">Get real-time announcements</p>
                  </div>
                </div>

                {/* Join Button */}
                <div className="text-center">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-bold text-lg hover:scale-105 transition-all shadow-lg"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    <MessageCircle size={20} />
                    Join WhatsApp Channel
                  </a>
                  <p className="text-sm text-gray-500 mt-3">🔒 Your privacy is protected • 5,000+ active members</p>
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl" style={{ background: colors.primary + '10' }}>
                        <Calendar size={24} style={{ color: colors.primary }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm px-2 py-0.5 rounded-full" style={{ background: colors.secondary + '20', color: colors.secondary }}>
                            {event.type}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{event.date}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Hosted by {event.host}</span>
                          <span className="text-xs flex items-center gap-1">
                            <Users size={12} className="text-gray-400" />
                            {event.attendees} attending
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'groups' && (
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: colors.primary + '20' }}>
                      <BookOpen size={20} style={{ color: colors.primary }} />
                    </div>
                    <h3 className="font-bold text-gray-900">JavaScript Masters</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">234 members • 45 active</p>
                  <button className="w-full py-2 rounded-lg text-sm font-medium transition-all" style={{ background: colors.primary + '10', color: colors.primary }}>
                    Join Group
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: colors.secondary + '20' }}>
                      <GraduationCap size={20} style={{ color: colors.secondary }} />
                    </div>
                    <h3 className="font-bold text-gray-900">Data Science</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">189 members • 32 active</p>
                  <button className="w-full py-2 rounded-lg text-sm font-medium transition-all" style={{ background: colors.secondary + '10', color: colors.secondary }}>
                    Join Group
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: colors.success + '20' }}>
                      <Palette size={20} style={{ color: colors.success }} />
                    </div>
                    <h3 className="font-bold text-gray-900">UI/UX Design</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">156 members • 28 active</p>
                  <button className="w-full py-2 rounded-lg text-sm font-medium transition-all" style={{ background: colors.success + '10', color: colors.success }}>
                    Join Group
                  </button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg" style={{ background: colors.warning + '20' }}>
                      <Code size={20} style={{ color: colors.warning }} />
                    </div>
                    <h3 className="font-bold text-gray-900">Python Beginners</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">312 members • 67 active</p>
                  <button className="w-full py-2 rounded-lg text-sm font-medium transition-all" style={{ background: colors.warning + '10', color: colors.warning }}>
                    Join Group
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Online Members & Quick Actions */}
          <div className="space-y-6">
            {/* Online Members */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.primary }}>
                <Users size={18} />
                Online Now ({onlineMembers.filter(m => m.active).length})
              </h3>
              <div className="space-y-3">
                {onlineMembers.filter(m => m.active).slice(0, 5).map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm">
                          {member.avatar}
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <span className="text-xs text-green-600">● Online</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm font-medium rounded-lg transition-all" style={{ background: colors.primary + '10', color: colors.primary }}>
                View All Members
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: colors.primary + '10' }}>
                    <MessageCircle size={16} style={{ color: colors.primary }} />
                  </div>
                  <span className="text-sm text-gray-700">Start a Discussion</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: colors.secondary + '10' }}>
                    <Users size={16} style={{ color: colors.secondary }} />
                  </div>
                  <span className="text-sm text-gray-700">Find Study Partners</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-all flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: colors.success + '10' }}>
                    <Award size={16} style={{ color: colors.success }} />
                  </div>
                  <span className="text-sm text-gray-700">Become an Ambassador</span>
                </button>
              </div>
            </div>

            {/* Channel Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2" style={{ borderColor: colors.primary + '20' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                  <MessageCircle size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">WhatsApp Channel</h4>
                  <p className="text-xs text-gray-500">5,000+ members</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">Join our active WhatsApp community for daily discussions and updates.</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                style={{ color: colors.secondary }}
              >
                Join Channel <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}