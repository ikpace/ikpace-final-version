import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
    BookOpen, Clock, ChevronDown, ChevronUp, CheckCircle,
    Award, Users, Calendar, ArrowLeft, Lock, PlayCircle,
    Star, Target, Sparkles, Rocket, GraduationCap, Lightbulb,
    FileText, MessageCircle, Download, Shield, ExternalLink
} from 'lucide-react';

// ==================== BRAND COLORS ====================
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

// ==================== COURSE IMAGES (Using reliable placeholder images) ====================
const courseImages = {
    'virtual-assistant-pro': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop',
    'social-media-marketing': 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop',
    'canva-graphic-design': 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&auto=format&fit=crop',
    'smart-kids-coding': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop',
    'freelancing-online-income': 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop'
};

// ==================== FULL CURRICULUM DATA ====================
const curriculumData = {
    'virtual-assistant-pro': {
        title: 'Virtual Assistant Professional',
        subtitle: 'Launch your remote VA career in 6 weeks',
        duration: '6 Weeks',
        format: '2–3 classes per week',
        students: 127,
        rating: 4.8,
        gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
        accentColor: colors.primary,
        icon: '💼',
        description: 'This comprehensive 6-week program covers everything you need to become a professional virtual assistant. From communication mastery to client acquisition strategies.',
        weeks: [
            {
                title: 'Week 1: Introduction to Virtual Assistance',
                topics: ['What is a Virtual Assistant?', 'Types of VA services', 'Work ethics & professionalism'],
                icon: '📋'
            },
            {
                title: 'Week 2: Communication & Email Management',
                topics: ['Professional email writing', 'Calendar management', 'Scheduling tools (Google Calendar)'],
                icon: '📧'
            },
            {
                title: 'Week 3: Administrative Tools',
                topics: ['Google Workspace', 'Document organization', 'File management systems'],
                icon: '🛠️'
            },
            {
                title: 'Week 4: Social Media Assistance',
                topics: ['Content scheduling', 'Basic engagement management', 'Using scheduling tools'],
                icon: '📱'
            },
            {
                title: 'Week 5: Client Acquisition',
                topics: ['Creating a CV & portfolio', 'Freelance platforms overview', 'Pricing your services'],
                icon: '🤝'
            },
            {
                title: 'Week 6: Final Project',
                topics: ['Create VA portfolio', 'Mock client task', 'Certification'],
                icon: '🎓'
            }
        ]
    },

    'social-media-marketing': {
        title: 'Social Media Marketing',
        subtitle: 'Master social media strategy, ads & analytics',
        duration: '6 Weeks',
        format: 'Self-paced with live sessions',
        students: 89,
        rating: 4.9,
        gradient: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.orangeShade} 100%)`,
        accentColor: colors.secondary,
        icon: '📱',
        description: 'This 6-week course takes you from understanding platforms to creating full campaign strategies with paid promotions and analytics.',
        weeks: [
            {
                title: 'Week 1: Social Media Basics',
                topics: ['Platforms overview', 'Understanding target audience'],
                icon: '🌐'
            },
            {
                title: 'Week 2: Content Creation Strategy',
                topics: ['Content planning', 'Writing captions', 'Hashtags & trends'],
                icon: '✍️'
            },
            {
                title: 'Week 3: Branding & Positioning',
                topics: ['Personal brand building', 'Visual consistency'],
                icon: '🏷️'
            },
            {
                title: 'Week 4: Ads & Promotions',
                topics: ['Introduction to paid ads', 'Boosting posts'],
                icon: '📣'
            },
            {
                title: 'Week 5: Analytics & Growth',
                topics: ['Insights & engagement tracking', 'Improving performance'],
                icon: '📊'
            },
            {
                title: 'Week 6: Campaign Project',
                topics: ['Create full campaign plan', 'Present strategy'],
                icon: '🚀'
            }
        ]
    },

    'canva-graphic-design': {
        title: 'Canva & Graphic Design',
        subtitle: 'Create stunning visuals & build your design portfolio',
        duration: '4 Weeks',
        format: 'Hands-on design workshops',
        students: 156,
        rating: 4.8,
        gradient: `linear-gradient(135deg, ${colors.green} 0%, ${colors.primary} 100%)`,
        accentColor: colors.green,
        icon: '🎨',
        description: 'Learn design fundamentals, master Canva, and build a professional portfolio with branding projects in just 4 weeks.',
        weeks: [
            {
                title: 'Week 1: Design Fundamentals',
                topics: ['Color theory', 'Fonts & layout'],
                icon: '🎨'
            },
            {
                title: 'Week 2: Canva Mastery',
                topics: ['Templates', 'Custom designs', 'Background removal'],
                icon: '✨'
            },
            {
                title: 'Week 3: Branding Design',
                topics: ['Logo basics', 'Flyer & poster design'],
                icon: '🏢'
            },
            {
                title: 'Week 4: Final Portfolio',
                topics: ['Design social media kit', 'Branding project'],
                icon: '📁'
            }
        ]
    },

    'smart-kids-coding': {
        title: 'Smart Kids Coding',
        subtitle: 'Fun coding adventures for ages 6–12',
        duration: '4 Weeks',
        format: 'Interactive kids program',
        students: 67,
        rating: 4.9,
        gradient: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.yellow} 100%)`,
        accentColor: colors.secondary,
        icon: '👧',
        description: 'Introduce kids ages 6–12 to coding through Scratch! Build animations, stories, and their very own games in a fun 4-week program.',
        weeks: [
            {
                title: 'Week 1: Introduction to Coding',
                topics: ['What is coding?', 'Scratch basics'],
                icon: '💻'
            },
            {
                title: 'Week 2: Animations & Stories',
                topics: ['Loops & events', 'Build simple animation'],
                icon: '🎬'
            },
            {
                title: 'Week 3: Game Creation',
                topics: ['Adding characters', 'Simple scoring system'],
                icon: '🎮'
            },
            {
                title: 'Week 4: Final Game Project',
                topics: ['Build personal game', 'Presentation & certificate'],
                icon: '🏆'
            }
        ]
    },

    'freelancing-online-income': {
        title: 'Freelancing & Online Income',
        subtitle: 'Start earning online in 4 weeks',
        duration: '4 Weeks',
        format: 'Practical business training',
        students: 203,
        rating: 4.8,
        gradient: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.green} 100%)`,
        accentColor: colors.primary,
        icon: '💰',
        description: 'Learn to launch your freelancing career from scratch — create winning profiles, find clients, set pricing, and build a sustainable business.',
        weeks: [
            {
                title: 'Week 1: Introduction to Freelancing',
                topics: ['What is freelancing?', 'Popular skills'],
                icon: '🌟'
            },
            {
                title: 'Week 2: Setting Up Online Profile',
                topics: ['Creating portfolio', 'Writing proposals'],
                icon: '👤'
            },
            {
                title: 'Week 3: Getting Clients',
                topics: ['Finding jobs', 'Pricing strategy', 'Client communication'],
                icon: '🤝'
            },
            {
                title: 'Week 4: Freelance Business Setup',
                topics: ['Payment methods', 'Building long-term clients', 'Final profile review'],
                icon: '🏗️'
            }
        ]
    }
};

export default function CourseCurriculum() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [openWeeks, setOpenWeeks] = useState({});
    const [animateIn, setAnimateIn] = useState(false);
    const [imageError, setImageError] = useState({});

    const course = curriculumData[slug];
    const courseImage = courseImages[slug] || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop';

    // Get enrollment info from payment state if available
    const enrollmentInfo = location.state || {};

    useEffect(() => {
        if (!course) {
            navigate('/courses');
            return;
        }
        // Open the first week by default
        setOpenWeeks({ 0: true });
        // Trigger entrance animation
        setTimeout(() => setAnimateIn(true), 100);
    }, [course, navigate]);

    const toggleWeek = (index) => {
        setOpenWeeks(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const expandAll = () => {
        const all = {};
        course.weeks.forEach((_, i) => { all[i] = true; });
        setOpenWeeks(all);
    };

    const collapseAll = () => {
        setOpenWeeks({});
    };

    const handleImageError = (courseId) => {
        setImageError(prev => ({ ...prev, [courseId]: true }));
    };

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center px-4">
                <div className="text-center">
                    <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-700">Course Not Found</h2>
                    <Link
                        to="/courses"
                        className="inline-block mt-4 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105"
                        style={{ background: colors.primary }}
                    >
                        Browse Courses
                    </Link>
                </div>
            </div>
        );
    }

    const totalTopics = course.weeks.reduce((acc, w) => acc + w.topics.length, 0);

    return (
        <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${colors.lightGray} 0%, ${colors.white} 100%)` }}>
            {/* ========== HERO HEADER ========== */}
            <div className="relative overflow-hidden" style={{ background: course.gradient }}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
                    {/* Back button - Active link */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 md:mb-8 transition-colors group text-sm sm:text-base"
                    >
                        <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
                        <div className={`transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                                <span className="text-3xl sm:text-4xl">{course.icon}</span>
                                <span className="px-3 sm:px-4 py-1 sm:py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-semibold">
                                    {course.duration} Program
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium mb-3 sm:mb-4 md:mb-6">
                                {course.subtitle}
                            </p>
                            <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed mb-4 sm:mb-6 md:mb-8 max-w-xl">
                                {course.description}
                            </p>

                            {/* Stats bar - Scrollable on mobile */}
                            <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6">
                                <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.weeks.length} Weeks</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                                    <Target className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{totalTopics} Topics</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                                    <Users className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.students} Students</span>
                                </div>
                                <div className="flex items-center gap-1 sm:gap-2 text-white text-xs sm:text-sm">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 fill-yellow-300 text-yellow-300 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.rating} Rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Course image - Hidden on mobile, visible on lg screens */}
                        <div className={`hidden lg:block transition-all duration-700 delay-200 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-black/20 rounded-xl sm:rounded-2xl transform rotate-3" />
                                {!imageError[slug] ? (
                                    <img
                                        src={courseImage}
                                        alt={course.title}
                                        onError={() => handleImageError(slug)}
                                        className="relative w-full h-64 sm:h-72 md:h-80 object-cover rounded-xl sm:rounded-2xl shadow-2xl"
                                    />
                                ) : (
                                    <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-xl sm:rounded-2xl shadow-2xl flex items-center justify-center" style={{ background: colors.primary + '20' }}>
                                        <span className="text-6xl">{course.icon}</span>
                                    </div>
                                )}
                                <div className="absolute -bottom-4 -right-2 sm:-right-4 bg-white rounded-lg sm:rounded-xl shadow-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
                                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ color: colors.green }} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-sm sm:text-base">Enrolled!</p>
                                        <p className="text-xs sm:text-sm text-gray-500">Start learning now</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== CONTENT AREA ========== */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
                <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* ========== LEFT: CURRICULUM ========== */}
                    <div className="lg:col-span-2">
                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                            <div>
                                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 flex items-center gap-2 sm:gap-3">
                                    <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" style={{ color: course.accentColor }} />
                                    Course Curriculum
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 mt-1">
                                    {course.weeks.length} weeks • {totalTopics} topics • {course.format}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={expandAll}
                                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Expand All
                                </button>
                                <button
                                    onClick={collapseAll}
                                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Collapse All
                                </button>
                            </div>
                        </div>

                        {/* Week Accordion Cards */}
                        <div className="space-y-3 sm:space-y-4">
                            {course.weeks.map((week, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-md ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                                >
                                    {/* Week Header */}
                                    <button
                                        onClick={() => toggleWeek(index)}
                                        className="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0 flex-1">
                                            <div className="relative flex-shrink-0">
                                                <div
                                                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl flex items-center justify-center text-lg sm:text-xl md:text-2xl"
                                                    style={{ background: `${course.accentColor}15` }}
                                                >
                                                    {week.icon}
                                                </div>
                                            </div>
                                            <div className="text-left min-w-0 flex-1">
                                                <h3 className="font-bold text-gray-900 text-sm sm:text-base md:text-lg truncate">
                                                    {week.title}
                                                </h3>
                                                <p className="text-xs sm:text-sm text-gray-500">
                                                    {week.topics.length} topic{week.topics.length > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                                            <span className="hidden xs:inline-flex items-center gap-1 px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                                <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
                                                Week {index + 1}
                                            </span>
                                            {openWeeks[index] ? (
                                                <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Week Content */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openWeeks[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 border-t border-gray-100">
                                            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                                                {week.topics.map((topic, tIndex) => (
                                                    <li
                                                        key={tIndex}
                                                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                                                    >
                                                        <div
                                                            className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                            style={{ backgroundColor: `${course.accentColor}15` }}
                                                        >
                                                            <PlayCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" style={{ color: course.accentColor }} />
                                                        </div>
                                                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors text-xs sm:text-sm md:text-base flex-1">
                                                            {topic}
                                                        </span>
                                                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gray-300 ml-auto flex-shrink-0" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Completion Banner */}
                        <div className="mt-6 sm:mt-8 p-6 sm:p-8 rounded-xl sm:rounded-2xl text-center text-white" style={{ background: course.gradient }}>
                            <Award className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 text-white/90" />
                            <h3 className="text-xl sm:text-2xl font-extrabold mb-2">🎉 Congratulations on Enrolling!</h3>
                            <p className="text-white/90 text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                                Complete all {course.weeks.length} weeks to earn your professional certificate
                            </p>
                            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3">
                                    <p className="text-xl sm:text-2xl font-extrabold">{course.weeks.length}</p>
                                    <p className="text-xs sm:text-sm text-white/80">Weeks</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3">
                                    <p className="text-xl sm:text-2xl font-extrabold">{totalTopics}</p>
                                    <p className="text-xs sm:text-sm text-white/80">Topics</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3">
                                    <p className="text-xl sm:text-2xl font-extrabold">1</p>
                                    <p className="text-xs sm:text-sm text-white/80">Certificate</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== RIGHT SIDEBAR ========== */}
                    <div className="space-y-4 sm:space-y-6">
                        {/* Enrollment confirmation card */}
                        {enrollmentInfo?.enrollmentId && (
                            <div className="p-4 sm:p-5 rounded-xl border" style={{ background: colors.green + '10', borderColor: colors.green }}>
                                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: colors.green }} />
                                    <h3 className="font-bold text-sm sm:text-base" style={{ color: colors.green }}>Payment Confirmed</h3>
                                </div>
                                <p className="text-xs sm:text-sm" style={{ color: colors.green + 'CC' }}>
                                    Your enrollment is confirmed! Start learning at your own pace.
                                </p>
                                {enrollmentInfo.enrollmentId && (
                                    <p className="text-xs text-green-600 mt-2 font-mono break-all">
                                        Ref: {enrollmentInfo.enrollmentId.slice(0, 12)}...
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Course Progress */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
                            <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: course.accentColor }} />
                                Your Progress
                            </h3>
                            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 md:h-3 mb-2 sm:mb-3">
                                <div
                                    className="h-2 sm:h-2.5 md:h-3 rounded-full transition-all duration-1000"
                                    style={{ width: '0%', background: course.gradient }}
                                />
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500">0 of {totalTopics} topics completed</p>
                            <p className="text-xs text-gray-400 mt-1">Start your first lesson to track progress</p>
                        </div>

                        {/* What You'll Get */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
                            <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                <Award className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.yellow }} />
                                What You'll Get
                            </h3>
                            <ul className="space-y-2 sm:space-y-3">
                                {[
                                    { icon: <PlayCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: `${totalTopics} comprehensive lessons` },
                                    { icon: <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: `${course.duration} of content` },
                                    { icon: <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: 'Professional certificate' },
                                    { icon: <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: 'Downloadable resources' },
                                    { icon: <MessageCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: 'Community access' },
                                    { icon: <Shield className="w-3 h-3 sm:w-3.5 sm:h-3.5" />, text: 'Lifetime access' },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-700 text-xs sm:text-sm">
                                        <div className="flex-shrink-0" style={{ color: colors.green }}>{item.icon}</div>
                                        <span className="flex-1">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Actions - Active links with brighter buttons */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-5 md:p-6">
                            <h3 className="font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: course.accentColor }} />
                                Quick Actions
                            </h3>
                            <div className="space-y-2 sm:space-y-3">
                                <Link
                                    to="/dashboard"
                                    className="w-full py-2.5 sm:py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg"
                                    style={{ background: course.gradient }}
                                >
                                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Go to Dashboard
                                </Link>
                                <Link
                                    to="/courses"
                                    className="w-full py-2.5 sm:py-3 bg-white border-2 rounded-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                                    style={{ borderColor: colors.secondary, color: colors.secondary }}
                                >
                                    <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                                    Browse More Courses
                                </Link>
                            </div>
                        </div>

                        {/* Need Help - Active link */}
                        <Link
                            to="/community"
                            className="block p-4 sm:p-5 md:p-6 rounded-xl text-white transition-all hover:scale-105 hover:shadow-xl"
                            style={{ background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)` }}
                        >
                            <h3 className="font-bold mb-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                                Need Help?
                            </h3>
                            <p className="text-white/80 text-xs sm:text-sm mb-3 sm:mb-4">
                                Our support team is here to help you succeed in your learning journey.
                            </p>
                            <div className="w-full py-2 sm:py-2.5 bg-white/20 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/30 transition-colors text-xs sm:text-sm text-center">
                                Contact Support
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}