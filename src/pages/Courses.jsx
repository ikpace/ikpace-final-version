// src/pages/MyCourses.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  Heart, Clock, Users, Star, ArrowRight, BookOpen, Award,
  Search, Filter, Grid, List, Sparkles, Zap, Target, Globe,
  CheckCircle, TrendingUp, Flame, BadgeCheck, ChevronRight,
  BarChart3, Timer, GraduationCap, Rocket, Brain, Palette,
  Layers, MessageCircle, Download, Shield, X, SlidersHorizontal,
  ChevronDown, ChevronUp, Trophy, Play, Eye, Bookmark, ArrowUpRight
} from 'lucide-react'

// ─── Brand Design System ──────────────────────────────────────────────────────
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

// ─── All courses data ──────────────────────────────────────────────────────────
const allCourses = [
  {
    id:          'virtual-assistant-pro',
    title:       'Virtual Assistant Professional',
    shortDesc:   'Master client management, email, calendars & remote work tools. Land your first VA client in 8 weeks.',
    duration:    '8 Weeks',
    hours:       60,
    students:    32,
    rating:      4.9,
    reviews:     18,
    price:       7,
    category:    'business',
    categoryLabel:'Business',
    level:       'Beginner',
    emoji:       '💼',
    color:       C.navy,
    gradient:    `linear-gradient(135deg, ${C.navyDark}, ${C.navyMid})`,
    image:       'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80',
    features:    ['Email Management', 'Calendar Mastery', 'Client Acquisition'],
    outcomes:    ['Land your first VA client','Build a professional portfolio','Work remotely worldwide'],
    badge:       'Most Popular',
    badgeColor:  C.orange,
    isNew:       false,
    isHot:       true,
  },
  {
    id:          'social-media-marketing',
    title:       'Social Media Marketing',
    shortDesc:   'Build brands, run Meta Ads, master analytics & grow any social account organically from scratch.',
    duration:    '8 Weeks',
    hours:       55,
    students:    28,
    rating:      4.8,
    reviews:     15,
    price:       7,
    category:    'marketing',
    categoryLabel:'Marketing',
    level:       'Beginner',
    emoji:       '📱',
    color:       C.orange,
    gradient:    `linear-gradient(135deg, ${C.orange}, ${C.amber})`,
    image:       'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80',
    features:    ['Meta Ads', 'Content Strategy', 'Analytics & Reporting'],
    outcomes:    ['Run profitable ad campaigns','Grow brands organically','Land social media clients'],
    badge:       'In Demand',
    badgeColor:  C.orange,
    isNew:       false,
    isHot:       true,
  },
  {
    id:          'canva-graphic-design',
    title:       'Canva & Graphic Design',
    shortDesc:   'Design logos, brand identities, social kits & print materials. Build a portfolio of 10+ projects.',
    duration:    '8 Weeks',
    hours:       40,
    students:    19,
    rating:      4.7,
    reviews:     12,
    price:       7,
    category:    'design',
    categoryLabel:'Design',
    level:       'Beginner',
    emoji:       '🎨',
    color:       C.green,
    gradient:    `linear-gradient(135deg, ${C.green}, ${C.teal})`,
    image:       'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&auto=format&fit=crop&q=80',
    features:    ['Logo Design', 'Brand Identity', 'Social Media Kits'],
    outcomes:    ['Design a full brand from scratch','Offer design services as freelancer','Build a design portfolio'],
    badge:       'Creative',
    badgeColor:  C.green,
    isNew:       false,
    isHot:       false,
  },
  {
    id:          'smart-kids-coding',
    title:       'Smart Kids Coding',
    shortDesc:   'Introduce ages 6–12 to coding through Scratch. Build animations, stories, and their own games.',
    duration:    '4 Weeks',
    hours:       30,
    students:    12,
    rating:      4.9,
    reviews:     8,
    price:       7,
    category:    'kids',
    categoryLabel:'Kids',
    level:       'Beginner',
    emoji:       '🚀',
    color:       C.purple,
    gradient:    `linear-gradient(135deg, ${C.purple}, #9B59B6)`,
    image:       'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    features:    ['Scratch Coding', 'Game Design', 'Animations'],
    outcomes:    ['Build their first video game','Create animated stories','Develop coding confidence'],
    badge:       'Kids Program',
    badgeColor:  C.purple,
    isNew:       false,
    isHot:       false,
  },
  {
    id:          'freelancing-online-income',
    title:       'Freelancing & Online Income',
    shortDesc:   'Set up Upwork/Fiverr profiles, find clients, price your services & build recurring income in 4 weeks.',
    duration:    '4 Weeks',
    hours:       35,
    students:    21,
    rating:      4.8,
    reviews:     14,
    price:       7,
    category:    'business',
    categoryLabel:'Business',
    level:       'Beginner',
    emoji:       '💰',
    color:       C.amber,
    gradient:    `linear-gradient(135deg, ${C.amber}, ${C.yellow})`,
    image:       'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80',
    features:    ['Upwork & Fiverr Setup', 'Client Acquisition', 'Pricing Strategy'],
    outcomes:    ['Land first client in 30 days','Set profitable rates','Build recurring income'],
    badge:       'High Demand',
    badgeColor:  C.amber,
    isNew:       false,
    isHot:       true,
  },
  {
    id:          'ai-prompt-engineering',
    title:       'AI Prompt Engineering',
    shortDesc:   'Master ChatGPT, Claude, Midjourney & AI automation. Monetise your AI expertise in 8 weeks.',
    duration:    '8 Weeks',
    hours:       45,
    students:    18,
    rating:      5.0,
    reviews:     11,
    price:       7,
    category:    'tech',
    categoryLabel:'Tech',
    level:       'Intermediate',
    emoji:       '🤖',
    color:       '#06B6D4',
    gradient:    `linear-gradient(135deg, #06B6D4, ${C.purple})`,
    image:       'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
    features:    ['ChatGPT & Claude', 'Midjourney / DALL-E', 'AI Automation'],
    outcomes:    ['Write expert-level prompts','Automate business tasks','Sell AI services to clients'],
    badge:       '🆕 New',
    badgeColor:  '#06B6D4',
    isNew:       true,
    isHot:       true,
  },
]

// ─── Category config ───────────────────────────────────────────────────────────
const categoryConfig = [
  { id:'all',       label:'All Courses', emoji:'🎯' },
  { id:'business',  label:'Business',   emoji:'💼' },
  { id:'marketing', label:'Marketing',  emoji:'📣' },
  { id:'design',    label:'Design',     emoji:'🎨' },
  { id:'kids',      label:'Kids',       emoji:'🚀' },
  { id:'tech',      label:'Tech',       emoji:'🤖' },
]

// ─── Sort options ──────────────────────────────────────────────────────────────
const sortOptions = [
  { id:'default',   label:'Featured'     },
  { id:'rating',    label:'Top Rated'    },
  { id:'students',  label:'Most Popular' },
  { id:'duration',  label:'Shortest'     },
]

// ─── Course card (detailed) ────────────────────────────────────────────────────
function CourseCard({ course, saved, onSave, view = 'grid' }) {
  const [hovered, setHovered] = useState(false)

  if (view === 'list') {
    return (
      <div
        className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex"
        style={{ border:`1px solid ${C.gray[200]}` }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Thumbnail */}
        <div className="relative w-48 sm:w-64 flex-shrink-0 overflow-hidden">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500" style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}/>
          <div className="absolute inset-0 opacity-30" style={{ background: course.gradient }}/>
          <div className="absolute top-3 left-3">
            <span className="text-2xl">{course.emoji}</span>
          </div>
          {course.isNew && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-white" style={{ background:course.color }}>NEW</span>
            </div>
          )}
        </div>
        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background:`${course.color}15`, color:course.color }}>{course.categoryLabel}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background:C.gray[100], color:C.gray[500] }}>{course.level}</span>
              </div>
              <Link to={`/course/${course.id}`}>
                <h3 className="font-black text-base hover:underline leading-tight" style={{ color:C.navy }}>{course.title}</h3>
              </Link>
            </div>
            <button onClick={() => onSave(course.id)} className="flex-shrink-0 p-1.5 rounded-full hover:bg-gray-100 transition">
              <Heart size={16} style={{ color: saved?C.rose:C.gray[300], fill: saved?C.rose:'none' }}/>
            </button>
          </div>
          <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color:C.gray[500] }}>{course.shortDesc}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {course.features.map((f, i) => (
              <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background:`${course.color}10`, color:course.color }}>{f}</span>
            ))}
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
                className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all hover:shadow-md"
                style={{ background: course.gradient }}>
                Enroll Now <ArrowRight size={12}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div
      className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col"
      style={{ border:`1px solid ${C.gray[200]}` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img src={course.image} alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.07)' : 'scale(1)' }}
          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80' }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 opacity-30" style={{ background:course.gradient }}/>

        {/* Top: category + badge */}
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white backdrop-blur-sm" style={{ background:`${course.color}cc` }}>
            {course.categoryLabel}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {course.isHot && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black text-white flex items-center gap-0.5" style={{ background:C.rose }}>
              🔥 Hot
            </span>
          )}
        </div>

        {/* Bottom: emoji + save btn */}
        <div className="absolute bottom-3 left-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-white/90 shadow-md">
            {course.emoji}
          </div>
        </div>
        <button onClick={() => onSave(course.id)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-all shadow">
          <Heart size={14} style={{ color: saved?C.rose:C.gray[400], fill: saved?C.rose:'none' }}/>
        </button>

        {/* Hover overlay: quick view */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${hovered?'opacity-100':'opacity-0'}`}
          style={{ background:`${C.navyDark}aa` }}>
          <Link to={`/course/${course.id}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm text-white backdrop-blur-sm"
            style={{ background:`${C.orange}ee` }}>
            <Eye size={14}/> Quick View
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Level + new badge */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] px-2.5 py-0.5 rounded-full font-medium" style={{ background:C.gray[100], color:C.gray[500] }}>{course.level}</span>
          {course.isNew && (
            <span className="text-[10px] px-2.5 py-0.5 rounded-full font-black text-white" style={{ background:course.color }}>NEW</span>
          )}
        </div>

        {/* Title */}
        <Link to={`/course/${course.id}`}>
          <h3 className="font-black text-base leading-tight mb-2 hover:underline" style={{ color:C.navy }}>{course.title}</h3>
        </Link>

        {/* Description */}
        <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color:C.gray[500] }}>{course.shortDesc}</p>

        {/* Feature chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {course.features.map((f, i) => (
            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
              style={{ background:`${course.color}12`, color:course.color }}>{f}</span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 mb-4 text-xs" style={{ color:C.gray[400] }}>
          <span className="flex items-center gap-1"><Clock size={11}/>{course.duration}</span>
          <span className="flex items-center gap-1"><Users size={11}/>{course.students}+ students</span>
          <span className="flex items-center gap-1"><Star size={11} className="fill-current" style={{ color:C.yellow }}/>{course.rating}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor:C.gray[100] }}>
          <div>
            <span className="text-2xl font-black" style={{ color:C.navy }}>${course.price}</span>
            <span className="text-xs ml-1" style={{ color:C.gray[400] }}>/ course</span>
          </div>
          <Link to={`/course/${course.id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all hover:shadow-lg"
            style={{ background: course.gradient }}>
            View Details <ArrowRight size={13}/>
          </Link>
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function MyCourses() {
  const [selectedCat,  setSelectedCat]  = useState('all')
  const [savedCourses, setSavedCourses] = useState([])
  const [viewMode,     setViewMode]     = useState('grid')
  const [sortBy,       setSortBy]       = useState('default')
  const [searchQ,      setSearchQ]      = useState('')
  const [showFilters,  setShowFilters]  = useState(false)
  const [showPromo,    setShowPromo]    = useState(true)
  const [animateIn,    setAnimateIn]    = useState(false)

  useEffect(() => { setTimeout(() => setAnimateIn(true), 100) }, [])

  const toggleSave = id => setSavedCourses(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id])

  // Filter + search + sort
  let displayCourses = [...allCourses]
  if (selectedCat !== 'all') displayCourses = displayCourses.filter(c => c.category === selectedCat)
  if (searchQ.trim()) {
    const q = searchQ.toLowerCase()
    displayCourses = displayCourses.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.shortDesc.toLowerCase().includes(q) ||
      c.features.some(f => f.toLowerCase().includes(q))
    )
  }
  if (sortBy === 'rating')   displayCourses.sort((a,b) => b.rating - a.rating)
  if (sortBy === 'students') displayCourses.sort((a,b) => b.students - a.students)
  if (sortBy === 'duration') displayCourses.sort((a,b) => parseInt(a.duration) - parseInt(b.duration))

  const totalStudents  = allCourses.reduce((a,c) => a+c.students, 0)
  const totalHours     = allCourses.reduce((a,c) => a+c.hours, 0)
  const avgRating      = (allCourses.reduce((a,c) => a+c.rating,0) / allCourses.length).toFixed(1)

  return (
    <div className="min-h-screen" style={{ background:C.gray[50] }}>

      {/* ── PROMO BANNER ─────────────────────────────────────────────────── */}
      {showPromo && (
        <div className="py-2.5 text-white text-center text-sm font-semibold relative"
          style={{ background:`linear-gradient(90deg, ${C.navyDark}, ${C.navyMid}, ${C.navy})` }}>
          <span className="flex items-center justify-center gap-3">
            <span>🔥 Special offer: All 6 courses for just $7 each</span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="hidden sm:inline flex items-center gap-1">🎓 Certificate included with every course</span>
          </span>
          <button onClick={() => setShowPromo(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition">
            <X size={16}/>
          </button>
        </div>
      )}

      {/* ── HERO HEADER ──────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden py-16 lg:py-20"
        style={{ background:`linear-gradient(145deg, ${C.navyDark} 0%, ${C.navy} 55%, ${C.navyMid} 100%)` }}>
        {/* Decorative blobs */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-10" style={{ background:C.orange }}/>
        <div className="absolute -bottom-20 left-1/4 w-56 h-56 rounded-full opacity-10 blur-3xl" style={{ background:C.yellow }}/>

        <div className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center transition-all duration-700 ${animateIn?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold mb-5 border border-white/20">
            <Sparkles size={13} style={{ color:C.yellow }}/> Ghana's Most Affordable Learning Platform
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
            All Our <span style={{ color:C.orangeLight }}>Courses</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            {totalStudents}+ students enrolled across {allCourses.length} professional courses. Starting from just $7.
          </p>

          {/* Search bar */}
          <div className="relative max-w-xl mx-auto">
            <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-xl">
              <Search size={18} style={{ color:C.gray[400], flexShrink:0 }}/>
              <input
                type="text" value={searchQ} onChange={e => setSearchQ(e.target.value)}
                placeholder="Search courses, skills, tools…"
                className="flex-1 text-sm outline-none bg-transparent"
                style={{ color:C.gray[800] }}
              />
              {searchQ && (
                <button onClick={() => setSearchQ('')} className="flex-shrink-0">
                  <X size={16} style={{ color:C.gray[400] }}/>
                </button>
              )}
            </div>
          </div>

          {/* Quick stat pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {[
              { icon:'👥', label:`${totalStudents}+ Students` },
              { icon:'🎓', label:`${allCourses.length} Courses` },
              { icon:'⭐', label:`${avgRating} Avg Rating` },
              { icon:'⏱️', label:`${totalHours}+ Hours` },
              { icon:'🏆', label:'Certificate Included' },
            ].map((p,i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/15">
                <span>{p.icon}</span>
                <span className="text-white text-xs font-semibold">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ── CONTROLS ────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2">
            {categoryConfig.map(cat => (
              <button key={cat.id} onClick={() => setSelectedCat(cat.id)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: selectedCat === cat.id ? C.navy : 'white',
                  color:      selectedCat === cat.id ? '#fff' : C.gray[500],
                  border:     `1.5px solid ${selectedCat === cat.id ? C.navy : C.gray[200]}`,
                  boxShadow:  selectedCat === cat.id ? `0 4px 14px ${C.navy}30` : 'none'
                }}>
                <span>{cat.emoji}</span>{cat.label}
              </button>
            ))}
          </div>

          {/* Sort / View toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                  style={{ background:'white', border:`1.5px solid ${C.gray[200]}`, color:C.gray[600] }}>
                  {sortOptions.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:C.gray[400] }}/>
              </div>

              <span className="text-xs" style={{ color:C.gray[400] }}>
                {displayCourses.length} course{displayCourses.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-white rounded-xl p-1" style={{ border:`1.5px solid ${C.gray[200]}` }}>
              <button onClick={() => setViewMode('grid')}
                className="p-2 rounded-lg transition-all"
                style={{ background: viewMode==='grid'?C.navy:'transparent' }}>
                <Grid size={15} style={{ color: viewMode==='grid'?'#fff':C.gray[400] }}/>
              </button>
              <button onClick={() => setViewMode('list')}
                className="p-2 rounded-lg transition-all"
                style={{ background: viewMode==='list'?C.navy:'transparent' }}>
                <List size={15} style={{ color: viewMode==='list'?'#fff':C.gray[400] }}/>
              </button>
            </div>
          </div>
        </div>

        {/* ── FEATURED / NEW COURSE SPOTLIGHT ─────────────────────────── */}
        {selectedCat === 'all' && !searchQ && (
          <div className="mb-8 rounded-3xl overflow-hidden shadow-xl relative"
            style={{ background:`linear-gradient(135deg, #06B6D4, ${C.purple})` }}>
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-15 bg-white"/>
            <div className="absolute bottom-0 left-1/3 w-32 h-32 rounded-full opacity-10 bg-white blur-2xl"/>
            <div className="relative z-10 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl bg-white/20 backdrop-blur-sm border border-white/25">🤖</div>
              </div>
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2.5 py-1 rounded-full font-black bg-white/20 backdrop-blur-sm border border-white/20">🆕 JUST LAUNCHED</span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-black" style={{ background:C.yellow, color:C.gray[900] }}>5.0 ★</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black mb-1">AI Prompt Engineering Masterclass</h2>
                <p className="text-white/75 text-sm mb-4 max-w-xl">Master ChatGPT, Claude, Midjourney & AI automation workflows. The most in-demand skill of 2025. Learn to monetise AI in just 8 weeks.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['ChatGPT & Claude','Midjourney / DALL-E','AI Automation','Sell AI Services'].map((f,i) => (
                    <span key={i} className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-white/15 border border-white/20 text-white">{f}</span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <Link to="/course/ai-prompt-engineering"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm hover:shadow-xl transition-all bg-white"
                    style={{ color:'#06B6D4' }}>
                    <Rocket size={15}/> Enroll Now — $7
                  </Link>
                  <Link to="/course-curriculum/ai-prompt-engineering"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                    View Curriculum <ChevronRight size={14}/>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=200&auto=format&fit=crop&q=80"
                  alt="AI" className="w-40 h-36 object-cover rounded-2xl border-2 border-white/20 shadow-2xl"/>
              </div>
            </div>
          </div>
        )}

        {/* ── COURSE GRID / LIST ────────────────────────────────────────── */}
        {displayCourses.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-black text-lg mb-2" style={{ color:C.navy }}>No courses found</h3>
            <p className="text-sm mb-5" style={{ color:C.gray[400] }}>Try a different search term or browse all categories.</p>
            <button onClick={() => { setSearchQ(''); setSelectedCat('all') }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background:C.navy }}>
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCourses.map((course, i) => (
              <div key={course.id} className="transition-all duration-500"
                style={{ animationDelay:`${i*80}ms`, opacity: animateIn ? 1 : 0 }}>
                <CourseCard course={course} saved={savedCourses.includes(course.id)} onSave={toggleSave} view="grid"/>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {displayCourses.map((course, i) => (
              <div key={course.id} className="transition-all duration-500"
                style={{ animationDelay:`${i*60}ms` }}>
                <CourseCard course={course} saved={savedCourses.includes(course.id)} onSave={toggleSave} view="list"/>
              </div>
            ))}
          </div>
        )}

        {/* ── STATS ROW ─────────────────────────────────────────────────── */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { icon:Users,    color:C.navy,   value:`${totalStudents}+`, label:'Students Enrolled'    },
            { icon:BarChart3, color:C.orange, value:avgRating,          label:'Average Rating'        },
            { icon:Clock,    color:C.green,  value:`${totalHours}h`,   label:'Total Learning Hours'  },
            { icon:Award,    color:C.amber,  value:'100%',              label:'Certificate Included'  },
          ].map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 text-center hover:shadow-lg transition-all"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background:`${s.color}12` }}>
                <s.icon size={20} style={{ color:s.color }}/>
              </div>
              <p className="text-2xl font-black mb-0.5" style={{ color:s.color }}>{s.value}</p>
              <p className="text-xs" style={{ color:C.gray[400] }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── WHAT'S INCLUDED IN EVERY COURSE ─────────────────────────── */}
        <div className="mt-10 bg-white rounded-3xl p-7 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
          <div className="text-center mb-7">
            <h2 className="font-black text-xl" style={{ color:C.navy }}>
              ✅ What's Included in <span style={{ color:C.orange }}>Every Course</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon:'📹', label:'Video Lessons'         },
              { icon:'📁', label:'Downloadable Resources'},
              { icon:'📝', label:'Assignments & Tasks'   },
              { icon:'🏆', label:'Certificate'           },
              { icon:'♾️', label:'Lifetime Access'       },
              { icon:'💬', label:'Community Access'      },
            ].map((f,i) => (
              <div key={i} className="flex flex-col items-center text-center p-3 rounded-2xl" style={{ background:C.gray[50] }}>
                <span className="text-2xl mb-2">{f.icon}</span>
                <span className="text-xs font-semibold" style={{ color:C.gray[700] }}>{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BUNDLE OFFER BANNER ──────────────────────────────────────── */}
        <div className="mt-10 rounded-3xl p-7 sm:p-10 text-white text-center relative overflow-hidden"
          style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.orange})` }}>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15 bg-white"/>
          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full opacity-10 bg-white"/>
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
                <Zap size={16}/> Claim Bundle Deal
              </Link>
              <Link to="/courses"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 border-white/30 text-white hover:bg-white/10 transition-all">
                Browse All Courses
              </Link>
            </div>
            <p className="text-xs text-white/50 mt-4">{totalStudents}+ students already learning with iKPACE</p>
          </div>
        </div>

        {/* ── WHY iKPACE ───────────────────────────────────────────────── */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon:Shield,    color:C.navy,   title:'Secure Paystack',     desc:'Pay safely via card, mobile money, or bank transfer.' },
            { icon:Globe,     color:C.green,  title:'Learn Anywhere',      desc:'Mobile-friendly platform works on any device or speed.' },
            { icon:BadgeCheck,color:C.orange, title:'Certified',           desc:'Earn a recognised certificate on every course completion.' },
            { icon:Rocket,    color:C.purple, title:'Career Focused',      desc:'Practical skills designed to help you earn income fast.' },
          ].map((f,i) => (
            <div key={i} className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all group"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-4" style={{ background:`${f.color}12` }}>
                <f.icon size={20} style={{ color:f.color }}/>
              </div>
              <h4 className="font-black text-sm mb-1.5" style={{ color:C.navy }}>{f.title}</h4>
              <p className="text-xs leading-relaxed" style={{ color:C.gray[500] }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* ── FINAL CTA ────────────────────────────────────────────────── */}
        <div className="mt-10 text-center">
          <h2 className="text-2xl font-black mb-3" style={{ color:C.navy }}>
            Ready to Start? <span style={{ color:C.orange }}>Enroll Today.</span>
          </h2>
          <p className="text-sm mb-6 max-w-md mx-auto" style={{ color:C.gray[400] }}>
            All courses $7. Certificate included. No experience required. Start immediately.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/register"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-black text-sm text-white hover:shadow-xl transition-all shadow-lg"
              style={{ background:`linear-gradient(135deg, ${C.navy}, ${C.orange})` }}>
              <Rocket size={15}/> Create Free Account
            </Link>
            <Link to="/"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl font-bold text-sm border-2 hover:bg-gray-50 transition-all"
              style={{ borderColor:C.navy, color:C.navy }}>
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
      `}</style>
    </div>
  )
}
