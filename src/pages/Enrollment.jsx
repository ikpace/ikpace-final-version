import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { CheckCircle, Clock, BookOpen, Award, ArrowRight, User } from 'lucide-react'

export default function Enrollment() {
  const { slug } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [existingEnrollment, setExistingEnrollment] = useState(null)

  useEffect(() => {
    fetchCourseData()
  }, [slug, user])

  const fetchCourseData = async () => {
    try {
      console.log('Enrollment page - Fetching course with slug:', slug)

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .maybeSingle()

      if (courseError) {
        console.error('Enrollment page - Course fetch error:', courseError)
      }

      if (courseData) {
        console.log('Enrollment page - Course found:', courseData.title, 'ID:', courseData.id)
        setCourse(courseData)

        if (user) {
          const { data: enrollment } = await supabase
            .from('enrollments')
            .select('*')
            .eq('user_id', user.id)
            .eq('course_id', courseData.id)
            .maybeSingle()

          if (enrollment) {
            console.log('Enrollment page - Existing enrollment found:', enrollment.payment_status)
          }
          setExistingEnrollment(enrollment)
        }
      } else {
        console.warn('Enrollment page - No course found with slug:', slug)
      }
    } catch (error) {
      console.error('Enrollment page - Error fetching course:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = () => {
    console.log('Enrollment page - handleEnroll called')

    if (!user) {
      console.log('Enrollment page - No user, redirecting to login')
      navigate('/login', { state: { from: `/enroll/${slug}` } })
      return
    }

    if (existingEnrollment?.payment_status === 'completed') {
      console.log('Enrollment page - User already enrolled, redirecting to dashboard')
      navigate('/dashboard')
      return
    }

    if (!course || !course.id) {
      console.error('Enrollment page - No course or course ID available')
      return
    }

    console.log('Enrollment page - Redirecting to checkout with course ID:', course.id)
    navigate(`/checkout/${course.id}`)
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
          <Link to="/courses" className="btn-primary">
            Browse All Courses
          </Link>
        </div>
      </div>
    )
  }

  if (existingEnrollment?.payment_status === 'completed') {
    return (
      <div className="min-h-screen bg-neutral-gray py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card text-center py-12">
            <CheckCircle className="text-accent-green mx-auto mb-6" size={64} />
            <h1 className="text-3xl font-bold text-primary mb-4">You're Already Enrolled!</h1>
            <p className="text-xl text-gray-600 mb-8">
              You have full access to this course. Continue your learning journey!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="btn-primary">
                Go to Dashboard
              </Link>
              <Link to={`/learn/${course.id}`} className="btn-secondary">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link to={`/courses/${slug}`} className="text-secondary hover:underline mb-4 inline-block">
            &larr; Back to Course Details
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
              />
              <h1 className="text-3xl font-bold text-primary mb-4">{course.title}</h1>
              <p className="text-xl text-gray-700 mb-6">{course.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg">
                  <Clock className="text-primary mx-auto mb-2" size={24} />
                  <div className="font-bold text-primary">{course.duration_weeks} Weeks</div>
                  <div className="text-sm text-gray-600">Duration</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-secondary/10 to-accent-green/10 rounded-lg">
                  <BookOpen className="text-secondary mx-auto mb-2" size={24} />
                  <div className="font-bold text-primary capitalize">{course.level}</div>
                  <div className="text-sm text-gray-600">Level</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-accent-green/10 to-accent-yellow/10 rounded-lg">
                  <Award className="text-accent-yellow mx-auto mb-2" size={24} />
                  <div className="font-bold text-primary">Certificate</div>
                  <div className="text-sm text-gray-600">Included</div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-primary mb-4">What's Included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <CheckCircle className="text-accent-green mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Full lifetime access</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-accent-green mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">HD video lessons</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-accent-green mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Downloadable resources</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-accent-green mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-accent-green mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">Community forum access</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="text-accent-green mr-3 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">24/7 chat support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <div className="text-center mb-6 pb-6 border-b-2 border-gray-200">
                <div className="text-5xl font-bold text-primary mb-2">${course.price}</div>
                <div className="text-gray-600">One-time payment</div>
              </div>

              {!user && (
                <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <User className="text-primary mx-auto mb-2" size={32} />
                  <p className="text-sm text-gray-700 text-center">
                    Sign in or create an account to enroll in this course
                  </p>
                </div>
              )}

              <button
                onClick={handleEnroll}
                className="btn-primary w-full text-lg mb-4"
              >
                {user ? 'Proceed to Checkout' : 'Sign In to Enroll'}
                <ArrowRight className="ml-2 inline" size={20} />
              </button>

              <div className="text-center text-sm text-gray-600 mb-6">
                Secure payment powered by Paystack
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="text-accent-green mr-2 flex-shrink-0" size={16} />
                  <span>30-day money-back guarantee</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="text-accent-green mr-2 flex-shrink-0" size={16} />
                  <span>Instant access after payment</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <CheckCircle className="text-accent-green mr-2 flex-shrink-0" size={16} />
                  <span>No subscription required</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
