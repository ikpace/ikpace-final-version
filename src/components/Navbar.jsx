// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  ArrowRight, ChevronDown, Menu, X, LogOut, User, Settings,
  BookOpen, LayoutDashboard, Users, Award, GraduationCap,
  Briefcase, Code, Megaphone, TrendingUp, Rocket, Zap,
  Sparkles, Gift, Clock, Star, Globe, Palette,
  Heart, Shield, HelpCircle, Mail, FileText,
  BookMarked, Target, Trophy, PenTool, Video,
  Download, CreditCard, Brain, Cpu, LineChart,
  BadgeCheck, Medal, MessageCircle, CalendarDays, Phone,
  ExternalLink, ChevronRight, Flame, Bot, Gem,
  Crown, Layers, Info, LogIn
} from 'lucide-react';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:     '#1A3D7C',
  navyDark: '#0F2655',
  navyMid:  '#2F5EA8',
  orange:   '#FF7A00',
  orangeL:  '#FF9A3C',
  green:    '#008F4C',
  yellow:   '#E6B800',
  rose:     '#E11D48',
  dark:     '#1F2937',
  gray:     { 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',400:'#94A3B8',500:'#64748B',700:'#334155' }
}

// ─── iKPACE Brand Logo SVG ────────────────────────────────────────────────────
// Replica of your uploaded logo: navy card · orange graduation cap · white iKpace · yellow tagline
// To swap in your real image:
//   import logo from '../assets/ikpace-logo.png'
//   Replace <IKPACELogo/> with <img src={logo} className="h-12 w-auto" alt="iKPACE"/>
function IKPACELogo({ height = 48 }) {
  const w = Math.round(height * 0.82)
  return (
    <svg width={w} height={height} viewBox="0 0 200 244"
      xmlns="http://www.w3.org/2000/svg" aria-label="iKPACE — Learn Smarter" role="img">
      {/* Navy card background */}
      <rect width="200" height="244" rx="22" fill={C.navyDark}/>
      {/* Flat mortarboard top */}
      <polygon points="100,28 176,58 100,88 24,58" fill={C.orange}/>
      {/* Cap bowl */}
      <path d="M46,66 L46,107 Q46,136 100,145 Q154,136 154,107 L154,66 Q128,79 100,79 Q72,79 46,66Z" fill={C.orange}/>
      {/* Shadow crease */}
      <path d="M46,66 Q72,79 100,79 Q128,79 154,66 Q128,90 100,91 Q72,90 46,66Z" fill={C.navyDark} opacity="0.30"/>
      {/* Tassel string */}
      <line x1="176" y1="58" x2="176" y2="104" stroke={C.orange} strokeWidth="4.5" strokeLinecap="round"/>
      <line x1="164" y1="104" x2="188" y2="104" stroke={C.orange} strokeWidth="3.5" strokeLinecap="round"/>
      <circle cx="176" cy="116" r="7" fill={C.orange}/>
      {/* Wordmark */}
      <text x="100" y="182" textAnchor="middle"
        fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
        fontWeight="900" fontSize="46" fill="white" letterSpacing="-1">iKpace</text>
      {/* Tagline */}
      <text x="100" y="215" textAnchor="middle"
        fontFamily="'Arial','Helvetica Neue',Arial,sans-serif"
        fontWeight="700" fontSize="13" fill={C.yellow} letterSpacing="4.5">LEARN SMARTER</text>
    </svg>
  )
}

// ─── Menu data ────────────────────────────────────────────────────────────────
const menuItems = [
  {
    id: 'programs',
    title: 'Programs',
    icon: GraduationCap,
    color: C.navy,
    items: [
      { name:'Virtual Assistant Professional', href:'/course/virtual-assistant-pro',      icon:Briefcase,    duration:'8 Weeks', price:'$7', badge:'Popular',  desc:'Become a certified VA in 8 weeks' },
      { name:'Social Media Marketing',         href:'/course/social-media-marketing',     icon:Megaphone,    duration:'8 Weeks', price:'$7', badge:'Trending', desc:'Master social media management'   },
      { name:'Canva & Graphic Design',         href:'/course/canva-graphic-design',       icon:Palette,      duration:'8 Weeks', price:'$7', badge:'',         desc:'Create stunning designs easily'   },
      { name:'Smart Kids Coding',              href:'/course/smart-kids-coding',          icon:Code,         duration:'4 Weeks', price:'$7', badge:'Ages 6-12',desc:'Fun coding for young minds'       },
      { name:'Freelancing & Online Income',    href:'/course/freelancing-online-income',  icon:Rocket,       duration:'4 Weeks', price:'$7', badge:'New',      desc:'Start earning online today'       },
      { name:'AI Prompt Engineering',         href:'/course/ai-prompt-engineering',      icon:Brain,        duration:'8 Weeks', price:'$7', badge:'🤖 New',    desc:'Master AI tools & automation'    },
    ]
  },
  {
    id: 'women-tech',
    title: 'Women & Tech',
    icon: Heart,
    color: C.orange,
    items: [
      { name:'Women in Tech Scholarship',  href:'/women-tech/scholarship',   icon:Medal,    badge:'Apply Now', desc:'50% tuition support for women',          highlight:true  },
      { name:'Return to Work Program',     href:'/women-tech/return-to-work',icon:Rocket,   badge:'Flexible',  desc:'For professionals on career breaks',     highlight:false },
      { name:'Tech Leadership for Women',  href:'/women-tech/leadership',    icon:Crown,    badge:'Mentorship',desc:'Executive skills development',           highlight:false },
      { name:'Coding for Beginners',       href:'/women-tech/coding',  icon:Code,     badge:'Free',      desc:'Start your coding journey',             highlight:false },
      { name:'Women Entrepreneurs',        href:'/women-tech/entrepreneurs', icon:Briefcase,badge:'Workshop',  desc:'Build and scale your startup',          highlight:false },
    ]
  },
  {
    id: 'community',
    title: 'Community',
    icon: Users,
    color: C.green,
    items: [
      { name:'Student Forums',      href:'/community/forums',      icon:MessageCircle, badge:'Active',     desc:'Ask questions, share ideas',     stats:'130+ members'   },
      { name:'Study Groups',        href:'/community/study-groups',icon:Users,         badge:'Join Now',   desc:'Learn together with peers',      stats:'24 active groups' },
      { name:'Events & Workshops',  href:'/community/events',      icon:CalendarDays,  badge:'Weekly',     desc:'Live sessions with experts',     stats:'3 this week'    },
      { name:'Alumni Network',      href:'/community/alumni',      icon:Award,         badge:'Graduates',  desc:'Connect with graduates',         stats:'Active alumni'   },
      { name:'Become an Ambassador',href:'/community/ambassador',  icon:Crown,         badge:'Apply',      desc:'Lead and earn rewards',          stats:'Earn rewards'    },
    ]
  },
  {
    id: 'about',
    title: 'About',
    icon: Info,
    color: C.navyMid,
    items: [
      { name:'Our Mission',    href:'/about/mission',         icon:Target,    badge:'',              desc:'Why we exist and our vision',          highlight:false },
      { name:'Our Team',       href:'/about/team',            icon:Users,     badge:'',              desc:'Meet the experts behind iKPACE',       highlight:false },
      { name:'Success Stories',href:'/about/success-stories', icon:Star,      badge:'100+ stories',  desc:'Real achievements from graduates',      highlight:true  },
      { name:'Careers',        href:'/about/careers',         icon:Briefcase, badge:"We're hiring",  desc:'Join our growing team',                highlight:false },
      { name:'Contact Us',     href:'/contact',               icon:Mail,      badge:'',              desc:'Get in touch with our team',           highlight:false },
    ]
  }
]

// Badge colour helper
function BadgeChip({ text }) {
  if (!text) return null
  const map = {
    'Popular':   'bg-green-100 text-green-700',
    'Trending':  'bg-blue-100 text-blue-700',
    'New':       'bg-purple-100 text-purple-700',
    '🤖 New':    'bg-cyan-100 text-cyan-700',
    'Apply Now': 'bg-orange-100 text-orange-700',
    'Apply':     'bg-orange-100 text-orange-700',
    'Free':      'bg-emerald-100 text-emerald-700',
    'Ages 6-12': 'bg-pink-100 text-pink-700',
    "We're hiring": 'bg-indigo-100 text-indigo-700',
  }
  const cls = map[text] || 'bg-gray-100 text-gray-700'
  return (
    <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold whitespace-nowrap ${cls}`}>
      {text}
    </span>
  )
}

// ─── DropdownPanel ────────────────────────────────────────────────────────────
function DropdownPanel({ item, onClose }) {
  return (
    <div className="absolute left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50"
      style={{ borderColor:C.gray[200], animation:'_navFade .18s ease-out' }}>
      {/* Header stripe */}
      <div className="px-4 py-3 border-b flex items-center gap-2"
        style={{ borderColor:C.gray[100], background:`${item.color}08` }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background:`${item.color}20`, color:item.color }}>
          <item.icon size={15}/>
        </div>
        <span className="font-bold text-sm" style={{ color:item.color }}>{item.title}</span>
      </div>

      {/* Items */}
      <div className="py-2 max-h-[400px] overflow-y-auto">
        {item.items.map((sub, i) => (
          <Link key={i} to={sub.href}
            onClick={onClose}
            className="flex items-start gap-3 px-3 py-2.5 mx-1 rounded-xl transition-all group hover:bg-gray-50">
            {/* Icon */}
            <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-all group-hover:scale-110"
              style={{ background: sub.highlight ? `${C.orange}15` : C.gray[100], color: sub.highlight ? C.orange : item.color }}>
              <sub.icon size={14}/>
            </div>
            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-sm font-semibold group-hover:text-orange-500 transition-colors" style={{ color:C.dark }}>
                  {sub.name}
                </span>
                <BadgeChip text={sub.badge}/>
              </div>
              {sub.desc && <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color:C.gray[500] }}>{sub.desc}</p>}
              <div className="flex items-center gap-2 mt-1 text-[10px]" style={{ color:C.gray[400] }}>
                {sub.duration && <span className="flex items-center gap-0.5"><Clock size={9}/>{sub.duration}</span>}
                {sub.price   && <><span>·</span><span className="font-bold" style={{ color:C.orange }}>{sub.price}</span></>}
                {sub.stats   && <span className="flex items-center gap-0.5"><Users size={9}/>{sub.stats}</span>}
              </div>
            </div>
            <ChevronRight size={13} className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" style={{ color:C.gray[400] }}/>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t px-3 py-2.5" style={{ borderColor:C.gray[100] }}>
        <Link to={`/${item.id}`} onClick={onClose}
          className="flex items-center justify-between px-3 py-2 rounded-xl transition-all hover:shadow-sm group"
          style={{ background:`${item.color}08` }}>
          <span className="text-xs font-bold" style={{ color:item.color }}>View All {item.title}</span>
          <div className="w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform"
            style={{ background:`${item.color}20`, color:item.color }}>
            <ArrowRight size={11}/>
          </div>
        </Link>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN NAVBAR
// ═════════════════════════════════════════════════════════════════════════════
export default function Navbar() {
  const { user, profile, logout } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()

  const [activeDropdown, setActiveDropdown] = useState(null)
  const [showUserMenu,   setShowUserMenu]   = useState(false)
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [scrolled,       setScrolled]       = useState(false)
  const navRef = useRef(null)

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActiveDropdown(null)
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setMobileExpanded(null)
    setActiveDropdown(null)
    setShowUserMenu(false)
  }, [location.pathname])

  const handleSignOut = () => { logout(); navigate('/login') }
  const closeAll = () => { setActiveDropdown(null); setShowUserMenu(false) }

  const firstName = profile?.full_name?.split(' ')[0] || 'User'

  return (
    <>
      <nav ref={navRef}
        className="fixed w-full z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'white' : 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(12px)',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.10)' : '0 1px 0 rgba(0,0,0,0.06)',
          borderBottom: scrolled ? 'none' : `1px solid ${C.gray[100]}`
        }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* ── LOGO ─────────────────────────────────────────────────── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group" onClick={closeAll}>
              {/* Brand Logo SVG — swap with <img> once you add your file */}
              <div className="transition-transform group-hover:scale-105">
                <IKPACELogo height={44}/>
              </div>
            </Link>

            {/* ── DESKTOP NAV ──────────────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-0.5">
              {menuItems.map(item => (
                <div key={item.id} className="relative"
                  onMouseEnter={() => setActiveDropdown(item.id)}
                  onMouseLeave={() => setActiveDropdown(null)}>
                  <button
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      color: activeDropdown === item.id ? item.color : C.dark,
                      background: activeDropdown === item.id ? `${item.color}10` : 'transparent'
                    }}>
                    <item.icon size={15} style={{ color: activeDropdown===item.id ? item.color : C.gray[500] }}/>
                    {item.title}
                    <ChevronDown size={13}
                      className={`transition-transform duration-200 ${activeDropdown===item.id?'rotate-180':''}`}
                      style={{ color: activeDropdown===item.id ? item.color : C.gray[400] }}/>
                  </button>
                  {activeDropdown === item.id && <DropdownPanel item={item} onClose={closeAll}/>}
                </div>
              ))}

              {/* Pricing quick link */}
              <Link to="/pricing"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-gray-50"
                style={{ color:C.dark }}>
                <Gift size={15} style={{ color:C.orange }}/> Pricing
              </Link>
            </div>

            {/* ── RIGHT: Auth + Mobile toggle ──────────────────────────── */}
            <div className="flex items-center gap-2">

              {user ? (
                /* ── LOGGED IN ── */
                <div className="relative">
                  <button onClick={() => { setShowUserMenu(p=>!p); setActiveDropdown(null) }}
                    className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-2xl transition-all hover:shadow-md border"
                    style={{ borderColor: showUserMenu ? C.orange : C.gray[200], background: showUserMenu ? `${C.orange}06` : 'white' }}>
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0"
                      style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                      {firstName[0].toUpperCase()}
                    </div>
                    <span className="hidden sm:block text-sm font-semibold max-w-[80px] truncate" style={{ color:C.dark }}>{firstName}</span>
                    <ChevronDown size={13} className={`hidden sm:block transition-transform ${showUserMenu?'rotate-180':''}`}
                      style={{ color: showUserMenu ? C.orange : C.gray[400] }}/>
                  </button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-2xl border overflow-hidden z-50"
                      style={{ borderColor:C.gray[200], animation:'_navFade .18s ease-out' }}>
                      {/* Profile header */}
                      <div className="px-4 py-3.5 border-b" style={{ borderColor:C.gray[100], background:`${C.navy}05` }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black"
                            style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                            {firstName[0].toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-black truncate" style={{ color:C.navy }}>{profile?.full_name || 'User'}</p>
                            <p className="text-[11px] truncate" style={{ color:C.gray[400] }}>{profile?.email || ''}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu links */}
                      <div className="py-1.5">
                        {[
                          { to:'/dashboard',  icon:LayoutDashboard, label:'Dashboard',       color:C.navy   },
                          { to:'/profile',    icon:User,            label:'My Profile',      color:C.orange },
                          { to:'/my-courses', icon:BookOpen,        label:'My Courses',      color:C.navyMid},
                          { to:'/certificates',icon:Award,          label:'Certificates',    color:C.green  },
                          ...(profile?.role==='admin'||profile?.role==='instructor'
                            ? [{ to:'/teacher', icon:Settings, label:'Admin Dashboard', color:C.yellow }]
                            : [])
                        ].map(item => (
                          <Link key={item.to} to={item.to}
                            onClick={() => setShowUserMenu(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all hover:bg-gray-50 group">
                            <div className="w-7 h-7 rounded-lg flex items-center justify-center transition-all group-hover:scale-110"
                              style={{ background:`${item.color}12`, color:item.color }}>
                              <item.icon size={13}/>
                            </div>
                            <span style={{ color:C.dark }}>{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="border-t mx-3" style={{ borderColor:C.gray[100] }}/>
                      <button onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium transition-all hover:bg-red-50 group my-1">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background:'#FEE2E2', color:C.rose }}>
                          <LogOut size={13}/>
                        </div>
                        <span style={{ color:C.rose }}>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>

              ) : (
                /* ── LOGGED OUT ── */
                <>
                  <Link to="/login"
                    className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:bg-gray-100 border"
                    style={{ color:C.navy, borderColor:C.gray[200] }}>
                    <LogIn size={14}/> Sign In
                  </Link>
                  <Link to="/register"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:shadow-lg hover:-translate-y-0.5 group"
                    style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                    Get Started
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform"/>
                  </Link>
                </>
              )}

              {/* Mobile hamburger */}
              <button onClick={() => setMobileOpen(p=>!p)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-gray-100 border"
                style={{ borderColor:C.gray[200] }}>
                {mobileOpen
                  ? <X size={18} style={{ color:C.navy }}/>
                  : <Menu size={18} style={{ color:C.navy }}/>}
              </button>
            </div>
          </div>
        </div>

        {/* ── MOBILE MENU ────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t overflow-y-auto" style={{ borderColor:C.gray[100], maxHeight:'calc(100vh - 64px)' }}>
            <div className="px-4 py-3 space-y-1 bg-white">

              {/* Nav sections */}
              {menuItems.map(item => (
                <div key={item.id}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded===item.id ? null : item.id)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all"
                    style={{ background: mobileExpanded===item.id ? `${item.color}10` : C.gray[50] }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                        style={{ background:`${item.color}15`, color:item.color }}>
                        <item.icon size={15}/>
                      </div>
                      <span className="font-bold text-sm" style={{ color: mobileExpanded===item.id ? item.color : C.dark }}>
                        {item.title}
                      </span>
                    </div>
                    <ChevronDown size={15}
                      className={`transition-transform duration-200 ${mobileExpanded===item.id?'rotate-180':''}`}
                      style={{ color: mobileExpanded===item.id ? item.color : C.gray[400] }}/>
                  </button>

                  {mobileExpanded === item.id && (
                    <div className="mt-1 mb-2 ml-2 pl-3 border-l-2 space-y-0.5" style={{ borderColor:`${item.color}40` }}>
                      {item.items.map((sub, i) => (
                        <Link key={i} to={sub.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-start gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-gray-50 group">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background:`${item.color}12`, color:item.color }}>
                            <sub.icon size={13}/>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="text-sm font-semibold" style={{ color:C.dark }}>{sub.name}</span>
                              <BadgeChip text={sub.badge}/>
                            </div>
                            {sub.desc && <p className="text-[11px] mt-0.5" style={{ color:C.gray[400] }}>{sub.desc}</p>}
                            {(sub.duration||sub.price) && (
                              <div className="flex items-center gap-1.5 mt-0.5 text-[10px]" style={{ color:C.gray[400] }}>
                                {sub.duration && <span>{sub.duration}</span>}
                                {sub.price    && <><span>·</span><span className="font-bold" style={{ color:C.orange }}>{sub.price}</span></>}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Pricing */}
              <Link to="/pricing" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
                style={{ background:C.gray[50] }}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.orange}15` }}>
                  <Gift size={15} style={{ color:C.orange }}/>
                </div>
                <span className="font-bold text-sm" style={{ color:C.dark }}>Pricing</span>
              </Link>

              {/* Mobile auth */}
              <div className="pt-3 pb-2 border-t space-y-2" style={{ borderColor:C.gray[100] }}>
                {user ? (
                  <>
                    {/* User info */}
                    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background:`${C.navy}08` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm"
                        style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                        {firstName[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-black text-sm" style={{ color:C.navy }}>{profile?.full_name||'User'}</p>
                        <p className="text-[11px]" style={{ color:C.gray[400] }}>{profile?.email||''}</p>
                      </div>
                    </div>
                    {[
                      { to:'/dashboard',  icon:LayoutDashboard, label:'Dashboard',  color:C.navy   },
                      { to:'/my-courses', icon:BookOpen,        label:'My Courses', color:C.navyMid},
                      { to:'/certificates',icon:Award,          label:'Certificates',color:C.green },
                    ].map(item => (
                      <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
                        style={{ background:C.gray[50] }}>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                          style={{ background:`${item.color}15`, color:item.color }}>
                          <item.icon size={15}/>
                        </div>
                        <span className="font-semibold text-sm" style={{ color:C.dark }}>{item.label}</span>
                      </Link>
                    ))}
                    <button onClick={handleSignOut}
                      className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all"
                      style={{ background:'#FEF2F2' }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:'#FEE2E2', color:C.rose }}>
                        <LogOut size={15}/>
                      </div>
                      <span className="font-bold text-sm" style={{ color:C.rose }}>Sign Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm border-2 transition-all"
                      style={{ borderColor:C.navy, color:C.navy }}>
                      <LogIn size={15}/> Sign In
                    </Link>
                    <Link to="/register" onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-white transition-all hover:shadow-lg"
                      style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                      Get Started <ArrowRight size={15}/>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer so content isn't hidden behind fixed nav */}
      <div style={{ height:'64px' }}/>

      <style>{`
        @keyframes _navFade {
          from { opacity:0; transform:translateY(-8px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>
    </>
  )
}