import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { Clock, BookOpen, TrendingUp } from 'lucide-react'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })

      if (error) throw error
      setCourses(data || [])
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const mockCourses = [
    {
      id: '1',
      title: 'Information Technology Fundamentals',
      slug: 'it-fundamentals',
      description: 'Master the basics of IT including hardware, software, networking, and troubleshooting. Perfect for beginners looking to start a career in technology.',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1247
    },
    {
      id: '2',
      title: 'Data Analysis with Excel & Python',
      slug: 'data-analysis',
      description: 'Learn data analysis from scratch with Excel, Power BI intro, and Python basics. Transform raw data into actionable insights.',
      price: 7.00,
      duration_weeks: 6,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 2134
    },
    {
      id: '3',
      title: 'Cybersecurity Fundamentals',
      slug: 'cybersecurity',
      description: 'Understand cyber threats, security principles, and how to protect systems. Start your journey in the high-demand cybersecurity field.',
      price: 7.00,
      duration_weeks: 6,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 986
    },
    {
      id: '4',
      title: 'Virtual Assistant Mastery',
      slug: 'virtual-assistant',
      description: 'Learn administrative skills, time management, and tools to become a successful virtual assistant. Work from anywhere!',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1532
    },
    {
      id: '5',
      title: 'Content Creation & Marketing',
      slug: 'content-creation',
      description: 'Master content creation for social media, blogs, and digital platforms. Build your personal brand and grow your audience.',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/3153204/pexels-photo-3153204.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1876
    },
    {
      id: '6',
      title: 'Graphic Design Essentials',
      slug: 'graphic-design',
      description: 'Learn design principles, tools like Canva and Photoshop basics, and create stunning visuals for any project.',
      price: 7.00,
      duration_weeks: 6,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 2341
    },
    {
      id: '7',
      title: 'AI Animation & Video Creation',
      slug: 'ai-animation',
      description: 'Create animations and videos using AI tools. Perfect for content creators and marketers looking to level up.',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/8438922/pexels-photo-8438922.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1654
    },
    {
      id: '8',
      title: 'Freelancing Success Blueprint',
      slug: 'freelancing',
      description: 'Learn how to find clients on Upwork, Fiverr, and succeed as a freelancer. Build a thriving remote career.',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1923
    },
    {
      id: '9',
      title: 'Digital Entrepreneurship',
      slug: 'digital-entrepreneurship',
      description: 'Start and grow your online business. Learn digital marketing, e-commerce, and strategies for success.',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1445
    }
  ]

  const displayCourses = courses.length > 0 ? courses : mockCourses

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">Explore Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            All courses are beginner-friendly and designed for practical, real-world skills.
            Start learning for just $7 per course per month.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            All Courses
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'tech'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Technology
          </button>
          <button
            onClick={() => setFilter('business')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'business'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Business
          </button>
          <button
            onClick={() => setFilter('creative')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              filter === 'creative'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Creative
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course) => (
            <Link
              key={course.id}
              to={`/courses/${course.slug}`}
              className="card p-0 overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="relative">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full font-bold text-sm">
                  ${course.price}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3 min-h-[56px]">
                  {course.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span>{course.duration_weeks} weeks</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-1" />
                    <span className="capitalize">{course.level}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <TrendingUp size={16} className="mr-1 text-accent-green" />
                    <span>{course.enrollment_count} enrolled</span>
                  </div>
                  <button className="text-secondary font-semibold hover:underline">
                    Learn More →
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 gradient-hero rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-gray-200 mb-6">
            Enroll in multiple courses and build a complete skillset
          </p>
          <Link to="/register" className="btn-secondary text-lg px-8 py-4 inline-block">
            Get Started for Free
          </Link>
        </div>
      </div>
    </div>
  )
}
