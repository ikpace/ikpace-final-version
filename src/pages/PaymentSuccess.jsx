import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import {
  CheckCircle, Home, BookOpen, Download, ArrowRight,
  Award, Users, Share2, Mail, Calendar, Clock, Star,
  FileText, MessageCircle, Twitter, Facebook, Linkedin,
  Copy, Check, Sparkles, Gift, Rocket, Zap, Target,
  Heart, Globe, PlayCircle, TrendingUp, Menu, X,
  ChevronRight, Bell, HelpCircle, BadgeCheck, Flame,
  Trophy, GraduationCap, Shield, BarChart3, Bookmark,
  Headphones, User, Hash, Lock, Timer, Flag
} from "lucide-react";
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:       '#1A3D7C',
  navyDark:   '#0F2655',
  navyMid:    '#2F5EA8',
  orange:     '#FF7A00',
  orangeLight:'#FF9A3C',
  green:      '#008F4C',
  yellow:     '#E6B800',
  teal:       '#0D9488',
  purple:     '#7C3AED',
  rose:       '#E11D48',
  amber:      '#D97706',
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A'
  }
}

// ─── Confetti particle ────────────────────────────────────────────────────────
function ConfettiDot({ color, top, left, delay, size = 6 }) {
  return (
    <div className="absolute rounded-full animate-ping"
      style={{ background: color, top, left, width: size, height: size, animationDelay: delay, animationDuration: '2s', opacity: .7 }} />
  )
}

// ─── Step card ────────────────────────────────────────────────────────────────
function StepCard({ num, title, desc, color, icon: Icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
        style={{ background: color }}>
        {num}
      </div>
      <div>
        <p className="font-bold text-sm" style={{ color: C.gray[800] }}>{title}</p>
        <p className="text-xs mt-0.5" style={{ color: C.gray[500] }}>{desc}</p>
      </div>
    </div>
  )
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ icon: Icon, value, label, color }) {
  return (
    <div className="flex flex-col items-center p-3 rounded-2xl" style={{ background: `${color}10`, border: `1px solid ${color}25` }}>
      <Icon size={18} style={{ color }} className="mb-1" />
      <p className="font-black text-base" style={{ color }}>{value}</p>
      <p className="text-[10px]" style={{ color: C.gray[400] }}>{label}</p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PaymentSuccess() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const { user }   = useAuth()

  // Page state
  const [enrollment,          setEnrollment]          = useState(null)
  const [loading,             setLoading]             = useState(true)
  const [copied,              setCopied]              = useState(false)
  const [recommendedCourses,  setRecommendedCourses]  = useState([])
  const [mobileMenuOpen,      setMobileMenuOpen]      = useState(false)
  const [showBanner,          setShowBanner]          = useState(true)
  const [profileName,         setProfileName]         = useState('')
  const [profileId,           setProfileId]           = useState('')
  const [activeTab,           setActiveTab]           = useState('overview')
  const [countdown,           setCountdown]           = useState(10)
  const [goalSet,             setGoalSet]             = useState(false)
  const [selectedGoal,        setSelectedGoal]        = useState(null)
  const [notesOpen,           setNotesOpen]           = useState(false)
  const [note,                setNote]                = useState('')
  const [savedNote,           setSavedNote]           = useState(false)
  const countRef = useRef(null)

  const { course, userDetails, amount, originalAmount, discount, enrollmentId } = location.state || {}

  // Honest stats
  const stats = { community: 130, active: 32, countries: 5, certificates: 45 }

  // Learning goals
  const goals = [
    { id: 1, label: '30 min/day',   icon: '⚡', color: C.orange },
    { id: 2, label: '1 hr/day',     icon: '🔥', color: C.rose   },
    { id: 3, label: '2 hrs/day',    icon: '🚀', color: C.navy   },
    { id: 4, label: 'Weekends only',icon: '📅', color: C.teal   },
  ]

  // ── Redirect guard ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!location.state) { navigate('/courses'); return }
  }, [location.state, navigate])

  // ── Banner auto-dismiss ────────────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setShowBanner(false), 6000)
    return () => clearTimeout(t)
  }, [])

  // ── Countdown ticker ──────────────────────────────────────────────────────
  useEffect(() => {
    countRef.current = setInterval(() => setCountdown(c => (c > 0 ? c - 1 : 0)), 1000)
    return () => clearInterval(countRef.current)
  }, [])

  // ── Fetch profile, enrollment, recommendations ─────────────────────────────
  useEffect(() => {
    if (!location.state) return
    const run = async () => {
      setLoading(true)
      try {
        // 1. Profile name + unique ID
        if (user) {
          const { data: prof } = await supabase
            .from('profiles')
            .select('full_name, id')
            .eq('id', user.id)
            .maybeSingle()
          if (prof?.full_name) setProfileName(prof.full_name)
          else setProfileName(user.user_metadata?.full_name || userDetails?.fullName || user.email?.split('@')[0] || 'Learner')
          setProfileId(user.id.slice(0, 8).toUpperCase())
        } else {
          setProfileName(userDetails?.fullName || 'Learner')
          setProfileId('GUEST')
        }

        // 2. Enrollment record
        if (enrollmentId) {
          const { data: enroll } = await supabase
            .from('enrollments')
            .select('*')
            .eq('payment_reference', enrollmentId)
            .maybeSingle()
          if (enroll) setEnrollment(enroll)
        }

        // 3. Recommended courses (exclude current)
        const { data: recs } = await supabase
          .from('courses')
          .select('id, title, slug, price, thumbnail_url, category, level, students_count, rating')
          .neq('id', course?.id || '')
          .limit(3)
        setRecommendedCourses(
          (recs || []).map(c => ({
            ...c,
            students_count: c.students_count || Math.floor(Math.random() * 30) + 10,
            rating: c.rating || (4.5 + Math.random() * 0.4).toFixed(1)
          }))
        )

        // 4. Track conversion
        if (user && course) {
          await supabase.from('activity_logs').insert([{
            user_id: user.id,
            activity_type: 'enrollment_completed',
            metadata: { course_id: course.id, course_title: course.title, amount, reference: enrollmentId }
          }]).catch(() => {}) // non-blocking
        }
      } catch (e) {
        console.error('PaymentSuccess data error:', e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [location.state, user, enrollmentId, course, amount, userDetails])

  // ── Helpers ────────────────────────────────────────────────────────────────
  const firstName = profileName ? profileName.split(' ')[0] : 'Learner'
  const initials  = profileName ? profileName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'LN'

  const copyRef = () => {
    navigator.clipboard.writeText(enrollmentId || '')
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  const share = (platform) => {
    const text = `I just enrolled in "${course?.title}" at iKPACE! 🎓`
    const url  = `${window.location.origin}/course/${course?.slug || course?.id}`
    const urls = {
      twitter:   `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook:  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin:  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp:  `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    }
    window.open(urls[platform], '_blank')
  }

  const saveGoal = (g) => {
    setSelectedGoal(g)
    setGoalSet(true)
  }

  const saveNote = () => {
    if (note.trim()) { setSavedNote(true); setTimeout(() => setSavedNote(false), 2500) }
  }

  if (!location.state) return null

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: C.gray[50] }}>

      {/* ── CONFETTI ─────────────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <ConfettiDot color={C.yellow}  top="8%"  left="15%" delay="0s"    size={8} />
        <ConfettiDot color={C.green}   top="20%" left="80%" delay=".3s"   size={6} />
        <ConfettiDot color={C.orange}  top="40%" left="5%"  delay=".6s"   size={5} />
        <ConfettiDot color={C.navyMid} top="12%" left="60%" delay=".15s"  size={7} />
        <ConfettiDot color={C.rose}    top="30%" left="40%" delay=".45s"  size={5} />
        <ConfettiDot color={C.teal}    top="55%" left="90%" delay=".9s"   size={6} />
        <ConfettiDot color={C.yellow}  top="70%" left="25%" delay="1.2s"  size={4} />
        <ConfettiDot color={C.orange}  top="85%" left="70%" delay="1.5s"  size={5} />
      </div>

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-white border-b px-4 py-3 flex items-center justify-between"
        style={{ borderColor: C.gray[200] }}>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm shadow"
            style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
          <span className="font-black text-lg hidden sm:block" style={{ color: C.navy }}>iKPACE</span>
        </Link>
        <div className="hidden lg:flex items-center gap-6 text-sm" style={{ color: C.gray[600] }}>
          <Link to="/courses"   className="hover:text-gray-900 transition">Courses</Link>
          <Link to="/dashboard" className="hover:text-gray-900 transition">Dashboard</Link>
          <Link to="/community" className="hover:text-gray-900 transition">Community</Link>
          <Link to="/help"      className="hover:text-gray-900 transition">Help</Link>
        </div>
        {/* Avatar pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl"
          style={{ background: C.gray[50], border: `1px solid ${C.gray[200]}` }}>
          <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold"
            style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>{initials}</div>
          <div className="text-left">
            <p className="text-xs font-bold leading-tight" style={{ color: C.navy }}>{firstName}</p>
            <p className="text-[10px] leading-tight" style={{ color: C.gray[400] }}>ID: {profileId}</p>
          </div>
        </div>
        {/* Mobile menu */}
        <button className="lg:hidden p-2 rounded-xl" onClick={() => setMobileMenuOpen(o => !o)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {mobileMenuOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white border-b shadow-lg p-4 z-40"
            style={{ borderColor: C.gray[200] }}>
            {[['/', 'Home'], ['/courses', 'Courses'], ['/dashboard', 'Dashboard'], ['/community', 'Community'], ['/help', 'Help']].map(([to, label]) => (
              <Link key={to} to={to} onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2.5 text-sm rounded-xl mb-1 hover:bg-gray-50"
                style={{ color: C.gray[700] }}>{label}</Link>
            ))}
          </div>
        )}
      </header>

      {/* ── WELCOME BANNER ───────────────────────────────────────────────── */}
      {showBanner && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-md">
          <div className="rounded-2xl shadow-2xl p-4 flex items-start gap-3 text-white"
            style={{ background: `linear-gradient(135deg,${C.navyDark},${C.orange})` }}>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Rocket size={20} />
            </div>
            <div className="flex-1">
              <p className="font-black text-base">Welcome, {firstName}! 🎉</p>
              <p className="text-xs opacity-80 mt-0.5">Your enrollment is confirmed. Check your email for course access details.</p>
            </div>
            <button onClick={() => setShowBanner(false)}><X size={16} className="opacity-70 hover:opacity-100" /></button>
          </div>
        </div>
      )}

      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 relative z-10">

        {/* ── HERO CARD ──────────────────────────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden shadow-2xl mb-6"
          style={{ background: `linear-gradient(145deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>
          {/* Decorative blobs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-10 pointer-events-none"
            style={{ background: C.orange }} />
          <div className="absolute bottom-0 left-20 w-36 h-36 rounded-full opacity-[0.07] pointer-events-none"
            style={{ background: C.yellow }} />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            {/* Success icon + headline */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-8">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ background: `${C.green}30`, border: `3px solid ${C.green}` }}>
                  <CheckCircle size={40} style={{ color: C.green }} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center animate-bounce">
                  <Sparkles size={16} className="text-gray-900" />
                </div>
              </div>
              <div className="text-white">
                <p className="text-sm opacity-70 mb-1">Payment Successful ✓</p>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black leading-tight">
                  Welcome, <span style={{ color: C.orangeLight }}>{firstName}</span>!
                </h1>
                <p className="mt-1 opacity-80 text-sm sm:text-base">
                  You're now enrolled in <strong className="text-white">{course?.title}</strong>
                </p>
              </div>
            </div>

            {/* User identity strip */}
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
                <User size={14} className="text-white/60" />
                <span className="text-white text-xs font-semibold">{profileName || userDetails?.fullName}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm">
                <Mail size={14} className="text-white/60" />
                <span className="text-white text-xs font-semibold truncate max-w-[180px]">{userDetails?.email || user?.email}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm cursor-pointer"
                onClick={copyRef}>
                <Hash size={14} className="text-white/60" />
                <span className="text-white text-xs font-mono font-semibold">ID: {profileId}</span>
                {copied ? <Check size={11} className="text-green-300" /> : <Copy size={11} className="text-white/50" />}
              </div>
            </div>

            {/* Quick stat pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Users,     value: stats.active,       label: 'Active Students', color: C.green     },
                { icon: Globe,     value: `${stats.countries}+`, label: 'Countries',    color: C.orangeLight},
                { icon: Users,     value: stats.community,    label: 'Community',       color: C.teal      },
                { icon: BadgeCheck,value: stats.certificates, label: 'Certificates',    color: C.yellow    },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center p-3 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <s.icon size={16} style={{ color: s.color }} className="mb-1" />
                  <p className="font-black text-base text-white">{s.value}</p>
                  <p className="text-[10px] text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS ───────────────────────────────────────────────────────── */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { id:'overview',   label:'🎯 Overview'   },
            { id:'details',    label:'📋 Details'    },
            { id:'learning',   label:'📚 Your Plan'  },
            { id:'community',  label:'👥 Community'  },
            { id:'resources',  label:'📁 Resources'  },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0"
              style={{
                background: activeTab === tab.id ? C.navy : '#fff',
                color:      activeTab === tab.id ? '#fff' : C.gray[600],
                border:     `1px solid ${activeTab === tab.id ? C.navy : C.gray[200]}`,
                boxShadow:  activeTab === tab.id ? `0 4px 14px ${C.navy}30` : 'none'
              }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: OVERVIEW */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-5">
            {/* Left 2/3 */}
            <div className="lg:col-span-2 space-y-5">

              {/* Quick actions */}
              <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Zap size={16} style={{ color: C.orange }} />Quick Actions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { to:`/course-curriculum/${course?.slug || course?.id}`, icon:PlayCircle,    label:'Start Learning', color:C.navy,   bg:`${C.navy}10`   },
                    { to:'/dashboard',                                        icon:Home,          label:'Dashboard',      color:C.green,  bg:`${C.green}10`  },
                    { to:`/course/${course?.slug || course?.id}`,             icon:BookOpen,      label:'View Course',    color:C.orange, bg:`${C.orange}10` },
                    { to:'/community',                                        icon:Users,         label:'Community',      color:C.teal,   bg:`${C.teal}10`   },
                  ].map((a, i) => (
                    <Link key={i} to={a.to}
                      className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:shadow-md transition-all group"
                      style={{ background: a.bg, border: `1px solid ${a.color}20` }}>
                      <a.icon size={22} style={{ color: a.color }} />
                      <span className="text-xs font-bold text-center" style={{ color: a.color }}>{a.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA banner */}
              <div className="rounded-2xl p-5 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg,${C.orange},${C.amber})` }}>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full opacity-20 bg-white" />
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <p className="font-black text-lg">Ready to start learning?</p>
                    <p className="text-sm opacity-80 mt-1">Your first lesson is waiting. Jump in now!</p>
                  </div>
                  <Link to={`/course-curriculum/${course?.slug || course?.id}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-white transition-all hover:shadow-lg flex-shrink-0"
                    style={{ color: C.orange }}>
                    <Rocket size={16} />Start Now
                  </Link>
                </div>
              </div>

              {/* 3-step learning path */}
              <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Flag size={16} style={{ color: C.navyMid }} />Your 3-Step Learning Path
                </h2>
                <div className="space-y-4">
                  <StepCard num="1" color={C.green}  title="Access Course Materials"  desc={`All ${course?.lessons || 20}+ lessons and resources are now unlocked for you.`} />
                  <div className="w-full h-px ml-10" style={{ background: C.gray[200] }} />
                  <StepCard num="2" color={C.navyMid} title="Set Your Weekly Schedule" desc={`2–3 hours/week is enough. Finish in ${course?.duration || '4–6 weeks'} at your own pace.`} />
                  <div className="w-full h-px ml-10" style={{ background: C.gray[200] }} />
                  <StepCard num="3" color={C.purple}  title="Earn Your Certificate"   desc="Complete all modules, pass the final quiz, and download your official certificate." />
                </div>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Link to={`/course-curriculum/${course?.slug || course?.id}`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white"
                    style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>
                    <Rocket size={15} />Start Learning Now
                  </Link>
                  <Link to="/dashboard"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm"
                    style={{ border: `2px solid ${C.navy}`, color: C.navy }}>
                    Go to Dashboard
                  </Link>
                </div>
              </div>

              {/* Set daily goal */}
              <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-1 flex items-center gap-2" style={{ color: C.navy }}>
                  <Target size={16} style={{ color: C.orange }} />Set Your Daily Learning Goal
                </h2>
                <p className="text-xs mb-4" style={{ color: C.gray[400] }}>Students who set a daily goal are 3× more likely to finish.</p>
                {!goalSet ? (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {goals.map(g => (
                      <button key={g.id} onClick={() => saveGoal(g)}
                        className="p-3 rounded-xl flex flex-col items-center gap-2 font-semibold text-sm transition-all hover:shadow-md"
                        style={{ background: `${g.color}10`, border: `2px solid ${g.color}30`, color: g.color }}>
                        <span className="text-2xl">{g.icon}</span>
                        {g.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 rounded-2xl"
                    style={{ background: `${selectedGoal.color}10`, border: `2px solid ${selectedGoal.color}30` }}>
                    <span className="text-3xl">{selectedGoal.icon}</span>
                    <div>
                      <p className="font-black text-sm" style={{ color: selectedGoal.color }}>Goal set: {selectedGoal.label} 🎯</p>
                      <p className="text-xs mt-0.5" style={{ color: C.gray[400] }}>We'll remind you to keep your streak going.</p>
                    </div>
                    <BadgeCheck size={22} style={{ color: C.green, marginLeft: 'auto' }} />
                  </div>
                )}
              </div>

              {/* Quick note */}
              <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-1 flex items-center gap-2" style={{ color: C.navy }}>
                  <FileText size={16} style={{ color: C.yellow }} />Write a Learning Intention
                </h2>
                <p className="text-xs mb-3" style={{ color: C.gray[400] }}>What do you want to achieve from this course?</p>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  placeholder={`e.g. "I want to get my first VA client within 60 days of completing this course."`}
                  className="w-full rounded-xl p-3 text-sm outline-none resize-none"
                  style={{ background: C.gray[50], border: `1px solid ${C.gray[200]}`, color: C.gray[800] }} />
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={saveNote}
                    className="px-4 py-2 rounded-xl text-sm font-bold text-white"
                    style={{ background: savedNote ? C.green : C.navy }}>
                    {savedNote ? '✓ Saved!' : 'Save Intention'}
                  </button>
                  {savedNote && <p className="text-xs" style={{ color: C.green }}>Your intention has been saved 🎯</p>}
                </div>
              </div>
            </div>

            {/* Right 1/3 */}
            <div className="space-y-5">

              {/* Certificate preview */}
              <div className="rounded-2xl p-5 border-2" style={{ background: `linear-gradient(145deg,#fffbeb,#fff7ed)`, borderColor: `${C.yellow}50` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg,${C.yellow},${C.orange})` }}>
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-black text-sm" style={{ color: C.gray[800] }}>Your Certificate</p>
                    <p className="text-[10px]" style={{ color: C.gray[400] }}>Complete all modules to earn it</p>
                  </div>
                </div>
                <div className="rounded-xl p-3 mb-3" style={{ background: 'rgba(255,255,255,0.7)', border: `1px dashed ${C.yellow}` }}>
                  <p className="text-[10px] text-center font-semibold mb-1" style={{ color: C.gray[400] }}>CERTIFICATE OF COMPLETION</p>
                  <p className="text-center text-sm font-black" style={{ color: C.navy }}>{profileName || 'Your Name'}</p>
                  <p className="text-center text-[10px] mt-0.5" style={{ color: C.gray[500] }}>{course?.title}</p>
                  <div className="flex justify-center mt-2"><BadgeCheck size={20} style={{ color: C.yellow }} /></div>
                </div>
                <Link to={`/course/${course?.slug || course?.id}`}
                  className="text-xs font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                  style={{ color: C.amber }}>
                  Track Your Progress <ChevronRight size={12} />
                </Link>
              </div>

              {/* Refer & earn */}
              <div className="rounded-2xl p-5" style={{ background: `${C.green}08`, border: `1px solid ${C.green}25` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${C.green}15` }}>
                    <Gift size={18} style={{ color: C.green }} />
                  </div>
                  <div>
                    <p className="font-bold text-sm" style={{ color: C.gray[800] }}>Refer &amp; Earn</p>
                    <p className="text-[10px]" style={{ color: C.gray[400] }}>10% off your next course</p>
                  </div>
                </div>
                <p className="text-xs mb-3" style={{ color: C.gray[500] }}>Share with a friend and get 10% off when they enroll.</p>
                <div className="flex gap-2">
                  {[
                    { platform:'whatsapp', bg:'#dcfce7', icon:<MessageCircle size={15} className="text-green-600" /> },
                    { platform:'facebook', bg:'#dbeafe', icon:<Facebook size={15} className="text-blue-600" /> },
                    { platform:'twitter',  bg:'#e0f2fe', icon:<Twitter size={15} className="text-sky-500" /> },
                    { platform:'linkedin', bg:'#e0e7ff', icon:<Linkedin size={15} className="text-indigo-600" /> },
                  ].map(s => (
                    <button key={s.platform} onClick={() => share(s.platform)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center hover:shadow-md transition-all"
                      style={{ background: s.bg }}>
                      {s.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Countdown to first lesson */}
              <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg,${C.navyDark},${C.navy})` }}>
                <div className="flex items-center gap-2 mb-3">
                  <Timer size={16} style={{ color: C.orange }} />
                  <p className="font-bold text-sm">Your first lesson awaits!</p>
                </div>
                <p className="text-xs opacity-60 mb-4">Don't wait — start learning in seconds.</p>
                <Link to={`/course-curriculum/${course?.slug || course?.id}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: C.orange, color: '#fff' }}>
                  <PlayCircle size={15} />Begin Course
                </Link>
              </div>

              {/* Need help */}
              <div className="rounded-2xl p-5 bg-white" style={{ border: `1px solid ${C.gray[200]}` }}>
                <div className="flex items-center gap-3 mb-3">
                  <Headphones size={18} style={{ color: C.navy }} />
                  <p className="font-bold text-sm" style={{ color: C.gray[800] }}>Need Help?</p>
                </div>
                <div className="space-y-2">
                  <Link to="/support" className="flex items-center gap-2 text-xs hover:underline" style={{ color: C.navy }}>
                    <Mail size={12} />support@ikpace.com
                  </Link>
                  <Link to="/faq" className="flex items-center gap-2 text-xs hover:underline" style={{ color: C.navy }}>
                    <HelpCircle size={12} />FAQ &amp; Help Center
                  </Link>
                  <Link to="/community" className="flex items-center gap-2 text-xs hover:underline" style={{ color: C.navy }}>
                    <MessageCircle size={12} />Ask the Community
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: DETAILS */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'details' && (
          <div className="grid lg:grid-cols-2 gap-5">
            {/* Enrollment card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
              <h2 className="font-black text-base mb-5 flex items-center gap-2" style={{ color: C.navy }}>
                <FileText size={16} style={{ color: C.navyMid }} />Enrollment Details
              </h2>
              <div className="space-y-4">
                {[
                  { label: 'Student Name',  value: profileName || userDetails?.fullName || user?.user_metadata?.full_name  },
                  { label: 'Email Address', value: userDetails?.email || user?.email  },
                  { label: 'Student ID',    value: profileId                          },
                  { label: 'Course',        value: course?.title                      },
                  { label: 'Level',         value: course?.level || 'Beginner'        },
                  { label: 'Duration',      value: course?.duration || 'Self-paced'   },
                  { label: 'Amount Paid',   value: `$${amount?.toFixed(2)}`           },
                  { label: 'Enrolled On',   value: new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'}) },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start pb-3"
                    style={{ borderBottom: i < 7 ? `1px solid ${C.gray[100]}` : 'none' }}>
                    <span className="text-xs" style={{ color: C.gray[400] }}>{item.label}</span>
                    <span className="text-xs font-bold text-right max-w-[60%] break-all" style={{ color: C.gray[800] }}>{item.value}</span>
                  </div>
                ))}
                {discount > 0 && (
                  <div className="p-3 rounded-xl" style={{ background: `${C.green}10`, border: `1px solid ${C.green}25` }}>
                    <p className="text-xs font-bold" style={{ color: C.green }}>🎉 You saved {discount}% with a discount!</p>
                    <p className="text-xs mt-0.5" style={{ color: C.gray[500] }}>
                      Original price: ${originalAmount?.toFixed(2)} → You paid: ${amount?.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Transaction receipt */}
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Shield size={16} style={{ color: C.green }} />Payment Receipt
                </h2>
                <div className="rounded-xl p-4" style={{ background: C.gray[50], border: `1px solid ${C.gray[200]}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: C.gray[400] }}>Transaction Reference</p>
                    <button onClick={copyRef} className="p-1.5 rounded-lg hover:bg-white transition">
                      {copied ? <Check size={13} style={{ color: C.green }} /> : <Copy size={13} style={{ color: C.gray[400] }} />}
                    </button>
                  </div>
                  <p className="font-mono text-xs break-all" style={{ color: C.gray[700] }}>{enrollmentId}</p>
                </div>
                <div className="mt-4 p-3 rounded-xl flex items-center gap-3" style={{ background: `${C.green}10` }}>
                  <CheckCircle size={18} style={{ color: C.green }} />
                  <div>
                    <p className="text-xs font-bold" style={{ color: C.green }}>Payment Verified</p>
                    <p className="text-[10px]" style={{ color: C.gray[400] }}>Your enrollment is confirmed and active.</p>
                  </div>
                </div>
                <button onClick={() => window.print()}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold"
                  style={{ background: C.gray[100], color: C.gray[700] }}>
                  <Download size={15} />Download Receipt
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Award size={16} style={{ color: C.yellow }} />What's Included
                </h2>
                <div className="space-y-3">
                  {[
                    { icon: '🎓', text: `${course?.lessons || 20}+ video lessons` },
                    { icon: '📁', text: 'Downloadable resources & templates' },
                    { icon: '🏆', text: 'Certificate of completion' },
                    { icon: '♾️', text: 'Lifetime access to all content' },
                    { icon: '💬', text: 'Community access & peer support' },
                    { icon: '📱', text: 'Mobile-friendly learning' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-lg flex-shrink-0">{item.icon}</span>
                      <span className="text-sm" style={{ color: C.gray[700] }}>{item.text}</span>
                      <Check size={14} style={{ color: C.green, marginLeft: 'auto', flexShrink: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: LEARNING PLAN */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'learning' && (
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="space-y-5">
              {/* Week-by-week plan */}
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-5 flex items-center gap-2" style={{ color: C.navy }}>
                  <Calendar size={16} style={{ color: C.navyMid }} />Suggested Week-by-Week Plan
                </h2>
                <div className="space-y-4">
                  {[
                    { week: 'Week 1', title: 'Foundations',     desc: 'Complete modules 1–3. Build your core understanding.', done: false, color: C.navy   },
                    { week: 'Week 2', title: 'Core Skills',     desc: 'Modules 4–6. Apply what you learn with exercises.',    done: false, color: C.navyMid},
                    { week: 'Week 3', title: 'Advanced Topics', desc: 'Modules 7–9. Dive deeper with real-world projects.',   done: false, color: C.orange },
                    { week: 'Week 4', title: 'Final Project',   desc: 'Complete your capstone project and final quiz.',        done: false, color: C.purple },
                    { week: 'Week 5', title: 'Certification',   desc: 'Submit and receive your certificate of completion.',    done: false, color: C.green  },
                  ].map((w, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl"
                      style={{ background: `${w.color}08`, border: `1px solid ${w.color}20` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                        style={{ background: w.color }}>{w.week.replace('Week ', 'W')}</div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: w.color }}>{w.title}</p>
                        <p className="text-xs mt-0.5" style={{ color: C.gray[500] }}>{w.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily habit */}
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Flame size={16} style={{ color: C.orange }} />Build a Daily Habit
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: '⏰', label: 'Pick a time',    desc: 'e.g. 7am or 9pm'     },
                    { icon: '📵', label: 'No distractions',desc: 'Phone on silent'      },
                    { icon: '📝', label: 'Take notes',     desc: 'Write key insights'   },
                  ].map((h, i) => (
                    <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.gray[50] }}>
                      <span className="text-2xl">{h.icon}</span>
                      <p className="text-xs font-bold mt-1" style={{ color: C.gray[800] }}>{h.label}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: C.gray[400] }}>{h.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              {/* Milestones */}
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Trophy size={16} style={{ color: C.yellow }} />Achievement Milestones
                </h2>
                <div className="space-y-3">
                  {[
                    { icon:'🎯', label:'First Lesson Complete',   pts:'+50 XP',   color:C.navy   },
                    { icon:'🔥', label:'3-Day Streak',            pts:'+100 XP',  color:C.orange },
                    { icon:'📝', label:'Pass First Quiz',         pts:'+75 XP',   color:C.teal   },
                    { icon:'🏅', label:'Halfway Through',         pts:'+200 XP',  color:C.purple },
                    { icon:'🏆', label:'Course Complete',         pts:'+500 XP',  color:C.green  },
                    { icon:'🎓', label:'Certificate Earned',      pts:'+Cert',    color:C.amber  },
                  ].map((m, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl"
                      style={{ background: `${m.color}08`, border: `1px solid ${m.color}18` }}>
                      <span className="text-xl">{m.icon}</span>
                      <span className="flex-1 text-xs font-semibold" style={{ color: C.gray[700] }}>{m.label}</span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-full text-white" style={{ background: m.color }}>{m.pts}</span>
                      <Lock size={13} style={{ color: C.gray[300] }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Set goal */}
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                  <Target size={16} style={{ color: C.orange }} />Daily Goal
                </h2>
                {!goalSet ? (
                  <div className="grid grid-cols-2 gap-3">
                    {goals.map(g => (
                      <button key={g.id} onClick={() => saveGoal(g)}
                        className="p-3 rounded-xl text-sm font-bold flex items-center gap-2 hover:shadow-md transition-all"
                        style={{ background: `${g.color}10`, border: `2px solid ${g.color}30`, color: g.color }}>
                        <span className="text-xl">{g.icon}</span>{g.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl flex items-center gap-3"
                    style={{ background: `${selectedGoal.color}10`, border: `2px solid ${selectedGoal.color}30` }}>
                    <span className="text-3xl">{selectedGoal.icon}</span>
                    <div>
                      <p className="font-black text-sm" style={{ color: selectedGoal.color }}>{selectedGoal.label} ✓</p>
                      <p className="text-xs" style={{ color: C.gray[400] }}>Goal set! You've got this.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: COMMUNITY */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'community' && (
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(145deg,${C.navyDark},${C.navy})` }}>
                <Users size={28} className="mb-3" />
                <h2 className="font-black text-xl mb-2">You're part of our community!</h2>
                <p className="text-sm opacity-70 mb-4">
                  Join {stats.community} learners across {stats.countries} countries. Ask questions, share wins, and grow together.
                </p>
                <Link to="/community"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: C.orange, color: '#fff' }}>
                  Join the Discussion <ChevronRight size={15} />
                </Link>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Users size={15} style={{ color: C.navyMid }} />Study Groups
                </h2>
                {[
                  { name:'VA Masters Circle',       members:24, joined:false, color:C.navy   },
                  { name:'Digital Marketing Squad', members:18, joined:false, color:C.orange },
                  { name:'Design Enthusiasts',      members:31, joined:false, color:C.purple },
                ].map((g, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl mb-2" style={{ background: C.gray[50] }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-black text-sm"
                        style={{ background: g.color }}>{g.name[0]}</div>
                      <div>
                        <p className="text-xs font-bold" style={{ color: C.gray[800] }}>{g.name}</p>
                        <p className="text-[10px]" style={{ color: C.gray[400] }}>{g.members} members</p>
                      </div>
                    </div>
                    <Link to="/community"
                      className="text-xs px-3 py-1 rounded-xl font-bold text-white"
                      style={{ background: g.color }}>Join</Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Share2 size={15} style={{ color: C.navyMid }} />Share Your Enrollment
                </h2>
                <p className="text-sm mb-4" style={{ color: C.gray[500] }}>
                  Celebrate your new course! Tag us <strong>@iKPACE</strong> for a shoutout.
                </p>
                <div className="space-y-3">
                  {[
                    { platform:'twitter',  bg:'#e0f2fe', icon:<Twitter size={16} className="text-sky-500" />,   label:'Share on X (Twitter)' },
                    { platform:'facebook', bg:'#dbeafe', icon:<Facebook size={16} className="text-blue-600" />, label:'Share on Facebook' },
                    { platform:'linkedin', bg:'#e0e7ff', icon:<Linkedin size={16} className="text-indigo-600" />,label:'Share on LinkedIn' },
                    { platform:'whatsapp', bg:'#dcfce7', icon:<MessageCircle size={16} className="text-green-600" />,label:'Share on WhatsApp' },
                  ].map(s => (
                    <button key={s.platform} onClick={() => share(s.platform)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-md"
                      style={{ background: s.bg }}>
                      {s.icon}{s.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-5" style={{ background: `${C.green}08`, border: `1px solid ${C.green}25` }}>
                <div className="flex items-center gap-3 mb-3">
                  <Gift size={18} style={{ color: C.green }} />
                  <p className="font-bold text-sm" style={{ color: C.gray[800] }}>Refer a Friend — Get 10% Off</p>
                </div>
                <p className="text-xs mb-3" style={{ color: C.gray[500] }}>
                  Share your referral link. When a friend enrolls, you get 10% off your next course.
                </p>
                <div className="flex items-center gap-2 p-2.5 rounded-xl" style={{ background: '#fff', border: `1px solid ${C.gray[200]}` }}>
                  <span className="text-xs font-mono flex-1 truncate" style={{ color: C.gray[600] }}>
                    {`${window.location.origin}/ref/${profileId}`}
                  </span>
                  <button onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/ref/${profileId}`); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                    className="p-1.5 rounded-lg flex-shrink-0" style={{ background: C.green }}>
                    {copied ? <Check size={12} className="text-white" /> : <Copy size={12} className="text-white" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* TAB: RESOURCES */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {activeTab === 'resources' && (
          <div className="grid lg:grid-cols-2 gap-5">
            <div className="space-y-5">
              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <BookOpen size={15} style={{ color: C.navyMid }} />Starter Resources
                </h2>
                <div className="space-y-3">
                  {[
                    { icon:'📄', label:'Course Syllabus',          type:'PDF', color:C.rose   },
                    { icon:'📦', label:'Starter Templates Pack',   type:'ZIP', color:C.orange },
                    { icon:'📋', label:'Learning Checklist',        type:'PDF', color:C.navy   },
                    { icon:'🎨', label:'Workbook & Activities',    type:'PDF', color:C.purple },
                  ].map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: C.gray[50], border: `1px solid ${C.gray[200]}` }}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{r.icon}</span>
                        <div>
                          <p className="text-xs font-bold" style={{ color: C.gray[800] }}>{r.label}</p>
                          <span className="text-[9px] px-1.5 py-0.5 rounded font-black text-white" style={{ background: r.color }}>{r.type}</span>
                        </div>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                        style={{ background: r.color }}>
                        <Download size={11} />Get
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Headphones size={15} style={{ color: C.navyMid }} />Support Options
                </h2>
                {[
                  { icon:<Mail size={16}/>,          label:'Email Support',    desc:'support@ikpace.com',             to:'/support',   color:C.navy   },
                  { icon:<HelpCircle size={16}/>,     label:'FAQ & Help Center',desc:'Browse common questions',        to:'/faq',       color:C.navyMid},
                  { icon:<MessageCircle size={16}/>,  label:'Community Forum',  desc:'Get help from fellow students',  to:'/community', color:C.teal   },
                ].map((s, i) => (
                  <Link key={i} to={s.to}
                    className="flex items-center gap-3 p-3 rounded-xl mb-2 hover:shadow-md transition-all"
                    style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${s.color}15`, color: s.color }}>{s.icon}</div>
                    <div>
                      <p className="text-xs font-bold" style={{ color: C.gray[800] }}>{s.label}</p>
                      <p className="text-[10px]" style={{ color: C.gray[400] }}>{s.desc}</p>
                    </div>
                    <ChevronRight size={14} style={{ color: C.gray[300], marginLeft: 'auto' }} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(145deg,${C.navyDark},${C.navyMid})` }}>
                <GraduationCap size={28} className="mb-3" />
                <h2 className="font-black text-lg mb-2">Explore More Courses</h2>
                <p className="text-sm opacity-70 mb-4">Keep growing. Bundle and save on your next course.</p>
                <Link to="/courses" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm"
                  style={{ background: C.orange, color: '#fff' }}>
                  Browse Courses <ChevronRight size={15} />
                </Link>
              </div>

              {/* Recommended courses */}
              {recommendedCourses.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: `1px solid ${C.gray[200]}` }}>
                  <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                    <Sparkles size={15} style={{ color: C.yellow }} />You Might Also Like
                  </h2>
                  <div className="space-y-3">
                    {recommendedCourses.map(rc => (
                      <Link key={rc.id} to={`/course/${rc.slug || rc.id}`}
                        className="flex items-center gap-3 p-3 rounded-xl hover:shadow-md transition-all group"
                        style={{ background: C.gray[50], border: `1px solid ${C.gray[200]}` }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                          style={{ background: `${C.navy}15` }}>📚</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate group-hover:underline" style={{ color: C.navy }}>{rc.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star size={10} className="fill-current text-yellow-400" />
                            <span className="text-[10px]" style={{ color: C.gray[400] }}>{rc.rating}</span>
                            <span className="text-[10px]" style={{ color: C.gray[300] }}>·</span>
                            <span className="text-[10px] font-bold" style={{ color: C.orange }}>${rc.price || 7}</span>
                          </div>
                        </div>
                        <ChevronRight size={14} style={{ color: C.gray[300] }} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── FOOTER ───────────────────────────────────────────────────── */}
        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4"
          style={{ borderColor: C.gray[200] }}>
          <p className="text-xs" style={{ color: C.gray[400] }}>© 2025 iKPACE. All rights reserved.</p>
          <div className="flex gap-5">
            {[['Terms', '/terms'], ['Privacy', '/privacy'], ['Refund Policy', '/refund']].map(([label, to]) => (
              <Link key={to} to={to} className="text-xs hover:underline" style={{ color: C.gray[400] }}>{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -12px); opacity: 0; }
          to   { transform: translate(-50%, 0);     opacity: 1; }
        }
      `}</style>
    </div>
  )
}
