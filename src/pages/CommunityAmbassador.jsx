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
    <div className="container mx-auto px-4 py-28">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
          
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Earn Points. Rise Through Ranks. <span style={{ color: colors.secondary }}>Lead the Community.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Every action earns you points. First 700 points makes you an Ambassador. First 400 points makes you a Peer Starter. Start your journey today!
        </p>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Hero Section with Points Progress */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-20">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <div className="absolute inset-0 opacity-10" style={{ background: 'url("/api/placeholder/1200/400") center/cover' }}></div>
        </div>
        <div className="relative p-12 md:p-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Your Points Journey Starts Now
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Join 5,000+ community members earning points, unlocking rewards, and building the future of tech education in Africa.
              </p>
              
              {/* Points Progress Bars */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span className="font-bold">Peer Starter</span>
                    <span>400 points</span>
                  </div>
                  <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '57%', background: colors.secondary }}></div>
                  </div>
                  <p className="text-white/80 text-sm mt-1">228 points to go</p>
                </div>
                <div>
                  <div className="flex justify-between text-white mb-2">
                    <span className="font-bold">Ambassador</span>
                    <span>700 points</span>
                  </div>
                  <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '32%', background: colors.yellow }}></div>
                  </div>
                  <p className="text-white/80 text-sm mt-1">472 points to go</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center">
              <div className="text-6xl font-bold text-white mb-2">1,247</div>
              <p className="text-white/80 mb-6">Active community members this month</p>
              <div className="flex justify-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">42</div>
                  <p className="text-white/80 text-sm">Ambassadors</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">156</div>
                  <p className="text-white/80 text-sm">Peer Starters</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">89%</div>
                  <p className="text-white/80 text-sm">Active rate</p>
                </div>
              </div>
              <button className="w-full px-6 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
                Start Earning Points →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          How the Points System Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white" style={{ background: colors.primary }}>1</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Earn Points</h3>
            <p className="text-gray-600">Complete activities, help others, and engage with the community to earn points.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white" style={{ background: colors.secondary }}>2</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Reach Milestones</h3>
            <p className="text-gray-600">400 points = Peer Starter | 700 points = Ambassador. Each rank unlocks new benefits.</p>
          </div>
          <div className="text-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-bold text-white" style={{ background: colors.green }}>3</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Lead & Earn</h3>
            <p className="text-gray-600">Higher ranks earn more rewards, cash, and exclusive opportunities.</p>
          </div>
        </div>
      </div>

      {/* Points Earning Activities */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6" style={{ color: colors.primary }}>
          Ways to Earn Points
        </h2>
        <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Every action counts. The more you engage, the faster you rise.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Activity 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Join the Community</h4>
              <p className="text-sm text-gray-600">Sign up and complete your profile</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+50 pts</div>
          </div>

          {/* Activity 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Daily Login</h4>
              <p className="text-sm text-gray-600">Check in every day</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+5 pts/day</div>
          </div>

          {/* Activity 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Answer a Question</h4>
              <p className="text-sm text-gray-600">Help someone in the community</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+15 pts</div>
          </div>

          {/* Activity 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Get Upvoted</h4>
              <p className="text-sm text-gray-600">Your answer is marked helpful</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+10 pts</div>
          </div>

          {/* Activity 5 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Share a Resource</h4>
              <p className="text-sm text-gray-600">Post useful learning materials</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+20 pts</div>
          </div>

          {/* Activity 6 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Refer a Friend</h4>
              <p className="text-sm text-gray-600">They join using your link</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+50 pts</div>
          </div>

          {/* Activity 7 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Attend an Event</h4>
              <p className="text-sm text-gray-600">Join live workshops or webinars</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+30 pts</div>
          </div>

          {/* Activity 8 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Host an Event</h4>
              <p className="text-sm text-gray-600">Organize a study group or meetup</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+100 pts</div>
          </div>

          {/* Activity 9 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Write a Blog Post</h4>
              <p className="text-sm text-gray-600">Share your learning journey</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+75 pts</div>
          </div>

          {/* Activity 10 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Mentor Someone</h4>
              <p className="text-sm text-gray-600">Guide a new member 1-on-1</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+200 pts</div>
          </div>

          {/* Activity 11 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Complete Challenges</h4>
              <p className="text-sm text-gray-600">Weekly community challenges</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+25-100 pts</div>
          </div>

          {/* Activity 12 */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900">Streak Bonus</h4>
              <p className="text-sm text-gray-600">7, 14, 30-day active streaks</p>
            </div>
            <div className="px-3 py-1 rounded-full text-sm font-bold" style={{ background: colors.green + '20', color: colors.green }}>+50-200 pts</div>
          </div>
        </div>
      </div>

      {/* Rank Benefits Comparison */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Compare Rank Benefits
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Member */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border-2" style={{ borderColor: colors.lightGray }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Community Member</h3>
            <div className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>0-399</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Access to community
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Ask questions
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Attend events
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span> Monthly cash rewards
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span> Exclusive swag
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span> Mentor access
              </li>
            </ul>
            <div className="text-center text-gray-500">Start earning points →</div>
          </div>

          {/* Peer Starter */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 scale-105 relative z-10" style={{ borderColor: colors.secondary }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap" style={{ background: colors.secondary }}>
              🎯 400 POINTS
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.secondary }}>Peer Starter</h3>
            <div className="text-4xl font-bold mb-6" style={{ color: colors.secondary }}>400-699</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Everything in Member
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Monthly cash rewards up to $50
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> iKPACE swag pack
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Priority event access
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> "Peer Starter" badge
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <span>✗</span> Ambassador mentorship
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: colors.secondary }}>
              Reach 400 Points
            </button>
          </div>

          {/* Ambassador */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2" style={{ borderColor: colors.primary }}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-bold text-white whitespace-nowrap" style={{ background: colors.primary }}>
              👑 700 POINTS
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>Ambassador</h3>
            <div className="text-4xl font-bold mb-6" style={{ color: colors.primary }}>700+</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Everything in Peer Starter
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Monthly cash rewards up to $200
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Premium Ambassador swag
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> 1-on-1 with leadership
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Co-branded content
              </li>
              <li className="flex items-center gap-3">
                <span style={{ color: colors.green }}>✓</span> Speaking opportunities
              </li>
            </ul>
            <button className="w-full py-3 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: colors.primary }}>
              Reach 700 Points
            </button>
          </div>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="mb-20 p-8 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6" style={{ color: colors.primary }}>
          Top Community Leaders This Month
        </h2>
        <p className="text-center text-gray-600 mb-8">Compete, earn, and climb the ranks</p>

        <div className="max-w-3xl mx-auto">
          {/* Leaderboard Item 1 */}
          <div className="bg-white p-4 rounded-xl mb-3 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: colors.primary }}>1</div>
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">👩</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">Chioma Okonkwo</div>
              <div className="text-sm text-gray-500">Ambassador • 1,247 pts</div>
            </div>
            <div className="text-right">
              <div className="font-bold" style={{ color: colors.primary }}>2,340</div>
              <div className="text-xs text-gray-500">total points</div>
            </div>
          </div>

          {/* Leaderboard Item 2 */}
          <div className="bg-white p-4 rounded-xl mb-3 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white" style={{ background: colors.secondary }}>2</div>
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">👨</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">Michael Adebayo</div>
              <div className="text-sm text-gray-500">Ambassador • 892 pts</div>
            </div>
            <div className="text-right">
              <div className="font-bold" style={{ color: colors.primary }}>1,890</div>
              <div className="text-xs text-gray-500">total points</div>
            </div>
          </div>

          {/* Leaderboard Item 3 */}
          <div className="bg-white p-4 rounded-xl mb-3 flex items-center gap-4 shadow-sm">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold" style={{ background: colors.accent, color: colors.white }}>3</div>
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">👩</div>
            <div className="flex-1">
              <div className="font-bold text-gray-900">Aisha Mohammed</div>
              <div className="text-sm text-gray-500">Ambassador • 756 pts</div>
            </div>
            <div className="text-right">
              <div className="font-bold" style={{ color: colors.primary }}>1,567</div>
              <div className="text-xs text-gray-500">total points</div>
            </div>
          </div>

          {/* Your Rank */}
          <div className="bg-white p-4 rounded-xl mt-6 border-2" style={{ borderColor: colors.secondary }}>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold bg-gray-200">42</div>
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">👤</div>
              <div className="flex-1">
                <div className="font-bold text-gray-900">Your Name</div>
                <div className="text-sm text-gray-500">Member • 128 pts this month</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">347</div>
                <div className="text-xs text-gray-500">total points</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-center" style={{ color: colors.secondary }}>
              You're 53 points away from Peer Starter!
            </div>
          </div>
        </div>
      </div>

      {/* Ambassador Success Stories */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Ambassadors Who Made an Impact
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.primary }}>
                SO
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Sarah Okafor</h4>
                <p className="text-sm text-gray-600">Ambassador since 2024</p>
              </div>
            </div>
            <p className="text-gray-600 mb-3">"Started as a member, reached Peer Starter in 3 months, and became Ambassador at 6 months. Now I mentor 15+ members and earn $200 monthly while giving back."</p>
            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>2,847 pts</span>
              <span className="px-2 py-1 rounded-full" style={{ background: colors.secondary + '10', color: colors.secondary }}>42 mentees</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ background: colors.secondary }}>
                JO
              </div>
              <div>
                <h4 className="font-bold text-gray-900">James Omondi</h4>
                <p className="text-sm text-gray-600">Ambassador since 2023</p>
              </div>
            </div>
            <p className="text-gray-600 mb-3">"Organized 8 community events, helped 100+ beginners start coding, and earned enough points to get featured on iKPACE's social media. Now I'm known as the go-to mentor in Nairobi."</p>
            <div className="flex gap-2 text-sm">
              <span className="px-2 py-1 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>3,201 pts</span>
              <span className="px-2 py-1 rounded-full" style={{ background: colors.green + '10', color: colors.green }}>8 events</span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Challenges */}
      <div className="mb-20 p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)` }}>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6" style={{ color: colors.primary }}>
          March Challenges: Earn Bonus Points
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-bold text-gray-900 mb-2">Help 5 Beginners</h3>
            <p className="text-sm text-gray-600 mb-3">Answer 5 questions from new members</p>
            <div className="text-lg font-bold" style={{ color: colors.primary }}>+100 pts</div>
            <div className="text-xs text-gray-500 mt-2">2,345 completed</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">🎤</div>
            <h3 className="font-bold text-gray-900 mb-2">Host a Webinar</h3>
            <p className="text-sm text-gray-600 mb-3">Share your skills in a live session</p>
            <div className="text-lg font-bold" style={{ color: colors.primary }}>+250 pts</div>
            <div className="text-xs text-gray-500 mt-2">87 completed</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="font-bold text-gray-900 mb-2">Refer 3 Friends</h3>
            <p className="text-sm text-gray-600 mb-3">They join and complete their profiles</p>
            <div className="text-lg font-bold" style={{ color: colors.primary }}>+200 pts</div>
            <div className="text-xs text-gray-500 mt-2">1,234 completed</div>
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="mb-20 p-8 rounded-3xl text-white" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Refer Friends, Earn Points Faster</h2>
            <p className="text-white/90 mb-6">Share your unique link and earn 50 points for every friend who joins. Plus, they get 25 points too!</p>
            <div className="flex items-center gap-3 mb-4">
              <input type="text" value="ikpace.com/ref/yourname" readOnly className="flex-1 px-4 py-3 rounded-xl text-gray-900" />
              <button className="px-6 py-3 rounded-xl font-bold" style={{ background: colors.secondary, color: colors.white }}>Copy</button>
            </div>
            <p className="text-white/80 text-sm">You've referred 12 friends • +600 points earned</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🎁</div>
            <div className="text-2xl font-bold">Referral Leaderboard</div>
            <p className="text-white/80">Top referrer this month: 45 friends</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12" style={{ color: colors.primary }}>
          Ambassador Program FAQs
        </h2>

        <div className="space-y-4">
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">How do I start earning points?</h3>
            <p className="text-gray-600">Simply join the community, complete your profile, and start participating! Every helpful action earns you points.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">How long does it take to become an Ambassador?</h3>
            <p className="text-gray-600">Most active members reach Peer Starter in 2-3 months and Ambassador in 6-8 months. But it depends on your engagement level.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">What kind of rewards can I get?</h3>
            <p className="text-gray-600">Cash rewards up to $200/month, exclusive iKPACE swag, mentorship opportunities, speaking slots, and co-branded content creation.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Do points ever expire?</h3>
            <p className="text-gray-600">Points never expire, but you need to stay active to maintain your rank. Inactive members may lose their rank after 3 months.</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-2">Can I become an Ambassador if I'm not in Africa?</h3>
            <p className="text-gray-600">Absolutely! Our community is global. We have Ambassadors from 12+ countries.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-12 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Start Your Points Journey Today
        </h2>
        <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
          Join 5,000+ community members. Earn points. Rise through ranks. Lead the future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-10 py-5 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
            Create Free Account
          </button>
          <button className="px-10 py-5 rounded-full font-bold text-lg border-2 transition-all hover:bg-white/10" style={{ borderColor: colors.white, color: colors.white }}>
            See Leaderboard
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-8 mt-10 text-white/80">
          <div className="flex items-center gap-2">
            <span>🎯</span> First 700 points = Ambassador
          </div>
          <div className="flex items-center gap-2">
            <span>🚀</span> First 400 points = Peer Starter
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span> Earn up to $200/month
          </div>
        </div>
      </div>
    </div>
  );
}