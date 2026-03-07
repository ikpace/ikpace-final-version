import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

<<<<<<< HEAD
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
=======
  // YOUR ACTUAL COURSES FROM BACKUP - SIMPLE VERSION
  const allCourses = [
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
    {
      id: 'tiktok-mastery',
      title: 'TikTok Monetization Mastery',
      description: 'Master TikTok algorithm, viral content creation, brand partnerships.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 2847,
      rating: 4.9,
<<<<<<< HEAD
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
=======
      category: 'social',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      badge: '?? #1 SELLER'
    },
    {
      id: 'instagram-reels',
      title: 'Instagram Reels & Growth Hacks',
      description: 'Master Instagram Reels algorithm, content strategy, engagement hacks.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 1893,
      rating: 4.8,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800',
      badge: '?? TRENDING'
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
    },
    {
      id: 'youtube-automation',
      title: 'YouTube Automation Mastery',
      description: 'Create automated YouTube channels without showing your face.',
      price: 7,
      originalPrice: 69,
      duration: '8 Weeks',
      students: 1567,
      rating: 4.7,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800',
      badge: '?? PASSIVE INCOME'
    },
    {
      id: 'content-to-cash',
      title: 'Content to Cash System',
      description: 'Learn how to monetize content across platforms.',
      price: 7,
      originalPrice: 49,
      duration: '5 Weeks',
      students: 2341,
      rating: 4.8,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      badge: '?? MULTIPLE STREAMS'
    },
    {
      id: 'influencer-playbook',
      title: 'Influencer Brand Deal Playbook',
      description: 'Complete guide to landing brand deals, negotiating contracts.',
      price: 7,
<<<<<<< HEAD
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
=======
      originalPrice: 35,
      duration: '4 Weeks',
      students: 987,
      rating: 4.9,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      badge: '?? BRAND DEALS'
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
    },
    {
      id: 'ai-prompt-engineering',
      title: 'AI Prompt Engineering Pro',
      description: 'Become an AI prompt expert for content creation and automation.',
      price: 7,
      originalPrice: 79,
      duration: '6 Weeks',
      students: 3456,
      rating: 4.9,
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      badge: '?? VERY HOT'
    },
    {
      id: 'ai-business-automation',
      title: 'AI Tools for Business Automation',
      description: 'Learn to use AI for customer service, content creation, and data analysis.',
      price: 7,
      originalPrice: 59,
      duration: '5 Weeks',
      students: 2789,
      rating: 4.8,
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
      badge: '? TIME SAVER'
    },
    {
      id: 'ai-agents',
      title: 'Build AI Agents Without Coding',
      description: 'Learn to build AI agents that can research, write, analyze data.',
      price: 7,
      originalPrice: 69,
      duration: '6 Weeks',
      students: 1567,
      rating: 4.7,
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
      badge: '?? NO-CODE AI'
    },
    {
      id: 'ai-freelancers',
      title: 'AI for Freelancers & Side Hustles',
      description: 'Learn how freelancers can use AI to deliver better work faster.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 4321,
      rating: 4.9,
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
      badge: '?? FREELANCE BOOST'
    },
    {
      id: 'ai-content-creation',
      title: 'AI Content Creation Pro',
      description: 'Master AI tools for creating engaging content across all platforms.',
      price: 7,
      originalPrice: 55,
      duration: '5 Weeks',
      students: 1890,
      rating: 4.8,
      category: 'ai',
      image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800',
      badge: '?? CONTENT CREATION'
    },
    {
      id: 'nocode-websites',
      title: 'No-Code Website Builder Pro',
      description: 'Master Webflow, Framer, and Bubble to create stunning websites.',
      price: 7,
<<<<<<< HEAD
      category: 'Tech',
      level: 'Intermediate',
      badge: 'New',
      color: 'from-[#4A6FA5] to-[#2F5EA8]',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
      features: ['ChatGPT', 'Midjourney', 'Automation'],
      icon: '👨🏾'
=======
      originalPrice: 49,
      duration: '6 Weeks',
      students: 1890,
      rating: 4.8,
      category: 'nocode',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      badge: '?? NO-CODE'
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
    }
  ]

  useEffect(() => {
    setCourses(allCourses)
    setLoading(false)
  }, [])

  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Courses</h1>
            <p className="text-xl mb-8">{courses.length} Premium Courses � All for $7</p>
          </div>
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
        </div>
      </div>

<<<<<<< HEAD
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
=======
      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="h-48 bg-gray-200">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{course.title}</h3>
                    <span className="text-xs bg-yellow-100 px-2 py-1 rounded">{course.badge}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    </div>
                    <Link 
                      to={`/course/${course.id}`}
                      className="px-4 py-2 bg-[#7329ce] text-white rounded-lg text-sm"
                    >
                      View Details
                    </Link>
                  </div>
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
                </div>
              </div>
            ))}
          </div>
<<<<<<< HEAD
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
=======
        )}
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
      </div>
    </div>
  )
}
