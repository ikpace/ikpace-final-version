export default function CommunityEvents() {
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

  // Featured Events
  const featuredEvents = [
    {
      id: 1,
      title: "Women in Tech Leadership Summit",
      type: "Conference",
      date: "Mar 25, 2025",
      time: "10:00 AM - 4:00 PM GMT",
      host: "Dr. Adaeze Nwosu",
      hostRole: "Former CTO, Interswitch",
      attendees: 345,
      image: "👑",
      color: colors.primary,
      featured: true,
      description: "Join Africa's leading women in tech for a day of inspiration, networking, and leadership insights.",
      tags: ["Leadership", "Women in Tech", "Networking"]
    },
    {
      id: 2,
      title: "React Advanced Workshop",
      type: "Workshop",
      date: "Mar 28, 2025",
      time: "3:00 PM - 6:00 PM GMT",
      host: "Michael Adebayo",
      hostRole: "Senior Engineer, Google",
      attendees: 128,
      image: "⚛️",
      color: colors.secondary,
      featured: true,
      description: "Deep dive into React hooks, performance optimization, and advanced patterns.",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 3,
      title: "How to Land Your First Dev Job",
      type: "Webinar",
      date: "Mar 30, 2025",
      time: "5:00 PM - 7:00 PM GMT",
      host: "Sarah K.",
      hostRole: "Career Coach",
      attendees: 267,
      image: "💼",
      color: colors.accent,
      featured: true,
      description: "Resume tips, interview prep, and negotiation strategies from someone who's hired 50+ developers.",
      tags: ["Career", "Interview Prep", "Job Search"]
    }
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      id: 4,
      title: "Python for Data Science Bootcamp",
      type: "Bootcamp",
      date: "Apr 2, 2025",
      time: "2:00 PM - 5:00 PM GMT",
      host: "Dr. James Okonkwo",
      attendees: 89,
      image: "🐍",
      color: colors.green,
      description: "Learn pandas, numpy, and data visualization in this hands-on bootcamp.",
      level: "Intermediate",
      duration: "3 hours"
    },
    {
      id: 5,
      title: "Tech Career Fair 2025",
      type: "Networking",
      date: "Apr 5, 2025",
      time: "11:00 AM - 3:00 PM GMT",
      host: "iKPACE Team",
      attendees: 567,
      image: "🤝",
      color: colors.orangeShade,
      description: "Meet hiring managers from 20+ top tech companies. Bring your resume!",
      level: "All Levels",
      duration: "4 hours"
    },
    {
      id: 6,
      title: "Cloud Computing Certification Path",
      type: "Workshop",
      date: "Apr 8, 2025",
      time: "4:00 PM - 6:00 PM GMT",
      host: "Chioma Eze",
      attendees: 76,
      image: "☁️",
      color: colors.blueShade,
      description: "AWS, Azure, or GCP? Learn which certification is right for your career.",
      level: "Beginner",
      duration: "2 hours"
    },
    {
      id: 7,
      title: "Flutter Mobile Dev Crash Course",
      type: "Workshop",
      date: "Apr 10, 2025",
      time: "3:00 PM - 6:00 PM GMT",
      host: "Tunde B.",
      attendees: 112,
      image: "📱",
      color: colors.accent,
      description: "Build your first cross-platform mobile app in this hands-on session.",
      level: "Beginner",
      duration: "3 hours"
    },
    {
      id: 8,
      title: "Startup Funding for Women Founders",
      type: "Panel",
      date: "Apr 12, 2025",
      time: "2:00 PM - 4:00 PM GMT",
      host: "Folake Ogunleye",
      attendees: 156,
      image: "💰",
      color: colors.yellow,
      description: "Learn how to pitch to investors and secure funding for your startup.",
      level: "Advanced",
      duration: "2 hours"
    },
    {
      id: 9,
      title: "LeetCode Weekly Challenge",
      type: "Study Group",
      date: "Apr 14, 2025",
      time: "6:00 PM - 8:00 PM GMT",
      host: "LeetCode Warriors",
      attendees: 203,
      image: "⚔️",
      color: colors.primary,
      description: "Solve algorithm problems together. Great for interview prep.",
      level: "All Levels",
      duration: "2 hours"
    }
  ];

  // Past Events Highlights
  const pastEvents = [
    {
      id: 101,
      title: "Intro to AI and Machine Learning",
      date: "Mar 10, 2025",
      attendees: 432,
      recording: true,
      image: "🤖"
    },
    {
      id: 102,
      title: "Resume Writing Workshop",
      date: "Mar 12, 2025",
      attendees: 289,
      recording: true,
      image: "📝"
    },
    {
      id: 103,
      title: "Freelancing 101",
      date: "Mar 15, 2025",
      attendees: 356,
      recording: true,
      image: "💻"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
          📅 LIVE EVENTS & WORKSHOPS
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Learn Live. <span style={{ color: colors.secondary }}>Connect Daily.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
          Join weekly live sessions, workshops, and networking events led by industry experts. All free for community members.
        </p>
        <div className="w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.primary }}>48+</div>
          <p className="text-sm text-gray-600">Events This Month</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.secondary }}>12.4k+</div>
          <p className="text-sm text-gray-600">Total Attendees</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.accent }}>156+</div>
          <p className="text-sm text-gray-600">Expert Speakers</p>
        </div>
        <div className="text-center p-4 rounded-2xl bg-white shadow-sm border border-gray-100">
          <div className="text-3xl font-bold" style={{ color: colors.green }}>89%</div>
          <p className="text-sm text-gray-600">Would Recommend</p>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>⭐ Featured Events</h2>
          <button className="text-sm font-medium hover:underline" style={{ color: colors.secondary }}>View Calendar →</button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100">
              <div className="h-3" style={{ background: event.color }}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-5xl">{event.image}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: colors.green + '20', color: colors.green }}>
                    🔥 FEATURED
                  </span>
                </div>
                
                <div className="mb-4">
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: event.color + '10', color: event.color }}>
                    {event.type}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>📅</span> {event.date} • {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>👤</span> {event.host} • {event.hostRole}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>👥</span> {event.attendees} already attending
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 py-3 rounded-xl font-bold text-white transition-all hover:scale-105" style={{ background: event.color }}>
                    Register Now
                  </button>
                  <button className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl hover:bg-gray-50 transition-all" style={{ borderColor: event.color, color: event.color }}>
                    🔔
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Type Filters */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 justify-center">
          <button className="px-6 py-3 rounded-full font-medium text-white shadow-md" style={{ background: colors.primary }}>All Events</button>
          <button className="px-6 py-3 rounded-full font-medium border-2 hover:bg-gray-50 transition-all" style={{ borderColor: colors.primary, color: colors.primary }}>Workshops</button>
          <button className="px-6 py-3 rounded-full font-medium border-2 hover:bg-gray-50 transition-all" style={{ borderColor: colors.secondary, color: colors.secondary }}>Webinars</button>
          <button className="px-6 py-3 rounded-full font-medium border-2 hover:bg-gray-50 transition-all" style={{ borderColor: colors.accent, color: colors.accent }}>Bootcamps</button>
          <button className="px-6 py-3 rounded-full font-medium border-2 hover:bg-gray-50 transition-all" style={{ borderColor: colors.green, color: colors.green }}>Networking</button>
          <button className="px-6 py-3 rounded-full font-medium border-2 hover:bg-gray-50 transition-all" style={{ borderColor: colors.blueShade, color: colors.blueShade }}>Study Groups</button>
        </div>
      </div>

      {/* Search and Calendar View */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Search events by title, topic, or speaker..." 
            className="w-full px-6 py-4 rounded-full border border-gray-200 focus:outline-none focus:border-2 pl-14"
          />
          <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl text-gray-400">🔍</span>
        </div>
        <div className="flex gap-3">
          <select className="px-6 py-4 rounded-full border border-gray-200 bg-white focus:outline-none" style={{ color: colors.primary }}>
            <option>This Week</option>
            <option>This Month</option>
            <option>Next Month</option>
            <option>All Events</option>
          </select>
          <button className="px-6 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: colors.primary }}>
            📅 Calendar View
          </button>
        </div>
      </div>

      {/* Upcoming Events Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ color: colors.primary }}>📌 Upcoming Events</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 p-6">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">{event.image}</span>
                <div>
                  <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: event.color + '10', color: event.color }}>
                    {event.type}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{event.level}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📅</span> {event.date} • {event.time}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>👤</span> {event.host}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>⏱️</span> {event.duration}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span>👥</span> {event.attendees} attending
                </div>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-xl font-medium text-white transition-all hover:scale-105" style={{ background: event.color }}>
                  Register
                </button>
                <button className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-xl hover:bg-gray-50 transition-all" style={{ borderColor: event.color, color: event.color }}>
                  📌
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="px-8 py-4 rounded-full font-medium border-2 transition-all hover:bg-gray-50" style={{ borderColor: colors.primary, color: colors.primary }}>
            Load More Events (12+)
          </button>
        </div>
      </div>

      {/* Weekly Schedule Calendar */}
      <div className="mb-16 p-8 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ color: colors.primary }}>📅 This Week's Schedule</h2>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon 24', 'Tue 25', 'Wed 26', 'Thu 27', 'Fri 28', 'Sat 29', 'Sun 30'].map((day) => (
            <div key={day} className="text-center font-bold text-gray-700">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          <div className="bg-white p-3 rounded-xl min-h-[120px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>10am</div>
            <div className="text-xs p-2 rounded mb-1" style={{ background: colors.primary + '10', color: colors.primary }}>Python Basics</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[120px] border-2" style={{ borderColor: colors.secondary }}>
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>10am-4pm</div>
            <div className="text-xs p-2 rounded mb-1 font-bold" style={{ background: colors.secondary + '20', color: colors.secondary }}>Women in Tech Summit</div>
            <span className="text-xs bg-red-100 text-red-600 px-1 rounded">🔥 Featured</span>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[120px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>3pm</div>
            <div className="text-xs p-2 rounded" style={{ background: colors.accent + '10', color: colors.accent }}>Cloud Computing</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[120px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>2pm</div>
            <div className="text-xs p-2 rounded" style={{ background: colors.green + '10', color: colors.green }}>Data Science</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[120px] border-2" style={{ borderColor: colors.secondary }}>
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>3-6pm</div>
            <div className="text-xs p-2 rounded mb-1" style={{ background: colors.secondary + '20', color: colors.secondary }}>React Advanced</div>
            <span className="text-xs bg-red-100 text-red-600 px-1 rounded">🔥</span>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[120px]">
            <div className="text-xs font-bold mb-2" style={{ color: colors.primary }}>11am</div>
            <div className="text-xs p-2 rounded" style={{ background: colors.orangeShade + '10', color: colors.orangeShade }}>Career Fair</div>
          </div>
          <div className="bg-white p-3 rounded-xl min-h-[120px] opacity-50">
            <div className="text-xs font-bold mb-2">Rest Day</div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button className="px-6 py-3 rounded-full font-medium transition-all hover:underline" style={{ color: colors.primary }}>
            Download Full Calendar →
          </button>
        </div>
      </div>

      {/* Past Event Recordings */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ color: colors.primary }}>🎥 Past Event Recordings</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {pastEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
              <div className="h-40 bg-gray-200 flex items-center justify-center text-6xl">
                {event.image}
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-3">{event.date} • {event.attendees} attended</p>
                {event.recording && (
                  <button className="w-full py-3 rounded-xl font-medium transition-all" style={{ background: colors.primary + '10', color: colors.primary }}>
                    ▶ Watch Recording
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <button className="px-6 py-3 rounded-full font-medium transition-all hover:underline" style={{ color: colors.primary }}>
            View All Recordings (24+) →
          </button>
        </div>
      </div>

      {/* Host an Event CTA */}
      <div className="mb-16 p-8 rounded-3xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`, color: colors.white }}>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Want to Host an Event?</h2>
            <p className="text-white/90 mb-6">Share your expertise with 20,000+ community members. We'll help you plan, promote, and host your workshop or webinar.</p>
            <div className="flex gap-4">
              <button className="px-6 py-3 rounded-full font-bold" style={{ background: colors.secondary, color: colors.white }}>
                Apply to Speak
              </button>
              <button className="px-6 py-3 rounded-full font-bold border-2 border-white hover:bg-white/10">
                Learn More
              </button>
            </div>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🎤</div>
            <div className="text-2xl font-bold">156+</div>
            <p className="text-white/80">Community speakers so far</p>
          </div>
        </div>
      </div>

      {/* Speaker Spotlight */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8" style={{ color: colors.primary }}>✨ Speaker Spotlight</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.primary }}>DA</div>
            <h4 className="font-bold text-gray-900">Dr. Adaeze Nwosu</h4>
            <p className="text-sm text-gray-500">Former CTO, Interswitch</p>
            <p className="text-xs text-gray-400 mt-2">Upcoming: Mar 25</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.secondary }}>MA</div>
            <h4 className="font-bold text-gray-900">Michael Adebayo</h4>
            <p className="text-sm text-gray-500">Senior Engineer, Google</p>
            <p className="text-xs text-gray-400 mt-2">Upcoming: Mar 28</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.accent }}>SK</div>
            <h4 className="font-bold text-gray-900">Sarah K.</h4>
            <p className="text-sm text-gray-500">Career Coach</p>
            <p className="text-xs text-gray-400 mt-2">Upcoming: Mar 30</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-white" style={{ background: colors.green }}>JO</div>
            <h4 className="font-bold text-gray-900">Dr. James Okonkwo</h4>
            <p className="text-sm text-gray-500">Data Scientist</p>
            <p className="text-xs text-gray-400 mt-2">Upcoming: Apr 2</p>
          </div>
        </div>
      </div>

      {/* Event Resources */}
      <div className="mb-16 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>📁 Event Materials</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📄</span>
                <div>
                  <h4 className="font-medium text-gray-900">React Workshop Slides</h4>
                  <p className="text-xs text-gray-500">From Mar 15 session • 45 downloads</p>
                </div>
              </div>
              <button className="text-sm" style={{ color: colors.primary }}>Download</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎥</span>
                <div>
                  <h4 className="font-medium text-gray-900">Python Bootcamp Recording</h4>
                  <p className="text-xs text-gray-500">From Mar 10 session • 234 views</p>
                </div>
              </div>
              <button className="text-sm" style={{ color: colors.primary }}>Watch</button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>📧 Never Miss an Event</h3>
          <p className="text-gray-600 mb-4">Get weekly event reminders straight to your inbox.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Your email" className="flex-1 px-4 py-3 rounded-xl border border-gray-200" />
            <button className="px-6 py-3 rounded-xl font-bold text-white" style={{ background: colors.primary }}>Subscribe</button>
          </div>
          <p className="text-xs text-gray-500 mt-3">Join 8,500+ subscribers. Unsubscribe anytime.</p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6" style={{ color: colors.primary }}>Event FAQs</h2>
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Are events really free?</h3>
            <p className="text-gray-600 text-sm">Yes! All community events are completely free for iKPACE members. Some special workshops may have paid tracks, but most are free.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">How do I get the event link?</h3>
            <p className="text-gray-600 text-sm">After registering, you'll receive a confirmation email with the link. We also send reminders 1 hour before the event starts.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Will there be recordings if I miss it?</h3>
            <p className="text-gray-600 text-sm">Most events are recorded and available in the "Past Events" section within 48 hours.</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-gray-900 mb-2">Can I suggest an event topic?</h3>
            <p className="text-gray-600 text-sm">Absolutely! We love community input. Use the "Suggest Topic" button or join our feedback channel.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center p-8 rounded-3xl" style={{ background: colors.lightGray }}>
        <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
          Don't Miss Out
        </h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join 12,000+ learners at our next event. Learn, connect, and grow with the community.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 shadow-lg" style={{ background: colors.primary }}>
            Browse All Events
          </button>
          <button className="px-8 py-4 rounded-full font-bold border-2 transition-all hover:bg-gray-50" style={{ borderColor: colors.primary, color: colors.primary }}>
            Suggest a Topic
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-4">Next event in <span className="font-bold" style={{ color: colors.secondary }}>2 days</span></p>
      </div>
    </div>
  );
}