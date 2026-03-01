import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // ✅ FIXED: Added .jsx extension
import { 
  ArrowRight, ChevronDown, Menu, X, LogOut, User, Settings,
  BookOpen, LayoutDashboard, Users, Award, GraduationCap, 
  Briefcase, Code, Megaphone, TrendingUp, Rocket, Zap, 
  Sparkles, Gift, Clock, Star, Globe, Camera, Music, Palette, 
  Coffee, Heart, Shield, HelpCircle, Mail, FileText, 
  BookMarked, Target, Trophy, PenTool, Video, Headphones, 
  Download, CreditCard, Globe2, Mic, Brain, Cpu, LineChart, 
  BadgeCheck, Medal, Instagram, Twitter, Linkedin, Facebook, 
  Youtube, MessageCircle, CalendarDays, MapPin, Phone, 
  ExternalLink, ChevronRight, Flame, Sparkle, Bot, Gem, 
  Crown, Layers, Info, LogIn,
  Target as TargetIcon,
  GraduationCap as ProgramIcon,
  Heart as HeartIcon,
  Users as UsersIcon
} from 'lucide-react';

export default function Navbar() {
  const { user, profile, logout } = useAuth()
  const navigate = useNavigate()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileDropdown, setMobileDropdown] = useState(null)
  const dropdownRef = useRef(null)

const colors = {
  primary: "#1A3D7C",    // Ikpace Deep Blue (main buttons, headings)
  secondary: "#FF7A00",  // Ikpace Vibrant Orange (CTA, highlights)
  accent: "#2F5EA8",     // Stronger blue accent
  dark: "#1F2937",       // Dark readable text
  success: "#008F4C",    // Brand green
  warning: "#E6B800",    // Brand yellow
  green: "#008F4C",      // Brand green (consistent)
  yellow: "#E6B800",     // Brand yellow (consistent)
  lightGray: "#F3F4F6",
  blueShade: "#4A6FA5",
  orangeShade: "#FF9A3C",
  white: "#FFFFFF"
};

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    logout()
    navigate('/login')
  }

  // Menu items with dropdowns - FIXED with correct course links
  const menuItems = [
    {
      id: 'programs',
      title: 'Programs',
      icon: <ProgramIcon size={18} />,
      color: colors.primary,
      items: [
        { 
          name: "Virtual Assistant Professional", 
          href: "/course/virtual-assistant-pro", 
          icon: <Briefcase size={16} />, 
          duration: "6 Weeks", 
          price: "$7.00", 
          badge: "Popular",
          description: "Become a certified VA in 6 weeks"
        },
        { 
          name: "Social Media Marketing", 
          href: "/course/social-media-marketing", 
          icon: <Megaphone size={16} />, 
          duration: "6 Weeks", 
          price: "$7.00", 
          badge: "Trending",
          description: "Master social media management"
        },
        { 
          name: "Canva & Graphic Design", 
          href: "/course/canva-graphic-design", 
          icon: <Palette size={16} />, 
          duration: "4 Weeks", 
          price: "$7.00",
          description: "Create stunning designs easily"
        },
        { 
          name: "Smart Kids Coding", 
          href: "/course/smart-kids-coding", 
          icon: <Code size={16} />, 
          duration: "4 Weeks", 
          price: "$7.00", 
          badge: "Ages 6-12",
          description: "Fun coding for young minds"
        },
        { 
          name: "Freelancing & Online Income", 
          href: "/course/freelancing-online-income", 
          icon: <Rocket size={16} />, 
          duration: "4 Weeks", 
          price: "$7.00", 
          badge: "New",
          description: "Start earning online today"
        }
      ]
    },
    {
      id: 'women-tech',
      title: 'Women & Tech Skills',
      icon: <HeartIcon size={18} />,
      color: colors.secondary,
      items: [
        { 
          name: "Women in Tech Scholarship", 
          href: "/course/women-tech-scholarship", 
          icon: <Medal size={16} />, 
          badge: "Apply Now", 
          description: "50% tuition support for women",
          highlight: true
        },
        { 
          name: "Return to Work Program", 
          href: "/course/return-to-work", 
          icon: <Rocket size={16} />, 
          badge: "Flexible", 
          description: "For professionals on career breaks",
          highlight: false
        },
        { 
          name: "Tech Leadership for Women", 
          href: "/course/tech-leadership", 
          icon: <Crown size={16} />, 
          badge: "Mentorship", 
          description: "Executive skills development",
          highlight: false
        },
        { 
          name: "Coding for Beginners", 
          href: "/course/coding-beginners", 
          icon: <Code size={16} />, 
          badge: "Free", 
          description: "Start your coding journey",
          highlight: false
        },
        { 
          name: "Women Entrepreneurs", 
          href: "/course/tech-entrepreneurship", 
          icon: <Briefcase size={16} />, 
          badge: "Workshop", 
          description: "Build and scale your startup",
          highlight: false
        }
      ]
    },
    {
      id: 'community',
      title: 'Our Community',
      icon: <UsersIcon size={18} />,
      color: colors.success,
      items: [
        { 
          name: "Student Forums", 
          href: "/community/forums", 
          icon: <MessageCircle size={16} />, 
          badge: "20k+ members", 
          description: "Ask questions, share ideas",
          stats: "2.4k online now"
        },
        { 
          name: "Study Groups", 
          href: "/community/study-groups", 
          icon: <Users size={16} />, 
          badge: "Join now", 
          description: "Learn together with peers",
          stats: "24 active groups"
        },
        { 
          name: "Events & Workshops", 
          href: "/community/events", 
          icon: <CalendarDays size={16} />, 
          badge: "Weekly", 
          description: "Live sessions with experts",
          stats: "3 events this week"
        },
        { 
          name: "Alumni Network", 
          href: "/community/alumni", 
          icon: <Award size={16} />, 
          badge: "10k+ graduates", 
          description: "Connect with graduates",
          stats: "1.2k active alumni"
        },
        { 
          name: "Become an Ambassador", 
          href: "/community/ambassador", 
          icon: <Crown size={16} />, 
          badge: "Apply", 
          description: "Lead and earn rewards",
          stats: "Earn up to $200/mo"
        }
      ]
    },
    {
      id: 'about',
      title: 'About iKPACE',
      icon: <Info size={18} />,
      color: colors.accent,
      items: [
        { 
          name: "Our Mission", 
          href: "/about/mission", 
          icon: <TargetIcon size={16} />, 
          description: "Why we exist and our vision",
          highlight: false
        },
        { 
          name: "Our Team", 
          href: "/about/team", 
          icon: <Users size={16} />, 
          description: "Meet the experts behind iKPACE",
          highlight: false
        },
        { 
          name: "Success Stories", 
          href: "/about/success-stories", 
          icon: <Star size={16} />, 
          badge: "1000+ stories", 
          description: "Real achievements from graduates",
          highlight: true
        },
        { 
          name: "Careers", 
          href: "/about/careers", 
          icon: <Briefcase size={16} />, 
          badge: "We're hiring", 
          description: "Join our growing team",
          highlight: false
        },
        { 
          name: "Contact Us", 
          href: "/contact", 
          icon: <Mail size={16} />, 
          description: "Get in touch with our team",
          highlight: false
        }
      ]
    }
  ]

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-xl py-2" : "bg-white/95 backdrop-blur-md py-3"
      }`}
      ref={dropdownRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src="/whatsapp_image_2026-01-31_at_7.16.31_am.jpeg"
              alt="iKPACE Logo"
              className="h-14 w-auto transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-lg leading-tight" style={{ color: colors.primary }}>
                iKPACE
              </div>
              <div className="text-xs font-semibold tracking-wide" style={{ color: colors.secondary }}>
                LEARN SMARTER
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all group ${
                    activeDropdown === item.id 
                      ? 'bg-gray-100 shadow-inner' 
                      : 'hover:bg-gray-50 hover:shadow-md'
                  }`}
                >
                  <span style={{ color: item.color }} className="group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium text-sm" style={{ color: colors.dark }}>
                    {item.title}
                  </span>
                  <ChevronDown 
                    size={14} 
                    className={`transition-all duration-300 ${activeDropdown === item.id ? 'rotate-180 text-orange-500' : ''}`} 
                    style={{ color: activeDropdown === item.id ? colors.secondary : colors.dark }}
                  />
                </button>

                {/* Enhanced Dropdown Menu */}
                {activeDropdown === item.id && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 animate-fadeIn overflow-hidden">
                    {/* Dropdown Header with Gradient */}
                    <div className="px-4 pb-2 mb-2 border-b border-gray-100" 
                         style={{ background: `linear-gradient(90deg, ${item.color}08, transparent)` }}>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg" style={{ background: item.color + '20', color: item.color }}>
                          {item.icon}
                        </span>
                        <span className="font-semibold text-sm" style={{ color: item.color }}>
                          {item.title}
                        </span>
                      </div>
                    </div>

                    {/* Dropdown Items with enhanced styling */}
                    <div className="space-y-1 px-2 max-h-96 overflow-y-auto">
                      {item.items.map((subItem, idx) => (
                        <Link
                          key={idx}
                          to={subItem.href}
                          className={`flex items-start gap-3 px-3 py-3 rounded-xl transition-all group/item ${
                            subItem.highlight 
                              ? 'bg-gradient-to-r hover:from-orange-50 hover:to-transparent' 
                              : 'hover:bg-gray-50'
                          }`}
                          onClick={() => setActiveDropdown(null)}
                        >
                          <span className={`p-2 rounded-lg transition-all group-hover/item:scale-110 ${
                            subItem.highlight 
                              ? 'bg-orange-100 text-orange-600' 
                              : 'bg-gray-100 text-gray-500'
                          }`} style={{ color: subItem.highlight ? colors.secondary : item.color }}>
                            {subItem.icon}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm font-medium text-gray-700 group-hover/item:text-orange-500">
                                {subItem.name}
                              </span>
                              {subItem.badge && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                  subItem.badge.includes('Popular') ? 'bg-green-100 text-green-700' :
                                  subItem.badge.includes('Trending') ? 'bg-blue-100 text-blue-700' :
                                  subItem.badge.includes('New') ? 'bg-purple-100 text-purple-700' :
                                  subItem.badge.includes('Apply') ? 'bg-orange-100 text-orange-700' :
                                  subItem.badge.includes('Free') ? 'bg-emerald-100 text-emerald-700' :
                                  subItem.badge.includes('Ages') ? 'bg-pink-100 text-pink-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {subItem.badge}
                                </span>
                              )}
                            </div>
                            
                            {/* Description */}
                            {subItem.description && (
                              <p className="text-xs text-gray-500 mt-1">{subItem.description}</p>
                            )}
                            
                            {/* Metadata row */}
                            <div className="flex items-center gap-3 mt-1.5 text-xs">
                              {subItem.duration && (
                                <span className="flex items-center gap-1 text-gray-400">
                                  <Clock size={10} />
                                  {subItem.duration}
                                </span>
                              )}
                              {subItem.price && (
                                <>
                                  <span className="text-gray-300">•</span>
                                  <span className="font-medium" style={{ color: colors.secondary }}>
                                    {subItem.price}
                                  </span>
                                </>
                              )}
                              {subItem.stats && (
                                <span className="flex items-center gap-1 text-gray-400">
                                  <Users size={10} />
                                  {subItem.stats}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {/* Arrow indicator */}
                          <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>

                    {/* Enhanced View All Link */}
                    <div className="mt-3 pt-3 px-4 border-t border-gray-100">
                      <Link 
                        to={`/${item.id}`}
                        className="group flex items-center justify-between py-2 px-3 rounded-xl transition-all hover:shadow-md"
                        style={{ background: `linear-gradient(90deg, ${item.color}08, transparent)` }}
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="text-sm font-medium flex items-center gap-2" style={{ color: item.color }}>
                          View All {item.title}
                        </span>
                        <span className="p-1 rounded-full transition-transform group-hover:translate-x-1" style={{ background: item.color + '20', color: item.color }}>
                          <ArrowRight size={12} />
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              // User Menu (when logged in)
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 hover:opacity-90 transition-all group"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border-2 shadow-md group-hover:shadow-lg transition-all"
                    style={{ borderColor: colors.secondary, background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                  >
                    <User size={18} className="text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium" style={{ color: colors.dark }}>
                    {profile?.full_name?.split(' ')[0] || 'User'}
                  </span>
                  <ChevronDown 
                    size={14} 
                    className={`hidden md:block transition-all duration-300 ${showUserMenu ? 'rotate-180 text-orange-500' : ''}`} 
                    style={{ color: showUserMenu ? colors.secondary : colors.dark }}
                  />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl py-2 border border-gray-100 animate-fadeIn">
                    {/* User Info with Gradient */}
                    <div className="px-4 py-3 border-b border-gray-100" style={{ background: `linear-gradient(90deg, ${colors.primary}05, transparent)` }}>
                      <p className="text-sm font-bold" style={{ color: colors.primary }}>
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{profile?.email || ''}</p>
                    </div>

                    {/* Menu Items */}
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <LayoutDashboard size={16} className="mr-3 transition-transform group-hover:scale-110" style={{ color: colors.primary }} />
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={16} className="mr-3 transition-transform group-hover:scale-110" style={{ color: colors.secondary }} />
                      Profile
                    </Link>
                    <Link
                      to="/my-courses"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <BookOpen size={16} className="mr-3 transition-transform group-hover:scale-110" style={{ color: colors.accent }} />
                      My Courses
                    </Link>
                    <Link
                      to="/certificates"
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Award size={16} className="mr-3 transition-transform group-hover:scale-110" style={{ color: colors.success }} />
                      Certificates
                    </Link>

                    {profile?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <LayoutDashboard size={16} className="mr-3 transition-transform group-hover:scale-110" style={{ color: colors.warning }} />
                        Admin Dashboard
                      </Link>
                    )}

                    <hr className="my-2 border-gray-100" />

                    <button
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                    >
                      <LogOut size={16} className="mr-3 transition-transform group-hover:scale-110" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login & Get Started (when logged out)
              <>
                <Link
                  to="/login"
                  className="hidden md:flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all hover:bg-gray-100 hover:shadow-md group"
                  style={{ color: colors.primary }}
                >
                  <LogIn size={16} className="transition-transform group-hover:scale-110" />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white hover:shadow-xl transition-all group"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
                >
                  Get Started
                  <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} style={{ color: colors.primary }} /> : <Menu size={24} style={{ color: colors.primary }} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-100 animate-fadeIn">
            {menuItems.map((item) => (
              <div key={item.id} className="mb-3">
                <button
                  onClick={() => setMobileDropdown(mobileDropdown === item.id ? null : item.id)}
                  className="flex items-center justify-between w-full px-4 py-3 rounded-xl hover:bg-gray-50 transition-all"
                  style={{ background: mobileDropdown === item.id ? `${item.color}10` : 'transparent' }}
                >
                  <div className="flex items-center gap-3">
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span className="font-medium" style={{ color: colors.dark }}>{item.title}</span>
                  </div>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${mobileDropdown === item.id ? 'rotate-180' : ''}`}
                    style={{ color: item.color }}
                  />
                </button>
                
                {mobileDropdown === item.id && (
                  <div className="pl-12 pr-4 mt-2 space-y-2">
                    {item.items.map((subItem, idx) => (
                      <Link
                        key={idx}
                        to={subItem.href}
                        className="flex items-start gap-3 py-2.5 px-3 rounded-xl hover:bg-gray-50 transition-all"
                        onClick={() => {
                          setMobileMenuOpen(false)
                          setMobileDropdown(null)
                        }}
                      >
                        <span className="text-gray-400">{subItem.icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-medium text-gray-700">{subItem.name}</span>
                            {subItem.badge && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                {subItem.badge}
                              </span>
                            )}
                          </div>
                          {subItem.description && (
                            <p className="text-xs text-gray-500 mt-0.5">{subItem.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="mt-4 pt-4 border-t border-gray-100 px-4 space-y-3">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all hover:bg-gray-100"
                  style={{ border: `1px solid ${colors.primary}`, color: colors.primary }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn size={16} />
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium text-white transition-all hover:shadow-lg"
                  style={{ background: colors.primary }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                  <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        /* Custom scrollbar for dropdowns */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </nav>
  )
}