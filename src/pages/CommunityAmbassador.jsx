import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CommunityAmbassador() {
  const [copied, setCopied] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)

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

  const handleCopy = () => {
    navigator.clipboard.writeText('ikpace.com/ref/yourname')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto pb-2 scrollbar-hide">
          <Link to="/" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Home</Link>
          <span>/</span>
          <Link to="/community" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Community</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium whitespace-nowrap">Ambassador Program</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12 lg:py-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 md:mb-16">
          <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
            🚀 BETA PROGRAM
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
            Earn Points. Rise Through Ranks. <span style={{ color: colors.secondary }}>Lead the Community.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 px-2">
            Every action earns you points. First 200 points makes you a Peer Starter. First 400 points makes you an Ambassador. Start your journey today!
          </p>
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4">
            <Link 
              to="/register" 
              className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              Create Account <span>→</span>
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              to="/community/leaderboard" 
              className="text-xs sm:text-sm font-medium hover:underline flex items-center gap-1"
              style={{ color: colors.primary }}
            >
              View Leaderboard <span>→</span>
            </Link>
          </div>
          
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full mt-4" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Hero Section with Points Progress */}
        <div className="relative rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden shadow-lg sm:shadow-xl mb-8 sm:mb-12 md:mb-16">
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
          <div className="relative p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                  Your Points Journey Starts Now
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-white/90 mb-4 sm:mb-5">
                  Join our growing community earning points, unlocking rewards, and building the future of tech education.
                </p>
                
                {/* Points Progress Bars */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <div className="flex justify-between text-white mb-1 text-xs sm:text-sm">
                      <span className="font-bold">Peer Starter</span>
                      <span>200 points</span>
                    </div>
                    <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '35%', background: colors.secondary }}></div>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">130 points to go</p>
                  </div>
                  <div>
                    <div className="flex justify-between text-white mb-1 text-xs sm:text-sm">
                      <span className="font-bold">Ambassador</span>
                      <span>400 points</span>
                    </div>
                    <div className="h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: '18%', background: colors.yellow }}></div>
                    </div>
                    <p className="text-white/80 text-xs sm:text-sm mt-1">330 points to go</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center mt-4 lg:mt-0">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1">247</div>
                <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">Active members this month</p>
                <div className="flex justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">8</div>
                    <p className="text-white/80 text-xs">Ambassadors</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">24</div>
                    <p className="text-white/80 text-xs">Peer Starters</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg sm:text-xl font-bold text-white">65%</div>
                    <p className="text-white/80 text-xs">Active rate</p>
                  </div>
                </div>
                <Link 
                  to="/register" 
                  className="inline-block w-full px-4 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105 shadow-xl"
                  style={{ background: colors.secondary, color: colors.white }}
                >
                  Start Earning Points →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8" style={{ color: colors.primary }}>
            How the Points System Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <Link to="/community/about" className="text-center px-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:scale-110 transition-transform" style={{ background: colors.primary }}>1</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Earn Points</h3>
              <p className="text-xs sm:text-sm text-gray-600">Complete activities, help others, and engage with the community to earn points.</p>
            </Link>
            <Link to="/community/ranks" className="text-center px-4 group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:scale-110 transition-transform" style={{ background: colors.secondary }}>2</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Reach Milestones</h3>
              <p className="text-xs sm:text-sm text-gray-600">200 points = Peer Starter | 400 points = Ambassador. Each rank unlocks new benefits.</p>
            </Link>
            <Link to="/community/ambassadors" className="text-center px-4 group sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-lg sm:text-xl md:text-2xl font-bold text-white group-hover:scale-110 transition-transform" style={{ background: colors.green }}>3</div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">Lead & Earn</h3>
              <p className="text-xs sm:text-sm text-gray-600">Higher ranks earn more rewards and exclusive opportunities.</p>
            </Link>
          </div>
        </div>

        {/* Points Earning Activities */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900" style={{ color: colors.primary }}>
              Ways to Earn Points
            </h2>
            <Link to="/community/activities" className="text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.secondary }}>
              View all →
            </Link>
          </div>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
            Every action counts. The more you engage, the faster you rise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {/* Activity 1 */}
            <Link to="/community/join" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Join the Community</h4>
                <p className="text-xs text-gray-500">Complete your profile</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+25 pts</div>
            </Link>

            {/* Activity 2 */}
            <Link to="/community/login" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Daily Login</h4>
                <p className="text-xs text-gray-500">Check in daily</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+2 pts/day</div>
            </Link>

            {/* Activity 3 */}
            <Link to="/community/forums" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Answer a Question</h4>
                <p className="text-xs text-gray-500">Help community members</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+5 pts</div>
            </Link>

            {/* Activity 4 */}
            <Link to="/community/forums" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Get Upvoted</h4>
                <p className="text-xs text-gray-500">Helpful answer</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+3 pts</div>
            </Link>

            {/* Activity 5 */}
            <Link to="/community/resources" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Share a Resource</h4>
                <p className="text-xs text-gray-500">Post learning materials</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+10 pts</div>
            </Link>

            {/* Activity 6 */}
            <Link to="/community/refer" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Refer a Friend</h4>
                <p className="text-xs text-gray-500">They join using your link</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+20 pts</div>
            </Link>

            {/* Activity 7 */}
            <Link to="/community/events" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Attend an Event</h4>
                <p className="text-xs text-gray-500">Join workshops</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+15 pts</div>
            </Link>

            {/* Activity 8 */}
            <Link to="/community/host" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Host a Study Group</h4>
                <p className="text-xs text-gray-500">Organize a meetup</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+40 pts</div>
            </Link>

            {/* Activity 9 */}
            <Link to="/community/blog" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all">
              <div className="flex-1 pr-2">
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm">Write a Blog Post</h4>
                <p className="text-xs text-gray-500">Share your journey</p>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+30 pts</div>
            </Link>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">More earning opportunities coming soon!</p>
        </div>

        {/* Rank Benefits Comparison */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8" style={{ color: colors.primary }}>
            Compare Rank Benefits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl mx-auto px-4">
            {/* Member */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border-2" style={{ borderColor: colors.lightGray }}>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Community Member</h3>
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>0-199</div>
              <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Access to community
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Ask questions
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Attend events
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <span>✗</span> Monthly rewards
                </li>
              </ul>
              <Link to="/register" className="text-xs text-center block hover:underline" style={{ color: colors.primary }}>Start earning points →</Link>
            </div>

            {/* Peer Starter */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border-2 relative transform scale-100 md:scale-105 z-10" style={{ borderColor: colors.secondary }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
                🎯 200 POINTS
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.secondary }}>Peer Starter</h3>
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: colors.secondary }}>200-399</div>
              <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Everything in Member
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Monthly rewards up to $25
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Community swag
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> "Peer Starter" badge
                </li>
              </ul>
              <Link to="/register" className="inline-block w-full py-2 rounded-xl font-bold text-xs sm:text-sm text-white text-center transition-all hover:scale-105" style={{ background: colors.secondary }}>
                Reach 200 Points
              </Link>
            </div>

            {/* Ambassador */}
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl border-2" style={{ borderColor: colors.primary }}>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: colors.primary }}>
                👑 400 POINTS
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: colors.primary }}>Ambassador</h3>
              <div className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: colors.primary }}>400+</div>
              <ul className="space-y-2 mb-4 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Everything in Peer Starter
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Monthly rewards up to $75
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Premium Ambassador swag
                </li>
                <li className="flex items-center gap-2">
                  <span style={{ color: colors.green }}>✓</span> Mentorship opportunities
                </li>
              </ul>
              <Link to="/register" className="inline-block w-full py-2 rounded-xl font-bold text-xs sm:text-sm text-white text-center transition-all hover:scale-105" style={{ background: colors.primary }}>
                Reach 400 Points
              </Link>
            </div>
          </div>
        </div>

        {/* Leaderboard Preview */}
        <div className="mb-8 sm:mb-12 md:mb-16 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: colors.lightGray }}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>
              Top Community Leaders
            </h2>
            <Link to="/community/leaderboard" className="text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.secondary }}>
              View full leaderboard →
            </Link>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-4">Compete, earn, and climb the ranks</p>

          <div className="max-w-2xl mx-auto">
            {/* Leaderboard Item 1 */}
            <Link to="/community/member/chioma" className="block bg-white p-2 sm:p-3 rounded-lg mb-2 flex items-center gap-2 sm:gap-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm" style={{ background: colors.primary }}>1</div>
              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm sm:text-base">👩</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-xs sm:text-sm truncate">Chioma Okonkwo</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Ambassador • 347 pts</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xs sm:text-sm" style={{ color: colors.primary }}>892</div>
                <div className="text-[10px] text-gray-500">total</div>
              </div>
            </Link>

            {/* Leaderboard Item 2 */}
            <Link to="/community/member/michael" className="block bg-white p-2 sm:p-3 rounded-lg mb-2 flex items-center gap-2 sm:gap-3 shadow-sm hover:shadow-md transition-all">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-white text-xs sm:text-sm" style={{ background: colors.secondary }}>2</div>
              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm sm:text-base">👨</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-xs sm:text-sm truncate">Michael Adebayo</div>
                <div className="text-[10px] sm:text-xs text-gray-500">Ambassador • 256 pts</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-xs sm:text-sm" style={{ color: colors.primary }}>645</div>
                <div className="text-[10px] text-gray-500">total</div>
              </div>
            </Link>

            {/* Your Rank */}
            <Link to="/profile" className="block bg-white p-2 sm:p-3 rounded-lg mt-3 border-2 hover:shadow-md transition-all" style={{ borderColor: colors.secondary }}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold bg-gray-200 text-xs sm:text-sm">15</div>
                <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm sm:text-base">👤</div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-gray-900 text-xs sm:text-sm truncate">Your Name</div>
                  <div className="text-[10px] sm:text-xs text-gray-500">Member • 78 pts this month</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-xs sm:text-sm text-gray-900">124</div>
                  <div className="text-[10px] text-gray-500">total</div>
                </div>
              </div>
              <div className="mt-2 text-[10px] sm:text-xs text-center" style={{ color: colors.secondary }}>
                You're 76 points away from Peer Starter!
              </div>
            </Link>
          </div>
        </div>

        {/* Ambassador Success Stories */}
        <div className="mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>
            Early Ambassadors Making an Impact
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 px-4">
            <Link to="/community/ambassador/sarah" className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold text-white flex-shrink-0" style={{ background: colors.primary }}>
                  SO
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">Sarah Okafor</h4>
                  <p className="text-xs text-gray-500">Ambassador since 2024</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">"Started as a member, reached Peer Starter in 2 months. Now I mentor 5 members."</p>
              <div className="flex gap-1 sm:gap-2 text-[10px] sm:text-xs">
                <span className="px-1.5 py-0.5 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>847 pts</span>
                <span className="px-1.5 py-0.5 rounded-full" style={{ background: colors.secondary + '10', color: colors.secondary }}>5 mentees</span>
              </div>
            </Link>

            <Link to="/community/ambassador/james" className="bg-white p-4 sm:p-5 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold text-white flex-shrink-0" style={{ background: colors.secondary }}>
                  JO
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">James Omondi</h4>
                  <p className="text-xs text-gray-500">Ambassador since 2024</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-2">"Organized 3 study groups, helped 20+ beginners start coding."</p>
              <div className="flex gap-1 sm:gap-2 text-[10px] sm:text-xs">
                <span className="px-1.5 py-0.5 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>612 pts</span>
                <span className="px-1.5 py-0.5 rounded-full" style={{ background: colors.green + '10', color: colors.green }}>3 events</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Monthly Challenges */}
        <div className="mb-8 sm:mb-12 md:mb-16 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)` }}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-4" style={{ color: colors.primary }}>
            March Challenges: Earn Bonus Points
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            <Link to="/community/challenge/1" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md text-center hover:shadow-lg transition-all">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">📚</div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Help 3 Beginners</h3>
              <p className="text-xs text-gray-500 mb-2">Answer questions from new members</p>
              <div className="text-sm sm:text-base font-bold" style={{ color: colors.primary }}>+50 pts</div>
              <div className="text-xs text-gray-400 mt-2">24 completed</div>
            </Link>

            <Link to="/community/challenge/2" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md text-center hover:shadow-lg transition-all">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">🎤</div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Host a Study Group</h3>
              <p className="text-xs text-gray-500 mb-2">Share your skills in a live session</p>
              <div className="text-sm sm:text-base font-bold" style={{ color: colors.primary }}>+100 pts</div>
              <div className="text-xs text-gray-400 mt-2">5 completed</div>
            </Link>

            <Link to="/community/challenge/3" className="bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md text-center hover:shadow-lg transition-all sm:col-span-2 md:col-span-1">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">👥</div>
              <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">Refer 2 Friends</h3>
              <p className="text-xs text-gray-500 mb-2">They join and complete profiles</p>
              <div className="text-sm sm:text-base font-bold" style={{ color: colors.primary }}>+40 pts</div>
              <div className="text-xs text-gray-400 mt-2">12 completed</div>
            </Link>
          </div>
        </div>

        {/* Referral Program */}
        <div className="mb-8 sm:mb-12 md:mb-16 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">Refer Friends, Earn Points Faster</h2>
              <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">Share your unique link and earn 20 points for every friend who joins. Plus, they get 10 points too!</p>
              <div className="flex flex-col sm:flex-row items-stretch gap-2 mb-2">
                <input type="text" value="ikpace.com/ref/yourname" readOnly className="w-full px-3 py-2 rounded-lg text-gray-900 text-xs sm:text-sm" />
                <button 
                  onClick={handleCopy}
                  className="px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm whitespace-nowrap" 
                  style={{ background: colors.secondary, color: colors.white }}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <Link to="/community/referrals" className="text-white/80 hover:text-white text-xs underline inline-block">
                View your referrals →
              </Link>
              <p className="text-white/80 text-xs mt-2">You've referred 4 friends • +80 points earned</p>
            </div>
            <div className="text-center mt-3 md:mt-0">
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">🎁</div>
              <div className="text-base sm:text-lg font-bold">Referral Leaderboard</div>
              <p className="text-white/80 text-xs">Top referrer this month: 8 friends</p>
              <Link to="/community/leaderboard?tab=referrals" className="text-white/80 hover:text-white text-xs underline mt-2 inline-block">
                See all →
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto px-4">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>
            Ambassador Program FAQs
          </h2>

          <div className="space-y-2 sm:space-y-3">
            {[
              {
                q: "How do I start earning points?",
                a: "Join the community, complete your profile, and start participating! Every helpful action earns you points."
              },
              {
                q: "How long to become an Ambassador?",
                a: "Active members typically reach Peer Starter in 1-2 months and Ambassador in 3-4 months, depending on engagement."
              },
              {
                q: "What rewards can I get?",
                a: "Monthly rewards up to $75, exclusive iKPACE swag, and mentorship opportunities."
              },
              {
                q: "Do points expire?",
                a: "Points don't expire, but you need to stay active to maintain your rank. Inactive members may lose rank after 3 months."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <h3 className="font-bold text-gray-900 text-xs sm:text-sm pr-3">{faq.q}</h3>
                  <span className="text-base sm:text-lg flex-shrink-0" style={{ color: colors.primary }}>
                    {activeFaq === index ? '−' : '+'}
                  </span>
                </button>
                {activeFaq === index && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <p className="text-xs sm:text-sm text-gray-600">{faq.a}</p>
                    {index === 2 && (
                      <Link to="/community/rewards" className="text-xs font-medium mt-2 inline-block hover:underline" style={{ color: colors.primary }}>
                        View all rewards →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <Link to="/faq" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
              View all FAQs →
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 sm:mb-3">
            Start Your Points Journey Today
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-white/90 mb-4 sm:mb-5 max-w-2xl mx-auto px-3">
            Join our growing community. Earn points. Rise through ranks. Lead the future.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center px-3">
            <Link
              to="/register"
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base transition-all hover:scale-105 shadow-xl text-center"
              style={{ background: colors.secondary, color: colors.white }}
            >
              Create Free Account
            </Link>
            <Link
              to="/community/leaderboard"
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full font-bold text-xs sm:text-sm md:text-base border-2 transition-all hover:bg-white/10 text-center"
              style={{ borderColor: colors.white, color: colors.white }}
            >
              See Leaderboard
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 md:gap-4 mt-4 sm:mt-5 text-white/80 text-[10px] sm:text-xs">
            <div className="flex items-center justify-center gap-1">
              <span>🎯</span> First 400 points = Ambassador
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>🚀</span> First 200 points = Peer Starter
            </div>
            <div className="flex items-center justify-center gap-1">
              <span>💰</span> Earn up to $75/month
            </div>
          </div>
          <div className="mt-3">
            <Link to="/community/about" className="text-white/80 hover:text-white text-xs underline">
              Learn more about the program →
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link to="/" className="text-xs sm:text-sm hover:underline" style={{ color: colors.primary }}>
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
          input, button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}