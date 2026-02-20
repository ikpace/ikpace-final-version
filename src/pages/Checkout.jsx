import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Lock, Shield, CheckCircle, Award, Zap, Target,
  ChevronRight, Clock, Users, Star, Mail, Phone,
  User, MapPin, CreditCard, Smartphone, Building,
  BadgeCheck, BookOpen
} from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Ghana',
    paymentMethod: 'mobile_money'
  });

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        if (courseId) {
          // Try to fetch from Supabase first
          const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('id', courseId)
            .single();

          if (error) {
            console.log('Course not found in Supabase:', error);
            // Fall back to sample data
            const sampleCourse = getSampleCourse(courseId);
            if (sampleCourse) {
              setCourse(sampleCourse);
            } else {
              navigate('/courses');
            }
          } else if (data) {
            // Map Supabase data
            const formattedCourse = {
              id: data.id,
              title: data.title || 'Course',
              price: parseFloat(data.price) || 0,
              duration: data.duration || 'Lifetime access',
              description: data.description || '',
              image: data.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
              instructor: data.instructor || 'iKPACE Expert'
            };
            setCourse(formattedCourse);
          }
        } else {
          navigate('/courses');
        }
      } catch (error) {
        console.error('Error loading course:', error);
        const sampleCourse = getSampleCourse(courseId);
        if (sampleCourse) {
          setCourse(sampleCourse);
        } else {
          navigate('/courses');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, navigate]);

  // Sample courses for fallback
  const getSampleCourse = (id) => {
    const sampleCourses = {
      'tiktok-mastery': {
        id: 'tiktok-mastery',
        title: 'TikTok Monetization Mastery',
        price: 299,
        duration: '6 weeks',
        description: 'Master TikTok algorithm and monetization',
        image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
        instructor: 'Alex Chen - TikTok Expert'
      },
      'smm': {
        id: 'smm',
        title: 'Social Media Marketing Mastery',
        price: 249,
        duration: '8 weeks',
        description: 'Complete social media marketing strategy for all platforms',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        instructor: 'Sarah Johnson - SMM Expert'
      },
      'canva-design': {
        id: 'canva-design',
        title: 'Canva & Graphic Design Pro',
        price: 199,
        duration: '4 weeks',
        description: 'Master Canva and create stunning designs',
        image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800',
        instructor: 'Emma Davis - Design Expert'
      },
      'ai-prompt-engineering': {
        id: 'ai-prompt-engineering',
        title: 'AI Prompt Engineering Pro',
        price: 399,
        duration: '6 weeks',
        description: 'Master ChatGPT, Claude & Gemini',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        instructor: 'Dr. Alan Turing - AI Researcher'
      },
      'digital-real-estate': {
        id: 'digital-real-estate',
        title: 'Digital Real Estate Masterclass',
        price: 499,
        duration: '10 weeks',
        description: 'Buy, build & rent websites for passive income',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
        instructor: 'Robert Chen - Digital Real Estate Investor'
      },
      'virtual-assistant-pro': {
        id: 'virtual-assistant-pro',
        title: 'Virtual Assistant Professional',
        price: 7,
        duration: '6 weeks',
        description: 'Master administrative skills and become a successful virtual assistant',
        image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Amara Osei - VA Business Coach'
      },
      'social-media-marketing': {
        id: 'social-media-marketing',
        title: 'Social Media Marketing',
        price: 7,
        duration: '6 weeks',
        description: 'Master social media strategy, ads & analytics',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
        instructor: 'Kofi Asante - Digital Marketing Expert'
      },
      'canva-graphic-design': {
        id: 'canva-graphic-design',
        title: 'Canva & Graphic Design',
        price: 7,
        duration: '4 weeks',
        description: 'Create stunning visuals & build your design portfolio',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
        instructor: 'Esi Darkwah - Graphic Designer'
      },
      'smart-kids-coding': {
        id: 'smart-kids-coding',
        title: 'Smart Kids Coding',
        price: 7,
        duration: '4 weeks',
        description: 'Fun coding adventures for ages 6-12 using Scratch',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
        instructor: 'Ms. Akosua - Kids Coding Instructor'
      },
      'freelancing-online-income': {
        id: 'freelancing-online-income',
        title: 'Freelancing & Online Income',
        price: 7,
        duration: '4 weeks',
        description: 'Start earning online with freelancing skills',
        image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Samuel Ofori - Freelance Business Coach'
      }
    };
    return sampleCourses[id] || sampleCourses['tiktok-mastery'];
  };

  const formatPrice = (price) => {
    return `GHS ${price.toFixed(2)}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinueToPayment = () => {
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    if (!window.PaystackPop) {
      alert("Payment system not loaded. Please refresh.");
      return;
    }

    const handler = window.PaystackPop.setup({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: formData.email,
      amount: course.price * 100,
      currency: "GHS",
      callback: function (response) {
        savePayment(response);
      },
      onClose: function () {
        console.log("Payment popup closed");
      },
    });

    handler.openIframe();
  };

  const savePayment = async (response) => {
    console.log("Payment success:", response.reference);

    const { error } = await supabase.from("payments").insert([
      {
        user_email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone,
        course_id: course.id,
        course_title: course.title,
        amount: course.price,
        reference: response.reference,
        status: "success",
      },
    ]);

    if (error) {
      console.error("Error saving payment:", error);
      alert("Payment succeeded but saving failed.");
      return;
    }

    navigate("/payment-success", {
      state: {
        course: course,
        userDetails: formData,
        amount: course.price,
        enrollmentId: response.reference,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7329ce] mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Loading Checkout</h3>
            <p className="text-gray-600">Preparing your enrollment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h3>
            <p className="text-gray-600 mb-6">Unable to load course details.</p>
            <button
              onClick={() => navigate('/courses')}
              className="px-6 py-3 bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white rounded-lg font-medium hover:opacity-90"
            >
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Complete Your Enrollment
          </h1>
          <p className="text-gray-600 text-lg">
            You're enrolling in: <span className="font-bold text-[#7329ce]">{course.title}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info & Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Info Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{course.instructor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Information Form */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Student Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7329ce] focus:border-transparent"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7329ce] focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-3 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                      <span className="text-gray-600">+233</span>
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-[#7329ce] focus:border-transparent"
                      placeholder="123456789"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7329ce] focus:border-transparent"
                  >
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Payment Method
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'mobile_money' }))}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 ${formData.paymentMethod === 'mobile_money' ? 'border-[#7329ce] bg-[#7329ce]/5' : 'border-gray-300'}`}
                  >
                    <Smartphone className={`w-6 h-6 ${formData.paymentMethod === 'mobile_money' ? 'text-[#7329ce]' : 'text-gray-400'}`} />
                    <span className={`font-medium ${formData.paymentMethod === 'mobile_money' ? 'text-[#7329ce]' : 'text-gray-700'}`}>
                      Mobile Money
                    </span>
                    <span className="text-xs text-gray-500">MTN, Vodafone, AirtelTigo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 ${formData.paymentMethod === 'card' ? 'border-[#7329ce] bg-[#7329ce]/5' : 'border-gray-300'}`}
                  >
                    <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'card' ? 'text-[#7329ce]' : 'text-gray-400'}`} />
                    <span className={`font-medium ${formData.paymentMethod === 'card' ? 'text-[#7329ce]' : 'text-gray-700'}`}>
                      Card Payment
                    </span>
                    <span className="text-xs text-gray-500">Visa, Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'bank' }))}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 ${formData.paymentMethod === 'bank' ? 'border-[#7329ce] bg-[#7329ce]/5' : 'border-gray-300'}`}
                  >
                    <Building className={`w-6 h-6 ${formData.paymentMethod === 'bank' ? 'text-[#7329ce]' : 'text-gray-400'}`} />
                    <span className={`font-medium ${formData.paymentMethod === 'bank' ? 'text-[#7329ce]' : 'text-gray-700'}`}>
                      Bank Transfer
                    </span>
                    <span className="text-xs text-gray-500">Direct bank deposit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enrollment Steps */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-[#7329ce] text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-900">Enrollment Steps</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Step 1: Confirm Details</h4>
                    <p className="text-sm text-gray-600 mt-1">Review course information and enter your details above.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Step 2: Payment (Next Page)</h4>
                    <p className="text-sm text-gray-600 mt-1">Choose payment method: Mobile Money, Card, or Bank Transfer.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Step 3: Access Course</h4>
                    <p className="text-sm text-gray-600 mt-1">Get instant access to all course materials after payment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary & Continue Button */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.duration}</p>
                  </div>
                  <span className="font-bold text-[#7329ce]">{formatPrice(course.price)}</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total Amount</span>
                    <span>{formatPrice(course.price)}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">All prices in Ghana Cedis (GHS)</p>
                </div>
              </div>

              {/* Continue to Payment Button */}
              <button
                onClick={handleContinueToPayment}
                className="w-full mt-8 py-4 bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3"
              >
                <Lock className="w-5 h-5" />
                Continue to Payment
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Security Badges */}
              <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Secure</p>
                </div>
                <div className="text-center">
                  <Lock className="w-8 h-8 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Encrypted</p>
                </div>
                <div className="text-center">
                  <BadgeCheck className="w-8 h-8 text-purple-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">Guaranteed</p>
                </div>
              </div>
            </div>

            {/* What You'll Get Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                What You'll Get
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Full lifetime access</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Professional certificate</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>24/7 student support</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Downloadable resources</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Mobile and TV access</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>30-day money-back guarantee</span>
                </li>
              </ul>
            </div>

            {/* Success Rate Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 rounded-xl p-5">
              <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                <Target className="w-5 h-5" />
                98% Success Rate
              </h4>
              <p className="text-green-700 text-sm mb-3">Students who complete this course achieve their career goals.</p>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-green-800 font-medium">Most popular course this month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>By continuing, you agree to our <a href="/terms" className="text-[#7329ce] hover:underline">Terms of Service</a> and <a href="/privacy" className="text-[#7329ce] hover:underline">Privacy Policy</a>.</p>
          <p className="mt-1">© {new Date().getFullYear()} IKPACE Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}