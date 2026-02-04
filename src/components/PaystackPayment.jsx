import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function PaystackPayment({ email, amount, courseName, onSuccess, onClose }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.paystack.co/v1/inline.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handlePayment = () => {
    if (!window.PaystackPop) {
      alert('Payment system is loading. Please try again in a moment.')
      return
    }

    const handler = window.PaystackPop.setup({
      key: 'pk_test_your_paystack_public_key',
      email: email,
      amount: amount,
      currency: 'USD',
      ref: 'IKPACE_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: 'Course Name',
            variable_name: 'course_name',
            value: courseName
          }
        ]
      },
      callback: function(response) {
        onSuccess(response.reference)
      },
      onClose: function() {
        console.log('Payment window closed')
      }
    })

    handler.openIframe()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">💳</span>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Complete Your Enrollment</h2>
          <p className="text-gray-600">You're one step away from starting your learning journey</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Course:</span>
            <span className="font-semibold text-primary">{courseName}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Amount:</span>
            <span className="font-semibold text-primary">${(amount / 100).toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-semibold text-primary">1 Month Access</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={handlePayment}
            className="w-full btn-primary"
          >
            Pay with Paystack
          </button>
          <button
            onClick={onClose}
            className="w-full btn-outline"
          >
            Cancel
          </button>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>Secure payment powered by Paystack</p>
          <p>Supports card payments and mobile money</p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Demo Mode:</strong> This is a demo. In production, you'll need to add your Paystack public key
            to enable real payments.
          </p>
        </div>
      </div>
    </div>
  )
}
