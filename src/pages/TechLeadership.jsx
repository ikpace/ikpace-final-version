import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function TechLeadership() {
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
      {/* Breadcrumb - Mobile Friendly */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto pb-2 scrollbar-hide">
          <Link to="/" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Home</Link>
          <span>/</span>
          <Link to="/courses" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Courses</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium whitespace-nowrap">Tech Leadership</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-2 sm:mb-3" style={{ background: colors.primary + '10', color: colors.primary }}>
            👑 WOMEN IN TECH LEADERSHIP
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            Lead the <span style={{ color: colors.secondary }}>Future of Tech</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-3 max-w-3xl mx-auto px-4">
            Executive skills development program designed for women ready to step into C-suite, director, and senior leadership roles in technology.
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-3">
            <Link 
              to="/courses" 
              className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Browse All Courses <span>→</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/about/success-stories" 
              className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Success Stories <span>→</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/register" 
              className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Register <span>→</span>
            </Link>
          </div>
          
          <div className="w-16 sm:w-20 h-1 mx-auto rounded-full mt-3" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
          <div className="relative p-4 sm:p-5 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 sm:gap-5 md:gap-6">
              <div className="flex-1">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                  The World Needs Women Leading Tech
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-white/90 mb-3">
                  Only 28% of leadership roles in tech are held by women. We're changing that, one leader at a time.
                </p>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                    <p className="text-white font-bold text-xs sm:text-sm">28%</p>
                    <p className="text-white/80 text-[10px] sm:text-xs">Women in leadership</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                    <p className="text-white font-bold text-xs sm:text-sm">87%</p>
                    <p className="text-white/80 text-[10px] sm:text-xs">Get promoted</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1 sm:py-1.5">
                    <p className="text-white font-bold text-xs sm:text-sm">3x</p>
                    <p className="text-white/80 text-[10px] sm:text-xs">More likely to lead</p>
                  </div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link
                  to="/register"
                  className="inline-block w-full sm:w-auto px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all hover:scale-105 shadow-lg"
                  style={{ background: colors.secondary, color: colors.white }}
                >
                  Apply Now →
                </Link>
                <p className="text-white/80 mt-1 text-[10px] sm:text-xs">Next cohort: May 2025</p>
                <Link to="/contact" className="text-white/80 hover:text-white text-[10px] sm:text-xs mt-1 inline-block underline">
                  Contact advisor
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Success Stories Highlight */}
        <Link to="/about/success-stories" className="block mb-6 sm:mb-8 md:mb-10">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border-2 border-purple-100 hover:border-purple-300 transition-all">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg sm:text-xl">👑</span>
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-gray-900">See Women Who Advanced</h3>
                  <p className="text-xs text-gray-600">Read success stories from our graduates</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-purple-600 font-medium text-xs sm:text-sm">
                <span>View all stories</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </Link>

        {/* The Leadership Gap */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6 items-center mb-6 sm:mb-8 md:mb-10">
          <div>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-3" style={{ color: colors.primary }}>
              The Leadership Gap in Tech
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4">
              Women leave tech leadership at twice the rate of men. The problem isn't capability — it's lack of sponsorship, mentorship, and leadership development designed for women.
            </p>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '10' }}>
                  <span className="text-sm sm:text-base">📊</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">The Drop-off</h4>
                  <p className="text-xs text-gray-600">Women represent 47% of entry-level tech roles but only 28% of executive positions.</p>
                  <Link to="/research" className="text-xs font-medium mt-1 inline-block hover:underline" style={{ color: colors.primary }}>
                    Read research →
                  </Link>
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: colors.secondary + '10' }}>
                  <span className="text-sm sm:text-base">🧠</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">The Confidence Factor</h4>
                  <p className="text-xs text-gray-600">Women often wait until they meet 100% of qualifications before applying for leadership roles.</p>
                </div>
              </div>
              
              <div className="flex gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '10' }}>
                  <span className="text-sm sm:text-base">🌟</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm">The Business Case</h4>
                  <p className="text-xs text-gray-600">Companies with women in leadership are 48% more profitable and 30% more innovative.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 lg:mt-0">
            <Link to="/research" className="p-2 sm:p-3 rounded-lg text-center hover:shadow-md transition-all block" style={{ background: colors.primary + '05', border: `1px solid ${colors.primary}20` }}>
              <div className="text-base sm:text-lg md:text-xl font-bold" style={{ color: colors.primary }}>47%</div>
              <p className="text-xs text-gray-600">Entry-level</p>
            </Link>
            <Link to="/research" className="p-2 sm:p-3 rounded-lg text-center hover:shadow-md transition-all block" style={{ background: colors.secondary + '05', border: `1px solid ${colors.secondary}20` }}>
              <div className="text-base sm:text-lg md:text-xl font-bold" style={{ color: colors.secondary }}>28%</div>
              <p className="text-xs text-gray-600">Executive</p>
            </Link>
            <Link to="/about/success-stories" className="p-2 sm:p-3 rounded-lg text-center hover:shadow-md transition-all block" style={{ background: colors.accent + '05', border: `1px solid ${colors.accent}20` }}>
              <div className="text-base sm:text-lg md:text-xl font-bold" style={{ color: colors.accent }}>48%</div>
              <p className="text-xs text-gray-600">More profit</p>
            </Link>
            <Link to="/about/success-stories" className="p-2 sm:p-3 rounded-lg text-center hover:shadow-md transition-all block" style={{ background: colors.green + '05', border: `1px solid ${colors.green}20` }}>
              <div className="text-base sm:text-lg md:text-xl font-bold" style={{ color: colors.green }}>2x</div>
              <p className="text-xs text-gray-600">Attrition</p>
            </Link>
          </div>
        </div>

        {/* Program Features */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="text-center mb-4 sm:mb-5">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2" style={{ color: colors.primary }}>
              What You'll Master
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
              A 6-month intensive program covering every aspect of tech leadership
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Link to="/curriculum" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
                View curriculum →
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Feature 1 */}
            <Link to="/courses/strategic-leadership" className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2 flex items-center justify-center" style={{ background: colors.primary + '10' }}>
                <span className="text-base sm:text-lg">🎯</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Strategic Leadership</h3>
              <p className="text-xs text-gray-600 mb-2">Develop vision, set direction, and align teams.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Strategic planning
                </li>
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Decision-making
                </li>
              </ul>
            </Link>

            {/* Feature 2 */}
            <Link to="/courses/team-building" className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2 flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
                <span className="text-base sm:text-lg">👥</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Team Building</h3>
              <p className="text-xs text-gray-600 mb-2">Build and retain high-performing teams.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Hiring & interviewing
                </li>
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Performance management
                </li>
              </ul>
            </Link>

            {/* Feature 3 */}
            <Link to="/courses/financial-acumen" className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2 flex items-center justify-center" style={{ background: colors.green + '10' }}>
                <span className="text-base sm:text-lg">💰</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Financial Acumen</h3>
              <p className="text-xs text-gray-600 mb-2">Understand budgets, P&L, and ROI.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Budgeting
                </li>
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> ROI analysis
                </li>
              </ul>
            </Link>

            {/* Feature 4 */}
            <Link to="/courses/executive-communication" className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2 flex items-center justify-center" style={{ background: colors.accent + '10' }}>
                <span className="text-base sm:text-lg">🗣️</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Executive Communication</h3>
              <p className="text-xs text-gray-600 mb-2">Present to boards and influence stakeholders.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Board presentations
                </li>
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Negotiation
                </li>
              </ul>
            </Link>

            {/* Feature 5 */}
            <Link to="/courses/change-management" className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2 flex items-center justify-center" style={{ background: colors.yellow + '10' }}>
                <span className="text-base sm:text-lg">🔄</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Change Management</h3>
              <p className="text-xs text-gray-600 mb-2">Lead transformation and drive innovation.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Digital transformation
                </li>
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Culture change
                </li>
              </ul>
            </Link>

            {/* Feature 6 */}
            <Link to="/courses/executive-presence" className="bg-white p-3 sm:p-4 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100 block">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg mb-2 flex items-center justify-center" style={{ background: colors.orangeShade + '10' }}>
                <span className="text-base sm:text-lg">🤝</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">Executive Presence</h3>
              <p className="text-xs text-gray-600 mb-2">Build personal brand and influence.</p>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Personal branding
                </li>
                <li className="flex items-center gap-1 text-xs text-gray-600">
                  <span style={{ color: colors.green }}>✓</span> Board networking
                </li>
              </ul>
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-white font-medium text-xs sm:text-sm hover:opacity-90 transition-opacity"
              style={{ background: colors.primary }}
            >
              View All Courses
            </Link>
          </div>
        </div>

        {/* Program Structure */}
        <div className="mb-6 sm:mb-8 md:mb-10 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl" style={{ background: colors.lightGray }}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4" style={{ color: colors.primary }}>
            Program Structure
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4">
            <div className="text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mx-auto mb-1 text-sm sm:text-base font-bold text-white" style={{ background: colors.primary }}>6</div>
              <h4 className="font-bold text-gray-900 text-xs">Months</h4>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mx-auto mb-1 text-sm sm:text-base font-bold text-white" style={{ background: colors.secondary }}>2x</div>
              <h4 className="font-bold text-gray-900 text-xs">Monthly</h4>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mx-auto mb-1 text-sm sm:text-base font-bold text-white" style={{ background: colors.accent }}>1:1</div>
              <h4 className="font-bold text-gray-900 text-xs">Coaching</h4>
            </div>
            <div className="text-center">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center mx-auto mb-1 text-sm sm:text-base font-bold text-white" style={{ background: colors.green }}>∞</div>
              <h4 className="font-bold text-gray-900 text-xs">Alumni</h4>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-lg p-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>Curriculum</h3>
              <div className="space-y-1">
                <Link to="/curriculum/month1" className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>1</span>
                  <span>Month 1: Leadership Foundation</span>
                </Link>
                <Link to="/curriculum/month2" className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>2</span>
                  <span>Month 2: Strategic Thinking</span>
                </Link>
                <Link to="/curriculum/month3" className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>3</span>
                  <span>Month 3: Building Teams</span>
                </Link>
                <Link to="/curriculum/month4" className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>4</span>
                  <span>Month 4: Financial Leadership</span>
                </Link>
                <Link to="/curriculum/month5" className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>5</span>
                  <span>Month 5: Innovation & Change</span>
                </Link>
                <Link to="/curriculum/month6" className="flex items-center gap-2 text-xs hover:bg-gray-50 p-1 rounded">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>6</span>
                  <span>Month 6: Executive Presence</span>
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-lg p-3">
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2" style={{ color: colors.secondary }}>What's Included</h3>
              <ul className="space-y-1">
                <li className="flex items-center gap-1 text-xs">
                  <span style={{ color: colors.green }}>✓</span> 12 workshops with leaders
                </li>
                <li className="flex items-center gap-1 text-xs">
                  <span style={{ color: colors.green }}>✓</span> 12 coaching sessions
                </li>
                <li className="flex items-center gap-1 text-xs">
                  <span style={{ color: colors.green }}>✓</span> Peer learning circles
                </li>
                <li className="flex items-center gap-1 text-xs">
                  <span style={{ color: colors.green }}>✓</span> 360 leadership assessment
                </li>
                <li className="flex items-center gap-1 text-xs">
                  <span style={{ color: colors.green }}>✓</span> LinkedIn optimization
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Leadership Faculty */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-3 sm:mb-4" style={{ color: colors.primary }}>
            Learn from Women Who Lead
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Link to="/faculty/adaeze-nwosu" className="text-center p-3 rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2 flex items-center justify-center text-lg sm:text-xl font-bold text-white" style={{ background: colors.primary }}>
                DA
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Dr. Adaeze Nwosu</h4>
              <p className="text-xs text-gray-600">Former CTO, Interswitch</p>
            </Link>

            <Link to="/faculty/brenda-mwangi" className="text-center p-3 rounded-lg hover:shadow-md transition-all">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2 flex items-center justify-center text-lg sm:text-xl font-bold text-white" style={{ background: colors.secondary }}>
                BM
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Brenda Mwangi</h4>
              <p className="text-xs text-gray-600">VP Engineering, Safaricom</p>
            </Link>

            <Link to="/faculty/folake-ogunleye" className="text-center p-3 rounded-lg hover:shadow-md transition-all sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mx-auto mb-2 flex items-center justify-center text-lg sm:text-xl font-bold text-white" style={{ background: colors.accent }}>
                FO
              </div>
              <h4 className="font-bold text-gray-900 text-sm">Folake Ogunleye</h4>
              <p className="text-xs text-gray-600">Board Member</p>
            </Link>
          </div>
          
          <div className="text-center mt-3">
            <Link to="/faculty" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
              Meet all faculty →
            </Link>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>
              Women Who Advanced
            </h2>
            <Link to="/about/success-stories" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link to="/about/success-stories/temi-adebayo" className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all border-l-2 block" style={{ borderLeftColor: colors.primary }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: colors.primary }}>TA</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Temi Adebayo</h4>
                  <p className="text-xs text-gray-600">Engineer → Director</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic">"I was stuck for 5 years. This program helped me break through to director level."</p>
            </Link>

            <Link to="/about/success-stories/kemi-nelson" className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-all border-l-2 block" style={{ borderLeftColor: colors.secondary }}>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: colors.secondary }}>KN</div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">Kemi Nelson</h4>
                  <p className="text-xs text-gray-600">PM → CPO</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic">"The coaching helped me navigate board situations and get promoted to CPO."</p>
            </Link>
          </div>
        </div>

        {/* Alumni Network */}
        <div className="mb-6 sm:mb-8 md:mb-10 p-4 rounded-lg text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`, border: `1px solid ${colors.primary}20` }}>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>
            Join an Exclusive Network
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            Become part of Africa's most influential network of women in tech leadership.
          </p>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <Link to="/alumni" className="text-center">
              <div className="text-base sm:text-lg font-bold" style={{ color: colors.primary }}>500+</div>
              <p className="text-xs text-gray-600">Alumni</p>
            </Link>
            <Link to="/research/outcomes" className="text-center">
              <div className="text-base sm:text-lg font-bold" style={{ color: colors.secondary }}>45%</div>
              <p className="text-xs text-gray-600">In C-suite</p>
            </Link>
            <Link to="/alumni/map" className="text-center">
              <div className="text-base sm:text-lg font-bold" style={{ color: colors.accent }}>12+</div>
              <p className="text-xs text-gray-600">Countries</p>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-1 mt-2">
            <Link to="/events/summits" className="px-2 py-1 rounded-full bg-white shadow-sm text-xs" style={{ color: colors.primary }}>Summits</Link>
            <Link to="/mentorship" className="px-2 py-1 rounded-full bg-white shadow-sm text-xs" style={{ color: colors.primary }}>Mentorship</Link>
            <Link to="/board-placement" className="px-2 py-1 rounded-full bg-white shadow-sm text-xs" style={{ color: colors.primary }}>Board placement</Link>
          </div>
        </div>

        {/* Sponsorship Partners */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center">
          <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-3" style={{ color: colors.primary }}>
            Our Graduates Lead At
          </h2>
          <div className="flex flex-wrap justify-center gap-3 items-center opacity-60">
            <Link to="/employers/google" className="text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-600">Google</Link>
            <Link to="/employers/microsoft" className="text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-600">Microsoft</Link>
            <Link to="/employers/meta" className="text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-600">Meta</Link>
            <Link to="/employers/amazon" className="text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-600">Amazon</Link>
            <Link to="/employers/flutterwave" className="text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-600">Flutterwave</Link>
            <Link to="/employers/paystack" className="text-xs sm:text-sm font-bold text-gray-400 hover:text-gray-600">Paystack</Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-6 sm:mb-8 max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-3" style={{ color: colors.primary }}>
            Common Questions
          </h2>

          <div className="space-y-2">
            {[
              {
                q: "Am I ready for this program?",
                a: "You're ready if you have 8+ years of tech experience and are currently managing teams or projects."
              },
              {
                q: "What's the time commitment?",
                a: "Approximately 8-10 hours per week including workshops and coaching."
              },
              {
                q: "Is this only for women in tech?",
                a: "Yes, this program is specifically designed for women in technology roles."
              },
              {
                q: "What outcomes can I expect?",
                a: "87% of our graduates receive a promotion within 12 months."
              },
              {
                q: "Is sponsorship available?",
                a: "Yes! Many employers sponsor women for this program. Scholarships are also available."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm pr-3">{faq.q}</h3>
                  <span className="text-base sm:text-lg flex-shrink-0" style={{ color: colors.primary }}>
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs text-gray-600">{faq.a}</p>
                    {index === 4 && (
                      <Link to="/scholarships" className="text-xs font-medium mt-2 inline-block hover:underline" style={{ color: colors.primary }}>
                        View scholarships →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-3">
            <Link to="/faq" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
              View all FAQs →
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-4 rounded-lg" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-white mb-2">
            Ready to Lead?
          </h2>
          <p className="text-xs sm:text-sm text-white/90 mb-3 max-w-2xl mx-auto px-3">
            The tech industry needs your voice, your vision, and your leadership.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center px-3">
            <Link
              to="/register"
              className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg text-center"
              style={{ background: colors.secondary, color: colors.white }}
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-full font-bold text-xs sm:text-sm border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              Contact Advisor
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-3 text-white/80 text-xs">
            <Link to="/deadlines" className="flex items-center gap-1 hover:text-white">
              <span>📅</span> Apply by April 30
            </Link>
            <Link to="/sponsorship" className="flex items-center gap-1 hover:text-white">
              <span>💰</span> Sponsorship available
            </Link>
          </div>
          <div className="mt-2">
            <Link to="/about/success-stories" className="text-white/80 hover:text-white text-xs underline">
              Read success stories →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}