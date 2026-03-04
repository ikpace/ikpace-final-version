import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function CommunityEvents() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [selectedType, setSelectedType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedWeek, setSelectedWeek] = useState('all')

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

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  // HONEST numbers for new startup
  const featuredEvents = [
    {
      id: 1,
      title: "Women in Tech Leadership",
      type: "Conference",
      date: "Mar 25, 2025",
      time: "10:00 AM - 4:00 PM GMT",
      host: "Dr. Adaeze Nwosu",
      hostRole: "Former CTO, Interswitch",
      attendees: 18,
      registered: 18,
      capacity: 25,
      image: "👑",
      color: colors.primary,
      featured: true,
      description: "Join women in tech for a day of inspiration, networking, and leadership insights.",
      tags: ["Leadership", "Women in Tech", "Networking"],
      link: "/events/women-tech-leadership"
    },
    {
      id: 2,
      title: "React Advanced Workshop",
      type: "Workshop",
      date: "Mar 28, 2025",
      time: "3:00 PM - 6:00 PM GMT",
      host: "Michael Adebayo",
      hostRole: "Senior Engineer, Google",
      attendees: 12,
      registered: 12,
      capacity: 20,
      image: "⚛️",
      color: colors.secondary,
      featured: true,
      description: "Deep dive into React hooks, performance optimization, and advanced patterns.",
      tags: ["React", "JavaScript", "Frontend"],
      link: "/events/react-workshop"
    },
    {
      id: 3,
      title: "How to Land Your First Dev Job",
      type: "Webinar",
      date: "Mar 30, 2025",
      time: "5:00 PM - 7:00 PM GMT",
      host: "Sarah K.",
      hostRole: "Career Coach",
      attendees: 15,
      registered: 15,
      capacity: 30,
      image: "💼",
      color: colors.accent,
      featured: true,
      description: "Resume tips, interview prep, and negotiation strategies.",
      tags: ["Career", "Interview Prep", "Job Search"],
      link: "/events/first-dev-job"
    }
  ];

  // Upcoming Events - honest numbers
  const upcomingEvents = [
    {
      id: 4,
      title: "Python for Data Science",
      type: "Workshop",
      date: "Apr 2, 2025",
      time: "2:00 PM - 5:00 PM GMT",
      host: "Dr. James Okonkwo",
      attendees: 8,
      registered: 8,
      capacity: 15,
      image: "🐍",
      color: colors.green,
      description: "Learn pandas, numpy, and data visualization.",
      level: "Intermediate",
      duration: "3 hours",
      link: "/events/python-data-science"
    },
    {
      id: 5,
      title: "Tech Career Fair",
      type: "Networking",
      date: "Apr 5, 2025",
      time: "11:00 AM - 3:00 PM GMT",
      host: "iKPACE Team",
      attendees: 22,
      registered: 22,
      capacity: 50,
      image: "🤝",
      color: colors.orangeShade,
      description: "Meet hiring managers from local tech companies.",
      level: "All Levels",
      duration: "4 hours",
      link: "/events/career-fair"
    },
    {
      id: 6,
      title: "Cloud Computing Path",
      type: "Workshop",
      date: "Apr 8, 2025",
      time: "4:00 PM - 6:00 PM GMT",
      host: "Chioma Eze",
      attendees: 6,
      registered: 6,
      capacity: 20,
      image: "☁️",
      color: colors.blueShade,
      description: "AWS, Azure, or GCP? Choose your certification path.",
      level: "Beginner",
      duration: "2 hours",
      link: "/events/cloud-computing"
    },
    {
      id: 7,
      title: "Flutter Mobile Dev",
      type: "Workshop",
      date: "Apr 10, 2025",
      time: "3:00 PM - 6:00 PM GMT",
      host: "Tunde B.",
      attendees: 9,
      registered: 9,
      capacity: 20,
      image: "📱",
      color: colors.accent,
      description: "Build your first cross-platform mobile app.",
      level: "Beginner",
      duration: "3 hours",
      link: "/events/flutter-workshop"
    },
    {
      id: 8,
      title: "Startup Funding for Women",
      type: "Panel",
      date: "Apr 12, 2025",
      time: "2:00 PM - 4:00 PM GMT",
      host: "Folake Ogunleye",
      attendees: 11,
      registered: 11,
      capacity: 25,
      image: "💰",
      color: colors.yellow,
      description: "Learn how to pitch to investors.",
      level: "Advanced",
      duration: "2 hours",
      link: "/events/startup-funding"
    },
    {
      id: 9,
      title: "LeetCode Weekly Challenge",
      type: "Study Group",
      date: "Apr 14, 2025",
      time: "6:00 PM - 8:00 PM GMT",
      host: "LeetCode Warriors",
      attendees: 14,
      registered: 14,
      capacity: 25,
      image: "⚔️",
      color: colors.primary,
      description: "Solve algorithm problems together for interview prep.",
      level: "All Levels",
      duration: "2 hours",
      link: "/events/leetcode-weekly"
    }
  ];

  // Past Events - honest numbers
  const pastEvents = [
    {
      id: 101,
      title: "Intro to AI and Machine Learning",
      date: "Mar 10, 2025",
      attendees: 24,
      recording: true,
      image: "🤖",
      link: "/recordings/ai-intro"
    },
    {
      id: 102,
      title: "Resume Writing Workshop",
      date: "Mar 12, 2025",
      attendees: 18,
      recording: true,
      image: "📝",
      link: "/recordings/resume-workshop"
    },
    {
      id: 103,
      title: "Freelancing 101",
      date: "Mar 15, 2025",
      attendees: 21,
      recording: true,
      image: "💻",
      link: "/recordings/freelancing-101"
    }
  ];

  // Speakers - honest
  const speakers = [
    { id: 1, name: "Dr. Adaeze Nwosu", role: "Former CTO, Interswitch", initials: "DA", color: colors.primary, date: "Mar 25", link: "/speakers/adaeze" },
    { id: 2, name: "Michael Adebayo", role: "Senior Engineer, Google", initials: "MA", color: colors.secondary, date: "Mar 28", link: "/speakers/michael" },
    { id: 3, name: "Sarah K.", role: "Career Coach", initials: "SK", color: colors.accent, date: "Mar 30", link: "/speakers/sarah" },
    { id: 4, name: "Dr. James Okonkwo", role: "Data Scientist", initials: "JO", color: colors.green, date: "Apr 2", link: "/speakers/james" }
  ];

  // Honest stats
  const stats = {
    eventsThisMonth: 9,
    totalAttendees: 156,
    expertSpeakers: 8,
    recommendRate: "92%"
  };

  const eventTypes = ['all', 'Workshop', 'Webinar', 'Conference', 'Networking', 'Study Group']

  const filteredUpcoming = upcomingEvents.filter(event => {
    const matchesType = selectedType === 'all' || event.type === selectedType
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.host.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesType && matchesSearch
  })

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500 overflow-x-auto pb-2 scrollbar-hide">
          <Link to="/" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Home</Link>
          <span>/</span>
          <Link to="/community" className="hover:underline whitespace-nowrap" style={{ color: colors.primary }}>Community</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium whitespace-nowrap">Events</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
            📅 LIVE EVENTS & WORKSHOPS
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
            Learn Live. <span style={{ color: colors.secondary }}>Connect Daily.</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
            Join weekly live sessions, workshops, and networking events. All free for community members.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto rounded-full" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})` }}></div>
        </div>

        {/* Stats Overview - Honest */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-4xl mx-auto">
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.primary }}>{stats.eventsThisMonth}</div>
            <p className="text-xs sm:text-sm text-gray-600">Events This Month</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.secondary }}>{stats.totalAttendees}</div>
            <p className="text-xs sm:text-sm text-gray-600">Total Attendees</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.accent }}>{stats.expertSpeakers}</div>
            <p className="text-xs sm:text-sm text-gray-600">Expert Speakers</p>
          </div>
          <div className="text-center p-3 sm:p-4 rounded-xl bg-white shadow-sm border border-gray-100">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: colors.green }}>{stats.recommendRate}</div>
            <p className="text-xs sm:text-sm text-gray-600">Would Recommend</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Search events..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-200 focus:outline-none focus:border-2 pl-10 sm:pl-14 text-sm sm:text-base"
            />
            <span className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl text-gray-400">🔍</span>
          </div>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-full border border-gray-200 bg-white focus:outline-none text-sm sm:text-base"
            style={{ color: colors.primary }}
          >
            <option value="all">All Types</option>
            <option value="Workshop">Workshops</option>
            <option value="Webinar">Webinars</option>
            <option value="Conference">Conferences</option>
            <option value="Networking">Networking</option>
            <option value="Study Group">Study Groups</option>
          </select>
          <Link 
            to="/events/calendar" 
            className="px-4 sm:px-6 py-3 sm:py-4 rounded-full font-bold text-white text-center text-sm sm:text-base transition-all hover:scale-105 shadow-lg"
            style={{ background: colors.primary }}
          >
            📅 Calendar View
          </Link>
        </div>

        {/* Featured Events Section */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>⭐ Featured Events</h2>
            <Link to="/events/calendar" className="text-xs sm:text-sm font-medium hover:underline" style={{ color: colors.secondary }}>
              View Calendar →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredEvents.map((event) => (
              <Link key={event.id} to={event.link} className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all border border-gray-100">
                <div className="h-2" style={{ background: event.color }}></div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl sm:text-4xl">{event.image}</span>
                    <span className="px-2 py-1 rounded-full text-[10px] sm:text-xs font-bold" style={{ background: colors.green + '20', color: colors.green }}>
                      🔥 FEATURED
                    </span>
                  </div>
                  
                  <div className="mb-3">
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: event.color + '10', color: event.color }}>
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                  <div className="space-y-1 mb-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>📅</span> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>👤</span> {event.host}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>👥</span> {event.attendees}/{event.capacity} registered
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <span className="flex-1 py-2 rounded-lg text-xs font-bold text-white text-center" style={{ background: event.color }}>
                      Register Now
                    </span>
                    <span className="w-8 h-8 rounded-lg border-2 flex items-center justify-center text-base" style={{ borderColor: event.color, color: event.color }}>
                      🔔
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Upcoming Events Grid */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>📌 Upcoming Events</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredUpcoming.map((event) => (
              <Link key={event.id} to={event.link} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100 p-4 sm:p-5">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl">{event.image}</span>
                  <div>
                    <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ background: event.color + '10', color: event.color }}>
                      {event.type}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{event.level}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">{event.description}</p>

                <div className="space-y-1 mb-3 text-xs">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📅</span> {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>👤</span> {event.host}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>⏱️</span> {event.duration}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>👥</span> {event.attendees}/{event.capacity} registered
                  </div>
                </div>

                <div className="flex gap-2">
                  <span className="flex-1 py-2 rounded-lg text-xs font-medium text-white text-center" style={{ background: event.color }}>
                    Register
                  </span>
                  <span className="w-8 h-8 rounded-lg border-2 flex items-center justify-center text-base" style={{ borderColor: event.color, color: event.color }}>
                    📌
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {filteredUpcoming.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500">No events match your search</p>
            </div>
          )}

          <div className="text-center mt-6">
            <Link to="/events/all" className="px-6 py-3 rounded-full font-medium border-2 transition-all hover:bg-gray-50 inline-block text-sm" style={{ borderColor: colors.primary, color: colors.primary }}>
              Load More Events
            </Link>
          </div>
        </div>

        {/* Weekly Schedule Preview */}
        <div className="mb-10 sm:mb-12 md:mb-16 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: colors.lightGray }}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>📅 This Week's Schedule</h2>
          
          <div className="grid grid-cols-7 gap-1 mb-3 text-[10px] sm:text-xs font-bold text-gray-700">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
              <div key={day} className="text-center">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            <div className="bg-white p-2 rounded-lg min-h-[80px]">
              <div className="text-[10px] font-bold mb-1" style={{ color: colors.primary }}>10am</div>
              <div className="text-[8px] p-1 rounded mb-1" style={{ background: colors.primary + '10', color: colors.primary }}>Python</div>
            </div>
            <div className="bg-white p-2 rounded-lg min-h-[80px] border-2" style={{ borderColor: colors.secondary }}>
              <div className="text-[10px] font-bold mb-1" style={{ color: colors.primary }}>10am</div>
              <div className="text-[8px] p-1 rounded mb-1 font-bold" style={{ background: colors.secondary + '20', color: colors.secondary }}>Women in Tech</div>
              <span className="text-[8px] bg-red-100 text-red-600 px-1 rounded">🔥</span>
            </div>
            <div className="bg-white p-2 rounded-lg min-h-[80px]">
              <div className="text-[10px] font-bold mb-1" style={{ color: colors.primary }}>3pm</div>
              <div className="text-[8px] p-1 rounded" style={{ background: colors.accent + '10', color: colors.accent }}>Cloud</div>
            </div>
            <div className="bg-white p-2 rounded-lg min-h-[80px]">
              <div className="text-[10px] font-bold mb-1" style={{ color: colors.primary }}>2pm</div>
              <div className="text-[8px] p-1 rounded" style={{ background: colors.green + '10', color: colors.green }}>Data</div>
            </div>
            <div className="bg-white p-2 rounded-lg min-h-[80px] border-2" style={{ borderColor: colors.secondary }}>
              <div className="text-[10px] font-bold mb-1" style={{ color: colors.primary }}>3pm</div>
              <div className="text-[8px] p-1 rounded" style={{ background: colors.secondary + '20', color: colors.secondary }}>React</div>
            </div>
            <div className="bg-white p-2 rounded-lg min-h-[80px]">
              <div className="text-[10px] font-bold mb-1" style={{ color: colors.primary }}>11am</div>
              <div className="text-[8px] p-1 rounded" style={{ background: colors.orangeShade + '10', color: colors.orangeShade }}>Career Fair</div>
            </div>
            <div className="bg-white p-2 rounded-lg min-h-[80px] opacity-50">
              <div className="text-[10px]">No events</div>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/events/calendar" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
              Download Full Calendar →
            </Link>
          </div>
        </div>

        {/* Past Event Recordings */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>🎥 Past Event Recordings</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {pastEvents.map((event) => (
              <Link key={event.id} to={event.link} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all">
                <div className="h-24 sm:h-32 bg-gray-100 flex items-center justify-center text-4xl sm:text-5xl">
                  {event.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1">{event.title}</h3>
                  <p className="text-xs text-gray-500 mb-3">{event.date} • {event.attendees} attended</p>
                  {event.recording && (
                    <span className="inline-block w-full py-2 rounded-lg text-xs font-medium text-center" style={{ background: colors.primary + '10', color: colors.primary }}>
                      ▶ Watch Recording
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/recordings" className="text-xs font-medium hover:underline" style={{ color: colors.primary }}>
              View All Recordings →
            </Link>
          </div>
        </div>

        {/* Host an Event CTA */}
        <div className="mb-10 sm:mb-12 md:mb-16 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`, color: colors.white }}>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-center">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">Want to Host an Event?</h2>
              <p className="text-white/90 text-xs sm:text-sm mb-4">Share your expertise with our growing community.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/speaker/apply" className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm text-center" style={{ background: colors.secondary, color: colors.white }}>
                  Apply to Speak
                </Link>
                <Link to="/speaker/info" className="px-4 sm:px-5 py-2 rounded-full font-bold text-xs sm:text-sm border-2 border-white text-center hover:bg-white/10">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="text-center mt-3 md:mt-0">
              <div className="text-3xl sm:text-4xl mb-2">🎤</div>
              <div className="text-lg sm:text-xl font-bold">{stats.expertSpeakers}</div>
              <p className="text-white/80 text-xs">Community speakers</p>
            </div>
          </div>
        </div>

        {/* Speaker Spotlight */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" style={{ color: colors.primary }}>✨ Speaker Spotlight</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {speakers.map((speaker) => (
              <Link key={speaker.id} to={speaker.link} className="text-center group">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full mx-auto mb-2 flex items-center justify-center text-base sm:text-lg md:text-xl font-bold text-white group-hover:scale-110 transition-transform" style={{ background: speaker.color }}>
                  {speaker.initials}
                </div>
                <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{speaker.name}</h4>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">{speaker.role}</p>
                <p className="text-[10px] text-gray-400 mt-1">Upcoming: {speaker.date}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Event Resources & Newsletter */}
        <div className="mb-10 sm:mb-12 grid md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ color: colors.primary }}>📁 Event Materials</h3>
            <div className="space-y-2">
              <Link to="/materials/react-slides" className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <div>
                    <h4 className="font-medium text-gray-900 text-xs sm:text-sm">React Workshop Slides</h4>
                    <p className="text-[10px] text-gray-500">45 downloads</p>
                  </div>
                </div>
                <span className="text-xs" style={{ color: colors.primary }}>Download</span>
              </Link>
              <Link to="/recordings/python-bootcamp" className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎥</span>
                  <div>
                    <h4 className="font-medium text-gray-900 text-xs sm:text-sm">Python Bootcamp</h4>
                    <p className="text-[10px] text-gray-500">234 views</p>
                  </div>
                </div>
                <span className="text-xs" style={{ color: colors.primary }}>Watch</span>
              </Link>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-xl shadow-lg">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3" style={{ color: colors.primary }}>📧 Never Miss an Event</h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3">Get weekly event reminders.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                required
              />
              <button type="submit" className="px-4 py-2 rounded-lg font-bold text-white text-sm" style={{ background: colors.primary }}>
                {subscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-2">Join {stats.totalAttendees} subscribers</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-10 sm:mb-12 max-w-4xl mx-auto">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 text-center mb-4 sm:mb-6" style={{ color: colors.primary }}>Event FAQs</h2>
          <div className="space-y-2">
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Are events really free?</h3>
              <p className="text-xs sm:text-sm text-gray-600">Yes! All community events are completely free for iKPACE members.</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">How do I get the event link?</h3>
              <p className="text-xs sm:text-sm text-gray-600">After registering, you'll receive a confirmation email with the link.</p>
            </div>
            <div className="bg-white p-3 sm:p-4 rounded-lg shadow-sm">
              <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">Will there be recordings?</h3>
              <p className="text-xs sm:text-sm text-gray-600">Most events are recorded and available within 48 hours.</p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl" style={{ background: colors.lightGray }}>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>
            Don't Miss Out
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
            Join {stats.totalAttendees} learners at our next event.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/events/all" className="px-5 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-white text-xs sm:text-sm transition-all hover:scale-105 shadow-lg" style={{ background: colors.primary }}>
              Browse All Events
            </Link>
            <Link to="/events/suggest" className="px-5 sm:px-6 py-2 sm:py-3 rounded-full font-bold border-2 text-xs sm:text-sm transition-all hover:bg-gray-50" style={{ borderColor: colors.primary, color: colors.primary }}>
              Suggest a Topic
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-3">Next event in <span className="font-bold" style={{ color: colors.secondary }}>2 days</span></p>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
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
          input, select, button {
            font-size: 16px !important;
          }
        }
      `}</style>
    </div>
  )
}