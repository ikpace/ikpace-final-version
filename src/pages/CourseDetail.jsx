import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  Star, Clock, Users, CheckCircle, Award, Calendar,
  Shield, ShoppingCart, Video, FileText, Download,
  MessageCircle, PlayCircle, BookOpen, Target, Zap,
  TrendingUp, Heart, ChevronRight, ArrowLeft,
  Mail, Phone, Globe, Facebook, Twitter, Linkedin,
  Instagram, Youtube, ExternalLink, Share2, Bookmark,
  BookmarkCheck, Brain, Code, Home, TrendingUp as TrendingUpIcon,
  Cpu, DollarSign, Palette, Briefcase, MessageSquare,
  Percent, Users as UsersIcon, Coffee, Sparkles, Rocket,
  Wifi, Monitor, Smartphone, Headphones, Camera,
  Settings, Database, Server, Cloud, Terminal,
  Mail as EmailIcon, CreditCard, ShoppingBag, BarChart,
  PieChart, Lock, Bitcoin, Megaphone, ThumbsUp, Medal
} from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [enrolled, setEnrolled] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // ==================== ALL COURSES WITH DETAILED INFORMATION ====================
  const allCourses = {
    // ==================== SOCIAL MEDIA COURSES ====================
    'tiktok-mastery': {
      id: 'tiktok-mastery',
      title: 'TikTok Monetization Mastery',
      subtitle: 'From 0 views to paid brand deals in 30 days',
      description: 'Master TikTok algorithm, viral content creation, brand partnerships.',
      fullDescription: 'This comprehensive 6-week course will teach you everything about TikTok monetization. Learn content strategy, video editing, engagement techniques, and how to turn your TikTok into a profitable business. Perfect for beginners wanting to earn from social media.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks (2-3 hours/week)',
      students: 2847,
      rating: 4.9,
      category: 'social',
      level: 'beginner',
      instructor: 'Alex Chen - TikTok Expert (2M+ followers)',
      instructorTitle: 'TikTok Monetization Expert',
      instructorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      featured: true,
      badge: '🔥 #1 SELLER',
      badgeColor: 'bg-gradient-to-r from-[#FF0050] to-[#FF9100]',
      tags: ['Viral Content', 'Brand Deals', 'Monetization', 'Algorithm'],
      features: ['30-day money back', 'Certificate included', 'Community access', 'Lifetime updates'],
      discount: 85,
      color: 'from-[#FF0050] to-[#FF9100]',
      learningOutcomes: [
        'Master TikTok algorithm and content strategy',
        'Create viral content that attracts millions of views',
        'Land brand deals and sponsorship opportunities',
        'Build a sustainable income from TikTok',
        'Grow your following from 0 to 100K+'
      ],
      requirements: [
        'Smartphone with TikTok app',
        'Basic video editing skills (CapCut/InShot)',
        'Consistent posting schedule',
        'Creative mindset'
      ],
      toolsNeeded: ['Smartphone', 'CapCut/InShot app', 'Good lighting setup', 'External microphone'],
      timeCommitment: '2-3 hours per week for 6 weeks',
      modules: [
        {
          title: 'Week 1-2: TikTok Basics & Algorithm',
          duration: '4 hours',
          lessons: 8,
          topics: [
            'Understanding TikTok Algorithm',
            'Creating Your First Viral Video',
            'Hashtag Strategy',
            'Optimal Posting Times',
            'Engagement Techniques'
          ]
        },
        {
          title: 'Week 3-4: Content Creation Mastery',
          duration: '6 hours',
          lessons: 10,
          topics: [
            'Video Editing Techniques',
            'Trend Identification',
            'Script Writing',
            'Lighting & Sound',
            'Thumbnail Design'
          ]
        },
        {
          title: 'Week 5-6: Monetization Strategies',
          duration: '8 hours',
          lessons: 12,
          topics: [
            'Brand Deal Negotiation',
            'Affiliate Marketing',
            'Live Streaming',
            'Digital Products',
            'Course Creation'
          ]
        }
      ],
      testimonials: [
        {
          name: 'Sarah Johnson',
          role: 'Content Creator',
          rating: 5,
          text: 'This course changed my life! Went from 0 to 500K followers in 3 months.'
        },
        {
          name: 'Mike Rodriguez',
          role: 'Digital Marketer',
          rating: 5,
          text: 'The brand deal strategies alone were worth the price. Highly recommended!'
        }
      ],
      lessons: 30,
      projects: 5,
      monthsToComplete: '1.5 months',
      weeklyHours: '2-3 hours'
    },

    'smm': {
      id: 'smm',
      title: 'Social Media Marketing Mastery',
      subtitle: 'Complete social media strategy for all platforms',
      description: 'Complete social media marketing strategy for all platforms',
      fullDescription: 'Master social media marketing across Facebook, Instagram, LinkedIn, Twitter, and TikTok. Learn content strategy, ad management, analytics, and community building.',
      price: 249,
      originalPrice: 399,
      duration: '8 weeks',
      students: 892,
      rating: 4.7,
      category: 'marketing',
      level: 'Intermediate',
      instructor: 'Sarah Johnson - SMM Expert',
      instructorTitle: 'Social Media Marketing Expert',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      featured: false,
      badge: 'POPULAR',
      badgeColor: 'bg-gradient-to-r from-[#FF6B00] to-[#FFA500]',
      tags: ['Social Media', 'Marketing', 'Strategy', 'Ads'],
      features: ['Ad templates', 'Strategy guide', 'Analytics tools'],
      discount: 0,
      color: 'from-[#FF6B00] to-[#FFA500]',
      learningOutcomes: [
        'Master social media marketing across platforms',
        'Create effective content strategies',
        'Run successful ad campaigns',
        'Analyze and optimize performance',
        'Build engaged communities'
      ],
      requirements: [
        'Basic social media knowledge',
        'Computer with internet',
        'Marketing interest',
        'Analytical mindset'
      ],
      toolsNeeded: ['Meta Business Suite', 'Google Analytics', 'Canva', 'Scheduling tools'],
      timeCommitment: '3-4 hours per week for 8 weeks',
      modules: [
        {
          title: 'Week 1-2: Platform Mastery',
          duration: '6 hours',
          lessons: 12,
          topics: ['Facebook Marketing', 'Instagram Strategy', 'LinkedIn Growth', 'Twitter Tactics']
        },
        {
          title: 'Week 3-4: Content Strategy',
          duration: '6 hours',
          lessons: 12,
          topics: ['Content Planning', 'Visual Creation', 'Copywriting', 'Hashtag Research']
        },
        {
          title: 'Week 5-8: Ads & Analytics',
          duration: '8 hours',
          lessons: 16,
          topics: ['Ad Campaign Setup', 'Budget Management', 'Analytics Tracking', 'ROI Optimization']
        }
      ],
      testimonials: [
        {
          name: 'John Smith',
          role: 'Marketing Manager',
          rating: 5,
          text: 'Increased our engagement by 300% with these strategies!'
        }
      ],
      lessons: 40,
      projects: 6,
      monthsToComplete: '2 months',
      weeklyHours: '3-4 hours'
    },

    'social-media-marketing': {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      subtitle: 'Master social media strategy, ads & analytics',
      description: 'Master social media strategy, ads & analytics',
      fullDescription: 'Learn the fundamentals of social media marketing including content creation, scheduling, analytics, and paid advertising strategies.',
      price: 7,
      originalPrice: 49,
      duration: '6 weeks',
      students: 1876,
      rating: 4.7,
      category: 'social',
      level: 'beginner',
      instructor: 'Kofi Asante - Digital Marketing Expert',
      instructorTitle: 'Social Media Strategist',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800',
      featured: true,
      badge: 'BESTSELLER',
      badgeColor: 'bg-gradient-to-r from-[#1DA1F2] to-[#00D1FF]',
      tags: ['Social Media', 'Ads', 'Analytics', 'Strategy'],
      features: ['Campaign templates', 'Analytics guide', 'Certificate'],
      discount: 85,
      color: 'from-[#1DA1F2] to-[#00D1FF]',
      learningOutcomes: [
        'Understand all major social media platforms',
        'Create effective content & caption strategies',
        'Build a personal brand with visual consistency',
        'Run paid ads and boost posts effectively',
        'Track analytics and improve performance',
        'Create and present a full campaign plan'
      ],
      requirements: ['Social media accounts', 'Smartphone or computer', 'Basic writing skills', 'Creative thinking'],
      toolsNeeded: ['Social media accounts', 'Canva', 'Meta Ads Manager', 'Analytics tools'],
      timeCommitment: '4-6 hours per week for 6 weeks',
      modules: [
        { title: 'Week 1: Social Media Basics', duration: '3 hours', lessons: 2, topics: ['Platforms overview', 'Understanding target audience'] },
        { title: 'Week 2: Content Creation Strategy', duration: '4 hours', lessons: 3, topics: ['Content planning', 'Writing captions', 'Hashtags & trends'] },
        { title: 'Week 3: Branding & Positioning', duration: '3 hours', lessons: 2, topics: ['Personal brand building', 'Visual consistency'] },
        { title: 'Week 4: Ads & Promotions', duration: '3 hours', lessons: 2, topics: ['Introduction to paid ads', 'Boosting posts'] },
        { title: 'Week 5: Analytics & Growth', duration: '3 hours', lessons: 2, topics: ['Insights & engagement tracking', 'Improving performance'] },
        { title: 'Week 6: Campaign Project', duration: '4 hours', lessons: 2, topics: ['Create full campaign plan', 'Present strategy'] }
      ],
      testimonials: [
        { name: 'Nana Ama', role: 'Brand Manager', rating: 5, text: 'This course gave me the confidence to run ads for my business!' },
        { name: 'Yaw Boateng', role: 'Entrepreneur', rating: 5, text: 'Doubled my engagement in just 3 weeks applying these strategies.' }
      ],
      lessons: 13,
      projects: 2,
      monthsToComplete: '1.5 months',
      weeklyHours: '4-6 hours'
    },

    // ==================== AI & AUTOMATION COURSES ====================
    'ai-prompt-engineering': {
      id: 'ai-prompt-engineering',
      title: 'AI Prompt Engineering Pro',
      subtitle: 'Master ChatGPT, Claude & Gemini for maximum results',
      description: 'Become an AI prompt expert for content creation and automation.',
      fullDescription: 'This 6-week course teaches you to master AI prompt engineering. Learn advanced techniques for content creation, coding, analysis, and business automation using ChatGPT, Claude, Gemini, and other AI tools.',
      price: 7,
      originalPrice: 79,
      duration: '6 Weeks (3-4 hours/week)',
      students: 3456,
      rating: 4.9,
      category: 'ai',
      level: 'beginner',
      instructor: 'Dr. Alan Turing - AI Researcher',
      instructorTitle: 'AI Prompt Engineering Expert',
      instructorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      featured: true,
      badge: '🔥 VERY HOT',
      badgeColor: 'bg-gradient-to-r from-[#00D1FF] to-[#0088FF]',
      tags: ['ChatGPT', 'Automation', 'AI Tools', 'Prompting'],
      features: ['Prompt library', 'Real projects', 'Certification', 'AI Tools'],
      discount: 91,
      color: 'from-[#00D1FF] to-[#0088FF]',
      learningOutcomes: [
        'Master advanced prompt engineering',
        'Automate business processes with AI',
        'Create high-quality content faster',
        'Solve complex problems with AI',
        'Build AI-powered applications'
      ],
      requirements: [
        'Basic computer skills',
        'Internet access',
        'Curiosity about AI',
        'Problem-solving mindset'
      ],
      toolsNeeded: ['ChatGPT Plus', 'Claude AI', 'Gemini', 'Notion/Airtable'],
      timeCommitment: '3-4 hours per week for 6 weeks',
      modules: [
        {
          title: 'Week 1-2: Prompt Engineering Fundamentals',
          duration: '8 hours',
          lessons: 16,
          topics: ['Basic Prompts', 'Advanced Techniques', 'Best Practices', 'Prompt Patterns']
        },
        {
          title: 'Week 3-4: AI Tool Mastery',
          duration: '8 hours',
          lessons: 16,
          topics: ['ChatGPT', 'Claude', 'Gemini', 'Midjourney', 'Stable Diffusion']
        },
        {
          title: 'Week 5-6: Real-world Applications',
          duration: '8 hours',
          lessons: 16,
          topics: ['Business Automation', 'Content Creation', 'Data Analysis', 'Coding Assistance']
        }
      ],
      testimonials: [
        {
          name: 'Mark Thompson',
          role: 'Software Developer',
          rating: 5,
          text: 'This course made me 10x more productive with AI!'
        }
      ],
      lessons: 48,
      projects: 8,
      monthsToComplete: '1.5 months',
      weeklyHours: '3-4 hours'
    },

    'ai-business-automation': {
      id: 'ai-business-automation',
      title: 'AI Tools for Business Automation',
      subtitle: 'Automate 80% of your business tasks with AI',
      description: 'Learn to use AI for customer service, content creation, and data analysis.',
      fullDescription: 'This 5-week course teaches you to leverage AI tools to automate repetitive business tasks, improve efficiency, and save 20+ hours weekly. Learn practical AI applications in customer service, content creation, data analysis, and workflow automation.',
      price: 7,
      originalPrice: 59,
      duration: '5 Weeks (3-4 hours/week)',
      students: 2789,
      rating: 4.8,
      category: 'ai',
      level: 'intermediate',
      instructor: 'Sarah Wilson - AI Automation Specialist',
      instructorTitle: 'Business Automation Expert',
      instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800',
      featured: true,
      badge: '⏰ TIME SAVER',
      badgeColor: 'bg-gradient-to-r from-[#00E676] to-[#00C853]',
      tags: ['Automation', 'Productivity', 'Business AI', 'Workflow'],
      features: ['Workflow templates', 'Tool stack', 'Implementation guide'],
      discount: 88,
      color: 'from-[#00E676] to-[#00C853]',
      learningOutcomes: [
        'Automate customer service with AI',
        'Streamline content creation processes',
        'Implement AI for data analysis',
        'Reduce operational costs',
        'Scale business operations'
      ],
      requirements: [
        'Basic business knowledge',
        'Computer skills',
        'Openness to automation',
        'Problem-solving ability'
      ],
      toolsNeeded: ['Zapier/Make.com', 'AI writing tools', 'CRM software', 'Analytics tools'],
      timeCommitment: '3-4 hours per week for 5 weeks',
      modules: [
        {
          title: 'Week 1: AI Automation Basics',
          duration: '4 hours',
          lessons: 8,
          topics: ['Process Identification', 'Tool Selection', 'Implementation Planning', 'ROI Calculation']
        },
        {
          title: 'Week 2-3: Customer Service Automation',
          duration: '8 hours',
          lessons: 16,
          topics: ['Chatbot Setup', 'Email Automation', 'Ticket Management', 'Customer Support AI']
        },
        {
          title: 'Week 4-5: Business Process Automation',
          duration: '8 hours',
          lessons: 16,
          topics: ['Workflow Optimization', 'Integration Strategies', 'Scaling Automation', 'Maintenance']
        }
      ],
      testimonials: [
        {
          name: 'Robert Kim',
          role: 'Entrepreneur',
          rating: 5,
          text: 'Saved 30 hours per week after implementing these automations!'
        }
      ],
      lessons: 40,
      projects: 6,
      monthsToComplete: '1.5 months',
      weeklyHours: '3-4 hours'
    },

    // ==================== DESIGN COURSES ====================
    'canva-design': {
      id: 'canva-design',
      title: 'Canva & Graphic Design Pro',
      subtitle: 'Create stunning designs like a pro',
      description: 'Master Canva and create stunning designs',
      fullDescription: 'Learn to create professional designs using Canva. Master typography, color theory, branding, and create social media graphics, presentations, and marketing materials.',
      price: 199,
      originalPrice: 299,
      duration: '4 weeks',
      students: 756,
      rating: 4.9,
      category: 'design',
      level: 'beginner',
      instructor: 'Emma Davis - Design Expert',
      instructorTitle: 'Graphic Design Expert',
      instructorImage: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=400',
      image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800',
      featured: false,
      badge: 'TOP RATED',
      badgeColor: 'bg-gradient-to-r from-[#7B68EE] to-[#9370DB]',
      tags: ['Canva', 'Graphic Design', 'Branding', 'Visual'],
      features: ['Design templates', 'Portfolio project', 'Certificate'],
      discount: 0,
      color: 'from-[#7B68EE] to-[#9370DB]',
      learningOutcomes: [
        'Master Canva design tools',
        'Understand color theory and typography',
        'Create professional graphics',
        'Build brand identities',
        'Design social media content'
      ],
      requirements: [
        'Computer with internet',
        'Free Canva account',
        'Creative interest',
        'Basic computer skills'
      ],
      toolsNeeded: ['Canva Pro', 'Color palette tools', 'Font resources', 'Design inspiration sites'],
      timeCommitment: '3-4 hours per week for 4 weeks',
      modules: [
        {
          title: 'Week 1: Design Fundamentals',
          duration: '4 hours',
          lessons: 8,
          topics: ['Color Theory', 'Typography Basics', 'Layout Principles', 'Brand Identity']
        },
        {
          title: 'Week 2-3: Canva Mastery',
          duration: '6 hours',
          lessons: 12,
          topics: ['Canva Interface', 'Templates', 'Custom Designs', 'Animations']
        },
        {
          title: 'Week 4: Portfolio Projects',
          duration: '4 hours',
          lessons: 8,
          topics: ['Social Media Graphics', 'Marketing Materials', 'Presentations', 'Portfolio Building']
        }
      ],
      testimonials: [
        {
          name: 'Lisa Chen',
          role: 'Marketing Specialist',
          rating: 5,
          text: 'Now I design all my company\'s graphics. Saved thousands!'
        }
      ],
      lessons: 28,
      projects: 5,
      monthsToComplete: '1 month',
      weeklyHours: '3-4 hours'
    },

    'canva-graphic-design': {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      subtitle: 'Create stunning visuals & build your design portfolio',
      description: 'Create stunning visuals & build your design portfolio',
      fullDescription: 'This 4-week course teaches you everything from color theory and typography to creating logos, flyers, posters, and complete social media branding kits using Canva. Graduate with a professional portfolio showcasing your design skills.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 2890,
      rating: 4.8,
      category: 'design',
      level: 'beginner',
      instructor: 'Esi Darkwah - Graphic Designer',
      instructorTitle: 'Canva & Design Expert',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800',
      featured: true,
      badge: '🎨 DESIGN',
      badgeColor: 'bg-gradient-to-r from-[#00BFA5] to-[#64FFDA]',
      tags: ['Graphic Design', 'Canva', 'Branding', 'Visual Design'],
      features: ['Design templates', 'Portfolio project', 'Certificate', 'Lifetime access'],
      discount: 82,
      color: 'from-[#00BFA5] to-[#64FFDA]',
      learningOutcomes: [
        'Understand color theory, fonts & layout principles',
        'Master Canva templates, custom designs & background removal',
        'Design logos, flyers & posters',
        'Create a complete social media branding kit',
        'Build a professional design portfolio'
      ],
      requirements: ['Computer or tablet', 'Free Canva account', 'Creative interest', 'No prior design experience needed'],
      toolsNeeded: ['Canva (free or Pro)', 'Computer or tablet', 'Internet connection'],
      timeCommitment: '4-6 hours per week for 4 weeks',
      modules: [
        { title: 'Week 1: Design Fundamentals', duration: '4 hours', lessons: 2, topics: ['Color theory', 'Fonts & layout'] },
        { title: 'Week 2: Canva Mastery', duration: '4 hours', lessons: 3, topics: ['Templates', 'Custom designs', 'Background removal'] },
        { title: 'Week 3: Branding Design', duration: '4 hours', lessons: 2, topics: ['Logo basics', 'Flyer & poster design'] },
        { title: 'Week 4: Final Portfolio', duration: '4 hours', lessons: 2, topics: ['Design social media kit', 'Branding project'] }
      ],
      testimonials: [
        { name: 'Abena Serwaa', role: 'Social Media Manager', rating: 5, text: 'Now I design all my own graphics — clients love them!' },
        { name: 'Kwame Adjei', role: 'Entrepreneur', rating: 5, text: 'The branding project alone was worth the entire course fee.' }
      ],
      lessons: 9,
      projects: 3,
      monthsToComplete: '1 month',
      weeklyHours: '4-6 hours'
    },

    // ==================== BUSINESS COURSES ====================
    'virtual-assistant-pro': {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      subtitle: 'Launch your remote VA career in 6 weeks',
      description: 'Master administrative skills, communication, social media assistance, and client acquisition to become a successful virtual assistant.',
      fullDescription: 'This comprehensive 6-week program covers everything you need to become a professional virtual assistant. From communication mastery to client acquisition strategies, you will learn to manage emails, calendars, documents, and social media for clients worldwide. Graduate with a professional portfolio and certification.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks (2–3 classes/week)',
      students: 1845,
      rating: 4.8,
      category: 'business',
      level: 'beginner',
      instructor: 'Amara Osei - VA Business Coach',
      instructorTitle: 'Virtual Assistant Expert',
      instructorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: '💼 VA PRO',
      badgeColor: 'bg-gradient-to-r from-[#7C4DFF] to-[#448AFF]',
      tags: ['Virtual Assistant', 'Remote Work', 'Admin Skills', 'Freelancing'],
      features: ['Professional certificate', 'Portfolio creation', 'Client acquisition guide', 'Lifetime access'],
      discount: 85,
      color: 'from-[#7C4DFF] to-[#448AFF]',
      learningOutcomes: [
        'Understand VA services and work ethics',
        'Master professional email & calendar management',
        'Use Google Workspace and file management systems',
        'Manage social media scheduling and engagement',
        'Build a CV, portfolio, and acquire clients',
        'Complete a final VA portfolio and mock client task'
      ],
      requirements: ['Computer with internet', 'Basic computer literacy', 'Professional attitude', 'Time management skills'],
      toolsNeeded: ['Google Workspace', 'Google Calendar', 'Scheduling tools', 'Email client'],
      timeCommitment: '2-3 classes per week for 6 weeks',
      modules: [
        { title: 'Week 1: Introduction to Virtual Assistance', duration: '3 hours', lessons: 3, topics: ['What is a Virtual Assistant?', 'Types of VA services', 'Work ethics & professionalism'] },
        { title: 'Week 2: Communication & Email Management', duration: '3 hours', lessons: 3, topics: ['Professional email writing', 'Calendar management', 'Scheduling tools (Google Calendar)'] },
        { title: 'Week 3: Administrative Tools', duration: '3 hours', lessons: 3, topics: ['Google Workspace', 'Document organization', 'File management systems'] },
        { title: 'Week 4: Social Media Assistance', duration: '3 hours', lessons: 3, topics: ['Content scheduling', 'Basic engagement management', 'Using scheduling tools'] },
        { title: 'Week 5: Client Acquisition', duration: '3 hours', lessons: 3, topics: ['Creating a CV & portfolio', 'Freelance platforms overview', 'Pricing your services'] },
        { title: 'Week 6: Final Project', duration: '4 hours', lessons: 3, topics: ['Create VA portfolio', 'Mock client task', 'Certification'] }
      ],
      testimonials: [
        { name: 'Fatima Abdi', role: 'Freelance VA', rating: 5, text: 'Landed 3 clients within my first month after completing this course!' },
        { name: 'Grace Mensah', role: 'Remote Worker', rating: 5, text: 'The portfolio project was incredibly helpful for showcasing my skills.' }
      ],
      lessons: 18,
      projects: 3,
      monthsToComplete: '1.5 months',
      weeklyHours: '4-6 hours'
    },

    'digital-real-estate': {
      id: 'digital-real-estate',
      title: 'Digital Real Estate Masterclass',
      subtitle: 'Buy, build & rent websites for passive income',
      description: 'Buy, build & rent websites for passive income',
      fullDescription: 'Learn how to invest in digital real estate - buying and selling websites, domain flipping, and building passive income through online assets.',
      price: 499,
      originalPrice: 999,
      duration: '10 weeks',
      students: 345,
      rating: 4.8,
      category: 'business',
      level: 'Advanced',
      instructor: 'Robert Chen - Digital Real Estate Investor',
      instructorTitle: 'Digital Real Estate Expert',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      featured: false,
      badge: 'ADVANCED',
      badgeColor: 'bg-gradient-to-r from-[#4169E1] to-[#0000CD]',
      tags: ['Digital Assets', 'Websites', 'Passive Income', 'Investing'],
      features: ['Valuation tools', 'Acquisition guide', 'Monetization strategies'],
      discount: 50,
      color: 'from-[#4169E1] to-[#0000CD]',
      learningOutcomes: [
        'Identify profitable digital assets',
        'Value and negotiate website purchases',
        'Build websites for resale',
        'Generate passive income',
        'Scale your digital portfolio'
      ],
      requirements: [
        'Investment capital',
        'Basic web knowledge',
        'Analytical skills',
        'Risk tolerance'
      ],
      toolsNeeded: ['Domain tools', 'Website builders', 'Analytics platforms', 'Valuation tools'],
      timeCommitment: '5-6 hours per week for 10 weeks',
      modules: [
        {
          title: 'Week 1-3: Digital Asset Fundamentals',
          duration: '12 hours',
          lessons: 18,
          topics: ['Asset Types', 'Valuation Methods', 'Due Diligence', 'Market Analysis']
        },
        {
          title: 'Week 4-7: Acquisition Strategies',
          duration: '16 hours',
          lessons: 24,
          topics: ['Sourcing Deals', 'Negotiation', 'Financing', 'Legal Considerations']
        },
        {
          title: 'Week 8-10: Growth & Monetization',
          duration: '12 hours',
          lessons: 18,
          topics: ['Traffic Growth', 'Monetization', 'Optimization', 'Exit Strategies']
        }
      ],
      testimonials: [
        {
          name: 'Michael Chang',
          role: 'Investor',
          rating: 5,
          text: 'Built a $100K portfolio in 6 months following this system.'
        }
      ],
      lessons: 60,
      projects: 8,
      monthsToComplete: '2.5 months',
      weeklyHours: '5-6 hours'
    },

    'freelancing-online-income': {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      subtitle: 'Start earning online with freelancing skills',
      description: 'Start earning online with freelancing skills',
      fullDescription: 'Learn how to start freelancing, find clients, set your rates, and build a sustainable online income through platforms like Upwork, Fiverr, and Freelancer.',
      price: 7,
      originalPrice: 49,
      duration: '4 weeks',
      students: 2103,
      rating: 4.8,
      category: 'business',
      level: 'beginner',
      instructor: 'Samuel Ofori - Freelance Business Coach',
      instructorTitle: 'Freelancing & Online Income Expert',
      instructorImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      image: 'https://images.pexels.com/photos/4065876/pexels-photo-4065876.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: '💰 FREELANCE',
      badgeColor: 'bg-gradient-to-r from-[#00C853] to-[#B2FF59]',
      tags: ['Freelancing', 'Online Income', 'Remote Work', 'Business'],
      features: ['Profile templates', 'Proposal guide', 'Pricing calculator', 'Certificate'],
      discount: 85,
      color: 'from-[#00C853] to-[#B2FF59]',
      learningOutcomes: [
        'Understand the freelancing landscape & popular skills',
        'Create a winning portfolio and online profile',
        'Write proposals that get responses',
        'Find jobs and communicate with clients effectively',
        'Set up payment methods for international clients',
        'Build long-term client relationships'
      ],
      requirements: ['Computer with internet', 'Marketable skill (or willingness to learn)', 'Professional attitude', 'Communication skills'],
      toolsNeeded: ['Freelance platforms (Upwork, Fiverr)', 'Portfolio tool', 'Payment setup', 'Communication tools'],
      timeCommitment: '4-6 hours per week for 4 weeks',
      modules: [
        { title: 'Week 1: Introduction to Freelancing', duration: '3 hours', lessons: 2, topics: ['What is freelancing?', 'Popular skills'] },
        { title: 'Week 2: Setting Up Online Profile', duration: '4 hours', lessons: 2, topics: ['Creating portfolio', 'Writing proposals'] },
        { title: 'Week 3: Getting Clients', duration: '4 hours', lessons: 3, topics: ['Finding jobs', 'Pricing strategy', 'Client communication'] },
        { title: 'Week 4: Freelance Business Setup', duration: '4 hours', lessons: 3, topics: ['Payment methods', 'Building long-term clients', 'Final profile review'] }
      ],
      testimonials: [
        { name: 'Daniel Tetteh', role: 'Freelance Writer', rating: 5, text: 'Started earning on Upwork within 2 weeks of completing this course!' },
        { name: 'Ama Darko', role: 'Virtual Assistant', rating: 5, text: 'The proposal writing section was a game-changer for landing clients.' }
      ],
      lessons: 10,
      projects: 2,
      monthsToComplete: '1 month',
      weeklyHours: '4-6 hours'
    },

    // ==================== KIDS COURSES ====================
    'smart-kids-coding': {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      subtitle: 'Fun coding adventures for ages 6–12',
      description: 'Introduce kids to coding through Scratch! Build animations, stories, and games in a fun, interactive 4-week program.',
      fullDescription: 'This exciting 4-week coding program is designed for children ages 6–12. Using Scratch, kids learn coding fundamentals through fun projects — building animations, stories, and their very own games. The course culminates in a final game project with a presentation and certificate ceremony.',
      price: 7,
      originalPrice: 35,
      duration: '4 Weeks (Ages 6–12)',
      students: 1567,
      rating: 4.9,
      category: 'kids',
      level: 'beginner',
      instructor: 'Ms. Akosua - Kids Coding Instructor',
      instructorTitle: 'Children\'s Coding Educator',
      instructorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
      featured: true,
      badge: '👧 KIDS',
      badgeColor: 'bg-gradient-to-r from-[#FF6D00] to-[#FFD600]',
      tags: ['Kids Coding', 'Scratch', 'Game Development', 'STEM'],
      features: ['Fun projects', 'Certificate', 'Game creation', 'Parent updates'],
      discount: 80,
      color: 'from-[#FF6D00] to-[#FFD600]',
      learningOutcomes: [
        'Understand what coding is and why it matters',
        'Learn Scratch basics and interface',
        'Create animations and interactive stories',
        'Build games with characters and scoring',
        'Present a personal game project',
        'Receive a certificate of completion'
      ],
      requirements: ['Ages 6–12 years', 'Computer or tablet', 'Parent/guardian supervision', 'Enthusiasm to learn!'],
      toolsNeeded: ['Computer or tablet', 'Scratch (free - scratch.mit.edu)', 'Internet connection'],
      timeCommitment: '2-3 hours per week for 4 weeks',
      modules: [
        { title: 'Week 1: Introduction to Coding', duration: '2 hours', lessons: 3, topics: ['What is coding?', 'Scratch basics', 'First project'] },
        { title: 'Week 2: Animations & Stories', duration: '3 hours', lessons: 3, topics: ['Loops & events', 'Build simple animation', 'Interactive stories'] },
        { title: 'Week 3: Game Creation', duration: '3 hours', lessons: 3, topics: ['Adding characters', 'Simple scoring system', 'Game mechanics'] },
        { title: 'Week 4: Final Game Project', duration: '3 hours', lessons: 3, topics: ['Build personal game', 'Presentation & certificate', 'Showcase'] }
      ],
      testimonials: [
        { name: 'Parent - Mrs. Owusu', role: 'Mother of 2', rating: 5, text: 'My kids absolutely loved this course! They built their own games and can\'t stop coding.' },
        { name: 'Parent - Mr. Mensah', role: 'Father', rating: 5, text: 'Amazing program for kids. Very well structured and engaging.' }
      ],
      lessons: 12,
      projects: 4,
      monthsToComplete: '1 month',
      weeklyHours: '2-3 hours'
    },

    // ==================== ADDITIONAL COURSES ====================
    'instagram-reels': {
      id: 'instagram-reels',
      title: 'Instagram Reels & Growth Hacks',
      subtitle: 'Grow 10K+ followers and monetize your account',
      description: 'Master Instagram Reels algorithm, content strategy, engagement hacks.',
      fullDescription: 'This 4-week intensive course teaches you how to dominate Instagram Reels. Learn content creation, algorithm hacks, engagement strategies, and monetization methods specifically for Instagram. Perfect for influencers and content creators.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks (3-4 hours/week)',
      students: 1893,
      rating: 4.8,
      category: 'social',
      level: 'beginner',
      instructor: 'Sophia Martinez - Instagram Coach',
      instructorTitle: 'Instagram Growth Expert',
      instructorImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      image: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800',
      featured: false,
      badge: '📱 TRENDING',
      badgeColor: 'bg-gradient-to-r from-[#833AB4] to-[#FD1D1D]',
      tags: ['Instagram', 'Reels', 'Growth', 'Monetization'],
      features: ['Reels templates', 'Engagement guide', 'Monetization plan'],
      discount: 82,
      color: 'from-[#833AB4] to-[#FD1D1D]',
      learningOutcomes: [
        'Master Instagram Reels algorithm',
        'Create engaging Reels content',
        'Grow followers organically',
        'Monetize your Instagram account',
        'Build brand partnerships'
      ],
      requirements: [
        'Instagram account',
        'Smartphone with good camera',
        'Basic editing knowledge',
        'Creative ideas'
      ],
      toolsNeeded: ['Smartphone', 'Instagram app', 'Video editing app', 'Content planner'],
      timeCommitment: '3-4 hours per week for 4 weeks',
      modules: [
        {
          title: 'Week 1: Reels Fundamentals',
          duration: '3 hours',
          lessons: 6,
          topics: ['Reels Algorithm', 'Content Ideas', 'Editing Basics', 'Hashtag Research']
        },
        {
          title: 'Week 2-3: Growth Strategies',
          duration: '6 hours',
          lessons: 12,
          topics: ['Engagement Tactics', 'Collaborations', 'Trend Riding', 'Analytics']
        },
        {
          title: 'Week 4: Monetization',
          duration: '3 hours',
          lessons: 6,
          topics: ['Brand Deals', 'Affiliate Marketing', 'Product Promotion', 'Pricing']
        }
      ],
      testimonials: [
        {
          name: 'Emma Wilson',
          role: 'Influencer',
          rating: 5,
          text: 'Grew from 2K to 50K followers in 2 months!'
        }
      ],
      lessons: 24,
      projects: 4,
      monthsToComplete: '1 month',
      weeklyHours: '3-4 hours'
    },

    'ai-agents': {
      id: 'ai-agents',
      title: 'Build AI Agents Without Coding',
      subtitle: 'Create autonomous AI assistants for any task',
      description: 'Learn to build AI agents that can research, write, analyze data.',
      fullDescription: 'This 6-week course teaches you to build autonomous AI agents without coding. Create AI assistants that can research, write, analyze data, and automate workflows. Perfect for non-technical professionals wanting AI solutions.',
      price: 7,
      originalPrice: 69,
      duration: '6 Weeks (2-3 hours/week)',
      students: 1567,
      rating: 4.7,
      category: 'ai',
      level: 'beginner',
      instructor: 'Mark Roberts - No-Code AI Expert',
      instructorTitle: 'No-Code AI Specialist',
      instructorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800',
      featured: false,
      badge: '🤖 NO-CODE AI',
      badgeColor: 'bg-gradient-to-r from-[#7C4DFF] to-[#536DFE]',
      tags: ['AI Agents', 'No-Code', 'Automation', 'Assistants'],
      features: ['Agent templates', 'No-code tools', 'Deployment guide'],
      discount: 90,
      color: 'from-[#7C4DFF] to-[#536DFE]',
      learningOutcomes: [
        'Build AI agents without coding',
        'Automate research tasks',
        'Create content generation agents',
        'Deploy AI assistants',
        'Monitor agent performance'
      ],
      requirements: [
        'No coding experience needed',
        'Basic computer skills',
        'Creative thinking',
        'Patience for testing'
      ],
      toolsNeeded: ['Bubble/Adalo', 'AI platform access', 'API connectors', 'Testing tools'],
      timeCommitment: '2-3 hours per week for 6 weeks',
      modules: [
        {
          title: 'Week 1-2: AI Agent Fundamentals',
          duration: '6 hours',
          lessons: 12,
          topics: ['Agent Concepts', 'Tool Selection', 'Basic Setup', 'Testing Methods']
        },
        {
          title: 'Week 3-4: Agent Building',
          duration: '6 hours',
          lessons: 12,
          topics: ['Research Agents', 'Writing Agents', 'Analysis Agents', 'Customization']
        },
        {
          title: 'Week 5-6: Deployment',
          duration: '6 hours',
          lessons: 12,
          topics: ['Deployment Platforms', 'Monitoring', 'Optimization', 'Scaling']
        }
      ],
      testimonials: [
        {
          name: 'Lisa Wong',
          role: 'Researcher',
          rating: 5,
          text: 'Built a research agent that saves me 15 hours weekly!'
        }
      ],
      lessons: 36,
      projects: 5,
      monthsToComplete: '1.5 months',
      weeklyHours: '2-3 hours'
    }
  }

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true)
        
        if (id) {
          // First check if course exists in allCourses
          const sampleCourse = allCourses[id]
          if (sampleCourse) {
            setCourse(sampleCourse)
          } else {
            // Try to fetch from Supabase if not in sample data
            const { data, error } = await supabase
              .from('courses')
              .select('*')
              .eq('id', id)
              .single()

            if (error) {
              console.log('Course not found in Supabase:', error)
              // If course not found, show the first course
              const firstCourse = Object.values(allCourses)[0]
              setCourse(firstCourse)
            } else if (data) {
              // Map Supabase data to our course format
              const formattedCourse = {
                id: data.id,
                title: data.title || 'Untitled Course',
                subtitle: data.subtitle || 'Master this skill and boost your career',
                description: data.description || 'No description available',
                fullDescription: data.full_description || data.description || 'Learn valuable skills that will transform your career and income potential.',
                price: 7,
                originalPrice: parseFloat(data.original_price) || 49,
                duration: data.duration || 'Self-paced',
                students: data.enrollment_count || 0,
                rating: data.rating || 4.5,
                category: data.category || 'general',
                level: data.level || 'beginner',
                instructor: data.instructor || 'iKPACE Expert',
                instructorTitle: data.instructor_title || 'Industry Expert',
                instructorImage: data.instructor_image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
                image: data.image_url || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
                featured: data.featured || false,
                badge: data.badge || 'Popular',
                badgeColor: data.badge_color || 'bg-gradient-to-r from-[#7329ce] to-[#4610db]',
                tags: data.tags ? (typeof data.tags === 'string' ? JSON.parse(data.tags) : data.tags) : ['Skill', 'Learning', 'Career'],
                features: data.features ? (typeof data.features === 'string' ? JSON.parse(data.features) : data.features) : [
                  '30-day money-back guarantee',
                  'Certificate of completion',
                  'Lifetime access',
                  'Community access'
                ],
                discount: 85,
                color: data.color || 'from-[#7329ce] to-[#4610db]',
                learningOutcomes: [
                  'Master the fundamental concepts and principles',
                  'Build practical projects to apply your knowledge',
                  'Develop problem-solving skills for real-world scenarios',
                  'Create a portfolio to showcase your expertise',
                  'Prepare for industry certification exams'
                ],
                requirements: [
                  'No prior experience required',
                  'Basic computer skills',
                  'Internet connection',
                  'Dedication to learn'
                ],
                toolsNeeded: data.tools_needed || ['Computer', 'Internet', 'Basic software'],
                timeCommitment: data.time_commitment || '2-3 hours per week',
                modules: [
                  {
                    title: 'Getting Started',
                    duration: '2 hours',
                    lessons: 5,
                    topics: [
                      'Introduction to the Course',
                      'Setting Up Your Environment',
                      'Understanding Core Concepts',
                      'Your First Project',
                      'Course Resources Overview'
                    ]
                  },
                  {
                    title: 'Fundamentals',
                    duration: '6 hours',
                    lessons: 12,
                    topics: [
                      'Basic Principles',
                      'Key Terminology',
                      'Essential Tools',
                      'Common Patterns',
                      'Best Practices'
                    ]
                  },
                  {
                    title: 'Advanced Concepts',
                    duration: '8 hours',
                    lessons: 15,
                    topics: [
                      'Advanced Techniques',
                      'Performance Optimization',
                      'Troubleshooting',
                      'Real-world Applications',
                      'Industry Insights'
                    ]
                  }
                ],
                testimonials: [
                  {
                    name: 'Alex Johnson',
                    role: 'Software Developer',
                    rating: 5,
                    text: 'This course transformed my career. The practical approach and real-world examples made all the difference.'
                  },
                  {
                    name: 'Sarah Miller',
                    role: 'Marketing Manager',
                    rating: 5,
                    text: 'I was able to apply what I learned immediately. The instructor is fantastic and very responsive.'
                  }
                ],
                lessons: 32,
                projects: 5,
                monthsToComplete: '1-2 months',
                weeklyHours: '2-4 hours'
              }
              setCourse(formattedCourse)
            }
          }
        } else {
          navigate('/courses')
        }
      } catch (error) {
        console.error('Error loading course:', error)
        // Fall back to sample data
        const sampleCourse = allCourses[id]
        if (sampleCourse) {
          setCourse(sampleCourse)
        } else {
          navigate('/courses')
        }
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [id, navigate])

  const handleEnrollNow = () => {
    if (course) {
      navigate(`/checkout/${course.id}`)
    }
  }

  const handleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7329ce] mx-auto mb-6"></div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Loading Course Details</h3>
            <p className="text-gray-600">Getting everything ready for you...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h3>
            <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white rounded-lg font-medium hover:opacity-90"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse All Courses
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Ensure features is always an array
  const courseFeatures = Array.isArray(course.features) ? course.features : [
    '30-day money-back guarantee',
    'Certificate of completion',
    'Lifetime access',
    'Community access'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${course.color} relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            {/* Left Content */}
            <div className="md:w-2/3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className={`${course.badgeColor} text-white px-3 py-1 rounded-full text-sm font-bold`}>
                  {course.badge}
                </span>
                <span className="text-white/80 text-sm">{course.category?.toUpperCase() || 'COURSE'}</span>
                <span className="text-white/80 text-sm">•</span>
                <span className="text-white/80 text-sm">{course.level || 'beginner'}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-bold text-lg">{course.rating}</span>
                  </div>
                  <span className="text-white/80">({course.students?.toLocaleString() || 0} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-white/80" />
                  <span className="text-white">{course.students?.toLocaleString() || 0}+ students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/80" />
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-white/80" />
                  <span className="text-white capitalize">{course.level || 'beginner'}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={course.instructorImage}
                    alt={course.instructor}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                  <div>
                    <div className="text-white font-bold">{course.instructor?.split(' - ')[0] || 'Instructor'}</div>
                    <div className="text-white/80 text-sm">{course.instructor?.split(' - ')[1] || course.instructorTitle || 'Expert'}</div>
                  </div>
                </div>
                <button
                  onClick={handleBookmark}
                  className="ml-auto text-white hover:text-yellow-300 transition-colors"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-6 h-6" />
                  ) : (
                    <Bookmark className="w-6 h-6" />
                  )}
                </button>
                <button className="text-white hover:text-gray-200 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Course Card - Right Side */}
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl font-bold text-white">${course.price?.toFixed(2) || '7.00'}</div>
                    {course.originalPrice > course.price && (
                      <div className="text-xl line-through text-white/70">${course.originalPrice?.toFixed(2)}</div>
                    )}
                  </div>
                  {course.discount > 0 && (
                    <div className="text-yellow-300 font-bold mb-2">
                      {course.discount}% OFF
                    </div>
                  )}
                  <div className="text-sm text-white/80">One-time payment • Lifetime access</div>
                </div>

                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl text-lg mb-4 flex items-center justify-center gap-3 transition-colors"
                >
                  <ShoppingCart size={24} />
                  Enroll Now - Only $7
                </button>

                <div className="space-y-3">
                  {courseFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-white/90">
                      <CheckCircle size={18} className="mr-3 text-green-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="md:flex gap-8">
          {/* Left Content */}
          <div className="md:w-2/3">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
              {['overview', 'curriculum', 'requirements', 'instructor', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'text-[#7329ce] border-b-2 border-[#7329ce]' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {tab === 'overview' && 'Course Overview'}
                  {tab === 'curriculum' && 'Curriculum'}
                  {tab === 'requirements' && 'Requirements'}
                  {tab === 'instructor' && 'Instructor'}
                  {tab === 'reviews' && 'Reviews'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Description</h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 text-lg leading-relaxed mb-6">{course.fullDescription}</p>
                    
                    {/* Course Duration Info */}
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 mb-6">
                      <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-500" />
                        Course Duration & Time Commitment
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Total Duration:</span>
                            <span className="font-bold text-gray-900">{course.duration}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Time Commitment:</span>
                            <span className="font-bold text-gray-900">{course.timeCommitment || '2-3 hours/week'}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Months to Complete:</span>
                            <span className="font-bold text-gray-900">{course.monthsToComplete || '1-2 months'}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Total Lessons:</span>
                            <span className="font-bold text-gray-900">{course.lessons || 30}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Projects:</span>
                            <span className="font-bold text-gray-900">{course.projects || 5}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-700">Weekly Hours:</span>
                            <span className="font-bold text-gray-900">{course.weeklyHours || '2-4 hours'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.learningOutcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                        <CheckCircle className="text-green-500 mr-3 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Tools & Software Needed</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.toolsNeeded?.map((tool, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Settings className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-gray-700">{tool}</span>
                        </div>
                      )) || (
                        <>
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Monitor className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-gray-700">Computer with internet</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                              <Wifi className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-gray-700">Stable internet connection</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Course Curriculum</h3>
                  <div className="text-gray-600">
                    {course.lessons || 30} lessons • {course.projects || 5} projects
                  </div>
                </div>
                {course.modules?.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 p-6 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{module.title}</h4>
                        <div className="flex items-center mt-2 text-gray-600 text-sm">
                          <Clock size={16} className="mr-2" />
                          {module.duration} • {module.lessons} lessons
                        </div>
                      </div>
                      <div className="text-[#7329ce] font-bold">
                        {enrolled ? 'Unlocked' : 'Available'}
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <ul className="space-y-3">
                        {module.topics?.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div className="flex items-center">
                              <Video size={18} className="text-gray-400 mr-3" />
                              <span className="text-gray-700">{topic}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Clock size={14} className="mr-1" />
                              15-30 min
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Requirements</h3>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <ul className="space-y-4">
                      {course.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-[#7329ce] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Who This Course Is For</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      'Beginners looking to start a new career',
                      'Professionals wanting to upgrade their skills',
                      'Entrepreneurs seeking to build their own business',
                      'Students preparing for industry certifications',
                      'Anyone interested in personal development',
                      'Career changers seeking new opportunities'
                    ].map((item, index) => (
                      <div key={index} className="flex items-start bg-white p-4 rounded-lg border border-gray-200">
                        <div className="w-2 h-2 bg-[#7329ce] rounded-full mr-3 mt-2"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'instructor' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Instructor</h3>
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <div className="flex items-start">
                    <img
                      src={course.instructorImage}
                      alt={course.instructor}
                      className="w-24 h-24 rounded-full object-cover mr-6 border-2 border-[#7329ce]"
                    />
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900">{course.instructor?.split(' - ')[0] || 'Instructor'}</h4>
                      <p className="text-gray-600 text-lg mb-4">{course.instructor?.split(' - ')[1] || course.instructorTitle || 'Expert'}</p>
                      <p className="text-gray-700 mb-6">
                        With years of experience in the industry, {course.instructor?.split(' - ')[0] || 'our instructor'} has helped
                        thousands of students transform their careers. Their practical, hands-on approach
                        ensures you learn skills that are immediately applicable in the real world.
                      </p>
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#7329ce]">4.9</div>
                          <div className="text-gray-600 text-sm">Instructor Rating</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#7329ce]">10K+</div>
                          <div className="text-gray-600 text-sm">Students</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-[#7329ce]">8</div>
                          <div className="text-gray-600 text-sm">Courses</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold text-gray-900">Student Reviews</h3>
                  <div className="flex items-center">
                    <div className="text-4xl font-bold mr-3">{course.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={20} className={`${i < Math.floor(course.rating) ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <div className="text-gray-600 text-sm">Based on {course.students} reviews</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {course.testimonials?.map((testimonial, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-amber-500 fill-current mr-1" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-[#7329ce]/10 rounded-full flex items-center justify-center mr-3">
                          <span className="font-bold text-[#7329ce]">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{testimonial.name}</div>
                          <div className="text-gray-600 text-sm">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="md:w-1/3 mt-12 md:mt-0">
            <div className="sticky top-24 space-y-6">
              {/* Course Progress (if enrolled) */}
              {enrolled && (
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4">Your Progress</h4>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Course Progress</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-[#7329ce] h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <button className="w-full bg-[#7329ce] hover:bg-[#5a1fb3] text-white font-medium py-3 px-4 rounded-lg">
                    Continue Learning
                  </button>
                </div>
              )}

              {/* Course Details Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4">Course Details</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-bold text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-bold text-gray-900">{course.lessons || 30}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-bold text-gray-900">{course.projects || 5}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-bold text-gray-900 capitalize">{course.level || 'beginner'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Access:</span>
                    <span className="font-bold text-gray-900">Lifetime</span>
                  </div>
                </div>
              </div>

              {/* Quick Enroll Card */}
              <div className="bg-gradient-to-r from-[#7329ce] to-[#4610db] text-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-bold text-xl mb-4">Start Learning Today!</h4>
                <div className="text-3xl font-bold mb-2">${course.price?.toFixed(2) || '7.00'}</div>
                {course.originalPrice > course.price && (
                  <div className="text-white/80 line-through mb-1">${course.originalPrice?.toFixed(2)}</div>
                )}
                <div className="text-white/80 mb-6">One-time payment • Lifetime access</div>
                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl text-lg mb-4 transition-colors"
                >
                  Enroll Now - Only $7
                </button>
                <div className="text-center text-sm text-white/80">
                  <div className="mb-2">30-day money-back guarantee</div>
                  <div>Certificate included</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}