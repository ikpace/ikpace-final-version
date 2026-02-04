import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { CreditCard, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import PaystackPayment from '../components/PaystackPayment'

export default function Checkout() {
  const { courseId } = useParams()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchCourseData()
  }, [courseId, user])

  const fetchCourseData = async () => {
    try {
      console.log('Fetching course with ID:', courseId)

      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .eq('is_published', true)
        .maybeSingle()

      if (courseError) {
        console.error('Course fetch error:', courseError)
        setError(`Database error: ${courseError.message}`)
        return
      }

      if (!courseData) {
        console.warn('No course found with ID:', courseId)
        setError('Course not found. Please check the course ID or browse our catalog.')
        return
      }

      console.log('Course loaded successfully:', courseData.title)

      const { data: enrollment } = await supabase
        .from('enrollments')
        .select('*')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .maybeSingle()

      if (enrollment?.payment_status === 'completed') {
        navigate('/dashboard')
        return
      }

      setCourse(courseData)
    } catch (error) {
      console.error('Error fetching course:', error)
      setError('Failed to load course details')
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentSuccess = async (paymentResponse) => {
    setProcessing(true)
    setError('')

    console.log('Payment response received:', paymentResponse)

    const paymentReference = typeof paymentResponse === 'string'
      ? paymentResponse
      : paymentResponse.reference || paymentResponse.trxref

    console.log('Processing payment reference:', paymentReference)

    if (!paymentReference) {
      console.error('No payment reference found in response:', paymentResponse)
      setError('Invalid payment response. Please try again.')
      setProcessing(false)
      return
    }

    try {
      console.log('Creating payment record...')
      const { data: paymentData, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: user.id,
          course_id: course.id,
          amount: course.price,
          payment_reference: paymentReference,
          payment_method: 'card',
          status: 'pending'
        })
        .select()
        .single()

      if (paymentError) {
        console.error('Payment insert error:', paymentError)
        throw paymentError
      }

      console.log('Payment record created:', paymentData)
      console.log('Verifying payment with Paystack...')

      const { data: verificationResult, error: verificationError } = await supabase
        .rpc('verify_payment', {
          p_payment_reference: paymentReference,
          p_verification_data: paymentResponse
        })

      if (verificationError) {
        console.error('Payment verification error:', verificationError)
        throw verificationError
      }

      console.log('Verification result:', verificationResult)

      if (verificationResult.success || verificationResult === true) {
        console.log('Payment verified successfully! Redirecting...')
        navigate('/payment-success', {
          state: {
            course: course,
            reference: paymentReference
          }
        })
      } else {
        console.error('Payment verification failed:', verificationResult)
        setError('Payment verification failed. Please contact support with reference: ' + paymentReference)
      }
    } catch (error) {
      console.error('Payment processing error:', error)
      setError('Payment processing failed: ' + error.message + '. Please contact support.')
    } finally {
      setProcessing(false)
    }
  }

  const handlePaymentClose = () => {
    setError('Payment was cancelled')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error && !course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card max-w-md text-center">
          <AlertCircle className="text-red-600 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-primary mb-4">{error}</h2>
          <button onClick={() => navigate('/courses')} className="btn-primary">
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-gray py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-2">Complete Your Enrollment</h1>
          <p className="text-gray-600">Secure checkout powered by Paystack</p>
        </div>

        {error && (
          <div className="card mb-6 bg-red-50 border-red-200">
            <div className="flex items-start">
              <AlertCircle className="text-red-600 mr-3 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Payment Error</h3>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center">
                <CreditCard className="mr-3" size={28} />
                Payment Information
              </h2>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start">
                  <Shield className="text-primary mr-3 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-semibold text-primary mb-1">Secure Payment</h3>
                    <p className="text-sm text-gray-700">
                      Your payment is processed securely through Paystack. We never store your card details.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg">
                  <CheckCircle className="text-accent-green mr-3" size={20} />
                  <div className="flex-1">
                    <div className="font-semibold text-primary">Full Name</div>
                    <div className="text-gray-700">{profile?.full_name}</div>
                  </div>
                </div>
                <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg">
                  <CheckCircle className="text-accent-green mr-3" size={20} />
                  <div className="flex-1">
                    <div className="font-semibold text-primary">Email Address</div>
                    <div className="text-gray-700">{profile?.email}</div>
                  </div>
                </div>
              </div>

              <PaystackPayment
                email={profile?.email}
                amount={course?.price * 100}
                courseName={course?.title}
                onSuccess={handlePaymentSuccess}
                onClose={handlePaymentClose}
                disabled={processing}
              />

              <div className="mt-6 text-center text-sm text-gray-600">
                <Shield className="inline mr-2" size={16} />
                256-bit SSL encryption for your security
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-xl font-bold text-primary mb-4">Order Summary</h3>

              <div className="mb-6">
                <img
                  src={course?.thumbnail_url}
                  alt={course?.title}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                <h4 className="font-bold text-primary mb-2">{course?.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{course?.duration_weeks} weeks • {course?.level}</p>
              </div>

              <div className="border-t-2 border-gray-200 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Course Price</span>
                  <span className="font-semibold text-primary">${course?.price}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-700">Discount</span>
                  <span className="font-semibold text-accent-green">$0</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t-2 border-gray-200 pt-4">
                  <span className="text-primary">Total</span>
                  <span className="text-primary">${course?.price}</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start">
                  <CheckCircle className="text-accent-green mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Lifetime access to course</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-accent-green mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>Certificate upon completion</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-accent-green mr-2 flex-shrink-0 mt-0.5" size={16} />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
