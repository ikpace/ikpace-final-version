import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, Clock, Users, Star, Award, BookOpen, 
  CheckCircle, PlayCircle, FileText, Download, 
  Share2, Bookmark, Heart, MessageCircle, Calendar,
  ChevronRight, Target, Zap, Globe, Shield,
  Briefcase, Code, Palette, Rocket, Brain, Crown
} from 'lucide-react'

export default function CourseDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [bookmarked, setBookmarked] = useState(false)

  // Course data based on ID
  const courseData = {
    'virtual-assistant-pro': {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      subtitle: 'Master VA skills, client management, and remote work tools',
      description: 'Become a certified Virtual Assistant in just 6 weeks. Learn email management, calendar scheduling, social media assistance, and client communication skills.',
      fullDescription: 'This comprehensive 6-week program covers everything you need to become a professional virtual assistant. From communication mastery to client acquisition strategies, you will learn to manage emails, calendars, documents, and social media for clients worldwide. Graduate with a professional portfolio and certification.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks (2-3 classes/week)',
      students: 3247,
      rating: 4.9,
      category: 'Career',
      level: 'Beginner',
      instructor: 'Amara Osei - VA Business Coach',
      instructorBio: 'Amara has trained over 2,000 virtual assistants and runs her own successful VA agency. She brings real-world experience and proven strategies to help you launch your VA career.',
      instructorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      features: [
        'Professional certificate',
        'Portfolio creation',
        'Client acquisition guide',
        'Lifetime access',
        'Community support',
        '1-on-1 mentorship'
      ],
      learningOutcomes: [
        'Master professional email & calendar management',
        'Use Google Workspace and file management systems',
        'Manage social media scheduling and engagement',
        'Build a CV, portfolio, and acquire clients',
        'Complete a final VA portfolio and mock client task',
        'Understand VA services and work ethics'
      ],
      curriculum: [
        {
          week: 1,
          title: 'Introduction to Virtual Assistance',
          topics: ['What is a Virtual Assistant?', 'Types of VA services', 'Work ethics & professionalism']
        },
        {
          week: 2,
          title: 'Communication & Email Management',
          topics: ['Professional email writing', 'Calendar management', 'Scheduling tools']
        },
        {
          week: 3,
          title: 'Administrative Tools',
          topics: ['Google Workspace', 'Document organization', 'File management systems']
        },
        {
          week: 4,
          title: 'Social Media Assistance',
          topics: ['Content scheduling', 'Basic engagement management', 'Using scheduling tools']
        },
        {
          week: 5,
          title: 'Client Acquisition',
          topics: ['Creating a CV & portfolio', 'Freelance platforms overview', 'Pricing your services']
        },
        {
          week: 6,
          title: 'Final Project',
          topics: ['Create VA portfolio', 'Mock client task', 'Certification']
        }
      ],
      testimonials: [
        {
          name: 'Fatima Abdi',
          role: 'Freelance VA',
          text: 'Landed 3 clients within my first month after completing this course!'
        },
        {
          name: 'Grace Mensah',
          role: 'Remote Worker',
          text: 'The portfolio project was incredibly helpful for showcasing my skills.'
        }
      ],
      requirements: [
        'Computer with internet',
        'Basic computer literacy',
        'Professional attitude',
        'Time management skills'
      ],
      toolsNeeded: [
        'Google Workspace',
        'Google Calendar',
        'Scheduling tools',
        'Email client'
      ]
    },
    'social-media-marketing': {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      subtitle: 'Master content creation, ads, and growth strategies',
      description: 'Learn to create engaging content, run effective ad campaigns, and grow your social media presence.',
      fullDescription: 'This 6-week social media marketing course takes you from understanding platforms to creating full campaign strategies. Learn content planning, branding, paid promotions, analytics tracking, and present your own marketing campaign as a final project.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 2156,
      rating: 4.8,
      category: 'Marketing',
      level: 'Beginner',
      instructor: 'Kofi Asante - Digital Marketing Expert',
      instructorBio: 'Kofi has managed social media for major brands and has helped hundreds of students master digital marketing.',
      instructorImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg',
      features: [
        'Campaign templates',
        'Analytics guide',
        'Certificate',
        'Community access',
        'Ad credits',
        'Portfolio project'
      ],
      learningOutcomes: [
        'Understand all major social media platforms',
        'Create effective content & caption strategies',
        'Build a personal brand with visual consistency',
        'Run paid ads and boost posts effectively',
        'Track analytics and improve performance',
        'Create and present a full campaign plan'
      ],
      curriculum: [
        {
          week: 1,
          title: 'Social Media Basics',
          topics: ['Platforms overview', 'Understanding target audience']
        },
        {
          week: 2,
          title: 'Content Creation Strategy',
          topics: ['Content planning', 'Writing captions', 'Hashtags & trends']
        },
        {
          week: 3,
          title: 'Branding & Positioning',
          topics: ['Personal brand building', 'Visual consistency']
        },
        {
          week: 4,
          title: 'Ads & Promotions',
          topics: ['Introduction to paid ads', 'Boosting posts']
        },
        {
          week: 5,
          title: 'Analytics & Growth',
          topics: ['Insights & engagement tracking', 'Improving performance']
        },
        {
          week: 6,
          title: 'Campaign Project',
          topics: ['Create full campaign plan', 'Present strategy']
        }
      ]
    },
    'canva-graphic-design': {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      subtitle: 'Create stunning designs, logos, and branding materials',
      description: 'Learn to create professional designs using Canva. Master typography, color theory, and branding.',
      fullDescription: 'This 4-week course teaches you everything from color theory and typography to creating logos, flyers, posters, and complete social media branding kits using Canva. Graduate with a professional portfolio showcasing your design skills.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 2890,
      rating: 4.9,
      category: 'Design',
      level: 'Beginner',
      instructor: 'Esi Darkwah - Graphic Designer',
      instructorBio: 'Esi has been a professional graphic designer for 8 years and has helped thousands learn Canva.',
      instructorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      features: [
        'Design templates',
        'Portfolio project',
        'Certificate',
        'Lifetime access',
        'Canva Pro trial',
        'Resource library'
      ],
      learningOutcomes: [
        'Understand color theory, fonts & layout principles',
        'Master Canva templates, custom designs & background removal',
        'Design logos, flyers & posters',
        'Create a complete social media branding kit',
        'Build a professional design portfolio'
      ]
    },
    'smart-kids-coding': {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      subtitle: 'Fun coding for kids with Scratch and game creation',
      description: 'Introduce kids to coding through fun projects and games using Scratch.',
      fullDescription: 'This exciting 4-week coding program is designed for children ages 6-12. Using Scratch, kids learn coding fundamentals through fun projects — building animations, stories, and their very own games. The course culminates in a final game project with a presentation and certificate ceremony.',
      price: 7,
      originalPrice: 35,
      duration: '4 Weeks (Ages 6-12)',
      students: 1567,
      rating: 4.9,
      category: 'Kids',
      level: 'Beginner',
      instructor: 'Ms. Akosua - Kids Coding Instructor',
      instructorBio: 'Ms. Akosua has been teaching kids coding for 5 years and makes learning fun and engaging.',
      instructorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg',
      features: [
        'Fun projects',
        'Certificate',
        'Game creation',
        'Parent updates',
        'Scratch account',
        'Community showcase'
      ],
      learningOutcomes: [
        'Understand what coding is and why it matters',
        'Learn Scratch basics and interface',
        'Create animations and interactive stories',
        'Build games with characters and scoring',
        'Present a personal game project',
        'Receive a certificate of completion'
      ]
    },
    'freelancing-online-income': {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      subtitle: 'Start earning online with freelancing skills',
      description: 'Learn how to start freelancing, find clients, and build sustainable online income.',
      fullDescription: 'This practical 4-week course teaches you how to launch your freelancing career from scratch. Learn to create winning profiles, write compelling proposals, find and retain clients, set up payment methods, and build a long-term sustainable freelance business.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 3210,
      rating: 4.8,
      category: 'Business',
      level: 'Beginner',
      instructor: 'Samuel Ofori - Freelance Business Coach',
      instructorBio: 'Samuel has been a successful freelancer for 10 years and has helped thousands start their freelance journey.',
      instructorImage: 'https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg',
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg',
      features: [
        'Profile templates',
        'Proposal guide',
        'Pricing calculator',
        'Certificate',
        'Payment setup guide',
        'Client communication scripts'
      ],
      learningOutcomes: [
        'Understand the freelancing landscape & popular skills',
        'Create a winning portfolio and online profile',
        'Write proposals that get responses',
        'Find jobs and communicate with clients effectively',
        'Set up payment methods for international clients',
        'Build long-term client relationships'
      ]
    }
  }

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      if (courseData[id]) {
        setCourse(courseData[id])
      } else {
        // Redirect to courses if not found
        navigate('/courses')
      }
      setLoading(false)
    }, 500)
  }, [id, navigate])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleEnroll = () => {
    navigate(`/checkout/${id}`)
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#1A3D7C] border-t-transparent mx-auto mb-6"></div>
          <h3 className="text-2xl font-semibold text-[#1A3D7C] mb-2">Loading Course Details</h3>
          <p className="text-gray-600">Please wait...</p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <BookOpen size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-[#1A3D7C] mb-4">Course Not Found</h2>
          <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
          <Link to="/courses" className="bg-[#1A3D7C] text-white px-6 py-3 rounded-lg inline-flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-[#1A3D7C] mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-3xl p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-6">{course.subtitle}</p>
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="fill-yellow-400 text-yellow-400" size={20} />
                  <span className="font-bold">{course.rating}</span>
                  <span className="text-white/70">({course.students} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={20} />
                  <span>{course.students}+ students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleEnroll}
                  className="bg-white text-[#1A3D7C] px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2"
                >
                  Enroll Now - ${course.price}
                </button>
                <button
                  onClick={handleBookmark}
                  className="bg-white/20 px-4 py-4 rounded-xl hover:bg-white/30 transition-colors"
                >
                  {bookmarked ? <Heart className="fill-red-500 text-red-500" /> : <Heart />}
                </button>
                <button className="bg-white/20 px-4 py-4 rounded-xl hover:bg-white/30 transition-colors">
                  <Share2 />
                </button>
              </div>
            </div>
            <div className="md:w-80 h-64 bg-white/10 rounded-2xl overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex border-b border-gray-200 overflow-x-auto">
                {['overview', 'curriculum', 'instructor', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 font-medium capitalize whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? 'text-[#FF7A00] border-b-2 border-[#FF7A00]'
                        : 'text-gray-600 hover:text-[#1A3D7C]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">About This Course</h3>
                      <p className="text-gray-700 leading-relaxed">{course.fullDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">What You'll Learn</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.learningOutcomes?.map((outcome, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Features</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.features?.map((feature, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {activeTab === 'curriculum' && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Course Curriculum</h3>
                    {course.curriculum?.map((module, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="bg-gray-50 p-4">
                          <h4 className="font-bold text-[#1A3D7C]">
                            Week {module.week}: {module.title}
                          </h4>
                        </div>
                        <div className="p-4">
                          <ul className="space-y-2">
                            {module.topics.map((topic, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <PlayCircle size={16} className="text-[#FF7A00] flex-shrink-0 mt-1" />
                                <span className="text-gray-700 text-sm">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'instructor' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Your Instructor</h3>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={course.instructorImage}
                          alt={course.instructor}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-xl font-bold text-[#1A3D7C] mb-2">
                            {course.instructor?.split(' - ')[0]}
                          </h4>
                          <p className="text-gray-600 mb-4">{course.instructor?.split(' - ')[1]}</p>
                          <p className="text-gray-700">{course.instructorBio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">Student Reviews</h3>
                    {course.testimonials?.map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-6 mb-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1A3D7C]">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                            <p className="text-gray-700">"{testimonial.text}"</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-[#1A3D7C] mb-4">This Course Includes</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-gray-700">
                  <Clock size={18} className="text-[#FF7A00]" />
                  <span>{course.duration}</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Award size={18} className="text-[#FF7A00]" />
                  <span>Certificate of Completion</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Globe size={18} className="text-[#FF7A00]" />
                  <span>Lifetime Access</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <Download size={18} className="text-[#FF7A00]" />
                  <span>Downloadable Resources</span>
                </li>
                <li className="flex items-center gap-2 text-gray-700">
                  <MessageCircle size={18} className="text-[#FF7A00]" />
                  <span>Community Support</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#1A3D7C] to-[#FF7A00] rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Start Learning Today</h3>
              <p className="text-white/90 mb-4">Get unlimited access to this course and more</p>
              <div className="text-3xl font-bold mb-2">${course.price}</div>
              <p className="text-sm text-white/80 mb-6">One-time payment • Lifetime access</p>
              <button
                onClick={handleEnroll}
                className="w-full bg-white text-[#1A3D7C] py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}