import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Clock, Users, Star, ArrowRight, Filter, Search, 
  BookOpen, Award, TrendingUp, Zap, Heart, Share2,
  Bookmark, CheckCircle, Sparkles, GraduationCap,
  ChevronDown, Grid3x3, LayoutList, Eye, PlayCircle,
  Download, Gift, Flame, Crown, Medal, Gem
} from 'lucide-react'

export default function MyCourses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState('grid')
  const [hoveredCourse, setHoveredCourse] = useState(null)
  const [savedCourses, setSavedCourses] = useState([])

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

  // Enhanced courses data - HONEST numbers for a new setup
  const allCourses = [
    {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      description: 'Master administrative skills, communication, social media assistance, and client acquisition to become a successful virtual assistant.',
      shortDesc: 'Complete VA training for remote work success',
      price: 7,
      duration: '6 Weeks',
      students: 32,
      rating: 4.9,
      reviews: 18,
      category: 'business',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
      badge: 'VA PRO',
      features: ['Client Management', 'Email Marketing', 'Calendar Management', 'Social Media'],
      lessons: 24,
      projects: 3,
      certificate: true,
      updated: '2025-01-15'
    },
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      description: 'Learn content creation, branding, paid ads, analytics, and campaign planning to become a social media marketing expert.',
      shortDesc: 'Master all major social platforms',
      price: 7,
      duration: '6 Weeks',
      students: 28,
      rating: 4.8,
      reviews: 15,
      category: 'social',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      badge: 'SMM PRO',
      features: ['Content Strategy', 'Paid Ads', 'Analytics', 'Community Management'],
      lessons: 28,
      projects: 4,
      certificate: true,
      updated: '2025-02-01'
    },
    {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      description: 'Learn design fundamentals, Canva mastery, branding design, and build a professional graphic design portfolio in 4 weeks.',
      shortDesc: 'Create stunning designs without experience',
      price: 7,
      duration: '4 Weeks',
      students: 19,
      rating: 4.7,
      reviews: 12,
      category: 'design',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
      badge: 'DESIGN',
      features: ['Logo Design', 'Social Graphics', 'Branding', 'Presentations'],
      lessons: 20,
      projects: 5,
      certificate: true,
      updated: '2025-01-20'
    },
    {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      description: 'Introduce kids to coding through Scratch! Build animations, stories, and games in a fun, interactive 4-week program.',
      shortDesc: 'Fun coding for ages 6-12',
      price: 7,
      duration: '4 Weeks',
      students: 12,
      rating: 4.9,
      reviews: 8,
      category: 'kids',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      badge: 'KIDS',
      features: ['Scratch Programming', 'Game Design', 'Animation', 'Logic Building'],
      lessons: 16,
      projects: 4,
      certificate: true,
      updated: '2025-02-10'
    },
    {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      description: 'Learn freelancing fundamentals, profile setup, client acquisition, pricing strategy, and build a sustainable online income.',
      shortDesc: 'Start earning online from anywhere',
      price: 7,
      duration: '4 Weeks',
      students: 21,
      rating: 4.8,
      reviews: 14,
      category: 'business',
      level: 'Beginner',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      badge: 'FREELANCE',
      features: ['Upwork/Fiverr', 'Client Acquisition', 'Pricing Strategy', 'Portfolio'],
      lessons: 22,
      projects: 3,
      certificate: true,
      updated: '2025-01-28'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Courses', icon: <BookOpen size={16} /> },
    { id: 'business', name: 'Business', icon: <TrendingUp size={16} /> },
    { id: 'social', name: 'Social Media', icon: <Zap size={16} /> },
    { id: 'design', name: 'Design', icon: <Gem size={16} /> },
    { id: 'kids', name: 'Kids', icon: <GraduationCap size={16} /> }
  ]

  // Calculate total students honestly
  const totalStudents = allCourses.reduce((acc, course) => acc + course.students, 0)

  useEffect(() => {
    setCourses(allCourses)
    setLoading(false)
    
    // Load saved courses from localStorage
    const saved = localStorage.getItem('savedCourses')
    if (saved) {
      setSavedCourses(JSON.parse(saved))
    }
  }, [])

  // Filter and sort courses
  const filteredCourses = courses
    .filter(course => {
      if (activeCategory !== 'all' && course.category !== activeCategory) return false
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        return course.title.toLowerCase().includes(term) || 
               course.description.toLowerCase().includes(term) ||
               course.badge.toLowerCase().includes(term)
      }
      return true
    })
    .sort((a, b) => {
      switch(sortBy) {
        case 'popular':
          return b.students - a.students
        case 'rating':
          return b.rating - a.rating
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'newest':
          return new Date(b.updated) - new Date(a.updated)
        default:
          return 0
      }
    })

  const toggleSaveCourse = (courseId) => {
    const newSaved = savedCourses.includes(courseId)
      ? savedCourses.filter(id => id !== courseId)
      : [...savedCourses, courseId]
    
    setSavedCourses(newSaved)
    localStorage.setItem('savedCourses', JSON.stringify(newSaved))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: colors.lightGray }}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{ borderColor: colors.primary, borderTopColor: 'transparent' }}></div>
          <p style={{ color: colors.primary }}>Loading courses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            background: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">5 Courses • All for $7</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Start Your <span style={{ color: colors.secondary }}>Learning Journey</span> Today
            </h1>
            
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Master in-demand skills with our expert-led courses. 
              Join our growing community of learners for just $7.
            </p>

            {/* Stats - HONEST numbers */}
            <div className="flex flex-wrap justify-center gap-8 text-white">
              <div className="flex items-center gap-2">
                <Users size={20} />
                <span>{totalStudents} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={20} className="fill-current text-yellow-400" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span>Certified Courses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-2 transition-colors"
                style={{ focusBorderColor: colors.secondary }}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.id
                        ? 'text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={activeCategory === cat.id ? { background: colors.secondary } : {}}
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 px-4 py-2 pr-8 rounded-lg text-sm font-medium focus:outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* View Toggle */}
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'text-white' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  style={viewMode === 'grid' ? { background: colors.primary } : {}}
                >
                  <Grid3x3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'text-white' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  style={viewMode === 'list' ? { background: colors.primary } : {}}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-bold" style={{ color: colors.primary }}>{filteredCourses.length}</span> courses
            </p>
            <p className="text-sm text-gray-500">
              ⚡ {savedCourses.length} saved
            </p>
          </div>
        </div>
      </section>

      {/* Courses Grid/List - HONEST numbers */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
              <p className="text-gray-600">Try adjusting your search or filter</p>
              <button
                onClick={() => {
                  setActiveCategory('all')
                  setSearchTerm('')
                }}
                className="mt-4 px-6 py-2 rounded-full text-white font-medium"
                style={{ background: colors.primary }}
              >
                Clear Filters
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            // Grid View - HONEST numbers
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  onMouseEnter={() => setHoveredCourse(course.id)}
                  onMouseLeave={() => setHoveredCourse(null)}
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: colors.secondary, color: colors.white }}>
                        {course.badge}
                      </span>
                      <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold" style={{ color: colors.primary }}>
                        {course.level}
                      </span>
                    </div>

                    {/* Price Tag - Only $7 */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-2xl font-bold text-white">${course.price}</span>
                      <span className="text-sm text-white/70 ml-2">one-time</span>
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={() => toggleSaveCourse(course.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      <Heart 
                        size={16} 
                        className={savedCourses.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                      />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {course.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          {feature}
                        </span>
                      ))}
                      {course.features.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                          +{course.features.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Stats - HONEST numbers */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} /> {course.students} students
                      </span>
                      <span className="flex items-center gap-1" style={{ color: colors.warning }}>
                        <Star size={12} className="fill-current" /> {course.rating} ({course.reviews})
                      </span>
                    </div>

                    {/* Action Buttons - Single View Details Button */}
                    <Link
                      to={`/course/${course.id}`}
                      className="w-full text-center text-sm font-semibold py-2.5 rounded-lg text-white transition-all hover:scale-105 block"
                      style={{ background: colors.secondary }}
                    >
                      View Details <ArrowRight size={14} className="inline ml-1" />
                    </Link>
                  </div>

                  {/* Hover Overlay with Quick Preview */}
                  {hoveredCourse === course.id && (
                    <div className="absolute inset-0 bg-primary/90 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <PlayCircle size={40} className="mb-3" />
                      <p className="text-sm font-medium mb-2">Quick Preview</p>
                      <p className="text-xs text-center opacity-90 mb-3">
                        {course.lessons} lessons • {course.projects} projects
                      </p>
                      <div className="flex items-center gap-2">
                        <CheckCircle size={14} />
                        <span className="text-xs">Certificate included</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            // List View - HONEST numbers
            <div className="space-y-4">
              {filteredCourses.map(course => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto relative">
                      <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 rounded-full text-xs font-bold" style={{ background: colors.secondary, color: colors.white }}>
                          {course.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
                        </div>
                        <button
                          onClick={() => toggleSaveCourse(course.id)}
                          className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:scale-110 transition-transform"
                        >
                          <Heart 
                            size={16} 
                            className={savedCourses.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                          />
                        </button>
                      </div>

                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>

                      {/* Features */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.features.map((feature, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Stats - HONEST numbers */}
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                        <span className="flex items-center gap-1"><Users size={14} /> {course.students} students</span>
                        <span className="flex items-center gap-1" style={{ color: colors.warning }}>
                          <Star size={14} className="fill-current" /> {course.rating} ({course.reviews} reviews)
                        </span>
                        <span className="flex items-center gap-1"><BookOpen size={14} /> {course.lessons} lessons</span>
                      </div>

                      {/* Price and CTA - Single View Details Button */}
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-3xl font-bold" style={{ color: colors.primary }}>${course.price}</span>
                          <span className="text-sm text-gray-500 ml-2">one-time</span>
                        </div>
                        <Link
                          to={`/course/${course.id}`}
                          className="px-6 py-2.5 rounded-full text-white font-semibold transition-all hover:scale-105"
                          style={{ background: colors.secondary }}
                        >
                          View Details <ArrowRight size={16} className="inline ml-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Promo Banner - Updated with honest message */}
          <div className="mt-12 p-6 rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Gift size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">Special Launch Offer</h4>
                  <p className="text-white/90 text-sm">Every course is just $7. Join {totalStudents} other students!</p>
                </div>
              </div>
              <Link
                to="/pricing"
                className="px-8 py-3 rounded-full bg-white font-bold transition-all hover:scale-105 shadow-lg"
                style={{ color: colors.primary }}
              >
                Get Started <ArrowRight size={16} className="inline ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}