export default function CommunityForums() {
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

  // Sample forum categories data
  const forumCategories = [
    {
      id: 1,
      name: "Web Development",
      icon: "🌐",
      topics: "12.4k",
      posts: "45.2k",
      lastActive: "2 min ago",
      color: colors.primary
    },
    {
      id: 2,
      name: "Data Science & AI",
      icon: "📊",
      topics: "8.7k",
      posts: "23.1k",
      lastActive: "5 min ago",
      color: colors.secondary
    },
    {
      id: 3,
      name: "Mobile Development",
      icon: "📱",
      topics: "6.2k",
      posts: "18.9k",
      lastActive: "12 min ago",
      color: colors.accent
    },
    {
      id: 4,
      name: "Career & Job Help",
      icon: "💼",
      topics: "9.3k",
      posts: "31.7k",
      lastActive: "3 min ago",
      color: colors.green
    },
    {
      id: 5,
      name: "Study Groups",
      icon: "👥",
      topics: "4.1k",
      posts: "15.8k",
      lastActive: "8 min ago",
      color: colors.orangeShade
    },
    {
      id: 6,
      name: "Tech News & Trends",
      icon: "📰",
      topics: "3.8k",
      posts: "12.4k",
      lastActive: "15 min ago",
      color: colors.blueShade
    }
  ];

  // Sample hot topics data
  const hotTopics = [
    {
      id: 1,
      title: "How I landed my first developer job in 6 months",
      author: "Chioma O.",
      avatar: "👩",
      replies: 234,
      views: "12.3k",
      time: "2 hours ago",
      pinned: true
    },
    {
      id: 2,
      title: "Is it too late to start coding at 35? Need advice",
      author: "Michael A.",
      avatar: "👨",
      replies: 156,
      views: "8.7k",
      time: "5 hours ago",
      pinned: false
    },
    {
      id: 3,
      title: "Free resources to learn Python in 2025 (curated list)",
      author: "Sarah K.",
      avatar: "👩",
      replies: 89,
      views: "15.2k",
      time: "1 day ago",
      pinned: true
    },
    {
      id: 4,
      title: "My experience with the Women in Tech Scholarship",
      author: "Aisha M.",
      avatar: "👩",
      replies: 67,
      views: "5.4k",
      time: "2 days ago",
      pinned: false
    },
    {
      id: 5,
      title: "Portfolio review thread - Post your projects here",
      author: "Tunde B.",
      avatar: "👨",
      replies: 312,
      views: "18.9k",
      time: "3 days ago",
      pinned: true
    }
  ];

  // Sample recent discussions
  const recentDiscussions = [
    {
      id: 1,
      title: "React vs Vue for first framework?",
      author: "John D.",
      replies: 23,
      time: "10 min ago"
    },
    {
      id: 2,
      title: "Tips for technical interviews at African startups",
      author: "Grace N.",
      replies: 45,
      time: "25 min ago"
    },
    {
      id: 3,
      title: "How to stay motivated during job search",
      author: "Peter O.",
      replies: 18,
      time: "1 hour ago"
    },
    {
      id: 4,
      title: "Recommendations for cloud certification",
      author: "Linda M.",
      replies: 32,
      time: "2 hours ago"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-28">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
          💬 STUDENT FORUMS
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Learn Together. <span style={{ color: colors.secondary }}>Grow Together.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Join 20,000+ students, alumni, and mentors in the largest tech learning community in Africa.
        </p>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.primary }}>22.4k+</div>
          <p className="text-sm text-gray-600">Members</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.secondary }}>48.2k+</div>
          <p className="text-sm text-gray-600">Discussions</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.accent }}>1.2k+</div>
          <p className="text-sm text-gray-600">Online Now</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.green }}>98%</div>
          <p className="text-sm text-gray-600">Questions Answered</p>
        </div>
      </div>

      {/* Search and New Post */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search discussions, questions, or topics..." 
            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-2 pl-14"
            style={{ focusBorderColor: colors.primary }}
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">🔍</span>
        </div>
        <button className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg flex items-center gap-2 justify-center" style={{ background: colors.primary }}>
          <span>+</span> New Discussion
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>📂 Categories</h2>
            <div className="space-y-3">
              {forumCategories.map((category) => (
                <div key={category.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <h3 className="font-bold text-gray-900" style={{ color: category.color }}>{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.topics} topics</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{category.posts} posts</p>
                    <p className="text-xs text-gray-500">{category.lastActive}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online Members */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>🟢 Online Now</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl border-2 border-green-400">👩</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl border-2 border-green-400">👨</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl border-2 border-green-400">👩</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl border-2 border-green-400">👨</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl border-2 border-green-400">👩</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl border-2 border-green-400">👨</div>
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">+1.2k</div>
            </div>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400"></span>
              1,247 members active in the last 15 minutes
            </p>
          </div>
        </div>

        {/* Middle Column - Hot Topics */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>🔥 Hot Discussions</h2>
              <button className="text-sm font-medium hover:underline" style={{ color: colors.secondary }}>View All →</button>
            </div>

            <div className="space-y-4">
              {hotTopics.map((topic) => (
                <div key={topic.id} className="p-4 rounded-xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-100">
                  <div className="flex items-start gap-3">
                    {topic.pinned && (
                      <span className="text-xs px-2 py-1 rounded-full font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>📌 Pinned</span>
                    )}
                  </div>
                  <div className="flex items-start gap-4 mt-2">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-2xl flex-shrink-0">
                      {topic.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1 hover:text-primary transition-colors" style={{ hoverColor: colors.primary }}>
                        {topic.title}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                        <span>by <span className="font-medium text-gray-700">{topic.author}</span></span>
                        <span>•</span>
                        <span>{topic.time}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <span className="text-lg">💬</span> {topic.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-lg">👁️</span> {topic.views} views
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Discussions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>🕒 Recent Discussions</h2>
              <button className="text-sm font-medium hover:underline" style={{ color: colors.secondary }}>Refresh</button>
            </div>

            <div className="space-y-3">
              {recentDiscussions.map((discussion) => (
                <div key={discussion.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-all">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">{discussion.title}</h4>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>by {discussion.author}</span>
                      <span>•</span>
                      <span>{discussion.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium" style={{ color: colors.primary }}>{discussion.replies} replies</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 rounded-xl font-medium transition-all hover:bg-gray-50" style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}>
              Load More Discussions
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Top Contributors */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>🏆 Top Contributors This Week</h2>
        <div className="grid md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-3xl text-white mx-auto mb-2" style={{ background: colors.primary }}>👩</div>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-sm font-bold text-white">1</span>
            </div>
            <h4 className="font-bold text-gray-900">Grace M.</h4>
            <p className="text-xs text-gray-500">156 answers</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-3xl text-white mx-auto mb-2" style={{ background: colors.secondary }}>👨</div>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-gray-700">2</span>
            </div>
            <h4 className="font-bold text-gray-900">David O.</h4>
            <p className="text-xs text-gray-500">142 answers</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="relative inline-block">
              <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center text-3xl text-white mx-auto mb-2" style={{ background: colors.accent }}>👩</div>
              <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-400 flex items-center justify-center text-sm font-bold text-white">3</span>
            </div>
            <h4 className="font-bold text-gray-900">Amina K.</h4>
            <p className="text-xs text-gray-500">98 answers</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-3xl text-white mx-auto mb-2">👨</div>
            <h4 className="font-bold text-gray-900">John P.</h4>
            <p className="text-xs text-gray-500">87 answers</p>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md text-center">
            <div className="w-16 h-16 rounded-full bg-blueShade flex items-center justify-center text-3xl text-white mx-auto mb-2">👩</div>
            <h4 className="font-bold text-gray-900">Sarah T.</h4>
            <p className="text-xs text-gray-500">76 answers</p>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-12 p-8 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>📅 Community Events</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎙️</span>
              <div>
                <h3 className="font-bold text-gray-900">Ask Me Anything with Senior Dev</h3>
                <p className="text-xs text-gray-500">Tomorrow, 3PM GMT</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Join Sarah from Google for an open Q&A</p>
            <button className="text-sm font-medium" style={{ color: colors.secondary }}>Set Reminder →</button>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">👥</span>
              <div>
                <h3 className="font-bold text-gray-900">Virtual Study Group: JavaScript</h3>
                <p className="text-xs text-gray-500">Friday, 5PM GMT</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Solve problems together with peers</p>
            <button className="text-sm font-medium" style={{ color: colors.secondary }}>Join Group →</button>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">💼</span>
              <div>
                <h3 className="font-bold text-gray-900">Resume Review Workshop</h3>
                <p className="text-xs text-gray-500">Saturday, 2PM GMT</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">Get feedback from hiring managers</p>
            <button className="text-sm font-medium" style={{ color: colors.secondary }}>Register →</button>
          </div>
        </div>
      </div>

      {/* Ask the Community Section */}
      <div className="mt-12 p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`, border: `1px solid ${colors.primary}20` }}>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>Have a Question?</h2>
          <p className="text-gray-600 mb-6">Our community answers 98% of questions within 24 hours. Don't stay stuck.</p>
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Type your question here..." 
              className="flex-1 px-6 py-4 rounded-full border border-gray-200 focus:outline-none"
            />
            <button className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105" style={{ background: colors.primary }}>
              Ask Now
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3">🔒 Your question will be posted anonymously if you prefer</p>
        </div>
      </div>

      {/* Forum Guidelines */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: colors.primary + '10', color: colors.primary }}>🤝</div>
          <p className="text-sm text-gray-600">Be respectful and supportive</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: colors.secondary + '10', color: colors.secondary }}>📚</div>
          <p className="text-sm text-gray-600">No spam or self-promotion</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: colors.green + '10', color: colors.green }}>⭐</div>
          <p className="text-sm text-gray-600">Mark helpful answers</p>
        </div>
      </div>

      {/* Final CTA */}
      <div className="mt-12 text-center p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        <h2 className="text-3xl font-bold text-white mb-4">
          Join 20,000+ Learners Today
        </h2>
        <p className="text-white/90 mb-6 max-w-2xl mx-auto">
          Get answers, share knowledge, and grow with the most active tech community in Africa.
        </p>
        <button className="px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl" style={{ background: colors.secondary, color: colors.white }}>
          Create Free Account
        </button>
        <p className="text-white/80 text-sm mt-4">Already a member? <span className="underline cursor-pointer">Sign In</span></p>
      </div>
    </div>
  );
}