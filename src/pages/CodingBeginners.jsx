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
      {/* Top Navigation Bar - REMOVED as requested */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12">
        {/* Header Section with breadcrumb */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12">
          {/* Breadcrumb with links */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4 flex-wrap">
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
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mt-4">
            <Link 
              to="/courses" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Browse all courses <span className="text-base sm:text-lg">→</span>
            </Link>
            <span className="text-gray-300 hidden xs:inline">|</span>
            <Link 
              to="/about" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              About iKPACE <span className="text-base sm:text-lg">→</span>
            </Link>
          </div>
          
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full mt-4" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
          <div className="relative p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
                  From Zero to Your First Code in Weeks
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-white/90 mb-3 sm:mb-4">
                  No prior experience? Perfect. We start from the very beginning and walk with you every step of the way.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm">100%</p>
                    <p className="text-white/80 text-[10px] sm:text-xs">Free forever</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm">0</p>
                    <p className="text-white/80 text-[10px] sm:text-xs">Experience needed</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm">50,000+</p>
                    <p className="text-white/80 text-[10px] sm:text-xs">Beginners started</p>
                  </div>
                </div>
              </div>
              <div className="text-center lg:text-right mt-4 lg:mt-0">
                <Link
                  to="/register"
                  className="inline-block w-full sm:w-auto px-5 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all hover:scale-105 shadow-xl"
                  style={{ background: colors.secondary, color: colors.white }}
                >
                  Register Free →
                </Link>
                <p className="text-white/80 mt-2 text-[10px] sm:text-xs">No credit card required</p>
                <Link to="/courses" className="text-white/80 hover:text-white text-[10px] sm:text-xs mt-1 inline-block underline">
                  View all courses
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Why Learn to Code */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ color: colors.primary }}>
              Why Learn to Code in 2025?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5 lg:mb-6">
              Coding is no longer just for computer scientists. It's for creators, problem-solvers, and anyone who wants to build the future.
            </p>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                  <span className="text-base sm:text-lg">💼</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">High-Demand Skills</h4>
                  <p className="text-xs text-gray-600">Tech jobs are growing 2x faster than other industries. <Link to="/courses" className="font-medium hover:underline" style={{ color: colors.primary }}>Explore courses →</Link></p>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                  <span className="text-base sm:text-lg">💰</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">Earning Potential</h4>
                  <p className="text-xs text-gray-600">Entry-level developers earn 40-60% more than average local salaries.</p>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                  <span className="text-base sm:text-lg">🌍</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">Work From Anywhere</h4>
                  <p className="text-xs text-gray-600">Remote work, freelance, or global opportunities — coding opens doors worldwide. <Link to="/about" className="font-medium hover:underline" style={{ color: colors.primary }}>Learn about us →</Link></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 lg:mt-0">
            <Link to="/courses" className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center hover:shadow-lg transition-all block" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5" style={{ color: colors.primary }}>$45k+</div>
              <p className="text-[10px] sm:text-xs text-gray-600">Avg entry-level salary</p>
              <span className="text-[10px] mt-1 inline-block hover:underline" style={{ color: colors.primary }}>View jobs →</span>
            </Link>
            <Link to="/courses" className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center hover:shadow-lg transition-all block" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5" style={{ color: colors.secondary }}>22%</div>
              <p className="text-[10px] sm:text-xs text-gray-600">Job growth by 2030</p>
              <span className="text-[10px] mt-1 inline-block hover:underline" style={{ color: colors.secondary }}>Learn more →</span>
            </Link>
            <Link to="/about" className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center hover:shadow-lg transition-all block" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5" style={{ color: colors.accent }}>1M+</div>
              <p className="text-[10px] sm:text-xs text-gray-600">Open tech jobs in Africa</p>
              <span className="text-[10px] mt-1 inline-block hover:underline" style={{ color: colors.accent }}>About iKPACE →</span>
            </Link>
            <Link to="/register" className="p-2 sm:p-3 md:p-4 rounded-lg sm:rounded-xl text-center hover:shadow-lg transition-all block" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
              <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-0.5" style={{ color: colors.green }}>70%</div>
              <p className="text-[10px] sm:text-xs text-gray-600">Can be learned in 6 months</p>
              <span className="text-[10px] mt-1 inline-block hover:underline" style={{ color: colors.green }}>Register now →</span>
            </Link>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.primary }}>
              Your Learning Journey
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              8 modules designed to take you from absolute beginner to confident coder
            </p>
            <Link to="/courses" className="inline-block mt-2 text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.primary }}>
              Browse all courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {/* Module 1 */}
            <Link to="/courses/html" className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl mb-1.5 sm:mb-2 flex items-center justify-center text-xs sm:text-sm md:text-base font-bold text-white" style={{ background: colors.primary }}>1</div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1">How Computers Work</h3>
              <p className="text-[10px] sm:text-xs text-gray-600">Understand the basics of computing, files, and the command line.</p>
            </Link>

            {/* Module 2 */}
            <Link to="/courses/css" className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl mb-1.5 sm:mb-2 flex items-center justify-center text-xs sm:text-sm md:text-base font-bold text-white" style={{ background: colors.secondary }}>2</div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1">HTML & CSS</h3>
              <p className="text-[10px] sm:text-xs text-gray-600">Build your first web pages and style them like a pro.</p>
            </Link>

            {/* Module 3 */}
            <Link to="/courses/javascript" className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl mb-1.5 sm:mb-2 flex items-center justify-center text-xs sm:text-sm md:text-base font-bold text-white" style={{ background: colors.accent }}>3</div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1">JavaScript Basics</h3>
              <p className="text-[10px] sm:text-xs text-gray-600">Make your websites interactive and dynamic.</p>
            </Link>

            {/* Module 4 */}
            <Link to="/courses/git" className="bg-white p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-all border border-gray-100 hover:scale-[1.02] block">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl mb-1.5 sm:mb-2 flex items-center justify-center text-xs sm:text-sm md:text-base font-bold text-white" style={{ background: colors.green }}>4</div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 mb-1">Version Control</h3>
              <p className="text-[10px] sm:text-xs text-gray-600">Learn Git and GitHub to collaborate and track your code.</p>
            </Link>
          </div>
          
          {/* View all courses link */}
          <div className="text-center mt-4 sm:mt-6">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-white font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              View All Modules
            </Link>
          </div>
        </div>

        {/* Program Features */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6 md:mb-8" style={{ color: colors.primary }}>
            Everything You Get for Free
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Feature 1 */}
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-md">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
                <span className="text-sm sm:text-base md:text-lg">📹</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">100+ Video Lessons</h4>
                <p className="text-[10px] sm:text-xs text-gray-600">Bite-sized videos that make complex topics easy.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-md">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '20' }}>
                <span className="text-sm sm:text-base md:text-lg">💻</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">50+ Coding Exercises</h4>
                <p className="text-[10px] sm:text-xs text-gray-600">Practice what you learn with hands-on challenges.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-md">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.accent + '20' }}>
                <span className="text-sm sm:text-base md:text-lg">🏗️</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">5 Real Projects</h4>
                <p className="text-[10px] sm:text-xs text-gray-600">Build a portfolio that shows what you can do.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-md">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
                <span className="text-sm sm:text-base md:text-lg">👥</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">Community Support</h4>
                <p className="text-[10px] sm:text-xs text-gray-600 mb-1">Join thousands of beginners learning together.</p>
                <Link to="/register" className="text-[10px] font-medium inline-block hover:underline" style={{ color: colors.primary }}>Register to join →</Link>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-md">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '20' }}>
                <span className="text-sm sm:text-base md:text-lg">🎓</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">Certificate of Completion</h4>
                <p className="text-[10px] sm:text-xs text-gray-600">Showcase your achievement on LinkedIn and resumes.</p>
              </div>
            </div>

            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white shadow-md">
              <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.accent + '20' }}>
                <span className="text-sm sm:text-base md:text-lg">📱</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-0.5">Mobile Friendly</h4>
                <p className="text-[10px] sm:text-xs text-gray-600">Learn on your phone, anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Path Comparison */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6 md:mb-8" style={{ color: colors.primary }}>
            Choose Your Learning Style
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-lg border-2" style={{ borderColor: colors.primary + '20' }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>Self-Paced</h3>
              <p className="text-xs text-gray-600 mb-3">Learn at your own speed, completely free</p>
              <ul className="space-y-1.5 mb-4 text-xs">
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> All video lessons
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Coding exercises
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Community forum
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Certificate
                </li>
                <li className="flex items-center gap-1.5 text-gray-400">
                  <span>✗</span> Live mentorship
                </li>
              </ul>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.green }}>Free</div>
                <Link
                  to="/register"
                  className="block w-full py-2 rounded-lg font-bold text-xs transition-all hover:bg-gray-100 text-center"
                  style={{ border: `2px solid ${colors.primary}`, color: colors.primary }}
                >
                  Register Free
                </Link>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-xl border-2 relative z-10" style={{ borderColor: colors.secondary }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
                MOST POPULAR
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2" style={{ color: colors.secondary }}>Guided Path</h3>
              <p className="text-xs text-gray-600 mb-3">Structured learning with mentor support</p>
              <ul className="space-y-1.5 mb-4 text-xs">
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Everything in Self-Paced
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Weekly live sessions
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> 1-on-1 mentorship
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Project reviews
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Career guidance
                </li>
              </ul>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.primary }}>$49<span className="text-xs text-gray-500">/mo</span></div>
                <Link
                  to="/register"
                  className="block w-full py-2 rounded-lg font-bold text-xs text-white transition-all hover:scale-105 text-center"
                  style={{ background: colors.secondary }}
                >
                  Get Started
                </Link>
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-lg border-2" style={{ borderColor: colors.accent + '20' }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2" style={{ color: colors.accent }}>Bootcamp Prep</h3>
              <p className="text-xs text-gray-600 mb-3">Intensive preparation for coding bootcamps</p>
              <ul className="space-y-1.5 mb-4 text-xs">
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Everything in Guided
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Algorithm mastery
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Technical interviews
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Portfolio building
                </li>
                <li className="flex items-center gap-1.5">
                  <span style={{ color: colors.green }}>✓</span> Job placement support
                </li>
              </ul>
              <div className="text-center">
                <div className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.primary }}>$99<span className="text-xs text-gray-500">/mo</span></div>
                <Link
                  to="/register"
                  className="block w-full py-2 rounded-lg font-bold text-xs transition-all hover:bg-gray-100 text-center"
                  style={{ border: `2px solid ${colors.accent}`, color: colors.accent }}
                >
                  Register Now
                </Link>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/about" className="text-xs sm:text-sm font-medium hover:underline inline-flex items-center gap-1" style={{ color: colors.primary }}>
              Learn more about our learning paths <span>→</span>
            </Link>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: colors.lightGray }}>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>
            From Beginner to Developer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0" style={{ background: colors.primary }}>
                  CE
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">Chidi Eze</h4>
                  <p className="text-[10px] sm:text-xs text-gray-600 truncate">Frontend Developer</p>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 italic mb-1">"I had never written a line of code before. Six months later, I got my first developer job."</p>
              <p className="text-[10px] font-medium" style={{ color: colors.green }}>Now at: Terragon Group</p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0" style={{ background: colors.secondary }}>
                  FA
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">Funke Akinyemi</h4>
                  <p className="text-[10px] sm:text-xs text-gray-600 truncate">Software Engineer</p>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 italic mb-1">"The self-paced format meant I could learn during nap times. Now I work remotely for a US company."</p>
              <p className="text-[10px] font-medium" style={{ color: colors.green }}>Now at: Andela</p>
            </div>

            <div className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md lg:col-span-1 md:col-span-2 md:max-w-lg md:mx-auto lg:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-white flex-shrink-0" style={{ background: colors.accent }}>
                  KO
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">Kevin Omondi</h4>
                  <p className="text-[10px] sm:text-xs text-gray-600 truncate">Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-600 italic mb-1">"Dropped out of university thinking I wasn't smart enough. Now I build apps used by thousands."</p>
              <p className="text-[10px] font-medium" style={{ color: colors.green }}>Now at: Safaricom</p>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link 
              to="/register" 
              className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-white font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              Start Your Success Story
            </Link>
          </div>
        </div>

        {/* Tools You'll Learn */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>
            Technologies You'll Master
          </h2>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 items-center">
            <Link to="/courses/html" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold hover:scale-105 transition-all" style={{ color: colors.primary }}>HTML5</Link>
            <Link to="/courses/css" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold hover:scale-105 transition-all" style={{ color: colors.primary }}>CSS3</Link>
            <Link to="/courses/javascript" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold hover:scale-105 transition-all" style={{ color: colors.secondary }}>JavaScript</Link>
            <Link to="/courses/git" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold hover:scale-105 transition-all" style={{ color: colors.accent }}>Git</Link>
            <Link to="/courses/github" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold hover:scale-105 transition-all" style={{ color: colors.green }}>GitHub</Link>
            <Link to="/courses/vscode" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-white shadow-md flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-bold hover:scale-105 transition-all" style={{ color: colors.blueShade }}>VS Code</Link>
          </div>
          <Link to="/courses" className="inline-block mt-3 text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.primary }}>
            Explore all technologies →
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16 max-w-4xl mx-auto px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>
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
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm pr-4">{faq.q}</h3>
                  <span className="text-lg sm:text-xl flex-shrink-0" style={{ color: colors.primary }}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-[10px] sm:text-xs text-gray-600">{faq.a}</p>
                    {index === 3 && (
                      <Link to="/courses" className="text-[10px] font-medium mt-1 inline-block hover:underline" style={{ color: colors.primary }}>
                        Browse advanced courses →
                      </Link>
                    )}
                    {index === 5 && (
                      <Link to="/register" className="text-[10px] font-medium mt-1 inline-block hover:underline" style={{ color: colors.primary }}>
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
        <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>
            Your Journey After This Course
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
            <Link to="/courses/frontend" className="group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-1 text-xs sm:text-sm md:text-base font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.primary }}>1</div>
              <h4 className="font-bold text-gray-900 text-[10px] sm:text-xs group-hover:text-blue-700 transition-colors">Frontend</h4>
              <p className="text-[8px] sm:text-[10px] text-gray-600">Build websites</p>
            </Link>
            <Link to="/courses/backend" className="group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-1 text-xs sm:text-sm md:text-base font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.secondary }}>2</div>
              <h4 className="font-bold text-gray-900 text-[10px] sm:text-xs group-hover:text-orange-700 transition-colors">Backend</h4>
              <p className="text-[8px] sm:text-[10px] text-gray-600">Work with servers</p>
            </Link>
            <Link to="/courses/mobile" className="group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-1 text-xs sm:text-sm md:text-base font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.accent }}>3</div>
              <h4 className="font-bold text-gray-900 text-[10px] sm:text-xs group-hover:text-blue-700 transition-colors">Mobile</h4>
              <p className="text-[8px] sm:text-[10px] text-gray-600">Build apps</p>
            </Link>
            <Link to="/courses/data-science" className="group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mx-auto mb-1 text-xs sm:text-sm md:text-base font-bold text-white group-hover:scale-110 transition-all" style={{ background: colors.green }}>4</div>
              <h4 className="font-bold text-gray-900 text-[10px] sm:text-xs group-hover:text-green-700 transition-colors">Data</h4>
              <p className="text-[8px] sm:text-[10px] text-gray-600">Analyze data</p>
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/courses" className="text-xs sm:text-sm font-medium hover:underline inline-flex items-center gap-1" style={{ color: colors.primary }}>
              View all career paths <span>→</span>
            </Link>
          </div>
        </div>

        {/* Final CTA with all links */}
        <div className="text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
            Start Your Coding Journey Today
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mb-3 max-w-2xl mx-auto px-4">
            Join 50,000+ beginners who took their first step with us. No experience needed. No cost. Just your curiosity.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center px-4">
            <Link
              to="/register"
              className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-xl text-center"
              style={{ background: colors.secondary, color: colors.white }}
            >
              Register Free
            </Link>
            <Link
              to="/courses"
              className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              Browse Courses
            </Link>
            <Link
              to="/about"
              className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              About Us
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-3 text-white/80 text-[10px] sm:text-xs">
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

    </div>
  );
}