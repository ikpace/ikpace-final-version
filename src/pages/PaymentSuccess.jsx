import { useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle, Award, BookOpen, ArrowRight } from 'lucide-react'

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const { course, reference } = location.state || {}

  useEffect(() => {
    if (!course || !reference) {
      navigate('/dashboard')
    }
  }, [course, reference, navigate])

  if (!course) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-green/10 to-primary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card text-center py-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-accent-green rounded-full mb-6">
            <CheckCircle className="text-white" size={64} />
          </div>

          <h1 className="text-4xl font-bold text-primary mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Welcome to {course.title}! You now have full access to the course.
          </p>

          <div className="max-w-md mx-auto mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-primary/20">
            <div className="text-sm text-gray-600 mb-2">Transaction Reference</div>
            <div className="font-mono text-sm text-primary font-semibold break-all">
              {reference}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
              <BookOpen className="text-primary mx-auto mb-2" size={32} />
              <div className="font-bold text-primary">Start Learning</div>
              <div className="text-sm text-gray-600">Access your course now</div>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
              <Award className="text-secondary mx-auto mb-2" size={32} />
              <div className="font-bold text-primary">Earn Certificate</div>
              <div className="text-sm text-gray-600">Complete to get certified</div>
            </div>
            <div className="p-4 bg-white rounded-lg border-2 border-gray-200">
              <CheckCircle className="text-accent-green mx-auto mb-2" size={32} />
              <div className="font-bold text-primary">Lifetime Access</div>
              <div className="text-sm text-gray-600">Learn at your own pace</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={`/learn/${course.id}`} className="btn-primary text-lg">
              Start Learning Now
              <ArrowRight className="ml-2 inline" size={20} />
            </Link>
            <Link to="/dashboard" className="btn-secondary text-lg">
              Go to Dashboard
            </Link>
          </div>

          <div className="mt-8 text-sm text-gray-600">
            <p className="mb-2">A confirmation email has been sent to your email address.</p>
            <p>Need help? Contact us at <a href="mailto:support@ikpace.com" className="text-secondary hover:underline">support@ikpace.com</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}
