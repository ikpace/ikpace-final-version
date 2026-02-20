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
  ChevronLeft
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Hero slides data
  const heroSlides = [
    {
      id: "learn-smarter", title: "Learn Smarter with iKPACE",
      description: "Affordable, practical skills for the modern workforce",
      image: "/images/hero-1.jpg",
      cta: "Get Started",
      link: "/register",
      badge: "Limited Time Offer",
      highlight: "From $7.00",
      stats: {
        students: "50,000+ learners",
        rating: "4.9/5 rating",
        courses: "150+ courses"
      }
    },
    {
      id: "virtual-assistant-pro", title: "Virtual Assistant Professional",
      description: "Become a certified VA in just 6 weeks - Only $7.00",
      image: "/images/hero-2.jpg",
      cta: "Join Now",
      link: "/programs/va-professional",
      badge: "Most Popular",
      highlight: "Start Your VA Career",
      stats: {
        students: "3,200+ enrolled",
        rating: "4.9 rating",
        duration: "6 weeks"
      }
    },
    {
      id: "women-tech-scholarship", title: "Women in Tech Scholarship",
      description: "50% tuition support for women. Limited slots available!",
      image: "/images/hero-3.jpg",
      cta: "Apply Today",
      link: "/women-tech/scholarship",
      badge: "Scholarship Available",
      highlight: "50% Off",
      stats: {
        scholars: "100+ awarded",
        rating: "4.9 rating",
        deadline: "Apply now"
      }
    },
    {
      id: "smart-kids-coding", title: "Smart Kids Coding",
      description: "Introduce your children to the world of technology",
      image: "/images/hero-4.jpg",
      cta: "Enroll Now",
      link: "/programs/kids-coding",
      badge: "Ages 6-12",
      highlight: "Fun Learning",
      stats: {
        students: "1,200+ kids",
        rating: "4.9 rating",
        courses: "4 modules"
      }
    },
    {
      id: "freelancing-online-income", title: "Freelancing & Online Income",
      description: "Learn how to earn online from anywhere in the world",
      image: "/images/hero-5.jpg",
      cta: "Start Learning",
      link: "/programs/freelancing",
      badge: "New",
      highlight: "Earn While You Learn",
      stats: {
        students: "2,500+ enrolled",
        rating: "4.8 rating",
        platforms: "5+ platforms"
      }
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

const colors = {
  primary: "#1A3D7C",      // Deep Blue – main buttons, headings (VERY visible on white)
  secondary: "#FF7A00",    // Orange – CTA buttons, highlights

  accent: "#2F5EA8",       // Stronger blue accent (improved contrast)

  green: "#008F4C",        // Darker brand green (visible on white)
  yellow: "#E6B800",       // Deeper yellow (no fade on white)

  success: "#008F4C",      // Same as brand green
  warning: "#E6B800",      // Same as brand yellow

  darkGray: "#1F2937",     // Strong readable text color
  lightGray: "#F3F4F6",    // Light background sections (NOT green ❌)
  white: "#FFFFFF",        // True white (cards / page background)

  blueShade: "#4A6FA5",    // Soft blue for borders / secondary UI
  orangeShade: "#FF9A3C"   // Softer orange for hover states
};

  // Programmes data with your exact courses
const programmes = [
  {
    id: "virtual-assistant-pro",
    title: "Virtual Assistant Professional",
    duration: "6 Weeks",
    price: 7.00,
    students: "3,200+",
    rating: 4.9,
    icon: <Briefcase size={24} />,
    color: colors.primary,
    category: "Career",
    description: "Master VA skills, client management, and remote work tools",
    href: "/course/virtual-assistant-pro"
  },
  {
    id: "social-media-marketing",
    title: "Social Media Marketing",
    duration: "6 Weeks",
    price: 7.00,
    students: "2,800+",
    rating: 4.8,
    icon: <Megaphone size={24} />,
    color: colors.secondary,
    category: "Marketing",
    description: "Master content creation, ads, and growth strategies",
    href: "/course/social-media-marketing"
  },
  {
    id: "canva-graphic-design",
    title: "Canva & Graphic Design",
    duration: "4 Weeks",
    price: 7.00,
    students: "1,900+",
    rating: 4.7,
    icon: <Palette size={24} />,
    color: colors.purple,
    category: "Design",
    description: "Create stunning designs, logos, and branding materials",
    href: "/course/canva-graphic-design"
  },
  {
    id: "smart-kids-coding",
    title: "Smart Kids Coding",
    duration: "4 Weeks",
    price: 7.00,
    students: "1,200+",
    rating: 4.9,
    icon: <Code size={24} />,
    color: colors.success,
    category: "Kids",
    badge: "Ages 6-12",
    description: "Fun coding for kids with Scratch and game creation",
    href: "/course/smart-kids-coding"
  }
];

  // Coming soon categories
  const comingSoon = [
    { name: "Cyber Security", icon: <Shield size={20} />, color: colors.primary, interest: 234 },
    { name: "Data Science", icon: <TrendingUp size={20} />, color: colors.purple, interest: 189 },
    { name: "Entrepreneurship", icon: <Rocket size={20} />, color: colors.secondary, interest: 156 },
    { name: "Tech Fundamentals", icon: <Code size={20} />, color: colors.success, interest: 145 }
  ];

    const popularCourses = [
    {
      id: "social-media-marketing",
      title: "Social Media Marketing",
      description: "Complete strategy for online marketing success",
      price: 7.00,
      students: "1,247+",
      rating: 4.9,
      duration: "6 weeks",
      badge: "BESTSELLER",
      icon: <Megaphone size={24} />,
      color: colors.primary
    },
    {
      id: "ai-prompt-engineering",
      title: "AI Prompt Engineering Pro",
      description: "Master AI tools for automated content creation",
      price: 7.00,
      students: "892+",
      rating: 4.8,
      duration: "6 weeks",
      badge: "TRENDING",
      icon: <Rocket size={24} />,
      color: colors.blueShade
    },
    {
      id: "smm",
      title: "Social Media Marketing Mastery",
      description: "Advanced advertising across all platforms",
      price: 9.00,
      students: "567+",
      rating: 4.7,
      duration: "8 weeks",
      badge: "POPULAR",
      icon: <Target size={24} />,
      color: colors.secondary
    }
  ];
  const virtualAssistantCourse = {
    title: "Virtual Assistant Professional",
    duration: "6 Weeks",
    price: 7.00,
    students: "3,200+",
    rating: 4.9,
    badge: "TOP RATED",
    modules: [
      "Introduction to Virtual Assistance",
      "Communication & Email Management",
      "Administrative Tools",
      "Social Media Assistance",
      "Client Acquisition",
      "Final Portfolio Project"
    ]
  };

  const features = [
    {
      icon: <BookOpen className="w-10 h-10" style={{ color: colors.primary }} />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience",
      stats: "50+ Instructors"
    },
    {
      icon: <Users className="w-10 h-10" style={{ color: colors.secondary }} />,
      title: "Community Support",
      description: "Join 10,000+ learners in our active community",
      stats: "24/7 Support"
    },
    {
      icon: <Award className="w-10 h-10" style={{ color: colors.purple }} />,
      title: "Certification",
      description: "Get certified and boost your career prospects",
      stats: "Global Recognition"
    },
    {
      icon: <Clock className="w-10 h-10" style={{ color: colors.success }} />,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with lifetime access",
      stats: "Flexible Schedule"
    }
  ];

  // Enhanced testimonials with more variety for sliding
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      text: "iKPACE transformed my career. The courses are practical and immediately applicable.",
      rating: 5,
      image: "👩‍💼",
      achievement: "Got promoted within 3 months",
      course: "Digital Marketing"
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      text: "Best investment in my education. The community support alone is worth it.",
      rating: 5,
      image: "👨‍💻",
      achievement: "Tripled freelance income",
      course: "VA Professional"
    },
    {
      name: "Amina Okafor",
      role: "Business Owner",
      text: "The AI course helped me automate 80% of my content creation. Amazing ROI!",
      rating: 5,
      image: "👩‍💼",
      achievement: "Saved 20+ hours/week",
      course: "AI Content"
    },
    {
      name: "David Olamide",
      role: "Student",
      text: "The Kids Coding course got my son excited about tech. He built his first game!",
      rating: 5,
      image: "👨‍👦",
      achievement: "Son built 3 games",
      course: "Smart Kids"
    },
    {
      name: "Grace Williams",
      role: "Social Media Manager",
      text: "The Canva course transformed my design skills. Now I create professional graphics daily.",
      rating: 5,
      image: "👩‍🎨",
      achievement: "Started design business",
      course: "Canva Design"
    },
    {
      name: "John Peters",
      role: "Freelance VA",
      text: "Went from zero to earning $2k/month as a VA. The client acquisition module was gold!",
      rating: 5,
      image: "👨‍💼",
      achievement: "Earning $2k/month",
      course: "VA Professional"
    }
  ];

  const stats = [
    { number: "50,000+", label: "Students Worldwide", icon: <Users size={24} /> },
    { number: "150+", label: "Expert Instructors", icon: <BadgeCheck size={24} /> },
    { number: "4.9/5", label: "Student Rating", icon: <Star size={24} className="fill-current" /> },
    { number: "95%", label: "Completion Rate", icon: <Award size={24} /> }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Advanced Promotional Banner */}
      <div 
        className="relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.purple} 50%, ${colors.secondary} 100%)`
        }}
      >
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" />
        </div>

        {/* Sliding Banner Content */}
        <div className="relative h-14 flex items-center overflow-hidden">
          <div className="absolute whitespace-nowrap flex items-center gap-8 animate-slide-slow">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <Zap size={20} className="text-yellow-300 animate-pulse" />
                  <span className="font-black text-white text-lg">🔥 3 COURSES FOR $18</span>
                </div>
                
                <div className="w-px h-8 bg-white/30" />
                
                <div className="flex items-center gap-3">
                  <Gift size={18} className="text-yellow-300" />
                  <span className="text-white font-bold">FREE BONUS COURSE</span>
                </div>
                
                <div className="w-px h-8 bg-white/30" />
                
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-yellow-300" />
                  <span className="text-white font-bold">LIMITED TIME: 70% OFF</span>
                </div>
                
                <div className="w-px h-8 bg-white/30" />
                
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-yellow-300" />
                  <span className="text-white font-bold">CERTIFICATE INCLUDED</span>
                </div>
                
                <div className="w-px h-8 bg-white/30" />
                
                <div className="bg-white/20 rounded-full px-3 py-1">
                  <span className="text-white text-sm font-bold">SAVE $42</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-yellow-300" />
            <span className="text-white text-sm font-medium">Offer ends in:</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 rounded-lg px-2 py-1">
              <span className="text-white font-bold">{timeLeft.days}d</span>
            </div>
            <span className="text-white">:</span>
            <div className="bg-white/20 rounded-lg px-2 py-1">
              <span className="text-white font-bold">{timeLeft.hours}h</span>
            </div>
            <span className="text-white">:</span>
            <div className="bg-white/20 rounded-lg px-2 py-1">
              <span className="text-white font-bold">{timeLeft.minutes}m</span>
            </div>
            <span className="text-white">:</span>
            <div className="bg-white/20 rounded-lg px-2 py-1">
              <span className="text-white font-bold">{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link 
          to="/pricing" 
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg group"
          style={{ color: colors.primary }}
        >
          <Gift size={16} className="group-hover:rotate-12 transition-transform" />
          CLAIM OFFER NOW
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

           {/* Hero Section */}
      <section className="relative h-screen max-h-[800px] min-h-[600px] overflow-hidden">
        {/* Background Images with Transition */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-10000"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: index === currentSlide ? 'scale(1)' : 'scale(1.05)'
                }}
              />
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}E6 0%, ${colors.primary}CC 50%, ${colors.primary}B3 100%)`
                }}
              />
            </div>
          ))}
        </div>


        {/* Content Container */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 absolute pointer-events-none'
                }`}
              >
                <div className="text-center">
                  {/* Slide Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full mb-8 border border-white/30 animate-fadeInUp">
                    <Sparkles size={20} style={{ color: colors.yellow }} />
                    <span className="font-medium text-white">{slide.badge}</span>
                  </div>
                  
                  {/* Main Heading */}
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight text-white animate-fadeInUp animation-delay-200">
                    {slide.title}
                    <br />
                    <span style={{ color: colors.secondary }}>{slide.highlight}</span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-white/90 animate-fadeInUp animation-delay-400">
                    {slide.description}
                  </p>

                  {/* Slide-specific stats */}
                  <div className="flex justify-center gap-6 mb-8 animate-fadeInUp animation-delay-600">
                    {Object.entries(slide.stats).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          {key === 'students' && <Users size={16} className="text-white" />}
                          {key === 'rating' && <Star size={16} className="text-yellow-400 fill-current" />}
                          {key === 'duration' && <Clock size={16} className="text-white" />}
                          {key === 'courses' && <BookOpen size={16} className="text-white" />}
                          {key === 'platforms' && <TrendingUp size={16} className="text-white" />}
                          {key === 'scholars' && <Award size={16} className="text-white" />}
                          {key === 'mentors' && <Users size={16} className="text-white" />}
                        </div>
                        <span className="text-white font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fadeInUp animation-delay-800">
                    <Link
                      to={slide.link}
                      className="group font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3"
                      style={{ 
                        background: colors.secondary,
                        color: 'white'
                      }}
                    >
                      {slide.cta}
                      <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                    <Link
                      to="/pricing"
                      className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold text-xl px-12 py-5 rounded-full transition-all"
                    >
                      View All Plans
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats Grid - Always visible */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="text-white/80 mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
        >
          <ChevronRight size={24} className="text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'w-8 bg-white' 
                  : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Pause/Play Button */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="absolute bottom-8 right-8 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border border-white/30"
        >
          {isAutoPlaying ? (
            <span className="w-3 h-3 bg-white rounded-sm" />
          ) : (
            <Play size={14} className="text-white ml-0.5" />
          )}
        </button>
      </section>

      {/* OUR PROGRAMMES Section - New */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              LEARN & GROW
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span style={{ color: colors.secondary }}>Programmes</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Choose from our carefully crafted courses designed for your success
            </p>
          </div>
{/* Category Filters */}
<div className="flex flex-wrap justify-center gap-3 mb-12">
  <button
    className="px-6 py-2 rounded-full font-medium text-white"
    style={{ background: colors.primary }}
  >
    All
  </button>

  <button
    className="px-6 py-2 rounded-full font-medium border-2 transition-all"
    style={{ borderColor: colors.primary, color: colors.primary }}
  >
    Career
  </button>

  <button
    className="px-6 py-2 rounded-full font-medium border-2 transition-all"
    style={{ borderColor: colors.accent, color: colors.accent }}
  >
    Creative Tech
  </button>

  <button
    className="px-6 py-2 rounded-full font-medium border-2 transition-all opacity-60 relative group"
    style={{ borderColor: colors.warning, color: colors.warning }}
  >
    Cyber Security
    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
      soon
    </span>
  </button>

  <button
    className="px-6 py-2 rounded-full font-medium border-2 transition-all opacity-60 relative group"
    style={{ borderColor: colors.success, color: colors.success }}
  >
    Data Science
    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
      soon
    </span>
  </button>

  <button
    className="px-6 py-2 rounded-full font-medium border-2 transition-all opacity-60 relative group"
    style={{ borderColor: colors.secondary, color: colors.secondary }}
  >
    Entrepreneurship
    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
      soon
    </span>
  </button>

  <button
    className="px-6 py-2 rounded-full font-medium border-2 transition-all opacity-60 relative group"
    style={{ borderColor: colors.blueShade, color: colors.blueShade }}
  >
    Tech
    <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
      soon
    </span>
  </button>
</div>

{/* 4 Course Boxes Grid */}
<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
  {programmes.map((programme) => (
    <div
      key={programme.id}
      className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
    >
      {/* Header with brand color */}
      <div
        className="h-32 relative overflow-hidden"
        style={{
          background: `linear-gradient(
            135deg,
            ${colors.primary} 0%,
            ${colors.blueShade} 100%
          )`
        }}
      >
        <div className="absolute top-4 right-4">
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
            {programme.category}
          </span>
        </div>

        <div className="absolute bottom-4 left-4">
          <div className="text-white/90 mb-1">{programme.icon}</div>
          <div className="text-2xl font-bold text-white">
            ${programme.price}
          </div>
        </div>

        {programme.badge && (
          <div className="absolute top-4 left-4 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
            {programme.badge}
          </div>
        )}
      </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-14">
                    {programme.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2 h-10">
                    {programme.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4 text-sm">
                    <span className="flex items-center text-gray-600">
                      <Clock size={14} className="mr-1" style={{ color: programme.color }} />
                      {programme.duration}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Users size={14} className="mr-1" style={{ color: programme.color }} />
                      {programme.students}
                    </span>
                    <span className="flex items-center font-bold" style={{ color: colors.warning }}>
                      <Star size={14} className="fill-current mr-1" />
                      {programme.rating}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                   <Link
  to={programme.href}
  className="flex-1 text-sm font-semibold py-2.5 px-3 rounded-xl transition-all hover:scale-105 text-center"
  style={{
    background: programme.color || colors.primary,
    color: "#FFFFFF", // keeps contrast if programme.color is dark enough
    boxShadow: `0 4px 12px ${programme.color || colors.primary}33` // subtle shadow for depth
  }}
>
  Enroll Now
</Link>
                    <Link
                      to={`/course/${programme.id}/details`}
                      className="px-3 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all hover:bg-gray-50 whitespace-nowrap"
                      style={{ borderColor: programme.color, color: programme.color }}
                    >
                      View More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Coming Soon Interest Section */}
          <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-3xl border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Coming Soon - Register Your Interest
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {comingSoon.map((item, index) => (
                <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
                  <div className="flex justify-center mb-2" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{item.name}</p>
                  <p className="text-xs text-gray-500 mb-2">{item.interest} interested</p>
                  <button 
                    className="w-full text-xs font-semibold py-2 px-3 rounded-full transition-all"
                    style={{ background: item.color + '10', color: item.color }}
                  >
                    Notify Me
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* View All Link */}
          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="inline-flex items-center text-xl font-bold group"
              style={{ color: colors.primary }}
            >
              View All Programmes
              <ArrowRight size={24} className="ml-3 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
{/* Section 1: More Opportunity. More Impact of ikpac */}
<section className="py-24" style={{ background: `linear-gradient(135deg, ${colors.primary}02 0%, ${colors.accent}02 100%)` }}>
  <div className="max-w-7xl mx-auto px-4">
    <div className="text-center mb-16">
      <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '20', color: colors.secondary }}>
        🚀 TRANSFORM YOUR FUTURE
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        More Opportunity. <span style={{ color: colors.primary }}>More Impact.</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        At ikpac Tech Skills School, we're not just teaching code – we're building futures and creating impact that resonates throughout your entire career journey.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {/* Impact Stats */}
      <div className="text-center p-6 rounded-2xl" style={{ background: colors.white, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>94%</div>
        <p className="text-gray-600">Graduate employment rate within 6 months</p>
      </div>
      <div className="text-center p-6 rounded-2xl" style={{ background: colors.white, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>15+</div>
        <p className="text-gray-600">Industry-relevant tech courses</p>
      </div>
      <div className="text-center p-6 rounded-2xl" style={{ background: colors.white, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>2000+</div>
        <p className="text-gray-600">Successful graduates worldwide</p>
      </div>
      <div className="text-center p-6 rounded-2xl" style={{ background: colors.white, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <div className="text-4xl font-bold mb-2" style={{ color: colors.primary }}>85%</div>
        <p className="text-gray-600">Salary increase after completion</p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900" style={{ color: colors.primary }}>
          Why Choose ikpac Tech Skills School?
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.green + '20' }}>
              <span className="text-sm font-bold" style={{ color: colors.green }}>✓</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Hands-On Learning</h4>
              <p className="text-gray-600">Project-based curriculum designed by industry experts to give you real-world experience before you even start your first job.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.secondary + '20' }}>
              <span className="text-sm font-bold" style={{ color: colors.secondary }}>✓</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Career-First Approach</h4>
              <p className="text-gray-600">From resume building to interview prep, we don't stop until you land that dream job. Our career coaches work 1-on-1 with every student.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.accent + '20' }}>
              <span className="text-sm font-bold" style={{ color: colors.accent }}>✓</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Flexible Learning</h4>
              <p className="text-gray-600">Study at your own pace with lifetime access to course materials. Perfect for working professionals and career changers.</p>
            </div>
          </div>
        </div>
        <p className="text-lg text-gray-700 italic border-l-4 pl-4" style={{ borderColor: colors.secondary }}>
          "ikpac didn't just teach me to code – they transformed my entire career trajectory. Today, I'm leading teams at a Fortune 500 company."
        </p>
      </div>
      <div className="relative">
        <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="/images/hero-1.jpg"
            alt="iKpace - Learn Smarter" 
            className="w-full h-full object-contain"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})` }}
          />
        </div>
        <div className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl" style={{ background: colors.white }}>
          <p className="text-sm font-medium text-gray-600 mb-1">Your Journey Starts Here</p>
          <p className="text-2xl font-bold" style={{ color: colors.primary }}>Join Today →</p>
        </div>
      </div>
    </div>
  </div>
</section>
{/* Section 2: Join a Community that Has Your Back */}
<section className="py-16" style={{ background: colors.lightGray }}>
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Left side - Content */}
      <div>
        <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
          🤝 CONNECT & GROW TOGETHER
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Join a Community that <span style={{ color: colors.secondary }}>Has Your Back</span>
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Experience the power of a community that walks with you throughout your career. Our supportive environments are designed for you to connect, collaborate, and build lasting relationships with ambassadors and mentors, fostering collective growth and shared success.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: colors.primary + '10' }}>
              <span className="text-xl" style={{ color: colors.primary }}>👥</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">Connect with Peers and Ambassadors</p>
              <p className="text-sm text-gray-600">Network with like-minded learners and professionals</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: colors.secondary + '10' }}>
              <span className="text-xl" style={{ color: colors.secondary }}>🎯</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">Learn from Mentors</p>
              <p className="text-sm text-gray-600">Get guidance from industry experts who've been there</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: colors.accent + '10' }}>
              <span className="text-xl" style={{ color: colors.accent }}>🤲</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">We Listen to You</p>
              <p className="text-sm text-gray-600">Your voice matters – we connect and listen to all users</p>
            </div>
          </div>
        </div>

        <Link
          to="/community"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105 hover:shadow-lg"
          style={{ background: colors.secondary }}
        >
          Join Our Community
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <p className="text-sm text-gray-500 mt-3">
          🌟 5,000+ active members and growing daily
        </p>
      </div>

      {/* Right side - Small visual card */}
      <div className="relative">
        <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: colors.white }}>
          <div className="p-4" style={{ background: colors.primary }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
              <span className="text-xs font-medium text-white">1,234 online now</span>
            </div>
          </div>
          <div className="p-6">
            <div className="flex -space-x-2 mb-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white" style={{ background: colors.blueShade }}></div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-xs font-bold text-white">
                +99
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-gray-900">Sarah K.</span>
                <span className="text-gray-500">just asked:</span>
              </div>
              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                "How do I prepare for my first tech interview?"
              </p>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 rounded-full" style={{ background: colors.secondary + '10', color: colors.secondary }}>
                  5 replies
                </span>
                <span className="px-2 py-1 rounded-full" style={{ background: colors.primary + '10', color: colors.primary }}>
                  Mentor online
                </span>
              </div>
            </div>
          </div>
          <div className="p-3 border-t border-gray-100 text-center text-xs text-gray-500">
            Active discussions • Events • Study groups
          </div>
        </div>
        
        {/* Floating badge */}
        <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg animate-pulse" style={{ background: colors.secondary, color: colors.white }}>
          💬
        </div>
      </div>
    </div>
  </div>
</section>

      {/* HOT Courses Section */}
      <section className="py-24" style={{ background: `linear-gradient(135deg, ${colors.warning}10 0%, ${colors.secondary}10 100%)` }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2" style={{ background: colors.warning, color: 'white' }}>
                <Flame size={24} className="animate-pulse" />
                🔥 TRENDING NOW
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              High-Demand Courses
            </h2>
            <p className="text-2xl text-gray-600">
              Most popular courses right now - grab your spot!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Course 1 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-red-200 group">
              <div className="h-48 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.warning} 0%, ${colors.secondary} 100%)` }}>
                <div className="absolute top-4 right-4">
                  <span className="bg-red-600 text-white px-4 py-1 rounded-full font-bold text-sm animate-pulse">HOT</span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-4xl mb-2">📱</div>
                  <div className="text-3xl font-bold text-white">$7.00</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">TikTok Monetization Mastery</h3>
                <p className="text-gray-600 mb-4">From 0 views to paid deals. Master TikTok algorithm and viral content.</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">⭐⭐⭐⭐⭐</div>
                  <span className="text-gray-600">4.9 (2.8k+)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-1" /> 6 weeks
                  </div>
                  <Link to="/course/tiktok-mastery" className="px-6 py-2 rounded-full font-semibold text-white transition-colors" style={{ background: colors.primary }}>
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Course 2 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-orange-200 group">
              <div className="h-48 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.pink} 100%)` }}>
                <div className="absolute top-4 right-4">
                  <span className="bg-orange-600 text-white px-4 py-1 rounded-full font-bold text-sm">TRENDING</span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-4xl mb-2">📸</div>
                  <div className="text-3xl font-bold text-white">$7.00</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Instagram Reels & Growth Hacks</h3>
                <p className="text-gray-600 mb-4">Go viral and grow fast. Master Instagram Reels algorithm.</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">⭐⭐⭐⭐⭐</div>
                  <span className="text-gray-600">4.8 (1.9k+)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-1" /> 4 weeks
                  </div>
                  <Link to="/course/instagram-reels" className="px-6 py-2 rounded-full font-semibold text-white transition-colors" style={{ background: colors.primary }}>
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Course 3 */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-200 group">
              <div className="h-48 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.success} 0%, ${colors.teal} 100%)` }}>
                <div className="absolute top-4 right-4">
                  <span className="bg-green-600 text-white px-4 py-1 rounded-full font-bold text-sm">PASSIVE</span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="text-4xl mb-2">▶️</div>
                  <div className="text-3xl font-bold text-white">$7.00</div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">YouTube Automation Mastery</h3>
                <p className="text-gray-600 mb-4">Faceless channels that make money. Create automated channels.</p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">⭐⭐⭐⭐⭐</div>
                  <span className="text-gray-600">4.7 (1.6k+)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock size={16} className="mr-1" /> 8 weeks
                  </div>
                  <Link to="/course/youtube-automation" className="px-6 py-2 rounded-full font-semibold text-white transition-colors" style={{ background: colors.primary }}>
                    Enroll Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center text-2xl font-bold group"
              style={{ color: colors.primary }}
            >
              View All HOT Courses
              <ArrowRight size={28} className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
       </div>
      </section>

      {/* Popular Courses Section - Enhanced */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              📚 MOST POPULAR PROGRAMS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top-Rated <span style={{ color: colors.secondary }}>Courses</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Start with any course - they're all beginner-friendly and career-focused
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {popularCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 group">
                <div className="h-48 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${course.color} 0%, ${course.color}80 100%)` }}>
                  {/* Animated overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/10"></div>
                  
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-1 rounded-full font-bold text-sm shadow-lg" style={{ background: colors.yellow, color: colors.darkGray }}>
                      {course.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="text-white/90 mb-1 text-4xl">{course.icon}</div>
                    <div className="text-3xl font-bold text-white">${course.price.toFixed(2)}</div>
                  </div>
                  
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                      <Clock size={16} className="mr-2" style={{ color: colors.primary }} />
                      {course.duration}
                    </span>
                    <span className="flex items-center font-bold px-3 py-1 rounded-full" style={{ background: colors.yellow + '15', color: colors.yellow }}>
                      <Star size={16} className="fill-current mr-1" />
                      {course.rating}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors" style={{ color: colors.darkGray }}>
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between mb-8">
                    <span className="flex items-center text-gray-600">
                      <Users size={18} className="mr-2" style={{ color: colors.accent }} />
                      {course.students} students
                    </span>
                    <span className="text-sm font-medium px-3 py-1 rounded-full" style={{ background: colors.green + '10', color: colors.green }}>
                      {course.level}
                    </span>
                  </div>
                  
                  <Link
                    to={`/course/${course.id}`}
                    className="block w-full text-white font-bold py-4 px-6 rounded-xl text-center text-lg transition-all hover:shadow-xl hover:scale-[1.02]"
                    style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    View Course Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center text-2xl font-bold group px-8 py-4 rounded-full transition-all hover:bg-gray-50"
              style={{ color: colors.primary }}
            >
              View All Courses
              <ArrowRight size={28} className="ml-4 group-hover:translate-x-3 transition-transform" style={{ color: colors.secondary }} />
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Sliding Testimonials - With Brand Colors */}
      <section className="relative py-24 overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 50%, ${colors.secondary} 0%, transparent 50%)` }}></div>
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 70% 50%, ${colors.yellow} 0%, transparent 50%)` }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 bg-white/20 text-white backdrop-blur-sm">
              ⭐ STUDENT SUCCESS STORIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              What Our <span style={{ color: colors.secondary }}>Students</span> Say
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>

          {/* Sliding Testimonials */}
          <div className="relative">
            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: `linear-gradient(to right, ${colors.primary}, transparent)` }}></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: `linear-gradient(to left, ${colors.accent}, transparent)` }}></div>

            <div className="flex overflow-hidden">
              <div className="flex gap-6 animate-slide-slow">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={index} className="flex-shrink-0 w-80 md:w-96 p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.2)' }}>
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-3xl rounded-full w-16 h-16 flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
                        {testimonial.image}
                      </div>

                      <div>
                        <div className="font-bold text-lg text-white">{testimonial.name}</div>
                        <div className="text-sm text-white/80">{testimonial.role}</div>
                        <div className="text-xs mt-1 px-2 py-0.5 rounded-full inline-block" style={{ background: colors.secondary + '40', color: colors.secondary }}>
                          {testimonial.course}
                        </div>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} className="mr-0.5" style={{ color: colors.yellow, fill: colors.yellow }} />
                      ))}
                    </div>

                    <p className="text-white/90 mb-4 line-clamp-3 italic">"{testimonial.text}"</p>

                    <div className="flex items-center gap-1 text-sm" style={{ color: colors.secondary }}>
                      <BadgeCheck size={16} />
                      {testimonial.achievement}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Rating Summary */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20">
              <div className="flex items-center gap-1">
                <Star size={24} style={{ color: colors.yellow, fill: colors.yellow }} />
                <Star size={24} style={{ color: colors.yellow, fill: colors.yellow }} />
                <Star size={24} style={{ color: colors.yellow, fill: colors.yellow }} />
                <Star size={24} style={{ color: colors.yellow, fill: colors.yellow }} />
                <Star size={24} style={{ color: colors.yellow, fill: colors.yellow }} />
              </div>
              <span className="text-white font-bold text-xl">4.9/5 from 10,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Enhanced with Brand Colors */}
      <section className="relative py-32 bg-white">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 opacity-5 rounded-full" style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 opacity-5 rounded-full" style={{ background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)` }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02]">
            <img src="images/landing/pattern.svg" alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          <div className="text-center">
            {/* Target Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center" style={{ background: colors.primary + '10' }}>
              <Target size={48} style={{ color: colors.primary }} />
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ready to Start Your <span style={{ color: colors.secondary }}>Journey?</span>
            </h2>

            <p className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Join 50,000+ students who transformed their careers with iKPACE. 
              Learn in-demand tech skills with guided mentorship and real projects.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/register"
                className="group font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-white"
                style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
              >
                Start Learning Today
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="text-gray-700 border-2 px-12 py-5 rounded-full font-bold text-xl transition-all hover:bg-gray-50 hover:border-primary"
                style={{ borderColor: colors.primary, color: colors.primary }}
              >
                Browse All Courses
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50">
                <Shield size={24} className="mb-2" style={{ color: colors.success }} />
                <span className="text-sm font-medium text-gray-700">30-day money-back</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50">
                <Globe size={24} className="mb-2" style={{ color: colors.primary }} />
                <span className="text-sm font-medium text-gray-700">Access anywhere</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50">
                <Award size={24} className="mb-2" style={{ color: colors.secondary }} />
                <span className="text-sm font-medium text-gray-700">Certificate included</span>
              </div>
              <div className="flex flex-col items-center p-4 rounded-2xl bg-gray-50">
                <Clock size={24} className="mb-2" style={{ color: colors.accent }} />
                <span className="text-sm font-medium text-gray-700">Lifetime access</span>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 mb-4">Trusted by students from</p>
              <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
                <span className="text-xl font-bold text-gray-400">Google</span>
                <span className="text-xl font-bold text-gray-400">Microsoft</span>
                <span className="text-xl font-bold text-gray-400">Amazon</span>
                <span className="text-xl font-bold text-gray-400">Meta</span>
                <span className="text-xl font-bold text-gray-400">Apple</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slide-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-slide-slow {
          animation: slide-slow 40s linear infinite;
          will-change: transform;
        }
        
        .animate-slide-slow:hover {
          animation-play-state: paused;
        }
        
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
