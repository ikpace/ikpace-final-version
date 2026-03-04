import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CodingBeginners() {
  const [openFaq, setOpenFaq] = useState(null);

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    green: "#008F4C",
    yellow: "#E6B800",
    darkGray: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF"
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Top Navigation Bar - with your links */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="font-bold text-lg sm:text-xl" style={{ color: colors.primary }}>
              iKPACE
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link to="/courses" className="text-sm sm:text-base hover:underline" style={{ color: colors.primary }}>
                Courses
              </Link>
              <Link to="/about" className="text-sm sm:text-base hover:underline" style={{ color: colors.primary }}>
                About
              </Link>
              <Link 
                to="/register" 
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white text-xs sm:text-sm font-medium hover:opacity-90 transition-opacity"
                style={{ background: colors.primary }}
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Header Section with breadcrumb */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16">
          {/* Breadcrumb with links */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
            <Link to="/" className="hover:underline" style={{ color: colors.primary }}>Home</Link>
            <span>/</span>
            <Link to="/courses" className="hover:underline" style={{ color: colors.primary }}>Courses</Link>
            <span>/</span>
            <span className="text-gray-700 font-medium">Coding for Beginners</span>
          </div>

          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ background: colors.green + '20', color: colors.green }}>
            🚀 ABSOLUTE BEGINNER FRIENDLY
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
            Coding for <span style={{ color: colors.secondary }}>Beginners</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 max-w-3xl mx-auto px-4">
            Start your coding journey today — no experience needed, completely free, and built for absolute beginners.
          </p>
          
          {/* Quick links to courses and register */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
            <Link 
              to="/courses" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Browse all courses <span>→</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/about" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              About iKPACE <span>→</span>
            </Link>
          </div>
          
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full mt-4" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 sm:gap-8 lg:gap-10">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  From Zero to Your First Code in Weeks
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-5 md:mb-6">
                  No prior experience? Perfect. We start from the very beginning and walk with you every step of the way.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-base">100%</p>
                    <p className="text-white/80 text-xs">Free forever</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-base">0</p>
                    <p className="text-white/80 text-xs">Experience needed</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-base">50,000+</p>
                    <p className="text-white/80 text-xs">Beginners started</p>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right mt-4 lg:mt-0">
                <Link
                  to="/register"
                  className="inline-block w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 shadow-xl"
                  style={{ background: colors.secondary, color: colors.white }}
                >
                  Register Free →
                </Link>
                <p className="text-white/80 mt-2 sm:mt-3 text-xs">No credit card required</p>
                {/* Link to courses */}
                <Link to="/courses" className="text-white/80 hover:text-white text-xs mt-1 inline-block underline">
                  View all courses
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Learn to Code */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6" style={{ color: colors.primary }}>
              Why Learn to Code in 2025?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              Coding is no longer just for computer scientists. It's for creators, problem-solvers, and anyone who wants to build the future.
            </p>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                  <span className="text-lg sm:text-xl md:text-2xl">💼</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">High-Demand Skills</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Tech jobs are growing 2x faster than other industries. <Link to="/courses" className="font-medium hover:underline" style={{ color: colors.primary }}>Explore courses →</Link></p>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                  <span className="text-lg sm:text-xl md:text-2xl">💰</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">Earning Potential</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Entry-level developers earn 40-60% more than average local salaries.</p>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                  <span className="text-lg sm:text-xl md:text-2xl">🌍</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">Work From Anywhere</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Remote work, freelance, or global opportunities — coding opens doors worldwide. <Link to="/about" className="font-medium hover:underline" style={{ color: colors.primary }}>Learn about us →</Link></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-6 lg:mt-0">
            <Link to="/courses" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.primary }}>$45k+</div>
              <p className="text-xs sm:text-sm text-gray-600">Avg entry-level salary</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.primary }}>View jobs →</span>
            </Link>
            <Link to="/courses" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.secondary }}>22%</div>
              <p className="text-xs sm:text-sm text-gray-600">Job growth by 2030</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.secondary }}>Learn more →</span>
            </Link>
            <Link to="/about" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.accent }}>1M+</div>
              <p className="text-xs sm:text-sm text-gray-600">Open tech jobs in Africa</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.accent }}>About iKPACE →</span>
            </Link>
            <Link to="/register" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.green }}>70%</div>
              <p className="text-xs sm:text-sm text-gray-600">Can be learned in 6 months</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.green }}>Register now →</span>
            </Link>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4" style={{ color: colors.primary }}>
              Your Learning Journey
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              8 modules designed to take you from absolute beginner to confident coder
            </p>
            {/* Link to all courses */}
            <Link to="/courses" className="inline-block mt-3 text-sm font-medium hover:underline" style={{ color: colors.primary }}>
              Browse all courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Module 1 */}
            <Link to="/courses/html" className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white" style={{ background: colors.primary }}>1</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">How Computers Work</h3>
              <p className="text-xs sm:text-sm text-gray-600">Understand the basics of computing, files, and the command line.</p>
            </Link>

            {/* Module 2 */}
            <Link to="/courses/css" className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white" style={{ background: colors.secondary }}>2</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">HTML & CSS</h3>
              <p className="text-xs sm:text-sm text-gray-600">Build your first web pages and style them like a pro.</p>
            </Link>

            {/* Module 3 */}
            <Link to="/courses/javascript" className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white" style={{ background: colors.accent }}>3</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">JavaScript Basics</h3>
              <p className="text-xs sm:text-sm text-gray-600">Make your websites interactive and dynamic.</p>
            </Link>

            {/* Module 4 */}
            <Link to="/courses/git" className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white" style={{ background: colors.green }}>4</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Version Control</h3>
              <p className="text-xs sm:text-sm text-gray-600">Learn Git and GitHub to collaborate and track your code.</p>
            </Link>
          </div>
          
          {/* View all courses link */}
          <div className="text-center mt-6">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              View All Modules
            </Link>
          </div>
        </div>

        {/* Program Features */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12" style={{ color: colors.primary }}>
            Everything You Get for Free
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
                <span className="text-lg sm:text-xl md:text-2xl">📹</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">100+ Video Lessons</h4>
                <p className="text-xs text-gray-600">Bite-sized videos that make complex topics easy.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '20' }}>
                <span className="text-lg sm:text-xl md:text-2xl">💻</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">50+ Coding Exercises</h4>
                <p className="text-xs text-gray-600">Practice what you learn with hands-on challenges.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.accent + '20' }}>
                <span className="text-lg sm:text-xl md:text-2xl">🏗️</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">5 Real Projects</h4>
                <p className="text-xs text-gray-600">Build a portfolio that shows what you can do.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
                <span className="text-lg sm:text-xl md:text-2xl">👥</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Community Support</h4>
                <p className="text-xs text-gray-600 mb-1">Join thousands of beginners learning together.</p>
                <Link to="/register" className="text-xs font-medium inline-block hover:underline" style={{ color: colors.primary }}>Register to join →</Link>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '20' }}>
                <span className="text-lg sm:text-xl md:text-2xl">🎓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Certificate of Completion</h4>
                <p className="text-xs text-gray-600">Showcase your achievement on LinkedIn and resumes.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl bg-white shadow-md">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.accent + '20' }}>
                <span className="text-lg sm:text-xl md:text-2xl">📱</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Mobile Friendly</h4>
                <p className="text-xs text-gray-600">Learn on your phone, anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path Comparison */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12" style={{ color: colors.primary }}>
            Choose Your Learning Style
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border-2" style={{ borderColor: colors.primary + '20' }}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.primary }}>Self-Paced</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Learn at your own speed, completely free</p>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> All video lessons
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Coding exercises
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Community forum
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Certificate
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-gray-400">
                  <span>✗</span> Live mentorship
                </li>
              </ul>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3" style={{ color: colors.green }}>Free</div>
                <Link
                  to="/register"
                  className="block w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all hover:bg-gray-100 text-center"
                  style={{ border: `2px solid ${colors.primary}`, color: colors.primary }}
                >
                  Register Free
                </Link>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl border-2 relative z-10" style={{ borderColor: colors.secondary }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
                MOST POPULAR
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.secondary }}>Guided Path</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Structured learning with mentor support</p>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Everything in Self-Paced
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Weekly live sessions
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> 1-on-1 mentorship
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Project reviews
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Career guidance
                </li>
              </ul>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>$49<span className="text-sm sm:text-base text-gray-500">/mo</span></div>
                <Link
                  to="/register"
                  className="block w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm text-white transition-all hover:scale-105 text-center"
                  style={{ background: colors.secondary }}
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border-2" style={{ borderColor: colors.accent + '20' }}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.accent }}>Bootcamp Prep</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Intensive preparation for coding bootcamps</p>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Everything in Guided
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Algorithm mastery
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Technical interviews
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Portfolio building
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Job placement support
                </li>
              </ul>
              <div className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3" style={{ color: colors.primary }}>$99<span className="text-sm sm:text-base text-gray-500">/mo</span></div>
                <Link
                  to="/register"
                  className="block w-full py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all hover:bg-gray-100 text-center"
                  style={{ border: `2px solid ${colors.accent}`, color: colors.accent }}
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
          
          {/* Link to about page */}
          <div className="text-center mt-6">
            <Link to="/about" className="text-sm font-medium hover:underline inline-flex items-center gap-1" style={{ color: colors.primary }}>
              Learn more about our learning paths <span>→</span>
            </Link>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: colors.lightGray }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10" style={{ color: colors.primary }}>
            From Beginner to Developer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white flex-shrink-0" style={{ background: colors.primary }}>
                  CE
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Chidi Eze</h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Frontend Developer</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic mb-2">"I had never written a line of code before. Six months later, I got my first developer job."</p>
              <p className="text-xs font-medium" style={{ color: colors.green }}>Now at: Terragon Group</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white flex-shrink-0" style={{ background: colors.secondary }}>
                  FA
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Funke Akinyemi</h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Software Engineer</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic mb-2">"The self-paced format meant I could learn during nap times. Now I work remotely for a US company."</p>
              <p className="text-xs font-medium" style={{ color: colors.green }}>Now at: Andela</p>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md lg:col-span-1 md:col-span-2 md:max-w-lg md:mx-auto lg:max-w-none">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white flex-shrink-0" style={{ background: colors.accent }}>
                  KO
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Kevin Omondi</h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic mb-2">"Dropped out of university thinking I wasn't smart enough. Now I build apps used by thousands."</p>
              <p className="text-xs font-medium" style={{ color: colors.green }}>Now at: Safaricom</p>
            </div>
          </div>
          
          {/* Link to register */}
          <div className="text-center mt-6">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              Start Your Success Story
            </Link>
          </div>
        </div>

        {/* Tools You'll Learn */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-5 sm:mb-6 md:mb-8 lg:mb-10" style={{ color: colors.primary }}>
            Technologies You'll Master
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 items-center">
            <Link to="/courses/html" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:scale-105 transition-all" style={{ color: colors.primary }}>HTML5</Link>
            <Link to="/courses/css" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:scale-105 transition-all" style={{ color: colors.primary }}>CSS3</Link>
            <Link to="/courses/javascript" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:scale-105 transition-all" style={{ color: colors.secondary }}>JavaScript</Link>
            <Link to="/courses/git" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:scale-105 transition-all" style={{ color: colors.accent }}>Git</Link>
            <Link to="/courses/github" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:scale-105 transition-all" style={{ color: colors.green }}>GitHub</Link>
            <Link to="/courses/vscode" className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-xs sm:text-sm md:text-base lg:text-lg font-bold hover:scale-105 transition-all" style={{ color: colors.blueShade }}>VS Code</Link>
          </div>
          <Link to="/courses" className="inline-block mt-4 text-sm font-medium hover:underline" style={{ color: colors.primary }}>
            Explore all technologies →
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10" style={{ color: colors.primary }}>
            Questions from Beginners
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {[
              {
                q: "I've never coded before. Is this really for me?",
                a: "Absolutely! That's exactly who this course is designed for. We start from 'what is code?' and build up step by step."
              },
              {
                q: "How long will it take to complete?",
                a: "At 3-5 hours per week, you can complete the core curriculum in 8-10 weeks. But you can go at your own pace — there's no deadline."
              },
              {
                q: "Do I need a powerful computer?",
                a: "Any computer made in the last 5 years will work fine. You can even use a tablet for the video lessons and theory parts."
              },
              {
                q: "Will I be job-ready after this course?",
                a: "This course builds your foundation. Most students continue to our advanced tracks or bootcamps, but you'll have a solid portfolio to start applying for internships."
              },
              {
                q: "Is it really free forever?",
                a: "Yes! The self-paced track is completely free, always. No credit card, no hidden fees, no time limits."
              },
              {
                q: "What if I get stuck?",
                a: "Our community forum is active 24/7. Thousands of beginners help each other, and mentors check in daily to answer questions."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base pr-4">{faq.q}</h3>
                  <span className="text-xl sm:text-2xl flex-shrink-0" style={{ color: colors.primary }}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="mt-2 sm:mt-3 pt-2 border-t border-gray-100">
                    <p className="text-xs sm:text-sm text-gray-600">{faq.a}</p>
                    {index === 3 && (
                      <Link to="/courses" className="text-xs font-medium mt-2 inline-block hover:underline" style={{ color: colors.primary }}>
                        Browse advanced courses →
                      </Link>
                    )}
                    {index === 5 && (
                      <Link to="/register" className="text-xs font-medium mt-2 inline-block hover:underline" style={{ color: colors.primary }}>
                        Register to join the community →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10" style={{ color: colors.primary }}>
            Your Journey After This Course
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <Link to="/courses/frontend" className="group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.primary }}>1</div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors">Frontend</h4>
              <p className="text-[10px] sm:text-xs text-gray-600">Build websites</p>
            </Link>
            <Link to="/courses/backend" className="group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.secondary }}>2</div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-orange-700 transition-colors">Backend</h4>
              <p className="text-[10px] sm:text-xs text-gray-600">Work with servers</p>
            </Link>
            <Link to="/courses/mobile" className="group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.accent }}>3</div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors">Mobile</h4>
              <p className="text-[10px] sm:text-xs text-gray-600">Build apps</p>
            </Link>
            <Link to="/courses/data-science" className="group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full flex items-center justify-center mx-auto mb-1.5 sm:mb-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.green }}>4</div>
              <h4 className="font-bold text-gray-900 text-xs sm:text-sm group-hover:text-green-700 transition-colors">Data</h4>
              <p className="text-[10px] sm:text-xs text-gray-600">Analyze data</p>
            </Link>
          </div>
          
          {/* Link to courses */}
          <div className="text-center mt-6">
            <Link to="/courses" className="text-sm font-medium hover:underline inline-flex items-center gap-1" style={{ color: colors.primary }}>
              View all career paths <span>→</span>
            </Link>
          </div>
        </div>

        {/* Final CTA with all links */}
        <div className="text-center p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Start Your Coding Journey Today
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto px-4">
            Join 50,000+ beginners who took their first step with us. No experience needed. No cost. Just your curiosity.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-4">
            <Link
              to="/register"
              className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 shadow-xl text-center"
              style={{ background: colors.secondary, color: colors.white }}
            >
              Register Free
            </Link>
            <Link
              to="/courses"
              className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              Browse Courses
            </Link>
            <Link
              to="/about"
              className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              About Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-4 sm:mt-5 md:mt-6 text-white/80 text-xs">
            <Link to="/courses" className="flex items-center gap-1 hover:text-white transition-colors">
              <span>📚</span> All Courses
            </Link>
            <Link to="/register" className="flex items-center gap-1 hover:text-white transition-colors">
              <span>✨</span> Register
            </Link>
            <Link to="/about" className="flex items-center gap-1 hover:text-white transition-colors">
              <span>ℹ️</span> About
            </Link>
            <Link to="/contact" className="flex items-center gap-1 hover:text-white transition-colors">
              <span>📧</span> Contact
            </Link>
          </div>
        </div>
      </div>

      {/* Footer with all links */}
      <footer className="bg-gray-900 text-white mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3 sm:mb-4">iKPACE</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 sm:mb-4">Learning</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/courses" className="hover:text-white transition-colors">All Courses</Link></li>
                <li><Link to="/coding-beginners" className="hover:text-white transition-colors">Coding for Beginners</Link></li>
                <li><Link to="/paths" className="hover:text-white transition-colors">Learning Paths</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 sm:mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/community" className="hover:text-white transition-colors">Alumni Network</Link></li>
                <li><Link to="/forum" className="hover:text-white transition-colors">Forum</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3 sm:mb-4">Get Started</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 iKPACE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}