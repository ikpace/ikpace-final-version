import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useSearchParams, Link } from 'react-router-dom'
import { CheckCircle, Award, BookOpen, ArrowRight, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function PaymentSuccess() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState(null)
  const [paymentData, setPaymentData] = useState(null)

  const referenceFromUrl = searchParams.get('reference')
  const stateData = location.state

  useEffect(() => {
    const handlePaymentVerification = async () => {
      try {
        let reference = null
        let paymentInfo = null

        if (referenceFromUrl) {
          console.log('🔍 Payment callback from Paystack redirect:', referenceFromUrl)

          const stored = localStorage.getItem('paystack_pending_payment')
          if (stored) {
            paymentInfo = JSON.parse(stored)
            reference = referenceFromUrl
            localStorage.removeItem('paystack_pending_payment')
          }
        } else if (stateData?.reference) {
          console.log('🔍 Payment callback from popup:', stateData.reference)
          reference = stateData.reference
          paymentInfo = {
            courseId: stateData.course?.id,
            courseName: stateData.course?.title,
            amount: stateData.course?.price,
            email: stateData.course?.email
          }
        }

        if (!reference || !paymentInfo) {
          console.warn('No payment data found, redirecting to dashboard')
          setTimeout(() => navigate('/dashboard'), 2000)
          return
        }

        setVerifying(true)

        console.log('Verifying payment:', { reference, paymentInfo })

        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
          throw new Error('Not authenticated')
        }

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

        const response = await fetch(`${supabaseUrl}/functions/v1/verify-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
            'apikey': supabaseAnonKey,
          },
          body: JSON.stringify({
            reference,
            courseId: paymentInfo.courseId,
            amount: paymentInfo.amount,
            email: paymentInfo.email,
          }),
        })

        const result = await response.json()

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Payment verification failed')
        }

        console.log('✅ Payment verified successfully:', result)

        setPaymentData({
          reference,
          courseName: paymentInfo.courseName,
          courseId: paymentInfo.courseId,
          ...result.data
        })

        setVerifying(false)
      } catch (err) {
        console.error('Payment verification error:', err)
        setError(err.message)
        setVerifying(false)
      }
    }

    handlePaymentVerification()
  }, [referenceFromUrl, stateData, navigate])

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="card max-w-md text-center py-12">
          <Loader2 className="text-primary mx-auto mb-6 animate-spin" size={64} />
          <h2 className="text-2xl font-bold text-primary mb-4">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your transaction</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="card max-w-md text-center py-12">
          <AlertCircle className="text-red-600 mx-auto mb-6" size={64} />
          <h2 className="text-2xl font-bold text-red-800 mb-4">Payment Verification Failed</h2>
          <p className="text-red-600 mb-8">{error}</p>
          <Link to="/dashboard" className="btn-primary">
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  if (!paymentData) {
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
            Welcome to {paymentData.courseName}! You now have full access to the course.
          </p>

          <div className="max-w-md mx-auto mb-8 p-6 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 border-primary/20">
            <div className="text-sm text-gray-600 mb-2">Transaction Reference</div>
            <div className="font-mono text-sm text-primary font-semibold break-all">
              {paymentData.reference}
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
            <Link to={`/learn/${paymentData.courseId}`} className="btn-primary text-lg">
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
