import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // ==================== 5 NEW COURSES ONLY ====================
  const allCourses = [
    {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      description: 'Master administrative skills, communication, social media assistance, and client acquisition to become a successful virtual assistant.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 1845,
      rating: 4.8,
      category: 'business',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800',
      badge: 'VA PRO'
    },
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      description: 'Learn content creation, branding, paid ads, analytics, and campaign planning to become a social media marketing expert.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 2156,
      rating: 4.9,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      badge: 'SMM PRO'
    },
    {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      description: 'Learn design fundamentals, Canva mastery, branding design, and build a professional graphic design portfolio in 4 weeks.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 2890,
      rating: 4.8,
      category: 'design',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
      badge: 'DESIGN'
    },
    {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      description: 'Introduce kids to coding through Scratch! Build animations, stories, and games in a fun, interactive 4-week program.',
      price: 7,
      originalPrice: 35,
      duration: '4 Weeks',
      students: 1567,
      rating: 4.9,
      category: 'kids',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      badge: 'KIDS'
    },
    {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      description: 'Learn freelancing fundamentals, profile setup, client acquisition, pricing strategy, and build a sustainable online income.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 3210,
      rating: 4.8,
      category: 'business',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800',
      badge: 'FREELANCE'
    }
  ]

  useEffect(() => {
    setCourses(allCourses)
    setLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Courses</h1>
            <p className="text-xl mb-8">{courses.length} Premium Courses - All for $7</p>
          </div>
        </div>
      </div>

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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}