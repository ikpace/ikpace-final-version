import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, Star, CheckCircle, TrendingUp, Clock, Sparkles, Target, Globe, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export default function Landing() {


 const testimonials = [
  {
    name: "Kwame Mensah",
    role: "Marketing Manager",
    text: "iKPACE transformed my career. The courses are practical and immediately applicable.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1535745318714-da922ca9cc81?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Aisha Bello",
    role: "Freelancer",
    text: "Best investment in my education. The community support alone is worth it.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1583994009785-37ec30bf9342?q=80&w=388&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Thabo Ndlovu",
    role: "Software Developer",
    text: "The hands-on projects gave me real-world skills I now use daily in my job.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/54.jpg"
  },
  {
    name: "Zainab Ibrahim",
    role: "Digital Strategist",
    text: "The AI tools and mentorship helped me scale my business faster than I imagined.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1559172802-f5de3d1ed91d?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Chinedu Okoro",
    role: "Business Owner",
    text: "The AI course helped me automate 80% of my content creation. Amazing ROI!",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/63.jpg"
  }
];


<<<<<<< HEAD
  // Slide navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Clean Course Data - REMOVED instructor names and original prices
  const courses = [
    {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Pro',
      description: 'Master VA skills, client management, and remote work tools',
      duration: '6 Weeks',
      hours: 60,
      students: '32',
      enrolled: 32,
      rating: 4.9,
      reviews: 18,
      price: 7,
      category: 'Career',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#1A3D7C] to-[#FF7A00]',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Client Management', 'Email', 'Calendar'],
      icon: '👩🏾'
    },
    {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      description: 'Master content creation, ads, and growth strategies',
      duration: '6 Weeks',
      hours: 55,
      students: '28',
      enrolled: 28,
      rating: 4.8,
      reviews: 15,
      price: 7,
      category: 'Marketing',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#FF7A00] to-[#FF9A3C]',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Content', 'Ads', 'Analytics'],
      icon: '👨🏾'
    },
    {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      description: 'Create stunning designs, logos, and branding materials',
      duration: '4 Weeks',
      hours: 40,
      students: '19',
      enrolled: 19,
      rating: 4.7,
      reviews: 12,
      price: 7,
      category: 'Design',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#008F4C] to-[#00C853]',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Logo', 'Social Graphics', 'Branding'],
      icon: '👩🏾'
    },
    {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      description: 'Fun coding for kids with Scratch and game creation',
      duration: '4 Weeks',
      hours: 30,
      students: '12',
      enrolled: 12,
      rating: 4.9,
      reviews: 8,
      price: 7,
      category: 'Kids',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#FF6D00] to-[#FFD600]',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Scratch', 'Games', 'Animation'],
      icon: '👨🏾'
    },
    {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      description: 'Start earning online with freelancing skills',
      duration: '4 Weeks',
      hours: 35,
      students: '21',
      enrolled: 21,
      rating: 4.8,
      reviews: 14,
      price: 7,
      category: 'Business',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#00C853] to-[#B2FF59]',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Upwork', 'Clients', 'Pricing'],
      icon: '👩🏾'
    },
    {
      id: 'ai-prompt-engineering',
      title: 'AI Prompt Engineering',
      description: 'Master AI tools for content creation',
      duration: '6 Weeks',
      hours: 45,
      students: '18',
      enrolled: 18,
      rating: 4.9,
      reviews: 11,
      price: 7,
      category: 'Tech',
      level: 'Intermediate',
      badge: 'New',
      color: 'from-[#4A6FA5] to-[#2F5EA8]',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['ChatGPT', 'Midjourney', 'Automation'],
      icon: '👨🏾'
    }
  ];

  const categories = ['all', 'Career', 'Marketing', 'Design', 'Kids', 'Business', 'Tech'];
  
  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(c => c.category === selectedCategory);

  const toggleSaveCourse = (courseId) => {
    setSavedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const totalStudents = courses.reduce((acc, course) => acc + course.enrolled, 0);

  // Honest testimonials from real students
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      text: "The VA course gave me the confidence to start freelancing. I'm now working with my first client.",
      rating: 5,
      image: "👩‍💼",
      achievement: "Started freelancing",
      course: "VA Professional"
    },
    {
      name: "Michael Chen",
      role: "Student",
      text: "Good introduction to freelancing. The instructors are helpful and responsive.",
      rating: 4,
      image: "👨‍💻",
      achievement: "Learning new skills",
      course: "Freelancing"
    },
    {
      name: "Amina Okafor",
      role: "Student",
      text: "The AI course helped me understand how to use AI tools for my content creation.",
      rating: 5,
      image: "👩‍💼",
      achievement: "Learning AI tools",
      course: "AI Content"
    },
    {
      name: "James Wilson",
      role: "Student",
      text: "The Canva course was easy to follow. I'm now designing for my small business.",
      rating: 5,
      image: "👨‍💼",
      achievement: "Started designing",
      course: "Canva Design"
    },
    {
      name: "Patience Mensah",
      role: "Student",
      text: "My son loves the kids coding class. He's learning while having fun.",
      rating: 5,
      image: "👩‍👦",
      achievement: "Happy parent",
      course: "Kids Coding"
    }
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  // Core features
  const coreFeatures = [
    {
      icon: <BookOpen size={24} />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals",
      color: colors.primary
    },
    {
      icon: <Users size={24} />,
      title: "Community Support",
      description: "Connect with fellow learners",
      color: colors.secondary
    },
    {
      icon: <Award size={24} />,
      title: "Get Certified",
      description: "Earn recognized certificates",
      color: colors.accent
    },
    {
      icon: <Clock size={24} />,
      title: "Learn at Your Pace",
      description: "Self-paced online learning",
      color: colors.success
    },
    {
      icon: <Shield size={24} />,
      title: "7-Day Guarantee",
      description: "Money-back if not satisfied",
      color: colors.blueShade
    },
    {
      icon: <Globe size={24} />,
      title: "Access Anywhere",
      description: "On mobile, tablet, or desktop",
      color: colors.orangeShade
    }
  ];
=======
   const [currentIndex, setCurrentIndex] = useState(0);
   const [paused, setPaused] = useState(false);
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6

  // Auto Slide
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 2 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [paused, testimonials.length]);


  const popularCourses = [
    {
      id: "1",
      title: "Digital Marketing Mastery",
      description: "Complete strategy for online marketing success",
      price: 7.00,
      students: "1,247+",
      rating: 4.9,
      duration: "8 weeks",
      badge: "BESTSELLER"
    },
    {
      id: "2",
      title: "AI Content Creation Pro", 
      description: "Master AI tools for automated content creation",
      price: 7.00,
      students: "892+",
      rating: 4.8,
      duration: "6 weeks",
      badge: "TRENDING"
    },
    {
      id: "3",
      title: "Social Media Ads Expert",
      description: "Advanced advertising across all platforms",
      price: 9.00,
      students: "567+",
      rating: 4.7,
      duration: "4 weeks",
      badge: "POPULAR"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Community Support",
      description: "Join 10,000+ learners in our active community"
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: "Certification",
      description: "Get certified and boost your career prospects"
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with lifetime access"
    }
  ];



  return (
    <div className="min-h-screen">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-accent-yellow via-secondary to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="font-bold text-lg">
            ?? LIMITED TIME: Get 3 courses for $18 (Save $3!) �{" "}
            <Link to="/pricing" className="underline font-extrabold">
              Claim Offer Now ?
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Sparkles size={20} />
              <span className="font-medium">Trusted by 10,000+ learners worldwide</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Master <span className="text-secondary-light">Digital Skills</span>,
              <br />
              <span className="text-accent-yellow">Transform Your Career</span>
            </h1>
            <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Join thousands building practical digital skills with AI-powered learning, 
              expert instruction, and a supportive global community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/courses"
                className="group bg-white text-primary hover:bg-gray-100 font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3"
              >
                Start Learning Now � $7/course
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/pricing"
                className="bg-transparent border-3 border-white text-white hover:bg-white/10 font-bold text-xl px-12 py-5 rounded-full transition-all"
              >
                View All Plans
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-gray-300">Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9?</div>
                <div className="text-gray-300">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-gray-300">Completion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-primary">iKPACE</span> Stands Out
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in the digital economy
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Courses Section - Clean & Simple - MODIFIED AS REQUESTED */}
      <section className="py-12" style={{ background: colors.lightGray }}>
=======
      {/* Popular Courses Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-primary text-white px-6 py-2 rounded-full font-bold text-lg">
                MOST POPULAR PROGRAMS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top-Rated Courses
            </h2>
<<<<<<< HEAD
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your journey today for just $7
            </p>
          </div>

          {/* Category Filter - Simple */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? 'text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
                style={selectedCategory === cat ? { background: colors.secondary } : {}}
              >
                {cat === 'all' ? 'All Courses' : cat}
              </button>
            ))}
          </div>

          {/* Clean Course Cards - MODIFIED: No instructor names, only $7 price, single View Details button */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: colors.primary }}>
=======
            <p className="text-2xl text-gray-600">
              Start with any course - they're all beginner-friendly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {popularCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-yellow text-gray-900 px-4 py-1 rounded-full font-bold text-sm">
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
                      {course.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="text-3xl font-bold text-white">${course.price.toFixed(2)}</div>
                    <div className="text-white/90">per course</div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-2" />
                      {course.duration}
                    </span>
                    <span className="flex items-center text-amber-600 font-bold">
                      <Star size={18} className="fill-current mr-1" />
                      {course.rating}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  <div className="flex items-center justify-between mb-8">
                    <span className="flex items-center text-gray-600">
                      <Users size={18} className="mr-2" />
                      {course.students} students
                    </span>
                  </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="block w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl text-center text-lg transition-colors"
                  >
<<<<<<< HEAD
                    <Heart 
                      size={14} 
                      className={savedCourses.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                    />
                  </button>
                </div>

                {/* Simple Content - NO INSTRUCTOR NAMES */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  
                  {/* Level Badge Only - Removed instructor */}
                  <div className="flex justify-end mb-3">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full">
                      {course.level}
                    </span>
                  </div>

                  {/* Features - 3 Only */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.features.map((feature, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Simple Stats */}
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-current" /> {course.rating}
                    </span>
                  </div>

                  {/* Price & Single View Details Button - BRIGHT COLOR */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold" style={{ color: colors.primary }}>${course.price}</span>
                      <span className="text-xs text-gray-500 ml-2">one-time</span>
                    </div>
                    <Link
                      to={`/course/${course.id}`}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full text-sm font-semibold text-white shadow-md hover:scale-105 transition-all"
                      style={{ background: colors.secondary }}
                    >
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
=======
                    View Course Details
                  </Link>
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
                </div>
              </div>
            ))}
          </div>

<<<<<<< HEAD
          {/* View All Button */}
          <div className="text-center mt-8">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:scale-105 transition-all shadow-md"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              Browse All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* iKPACE Advantage - Professional Section */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: colors.primary + '10', color: colors.primary }}>
                ⭐ THE iKPACE ADVANTAGE
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                More Than Just{' '}
                <span style={{ color: colors.secondary }}>Technical Skills</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                iKPACE goes beyond technical training to prepare you for a successful career. Our unique Professional Foundations program focuses on vital soft skills like teamwork, communication, and time management, giving you the edge you need to stand out. Combined with cutting-edge technical skills, you'll be ready to get hired and thrive in any professional environment.
              </p>

              {/* Key Differentiators */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.primary + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.primary }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Technical Excellence</h4>
                    <p className="text-sm text-gray-600">Industry-relevant curriculum</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.secondary + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.secondary }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Soft Skills Mastery</h4>
                    <p className="text-sm text-gray-600">Communication & leadership</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.success + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.success }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Career Coaching</h4>
                    <p className="text-sm text-gray-600">Resume & interview prep</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.accent + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.accent }}>✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Job Readiness</h4>
                    <p className="text-sm text-gray-600">Real-world projects</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Link
                to="/register"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white hover:scale-105 transition-all shadow-lg group"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
              >
                Start Your Journey Today 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-xs text-gray-600">94% satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-xs text-gray-600">130+ hours content</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-green-600 text-xs">✓</span>
                  </div>
                  <span className="text-xs text-gray-600">6 courses</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Students learning together"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary}40, transparent)` }}></div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center" style={{ color: colors.primary }}>
                    <Users size={16} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Community</div>
                    <div className="font-bold text-gray-900">130+ learners</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center" style={{ color: colors.secondary }}>
                    <Star size={16} className="fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="font-bold text-gray-900">4.8/5</div>
                  </div>
                </div>
              </div>

              {/* Success Story Badge */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-xl p-4 max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">🎓</span>
                  <div>
                    <div className="text-xs text-gray-500">Success Story</div>
                    <div className="font-bold text-sm text-gray-900">Sarah J.</div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">"Now freelancing full-time"</p>
                <div className="flex mt-2">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={12} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-4 w-24 h-24 rounded-full opacity-20 blur-2xl" style={{ background: colors.secondary }}></div>
              <div className="absolute bottom-1/4 -left-4 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: colors.primary }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Community */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
                🤝 COMMUNITY
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Learn with <span style={{ color: colors.secondary }}>Others</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Connect with fellow students and instructors.
              </p>
              <Link
                to="/community"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:scale-105 transition-all shadow-md"
                style={{ background: colors.secondary }}
              >
                Join Community <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm">8 online now</span>
              </div>
              <div className="flex -space-x-2 mb-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ background: colors.blueShade }}></div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white" style={{ background: colors.secondary }}>
                  +9
                </div>
              </div>
              <p className="text-sm text-gray-600">130+ total members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Testimonials Section */}
      <section className="py-12 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="text-center mb-8 px-4">
          <h2 className="text-3xl font-bold text-white mb-2">Student Stories</h2>
          <p className="text-white/90">Real feedback from our students</p>
        </div>

        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: `linear-gradient(90deg, ${colors.primary}, transparent)` }}></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: `linear-gradient(-90deg, ${colors.accent}, transparent)` }}></div>
          
          {/* Sliding Container */}
          <div className="flex animate-slide-slow hover:pause-animation">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-[300px] md:w-[350px] mx-3"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{testimonial.image}</span>
                    <div>
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-xs text-white/80">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-white/90 mb-2">"{testimonial.text}"</p>
                  <div className="text-xs text-yellow-300">{testimonial.achievement}</div>
                  <div className="text-xs text-white/60 mt-2">{testimonial.course}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Final CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Target size={40} className="mx-auto mb-4" style={{ color: colors.primary }} />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to <span style={{ color: colors.secondary }}>Start?</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Join our growing community of learners.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-full font-bold text-white hover:scale-105 transition-all shadow-md"
              style={{ background: colors.primary }}
            >
              Start Learning <ArrowRight size={16} className="inline ml-1" />
            </Link>
=======
          <div className="text-center">
>>>>>>> 353c35758d053828fb4b53420e5962016ce96fc6
            <Link
              to="/courses"
              className="inline-flex items-center text-2xl font-bold text-primary hover:text-primary-dark group"
            >
              View All Courses
              <ArrowRight size={28} className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
       <section className="relative py-24 bg-[#F5F5F5] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-[#1A3D7C]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#FF7A00]/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#1A3D7C] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-[#333333]">
            Trusted by professionals who value innovation and performance.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 50}%)`,
            }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 flex-shrink-0 px-4"
              >
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full">

                  {/* Avatar */}
                  <div className="flex items-center object-cover gap-4 mb-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-full border-4 border-[#FF7A00]"
                    />
                    <div>
                      <h4 className="font-semibold text-[#1A3D7C]">
                        {item.name}
                      </h4>
                      <span className="text-sm text-[#4A6FA5]">
                        {item.role}
                      </span>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="text-[#FFD600] mb-4">
                    ★★★★★
                  </div>

                  {/* Review */}
                  <p className="text-[#333333] italic">
                    "{item.text}"
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-12 rounded-3xl border-2 border-primary/20">
            <Target className="w-20 h-20 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join 10,000+ students who transformed their careers with iKPACE
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="group bg-primary hover:bg-primary-dark text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                Start Free Trial
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="bg-white text-primary border-2 border-primary hover:bg-primary/5 font-bold text-xl px-12 py-5 rounded-full transition-all"
              >
                Browse Courses
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={20} />
                <span>Access from anywhere</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span>Certificate included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
