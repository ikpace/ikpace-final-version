import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { 
  CheckCircle, Home, BookOpen, Download, ArrowRight, 
  Award, Users, Share2, Mail, Calendar, Clock, Star,
  FileText, MessageCircle, Twitter, Facebook, Linkedin,
  Copy, Check, Sparkles, Gift, Rocket, Zap
} from "lucide-react";
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  const { course, userDetails, amount, originalAmount, discount, enrollmentId } = location.state || {};

  // Brand colors
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    purple: "#7329ce",
    darkPurple: "#4610db",
    success: "#008F4C",
    warning: "#E6B800",
    teal: "#20C997"
  };

  useEffect(() => {
    // Redirect if no state
    if (!location.state) {
      navigate("/courses");
      return;
    }

    // Fetch enrollment details
    const fetchEnrollment = async () => {
      try {
        if (enrollmentId) {
          const { data } = await supabase
            .from('enrollments')
            .select('*')
            .eq('payment_reference', enrollmentId)
            .single();
          
          setEnrollment(data);
        }
      } catch (error) {
        console.error('Error fetching enrollment:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch recommended courses
    const fetchRecommendedCourses = async () => {
      try {
        const { data } = await supabase
          .from('courses')
          .select('id, title, slug, price, thumbnail_url, category, level, students_count, rating')
          .limit(3);
        
        setRecommendedCourses(data || []);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchEnrollment();
    fetchRecommendedCourses();

    // Track conversion
    const trackConversion = async () => {
      if (user && course) {
        await supabase.from('activity_logs').insert([{
          user_id: user.id,
          activity_type: 'enrollment_completed',
          metadata: {
            course_id: course.id,
            course_title: course.title,
            amount: amount,
            reference: enrollmentId
          }
        }]);
      }
    };
    trackConversion();

  }, [location.state, navigate, enrollmentId, user, course, amount]);

  const handleCopyReference = () => {
    navigator.clipboard.writeText(enrollmentId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform) => {
    const text = `I just enrolled in ${course?.title} at iKPACE! 🎓`;
    const url = window.location.origin + `/course/${course?.slug || course?.id}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    window.open(shareUrls[platform], '_blank');
  };

  if (!location.state) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A3D7C] to-[#7329ce] pt-16">
      {/* Confetti Effect Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
        <div className="absolute top-20 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-ping delay-100"></div>
        <div className="absolute top-40 left-1/2 w-2 h-2 bg-orange-400 rounded-full animate-ping delay-200"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        {/* Success Hero */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          <div className="flex flex-col items-center text-center mb-8">
            {/* Animated Success Icon */}
            <div className="relative mb-6">
              <div className="w-28 h-28 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              🎉 Payment Successful!
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl">
              Thank you for enrolling in <span className="font-bold" style={{ color: colors.primary }}>{course?.title}</span>
            </p>
          </div>

          {/* Quick Actions Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link 
              to={`/course/${course?.slug || course?.id}`}
              className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all group"
            >
              <BookOpen className="w-6 h-6 mx-auto mb-2" style={{ color: colors.purple }} />
              <p className="text-sm font-semibold text-gray-700">View Course</p>
            </Link>
            
            <Link 
              to="/dashboard"
              className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all group"
            >
              <Home className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
              <p className="text-sm font-semibold text-gray-700">Dashboard</p>
            </Link>
            
            <button 
              onClick={() => handleShare('twitter')}
              className="p-4 bg-gradient-to-br from-sky-50 to-cyan-50 rounded-xl hover:shadow-md transition-all group"
            >
              <Twitter className="w-6 h-6 mx-auto mb-2 text-sky-500" />
              <p className="text-sm font-semibold text-gray-700">Share</p>
            </button>
            
            <button 
              onClick={() => window.print()}
              className="p-4 bg-gradient-to-br from-gray-50 to-stone-50 rounded-xl hover:shadow-md transition-all group"
            >
              <Download className="w-6 h-6 mx-auto mb-2 text-gray-600" />
              <p className="text-sm font-semibold text-gray-700">Receipt</p>
            </button>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Enrollment Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Enrollment Card */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrollment Details</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Course</p>
                    <p className="font-bold text-lg">{course?.title}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="w-4 h-4" style={{ color: colors.primary }} />
                      <span className="text-sm text-gray-600">{course?.duration || 'Self-paced'}</span>
                      <Star className="w-4 h-4 ml-2 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{course?.rating || '4.9'} ({course?.students || 0}+)</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Amount Paid</p>
                    <p className="text-3xl font-bold" style={{ color: colors.primary }}>${amount?.toFixed(2)}</p>
                    {discount > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        You saved {discount}%! (${originalAmount?.toFixed(2)} → ${amount?.toFixed(2)})
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Student Name</p>
                    <p className="font-bold text-lg">{userDetails?.fullName || user?.user_metadata?.full_name}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email</p>
                    <p className="font-bold text-lg">{userDetails?.email || user?.email}</p>
                  </div>
                </div>

                {/* Transaction Reference */}
                <div className="mt-4 p-3 bg-gray-100 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Transaction Reference</p>
                    <p className="font-mono text-sm">{enrollmentId}</p>
                  </div>
                  <button 
                    onClick={handleCopyReference}
                    className="p-2 hover:bg-white rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500" />}
                  </button>
                </div>
              </div>

              {/* Learning Path */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Learning Path</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Access Course Materials</h4>
                      <p className="text-sm text-gray-600">All lessons, videos, and resources are now unlocked in your dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">2</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Set Your Schedule</h4>
                      <p className="text-sm text-gray-600">Recommended: 2-3 hours per week to complete in {course?.duration || '6 weeks'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">3</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Join Study Groups</h4>
                      <p className="text-sm text-gray-600">Connect with peers in our community forums</p>
                    </div>
                  </div>
                </div>

                <Link 
                  to={`/course-curriculum/${course?.slug || course?.id}`}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#1A3D7C] to-[#7329ce] text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Start Learning Now
                  <Rocket className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Right Column - Recommendations & Next Steps */}
            <div className="space-y-6">
              {/* Certificate Preview */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border-2 border-amber-200">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8" style={{ color: colors.secondary }} />
                  <h3 className="font-bold text-gray-900">Your Certificate Awaits</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Complete all lessons to earn your professional certificate</p>
                <Link 
                  to={`/course/${course?.slug || course?.id}`}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: colors.purple }}
                >
                  View Progress <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Community Card */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-8 h-8" style={{ color: colors.purple }} />
                  <h3 className="font-bold text-gray-900">Join Community</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Connect with 10,000+ students in our active community</p>
                <Link 
                  to="/community"
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: colors.purple }}
                >
                  Join Discussion <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Refer a Friend */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-8 h-8" style={{ color: colors.success }} />
                  <h3 className="font-bold text-gray-900">Refer a Friend</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">Get 10% off your next course when you refer a friend</p>
                <button 
                  onClick={() => handleShare('facebook')}
                  className="inline-flex items-center gap-1 text-sm font-semibold hover:gap-2 transition-all"
                  style={{ color: colors.success }}
                >
                  Share Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Recommended Courses */}
          {recommendedCourses.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">You Might Also Like</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedCourses.map(recCourse => (
                  <Link 
                    key={recCourse.id}
                    to={`/course/${recCourse.slug || recCourse.id}`}
                    className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                  >
                    <div className="h-40 bg-gradient-to-r from-[#1A3D7C] to-[#7329ce]"></div>
                    <div className="p-5">
                      <h4 className="font-bold text-gray-900 mb-2 group-hover:text-[#7329ce] transition-colors">
                        {recCourse.title}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{recCourse.rating || 4.8}</span>
                        <span>•</span>
                        <span>${recCourse.price || 7}</span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                        {recCourse.category || 'Course'}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4 justify-between items-center">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleShare('twitter')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Twitter className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => handleShare('facebook')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Facebook className="w-5 h-5 text-gray-600" />
              </button>
              <button 
                onClick={() => handleShare('linkedin')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            <Link 
              to="/courses"
              className="text-sm font-semibold hover:underline"
              style={{ color: colors.purple }}
            >
              Browse More Courses <ArrowRight className="w-4 h-4 inline" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}