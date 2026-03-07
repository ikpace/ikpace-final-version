import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
    BookOpen, Clock, ChevronDown, ChevronUp, CheckCircle,
    Award, Users, Calendar, ArrowLeft, Lock, PlayCircle,
    Star, Target, Sparkles, Rocket, GraduationCap, Lightbulb,
    FileText, MessageCircle, Download, Shield, ExternalLink,
    Menu, X, Video, Calendar as CalendarIcon, AlertCircle,
    Loader, Maximize2, Minimize2, ThumbsUp, MessageSquare,
    Share2, Bookmark, Play, Pause, Volume2, VolumeX,
    Settings, Subtitles, Grid, List, RefreshCw, Wifi,
    WifiOff, MonitorSmartphone, Tablet, Smartphone
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
    white: "#FFFFFF",
    red: "#DC2626",
    purple: "#7C3AED"
};

// ==================== COURSE IMAGES ====================
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
        id: '1',
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
                icon: '📋',
                lessons: [
                    { id: 'w1l1', title: 'What is a Virtual Assistant?', type: 'video', duration: '15 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample1' },
                    { id: 'w1l2', title: 'Types of VA Services', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample2' },
                    { id: 'w1l3', title: 'Work Ethics & Professionalism', type: 'text', duration: '10 min', isLive: false }
                ]
            },
            {
                title: 'Week 2: Communication & Email Management',
                topics: ['Professional email writing', 'Calendar management', 'Scheduling tools (Google Calendar)'],
                icon: '📧',
                lessons: [
                    { id: 'w2l1', title: 'Professional Email Writing', type: 'video', duration: '25 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample3' },
                    { id: 'w2l2', title: 'Calendar Management', type: 'video', duration: '18 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample4' },
                    { id: 'w2l3', title: 'Google Calendar Mastery', type: 'video', duration: '22 min', isLive: true, liveDate: '2026-03-10T15:00:00', content_url: 'https://www.youtube.com/embed/sample5' }
                ]
            },
            {
                title: 'Week 3: Administrative Tools',
                topics: ['Google Workspace', 'Document organization', 'File management systems'],
                icon: '🛠️',
                lessons: [
                    { id: 'w3l1', title: 'Google Workspace Overview', type: 'video', duration: '30 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample6' },
                    { id: 'w3l2', title: 'Document Organization', type: 'video', duration: '15 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample7' },
                    { id: 'w3l3', title: 'File Management Systems', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample8' }
                ]
            },
            {
                title: 'Week 4: Social Media Assistance',
                topics: ['Content scheduling', 'Basic engagement management', 'Using scheduling tools'],
                icon: '📱',
                lessons: [
                    { id: 'w4l1', title: 'Content Scheduling Tools', type: 'video', duration: '25 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample9' },
                    { id: 'w4l2', title: 'Engagement Management', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample10' },
                    { id: 'w4l3', title: 'Social Media Strategy', type: 'video', duration: '35 min', isLive: true, liveDate: '2026-03-17T16:00:00', content_url: 'https://www.youtube.com/embed/sample11' }
                ]
            },
            {
                title: 'Week 5: Client Acquisition',
                topics: ['Creating a CV & portfolio', 'Freelance platforms overview', 'Pricing your services'],
                icon: '🤝',
                lessons: [
                    { id: 'w5l1', title: 'Creating a Winning CV', type: 'video', duration: '28 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample12' },
                    { id: 'w5l2', title: 'Freelance Platforms', type: 'video', duration: '32 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample13' },
                    { id: 'w5l3', title: 'Pricing Strategies', type: 'video', duration: '24 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample14' }
                ]
            },
            {
                title: 'Week 6: Final Project',
                topics: ['Create VA portfolio', 'Mock client task', 'Certification'],
                icon: '🎓',
                lessons: [
                    { id: 'w6l1', title: 'Building Your Portfolio', type: 'video', duration: '40 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample15' },
                    { id: 'w6l2', title: 'Mock Client Task', type: 'assignment', duration: '60 min', isLive: false },
                    { id: 'w6l3', title: 'Certification & Next Steps', type: 'video', duration: '15 min', isLive: true, liveDate: '2026-03-24T15:00:00', content_url: 'https://www.youtube.com/embed/sample16' }
                ]
            }
        ]
    },

    'social-media-marketing': {
        id: '2',
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
                icon: '🌐',
                lessons: [
                    { id: 'sm1l1', title: 'Social Media Platforms Overview', type: 'video', duration: '25 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample17' },
                    { id: 'sm1l2', title: 'Understanding Your Audience', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample18' }
                ]
            },
            {
                title: 'Week 2: Content Creation Strategy',
                topics: ['Content planning', 'Writing captions', 'Hashtags & trends'],
                icon: '✍️',
                lessons: [
                    { id: 'sm2l1', title: 'Content Planning Calendar', type: 'video', duration: '22 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample19' },
                    { id: 'sm2l2', title: 'Writing Engaging Captions', type: 'video', duration: '18 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample20' },
                    { id: 'sm2l3', title: 'Hashtag Strategy', type: 'video', duration: '15 min', isLive: true, liveDate: '2026-03-12T14:00:00', content_url: 'https://www.youtube.com/embed/sample21' }
                ]
            },
            {
                title: 'Week 3: Branding & Positioning',
                topics: ['Personal brand building', 'Visual consistency'],
                icon: '🏷️',
                lessons: [
                    { id: 'sm3l1', title: 'Building Your Brand', type: 'video', duration: '28 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample22' },
                    { id: 'sm3l2', title: 'Visual Branding', type: 'video', duration: '24 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample23' }
                ]
            },
            {
                title: 'Week 4: Ads & Promotions',
                topics: ['Introduction to paid ads', 'Boosting posts'],
                icon: '📣',
                lessons: [
                    { id: 'sm4l1', title: 'Facebook/Instagram Ads', type: 'video', duration: '35 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample24' },
                    { id: 'sm4l2', title: 'Budgeting for Ads', type: 'video', duration: '20 min', isLive: true, liveDate: '2026-03-19T15:30:00', content_url: 'https://www.youtube.com/embed/sample25' }
                ]
            },
            {
                title: 'Week 5: Analytics & Growth',
                topics: ['Insights & engagement tracking', 'Improving performance'],
                icon: '📊',
                lessons: [
                    { id: 'sm5l1', title: 'Understanding Analytics', type: 'video', duration: '30 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample26' },
                    { id: 'sm5l2', title: 'Growth Strategies', type: 'video', duration: '25 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample27' }
                ]
            },
            {
                title: 'Week 6: Campaign Project',
                topics: ['Create full campaign plan', 'Present strategy'],
                icon: '🚀',
                lessons: [
                    { id: 'sm6l1', title: 'Campaign Planning', type: 'video', duration: '40 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample28' },
                    { id: 'sm6l2', title: 'Campaign Presentation', type: 'assignment', duration: '45 min', isLive: true, liveDate: '2026-03-26T16:00:00' }
                ]
            }
        ]
    },

    'canva-graphic-design': {
        id: '3',
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
                icon: '🎨',
                lessons: [
                    { id: 'cd1l1', title: 'Color Theory Basics', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample29' },
                    { id: 'cd1l2', title: 'Typography Fundamentals', type: 'video', duration: '22 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample30' },
                    { id: 'cd1l3', title: 'Layout Principles', type: 'video', duration: '18 min', isLive: true, liveDate: '2026-03-08T13:00:00', content_url: 'https://www.youtube.com/embed/sample31' }
                ]
            },
            {
                title: 'Week 2: Canva Mastery',
                topics: ['Templates', 'Custom designs', 'Background removal'],
                icon: '✨',
                lessons: [
                    { id: 'cd2l1', title: 'Canva Interface Overview', type: 'video', duration: '25 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample32' },
                    { id: 'cd2l2', title: 'Working with Templates', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample33' },
                    { id: 'cd2l3', title: 'Background Removal Techniques', type: 'video', duration: '15 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample34' }
                ]
            },
            {
                title: 'Week 3: Branding Design',
                topics: ['Logo basics', 'Flyer & poster design'],
                icon: '🏢',
                lessons: [
                    { id: 'cd3l1', title: 'Logo Design Principles', type: 'video', duration: '28 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample35' },
                    { id: 'cd3l2', title: 'Flyer Design', type: 'video', duration: '24 min', isLive: true, liveDate: '2026-03-15T15:00:00', content_url: 'https://www.youtube.com/embed/sample36' },
                    { id: 'cd3l3', title: 'Poster Design', type: 'video', duration: '22 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample37' }
                ]
            },
            {
                title: 'Week 4: Final Portfolio',
                topics: ['Design social media kit', 'Branding project'],
                icon: '📁',
                lessons: [
                    { id: 'cd4l1', title: 'Creating a Social Media Kit', type: 'video', duration: '35 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample38' },
                    { id: 'cd4l2', title: 'Final Branding Project', type: 'assignment', duration: '60 min', isLive: true, liveDate: '2026-03-22T14:00:00' }
                ]
            }
        ]
    },

    'smart-kids-coding': {
        id: '4',
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
                icon: '💻',
                lessons: [
                    { id: 'kc1l1', title: 'What is Coding? (Kids Edition)', type: 'video', duration: '12 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample39' },
                    { id: 'kc1l2', title: 'Getting Started with Scratch', type: 'video', duration: '18 min', isLive: true, liveDate: '2026-03-07T10:00:00', content_url: 'https://www.youtube.com/embed/sample40' }
                ]
            },
            {
                title: 'Week 2: Animations & Stories',
                topics: ['Loops & events', 'Build simple animation'],
                icon: '🎬',
                lessons: [
                    { id: 'kc2l1', title: 'Understanding Loops', type: 'video', duration: '15 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample41' },
                    { id: 'kc2l2', title: 'Creating Animations', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample42' },
                    { id: 'kc2l3', title: 'Build Your First Story', type: 'assignment', duration: '25 min', isLive: true, liveDate: '2026-03-14T10:00:00' }
                ]
            },
            {
                title: 'Week 3: Game Creation',
                topics: ['Adding characters', 'Simple scoring system'],
                icon: '🎮',
                lessons: [
                    { id: 'kc3l1', title: 'Game Characters', type: 'video', duration: '16 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample43' },
                    { id: 'kc3l2', title: 'Scoring Systems', type: 'video', duration: '18 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample44' }
                ]
            },
            {
                title: 'Week 4: Final Game Project',
                topics: ['Build personal game', 'Presentation & certificate'],
                icon: '🏆',
                lessons: [
                    { id: 'kc4l1', title: 'Game Design Workshop', type: 'video', duration: '22 min', isLive: true, liveDate: '2026-03-21T10:00:00', content_url: 'https://www.youtube.com/embed/sample45' },
                    { id: 'kc4l2', title: 'Game Presentation', type: 'assignment', duration: '30 min', isLive: false }
                ]
            }
        ]
    },

    'freelancing-online-income': {
        id: '5',
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
                icon: '🌟',
                lessons: [
                    { id: 'fl1l1', title: 'What is Freelancing?', type: 'video', duration: '18 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample46' },
                    { id: 'fl1l2', title: 'Top Freelancing Skills', type: 'video', duration: '22 min', isLive: true, liveDate: '2026-03-09T16:00:00', content_url: 'https://www.youtube.com/embed/sample47' }
                ]
            },
            {
                title: 'Week 2: Setting Up Online Profile',
                topics: ['Creating portfolio', 'Writing proposals'],
                icon: '👤',
                lessons: [
                    { id: 'fl2l1', title: 'Creating a Winning Profile', type: 'video', duration: '25 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample48' },
                    { id: 'fl2l2', title: 'Writing Proposals', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample49' }
                ]
            },
            {
                title: 'Week 3: Getting Clients',
                topics: ['Finding jobs', 'Pricing strategy', 'Client communication'],
                icon: '🤝',
                lessons: [
                    { id: 'fl3l1', title: 'Where to Find Jobs', type: 'video', duration: '28 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample50' },
                    { id: 'fl3l2', title: 'Pricing Your Services', type: 'video', duration: '24 min', isLive: true, liveDate: '2026-03-16T15:00:00', content_url: 'https://www.youtube.com/embed/sample51' },
                    { id: 'fl3l3', title: 'Client Communication', type: 'video', duration: '20 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample52' }
                ]
            },
            {
                title: 'Week 4: Freelance Business Setup',
                topics: ['Payment methods', 'Building long-term clients', 'Final profile review'],
                icon: '🏗️',
                lessons: [
                    { id: 'fl4l1', title: 'Payment Methods', type: 'video', duration: '18 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample53' },
                    { id: 'fl4l2', title: 'Building Long-term Clients', type: 'video', duration: '22 min', isLive: false, content_url: 'https://www.youtube.com/embed/sample54' },
                    { id: 'fl4l3', title: 'Final Profile Review', type: 'assignment', duration: '30 min', isLive: true, liveDate: '2026-03-23T15:00:00' }
                ]
            }
        ]
    }
};

export default function CourseCurriculum() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, profile } = useAuth();
    
    // State management
    const [openWeeks, setOpenWeeks] = useState({});
    const [animateIn, setAnimateIn] = useState(false);
    const [imageError, setImageError] = useState({});
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [deviceType, setDeviceType] = useState('desktop');
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [liveLessons, setLiveLessons] = useState([]);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [bookmarkedLessons, setBookmarkedLessons] = useState([]);
    const [notes, setNotes] = useState({});
    const [showNotes, setShowNotes] = useState(false);
    const [currentNote, setCurrentNote] = useState('');
    const [showDiscussion, setShowDiscussion] = useState(false);
    const [showResources, setShowResources] = useState(false);
    const [enrollmentInfo, setEnrollmentInfo] = useState(location.state || {});

    const course = curriculumData[slug];
    const courseImage = courseImages[slug] || 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop';

    // ==================== SUPABASE INTEGRATION ====================
    
    // Fetch user progress from Supabase
    useEffect(() => {
        const fetchUserProgress = async () => {
            if (!user || !course) return;
            
            try {
                setLoading(true);
                
                // Fetch completed lessons
                const { data: progressData, error: progressError } = await supabase
                    .from('lesson_progress')
                    .select('lesson_id')
                    .eq('user_id', user.id)
                    .eq('course_id', course.id)
                    .eq('is_completed', true);
                
                if (progressError) throw progressError;
                
                if (progressData) {
                    setCompletedLessons(progressData.map(p => p.lesson_id));
                }
                
                // Fetch bookmarks
                const { data: bookmarkData, error: bookmarkError } = await supabase
                    .from('bookmarks')
                    .select('lesson_id')
                    .eq('user_id', user.id)
                    .eq('course_id', course.id);
                
                if (bookmarkError) throw bookmarkError;
                
                if (bookmarkData) {
                    setBookmarkedLessons(bookmarkData.map(b => b.lesson_id));
                }
                
                // Fetch notes
                const { data: notesData, error: notesError } = await supabase
                    .from('lesson_notes')
                    .select('lesson_id, notes')
                    .eq('user_id', user.id)
                    .eq('course_id', course.id);
                
                if (notesError) throw notesError;
                
                if (notesData) {
                    const notesMap = {};
                    notesData.forEach(n => {
                        notesMap[n.lesson_id] = n.notes;
                    });
                    setNotes(notesMap);
                }
                
                // Fetch live lessons
                const { data: liveData, error: liveError } = await supabase
                    .from('live_lessons')
                    .select('*')
                    .eq('course_id', course.id)
                    .order('live_date', { ascending: true });
                
                if (liveError) throw liveError;
                
                if (liveData && liveData.length > 0) {
                    // Merge with existing live lessons from curriculum data
                    const mergedLive = [...liveLessons];
                    liveData.forEach(live => {
                        // Find matching lesson in curriculum
                        course.weeks.forEach(week => {
                            week.lessons?.forEach(lesson => {
                                if (lesson.id === live.lesson_id) {
                                    mergedLive.push({
                                        ...lesson,
                                        liveDate: live.live_date,
                                        meetingUrl: live.meeting_url
                                    });
                                }
                            });
                        });
                    });
                    setLiveLessons(mergedLive);
                }
                
            } catch (error) {
                console.error('Error fetching user progress:', error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchUserProgress();
    }, [user, course]);

    // Mark lesson as complete
    const markLessonComplete = async (lessonId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        // Optimistic update
        setCompletedLessons(prev => [...prev, lessonId]);
        
        try {
            const { error } = await supabase
                .from('lesson_progress')
                .upsert({
                    user_id: user.id,
                    lesson_id: lessonId,
                    course_id: course.id,
                    is_completed: true,
                    completed_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id,lesson_id'
                });
            
            if (error) throw error;
            
        } catch (error) {
            console.error('Error marking lesson complete:', error);
            // Revert on error
            setCompletedLessons(prev => prev.filter(id => id !== lessonId));
        }
    };

    // Toggle bookmark
    const toggleBookmark = async (lessonId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        // Optimistic update
        const isBookmarked = bookmarkedLessons.includes(lessonId);
        setBookmarkedLessons(prev => 
            isBookmarked 
                ? prev.filter(id => id !== lessonId)
                : [...prev, lessonId]
        );
        
        try {
            if (isBookmarked) {
                const { error } = await supabase
                    .from('bookmarks')
                    .delete()
                    .eq('user_id', user.id)
                    .eq('lesson_id', lessonId);
                
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('bookmarks')
                    .insert({
                        user_id: user.id,
                        lesson_id: lessonId,
                        course_id: course.id
                    });
                
                if (error) throw error;
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
            // Revert on error
            setBookmarkedLessons(prev => 
                isBookmarked 
                    ? [...prev, lessonId]
                    : prev.filter(id => id !== lessonId)
            );
        }
    };

    // Save notes
    const saveNotes = async (lessonId) => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        try {
            const { error } = await supabase
                .from('lesson_notes')
                .upsert({
                    user_id: user.id,
                    lesson_id: lessonId,
                    course_id: course.id,
                    notes: currentNote,
                    updated_at: new Date().toISOString()
                }, {
                    onConflict: 'user_id,lesson_id'
                });
            
            if (error) throw error;
            
            setNotes(prev => ({ ...prev, [lessonId]: currentNote }));
            setShowNotes(false);
            
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    };

    // ==================== END SUPABASE INTEGRATION ====================

    // Detect device type
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setDeviceType('mobile');
            } else if (width < 1024) {
                setDeviceType('tablet');
            } else {
                setDeviceType('desktop');
            }
        };
        
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Check online status
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);
        
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    // Format live date
    const formatLiveDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = date - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        if (diff < 0) return 'Live Now';
        if (days > 0) return `Starts in ${days} day${days > 1 ? 's' : ''}`;
        if (hours > 0) return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
        return 'Starting soon';
    };

    // Play video
    const playVideo = (lesson) => {
        setCurrentVideo(lesson);
        setShowVideoPlayer(true);
        setIsPlaying(true);
        if (lesson.notes && notes[lesson.id]) {
            setCurrentNote(notes[lesson.id]);
        } else {
            setCurrentNote('');
        }
    };

    // Calculate progress
    const calculateProgress = () => {
        const allLessons = course?.weeks?.flatMap(w => w.lessons || []) || [];
        return allLessons.length > 0 
            ? Math.round((completedLessons.length / allLessons.length) * 100) 
            : 0;
    };

    // Get next live lesson
    const getNextLiveLesson = () => {
        const now = new Date();
        return liveLessons
            .filter(l => new Date(l.liveDate) > now)
            .sort((a, b) => new Date(a.liveDate) - new Date(b.liveDate))[0];
    };

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    useEffect(() => {
        if (!course) {
            navigate('/courses');
            return;
        }
        setOpenWeeks({ 0: true });
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
    const allLessons = course.weeks.flatMap(w => w.lessons || []);
    const progress = calculateProgress();
    const nextLive = getNextLiveLesson();

    // Responsive classes based on device type
    const responsiveClasses = {
        container: deviceType === 'mobile' ? 'px-3 py-4' : deviceType === 'tablet' ? 'px-4 py-6' : 'px-6 py-8',
        heading: deviceType === 'mobile' ? 'text-xl' : deviceType === 'tablet' ? 'text-2xl' : 'text-3xl',
        subheading: deviceType === 'mobile' ? 'text-sm' : deviceType === 'tablet' ? 'text-base' : 'text-lg',
        grid: deviceType === 'mobile' ? 'grid-cols-1' : deviceType === 'tablet' ? 'grid-cols-2' : 'grid-cols-3',
        gap: deviceType === 'mobile' ? 'gap-3' : deviceType === 'tablet' ? 'gap-4' : 'gap-6'
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* ========== MOBILE HEADER ========== */}
            {deviceType === 'mobile' && (
                <div className="sticky top-0 z-50 bg-white shadow-md px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <h1 className="font-bold text-gray-900 truncate max-w-[200px]">
                        {course.title}
                    </h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            )}

            {/* ========== OFFLINE BANNER ========== */}
            {!isOnline && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4 mx-4 rounded-lg">
                    <div className="flex items-center">
                        <WifiOff className="w-5 h-5 text-yellow-600 mr-3" />
                        <div>
                            <p className="text-sm text-yellow-700 font-medium">You're offline</p>
                            <p className="text-xs text-yellow-600">Some features may be unavailable</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== HERO HEADER ========== */}
            <div className="relative overflow-hidden" style={{ background: course.gradient }}>
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
                </div>

                <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 ${deviceType === 'mobile' ? 'py-4' : 'py-8 sm:py-12 md:py-16 lg:py-20'}`}>
                    {/* Back button - Desktop only */}
                    {deviceType !== 'mobile' && (
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 sm:gap-2 text-white/80 hover:text-white mb-4 sm:mb-6 md:mb-8 transition-colors group text-sm sm:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Courses</span>
                        </button>
                    )}

                    <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-start">
                        <div className={`transition-all duration-700 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                                <span className="text-2xl sm:text-3xl md:text-4xl">{course.icon}</span>
                                <span className="px-2 sm:px-3 md:px-4 py-0.5 sm:py-1 md:py-1.5 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs sm:text-sm font-semibold">
                                    {course.duration} Program
                                </span>
                                {nextLive && (
                                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-red-500 text-white rounded-full text-xs font-semibold animate-pulse">
                                        🔴 Live Soon
                                    </span>
                                )}
                            </div>

                            <h1 className={`${deviceType === 'mobile' ? 'text-xl' : 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl'} font-extrabold text-white mb-1 sm:mb-2 md:mb-3 leading-tight`}>
                                {course.title}
                            </h1>
                            <p className={`${deviceType === 'mobile' ? 'text-sm' : 'text-base sm:text-lg md:text-xl'} text-white/90 font-medium mb-2 sm:mb-3 md:mb-4`}>
                                {course.subtitle}
                            </p>
                            <p className={`${deviceType === 'mobile' ? 'text-xs' : 'text-sm sm:text-base'} text-white/80 leading-relaxed mb-3 sm:mb-4 md:mb-6 max-w-xl`}>
                                {course.description}
                            </p>

                            {/* Stats bar - Responsive */}
                            <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
                                <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                                    <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.weeks.length} Weeks</span>
                                </div>
                                <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                                    <Target className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{allLessons.length} Lessons</span>
                                </div>
                                <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                                    <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.students} Students</span>
                                </div>
                                <div className="flex items-center gap-1 text-white text-xs sm:text-sm">
                                    <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-300 text-yellow-300 flex-shrink-0" />
                                    <span className="font-semibold whitespace-nowrap">{course.rating}</span>
                                </div>
                            </div>
                        </div>

                        {/* Course image - Responsive */}
                        <div className={`${deviceType === 'mobile' ? 'mt-4' : 'hidden lg:block'} transition-all duration-700 delay-200 ${animateIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <div className="relative">
                                <div className="absolute inset-0 bg-black/20 rounded-xl transform rotate-3" />
                                {!imageError[slug] ? (
                                    <img
                                        src={courseImage}
                                        alt={course.title}
                                        onError={() => handleImageError(slug)}
                                        className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 object-cover rounded-xl shadow-2xl"
                                    />
                                ) : (
                                    <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-xl shadow-2xl flex items-center justify-center" style={{ background: colors.primary + '20' }}>
                                        <span className="text-5xl sm:text-6xl">{course.icon}</span>
                                    </div>
                                )}
                                <div className="absolute -bottom-3 -right-2 sm:-right-4 bg-white rounded-lg shadow-lg p-2 sm:p-3 flex items-center gap-2">
                                    <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: colors.green + '20' }}>
                                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" style={{ color: colors.green }} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-900 text-xs sm:text-sm">Enrolled!</p>
                                        <p className="text-xs text-gray-500">Start learning</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== CONTENT AREA ========== */}
            <div className={`max-w-7xl mx-auto ${responsiveClasses.container}`}>
                <div className={`grid lg:grid-cols-3 ${responsiveClasses.gap}`}>
                    {/* ========== LEFT: CURRICULUM ========== */}
                    <div className="lg:col-span-2">
                        {/* Progress Bar - Mobile */}
                        {deviceType === 'mobile' && (
                            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">Course Progress</span>
                                    <span className="text-sm font-bold" style={{ color: colors.primary }}>{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%`, background: course.gradient }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Section Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                            <div>
                                <h2 className={`${responsiveClasses.heading} font-extrabold text-gray-900 flex items-center gap-2`}>
                                    <BookOpen className={`${deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} style={{ color: course.accentColor }} />
                                    Course Curriculum
                                </h2>
                                <p className={`${responsiveClasses.subheading} text-gray-500 mt-1`}>
                                    {course.weeks.length} weeks • {allLessons.length} lessons • {course.format}
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={expandAll}
                                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Expand All
                                </button>
                                <button
                                    onClick={collapseAll}
                                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Collapse All
                                </button>
                            </div>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex justify-end mb-3">
                            <div className="bg-gray-100 rounded-lg p-1 flex gap-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-500'}`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Week Accordion Cards */}
                        <div className="space-y-3">
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
                                        className="w-full flex items-center justify-between p-3 sm:p-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                            <div className="relative flex-shrink-0">
                                                <div
                                                    className={`${deviceType === 'mobile' ? 'w-8 h-8' : 'w-10 h-10'} rounded-lg flex items-center justify-center text-lg sm:text-xl`}
                                                    style={{ background: `${course.accentColor}15` }}
                                                >
                                                    {week.icon}
                                                </div>
                                            </div>
                                            <div className="text-left min-w-0 flex-1">
                                                <h3 className={`font-bold text-gray-900 ${deviceType === 'mobile' ? 'text-sm' : 'text-base'} truncate`}>
                                                    {week.title}
                                                </h3>
                                                <p className="text-xs text-gray-500">
                                                    {week.lessons?.length || 0} lesson{week.lessons?.length !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {openWeeks[index] ? (
                                                <ChevronUp className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} />
                                            ) : (
                                                <ChevronDown className={`${deviceType === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'} text-gray-400`} />
                                            )}
                                        </div>
                                    </button>

                                    {/* Week Content */}
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openWeeks[index] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                    >
                                        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t border-gray-100">
                                            {/* Lessons */}
                                            {viewMode === 'grid' ? (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                                                    {week.lessons?.map((lesson, lIndex) => (
                                                        <div
                                                            key={lIndex}
                                                            className="p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                                                            onClick={() => lesson.type === 'video' ? playVideo(lesson) : null}
                                                        >
                                                            <div className="flex items-start gap-2">
                                                                <div className="flex-shrink-0 mt-1">
                                                                    {completedLessons.includes(lesson.id) ? (
                                                                        <CheckCircle className="w-4 h-4 text-green-500" />
                                                                    ) : (
                                                                        <PlayCircle className="w-4 h-4" style={{ color: course.accentColor }} />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="text-xs font-medium text-gray-900 truncate">
                                                                        {lesson.title}
                                                                    </p>
                                                                    <div className="flex items-center gap-2 mt-1">
                                                                        <span className="text-xs text-gray-500">{lesson.duration}</span>
                                                                        {lesson.isLive && (
                                                                            <span className="text-xs text-red-500 font-medium animate-pulse">
                                                                                🔴 LIVE
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleBookmark(lesson.id);
                                                                    }}
                                                                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                                >
                                                                    <Bookmark 
                                                                        className={`w-3 h-3 ${bookmarkedLessons.includes(lesson.id) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} 
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <ul className="mt-3 space-y-2">
                                                    {week.lessons?.map((lesson, lIndex) => (
                                                        <li
                                                            key={lIndex}
                                                            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
                                                            onClick={() => lesson.type === 'video' ? playVideo(lesson) : null}
                                                        >
                                                            <div
                                                                className={`${deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'} rounded-lg flex items-center justify-center flex-shrink-0`}
                                                                style={{ backgroundColor: `${course.accentColor}15` }}
                                                            >
                                                                {completedLessons.includes(lesson.id) ? (
                                                                    <CheckCircle className="w-3 h-3 text-green-500" />
                                                                ) : (
                                                                    <PlayCircle className="w-3 h-3" style={{ color: course.accentColor }} />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <span className={`font-medium text-gray-700 group-hover:text-gray-900 transition-colors ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                                                                    {lesson.title}
                                                                </span>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                                                                    {lesson.isLive && (
                                                                        <span className="text-xs text-red-500 font-medium animate-pulse">
                                                                            🔴 LIVE
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleBookmark(lesson.id);
                                                                }}
                                                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                            >
                                                                <Bookmark 
                                                                    className={`w-3 h-3 ${bookmarkedLessons.includes(lesson.id) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} 
                                                                />
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Completion Banner */}
                        <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl text-center text-white" style={{ background: course.gradient }}>
                            <Award className={`${deviceType === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} mx-auto mb-2 text-white/90`} />
                            <h3 className={`${deviceType === 'mobile' ? 'text-lg' : 'text-xl'} font-extrabold mb-1`}>🎉 Congratulations on Enrolling!</h3>
                            <p className={`text-white/90 ${deviceType === 'mobile' ? 'text-xs' : 'text-sm'} mb-3`}>
                                Complete all {course.weeks.length} weeks to earn your certificate
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <p className="text-base font-extrabold">{course.weeks.length}</p>
                                    <p className="text-xs text-white/80">Weeks</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <p className="text-base font-extrabold">{allLessons.length}</p>
                                    <p className="text-xs text-white/80">Lessons</p>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1.5">
                                    <p className="text-base font-extrabold">1</p>
                                    <p className="text-xs text-white/80">Certificate</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ========== RIGHT SIDEBAR ========== */}
                    <div className="space-y-4">
                        {/* Start Learning Section */}
                        <div className="bg-white rounded-xl shadow-lg border-2 overflow-hidden sticky top-4" style={{ borderColor: colors.secondary }}>
                            <div className="p-4 sm:p-5" style={{ background: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.secondary}10 100%)` }}>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`${deviceType === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} rounded-full flex items-center justify-center`} style={{ background: colors.secondary + '20' }}>
                                        <PlayCircle className={`${deviceType === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} style={{ color: colors.secondary }} />
                                    </div>
                                    <div>
                                        <h3 className={`font-extrabold ${deviceType === 'mobile' ? 'text-base' : 'text-lg'}`} style={{ color: colors.primary }}>
                                            Ready to Start?
                                        </h3>
                                        <p className="text-xs text-gray-600">
                                            {completedLessons.length} of {allLessons.length} completed
                                        </p>
                                    </div>
                                </div>
                                
                                <Link
                                    to={`/CoursePlayer/${course.id}`}
                                    className="w-full py-3 text-white rounded-lg font-bold hover:opacity-90 transition-all hover:scale-105 flex items-center justify-center gap-2 text-sm shadow-lg mb-2"
                                    style={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.orangeShade} 100%)` }}
                                >
                                    <PlayCircle className="w-4 h-4" />
                                    Continue Learning
                                </Link>
                                
                                <p className="text-xs text-center text-gray-500">
                                    {allLessons.length - completedLessons.length} lessons remaining
                                </p>
                            </div>
                        </div>

                        {/* Live Lessons Section */}
                        {liveLessons.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                    <CalendarIcon className="w-4 h-4 text-red-500" />
                                    Upcoming Live Sessions
                                </h3>
                                <div className="space-y-3">
                                    {liveLessons.slice(0, 3).map((lesson, idx) => (
                                        <div key={idx} className="flex items-start gap-2 p-2 bg-red-50 rounded-lg">
                                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                                                <Video className="w-3 h-3 text-red-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium text-gray-900 truncate">{lesson.title}</p>
                                                <p className="text-xs text-red-600 font-medium">
                                                    {formatLiveDate(lesson.liveDate)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Progress */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                <Rocket className="w-4 h-4" style={{ color: course.accentColor }} />
                                Your Progress
                            </h3>
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                                <div
                                    className="h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${progress}%`, background: course.gradient }}
                                />
                            </div>
                            <p className="text-xs text-gray-500">{completedLessons.length} of {allLessons.length} lessons completed</p>
                        </div>

                        {/* Bookmarks */}
                        {bookmarkedLessons.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                                    <Bookmark className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    Bookmarked Lessons
                                </h3>
                                <div className="space-y-2">
                                    {bookmarkedLessons.slice(0, 3).map((lessonId, idx) => {
                                        const lesson = allLessons.find(l => l.id === lessonId);
                                        return lesson ? (
                                            <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                                                <PlayCircle className="w-3 h-3 flex-shrink-0" style={{ color: course.accentColor }} />
                                                <p className="text-xs text-gray-700 truncate">{lesson.title}</p>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                            <h3 className="font-bold text-gray-900 mb-3 text-sm">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link
                                    to="/dashboard"
                                    className="w-full py-2 text-white rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 text-xs shadow"
                                    style={{ background: course.gradient }}
                                >
                                    <BookOpen className="w-3 h-3" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/community"
                                    className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-xs"
                                >
                                    <MessageCircle className="w-3 h-3" />
                                    Community
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ========== VIDEO PLAYER MODAL ========== */}
            {showVideoPlayer && currentVideo && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
                        {/* Video Header */}
                        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-bold text-sm sm:text-base">{currentVideo.title}</h3>
                                <p className="text-white/70 text-xs">{currentVideo.duration}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleBookmark(currentVideo.id)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <Bookmark className={`w-4 h-4 text-white ${bookmarkedLessons.includes(currentVideo.id) ? 'fill-yellow-500' : ''}`} />
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    {isFullscreen ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
                                </button>
                                <button
                                    onClick={() => setShowVideoPlayer(false)}
                                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Video Player */}
                        <div className="aspect-video bg-black flex items-center justify-center">
                            {currentVideo.content_url ? (
                                <iframe
                                    src={currentVideo.content_url}
                                    className="w-full h-full"
                                    allowFullScreen
                                    title={currentVideo.title}
                                />
                            ) : (
                                <div className="text-center">
                                    <PlayCircle className="w-16 h-16 text-white/50 mx-auto mb-2" />
                                    <p className="text-white/50 text-sm">Video player would be integrated here</p>
                                    <p className="text-white/30 text-xs mt-2">YouTube/Vimeo/Video URL: {currentVideo.content_url || 'Sample video'}</p>
                                </div>
                            )}
                        </div>

                        {/* Video Controls */}
                        <div className="bg-gray-900 p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        className="text-white hover:text-secondary transition-colors"
                                    >
                                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="text-white hover:text-secondary transition-colors"
                                    >
                                        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                                    </button>
                                    <button className="text-white hover:text-secondary transition-colors">
                                        <Subtitles className="w-5 h-5" />
                                    </button>
                                    <button className="text-white hover:text-secondary transition-colors">
                                        <Settings className="w-5 h-5" />
                                    </button>
                                </div>
                                <button
                                    onClick={() => markLessonComplete(currentVideo.id)}
                                    className="px-4 py-1.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                >
                                    Mark Complete
                                </button>
                            </div>

                            {/* Video Tabs */}
                            <div className="border-t border-gray-700 pt-4">
                                <div className="flex gap-4 mb-4">
                                    <button
                                        onClick={() => setShowNotes(!showNotes)}
                                        className={`text-sm font-medium pb-2 border-b-2 transition-colors ${showNotes ? 'border-secondary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                                    >
                                        Notes
                                    </button>
                                    <button
                                        onClick={() => setShowDiscussion(!showDiscussion)}
                                        className={`text-sm font-medium pb-2 border-b-2 transition-colors ${showDiscussion ? 'border-secondary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                                    >
                                        Discussion
                                    </button>
                                    <button
                                        onClick={() => setShowResources(!showResources)}
                                        className={`text-sm font-medium pb-2 border-b-2 transition-colors ${showResources ? 'border-secondary text-white' : 'border-transparent text-gray-400 hover:text-white'}`}
                                    >
                                        Resources
                                    </button>
                                </div>

                                {showNotes && (
                                    <div>
                                        <textarea
                                            className="w-full bg-gray-800 text-white text-sm p-3 rounded-lg border border-gray-700 focus:border-secondary outline-none"
                                            rows="4"
                                            placeholder="Take notes while watching..."
                                            value={currentNote}
                                            onChange={(e) => setCurrentNote(e.target.value)}
                                        />
                                        <button
                                            onClick={() => saveNotes(currentVideo.id)}
                                            className="mt-2 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                                        >
                                            Save Notes
                                        </button>
                                    </div>
                                )}

                                {showDiscussion && (
                                    <div className="text-center py-6">
                                        <MessageSquare className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">Join the discussion in our community</p>
                                        <Link
                                            to="/community"
                                            className="inline-block mt-3 px-4 py-2 bg-secondary text-white rounded-lg text-sm font-medium hover:opacity-90 transition-colors"
                                        >
                                            Go to Community
                                        </Link>
                                    </div>
                                )}

                                {showResources && (
                                    <div className="space-y-2">
                                        {['Lesson Notes PDF', 'Practice Exercise', 'Additional Reading'].map((res, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
                                                <Download className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-300 flex-1">{res}</span>
                                                <button className="text-xs text-secondary hover:underline">Download</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ========== MOBILE MENU ========== */}
            {isMobileMenuOpen && deviceType === 'mobile' && (
                <div className="fixed inset-0 z-50 bg-white">
                    <div className="flex flex-col h-full">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="font-bold text-gray-900">Menu</h2>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4">
                            <div className="space-y-4">
                                <Link
                                    to="/dashboard"
                                    className="block p-3 bg-gray-50 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <BookOpen className="w-5 h-5 mb-1" style={{ color: colors.primary }} />
                                    <span className="text-sm font-medium">Dashboard</span>
                                </Link>
                                <Link
                                    to="/community"
                                    className="block p-3 bg-gray-50 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <MessageCircle className="w-5 h-5 mb-1" style={{ color: colors.secondary }} />
                                    <span className="text-sm font-medium">Community</span>
                                </Link>
                                <Link
                                    to="/courses"
                                    className="block p-3 bg-gray-50 rounded-lg"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <BookOpen className="w-5 h-5 mb-1" style={{ color: colors.green }} />
                                    <span className="text-sm font-medium">Browse Courses</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}