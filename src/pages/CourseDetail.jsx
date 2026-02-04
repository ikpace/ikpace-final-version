import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { getCourseBySlug } from '../data/coursesData'
import { Clock, BookOpen, Users, Award, CheckCircle, Lock } from 'lucide-react'
import PaystackPayment from '../components/PaystackPayment'

export default function CourseDetail() {
  const { slug } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [modules, setModules] = useState([])
  const [enrollment, setEnrollment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)

  const mockCourseData = {
    'it-fundamentals': {
      id: '1',
      title: 'Information Technology Fundamentals',
      description: 'Master the basics of IT including hardware, software, networking, and troubleshooting. Perfect for beginners looking to start a career in technology.',
      price: 7.00,
      duration_weeks: 4,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 1247,
      full_description: 'This comprehensive course covers everything you need to know to start your IT career. You will learn about computer hardware, operating systems, networking basics, cybersecurity fundamentals, and troubleshooting techniques. By the end of this course, you will have the confidence to pursue IT certifications and entry-level IT positions.',
      what_you_learn: [
        'Understanding computer hardware and components',
        'Operating system fundamentals (Windows, Linux basics)',
        'Networking concepts and protocols',
        'Basic troubleshooting and problem-solving',
        'Introduction to cybersecurity',
        'IT career paths and certifications'
      ],
      modules: [
        { title: 'Introduction to IT', lessons: 5 },
        { title: 'Computer Hardware', lessons: 6 },
        { title: 'Operating Systems', lessons: 7 },
        { title: 'Networking Basics', lessons: 8 },
        { title: 'Security Fundamentals', lessons: 5 },
        { title: 'Career Development', lessons: 4 }
      ]
    },
    'data-analysis': {
      id: '2',
      title: 'Data Analysis with Excel & Python',
      description: 'Learn data analysis from scratch with Excel, Power BI intro, and Python basics. Transform raw data into actionable insights.',
      price: 7.00,
      duration_weeks: 6,
      level: 'beginner',
      thumbnail_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
      enrollment_count: 2134,
      full_description: 'Become a data analyst and unlock the power of data. This course teaches you how to collect, clean, analyze, and visualize data using industry-standard tools. You will work with real datasets and create professional reports that drive business decisions.',
      what_you_learn: [
        'Excel formulas and functions for data analysis',
        'Creating charts and visualizations',
        'Introduction to Power BI',
        'Python basics for data analysis',
        'Data cleaning and preparation',
        'Statistical analysis fundamentals'
      ],
      modules: [
        { title: 'Excel Fundamentals', lessons: 8 },
        { title: 'Advanced Excel Techniques', lessons: 7 },
        { title: 'Data Visualization', lessons: 6 },
        { title: 'Introduction to Power BI', lessons: 5 },
        { title: 'Python for Data Analysis', lessons: 9 },
        { title: 'Real-World Projects', lessons: 6 }
      ]
    }
  }

  useEffect(() => {
    fetchCourseData()
  }, [slug, user])

  const fetchCourseData = async () => {
    try {
      const isUUID = slug && slug.length === 36 && slug.includes('-')

      let query = supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)

      if (isUUID) {
        query = query.eq('id', slug)
      } else {
        query = query.eq('slug', slug)
      }

      const { data: courseData, error: courseError } = await query.maybeSingle()

      if (courseError) throw courseError

      if (courseData) {
        setCourse(courseData)

        const { data: modulesData } = await supabase
          .from('modules')
          .select('*, lessons(*)')
          .eq('course_id', courseData.id)
          .order('order_index')

        setModules(modulesData || [])

        if (user) {
          const { data: enrollmentData } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', user.id)
            .eq('course_id', courseData.id)
            .maybeSingle()

          setEnrollment(enrollmentData)
        }
      } else {
        const mockCourse = getCourseBySlug(slug)
        if (mockCourse) {
          setCourse(mockCourse)
        }
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      const mockCourse = getCourseBySlug(slug)
      if (mockCourse) {
        setCourse(mockCourse)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = () => {
    console.log('===== COURSE DETAIL - ENROLL BUTTON CLICKED =====')
    console.log('User:', user ? 'Logged in' : 'Not logged in')
    console.log('Course object:', course)
    console.log('Course slug:', course?.slug)
    console.log('Course ID:', course?.id)
    console.log('URL slug param:', slug)

    if (!user) {
      console.log('Redirecting to login...')
      navigate('/login', { state: { from: `/courses/${course?.slug || slug}` } })
      return
    }

    if (enrollment?.payment_status === 'completed') {
      console.log('Already enrolled, going to course...')
      navigate(`/learn/${course.id}`)
      return
    }

    const enrollPath = `/enroll/${course?.slug || course?.id || slug}`
    console.log('Navigating to enrollment page:', enrollPath)
    console.log('===== END ENROLL BUTTON CLICK =====')
    navigate(enrollPath)
  }

  const handlePaymentSuccess = async (reference) => {
    try {
      const { data: paymentData } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          amount: course.price,
          paystack_reference: reference,
          status: 'success',
          verified_at: new Date().toISOString()
        })
        .select()
        .single()

      await supabase
        .from('enrollments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          payment_id: paymentData?.id
        })

      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          type: 'payment',
          title: 'Enrollment Successful',
          message: `You have successfully enrolled in ${course.title}!`,
          link: `/learn/${course.id}`
        })

      navigate(`/learn/${course.id}`)
    } catch (error) {
      console.error('Error processing enrollment:', error)
      alert('Enrollment successful! Redirecting to course...')
      navigate('/dashboard')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">Course Not Found</h2>
          <Link to="/courses" className="text-secondary hover:underline">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray">
      <div className="gradient-hero py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-gray-200 mb-6">{course.description}</p>

              <div className="flex flex-wrap gap-6 text-white mb-6">
                <div className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  <span>{course.duration_weeks} weeks</span>
                </div>
                <div className="flex items-center">
                  <BookOpen className="mr-2" size={20} />
                  <span className="capitalize">{course.level}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  <span>{course.enrollment_count} students</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />

                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    ${course.price}
                  </div>
                  <div className="text-gray-600">One-time payment</div>
                </div>

                {enrollment ? (
                  <Link
                    to={`/learn/${course.id}`}
                    className="w-full btn-primary text-center block mb-4"
                  >
                    Continue Learning
                  </Link>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="w-full btn-primary mb-4"
                  >
                    Enroll Now
                  </button>
                )}

                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-accent-green mr-2 flex-shrink-0" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-accent-green mr-2 flex-shrink-0" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-accent-green mr-2 flex-shrink-0" />
                    <span>Community support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-accent-green mr-2 flex-shrink-0" />
                    <span>AI-powered learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.what_you_learn?.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle size={20} className="text-accent-green mr-3 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold text-primary mb-6">Course Content</h2>
              <div className="space-y-4">
                {course.modules?.map((module, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-primary font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-primary">{module.title}</h3>
                          <p className="text-sm text-gray-600">{module.lessons} lessons</p>
                        </div>
                      </div>
                      {!enrollment && <Lock size={20} className="text-gray-400" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="text-xl font-bold text-primary mb-4">About This Course</h3>
              <p className="text-gray-600 leading-relaxed">
                {course.full_description}
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold text-primary mb-4">Requirements</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• No prior experience required</li>
                <li>• Computer with internet access</li>
                <li>• Willingness to learn</li>
                <li>• 30 minutes daily commitment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaystackPayment
          email={profile?.email}
          amount={course.price * 100}
          courseName={course.title}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPayment(false)}
        />
      )}
    </div>
  )
}
