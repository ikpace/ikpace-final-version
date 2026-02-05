import { useEffect, useState } from 'react'
import { X, CreditCard, Smartphone, CheckCircle, Loader2, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function PaystackPayment({ email, amount, courseName, courseId, onSuccess, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [currency, setCurrency] = useState('NGN')
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('💳 PaystackPayment component mounted with props:', {
      email,
      amount,
      courseName,
      courseId
    })
  }, [])

  const getConvertedAmount = () => {
    if (currency === 'NGN') {
      return Math.round(amount * 8)
    }
    return amount
  }

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => {
      console.log('✅ Paystack script loaded successfully')
      setScriptLoaded(true)
    }
    script.onerror = () => {
      console.error('❌ Failed to load Paystack script')
      setError('Failed to load payment system. Please check your internet connection.')
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const verifyPayment = async (reference) => {
    try {
      setVerifying(true)
      setError(null)

      console.log('Verifying payment with backend...', { reference, courseId, amount: amount / 100, email })

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
          courseId,
          amount: amount / 100,
          email,
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Payment verification failed')
      }

      console.log('Payment verified successfully:', result)

      setVerifying(false)
      onSuccess({
        reference,
        transactionId: result.data.transactionId,
        enrollmentId: result.data.enrollmentId,
        courseName: result.data.courseName,
      })
    } catch (err) {
      console.error('Payment verification error:', err)
      setError(err.message)
      setVerifying(false)
    }
  }

  const handlePayment = () => {
    try {
      const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

      console.log('🔍 Payment initiated with:', {
        paystackKey: paystackKey ? `${paystackKey.substring(0, 10)}...` : 'MISSING',
        email,
        amount,
        courseId,
        courseName,
        paymentMethod,
        scriptLoaded,
        paystackAvailable: !!window.PaystackPop
      })

      if (!email) {
        setError('Email address is missing. Please refresh and try again.')
        return
      }

      if (!paystackKey || paystackKey === 'your_paystack_public_key' || paystackKey.includes('YOUR')) {
        setError('Payment system not configured. Please add VITE_PAYSTACK_PUBLIC_KEY to your .env file.')
        return
      }

      if (!scriptLoaded || !window.PaystackPop) {
        setError('Payment system is still loading. Please wait a moment and try again.')
        setTimeout(() => setError(null), 3000)
        return
      }

      if (!courseId) {
        setError('Course ID is missing. Cannot process payment.')
        return
      }

      setError(null)
      console.log('✅ All validations passed, opening Paystack...')

      const reference = 'IKPACE_' + Math.floor((Math.random() * 1000000000) + 1) + '_' + Date.now()

      const convertedAmount = getConvertedAmount()
      const paystackConfig = {
        key: paystackKey,
        email: email,
        amount: convertedAmount,
        currency: currency,
        ref: reference,
        channels: paymentMethod === 'card' ? ['card'] : ['mobile_money'],
        metadata: {
          custom_fields: [
            {
              display_name: 'Course Name',
              variable_name: 'course_name',
              value: courseName
            },
            {
              display_name: 'Course ID',
              variable_name: 'course_id',
              value: courseId
            },
            {
              display_name: 'Customer Email',
              variable_name: 'email',
              value: email
            }
          ]
        },
        callback: function(response) {
          console.log('✅ Paystack payment completed:', response)
          verifyPayment(response.reference)
        },
        onClose: function() {
          console.log('❌ Payment window closed by user')
          if (!verifying) {
            setError('Payment was cancelled')
          }
        }
      }

      console.log('📋 Paystack configuration:', {
        email,
        amount: convertedAmount,
        currency,
        originalAmount: amount,
        channels: paystackConfig.channels
      })

      console.log('🚀 Opening Paystack iframe...')
      const handler = window.PaystackPop.setup(paystackConfig)
      handler.openIframe()
      console.log('✅ Paystack iframe opened')
    } catch (err) {
      console.error('❌ Error in handlePayment:', err)
      setError(`Payment error: ${err.message}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative shadow-2xl animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 transition-all"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent-yellow rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CreditCard size={40} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-2">Complete Enrollment</h2>
          <p className="text-gray-600">Secure payment via Paystack</p>
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 mb-6 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <span className="text-gray-600 text-sm">Course:</span>
              <span className="font-semibold text-primary text-sm text-right max-w-[200px]">{courseName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 text-sm">Email:</span>
              <span className="font-medium text-gray-900 text-sm">{email}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 mt-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-secondary">
                  {currency === 'NGN'
                    ? `₦${(getConvertedAmount() / 100).toFixed(2)}`
                    : `$${(amount / 100).toFixed(2)}`}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Currency</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setCurrency('NGN')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                currency === 'NGN'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`text-lg font-bold ${currency === 'NGN' ? 'text-primary' : 'text-gray-400'}`}>₦</span>
              <span className={`text-xs mt-1 font-medium ${currency === 'NGN' ? 'text-primary' : 'text-gray-600'}`}>
                Nigerian Naira
              </span>
            </button>

            <button
              onClick={() => setCurrency('USD')}
              className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                currency === 'USD'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className={`text-lg font-bold ${currency === 'USD' ? 'text-primary' : 'text-gray-400'}`}>$</span>
              <span className={`text-xs mt-1 font-medium ${currency === 'USD' ? 'text-primary' : 'text-gray-600'}`}>
                US Dollar
              </span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CreditCard size={24} className={paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'} />
              <span className={`text-sm mt-2 font-medium ${paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}`}>
                Card Payment
              </span>
            </button>

            <button
              onClick={() => setPaymentMethod('mobile_money')}
              className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                paymentMethod === 'mobile_money'
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Smartphone size={24} className={paymentMethod === 'mobile_money' ? 'text-primary' : 'text-gray-400'} />
              <span className={`text-sm mt-2 font-medium ${paymentMethod === 'mobile_money' ? 'text-primary' : 'text-gray-600'}`}>
                Mobile Money
              </span>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start">
            <AlertCircle size={20} className="text-red-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-red-900 font-medium">Payment Error</p>
              <p className="text-xs text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {verifying && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-center">
              <Loader2 size={20} className="text-blue-600 animate-spin mr-3" />
              <div>
                <p className="text-sm text-blue-900 font-medium">Verifying Payment...</p>
                <p className="text-xs text-blue-700 mt-1">Please wait while we confirm your payment</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 mb-6">
          <button
            onClick={handlePayment}
            disabled={verifying || !scriptLoaded}
            className="w-full btn-primary flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!scriptLoaded ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Loading Payment System...
              </>
            ) : verifying ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Verifying Payment...
              </>
            ) : (
              <>
                <CreditCard size={20} className="mr-2" />
                Pay {currency === 'NGN'
                  ? `₦${(getConvertedAmount() / 100).toFixed(2)}`
                  : `$${(amount / 100).toFixed(2)}`}
              </>
            )}
          </button>
          <button
            onClick={onClose}
            disabled={verifying}
            className="w-full btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center text-xs text-gray-500">
            <span className="mr-2">🔒</span>
            <span>Secure payment powered by Paystack</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
            <div className="flex flex-col items-center">
              <CheckCircle size={16} className="text-accent-green mb-1" />
              <span>SSL Encrypted</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle size={16} className="text-accent-green mb-1" />
              <span>PCI Compliant</span>
            </div>
            <div className="flex flex-col items-center">
              <CheckCircle size={16} className="text-accent-green mb-1" />
              <span>Instant Access</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <p className="text-xs text-yellow-900 leading-relaxed">
            <strong className="block mb-2">💳 Test Mode Active</strong>
            <strong>Test Card Number:</strong> 4084 0840 8408 4081<br />
            <strong>CVV:</strong> 408 | <strong>Expiry:</strong> Any future date<br />
            <strong>PIN:</strong> 0000 | <strong>OTP:</strong> 123456<br />
            {currency === 'NGN' && (
              <span className="block mt-2 text-blue-900 bg-blue-100 px-2 py-1 rounded">
                ℹ️ NGN (Naira) is recommended for testing
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

