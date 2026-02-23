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

  // Courses with reliable Pexels images
  const courses = [
    {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      shortDescription: 'Master VA skills, client management, and remote work tools',
      duration: '6 Weeks',
      hours: 60,
      students: '3,200+',
      enrolled: 3247,
      rating: 4.9,
      reviews: 856,
      price: 7,
      originalPrice: 49,
      category: 'Career',
      level: 'Beginner',
      badge: 'VA PRO',
      color: 'from-[#1A3D7C] to-[#FF7A00]',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Client Management', 'Email Marketing', 'Calendar', 'Social Media'],
      instructor: 'Amara Osei',
      icon: '👩🏾'
    },
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      shortDescription: 'Master content creation, ads, and growth strategies',
      duration: '6 Weeks',
      hours: 55,
      students: '2,800+',
      enrolled: 2856,
      rating: 4.8,
      reviews: 723,
      price: 7,
      originalPrice: 49,
      category: 'Marketing',
      level: 'Beginner',
      badge: 'SMM PRO',
      color: 'from-[#FF7A00] to-[#FF9A3C]',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Content Strategy', 'Paid Ads', 'Analytics', 'Community'],
      instructor: 'Kofi Asante',
      icon: '👨🏾'
    },
    {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      shortDescription: 'Create stunning designs, logos, and branding materials',
      duration: '4 Weeks',
      hours: 40,
      students: '1,900+',
      enrolled: 1900,
      rating: 4.7,
      reviews: 523,
      price: 7,
      originalPrice: 39,
      category: 'Design',
      level: 'Beginner',
      badge: 'DESIGN',
      color: 'from-[#008F4C] to-[#00C853]',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Logo Design', 'Social Graphics', 'Branding', 'Presentations'],
      instructor: 'Esi Darkwah',
      icon: '👩🏾'
    },
    {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      shortDescription: 'Fun coding for kids with Scratch and game creation',
      duration: '4 Weeks',
      hours: 30,
      students: '1,200+',
      enrolled: 1200,
      rating: 4.9,
      reviews: 345,
      price: 7,
      originalPrice: 35,
      category: 'Kids',
      level: 'Beginner',
      badge: 'KIDS',
      color: 'from-[#FF6D00] to-[#FFD600]',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Scratch', 'Game Design', 'Animation', 'Logic'],
      instructor: 'Kwame Asare',
      icon: '👨🏾'
    },
    {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      shortDescription: 'Start earning online with freelancing skills',
      duration: '4 Weeks',
      hours: 35,
      students: '2,100+',
      enrolled: 2100,
      rating: 4.8,
      reviews: 678,
      price: 7,
      originalPrice: 39,
      category: 'Business',
      level: 'Beginner',
      badge: 'FREELANCE',
      color: 'from-[#00C853] to-[#B2FF59]',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['Upwork', 'Client Acquisition', 'Pricing', 'Portfolio'],
      instructor: 'Yaa Asantewaa',
      icon: '👩🏾'
    }
  ]

  const categories = ['all', 'Career', 'Marketing', 'Design', 'Kids', 'Business']
  
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

  const totalStudents = courses.reduce((acc, course) => acc + course.enrolled, 0).toLocaleString()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header - Clean and Simple */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-3" style={{ color: colors.primary }}>
            Our Courses
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our selection of professional courses designed to boost your career
          </p>
        </div>

        {/* Category Filter - Clean */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              style={selectedCategory === cat ? { background: colors.primary } : {}}
            >
              {cat === 'all' ? 'All Courses' : cat}
            </button>
          ))}
        </div>

        {/* Course Cards Grid - Clean Design */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div 
              key={course.id} 
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
            >
              {/* Image - Fixed with proper sizing */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
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

                {/* Save Button */}
                <button
                  onClick={() => toggleSaveCourse(course.id)}
                  className="absolute bottom-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
                >
                  <Heart 
                    size={14} 
                    className={savedCourses.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                  />
                </button>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
              
              {/* Content - Clean and Clear */}
              <div className="p-5">
                {/* Instructor */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{course.icon}</span>
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                    {course.level}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                  {course.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {course.shortDescription}
                </p>
                
                {/* Features - Simple Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.features.slice(0, 3).map((feature, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                      {feature}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                    +{course.features.length - 3}
                  </span>
                </div>
                
                {/* Stats - Clean */}
                <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock size={12} style={{ color: colors.primary }} />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={12} style={{ color: colors.secondary }} />
                    {course.students}
                  </span>
                </div>
                
                {/* Price and Buttons - All Links Active */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <span className="text-xl font-bold" style={{ color: colors.primary }}>${course.price}</span>
                    <span className="text-gray-400 text-xs line-through ml-2">${course.originalPrice}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Enroll Now Button */}
                    <Link
                      to={`/course/${course.id}`}
                      className="px-4 py-1.5 rounded-full text-xs font-medium text-white hover:scale-105 transition-all shadow-sm"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                    >
                      Enroll
                    </Link>
                    
                    {/* View More Button */}
                    <Link
                      to={`/course/${course.id}/view-more`}
                      className="px-4 py-1.5 rounded-full text-xs font-medium border hover:bg-gray-50 transition-all"
                      style={{ borderColor: colors.primary, color: colors.primary }}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Courses Link */}
        <div className="text-center mt-10">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-base font-medium hover:gap-3 transition-all"
            style={{ color: colors.primary }}
          >
            View All Courses <ArrowRight size={16} />
          </Link>
        </div>

        {/* Simple Promo Banner */}
        <div className="mt-12 p-6 rounded-xl text-white text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
          <h3 className="text-xl font-bold mb-2">Limited Time Offer</h3>
          <p className="text-white/90 mb-4">All courses just $7. Start learning today!</p>
          <Link
            to="/pricing"
            className="inline-block px-6 py-2 bg-white rounded-full font-bold text-sm hover:scale-105 transition-all"
            style={{ color: colors.primary }}
          >
            Claim Offer <ArrowRight size={14} className="inline ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}