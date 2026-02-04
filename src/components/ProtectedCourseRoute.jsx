import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Lock, AlertCircle } from 'lucide-react'

export default function ProtectedCourseRoute({ children }) {
  const { courseId } = useParams()
  const { user, loading: authLoading } = useAuth()
  const [hasAccess, setHasAccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(null)

  useEffect(() => {
    checkAccess()
  }, [courseId, user])

  const checkAccess = async () => {
    if (!user) {
      setLoading(false)
      return
    }

    try {
      const { data: courseData } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .maybeSingle()

      setCourse(courseData)

      const { data: accessCheck, error } = await supabase
        .rpc('check_course_access', {
          p_user_id: user.id,
          p_course_id: courseId
        })

      if (error) {
        console.error('Error checking access:', error)
        setHasAccess(false)
      } else {
        setHasAccess(accessCheck)
      }
    } catch (error) {
      console.error('Error checking course access:', error)
      setHasAccess(false)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: `/learn/${courseId}` }} />
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-neutral-gray flex items-center justify-center px-4">
        <div className="card max-w-2xl text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full mb-6">
            <Lock className="text-primary" size={48} />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-4">
            Course Access Required
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            You need to enroll in this course to access the learning materials.
          </p>

          {course && (
            <div className="mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-32 h-32 object-cover rounded-lg mx-auto mb-4"
              />
              <h2 className="text-xl font-bold text-primary mb-2">{course.title}</h2>
              <p className="text-gray-600 mb-4">{course.description}</p>
              <div className="text-3xl font-bold text-secondary mb-2">${course.price}</div>
              <div className="text-sm text-gray-600">One-time payment • Lifetime access</div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={course ? `/enroll/${course.slug}` : '/courses'}
              className="btn-primary text-lg"
            >
              Enroll in Course
            </a>
            <a href="/dashboard" className="btn-secondary text-lg">
              Go to Dashboard
            </a>
          </div>

          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="text-primary mr-3 flex-shrink-0 mt-1" size={20} />
              <p className="text-sm text-gray-700 text-left">
                <strong>Why can't I access this course?</strong><br />
                This course requires enrollment and payment verification. Once you complete the enrollment process, you'll have immediate access to all course materials.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return children
}
