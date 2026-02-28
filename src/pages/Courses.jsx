import { Link } from 'react-router-dom'
import { 
  Clock, Users, Star, ArrowRight, Award, BookOpen,
  TrendingUp, Zap, Shield, Gift, CheckCircle, Sparkles,
  Target, Globe, GraduationCap, Heart, PlayCircle,
  Download, Share2, ThumbsUp, MessageCircle, Coffee,
  Rocket, Crown, Medal, Gem, Flame, Filter
} from 'lucide-react'
import { useState } from 'react'

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState('all')
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

  // Courses with HONEST numbers - REMOVED instructor names and original prices
  const courses = [
    {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      shortDescription: 'Master VA skills, client management, and remote work tools',
      duration: '6 Weeks',
      hours: 60,
      students: '32',
      enrolled: 32,
      rating: 4.9,
      reviews: 18,
      price: 7,
      category: 'Career',
      level: 'Beginner',
      badge: 'Popular',
      color: 'from-[#1A3D7C] to-[#FF7A00]',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Client Management', 'Email', 'Calendar'],
      icon: '👩🏾'
    },
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      shortDescription: 'Master content creation, ads, and growth strategies',
      duration: '6 Weeks',
      hours: 55,
      students: '28',
      enrolled: 28,
      rating: 4.8,
      reviews: 15,
      price: 7,
      category: 'Marketing',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#FF7A00] to-[#FF9A3C]',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Content', 'Ads', 'Analytics'],
      icon: '👨🏾'
    },
    {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      shortDescription: 'Create stunning designs, logos, and branding materials',
      duration: '4 Weeks',
      hours: 40,
      students: '19',
      enrolled: 19,
      rating: 4.7,
      reviews: 12,
      price: 7,
      category: 'Design',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#008F4C] to-[#00C853]',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Logo', 'Social Graphics', 'Branding'],
      icon: '👩🏾'
    },
    {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      shortDescription: 'Fun coding for kids with Scratch and game creation',
      duration: '4 Weeks',
      hours: 30,
      students: '12',
      enrolled: 12,
      rating: 4.9,
      reviews: 8,
      price: 7,
      category: 'Kids',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#FF6D00] to-[#FFD600]',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Scratch', 'Games', 'Animation'],
      icon: '👨🏾'
    },
    {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      shortDescription: 'Start earning online with freelancing skills',
      duration: '4 Weeks',
      hours: 35,
      students: '21',
      enrolled: 21,
      rating: 4.8,
      reviews: 14,
      price: 7,
      category: 'Business',
      level: 'Beginner',
      badge: 'Popular',
      color: 'from-[#00C853] to-[#B2FF59]',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Upwork', 'Clients', 'Pricing'],
      icon: '👩🏾'
    },
    {
      id: 'ai-prompt-engineering',
      title: 'AI Prompt Engineering',
      shortDescription: 'Master AI tools for content creation',
      duration: '6 Weeks',
      hours: 45,
      students: '18',
      enrolled: 18,
      rating: 4.9,
      reviews: 11,
      price: 7,
      category: 'Tech',
      level: 'Intermediate',
      badge: 'New',
      color: 'from-[#4A6FA5] to-[#2F5EA8]',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['ChatGPT', 'Midjourney', 'Automation'],
      icon: '👨🏾'
    }
  ]

  const categories = ['all', 'Career', 'Marketing', 'Design', 'Kids', 'Business', 'Tech']
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory)

  const toggleSaveCourse = (courseId) => {
    setSavedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    )
  }

  const totalStudents = courses.reduce((acc, course) => acc + course.enrolled, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Clean and Honest */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
            🎓 START LEARNING TODAY
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: colors.primary }}>
            Our <span style={{ color: colors.secondary }}>Courses</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {totalStudents} students have enrolled in our courses. Join them today for just $7!
          </p>
        </div>

        {/* Category Filter - Clean */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                selectedCategory === cat
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              style={selectedCategory === cat ? { background: colors.secondary } : {}}
            >
              {cat === 'all' ? 'All Courses' : cat}
            </button>
          ))}
        </div>

        {/* Course Cards - MODIFIED: No instructor names, only $7 price, single View Details button */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Image with Link */}
              <Link to={`/course/${course.id}`} className="block relative h-48 overflow-hidden bg-gray-100">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop';
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: colors.primary }}>
                    {course.badge}
                  </span>
                </div>
                
                {/* Category Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                    {course.category}
                  </span>
                </div>

                {/* Save Button - Prevent Link Navigation */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleSaveCourse(course.id);
                  }}
                  className="absolute bottom-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform z-10"
                >
                  <Heart 
                    size={14} 
                    className={savedCourses.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                  />
                </button>
              </Link>
              
              {/* Content - NO INSTRUCTOR NAMES */}
              <div className="p-5">
                {/* Level Badge Only - Removed instructor */}
                <div className="flex justify-end mb-2">
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                    {course.level}
                  </span>
                </div>

                {/* Title - Clickable Link */}
                <Link to={`/course/${course.id}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 hover:underline" style={{ color: colors.primary }}>
                    {course.title}
                  </h3>
                </Link>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.shortDescription}
                </p>
                
                {/* Features - Simple */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.features.map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
                
                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} style={{ color: colors.primary }} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} style={{ color: colors.secondary }} />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-400 fill-current" />
                    {course.rating} ({course.reviews})
                  </span>
                </div>
                
                {/* Price and Single View Details Button - BRIGHT COLOR */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold" style={{ color: colors.primary }}>${course.price}</span>
                    <span className="text-xs text-gray-500 ml-2">one-time</span>
                  </div>
                  
                  {/* Single View Details Button - Removed Enroll Now */}
                  <Link
                    to={`/course/${course.id}`}
                    className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md hover:scale-105 transition-all"
                    style={{ background: colors.secondary }}
                  >
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-xl shadow-sm">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>{totalStudents}</div>
            <div className="text-xs text-gray-600">Total Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.secondary }}>{courses.length}</div>
            <div className="text-xs text-gray-600">Active Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.success }}>4.8</div>
            <div className="text-xs text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.accent }}>265+</div>
            <div className="text-xs text-gray-600">Learning Hours</div>
          </div>
        </div>

        {/* Simple Promo Banner - With Working Link */}
        <div className="mt-12 p-6 rounded-xl text-white text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
          <h3 className="text-xl font-bold mb-2">Special Launch Offer</h3>
          <p className="text-white/90 mb-4">All courses $7 each • Limited time</p>
          <Link
            to="/pricing"
            className="inline-block px-6 py-2 bg-white rounded-full font-bold text-sm hover:scale-105 transition-all"
            style={{ color: colors.primary }}
          >
            Get Started Now <ArrowRight size={14} className="inline ml-1" />
          </Link>
          <p className="text-xs text-white/70 mt-3">{totalStudents} students already learning</p>
        </div>

        {/* Browse More Link - Removed as it was empty */}
      </div>
    </div>
  )
}