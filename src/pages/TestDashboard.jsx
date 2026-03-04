import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export default function TestDashboard() {
  const { user } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      testQuery()
    }
  }, [user])

  const testQuery = async () => {
    try {
      console.log('Testing with user ID:', user.id)
      
      // First, get the active enrollment
      const { data: enrollmentData, error: enrollmentError } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')

      if (enrollmentError) {
        console.error('Enrollment error:', enrollmentError)
        setError(enrollmentError.message)
        return
      }

      console.log('Found enrollments:', enrollmentData)

      // If we have an enrollment, get the course details
      if (enrollmentData && enrollmentData.length > 0) {
        const courseId = enrollmentData[0].course_id
        
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single()

        if (courseError) {
          console.error('Course error:', courseError)
          setError(courseError.message)
          return
        }

        console.log('Found course:', courseData)

        // Combine the data
        setEnrollments([{
          ...enrollmentData[0],
          courses: courseData
        }])
      }

    } catch (err) {
      console.error('Error:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  
  if (error) return (
    <div className="p-8">
      <h2 className="text-xl text-red-600 mb-4">Error:</h2>
      <pre className="bg-gray-100 p-4 rounded">{error}</pre>
    </div>
  )

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Test Dashboard</h1>
      
      {enrollments.length === 0 ? (
        <div className="bg-yellow-100 p-6 rounded-lg">
          <p className="text-xl">No active enrollments found</p>
          <p className="mt-2">User ID: {user?.id}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {enrollments.map((enrollment) => (
            <div key={enrollment.id} className="border-2 border-blue-500 rounded-lg p-6 bg-white shadow-lg">
              <h2 className="text-2xl font-bold text-blue-600 mb-2">
                {enrollment.courses?.title}
              </h2>
              
              <div className="mb-4 p-4 bg-gray-50 rounded">
                <p className="font-mono text-sm">Course ID: {enrollment.course_id}</p>
                <p className="font-mono text-sm">Course Slug: {enrollment.courses?.slug}</p>
                <p className="font-mono text-sm">Status: {enrollment.status}</p>
              </div>

              {/* TEST LINK 1 - Using slug */}
              {enrollment.courses?.slug && (
                <div className="mb-3">
                  <a 
                    href={`/course-curriculum/${enrollment.courses.slug}`}
                    className="block w-full bg-blue-500 text-white p-4 rounded-lg text-center font-bold text-lg hover:bg-blue-600"
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = `/course-curriculum/${enrollment.courses.slug}`
                    }}
                  >
                    TEST LINK 1: Click to go to /course-curriculum/{enrollment.courses.slug}
                  </a>
                </div>
              )}

              {/* TEST LINK 2 - Using course_id */}
              <div className="mb-3">
                <a 
                  href={`/course-curriculum/${enrollment.course_id}`}
                  className="block w-full bg-green-500 text-white p-4 rounded-lg text-center font-bold text-lg hover:bg-green-600"
                  onClick={(e) => {
                    e.preventDefault()
                    window.location.href = `/course-curriculum/${enrollment.course_id}`
                  }}
                >
                  TEST LINK 2: Click to go to /course-curriculum/{enrollment.course_id}
                </a>
              </div>

              {/* TEST LINK 3 - React Router Link */}
              {enrollment.courses?.slug && (
                <div className="mb-3">
                  <Link 
                    to={`/course-curriculum/${enrollment.courses.slug}`}
                    className="block w-full bg-purple-500 text-white p-4 rounded-lg text-center font-bold text-lg hover:bg-purple-600"
                  >
                    TEST LINK 3: React Router Link to /course-curriculum/{enrollment.courses.slug}
                  </Link>
                </div>
              )}

              {/* Raw Data */}
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="font-bold mb-2">Raw Enrollment Data:</p>
                <pre className="text-xs overflow-auto">
                  {JSON.stringify(enrollment, null, 2)}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded">
        <p className="font-bold mb-2">User Info:</p>
        <pre className="text-sm">
          ID: {user?.id}
        </pre>
      </div>
    </div>
  )
}