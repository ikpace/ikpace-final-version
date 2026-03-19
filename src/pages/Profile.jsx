// src/pages/Profile.jsx
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'
import {
  User, Mail, Phone, MapPin, Award, Flame, Clock, Save,
  BookOpen, Calendar, Download, Share2, Settings, Bell,
  Shield, Camera, Edit3, TrendingUp, Target, CheckCircle,
  Star, Zap, Gift, Heart, MessageCircle, HelpCircle, LogOut,
  Moon, Sun, Copy, Users, Crown, Medal, Gem, Sparkles,
  Rocket, Trophy, BadgeCheck, BarChart3, Activity,
  Bookmark, Flag, Globe, Lock, ChevronRight, Plus,
  RefreshCw, Twitter, Facebook, Linkedin, X, Check,
  PlayCircle, ArrowRight, ExternalLink, Eye, EyeOff,
  Key, Trash2, AlertTriangle, CreditCard, GraduationCap,
  FileText, Upload, Image, Layers, PieChart, Hash
} from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:    '#1A3D7C', navyDark:'#0F2655', navyMid:'#2F5EA8',
  orange:  '#FF7A00', orangeL:'#FF9A3C',
  green:   '#008F4C', yellow:'#E6B800', teal:'#0D9488',
  purple:  '#7C3AED', rose:'#E11D48',   amber:'#D97706',
  gray: { 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',
          300:'#CBD5E1',400:'#94A3B8',500:'#64748B',
          600:'#475569',700:'#334155',800:'#1E293B',900:'#0F172A' }
}

// ─── Rank config ──────────────────────────────────────────────────────────────
const RANKS = [
  { name:'Starter',          min:0,    max:399,  color:C.gray[400],  emoji:'🌱', perks:['Course access','Basic certificate'] },
  { name:'Peer Starter',     min:400,  max:699,  color:C.teal,       emoji:'⭐', perks:['All Starter perks','Community forum'] },
  { name:'Ambassador',       min:700,  max:1499, color:C.orange,     emoji:'🔥', perks:['All Peer perks','Priority support','Referral bonus 2x'] },
  { name:'Master Ambassador',min:1500, max:2999, color:C.purple,     emoji:'👑', perks:['All Ambassador perks','Free course voucher','Leaderboard badge'] },
  { name:'iKPACE Champion',  min:3000, max:Infinity, color:C.yellow, emoji:'🏆', perks:['All perks','Lifetime VIP','Monthly reward cash'] },
]

function getRank(pts) {
  return RANKS.find(r => pts >= r.min && pts <= r.max) || RANKS[0]
}
function getNextRank(pts) {
  const idx = RANKS.findIndex(r => pts >= r.min && pts <= r.max)
  return idx < RANKS.length - 1 ? RANKS[idx + 1] : null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Toggle({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} type="button"
      className="w-11 h-6 rounded-full transition-all relative flex-shrink-0"
      style={{ background: checked ? C.green : C.gray[300] }}>
      <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
        style={{ left: checked ? '24px' : '4px' }}/>
    </button>
  )
}

function StatCard({ icon: Icon, value, label, color, sub }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all border"
      style={{ borderColor: C.gray[200] }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}12` }}>
          <Icon size={18} style={{ color }}/>
        </div>
        <span className="text-2xl font-black" style={{ color }}>{value}</span>
      </div>
      <p className="text-xs font-semibold" style={{ color: C.gray[500] }}>{label}</p>
      {sub && <p className="text-[10px] mt-0.5" style={{ color: C.gray[400] }}>{sub}</p>}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function Profile() {
  const { profile, logout } = useAuth()

  // ── Edit state ───────────────────────────────────────────────────────────
  const [editing,  setEditing]  = useState(false)
  const [fullName, setFullName] = useState(profile?.full_name || '')
  const [phone,    setPhone]    = useState(profile?.phone || '')
  const [country,  setCountry]  = useState(profile?.country || 'Ghana')
  const [bio,      setBio]      = useState(profile?.bio || '')
  const [website,  setWebsite]  = useState(profile?.website || '')
  const [saving,   setSaving]   = useState(false)

  // ── UI state ─────────────────────────────────────────────────────────────
  const [activeTab,    setActiveTab]    = useState('overview')
  const [darkMode,     setDarkMode]     = useState(false)
  const [copied,       setCopied]       = useState(false)
  const [toast,        setToast]        = useState(null)
  const [deleteConfirm,setDeleteConfirm]= useState(false)

  // ── Image ────────────────────────────────────────────────────────────────
  const [imageUrl,       setImageUrl]       = useState(profile?.avatar_url || null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const fileRef = useRef(null)

  // ── Password ─────────────────────────────────────────────────────────────
  const [pwOld, setPwOld] = useState('')
  const [pwNew, setPwNew] = useState('')
  const [pwConf,setPwConf] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [pwSaving,setPwSaving]=useState(false)

  // ── Notifications prefs ───────────────────────────────────────────────────
  const [notifPrefs, setNotifPrefs] = useState({
    email: true, push: true, sms: false,
    newCourse: true, streakReminder: true, weeklyDigest: false,
    achievements: true, referrals: true, announcements: true,
  })

  // ── Data ─────────────────────────────────────────────────────────────────
  const [enrollments,    setEnrollments]    = useState([])
  const [certificates,   setCertificates]   = useState([])
  const [achievements,   setAchievements]   = useState([])
  const [notifications,  setNotifications]  = useState([])
  const [referrals,      setReferrals]      = useState([])
  const [activityFeed,   setActivityFeed]   = useState([])
  const [quizAttempts,   setQuizAttempts]   = useState([])

  // ── Points ───────────────────────────────────────────────────────────────
  const [totalPoints, setTotalPoints] = useState(1247)
  const currentRank = getRank(totalPoints)
  const nextRank    = getNextRank(totalPoints)
  const ptsToNext   = nextRank ? nextRank.min - totalPoints : 0
  const pctToNext   = nextRank
    ? Math.min(((totalPoints - currentRank.min) / (nextRank.min - currentRank.min)) * 100, 100)
    : 100

  const referralLink = `https://ikpace.com/ref/${profile?.id || 'user123'}`

  // ── Seed data ─────────────────────────────────────────────────────────────
  useEffect(() => {
    setEnrollments([
      { id:'e1', title:'Virtual Assistant Professional',  slug:'virtual-assistant-pro',     emoji:'💼', progress:75, lessons:24, done:18, lastAccessed:'2 hours ago',  color:C.navy   },
      { id:'e2', title:'Social Media Marketing',          slug:'social-media-marketing',    emoji:'📱', progress:30, lessons:28, done:8,  lastAccessed:'Yesterday',     color:C.orange },
      { id:'e3', title:'Canva & Graphic Design',          slug:'canva-graphic-design',      emoji:'🎨', progress:0,  lessons:20, done:0,  lastAccessed:'Not started',   color:C.green  },
      { id:'e4', title:'AI Prompt Engineering',           slug:'ai-prompt-engineering',     emoji:'🤖', progress:55, lessons:24, done:13, lastAccessed:'3 days ago',    color:C.purple },
    ])
    setCertificates([
      { id:'c1', course:'Virtual Assistant Professional',  credId:'VA-2026-001',   date:'Mar 15, 2026', emoji:'💼', color:C.navy   },
      { id:'c2', course:'Social Media Marketing',          credId:'SMM-2026-045',  date:'Feb 28, 2026', emoji:'📱', color:C.orange },
      { id:'c3', course:'Canva & Graphic Design',          credId:'DES-2026-023',  date:'Jan 10, 2026', emoji:'🎨', color:C.green  },
    ])
    setAchievements([
      { id:'a1', title:'Fast Learner',       desc:'Completed 3 courses in a month',      emoji:'🚀', pts:100, earned:true,  date:'Mar 10, 2026' },
      { id:'a2', title:'Community Star',     desc:'Helped 10 fellow students',           emoji:'⭐', pts:150, earned:true,  date:'Mar 5, 2026'  },
      { id:'a3', title:'Perfect Score',      desc:'Got 100% on any quiz',                emoji:'🏆', pts:200, earned:false                      },
      { id:'a4', title:'30-Day Streak',      desc:'Studied 30 days in a row',            emoji:'🔥', pts:300, earned:false                      },
      { id:'a5', title:'Ambassador Elite',   desc:'Reached Ambassador rank',             emoji:'👑', pts:500, earned:true,  date:'Feb 20, 2026' },
      { id:'a6', title:'Quiz Master',        desc:'Passed 10 quizzes with 80%+',         emoji:'🎯', pts:250, earned:false                      },
      { id:'a7', title:'Social Butterfly',   desc:'Referred 5+ friends',                 emoji:'🦋', pts:400, earned:true,  date:'Mar 1, 2026'  },
      { id:'a8', title:'Night Owl',          desc:'Completed a lesson after midnight',   emoji:'🦉', pts:50,  earned:true,  date:'Feb 15, 2026' },
    ])
    setNotifications([
      { id:'n1', title:'New AI Course Live!',         msg:'AI Prompt Engineering is now available.',         time:'5 min ago',  read:false, type:'course'      },
      { id:'n2', title:'Social Media module updated', msg:'New content added to Module 3.',                  time:'2 hrs ago',  read:false, type:'update'      },
      { id:'n3', title:'Achievement unlocked 🎉',     msg:'You earned the "Fast Learner" badge!',            time:'Yesterday',  read:true,  type:'achievement'  },
      { id:'n4', title:'Referral bonus +50 pts',      msg:'Sarah Johnson joined using your link.',           time:'2 days ago', read:true,  type:'points'       },
      { id:'n5', title:'Certificate ready',           msg:'Your VA Pro certificate is ready to download.',   time:'3 days ago', read:true,  type:'certificate'  },
    ])
    setReferrals([
      { id:'r1', name:'Sarah Johnson',  date:'Mar 15, 2026', pts:50, avatar:'SJ', color:C.navy   },
      { id:'r2', name:'Michael Chen',   date:'Mar 10, 2026', pts:50, avatar:'MC', color:C.orange },
      { id:'r3', name:'Amina Okafor',   date:'Mar 5, 2026',  pts:50, avatar:'AO', color:C.green  },
      { id:'r4', name:'David Olamide',  date:'Feb 28, 2026', pts:50, avatar:'DO', color:C.purple },
      { id:'r5', name:'Grace Williams', date:'Feb 20, 2026', pts:50, avatar:'GW', color:C.teal   },
    ])
    setActivityFeed([
      { id:'f1', type:'complete',     msg:'Completed Week 3 of Virtual Assistant Pro',             time:'2h ago',    pts:'+25',  emoji:'✅' },
      { id:'f2', type:'quiz',         msg:'Scored 90% on Social Media Marketing quiz',             time:'Yesterday', pts:'+15',  emoji:'🎯' },
      { id:'f3', type:'certificate',  msg:'Downloaded VA Professional certificate',                time:'3 days ago',pts:null,   emoji:'🏆' },
      { id:'f4', type:'referral',     msg:'Sarah Johnson joined via your referral link',           time:'4 days ago',pts:'+50',  emoji:'👥' },
      { id:'f5', type:'streak',       msg:'15-day learning streak! Keep it up',                   time:'Today',     pts:'+10',  emoji:'🔥' },
      { id:'f6', type:'note',         msg:'Saved notes for Week 2: Email Management',             time:'5 days ago',pts:null,   emoji:'📝' },
    ])
    setQuizAttempts([
      { id:'q1', lesson:'Introduction to VA Work',      score:95, total:100, date:'Mar 14', passed:true  },
      { id:'q2', lesson:'Email Management Mastery',     score:80, total:100, date:'Mar 12', passed:true  },
      { id:'q3', lesson:'Social Media Basics',          score:65, total:100, date:'Mar 8',  passed:false },
      { id:'q4', lesson:'Content Strategy Deep Dive',   score:90, total:100, date:'Mar 6',  passed:true  },
      { id:'q5', lesson:'Canva Colour Theory',          score:100,total:100, date:'Feb 28', passed:true  },
    ])
  }, [])

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 2800)
  }

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    showToast('Referral link copied!')
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return }
    if (file.size > 2 * 1024 * 1024)    { showToast('Image must be under 2MB', 'error'); return }
    setUploadingImage(true)
    try {
      const ext    = file.name.split('.').pop().toLowerCase()
      const fname  = `${profile?.id || 'user'}-${Date.now()}.${ext}`
      const { error:upErr } = await supabase.storage.from('avatars').upload(`profile-images/${fname}`, file, { upsert:true })
      if (upErr) throw upErr
      const { data:{ publicUrl } } = supabase.storage.from('avatars').getPublicUrl(`profile-images/${fname}`)
      await supabase.from('profiles').update({ avatar_url:publicUrl }).eq('id', profile?.id)
      setImageUrl(publicUrl)
      showToast('Profile photo updated!')
    } catch(err) {
      showToast('Upload failed: ' + err.message, 'error')
    } finally { setUploadingImage(false) }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from('profiles')
        .update({ full_name:fullName, phone, country, bio, website, updated_at:new Date().toISOString() })
        .eq('id', profile?.id)
      if (error) throw error
      setEditing(false)
      showToast('Profile saved successfully!')
    } catch(err) { showToast('Save failed: ' + err.message, 'error') }
    finally { setSaving(false) }
  }

  const handlePasswordChange = async () => {
    if (!pwNew || pwNew !== pwConf) { showToast('Passwords do not match', 'error'); return }
    if (pwNew.length < 8)           { showToast('Password must be 8+ characters', 'error'); return }
    setPwSaving(true)
    try {
      const { error } = await supabase.auth.updateUser({ password: pwNew })
      if (error) throw error
      setPwOld(''); setPwNew(''); setPwConf('')
      showToast('Password updated!')
    } catch(err) { showToast('Password update failed: ' + err.message, 'error') }
    finally { setPwSaving(false) }
  }

  const unreadCount = notifications.filter(n=>!n.read).length

  // ── Tab config ────────────────────────────────────────────────────────────
  const tabs = [
    { id:'overview',      label:'Overview',       emoji:'🏠' },
    { id:'profile',       label:'Profile',        emoji:'👤' },
    { id:'courses',       label:'Courses',        emoji:'📚' },
    { id:'certificates',  label:'Certificates',   emoji:'🏆' },
    { id:'achievements',  label:'Achievements',   emoji:'⭐' },
    { id:'points',        label:'Points & Ranks', emoji:'💎' },
    { id:'referrals',     label:'Referrals',      emoji:'👥' },
    { id:'activity',      label:'Activity',       emoji:'⚡' },
    { id:'quizzes',       label:'Quiz History',   emoji:'🎯' },
    { id:'notifications', label:'Notifications',  emoji:'🔔', badge: unreadCount },
    { id:'settings',      label:'Settings',       emoji:'⚙️' },
  ]

  const earnedCount = achievements.filter(a=>a.earned).length
  const avgQuiz     = quizAttempts.length ? Math.round(quizAttempts.reduce((s,q)=>s+q.score,0)/quizAttempts.length) : 0
  const totalHours  = Math.round(enrollments.reduce((s,e)=>s+(e.done*0.5),0))

  return (
    <div className="min-h-screen pb-10" style={{ background:C.gray[50] }}>

      {/* ── TOAST ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold"
          style={{ background: toast.type==='error' ? `linear-gradient(135deg,${C.rose},#F87171)` : `linear-gradient(135deg,${C.green},${C.teal})` }}>
          {toast.type==='error' ? <AlertTriangle size={15}/> : <Check size={15}/>}
          {toast.msg}
        </div>
      )}

      {/* ── HERO PROFILE BANNER ───────────────────────────────────────────── */}
      <div className="relative overflow-hidden"
        style={{ background:`linear-gradient(145deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.06]" style={{ background:C.orange }}/>
        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full opacity-[0.05]" style={{ background:C.yellow }}/>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
          {/* Top row */}
          <div className="flex items-center justify-between mb-6">
            <Link to="/dashboard" className="flex items-center gap-1.5 text-white/60 text-xs font-semibold hover:text-white transition-colors">
              ← Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <button onClick={() => setDarkMode(d=>!d)}
                className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition">
                {darkMode ? <Sun size={15} style={{ color:C.yellow }}/> : <Moon size={15} className="text-white/70"/>}
              </button>
              {/* Notifications bell */}
              <button onClick={() => setActiveTab('notifications')}
                className="relative w-9 h-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center hover:bg-white/20 transition">
                <Bell size={15} className="text-white/70"/>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                    style={{ background:C.rose }}>{unreadCount}</span>
                )}
              </button>
              <button onClick={logout}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-white/10 border border-white/15 hover:bg-white/20 transition">
                <LogOut size={13}/> Logout
              </button>
            </div>
          </div>

          {/* Profile identity */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-3 border-white/20 shadow-xl"
                style={{ background:`linear-gradient(135deg,${C.orange},${C.navyMid})` }}>
                {imageUrl
                  ? <img src={imageUrl} alt="avatar" className="w-full h-full object-cover"/>
                  : <div className="w-full h-full flex items-center justify-center text-white text-3xl font-black">
                      {(profile?.full_name || 'U')[0].toUpperCase()}
                    </div>}
              </div>
              <label className="absolute -bottom-1.5 -right-1.5 w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage}/>
                {uploadingImage ? <RefreshCw size={13} className="animate-spin" style={{ color:C.navy }}/> : <Camera size={13} style={{ color:C.navy }}/>}
              </label>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl font-black text-white">{profile?.full_name || 'Student'}</h1>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full" style={{ background:currentRank.color, color:'white' }}>
                  {currentRank.emoji} {currentRank.name}
                </span>
              </div>
              <p className="text-white/50 text-xs mb-3">{profile?.email}</p>
              {/* Stat pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label:`${totalPoints.toLocaleString()} pts`, color:C.yellow },
                  { label:`${enrollments.length} courses`,       color:C.orangeL },
                  { label:`${certificates.length} certs`,        color:C.green },
                  { label:`${earnedCount} badges`,               color:C.teal },
                ].map((p,i) => (
                  <span key={i} className="text-[10px] font-bold px-3 py-1 rounded-full bg-white/10 border border-white/15"
                    style={{ color:p.color }}>{p.label}</span>
                ))}
              </div>
            </div>

            {/* Rank progress (desktop) */}
            <div className="hidden lg:block flex-shrink-0 bg-white/10 border border-white/15 rounded-2xl p-4 w-52">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/50">Next Rank</span>
                <span className="text-[10px] font-black" style={{ color:C.orangeL }}>{nextRank?.emoji} {nextRank?.name || '🌟 MAX'}</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden mb-2" style={{ background:'rgba(255,255,255,0.15)' }}>
                <div className="h-full rounded-full transition-all" style={{ width:`${pctToNext}%`, background:`linear-gradient(90deg,${C.orange},${C.orangeL})` }}/>
              </div>
              <p className="text-white/40 text-[10px]">
                {nextRank ? `${ptsToNext} pts to go` : 'You are the Champion!'}
              </p>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="relative z-10 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex overflow-x-auto gap-0.5 pb-0 scrollbar-hide">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className="relative flex items-center gap-1.5 px-4 py-3.5 text-xs font-semibold whitespace-nowrap transition-all border-b-2"
                  style={{
                    borderBottomColor: activeTab===t.id ? C.orange : 'transparent',
                    color: activeTab===t.id ? 'white' : 'rgba(255,255,255,0.45)'
                  }}>
                  <span>{t.emoji}</span>
                  <span className="hidden sm:inline">{t.label}</span>
                  {t.badge > 0 && (
                    <span className="w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center flex-shrink-0"
                      style={{ background:C.rose }}>{t.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7">

        {/* ══ OVERVIEW ═════════════════════════════════════════════════════ */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={BookOpen}   value={enrollments.length}  label="Enrolled Courses"  color={C.navy}   sub="Active & completed"/>
              <StatCard icon={Award}      value={certificates.length} label="Certificates"       color={C.orange} sub="Ready to download"/>
              <StatCard icon={Flame}      value="15"                  label="Day Streak"         color={C.rose}   sub="Keep it going!"/>
              <StatCard icon={Clock}      value={`${totalHours}h`}    label="Learning Time"      color={C.teal}   sub="Total study hours"/>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard icon={Sparkles}   value={totalPoints.toLocaleString()} label="Total Points"  color={C.yellow} sub={`${currentRank.emoji} ${currentRank.name}`}/>
              <StatCard icon={Trophy}     value={earnedCount}         label="Badges Earned"      color={C.purple} sub={`of ${achievements.length} total`}/>
              <StatCard icon={Users}      value={referrals.length}    label="Referrals"          color={C.green}  sub={`${referrals.length * 50} pts earned`}/>
              <StatCard icon={BarChart3}  value={`${avgQuiz}%`}       label="Avg Quiz Score"     color={C.amber}  sub={`${quizAttempts.length} attempts`}/>
            </div>

            {/* Two-column layout */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* In-progress courses */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor:C.gray[200] }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-sm" style={{ color:C.navy }}>In Progress</h3>
                  <button onClick={() => setActiveTab('courses')} className="text-xs font-bold hover:underline" style={{ color:C.orange }}>View all →</button>
                </div>
                <div className="space-y-3">
                  {enrollments.filter(e=>e.progress>0&&e.progress<100).slice(0,3).map(e => (
                    <div key={e.id} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                        style={{ background:`${e.color}12` }}>{e.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate" style={{ color:C.navy }}>{e.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:C.gray[200] }}>
                            <div className="h-full rounded-full" style={{ width:`${e.progress}%`, background:`linear-gradient(90deg,${e.color},${C.orange})` }}/>
                          </div>
                          <span className="text-[10px] font-bold flex-shrink-0" style={{ color:e.color }}>{e.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor:C.gray[200] }}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-sm" style={{ color:C.navy }}>Recent Activity</h3>
                  <button onClick={() => setActiveTab('activity')} className="text-xs font-bold hover:underline" style={{ color:C.orange }}>View all →</button>
                </div>
                <div className="space-y-2.5">
                  {activityFeed.slice(0,4).map(f => (
                    <div key={f.id} className="flex items-center gap-3">
                      <span className="text-lg flex-shrink-0">{f.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs" style={{ color:C.gray[700] }}>{f.msg}</p>
                        <p className="text-[10px]" style={{ color:C.gray[400] }}>{f.time}</p>
                      </div>
                      {f.pts && <span className="text-[10px] font-black flex-shrink-0" style={{ color:C.green }}>{f.pts}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rank info */}
            <div className="rounded-2xl overflow-hidden" style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy})` }}>
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/50 text-[10px] font-black uppercase tracking-wider mb-1">Current Rank</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{currentRank.emoji}</span>
                      <span className="text-white font-black text-xl">{currentRank.name}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color:C.orangeL }}>Total Points</p>
                    <p className="font-black text-3xl text-white">{totalPoints.toLocaleString()}</p>
                  </div>
                </div>
                {nextRank && (
                  <>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-white/50">{currentRank.name}</span>
                      <span style={{ color:C.orangeL }}>{nextRank.emoji} {nextRank.name} — {ptsToNext} pts to go</span>
                    </div>
                    <div className="h-2.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.1)' }}>
                      <div className="h-full rounded-full transition-all" style={{ width:`${pctToNext}%`, background:`linear-gradient(90deg,${C.orange},${C.orangeL})` }}/>
                    </div>
                  </>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                  {currentRank.perks.map((p,i) => (
                    <div key={i} className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
                      <CheckCircle size={11} style={{ color:C.green, flexShrink:0 }}/>
                      <span className="text-[10px] text-white/70">{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ PROFILE TAB ══════════════════════════════════════════════════ */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <div className="bg-white rounded-2xl p-6 shadow-sm border mb-5" style={{ borderColor:C.gray[200] }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-black text-lg" style={{ color:C.navy }}>Personal Information</h2>
                {!editing
                  ? <button onClick={() => setEditing(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                      <Edit3 size={13}/> Edit Profile
                    </button>
                  : <div className="flex gap-2">
                      <button onClick={() => setEditing(false)}
                        className="px-4 py-2 rounded-xl text-xs font-bold border" style={{ borderColor:C.gray[200], color:C.gray[500] }}>Cancel</button>
                      <button onClick={handleSave} disabled={saving}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                        style={{ background:C.green }}>
                        {saving ? <RefreshCw size={12} className="animate-spin"/> : <Save size={12}/>} Save
                      </button>
                    </div>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label:'Full Name',  icon:User,  val:fullName,  set:setFullName,  type:'text',  ph:'Your full name'     },
                  { label:'Email',      icon:Mail,  val:profile?.email, set:null, type:'email', ph:'' },
                  { label:'Phone',      icon:Phone, val:phone,     set:setPhone,     type:'tel',   ph:'+233 0XX XXX XXX'   },
                  { label:'Country',    icon:MapPin, val:country,  set:setCountry,   type:'text',  ph:'e.g. Ghana'         },
                  { label:'Website',    icon:Globe, val:website,   set:setWebsite,   type:'url',   ph:'https://yoursite.com'},
                ].map((f,i) => (
                  <div key={i} className={f.label === 'Website' ? 'sm:col-span-2' : ''}>
                    <label className="block text-xs font-bold mb-1.5" style={{ color:C.gray[600] }}>
                      <f.icon size={11} className="inline mr-1" style={{ color:C.navy }}/> {f.label}
                    </label>
                    {editing && f.set ? (
                      <input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)}
                        placeholder={f.ph}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}
                        onFocus={e=>e.target.style.borderColor=C.navy}
                        onBlur={e=>e.target.style.borderColor=C.gray[200]}/>
                    ) : (
                      <div className="px-3 py-2.5 rounded-xl text-sm" style={{ background:C.gray[50], color:f.val?C.gray[800]:C.gray[400] }}>
                        {f.val || 'Not provided'}
                      </div>
                    )}
                  </div>
                ))}
                {/* Bio */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold mb-1.5" style={{ color:C.gray[600] }}>Bio</label>
                  {editing ? (
                    <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={3}
                      placeholder="Tell the community about yourself, your goals, and what you're learning..."
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                      style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}
                      onFocus={e=>e.target.style.borderColor=C.navy}
                      onBlur={e=>e.target.style.borderColor=C.gray[200]}/>
                  ) : (
                    <div className="px-3 py-2.5 rounded-xl text-sm" style={{ background:C.gray[50], color:bio?C.gray[700]:C.gray[400] }}>
                      {bio || 'No bio yet. Click Edit to add one!'}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Profile picture */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-4" style={{ color:C.navy }}>Profile Photo</h3>
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${C.orange},${C.navyMid})` }}>
                  {imageUrl
                    ? <img src={imageUrl} alt="profile" className="w-full h-full object-cover"/>
                    : <div className="w-full h-full flex items-center justify-center text-white text-3xl font-black">
                        {(profile?.full_name||'U')[0].toUpperCase()}
                      </div>}
                </div>
                <div>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer hover:opacity-90 transition-all"
                    style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploadingImage}/>
                    {uploadingImage ? <><RefreshCw size={12} className="animate-spin"/> Uploading…</> : <><Upload size={12}/> Upload New Photo</>}
                  </label>
                  <p className="text-[10px] mt-2" style={{ color:C.gray[400] }}>PNG, JPG, GIF · max 2 MB · uploads to Supabase "avatars" bucket</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ COURSES TAB ══════════════════════════════════════════════════ */}
        {activeTab === 'courses' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg" style={{ color:C.navy }}>My Courses</h2>
              <Link to="/courses" className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold text-white"
                style={{ background:`linear-gradient(135deg,${C.orange},${C.amber})` }}>
                <Plus size={13}/> Enroll in a Course
              </Link>
            </div>
            <div className="space-y-4">
              {enrollments.map(e => (
                <div key={e.id} className="bg-white rounded-2xl p-5 shadow-sm border hover:shadow-lg transition-all"
                  style={{ borderColor:C.gray[200] }}>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background:`${e.color}12` }}>{e.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-black text-sm leading-tight" style={{ color:C.navy }}>{e.title}</h3>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 text-white"
                          style={{ background: e.progress===100 ? C.green : e.progress>0 ? C.orange : C.gray[400] }}>
                          {e.progress===100 ? 'Complete' : e.progress>0 ? 'In Progress' : 'Not Started'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[10px] mb-3" style={{ color:C.gray[400] }}>
                        <span className="flex items-center gap-1"><BookOpen size={10}/> {e.done}/{e.lessons} lessons</span>
                        <span className="flex items-center gap-1"><Clock size={10}/> {e.lastAccessed}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background:C.gray[200] }}>
                          <div className="h-full rounded-full transition-all" style={{ width:`${e.progress}%`, background:`linear-gradient(90deg,${e.color},${C.orange})` }}/>
                        </div>
                        <span className="text-[10px] font-black flex-shrink-0" style={{ color:e.color }}>{e.progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 pt-4 border-t" style={{ borderColor:C.gray[100] }}>
                    <Link to={`/test-course-player/${e.id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all"
                      style={{ background:`linear-gradient(135deg,${e.color},${C.orange})` }}>
                      <PlayCircle size={12}/> {e.progress > 0 ? 'Continue' : 'Start'}
                    </Link>
                    <Link to={`/course/${e.slug}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border hover:bg-gray-50 transition-all"
                      style={{ borderColor:C.gray[200], color:C.gray[600] }}>
                      <Eye size={12}/> Course Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ CERTIFICATES TAB ═════════════════════════════════════════════ */}
        {activeTab === 'certificates' && (
          <div>
            <h2 className="font-black text-lg mb-5" style={{ color:C.navy }}>My Certificates</h2>
            {certificates.length === 0 ? (
              <div className="text-center py-16 rounded-2xl bg-white border" style={{ borderColor:C.gray[200] }}>
                <Award size={40} className="mx-auto mb-3" style={{ color:C.gray[300] }}/>
                <p className="text-sm font-bold mb-1" style={{ color:C.navy }}>No certificates yet</p>
                <p className="text-xs mb-4" style={{ color:C.gray[400] }}>Complete a course to earn your first certificate.</p>
                <Link to="/courses" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                  style={{ background:C.navy }}>Browse Courses</Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {certificates.map(cert => (
                  <div key={cert.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border"
                    style={{ borderColor:C.gray[200] }}>
                    {/* Certificate preview */}
                    <div className="h-36 flex flex-col items-center justify-center relative overflow-hidden"
                      style={{ background:`linear-gradient(135deg,${cert.color},${C.navyDark})` }}>
                      <div className="absolute inset-0 opacity-10">
                        {[...Array(6)].map((_,i) => <div key={i} className="absolute border border-white rounded-full"
                          style={{ width:60+i*30,height:60+i*30,top:'50%',left:'50%',transform:'translate(-50%,-50%)' }}/>)}
                      </div>
                      <span className="text-4xl mb-1 relative z-10">{cert.emoji}</span>
                      <p className="text-white font-black text-[10px] uppercase tracking-widest relative z-10">iKPACE</p>
                      <p className="text-white/50 text-[9px] relative z-10">Certificate of Completion</p>
                    </div>
                    <div className="p-4">
                      <h3 className="font-black text-sm mb-1 truncate" style={{ color:C.navy }}>{cert.course}</h3>
                      <div className="flex items-center gap-3 text-[10px] mb-3" style={{ color:C.gray[400] }}>
                        <span className="flex items-center gap-1"><Calendar size={9}/> {cert.date}</span>
                        <span className="flex items-center gap-1"><Hash size={9}/> {cert.credId}</span>
                      </div>
                      <div className="flex items-center gap-1 mb-4">
                        <CheckCircle size={11} style={{ color:C.green }}/>
                        <span className="text-[10px] font-semibold" style={{ color:C.green }}>Verified Certificate</span>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                          style={{ background:C.navy }}>
                          <Download size={12}/> Download
                        </button>
                        <button onClick={() => { navigator.clipboard.writeText(`https://ikpace.com/verify/${cert.credId}`); showToast('Share link copied!') }}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border hover:bg-orange-50 transition"
                          style={{ borderColor:C.orange, color:C.orange }}>
                          <Share2 size={12}/> Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ══ ACHIEVEMENTS TAB ═════════════════════════════════════════════ */}
        {activeTab === 'achievements' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg" style={{ color:C.navy }}>Achievements</h2>
              <span className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background:`linear-gradient(135deg,${C.orange},${C.amber})` }}>
                {earnedCount}/{achievements.length} Earned
              </span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {achievements.map(a => (
                <div key={a.id}
                  className={`bg-white rounded-2xl p-5 border-2 transition-all ${a.earned ? 'hover:shadow-lg' : 'opacity-55'}`}
                  style={{ borderColor: a.earned ? C.orange : C.gray[200] }}>
                  <div className="text-3xl mb-3">{a.emoji}</div>
                  <h3 className="font-black text-sm mb-1" style={{ color: a.earned ? C.navy : C.gray[500] }}>{a.title}</h3>
                  <p className="text-xs mb-3 leading-relaxed" style={{ color:C.gray[400] }}>{a.desc}</p>
                  <div className="flex items-center justify-between">
                    {a.earned ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ background:C.green }}>
                        ✓ Earned {a.date}
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:C.gray[100], color:C.gray[500] }}>
                        🔒 Locked
                      </span>
                    )}
                    <span className="text-[10px] font-black" style={{ color:a.earned?C.orange:C.gray[400] }}>+{a.pts}pts</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ POINTS & RANKS TAB ════════════════════════════════════════════ */}
        {activeTab === 'points' && (
          <div className="space-y-6">
            <h2 className="font-black text-lg" style={{ color:C.navy }}>Points & Ranks</h2>

            {/* Rank ladder */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-5 flex items-center gap-2" style={{ color:C.navy }}>
                <Crown size={15} style={{ color:C.yellow }}/> Rank Ladder
              </h3>
              <div className="space-y-3">
                {RANKS.map((r, i) => {
                  const isCurrent = currentRank.name === r.name
                  const isUnlocked = totalPoints >= r.min
                  return (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl transition-all"
                      style={{ background: isCurrent ? `${r.color}12` : isUnlocked ? C.gray[50] : C.gray[50],
                               border:`2px solid ${isCurrent?r.color:C.gray[200]}` }}>
                      <div className="text-2xl flex-shrink-0">{r.emoji}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-black text-sm" style={{ color: isCurrent?r.color:C.gray[600] }}>{r.name}</p>
                          {isCurrent && <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-white" style={{ background:r.color }}>YOU ARE HERE</span>}
                          {!isCurrent && isUnlocked && <CheckCircle size={12} style={{ color:C.green }}/>}
                          {!isUnlocked && <Lock size={11} style={{ color:C.gray[300] }}/>}
                        </div>
                        <p className="text-[10px]" style={{ color:C.gray[400] }}>{r.min.toLocaleString()}+ points required</p>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {r.perks.map((p,j) => (
                            <span key={j} className="text-[9px] px-2 py-0.5 rounded-full"
                              style={{ background:`${r.color}12`, color:r.color }}>{p}</span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        {isCurrent && nextRank && (
                          <p className="text-[10px] font-black" style={{ color:r.color }}>{ptsToNext} to go</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Points breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-4" style={{ color:C.navy }}>How to Earn Points</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { action:'Complete a lesson',       pts:'+10 pts', color:C.navy   },
                  { action:'Complete a quiz (pass)',   pts:'+15 pts', color:C.orange },
                  { action:'Complete a course',        pts:'+150 pts',color:C.green  },
                  { action:'Submit an assignment',     pts:'+25 pts', color:C.teal   },
                  { action:'Refer a friend',           pts:'+50 pts', color:C.purple },
                  { action:'7-day learning streak',    pts:'+25 pts', color:C.amber  },
                  { action:'30-day streak',            pts:'+100 pts',color:C.rose   },
                  { action:'Post in discussions',      pts:'+5 pts',  color:C.navy   },
                ].map((p,i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                    style={{ background:C.gray[50] }}>
                    <span className="text-xs" style={{ color:C.gray[700] }}>{p.action}</span>
                    <span className="text-xs font-black" style={{ color:p.color }}>{p.pts}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ REFERRALS TAB ════════════════════════════════════════════════ */}
        {activeTab === 'referrals' && (
          <div className="space-y-6">
            <h2 className="font-black text-lg" style={{ color:C.navy }}>Refer & Earn</h2>

            {/* Link card */}
            <div className="rounded-2xl p-6 text-white relative overflow-hidden"
              style={{ background:`linear-gradient(145deg,${C.navyDark},${C.navy},${C.orange})` }}>
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-15 bg-white"/>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Gift size={18} style={{ color:C.yellow }}/>
                  <h3 className="font-black text-lg">Your Referral Link</h3>
                </div>
                <p className="text-white/60 text-xs mb-4">Share this link. You earn 50 pts, your friend gets 10% off their first course.</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white/80 truncate">{referralLink}</div>
                  <button onClick={handleCopy}
                    className="flex items-center justify-center gap-2 px-5 py-3 bg-white rounded-xl text-xs font-black hover:shadow-lg transition-all flex-shrink-0"
                    style={{ color:C.navy }}>
                    {copied ? <><Check size={12}/> Copied!</> : <><Copy size={12}/> Copy Link</>}
                  </button>
                </div>
                <div className="flex gap-2 mt-3">
                  {[
                    { href:`https://twitter.com/intent/tweet?text=Join%20iKPACE!%20${referralLink}`, bg:'#1DA1F2', Icon:Twitter, label:'Twitter' },
                    { href:`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`,           bg:'#1877F2', Icon:Facebook, label:'Facebook' },
                    { href:`https://www.linkedin.com/sharing/share-offsite/?url=${referralLink}`,    bg:'#0A66C2', Icon:Linkedin, label:'LinkedIn' },
                  ].map((s,i) => (
                    <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90 transition-all"
                      style={{ background: s.bg }}>
                      <s.Icon size={12}/>{s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Referral stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { val:referrals.length, label:'Friends Referred', color:C.navy   },
                { val:referrals.length*50, label:'Points Earned', color:C.green  },
                { val:`$${referrals.length*5}`,label:'Cash Equivalent',color:C.orange },
              ].map((s,i) => (
                <div key={i} className="bg-white rounded-2xl p-4 text-center shadow-sm border" style={{ borderColor:C.gray[200] }}>
                  <p className="text-2xl font-black" style={{ color:s.color }}>{s.val}</p>
                  <p className="text-[10px] mt-1" style={{ color:C.gray[400] }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Referral list */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-4" style={{ color:C.navy }}>People You've Referred</h3>
              <div className="space-y-2.5">
                {referrals.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-3 rounded-2xl" style={{ background:C.gray[50] }}>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black"
                        style={{ background:r.color }}>{r.avatar}</div>
                      <div>
                        <p className="text-xs font-bold" style={{ color:C.navy }}>{r.name}</p>
                        <p className="text-[10px]" style={{ color:C.gray[400] }}>Joined {r.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-black" style={{ color:C.green }}>+{r.pts} pts</p>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white" style={{ background:C.green }}>Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══ ACTIVITY TAB ═════════════════════════════════════════════════ */}
        {activeTab === 'activity' && (
          <div>
            <h2 className="font-black text-lg mb-5" style={{ color:C.navy }}>Activity Feed</h2>
            <div className="space-y-3">
              {activityFeed.map((f,i) => (
                <div key={f.id} className="bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-4 hover:shadow-md transition-all"
                  style={{ borderColor:C.gray[200] }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background:C.gray[50] }}>{f.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm" style={{ color:C.gray[800] }}>{f.msg}</p>
                    <p className="text-[10px] mt-0.5" style={{ color:C.gray[400] }}>{f.time}</p>
                  </div>
                  {f.pts && (
                    <span className="text-sm font-black flex-shrink-0" style={{ color:C.green }}>{f.pts}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ QUIZ HISTORY TAB ═════════════════════════════════════════════ */}
        {activeTab === 'quizzes' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg" style={{ color:C.navy }}>Quiz History</h2>
              <div className="text-xs font-bold px-3 py-1.5 rounded-full" style={{ background:`${C.navy}10`, color:C.navy }}>
                Avg: {avgQuiz}%
              </div>
            </div>
            {/* Score chart bars */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border mb-5" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-xs mb-4 uppercase tracking-wider" style={{ color:C.gray[400] }}>Score Trend</h3>
              <div className="flex items-end gap-2 h-20">
                {quizAttempts.map((q,i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[9px] font-bold" style={{ color:q.passed?C.green:C.rose }}>{q.score}%</span>
                    <div className="w-full rounded-t-lg transition-all"
                      style={{ height:`${q.score*0.7}px`, background:q.passed?`linear-gradient(180deg,${C.green},${C.teal})`:`linear-gradient(180deg,${C.rose},#F87171)` }}/>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {quizAttempts.map(q => (
                <div key={q.id} className="bg-white rounded-2xl p-4 shadow-sm border flex items-center justify-between gap-4"
                  style={{ borderColor:C.gray[200] }}>
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                      style={{ background:q.passed?C.green:C.rose }}>{q.passed?'✓':'✗'}</div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate" style={{ color:C.navy }}>{q.lesson}</p>
                      <p className="text-[10px]" style={{ color:C.gray[400] }}>{q.date}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-black text-base" style={{ color:q.passed?C.green:C.rose }}>{q.score}%</p>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>{q.score}/{q.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ NOTIFICATIONS TAB ════════════════════════════════════════════ */}
        {activeTab === 'notifications' && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg" style={{ color:C.navy }}>Notifications</h2>
              {unreadCount > 0 && (
                <button onClick={() => setNotifications(prev => prev.map(n=>({...n,read:true})))}
                  className="text-xs font-bold hover:underline" style={{ color:C.orange }}>
                  Mark all read
                </button>
              )}
            </div>
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id}
                  onClick={() => setNotifications(prev=>prev.map(x=>x.id===n.id?{...x,read:true}:x))}
                  className="bg-white rounded-2xl p-4 shadow-sm border flex items-start gap-3 cursor-pointer hover:shadow-md transition-all"
                  style={{ borderColor: n.read ? C.gray[200] : C.orange, background: n.read?'white':`${C.orange}04` }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
                    style={{ background: n.type==='achievement'?`${C.yellow}15`:n.type==='points'?`${C.green}15`:n.type==='course'?`${C.navy}10`:`${C.orange}12` }}>
                    {n.type==='achievement'?'🏆':n.type==='points'?'💎':n.type==='course'?'📚':n.type==='certificate'?'🎓':'📣'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-bold" style={{ color:C.navy }}>{n.title}</p>
                      {!n.read && <div className="w-2 h-2 rounded-full flex-shrink-0 mt-0.5" style={{ background:C.orange }}/>}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color:C.gray[500] }}>{n.msg}</p>
                    <p className="text-[10px] mt-1" style={{ color:C.gray[400] }}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ SETTINGS TAB ════════════════════════════════════════════════ */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-5">
            <h2 className="font-black text-lg" style={{ color:C.navy }}>Account Settings</h2>

            {/* Notification preferences */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-5 flex items-center gap-2" style={{ color:C.navy }}>
                <Bell size={14} style={{ color:C.orange }}/> Notification Preferences
              </h3>
              <div className="space-y-4">
                {[
                  { key:'email',          label:'Email Notifications',          desc:'Get updates via email'            },
                  { key:'push',           label:'Browser Push Notifications',   desc:'Alerts while using the platform'  },
                  { key:'sms',            label:'SMS Notifications',            desc:'Text messages for important alerts'},
                  { key:'newCourse',      label:'New Course Alerts',            desc:'When new courses launch'          },
                  { key:'streakReminder', label:'Learning Streak Reminders',    desc:'Daily reminder to study'          },
                  { key:'weeklyDigest',   label:'Weekly Progress Digest',       desc:'Summary of your weekly progress'  },
                  { key:'achievements',   label:'Achievement Unlocked',         desc:'When you earn a new badge'        },
                  { key:'referrals',      label:'Referral Updates',             desc:'When your referral joins'         },
                  { key:'announcements',  label:'Course Announcements',         desc:'Updates from your instructors'    },
                ].map(pref => (
                  <div key={pref.key} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
                    style={{ border:`1px solid ${C.gray[200]}` }}>
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm font-semibold" style={{ color:C.navy }}>{pref.label}</p>
                      <p className="text-xs mt-0.5" style={{ color:C.gray[400] }}>{pref.desc}</p>
                    </div>
                    <Toggle checked={notifPrefs[pref.key]} onChange={v => setNotifPrefs(p=>({...p,[pref.key]:v}))}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Password change */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-5 flex items-center gap-2" style={{ color:C.navy }}>
                <Key size={14} style={{ color:C.navy }}/> Change Password
              </h3>
              <div className="space-y-3">
                {[
                  { label:'Current Password', val:pwOld, set:setPwOld, ph:'Enter current password'  },
                  { label:'New Password',      val:pwNew, set:setPwNew, ph:'Min 8 characters'        },
                  { label:'Confirm Password',  val:pwConf,set:setPwConf,ph:'Repeat new password'    },
                ].map((f,i) => (
                  <div key={i}>
                    <label className="block text-xs font-bold mb-1.5" style={{ color:C.gray[600] }}>{f.label}</label>
                    <div className="relative">
                      <input type={showPw?'text':'password'} value={f.val} onChange={e=>f.set(e.target.value)}
                        placeholder={f.ph}
                        className="w-full px-3 py-2.5 pr-10 rounded-xl text-sm outline-none transition-all"
                        style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}
                        onFocus={e=>e.target.style.borderColor=C.navy}
                        onBlur={e=>e.target.style.borderColor=C.gray[200]}/>
                      <button type="button" onClick={() => setShowPw(s=>!s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2">
                        {showPw ? <EyeOff size={14} style={{ color:C.gray[400] }}/> : <Eye size={14} style={{ color:C.gray[400] }}/>}
                      </button>
                    </div>
                  </div>
                ))}
                <button onClick={handlePasswordChange} disabled={pwSaving}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                  {pwSaving ? <><RefreshCw size={13} className="animate-spin"/> Updating…</> : <><Key size={13}/> Update Password</>}
                </button>
              </div>
            </div>

            {/* Privacy */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-5 flex items-center gap-2" style={{ color:C.navy }}>
                <Shield size={14} style={{ color:C.navy }}/> Privacy & Security
              </h3>
              {[
                { label:'Public Profile',        desc:'Anyone can view your profile and achievements' },
                { label:'Show Activity Status',  desc:'Let others see when you\'re online'           },
                { label:'Show Progress to Others',desc:'Share your course progress on your profile'  },
              ].map((s,i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl mb-2 hover:bg-gray-50 transition"
                  style={{ border:`1px solid ${C.gray[200]}` }}>
                  <div className="flex-1 min-w-0 mr-4">
                    <p className="text-sm font-semibold" style={{ color:C.navy }}>{s.label}</p>
                    <p className="text-xs mt-0.5" style={{ color:C.gray[400] }}>{s.desc}</p>
                  </div>
                  <Toggle checked={true} onChange={()=>{}}/>
                </div>
              ))}
            </div>

            {/* Help */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor:C.gray[200] }}>
              <h3 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                <HelpCircle size={14} style={{ color:C.navy }}/> Help & Support
              </h3>
              <div className="space-y-2">
                {[
                  { label:'Frequently Asked Questions', to:'/faq',     icon:BookOpen      },
                  { label:'Contact Support',            to:'/support', icon:MessageCircle },
                  { label:'Report a Problem',           to:'/report',  icon:Flag          },
                ].map((l,i) => (
                  <Link key={i} to={l.to}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition"
                    style={{ border:`1px solid ${C.gray[200]}` }}>
                    <div className="flex items-center gap-2.5">
                      <l.icon size={14} style={{ color:C.navy }}/>
                      <span className="text-sm" style={{ color:C.gray[700] }}>{l.label}</span>
                    </div>
                    <ChevronRight size={14} style={{ color:C.gray[400] }}/>
                  </Link>
                ))}
              </div>
            </div>

            {/* Danger zone */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2" style={{ borderColor:`${C.rose}30` }}>
              <h3 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color:C.rose }}>
                <AlertTriangle size={14}/> Danger Zone
              </h3>
              {!deleteConfirm ? (
                <button onClick={() => setDeleteConfirm(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border-2 hover:bg-red-50 transition"
                  style={{ borderColor:C.rose, color:C.rose }}>
                  <Trash2 size={13}/> Delete My Account
                </button>
              ) : (
                <div className="p-4 rounded-xl" style={{ background:`${C.rose}08` }}>
                  <p className="text-sm font-bold mb-1" style={{ color:C.rose }}>Are you absolutely sure?</p>
                  <p className="text-xs mb-4" style={{ color:C.gray[500] }}>This will permanently delete your account, all progress, certificates, and points. This action cannot be undone.</p>
                  <div className="flex gap-2">
                    <button onClick={() => setDeleteConfirm(false)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border" style={{ borderColor:C.gray[200], color:C.gray[600] }}>
                      Cancel
                    </button>
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background:C.rose }}>
                      <Trash2 size={12}/> Yes, Delete Account
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display:none }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none }
        * { box-sizing:border-box }
        @media(max-width:640px){ input,textarea,button{ font-size:16px!important } }
      `}</style>
    </div>
  )
}
