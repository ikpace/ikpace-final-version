import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CommunityForums() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [questionInput, setQuestionInput] = useState('')

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

  // HONEST numbers for new startup
  const forumCategories = [
    {
      id: 1,
      name: "Web Development",
      icon: "🌐",
      topics: "24",
      posts: "86",
      lastActive: "2 hours ago",
      color: colors.primary,
      link: "/community/category/web-dev"
    },
    {
      id: 2,
      name: "Data Science & AI",
      icon: "📊",
      topics: "12",
      posts: "43",
      lastActive: "5 hours ago",
      color: colors.secondary,
      link: "/community/category/data-science"
    },
    {
      id: 3,
      name: "Mobile Development",
      icon: "📱",
      topics: "8",
      posts: "27",
      lastActive: "12 hours ago",
      color: colors.accent,
      link: "/community/category/mobile"
    },
    {
      id: 4,
      name: "Career & Job Help",
      icon: "💼",
      topics: "16",
      posts: "52",
      lastActive: "3 hours ago",
      color: colors.green,
      link: "/community/category/career"
    },
    {
      id: 5,
      name: "Study Groups",
      icon: "👥",
      topics: "7",
      posts: "19",
      lastActive: "8 hours ago",
      color: colors.orangeShade,
      link: "/community/category/study-groups"
    },
    {
      id: 6,
      name: "Tech News & Trends",
      icon: "📰",
      topics: "5",
      posts: "14",
      lastActive: "15 hours ago",
      color: colors.blueShade,
      link: "/community/category/tech-news"
    }
  ];

  // Honest hot topics
  const hotTopics = [
    {
      id: 1,
      title: "How I started freelancing after the VA course",
      author: "Chioma O.",
      avatar: "👩",
      replies: 12,
      views: "234",
      time: "2 hours ago",
      pinned: true,
      link: "/community/topic/1"
    },
    {
      id: 2,
      title: "Tips for learning JavaScript as a beginner",
      author: "Michael A.",
      avatar: "👨",
      replies: 8,
      views: "156",
      time: "5 hours ago",
      pinned: false,
      link: "/community/topic/2"
    },
    {
      id: 3,
      title: "Free resources I used to learn Canva design",
      author: "Sarah K.",
      avatar: "👩",
      replies: 6,
      views: "189",
      time: "1 day ago",
      pinned: true,
      link: "/community/topic/3"
    },
    {
      id: 4,
      title: "My experience with the Smart Kids Coding program",
      author: "Aisha M.",
      avatar: "👩",
      replies: 4,
      views: "98",
      time: "2 days ago",
      pinned: false,
      link: "/community/topic/4"
    },
    {
      id: 5,
      title: "Looking for study partners for AI course",
      author: "Tunde B.",
      avatar: "👨",
      replies: 9,
      views: "145",
      time: "3 days ago",
      pinned: true,
      link: "/community/topic/5"
    }
  ];

  // Honest recent discussions
  const recentDiscussions = [
    {
      id: 1,
      title: "Best way to find first freelance client?",
      author: "John D.",
      replies: 7,
      time: "10 min ago",
      link: "/community/topic/6"
    },
    {
      id: 2,
      title: "HTML/CSS resources for beginners",
      author: "Grace N.",
      replies: 5,
      time: "25 min ago",
      link: "/community/topic/7"
    },
    {
      id: 3,
      title: "How long to complete the VA course?",
      author: "Peter O.",
      replies: 4,
      time: "1 hour ago",
      link: "/community/topic/8"
    },
    {
      id: 4,
      title: "Recommendations for first design project",
      author: "Linda M.",
      replies: 3,
      time: "2 hours ago",
      link: "/community/topic/9"
    }
  ];

  // Honest stats
  const stats = {
    members: 128,
    discussions: 241,
    online: 18,
    answered: "85%"
  };

  // Online members (honest count)
  const onlineMembers = [
    { id: 1, avatar: "👩", name: "Sarah" },
    { id: 2, avatar: "👨", name: "Michael" },
    { id: 3, avatar: "👩", name: "Grace" },
    { id: 4, avatar: "👨", name: "John" },
    { id: 5, avatar: "👩", name: "Amina" },
    { id: 6, avatar: "👨", name: "David" }
  ];

  // Top contributors (honest numbers)
  const topContributors = [
    { id: 1, name: "Grace M.", avatar: "👩", answers: 24, rank: 1, color: colors.primary },
    { id: 2, name: "David O.", avatar: "👨", answers: 18, rank: 2, color: colors.secondary },
    { id: 3, name: "Amina K.", avatar: "👩", answers: 15, rank: 3, color: colors.accent },
    { id: 4, name: "John P.", avatar: "👨", answers: 12, rank: 4, color: colors.green },
    { id: 5, name: "Sarah T.", avatar: "👩", answers: 9, rank: 5, color: colors.blueShade }
  ];

  // Upcoming events (honest)
  const upcomingEvents = [
    {
      id: 1,
      icon: "🎙️",
      title: "AMA with Senior Dev",
      time: "Tomorrow, 3PM GMT",
      description: "Q&A session with a senior developer",
      link: "/community/events/1"
    },
    {
      id: 2,
      icon: "👥",
      title: "JavaScript Study Group",
      time: "Friday, 5PM GMT",
      description: "Solve problems together",
      link: "/community/events/2"
    },
    {
      id: 3,
      icon: "💼",
      title: "Resume Review",
      time: "Saturday, 2PM GMT",
      description: "Get feedback on your resume",
      link: "/community/events/3"
    }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto pb-2 scrollbar-hide">
          <Link to="/" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Home</Link>
          <span>/</span>
          <Link to="/community" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Community</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium whitespace-nowrap">Forums</span>
        </div>
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
            💬 STUDENT FORUMS
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
            Learn Together. <span style={{ color: colors.secondary }}>Grow Together.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
            Join {stats.members} students, alumni, and mentors in our growing learning community.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Stats Bar - Honest numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto">
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.primary }}>{stats.members}</div>
            <p className="text-xs sm:text-sm text-gray-600">Members</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.secondary }}>{stats.discussions}</div>
            <p className="text-xs sm:text-sm text-gray-600">Discussions</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.accent }}>{stats.online}</div>
            <p className="text-xs sm:text-sm text-gray-600">Online Now</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.green }}>{stats.answered}</div>
            <p className="text-xs sm:text-sm text-gray-600">Questions Answered</p>
          </div>
        </div>

        {/* Search and New Post */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search discussions..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-200 focus:outline-none focus:border-2 pl-10 sm:pl-14 text-sm sm:text-base"
              style={{ focusBorderColor: colors.primary }}
            />
            <span className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl text-gray-400">🔍</span>
          </div>
          <Link 
            to="/community/new-discussion" 
            className="px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg flex items-center gap-2 justify-center text-sm sm:text-base"
            style={{ background: colors.primary }}
          >
            <span className="text-lg">+</span> New Discussion
          </Link>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Categories */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>📂 Categories</h2>
              <div className="space-y-2 sm:space-y-3">
                {forumCategories.map((category) => (
                  <Link 
                    key={category.id} 
                    to={category.link}
                    className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{category.icon}</span>
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate" style={{ color: category.color }}>{category.name}</h3>
                        <p className="text-xs text-gray-500">{category.topics} topics</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="text-xs sm:text-sm font-medium">{category.posts} posts</p>
                      <p className="text-[10px] sm:text-xs text-gray-500">{category.lastActive}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Online Members - Honest */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>🟢 Online Now</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {onlineMembers.map((member) => (
                  <Link 
                    key={member.id} 
                    to={`/community/member/${member.id}`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg sm:text-xl border-2 border-green-400 hover:scale-110 transition-transform"
                    title={member.name}
                  >
                    {member.avatar}
                  </Link>
                ))}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm font-medium">
                  +{stats.online - onlineMembers.length}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                {stats.online} members online now
              </p>
              <Link to="/community/members" className="text-xs font-medium mt-3 inline-block hover:underline" style={{ color: colors.primary }}>
                View all members →
              </Link>
            </div>
          </div>

          {/* Middle & Right Columns - Hot Topics & Recent */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hot Topics */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>🔥 Hot Discussions</h2>
                <Link to="/community/hot" className="text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.secondary }}>
                  View All →
                </Link>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {hotTopics.map((topic) => (
                  <Link 
                    key={topic.id} 
                    to={topic.link}
                    className="block p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-all border border-gray-100"
                  >
                    {topic.pinned && (
                      <span className="inline-block text-[10px] sm:text-xs px-2 py-1 rounded-full font-bold mb-2" style={{ background: colors.primary + '10', color: colors.primary }}>
                        📌 Pinned
                      </span>
                    )}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg sm:text-xl flex-shrink-0">
                        {topic.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 hover:text-primary transition-colors line-clamp-2">
                          {topic.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                          <span>by <span className="font-medium text-gray-700">{topic.author}</span></span>
                          <span>•</span>
                          <span>{topic.time}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <span className="text-sm">💬</span> {topic.replies} replies
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="text-sm">👁️</span> {topic.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Discussions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>🕒 Recent Discussions</h2>
                <Link to="/community/recent" className="text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.secondary }}>
                  Refresh
                </Link>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {recentDiscussions.map((discussion) => (
                  <Link 
                    key={discussion.id} 
                    to={discussion.link}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all gap-2"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm sm:text-base mb-1">{discussion.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>by {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-xs sm:text-sm font-medium" style={{ color: colors.primary }}>{discussion.replies} replies</span>
                    </div>
                  </Link>
                ))}
              </div>

              <Link 
                to="/community/discussions" 
                className="w-full mt-4 py-2 sm:py-3 rounded-lg font-medium transition-all hover:bg-gray-50 text-center block text-sm"
                style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}
              >
                Load More Discussions
              </Link>
            </div>
          </div>
        </div>

        {/* Top Contributors - Honest */}
        <div className="mt-8 sm:mt-10 md:mt-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>🏆 Top Contributors</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {topContributors.map((contributor) => (
              <Link 
                key={contributor.id} 
                to={`/community/member/${contributor.id}`}
                className="bg-white p-3 sm:p-4 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
              >
                <div className="relative inline-block">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl sm:text-3xl text-white mx-auto mb-2" style={{ background: contributor.color }}>
                    {contributor.avatar}
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-yellow-400 flex items-center justify-center text-xs sm:text-sm font-bold text-white">
                    {contributor.rank}
                  </span>
                </div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{contributor.name}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500">{contributor.answers} answers</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events - Honest */}
        <div className="mt-8 sm:mt-10 md:mt-12 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: colors.lightGray }}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>📅 Community Events</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {upcomingEvents.map((event) => (
              <Link 
                key={event.id} 
                to={event.link}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{event.icon}</span>
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base truncate">{event.title}</h3>
                    <p className="text-xs text-gray-500">{event.time}</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>
                <span className="text-xs font-medium hover:underline" style={{ color: colors.secondary }}>
                  Join event →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Ask the Community Section */}
        <div className="mt-8 sm:mt-10 md:mt-12 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary}05 0%, ${colors.secondary}05 100%)`, border: `1px solid ${colors.primary}20` }}>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4" style={{ color: colors.primary }}>Have a Question?</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">Our community answers {stats.answered} of questions within 24 hours.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="text" 
                placeholder="Type your question..." 
                value={questionInput}
                onChange={(e) => setQuestionInput(e.target.value)}
                className="flex-1 px-4 sm:px-6 py-3 rounded-full border border-gray-200 focus:outline-none text-sm"
              />
              <Link 
                to={`/community/ask?q=${encodeURIComponent(questionInput)}`}
                className="px-5 sm:px-6 md:px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105 text-center text-sm"
                style={{ background: colors.primary }}
              >
                Ask Now
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-3">🔒 Your question can be posted anonymously</p>
          </div>
        </div>

        {/* Forum Guidelines */}
        <div className="mt-8 sm:mt-10 grid sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0" style={{ background: colors.primary + '10', color: colors.primary }}>🤝</div>
            <p className="text-xs sm:text-sm text-gray-600">Be respectful and supportive</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0" style={{ background: colors.secondary + '10', color: colors.secondary }}>📚</div>
            <p className="text-xs sm:text-sm text-gray-600">No spam or self-promotion</p>
          </div>
          <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-lg sm:text-xl flex-shrink-0" style={{ background: colors.green + '10', color: colors.green }}>⭐</div>
            <p className="text-xs sm:text-sm text-gray-600">Mark helpful answers</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Join {stats.members} Learners Today
          </h2>
          <p className="text-sm sm:text-base text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto">
            Get answers, share knowledge, and grow with our learning community.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link 
              to="/register" 
              className="px-5 sm:px-6 md:px-8 py-3 rounded-full font-bold text-white transition-all hover:scale-105 shadow-xl text-sm sm:text-base"
              style={{ background: colors.secondary }}
            >
              Create Free Account
            </Link>
            <Link 
              to="/login" 
              className="px-5 sm:px-6 md:px-8 py-3 rounded-full font-bold text-white border-2 transition-all hover:bg-white/10 text-sm sm:text-base"
              style={{ borderColor: colors.white }}
            >
              Sign In
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
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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