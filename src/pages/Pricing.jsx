import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Check, Star, Zap, Shield, Users, Target, Gift, 
  Award, Clock, TrendingUp, Sparkles, Rocket, Crown,
  BadgeCheck, Heart, MessageCircle, BookOpen, Coffee,
  Globe, Lock, Gem, Medal, ThumbsUp, Calendar
} from "lucide-react";

const Pricing = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [months, setMonths] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    dark: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF"
  };

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
    } else if (coupon.toLowerCase() === "student50") {
      setAppliedCoupon(true);
    } else if (coupon.toLowerCase() === "ambassador") {
      setAppliedCoupon(true);
    } else {
      alert("Invalid coupon code. Try 'IKPACE20' for 20% off!");
    }
  };

  const calculatePrice = (plan, monthsCount, hasCoupon) => {
    let monthlyPrice = plan === "monthly" ? 7 : 5.83; // $70/year = $5.83/month
    let price = monthlyPrice * monthsCount;
    if (hasCoupon) price *= 0.8;
    return price.toFixed(2);
  };

  const calculateYearlyPrice = () => {
    let price = 70;
    if (appliedCoupon) price *= 0.8;
    return price.toFixed(2);
  };

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: "30+ Interactive Lessons", color: colors.primary },
    { icon: <Target className="w-5 h-5" />, text: "Real-world Projects", color: colors.secondary },
    { icon: <Users className="w-5 h-5" />, text: "Community Access", color: colors.accent },
    { icon: <Shield className="w-5 h-5" />, text: "Certificate of Completion", color: colors.success },
    { icon: <Star className="w-5 h-5" />, text: "Lifetime Content Updates", color: colors.warning },
    { icon: <Check className="w-5 h-5" />, text: "1-on-1 Mentorship Sessions", color: colors.orangeShade },
  ];

  const allFeatures = [
    ...features,
    { icon: <BookOpen className="w-5 h-5" />, text: "Downloadable Resources", color: colors.blueShade },
    { icon: <MessageCircle className="w-5 h-5" />, text: "Private Discord Access", color: colors.primary },
    { icon: <Award className="w-5 h-5" />, text: "Verified Digital Badge", color: colors.secondary },
    { icon: <Globe className="w-5 h-5" />, text: "Multi-language Support", color: colors.accent },
    { icon: <Clock className="w-5 h-5" />, text: "Self-paced Learning", color: colors.success },
    { icon: <Rocket className="w-5 h-5" />, text: "Career Support", color: colors.warning },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Students", icon: <Users size={24} />, color: colors.primary },
    { number: "4.9/5", label: "Average Rating", icon: <Star size={24} />, color: colors.secondary },
    { number: "30 Days", label: "Money-back", icon: <Shield size={24} />, color: colors.success },
    { number: "94%", label: "Success Rate", icon: <TrendingUp size={24} />, color: colors.warning },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      text: "The best investment I've made in my career. Landed a job within 3 months!",
      rating: 5,
      image: "👩‍💻",
      company: "Google"
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      text: "Worth every penny. The mentorship alone is worth more than the price.",
      rating: 5,
      image: "👨‍💻",
      company: "Self-employed"
    },
    {
      name: "Amina Okafor",
      role: "Product Manager",
      text: "The community support is amazing. Learned so much from peers.",
      rating: 5,
      image: "👩‍💼",
      company: "Flutterwave"
    }
  ];

  const faqs = [
    {
      q: "Can I cancel anytime?",
      a: "Yes! Cancel your subscription anytime. No questions asked."
    },
    {
      q: "Do I get a certificate?",
      a: "Yes, all paid plans include a verifiable certificate upon completion."
    },
    {
      q: "Is there a money-back guarantee?",
      a: "30-day money-back guarantee. If you're not satisfied, get a full refund."
    },
    {
      q: "Can I switch plans later?",
      a: "Absolutely! You can upgrade or downgrade anytime."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 rounded-full font-semibold text-sm mb-6" style={{ background: colors.primary + '10', color: colors.primary }}>
          <Sparkles className="w-4 h-4 mr-2" /> LIMITED TIME OFFER
        </div>
        <h1 className="text-5xl font-bold mb-6" style={{ color: colors.primary }}>
          Start Your Tech Journey Today
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
          Join <span className="font-bold" style={{ color: colors.secondary }}>50,000+ students</span> who transformed their careers with our project-based learning approach. No experience required.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                <div className="p-2 rounded-lg" style={{ background: stat.color + '10', color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.number}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <span className="text-lg font-bold text-gray-400">TechCrunch</span>
          <span className="text-lg font-bold text-gray-400">Forbes</span>
          <span className="text-lg font-bold text-gray-400">Inc.</span>
          <span className="text-lg font-bold text-gray-400">Google</span>
          <span className="text-lg font-bold text-gray-400">Microsoft</span>
          <span className="text-lg font-bold text-gray-400">Meta</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Pricing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-2xl inline-flex">
            <button
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${billingCycle === "monthly" ? "bg-white shadow-lg" : "text-gray-600"}`}
              style={billingCycle === "monthly" ? { color: colors.primary } : {}}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button
              className={`px-8 py-3 rounded-xl font-semibold transition-all relative ${billingCycle === "yearly" ? "bg-white shadow-lg" : "text-gray-600"}`}
              style={billingCycle === "yearly" ? { color: colors.primary } : {}}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 30%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Basic</h3>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold" style={{ color: colors.primary }}>
                  ${billingCycle === "monthly" ? "7" : "58"}
                </span>
                <span className="text-gray-500 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
              </div>
              {billingCycle === "yearly" && (
                <div className="mt-2">
                  <span className="text-gray-400 line-through mr-2">$84</span>
                  <span className="text-green-600 text-sm font-bold">Save $26</span>
                </div>
              )}
            </div>

            <button
              onClick={() => handleGetStarted(billingCycle)}
              className="w-full py-4 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl mb-6"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              Start Learning →
            </button>

            <ul className="space-y-4">
              {features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="p-1 rounded-lg mr-3" style={{ background: feature.color + '20', color: feature.color }}>
                    {feature.icon}
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro Plan - Most Popular */}
          <div className="relative bg-white rounded-3xl shadow-2xl p-8 border-2 transform scale-105" style={{ borderColor: colors.secondary }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white" style={{ background: colors.secondary }}>
              🔥 MOST POPULAR
            </div>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Pro</h3>
              <p className="text-gray-600">Best value for serious learners</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-5xl font-bold" style={{ color: colors.secondary }}>
                  ${billingCycle === "monthly" ? "12" : "99"}
                </span>
                <span className="text-gray-500 ml-2">/{billingCycle === "monthly" ? "month" : "year"}</span>
              </div>
              <div className="mt-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold inline-flex items-center gap-1">
                  <Gift size={14} /> Includes all features + bonuses
                </span>
              </div>
            </div>

            <button
              onClick={() => handleGetStarted(billingCycle)}
              className="w-full py-4 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl mb-6"
              style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.orangeShade})` }}
            >
              Get Pro Access →
            </button>

            <ul className="space-y-4">
              {allFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="p-1 rounded-lg mr-3" style={{ background: feature.color + '20', color: feature.color }}>
                    {feature.icon}
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lifetime Plan */}
          <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-100 hover:shadow-2xl transition-all">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2" style={{ color: colors.primary }}>Lifetime</h3>
              <p className="text-gray-600">One payment, forever access</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline">
                <span className="text-4xl font-bold" style={{ color: colors.primary }}>$299</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>
              <div className="mt-2">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                  Best long-term value
                </span>
              </div>
            </div>

            <button
              onClick={() => handleGetStarted("lifetime")}
              className="w-full py-4 rounded-xl font-bold text-white transition-all transform hover:-translate-y-1 shadow-lg hover:shadow-xl mb-6"
              style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.green})` }}
            >
              Get Lifetime Access →
            </button>

            <ul className="space-y-4">
              {allFeatures.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <div className="p-1 rounded-lg mr-3" style={{ background: feature.color + '20', color: feature.color }}>
                    {feature.icon}
                  </div>
                  <span className="text-gray-700">{feature.text}</span>
                  {index === 0 && <span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Lifetime</span>}
                </li>
              ))}
              <li className="flex items-center text-green-600 font-bold">
                <Crown size={18} className="mr-2" />
                Lifetime updates & support
              </li>
            </ul>
          </div>
        </div>

        {/* Month Selector for Monthly Plans */}
        {billingCycle === "monthly" && (
          <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select commitment: <span className="font-bold" style={{ color: colors.primary }}>{months} month{months > 1 ? 's' : ''}</span>
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.secondary} 100%)` }}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1 mo</span>
              <span>3 mos</span>
              <span>6 mos</span>
              <span>9 mos</span>
              <span>12 mos</span>
            </div>
            {months >= 6 && (
              <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center gap-2">
                <Gift size={18} className="text-green-600" />
                <span className="text-sm text-green-700">You save ${((months * 7) - (months * 5.83)).toFixed(2)} with longer commitment!</span>
              </div>
            )}
          </div>
        )}

        {/* Coupon Section */}
        <div className="max-w-md mx-auto mt-8 p-6 rounded-2xl shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)` }}>
          <h3 className="text-xl font-bold mb-4 text-center" style={{ color: colors.primary }}>
            🎁 Special Discounts
          </h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              onClick={applyCoupon}
              className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105"
              style={{ background: colors.secondary }}
            >
              Apply
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
              <span className="text-xs font-bold" style={{ color: colors.primary }}>IKPACE20</span>
              <p className="text-xs text-gray-500">20% off</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg border border-gray-200">
              <span className="text-xs font-bold" style={{ color: colors.secondary }}>STUDENT50</span>
              <p className="text-xs text-gray-500">50% off for students</p>
            </div>
          </div>
        </div>

        {/* Money-back Guarantee */}
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-xl text-center border border-gray-100">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full" style={{ background: colors.primary + '10' }}>
              <Shield size={48} style={{ color: colors.primary }} />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3" style={{ color: colors.primary }}>30-Day Money-Back Guarantee</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Try iKPACE risk-free for 30 days. If you're not satisfied, we'll refund every penny. No questions asked.
          </p>
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            <div className="text-center">
              <Check size={20} className="mx-auto mb-2 text-green-600" />
              <p className="text-xs text-gray-600">Full refund</p>
            </div>
            <div className="text-center">
              <Check size={20} className="mx-auto mb-2 text-green-600" />
              <p className="text-xs text-gray-600">No questions</p>
            </div>
            <div className="text-center">
              <Check size={20} className="mx-auto mb-2 text-green-600" />
              <p className="text-xs text-gray-600">30 days</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: colors.primary }}>
            Trusted by 50,000+ Students
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{testimonial.image}</span>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8" style={{ color: colors.primary }}>
            Frequently Asked Questions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 p-12 rounded-3xl text-center text-white" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Our team is here to help you choose the right plan for your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white rounded-full font-bold hover:scale-105 transition-all" style={{ color: colors.primary }}>
              Chat with Us
            </button>
            <button className="px-8 py-3 border-2 border-white rounded-full font-bold hover:bg-white/10 transition-all">
              Schedule a Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;