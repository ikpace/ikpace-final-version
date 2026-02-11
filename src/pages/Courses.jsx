import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  // YOUR ACTUAL COURSES FROM BACKUP - SIMPLE VERSION
  const allCourses = [
    {
      id: 'tiktok-mastery',
      title: 'TikTok Monetization Mastery',
      description: 'Master TikTok algorithm, viral content creation, brand partnerships.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 2847,
      rating: 4.9,
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
      originalPrice: 35,
      duration: '4 Weeks',
      students: 987,
      rating: 4.9,
      category: 'social',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      badge: '?? BRAND DEALS'
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
      originalPrice: 49,
      duration: '6 Weeks',
      students: 1890,
      rating: 4.8,
      category: 'nocode',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      badge: '?? NO-CODE'
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
            <p className="text-xl mb-8">{courses.length} Premium Courses • All for $7</p>
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
