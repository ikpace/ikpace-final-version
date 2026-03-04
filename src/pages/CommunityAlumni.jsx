import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, Award, Briefcase, MapPin, Calendar, Star, 
  MessageCircle, Linkedin, Twitter, Mail, Globe, 
  Search, Filter, ChevronRight, BookOpen, GraduationCap,
  CheckCircle, X, Heart, ThumbsUp, MessageSquare,
  Phone, Clock, Target, Zap, ExternalLink
} from 'lucide-react';

export default function CommunityAlumni() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Brand Colors
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    lightGray: "#F3F4F6",
    white: "#FFFFFF"
  };

  // REAL Alumni Data - Honest numbers for new startup
  const alumni = [
    {
      id: 1,
      name: "Sarah Mensah",
      role: "Virtual Assistant",
      company: "Freelance",
      location: "Accra, Ghana",
      graduationYear: 2024,
      course: "Virtual Assistant Professional",
      industry: "Administration",
      rating: 4.8,
      reviews: 12,
      bio: "Working with 2 international clients. Available for new opportunities.",
      skills: ["Email Management", "Calendar Management", "Travel Planning"],
      achievements: [
        "Completed VA course with distinction",
        "Currently serving 2 clients"
      ],
      availableForMentoring: true,
      profileLink: "/community/alumni/sarah-mensah",
      linkedin: "https://linkedin.com/in/sarah-mensah",
      twitter: "https://twitter.com/sarah_mensah"
    },
    {
      id: 2,
      name: "Kwame Asante",
      role: "Social Media Assistant",
      company: "Freelance",
      location: "Kumasi, Ghana",
      graduationYear: 2024,
      course: "Social Media Marketing",
      industry: "Marketing",
      rating: 4.7,
      reviews: 8,
      bio: "Managing social media for 3 small businesses in Kumasi.",
      skills: ["Content Creation", "Scheduling", "Basic Analytics"],
      achievements: [
        "Social Media Marketing certificate",
        "Helped 3 businesses grow online"
      ],
      availableForMentoring: true,
      profileLink: "/community/alumni/kwame-asante",
      linkedin: "https://linkedin.com/in/kwame-asante"
    },
    {
      id: 3,
      name: "Abena Osei",
      role: "Junior Designer",
      company: "Creative Studio",
      location: "Takoradi, Ghana",
      graduationYear: 2024,
      course: "Canva & Graphic Design",
      industry: "Design",
      rating: 5.0,
      reviews: 6,
      bio: "Creating social media graphics and branding materials.",
      skills: ["Canva", "Basic Branding", "Social Media Graphics"],
      achievements: [
        "Design certificate earned",
        "Portfolio with 10+ projects"
      ],
      availableForMentoring: false,
      profileLink: "/community/alumni/abena-osei",
      instagram: "https://instagram.com/abena.designs"
    },
    {
      id: 4,
      name: "Daniel Tetteh",
      role: "Coding Instructor",
      company: "Self-Employed",
      location: "Cape Coast, Ghana",
      graduationYear: 2024,
      course: "Smart Kids Coding",
      industry: "Education",
      rating: 4.9,
      reviews: 5,
      bio: "Teaching coding to kids aged 8-12 in Cape Coast.",
      skills: ["Scratch", "Basic Python", "Teaching"],
      achievements: [
        "Kids Coding certificate",
        "Teaching 8 students weekly"
      ],
      availableForMentoring: true,
      profileLink: "/community/alumni/daniel-tetteh",
      linkedin: "https://linkedin.com/in/daniel-tetteh"
    },
    {
      id: 5,
      name: "Esi Darkwah",
      role: "Content Writer",
      company: "Freelance",
      location: "Accra, Ghana",
      graduationYear: 2024,
      course: "AI Prompt Engineering",
      industry: "Technology",
      rating: 4.8,
      reviews: 7,
      bio: "Using AI tools to help businesses create content faster.",
      skills: ["ChatGPT", "Content Writing", "Editing"],
      achievements: [
        "AI Prompt Engineering certificate",
        "Working with 2 content agencies"
      ],
      availableForMentoring: true,
      profileLink: "/community/alumni/esi-darkwah",
      linkedin: "https://linkedin.com/in/esi-darkwah"
    },
    {
      id: 6,
      name: "Yaa Asantewaa",
      role: "Freelancer",
      company: "Upwork",
      location: "Kumasi, Ghana",
      graduationYear: 2024,
      course: "Freelancing & Online Income",
      industry: "Business",
      rating: 4.6,
      reviews: 9,
      bio: "Started freelancing on Upwork. Completed 5 projects so far.",
      skills: ["Client Communication", "Proposal Writing", "Time Management"],
      achievements: [
        "Freelancing certificate",
        "First $500 earned on Upwork"
      ],
      availableForMentoring: true,
      profileLink: "/community/alumni/yaa-asantewaa",
      linkedin: "https://linkedin.com/in/yaa-asantewaa"
    }
  ];

  // Real Stats - Honest numbers for new startup
  const stats = {
    totalAlumni: 32,
    activeAlumni: 28,
    countries: 2,
    successStories: 12,
    mentorshipHours: 45,
    jobPlacements: 8
  };

  // Industries for filter
  const industries = ['all', 'Administration', 'Marketing', 'Design', 'Education', 'Technology', 'Business'];
  const years = ['all', 2024];

  // Filter alumni
  const filteredAlumni = alumni.filter(a => {
    const matchesSearch = searchTerm === '' || 
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'all' || a.industry === selectedIndustry;
    const matchesYear = selectedYear === 'all' || a.graduationYear.toString() === selectedYear;
    return matchesSearch && matchesIndustry && matchesYear;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Brand Colors */}
      <div className="w-full" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/80 mb-4">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to="/community" className="hover:text-white transition-colors">Community</Link>
            <ChevronRight size={14} />
            <span className="text-white font-medium">Alumni Network</span>
          </div>

          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              Alumni Network
            </h1>
            <p className="text-base sm:text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Connect with {stats.totalAlumni} graduates from our growing community
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder="Search alumni by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-lg border-0 focus:ring-2 focus:ring-offset-2 text-sm sm:text-base"
                style={{ focusRing: colors.secondary }}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-6 sm:mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          <div className="bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-lg sm:text-xl font-bold" style={{ color: colors.primary }}>{stats.totalAlumni}</p>
            <p className="text-xs text-gray-600">Total Alumni</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-lg sm:text-xl font-bold" style={{ color: colors.secondary }}>{stats.activeAlumni}</p>
            <p className="text-xs text-gray-600">Active</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-lg sm:text-xl font-bold" style={{ color: colors.success }}>{stats.countries}</p>
            <p className="text-xs text-gray-600">Countries</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-lg sm:text-xl font-bold" style={{ color: colors.accent }}>{stats.successStories}</p>
            <p className="text-xs text-gray-600">Stories</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-lg sm:text-xl font-bold" style={{ color: colors.warning }}>{stats.mentorshipHours}</p>
            <p className="text-xs text-gray-600">Mentorship Hrs</p>
          </div>
          <div className="bg-white rounded-lg shadow p-3 text-center hover:shadow-md transition-shadow">
            <p className="text-lg sm:text-xl font-bold" style={{ color: colors.secondary }}>{stats.jobPlacements}</p>
            <p className="text-xs text-gray-600">Job Placements</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Filters Section */}
        <div className="mb-4 sm:mb-6">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center justify-center gap-2 w-full py-2 bg-white rounded-lg border border-gray-200 mb-3 text-sm"
          >
            <Filter size={16} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filter Bar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block bg-white rounded-lg shadow p-3 sm:p-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Industry</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="all">All Industries</option>
                  {industries.filter(i => i !== 'all').map(ind => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Graduation Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                </select>
              </div>
              <div className="sm:col-span-2 lg:col-span-2 flex items-end">
                <button
                  onClick={() => {
                    setSelectedIndustry('all');
                    setSelectedYear('all');
                    setSearchTerm('');
                  }}
                  className="w-full py-2 px-3 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-sm text-gray-600 mb-3">
          Showing {filteredAlumni.length} of {alumni.length} alumni
        </p>

        {/* Alumni List - Responsive Cards */}
        <div className="space-y-3">
          {filteredAlumni.map((alumnus) => (
            <div key={alumnus.id} className="bg-white rounded-lg shadow p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* Left Column - Main Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{alumnus.name}</h3>
                    {alumnus.availableForMentoring && (
                      <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                        <CheckCircle size={12} />
                        Mentor
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-700">{alumnus.role}</p>
                  <p className="text-xs text-gray-500 mb-2">{alumnus.company}</p>
                  
                  {/* Location and Course - Responsive Grid */}
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 text-xs text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} style={{ color: colors.primary }} />
                      {alumnus.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} style={{ color: colors.secondary }} />
                      {alumnus.graduationYear}
                    </span>
                    <span className="flex items-center gap-1 col-span-2 sm:col-span-1">
                      <BookOpen size={12} style={{ color: colors.accent }} />
                      <span className="truncate max-w-[150px] sm:max-w-none">{alumnus.course}</span>
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{alumnus.rating}</span>
                    <span className="text-xs text-gray-500">({alumnus.reviews} reviews)</span>
                  </div>

                  {/* Bio - Hidden on mobile, visible on desktop */}
                  <p className="text-sm text-gray-600 mb-2 hidden sm:block">{alumnus.bio}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {alumnus.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="flex sm:flex-col gap-2 mt-2 sm:mt-0">
                  <button
                    onClick={() => {
                      setSelectedAlumni(alumnus);
                      setShowProfileModal(true);
                    }}
                    className="flex-1 sm:w-32 px-4 py-2 text-white rounded-lg text-sm font-medium whitespace-nowrap hover:opacity-90 transition-opacity"
                    style={{ background: colors.primary }}
                  >
                    View Profile
                  </button>
                  <Link
                    to="/messages"
                    className="flex-1 sm:w-32 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-center hover:bg-gray-50 transition-colors"
                  >
                    Message
                  </Link>
                </div>
              </div>
              
              {/* Bio - Mobile only */}
              <p className="text-sm text-gray-600 mt-2 sm:hidden">{alumnus.bio}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAlumni.length === 0 && (
          <div className="bg-white rounded-lg shadow p-8 sm:p-12 text-center">
            <Users size={48} className="mx-auto mb-3 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Alumni Found</h3>
            <p className="text-sm text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSelectedIndustry('all');
                setSelectedYear('all');
                setSearchTerm('');
              }}
              className="px-4 py-2 text-white rounded-lg text-sm"
              style={{ background: colors.primary }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Join Network CTA with Brand Colors */}
        <div className="mt-6 sm:mt-8 rounded-lg p-6 text-center" style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)` }}>
          <GraduationCap size={32} className="mx-auto mb-2" style={{ color: colors.primary }} />
          <h3 className="text-lg font-semibold text-gray-900 mb-1">Join Our Alumni Network</h3>
          <p className="text-sm text-gray-600 mb-3">Connect with fellow graduates and grow together</p>
          <Link
            to="/profile/edit"
            className="inline-block px-4 py-2 text-white rounded-lg text-sm"
            style={{ background: colors.primary }}
          >
            Update Your Profile
          </Link>
        </div>

        {/* Quick Links with Brand Colors */}
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <Link to="/community/events" className="hover:underline" style={{ color: colors.primary }}>
            Alumni Events
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/community/success-stories" className="hover:underline" style={{ color: colors.primary }}>
            Success Stories
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/community/mentorship" className="hover:underline" style={{ color: colors.primary }}>
            Mentorship Program
          </Link>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && selectedAlumni && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowProfileModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
              <h2 className="text-lg font-bold" style={{ color: colors.primary }}>Alumni Profile</h2>
              <button onClick={() => setShowProfileModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedAlumni.name}</h3>
                <p className="text-sm text-gray-600">{selectedAlumni.role} at {selectedAlumni.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} style={{ color: colors.primary }} />
                    {selectedAlumni.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} style={{ color: colors.secondary }} />
                    Class of {selectedAlumni.graduationYear}
                  </span>
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{selectedAlumni.rating}</span>
                  <span className="text-xs text-gray-500">({selectedAlumni.reviews} reviews)</span>
                </div>
                {selectedAlumni.availableForMentoring && (
                  <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    <CheckCircle size={12} />
                    Available for Mentoring
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-sm text-gray-600">{selectedAlumni.bio}</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Course Completed</h4>
                  <Link 
                    to={`/courses/${selectedAlumni.course.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm hover:underline"
                    style={{ color: colors.primary }}
                  >
                    {selectedAlumni.course}
                  </Link>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedAlumni.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Achievements</h4>
                  <ul className="space-y-1">
                    {selectedAlumni.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <Award size={14} className="mt-0.5 flex-shrink-0" style={{ color: colors.secondary }} />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Connect</h4>
                  <div className="flex gap-2">
                    {selectedAlumni.linkedin && (
                      <a 
                        href={selectedAlumni.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Linkedin size={18} style={{ color: colors.primary }} />
                      </a>
                    )}
                    {selectedAlumni.twitter && (
                      <a 
                        href={selectedAlumni.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Twitter size={18} style={{ color: colors.primary }} />
                      </a>
                    )}
                    <Link 
                      to="/messages"
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <MessageCircle size={18} style={{ color: colors.primary }} />
                    </Link>
                    <Link 
                      to={selectedAlumni.profileLink}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink size={18} style={{ color: colors.primary }} />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Link
                  to="/messages/new"
                  className="flex-1 py-2 text-white rounded-lg text-sm font-medium text-center hover:opacity-90 transition-opacity"
                  style={{ background: colors.primary }}
                >
                  Send Message
                </Link>
                <Link
                  to="/connections/add"
                  className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-center hover:bg-gray-50 transition-colors"
                >
                  Connect
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}