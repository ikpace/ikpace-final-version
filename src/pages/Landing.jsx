import { Link } from "react-router-dom";
import { Megaphone } from "lucide-react";
import {
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Star,
  CheckCircle,
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  Globe,
  Shield,
  Zap,
  Gift,
  Rocket,
  Heart,
  Medal,
  Crown,
  Gem,
  ChevronRight,
  Play,
  Video,
  Download,
  Coffee,
  MessageCircle,
  ThumbsUp,
  BadgeCheck,
  Calendar,
  DollarSign,
  Percent,
  ShoppingBag,
  Flame,
  Layers,
  Briefcase,
  Palette,
  Code,
  GraduationCap,
  UserCheck,
  ChevronLeft,
  Monitor,
  Smartphone,
  Laptop,
  Cpu,
  Brain,
  Camera,
  Music,
  PenTool,
  Film,
  Image,
  ThumbsUp as ThumbsUpIcon,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Headphones,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Landing() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 30,
    seconds: 45,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
   const [currentSlide, setCurrentSlide] = useState(0);
   const [paused, setPaused] = useState(false);
   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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
    white: "#FFFFFF",
  };

  // Hero slides data
  const heroSlides = [
    {
      id: "learn-smarter",
      title: "Learn Smarter with iKPACE",
      description: "Affordable, practical skills for the modern workforce",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Get Started",
      link: "/register",
      badge: "Limited Time Offer",
      highlight: "From $7.00",
      stats: {
        students: "50,000+ learners",
        rating: "4.9/5 rating",
        courses: "150+ courses",
      },
    },
    {
      id: "virtual-assistant-pro",
      title: "Virtual Assistant Professional",
      description: "Become a certified VA in just 6 weeks - Only $7.00",
      image:
        "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Join Now",
      link: "/course/virtual-assistant-pro",
      badge: "Most Popular",
      highlight: "Start Your VA Career",
      stats: {
        students: "3,200+ enrolled",
        rating: "4.9 rating",
        duration: "6 weeks",
      },
    },
    {
      id: "women-tech-scholarship",
      title: "Women in Tech Scholarship",
      description: "50% tuition support for women. Limited slots available!",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Apply Today",
      link: "/course/women-tech-scholarship",
      badge: "Scholarship Available",
      highlight: "50% Off",
      stats: {
        scholars: "100+ awarded",
        rating: "4.9 rating",
        deadline: "Apply now",
      },
    },
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

  // Clean Course Data with reliable images
  const courses = [
    {
      id: "virtual-assistant-pro",
      title: "Virtual Assistant Professional",
      description: "Master VA skills, client management, and remote work tools",
      shortDescription: "Become a certified VA in 6 weeks",
      duration: "6 Weeks",
      hours: 60,
      students: "3,200+",
      enrolled: 3247,
      rating: 4.9,
      reviews: 856,
      price: 7,
      originalPrice: 49,
      category: "Career",
      level: "Beginner",
      badge: "VA PRO",
      color: "from-[#1A3D7C] to-[#FF7A00]",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: [
        "Client Management",
        "Email Marketing",
        "Calendar Management",
        "Social Media",
      ],
      instructor: "Amara Osei",
      icon: "👩🏾",
    },
    {
      id: "social-media-marketing",
      title: "Social Media Marketing",
      description: "Master content creation, ads, and growth strategies",
      shortDescription: "Grow brands on all platforms",
      duration: "6 Weeks",
      hours: 55,
      students: "2,800+",
      enrolled: 2856,
      rating: 4.8,
      reviews: 723,
      price: 7,
      originalPrice: 49,
      category: "Marketing",
      level: "Beginner",
      badge: "SMM PRO",
      color: "from-[#FF7A00] to-[#FF9A3C]",
      image:
        "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Content Strategy", "Paid Ads", "Analytics", "Community"],
      instructor: "Kofi Asante",
      icon: "👨🏾",
    },
    {
      id: "canva-graphic-design",
      title: "Canva & Graphic Design",
      description: "Create stunning designs, logos, and branding materials",
      shortDescription: "Design like a pro in 4 weeks",
      duration: "4 Weeks",
      hours: 40,
      students: "1,900+",
      enrolled: 1900,
      rating: 4.7,
      reviews: 523,
      price: 7,
      originalPrice: 39,
      category: "Design",
      level: "Beginner",
      badge: "DESIGN",
      color: "from-[#008F4C] to-[#00C853]",
      image:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Logo Design", "Social Graphics", "Branding", "Presentations"],
      instructor: "Esi Darkwah",
      icon: "👩🏾",
    },
    {
      id: "smart-kids-coding",
      title: "Smart Kids Coding",
      description: "Fun coding for kids with Scratch and game creation",
      shortDescription: "Ages 6-12 · Learn while playing",
      duration: "4 Weeks",
      hours: 30,
      students: "1,200+",
      enrolled: 1200,
      rating: 4.9,
      reviews: 345,
      price: 7,
      originalPrice: 35,
      category: "Kids",
      level: "Beginner",
      badge: "KIDS",
      color: "from-[#FF6D00] to-[#FFD600]",
      image:
        "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Scratch", "Game Design", "Animation", "Logic"],
      instructor: "Kwame Asare",
      icon: "👨🏾",
    },
    {
      id: "freelancing-online-income",
      title: "Freelancing & Online Income",
      description: "Start earning online with freelancing skills",
      shortDescription: "Earn from anywhere",
      duration: "4 Weeks",
      hours: 35,
      students: "2,100+",
      enrolled: 2100,
      rating: 4.8,
      reviews: 678,
      price: 7,
      originalPrice: 39,
      category: "Business",
      level: "Beginner",
      badge: "FREELANCE",
      color: "from-[#00C853] to-[#B2FF59]",
      image:
        "https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["Upwork", "Client Acquisition", "Pricing", "Portfolio"],
      instructor: "Yaa Asantewaa",
      icon: "👩🏾",
    },
    {
      id: "ai-prompt-engineering",
      title: "AI Prompt Engineering",
      description: "Master AI tools for content creation",
      shortDescription: "Work smarter with AI",
      duration: "6 Weeks",
      hours: 45,
      students: "1,800+",
      enrolled: 1800,
      rating: 4.9,
      reviews: 456,
      price: 7,
      originalPrice: 49,
      category: "Tech",
      level: "Intermediate",
      badge: "AI PRO",
      color: "from-[#4A6FA5] to-[#2F5EA8]",
      image:
        "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
      features: ["ChatGPT", "Midjourney", "AI Content", "Automation"],
      instructor: "Nana Addo",
      icon: "👨🏾",
    },
  ];

  const categories = [
    "all",
    "Career",
    "Marketing",
    "Design",
    "Kids",
    "Business",
    "Tech",
  ];

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

  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((c) => c.category === selectedCategory);

  const toggleSaveCourse = (courseId) => {
    setSavedCourses((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId],
    );
  };

  const totalStudents = courses
    .reduce((acc, course) => acc + course.enrolled, 0)
    .toLocaleString();

  // Enhanced testimonials with more variety

  
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

 /*Timer*/
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

  const stats = [
    {
      number: "50,000+",
      label: "Students Worldwide",
      icon: <Users size={24} />,
    },
    {
      number: "150+",
      label: "Expert Instructors",
      icon: <BadgeCheck size={24} />,
    },
    {
      number: "4.9/5",
      label: "Student Rating",
      icon: <Star size={24} className="fill-current" />,
    },
    { number: "95%", label: "Completion Rate", icon: <Award size={24} /> },
  ];

  const features = [
    {
      icon: <BookOpen size={24} />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals",
      color: colors.primary,
    },
    {
      icon: <Users size={24} />,
      title: "Community Support",
      description: "Join 50,000+ learners",
      color: colors.secondary,
    },
    {
      icon: <Award size={24} />,
      title: "Certification",
      description: "Get recognized globally",
      color: colors.accent,
    },
    {
      icon: <Clock size={24} />,
      title: "Self-Paced Learning",
      description: "Learn at your own speed",
      color: colors.success,
    },
  ];

  // Trust badges
  const trustBadges = [
    {
      icon: <Shield size={20} />,
      text: "30-day money-back",
      color: colors.success,
    },
    {
      icon: <Globe size={20} />,
      text: "Access anywhere",
      color: colors.primary,
    },
    {
      icon: <Award size={20} />,
      text: "Certificate included",
      color: colors.secondary,
    },
    {
      icon: <Clock size={20} />,
      text: "Lifetime access",
      color: colors.accent,
    },
    {
      icon: <Users size={20} />,
      text: "Community support",
      color: colors.blueShade,
    },
    { icon: <Star size={20} />, text: "4.9/5 rating", color: colors.warning },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Promotional Banner */}
      <div
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(90deg, ${colors.primary}, ${colors.accent})`,
        }}
      >
        <div className="relative h-12 flex items-center justify-center px-4">
          <div className="flex items-center gap-4 text-white text-sm">
            <Zap size={16} className="text-yellow-300 animate-pulse" />
            <span className="font-bold">🔥 3 COURSES FOR $18</span>
            <div className="w-px h-4 bg-white/30" />
            <span>FREE BONUS COURSE</span>
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
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${colors.primary}E6, ${colors.primary}99)`,
                }}
              />
            </div>
          ))}
        </div>

        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                <div className="max-w-3xl">
                  <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                    {slide.badge}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/90 mb-8">
                    {slide.description}
                  </p>
                  <div className="flex gap-4">
                    <Link
                      to={slide.link}
                      className="group px-8 py-4 rounded-full font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
                      style={{
                        background: colors.secondary,
                        color: colors.white,
                      }}
                    >
                      {slide.cta}{" "}
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1"
                      />
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
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 w-10 h-10 rounded-full flex items-center justify-center text-white"
        >
          <ChevronRight size={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{ color: colors.primary }}
                >
                  {stat.number}
                </div>
                <div className="text-xs md:text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                  style={{
                    background: feature.color + "10",
                    color: feature.color,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section - Clean & Clear */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
              style={{
                background: colors.primary + "10",
                color: colors.primary,
              }}
            >
              🎓 LEARN & GROW
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span style={{ color: colors.secondary }}>Programmes</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our carefully crafted courses
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  selectedCategory === cat
                    ? "text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                style={
                  selectedCategory === cat
                    ? { background: colors.secondary }
                    : {}
                }
              >
                {cat === "all" ? "All Courses" : cat}
              </button>
            ))}
          </div>

          {/* Course Cards - Clean Design */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex gap-2">
                    <span
                      className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold shadow-sm"
                      style={{ color: colors.primary }}
                    >
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
                      className={
                        savedCourses.includes(course.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-600"
                      }
                    />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Instructor & Level */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{course.icon}</span>
                      <span className="text-xs text-gray-600">
                        {course.instructor}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">
                      {course.level}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>

                  {/* Short Description */}
                  <p className="text-sm text-gray-600 mb-3">
                    {course.shortDescription}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {course.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} /> {course.students}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star
                        size={12}
                        className="text-yellow-400 fill-current"
                      />{" "}
                      {course.rating}
                    </span>
                  </div>

                  {/* Price & Buttons */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span
                        className="text-xl font-bold"
                        style={{ color: colors.primary }}
                      >
                        ${course.price}
                      </span>
                      <span className="text-gray-400 text-xs line-through ml-2">
                        ${course.originalPrice}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      
                      <Link
                        to={`/course/${course.id}/view-more`}
                        className="text-xs font-semibold px-4 py-2 rounded-full transition-all hover:scale-105 text-white shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        }}
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center mt-8">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white hover:scale-105 transition-all shadow-md"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              View All Programmes <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
                style={{
                  background: colors.secondary + "20",
                  color: colors.secondary,
                }}
              >
                🚀 TRANSFORM YOUR FUTURE
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                More Opportunity.{" "}
                <span style={{ color: colors.primary }}>More Impact.</span>
              </h2>
              <p className="text-gray-600 mb-6">
                At iKPACE, we're building futures and creating impact that
                resonates throughout your career journey.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    94%
                  </div>
                  <p className="text-xs text-gray-600">Graduate employment</p>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    15+
                  </div>
                  <p className="text-xs text-gray-600">Courses</p>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    2000+
                  </div>
                  <p className="text-xs text-gray-600">Graduates</p>
                </div>
                <div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: colors.primary }}
                  >
                    85%
                  </div>
                  <p className="text-xs text-gray-600">Salary increase</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Students"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-medium text-gray-600">
                  Your Journey Starts Here
                </p>
                <Link
                  to="/register"
                  className="text-lg font-bold flex items-center gap-2"
                  style={{ color: colors.primary }}
                >
                  Join Today <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-12" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span
                className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4"
                style={{
                  background: colors.primary + "10",
                  color: colors.primary,
                }}
              >
                🤝 COMMUNITY
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Join a Community that{" "}
                <span style={{ color: colors.secondary }}>Has Your Back</span>
              </h2>
              <p className="text-gray-600 mb-6">
                Connect, collaborate, and build lasting relationships with peers
                and mentors.
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
                <span className="text-sm">1,234 online now</span>
              </div>
              <div className="flex -space-x-2 mb-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ background: colors.blueShade }}
                  ></div>
                ))}
                <div
                  className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: colors.secondary }}
                >
                  +99
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Join 5,000+ active members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-16 my-12 bg-[#1A3D7C] text-white overflow-hidden">
        

        <div className="relative max-w-6xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              What Our Student Say
            </h2>
            <p>
              Join thousands of satisfied learners who transformed their careers with iKPACE. <br/>
              Hear their stories and see the impact for yourself.
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
                  <div className="p-8 rounded-2xl transition-all duration-300 h-full bg-white/10 backdrop-blur-sm text-white border border-white/20">
                    {/* Avatar */}
                    <div className="flex items-center object-cover text-white gap-4 mb-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-full border-4 border-[#FF7A00]"
                      />
                      <div>
                        <h4 className="font-semibold text-white">
                          {item.name}
                        </h4>
                        <span className="text-sm text-[#d8e7fd]">
                          {item.role}
                        </span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="text-[#FFD600] mb-4">★★★★★</div>

                    {/* Review */}
                    <p className="text-[#ebe8e8] italic">"{item.text}"</p>
                  </div>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Target
            size={40}
            className="mx-auto mb-4"
            style={{ color: colors.primary }}
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Start Your{" "}
            <span style={{ color: colors.secondary }}>Journey?</span>
          </h2>
          <p className="text-gray-600 mb-6">
            Join 50,000+ students who transformed their careers with iKPACE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-3 rounded-full font-bold text-white hover:scale-105 transition-all shadow-md"
              style={{ background: colors.primary }}
            >
              Start Learning Today{" "}
              <ArrowRight size={16} className="inline ml-1" />
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
        }
        
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
