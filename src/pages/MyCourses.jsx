// src/pages/MyCourses.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock, Users, Star, ArrowRight, Search,
  BookOpen, Award, Zap, Heart,
  CheckCircle, Sparkles, ChevronDown,
  Grid3x3, LayoutList, PlayCircle,
  Gift, Brain, Filter, X, Rocket, BadgeCheck,
  Shield, Globe, BarChart3, ChevronRight,
  RefreshCw
} from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:     '#1A3D7C', navyDark:'#0F2655', navyMid:'#2F5EA8',
  orange:   '#FF7A00', orangeL:'#FF9A3C',
  green:    '#008F4C', yellow:'#E6B800', teal:'#0D9488',
  purple:   '#7C3AED', rose:'#E11D48', amber:'#D97706',
  gray:{ 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',300:'#CBD5E1',
         400:'#94A3B8',500:'#64748B',600:'#475569',700:'#334155',800:'#1E293B',900:'#0F172A' }
}

// ─── All 6 courses ────────────────────────────────────────────────────────────
const ALL_COURSES = [
  {
    id:'virtual-assistant-pro', title:'Virtual Assistant Professional',
    desc:'Master client management, email, calendars & remote work tools. Land your first VA client in 8 weeks.',
    price:7, duration:'8 Weeks', hours:60, students:32, rating:4.9, reviews:18,
    category:'business', level:'Beginner', color:C.navy,
    gradient:`linear-gradient(135deg,${C.navyDark},${C.navyMid})`, emoji:'💼',
    image:'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&auto=format&fit=crop&q=80',
    badge:'Most Popular', badgeColor:C.orange,
    features:['Email Management','Calendar Mastery','Client Acquisition','Remote Tools'],
    lessons:24, projects:3, certificate:true, isHot:true, isNew:false,
  },
  {
    id:'social-media-marketing', title:'Social Media Marketing',
    desc:'Build brands, run Meta Ads, master analytics & grow any social account organically from scratch.',
    price:7, duration:'8 Weeks', hours:55, students:28, rating:4.8, reviews:15,
    category:'marketing', level:'Beginner', color:C.orange,
    gradient:`linear-gradient(135deg,${C.orange},${C.amber})`, emoji:'📱',
    image:'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=700&auto=format&fit=crop&q=80',
    badge:'In Demand', badgeColor:C.orange,
    features:['Meta Ads','Content Strategy','Analytics','Community Management'],
    lessons:28, projects:4, certificate:true, isHot:true, isNew:false,
  },
  {
    id:'canva-graphic-design', title:'Canva & Graphic Design',
    desc:'Design logos, brand identities, social kits & print materials. Build a portfolio of 10+ projects.',
    price:7, duration:'8 Weeks', hours:40, students:19, rating:4.7, reviews:12,
    category:'design', level:'Beginner', color:C.green,
    gradient:`linear-gradient(135deg,${C.green},${C.teal})`, emoji:'🎨',
    image:'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=700&auto=format&fit=crop&q=80',
    badge:'Creative', badgeColor:C.green,
    features:['Logo Design','Brand Identity','Social Kits','Presentations'],
    lessons:20, projects:5, certificate:true, isHot:false, isNew:false,
  },
  {
    id:'smart-kids-coding', title:'Smart Kids Coding',
    desc:'Introduce ages 6–12 to coding through Scratch. Build animations, stories, and their own games.',
    price:7, duration:'4 Weeks', hours:30, students:12, rating:4.9, reviews:8,
    category:'kids', level:'Beginner', color:C.purple,
    gradient:`linear-gradient(135deg,${C.purple},#9B59B6)`, emoji:'🚀',
    image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80',
    badge:'Kids Program', badgeColor:C.purple,
    features:['Scratch Coding','Game Design','Animations','Logic Building'],
    lessons:16, projects:4, certificate:true, isHot:false, isNew:false,
  },
  {
    id:'freelancing-online-income', title:'Freelancing & Online Income',
    desc:'Set up Upwork/Fiverr profiles, find clients, price your services & build recurring income in 4 weeks.',
    price:7, duration:'4 Weeks', hours:35, students:21, rating:4.8, reviews:14,
    category:'business', level:'Beginner', color:C.amber,
    gradient:`linear-gradient(135deg,${C.amber},${C.yellow})`, emoji:'💰',
    image:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&auto=format&fit=crop&q=80',
    badge:'High Demand', badgeColor:C.amber,
    features:['Upwork & Fiverr','Client Acquisition','Pricing Strategy','Portfolio'],
    lessons:22, projects:3, certificate:true, isHot:true, isNew:false,
  },
  {
    id:'ai-prompt-engineering', title:'AI Prompt Engineering',
    desc:'Master ChatGPT, Claude, Midjourney & AI automation. Monetise your AI expertise in 8 weeks.',
    price:7, duration:'8 Weeks', hours:45, students:18, rating:5.0, reviews:11,
    category:'tech', level:'Intermediate', color:'#06B6D4',
    gradient:`linear-gradient(135deg,#06B6D4,${C.purple})`, emoji:'🤖',
    image:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&auto=format&fit=crop&q=80',
    badge:'🆕 New', badgeColor:'#06B6D4',
    features:['ChatGPT & Claude','Midjourney','AI Automation','Sell AI Services'],
    lessons:24, projects:4, certificate:true, isHot:true, isNew:true,
  },
]

const CATS = [
  { id:'all',      label:'All',       emoji:'🎯' },
  { id:'business', label:'Business',  emoji:'💼' },
  { id:'marketing',label:'Marketing', emoji:'📣' },
  { id:'design',   label:'Design',    emoji:'🎨' },
  { id:'kids',     label:'Kids',      emoji:'🚀' },
  { id:'tech',     label:'Tech / AI', emoji:'🤖' },
]

const SORTS = [
  { id:'popular',  label:'Most Popular'  },
  { id:'rating',   label:'Top Rated'     },
  { id:'shortest', label:'Shortest'      },
  { id:'newest',   label:'Newest First'  },
]

// ── Course card ────────────────────────────────────────────────────────────────
function CourseCard({ course, saved, onSave, view }) {
  const [hov, setHov] = useState(false)

  if (view === 'list') return (
    <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all flex flex-col sm:flex-row"
      style={{ border:`1px solid ${C.gray[200]}` }}>
      <div className="relative w-full sm:w-52 h-44 sm:h-auto flex-shrink-0 overflow-hidden">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
        <div className="absolute inset-0 opacity-30" style={{ background:course.gradient }}/>
        <span className="absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-full text-white"
          style={{ background:course.badgeColor }}>{course.badge}</span>
        <span className="absolute bottom-3 left-3 text-xl">{course.emoji}</span>
        {course.isHot && <span className="absolute top-3 right-3 text-[9px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background:C.rose }}>🔥</span>}
      </div>
      <div className="flex-1 p-4 sm:p-5 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold" style={{ background:`${course.color}15`,color:course.color }}>{course.level}</span>
            </div>
            <h3 className="font-black text-base leading-tight" style={{ color:C.navy }}>{course.title}</h3>
          </div>
          <button onClick={() => onSave(course.id)} className="p-1.5 rounded-full hover:bg-gray-100 flex-shrink-0">
            <Heart size={15} style={{ color:saved?C.rose:C.gray[300], fill:saved?C.rose:'none' }}/>
          </button>
        </div>
        <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color:C.gray[500] }}>{course.desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-3">
          {course.features.map((f,i) => <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background:`${course.color}10`,color:course.color }}>{f}</span>)}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs" style={{ color:C.gray[400] }}>
            <span className="flex items-center gap-1"><Clock size={11}/>{course.duration}</span>
            <span className="flex items-center gap-1"><Users size={11}/>{course.students}+</span>
            <span className="flex items-center gap-1"><Star size={11} className="fill-current" style={{ color:C.yellow }}/>{course.rating}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-black" style={{ color:C.navy }}>${course.price}</span>
            <Link to={`/course/${course.id}`}
              className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all"
              style={{ background:course.gradient }}>
              View <ArrowRight size={11}/>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
      style={{ border:`1px solid ${C.gray[200]}` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform:hov?'scale(1.06)':'scale(1)' }}/>
        <div className="absolute inset-0 opacity-30" style={{ background:course.gradient }}/>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white" style={{ background:course.badgeColor }}>{course.badge}</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-white/90" style={{ color:C.gray[700] }}>{course.level}</span>
        </div>
        {course.isHot && <span className="absolute top-3 right-10 text-[9px] px-1.5 py-0.5 rounded-full font-black text-white" style={{ background:C.rose }}>🔥 Hot</span>}
        <button onClick={() => onSave(course.id)}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all shadow">
          <Heart size={13} style={{ color:saved?C.rose:C.gray[400], fill:saved?C.rose:'none' }}/>
        </button>
        <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-white/90 shadow">{course.emoji}</div>
        {hov && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1" style={{ background:`${C.navyDark}cc` }}>
            <PlayCircle size={28} className="text-white mb-1"/>
            <p className="text-white text-xs font-bold">{course.lessons} lessons · {course.projects} projects</p>
            <div className="flex items-center gap-1 text-white text-[10px]"><CheckCircle size={10}/> Certificate included</div>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-sm leading-tight mb-1.5" style={{ color:C.navy }}>{course.title}</h3>
        <p className="text-[11px] leading-relaxed mb-3 flex-1" style={{ color:C.gray[500] }}>{course.desc}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {course.features.slice(0,3).map((f,i) => <span key={i} className="text-[9px] px-2 py-0.5 rounded-full font-semibold" style={{ background:`${course.color}12`,color:course.color }}>{f}</span>)}
        </div>
        <div className="flex items-center gap-3 mb-3 text-[10px]" style={{ color:C.gray[400] }}>
          <span className="flex items-center gap-0.5"><Clock size={10}/>{course.duration}</span>
          <span className="flex items-center gap-0.5"><Users size={10}/>{course.students}+</span>
          <span className="flex items-center gap-0.5"><Star size={10} className="fill-current" style={{ color:C.yellow }}/>{course.rating}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor:C.gray[100] }}>
          <div>
            <span className="text-xl font-black" style={{ color:C.navy }}>${course.price}</span>
            <span className="text-[10px] ml-1" style={{ color:C.gray[400] }}>/ course</span>
          </div>
          <Link to={`/course/${course.id}`}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-bold text-white hover:opacity-90 transition-all hover:shadow-lg"
            style={{ background:course.gradient }}>
            Enroll <ArrowRight size={11}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function MyCourses() {
  const [activeCat,    setActiveCat]    = useState('all')
  const [searchTerm,   setSearchTerm]   = useState('')
  const [sortBy,       setSortBy]       = useState('popular')
  const [viewMode,     setViewMode]     = useState('grid')
  const [savedCourses, setSavedCourses] = useState([])
  const [filterOpen,   setFilterOpen]   = useState(false)
  const [animIn,       setAnimIn]       = useState(false)
  const [showPromo,    setShowPromo]    = useState(true)

  useEffect(() => {
    setTimeout(() => setAnimIn(true), 80)
    const saved = localStorage.getItem('ikpace_saved')
    if (saved) setSavedCourses(JSON.parse(saved))
  }, [])

  const toggleSave = (id) => {
    const next = savedCourses.includes(id) ? savedCourses.filter(x=>x!==id) : [...savedCourses, id]
    setSavedCourses(next)
    localStorage.setItem('ikpace_saved', JSON.stringify(next))
  }

  let display = [...ALL_COURSES]
  if (activeCat !== 'all') display = display.filter(c => c.category === activeCat)
  if (searchTerm.trim()) {
    const q = searchTerm.toLowerCase()
    display = display.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) || c.features.some(f=>f.toLowerCase().includes(q)))
  }
  if (sortBy==='popular')  display.sort((a,b)=>b.students-a.students)
  if (sortBy==='rating')   display.sort((a,b)=>b.rating-a.rating)
  if (sortBy==='shortest') display.sort((a,b)=>parseInt(a.duration)-parseInt(b.duration))
  if (sortBy==='newest')   display.sort((a,b)=>(b.isNew?1:0)-(a.isNew?1:0))

  const totalStudents = ALL_COURSES.reduce((s,c)=>s+c.students,0)
  const totalHours    = ALL_COURSES.reduce((s,c)=>s+c.hours,0)
  const avgRating     = (ALL_COURSES.reduce((s,c)=>s+c.rating,0)/ALL_COURSES.length).toFixed(1)

  return (
    <div className="min-h-screen" style={{ background:C.gray[50] }}>

      {/* ── PROMO BANNER ────────────────────────────────────────────────── */}
      {showPromo && (
        <div className="py-2.5 text-white text-center text-xs font-semibold relative"
          style={{ background:`linear-gradient(90deg,${C.navyDark},${C.navyMid},${C.navy})` }}>
          🔥 All courses just $7 each · Certificate included · 130+ students enrolled
          <button onClick={() => setShowPromo(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
            <X size={14}/>
          </button>
        </div>
      )}

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background:`linear-gradient(145deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-[0.08]" style={{ background:C.orange }}/>
        <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full opacity-[0.07] blur-3xl" style={{ background:C.yellow }}/>

        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${animIn?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold mb-5 border border-white/20">
            <Sparkles size={13} style={{ color:C.yellow }}/> Ghana's Most Affordable Learning Platform
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
            All Our <span style={{ color:C.orangeL }}>Courses</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            {totalStudents}+ students enrolled across {ALL_COURSES.length} professional courses. Just <strong>$7 each.</strong>
          </p>

          {/* Search bar */}
          <div className="relative max-w-lg mx-auto mb-8">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl">
              <Search size={17} style={{ color:C.gray[400],flexShrink:0 }}/>
              <input type="text" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
                placeholder="Search courses, skills, tools…"
                className="flex-1 text-sm outline-none bg-transparent" style={{ color:C.gray[800] }}/>
              {searchTerm && <button onClick={()=>setSearchTerm('')}><X size={15} style={{ color:C.gray[400] }}/></button>}
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { emoji:'👥', label:`${totalStudents}+ Students`    },
              { emoji:'🎓', label:`${ALL_COURSES.length} Courses` },
              { emoji:'⭐', label:`${avgRating} Avg Rating`       },
              { emoji:'⏱️', label:`${totalHours}+ Hours`          },
              { emoji:'🏆', label:'Certificate Included'          },
            ].map((p,i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/15">
                <span className="text-sm">{p.emoji}</span>
                <span className="text-white text-[11px] font-semibold">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY CONTROLS ───────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b shadow-sm" style={{ borderColor:C.gray[200] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-3">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1">
              {CATS.map(cat => (
                <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: activeCat===cat.id ? C.navy : C.gray[50],
                    color:      activeCat===cat.id ? '#fff' : C.gray[500],
                    border:     `1.5px solid ${activeCat===cat.id ? C.navy : C.gray[200]}`,
                    boxShadow:  activeCat===cat.id ? `0 3px 12px ${C.navy}30` : 'none'
                  }}>
                  <span>{cat.emoji}</span>
                  <span className="hidden sm:inline">{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="relative hidden sm:block">
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-7 py-1.5 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                  style={{ background:C.gray[50],border:`1.5px solid ${C.gray[200]}`,color:C.gray[600] }}>
                  {SORTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:C.gray[400] }}/>
              </div>
              <button onClick={()=>setFilterOpen(p=>!p)}
                className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold"
                style={{ background:filterOpen?C.navy:C.gray[50],color:filterOpen?'#fff':C.gray[600],border:`1.5px solid ${C.gray[200]}` }}>
                <Filter size={12}/> Sort
              </button>
              <div className="flex items-center bg-gray-50 rounded-xl p-0.5" style={{ border:`1.5px solid ${C.gray[200]}` }}>
                <button onClick={()=>setViewMode('grid')} className="p-1.5 rounded-lg transition-all"
                  style={{ background:viewMode==='grid'?C.navy:'transparent' }}>
                  <Grid3x3 size={14} style={{ color:viewMode==='grid'?'#fff':C.gray[400] }}/>
                </button>
                <button onClick={()=>setViewMode('list')} className="p-1.5 rounded-lg transition-all"
                  style={{ background:viewMode==='list'?C.navy:'transparent' }}>
                  <LayoutList size={14} style={{ color:viewMode==='list'?'#fff':C.gray[400] }}/>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile sort */}
          {filterOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t" style={{ borderColor:C.gray[100] }}>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                className="w-full appearance-none px-3 py-2 rounded-xl text-xs font-semibold outline-none"
                style={{ background:C.gray[50],border:`1.5px solid ${C.gray[200]}`,color:C.gray[600] }}>
                {SORTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          )}

          {/* Counts */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px]" style={{ color:C.gray[400] }}>
              <span className="font-black" style={{ color:C.navy }}>{display.length}</span> course{display.length!==1?'s':''} found
            </p>
            {savedCourses.length > 0 && (
              <p className="text-[11px]" style={{ color:C.gray[400] }}>
                ❤️ <span className="font-bold" style={{ color:C.rose }}>{savedCourses.length}</span> saved
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* AI Spotlight */}
        {(activeCat==='all'||activeCat==='tech') && !searchTerm && (
          <div className="mb-8 rounded-3xl overflow-hidden shadow-xl relative"
            style={{ background:`linear-gradient(135deg,#06B6D4,${C.purple})` }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-15 bg-white"/>
            <div className="relative z-10 p-5 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-white/20 border border-white/25 flex-shrink-0">🤖</div>
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs px-2.5 py-1 rounded-full font-black bg-white/20 border border-white/20">🆕 JUST LAUNCHED</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-black" style={{ background:C.yellow,color:C.gray[900] }}>5.0 ★</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black mb-1">AI Prompt Engineering Masterclass</h2>
                <p className="text-white/75 text-sm mb-4">Master ChatGPT, Claude & Midjourney. The most in-demand skill of 2025. 8 weeks, $7.</p>
                <div className="flex flex-wrap gap-2">
                  <Link to="/course/ai-prompt-engineering"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-black text-sm bg-white hover:shadow-xl transition-all"
                    style={{ color:'#06B6D4' }}>
                    <Rocket size={14}/> Enroll — $7
                  </Link>
                  <Link to="/course-curriculum/ai-prompt-engineering"
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                    Curriculum <ChevronRight size={13}/>
                  </Link>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=180&auto=format&fit=crop&q=80"
                alt="AI" className="hidden lg:block w-36 h-32 object-cover rounded-2xl border-2 border-white/20 shadow-xl flex-shrink-0"/>
            </div>
          </div>
        )}

        {/* Courses */}
        {display.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-black text-lg mb-2" style={{ color:C.navy }}>No courses found</h3>
            <p className="text-sm mb-5" style={{ color:C.gray[400] }}>Try a different search or category.</p>
            <button onClick={() => { setSearchTerm(''); setActiveCat('all') }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 mx-auto"
              style={{ background:C.navy }}>
              <RefreshCw size={13}/> Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map(c => <CourseCard key={c.id} course={c} saved={savedCourses.includes(c.id)} onSave={toggleSave} view="grid"/>)}
          </div>
        ) : (
          <div className="space-y-4">
            {display.map(c => <CourseCard key={c.id} course={c} saved={savedCourses.includes(c.id)} onSave={toggleSave} view="list"/>)}
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon:Users,    color:C.navy,   value:`${totalStudents}+`, label:'Students Enrolled'   },
            { icon:BarChart3,color:C.orange, value:avgRating,           label:'Average Rating'       },
            { icon:Clock,    color:C.green,  value:`${totalHours}h`,   label:'Total Learning Hours' },
            { icon:Award,    color:C.amber,  value:'100%',             label:'Certificate Included' },
          ].map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center hover:shadow-lg transition-all"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background:`${s.color}12` }}>
                <s.icon size={18} style={{ color:s.color }}/>
              </div>
              <p className="text-2xl font-black mb-0.5" style={{ color:s.color }}>{s.value}</p>
              <p className="text-[11px]" style={{ color:C.gray[400] }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
          <h2 className="font-black text-lg text-center mb-6" style={{ color:C.navy }}>
            ✅ What's Included in <span style={{ color:C.orange }}>Every Course</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji:'📹',label:'Video Lessons'     },
              { emoji:'📁',label:'Downloadable Files'},
              { emoji:'📝',label:'Assignments'       },
              { emoji:'🏆',label:'Certificate'       },
              { emoji:'♾️',label:'Lifetime Access'   },
              { emoji:'💬',label:'Community'         },
            ].map((f,i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl" style={{ background:C.gray[50] }}>
                <span className="text-2xl mb-2">{f.emoji}</span>
                <span className="text-[11px] font-semibold" style={{ color:C.gray[700] }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Why iKPACE */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon:Shield,    color:C.navy,   title:'Secure Payments', desc:'Pay via Paystack — card, mobile money, bank transfer.'  },
            { icon:Globe,     color:C.green,  title:'Learn Anywhere',  desc:'Mobile-friendly. Works on any device and connection.'   },
            { icon:BadgeCheck,color:C.orange, title:'Certified',       desc:'Earn a recognised certificate on every completion.'     },
            { icon:Rocket,    color:C.purple, title:'Career Focused',  desc:'Practical skills designed to help you earn income fast.'},
          ].map((f,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all" style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4" style={{ background:`${f.color}12` }}>
                <f.icon size={18} style={{ color:f.color }}/>
              </div>
              <h4 className="font-black text-sm mb-1.5" style={{ color:C.navy }}>{f.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color:C.gray[500] }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bundle offer */}
        <div className="mt-8 rounded-3xl p-6 sm:p-10 text-white text-center relative overflow-hidden"
          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15 bg-white"/>
          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black mb-4 border border-white/20">
              🎁 SPECIAL BUNDLE DEAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">Get 3 Courses for Just $15</h3>
            <p className="text-white/75 mb-6 text-sm max-w-md mx-auto">
              Choose any 3 courses and save $6. Build multiple income streams at once.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm bg-white hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ color:C.orange }}>
                <Zap size={15}/> Claim Bundle Deal
              </Link>
              <Link to="/"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all">
                Back to Home
              </Link>
            </div>
            <p className="text-xs text-white/50 mt-4">{totalStudents}+ students already learning with iKPACE</p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-8 text-center pb-4">
          <h2 className="text-2xl font-black mb-3" style={{ color:C.navy }}>
            Ready? <span style={{ color:C.orange }}>Enroll Today for $7.</span>
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color:C.gray[400] }}>
            Certificate included. No experience required. Start immediately after payment.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/register"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm text-white hover:shadow-xl transition-all shadow-lg"
              style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
              <Rocket size={15}/> Create Free Account
            </Link>
            <Link to="/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 hover:bg-gray-50 transition-all"
              style={{ borderColor:C.navy,color:C.navy }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
        *{box-sizing:border-box}
      `}</style>
    </div>
  )
}
