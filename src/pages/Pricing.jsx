import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { CheckCircle, Sparkles, Tag, TrendingUp, Users, Award, Zap } from 'lucide-react'

export default function Pricing() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [selectedMonths, setSelectedMonths] = useState(1)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(false)

  const monthlyPrice = 5
  const yearlyPrice = 45
  const yearlySavings = 11

  const calculateTotal = () => {
    return monthlyPrice * selectedMonths
  }

  const handleSelectPlan = (planType) => {
    if (!user) {
      navigate('/register', { state: { plan: planType } })
      return
    }
    navigate('/checkout-subscription', { state: { plan: planType, months: selectedMonths } })
  }

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE11') {
      setAppliedCoupon(true)
    }
  }

  const features = [
    {
      icon: <CheckCircle className="text-accent-green" size={24} />,
      text: 'Unlimited registration into tech training programmes'
    },
    {
      icon: <CheckCircle className="text-accent-green" size={24} />,
      text: 'Unlimited access to Tech Hubs/community/events'
    },
    {
      icon: <CheckCircle className="text-accent-green" size={24} />,
      text: 'Online and in-person infrastructure access'
    },
    {
      icon: <CheckCircle className="text-accent-green" size={24} />,
      text: 'Access to vast university partner network'
    },
    {
      icon: <CheckCircle className="text-accent-green" size={24} />,
      text: 'Priority support and mentorship'
    },
    {
      icon: <CheckCircle className="text-accent-green" size={24} />,
      text: 'Certificate of completion for all courses'
    }
  ]

  return (
    <div className="min-h-screen bg-neutral-gray py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Choose Your Learning Path
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock unlimited access to world-class tech training programs and join a thriving community of learners
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
          <div className="card relative hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-primary">
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 rounded-bl-lg font-semibold">
              Popular
            </div>
            <div className="pt-8">
              <h2 className="text-3xl font-bold text-primary mb-2">All Access</h2>
              <p className="text-gray-600 mb-6">Perfect for getting started</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold text-primary">${monthlyPrice}</span>
                  <span className="text-gray-600">/month</span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Select Duration
                  </label>
                  <select
                    value={selectedMonths}
                    onChange={(e) => setSelectedMonths(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                      <option key={month} value={month}>
                        {month} {month === 1 ? 'Month' : 'Months'}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Total Amount:</span>
                    <span className="text-3xl font-bold text-primary">${calculateTotal()}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    For {selectedMonths} {selectedMonths === 1 ? 'month' : 'months'} of access
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('all-access')}
                className="btn-primary w-full text-lg mb-6"
              >
                SAVE & CONTINUE
              </button>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.icon}
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card relative hover:shadow-2xl transition-all duration-300 border-4 border-secondary bg-gradient-to-br from-white to-secondary/5">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-accent-yellow to-secondary text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
              <Sparkles size={20} />
              BEST VALUE - SAVE ${yearlySavings}
            </div>
            <div className="pt-12">
              <h2 className="text-3xl font-bold text-primary mb-2">All Access Plus</h2>
              <p className="text-gray-600 mb-6">12 months for the price of 5!</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold text-secondary">${yearlyPrice}</span>
                  <span className="text-gray-600">/year</span>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-lg text-gray-500 line-through">${monthlyPrice * 12}</span>
                  <span className="bg-accent-green text-white px-3 py-1 rounded-full text-sm font-bold">
                    Save ${yearlySavings}
                  </span>
                </div>

                <div className="bg-gradient-to-r from-secondary/10 to-accent-yellow/10 border-2 border-secondary/20 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="text-secondary" size={20} />
                    <span className="font-semibold text-primary">Have a coupon code?</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-secondary text-white px-6 py-2 rounded-lg font-semibold hover:bg-secondary-dark transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-accent-green text-sm mt-2 flex items-center gap-1">
                      <CheckCircle size={16} />
                      Coupon applied successfully!
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-primary">Total Amount:</span>
                    <span className="text-3xl font-bold text-secondary">
                      ${appliedCoupon ? yearlyPrice - 11 : yearlyPrice}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    12 months of unlimited access
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleSelectPlan('all-access-plus')}
                className="bg-gradient-to-r from-secondary to-accent-yellow text-white w-full py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all transform hover:scale-105 mb-6"
              >
                GET ALL ACCESS PLUS
              </button>

              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {feature.icon}
                    <span className="text-gray-700 font-semibold">{feature.text}</span>
                  </div>
                ))}
                <div className="flex items-start gap-3 mt-4 pt-4 border-t-2 border-secondary/20">
                  <Sparkles className="text-secondary" size={24} />
                  <span className="text-gray-700 font-bold">PLUS: Priority access to new courses</span>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="text-secondary" size={24} />
                  <span className="text-gray-700 font-bold">PLUS: Exclusive community events</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto card bg-gradient-to-br from-primary/5 to-secondary/5 border-2 border-primary/20 mb-12">
          <h3 className="text-2xl font-bold text-primary mb-4 text-center">
            What's Included in All Access Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-3">
                <TrendingUp className="text-primary" size={32} />
              </div>
              <h4 className="font-bold text-primary mb-2">Career Growth</h4>
              <p className="text-sm text-gray-600">Build job-ready skills for remote work and freelancing</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-full mb-3">
                <Users className="text-secondary" size={32} />
              </div>
              <h4 className="font-bold text-primary mb-2">Community</h4>
              <p className="text-sm text-gray-600">Connect with peers and mentors worldwide</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green/10 rounded-full mb-3">
                <Award className="text-accent-green" size={32} />
              </div>
              <h4 className="font-bold text-primary mb-2">Certificates</h4>
              <p className="text-sm text-gray-600">Earn verified certificates for your resume</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-yellow/10 rounded-full mb-3">
                <Zap className="text-accent-yellow" size={32} />
              </div>
              <h4 className="font-bold text-primary mb-2">Flexibility</h4>
              <p className="text-sm text-gray-600">Learn at your own pace, anytime, anywhere</p>
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto">
          <p className="text-gray-600 mb-6">
            Not sure which plan is right for you? Start with the monthly plan and upgrade anytime.
            All plans include a 30-day money-back guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="btn-secondary">
              Browse All Courses
            </Link>
            <Link to="/contact" className="btn-outline">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
