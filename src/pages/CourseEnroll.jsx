import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
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
  PieChart, Lock, Bitcoin, Megaphone, ThumbsUp, Medal,
  Plus, Minus, Menu, X, ChevronDown
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading: authLoading } = useAuth()
  
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [enrolled, setEnrolled] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Dropdown states
  const [openSections, setOpenSections] = useState({
    overview: true,
    curriculum: false,
    requirements: false,
    reviews: false
  })

  // Brand colors - iKPACE brand colors
  const colors = {
    primary: "#1E3A8A", // Deep blue - main brand color
    secondary: "#F59E0B", // Amber orange - accent color
    accent: "#3B82F6", // Bright blue - secondary accent
    success: "#10B981", // Emerald green - success states
    warning: "#F59E0B", // Amber - warnings
    dark: "#1F2937", // Dark gray - text
    lightGray: "#F9FAFB", // Light gray - backgrounds
    blueShade: "#60A5FA", // Light blue - highlights
    orangeShade: "#FBBF24", // Light orange - highlights
    white: "#FFFFFF"
  }

  // Fixed price for all courses
  const FIXED_PRICE = "$7"

  // ============================================
  // ADD LOGIN REDIRECT CHECK
  // ============================================
  useEffect(() => {
    if (!authLoading && !user) {
      // Save the current path to redirect back after login
      navigate('/login', { state: { from: location.pathname } })
    }
  }, [user, authLoading, navigate, location])

  // Toggle section function
  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // ==================== ALL COURSES WITH UPDATED DURATIONS ====================
  const allCourses = {
    // Virtual Assistant Course - UPDATED to 8 weeks
    'virtual-assistant-pro': {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      subtitle: 'Launch your remote VA career in 8 weeks',
      description: 'Master administrative skills, communication, and client acquisition to become a successful virtual assistant.',
      fullDescription: 'This 8-week program covers everything you need to become a professional virtual assistant. Learn to manage emails, calendars, documents, and social media for clients. Graduate with a professional portfolio and certification.',
      price: FIXED_PRICE,
      duration: '8 Weeks',
      students: 32,
      rating: 4.9,
      reviews: 18,
      category: 'Career',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'POPULAR',
      badgeColor: `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}]`,
      tags: ['Virtual Assistant', 'Remote Work', 'Admin Skills', 'Freelancing'],
      features: [
        'Professional certificate',
        'Portfolio creation',
        'Client acquisition guide',
        'Lifetime access'
      ],
      color: `from-[${colors.primary}] to-[${colors.secondary}]`,
      learningOutcomes: [
        'Understand VA services and work ethics',
        'Master professional email & calendar management',
        'Use Google Workspace and file management',
        'Manage social media scheduling',
        'Build a CV, portfolio, and find clients',
        'Complete a final VA portfolio project'
      ],
      requirements: [
        'Computer with internet',
        'Basic computer literacy',
        'Professional attitude',
        'Time management skills'
      ],
      toolsNeeded: ['Google Workspace', 'Google Calendar', 'Scheduling tools', 'Email client'],
      timeCommitment: '4-6 hours per week',
      weeksToComplete: '8 weeks',
      lessons: 18,
      projects: 3,
      modules: [
        {
          title: 'Week 1: Introduction to Virtual Assistance',
          duration: '3 hours',
          lessons: 3,
          topics: ['What is a Virtual Assistant?', 'Types of VA services', 'Work ethics & professionalism']
        },
        {
          title: 'Week 2: Communication & Email Management',
          duration: '3 hours',
          lessons: 3,
          topics: ['Professional email writing', 'Calendar management', 'Scheduling tools']
        },
        {
          title: 'Week 3: Administrative Tools',
          duration: '3 hours',
          lessons: 3,
          topics: ['Google Workspace', 'Document organization', 'File management']
        },
        {
          title: 'Week 4: Social Media Assistance',
          duration: '3 hours',
          lessons: 3,
          topics: ['Content scheduling', 'Basic engagement', 'Scheduling tools']
        },
        {
          title: 'Week 5: Client Acquisition',
          duration: '3 hours',
          lessons: 3,
          topics: ['Creating a CV & portfolio', 'Freelance platforms', 'Pricing services']
        },
        {
          title: 'Week 6: Advanced VA Skills',
          duration: '3 hours',
          lessons: 3,
          topics: ['Project management tools', 'Advanced client communication', 'Time management']
        },
        {
          title: 'Week 7: Specialized Services',
          duration: '3 hours',
          lessons: 3,
          topics: ['Email marketing basics', 'CRM tools', 'Social media management']
        },
        {
          title: 'Week 8: Final Project',
          duration: '4 hours',
          lessons: 3,
          topics: ['Create VA portfolio', 'Mock client task', 'Certification']
        }
      ],
      testimonials: [
        {
          name: 'Fatima Abdi',
          role: 'Freelance VA',
          rating: 5,
          text: 'Landed 2 clients within my first month after completing this course!'
        },
        {
          name: 'Grace Mensah',
          role: 'Remote Worker',
          rating: 5,
          text: 'The portfolio project helped me showcase my skills to employers.'
        }
      ]
    },

    // Social Media Marketing - UPDATED to 8 weeks
    'social-media-marketing': {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      subtitle: 'Master content creation, ads, and growth strategies',
      description: 'Learn to create engaging content, run ads, and grow your audience.',
      fullDescription: 'This 8-week course teaches you social media marketing fundamentals. Master content creation, scheduling, analytics, and paid advertising strategies across major platforms.',
      price: FIXED_PRICE,
      duration: '8 Weeks',
      students: 28,
      rating: 4.8,
      reviews: 15,
      category: 'Marketing',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'NEW',
      badgeColor: `bg-gradient-to-r from-[${colors.secondary}] to-[${colors.orangeShade}]`,
      tags: ['Social Media', 'Ads', 'Analytics', 'Strategy'],
      features: [
        'Campaign templates',
        'Analytics guide',
        'Certificate',
        'Lifetime access'
      ],
      color: `from-[${colors.secondary}] to-[${colors.orangeShade}]`,
      learningOutcomes: [
        'Understand major social media platforms',
        'Create effective content & captions',
        'Build a personal brand with consistency',
        'Run paid ads and boost posts',
        'Track analytics and improve performance',
        'Create a full campaign plan'
      ],
      requirements: [
        'Social media accounts',
        'Smartphone or computer',
        'Basic writing skills',
        'Creative thinking'
      ],
      toolsNeeded: ['Canva', 'Meta Business Suite', 'Google Analytics', 'Scheduling tools'],
      timeCommitment: '4-6 hours per week',
      weeksToComplete: '8 weeks',
      lessons: 16,
      projects: 3,
      modules: [
        {
          title: 'Week 1: Social Media Basics',
          duration: '3 hours',
          lessons: 2,
          topics: ['Platforms overview', 'Understanding target audience']
        },
        {
          title: 'Week 2: Content Creation',
          duration: '4 hours',
          lessons: 3,
          topics: ['Content planning', 'Writing captions', 'Hashtags & trends']
        },
        {
          title: 'Week 3: Branding & Positioning',
          duration: '3 hours',
          lessons: 2,
          topics: ['Personal brand building', 'Visual consistency']
        },
        {
          title: 'Week 4: Ads & Promotions',
          duration: '3 hours',
          lessons: 2,
          topics: ['Introduction to paid ads', 'Boosting posts']
        },
        {
          title: 'Week 5: Analytics & Growth',
          duration: '3 hours',
          lessons: 2,
          topics: ['Insights & engagement tracking', 'Improving performance']
        },
        {
          title: 'Week 6: Advanced Content Strategy',
          duration: '3 hours',
          lessons: 2,
          topics: ['Video content', 'User-generated content', 'Trend analysis']
        },
        {
          title: 'Week 7: Community Management',
          duration: '3 hours',
          lessons: 2,
          topics: ['Engagement strategies', 'Handling feedback', 'Building loyalty']
        },
        {
          title: 'Week 8: Campaign Project',
          duration: '4 hours',
          lessons: 3,
          topics: ['Create full campaign plan', 'Present strategy', 'Portfolio piece']
        }
      ],
      testimonials: [
        {
          name: 'Nana Ama',
          role: 'Brand Manager',
          rating: 5,
          text: 'This course gave me confidence to run ads for my business!'
        },
        {
          name: 'Yaw Boateng',
          role: 'Entrepreneur',
          rating: 5,
          text: 'Doubled my engagement in just 3 weeks using these strategies.'
        }
      ]
    },

    // Canva & Graphic Design - UPDATED to 8 weeks
    'canva-graphic-design': {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      subtitle: 'Create stunning visuals & build your design portfolio',
      description: 'Learn to create professional designs, logos, and branding materials.',
      fullDescription: 'This 8-week course teaches you color theory, typography, and design principles. Create logos, flyers, posters, and complete social media branding kits using Canva. Graduate with a professional portfolio.',
      price: FIXED_PRICE,
      duration: '8 Weeks',
      students: 19,
      rating: 4.7,
      reviews: 12,
      category: 'Design',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'DESIGN',
      badgeColor: `bg-gradient-to-r from-[${colors.success}] to-[#00C853]`,
      tags: ['Graphic Design', 'Canva', 'Branding', 'Visual Design'],
      features: [
        'Design templates',
        'Portfolio project',
        'Certificate',
        'Lifetime access'
      ],
      color: `from-[${colors.success}] to-[#00C853]`,
      learningOutcomes: [
        'Understand color theory, fonts & layout principles',
        'Master Canva templates and custom designs',
        'Design logos, flyers & posters',
        'Create a complete social media branding kit',
        'Build a professional design portfolio'
      ],
      requirements: [
        'Computer or tablet',
        'Free Canva account',
        'Creative interest',
        'No prior design experience needed'
      ],
      toolsNeeded: ['Canva (free or Pro)', 'Computer or tablet', 'Internet connection'],
      timeCommitment: '4-6 hours per week',
      weeksToComplete: '8 weeks',
      lessons: 14,
      projects: 4,
      modules: [
        {
          title: 'Week 1: Design Fundamentals',
          duration: '4 hours',
          lessons: 2,
          topics: ['Color theory', 'Fonts & layout']
        },
        {
          title: 'Week 2: Canva Mastery',
          duration: '4 hours',
          lessons: 3,
          topics: ['Templates', 'Custom designs', 'Background removal']
        },
        {
          title: 'Week 3: Branding Design',
          duration: '4 hours',
          lessons: 2,
          topics: ['Logo basics', 'Flyer & poster design']
        },
        {
          title: 'Week 4: Social Media Graphics',
          duration: '4 hours',
          lessons: 2,
          topics: ['Instagram posts', 'Facebook covers', 'Story designs']
        },
        {
          title: 'Week 5: Advanced Design Techniques',
          duration: '4 hours',
          lessons: 2,
          topics: ['Animations', 'Video editing basics', 'Interactive designs']
        },
        {
          title: 'Week 6: Brand Identity',
          duration: '4 hours',
          lessons: 2,
          topics: ['Creating brand kits', 'Consistency across platforms', 'Style guides']
        },
        {
          title: 'Week 7: Marketing Materials',
          duration: '4 hours',
          lessons: 2,
          topics: ['Brochures', 'Presentations', 'Email headers']
        },
        {
          title: 'Week 8: Final Portfolio',
          duration: '4 hours',
          lessons: 2,
          topics: ['Design social media kit', 'Branding project', 'Portfolio presentation']
        }
      ],
      testimonials: [
        {
          name: 'Abena Serwaa',
          role: 'Social Media Manager',
          rating: 5,
          text: 'Now I design all my own graphics — clients love them!'
        },
        {
          name: 'Kwame Adjei',
          role: 'Entrepreneur',
          rating: 5,
          text: 'The branding project alone was worth the entire course fee.'
        }
      ]
    },

    // Smart Kids Coding - 4 weeks (unchanged)
    'smart-kids-coding': {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      subtitle: 'Fun coding adventures for ages 6–12',
      description: 'Introduce kids to coding through Scratch! Build animations, stories, and games.',
      fullDescription: 'This 4-week coding program is designed for children ages 6–12. Using Scratch, kids learn coding fundamentals through fun projects — building animations, stories, and their own games.',
      price: FIXED_PRICE,
      duration: '4 Weeks',
      students: 12,
      rating: 4.9,
      reviews: 8,
      category: 'Kids',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'KIDS',
      badgeColor: `bg-gradient-to-r from-[#FF6D00] to-[#FFD600]`,
      tags: ['Kids Coding', 'Scratch', 'Game Development', 'STEM'],
      features: [
        'Fun projects',
        'Certificate',
        'Game creation',
        'Parent updates'
      ],
      color: 'from-[#FF6D00] to-[#FFD600]',
      learningOutcomes: [
        'Understand what coding is',
        'Learn Scratch basics',
        'Create animations and stories',
        'Build games with characters and scoring',
        'Present a personal game project',
        'Receive a certificate'
      ],
      requirements: [
        'Ages 6–12 years',
        'Computer or tablet',
        'Parent/guardian supervision',
        'Enthusiasm to learn!'
      ],
      toolsNeeded: ['Computer or tablet', 'Scratch (free)', 'Internet connection'],
      timeCommitment: '2-3 hours per week',
      weeksToComplete: '4 weeks',
      lessons: 12,
      projects: 4,
      modules: [
        {
          title: 'Week 1: Introduction to Coding',
          duration: '2 hours',
          lessons: 3,
          topics: ['What is coding?', 'Scratch basics', 'First project']
        },
        {
          title: 'Week 2: Animations & Stories',
          duration: '3 hours',
          lessons: 3,
          topics: ['Loops & events', 'Build simple animation', 'Interactive stories']
        },
        {
          title: 'Week 3: Game Creation',
          duration: '3 hours',
          lessons: 3,
          topics: ['Adding characters', 'Simple scoring system', 'Game mechanics']
        },
        {
          title: 'Week 4: Final Game Project',
          duration: '3 hours',
          lessons: 3,
          topics: ['Build personal game', 'Presentation & certificate', 'Showcase']
        }
      ],
      testimonials: [
        {
          name: 'Mrs. Owusu',
          role: 'Parent',
          rating: 5,
          text: 'My kids absolutely loved this course! They built their own games.'
        },
        {
          name: 'Mr. Mensah',
          role: 'Parent',
          rating: 5,
          text: 'Amazing program for kids. Very well structured and engaging.'
        }
      ]
    },

    // Freelancing & Online Income - 4 weeks (unchanged)
    'freelancing-online-income': {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      subtitle: 'Start earning online with freelancing skills',
      description: 'Learn to find clients, set rates, and build sustainable online income.',
      fullDescription: 'This 4-week course teaches you how to start freelancing, find clients, set your rates, and build sustainable online income through platforms like Upwork and Fiverr.',
      price: FIXED_PRICE,
      duration: '4 Weeks',
      students: 21,
      rating: 4.8,
      reviews: 14,
      category: 'Business',
      level: 'Beginner',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'FREELANCE',
      badgeColor: `bg-gradient-to-r from-[${colors.success}] to-[#B2FF59]`,
      tags: ['Freelancing', 'Online Income', 'Remote Work', 'Business'],
      features: [
        'Profile templates',
        'Proposal guide',
        'Pricing calculator',
        'Certificate'
      ],
      color: `from-[${colors.success}] to-[#B2FF59]`,
      learningOutcomes: [
        'Understand freelancing landscape',
        'Create winning portfolio and profile',
        'Write proposals that get responses',
        'Find jobs and communicate with clients',
        'Set up payment methods',
        'Build long-term client relationships'
      ],
      requirements: [
        'Computer with internet',
        'Marketable skill',
        'Professional attitude',
        'Communication skills'
      ],
      toolsNeeded: ['Upwork', 'Fiverr', 'Portfolio tool', 'Payment setup'],
      timeCommitment: '4-6 hours per week',
      weeksToComplete: '4 weeks',
      lessons: 10,
      projects: 2,
      modules: [
        {
          title: 'Week 1: Introduction to Freelancing',
          duration: '3 hours',
          lessons: 2,
          topics: ['What is freelancing?', 'Popular skills']
        },
        {
          title: 'Week 2: Setting Up Profile',
          duration: '4 hours',
          lessons: 2,
          topics: ['Creating portfolio', 'Writing proposals']
        },
        {
          title: 'Week 3: Getting Clients',
          duration: '4 hours',
          lessons: 3,
          topics: ['Finding jobs', 'Pricing strategy', 'Client communication']
        },
        {
          title: 'Week 4: Freelance Business',
          duration: '4 hours',
          lessons: 3,
          topics: ['Payment methods', 'Building long-term clients', 'Final profile review']
        }
      ],
      testimonials: [
        {
          name: 'Daniel Tetteh',
          role: 'Freelance Writer',
          rating: 5,
          text: 'Started earning on Upwork within 2 weeks of completing this course!'
        },
        {
          name: 'Ama Darko',
          role: 'Virtual Assistant',
          rating: 5,
          text: 'The proposal writing section was a game-changer for landing clients.'
        }
      ]
    },

    // AI Prompt Engineering - UPDATED to 8 weeks
    'ai-prompt-engineering': {
      id: 'ai-prompt-engineering',
      title: 'AI Prompt Engineering',
      subtitle: 'Master AI tools for content creation',
      description: 'Learn to use ChatGPT, Midjourney, and other AI tools effectively.',
      fullDescription: 'This 8-week course teaches you to master AI prompt engineering. Learn techniques for content creation, automation, and problem-solving using ChatGPT, Claude, and other AI tools.',
      price: FIXED_PRICE,
      duration: '8 Weeks',
      students: 18,
      rating: 4.9,
      reviews: 11,
      category: 'Tech',
      level: 'Intermediate',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'AI PRO',
      badgeColor: `bg-gradient-to-r from-[${colors.blueShade}] to-[${colors.accent}]`,
      tags: ['ChatGPT', 'Automation', 'AI Tools', 'Prompting'],
      features: [
        'Prompt library',
        'Real projects',
        'Certification',
        'AI tools guide'
      ],
      color: `from-[${colors.blueShade}] to-[${colors.accent}]`,
      learningOutcomes: [
        'Master advanced prompt engineering',
        'Automate business processes with AI',
        'Create high-quality content faster',
        'Solve complex problems with AI',
        'Build AI-powered workflows'
      ],
      requirements: [
        'Basic computer skills',
        'Internet access',
        'Curiosity about AI',
        'Problem-solving mindset'
      ],
      toolsNeeded: ['ChatGPT', 'Claude AI', 'Midjourney', 'Notion'],
      timeCommitment: '3-4 hours per week',
      weeksToComplete: '8 weeks',
      lessons: 18,
      projects: 5,
      modules: [
        {
          title: 'Week 1-2: Prompt Engineering Basics',
          duration: '6 hours',
          lessons: 5,
          topics: ['Basic prompts', 'Advanced techniques', 'Best practices']
        },
        {
          title: 'Week 3-4: AI Tool Mastery',
          duration: '6 hours',
          lessons: 5,
          topics: ['ChatGPT', 'Claude', 'Midjourney']
        },
        {
          title: 'Week 5-6: Real-world Applications',
          duration: '6 hours',
          lessons: 5,
          topics: ['Content creation', 'Automation', 'Data analysis']
        },
        {
          title: 'Week 7-8: Advanced Projects',
          duration: '6 hours',
          lessons: 3,
          topics: ['Building AI workflows', 'Integration', 'Portfolio projects']
        }
      ],
      testimonials: [
        {
          name: 'Kwame Asare',
          role: 'Content Creator',
          rating: 5,
          text: 'This course made me 10x more productive with AI!'
        },
        {
          name: 'Esi Mensah',
          role: 'Marketing Manager',
          rating: 5,
          text: 'The prompt library alone saved me hours of work.'
        }
      ]
    }
  }

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setLoading(true)
        
        if (id) {
          // Check if course exists in allCourses
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
              // If course not found, redirect to courses page
              navigate('/courses')
            } else if (data) {
              // Map Supabase data to course format with honest numbers
              const formattedCourse = {
                id: data.id,
                title: data.title || 'Course',
                subtitle: data.subtitle || 'Learn valuable skills for your career',
                description: data.description || 'Master practical skills that will help you grow.',
                fullDescription: data.full_description || data.description || 'This course covers everything you need to get started. Learn at your own pace with practical projects.',
                price: FIXED_PRICE,
                duration: data.duration || 'Self-paced',
                students: data.enrollment_count || 5,
                rating: data.rating || 4.5,
                reviews: data.review_count || 3,
                category: data.category || 'General',
                level: data.level || 'Beginner',
                image: data.image_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
                featured: data.featured || false,
                badge: data.badge || 'NEW',
                badgeColor: `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}]`,
                tags: data.tags || ['Learning', 'Skills', 'Career'],
                features: [
                  'Certificate of completion',
                  'Lifetime access',
                  'Community access'
                ],
                learningOutcomes: [
                  'Master the fundamental concepts',
                  'Build practical projects',
                  'Develop problem-solving skills',
                  'Create a portfolio',
                  'Prepare for career opportunities'
                ],
                requirements: [
                  'No prior experience required',
                  'Basic computer skills',
                  'Internet connection',
                  'Dedication to learn'
                ],
                toolsNeeded: ['Computer', 'Internet', 'Basic software'],
                timeCommitment: '2-3 hours per week',
                weeksToComplete: data.duration || '4-6 weeks',
                lessons: data.lessons_count || 12,
                projects: data.projects_count || 3,
                modules: [
                  {
                    title: 'Getting Started',
                    duration: '2 hours',
                    lessons: 4,
                    topics: ['Introduction', 'Course Overview', 'Setting Up', 'First Steps']
                  },
                  {
                    title: 'Core Concepts',
                    duration: '4 hours',
                    lessons: 8,
                    topics: ['Fundamentals', 'Key Principles', 'Practical Applications', 'Best Practices']
                  }
                ],
                testimonials: [
                  {
                    name: 'Student',
                    role: 'Learner',
                    rating: 5,
                    text: 'Great course! I learned a lot and the instructor was very helpful.'
                  }
                ]
              }
              setCourse(formattedCourse)
            }
          }
        } else {
          navigate('/courses')
        }
      } catch (error) {
        console.error('Error loading course:', error)
        navigate('/courses')
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

  // ============================================
  // LOADING STATES
  // ============================================
  
  // Show auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If no user, return null (will redirect)
  if (!user) {
    return null
  }

  // Show course loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-20">
          <div className="text-center py-12 sm:py-20">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 mx-auto mb-4 sm:mb-6" style={{ borderColor: colors.primary }}></div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">Loading Course Details</h3>
            <p className="text-sm sm:text-base text-gray-600">Getting everything ready for you...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12 md:py-20">
          <div className="text-center py-12 sm:py-20">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4 sm:mb-6" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">Course Not Found</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">The course you're looking for doesn't exist.</p>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-white rounded-lg text-sm sm:text-base font-medium hover:opacity-90 transition-all"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
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
    'Certificate of completion',
    'Lifetime access',
    'Community access'
  ]

  // Calculate total students
  const totalStudents = course.students || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Simple Back Button - Added to replace the removed headers */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link 
            to="/courses" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Courses</span>
          </Link>
        </div>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
          {/* Mobile Breadcrumb */}
          <div className="lg:hidden flex items-center gap-1 text-xs text-white/80 mb-3 overflow-x-auto pb-1 whitespace-nowrap">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <Link to="/courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <span className="text-white font-medium truncate max-w-[150px]">{course.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-8">
            {/* Left Content */}
            <div className="lg:w-2/3">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                  {course.badge || 'COURSE'}
                </span>
                <span className="text-white/80 text-xs sm:text-sm">{course.category?.toUpperCase()}</span>
                <span className="text-white/80 text-xs sm:text-sm">•</span>
                <span className="text-white/80 text-xs sm:text-sm capitalize">{course.level}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4">{course.title}</h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 md:mb-8 max-w-3xl">{course.subtitle}</p>

              {/* Stats Grid - Mobile Friendly */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 md:mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-bold text-sm sm:text-base">{course.rating}</span>
                  </div>
                  <span className="text-white/80 text-xs">({course.reviews})</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                  <Users className="w-4 h-4 mx-auto text-white/80 mb-1" />
                  <span className="text-white font-bold text-sm sm:text-base">{totalStudents}</span>
                  <span className="text-white/80 text-xs block">students</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                  <Clock className="w-4 h-4 mx-auto text-white/80 mb-1" />
                  <span className="text-white font-bold text-sm sm:text-base">{course.duration}</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-center">
                  <Target className="w-4 h-4 mx-auto text-white/80 mb-1" />
                  <span className="text-white font-bold text-sm sm:text-base capitalize">{course.level}</span>
                </div>
              </div>

              {/* Mobile Action Buttons - WITHOUT SHOPPING CART ICON */}
              <div className="lg:hidden flex items-center gap-3">
                <button
                  onClick={handleEnrollNow}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg text-sm transition-all"
                >
                  Enroll - {FIXED_PRICE}
                </button>
                <button
                  onClick={handleBookmark}
                  className="p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Bookmark className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Course Card - Hidden on Mobile - WITHOUT SHOPPING CART ICON */}
            <div className="hidden lg:block lg:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="mb-6">
                  <div className="text-4xl font-bold text-white">{FIXED_PRICE}</div>
                </div>

                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl text-lg mb-4 transition-all hover:scale-105"
                >
                  Enroll Now - {FIXED_PRICE}
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

      {/* Mobile Sticky Enroll Bar - WITHOUT SHOPPING CART ICON */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-xs text-gray-600">Total price</div>
            <div className="text-xl font-bold" style={{ color: colors.primary }}>{FIXED_PRICE}</div>
          </div>
          <button
            onClick={handleEnrollNow}
            className="flex-1 py-3 px-4 rounded-lg text-white font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12 pb-20 lg:pb-12">
        <div className="lg:flex gap-8">
          {/* Left Content */}
          <div className="lg:w-2/3 space-y-3 sm:space-y-4">
            {/* Dropdown Sections - Overview */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => toggleSection('overview')}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Overview</h3>
                {openSections.overview ? (
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                ) : (
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                )}
              </button>
              
              {openSections.overview && (
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200 space-y-4 sm:space-y-6">
                  <div>
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{course.fullDescription}</p>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">What You'll Learn</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {course.learningOutcomes?.map((outcome, index) => (
                        <div key={index} className="flex items-start bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <CheckCircle className="mr-2 flex-shrink-0 mt-0.5" size={16} style={{ color: colors.success }} />
                          <span className="text-xs sm:text-sm text-gray-700">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Course Details</h4>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold" style={{ color: colors.primary }}>{course.lessons}</div>
                          <div className="text-xs sm:text-sm text-gray-600">Lessons</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl sm:text-2xl font-bold" style={{ color: colors.secondary }}>{course.projects}</div>
                          <div className="text-xs sm:text-sm text-gray-600">Projects</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm sm:text-xl font-bold" style={{ color: colors.success }}>{course.weeksToComplete}</div>
                          <div className="text-xs sm:text-sm text-gray-600">Duration</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm sm:text-xl font-bold" style={{ color: colors.accent }}>{course.timeCommitment}</div>
                          <div className="text-xs sm:text-sm text-gray-600">Weekly effort</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">Tools You'll Need</h4>
                    <div className="bg-gray-50 rounded-xl p-3 sm:p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        {course.toolsNeeded?.map((tool, index) => (
                          <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg">
                            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: colors.primary + '15' }}>
                              <Settings className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: colors.primary }} />
                            </div>
                            <span className="text-xs sm:text-sm text-gray-700">{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Sections - Curriculum */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => toggleSection('curriculum')}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Curriculum</h3>
                {openSections.curriculum ? (
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                ) : (
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                )}
              </button>
              
              {openSections.curriculum && (
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200 space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-xs sm:text-sm text-gray-600">
                      {course.lessons} lessons • {course.projects} projects
                    </p>
                  </div>
                  {course.modules?.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gray-50 p-3 sm:p-4">
                        <h4 className="text-sm sm:text-base font-bold text-gray-900">{module.title}</h4>
                        <div className="flex items-center mt-1 text-gray-600 text-xs sm:text-sm">
                          <Clock size={12} className="mr-1" />
                          {module.duration} • {module.lessons} lessons
                        </div>
                      </div>
                      <div className="p-3 sm:p-4 bg-white">
                        <ul className="space-y-1 sm:space-y-2">
                          {module.topics?.map((topic, topicIndex) => (
                            <li key={topicIndex} className="flex items-center py-1 sm:py-2 border-b border-gray-100 last:border-0">
                              <Video size={14} className="text-gray-400 mr-2 sm:mr-3 flex-shrink-0" />
                              <span className="text-xs sm:text-sm text-gray-700">{topic}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Sections - Requirements */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => toggleSection('requirements')}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Requirements</h3>
                {openSections.requirements ? (
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                ) : (
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                )}
              </button>
              
              {openSections.requirements && (
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200 space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">Prerequisites</h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {course.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start gap-2 sm:gap-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: colors.primary + '20' }}>
                            <CheckCircle size={10} style={{ color: colors.primary }} />
                          </div>
                          <span className="text-xs sm:text-sm text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">Who This Course Is For</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {[
                        'Beginners starting a new career',
                        'Professionals upgrading skills',
                        'Entrepreneurs building a business',
                        'Career changers',
                        'Self-learners',
                        'Anyone interested in personal growth'
                      ].map((item, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-2 sm:p-3 rounded-lg">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1 sm:mr-2" style={{ background: colors.secondary }}></div>
                          <span className="text-xs sm:text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dropdown Sections - Reviews */}
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
              <button
                onClick={() => toggleSection('reviews')}
                className="w-full flex items-center justify-between p-3 sm:p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900">Reviews</h3>
                {openSections.reviews ? (
                  <Minus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                ) : (
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: colors.primary }} />
                )}
              </button>
              
              {openSections.reviews && (
                <div className="p-3 sm:p-4 bg-white border-t border-gray-200 space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-xl sm:text-2xl md:text-3xl font-bold mr-2 sm:mr-3" style={{ color: colors.primary }}>{course.rating}</div>
                      <div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={12} className={`${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <div className="text-gray-600 text-xs sm:text-sm">{course.reviews} reviews</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 sm:space-y-4">
                    {course.testimonials?.map((testimonial, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-3 sm:p-4 md:p-6">
                        <div className="flex items-center mb-2 sm:mb-3">
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={12} className="text-yellow-400 fill-current mr-0.5 sm:mr-1" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 md:mb-4">"{testimonial.text}"</p>
                        <div className="flex items-center">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mr-2 sm:mr-3" style={{ background: colors.primary + '15' }}>
                            <span className="text-xs font-bold" style={{ color: colors.primary }}>
                              {testimonial.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-xs sm:text-sm">{testimonial.name}</div>
                            <div className="text-gray-600 text-xs">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block lg:w-1/3 mt-8 lg:mt-0">
            <div className="sticky top-24 space-y-4 sm:space-y-6">
              {/* Course Details Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
                <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">Course Details</h4>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Duration:</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Lessons:</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Projects:</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{course.projects}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Level:</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 capitalize">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Access:</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">Lifetime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Students:</span>
                    <span className="text-xs sm:text-sm font-bold text-gray-900">{totalStudents}</span>
                  </div>
                </div>
              </div>

              {/* Quick Enroll Card */}
              <div className="rounded-2xl p-4 sm:p-6 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <h4 className="text-base sm:text-xl font-bold mb-2 sm:mb-4">Start Learning Today!</h4>
                <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{FIXED_PRICE}</div>
                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg sm:rounded-xl text-sm sm:text-lg transition-all hover:scale-105"
                >
                  Enroll Now - {FIXED_PRICE}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          input, select, button {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          
          .min-h-screen {
            padding-bottom: env(safe-area-inset-bottom);
          }
        }
        
        /* Smooth transitions */
        * {
          -webkit-tap-highlight-color: transparent;
        }
        
        /* Focus styles */
        input:focus, select:focus, button:focus {
          outline: none;
          ring: 2px solid ${colors.primary};
        }
      `}</style>
    </div>
  )
}