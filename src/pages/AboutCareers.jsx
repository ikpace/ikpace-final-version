import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase, Users, Globe, Heart, Target, Zap,
  Coffee, Gift, Rocket, Award, Clock, MapPin,
  DollarSign, GraduationCap, BookOpen, ChevronRight,
  Sparkles, Star, ThumbsUp, MessageCircle, Calendar,
  Download, Mail, Phone, Linkedin, Twitter, Instagram,
  ArrowRight, CheckCircle, X, Search, Filter
} from 'lucide-react';

export default function AboutCareers() {
  // Brand colors
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    dark: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF"
  };

  // Filter state
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Job openings
  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Marketing Manager',
      department: 'Marketing',
      location: 'Accra, Ghana',
      type: 'Full-time',
      remote: 'Hybrid',
      experience: '5+ years',
      salary: '$45,000 - $60,000',
      posted: '2 days ago',
      deadline: '2025-04-15',
      description: 'We are looking for an experienced Marketing Manager to lead our global marketing initiatives and grow our student community.',
      responsibilities: [
        'Develop and execute comprehensive marketing strategies',
        'Lead a team of marketing specialists',
        'Manage social media presence across all platforms',
        'Create and optimize paid advertising campaigns',
        'Analyze campaign performance and ROI',
        'Collaborate with content creators and designers'
      ],
      requirements: [
        '5+ years of marketing experience',
        'Proven track record in digital marketing',
        'Experience with social media management tools',
        'Strong analytical and reporting skills',
        'Excellent communication and leadership abilities',
        'Bachelor\'s degree in Marketing or related field'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Flexible working hours',
        'Professional development budget',
        '20 vacation days',
        'Remote work options'
      ],
      skills: ['Digital Strategy', 'Team Leadership', 'Analytics', 'Content Marketing', 'SEO/SEM']
    },
    {
      id: 2,
      title: 'Course Creator & Instructor',
      department: 'Education',
      location: 'Remote',
      type: 'Full-time',
      remote: 'Fully Remote',
      experience: '3+ years',
      salary: '$40,000 - $55,000',
      posted: '1 week ago',
      deadline: '2025-04-20',
      description: 'Join our education team to create engaging courses and teach students practical skills for the modern workforce.',
      responsibilities: [
        'Design and develop course curriculum',
        'Create video lessons and learning materials',
        'Engage with students in community forums',
        'Update course content based on industry trends',
        'Mentor students through their learning journey',
        'Collaborate with other instructors'
      ],
      requirements: [
        '3+ years of teaching or training experience',
        'Expertise in one or more of our course areas',
        'Excellent communication and presentation skills',
        'Experience creating educational content',
        'Passion for helping others learn',
        'Bachelor\'s degree (or equivalent experience)'
      ],
      benefits: [
        'Competitive salary',
        'Work from anywhere',
        'Flexible schedule',
        'Professional development',
        'Equipment stipend',
        'Annual team retreats'
      ],
      skills: ['Curriculum Design', 'Public Speaking', 'Content Creation', 'Mentoring', 'Subject Matter Expertise']
    },
    {
      id: 3,
      title: 'Community Manager',
      department: 'Community',
      location: 'Remote',
      type: 'Full-time',
      remote: 'Fully Remote',
      experience: '2+ years',
      salary: '$35,000 - $45,000',
      posted: '3 days ago',
      deadline: '2025-04-18',
      description: 'Build and nurture our growing community of learners. Create engaging experiences and foster connections among students.',
      responsibilities: [
        'Manage daily community engagement',
        'Organize virtual events and workshops',
        'Create community guidelines and resources',
        'Support students with questions and needs',
        'Gather feedback to improve the platform',
        'Collaborate with instructors and marketing'
      ],
      requirements: [
        '2+ years of community management experience',
        'Excellent written and verbal communication',
        'Experience with Discord, Slack, or similar platforms',
        'Event planning and coordination skills',
        'Empathetic and supportive approach',
        'Passion for education and community building'
      ],
      benefits: [
        'Competitive salary',
        'Remote work',
        'Flexible hours',
        'Health stipend',
        'Learning budget',
        'Quarterly team gatherings'
      ],
      skills: ['Community Building', 'Event Planning', 'Communication', 'Conflict Resolution', 'Social Media']
    },
    {
      id: 4,
      title: 'Frontend Developer',
      department: 'Engineering',
      location: 'Accra, Ghana',
      type: 'Full-time',
      remote: 'Hybrid',
      experience: '3+ years',
      salary: '$40,000 - $55,000',
      posted: '5 days ago',
      deadline: '2025-04-25',
      description: 'Help build and improve our learning platform. Create beautiful, responsive interfaces that enhance the student experience.',
      responsibilities: [
        'Develop and maintain frontend applications',
        'Collaborate with designers and backend developers',
        'Optimize applications for performance',
        'Implement responsive designs',
        'Write clean, maintainable code',
        'Participate in code reviews'
      ],
      requirements: [
        '3+ years of frontend development experience',
        'Proficiency in React, JavaScript, and CSS',
        'Experience with responsive design',
        'Understanding of UI/UX principles',
        'Version control with Git',
        'Problem-solving mindset'
      ],
      benefits: [
        'Competitive salary',
        'Health insurance',
        'Flexible hours',
        'Learning stipend',
        'Modern equipment',
        'Team lunches'
      ],
      skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'Git', 'Responsive Design']
    },
    {
      id: 5,
      title: 'Student Success Manager',
      department: 'Support',
      location: 'Remote',
      type: 'Full-time',
      remote: 'Fully Remote',
      experience: '2+ years',
      salary: '$32,000 - $42,000',
      posted: '1 week ago',
      deadline: '2025-04-22',
      description: 'Ensure our students have the best possible learning experience. Provide support, guidance, and resources to help them succeed.',
      responsibilities: [
        'Support students via email and chat',
        'Create help resources and FAQs',
        'Track and resolve student issues',
        'Collect and analyze feedback',
        'Collaborate with instructors',
        'Improve support processes'
      ],
      requirements: [
        '2+ years of customer support experience',
        'Excellent communication skills',
        'Empathetic and patient approach',
        'Problem-solving abilities',
        'Experience with support tools',
        'Passion for helping others'
      ],
      benefits: [
        'Competitive salary',
        'Remote work',
        'Flexible schedule',
        'Wellness stipend',
        'Learning budget',
        'Team retreats'
      ],
      skills: ['Customer Support', 'Communication', 'Problem Solving', 'Empathy', 'Organization']
    },
    {
      id: 6,
      title: 'Content Writer',
      department: 'Marketing',
      location: 'Remote',
      type: 'Part-time',
      remote: 'Fully Remote',
      experience: '2+ years',
      salary: '$25 - $35/hour',
      posted: '2 weeks ago',
      deadline: '2025-04-30',
      description: 'Create engaging content for our blog, social media, and marketing materials. Tell the iKPACE story and inspire learners.',
      responsibilities: [
        'Write blog posts and articles',
        'Create social media content',
        'Develop email newsletters',
        'Interview students for success stories',
        'Optimize content for SEO',
        'Collaborate with marketing team'
      ],
      requirements: [
        '2+ years of content writing experience',
        'Excellent writing and editing skills',
        'Understanding of SEO principles',
        'Ability to tell compelling stories',
        'Experience with content management systems',
        'Portfolio of published work'
      ],
      benefits: [
        'Competitive hourly rate',
        'Flexible schedule',
        'Remote work',
        'Creative freedom',
        'Growth opportunities',
        'Learn about education'
      ],
      skills: ['Content Writing', 'SEO', 'Storytelling', 'Editing', 'Social Media', 'Blogging']
    }
  ];

  // Departments for filtering
  const departments = [
    { id: 'all', name: 'All Departments', icon: <Briefcase size={16} /> },
    { id: 'Marketing', name: 'Marketing', icon: <Zap size={16} /> },
    { id: 'Education', name: 'Education', icon: <GraduationCap size={16} /> },
    { id: 'Community', name: 'Community', icon: <Users size={16} /> },
    { id: 'Engineering', name: 'Engineering', icon: <Target size={16} /> },
    { id: 'Support', name: 'Support', icon: <Heart size={16} /> }
  ];

  // Locations for filtering
  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'Accra, Ghana', name: 'Accra, Ghana' },
    { id: 'Remote', name: 'Remote' }
  ];

  // Filter jobs based on selections
  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || job.location === selectedLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesLocation && matchesSearch;
  });

  // Company stats
  const stats = [
    { label: 'Team Members', value: '12', icon: <Users size={24} /> },
    { label: 'Countries', value: '8', icon: <Globe size={24} /> },
    { label: 'Open Positions', value: '6', icon: <Briefcase size={24} /> },
    { label: 'Remote First', value: '80%', icon: <Rocket size={24} /> }
  ];

  // Benefits
  const benefits = [
    {
      title: 'Remote First',
      description: 'Work from anywhere. We believe in flexibility and trust.',
      icon: <Globe size={32} />,
      color: colors.primary
    },
    {
      title: 'Competitive Pay',
      description: 'Fair compensation that values your skills and experience.',
      icon: <DollarSign size={32} />,
      color: colors.secondary
    },
    {
      title: 'Health Insurance',
      description: 'Comprehensive health coverage for you and your family.',
      icon: <Heart size={32} />,
      color: colors.accent
    },
    {
      title: 'Learning Budget',
      description: '$1,000/year for courses, books, and conferences.',
      icon: <BookOpen size={32} />,
      color: colors.success
    },
    {
      title: 'Flexible Hours',
      description: 'Work when you\'re most productive. Results matter, not hours.',
      icon: <Clock size={32} />,
      color: colors.blueShade
    },
    {
      title: 'Team Retreats',
      description: 'Annual gatherings to connect and have fun together.',
      icon: <Coffee size={32} />,
      color: colors.orangeShade
    }
  ];

  // Values
  const values = [
    {
      title: 'Student First',
      description: 'Every decision we make starts with "how does this help our students?"',
      icon: <Heart size={24} />
    },
    {
      title: 'Growth Mindset',
      description: 'We\'re always learning, improving, and challenging ourselves.',
      icon: <Rocket size={24} />
    },
    {
      title: 'Transparency',
      description: 'Open communication, honest feedback, and shared information.',
      icon: <Globe size={24} />
    },
    {
      title: 'Inclusivity',
      description: 'Diverse perspectives make us stronger and more innovative.',
      icon: <Users size={24} />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-16" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <Rocket size={16} />
            Join Our Mission
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Careers at <span style={{ color: colors.secondary }}>iKPACE</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Help us transform education and make quality learning accessible to everyone.
            Join a team of passionate educators, creators, and innovators.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white">
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs text-white/80 flex items-center justify-center gap-1">
                  {stat.icon}
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Join Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              WHY JOIN US
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Love Your <span style={{ color: colors.secondary }}>Work</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building something meaningful, and we want you to be part of it
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all border border-gray-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: colors.primary + '15', color: colors.primary }}>
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16" style={{ background: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '10', color: colors.secondary }}>
              BENEFITS & PERKS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              We Take Care of <span style={{ color: colors.primary }}>Our Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Great benefits that support your work, life, and growth
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: benefit.color + '15', color: benefit.color }}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              OPEN POSITIONS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Join Our <span style={{ color: colors.secondary }}>Team</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find your perfect role and help us shape the future of education
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-2 transition-colors"
                style={{ focusBorderColor: colors.secondary }}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X size={16} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              {/* Department Filter */}
              <div className="flex flex-wrap gap-2">
                {departments.map(dept => (
                  <button
                    key={dept.id}
                    onClick={() => setSelectedDepartment(dept.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedDepartment === dept.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedDepartment === dept.id ? { background: colors.secondary } : {}}
                  >
                    {dept.icon}
                    {dept.name}
                  </button>
                ))}
              </div>

              {/* Location Filter */}
              <div className="flex gap-2">
                {locations.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedLocation === loc.id
                        ? 'text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    style={selectedLocation === loc.id ? { background: colors.accent } : {}}
                  >
                    {loc.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Results count */}
            <div className="text-center text-sm text-gray-500">
              Showing {filteredJobs.length} open positions
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-4 max-w-4xl mx-auto">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-3 mb-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                        <Briefcase size={12} />
                        {job.department}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                        <MapPin size={12} />
                        {job.location}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                        <Clock size={12} />
                        {job.type}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                        <DollarSign size={12} />
                        {job.salary}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 whitespace-nowrap">Posted {job.posted}</span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                      style={{ background: colors.primary + '10', color: colors.primary }}
                    >
                      View Details <ChevronRight size={14} className="inline ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12">
                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No positions found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSelectedDepartment('all');
                    setSelectedLocation('all');
                    setSearchTerm('');
                  }}
                  className="mt-4 px-6 py-2 rounded-full text-white font-medium"
                  style={{ background: colors.primary }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Life at iKPACE Section */}
      <section className="py-16" style={{ background: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.accent + '10', color: colors.accent }}>
              LIFE AT iKPACE
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              More Than Just a <span style={{ color: colors.accent }}>Job</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're building a culture where everyone can thrive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/3184429/pexels-photo-3184429.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Team collaboration"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Team Collaboration</h3>
                <p className="text-sm text-gray-600">Work with talented people who support and inspire you every day.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Remote work"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Remote First</h3>
                <p className="text-sm text-gray-600">Work from anywhere. We trust you to do your best work.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-md">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                alt="Learning culture"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">Learning Culture</h3>
                <p className="text-sm text-gray-600">We invest in your growth with learning budgets and mentorship.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hiring Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.success + '10', color: colors.success }}>
              HIRING PROCESS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Simple & <span style={{ color: colors.success }}>Transparent</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We make it easy to apply and get to know us
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.primary + '15', color: colors.primary }}>
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Apply</h3>
                <p className="text-xs text-gray-600">Submit your application and resume</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.secondary + '15', color: colors.secondary }}>
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Chat</h3>
                <p className="text-xs text-gray-600">30-minute video call to get to know you</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.accent + '15', color: colors.accent }}>
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Interview</h3>
                <p className="text-xs text-gray-600">Meet the team and discuss your role</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.success + '15', color: colors.success }}>
                  <span className="text-xl font-bold">4</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Offer</h3>
                <p className="text-xs text-gray-600">Welcome to the team! 🎉</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            We're always looking for talented people. Send us your resume and we'll keep you in mind for future opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Send General Application
            </Link>
            <a
              href="mailto:careers@ikpace.com"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{selectedJob.title}</h2>
              <button
                onClick={() => setSelectedJob(null)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Job Meta */}
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: colors.primary + '10', color: colors.primary }}>
                  {selectedJob.department}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 flex items-center gap-1">
                  <MapPin size={12} />
                  {selectedJob.location}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 flex items-center gap-1">
                  <Clock size={12} />
                  {selectedJob.type}
                </span>
                <span className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-600 flex items-center gap-1">
                  <DollarSign size={12} />
                  {selectedJob.salary}
                </span>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">About the Role</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>

              {/* Responsibilities */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Responsibilities</h3>
                <ul className="space-y-2">
                  {selectedJob.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.success }} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Requirements</h3>
                <ul className="space-y-2">
                  {selectedJob.requirements.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.secondary }} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Benefits</h3>
                <ul className="space-y-2">
                  {selectedJob.benefits.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Gift size={16} className="flex-shrink-0 mt-0.5" style={{ color: colors.accent }} />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Apply Button */}
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/contact"
                  className="block w-full text-center py-3 rounded-lg text-white font-bold transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  onClick={() => setSelectedJob(null)}
                >
                  Apply for This Position
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to About Link */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/about" 
          className="inline-flex items-center gap-2 text-sm hover:underline"
          style={{ color: colors.primary }}
        >
          ← Back to About iKPACE
        </Link>
      </div>
    </div>
  );
}