import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ReturnToWork() {
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
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Link to="/" className="font-bold text-lg sm:text-xl" style={{ color: colors.primary }}>
              iKPACE
            </Link>
            <div className="flex items-center gap-3 sm:gap-6">
              <Link to="/courses" className="text-sm sm:text-base hover:underline hidden sm:block" style={{ color: colors.primary }}>
                Courses
              </Link>
              <Link to="/about" className="text-sm sm:text-base hover:underline hidden sm:block" style={{ color: colors.primary }}>
                About
              </Link>
              <Link to="/about/success-stories" className="text-sm sm:text-base hover:underline hidden sm:block" style={{ color: colors.primary }}>
                Success Stories
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

      {/* Mobile Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto pb-2">
          <Link to="/" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Home</Link>
          <span>/</span>
          <Link to="/about" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>About</Link>
          <span>/</span>
          <Link to="/about/success-stories" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Success Stories</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium whitespace-nowrap">Return to Work</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
            🎯 CAREER RETURN PROGRAM
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
            Your Career Break Is <span style={{ color: colors.secondary }}>Not a Gap</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 mb-4 max-w-3xl mx-auto px-4">
            For professionals returning after career breaks — refresh your skills, rebuild confidence, and relaunch your career with iKPACE.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-4">
            <Link 
              to="/courses" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Browse Courses <span>→</span>
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link 
              to="/about" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              About iKPACE <span>→</span>
            </Link>
            <span className="text-gray-300 hidden sm:inline">|</span>
            <Link 
              to="/about/success-stories" 
              className="text-sm sm:text-base font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Success Stories <span>→</span>
            </Link>
          </div>
          
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full mt-4" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
            <div className="absolute inset-0 opacity-10" style={{ background: 'url("/api/placeholder/1200/400") center/cover' }}></div>
          </div>
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
                  Your Experience + Updated Skills = Unstoppable
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-5 md:mb-6">
                  Whether you took time off for family, education, or personal growth — we're here to help you come back stronger.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-base">85%</p>
                    <p className="text-white/80 text-xs">Success rate</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-base">3-6 months</p>
                    <p className="text-white/80 text-xs">Duration</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 md:px-4 py-1.5 sm:py-2">
                    <p className="text-white font-bold text-xs sm:text-sm md:text-base">500+</p>
                    <p className="text-white/80 text-xs">Placed</p>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 md:mt-0">
                <Link
                  to="/register"
                  className="inline-block w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 shadow-xl"
                  style={{ background: colors.secondary, color: colors.white }}
                >
                  Start Your Return →
                </Link>
                <p className="text-white/80 mt-2 sm:mt-3 text-xs">Free career consultation available</p>
                <Link to="/contact" className="text-white/80 hover:text-white text-xs mt-1 inline-block underline">
                  Talk to an advisor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Highlight - NEW SECTION */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <Link to="/about/success-stories" className="block group">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-100 hover:border-purple-300 transition-all">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 group-hover:text-purple-700 transition-colors">
                      Read Success Stories
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">See how professionals like you returned stronger</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-purple-600 font-medium">
                  <span className="text-sm sm:text-base">View all stories</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Understanding the Challenge */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6" style={{ color: colors.primary }}>
              We Understand the Challenge
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-5 md:mb-8">
              Returning to work after a career break shouldn't feel like starting over. Your experience matters. Your skills matter. You matter.
            </p>
            
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                  <span className="text-lg sm:text-xl md:text-2xl">🤔</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">The Confidence Gap</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Many professionals worry their skills are outdated. We'll help you update and validate what you know.</p>
                  <Link to="/about/success-stories?topic=confidence" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: colors.primary }}>
                    Read success stories →
                  </Link>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                  <span className="text-lg sm:text-xl md:text-2xl">🔄</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">The Skills Refresh</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Technology evolves fast. We'll bring you up to speed with the latest tools and practices. <Link to="/courses" className="font-medium hover:underline" style={{ color: colors.primary }}>View courses →</Link></p>
                </div>
              </div>
              
              <div className="flex gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                  <span className="text-lg sm:text-xl md:text-2xl">🤝</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base mb-0.5 sm:mb-1">The Network Rebuild</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Reconnect with industry professionals and build new relationships that open doors. <Link to="/community" className="font-medium hover:underline" style={{ color: colors.primary }}>Join community →</Link></p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mt-6 lg:mt-0">
            <Link to="/research" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.primary }}>62%</div>
              <p className="text-xs sm:text-sm text-gray-600">of women face career breaks</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.primary }}>Learn more →</span>
            </Link>
            <Link to="/about/success-stories" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.secondary }}>2-5 yrs</div>
              <p className="text-xs sm:text-sm text-gray-600">average break duration</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.secondary }}>Read stories →</span>
            </Link>
            <Link to="/about/success-stories" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.accent }}>73%</div>
              <p className="text-xs sm:text-sm text-gray-600">want same industry</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.accent }}>View paths →</span>
            </Link>
            <Link to="/about/success-stories" className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg sm:rounded-xl md:rounded-2xl text-center hover:shadow-lg transition-all block" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
              <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-0.5 sm:mb-1" style={{ color: colors.green }}>40%</div>
              <p className="text-xs sm:text-sm text-gray-600">higher retention</p>
              <span className="text-xs mt-1 inline-block hover:underline" style={{ color: colors.green }}>About us →</span>
            </Link>
          </div>
        </div>

        {/* Program Features */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4" style={{ color: colors.primary }}>
              How We Support Your Return
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              A comprehensive program designed specifically for professionals returning to work
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              <Link to="/programs" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
                View all programs →
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/about/success-stories" className="text-sm font-medium hover:underline" style={{ color: colors.primary }}>
                Read success stories →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {/* Feature 1 */}
            <Link to="/courses/tech" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
                <span className="text-xl sm:text-2xl">📚</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Skills Refresh</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Update your technical and professional skills to match current industry standards.</p>
              <ul className="space-y-1 sm:space-y-2">
                <li className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Latest tools & technologies
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Industry best practices
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Hands-on projects
                </li>
              </ul>
            </Link>

            {/* Feature 2 */}
            <Link to="/coaching" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
                <span className="text-xl sm:text-2xl">🎯</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Confidence Building</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Overcome imposter syndrome and rebuild your professional confidence.</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> 1-on-1 coaching sessions
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Peer support groups
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Mindset workshops
                </li>
              </ul>
            </Link>

            {/* Feature 3 */}
            <Link to="/career-services" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center" style={{ background: colors.green + '10' }}>
                <span className="text-xl sm:text-2xl">📝</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Resume & LinkedIn</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Learn to frame your career break as an asset, not a gap.</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Resume makeover
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> LinkedIn optimization
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Portfolio development
                </li>
              </ul>
            </Link>

            {/* Feature 4 */}
            <Link to="/community" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
                <span className="text-xl sm:text-2xl">🤝</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Networking Opportunities</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Reconnect with your industry and build new professional relationships.</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Industry events
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Alumni connections
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Mentor matching
                </li>
              </ul>
            </Link>

            {/* Feature 5 */}
            <Link to="/interview-prep" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
                <span className="text-xl sm:text-2xl">💼</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Interview Preparation</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Practice and prepare to confidently answer questions about your career break.</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Mock interviews
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Common questions
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Salary negotiation
                </li>
              </ul>
            </Link>

            {/* Feature 6 */}
            <Link to="/job-placement" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 block">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl mb-3 sm:mb-4 md:mb-6 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
                <span className="text-xl sm:text-2xl">🏢</span>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Job Placement Support</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Connect with employers who value experienced professionals.</p>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Partner companies
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Job matching
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Application support
                </li>
              </ul>
            </Link>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              to="/programs" 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              Explore All Features
            </Link>
          </div>
        </div>

        {/* Program Tracks */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12" style={{ color: colors.primary }}>
            Choose Your Path
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            <Link to="/track/tech" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border-t-4 hover:scale-[1.02] transition-all block" style={{ borderTopColor: colors.primary }}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.primary }}>Tech Track</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">For professionals returning to technology roles</p>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Full-stack development
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Cloud computing
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Data analysis
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Cybersecurity basics
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Agile methodologies
                </li>
              </ul>
              <p className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>12 weeks</p>
              <div className="mt-3">
                <span className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>See success stories →</span>
              </div>
            </Link>

            <Link to="/track/business" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border-t-4 hover:scale-[1.02] transition-all relative z-10 block" style={{ borderTopColor: colors.secondary }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
                MOST POPULAR
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.secondary }}>Business Track</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">For operations, management, and administration</p>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Project management
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Digital transformation
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Business analytics
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Leadership skills
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Change management
                </li>
              </ul>
              <p className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>10 weeks</p>
              <div className="mt-3">
                <span className="text-xs font-medium hover:underline" style={{ color: colors.secondary }}>Read business stories →</span>
              </div>
            </Link>

            <Link to="/track/creative" className="bg-white p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl border-t-4 hover:scale-[1.02] transition-all block" style={{ borderTopColor: colors.accent }}>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.accent }}>Creative Track</h3>
              <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">For design, marketing, and creative roles</p>
              <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> UX/UI design
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Digital marketing
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Content strategy
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Brand management
                </li>
                <li className="flex items-center gap-1.5 sm:gap-2">
                  <span style={{ color: colors.green }}>✓</span> Social media
                </li>
              </ul>
              <p className="text-lg sm:text-xl md:text-2xl font-bold" style={{ color: colors.primary }}>8 weeks</p>
              <div className="mt-3">
                <span className="text-xs font-medium hover:underline" style={{ color: colors.accent }}>See creative stories →</span>
              </div>
            </Link>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/track/compare" className="text-sm font-medium hover:underline inline-flex items-center gap-1" style={{ color: colors.primary }}>
              Compare all tracks <span>→</span>
            </Link>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: colors.lightGray }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 sm:mb-6 md:mb-8 lg:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900" style={{ color: colors.primary }}>
              Professionals Who Returned Stronger
            </h2>
            <Link to="/about/success-stories" className="text-sm font-medium hover:underline mt-2 sm:mt-0" style={{ color: colors.primary }}>
              View all stories →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-8">
            <Link to="/about/success-stories/mercy-akinwale" className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all block">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 md:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-white flex-shrink-0" style={{ background: colors.primary }}>
                  MA
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Mercy Akinwale</h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Product Manager at Paystack</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic mb-2">"After 4 years as a stay-at-home mom, I thought my career was over. iKPACE showed me my experience still mattered. Today, I lead product teams."</p>
              <p className="text-xs font-medium" style={{ color: colors.green }}>Returned after 4-year break</p>
              <div className="mt-2 text-xs hover:underline" style={{ color: colors.primary }}>Read full story →</div>
            </Link>

            <Link to="/about/success-stories/tunde-okafor" className="bg-white p-4 sm:p-5 md:p-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-all block">
              <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3 md:mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-white flex-shrink-0" style={{ background: colors.secondary }}>
                  TO
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Tunde Okafor</h4>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">Senior Developer at Andela</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 italic mb-2">"Took 2 years off to care for my parents. The skills refresh program brought me up to speed with modern frameworks in just 12 weeks."</p>
              <p className="text-xs font-medium" style={{ color: colors.green }}>Returned after 2-year break</p>
              <div className="mt-2 text-xs hover:underline" style={{ color: colors.secondary }}>Read full story →</div>
            </Link>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              to="/about/success-stories" 
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-white font-medium text-sm sm:text-base hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              Read More Success Stories
            </Link>
          </div>
        </div>

        {/* Employer Partners */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8" style={{ color: colors.primary }}>
            Companies Hiring Our Graduates
          </h2>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 items-center opacity-60">
            <Link to="/employers/google" className="text-base sm:text-lg md:text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Google</Link>
            <Link to="/employers/microsoft" className="text-base sm:text-lg md:text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Microsoft</Link>
            <Link to="/employers/andela" className="text-base sm:text-lg md:text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Andela</Link>
            <Link to="/employers/paystack" className="text-base sm:text-lg md:text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Paystack</Link>
            <Link to="/employers/flutterwave" className="text-base sm:text-lg md:text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Flutterwave</Link>
            <Link to="/employers/interswitch" className="text-base sm:text-lg md:text-xl font-bold text-gray-400 hover:text-gray-600 transition-colors">Interswitch</Link>
          </div>
          <Link to="/employers" className="inline-block mt-4 text-sm font-medium hover:underline" style={{ color: colors.primary }}>
            View all partner companies →
          </Link>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 lg:mb-20 max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-5 sm:mb-6 md:mb-8 lg:mb-10" style={{ color: colors.primary }}>
            Common Questions
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {[
              {
                q: "How do I explain my career break to employers?",
                a: "We'll teach you how to frame your break positively and focus on the valuable skills you gained during that time."
              },
              {
                q: "Is the program flexible with my schedule?",
                a: "Yes! All sessions are recorded, and you can learn at your own pace. Perfect for those balancing family responsibilities."
              },
              {
                q: "Do I need to pay upfront?",
                a: "We offer income share agreements and payment plans. You only pay when you're employed."
              },
              {
                q: "What if my skills are completely outdated?",
                a: "That's exactly why we're here! We start from the basics and build up to current industry standards."
              },
              {
                q: "How long until I'm job-ready?",
                a: "Most professionals are ready for interviews within 3-6 months, depending on your track and pace."
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
                      <Link to="/about/success-stories" className="text-xs font-medium mt-2 inline-block hover:underline" style={{ color: colors.primary }}>
                        See how others refreshed their skills →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link to="/faq" className="text-sm font-medium hover:underline inline-flex items-center gap-1" style={{ color: colors.primary }}>
              View all FAQs <span>→</span>
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-4 sm:p-5 md:p-6 lg:p-8 xl:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 md:mb-4">
            Ready to Return Stronger?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-5 md:mb-6 lg:mb-10 max-w-2xl mx-auto px-4">
            Your career break prepared you for this moment. Let's take the next step together.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 justify-center px-4">
            <Link
              to="/register"
              className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 shadow-xl text-center"
              style={{ background: colors.secondary, color: colors.white }}
            >
              Start Your Application
            </Link>
            <Link
              to="/contact"
              className="px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-2.5 md:py-3 lg:py-4 xl:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              Talk to an Advisor
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-8 mt-4 sm:mt-5 md:mt-6 lg:mt-10 text-white/80 text-xs sm:text-sm">
            <Link to="/cohorts" className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors">
              <span>📅</span> Next cohort: April 15
            </Link>
            <Link to="/programs/limited" className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors">
              <span>👥</span> Limited to 30 participants
            </Link>
            <Link to="/scholarships" className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors">
              <span>💰</span> Scholarships available
            </Link>
          </div>
          <div className="mt-4">
            <Link to="/about/success-stories" className="text-white/80 hover:text-white text-sm underline">
              Read success stories from our graduates →
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-8 sm:mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">iKPACE</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Programs</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link to="/courses" className="hover:text-white transition-colors">All Programs</Link></li>
                <li><Link to="/return-to-work" className="hover:text-white transition-colors">Return to Work</Link></li>
                <li><Link to="/coding-beginners" className="hover:text-white transition-colors">Coding for Beginners</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Community</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link to="/alumni" className="hover:text-white transition-colors">Alumni Network</Link></li>
                <li><Link to="/about/success-stories" className="hover:text-white transition-colors">Success Stories</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4">Get Started</h3>
              <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; 2024 iKPACE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}