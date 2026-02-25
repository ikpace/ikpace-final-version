import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
    BookOpen, Clock, ChevronDown, ChevronUp, CheckCircle,
    Award, Users, Calendar, ArrowLeft, Lock, PlayCircle,
    Star, Target, Sparkles, Rocket, GraduationCap, Lightbulb,
    FileText, MessageCircle, Download, Shield
} from 'lucide-react';

// ==================== FULL CURRICULUM DATA ====================
const curriculumData = {
    'virtual-assistant-pro': {
        title: 'Virtual Assistant Professional',
        subtitle: 'Launch your remote VA career in 6 weeks',
        duration: '6 Weeks',
        format: '2–3 classes per week',
        students: 1845,
        rating: 4.8,
        color: 'from-[#7C4DFF] to-[#448AFF]',
        accentColor: '#7C4DFF',
        icon: '💼',
        image: 'https://images.unsplash.com/photo-4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
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
        students: 2156,
        rating: 4.9,
        color: 'from-[#E040FB] to-[#FF4081]',
        accentColor: '#E040FB',
        icon: '📱',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
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
        students: 2890,
        rating: 4.8,
        color: 'from-[#00BFA5] to-[#64FFDA]',
        accentColor: '#00BFA5',
        icon: '🎨',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
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
        students: 1567,
        rating: 4.9,
        color: 'from-[#FF6D00] to-[#FFD600]',
        accentColor: '#FF6D00',
        icon: '👧',
        image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
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
        students: 3210,
        rating: 4.8,
        color: 'from-[#00C853] to-[#B2FF59]',
        accentColor: '#00C853',
        icon: '💰',
        image: 'https://images.unsplash.com/photo-4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    },
    'ai-prompt-engineering': {
        title: 'AI Prompt Engineering',
        subtitle: 'Master AI tools for content creation',
        duration: '6 weeks',
        format: 'Hands-on AI workshops',
        students: 1845,
        rating: 4.9,
        color: 'from-[#9C27B0] to-[#E91E63]',
        accentColor: '#9C27B0',
        icon: '🤖',
        image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Master AI tools for content creation and automation.',
        weeks: [
            {
                title: 'Week 1: Introduction to AI',
                topics: ['What is AI?', 'AI tools overview'],
                icon: '🤖'
            },
            {
                title: 'Week 2: Prompt Engineering Basics',
                topics: ['Crafting effective prompts', 'Understanding AI responses'],
                icon: '✍️'
            },
            {
                title: 'Week 3: Content Creation with AI',
                topics: ['Writing with AI', 'Image generation', 'Video scripting'],
                icon: '🎨'
            },
            {
                title: 'Week 4: AI for Business',
                topics: ['Automation workflows', 'AI integrations'],
                icon: '💼'
            },
            {
                title: 'Week 5: Advanced Techniques',
                topics: ['Fine-tuning prompts', 'Complex workflows'],
                icon: '🚀'
            },
            {
                title: 'Week 6: Final Project',
                topics: ['Build AI-powered solution', 'Present your work'],
                icon: '🏆'
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
    const [loading, setLoading] = useState(true);

    const course = curriculumData[slug];

    // Get enrollment info from payment state if available
    const enrollmentInfo = location.state || {};

    useEffect(() => {
        if (!course) {
            // If course not found, redirect to courses page
            navigate('/courses');
            return;
        }
        // Open the first week by default
        setOpenWeeks({ 0: true });
        // Trigger entrance animation
        setTimeout(() => setAnimateIn(true), 100);
        setLoading(false);
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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: '#1A3D7C' }}></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
                <div className="text-center">
                    <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-700">Course Not Found</h2>
                    <button
                        onClick={() => navigate('/courses')}
                        className="mt-4 px-6 py-3 bg-[#7329ce] text-white rounded-lg font-medium hover:opacity-90"
                    >
                        Browse Courses
                    </button>
                </div>
            </div>
        );
    }

    const totalTopics = course.weeks.reduce((acc, w) => acc + w.topics.length, 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Header */}
            <div className={`relative overflow-hidden bg-gradient-to-r ${course.color}`}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
                    {/* Back button */}
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back</span>
                    </button>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className={`transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">{course.icon}</span>
                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                                    {course.duration} Program
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                                {course.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 font-medium mb-6">
                                {course.subtitle}
                            </p>
                            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                                {course.description}
                            </p>

                            {/* Stats bar */}
                            <div className="flex flex-wrap items-center gap-6">
                                <div className="flex items-center gap-2 text-white">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-semibold">{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <BookOpen className="w-5 h-5" />
                                    <span className="font-semibold">{course.weeks.length} Weeks</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Target className="w-5 h-5" />
                                    <span className="font-semibold">{totalTopics} Topics</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Users className="w-5 h-5" />
                                    <span className="font-semibold">{course.students.toLocaleString()} Students</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
                                    <span className="font-semibold">{course.rating} Rating</span>
                                </div>
                            </div>
                        </div>

                        {/* Course image */}
                        <div className={`hidden lg:block transition-all duration-700 delay-200 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-black/20 rounded-2xl transform rotate-3" />
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="relative w-full h-80 object-cover rounded-2xl shadow-2xl"
                                />
                                {enrollmentInfo?.enrollmentId && (
                                    <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">Enrolled!</p>
                                            <p className="text-sm text-gray-500">Start learning now</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rest of your component remains the same... */}
            <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
                {/* Your existing curriculum content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Curriculum */}
                    <div className="lg:col-span-2">
                        {/* Section Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                                    <BookOpen className="w-8 h-8" style={{ color: course.accentColor }} />
                                    Course Curriculum
                                </h2>
                                <p className="text-gray-500 mt-1">
                                    {course.weeks.length} weeks • {totalTopics} topics • {course.format}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={expandAll}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Expand All
                                </button>
                                <button
                                    onClick={collapseAll}
                                    className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Collapse All
                                </button>
                            </div>
                        </div>

                        {/* Week Accordion Cards */}
                        <div className="space-y-4">
                            {course.weeks.map((week, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-md ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}
                                    style={{ transitionDelay: `${index * 100 + 300}ms` }}
                                >
                                    {/* Week Header */}
                                    <button
                                        onClick={() => toggleWeek(index)}
                                        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div
                                                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-sm bg-gradient-to-br ${course.color}`}
                                                    style={{ opacity: 0.15 }}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center text-2xl">
                                                    {week.icon}
                                                </div>
                                            </div>
                                            <div className="text-left">
                                                <h3 className="font-bold text-gray-900 text-lg">
                                                    {week.title}
                                                </h3>
                                                <p className="text-sm text-gray-500">
                                                    {week.topics.length} topic{week.topics.length > 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600">
                                                <Clock className="w-3 h-3" />
                                                Week {index + 1}
                                            </span>
                                            {openWeeks[index] ? (
                                                <ChevronUp className="w-5 h-5 text-gray-400" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Week Content */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openWeeks[index] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-5 pb-5 border-t border-gray-100">
                                            <ul className="mt-4 space-y-3">
                                                {week.topics.map((topic, tIndex) => (
                                                    <li
                                                        key={tIndex}
                                                        className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group"
                                                    >
                                                        <div
                                                            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                                            style={{ backgroundColor: `${course.accentColor}15` }}
                                                        >
                                                            <PlayCircle className="w-4 h-4" style={{ color: course.accentColor }} />
                                                        </div>
                                                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors flex-1">
                                                            {topic}
                                                        </span>
                                                        <CheckCircle className="w-4 h-4 text-gray-300 ml-auto flex-shrink-0" />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Completion Banner */}
                        <div className={`mt-8 bg-gradient-to-r ${course.color} rounded-2xl p-8 text-center text-white`}>
                            <Award className="w-16 h-16 mx-auto mb-4 text-white/90" />
                            <h3 className="text-2xl font-extrabold mb-2">🎉 Congratulations on Enrolling!</h3>
                            <p className="text-white/90 text-lg mb-6">
                                Complete all {course.weeks.length} weeks to earn your professional certificate
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <p className="text-2xl font-extrabold">{course.weeks.length}</p>
                                    <p className="text-sm text-white/80">Weeks</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <p className="text-2xl font-extrabold">{totalTopics}</p>
                                    <p className="text-sm text-white/80">Topics</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                                    <p className="text-2xl font-extrabold">1</p>
                                    <p className="text-sm text-white/80">Certificate</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-6">
                        {/* Enrollment confirmation card */}
                        {enrollmentInfo?.enrollmentId && (
                            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                    <h3 className="font-bold text-green-800">Payment Confirmed</h3>
                                </div>
                                <p className="text-green-700 text-sm">
                                    Your enrollment is confirmed! Start learning at your own pace.
                                </p>
                                {enrollmentInfo.enrollmentId && (
                                    <p className="text-xs text-green-600 mt-2 font-mono">
                                        Ref: {enrollmentInfo.enrollmentId.slice(0, 12)}...
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Course Progress */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Rocket className="w-5 h-5" style={{ color: course.accentColor }} />
                                Your Progress
                            </h3>
                            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                                <div
                                    className={`h-3 rounded-full bg-gradient-to-r ${course.color} transition-all duration-1000`}
                                    style={{ width: '0%' }}
                                />
                            </div>
                            <p className="text-sm text-gray-500">0 of {totalTopics} topics completed</p>
                            <p className="text-xs text-gray-400 mt-1">Start your first lesson to track progress</p>
                        </div>

                        {/* What You'll Get */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Award className="w-5 h-5 text-yellow-500" />
                                What You'll Get
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { icon: <PlayCircle className="w-4 h-4" />, text: `${totalTopics} comprehensive lessons` },
                                    { icon: <Clock className="w-4 h-4" />, text: `${course.duration} of content` },
                                    { icon: <Award className="w-4 h-4" />, text: 'Professional certificate' },
                                    { icon: <Download className="w-4 h-4" />, text: 'Downloadable resources' },
                                    { icon: <MessageCircle className="w-4 h-4" />, text: 'Community access' },
                                    { icon: <Shield className="w-4 h-4" />, text: 'Lifetime access' },
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm">
                                        <div className="text-green-500 flex-shrink-0">{item.icon}</div>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" style={{ color: course.accentColor }} />
                                Quick Actions
                            </h3>
                            <div className="space-y-3">
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className={`w-full py-3 bg-gradient-to-r ${course.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2`}
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Go to Dashboard
                                </button>
                                <button
                                    onClick={() => navigate('/courses')}
                                    className="w-full py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                                >
                                    Browse More Courses
                                </button>
                            </div>
                        </div>

                        {/* Need Help */}
                        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 text-white">
                            <h3 className="font-bold mb-2 flex items-center gap-2">
                                <MessageCircle className="w-5 h-5" />
                                Need Help?
                            </h3>
                            <p className="text-gray-300 text-sm mb-4">
                                Our support team is here to help you succeed in your learning journey.
                            </p>
                            <button
                                onClick={() => navigate('/community')}
                                className="w-full py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-colors text-sm"
                            >
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}