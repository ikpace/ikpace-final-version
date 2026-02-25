export default function CommunityStudyGroups() {
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

  // Sample study groups data
  const studyGroups = [
    {
      id: 1,
      name: "JavaScript Masters",
      category: "Web Development",
      members: 234,
      activeToday: 45,
      description: "From basics to advanced JS. We solve problems together and build projects.",
      schedule: "Mon/Wed 6PM GMT",
      nextSession: "Today, 6PM",
      language: "English",
      level: "All Levels",
      icon: "🟨",
      color: colors.yellow
    },
    {
      id: 2,
      name: "Python Data Science",
      category: "Data Science",
      members: 189,
      activeToday: 32,
      description: "Learn pandas, numpy, and machine learning with weekly challenges.",
      schedule: "Tue/Thu 5PM GMT",
      nextSession: "Tomorrow, 5PM",
      language: "English",
      level: "Intermediate",
      icon: "🐍",
      color: colors.green
    },
    {
      id: 3,
      name: "Frontend Fridays",
      category: "Web Development",
      members: 312,
      activeToday: 67,
      description: "React, Vue, and modern CSS. Build real projects every week.",
      schedule: "Friday 4PM GMT",
      nextSession: "Fri, 4PM",
      language: "English",
      level: "Beginner-Friendly",
      icon: "🎨",
      color: colors.secondary
    },
    {
      id: 4,
      name: "Women in Tech Study Circle",
      category: "Community",
      members: 156,
      activeToday: 28,
      description: "Safe space for women to learn, share, and support each other.",
      schedule: "Sat 3PM GMT",
      nextSession: "Sat, 3PM",
      language: "English",
      level: "All Levels",
      icon: "👩‍💻",
      color: colors.accent
    },
    {
      id: 5,
      name: "Cloud Computing Club",
      category: "Cloud",
      members: 98,
      activeToday: 15,
      description: "AWS, Azure, and GCP certifications study group.",
      schedule: "Wed 7PM GMT",
      nextSession: "Wed, 7PM",
      language: "English",
      level: "Intermediate",
      icon: "☁️",
      color: colors.blueShade
    },
    {
      id: 6,
      name: "Mobile Dev: Flutter & React Native",
      category: "Mobile",
      members: 145,
      activeToday: 23,
      description: "Build cross-platform apps together. Share resources and debug.",
      schedule: "Mon/Thu 6PM GMT",
      nextSession: "Mon, 6PM",
      language: "English",
      level: "Beginner-Friendly",
      icon: "📱",
      color: colors.orangeShade
    },
    {
      id: 7,
      name: "LeetCode Warriors",
      category: "Interview Prep",
      members: 278,
      activeToday: 89,
      description: "Daily algorithm challenges and mock interviews.",
      schedule: "Daily 8PM GMT",
      nextSession: "Today, 8PM",
      language: "English",
      level: "All Levels",
      icon: "⚔️",
      color: colors.primary
    },
    {
      id: 8,
      name: "Francophone Developers",
      category: "Community",
      members: 87,
      activeToday: 12,
      description: "Groupe d'étude pour développeurs francophones en Afrique.",
      schedule: "Tue 6PM GMT",
      nextSession: "Tue, 6PM",
      language: "French",
      level: "All Levels",
      icon: "🇫🇷",
      color: colors.accent
    }
  ];

  // Sample featured sessions
  const featuredSessions = [
    {
      id: 1,
      title: "React Hooks Deep Dive",
      group: "JavaScript Masters",
      host: "Sarah K.",
      time: "Today, 6PM GMT",
      attendees: 34,
      image: "⚛️"
    },
    {
      id: 2,
      title: "Python for Beginners Workshop",
      group: "Python Data Science",
      host: "Michael A.",
      time: "Tomorrow, 5PM GMT",
      attendees: 28,
      image: "🐍"
    },
    {
      id: 3,
      title: "Portfolio Review Session",
      group: "Frontend Fridays",
      host: "Chioma O.",
      time: "Fri, 4PM GMT",
      attendees: 42,
      image: "🎨"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-28">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.green + '20', color: colors.green }}>
          👥 VIRTUAL STUDY GROUPS
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Learn Better <span style={{ color: colors.secondary }}>Together</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Join focused study groups, attend live sessions, and accelerate your learning with peers who share your goals.
        </p>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.primary }}>24</div>
          <p className="text-sm text-gray-600">Active Groups</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.secondary }}>1,847</div>
          <p className="text-sm text-gray-600">Total Members</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.accent }}>12</div>
          <p className="text-sm text-gray-600">Sessions Today</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.green }}>89%</div>
          <p className="text-sm text-gray-600">Active Rate</p>
        </div>
      </div>

      {/* Featured Live Sessions Carousel */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>🔥 Live Now & Coming Up</h2>
          <button className="text-sm font-medium hover:underline" style={{ color: colors.secondary }}>View All Sessions →</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100">
              <div className="h-2" style={{ background: colors.primary }}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{session.image}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: colors.green + '20', color: colors.green }}>
                    {session.time.includes('Today') ? '🔴 LIVE TODAY' : '📅 UPCOMING'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{session.title}</h3>
                <p className="text-sm text-gray-600 mb-3">by {session.host} • {session.group}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{session.time}</span>
                  <span className="text-sm flex items-center gap-1">
                    <span>👥</span> {session.attendees} attending
                  </span>
                </div>
                <button className="w-full py-3 rounded-xl font-medium transition-all" style={{ background: colors.primary + '10', color: colors.primary }}>
                  Join Session
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search study groups by name, topic, or language..." 
            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-2 pl-14"
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">🔍</span>
        </div>
        <div className="flex gap-3">
          <select className="px-6 py-4 rounded-full border border-gray-200 bg-white focus:outline-none" style={{ color: colors.primary }}>
            <option>All Categories</option>
            <option>Web Development</option>
            <option>Data Science</option>
            <option>Mobile Development</option>
            <option>Cloud Computing</option>
            <option>Interview Prep</option>
          </select>
          <button className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: colors.primary }}>
            + Create Group
          </button>
        </div>
      </div>

      {/* Main Content - Study Groups Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {studyGroups.map((group) => (
          <div key={group.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 overflow-hidden group cursor-pointer">
            <div className="h-2" style={{ background: group.color }}></div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{group.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors" style={{ groupHoverColor: group.color }}>
                      {group.name}
                    </h3>
                    <p className="text-sm" style={{ color: group.color }}>{group.category}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600">
                  {group.activeToday} active
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>👥</span> {group.members} members
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅</span> {group.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span>🔔</span>
                  <span className="font-medium" style={{ color: group.color }}>{group.nextSession}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>🌍</span> {group.language} • {group.level}
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <button className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105" style={{ background: group.color + '20', color: group.color }}>
                  View Details
                </button>
                <button className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:scale-105" style={{ background: group.color }}>
                  Join Group
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Study Schedule */}
      <div className="mb-12 p-8 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>📅 Weekly Study Schedule</h2>
        <div className="grid grid-cols-7 gap-2 text-center mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="font-bold text-gray-700">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          <div className="bg-white p-3 rounded-xl min-h-[100px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>6PM</div>
            <div className="text-xs p-1 rounded" style={{ background: colors.yellow + '20', color: colors.yellow }}>JS Masters</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[100px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>5PM</div>
            <div className="text-xs p-1 rounded" style={{ background: colors.green + '20', color: colors.green }}>Python DS</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[100px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>7PM</div>
            <div className="text-xs p-1 rounded" style={{ background: colors.blueShade + '20', color: colors.blueShade }}>Cloud Club</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[100px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>6PM</div>
            <div className="text-xs p-1 rounded" style={{ background: colors.orangeShade + '20', color: colors.orangeShade }}>Mobile Dev</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[100px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>4PM</div>
            <div className="text-xs p-1 rounded" style={{ background: colors.secondary + '20', color: colors.secondary }}>Frontend</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[100px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>3PM</div>
            <div className="text-xs p-1 rounded" style={{ background: colors.accent + '20', color: colors.accent }}>Women Circle</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[100px] opacity-50">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>Rest Day</div>
          </div>
        </div>
      </div>

      {/* Study Tools & Resources */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>📚 Shared Resources</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <h4 className="font-medium text-gray-900">JavaScript Cheat Sheet</h4>
                  <p className="text-xs text-gray-500">Uploaded by Michael • 2 hours ago</p>
                </div>
              </div>
              <button className="text-sm" style={{ color: colors.primary }}>Download</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎥</span>
                <div>
                  <h4 className="font-medium text-gray-900">Python Workshop Recording</h4>
                  <p className="text-xs text-gray-500">Uploaded by Sarah • Yesterday</p>
                </div>
              </div>
              <button className="text-sm" style={{ color: colors.primary }}>Watch</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="font-medium text-gray-900">Data Science Roadmap</h4>
                  <p className="text-xs text-gray-500">Uploaded by James • 3 days ago</p>
                </div>
              </div>
              <button className="text-sm" style={{ color: colors.primary }}>View</button>
            </div>
          </div>
          <button className="w-full mt-4 py-3 rounded-xl font-medium border-2 transition-all" style={{ borderColor: colors.primary, color: colors.primary }}>
            + Share a Resource
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>💬 Group Discussions</h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl hover:bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-1">Best resources for learning React in 2025?</h4>
              <p className="text-xs text-gray-500 mb-2">JavaScript Masters • 12 replies • 2 hours ago</p>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👨</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩</span>
                <span className="text-xs text-gray-500">+8 more</span>
              </div>
            </div>
            <div className="p-3 rounded-xl hover:bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-1">Python vs R for data analysis?</h4>
              <p className="text-xs text-gray-500 mb-2">Python Data Science • 8 replies • 5 hours ago</p>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👨</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩</span>
                <span className="text-xs text-gray-500">+3 more</span>
              </div>
            </div>
            <div className="p-3 rounded-xl hover:bg-gray-50">
              <h4 className="font-medium text-gray-900 mb-1">How to prepare for technical interviews?</h4>
              <p className="text-xs text-gray-500 mb-2">LeetCode Warriors • 24 replies • 1 day ago</p>
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👩</span>
                <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">👨</span>
                <span className="text-xs text-gray-500">+12 more</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 py-3 rounded-xl font-medium transition-all" style={{ background: colors.primary + '10', color: colors.primary }}>
            View All Discussions
          </button>
        </div>
      </div>

      {/* Study Partner Matching */}
      <div className="mb-12 p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`, color: colors.white }}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Find Your Study Partner</h2>
            <p className="text-white/90 mb-6">Get matched with someone learning the same topic at the same level. Accountability partners double your chances of success.</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full font-bold" style={{ background: colors.secondary, color: colors.white }}>
                Find a Partner
              </button>
              <button className="px-6 py-3 rounded-full font-bold border-2 border-white hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🤝</div>
            <div className="text-2xl font-bold">1,234+</div>
            <p className="text-white/80">Active study pairs</p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8" style={{ color: colors.primary }}>How Study Groups Work</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.primary }}>1</div>
            <h3 className="font-bold text-gray-900 mb-2">Join a Group</h3>
            <p className="text-sm text-gray-600">Find your topic and skill level</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.secondary }}>2</div>
            <h3 className="font-bold text-gray-900 mb-2">Attend Sessions</h3>
            <p className="text-sm text-gray-600">Join live video study sessions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.accent }}>3</div>
            <h3 className="font-bold text-gray-900 mb-2">Share Resources</h3>
            <p className="text-sm text-gray-600">Learn from shared materials</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white" style={{ background: colors.green }}>4</div>
            <h3 className="font-bold text-gray-900 mb-2">Grow Together</h3>
            <p className="text-sm text-gray-600">Track progress as a group</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6" style={{ color: colors.primary }}>Common Questions</h2>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">How do I join a study group?</h3>
            <p className="text-gray-600 text-sm">Simply click "Join Group" on any group card. You'll get access to their schedule, resources, and discussion forum.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Can I create my own study group?</h3>
            <p className="text-gray-600 text-sm">Absolutely! Click "Create Group" and set up your topic, schedule, and preferences. We'll help you find members.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Are study groups free?</h3>
            <p className="text-gray-600 text-sm">Yes, all study groups are completely free for iKPACE community members.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-8 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
          Ready to Learn Together?
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join a study group today and accelerate your learning with peers who share your goals.
        </p>
        <button className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: colors.primary }}>
          Browse All Study Groups
        </button>
        <p className="text-sm text-gray-500 mt-4">Already in a group? <span className="underline cursor-pointer" style={{ color: colors.secondary }}>View your groups</span></p>
      </div>
    </div>
  );
}