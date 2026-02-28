export default function CommunityAmbassador() {
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

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
          BETA PROGRAM
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
          Earn Points. Rise Through Ranks. <span style={{ color: colors.secondary }}>Lead the Community.</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 px-2">
          Every action earns you points. First 200 points makes you a Peer Starter. First 400 points makes you an Ambassador. Start your journey today!
        </p>
        <div className="w-20 sm:w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Hero Section with Points Progress */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl mb-12 sm:mb-16 md:mb-20">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}></div>
        <div className="relative p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Your Points Journey Starts Now
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6">
                Join our growing community of tech enthusiasts earning points, unlocking rewards, and building the future of tech education in Africa.
              </p>
              
              {/* Points Progress Bars */}
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex justify-between text-white mb-1 sm:mb-2 text-sm sm:text-base">
                    <span className="font-bold">Peer Starter</span>
                    <span>200 points</span>
                  </div>
                  <div className="h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '35%', background: colors.secondary }}></div>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">130 points to go</p>
                </div>
                <div>
                  <div className="flex justify-between text-white mb-1 sm:mb-2 text-sm sm:text-base">
                    <span className="font-bold">Ambassador</span>
                    <span>400 points</span>
                  </div>
                  <div className="h-3 sm:h-4 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '18%', background: colors.yellow }}></div>
                  </div>
                  <p className="text-white/80 text-xs sm:text-sm mt-1">330 points to go</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center mt-6 lg:mt-0">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2">247</div>
              <p className="text-white/80 text-sm sm:text-base mb-4 sm:mb-6">Active community members this month</p>
              <div className="flex justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">8</div>
                  <p className="text-white/80 text-xs sm:text-sm">Ambassadors</p>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">24</div>
                  <p className="text-white/80 text-xs sm:text-sm">Peer Starters</p>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white">65%</div>
                  <p className="text-white/80 text-xs sm:text-sm">Active rate</p>
                </div>
              </div>
              <button className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                Start Earning Points →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{ color: colors.primary }}>
          How the Points System Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="text-center px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white" style={{ background: colors.primary }}>1</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Earn Points</h3>
            <p className="text-sm sm:text-base text-gray-600">Complete activities, help others, and engage with the community to earn points.</p>
          </div>
          <div className="text-center px-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white" style={{ background: colors.secondary }}>2</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Reach Milestones</h3>
            <p className="text-sm sm:text-base text-gray-600">200 points = Peer Starter | 400 points = Ambassador. Each rank unlocks new benefits.</p>
          </div>
          <div className="text-center px-4 sm:col-span-2 md:col-span-1">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-2xl sm:text-3xl font-bold text-white" style={{ background: colors.green }}>3</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Lead & Earn</h3>
            <p className="text-sm sm:text-base text-gray-600">Higher ranks earn more rewards and exclusive opportunities.</p>
          </div>
        </div>
      </div>

      {/* Points Earning Activities */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>
          Ways to Earn Points
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center max-w-2xl mx-auto mb-8 sm:mb-12 px-4">
          Every action counts. The more you engage, the faster you rise.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Activity 1 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Join the Community</h4>
              <p className="text-xs sm:text-sm text-gray-600">Complete your profile</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+25 pts</div>
          </div>

          {/* Activity 2 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Daily Login</h4>
              <p className="text-xs sm:text-sm text-gray-600">Check in daily</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+2 pts/day</div>
          </div>

          {/* Activity 3 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Answer a Question</h4>
              <p className="text-xs sm:text-sm text-gray-600">Help community members</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+5 pts</div>
          </div>

          {/* Activity 4 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Get Upvoted</h4>
              <p className="text-xs sm:text-sm text-gray-600">Helpful answer</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+3 pts</div>
          </div>

          {/* Activity 5 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Share a Resource</h4>
              <p className="text-xs sm:text-sm text-gray-600">Post learning materials</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+10 pts</div>
          </div>

          {/* Activity 6 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Refer a Friend</h4>
              <p className="text-xs sm:text-sm text-gray-600">They join using your link</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+20 pts</div>
          </div>

          {/* Activity 7 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Attend an Event</h4>
              <p className="text-xs sm:text-sm text-gray-600">Join workshops</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+15 pts</div>
          </div>

          {/* Activity 8 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Host a Study Group</h4>
              <p className="text-xs sm:text-sm text-gray-600">Organize a meetup</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+40 pts</div>
          </div>

          {/* Activity 9 */}
          <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div className="flex-1 pr-3">
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">Write a Blog Post</h4>
              <p className="text-xs sm:text-sm text-gray-600">Share your journey</p>
            </div>
            <div className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap" style={{ background: colors.green + '20', color: colors.green }}>+30 pts</div>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">More earning opportunities coming soon!</p>
      </div>

      {/* Rank Benefits Comparison */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{ color: colors.primary }}>
          Compare Rank Benefits
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto px-4">
          {/* Member */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border-2 relative" style={{ borderColor: colors.lightGray }}>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Community Member</h3>
            <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>0-199</div>
            <ul className="space-y-3 mb-6 text-sm sm:text-base">
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
            <div className="text-center text-sm text-gray-500">Start earning points →</div>
          </div>

          {/* Peer Starter */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 relative transform scale-100 md:scale-105 z-10" style={{ borderColor: colors.secondary }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
              🎯 200 POINTS
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: colors.secondary }}>Peer Starter</h3>
            <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6" style={{ color: colors.secondary }}>200-399</div>
            <ul className="space-y-3 mb-6 text-sm sm:text-base">
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
            <button className="w-full py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base text-white transition-all hover:scale-105" style={{ background: colors.secondary }}>
              Reach 200 Points
            </button>
          </div>

          {/* Ambassador */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-2 relative" style={{ borderColor: colors.primary }}>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white whitespace-nowrap" style={{ background: colors.primary }}>
              👑 400 POINTS
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: colors.primary }}>Ambassador</h3>
            <div className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6" style={{ color: colors.primary }}>400+</div>
            <ul className="space-y-3 mb-6 text-sm sm:text-base">
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
            <button className="w-full py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base text-white transition-all hover:scale-105" style={{ background: colors.primary }}>
              Reach 400 Points
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="mb-12 sm:mb-16 md:mb-20 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-3" style={{ color: colors.primary }}>
          Top Community Leaders This Month
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Compete, earn, and climb the ranks</p>

        <div className="max-w-2xl mx-auto">
          {/* Leaderboard Item 1 */}
          <div className="bg-white p-3 sm:p-4 rounded-xl mb-2 sm:mb-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-base" style={{ background: colors.primary }}>1</div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center text-base sm:text-xl">👩</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm sm:text-base truncate">Chioma Okonkwo</div>
              <div className="text-xs sm:text-sm text-gray-500">Ambassador • 347 pts</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm sm:text-base" style={{ color: colors.primary }}>892</div>
              <div className="text-xs text-gray-500">total</div>
            </div>
          </div>

          {/* Leaderboard Item 2 */}
          <div className="bg-white p-3 sm:p-4 rounded-xl mb-2 sm:mb-3 flex items-center gap-3 shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-white text-sm sm:text-base" style={{ background: colors.secondary }}>2</div>
            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center text-base sm:text-xl">👨</div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-gray-900 text-sm sm:text-base truncate">Michael Adebayo</div>
              <div className="text-xs sm:text-sm text-gray-500">Ambassador • 256 pts</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm sm:text-base" style={{ color: colors.primary }}>645</div>
              <div className="text-xs text-gray-500">total</div>
            </div>
          </div>

          {/* Your Rank */}
          <div className="bg-white p-3 sm:p-4 rounded-xl mt-4 border-2" style={{ borderColor: colors.secondary }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold bg-gray-200 text-sm sm:text-base">15</div>
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gray-200 flex items-center justify-center text-base sm:text-xl">👤</div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-gray-900 text-sm sm:text-base truncate">Your Name</div>
                <div className="text-xs sm:text-sm text-gray-500">Member • 78 pts this month</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-sm sm:text-base text-gray-900">124</div>
                <div className="text-xs text-gray-500">total</div>
              </div>
            </div>
            <div className="mt-2 text-xs sm:text-sm text-center" style={{ color: colors.secondary }}>
              You're 76 points away from Peer Starter!
            </div>
          </div>
        </div>
      </div>

      {/* Ambassador Success Stories */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{ color: colors.primary }}>
          Early Ambassadors Making an Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-4">
          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white flex-shrink-0" style={{ background: colors.primary }}>
                SO
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg truncate">Sarah Okafor</h4>
                <p className="text-xs sm:text-sm text-gray-600">Ambassador since 2024</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3">"Started as a member, reached Peer Starter in 2 months. Now I mentor 5 members and earn monthly rewards while giving back."</p>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="px-2 py-1 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>847 pts</span>
              <span className="px-2 py-1 rounded-full" style={{ background: colors.secondary + '10', color: colors.secondary }}>5 mentees</span>
            </div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg">
            <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-lg sm:text-2xl font-bold text-white flex-shrink-0" style={{ background: colors.secondary }}>
                JO
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg truncate">James Omondi</h4>
                <p className="text-xs sm:text-sm text-gray-600">Ambassador since 2024</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 mb-3">"Organized 3 study groups, helped 20+ beginners start coding. Now I'm known as the go-to mentor in my local community."</p>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="px-2 py-1 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>612 pts</span>
              <span className="px-2 py-1 rounded-full" style={{ background: colors.green + '10', color: colors.green }}>3 events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Challenges */}
      <div className="mb-12 sm:mb-16 md:mb-20 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)` }}>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6" style={{ color: colors.primary }}>
          March Challenges: Earn Bonus Points
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md text-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📚</div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Help 3 Beginners</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Answer questions from new members</p>
            <div className="text-base sm:text-lg font-bold" style={{ color: colors.primary }}>+50 pts</div>
            <div className="text-xs text-gray-500 mt-2">24 completed</div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md text-center">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎤</div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Host a Study Group</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">Share your skills in a live session</p>
            <div className="text-base sm:text-lg font-bold" style={{ color: colors.primary }}>+100 pts</div>
            <div className="text-xs text-gray-500 mt-2">5 completed</div>
          </div>

          <div className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md text-center sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">👥</div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 sm:mb-2">Refer 2 Friends</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">They join and complete profiles</p>
            <div className="text-base sm:text-lg font-bold" style={{ color: colors.primary }}>+40 pts</div>
            <div className="text-xs text-gray-500 mt-2">12 completed</div>
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="mb-12 sm:mb-16 md:mb-20 p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Refer Friends, Earn Points Faster</h2>
            <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6">Share your unique link and earn 20 points for every friend who joins. Plus, they get 10 points too!</p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <input type="text" value="ikpace.com/ref/yourname" readOnly className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-gray-900 text-sm" />
              <button className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-sm sm:text-base whitespace-nowrap" style={{ background: colors.secondary, color: colors.white }}>Copy</button>
            </div>
            <p className="text-white/80 text-xs sm:text-sm">You've referred 4 friends • +80 points earned</p>
          </div>
          <div className="text-center mt-4 md:mt-0">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-2 sm:mb-4">🎁</div>
            <div className="text-lg sm:text-xl md:text-2xl font-bold">Referral Leaderboard</div>
            <p className="text-white/80 text-sm sm:text-base">Top referrer this month: 8 friends</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12 sm:mb-16 md:mb-20 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-8 sm:mb-12" style={{ color: colors.primary }}>
          Ambassador Program FAQs
        </h2>

        <div className="space-y-3 sm:space-y-4">
          <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">How do I start earning points?</h3>
            <p className="text-xs sm:text-sm text-gray-600">Join the community, complete your profile, and start participating! Every helpful action earns you points.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">How long to become an Ambassador?</h3>
            <p className="text-xs sm:text-sm text-gray-600">Active members typically reach Peer Starter in 1-2 months and Ambassador in 3-4 months, depending on engagement.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">What rewards can I get?</h3>
            <p className="text-xs sm:text-sm text-gray-600">Monthly rewards up to $75, exclusive iKPACE swag, and mentorship opportunities.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4 sm:p-6">
            <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">Do points expire?</h3>
            <p className="text-xs sm:text-sm text-gray-600">Points don't expire, but you need to stay active to maintain your rank. Inactive members may lose rank after 3 months.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
          Start Your Points Journey Today
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto px-4">
          Join our growing community. Earn points. Rise through ranks. Lead the future.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
            Create Free Account
          </button>
          <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-bold text-sm sm:text-base md:text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
            See Leaderboard
          </button>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 md:gap-8 mt-6 sm:mt-8 md:mt-10 text-white/80 text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <span>🎯</span> First 400 points = Ambassador
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <span>🚀</span> First 200 points = Peer Starter
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2">
            <span>💰</span> Earn up to $75/month
          </div>
        </div>
      </div>
    </div>
  );
}