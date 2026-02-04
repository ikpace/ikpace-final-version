import { useEffect, useState } from 'react'
import { X, CreditCard, Smartphone, CheckCircle } from 'lucide-react'

export default function PaystackPayment({ email, amount, courseName, onSuccess, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    script.onload = () => setScriptLoaded(true)
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const handlePayment = () => {
    const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

    if (!paystackKey || paystackKey === 'your_paystack_public_key' || paystackKey.includes('YOUR')) {
      console.error('Paystack key not configured!')
      alert('Payment system not configured. Please add VITE_PAYSTACK_PUBLIC_KEY to your .env file.\n\nGet your key from: https://dashboard.paystack.com/#/settings/developer')
      return
    }

    if (!window.PaystackPop) {
      alert('Payment system is loading. Please try again in a moment.')
      return
    }

    console.log('Initiating Paystack payment...')
    console.log('Amount:', amount, 'Email:', email, 'Method:', paymentMethod)

    const reference = 'IKPACE_' + Math.floor((Math.random() * 1000000000) + 1) + '_' + Date.now()

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email: email,
      amount: amount,
      currency: 'USD',
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
            display_name: 'Customer Email',
            variable_name: 'email',
            value: email
          }
        ]
      },
      callback: function(response) {
        console.log('Payment successful:', response)
        onSuccess({
          reference: response.reference,
          status: response.status,
          trans: response.trans,
          transaction: response.transaction,
          trxref: response.trxref
        })
      },
      onClose: function() {
        console.log('Payment window closed by user')
      }
    })

    handler.openIframe()
  }

  const handleDemoPayment = () => {
    console.log('DEMO MODE: Simulating payment...')

    alert('DEMO MODE: Simulating successful payment.\n\nTo enable real payments:\n1. Sign up at https://paystack.com\n2. Get your public key from Settings → API Keys\n3. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file\n4. Restart the development server')

    setTimeout(() => {
      const demoRef = 'IKPACE_DEMO_' + Date.now()
      console.log('Demo payment completed with reference:', demoRef)
      onSuccess({
        reference: demoRef,
        status: 'success',
        trans: demoRef,
        transaction: demoRef,
        trxref: demoRef,
        message: 'Demo payment successful'
      })
    }, 1000)
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
                <span className="text-2xl font-bold text-secondary">${(amount / 100).toFixed(2)}</span>
              </div>
            </div>
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

        <div className="space-y-3 mb-6">
          <button
            onClick={handleDemoPayment}
            className="w-full btn-primary flex items-center justify-center shadow-lg hover:shadow-xl"
          >
            <CheckCircle size={20} className="mr-2" />
            Pay ${(amount / 100).toFixed(2)} (Demo Mode)
          </button>
          <button
            onClick={onClose}
            className="w-full btn-outline"
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

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong className="block mb-1">💡 Demo Mode Active</strong>
            Click "Pay" to simulate enrollment. For production use, add your Paystack public key in the PaystackPayment component.
          </p>
        </div>
      </div>
    </div>
  )
}

