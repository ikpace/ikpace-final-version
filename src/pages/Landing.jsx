import { Link } from "react-router-dom";
import { Megaphone } from 'lucide-react';
import { 
  ArrowRight, BookOpen, Users, Award, Star, CheckCircle, 
  TrendingUp, Clock, Sparkles, Target, Globe, Shield, 
  Zap, Gift, Rocket, Heart, Medal, Crown, Gem, 
  ChevronRight, Play, Video, Download, Coffee,
  MessageCircle, ThumbsUp, BadgeCheck, Calendar,
  DollarSign, Percent, ShoppingBag, Flame, Layers,
  Briefcase, Palette, Code, GraduationCap, UserCheck,
  ChevronLeft, Monitor, Smartphone, Laptop, Cpu,
  Brain, Camera, Music, PenTool, Film, Image,
  ThumbsUp as ThumbsUpIcon, Facebook, Twitter, Linkedin, Instagram,
  Mail, Phone, MapPin, Headphones, HelpCircle
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedCourses, setSavedCourses] = useState([]);

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

  // Hero slides data
  const heroSlides = [
    {
      id: "learn-smarter",
      title: "Learn Smarter with iKPACE",
      description: "Practical skills for the modern workforce",
      image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Get Started",
      link: "/register",
      badge: "New Platform",
      highlight: "From $7.00",
      stats: {
        students: "Active learners",
        rating: "4.8/5 rating",
        courses: "6 courses"
      }
    },
    {
      id: "virtual-assistant-pro",
      title: "Virtual Assistant Professional",
      description: "Become a certified VA in 6 weeks - $7.00",
      image: "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Join Now",
      link: "/course/virtual-assistant-pro",
      badge: "Popular",
      highlight: "Start Your VA Career",
      stats: {
        students: "25+ enrolled",
        rating: "4.8 rating",
        duration: "6 weeks"
      }
    },
    {
      id: "women-tech-scholarship",
      title: "Women in Tech Scholarship",
      description: "50% tuition support for women. Limited slots!",
      image: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Apply Today",
      link: "/course/women-tech-scholarship",
      badge: "Scholarship",
      highlight: "50% Off",
      stats: {
        scholars: "5 awarded",
        rating: "4.9 rating",
        deadline: "Apply now"
      }
    }
  ];

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

  // Clean Course Data with honest numbers
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
      originalPrice: 49,
      category: 'Career',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#1A3D7C] to-[#FF7A00]',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Client Management', 'Email', 'Calendar'],
      instructor: 'Amara Osei',
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
      originalPrice: 49,
      category: 'Marketing',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#FF7A00] to-[#FF9A3C]',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Content', 'Ads', 'Analytics'],
      instructor: 'Kofi Asante',
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
      originalPrice: 39,
      category: 'Design',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#008F4C] to-[#00C853]',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Logo', 'Social Graphics', 'Branding'],
      instructor: 'Esi Darkwah',
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
      originalPrice: 35,
      category: 'Kids',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#FF6D00] to-[#FFD600]',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Scratch', 'Games', 'Animation'],
      instructor: 'Kwame Asare',
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
      originalPrice: 39,
      category: 'Business',
      level: 'Beginner',
      badge: 'New',
      color: 'from-[#00C853] to-[#B2FF59]',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['Upwork', 'Clients', 'Pricing'],
      instructor: 'Yaa Asantewaa',
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
      originalPrice: 49,
      category: 'Tech',
      level: 'Intermediate',
      badge: 'New',
      color: 'from-[#4A6FA5] to-[#2F5EA8]',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600',
      features: ['ChatGPT', 'Midjourney', 'Automation'],
      instructor: 'Nana Addo',
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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play slides
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, heroSlides.length]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Promotional Banner */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="relative h-12 flex items-center justify-center px-4">
          <div className="flex items-center gap-4 text-white text-sm">
            <Zap size={16} className="text-yellow-300 animate-pulse" />
            <span className="font-bold">🔥 3 COURSES FOR $15</span>
            <div className="w-px h-4 bg-white/30" />
            <span>FREE BONUS</span>
            <div className="w-px h-4 bg-white/30" />
            <span className="hidden md:inline">70% OFF</span>
            <Link 
              to="/pricing" 
              className="bg-white px-3 py-1 rounded-full text-xs font-bold hover:scale-105 transition-all"
              style={{ color: colors.primary }}
            >
              Claim <Gift size={12} className="inline ml-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }} />
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.primary}E6, ${colors.primary}99)` }} />
            </div>
          ))}
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0 hidden'
                }`}
              >
                <div className="max-w-3xl">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">{slide.description}</p>
                  <div className="flex gap-4">
                    <Link
                      to={slide.link}
                      className="group px-8 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
                      style={{ background: colors.secondary, color: colors.white }}
                    >
                      {slide.cta} <ArrowRight size={18} className="group-hover:translate-x-1" />
                    </Link>
                    <Link
                      to="/courses"
                      className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold hover:bg-white/30 transition-all"
                    >
                      Browse All
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white">
          <ChevronLeft size={20} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white">
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Core Features - 6 Benefits */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose <span style={{ color: colors.secondary }}>iKPACE</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreFeatures.map((item, index) => (
              <div key={index} className="text-center p-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: item.color + '10', color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-xs mb-1">{item.title}</h3>
                <p className="text-[10px] text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section - Clean & Simple */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Simple Header */}
          <div className="text-center mb-8">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              🎓 OUR COURSES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Learn <span style={{ color: colors.secondary }}>New Skills</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Start your journey today
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
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>

          {/* Clean Course Cards - With Working Buttons */}
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
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm" style={{ color: colors.primary }}>
                      {course.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-xs">
                    {course.category}
                  </div>
                  <button
                    onClick={() => toggleSaveCourse(course.id)}
                    className="absolute bottom-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform"
                  >
                    <Heart 
                      size={14} 
                      className={savedCourses.includes(course.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'} 
                    />
                  </button>
                </div>

                {/* Simple Content */}
                <div className="p-4">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  
                  {/* Instructor */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm">{course.icon}</span>
                    <span className="text-xs text-gray-600">{course.instructor}</span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full ml-auto">
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

                  {/* Price & Two Active Buttons */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xl font-bold" style={{ color: colors.primary }}>${course.price}</span>
                      <span className="text-gray-400 text-xs line-through ml-2">${course.originalPrice}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        to={`/course/${course.id}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full text-white shadow-sm hover:scale-105 transition-all"
                        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                      >
                        Enroll
                      </Link>
                      <Link
                        to={`/course/${course.id}`}
                        className="text-xs font-semibold px-3 py-1.5 rounded-full border hover:bg-gray-50 transition-all"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-8">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:scale-105 transition-all shadow-md"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              View All Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* iKPACE Advantage - Professional Section (REPLACES the duplicate) */}
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
            <Link
              to="/courses"
              className="px-8 py-3 rounded-full font-bold border-2 hover:bg-gray-50 transition-all"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Animation Styles */}
      <style>{`
        @keyframes slide-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-slide-slow {
          animation: slide-slow 40s linear infinite;
          width: fit-content;
          display: flex;
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}