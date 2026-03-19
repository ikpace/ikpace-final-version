// src/pages/Certificates.jsx
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import {
  Award, Download, Share2, ExternalLink, CheckCircle,
  Copy, Facebook, Twitter, Linkedin, Mail, Printer,
  Calendar, User, BookOpen, Star, Zap, TrendingUp,
  Shield, Eye, FileText, Clock, Hash, X, Search,
  ChevronDown, Grid3x3, LayoutList, Lock, AlertCircle,
  Hourglass, PlayCircle, Gift, Trophy, Medal, Crown,
  Gem, Sparkles, Rocket, Target, BarChart3, Activity,
  Flag, Bookmark, ThumbsUp, MessageCircle, Info,
  Check, RefreshCw, ArrowRight, BadgeCheck, GraduationCap,
  ChevronRight, Globe, Layers, Filter, Plus
} from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:    '#1A3D7C', navyDark:'#0F2655', navyMid:'#2F5EA8',
  orange:  '#FF7A00', orangeL:'#FF9A3C',
  green:   '#008F4C', yellow:'#E6B800', teal:'#0D9488',
  purple:  '#7C3AED', rose:'#E11D48',   amber:'#D97706',
  gray:{ 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',
         300:'#CBD5E1',400:'#94A3B8',500:'#64748B',
         600:'#475569',700:'#334155',800:'#1E293B',900:'#0F172A' }
}

// ─── Course gradient map ──────────────────────────────────────────────────────
const COURSE_STYLE = {
  'virtual-assistant-pro':     { gradient:`linear-gradient(135deg,${C.navyDark},${C.navyMid})`, emoji:'💼', color:C.navy   },
  'social-media-marketing':    { gradient:`linear-gradient(135deg,${C.orange},${C.amber})`,     emoji:'📱', color:C.orange },
  'canva-graphic-design':      { gradient:`linear-gradient(135deg,${C.green},${C.teal})`,       emoji:'🎨', color:C.green  },
  'smart-kids-coding':         { gradient:`linear-gradient(135deg,${C.purple},#9B59B6)`,        emoji:'🚀', color:C.purple },
  'freelancing-online-income': { gradient:`linear-gradient(135deg,${C.amber},${C.yellow})`,     emoji:'💰', color:C.amber  },
  'ai-prompt-engineering':     { gradient:`linear-gradient(135deg,#06B6D4,${C.purple})`,        emoji:'🤖', color:'#06B6D4'},
  default:                     { gradient:`linear-gradient(135deg,${C.navyDark},${C.orange})`,  emoji:'🎓', color:C.navy   },
}

function getCourseStyle(id) { return COURSE_STYLE[id] || COURSE_STYLE.default }

function gradeStyle(grade) {
  if (grade === 'A+') return { color:'#166534', bg:'#dcfce7', border:'#bbf7d0' }
  if (grade === 'A')  return { color:'#1e40af', bg:'#dbeafe', border:'#bfdbfe' }
  if (grade === 'B+') return { color:'#92400e', bg:'#fef3c7', border:'#fde68a' }
  return               { color:C.gray[600],  bg:C.gray[100], border:C.gray[200] }
}

// ─── Small reusable ───────────────────────────────────────────────────────────
function Toast({ msg, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return ()=>clearTimeout(t) }, [onClose])
  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold"
      style={{ background: type==='error' ? `linear-gradient(135deg,${C.rose},#F87171)` : `linear-gradient(135deg,${C.green},${C.teal})` }}>
      {type==='error' ? <AlertCircle size={15}/> : <Check size={15}/>} {msg}
    </div>
  )
}

function StatCard({ icon:Icon, value, label, sub, color }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border" style={{ borderColor:C.gray[200] }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${color}12` }}>
          <Icon size={18} style={{ color }}/>
        </div>
        <span className="text-2xl font-black" style={{ color }}>{value}</span>
      </div>
      <p className="text-xs font-semibold" style={{ color:C.gray[600] }}>{label}</p>
      {sub && <p className="text-[10px] mt-0.5" style={{ color:C.gray[400] }}>{sub}</p>}
    </div>
  )
}

// ─── Certificate visual preview ───────────────────────────────────────────────
function CertPreview({ cert, name, small = false }) {
  const style = getCourseStyle(cert.courses?.id)
  const sz = small ? 'h-36' : 'h-52'
  return (
    <div className={`${sz} relative overflow-hidden rounded-2xl flex flex-col items-center justify-center`}
      style={{ background:style.gradient }}>
      {/* Decorative rings */}
      {[60,100,140,180].map((s,i) => (
        <div key={i} className="absolute rounded-full border border-white/10"
          style={{ width:s,height:s,top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}/>
      ))}
      <div className="relative z-10 text-center px-4">
        <span className="text-3xl mb-1 block">{style.emoji}</span>
        <p className="text-white/50 text-[8px] font-black uppercase tracking-widest mb-0.5">iKPACE</p>
        <p className="text-white/80 text-[9px] font-bold mb-1">Certificate of Completion</p>
        {!small && <p className="text-white font-black text-sm leading-tight max-w-[160px] mx-auto">{cert.courses?.title}</p>}
        {!small && name && <p className="text-white/60 text-[10px] mt-1">{name}</p>}
      </div>
      {cert.grade && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] font-black px-2 py-0.5 rounded-full border"
            style={{ color:gradeStyle(cert.grade).color, background:gradeStyle(cert.grade).bg, borderColor:gradeStyle(cert.grade).border }}>
            {cert.grade}
          </span>
        </div>
      )}
      <div className="absolute bottom-3 left-3">
        <BadgeCheck size={14} style={{ color:'rgba(255,255,255,0.5)' }}/>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function Certificates() {
  const { profile } = useAuth()
  const certRef = useRef(null)

  const [certificates,      setCertificates]      = useState([])
  const [inProgress,        setInProgress]        = useState([])
  const [loading,           setLoading]           = useState(true)
  const [selectedCert,      setSelectedCert]      = useState(null)
  const [showViewModal,     setShowViewModal]      = useState(false)
  const [showShareModal,    setShowShareModal]     = useState(false)
  const [searchTerm,        setSearchTerm]        = useState('')
  const [filterBy,          setFilterBy]          = useState('all')
  const [sortBy,            setSortBy]            = useState('recent')
  const [viewMode,          setViewMode]          = useState('grid')
  const [copied,            setCopied]            = useState(false)
  const [downloading,       setDownloading]       = useState(false)
  const [activeTab,         setActiveTab]         = useState('earned')
  const [toast,             setToast]             = useState(null)
  const [expandedCourse,    setExpandedCourse]    = useState(null)

  const showToast = (msg, type='success') => setToast({ msg, type })

  useEffect(() => { fetchCertificates(); seedInProgress() }, [profile])

  const fetchCertificates = async () => {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*, courses(id,title,description,thumbnail_url,duration,level,instructor,category)')
        .eq('user_id', profile?.id)
        .order('issued_date', { ascending:false })
      if (error) throw error
      setCertificates(data?.length ? data : mockCerts())
    } catch {
      setCertificates(mockCerts())
    } finally { setLoading(false) }
  }

  const mockCerts = () => [
    { id:'c1', certificate_number:'IKPACE-2026-001247', issued_date:'2026-03-15T10:30:00Z', expiry_date:'2029-03-15T10:30:00Z', verification_url:'https://verify.ikpace.com/IKPACE-2026-001247', grade:'A+', score:98, hours_completed:60, courses:{ id:'virtual-assistant-pro',     title:'Virtual Assistant Professional', description:'Master VA skills, client management, and remote work tools',    duration:'8 Weeks', level:'Beginner', instructor:'Amara Osei',   category:'Career'    } },
    { id:'c2', certificate_number:'IKPACE-2026-001248', issued_date:'2026-02-28T14:20:00Z', expiry_date:'2029-02-28T14:20:00Z', verification_url:'https://verify.ikpace.com/IKPACE-2026-001248', grade:'A',  score:95, hours_completed:48, courses:{ id:'social-media-marketing',    title:'Social Media Marketing',         description:'Master content creation, ads, and growth strategies',          duration:'8 Weeks', level:'Beginner', instructor:'Kofi Asante',  category:'Marketing' } },
    { id:'c3', certificate_number:'IKPACE-2026-001249', issued_date:'2026-01-20T09:15:00Z', expiry_date:'2029-01-20T09:15:00Z', verification_url:'https://verify.ikpace.com/IKPACE-2026-001249', grade:'A',  score:94, hours_completed:32, courses:{ id:'canva-graphic-design',      title:'Canva & Graphic Design',          description:'Create stunning designs, logos, and branding materials',        duration:'8 Weeks', level:'Beginner', instructor:'Esi Darkwah',  category:'Design'    } },
  ]

  const seedInProgress = () => setInProgress([
    { id:'p1', slug:'ai-prompt-engineering',     title:'AI Prompt Engineering',          emoji:'🤖', progress:62, done:15, total:24, instructor:'Nana Addo',    category:'Tech',     est:'2 weeks', spent:'9h',  color:'#06B6D4', gradient:`linear-gradient(135deg,#06B6D4,${C.purple})`, next:'Week 4: Advanced Prompts', achievements:[{name:'Fast Learner',emoji:'⚡',earned:true},{name:'Quiz Master',emoji:'📝',earned:true},{name:'Perfect Score',emoji:'🎯',earned:false}] },
    { id:'p2', slug:'freelancing-online-income', title:'Freelancing & Online Income',     emoji:'💰', progress:38, done:8,  total:22, instructor:'Yaa Asantewaa',category:'Business', est:'3 weeks', spent:'7h',  color:C.amber,   gradient:`linear-gradient(135deg,${C.amber},${C.yellow})`, next:'Week 3: Client Acquisition', achievements:[{name:'Hustler',emoji:'💼',earned:true},{name:'First Client',emoji:'🤝',earned:false}] },
    { id:'p3', slug:'smart-kids-coding',         title:'Smart Kids Coding',               emoji:'🚀', progress:20, done:3,  total:16, instructor:'Ms. Akosua',   category:'Kids',     est:'4 weeks', spent:'3h',  color:C.purple,  gradient:`linear-gradient(135deg,${C.purple},#9B59B6)`, next:'Week 2: Animations & Stories', achievements:[{name:'Code Starter',emoji:'🖥️',earned:true}] },
  ])

  const fmtDate     = (d) => new Date(d).toLocaleDateString('en-US',{ year:'numeric',month:'long',day:'numeric' })
  const fmtShort    = (d) => new Date(d).toLocaleDateString('en-US',{ year:'numeric',month:'short',day:'numeric' })

  const handleDownload = async (cert) => {
    setDownloading(true)
    try {
      await new Promise(r=>setTimeout(r,1500))
      showToast(`Certificate downloaded: ${cert.courses.title}`)
    } catch { showToast('Download failed. Please try again.', 'error') }
    finally { setDownloading(false) }
  }

  const handlePrint = (cert) => {
    const w = window.open('','_blank')
    w.document.write(`<!DOCTYPE html><html><head><title>iKPACE Certificate</title>
    <style>
      * { margin:0; padding:0; box-sizing:border-box }
      body { font-family:'Georgia',serif; background:#fff; }
      .page { width:100vw; height:100vh; display:flex; align-items:center; justify-content:center; }
      .cert { width:720px; min-height:480px; border:12px solid #1A3D7C; padding:48px; text-align:center; position:relative; background:#fff; }
      .cert::before { content:''; position:absolute; inset:12px; border:2px solid #FF7A00; pointer-events:none }
      .logo { font-size:52px; font-weight:900; color:#1A3D7C; letter-spacing:-2px; margin-bottom:4px }
      .sub { font-size:13px; color:#64748B; letter-spacing:4px; text-transform:uppercase; margin-bottom:28px }
      .title { font-size:24px; color:#334155; margin-bottom:24px }
      .name { font-size:40px; font-weight:700; color:#1A3D7C; margin:12px 0; border-bottom:2px solid #FF7A00; display:inline-block; padding-bottom:8px }
      .course { font-size:22px; color:#FF7A00; font-weight:700; margin:12px 0 28px }
      .meta { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin:24px 0; padding:16px; background:#F8FAFC; border-radius:8px }
      .meta-item { text-align:center }
      .meta-label { font-size:10px; color:#94A3B8; text-transform:uppercase; letter-spacing:1px }
      .meta-value { font-size:18px; font-weight:700; color:#1A3D7C }
      .verify { font-size:10px; color:#94A3B8; margin-top:24px; border-top:1px solid #E2E8F0; padding-top:16px }
    </style></head><body>
    <div class="page"><div class="cert">
      <div class="logo">iKPACE</div>
      <div class="sub">Learn Smarter · Earn Better</div>
      <div class="title">Certificate of Completion</div>
      <p style="color:#64748B;font-size:14px">This certifies that</p>
      <div class="name">${profile?.full_name || 'Student Name'}</div>
      <p style="color:#64748B;font-size:14px;margin:8px 0">has successfully completed</p>
      <div class="course">${cert.courses.title}</div>
      <div class="meta">
        <div class="meta-item"><div class="meta-label">Grade</div><div class="meta-value">${cert.grade}</div></div>
        <div class="meta-item"><div class="meta-label">Score</div><div class="meta-value">${cert.score}%</div></div>
        <div class="meta-item"><div class="meta-label">Issued</div><div class="meta-value" style="font-size:13px">${fmtShort(cert.issued_date)}</div></div>
      </div>
      <div class="verify">Certificate #: ${cert.certificate_number} · Verify: ${cert.verification_url}</div>
    </div></div></body></html>`)
    w.document.close(); w.print()
  }

  const handleShareLink = (platform, cert) => {
    const c = cert || selectedCert
    if (!c) return
    const url  = encodeURIComponent(c.verification_url)
    const text = encodeURIComponent(`I just earned my "${c.courses.title}" certificate from iKPACE! 🎓 #iKPACE #OnlineLearning`)
    const map  = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter:  `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      email:    `mailto:?subject=${encodeURIComponent('My iKPACE Certificate')}&body=${text}%0A%0AVerify%3A%20${url}`,
    }
    if (map[platform]) window.open(map[platform], '_blank')
  }

  const copyLink = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true); showToast('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Filtered + sorted certs ───────────────────────────────────────────────
  const displayed = certificates
    .filter(c => {
      if (filterBy === 'high-score') return c.score >= 95
      if (filterBy === 'recent') { const d=new Date(); d.setMonth(d.getMonth()-3); return new Date(c.issued_date)>d }
      return true
    })
    .filter(c => c.courses.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.certificate_number.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a,b) => {
      if (sortBy==='name')  return a.courses.title.localeCompare(b.courses.title)
      if (sortBy==='grade') return b.score - a.score
      return new Date(b.issued_date) - new Date(a.issued_date)
    })

  const stats = {
    total:   certificates.length,
    inProg:  inProgress.length,
    avgScore:certificates.length ? Math.round(certificates.reduce((s,c)=>s+c.score,0)/certificates.length) : 0,
    highest: certificates.length ? Math.max(...certificates.map(c=>c.score)) : 0,
    hours:   certificates.reduce((s,c)=>s+(c.hours_completed||0), 0),
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:C.gray[50] }}>
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black animate-pulse"
          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
        <div className="w-36 h-1.5 rounded-full overflow-hidden mx-auto" style={{ background:C.gray[200] }}>
          <div className="h-full rounded-full animate-pulse" style={{ width:'70%', background:`linear-gradient(90deg,${C.navy},${C.orange})` }}/>
        </div>
        <p className="mt-3 text-sm" style={{ color:C.gray[400] }}>Loading your certificates…</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen pb-12" style={{ background:C.gray[50] }}>
      {toast && <Toast {...toast} onClose={() => setToast(null)}/>}

      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden"
        style={{ background:`linear-gradient(145deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>
        <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-[0.07]" style={{ background:C.orange }}/>
        <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full opacity-[0.06]" style={{ background:C.yellow }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-white/40 text-xs mb-5">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11}/>
            <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
            <ChevronRight size={11}/>
            <span className="text-white/80 font-semibold">Certificates</span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background:`${C.orange}25` }}>
                  <Award size={22} style={{ color:C.orangeL }}/>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-white">My Certificates</h1>
              </div>
              <p className="text-white/50 text-sm max-w-lg">
                Track your earned certificates, in-progress courses, and share your achievements with the world.
              </p>
            </div>

            {/* Hero stats pills */}
            <div className="flex flex-wrap gap-2.5">
              {[
                { emoji:'🏆', val:stats.total,   label:'Earned'     },
                { emoji:'⚡', val:stats.avgScore+'%', label:'Avg Score' },
                { emoji:'⏱️', val:stats.hours+'h', label:'Learning'   },
                { emoji:'📚', val:stats.inProg,  label:'In Progress' },
              ].map((p,i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-2xl">
                  <span className="text-base">{p.emoji}</span>
                  <div>
                    <p className="font-black text-white text-sm leading-none">{p.val}</p>
                    <p className="text-white/40 text-[10px]">{p.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="border-t border-white/10 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex">
            {[
              { id:'earned',      label:`Earned (${certificates.length})`, emoji:'🏆' },
              { id:'in-progress', label:`In Progress (${inProgress.length})`, emoji:'⏳' },
              { id:'showcase',    label:'Showcase', emoji:'✨' },
            ].map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                className="flex items-center gap-1.5 px-5 py-3.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all"
                style={{ borderBottomColor:activeTab===t.id?C.orange:'transparent', color:activeTab===t.id?'white':'rgba(255,255,255,0.4)' }}>
                <span>{t.emoji}</span><span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-7">
          <StatCard icon={Award}     value={stats.total}    label="Certificates Earned" sub="Total completions"       color={C.navy}   />
          <StatCard icon={Hourglass} value={stats.inProg}   label="In Progress"         sub="Actively studying"       color={C.orange} />
          <StatCard icon={Star}      value={stats.avgScore+'%'} label="Average Score"   sub="Across all courses"      color={C.navyMid}/>
          <StatCard icon={Zap}       value={stats.highest+'%'}  label="Highest Score"   sub="Personal best"           color={C.green}  />
          <StatCard icon={Clock}     value={stats.hours+'h'}    label="Hours Completed" sub="Total learning time"     color={C.amber}  />
        </div>

        {/* ══ EARNED TAB ═════════════════════════════════════════════════ */}
        {activeTab === 'earned' && (
          <div>
            {/* Controls bar */}
            {certificates.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Search */}
                <div className="relative flex-1 max-w-xs">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}/>
                  <input value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}
                    placeholder="Search certificates…"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                    style={{ background:'white', border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}
                    onFocus={e=>e.target.style.borderColor=C.navy}
                    onBlur={e=>e.target.style.borderColor=C.gray[200]}/>
                </div>
                {/* Filter */}
                <div className="relative">
                  <select value={filterBy} onChange={e=>setFilterBy(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2.5 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                    style={{ background:'white', border:`1.5px solid ${C.gray[200]}`, color:C.gray[600] }}>
                    <option value="all">All Certificates</option>
                    <option value="recent">Last 3 Months</option>
                    <option value="high-score">High Scores (95%+)</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:C.gray[400] }}/>
                </div>
                {/* Sort */}
                <div className="relative">
                  <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-7 py-2.5 rounded-xl text-xs font-semibold outline-none cursor-pointer"
                    style={{ background:'white', border:`1.5px solid ${C.gray[200]}`, color:C.gray[600] }}>
                    <option value="recent">Most Recent</option>
                    <option value="name">Course Name</option>
                    <option value="grade">Highest Score</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:C.gray[400] }}/>
                </div>
                {/* View toggle */}
                <div className="flex border rounded-xl overflow-hidden" style={{ borderColor:C.gray[200] }}>
                  <button onClick={()=>setViewMode('grid')}
                    className="px-3 py-2.5 transition-all"
                    style={{ background:viewMode==='grid'?C.navy:'white', color:viewMode==='grid'?'white':C.gray[500] }}>
                    <Grid3x3 size={15}/>
                  </button>
                  <button onClick={()=>setViewMode('list')}
                    className="px-3 py-2.5 transition-all"
                    style={{ background:viewMode==='list'?C.navy:'white', color:viewMode==='list'?'white':C.gray[500] }}>
                    <LayoutList size={15}/>
                  </button>
                </div>
              </div>
            )}

            {/* Empty state */}
            {certificates.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border p-16 text-center" style={{ borderColor:C.gray[200] }}>
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5" style={{ background:`${C.navy}10` }}>
                  <Award size={36} style={{ color:C.navy }}/>
                </div>
                <h2 className="font-black text-xl mb-2" style={{ color:C.navy }}>No Certificates Yet</h2>
                <p className="text-sm mb-6 max-w-xs mx-auto" style={{ color:C.gray[400] }}>
                  Complete any iKPACE course to earn your first recognised certificate.
                </p>
                <Link to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm text-white hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                  <BookOpen size={15}/> Browse Courses
                </Link>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayed.map(cert => {
                  const cs = getCourseStyle(cert.courses.id)
                  return (
                    <div key={cert.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all border"
                      style={{ borderColor:C.gray[200] }}>
                      {/* Certificate visual */}
                      <div className="cursor-pointer" onClick={() => { setSelectedCert(cert); setShowViewModal(true) }}>
                        <CertPreview cert={cert} name={profile?.full_name}/>
                      </div>
                      {/* Details */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-black text-sm leading-tight" style={{ color:C.navy }}>{cert.courses.title}</h3>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0 border"
                            style={{ color:gradeStyle(cert.grade).color, background:gradeStyle(cert.grade).bg, borderColor:gradeStyle(cert.grade).border }}>
                            {cert.grade}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] mb-4" style={{ color:C.gray[400] }}>
                          <span className="flex items-center gap-1"><User size={9}/> {cert.courses.instructor}</span>
                          <span className="flex items-center gap-1"><Calendar size={9}/> {fmtShort(cert.issued_date)}</span>
                          <span className="flex items-center gap-1"><Hash size={9}/> {cert.certificate_number}</span>
                          <span className="flex items-center gap-1"><Star size={9}/> {cert.score}%</span>
                        </div>
                        {/* Actions */}
                        <div className="grid grid-cols-4 gap-1.5">
                          {[
                            { icon:Eye,       label:'View',    action:()=>{ setSelectedCert(cert); setShowViewModal(true) }, bg:`${C.navy}10`,   color:C.navy   },
                            { icon:Download,  label:'PDF',     action:()=>handleDownload(cert),                              bg:`${C.green}10`,  color:C.green  },
                            { icon:Share2,    label:'Share',   action:()=>{ setSelectedCert(cert); setShowShareModal(true) },bg:`${C.orange}10`, color:C.orange },
                            { icon:Printer,   label:'Print',   action:()=>handlePrint(cert),                                 bg:`${C.gray[100]}`,color:C.gray[500] },
                          ].map((a,i) => (
                            <button key={i} onClick={a.action}
                              className="flex flex-col items-center gap-0.5 py-2 rounded-xl text-[9px] font-bold hover:shadow-md transition-all"
                              style={{ background:a.bg, color:a.color }}>
                              <a.icon size={13}/>
                              {a.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              /* List view */
              <div className="space-y-3">
                {displayed.map(cert => {
                  const cs = getCourseStyle(cert.courses.id)
                  return (
                    <div key={cert.id} className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition-all"
                      style={{ borderColor:C.gray[200] }}>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
                          <CertPreview cert={cert} small/>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-black text-sm truncate" style={{ color:C.navy }}>{cert.courses.title}</h3>
                            <span className="text-[10px] font-black px-2 py-0.5 rounded-full border flex-shrink-0"
                              style={{ color:gradeStyle(cert.grade).color, background:gradeStyle(cert.grade).bg, borderColor:gradeStyle(cert.grade).border }}>
                              {cert.grade}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[10px]" style={{ color:C.gray[400] }}>
                            <span className="flex items-center gap-1"><Hash size={9}/> {cert.certificate_number}</span>
                            <span className="flex items-center gap-1"><Calendar size={9}/> {fmtShort(cert.issued_date)}</span>
                            <span className="flex items-center gap-1"><User size={9}/> {cert.courses.instructor}</span>
                            <span className="flex items-center gap-1"><Star size={9}/> {cert.score}%</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {[
                            { icon:Eye,      action:()=>{ setSelectedCert(cert); setShowViewModal(true) }, title:'View'  },
                            { icon:Download, action:()=>handleDownload(cert),                              title:'Download' },
                            { icon:Share2,   action:()=>{ setSelectedCert(cert); setShowShareModal(true) },title:'Share' },
                            { icon:Printer,  action:()=>handlePrint(cert),                                 title:'Print' },
                          ].map((a,i) => (
                            <button key={i} onClick={a.action} title={a.title}
                              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all"
                              style={{ color:C.gray[500] }}>
                              <a.icon size={15}/>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ IN PROGRESS TAB ════════════════════════════════════════════ */}
        {activeTab === 'in-progress' && (
          <div>
            {inProgress.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-sm border p-16 text-center" style={{ borderColor:C.gray[200] }}>
                <Hourglass size={36} className="mx-auto mb-4" style={{ color:C.gray[300] }}/>
                <h2 className="font-black text-lg mb-2" style={{ color:C.navy }}>No Courses In Progress</h2>
                <p className="text-sm mb-5" style={{ color:C.gray[400] }}>Start a new course today and earn your next certificate!</p>
                <Link to="/courses" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                  <Plus size={14}/> Browse Courses
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {inProgress.map(course => {
                  const isExpanded = expandedCourse === course.id
                  const remaining  = course.total - course.done
                  return (
                    <div key={course.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-lg transition-all"
                      style={{ borderColor:C.gray[200] }}>
                      {/* Course header */}
                      <div className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Gradient avatar */}
                          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                            style={{ background:course.gradient }}>{course.emoji}</div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3 mb-2">
                              <div>
                                <h3 className="font-black text-sm leading-tight" style={{ color:C.navy }}>{course.title}</h3>
                                <p className="text-[10px] mt-0.5" style={{ color:C.gray[400] }}>
                                  {course.instructor} · {course.category}
                                </p>
                              </div>
                              <span className="text-[10px] font-black px-2.5 py-1 rounded-full text-white flex-shrink-0"
                                style={{ background: course.progress>=75?C.green:course.progress>=50?C.navyMid:C.orange }}>
                                {course.progress}%
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="h-2.5 rounded-full overflow-hidden mb-3" style={{ background:C.gray[200] }}>
                              <div className="h-full rounded-full transition-all duration-700"
                                style={{ width:`${course.progress}%`, background:course.gradient }}/>
                            </div>

                            {/* Stats grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                              {[
                                { label:'Lessons',       val:`${course.done}/${course.total}` },
                                { label:'Time Spent',    val:course.spent                     },
                                { label:'Est. Left',     val:course.est                       },
                                { label:'Category',      val:course.category                  },
                              ].map((s,i) => (
                                <div key={i} className="p-2 rounded-xl text-center" style={{ background:C.gray[50] }}>
                                  <p className="text-[9px] uppercase tracking-wider mb-0.5" style={{ color:C.gray[400] }}>{s.label}</p>
                                  <p className="text-[11px] font-black truncate" style={{ color:C.navy }}>{s.val}</p>
                                </div>
                              ))}
                            </div>

                            {/* Next action */}
                            <div className="flex items-center gap-2">
                              <ArrowRight size={11} style={{ color:course.color, flexShrink:0 }}/>
                              <span className="text-[11px] font-semibold truncate" style={{ color:C.gray[600] }}>
                                Next: {course.next}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action row */}
                        <div className="flex items-center justify-between mt-4 pt-4 border-t gap-3" style={{ borderColor:C.gray[100] }}>
                          <button onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border hover:bg-gray-50 transition-all"
                            style={{ borderColor:C.gray[200], color:C.gray[500] }}>
                            {isExpanded ? <><ChevronDown size={12}/> Less</> : <><Layers size={12}/> Details</>}
                          </button>
                          <div className="flex items-center gap-2">
                            <Link to={`/course/${course.slug}`}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border hover:bg-gray-50 transition-all"
                              style={{ borderColor:C.gray[200], color:C.gray[600] }}>
                              <Eye size={11}/> Overview
                            </Link>
                            <Link to={`/test-course-player/${course.slug}`}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all"
                              style={{ background:course.gradient }}>
                              <PlayCircle size={12}/> Continue
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Expanded details */}
                      {isExpanded && (
                        <div className="border-t px-5 py-4 space-y-4" style={{ borderColor:C.gray[100], background:C.gray[50] }}>
                          {/* Milestone tracker */}
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-wider mb-3" style={{ color:C.gray[400] }}>
                              Progress Milestones
                            </p>
                            <div className="flex items-center gap-2">
                              {[25,50,75,100].map((m,i,arr) => (
                                <div key={m} className="flex items-center flex-1">
                                  <div className="flex flex-col items-center w-full">
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-1.5 transition-all"
                                      style={{ background:course.progress>=m?course.color:C.gray[200] }}>
                                      {course.progress>=m
                                        ? <Check size={14} className="text-white"/>
                                        : <span className="text-[9px] font-black" style={{ color:C.gray[400] }}>{m}%</span>}
                                    </div>
                                    <p className="text-[9px] font-bold" style={{ color:course.progress>=m?course.color:C.gray[400] }}>
                                      {m===100?'Done':m+' %'}
                                    </p>
                                  </div>
                                  {i < arr.length-1 && (
                                    <div className="flex-1 h-0.5 mx-1 mb-4 rounded-full"
                                      style={{ background:course.progress>m?course.color:C.gray[200] }}/>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Lesson badges */}
                          {course.achievements.length > 0 && (
                            <div>
                              <p className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color:C.gray[400] }}>
                                Lesson Badges
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {course.achievements.map((a,i) => (
                                  <div key={i}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold border transition-all ${a.earned?'':'opacity-40'}`}
                                    style={{ background:a.earned?`${course.color}10`:'white', borderColor:a.earned?`${course.color}30`:C.gray[200], color:a.earned?course.color:C.gray[400] }}>
                                    <span>{a.emoji}</span>{a.name}
                                    {a.earned && <Check size={9}/>}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Certificate status card */}
                          <div className="flex items-center gap-3 p-4 rounded-2xl border-2"
                            style={{ borderColor:`${course.color}25`, background:course.progress>=75?`${course.color}06`:'white' }}>
                            {course.progress >= 100
                              ? <><CheckCircle size={18} style={{ color:C.green }}/><p className="text-xs font-bold" style={{ color:C.green }}>🎉 Complete! Download your certificate from the Earned tab.</p></>
                              : course.progress >= 75
                                ? <><Hourglass size={18} style={{ color:course.color }}/><p className="text-xs font-bold" style={{ color:course.color }}>Almost there! Just {remaining} lessons left to unlock your certificate.</p></>
                                : <>
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:C.gray[100] }}>
                                      <Lock size={14} style={{ color:C.gray[400] }}/>
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-xs font-bold" style={{ color:C.gray[600] }}>Certificate locked — complete {remaining} more lessons to unlock.</p>
                                      <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background:C.gray[200] }}>
                                        <div className="h-full rounded-full" style={{ width:`${course.progress}%`, background:course.gradient }}/>
                                      </div>
                                    </div>
                                  </>
                            }
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ SHOWCASE TAB ═══════════════════════════════════════════════ */}
        {activeTab === 'showcase' && (
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border mb-6" style={{ borderColor:C.gray[200] }}>
              <h2 className="font-black text-lg mb-1" style={{ color:C.navy }}>Your Certificate Showcase</h2>
              <p className="text-sm mb-5" style={{ color:C.gray[400] }}>
                Share your public profile link with employers, clients, and your network.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono" style={{ color:C.gray[600] }}>
                  https://ikpace.com/showcase/{profile?.id || 'your-id'}
                </div>
                <button onClick={() => copyLink(`https://ikpace.com/showcase/${profile?.id || 'your-id'}`)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white hover:opacity-90 transition-all flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                  {copied ? <><Check size={13}/> Copied!</> : <><Copy size={13}/> Copy Link</>}
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  { platform:'linkedin', bg:'#0A66C2', icon:Linkedin, label:'Add to LinkedIn' },
                  { platform:'twitter',  bg:'#1DA1F2', icon:Twitter,  label:'Tweet it'        },
                  { platform:'facebook', bg:'#1877F2', icon:Facebook, label:'Share on Facebook'},
                ].map((s,i) => (
                  <button key={i} onClick={() => handleShareLink(s.platform, certificates[0])}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all"
                    style={{ background:s.bg }}>
                    <s.icon size={14}/>{s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase grid */}
            {certificates.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-white border" style={{ borderColor:C.gray[200] }}>
                <Sparkles size={32} className="mx-auto mb-3" style={{ color:C.gray[300] }}/>
                <p className="text-sm font-bold mb-1" style={{ color:C.navy }}>No certificates to showcase yet</p>
                <p className="text-xs" style={{ color:C.gray[400] }}>Complete a course to add your first certificate here.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificates.map(cert => {
                  const cs = getCourseStyle(cert.courses.id)
                  return (
                    <div key={cert.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border hover:shadow-xl transition-all"
                      style={{ borderColor:C.gray[200] }}>
                      <CertPreview cert={cert} name={profile?.full_name}/>
                      <div className="p-4">
                        <h3 className="font-black text-sm mb-1" style={{ color:C.navy }}>{cert.courses.title}</h3>
                        <div className="flex items-center gap-2 text-[10px] mb-3" style={{ color:C.gray[400] }}>
                          <BadgeCheck size={11} style={{ color:C.green }}/>
                          <span>Verified · {fmtShort(cert.issued_date)}</span>
                          <span className="ml-auto font-black" style={{ color:cs.color }}>Score: {cert.score}%</span>
                        </div>
                        <div className="flex gap-1.5">
                          {[
                            { platform:'linkedin', bg:'#0A66C2', Icon:Linkedin },
                            { platform:'twitter',  bg:'#1DA1F2', Icon:Twitter  },
                            { platform:'facebook', bg:'#1877F2', Icon:Facebook },
                            { platform:'email',    bg:C.gray[500], Icon:Mail   },
                          ].map((s,i) => (
                            <button key={i} onClick={() => handleShareLink(s.platform, cert)}
                              className="flex-1 flex items-center justify-center py-2 rounded-xl text-white hover:opacity-90 transition-all"
                              style={{ background:s.bg }}>
                              <s.Icon size={13}/>
                            </button>
                          ))}
                          <button onClick={() => copyLink(cert.verification_url)}
                            className="flex-1 flex items-center justify-center py-2 rounded-xl text-white hover:opacity-90 transition-all"
                            style={{ background:C.navy }}>
                            <Copy size={13}/>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── INFO SECTION ────────────────────────────────────────────── */}
        <div className="mt-10 rounded-2xl p-6 sm:p-8" style={{ background:`${C.navy}06`, border:`1px solid ${C.navy}15` }}>
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background:`${C.orange}15` }}>
              <Award size={22} style={{ color:C.orange }}/>
            </div>
            <div>
              <h3 className="font-black text-base mb-3" style={{ color:C.navy }}>About iKPACE Certificates</h3>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  { icon:CheckCircle, color:C.green,  text:'Industry-recognised with unique verification numbers'   },
                  { icon:Share2,      color:C.navyMid,text:'Shareable on LinkedIn, resume, and professional profiles' },
                  { icon:Download,    color:C.orange, text:'Downloadable PDF for printing and offline sharing'       },
                  { icon:Globe,       color:C.teal,   text:'Publicly verifiable at verify.ikpace.com'               },
                  { icon:BadgeCheck,  color:C.purple, text:'Issued instantly upon 100% course completion'            },
                  { icon:Lock,        color:C.amber,  text:'Permanently stored — never expires or gets deleted'      },
                ].map((f,i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <f.icon size={14} style={{ color:f.color, flexShrink:0 }}/>
                    <span className="text-xs" style={{ color:C.gray[600] }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ CERTIFICATE VIEW MODAL ════════════════════════════════════════ */}
      {showViewModal && selectedCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal header */}
            <div className="sticky top-0 bg-white border-b rounded-t-3xl px-6 py-4 flex items-center justify-between z-10"
              style={{ borderColor:C.gray[200] }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}12` }}>
                  <Award size={15} style={{ color:C.navy }}/>
                </div>
                <p className="font-black text-sm" style={{ color:C.navy }}>Certificate of Completion</p>
              </div>
              <button onClick={() => setShowViewModal(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={16} style={{ color:C.gray[400] }}/>
              </button>
            </div>

            {/* Certificate design */}
            <div className="p-6 sm:p-8" ref={certRef}>
              <div className="border-8 p-8 rounded-xl" style={{ borderColor:C.navy }}>
                <div className="absolute inset-[20px] border-2 border-orange-300 rounded-lg pointer-events-none hidden"/>
                <div className="text-center">
                  <p className="font-black text-[10px] uppercase tracking-widest mb-1" style={{ color:C.gray[400] }}>iKPACE · Learn Smarter, Earn Better</p>
                  <h1 className="font-black text-4xl mb-1" style={{ color:C.navy }}>iKPACE</h1>
                  <h2 className="text-xl mb-6" style={{ color:C.gray[600] }}>Certificate of Completion</h2>
                  <p className="text-sm mb-2" style={{ color:C.gray[500] }}>This certifies that</p>
                  <p className="font-black text-3xl mb-3" style={{ color:C.navy }}>{profile?.full_name || 'Student Name'}</p>
                  <p className="text-sm mb-2" style={{ color:C.gray[500] }}>has successfully completed the course</p>
                  <p className="font-black text-xl mb-6" style={{ color:C.orange }}>{selectedCert.courses.title}</p>
                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6 p-4 rounded-2xl" style={{ background:C.gray[50] }}>
                    {[
                      { label:'Grade',       val:selectedCert.grade         },
                      { label:'Score',       val:`${selectedCert.score}%`   },
                      { label:'Issued',      val:fmtShort(selectedCert.issued_date) },
                    ].map((d,i) => (
                      <div key={i} className="text-center">
                        <p className="text-[10px] uppercase tracking-wider mb-1" style={{ color:C.gray[400] }}>{d.label}</p>
                        <p className="font-black text-sm" style={{ color:C.navy }}>{d.val}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4" style={{ borderColor:C.gray[200] }}>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>Certificate #: {selectedCert.certificate_number}</p>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>Verify: {selectedCert.verification_url}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal actions */}
            <div className="sticky bottom-0 bg-white border-t rounded-b-3xl px-6 py-4 flex flex-wrap gap-2 justify-end"
              style={{ borderColor:C.gray[200] }}>
              <button onClick={() => handlePrint(selectedCert)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border hover:bg-gray-50 transition-all"
                style={{ borderColor:C.gray[200], color:C.gray[600] }}>
                <Printer size={13}/> Print
              </button>
              <button onClick={() => { setShowViewModal(false); setShowShareModal(true) }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white"
                style={{ background:`${C.orange}` }}>
                <Share2 size={13}/> Share
              </button>
              <button onClick={() => handleDownload(selectedCert)} disabled={downloading}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                {downloading ? <><RefreshCw size={12} className="animate-spin"/> Saving…</> : <><Download size={13}/> Download PDF</>}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ SHARE MODAL ══════════════════════════════════════════════════ */}
      {showShareModal && selectedCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm">
            <div className="border-b px-6 py-4 flex items-center justify-between" style={{ borderColor:C.gray[200] }}>
              <p className="font-black text-sm" style={{ color:C.navy }}>Share Certificate</p>
              <button onClick={() => setShowShareModal(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={15} style={{ color:C.gray[400] }}/>
              </button>
            </div>
            <div className="p-6">
              {/* Mini cert preview */}
              <div className="mb-5 rounded-2xl overflow-hidden h-28">
                <CertPreview cert={selectedCert} name={profile?.full_name}/>
              </div>
              <p className="text-xs font-bold mb-4 text-center" style={{ color:C.navy }}>{selectedCert.courses.title}</p>

              {/* Social share buttons */}
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[
                  { platform:'facebook', bg:'#1877F2', icon:Facebook, label:'Facebook' },
                  { platform:'twitter',  bg:'#1DA1F2', icon:Twitter,  label:'Twitter'  },
                  { platform:'linkedin', bg:'#0A66C2', icon:Linkedin, label:'LinkedIn' },
                  { platform:'email',    bg:C.gray[600], icon:Mail,   label:'Email'    },
                ].map((s,i) => (
                  <button key={i} onClick={() => handleShareLink(s.platform, selectedCert)}
                    className="flex flex-col items-center gap-1 py-3 rounded-2xl text-white hover:opacity-90 hover:-translate-y-0.5 transition-all"
                    style={{ background:s.bg }}>
                    <s.icon size={18}/>
                    <span className="text-[9px] font-bold">{s.label}</span>
                  </button>
                ))}
              </div>

              {/* Verification link */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider mb-2" style={{ color:C.gray[400] }}>Verification Link</p>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2.5 rounded-xl text-xs font-mono truncate" style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}`, color:C.gray[600] }}>
                    {selectedCert.verification_url}
                  </div>
                  <button onClick={() => copyLink(selectedCert.verification_url)}
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold text-white hover:opacity-90 flex-shrink-0"
                    style={{ background:C.navy }}>
                    {copied ? <Check size={13}/> : <Copy size={13}/>}
                  </button>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <ExternalLink size={11} style={{ color:C.green }}/>
                  <a href={selectedCert.verification_url} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] font-bold hover:underline" style={{ color:C.green }}>
                    Open verification page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display:none }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }
        * { box-sizing:border-box }
        @media(max-width:640px){ input,select,button{ font-size:16px!important } }
      `}</style>
    </div>
  )
}
