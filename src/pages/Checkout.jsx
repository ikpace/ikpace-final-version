import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Lock, Shield, CheckCircle, Award, Zap, Target,
  ChevronRight, Clock, Users, Star, Mail, Phone,
  User, MapPin, CreditCard, Smartphone, Building,
  BadgeCheck, BookOpen, ArrowLeft, Gift, Sparkles,
  Coffee, Download, Video, Headphones, Globe, Heart,
  MessageCircle, HelpCircle, Facebook, Twitter,
  Linkedin, Instagram, Youtube, Copy, Check,
  AlertCircle, Truck, ShoppingBag, DollarSign, Percent
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function Checkout() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'Ghana',
    paymentMethod: 'mobile_money'
  });

  // Brand colors
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

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true);

        if (courseId) {
          // Try to fetch from Supabase first using slug
          const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('slug', courseId)
            .single();

          if (error) {
            console.log('Course not found in Supabase:', error);
            // Fall back to sample data
            const sampleCourse = getSampleCourse(courseId);
            if (sampleCourse) {
              setCourse({
                ...sampleCourse,
                id: courseId, // Use slug as ID for sample courses
                isSample: true
              });
            } else {
              navigate('/courses');
            }
          } else if (data) {
            // Map Supabase data - keep the UUID as course.id
            const formattedCourse = {
              id: data.id,  // This is the UUID from database
              slug: data.slug,
              title: data.title || 'Course',
              price: parseFloat(data.price) || 7,
              originalPrice: parseFloat(data.original_price) || 49,
              duration: data.duration || 'Lifetime access',
              description: data.description || 'Master practical skills that will help you grow.',
              image: data.image_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
              instructor: data.instructor || 'iKPACE Expert',
              students: data.enrollment_count || 32,
              rating: data.rating || 4.8,
              level: data.level || 'Beginner',
              category: data.category || 'Career',
              isSample: false
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
          setCourse({
            ...sampleCourse,
            id: courseId,
            isSample: true
          });
        } else {
          navigate('/courses');
        }
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId, navigate]);

  // Sample courses with working images (all from Pexels)
  const getSampleCourse = (id) => {
    const sampleCourses = {
      'virtual-assistant-pro': {
        title: 'Virtual Assistant Professional',
        price: 7,
        originalPrice: 49,
        duration: '6 weeks',
        description: 'Master administrative skills and become a successful virtual assistant',
        image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Amara Osei',
        students: 32,
        rating: 4.9,
        level: 'Beginner',
        category: 'Career'
      },
      'social-media-marketing': {
        title: 'Social Media Marketing',
        price: 7,
        originalPrice: 49,
        duration: '6 weeks',
        description: 'Master social media strategy, ads & analytics',
        image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Kofi Asante',
        students: 28,
        rating: 4.8,
        level: 'Beginner',
        category: 'Marketing'
      },
      'canva-graphic-design': {
        title: 'Canva & Graphic Design',
        price: 7,
        originalPrice: 39,
        duration: '4 weeks',
        description: 'Create stunning visuals & build your design portfolio',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Esi Darkwah',
        students: 19,
        rating: 4.7,
        level: 'Beginner',
        category: 'Design'
      },
      'smart-kids-coding': {
        title: 'Smart Kids Coding',
        price: 7,
        originalPrice: 35,
        duration: '4 weeks',
        description: 'Fun coding adventures for ages 6-12 using Scratch',
        image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Ms. Akosua',
        students: 12,
        rating: 4.9,
        level: 'Beginner',
        category: 'Kids'
      },
      'freelancing-online-income': {
        title: 'Freelancing & Online Income',
        price: 7,
        originalPrice: 39,
        duration: '4 weeks',
        description: 'Start earning online with freelancing skills',
        image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Yaa Asantewaa',
        students: 21,
        rating: 4.8,
        level: 'Beginner',
        category: 'Business'
      },
      'ai-prompt-engineering': {
        title: 'AI Prompt Engineering',
        price: 7,
        originalPrice: 49,
        duration: '6 weeks',
        description: 'Master AI tools for content creation',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        instructor: 'Nana Addo',
        students: 18,
        rating: 4.9,
        level: 'Intermediate',
        category: 'Tech'
      }
    };
    return sampleCourses[id];
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME10');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.1);
      setPromoApplied(true);
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code');
    }
  };

  const calculateTotal = () => {
    if (!course) return 0;
    const subtotal = course.price;
    const discountAmount = subtotal * discount;
    return subtotal - discountAmount;
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
      amount: calculateTotal() * 100,
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

  // ========== FIXED: Properly handles UUID for database ==========
  const savePayment = async (response) => {
    console.log("Payment success:", response.reference);

    try {
      // Check if user is logged in
      if (!user) {
        console.error("No user logged in");
        alert("Please log in to complete enrollment");
        navigate("/login");
        return;
      }

      // For sample courses (not in database), we can't save to payments table
      if (course.isSample) {
        console.log("Sample course detected - skipping database save");
        navigate("/payment-success", {
          state: {
            course: course,
            userDetails: formData,
            amount: calculateTotal(),
            enrollmentId: response.reference,
          },
        });
        return;
      }

      // Ensure course has UUID from database
      if (!course || !course.id) {
        console.error("Course data missing or invalid");
        alert("Error: Course information missing");
        return;
      }

      console.log("Using course UUID:", course.id);

      // Prepare payment data with the correct UUID
      const paymentData = {
        user_id: user.id,
        user_email: formData.email,
        full_name: formData.fullName,
        phone: formData.phone || null,
        course_id: course.id,  // This is the UUID from database
        course_title: course.title,
        amount: calculateTotal(),
        discount: discount * 100 || 0,
        promo_code: promoApplied ? promoCode : null,
        reference: response.reference,
        status: "success",
        payment_method: formData.paymentMethod,
        currency: "GHS",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      console.log("Inserting payment data:", paymentData);

      // Insert into payments table
      const { error: paymentError } = await supabase
        .from("payments")
        .insert([paymentData]);

      if (paymentError) {
        console.error("Error saving payment:", paymentError);
        console.error("Error details:", paymentError.details);
        console.error("Error message:", paymentError.message);
        
        // Try a minimal insert as fallback
        const minimalData = {
          user_id: user.id,
          user_email: formData.email,
          full_name: formData.fullName,
          course_id: course.id,
          course_title: course.title,
          amount: calculateTotal(),
          reference: response.reference,
          status: "success"
        };
        
        const { error: fallbackError } = await supabase
          .from("payments")
          .insert([minimalData]);
          
        if (fallbackError) {
          console.error("Fallback also failed:", fallbackError);
          alert("Payment succeeded but saving failed. Please contact support with your payment reference: " + response.reference);
          return;
        }
        
        console.log("Payment saved with minimal data");
      } else {
        console.log("Payment saved successfully");
      }

      // Create enrollment
      const { error: enrollError } = await supabase
        .from("enrollments")
        .insert([{
          user_id: user.id,
          course_id: course.id,
          user_email: formData.email,
          user_name: formData.fullName,
          amount: calculateTotal(),
          payment_reference: response.reference,
          status: "active",
          enrolled_at: new Date().toISOString(),
          progress_percentage: 0
        }]);

      if (enrollError) {
        console.error("Error creating enrollment:", enrollError);
        // Don't alert here, payment already succeeded
      }

      // Success - redirect to payment success page
      navigate("/payment-success", {
        state: {
          course: course,
          userDetails: formData,
          amount: calculateTotal(),
          originalAmount: course.price,
          discount: discount * 100,
          enrollmentId: response.reference,
        },
      });

    } catch (error) {
      console.error("Unexpected error in savePayment:", error);
      alert("An unexpected error occurred. Please contact support with reference: " + response.reference);
    }
  };
  // ========== END FIXED FUNCTION ==========

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-6" style={{ borderColor: colors.primary }}></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Loading Checkout</h3>
            <p className="text-gray-600">Preparing your enrollment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h3>
            <p className="text-gray-600 mb-6">Unable to load course details.</p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-all"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
            >
              <BookOpen className="w-4 h-4" />
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Simple Header with Navigation */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/courses" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Courses</span>
              </Link>
              <div className="w-px h-4 bg-gray-300"></div>
              <Link to="/" className="font-bold text-xl" style={{ color: colors.primary }}>
                iKPACE
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/support" className="text-sm text-gray-600 hover:text-gray-900">
                Help
              </Link>
              <Link to="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-600 hover:text-gray-900" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Simple Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/courses" className="hover:text-gray-900">Courses</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to={`/course/${course.slug || course.id}`} className="hover:text-gray-900 line-clamp-1 max-w-[200px]">{course.title}</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">Checkout</span>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Complete Your Enrollment
          </h1>
          <p className="text-gray-600 text-lg">
            You're enrolling in: <span className="font-bold" style={{ color: colors.primary }}>{course.title}</span>
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Course Info & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-3">{course.description}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" style={{ color: colors.primary }} />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" style={{ color: colors.secondary }} />
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" style={{ color: colors.success }} />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating} ({course.students} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Information Form */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Student Information</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRing: colors.primary }}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRing: colors.primary }}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
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
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:border-transparent"
                      style={{ focusRing: colors.primary }}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    style={{ focusRing: colors.primary }}
                  >
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Kenya">Kenya</option>
                    <option value="South Africa">South Africa</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'mobile_money' }))}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'mobile_money' 
                        ? 'border-2' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={formData.paymentMethod === 'mobile_money' ? { borderColor: colors.primary, background: colors.primary + '05' } : {}}
                  >
                    <Smartphone className={`w-6 h-6 ${formData.paymentMethod === 'mobile_money' ? '' : 'text-gray-400'}`} style={formData.paymentMethod === 'mobile_money' ? { color: colors.primary } : {}} />
                    <span className={`font-medium ${formData.paymentMethod === 'mobile_money' ? '' : 'text-gray-700'}`} style={formData.paymentMethod === 'mobile_money' ? { color: colors.primary } : {}}>
                      Mobile Money
                    </span>
                    <span className="text-xs text-gray-500">MTN, Vodafone, AirtelTigo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'card' 
                        ? 'border-2' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={formData.paymentMethod === 'card' ? { borderColor: colors.primary, background: colors.primary + '05' } : {}}
                  >
                    <CreditCard className={`w-6 h-6 ${formData.paymentMethod === 'card' ? '' : 'text-gray-400'}`} style={formData.paymentMethod === 'card' ? { color: colors.primary } : {}} />
                    <span className={`font-medium ${formData.paymentMethod === 'card' ? '' : 'text-gray-700'}`} style={formData.paymentMethod === 'card' ? { color: colors.primary } : {}}>
                      Card Payment
                    </span>
                    <span className="text-xs text-gray-500">Visa, Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'bank' }))}
                    className={`p-4 border rounded-lg flex flex-col items-center justify-center gap-2 transition-all ${
                      formData.paymentMethod === 'bank' 
                        ? 'border-2' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={formData.paymentMethod === 'bank' ? { borderColor: colors.primary, background: colors.primary + '05' } : {}}
                  >
                    <Building className={`w-6 h-6 ${formData.paymentMethod === 'bank' ? '' : 'text-gray-400'}`} style={formData.paymentMethod === 'bank' ? { color: colors.primary } : {}} />
                    <span className={`font-medium ${formData.paymentMethod === 'bank' ? '' : 'text-gray-700'}`} style={formData.paymentMethod === 'bank' ? { color: colors.primary } : {}}>
                      Bank Transfer
                    </span>
                    <span className="text-xs text-gray-500">Direct bank deposit</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Promo Code Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4">Have a Promo Code?</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                  style={{ focusRing: colors.primary }}
                  disabled={promoApplied}
                />
                <button 
                  onClick={handleApplyPromo}
                  disabled={promoApplied}
                  className="px-6 py-3 border-2 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Apply
                </button>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-sm text-gray-600">Try: WELCOME10 for 10% off</span>
                <button 
                  onClick={handleCopyCode}
                  className="p-1 hover:bg-gray-100 rounded"
                  disabled={promoApplied}
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                </button>
              </div>
              {promoApplied && (
                <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-700">10% discount applied!</span>
                </div>
              )}
            </div>

            {/* Money-back Guarantee Banner */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-500 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-gray-900">30-Day Money-Back Guarantee</h4>
                <p className="text-sm text-gray-600">Not satisfied? Get a full refund within 30 days of purchase.</p>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Order Summary Card */}
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.duration}</p>
                  </div>
                  <span className="font-bold" style={{ color: colors.primary }}>{formatPrice(course.price)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount (10%):</span>
                    <span>- {formatPrice(course.price * discount)}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>Total:</span>
                    <span style={{ color: colors.primary }}>{formatPrice(calculateTotal())}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Including all taxes</p>
                </div>
              </div>

              {/* Continue to Payment Button */}
              <button
                onClick={handleContinueToPayment}
                className="w-full mt-6 py-4 text-white rounded-lg font-bold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                <Lock className="w-5 h-5" />
                Continue to Payment
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Security Badges */}
              <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-gray-200">
                <div className="text-center flex-1">
                  <Shield className="w-6 h-6 mx-auto mb-1" style={{ color: colors.success }} />
                  <p className="text-xs text-gray-600">Secure</p>
                </div>
                <div className="text-center flex-1">
                  <Lock className="w-6 h-6 mx-auto mb-1" style={{ color: colors.primary }} />
                  <p className="text-xs text-gray-600">Encrypted</p>
                </div>
                <div className="text-center flex-1">
                  <BadgeCheck className="w-6 h-6 mx-auto mb-1" style={{ color: colors.secondary }} />
                  <p className="text-xs text-gray-600">Guaranteed</p>
                </div>
              </div>
            </div>

            {/* What You'll Get Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" style={{ color: colors.secondary }} />
                What You'll Get
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.success }} />
                  <span>Full lifetime access</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.success }} />
                  <span>Professional certificate</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.success }} />
                  <span>24/7 student support</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.success }} />
                  <span>Downloadable resources</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: colors.success }} />
                  <span>Mobile and TV access</span>
                </li>
              </ul>
            </div>

            {/* Need Help Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <MessageCircle className="w-5 h-5" style={{ color: colors.primary }} />
                Need Help?
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is ready to assist you.
              </p>
              <div className="space-y-3">
                <Link 
                  to="/support" 
                  className="flex items-center gap-3 text-sm hover:underline"
                  style={{ color: colors.primary }}
                >
                  <HelpCircle className="w-4 h-4" />
                  Help Center
                </Link>
                <Link 
                  to="/contact" 
                  className="flex items-center gap-3 text-sm hover:underline"
                  style={{ color: colors.primary }}
                >
                  <Mail className="w-4 h-4" />
                  Contact Support
                </Link>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  +233 (0) 123 456 789
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simple Footer */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            
          </div>
          
        </div>
      </div>
    </div>
  );
}