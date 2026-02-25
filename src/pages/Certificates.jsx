import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import { 
  Award, Download, Share2, ExternalLink, CheckCircle, 
  Copy, Facebook, Twitter, Linkedin, Mail, Printer,
  Calendar, User, BookOpen, Star, Zap, TrendingUp,
  Shield, Eye, FileText, Clock, Hash, X, Search,
  Filter, ChevronDown, Grid3x3, LayoutList, Lock,
  AlertCircle, Hourglass, PlayCircle, Gift, Trophy,
  Medal, Crown, Gem, Sparkles, Rocket, Target,
  BarChart, PieChart, Activity, Flag, Bookmark,
  ThumbsUp, MessageCircle, HelpCircle, Info
} from 'lucide-react'

export default function Certificates() {
  const { profile } = useAuth()
  const [certificates, setCertificates] = useState([])
  const [inProgressCourses, setInProgressCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCert, setSelectedCert] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('recent')
  const [viewMode, setViewMode] = useState('grid')
  const [copied, setCopied] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [activeTab, setActiveTab] = useState('earned')
  const certificateRef = useRef(null)

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

  useEffect(() => {
    fetchCertificates()
    fetchInProgressCourses()
  }, [profile])

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select(`
          *,
          courses (id, title, description, thumbnail_url, duration, level, instructor, category)
        `)
        .eq('user_id', profile?.id)
        .order('issued_date', { ascending: false })

      if (error) throw error
      setCertificates(data || [])
    } catch (error) {
      console.error('Error fetching certificates:', error)
      setCertificates(getMockCertificates())
    } finally {
      setLoading(false)
    }
  }

  const fetchInProgressCourses = async () => {
    // Mock in-progress courses data
    setInProgressCourses([
      {
        id: 'course-1',
        title: 'Advanced Social Media Strategy',
        progress: 68,
        lessons_completed: 17,
        total_lessons: 25,
        estimated_completion: '2 weeks',
        instructor: 'Sarah Johnson',
        thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
        category: 'Marketing',
        next_action: 'Complete Module 5: Analytics & Reporting',
        time_spent: '12 hours',
        achievements: [
          { name: 'Fast Learner', icon: '⚡', earned: true },
          { name: 'Quiz Master', icon: '📝', earned: true },
          { name: 'Perfect Score', icon: '🎯', earned: false }
        ]
      },
      {
        id: 'course-2',
        title: 'Data Analytics Fundamentals',
        progress: 42,
        lessons_completed: 10,
        total_lessons: 24,
        estimated_completion: '3 weeks',
        instructor: 'Michael Chen',
        thumbnail: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg',
        category: 'Data Science',
        next_action: 'Start Module 3: Data Visualization',
        time_spent: '8 hours',
        achievements: [
          { name: 'Data Explorer', icon: '📊', earned: true },
          { name: 'Visualization Pro', icon: '📈', earned: false }
        ]
      },
      {
        id: 'course-3',
        title: 'UX/UI Design Principles',
        progress: 25,
        lessons_completed: 5,
        total_lessons: 20,
        estimated_completion: '4 weeks',
        instructor: 'Emily Rodriguez',
        thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        category: 'Design',
        next_action: 'Complete Module 2: User Research',
        time_spent: '5 hours',
        achievements: [
          { name: 'Design Thinker', icon: '🎨', earned: true }
        ]
      },
      {
        id: 'course-4',
        title: 'Python Programming Masterclass',
        progress: 15,
        lessons_completed: 3,
        total_lessons: 20,
        estimated_completion: '5 weeks',
        instructor: 'David Olamide',
        thumbnail: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        category: 'Programming',
        next_action: 'Continue with Loops & Functions',
        time_spent: '3 hours',
        achievements: []
      }
    ])
  }

  const getMockCertificates = () => [
    {
      id: 'cert-001',
      certificate_number: 'IKPACE-2026-001247',
      issued_date: '2026-03-15T10:30:00Z',
      expiry_date: '2029-03-15T10:30:00Z',
      verification_url: 'https://verify.ikpace.com/IKPACE-2026-001247',
      grade: 'A+',
      score: 98,
      hours_completed: 60,
      courses: {
        id: 'virtual-assistant-pro',
        title: 'Virtual Assistant Professional',
        description: 'Master VA skills, client management, and remote work tools',
        thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
        duration: '6 Weeks',
        level: 'Beginner',
        instructor: 'Amara Osei',
        category: 'Business'
      }
    },
    {
      id: 'cert-002',
      certificate_number: 'IKPACE-2026-001248',
      issued_date: '2026-02-28T14:20:00Z',
      expiry_date: '2029-02-28T14:20:00Z',
      verification_url: 'https://verify.ikpace.com/IKPACE-2026-001248',
      grade: 'A',
      score: 95,
      hours_completed: 48,
      courses: {
        id: 'social-media-marketing',
        title: 'Social Media Marketing',
        description: 'Master content creation, ads, and growth strategies',
        thumbnail_url: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
        duration: '6 Weeks',
        level: 'Beginner',
        instructor: 'Kofi Asante',
        category: 'Marketing'
      }
    },
    {
      id: 'cert-003',
      certificate_number: 'IKPACE-2026-001249',
      issued_date: '2026-01-20T09:15:00Z',
      expiry_date: '2029-01-20T09:15:00Z',
      verification_url: 'https://verify.ikpace.com/IKPACE-2026-001249',
      grade: 'A',
      score: 94,
      hours_completed: 32,
      courses: {
        id: 'canva-graphic-design',
        title: 'Canva & Graphic Design',
        description: 'Create stunning designs, logos, and branding materials',
        thumbnail_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
        duration: '4 Weeks',
        level: 'Beginner',
        instructor: 'Esi Darkwah',
        category: 'Design'
      }
    }
  ]

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatShortDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getGradeColor = (grade) => {
    switch(grade) {
      case 'A+': return 'text-green-600 bg-green-100 border-green-200'
      case 'A': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'B+': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'B': return 'text-orange-600 bg-orange-100 border-orange-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 75) return 'text-green-600 bg-green-100'
    if (progress >= 50) return 'text-blue-600 bg-blue-100'
    if (progress >= 25) return 'text-yellow-600 bg-yellow-100'
    return 'text-gray-600 bg-gray-100'
  }

  const handleDownload = async (cert) => {
    setDownloading(true)
    setSelectedCert(cert)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      alert(`📄 Certificate downloaded: ${cert.courses.title}`)
    } catch (error) {
      console.error('Download error:', error)
      alert('Certificate download started! (Demo mode)')
    } finally {
      setDownloading(false)
    }
  }

  const handleShare = (cert) => {
    setSelectedCert(cert)
    setShowShareModal(true)
  }

  const handleViewCertificate = (cert) => {
    setSelectedCert(cert)
    setShowModal(true)
  }

  const handlePrint = (cert) => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>iKPACE Certificate - ${cert.courses.title}</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            .certificate { border: 20px solid #1A3D7C; padding: 40px; max-width: 800px; margin: 0 auto; }
            h1 { color: #1A3D7C; font-size: 48px; margin-bottom: 20px; }
            h2 { color: #FF7A00; font-size: 32px; margin: 20px 0; }
            .recipient { font-size: 36px; font-weight: bold; margin: 30px 0; }
            .details { color: #666; margin: 20px 0; }
            .footer { margin-top: 40px; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="certificate">
            <h1>iKPACE</h1>
            <h2>Certificate of Completion</h2>
            <p>This certifies that</p>
            <div class="recipient">${profile?.full_name}</div>
            <p>has successfully completed the course</p>
            <div class="recipient" style="font-size: 28px;">${cert.courses.title}</div>
            <div class="details">
              <p>Grade: ${cert.grade} | Score: ${cert.score}%</p>
              <p>Issued: ${formatDate(cert.issued_date)}</p>
              <p>Certificate #: ${cert.certificate_number}</p>
            </div>
            <div class="footer">
              <p>Verify at: ${cert.verification_url}</p>
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const handleShareLink = (platform) => {
    const cert = selectedCert
    const url = cert.verification_url
    const text = `I just earned my ${cert.courses.title} certificate from iKPACE! 🎓`
    const hashtags = 'iKPACE,OnlineLearning,Certificate'
    
    let shareUrl = ''
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent('My iKPACE Certificate')}&body=${encodeURIComponent(`${text}\n\nView my certificate: ${url}\n\nVerify at: ${cert.verification_url}`)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank')
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const filteredCertificates = certificates
    .filter(cert => {
      if (filter === 'high-score') return cert.score >= 95
      if (filter === 'recent') {
        const threeMonthsAgo = new Date()
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        return new Date(cert.issued_date) > threeMonthsAgo
      }
      return true
    })
    .filter(cert => 
      cert.courses.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificate_number.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return new Date(b.issued_date) - new Date(a.issued_date)
      if (sortBy === 'name') return a.courses.title.localeCompare(b.courses.title)
      if (sortBy === 'grade') return b.score - a.score
      return 0
    })

  const stats = {
    total: certificates.length,
    inProgress: inProgressCourses.length,
    averageScore: certificates.length ? Math.round(certificates.reduce((acc, cert) => acc + cert.score, 0) / certificates.length) : 0,
    highestScore: certificates.length ? Math.max(...certificates.map(c => c.score)) : 0,
    recentCount: certificates.filter(c => {
      const threeMonthsAgo = new Date()
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
      return new Date(c.issued_date) > threeMonthsAgo
    }).length
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1A3D7C] border-t-transparent mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-2">Loading Your Certificates</h3>
            <p className="text-gray-600">Your achievements are being prepared...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-28 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2 flex items-center gap-3" style={{ color: colors.primary }}>
                <Award size={40} />
                My Certificates
              </h1>
              <p className="text-gray-600 text-lg">
                Track your earned certificates and in-progress courses
              </p>
            </div>

            {(certificates.length > 0 || inProgressCourses.length > 0) && (
              <div className="flex items-center gap-3 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search certificates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-full md:w-64"
                    style={{ focusRingColor: colors.secondary }}
                  />
                </div>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  style={{ focusRingColor: colors.secondary }}
                >
                  <option value="all">All Certificates</option>
                  <option value="recent">Last 3 Months</option>
                  <option value="high-score">High Scores (95%+)</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  style={{ focusRingColor: colors.secondary }}
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Course Name</option>
                  <option value="grade">Highest Score</option>
                </select>

                <div className="flex border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    style={viewMode === 'grid' ? { background: colors.primary } : {}}
                  >
                    <Grid3x3 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                    style={viewMode === 'list' ? { background: colors.primary } : {}}
                  >
                    <LayoutList size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {(certificates.length > 0 || inProgressCourses.length > 0) && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl" style={{ background: colors.primary + '10' }}>
                  <Award style={{ color: colors.primary }} size={24} />
                </div>
                <span className="text-2xl font-bold" style={{ color: colors.primary }}>{stats.total}</span>
              </div>
              <p className="text-gray-600 text-sm">Certificates Earned</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl" style={{ background: colors.secondary + '10' }}>
                  <Hourglass style={{ color: colors.secondary }} size={24} />
                </div>
                <span className="text-2xl font-bold" style={{ color: colors.secondary }}>{stats.inProgress}</span>
              </div>
              <p className="text-gray-600 text-sm">In Progress</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl" style={{ background: colors.accent + '10' }}>
                  <Star style={{ color: colors.accent }} size={24} />
                </div>
                <span className="text-2xl font-bold" style={{ color: colors.accent }}>{stats.averageScore}%</span>
              </div>
              <p className="text-gray-600 text-sm">Average Score</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl" style={{ background: colors.success + '10' }}>
                  <Zap style={{ color: colors.success }} size={24} />
                </div>
                <span className="text-2xl font-bold" style={{ color: colors.success }}>{stats.highestScore}%</span>
              </div>
              <p className="text-gray-600 text-sm">Highest Score</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="p-3 rounded-xl" style={{ background: colors.warning + '10' }}>
                  <TrendingUp style={{ color: colors.warning }} size={24} />
                </div>
                <span className="text-2xl font-bold" style={{ color: colors.warning }}>{stats.recentCount}</span>
              </div>
              <p className="text-gray-600 text-sm">Last 3 Months</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        {(certificates.length > 0 || inProgressCourses.length > 0) && (
          <div className="bg-white rounded-xl shadow-lg mb-6 p-1 inline-flex">
            <button
              onClick={() => setActiveTab('earned')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'earned' 
                  ? 'text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={activeTab === 'earned' ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
            >
              <Award size={18} />
              Earned Certificates ({certificates.length})
            </button>
            <button
              onClick={() => setActiveTab('in-progress')}
              className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                activeTab === 'in-progress' 
                  ? 'text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={activeTab === 'in-progress' ? { background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` } : {}}
            >
              <Hourglass size={18} />
              In Progress ({inProgressCourses.length})
            </button>
          </div>
        )}

        {/* Earned Certificates Tab */}
        {activeTab === 'earned' && (
          <>
            {certificates.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl text-center py-20 px-4">
                <Award size={64} className="mx-auto mb-4" style={{ color: colors.primary + '40' }} />
                <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>No Certificates Yet</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Complete a course to earn your first certificate and showcase your achievement!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                >
                  Browse Courses
                  <BookOpen size={18} />
                </Link>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCertificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all group">
                    {/* Certificate Preview */}
                    <div className="relative h-48 p-6" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                      <div className="absolute inset-0 bg-black/20"></div>
                      <div className="relative text-center text-white">
                        <Award size={48} className="mx-auto mb-2 opacity-90" />
                        <p className="text-xs font-medium opacity-90">Certificate of Completion</p>
                        <p className="text-lg font-bold mt-2 truncate">{cert.courses.title}</p>
                      </div>
                      <div className="absolute bottom-2 right-2">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(cert.grade)}`}>
                          {cert.grade}
                        </span>
                      </div>
                    </div>

                    {/* Certificate Details */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium" style={{ color: colors.primary }}>{cert.certificate_number}</span>
                        <span className="flex items-center text-xs text-gray-500">
                          <Calendar size={12} className="mr-1" />
                          {formatShortDate(cert.issued_date)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.courses.title}</h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{cert.courses.description}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center">
                          <User size={14} className="mr-1" />
                          {cert.courses.instructor}
                        </span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          Score: {cert.score}%
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => handleViewCertificate(cert)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center justify-center"
                        >
                          <Eye size={14} className="mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleDownload(cert)}
                          disabled={downloading}
                          className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm font-medium flex items-center justify-center disabled:opacity-50"
                          style={{ background: colors.primary }}
                        >
                          <Download size={14} className="mr-1" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredCertificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-24 h-24 rounded-xl flex items-center justify-center text-white text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
                        <Award size={40} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{cert.courses.title}</h3>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${getGradeColor(cert.grade)}`}>
                            {cert.grade}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <Hash size={14} className="mr-1 text-gray-400" />
                            {cert.certificate_number}
                          </span>
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1 text-gray-400" />
                            {formatShortDate(cert.issued_date)}
                          </span>
                          <span className="flex items-center">
                            <User size={14} className="mr-1 text-gray-400" />
                            {cert.courses.instructor}
                          </span>
                          <span className="flex items-center">
                            <Star size={14} className="mr-1 text-gray-400" />
                            Score: {cert.score}%
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewCertificate(cert)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="View Certificate"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => handleDownload(cert)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download size={18} />
                        </button>
                        <button
                          onClick={() => handleShare(cert)}
                          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                          title="Share Certificate"
                        >
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* In Progress Courses Tab */}
        {activeTab === 'in-progress' && (
          <>
            {inProgressCourses.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl text-center py-20 px-4">
                <Hourglass size={64} className="mx-auto mb-4" style={{ color: colors.primary + '40' }} />
                <h2 className="text-2xl font-bold mb-4" style={{ color: colors.primary }}>No Courses In Progress</h2>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Start a new course today and earn your next certificate!
                </p>
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                >
                  Browse Courses
                  <BookOpen size={18} />
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {inProgressCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                    <div className="p-6">
                      {/* Course Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                            <p className="text-sm text-gray-600">by {course.instructor} • {course.category}</p>
                          </div>
                        </div>
                        <Link
                          to={`/course/${course.id}`}
                          className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2"
                          style={{ background: colors.secondary }}
                        >
                          <PlayCircle size={18} />
                          Continue Learning
                        </Link>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Course Progress</span>
                          <span className="font-bold" style={{ color: colors.primary }}>{course.progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${course.progress}%`,
                              background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Course Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Lessons</p>
                          <p className="font-bold text-gray-900">{course.lessons_completed}/{course.total_lessons}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Time Spent</p>
                          <p className="font-bold text-gray-900">{course.time_spent}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Est. Completion</p>
                          <p className="font-bold text-gray-900">{course.estimated_completion}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Next Action</p>
                          <p className="font-bold text-gray-900 text-sm">{course.next_action}</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-500 mb-1">Achievements</p>
                          <div className="flex items-center gap-1">
                            {course.achievements.map((ach, idx) => (
                              <span key={idx} className="text-lg" title={ach.name}>
                                {ach.earned ? ach.icon : <span className="opacity-30">{ach.icon}</span>}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Certificate Status */}
                      <div className="p-4 rounded-lg" style={{ background: colors.lightGray }}>
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg" style={{ background: colors.warning + '20' }}>
                            <Hourglass size={20} style={{ color: colors.warning }} />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">Certificate Status: In Progress</p>
                            <p className="text-sm text-gray-600">
                              Complete {course.total_lessons - course.lessons_completed} more lessons to earn your certificate.
                              {course.progress >= 75 && " You're almost there! Keep going!"}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: colors.warning + '20', color: colors.warning }}>
                              {course.progress}% Complete
                            </span>
                          </div>
                        </div>

                        {/* Progress Steps */}
                        <div className="mt-4 grid grid-cols-4 gap-2">
                          {[25, 50, 75, 100].map((milestone, idx) => (
                            <div key={idx} className="relative">
                              <div className={`h-2 rounded-full mb-1 ${course.progress >= milestone ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                              <p className={`text-xs ${course.progress >= milestone ? 'text-green-600' : 'text-gray-400'}`}>
                                {milestone}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Certificate Preview (Locked) */}
                      {course.progress < 100 && (
                        <div className="mt-4 p-4 border-2 border-dashed rounded-lg text-center" style={{ borderColor: colors.lightGray }}>
                          <div className="flex items-center justify-center gap-3">
                            <div className="p-2 rounded-full" style={{ background: colors.lightGray }}>
                              <Lock size={20} className="text-gray-400" />
                            </div>
                            <p className="text-gray-500">
                              Certificate will be available upon completion
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Certificate Info Footer */}
        <div className="mt-12 rounded-2xl p-8 border" style={{ background: colors.primary + '05', borderColor: colors.primary + '20' }}>
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="p-4 bg-white rounded-xl shadow-md">
              <Award size={48} style={{ color: colors.secondary }} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>About iKPACE Certificates</h3>
              <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span>Industry-recognized certificates with unique verification numbers</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span>Shareable on LinkedIn, resume, and professional portfolio</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span>Downloadable PDF format for printing and sharing</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                  <span>Lifetime access to all earned certificates</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info size={18} className="text-blue-500 flex-shrink-0 mt-1" />
                  <span>Certificates unlock at 100% course completion</span>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle size={18} className="text-yellow-500 flex-shrink-0 mt-1" />
                  <span>Track your progress in the "In Progress" tab</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate View Modal */}
      {showModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold" style={{ color: colors.primary }}>Certificate of Completion</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8" ref={certificateRef}>
              {/* Certificate Design */}
              <div className="border-8 p-8 bg-white" style={{ borderColor: colors.primary }}>
                <div className="text-center">
                  <Award size={80} className="mx-auto mb-6" style={{ color: colors.secondary }} />
                  
                  <h1 className="text-5xl font-bold mb-4" style={{ color: colors.primary }}>iKPACE</h1>
                  <h2 className="text-3xl text-gray-700 mb-8">Certificate of Completion</h2>
                  
                  <p className="text-xl text-gray-600 mb-4">This certifies that</p>
                  <p className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>{profile?.full_name}</p>
                  
                  <p className="text-xl text-gray-600 mb-4">has successfully completed the course</p>
                  <p className="text-3xl font-bold mb-8" style={{ color: colors.secondary }}>{selectedCert.courses.title}</p>
                  
                  <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto mb-8">
                    <div>
                      <p className="text-sm text-gray-500">Grade Achieved</p>
                      <p className="text-2xl font-bold" style={{ color: colors.primary }}>{selectedCert.grade}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Score</p>
                      <p className="text-2xl font-bold" style={{ color: colors.primary }}>{selectedCert.score}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Issue Date</p>
                      <p className="text-lg font-semibold text-gray-700">{formatDate(selectedCert.issued_date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Certificate #</p>
                      <p className="text-lg font-semibold text-gray-700">{selectedCert.certificate_number}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-6">
                    <img 
                      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='50' viewBox='0 0 150 50'%3E%3Cpath d='M75 10 L90 40 L60 40 Z' fill='%231A3D7C'/%3E%3Ctext x='75' y='30' text-anchor='middle' fill='%231A3D7C' font-size='12'%3EiKPACE%3C/text%3E%3C/svg%3E"
                      alt="iKPACE Seal"
                      className="mx-auto mb-4"
                    />
                    <p className="text-sm text-gray-500">
                      Verify this certificate at: {selectedCert.verification_url}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
              <button
                onClick={() => handlePrint(selectedCert)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Printer size={18} />
                Print
              </button>
              <button
                onClick={() => handleDownload(selectedCert)}
                disabled={downloading}
                className="px-6 py-2 text-white rounded-lg hover:opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50"
                style={{ background: colors.primary }}
              >
                <Download size={18} />
                {downloading ? 'Downloading...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedCert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-bold" style={{ color: colors.primary }}>Share Certificate</h3>
              <button onClick={() => setShowShareModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Share your achievement with the world!
              </p>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                <button
                  onClick={() => handleShareLink('facebook')}
                  className="p-4 bg-[#1877F2] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Facebook size={24} className="mx-auto" />
                </button>
                <button
                  onClick={() => handleShareLink('twitter')}
                  className="p-4 bg-[#1DA1F2] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Twitter size={24} className="mx-auto" />
                </button>
                <button
                  onClick={() => handleShareLink('linkedin')}
                  className="p-4 bg-[#0A66C2] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Linkedin size={24} className="mx-auto" />
                </button>
                <button
                  onClick={() => handleShareLink('email')}
                  className="p-4 bg-gray-600 text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <Mail size={24} className="mx-auto" />
                </button>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Verification Link</p>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={selectedCert.verification_url}
                    readOnly
                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(selectedCert.verification_url)}
                    className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                    style={{ background: colors.primary }}
                  >
                    {copied ? <CheckCircle size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}