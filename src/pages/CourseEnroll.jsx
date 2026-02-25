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

  // Brand colors
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
  }

  // ==================== ALL COURSES WITH HONEST NUMBERS ====================
  const allCourses = {
    // Virtual Assistant Course
    'virtual-assistant-pro': {
      id: 'virtual-assistant-pro',
      title: 'Virtual Assistant Professional',
      subtitle: 'Launch your remote VA career in 6 weeks',
      description: 'Master administrative skills, communication, and client acquisition to become a successful virtual assistant.',
      fullDescription: 'This 6-week program covers everything you need to become a professional virtual assistant. Learn to manage emails, calendars, documents, and social media for clients. Graduate with a professional portfolio and certification.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 32,
      rating: 4.9,
      reviews: 18,
      category: 'Career',
      level: 'Beginner',
      instructor: 'Amara Osei',
      instructorTitle: 'VA Business Coach',
      instructorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'POPULAR',
      badgeColor: `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}]`,
      tags: ['Virtual Assistant', 'Remote Work', 'Admin Skills', 'Freelancing'],
      features: [
        'Professional certificate',
        'Portfolio creation',
        'Client acquisition guide',
        'Lifetime access',
        '30-day money-back'
      ],
      discount: 85,
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
      weeksToComplete: '6 weeks',
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
          title: 'Week 6: Final Project',
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

    // Social Media Marketing
    'social-media-marketing': {
      id: 'social-media-marketing',
      title: 'Social Media Marketing',
      subtitle: 'Master content creation, ads, and growth strategies',
      description: 'Learn to create engaging content, run ads, and grow your audience.',
      fullDescription: 'This 6-week course teaches you social media marketing fundamentals. Master content creation, scheduling, analytics, and paid advertising strategies across major platforms.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 28,
      rating: 4.8,
      reviews: 15,
      category: 'Marketing',
      level: 'Beginner',
      instructor: 'Kofi Asante',
      instructorTitle: 'Digital Marketing Expert',
      instructorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'NEW',
      badgeColor: `bg-gradient-to-r from-[${colors.secondary}] to-[${colors.orangeShade}]`,
      tags: ['Social Media', 'Ads', 'Analytics', 'Strategy'],
      features: [
        'Campaign templates',
        'Analytics guide',
        'Certificate',
        'Lifetime access',
        '30-day money-back'
      ],
      discount: 85,
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
      weeksToComplete: '6 weeks',
      lessons: 13,
      projects: 2,
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
          title: 'Week 6: Campaign Project',
          duration: '4 hours',
          lessons: 2,
          topics: ['Create full campaign plan', 'Present strategy']
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

    // Canva & Graphic Design
    'canva-graphic-design': {
      id: 'canva-graphic-design',
      title: 'Canva & Graphic Design',
      subtitle: 'Create stunning visuals & build your design portfolio',
      description: 'Learn to create professional designs, logos, and branding materials.',
      fullDescription: 'This 4-week course teaches you color theory, typography, and design principles. Create logos, flyers, posters, and complete social media branding kits using Canva. Graduate with a professional portfolio.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 19,
      rating: 4.7,
      reviews: 12,
      category: 'Design',
      level: 'Beginner',
      instructor: 'Esi Darkwah',
      instructorTitle: 'Canva & Design Expert',
      instructorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'DESIGN',
      badgeColor: `bg-gradient-to-r from-[${colors.success}] to-[#00C853]`,
      tags: ['Graphic Design', 'Canva', 'Branding', 'Visual Design'],
      features: [
        'Design templates',
        'Portfolio project',
        'Certificate',
        'Lifetime access',
        '30-day money-back'
      ],
      discount: 82,
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
      weeksToComplete: '4 weeks',
      lessons: 9,
      projects: 3,
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
          title: 'Week 4: Final Portfolio',
          duration: '4 hours',
          lessons: 2,
          topics: ['Design social media kit', 'Branding project']
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

    // Smart Kids Coding
    'smart-kids-coding': {
      id: 'smart-kids-coding',
      title: 'Smart Kids Coding',
      subtitle: 'Fun coding adventures for ages 6–12',
      description: 'Introduce kids to coding through Scratch! Build animations, stories, and games.',
      fullDescription: 'This 4-week coding program is designed for children ages 6–12. Using Scratch, kids learn coding fundamentals through fun projects — building animations, stories, and their own games.',
      price: 7,
      originalPrice: 35,
      duration: '4 Weeks',
      students: 12,
      rating: 4.9,
      reviews: 8,
      category: 'Kids',
      level: 'Beginner',
      instructor: 'Ms. Akosua',
      instructorTitle: 'Kids Coding Instructor',
      instructorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'KIDS',
      badgeColor: `bg-gradient-to-r from-[#FF6D00] to-[#FFD600]`,
      tags: ['Kids Coding', 'Scratch', 'Game Development', 'STEM'],
      features: [
        'Fun projects',
        'Certificate',
        'Game creation',
        'Parent updates',
        '30-day money-back'
      ],
      discount: 80,
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

    // Freelancing & Online Income
    'freelancing-online-income': {
      id: 'freelancing-online-income',
      title: 'Freelancing & Online Income',
      subtitle: 'Start earning online with freelancing skills',
      description: 'Learn to find clients, set rates, and build sustainable online income.',
      fullDescription: 'This 4-week course teaches you how to start freelancing, find clients, set your rates, and build sustainable online income through platforms like Upwork and Fiverr.',
      price: 7,
      originalPrice: 39,
      duration: '4 Weeks',
      students: 21,
      rating: 4.8,
      reviews: 14,
      category: 'Business',
      level: 'Beginner',
      instructor: 'Yaa Asantewaa',
      instructorTitle: 'Freelance Business Coach',
      instructorImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'FREELANCE',
      badgeColor: `bg-gradient-to-r from-[${colors.success}] to-[#B2FF59]`,
      tags: ['Freelancing', 'Online Income', 'Remote Work', 'Business'],
      features: [
        'Profile templates',
        'Proposal guide',
        'Pricing calculator',
        'Certificate',
        '30-day money-back'
      ],
      discount: 82,
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

    // AI Prompt Engineering
    'ai-prompt-engineering': {
      id: 'ai-prompt-engineering',
      title: 'AI Prompt Engineering',
      subtitle: 'Master AI tools for content creation',
      description: 'Learn to use ChatGPT, Midjourney, and other AI tools effectively.',
      fullDescription: 'This 6-week course teaches you to master AI prompt engineering. Learn techniques for content creation, automation, and problem-solving using ChatGPT, Claude, and other AI tools.',
      price: 7,
      originalPrice: 49,
      duration: '6 Weeks',
      students: 18,
      rating: 4.9,
      reviews: 11,
      category: 'Tech',
      level: 'Intermediate',
      instructor: 'Nana Addo',
      instructorTitle: 'AI Prompt Expert',
      instructorImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      badge: 'AI PRO',
      badgeColor: `bg-gradient-to-r from-[${colors.blueShade}] to-[${colors.accent}]`,
      tags: ['ChatGPT', 'Automation', 'AI Tools', 'Prompting'],
      features: [
        'Prompt library',
        'Real projects',
        'Certification',
        'AI tools guide',
        '30-day money-back'
      ],
      discount: 85,
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
      weeksToComplete: '6 weeks',
      lessons: 15,
      projects: 4,
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
                price: 7,
                originalPrice: parseFloat(data.original_price) || 49,
                duration: data.duration || 'Self-paced',
                students: data.enrollment_count || 5,
                rating: data.rating || 4.5,
                reviews: data.review_count || 3,
                category: data.category || 'General',
                level: data.level || 'Beginner',
                instructor: data.instructor || 'iKPACE Expert',
                instructorTitle: data.instructor_title || 'Industry Professional',
                instructorImage: data.instructor_image || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
                image: data.image_url || 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
                featured: data.featured || false,
                badge: data.badge || 'NEW',
                badgeColor: `bg-gradient-to-r from-[${colors.primary}] to-[${colors.secondary}]`,
                tags: data.tags || ['Learning', 'Skills', 'Career'],
                features: [
                  '30-day money-back guarantee',
                  'Certificate of completion',
                  'Lifetime access',
                  'Community access'
                ],
                discount: 85,
                color: `from-[${colors.primary}] to-[${colors.secondary}]`,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 mx-auto mb-6" style={{ borderColor: colors.primary }}></div>
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
              className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-medium hover:opacity-90 transition-all"
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
    '30-day money-back guarantee',
    'Certificate of completion',
    'Lifetime access',
    'Community access'
  ]

  // Calculate total students
  const totalStudents = course.students || 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8">
            {/* Left Content */}
            <div className="md:w-2/3">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Link>

              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-bold">
                  {course.badge || 'COURSE'}
                </span>
                <span className="text-white/80 text-sm">{course.category?.toUpperCase()}</span>
                <span className="text-white/80 text-sm">•</span>
                <span className="text-white/80 text-sm capitalize">{course.level}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{course.title}</h1>
              <p className="text-xl text-white/90 mb-8 max-w-3xl">{course.subtitle}</p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-bold text-lg">{course.rating}</span>
                  </div>
                  <span className="text-white/80">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-white/80" />
                  <span className="text-white">{totalStudents} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/80" />
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-white/80" />
                  <span className="text-white capitalize">{course.level}</span>
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
                    <div className="text-white font-bold">{course.instructor}</div>
                    <div className="text-white/80 text-sm">{course.instructorTitle}</div>
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
                    <div className="text-4xl font-bold text-white">${course.price}</div>
                    {course.originalPrice > course.price && (
                      <div className="text-xl line-through text-white/70">${course.originalPrice}</div>
                    )}
                  </div>
                  {course.discount > 0 && (
                    <div className="text-yellow-300 font-bold mb-2">
                      Save {course.discount}%
                    </div>
                  )}
                  <div className="text-sm text-white/80">One-time payment • Lifetime access</div>
                </div>

                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl text-lg mb-4 flex items-center justify-center gap-3 transition-all hover:scale-105"
                >
                  <ShoppingCart size={24} />
                  Enroll Now - ${course.price}
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
              {['overview', 'curriculum', 'requirements', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium capitalize whitespace-nowrap transition-colors ${
                    activeTab === tab 
                      ? 'border-b-2' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  style={activeTab === tab ? { borderColor: colors.primary, color: colors.primary } : {}}
                >
                  {tab === 'overview' && 'Overview'}
                  {tab === 'curriculum' && 'Curriculum'}
                  {tab === 'requirements' && 'Requirements'}
                  {tab === 'reviews' && 'Reviews'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Course</h3>
                  <p className="text-gray-700 text-lg leading-relaxed">{course.fullDescription}</p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.learningOutcomes?.map((outcome, index) => (
                      <div key={index} className="flex items-start bg-white p-3 rounded-lg border border-gray-200">
                        <CheckCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} style={{ color: colors.success }} />
                        <span className="text-gray-700">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Details</h3>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: colors.primary }}>{course.lessons}</div>
                        <div className="text-sm text-gray-600">Lessons</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: colors.secondary }}>{course.projects}</div>
                        <div className="text-sm text-gray-600">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: colors.success }}>{course.weeksToComplete}</div>
                        <div className="text-sm text-gray-600">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: colors.accent }}>{course.timeCommitment}</div>
                        <div className="text-sm text-gray-600">Weekly effort</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Tools You'll Need</h3>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.toolsNeeded?.map((tool, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: colors.primary + '15' }}>
                            <Settings className="w-4 h-4" style={{ color: colors.primary }} />
                          </div>
                          <span className="text-gray-700">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'curriculum' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">Course Curriculum</h3>
                  <div className="text-gray-600 text-sm">
                    {course.lessons} lessons • {course.projects} projects
                  </div>
                </div>
                {course.modules?.map((module, moduleIndex) => (
                  <div key={moduleIndex} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-gray-900">{module.title}</h4>
                        <div className="flex items-center mt-1 text-gray-600 text-sm">
                          <Clock size={14} className="mr-1" />
                          {module.duration} • {module.lessons} lessons
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-white">
                      <ul className="space-y-2">
                        {module.topics?.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center py-2 border-b border-gray-100 last:border-0">
                            <Video size={16} className="text-gray-400 mr-3" />
                            <span className="text-gray-700">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'requirements' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h3>
                  <div className="bg-white rounded-xl border border-gray-200 p-6">
                    <ul className="space-y-3">
                      {course.requirements?.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: colors.primary + '20' }}>
                            <CheckCircle size={12} style={{ color: colors.primary }} />
                          </div>
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Who This Course Is For</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      'Beginners starting a new career',
                      'Professionals upgrading skills',
                      'Entrepreneurs building a business',
                      'Career changers',
                      'Self-learners',
                      'Anyone interested in personal growth'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center bg-white p-3 rounded-lg border border-gray-200">
                        <div className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: colors.secondary }}></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Student Reviews</h3>
                  <div className="flex items-center">
                    <div className="text-3xl font-bold mr-3" style={{ color: colors.primary }}>{course.rating}</div>
                    <div>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={`${i < Math.floor(course.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <div className="text-gray-600 text-sm">{course.reviews} reviews</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {course.testimonials?.map((testimonial, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} size={14} className="text-yellow-400 fill-current mr-1" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ background: colors.primary + '15' }}>
                          <span className="text-xs font-bold" style={{ color: colors.primary }}>
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{testimonial.name}</div>
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
              {/* Course Details Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h4 className="font-bold text-gray-900 mb-4">Course Details</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-bold text-gray-900">{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Lessons:</span>
                    <span className="font-bold text-gray-900">{course.lessons}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Projects:</span>
                    <span className="font-bold text-gray-900">{course.projects}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level:</span>
                    <span className="font-bold text-gray-900 capitalize">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Access:</span>
                    <span className="font-bold text-gray-900">Lifetime</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Students:</span>
                    <span className="font-bold text-gray-900">{totalStudents}</span>
                  </div>
                </div>
              </div>

              {/* Quick Enroll Card */}
              <div className="rounded-2xl p-6 text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}>
                <h4 className="font-bold text-xl mb-4">Start Learning Today!</h4>
                <div className="text-3xl font-bold mb-2">${course.price}</div>
                {course.originalPrice > course.price && (
                  <div className="text-white/80 line-through mb-1">${course.originalPrice}</div>
                )}
                <div className="text-white/80 mb-6">One-time payment • Lifetime access</div>
                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-xl text-lg mb-4 transition-all hover:scale-105"
                >
                  Enroll Now - ${course.price}
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