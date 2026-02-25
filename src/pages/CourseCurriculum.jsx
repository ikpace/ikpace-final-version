import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, Home, BookOpen, Download, ArrowRight } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  const { course, userDetails, amount, enrollmentId } = location.state || {};

  useEffect(() => {
    // Redirect if no state
    if (!location.state) {
      navigate("/courses");
    }
  }, [location.state, navigate]);

  // Colors to match your brand
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    purple: "#7329ce",
    darkPurple: "#4610db"
  };

  // Get the correct slug based on course ID
  const getCourseSlug = () => {
    if (!course?.id) return 'virtual-assistant-pro';
    
    // Map course IDs to slugs (adjust based on your actual IDs)
    const slugMap = {
      '1': 'virtual-assistant-pro',
      '2': 'social-media-marketing',
      '3': 'canva-graphic-design',
      '4': 'smart-kids-coding',
      '5': 'freelancing-online-income',
      'virtual-assistant-pro': 'virtual-assistant-pro',
      'social-media-marketing': 'social-media-marketing',
      'canva-graphic-design': 'canva-graphic-design',
      'smart-kids-coding': 'smart-kids-coding',
      'freelancing-online-income': 'freelancing-online-income'
    };
    
    return slugMap[course.id] || slugMap[course.title?.toLowerCase().replace(/\s+/g, '-')] || 'virtual-assistant-pro';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pt-16">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Enrollment Successful!
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Welcome to {course?.title || "the course"}! Your learning journey begins now.
          </p>

          {/* Enrollment Details */}
          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enrollment Details</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Course</p>
                <p className="font-bold text-lg">{course?.title || "Digital Course"}</p>
              </div>

              <div>
                <p className="text-gray-600">Amount Paid</p>
                <p className="font-bold text-lg">${amount?.toFixed(2) || "7.00"}</p>
              </div>

              <div>
                <p className="text-gray-600">Student Name</p>
                <p className="font-bold text-lg">{userDetails?.fullName || "Student"}</p>
              </div>

              <div>
                <p className="text-gray-600">Enrollment ID</p>
                <p className="font-mono text-sm">{enrollmentId?.slice(0, 8) || "NEW-ENROLL"}</p>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Next?</h3>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Access Course</h4>
                <p className="text-gray-600 text-sm">
                  Go to your dashboard to start learning immediately
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Download Materials</h4>
                <p className="text-gray-600 text-sm">
                  Get all course resources from the learning portal
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <Home className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Join Community</h4>
                <p className="text-gray-600 text-sm">
                  Connect with other students in our learning community
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(`/course-curriculum/${getCourseSlug()}`, {
                state: {
                  enrollmentId: enrollmentId,
                  courseName: course?.title,
                  userDetails: userDetails,
                  course: course
                }
              })}
              className="px-8 py-4 text-white font-bold rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.darkPurple})` }}
            >
              🚀 Start Learning Now
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="px-8 py-4 bg-white border-2 font-bold rounded-xl hover:bg-gray-50 transition-all"
              style={{ borderColor: colors.purple, color: colors.purple }}
            >
              Go to Dashboard
            </button>

            <button
              onClick={() => navigate("/courses")}
              className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
            >
              Browse More Courses
            </button>
          </div>

          {/* Receipt Note */}
          <p className="text-gray-500 text-sm mt-8">
            A receipt has been sent to {userDetails?.email || "your email"}
          </p>
        </div>
      </div>
    </div>
  );
}