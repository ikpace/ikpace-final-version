// src/pages/Programs.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen, Users, Star, Clock, ChevronRight, Award,
  Target, Zap, Sparkles, Rocket, GraduationCap,
  Globe, CheckCircle, Search, X, TrendingUp, Briefcase,
  Brain, Palette, Megaphone, Code, BarChart3, Filter,
  BadgeCheck, Shield, PlayCircle, Download, ArrowRight,
  Heart, RefreshCw, ChevronDown
} from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:    '#1A3D7C', navyDark:'#0F2655', navyMid:'#2F5EA8',
  orange:  '#FF7A00', orangeL:'#FF9A3C',
  green:   '#008F4C', yellow:'#E6B800', teal:'#0D9488',
  purple:  '#7C3AED', rose:'#E11D48',   amber:'#D97706',
  gray:{ 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',300:'#CBD5E1',
         400:'#94A3B8',500:'#64748B',600:'#475569',700:'#334155',800:'#1E293B' }
}

// ─── The 6 iKPACE courses (complete data) ─────────────────────────────────────
const COURSES = [
  {
    id:       'virtual-assistant-pro',
    slug:     'virtual-assistant-pro',
    title:    'Virtual Assistant Professional',
    subtitle: 'Land your first remote client in 8 weeks',
    desc:     'Master client management, email, calendars & remote work tools.',
    price:    7, duration:'8 Weeks', level:'Beginner', category:'Career',
    rating:   4.9, reviews:18, students:32, lessons:24, projects:3,
    emoji:    '💼', color:C.navy,
    gradient: `linear-gradient(135deg,${C.navyDark},${C.navyMid})`,
    image:    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=700&auto=format&fit=crop&q=80',
    badge:    'Most Popular', badgeColor:C.orange,
    features: ['Client Management','Email Mastery','Calendar Scheduling','Remote Work Tools'],
    outcomes: ['Land your first VA client','Build a professional portfolio','Work remotely for international clients'],
    tag:      '🔥 Hot',
  },
  {
    id:       'social-media-marketing',
    slug:     'social-media-marketing',
    title:    'Social Media Marketing',
    subtitle: 'Build brands, run Meta Ads & grow any account from scratch',
    desc:     'Master content creation, Meta Ads, analytics & brand growth.',
    price:    7, duration:'8 Weeks', level:'Beginner', category:'Marketing',
    rating:   4.8, reviews:15, students:28, lessons:28, projects:4,
    emoji:    '📱', color:C.orange,
    gradient: `linear-gradient(135deg,${C.orange},${C.amber})`,
    image:    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=700&auto=format&fit=crop&q=80',
    badge:    'In Demand', badgeColor:C.orange,
    features: ['Meta Ads Manager','Content Strategy','Analytics','Community Management'],
    outcomes: ['Run profitable ad campaigns','Grow brands organically','Land social media clients'],
    tag:      '📈 Trending',
  },
  {
    id:       'canva-graphic-design',
    slug:     'canva-graphic-design',
    title:    'Canva & Graphic Design',
    subtitle: 'Create logos, brand kits & a 10+ project portfolio',
    desc:     'Design logos, brand identities, social kits & print materials.',
    price:    7, duration:'8 Weeks', level:'Beginner', category:'Design',
    rating:   4.7, reviews:12, students:19, lessons:20, projects:5,
    emoji:    '🎨', color:C.green,
    gradient: `linear-gradient(135deg,${C.green},${C.teal})`,
    image:    'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=700&auto=format&fit=crop&q=80',
    badge:    'Creative', badgeColor:C.green,
    features: ['Logo Design','Brand Identity','Social Media Kits','Colour Theory'],
    outcomes: ['Design a full brand from scratch','Build a 10+ project portfolio','Offer design services as a freelancer'],
    tag:      '🎨 Creative',
  },
  {
    id:       'smart-kids-coding',
    slug:     'smart-kids-coding',
    title:    'Smart Kids Coding',
    subtitle: 'Fun, project-based coding for children ages 6–12',
    desc:     'Introduce ages 6–12 to coding through Scratch. Build games & animations.',
    price:    7, duration:'4 Weeks', level:'Beginner (Ages 6–12)', category:'Kids',
    rating:   4.9, reviews:8, students:12, lessons:16, projects:4,
    emoji:    '🚀', color:C.purple,
    gradient: `linear-gradient(135deg,${C.purple},#9B59B6)`,
    image:    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop&q=80',
    badge:    'Kids Program', badgeColor:C.purple,
    features: ['Scratch Programming','Game Design','Animations','Logic Building'],
    outcomes: ['Build their first video game','Create animated stories','Develop coding confidence'],
    tag:      '👶 Kids',
  },
  {
    id:       'freelancing-online-income',
    slug:     'freelancing-online-income',
    title:    'Freelancing & Online Income',
    subtitle: 'Start earning online — land your first client in 30 days',
    desc:     'Set up Upwork/Fiverr, find clients & build recurring online income.',
    price:    7, duration:'4 Weeks', level:'Beginner', category:'Business',
    rating:   4.8, reviews:14, students:21, lessons:22, projects:3,
    emoji:    '💰', color:C.amber,
    gradient: `linear-gradient(135deg,${C.amber},${C.yellow})`,
    image:    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=700&auto=format&fit=crop&q=80',
    badge:    'High Demand', badgeColor:C.amber,
    features: ['Upwork & Fiverr','Client Acquisition','Pricing Strategy','Portfolio Building'],
    outcomes: ['Land first client in 30 days','Set profitable rates','Build recurring income'],
    tag:      '💵 Earn Online',
  },
  {
    id:       'ai-prompt-engineering',
    slug:     'ai-prompt-engineering',
    title:    'AI Prompt Engineering',
    subtitle: 'Master ChatGPT, Claude & Midjourney — sell AI services',
    desc:     'Master AI tools, automation & monetise your AI expertise in 8 weeks.',
    price:    7, duration:'8 Weeks', level:'Intermediate', category:'Tech',
    rating:   5.0, reviews:11, students:18, lessons:24, projects:4,
    emoji:    '🤖', color:'#06B6D4',
    gradient: `linear-gradient(135deg,#06B6D4,${C.purple})`,
    image:    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&auto=format&fit=crop&q=80',
    badge:    '🆕 New', badgeColor:'#06B6D4',
    features: ['ChatGPT & Claude','Midjourney','AI Automation','Sell AI Services'],
    outcomes: ['Write expert-level prompts','Automate business tasks','Sell AI services to clients'],
    tag:      '🤖 Latest',
  },
]

const CATS = [
  { id:'all',      label:'All Courses',  emoji:'🎯', icon:BookOpen     },
  { id:'Career',   label:'Career',       emoji:'💼', icon:Briefcase    },
  { id:'Marketing',label:'Marketing',    emoji:'📣', icon:Megaphone    },
  { id:'Design',   label:'Design',       emoji:'🎨', icon:Palette      },
  { id:'Kids',     label:'Kids',         emoji:'🚀', icon:GraduationCap},
  { id:'Business', label:'Business',     emoji:'💰', icon:TrendingUp   },
  { id:'Tech',     label:'Tech / AI',    emoji:'🤖', icon:Brain        },
]

const SORTS = [
  { id:'popular',  label:'Most Popular' },
  { id:'rating',   label:'Top Rated'    },
  { id:'shortest', label:'Shortest'     },
]

function StarRow({ n }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_,i) => (
        <Star key={i} size={11}
          style={{ color: i<Math.floor(n)?C.yellow:C.gray[200] }}
          className={i<Math.floor(n)?'fill-current':''}/>
      ))}
    </div>
  )
}

// ─── Course Card ──────────────────────────────────────────────────────────────
function CourseCard({ course }) {
  const [hov, setHov] = useState(false)
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col group"
      style={{ border:`1px solid ${C.gray[200]}` }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {/* Image */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img src={course.image} alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform:hov?'scale(1.06)':'scale(1)' }}/>
        <div className="absolute inset-0 opacity-40" style={{ background:course.gradient }}/>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
            style={{ background:course.badgeColor }}>{course.badge}</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full font-semibold bg-white/90" style={{ color:C.gray[700] }}>
            {course.level}
          </span>
        </div>

        {/* Emoji */}
        <div className="absolute bottom-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-white/90 shadow">
          {course.emoji}
        </div>

        {/* Tag */}
        <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-1 rounded-full text-white"
          style={{ background:'rgba(0,0,0,0.45)' }}>{course.tag}</span>

        {/* Hover overlay */}
        {hov && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5"
            style={{ background:`${C.navyDark}cc` }}>
            <PlayCircle size={28} className="text-white mb-1"/>
            <p className="text-white text-xs font-bold">{course.lessons} lessons · {course.projects} projects</p>
            <div className="flex items-center gap-1 text-white text-[10px]">
              <CheckCircle size={10}/> Certificate included
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-black text-sm leading-tight mb-1" style={{ color:C.navy }}>{course.title}</h3>
        <p className="text-[11px] leading-relaxed mb-3 flex-1" style={{ color:C.gray[500] }}>{course.desc}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1 mb-3">
          {course.features.slice(0,3).map((f,i) => (
            <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold"
              style={{ background:`${course.color}12`, color:course.color }}>{f}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-[10px] mb-3" style={{ color:C.gray[400] }}>
          <span className="flex items-center gap-0.5"><Clock size={9}/>{course.duration}</span>
          <span className="flex items-center gap-0.5"><Users size={9}/>{course.students}+</span>
          <span className="flex items-center gap-0.5">
            <Star size={9} className="fill-current" style={{ color:C.yellow }}/>{course.rating}
          </span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor:C.gray[100] }}>
          <div>
            <span className="text-xl font-black" style={{ color:C.navy }}>${course.price}</span>
            <span className="text-[10px] ml-1" style={{ color:C.gray[400] }}>/ course</span>
          </div>
          <Link to={`/course/${course.slug}`}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-[11px] font-black text-white hover:opacity-90 transition-all hover:shadow-lg"
            style={{ background:course.gradient }}>
            View Course <ChevronRight size={10}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function Programs() {
  const [activeCat,  setActiveCat]  = useState('all')
  const [search,     setSearch]     = useState('')
  const [sortBy,     setSortBy]     = useState('popular')
  const [filterOpen, setFilterOpen] = useState(false)
  const [animIn,     setAnimIn]     = useState(false)

  useEffect(() => { setTimeout(() => setAnimIn(true), 80) }, [])

  let display = [...COURSES]
  if (activeCat !== 'all') display = display.filter(c => c.category === activeCat)
  if (search.trim()) {
    const q = search.toLowerCase()
    display = display.filter(c =>
      c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q) ||
      c.features.some(f => f.toLowerCase().includes(q))
    )
  }
  if (sortBy === 'popular')  display.sort((a,b) => b.students - a.students)
  if (sortBy === 'rating')   display.sort((a,b) => b.rating - a.rating)
  if (sortBy === 'shortest') display.sort((a,b) => parseInt(a.duration) - parseInt(b.duration))

  const totalStudents = COURSES.reduce((s,c) => s + c.students, 0)
  const avgRating = (COURSES.reduce((s,c)=>s+c.rating,0)/COURSES.length).toFixed(1)

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background:C.gray[50] }}>

      {/* ── PROMO STRIP ─────────────────────────────────────────────────── */}
      <div className="py-2.5 text-white text-center text-xs font-bold"
        style={{ background:`linear-gradient(90deg,${C.navyDark},${C.navyMid},${C.orange})` }}>
        🔥 Launch Offer — All 6 Courses Just $7 · Certificate Included · 130+ Students Enrolled
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24"
        style={{ background:`linear-gradient(155deg,${C.navyDark} 0%,${C.navy} 50%,${C.navyMid} 100%)` }}>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.08]" style={{ background:C.orange }}/>
        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full opacity-[0.07]" style={{ background:C.yellow }}/>

        <div className={`relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${animIn?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-bold mb-5 border border-white/20">
            <Sparkles size={13} style={{ color:C.yellow }}/> 6 Professional Courses · All $7 Each
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-4">
            Transform Your<br/><span style={{ color:C.orangeL }}>Career Today</span>
          </h1>
          <p className="text-white/70 text-base sm:text-xl max-w-2xl mx-auto mb-8">
            Learn practical, income-generating skills from industry experts.
            Certificate included with every course.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto mb-8">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl">
              <Search size={16} style={{ color:C.gray[400],flexShrink:0 }}/>
              <input type="text" value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search courses, skills, tools…"
                className="flex-1 text-sm outline-none bg-transparent" style={{ color:C.gray[800] }}/>
              {search && (
                <button onClick={()=>setSearch('')}><X size={14} style={{ color:C.gray[400] }}/></button>
              )}
            </div>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { emoji:'👥', label:`${totalStudents}+ Students`    },
              { emoji:'🎓', label:'6 Courses Available'           },
              { emoji:'⭐', label:`${avgRating} Avg Rating`       },
              { emoji:'🏆', label:'Certificate Included'          },
              { emoji:'📱', label:'Study on Any Device'           },
            ].map((p,i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="text-sm">{p.emoji}</span>
                <span className="text-white text-[11px] font-semibold">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STICKY CONTROLS ─────────────────────────────────────────────── */}
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

            {/* Right controls */}
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
            </div>
          </div>

          {filterOpen && (
            <div className="sm:hidden mt-3 pt-3 border-t" style={{ borderColor:C.gray[100] }}>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                className="w-full appearance-none px-3 py-2 rounded-xl text-xs font-semibold outline-none"
                style={{ background:C.gray[50],border:`1.5px solid ${C.gray[200]}`,color:C.gray[600] }}>
                {SORTS.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <p className="text-[11px]" style={{ color:C.gray[400] }}>
              <span className="font-black" style={{ color:C.navy }}>{display.length}</span> course{display.length!==1?'s':''} shown
            </p>
            <p className="text-[11px]" style={{ color:C.gray[400] }}>{totalStudents}+ total students</p>
          </div>
        </div>
      </div>

      {/* ── COURSES GRID ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {display.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-black text-lg mb-2" style={{ color:C.navy }}>No courses found</h3>
            <p className="text-sm mb-5" style={{ color:C.gray[400] }}>Try a different search or category.</p>
            <button onClick={()=>{ setSearch(''); setActiveCat('all') }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2 mx-auto"
              style={{ background:C.navy }}>
              <RefreshCw size={13}/> Show All Courses
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {display.map(c => <CourseCard key={c.id} course={c}/>)}
          </div>
        )}

        {/* ── STATS STRIP ───────────────────────────────────────────────── */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon:Users,    color:C.navy,   val:`${totalStudents}+`, label:'Students Enrolled'   },
            { icon:BarChart3,color:C.orange, val:avgRating,           label:'Average Rating'       },
            { icon:Award,    color:C.green,  val:'100%',              label:'Certificate Included' },
            { icon:Globe,    color:C.purple, val:'6',                 label:'Courses Available'    },
          ].map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center hover:shadow-lg transition-all"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background:`${s.color}12` }}>
                <s.icon size={18} style={{ color:s.color }}/>
              </div>
              <p className="text-2xl font-black mb-0.5" style={{ color:s.color }}>{s.val}</p>
              <p className="text-[11px]" style={{ color:C.gray[400] }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── WHY iKPACE ────────────────────────────────────────────────── */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
          <h2 className="font-black text-2xl sm:text-3xl text-center mb-3" style={{ color:C.navy }}>
            Why Choose <span style={{ color:C.orange }}>iKPACE?</span>
          </h2>
          <p className="text-sm text-center mb-10 max-w-xl mx-auto" style={{ color:C.gray[400] }}>
            Everything you need to learn, practise, and get certified — in one affordable place.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon:Target,    color:C.navy,   title:'Practical Skills',     desc:'Learn by doing with real-world projects, not just theory.' },
              { icon:BadgeCheck,color:C.orange, title:'Certificate on Finish', desc:'Earn a recognised iKPACE certificate when you complete your course.' },
              { icon:Shield,    color:C.green,  title:'Secure Payment',        desc:'All payments handled by Paystack — Ghana\'s most trusted platform.' },
              { icon:Globe,     color:C.purple, title:'Study Anywhere',        desc:'Fully mobile-friendly. Learn on your phone, tablet, or laptop.' },
            ].map((f,i) => (
              <div key={i} className="rounded-2xl p-5 hover:shadow-lg transition-all"
                style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background:`${f.color}12` }}>
                  <f.icon size={18} style={{ color:f.color }}/>
                </div>
                <h4 className="font-black text-sm mb-1.5" style={{ color:C.navy }}>{f.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color:C.gray[500] }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── WHAT'S INCLUDED ───────────────────────────────────────────── */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
          <h2 className="font-black text-xl sm:text-2xl text-center mb-8" style={{ color:C.navy }}>
            ✅ Included in <span style={{ color:C.orange }}>Every Course — $7</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { emoji:'📹',label:'Video Lessons'     },
              { emoji:'📁',label:'Downloadable Files'},
              { emoji:'📝',label:'Assignments'       },
              { emoji:'🏆',label:'Certificate'       },
              { emoji:'💬',label:'Community Access'  },
              { emoji:'📱',label:'Mobile Learning'   },
            ].map((f,i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl"
                style={{ background:C.gray[50] }}>
                <span className="text-2xl mb-2">{f.emoji}</span>
                <span className="text-[11px] font-semibold" style={{ color:C.gray[700] }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BROWSE BY CATEGORY ────────────────────────────────────────── */}
        <div className="mt-8">
          <h2 className="font-black text-xl sm:text-2xl text-center mb-8" style={{ color:C.navy }}>
            Browse by <span style={{ color:C.orange }}>Category</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATS.slice(1).map(cat => {
              const count = COURSES.filter(c=>c.category===cat.id).length
              const sample = COURSES.find(c=>c.category===cat.id)
              return (
                <button key={cat.id} onClick={() => { setActiveCat(cat.id); window.scrollTo({ top:0, behavior:'smooth' }) }}
                  className="bg-white rounded-2xl p-4 sm:p-5 text-center hover:shadow-xl hover:-translate-y-1 transition-all group"
                  style={{ border:`1px solid ${C.gray[200]}` }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl group-hover:scale-110 transition-transform"
                    style={{ background: sample?.gradient || `${C.navy}15` }}>
                    {cat.emoji}
                  </div>
                  <h4 className="font-black text-xs mb-1" style={{ color:C.navy }}>{cat.label}</h4>
                  <p className="text-[10px]" style={{ color:C.gray[400] }}>{count} course{count!==1?'s':''}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
        <div className="mt-8 bg-white rounded-3xl p-6 sm:p-8 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
          <h2 className="font-black text-xl sm:text-2xl text-center mb-3" style={{ color:C.navy }}>
            What Students Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-8">
            {[...Array(5)].map((_,i)=><Star key={i} size={14} className="fill-current" style={{ color:C.yellow }}/>)}
            <span className="font-black text-sm ml-2" style={{ color:C.navy }}>4.9</span>
            <span className="text-sm ml-1" style={{ color:C.gray[400] }}>from {totalStudents}+ students</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name:'Sarah Mensah',  role:'VA Graduate',         text:'I got my first client 3 weeks after finishing. Completely changed my income.',          init:'SM', color:C.navy   },
              { name:'Kwame Asante',  role:'Freelancing Student', text:'Great value. Practical and straight to the point. Worth every pesewa.',                 init:'KA', color:C.orange },
              { name:'Abena Osei',    role:'Canva Graduate',      text:'I now design for 4 businesses. The skills I got are immediately marketable.',           init:'AO', color:C.green  },
            ].map((t,i) => (
              <div key={i} className="rounded-2xl p-4 sm:p-5" style={{ background:C.gray[50],border:`1px solid ${C.gray[200]}` }}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_,j)=><Star key={j} size={11} className="fill-current" style={{ color:C.yellow }}/>)}
                </div>
                <p className="text-sm italic mb-4 leading-relaxed" style={{ color:C.gray[600] }}>"{t.text}"</p>
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                    style={{ background:t.color }}>{t.init}</div>
                  <div>
                    <p className="font-black text-sm" style={{ color:C.navy }}>{t.name}</p>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BUNDLE DEAL ───────────────────────────────────────────────── */}
        <div className="mt-8 rounded-3xl p-6 sm:p-10 text-white text-center relative overflow-hidden"
          style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy},${C.orange})` }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15 bg-white"/>
          <div className="relative z-10">
            <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black mb-4 border border-white/20">
              🎁 BUNDLE DEAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2">Get 3 Courses for Just $15</h3>
            <p className="text-white/75 mb-6 text-sm max-w-md mx-auto">
              Choose any 3 iKPACE courses and save $6. Build multiple income streams at once.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/pricing"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm bg-white hover:shadow-xl transition-all hover:-translate-y-0.5"
                style={{ color:C.orange }}>
                <Zap size={14}/> Claim Bundle Deal
              </Link>
              <Link to="/register"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all">
                Create Free Account <ArrowRight size={14}/>
              </Link>
            </div>
            <p className="text-xs text-white/50 mt-4">{totalStudents}+ students already learning with iKPACE</p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-8 text-center pb-4">
          <Link to="/" className="text-xs hover:underline inline-flex items-center gap-1" style={{ color:C.gray[400] }}>
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar{display:none}
        .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
        *{box-sizing:border-box}
        @media(max-width:640px){input,select,button{font-size:16px!important}}
      `}</style>
    </div>
  )
}
