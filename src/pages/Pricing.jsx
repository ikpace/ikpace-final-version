import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Star, Zap, Shield, Users, Target } from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [months, setMonths] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);

  const courseId = "301c3b0d-5a28-4994-8907-ba6a50e5cb4f";

  const handleGetStarted = (planType) => {
    navigate(`/checkout/${courseId}`, {
      state: {
        plan: planType,
        months: months,
        coupon: appliedCoupon ? coupon : "",
        price: calculatePrice(planType, months, appliedCoupon),
      },
    });
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "ikpace20") {
      setAppliedCoupon(true);
      alert("🎉 Coupon applied! You get 20% off!");
    } else {
      setAppliedCoupon(false);
      alert("Invalid coupon code. Try 'IKPACE20' for 20% off!");
    }
  };

  const calculatePrice = (plan, monthsCount, hasCoupon) => {
    let price = plan === "monthly" ? 5 : 45;
    price *= monthsCount;
    if (hasCoupon) price *= 0.8;
    return price.toFixed(2);
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: "30+ Interactive Lessons" },
    { icon: <Target className="w-5 h-5" />, text: "Real-world Projects" },
    { icon: <Users className="w-5 h-5" />, text: "Community Access" },
    { icon: <Shield className="w-5 h-5" />, text: "Certificate of Completion" },
    { icon: <Star className="w-5 h-5" />, text: "Lifetime Content Updates" },
    { icon: <Check className="w-5 h-5" />, text: "1-on-1 Mentorship Sessions" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
          <Star className="w-4 h-4 mr-2" /> LIMITED TIME OFFER
        </div>
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Start Your Tech Journey Today
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Join <span className="font-bold text-blue-600">5,000+ students</span> who transformed their careers with our project-based learning approach. No experience required.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-4xl font-bold text-blue-600 mb-2">30 Days</div>
            <div className="text-gray-600">Money-back Guarantee</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-2xl inline-flex">
            <button
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${selectedPlan === "monthly" ? "bg-white shadow-lg text-blue-600" : "text-gray-600"}`}
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${selectedPlan === "yearly" ? "bg-white shadow-lg text-blue-600" : "text-gray-600"}`}
              onClick={() => setSelectedPlan("yearly")}
            >
              Yearly <span className="text-sm text-green-600 ml-2">Save 25%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Monthly Plan */}
          <div className={`bg-white rounded-3xl shadow-2xl p-8 border-2 ${selectedPlan === "monthly" ? "border-blue-500" : "border-gray-100"}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Monthly Access</h3>
                <p className="text-gray-600 mt-2">Perfect for getting started</p>
              </div>
              {selectedPlan === "monthly" && (
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
                  POPULAR
                </div>
              )}
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-gray-900">${calculatePrice("monthly", months, appliedCoupon)}</span>
                <span className="text-gray-500 ml-2">/month</span>
              </div>
              {appliedCoupon && (
                <div className="flex items-center mt-2">
                  <span className="text-gray-400 line-through mr-2">${(5 * months).toFixed(2)}</span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    🎉 20% OFF APPLIED
                  </span>
                </div>
              )}
            </div>

            {/* Month Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select duration: <span className="font-bold">{months} month{months > 1 ? 's' : ''}</span>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={months}
                onChange={(e) => setMonths(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>1 month</span>
                <span>6 months</span>
                <span>12 months</span>
              </div>
            </div>

            <button
              onClick={() => handleGetStarted("monthly")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl mb-6"
            >
              Start Learning Now →
            </button>

            <ul className="space-y-4">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="bg-blue-100 p-1 rounded-lg mr-3">
                    {feature.icon}
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Yearly Plan */}
          <div className={`bg-gradient-to-br from-gray-900 to-black rounded-3xl shadow-2xl p-8 border-2 border-gray-800 ${selectedPlan === "yearly" ? "border-yellow-400" : ""}`}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-white">Annual Mastery</h3>
                <p className="text-gray-300 mt-2">Best value - commit to mastery</p>
              </div>
              <div className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-bold">
                BEST VALUE
              </div>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold text-white">${calculatePrice("yearly", months, appliedCoupon)}</span>
                <span className="text-gray-300 ml-2">/year</span>
              </div>
              <div className="text-gray-300 mt-2">
                <span className="line-through mr-2">$60</span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">Save 25%</span>
              </div>
            </div>

            <button
              onClick={() => handleGetStarted("yearly")}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold py-4 px-6 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl mb-6"
            >
              Get Annual Access →
            </button>

            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="bg-yellow-500/20 p-1 rounded-lg mr-3">
                    {React.cloneElement(feature.icon, { className: "w-5 h-5 text-yellow-400" })}
                  </div>
                  <span className="text-gray-300">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Coupon Section */}
        <div className="max-w-md mx-auto mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            🎁 Special Student Discount
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code: IKPACE20"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={applyCoupon}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all"
            >
              Apply
            </button>
          </div>
          <p className="text-gray-600 text-sm mt-4 text-center">
            Use code <span className="font-bold text-blue-600">IKPACE20</span> for 20% off any plan
          </p>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 mb-8">Trusted by students from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-xl font-bold text-gray-400">Google</div>
            <div className="text-xl font-bold text-gray-400">Microsoft</div>
            <div className="text-xl font-bold text-gray-400">Amazon</div>
            <div className="text-xl font-bold text-gray-400">Andela</div>
            <div className="text-xl font-bold text-gray-400">MEST</div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-bold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600">Yes! Cancel your subscription anytime. No questions asked.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
              <h4 className="font-bold text-gray-900 mb-2">Do I get a certificate?</h4>
              <p className="text-gray-600">Yes, all paid plans include a verifiable certificate upon completion.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
