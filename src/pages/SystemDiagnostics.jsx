import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Database, Video, CreditCard, Wifi } from 'lucide-react'

export default function SystemDiagnostics() {
  const { user } = useAuth()
  const [diagnostics, setDiagnostics] = useState({
    database: { status: 'checking', message: '' },
    courses: { status: 'checking', message: '', count: 0 },
    lessons: { status: 'checking', message: '', count: 0 },
    videos: { status: 'checking', message: '', working: 0, broken: 0 },
    payment: { status: 'checking', message: '' },
    enrollment: { status: 'checking', message: '', count: 0 }
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    runDiagnostics()
  }, [])

  const runDiagnostics = async () => {
    setLoading(true)

    await checkDatabase()
    await checkCourses()
    await checkLessons()
    await checkVideos()
    await checkPaymentSystem()
    if (user) {
      await checkEnrollments()
    }

    setLoading(false)
  }

  const checkDatabase = async () => {
    try {
      const { error } = await supabase.from('courses').select('count').limit(1)

      if (error) {
        setDiagnostics(prev => ({
          ...prev,
          database: {
            status: 'error',
            message: `Database connection failed: ${error.message}`
          }
        }))
      } else {
        setDiagnostics(prev => ({
          ...prev,
          database: {
            status: 'success',
            message: 'Database connection successful'
          }
        }))
      }
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        database: {
          status: 'error',
          message: `Connection error: ${error.message}`
        }
      }))
    }
  }

  const checkCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title, is_published')

      if (error) throw error

      const publishedCount = data?.filter(c => c.is_published).length || 0

      setDiagnostics(prev => ({
        ...prev,
        courses: {
          status: data && data.length > 0 ? 'success' : 'warning',
          message: `Found ${data?.length || 0} courses (${publishedCount} published)`,
          count: data?.length || 0,
          data: data
        }
      }))
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        courses: {
          status: 'error',
          message: `Failed to load courses: ${error.message}`,
          count: 0
        }
      }))
    }
  }

  const checkLessons = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('id, title, video_url')

      if (error) throw error

      const withVideos = data?.filter(l => l.video_url).length || 0

      setDiagnostics(prev => ({
        ...prev,
        lessons: {
          status: data && data.length > 0 ? 'success' : 'warning',
          message: `Found ${data?.length || 0} lessons (${withVideos} with videos)`,
          count: data?.length || 0,
          data: data
        }
      }))
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        lessons: {
          status: 'error',
          message: `Failed to load lessons: ${error.message}`,
          count: 0
        }
      }))
    }
  }

  const checkVideos = async () => {
    try {
      const { data } = await supabase
        .from('lessons')
        .select('video_url')
        .not('video_url', 'is', null)

      const validVideos = data?.filter(l =>
        l.video_url &&
        !l.video_url.includes('YOUR_') &&
        (l.video_url.includes('youtube.com') || l.video_url.includes('youtu.be') || l.video_url.startsWith('http'))
      ).length || 0

      const status = validVideos > 0 ? 'success' : 'warning'

      setDiagnostics(prev => ({
        ...prev,
        videos: {
          status,
          message: `${validVideos} valid video URLs found`,
          working: validVideos,
          broken: (data?.length || 0) - validVideos
        }
      }))
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        videos: {
          status: 'error',
          message: `Failed to check videos: ${error.message}`,
          working: 0,
          broken: 0
        }
      }))
    }
  }

  const checkPaymentSystem = () => {
    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY
    const hasValidKey = paystackKey &&
                        !paystackKey.includes('YOUR_') &&
                        !paystackKey.includes('your_') &&
                        paystackKey.startsWith('pk_')

    setDiagnostics(prev => ({
      ...prev,
      payment: {
        status: hasValidKey ? 'success' : 'warning',
        message: hasValidKey
          ? `Paystack configured (${paystackKey.substring(0, 15)}...)`
          : 'Paystack key not configured (Demo mode active)',
        key: paystackKey
      }
    }))
  }

  const checkEnrollments = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('enrollments')
        .select('id, payment_status')
        .eq('user_id', user.id)

      if (error) throw error

      const completed = data?.filter(e => e.payment_status === 'completed').length || 0

      setDiagnostics(prev => ({
        ...prev,
        enrollment: {
          status: 'success',
          message: `${data?.length || 0} enrollments (${completed} completed)`,
          count: data?.length || 0
        }
      }))
    } catch (error) {
      setDiagnostics(prev => ({
        ...prev,
        enrollment: {
          status: 'error',
          message: `Failed to load enrollments: ${error.message}`,
          count: 0
        }
      }))
    }
  }

  const StatusIcon = ({ status }) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="text-green-600" size={24} />
      case 'warning':
        return <AlertTriangle className="text-yellow-600" size={24} />
      case 'error':
        return <XCircle className="text-red-600" size={24} />
      default:
        return <RefreshCw className="text-gray-400 animate-spin" size={24} />
    }
  }

  const DiagnosticCard = ({ icon: Icon, title, diagnostic }) => (
    <div className="card">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center">
            <Icon className="text-primary" size={24} />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary mb-1">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <StatusIcon status={diagnostic.status} />
            <span className={`text-sm font-medium ${
              diagnostic.status === 'success' ? 'text-green-600' :
              diagnostic.status === 'warning' ? 'text-yellow-600' :
              diagnostic.status === 'error' ? 'text-red-600' :
              'text-gray-600'
            }`}>
              {diagnostic.status === 'success' ? 'Healthy' :
               diagnostic.status === 'warning' ? 'Warning' :
               diagnostic.status === 'error' ? 'Error' :
               'Checking...'}
            </span>
          </div>
          <p className="text-sm text-gray-600">{diagnostic.message}</p>

          {diagnostic.count !== undefined && (
            <div className="mt-2 text-xs text-gray-500">
              Count: {diagnostic.count}
            </div>
          )}

          {diagnostic.data && diagnostic.data.length > 0 && (
            <details className="mt-2">
              <summary className="text-xs text-primary cursor-pointer hover:underline">
                View Details
              </summary>
              <pre className="mt-2 p-2 bg-gray-50 rounded text-xs overflow-auto max-h-40">
                {JSON.stringify(diagnostic.data, null, 2)}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-neutral-gray py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">System Diagnostics</h1>
          <p className="text-gray-600 mb-6">
            Check the health of your learning platform
          </p>
          <button
            onClick={runDiagnostics}
            disabled={loading}
            className="btn-primary"
          >
            <RefreshCw className={`inline mr-2 ${loading ? 'animate-spin' : ''}`} size={20} />
            {loading ? 'Running Diagnostics...' : 'Refresh Diagnostics'}
          </button>
        </div>

        <div className="space-y-4">
          <DiagnosticCard
            icon={Database}
            title="Database Connection"
            diagnostic={diagnostics.database}
          />

          <DiagnosticCard
            icon={Database}
            title="Courses"
            diagnostic={diagnostics.courses}
          />

          <DiagnosticCard
            icon={Video}
            title="Lessons & Content"
            diagnostic={diagnostics.lessons}
          />

          <DiagnosticCard
            icon={Video}
            title="Video URLs"
            diagnostic={diagnostics.videos}
          />

          <DiagnosticCard
            icon={CreditCard}
            title="Payment System"
            diagnostic={diagnostics.payment}
          />

          {user && (
            <DiagnosticCard
              icon={Wifi}
              title="Your Enrollments"
              diagnostic={diagnostics.enrollment}
            />
          )}
        </div>

        <div className="card mt-8 bg-gradient-to-br from-blue-50 to-secondary/5">
          <h3 className="text-xl font-bold text-primary mb-4">Quick Fixes</h3>

          <div className="space-y-4">
            {diagnostics.payment.status === 'warning' && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-900 mb-2">⚠️ Payment System Not Configured</h4>
                <p className="text-sm text-yellow-800 mb-2">
                  To enable real payments:
                </p>
                <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
                  <li>Sign up at <a href="https://paystack.com" target="_blank" rel="noopener noreferrer" className="underline">paystack.com</a></li>
                  <li>Get your public key from Settings → API Keys</li>
                  <li>Add <code className="bg-yellow-100 px-1 rounded">VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_key</code> to .env</li>
                  <li>Restart development server: <code className="bg-yellow-100 px-1 rounded">npm run dev</code></li>
                </ol>
              </div>
            )}

            {diagnostics.videos.working === 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">❌ No Valid Video URLs</h4>
                <p className="text-sm text-red-800">
                  Add video URLs to lessons in the database or update existing placeholder URLs.
                </p>
              </div>
            )}

            {diagnostics.courses.count === 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">❌ No Courses Found</h4>
                <p className="text-sm text-red-800">
                  Add courses to the database through the admin dashboard.
                </p>
              </div>
            )}

            {diagnostics.lessons.count === 0 && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="font-bold text-yellow-900 mb-2">⚠️ No Lessons Found</h4>
                <p className="text-sm text-yellow-800">
                  Add lessons and modules to your courses for students to access content.
                </p>
              </div>
            )}

            {Object.values(diagnostics).every(d => d.status === 'success') && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">✅ All Systems Operational</h4>
                <p className="text-sm text-green-800">
                  Your learning platform is healthy and ready to use!
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="card mt-6">
          <h3 className="text-lg font-bold text-primary mb-3">Environment Variables</h3>
          <div className="space-y-2 text-sm font-mono">
            <div className="flex justify-between">
              <span className="text-gray-600">VITE_SUPABASE_URL:</span>
              <span className="text-primary">
                {import.meta.env.VITE_SUPABASE_URL ? '✓ Set' : '✗ Missing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VITE_SUPABASE_ANON_KEY:</span>
              <span className="text-primary">
                {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">VITE_PAYSTACK_PUBLIC_KEY:</span>
              <span className="text-primary">
                {diagnostics.payment.key ? `✓ ${diagnostics.payment.key.substring(0, 15)}...` : '✗ Missing'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
