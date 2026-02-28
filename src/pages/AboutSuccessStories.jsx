import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Star, Users, Award, TrendingUp, Briefcase, Globe,
  ChevronRight, Quote, ThumbsUp, MessageCircle, Share2,
  PlayCircle, BookOpen, GraduationCap, Target, Zap,
  Heart, Sparkles, Rocket, Medal, Crown, Gem, Coffee,
  MapPin, Calendar, DollarSign, CheckCircle, ArrowRight,
  Filter, Search, X
} from 'lucide-react';

export default function AboutSuccessStories() {
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
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStory, setSelectedStory] = useState(null);

  // Success Stories Data - ALL NEW UNIQUE IMAGES
  const successStories = [
    {
      id: 1,
      name: 'Isabelle Moreau',
      location: 'Paris, France',
      course: 'Virtual Assistant Professional',
      courseId: 'virtual-assistant-pro',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👩🏻',
      achievement: 'Landed first VA client within 3 weeks',
      story: 'After completing the VA course, I started applying for positions on Upwork. Within 3 weeks, I landed my first client and now work 20 hours a week while traveling.',
      fullStory: 'I was working a 9-to-5 job that left me exhausted and unfulfilled. The Virtual Assistant course gave me the skills and confidence to start freelancing. Within 3 weeks of completing the course, I landed my first client. Six months later, I have 3 regular clients, work from anywhere, and earn more than my previous salary.',
      rating: 5,
      outcome: 'Started freelance career',
      earnings: '$2,500+ earned',
      timeframe: '3 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The portfolio project was key to landing my first client. The course gave me exactly what I needed.'
    },
    {
      id: 2,
      name: 'James Chen',
      location: 'Singapore',
      course: 'Social Media Marketing',
      courseId: 'social-media-marketing',
      image: 'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👨🏻',
      achievement: 'Doubled engagement for local business',
      story: 'Applied course strategies to my family\'s restaurant and grew Instagram followers by 300% in 2 months.',
      fullStory: 'My family runs a small restaurant in Singapore. After taking the Social Media Marketing course, I implemented the strategies I learned. Within 2 months, our Instagram grew from 500 to 2,000 followers, and we saw a 40% increase in customers mentioning our social media posts.',
      rating: 5,
      outcome: 'Business growth',
      earnings: '40% revenue increase',
      timeframe: '2 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The practical exercises made it easy to apply everything immediately.'
    },
    {
      id: 3,
      name: 'Sofia Laurent',
      location: 'Barcelona, Spain',
      course: 'Canva & Graphic Design',
      courseId: 'canva-graphic-design',
      image: 'https://images.pexels.com/photos/247917/pexels-photo-247917.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👩🏻',
      achievement: 'Started freelance design business',
      story: 'Built a portfolio in 4 weeks and landed 3 design clients within first month of freelancing.',
      fullStory: 'I always loved design but never had formal training. The Canva course taught me everything I needed to create professional designs. I built my portfolio during the course, and within a month of graduating, I had 3 design clients. Now I work with 8 regular clients and love what I do.',
      rating: 5,
      outcome: 'Full-time freelancer',
      earnings: '$3,000+ monthly',
      timeframe: '4 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The portfolio project was the highlight. It gave me real work to show clients.'
    },
    {
      id: 4,
      name: 'Thomas Weber',
      location: 'Berlin, Germany',
      course: 'AI Prompt Engineering',
      courseId: 'ai-prompt-engineering',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👨🏻',
      achievement: 'Automated content creation for agency',
      story: 'Implemented AI workflows that saved 15 hours per week for a marketing agency.',
      fullStory: 'I was working at a marketing agency and spending hours on content creation. After the AI course, I built prompt libraries and workflows that automated 70% of our content generation. The agency now produces twice the content in half the time, and I got promoted to lead the AI initiative.',
      rating: 5,
      outcome: 'Promotion at work',
      earnings: '30% salary increase',
      timeframe: '6 weeks',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'This course paid for itself in the first week. Game-changing skills.'
    },
    {
      id: 5,
      name: 'Elena Rossi',
      location: 'Milan, Italy',
      course: 'Freelancing & Online Income',
      courseId: 'freelancing-online-income',
      image: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👩🏻',
      achievement: 'Quit 9-5 to freelance full-time',
      story: 'Built freelance income to replace full-time salary in 4 months.',
      fullStory: 'I was dreaming of leaving my corporate job but didn\'t know how to start. The freelancing course gave me a step-by-step plan. I started with small projects on weekends, and within 4 months, my freelance income matched my salary. I quit my job and now work with clients from around the world.',
      rating: 5,
      outcome: 'Location independent',
      earnings: '$4,500+ monthly',
      timeframe: '4 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The proposal templates alone were worth the course price.'
    },
    {
      id: 6,
      name: 'Marcus Schmidt',
      location: 'Vienna, Austria',
      course: 'Smart Kids Coding',
      courseId: 'smart-kids-coding',
      image: 'https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👨🏻',
      achievement: 'Son built his first video game',
      story: 'My 9-year-old son created his own game and now teaches coding to classmates.',
      fullStory: 'I enrolled my son in the Kids Coding course to introduce him to programming. He absolutely loved it! By the end, he had built his own game with characters and scoring. Now he runs a coding club at his school and teaches his classmates. The confidence boost has been incredible.',
      rating: 5,
      outcome: 'Child discovered passion',
      earnings: 'Priceless',
      timeframe: '4 weeks',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'Best investment in my child\'s future. He\'s now obsessed with coding.'
    },
    {
      id: 7,
      name: 'Anna Kowalski',
      location: 'Warsaw, Poland',
      course: 'Virtual Assistant Professional',
      courseId: 'virtual-assistant-pro',
      image: 'https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👩🏻',
      achievement: 'Started VA business serving 5 clients',
      story: 'Built a VA business from scratch and now manages 5 recurring clients.',
      fullStory: 'I started the VA course with no experience. Within 3 months of graduating, I had 3 clients. Now, 6 months later, I manage 5 regular clients and have hired my first subcontractor to help with the workload.',
      rating: 5,
      outcome: 'Business owner',
      earnings: '$3,800+ monthly',
      timeframe: '6 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The course gave me both skills and confidence to start my own business.'
    },
    {
      id: 8,
      name: 'David O\'Brien',
      location: 'Dublin, Ireland',
      course: 'AI Prompt Engineering',
      courseId: 'ai-prompt-engineering',
      image: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👨🏻',
      achievement: 'Created AI tools for local businesses',
      story: 'Built custom AI solutions for 3 local businesses, saving them 20+ hours per week.',
      fullStory: 'After the AI course, I started offering prompt engineering services to local businesses. I built custom workflows for a marketing agency, a real estate firm, and a law office. They now save 20+ hours per week combined, and I have a growing side business.',
      rating: 5,
      outcome: 'Side business launched',
      earnings: '$2,200+ monthly',
      timeframe: '2 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The practical projects made it easy to start offering services immediately.'
    },
    {
      id: 9,
      name: 'Maria Santos',
      location: 'Lisbon, Portugal',
      course: 'Canva & Graphic Design',
      courseId: 'canva-graphic-design',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop',
      icon: '👩🏻',
      achievement: 'Opened Etsy shop selling designs',
      story: 'Started an Etsy shop selling Canva templates and made first sale within 2 weeks.',
      fullStory: 'I took the Canva course wanting to learn design for my own projects. During the course, I realized I could create templates to sell. I opened an Etsy shop and made my first sale within 2 weeks. Now I sell templates worldwide and earn passive income while traveling.',
      rating: 5,
      outcome: 'Passive income',
      earnings: '$1,800+ monthly',
      timeframe: '3 months',
      social: {
        linkedin: '#',
        twitter: '#'
      },
      testimonial: 'The course taught me skills that now generate income while I sleep!'
    }
  ];

  // Filtered stories based on course and search
  const filteredStories = successStories.filter(story => {
    const matchesCourse = selectedCourse === 'all' || story.courseId === selectedCourse;
    const matchesSearch = story.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  // Course filter options
  const courseFilters = [
    { id: 'all', name: 'All Stories', icon: <Users size={16} /> },
    { id: 'virtual-assistant-pro', name: 'VA Pro', icon: <Briefcase size={16} /> },
    { id: 'social-media-marketing', name: 'Marketing', icon: <TrendingUp size={16} /> },
    { id: 'canva-graphic-design', name: 'Design', icon: <Gem size={16} /> },
    { id: 'smart-kids-coding', name: 'Kids', icon: <GraduationCap size={16} /> },
    { id: 'freelancing-online-income', name: 'Freelancing', icon: <Globe size={16} /> },
    { id: 'ai-prompt-engineering', name: 'AI', icon: <Zap size={16} /> }
  ];

  // Achievement stats
  const stats = [
    { label: 'Success Stories', value: '130+', icon: <Users size={24} /> },
    { label: 'Courses Completed', value: '6', icon: <BookOpen size={24} /> },
    { label: 'Income Generated', value: '$250K+', icon: <DollarSign size={24} /> },
    { label: 'Countries', value: '15+', icon: <Globe size={24} /> }
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
            <Sparkles size={16} />
            Real Stories from Real Students
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Success <span style={{ color: colors.secondary }}>Stories</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Meet our graduates who transformed their careers and lives through practical learning.
            Every story is real, every achievement is genuine.
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

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-80 relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search stories..."
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

            {/* Course Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {courseFilters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCourse(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCourse === filter.id
                      ? 'text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={selectedCourse === filter.id ? { background: colors.secondary } : {}}
                >
                  {filter.icon}
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredStories.length} success stories
          </div>
        </div>
      </section>

      {/* Success Stories Grid */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div 
                key={story.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                {/* Card Header with Image */}
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop';
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: colors.primary }}>
                    {story.course}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <MapPin size={12} className="text-white" />
                    <span className="text-white text-xs">{story.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Name and Rating */}
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{story.name}</h3>
                    <span className="text-2xl">{story.icon}</span>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Achievement */}
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold" style={{ background: colors.success + '15', color: colors.success }}>
                      {story.achievement}
                    </span>
                  </div>

                  {/* Story Preview */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    "{story.story}"
                  </p>

                  {/* Outcome Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                      <Calendar size={10} />
                      {story.timeframe}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 flex items-center gap-1">
                      <DollarSign size={10} />
                      {story.earnings}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedStory(story)}
                      className="flex-1 text-sm font-medium py-2 rounded-lg transition-all hover:scale-105"
                      style={{ background: colors.primary + '10', color: colors.primary }}
                    >
                      Read Full Story
                    </button>
                    <Link
                      to={`/course/${story.courseId}`}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition-all hover:bg-gray-100"
                      style={{ color: colors.secondary }}
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="text-center py-16">
              <Search size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No stories found</h3>
              <p className="text-gray-600">Try adjusting your filters or search term</p>
              <button
                onClick={() => {
                  setSelectedCourse('all');
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
      </section>

      {/* Featured Success Story - Large Card */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '10', color: colors.secondary }}>
              FEATURED STORY
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              From Student to <span style={{ color: colors.primary }}>Success</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img 
                  src="https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Featured student Elena Rossi"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 text-white">
                <Quote size={40} className="text-white/20 mb-4" />
                <p className="text-xl leading-relaxed mb-6">
                  "The freelancing course didn't just teach me skills — it gave me a complete roadmap to build my business. 
                  Within 4 months, I replaced my full-time income and gained the freedom to work from anywhere."
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xl mb-1">Elena Rossi</h4>
                    <p className="text-white/70">Milan, Italy</p>
                    <div className="flex items-center gap-2 mt-2">
                      <DollarSign size={16} className="text-green-400" />
                      <span className="text-green-400 font-bold">$4,500+ monthly</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Our <span style={{ color: colors.secondary }}>Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from our growing community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.primary + '15', color: colors.primary }}>
                <Users size={24} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>130+</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.secondary + '15', color: colors.secondary }}>
                <Briefcase size={24} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.secondary }}>45+</div>
              <div className="text-sm text-gray-600">New Careers</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.success + '15', color: colors.success }}>
                <DollarSign size={24} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.success }}>$250K+</div>
              <div className="text-sm text-gray-600">Income Generated</div>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.accent + '15', color: colors.accent }}>
                <Globe size={24} />
              </div>
              <div className="text-3xl font-bold mb-1" style={{ color: colors.accent }}>15+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              TESTIMONIALS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              What Our <span style={{ color: colors.secondary }}>Students Say</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.slice(0, 3).map(story => (
              <div key={story.id} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                <Quote size={24} style={{ color: colors.primary }} className="mb-3" />
                <p className="text-gray-700 mb-4">"{story.testimonial}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={story.image} 
                    alt={story.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{story.name}</h4>
                    <p className="text-sm text-gray-500">{story.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your Own Success Story?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Join 130+ students who have already transformed their careers.
            Every course is just $7 with lifetime access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Browse All Courses
            </Link>
            <Link
              to="/community"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Join Community Free
            </Link>
          </div>
        </div>
      </section>

      {/* Modal for Full Story */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <img 
                src={selectedStory.image} 
                alt={selectedStory.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                <MapPin size={14} className="text-white" />
                <span className="text-white text-sm">{selectedStory.location}</span>
              </div>
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedStory.name}</h2>
              <p className="text-sm font-medium mb-4" style={{ color: colors.secondary }}>{selectedStory.course}</p>
              <div className="flex items-center gap-2 mb-4">
                {[...Array(selectedStory.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{selectedStory.fullStory}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">Outcome</div>
                  <div className="font-bold text-gray-900">{selectedStory.outcome}</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-sm text-gray-500">Earnings</div>
                  <div className="font-bold text-gray-900">{selectedStory.earnings}</div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/course/${selectedStory.courseId}`}
                  className="flex-1 text-center py-3 rounded-lg text-white font-bold transition-all hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  onClick={() => setSelectedStory(null)}
                >
                  View This Course
                </Link>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="px-6 py-3 rounded-lg border-2 font-medium hover:bg-gray-50 transition-all"
                  style={{ borderColor: colors.primary, color: colors.primary }}
                >
                  Close
                </button>
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