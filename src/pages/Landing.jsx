// src/pages/Landing.jsx
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight, BookOpen, Users, Award, Star, CheckCircle,
  Clock, Sparkles, Target, Globe, Shield, Zap, Gift,
  Rocket, Heart, ChevronRight, Play, Download, Coffee,
  MessageCircle, BadgeCheck, Calendar, Flame, Layers,
  Briefcase, GraduationCap, Brain, TrendingUp, BarChart3,
  ChevronLeft, Medal, Crown, CheckSquare, Lightbulb,
  Mail, Phone, MapPin, Headphones, HelpCircle, Quote,
  Lock, Wifi, Monitor, Smartphone, MousePointer, Bell,
  Send, Facebook, Twitter, Linkedin, Instagram, Youtube,
  X, Plus, Minus, ChevronDown, ChevronUp, RefreshCw,
  PlayCircle, PauseCircle, Volume2, VolumeX, Eye
} from "lucide-react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:       '#1A3D7C',
  navyDark:   '#0F2655',
  navyMid:    '#2F5EA8',
  orange:     '#FF7A00',
  orangeLight:'#FF9A3C',
  green:      '#008F4C',
  greenLight: '#00B85F',
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

// ─── Course data with curated images ─────────────────────────────────────────
const courses = [
  {
    id:          'virtual-assistant-pro',
    title:       'Virtual Assistant Pro',
    description: 'Master client management, email, calendars & remote work tools. Land your first VA client in 8 weeks.',
    duration:    '8 Weeks',
    hours:       60,
    students:    32,
    rating:      4.9,
    reviews:     18,
    price:       7,
    category:    'Career',
    level:       'Beginner',
    color:       C.navy,
    accent:      C.orange,
    image:       'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80',
    features:    ['Email Management', 'Calendar Mastery', 'Client Acquisition'],
    emoji:       '💼',
    gradient:    `linear-gradient(135deg, ${C.navyDark}, ${C.navyMid})`,
  },
  {
    id:          'social-media-marketing',
    title:       'Social Media Marketing',
    description: 'Build brands, run Meta Ads, master analytics & grow any account organically from scratch.',
    duration:    '8 Weeks',
    hours:       55,
    students:    28,
    rating:      4.8,
    reviews:     15,
    price:       7,
    category:    'Marketing',
    level:       'Beginner',
    color:       C.orange,
    accent:      C.navy,
    image:       'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80',
    features:    ['Meta Ads', 'Content Strategy', 'Analytics'],
    emoji:       '📱',
    gradient:    `linear-gradient(135deg, ${C.orange}, ${C.amber})`,
  },
  {
    id:          'canva-graphic-design',
    title:       'Canva & Graphic Design',
    description: 'Design logos, brand identities, social kits & print materials. Build a portfolio of 10+ real projects.',
    duration:    '8 Weeks',
    hours:       40,
    students:    19,
    rating:      4.7,
    reviews:     12,
    price:       7,
    category:    'Design',
    level:       'Beginner',
    color:       C.green,
    accent:      C.teal,
    image:       'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&auto=format&fit=crop&q=80',
    features:    ['Logo Design', 'Brand Identity', 'Social Kits'],
    emoji:       '🎨',
    gradient:    `linear-gradient(135deg, ${C.green}, ${C.teal})`,
  },
  {
    id:          'smart-kids-coding',
    title:       'Smart Kids Coding',
    description: 'Introduce ages 6–12 to coding with Scratch. Build animations, stories, and their own games.',
    duration:    '4 Weeks',
    hours:       30,
    students:    12,
    rating:      4.9,
    reviews:     8,
    price:       7,
    category:    'Kids',
    level:       'Beginner',
    color:       C.purple,
    accent:      C.yellow,
    image:       'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    features:    ['Scratch Coding', 'Game Design', 'Animation'],
    emoji:       '🚀',
    gradient:    `linear-gradient(135deg, ${C.purple}, #9B59B6)`,
  },
  {
    id:          'freelancing-online-income',
    title:       'Freelancing & Online Income',
    description: 'Set up your Upwork/Fiverr profile, find clients, price your services & build recurring income.',
    duration:    '4 Weeks',
    hours:       35,
    students:    21,
    rating:      4.8,
    reviews:     14,
    price:       7,
    category:    'Business',
    level:       'Beginner',
    color:       C.amber,
    accent:      C.green,
    image:       'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80',
    features:    ['Upwork & Fiverr', 'Client Acquisition', 'Pricing Strategy'],
    emoji:       '💰',
    gradient:    `linear-gradient(135deg, ${C.amber}, ${C.yellow})`,
  },
  {
    id:          'ai-prompt-engineering',
    title:       'AI Prompt Engineering',
    description: 'Master ChatGPT, Midjourney & AI automation. Monetise your AI skills as a prompt engineer.',
    duration:    '8 Weeks',
    hours:       45,
    students:    18,
    rating:      4.9,
    reviews:     11,
    price:       7,
    category:    'Tech',
    level:       'Intermediate',
    color:       '#06B6D4',
    accent:      C.purple,
    image:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
    features:    ['ChatGPT & Claude', 'Midjourney', 'AI Automation'],
    emoji:       '🤖',
    gradient:    `linear-gradient(135deg, #06B6D4, ${C.purple})`,
  },
]

const categories = ['All', 'Career', 'Marketing', 'Design', 'Kids', 'Business', 'Tech']

// ─── Hero slides ──────────────────────────────────────────────────────────────
const heroSlides = [
  {
    badge:    '🔥 Ghana\'s Most Affordable Learning Platform',
    headline: ['Learn Skills That', 'Pay The Bills'],
    sub:      'Professional courses starting at just $7. Real skills, real results, real income.',
    cta:      { label:'Start Learning Today', to:'/register' },
    ctaAlt:   { label:'Browse Courses', to:'/courses' },
    image:    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=80',
    stat1:    { n:'130+',  l:'Students' },
    stat2:    { n:'4.8★',  l:'Rating' },
    stat3:    { n:'6',     l:'Courses' },
  },
  {
    badge:    '💼 Most Popular Course',
    headline: ['Become a Certified', 'Virtual Assistant'],
    sub:      'Work remotely for international clients. Complete the 8-week program and land your first client.',
    cta:      { label:'Join VA Pro', to:'/course/virtual-assistant-pro' },
    ctaAlt:   { label:'See Curriculum', to:'/course-curriculum/virtual-assistant-pro' },
    image:    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&auto=format&fit=crop&q=80',
    stat1:    { n:'32',    l:'Enrolled' },
    stat2:    { n:'8',     l:'Weeks' },
    stat3:    { n:'$7',    l:'Only' },
  },
  {
    badge:    '🤖 New — Most In-Demand Skill 2025',
    headline: ['Master AI Prompt', 'Engineering'],
    sub:      'Learn ChatGPT, Claude, Midjourney & automation tools. Monetise your AI expertise in 8 weeks.',
    cta:      { label:'Enroll in AI Course', to:'/course/ai-prompt-engineering' },
    ctaAlt:   { label:'Learn More', to:'/course-curriculum/ai-prompt-engineering' },
    image:    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&auto=format&fit=crop&q=80',
    stat1:    { n:'18',    l:'Enrolled' },
    stat2:    { n:'8',     l:'Weeks' },
    stat3:    { n:'5.0★',  l:'Rating' },
  },
]

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  { name:'Sarah Johnson',  role:'VA Student',         text:'"The VA course gave me the confidence to start freelancing. I\'m now working with my first client from the UK!"', rating:5, avatar:'SJ', color:C.navy,   course:'Virtual Assistant Pro' },
  { name:'Michael Kwame',  role:'Freelancing Student', text:'"I set up my Upwork profile on week 2 and got my first $50 gig before the course even ended. Highly recommend!"', rating:5, avatar:'MK', color:C.orange, course:'Freelancing & Online Income' },
  { name:'Amina Okafor',   role:'AI Course Student',   text:'"The AI course helped me understand tools I was afraid to touch before. Now I create AI content for clients daily."', rating:5, avatar:'AO', color:C.green,  course:'AI Prompt Engineering' },
  { name:'James Wilson',   role:'Design Student',      text:'"I designed my church\'s entire brand kit after week 4. The Canva course is so practical and easy to follow."', rating:5, avatar:'JW', color:C.teal,   course:'Canva & Graphic Design' },
  { name:'Patience Mensah',role:'Kids Coding Parent',  text:'"My son (8) built his first Scratch game in week 2. He now asks to do coding every evening. Best investment!"', rating:5, avatar:'PM', color:C.purple, course:'Smart Kids Coding' },
  { name:'Ama Asante',     role:'SMM Student',         text:'"I ran my first Facebook ad campaign on week 5 and got 200 new followers for my client. The results were real!"', rating:5, avatar:'AA', color:C.amber,  course:'Social Media Marketing' },
]

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
  { q:'How much do courses cost?',              a:'All iKPACE courses are priced at just $7 per course — making professional education accessible to everyone regardless of location or income.' },
  { q:'Do I need experience to start?',          a:'No prior experience is needed for most courses. Everything is designed for beginners and walks you through from the very foundations.' },
  { q:'Are courses self-paced or scheduled?',   a:'Most courses are self-paced so you can learn on your own schedule, with some optional live sessions included in each program.' },
  { q:'What do I get when I enroll?',           a:'You get lifetime access to all video lessons, downloadable resources, assignments, community access, and a certificate upon completion.' },
  { q:'Is there a certificate?',               a:'Yes! Every iKPACE course comes with a certificate of completion once you finish all modules and assignments.' },
  { q:'Can I learn on my phone?',              a:'Absolutely. iKPACE is fully mobile-responsive. Learn from anywhere — phone, tablet, laptop, or desktop.' },
  { q:'How do I pay?',                          a:'We accept Paystack (card, mobile money, bank transfer) and other local payment methods for students in Ghana and across Africa.' },
  { q:'Do you offer scholarships?',            a:'Yes! We offer a Women in Tech scholarship with 50% tuition support for eligible female applicants. Check our scholarships page for current openings.' },
]

// ─── How it works ─────────────────────────────────────────────────────────────
const howItWorks = [
  { step:1, icon:'🎯', title:'Pick Your Course', desc:'Choose from 6 career-focused courses designed for the African workforce and beyond.' },
  { step:2, icon:'💳', title:'Enroll for $7',   desc:'Secure your spot with our affordable one-time payment via Paystack or mobile money.' },
  { step:3, icon:'📚', title:'Start Learning',  desc:'Access all video lessons, resources, and assignments. Learn at your own pace.' },
  { step:4, icon:'🏆', title:'Get Certified',   desc:'Complete the course, earn your certificate, and launch your new career or service.' },
]

// ─── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { n:'130+',  l:'Active Learners',       icon:Users,      color:C.navy   },
  { n:'6',     l:'Professional Courses',  icon:BookOpen,   color:C.orange },
  { n:'5',     l:'Countries Reached',     icon:Globe,      color:C.green  },
  { n:'94%',   l:'Satisfaction Rate',     icon:ThumbsUp,   color:C.amber  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function ThumbsUp(props) { return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/><path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg> }

// ─── Sub-components ───────────────────────────────────────────────────────────

// Animated stat number
function StatCounter({ value, label, icon: Icon, color }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3" style={{ background:`${color}15` }}>
        <Icon size={22} style={{ color }} />
      </div>
      <p className="text-3xl font-black mb-1" style={{ color }}>{value}</p>
      <p className="text-sm" style={{ color: C.gray[500] }}>{label}</p>
    </div>
  )
}

// Course card
function CourseCard({ course, saved, onSave }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        {/* Gradient overlay */}
        <div className="absolute inset-0 opacity-40" style={{ background: course.gradient }}/>
        {/* Top badges */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black text-white backdrop-blur-sm" style={{ background:`${course.color}cc` }}>
            {course.category}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90" style={{ color: C.gray[700] }}>
            {course.level}
          </span>
        </div>
        {/* Save button */}
        <button onClick={() => onSave(course.id)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all shadow">
          <Heart size={14} style={{ color: saved ? C.rose : C.gray[400], fill: saved ? C.rose : 'none' }}/>
        </button>
        {/* Emoji badge */}
        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white/90 shadow">
          {course.emoji}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-base mb-2 leading-tight" style={{ color: C.navy }}>{course.title}</h3>
        <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: C.gray[500] }}>{course.description}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.features.map((f, i) => (
            <span key={i} className="text-[10px] px-2.5 py-1 rounded-full font-semibold"
              style={{ background:`${course.color}12`, color:course.color }}>{f}</span>
          ))}
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: C.gray[400] }}>
          <span className="flex items-center gap-1"><Clock size={11}/> {course.duration}</span>
          <span className="flex items-center gap-1"><Users size={11}/> {course.students}+</span>
          <span className="flex items-center gap-1"><Star size={11} className="fill-current" style={{ color:C.yellow }}/> {course.rating}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: C.gray[100] }}>
          <div>
            <span className="text-2xl font-black" style={{ color: C.navy }}>${course.price}</span>
            <span className="text-xs ml-1" style={{ color: C.gray[400] }}>/ course</span>
          </div>
          <Link to={`/course/${course.id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-md"
            style={{ background: course.gradient }}>
            View Details <ArrowRight size={14}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

// FAQ item
function FAQItem({ q, a, open, toggle }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border:`1px solid ${C.gray[200]}` }}>
      <button onClick={toggle}
        className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-gray-50">
        <span className="font-bold text-sm pr-4" style={{ color: C.navy }}>{q}</span>
        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: open ? C.navy : C.gray[100] }}>
          {open ? <Minus size={13} className="text-white"/> : <Plus size={13} style={{ color: C.gray[500] }}/>}
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-sm leading-relaxed" style={{ color: C.gray[500] }}>{a}</p>
        </div>
      )}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Landing() {
  const [currentSlide,    setCurrentSlide]    = useState(0)
  const [autoPlay,        setAutoPlay]        = useState(true)
  const [selectedCat,     setSelectedCat]     = useState('All')
  const [savedCourses,    setSavedCourses]    = useState([])
  const [openFaq,         setOpenFaq]         = useState(null)
  const [emailVal,        setEmailVal]        = useState('')
  const [subscribed,      setSubscribed]      = useState(false)
  const [countdown,       setCountdown]       = useState({ d:2, h:14, m:30, s:45 })
  const [testimonialPos,  setTestimonialPos]  = useState(0)
  const [isPaused,        setIsPaused]        = useState(false)
  const marqueeRef        = useRef(null)
  const slideInterval     = useRef(null)

  const filteredCourses = selectedCat === 'All' ? courses : courses.filter(c => c.category === selectedCat)
  const dupTestimonials = [...testimonials, ...testimonials, ...testimonials]
  const totalStudents   = courses.reduce((a, c) => a + c.students, 0)

  // Countdown
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(p => {
        if (p.s > 0) return { ...p, s: p.s - 1 }
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 }
        if (p.h > 0) return { ...p, h: p.h - 1, m: 59, s: 59 }
        if (p.d > 0) return { ...p, d: p.d - 1, h: 23, m: 59, s: 59 }
        return p
      })
    }, 1000)
    return () => clearInterval(t)
  }, [])

  // Hero carousel
  useEffect(() => {
    if (autoPlay) {
      slideInterval.current = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 6000)
    }
    return () => clearInterval(slideInterval.current)
  }, [autoPlay])

  const goSlide = (i) => { setCurrentSlide(i); setAutoPlay(false) }
  const prevSlide = () => { setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length); setAutoPlay(false) }
  const nextSlide = () => { setCurrentSlide(p => (p + 1) % heroSlides.length); setAutoPlay(false) }

  const toggleSave = (id) => setSavedCourses(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (emailVal.trim()) { setSubscribed(true); setEmailVal('') }
  }

  const padZ = n => String(n).padStart(2, '0')

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════════════════
          1. PROMO BANNER — scrolling marquee
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative overflow-hidden py-2.5" style={{ background:`linear-gradient(90deg, ${C.navyDark}, ${C.navyMid}, ${C.navy})` }}>
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].map((_, rep) => (
            <span key={rep} className="inline-flex items-center gap-6 text-white text-sm font-semibold px-8">
              <span className="flex items-center gap-2"><Zap size={13} style={{ color:C.yellow }}/> All courses $7 only</span>
              <span style={{ color:C.yellow }}>★</span>
              <span className="flex items-center gap-2"><Gift size={13} style={{ color:C.orangeLight }}/> Free resources included</span>
              <span style={{ color:C.yellow }}>★</span>
              <span className="flex items-center gap-2"><Award size={13} style={{ color:C.green }}/> Certificate on completion</span>
              <span style={{ color:C.yellow }}>★</span>
              <span className="flex items-center gap-2"><Globe size={13} style={{ color:'#67E8F9' }}/> Learn from anywhere in Africa</span>
              <span style={{ color:C.yellow }}>★</span>
              <span className="flex items-center gap-2"><Flame size={13} style={{ color:C.rose }}/> New: AI Prompt Engineering course now live</span>
              <span style={{ color:C.yellow }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. HERO SECTION — fullscreen carousel
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ minHeight: '92vh' }}>
        {/* Slides */}
        {heroSlides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {/* Background image */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage:`url(${slide.image})` }}/>
            {/* Overlay gradient */}
            <div className="absolute inset-0" style={{ background:`linear-gradient(105deg, ${C.navyDark}F2 0%, ${C.navy}CC 40%, ${C.navyMid}88 70%, transparent 100%)` }}/>
            {/* Decorative shapes */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10" style={{ background:C.orange }}/>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full opacity-5 blur-3xl" style={{ background:C.yellow }}/>
          </div>
        ))}

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center py-20 lg:py-28">
          {heroSlides.map((slide, i) => (
            <div key={i} className={`w-full transition-all duration-700 ${i === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute pointer-events-none'}`}>
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold mb-6 border border-white/20">
                  <span>{slide.badge}</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-5">
                  {slide.headline[0]}<br/>
                  <span style={{ color:C.orangeLight }}>{slide.headline[1]}</span>
                </h1>

                {/* Sub */}
                <p className="text-lg text-white/80 mb-8 max-w-xl leading-relaxed">{slide.sub}</p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3 mb-10">
                  <Link to={slide.cta.to}
                    className="group flex items-center gap-2 px-7 py-4 rounded-2xl font-black text-sm text-white hover:shadow-2xl hover:-translate-y-0.5 transition-all shadow-lg"
                    style={{ background:`linear-gradient(135deg, ${C.orange}, ${C.orangeLight})` }}>
                    {slide.cta.label} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                  </Link>
                  <Link to={slide.ctaAlt.to}
                    className="flex items-center gap-2 px-7 py-4 rounded-2xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/15 transition-all backdrop-blur-sm">
                    {slide.ctaAlt.label}
                  </Link>
                </div>

                {/* Slide stats */}
                <div className="flex gap-6">
                  {[slide.stat1, slide.stat2, slide.stat3].map((s, si) => (
                    <div key={si} className="text-center">
                      <p className="text-2xl font-black text-white">{s.n}</p>
                      <p className="text-xs text-white/60">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next */}
        <button onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition">
          <ChevronLeft size={20}/>
        </button>
        <button onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/25 transition">
          <ChevronRight size={20}/>
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goSlide(i)}
              className="rounded-full transition-all"
              style={{ width: i === currentSlide ? '28px' : '8px', height:'8px', background: i === currentSlide ? C.orange : 'rgba(255,255,255,0.4)' }}/>
          ))}
        </div>

        {/* Floating course pill (desktop) */}
        <div className="absolute bottom-12 right-6 lg:right-16 z-30 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-3 w-64">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background:`${C.navy}12` }}>💼</div>
            <div>
              <p className="font-black text-xs" style={{ color:C.navy }}>32 students enrolled</p>
              <p className="text-[10px]" style={{ color:C.gray[400] }}>Virtual Assistant Pro · $7</p>
            </div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background:C.green }}/>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          3. STATS STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b" style={{ borderColor:C.gray[100] }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 divide-x divide-gray-100">
            {stats.map((s, i) => (
              <StatCounter key={i} value={s.n} label={s.l} icon={s.icon} color={s.color}/>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          4. WHY iKPACE — 6 value cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background:C.gray[50] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background:`${C.navy}12`, color:C.navy }}>
              ⭐ WHY CHOOSE iKPACE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color:C.navy }}>
              Everything You Need to <span style={{ color:C.orange }}>Succeed</span>
            </h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color:C.gray[500] }}>
              We don't just teach skills. We prepare you for real careers and real income.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon:BookOpen,   color:C.navy,   bg:`${C.navy}10`,   title:'Expert-Led Content',       desc:'Courses built by industry professionals with real-world experience and up-to-date curriculum.' },
              { icon:Award,      color:C.orange, bg:`${C.orange}10`, title:'Certificates That Count',   desc:'Earn a recognised iKPACE certificate on completion. Add it to your CV and LinkedIn instantly.' },
              { icon:Users,      color:C.green,  bg:`${C.green}10`,  title:'Active Community',          desc:'Join a growing network of 130+ learners. Study groups, peer support, and mentor Q&As included.' },
              { icon:Clock,      color:C.teal,   bg:`${C.teal}10`,   title:'Fully Self-Paced',          desc:'No deadlines. No stress. Learn at your own speed from any device, anywhere in the world.' },
              { icon:Shield,     color:C.purple, bg:`${C.purple}10`, title:'Secure Payments',           desc:'Powered by Paystack — Ghana\'s most trusted payment platform. Card, mobile money, bank transfer.' },
              { icon:Globe,      color:C.amber,  bg:`${C.amber}10`,  title:'Learn From Anywhere',       desc:'Fully mobile-friendly platform. Study on phone, tablet, or desktop. Works even on slow connections.' },
            ].map((f, i) => (
              <div key={i}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
                style={{ border:`1px solid ${C.gray[200]}` }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background:f.bg }}>
                  <f.icon size={22} style={{ color:f.color }}/>
                </div>
                <h3 className="font-black text-base mb-2" style={{ color:C.navy }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color:C.gray[500] }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          5. COUNTDOWN OFFER BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="py-6 text-white" style={{ background:`linear-gradient(135deg, ${C.orange}, ${C.amber})` }}>
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Flame size={24} className="text-white animate-bounce flex-shrink-0"/>
            <div>
              <p className="font-black text-base">🎁 Bundle Deal — 3 Courses for $15</p>
              <p className="text-sm opacity-80">Save $6 when you enrol in 3 courses. Limited spots available.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              {[
                { v:padZ(countdown.d), l:'Days'  },
                { v:padZ(countdown.h), l:'Hours' },
                { v:padZ(countdown.m), l:'Mins'  },
                { v:padZ(countdown.s), l:'Secs'  },
              ].map((t, i) => (
                <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-center min-w-[52px]">
                  <p className="text-xl font-black font-mono">{t.v}</p>
                  <p className="text-[10px] opacity-70">{t.l}</p>
                </div>
              ))}
            </div>
            <Link to="/pricing"
              className="px-5 py-3 rounded-xl font-black text-sm bg-white hover:shadow-lg transition-all hover:-translate-y-0.5"
              style={{ color:C.orange }}>
              Claim Deal <ArrowRight size={14} className="inline"/>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          6. COURSES SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background:`${C.orange}12`, color:C.orange }}>
              🎓 OUR COURSES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color:C.navy }}>
              Start Learning <span style={{ color:C.orange }}>Any Skill</span>
            </h2>
            <p className="text-lg max-w-lg mx-auto mb-8" style={{ color:C.gray[500] }}>
              All courses just $7. Beginner-friendly. Certificate included.
            </p>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCat(cat)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: selectedCat === cat ? C.navy : 'white',
                    color:      selectedCat === cat ? '#fff' : C.gray[500],
                    border:     `1.5px solid ${selectedCat === cat ? C.navy : C.gray[200]}`,
                    boxShadow:  selectedCat === cat ? `0 4px 14px ${C.navy}30` : 'none'
                  }}>
                  {cat === 'All' ? '🎯 All Courses' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} saved={savedCourses.includes(course.id)} onSave={toggleSave}/>
            ))}
          </div>

          {/* View all */}
          <div className="text-center mt-10">
            <Link to="/courses"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-white hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-lg"
              style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.navyMid})` }}>
              Browse All Courses <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          7. HOW IT WORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background:C.gray[50] }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background:`${C.green}12`, color:C.green }}>
              🗺️ HOW IT WORKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color:C.navy }}>
              From Signup to <span style={{ color:C.orange }}>Certified</span> in 4 Steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <div key={i} className="relative bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all"
                style={{ border:`1px solid ${C.gray[200]}` }}>
                {/* Step number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-white shadow"
                  style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.orange})` }}>
                  {step.step}
                </div>
                {/* Connector arrow (not last) */}
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight size={20} style={{ color:C.gray[300] }}/>
                  </div>
                )}
                <div className="text-4xl mb-3 mt-2">{step.icon}</div>
                <h3 className="font-black text-sm mb-2" style={{ color:C.navy }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color:C.gray[500] }}>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-white hover:shadow-xl transition-all shadow-lg"
              style={{ background:`linear-gradient(135deg, ${C.orange}, ${C.orangeLight})` }}>
              <Rocket size={16}/> Get Started for $7
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          8. iKPACE ADVANTAGE — two-column
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: image stack */}
            <div className="relative h-[420px] hidden lg:block">
              <div className="absolute top-0 left-0 w-72 h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80" alt="Students" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 opacity-20" style={{ background:C.navy }}/>
              </div>
              <div className="absolute bottom-0 right-0 w-64 h-60 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&auto=format&fit=crop&q=80" alt="Learning" className="w-full h-full object-cover"/>
              </div>
              {/* Floating cards */}
              <div className="absolute top-4 right-4 bg-white rounded-2xl shadow-xl p-4 w-48">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.green}15` }}>
                    <CheckCircle size={16} style={{ color:C.green }}/>
                  </div>
                  <div>
                    <p className="text-xs font-black" style={{ color:C.navy }}>Certified!</p>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>Sarah J. — VA Pro</p>
                  </div>
                </div>
                <div className="flex">
                  {[1,2,3,4,5].map(i=><Star key={i} size={11} className="fill-current" style={{ color:C.yellow }}/>)}
                </div>
              </div>
              <div className="absolute bottom-20 left-0 bg-white rounded-2xl shadow-xl p-4 w-52">
                <p className="text-[10px] font-bold mb-1" style={{ color:C.gray[400] }}>Community Members</p>
                <p className="text-2xl font-black mb-1" style={{ color:C.navy }}>130+</p>
                <div className="flex -space-x-1">
                  {['💼','🎨','📱','🤖','📊'].map((e,i) => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-xs" style={{ background:`${C.navy}20` }}>{e}</div>
                  ))}
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full blur-3xl opacity-15" style={{ background:C.orange }}/>
            </div>

            {/* Right: content */}
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-6" style={{ background:`${C.navy}12`, color:C.navy }}>
                ⭐ THE iKPACE ADVANTAGE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-5" style={{ color:C.navy }}>
                More Than Just<br/><span style={{ color:C.orange }}>Technical Skills</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color:C.gray[500] }}>
                iKPACE goes beyond technical training. Our curriculum covers vital professional soft skills — communication, teamwork, and time management — giving you the edge to stand out in any job or freelance environment.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon:Brain,       color:C.navy,   title:'Technical Excellence',  desc:'Industry-relevant curriculum' },
                  { icon:MessageCircle,color:C.orange, title:'Soft Skills Mastery',   desc:'Communication & leadership'  },
                  { icon:Target,      color:C.green,  title:'Career Coaching',        desc:'CV & interview preparation'  },
                  { icon:CheckSquare, color:C.teal,   title:'Job-Ready Projects',     desc:'Real-world assignments'       },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl" style={{ background:`${f.color}08`, border:`1px solid ${f.color}18` }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${f.color}15` }}>
                      <f.icon size={17} style={{ color:f.color }}/>
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-0.5" style={{ color:C.gray[800] }}>{f.title}</p>
                      <p className="text-xs" style={{ color:C.gray[400] }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/register"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-black text-sm text-white hover:shadow-xl transition-all shadow-lg group"
                style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.orange})` }}>
                Start Your Journey Today <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </Link>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-5 mt-6 pt-6 border-t" style={{ borderColor:C.gray[100] }}>
                {['94% satisfaction rate', '130+ hours content', '6 professional courses'].map((t, i) => (
                  <span key={i} className="flex items-center gap-1.5 text-xs" style={{ color:C.gray[500] }}>
                    <CheckCircle size={13} style={{ color:C.green }}/>{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          9. LEARNING OUTCOMES — by course
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20" style={{ background:C.gray[50] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background:`${C.orange}12`, color:C.orange }}>
              🎯 LEARNING OUTCOMES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-3" style={{ color:C.navy }}>
              What You'll Be Able to <span style={{ color:C.orange }}>Do</span> After Each Course
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map(course => (
              <div key={course.id}
                className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all"
                style={{ border:`1px solid ${C.gray[200]}` }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background:`${course.color}15` }}>
                    {course.emoji}
                  </div>
                  <div>
                    <p className="font-black text-sm" style={{ color:C.navy }}>{course.title}</p>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>{course.duration}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {course.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <CheckCircle size={13} style={{ color:course.color, flexShrink:0 }}/>
                      <span className="text-xs" style={{ color:C.gray[600] }}>{f}</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2.5">
                    <Award size={13} style={{ color:C.yellow, flexShrink:0 }}/>
                    <span className="text-xs" style={{ color:C.gray[600] }}>Certificate of completion</span>
                  </div>
                </div>
                <Link to={`/course/${course.id}`}
                  className="mt-4 flex items-center gap-1 text-xs font-bold hover:gap-2 transition-all"
                  style={{ color:course.color }}>
                  See full curriculum <ChevronRight size={13}/>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          10. TESTIMONIALS — infinite marquee
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 overflow-hidden" style={{ background:`linear-gradient(135deg, ${C.navyDark}, ${C.navy})` }}>
        <div className="text-center mb-10 px-4">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4 bg-white/15 text-white">
            💬 STUDENT STORIES
          </span>
          <h2 className="text-3xl font-black text-white mb-2">Real Feedback from Real Students</h2>
          <p className="text-white/60 text-sm">Honest testimonials — no filters, no fake numbers.</p>
        </div>

        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background:`linear-gradient(90deg, ${C.navyDark}, transparent)` }}/>
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background:`linear-gradient(-90deg, ${C.navy}, transparent)` }}/>

          {/* Marquee track */}
          <div className="flex animate-marquee-slow hover:pause whitespace-nowrap">
            {dupTestimonials.map((t, i) => (
              <div key={i} className="flex-none w-[320px] mx-3 align-top">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/15 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                      style={{ background:t.color }}>{t.avatar}</div>
                    <div>
                      <p className="font-black text-sm text-white">{t.name}</p>
                      <p className="text-[10px] text-white/50">{t.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(t.rating)].map((_, ri) => <Star key={ri} size={12} className="fill-current" style={{ color:C.yellow }}/>)}
                  </div>
                  <p className="text-sm text-white/85 leading-relaxed mb-3 whitespace-normal">{t.text}</p>
                  <span className="inline-block text-[10px] px-2.5 py-1 rounded-full text-white/70" style={{ background:'rgba(255,255,255,0.1)' }}>
                    📚 {t.course}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          11. COMMUNITY SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-5" style={{ background:`${C.navy}12`, color:C.navy }}>
                🤝 COMMUNITY
              </span>
              <h2 className="text-3xl sm:text-4xl font-black mb-4" style={{ color:C.navy }}>
                Learn Better <span style={{ color:C.orange }}>Together</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color:C.gray[500] }}>
                Our student community is one of our biggest strengths. Ask questions, share progress, find study partners, and get answers from instructors and fellow learners across Africa and beyond.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { icon:'💬', label:'Peer Discussions'    },
                  { icon:'🤝', label:'Study Groups'        },
                  { icon:'📅', label:'Live Q&A Sessions'   },
                  { icon:'🏆', label:'Student Leaderboard' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl" style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                    <span className="text-xl">{f.icon}</span>
                    <span className="text-sm font-semibold" style={{ color:C.gray[700] }}>{f.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/community"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl font-black text-sm text-white hover:shadow-xl transition-all shadow-lg"
                style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.navyMid})` }}>
                <Users size={16}/> Join the Community
              </Link>
            </div>

            {/* Community visual */}
            <div className="bg-white rounded-3xl shadow-2xl p-6 border" style={{ borderColor:C.gray[200] }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"/>
                  <span className="text-sm font-semibold" style={{ color:C.gray[700] }}>8 members online now</span>
                </div>
                <span className="text-xs px-3 py-1 rounded-full" style={{ background:`${C.navy}10`, color:C.navy }}>130+ total</span>
              </div>

              {/* Member avatars */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['💼','🎨','📱','🤖','📊','👩‍💻','👨‍🎨','👩‍🏫','🧑‍💼','👨‍💻','👩‍🔬','🧑‍🎓'].map((e, i) => (
                  <div key={i} className="w-10 h-10 rounded-xl border-2 border-white flex items-center justify-center text-xl shadow-sm"
                    style={{ background:`${C.navy}12` }}>{e}</div>
                ))}
                <div className="w-10 h-10 rounded-xl border-2 border-white flex items-center justify-center text-xs font-black shadow-sm"
                  style={{ background:C.orange, color:'white' }}>+118</div>
              </div>

              {/* Recent messages */}
              {[
                { avatar:'MK', color:C.navy,   name:'Michael K.', msg:'Just landed my first Upwork client! 🎉 VA Pro paid off!',             time:'2m ago' },
                { avatar:'AO', color:C.green,  name:'Amina O.',   msg:'The AI prompt frameworks are 🔥 already using them for clients.',       time:'8m ago' },
                { avatar:'SA', color:C.orange, name:'Sarah A.',   msg:'Anyone up for a study session tonight on the Social Media module?',     time:'15m ago'},
              ].map((m, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl mb-2" style={{ background:C.gray[50] }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background:m.color }}>
                    {m.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color:C.navy }}>{m.name}</span>
                      <span className="text-[10px]" style={{ color:C.gray[400] }}>{m.time}</span>
                    </div>
                    <p className="text-xs truncate mt-0.5" style={{ color:C.gray[500] }}>{m.msg}</p>
                  </div>
                </div>
              ))}

              <Link to="/community"
                className="block w-full text-center py-3 rounded-xl text-sm font-bold text-white mt-3"
                style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.orange})` }}>
                Join the Discussion →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          12. DEVICE COMPATIBILITY STRIP
      ══════════════════════════════════════════════════════════════════════ */}
      <div className="py-10 border-y" style={{ background:C.gray[50], borderColor:C.gray[200] }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm font-bold mb-5" style={{ color:C.gray[400] }}>LEARN ON ANY DEVICE, ANYWHERE</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {[
              { icon:Smartphone, label:'Mobile Phone'   },
              { icon:Monitor,    label:'Desktop'        },
              { icon:Layers,     label:'Tablet'         },
              { icon:Wifi,       label:'Low Bandwidth'  },
            ].map(({ icon:Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background:`${C.navy}10` }}>
                  <Icon size={22} style={{ color:C.navy }}/>
                </div>
                <span className="text-xs font-medium" style={{ color:C.gray[500] }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          13. FAQ SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-4" style={{ background:`${C.teal}12`, color:C.teal }}>
              ❓ FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl font-black mb-3" style={{ color:C.navy }}>
              Got Questions? <span style={{ color:C.orange }}>We've Got Answers.</span>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a}
                open={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}/>
            ))}
          </div>

          <p className="text-center mt-8 text-sm" style={{ color:C.gray[400] }}>
            Still have questions?{' '}
            <Link to="/support" className="font-bold hover:underline" style={{ color:C.navy }}>Contact Support →</Link>
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          14. NEWSLETTER SIGNUP
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-14 text-white" style={{ background:`linear-gradient(135deg, ${C.orange}, ${C.amber})` }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <Bell size={32} className="mx-auto mb-4 opacity-90"/>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Stay in the Loop</h2>
          <p className="opacity-80 mb-6 text-sm">Get notified about new courses, live sessions, scholarships, and free resources. No spam — ever.</p>
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input type="email" value={emailVal} onChange={e => setEmailVal(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3.5 rounded-xl text-sm outline-none font-medium"
                style={{ color:C.gray[800] }}
                required/>
              <button type="submit"
                className="px-6 py-3.5 rounded-xl font-black text-sm hover:shadow-lg transition-all flex items-center gap-2 justify-center"
                style={{ background:C.navy, color:'white' }}>
                <Send size={15}/> Subscribe
              </button>
            </form>
          ) : (
            <div className="flex items-center justify-center gap-3 bg-white/20 rounded-2xl py-4 px-6 max-w-md mx-auto">
              <CheckCircle size={20} className="text-white"/>
              <p className="font-bold">You're subscribed! We'll be in touch. 🎉</p>
            </div>
          )}
          <p className="text-xs opacity-60 mt-3">Join 130+ learners already subscribed. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          15. FINAL CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 text-3xl" style={{ background:`${C.navy}10` }}>🎓</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 leading-tight" style={{ color:C.navy }}>
            Your New Career Starts<br/>
            <span style={{ color:C.orange }}>for Just $7</span>
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color:C.gray[500] }}>
            Join 130+ learners across Africa who are building marketable skills, earning certificates, and launching careers with iKPACE.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/register"
              className="group flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm text-white hover:shadow-2xl hover:-translate-y-0.5 transition-all shadow-lg"
              style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.orange})` }}>
              <Rocket size={16}/> Start Learning Today <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link to="/courses"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm border-2 hover:bg-gray-50 transition-all"
              style={{ borderColor:C.navy, color:C.navy }}>
              Browse All Courses
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-5">
            {[
              { icon:Shield, text:'Secure Paystack Payment' },
              { icon:RefreshCw, text:'No hidden fees'        },
              { icon:Award,  text:'Certificate on completion'},
              { icon:Globe,  text:'Learn from anywhere'      },
            ].map(({ icon:Icon, text }, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs" style={{ color:C.gray[400] }}>
                <Icon size={13} style={{ color:C.green }}/>{text}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ── STYLES ─────────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          display: inline-flex;
          width: max-content;
        }

        @keyframes marquee-slow {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 50s linear infinite;
          display: inline-flex;
          width: max-content;
        }
        .hover\\:pause:hover {
          animation-play-state: paused;
        }

        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
      `}</style>
    </div>
  )
}
