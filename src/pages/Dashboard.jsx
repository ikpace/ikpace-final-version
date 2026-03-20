// src/pages/Dashboard.jsx
// iKPACE Student Dashboard — clean, real data, working signout, IQ quiz, avatar upload
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import {
  BookOpen,
  CreditCard,
  LogOut,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Award,
  User,
  BarChart3,
  RefreshCw,
  Flame,
  Send,
  X,
  TrendingUp,
  Calendar,
  Camera,
  Menu,
  Home,
  Brain
} from 'lucide-react'

// ── Brand tokens ───────────────────────────────────────────────────────────────
const C = {
  navy:   '#1A3D7C',
  navyD:  '#0F2655',
  navyM:  '#2F5EA8',
  orange: '#FF7A00',
  orangeL:'#FF9A3C',
  green:  '#008F4C',
  red:    '#DC2626',
  yellow: '#F59E0B',
  purple: '#7C3AED',
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 900:'#0F172A'
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmtDate  = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'
const fmtTime  = d => d ? new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : ''
const fmtMoney = n => `$${Number(n||0).toFixed(2)}`
const initials = s => s ? s.trim().split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) : 'U'
const firstName= s => s ? s.trim().split(' ')[0] : 'Learner'
const clamp    = (v,a,b) => Math.min(Math.max(Number(v)||0,a),b)
const tzName   = () => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g,' ') } catch { return '' } }

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 5)  return { text:'Good night',     emoji:'🌙' }
  if (h < 12) return { text:'Good morning',   emoji:'☀️' }
  if (h < 17) return { text:'Good afternoon', emoji:'🌤️' }
  if (h < 21) return { text:'Good evening',   emoji:'🌅' }
  return             { text:'Good night',     emoji:'🌙' }
}

// ── UI atoms ──────────────────────────────────────────────────────────────────
const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{
    background:'white', borderRadius:16, border:`1px solid ${C.gray[200]}`,
    boxShadow:'0 1px 8px rgba(0,0,0,0.05)', padding:20, ...style
  }}>{children}</div>
)

const Pill = ({ children, color, bg }) => (
  <span style={{
    fontSize:11, fontWeight:700, color,
    background:bg||`${color}15`, padding:'3px 10px',
    borderRadius:20, display:'inline-block'
  }}>{children}</span>
)

const Bar = ({ pct=0, color=C.navy, h=8 }) => {
  const p = clamp(pct,0,100)
  return (
    <div style={{ height:h, borderRadius:h, background:C.gray[100], overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${p}%`, background:color, borderRadius:h, transition:'width .6s ease', minWidth:p>0?4:0 }}/>
    </div>
  )
}

// ── IQ Quiz Panel (replaces AI chat) ─────────────────────────────────────────
const IQ_QUESTIONS = {
  'Virtual Assistant Pro': [
    { q:'What is the PRIMARY role of a Virtual Assistant?', opts:['Writing code','Managing tasks for clients','Designing logos','Teaching students'], ans:1, exp:'A VA manages tasks, communications, and schedules remotely for clients.' },
    { q:'Which tool is best for managing client emails?', opts:['Photoshop','Gmail + filters','Excel','WhatsApp'], ans:1, exp:'Gmail with filters and labels is the industry standard for VA email management.' },
    { q:'What does "onboarding" mean in VA work?', opts:['Logging in','Welcoming and setting up a new client','Sending invoices','Ending a contract'], ans:1, exp:'Onboarding is the process of welcoming and orienting a new client into your workflow.' },
  ],
  'Social Media Marketing': [
    { q:'What does CTR stand for in digital marketing?', opts:['Creative Text Rate','Click-Through Rate','Customer Trust Rating','Content Time Reach'], ans:1, exp:'CTR (Click-Through Rate) measures how many people clicked your ad vs how many saw it.' },
    { q:'Which platform has the LARGEST global user base?', opts:['Twitter','TikTok','Facebook','Snapchat'], ans:2, exp:'Facebook has over 3 billion monthly active users, making it the largest social platform.' },
    { q:'What is a "Call to Action" (CTA)?', opts:['A phone call to your client','A prompt asking users to do something','A type of paid ad','A social media comment'], ans:1, exp:'A CTA is any prompt that encourages your audience to take a specific action (e.g. "Buy Now").' },
  ],
  'Canva & Graphic Design': [
    { q:'What does "white space" mean in design?', opts:['Using white color only','Empty space around elements','A type of font','A Canva template'], ans:1, exp:'White space (negative space) gives designs breathing room and improves readability.' },
    { q:'Which color model is used for PRINT design?', opts:['RGB','HEX','CMYK','HSL'], ans:2, exp:'CMYK (Cyan, Magenta, Yellow, Key/Black) is used for print, while RGB is for screens.' },
    { q:'What is a "brand kit"?', opts:['A physical toolkit','A set of brand colors, fonts and logos','A Canva subscription','A type of template'], ans:1, exp:'A brand kit defines your visual identity: colors, fonts, logos, and style guidelines.' },
  ],
  'Smart Kids Coding': [
    { q:'What is Scratch?', opts:['A game console','A visual programming language for kids','A type of computer virus','A drawing app'], ans:1, exp:'Scratch is a free visual programming language made by MIT, designed for children to learn coding.' },
    { q:'In coding, what does a "loop" do?', opts:['Crashes the program','Repeats an action multiple times','Deletes data','Connects to the internet'], ans:1, exp:'A loop repeats a set of instructions a specified number of times or until a condition is met.' },
    { q:'What is a "sprite" in Scratch?', opts:['A soft drink','A type of variable','A character or object on screen','A sound file'], ans:2, exp:'In Scratch, a sprite is any character, object, or image that you can program to move and interact.' },
  ],
  'Freelancing & Online Income': [
    { q:'What is Upwork?', opts:['A social media app','A freelancing marketplace','A coding language','A design tool'], ans:1, exp:'Upwork is one of the world\'s largest freelancing platforms where clients post jobs and freelancers apply.' },
    { q:'What should your Upwork profile ALWAYS include?', opts:['Your home address','A clear photo, bio and portfolio','Your bank details','Your phone number'], ans:1, exp:'A professional photo, compelling bio, and portfolio samples dramatically increase your chances of being hired.' },
    { q:'What is a "retainer" in freelancing?', opts:['A type of invoice','A monthly fixed fee for ongoing work','A client complaint','A platform fee'], ans:1, exp:'A retainer is an agreement where a client pays you a fixed monthly fee for a set amount of work.' },
  ],
  'AI Prompt Engineering': [
    { q:'What is "prompt engineering"?', opts:['Building AI software','Crafting inputs to get better AI outputs','Installing AI models','Drawing with AI'], ans:1, exp:'Prompt engineering is the skill of writing effective instructions to guide AI models to produce the best results.' },
    { q:'Which company created ChatGPT?', opts:['Google','Microsoft','OpenAI','Apple'], ans:2, exp:'ChatGPT was created by OpenAI, founded in 2015 and headquartered in San Francisco.' },
    { q:'What does "hallucination" mean in AI?', opts:['AI dreaming','AI generating false or made-up information','AI creating images','AI speaking aloud'], ans:1, exp:'AI hallucination refers to when an AI model confidently generates information that is incorrect or fabricated.' },
  ],
}

const DEFAULT_QUESTIONS = [
  { q:'What does HTML stand for?', opts:['HyperText Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyper Transfer Main Link'], ans:0, exp:'HTML (HyperText Markup Language) is the standard language for creating web pages.' },
  { q:'Which of these is a good study habit?', opts:['Studying for 10 hours straight','Taking regular short breaks','Skipping sleep','Avoiding notes'], ans:1, exp:'Regular breaks (like the Pomodoro technique) improve focus and long-term retention.' },
  { q:'What is the best way to retain new information?', opts:['Read once and move on','Teach it to someone else','Memorise by repetition only','Avoid practice'], ans:1, exp:'The "Feynman Technique" — teaching a concept to someone else — is one of the best ways to master it.' },
]

function IQQuiz({ courseTitle, onClose }) {
  const questions = IQ_QUESTIONS[courseTitle] || DEFAULT_QUESTIONS
  const [idx,     setIdx]     = useState(0)
  const [chosen,  setChosen]  = useState(null)
  const [score,   setScore]   = useState(0)
  const [done,    setDone]    = useState(false)
  const [showExp, setShowExp] = useState(false)

  const q = questions[idx]

  const choose = (i) => {
    if (chosen !== null) return
    setChosen(i)
    setShowExp(true)
    if (i === q.ans) setScore(s => s+1)
  }

  const next = () => {
    if (idx < questions.length - 1) {
      setIdx(i => i+1); setChosen(null); setShowExp(false)
    } else {
      setDone(true)
    }
  }

  const restart = () => { setIdx(0); setChosen(null); setScore(0); setDone(false); setShowExp(false) }

  const pct   = Math.round((score / questions.length) * 100)
  const grade = pct >= 80 ? { label:'Excellent! 🏆', color:C.green } : pct >= 60 ? { label:'Good job! 👍', color:C.orange } : { label:'Keep learning! 📚', color:C.navy }

  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(15,22,85,0.6)', backdropFilter:'blur(4px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:16 }}>
      <div style={{ width:'100%', maxWidth:500, background:'white', borderRadius:24,
        overflow:'hidden', boxShadow:'0 24px 60px rgba(0,0,0,0.25)', maxHeight:'90vh', display:'flex', flexDirection:'column' }}>

        {/* Header */}
        <div style={{ padding:'18px 20px', background:`linear-gradient(135deg,${C.navyD},${C.navy})`,
          display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'rgba(255,255,255,0.15)',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>🧠</div>
            <div>
              <p style={{ color:'white', fontWeight:900, fontSize:15, margin:0 }}>iKPACE Test ur iQ</p>
              <p style={{ color:'rgba(255,255,255,0.55)', fontSize:11, margin:0 }}>{courseTitle}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.15)', border:'none',
            width:32, height:32, borderRadius:10, cursor:'pointer', color:'white',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <X size={16}/>
          </button>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:'auto', padding:24 }}>
          {!done ? (
            <>
              {/* Progress */}
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
                <span style={{ fontSize:12, color:C.gray[400], fontWeight:600 }}>
                  Question {idx+1} of {questions.length}
                </span>
                <span style={{ fontSize:12, fontWeight:800, color:C.orange }}>
                  Score: {score}/{idx + (chosen !== null ? 1 : 0)}
                </span>
              </div>
              <Bar pct={((idx + (chosen!==null?1:0)) / questions.length) * 100} color={C.orange} h={6}/>

              {/* Question */}
              <p style={{ fontSize:16, fontWeight:800, color:C.navy, margin:'20px 0 16px', lineHeight:1.4 }}>
                {q.q}
              </p>

              {/* Options */}
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {q.opts.map((opt, i) => {
                  let bg = C.gray[50], border = C.gray[200], color = C.gray[700]
                  if (chosen !== null) {
                    if (i === q.ans)                    { bg=`${C.green}12`; border=C.green; color=C.green }
                    else if (i === chosen && i !== q.ans){ bg=`${C.red}10`;  border=C.red;   color=C.red   }
                  } else if (chosen === null) {
                    // hover handled via onMouseEnter inline not possible easily — keep clean
                  }
                  return (
                    <button key={i} onClick={() => choose(i)} disabled={chosen !== null}
                      style={{ width:'100%', textAlign:'left', padding:'13px 16px', borderRadius:12,
                        background:bg, border:`2px solid ${border}`, color, fontSize:14,
                        fontWeight:600, cursor: chosen===null ? 'pointer' : 'default',
                        transition:'all .2s', display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{ width:24, height:24, borderRadius:'50%', flexShrink:0,
                        background: chosen===null ? C.gray[200] : i===q.ans ? C.green : i===chosen ? C.red : C.gray[200],
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:11, fontWeight:900, color:'white' }}>
                        {String.fromCharCode(65+i)}
                      </span>
                      {opt}
                      {chosen!==null && i===q.ans && <span style={{ marginLeft:'auto' }}>✓</span>}
                      {chosen!==null && i===chosen && i!==q.ans && <span style={{ marginLeft:'auto' }}>✗</span>}
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {showExp && (
                <div style={{ marginTop:14, padding:'12px 14px', borderRadius:12,
                  background: chosen===q.ans ? `${C.green}10` : `${C.orange}10`,
                  border:`1px solid ${chosen===q.ans ? C.green : C.orange}30` }}>
                  <p style={{ fontSize:13, color:C.gray[700], margin:0, lineHeight:1.55 }}>
                    <strong>💡 Explanation:</strong> {q.exp}
                  </p>
                </div>
              )}

              {chosen !== null && (
                <button onClick={next} style={{ marginTop:16, width:'100%', padding:'12px',
                  borderRadius:12, background:`linear-gradient(135deg,${C.navy},${C.navyM})`,
                  color:'white', fontWeight:800, fontSize:14, border:'none', cursor:'pointer' }}>
                  {idx < questions.length-1 ? 'Next Question →' : 'See Results 🏆'}
                </button>
              )}
            </>
          ) : (
            /* Results */
            <div style={{ textAlign:'center', padding:'10px 0' }}>
              <div style={{ fontSize:56, marginBottom:12 }}>
                {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '📚'}
              </div>
              <h2 style={{ fontWeight:900, fontSize:24, color:grade.color, marginBottom:6 }}>{grade.label}</h2>
              <p style={{ fontSize:15, color:C.gray[500], marginBottom:20 }}>
                You scored <strong style={{ color:C.navy, fontSize:22 }}>{score}/{questions.length}</strong>
              </p>

              {/* Score circle */}
              <div style={{ width:100, height:100, borderRadius:'50%', margin:'0 auto 24px',
                background:`conic-gradient(${grade.color} ${pct*3.6}deg, ${C.gray[100]} 0deg)`,
                display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 0 0 8px white inset' }}>
                <span style={{ fontSize:22, fontWeight:900, color:grade.color }}>{pct}%</span>
              </div>

              <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
                <button onClick={restart} style={{ padding:'11px 22px', borderRadius:12,
                  background:C.navy, color:'white', fontWeight:700, fontSize:13,
                  border:'none', cursor:'pointer' }}>
                  Try Again 🔄
                </button>
                <button onClick={onClose} style={{ padding:'11px 22px', borderRadius:12,
                  background:C.gray[100], color:C.gray[700], fontWeight:700, fontSize:13,
                  border:'none', cursor:'pointer' }}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  // ── Data state ──────────────────────────────────────────────────────────
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [fullName,    setFullName]    = useState('')
  const [email,       setEmail]       = useState('')
  const [avatarUrl,   setAvatarUrl]   = useState('')
  const [loginAt,     setLoginAt]     = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [payments,    setPayments]    = useState([])

  // ── UI state ────────────────────────────────────────────────────────────
  const [tab,        setTab]        = useState('home')
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [quizCourse, setQuizCourse] = useState(null)
  const [nowStr,     setNowStr]     = useState('')

  // ── Profile edit state ──────────────────────────────────────────────────
  const [editName,    setEditName]    = useState('')
  const [savingName,  setSavingName]  = useState(false)
  const [nameMsg,     setNameMsg]     = useState('')
  const [uploadingImg,setUploadingImg]= useState(false)
  const [imgMsg,      setImgMsg]      = useState('')
  const fileRef = useRef(null)

  // Live clock
  useEffect(() => {
    const tick = () => setNowStr(new Date().toLocaleString('en-GB',{
      weekday:'short', day:'numeric', month:'short', year:'numeric',
      hour:'2-digit', minute:'2-digit', second:'2-digit'
    }))
    tick()
    const iv = setInterval(tick, 1000)
    return () => clearInterval(iv)
  }, [])

  // Auth guard + fetch
  useEffect(() => {
    if (!user) { navigate('/login'); return }
    fetchAll()
  }, [user])

  const fetchAll = async () => {
    try {
      setLoading(true); setError(null)
      setEmail(user.email || '')
      setLoginAt(user.last_sign_in_at || user.created_at)

      // Profile
      const { data: prof } = await supabase
        .from('profiles')
        .select('full_name, avatar_url')
        .eq('id', user.id)
        .single()

      const name = prof?.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Learner'
      setFullName(name)
      setEditName(name)
      setAvatarUrl(prof?.avatar_url || '')

      // Enrollments — ONLY what this user is enrolled in
      const { data: enrData, error: enrErr } = await supabase
        .from('enrollments')
        .select(`id, course_id, status, progress, enrolled_at, completed_at,
          courses(id, title, slug, description, thumbnail_url, category, level, duration_weeks, price)`)
        .eq('user_id', user.id)
        .order('enrolled_at', { ascending: false })

      if (enrErr) throw enrErr
      setEnrollments(enrData || [])

      // Payments
      const { data: payData } = await supabase
        .from('payments')
        .select('id, course_id, course_title, amount, status, reference, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      setPayments(payData || [])
    } catch (err) {
      setError(err.message || 'Could not load dashboard. Please refresh.')
    } finally {
      setLoading(false)
    }
  }

  // ── Save name ────────────────────────────────────────────────────────────
  const saveName = async () => {
    if (!editName.trim()) return
    setSavingName(true); setNameMsg('')
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({ id: user.id, full_name: editName.trim() }, { onConflict:'id' })
      if (error) throw error
      setFullName(editName.trim())
      setNameMsg('✅ Name updated!')
    } catch (e) {
      setNameMsg('❌ ' + e.message)
    }
    setSavingName(false)
    setTimeout(() => setNameMsg(''), 3000)
  }

  // ── Upload avatar ────────────────────────────────────────────────────────
  const uploadAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setImgMsg('❌ Image must be under 2MB'); return }
    setUploadingImg(true); setImgMsg('')
    try {
      const ext  = file.name.split('.').pop()
      const path = `avatars/${user.id}.${ext}`
      const { error: upErr } = await supabase.storage
        .from('avatars')
        .upload(path, file, { upsert: true, contentType: file.type })
      if (upErr) throw upErr

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      const { error: dbErr } = await supabase
        .from('profiles')
        .upsert({ id: user.id, avatar_url: publicUrl }, { onConflict:'id' })
      if (dbErr) throw dbErr

      setAvatarUrl(publicUrl + '?t=' + Date.now())
      setImgMsg('✅ Photo updated!')
    } catch (err) {
      setImgMsg('❌ ' + err.message)
    }
    setUploadingImg(false)
    setTimeout(() => setImgMsg(''), 3000)
  }

  // ── Sign out ─────────────────────────────────────────────────────────────
  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (_) {}
    navigate('/')
  }

  // ── Computed ─────────────────────────────────────────────────────────────
  const total     = enrollments.length
  const completed = enrollments.filter(e => clamp(e.progress,0,100) >= 100).length
  const inProg    = enrollments.filter(e => { const p=clamp(e.progress,0,100); return p>0&&p<100 }).length
  const avgProg   = total ? Math.round(enrollments.reduce((s,e)=>s+clamp(e.progress,0,100),0)/total) : 0
  const totalPaid = payments.filter(p=>['success','paid'].includes((p.status||'').toLowerCase())).reduce((s,p)=>s+Number(p.amount||0),0)
  const streak    = enrollments.length ? Math.min(Math.ceil((Date.now()-new Date(enrollments[enrollments.length-1]?.enrolled_at).getTime())/86400000),30) : 0

  const { text:greet, emoji:greetEmoji } = getGreeting()
  const timezone = tzName()
  const shortId  = user?.id?.slice(0,8).toUpperCase() || '—'

  // ── Category emoji ────────────────────────────────────────────────────────
  const catEmoji = cat => ({ Tech:'🤖', Design:'🎨', Marketing:'📱', Kids:'🚀', Business:'💼', Career:'💼' }[cat] || '📚')

  // ── Nav items ────────────────────────────────────────────────────────────
  const navItems = [
    { id:'home',     label:'Home',       icon:Home       },
    { id:'courses',  label:'My Courses', icon:BookOpen   },
    { id:'payments', label:'Payments',   icon:CreditCard },
    { id:'profile',  label:'Profile',    icon:User       },
  ]

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:C.gray[50], fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ textAlign:'center' }}>
        <div style={{ width:56, height:56, borderRadius:16, margin:'0 auto 14px',
          background:`linear-gradient(135deg,${C.navy},${C.orange})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'white', fontWeight:900, fontSize:20 }}>iK</div>
        <p style={{ color:C.gray[500], fontSize:14 }}>Loading your dashboard…</p>
      </div>
    </div>
  )

  if (error) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:C.gray[50], padding:20, fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <Card style={{ maxWidth:400, width:'100%', textAlign:'center' }}>
        <AlertCircle size={40} style={{ color:C.red, margin:'0 auto 12px', display:'block' }}/>
        <h2 style={{ fontWeight:800, fontSize:18, marginBottom:8 }}>Something went wrong</h2>
        <p style={{ color:C.gray[500], fontSize:14, marginBottom:20 }}>{error}</p>
        <button onClick={fetchAll} style={{ display:'inline-flex', alignItems:'center', gap:8,
          background:C.navy, color:'white', padding:'11px 24px', borderRadius:10,
          fontWeight:700, fontSize:14, border:'none', cursor:'pointer' }}>
          <RefreshCw size={14}/> Try Again
        </button>
      </Card>
    </div>
  )

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight:'100vh', background:C.gray[50],
      fontFamily:"'DM Sans','Segoe UI',sans-serif", color:C.gray[900] }}>

      {/* ══ HEADER — no logo, no sign-out button (we have main site header already) ══ */}
      {/* This is the DASHBOARD sub-header with tabs + user info only */}
      <div style={{ background:'white', borderBottom:`1px solid ${C.gray[200]}`,
        position:'sticky', top:0, zIndex:30, boxShadow:'0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth:1120, margin:'0 auto', padding:'0 20px',
          height:56, display:'flex', alignItems:'center', gap:8 }}>

          {/* Desktop tabs */}
          <nav style={{ display:'flex', gap:2, flex:1 }}>
            {navItems.map(n => (
              <button key={n.id} onClick={()=>setTab(n.id)} style={{
                display:'flex', alignItems:'center', gap:6,
                padding:'8px 14px', borderRadius:10, border:'none', cursor:'pointer',
                fontSize:13, fontWeight:700, transition:'all .15s',
                background: tab===n.id ? `${C.navy}10` : 'transparent',
                color: tab===n.id ? C.navy : C.gray[500]
              }} className="dash-tab">
                <n.icon size={15}/>
                <span className="dash-tab-label">{n.label}</span>
                {n.id==='courses' && total>0 &&
                  <span style={{ background:C.orange, color:'white', fontSize:10,
                    fontWeight:800, borderRadius:20, padding:'1px 6px' }}>{total}</span>}
              </button>
            ))}
          </nav>

          {/* Right: avatar + name only (no duplicate logo, no duplicate sign-out) */}
          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
            <div className="dash-userinfo" style={{ textAlign:'right' }}>
              <p style={{ fontSize:13, fontWeight:800, color:C.navy, margin:0 }}>{firstName(fullName)}</p>
              <p style={{ fontSize:10, color:C.gray[400], margin:0 }}>{nowStr}</p>
            </div>

            {/* Avatar */}
            <div style={{ width:36, height:36, borderRadius:10, overflow:'hidden', flexShrink:0,
              background:`linear-gradient(135deg,${C.navy},${C.orange})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'white', fontWeight:900, fontSize:13 }}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                : initials(fullName)}
            </div>

            {/* Mobile menu button */}
            <button className="dash-mobile-menu" onClick={()=>setMenuOpen(true)} style={{
              background:'none', border:`1.5px solid ${C.gray[200]}`, borderRadius:9,
              width:36, height:36, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
              <Menu size={17} style={{ color:C.navy }}/>
            </button>
          </div>
        </div>
      </div>

      {/* ══ MOBILE DRAWER ═════════════════════════════════════════════════════ */}
      {menuOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={()=>setMenuOpen(false)}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.4)' }}/>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:256,
            background:'white', boxShadow:'4px 0 24px rgba(0,0,0,0.12)' }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ padding:'24px 20px 16px', background:`linear-gradient(135deg,${C.navyD},${C.navyM})` }}>
              <div style={{ width:52, height:52, borderRadius:14, overflow:'hidden', marginBottom:10,
                background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'white', fontWeight:900, fontSize:18 }}>
                {avatarUrl ? <img src={avatarUrl} style={{ width:'100%', height:'100%', objectFit:'cover' }}/> : initials(fullName)}
              </div>
              <p style={{ color:'white', fontWeight:900, fontSize:16, margin:'0 0 2px' }}>{fullName}</p>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, margin:0 }}>{email}</p>
            </div>
            <div style={{ padding:12 }}>
              {navItems.map(n => (
                <button key={n.id} onClick={()=>{setTab(n.id);setMenuOpen(false)}} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  padding:'11px 14px', borderRadius:12, border:'none', cursor:'pointer',
                  background: tab===n.id ? `${C.navy}10` : 'transparent',
                  color: tab===n.id ? C.navy : C.gray[600],
                  fontSize:14, fontWeight:700, marginBottom:2 }}>
                  <n.icon size={16}/>{n.label}
                </button>
              ))}
              <div style={{ borderTop:`1px solid ${C.gray[100]}`, marginTop:12, paddingTop:12 }}>
                <button onClick={handleSignOut} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:12,
                  padding:'11px 14px', borderRadius:12, border:'none', cursor:'pointer',
                  background:`${C.red}08`, color:C.red, fontSize:14, fontWeight:700 }}>
                  <LogOut size={16}/> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ PAGE CONTENT ══════════════════════════════════════════════════════ */}
      <div style={{ maxWidth:1120, margin:'0 auto', padding:'24px 20px 80px' }}>

        {/* ── HOME TAB ────────────────────────────────────────────────────── */}
        {tab === 'home' && (
          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>

            {/* Welcome banner */}
            <div style={{ borderRadius:20, padding:'28px 28px 22px', color:'white',
              position:'relative', overflow:'hidden',
              background:`linear-gradient(120deg,${C.navyD} 0%,${C.navyM} 100%)` }}>
              <div style={{ position:'absolute', top:-50, right:-50, width:200, height:200,
                borderRadius:'50%', background:'rgba(255,122,0,0.1)' }}/>
              <p style={{ fontSize:13, opacity:.65, margin:'0 0 3px', position:'relative' }}>
                {greetEmoji} {greet}
              </p>
              <h1 style={{ fontSize:'clamp(20px,5vw,28px)', fontWeight:900, margin:'0 0 6px',
                position:'relative', lineHeight:1.2 }}>
                Hello, <span style={{ color:C.orangeL }}>{fullName || 'Learner'}</span>! 👋
              </h1>
              <p style={{ fontSize:13, opacity:.6, margin:'0 0 18px', position:'relative' }}>
                Welcome back to iKPACE.
                {total > 0
                  ? ` You're enrolled in ${total} course${total!==1?'s':''}.`
                  : ' Start your learning journey today!'}
              </p>

              {/* Info chips */}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, position:'relative' }}>
                {[
                  { icon:'📅', label:'Last login', val: loginAt ? fmtDate(loginAt)+' '+fmtTime(loginAt) : '—' },
                  { icon:'🌍', label:'Timezone',   val: timezone || '—' },
                  { icon:'🆔', label:'Student ID', val: shortId },
                ].map(({ icon, label, val }, i) => (
                  <div key={i} style={{ background:'rgba(255,255,255,0.12)', borderRadius:10,
                    padding:'7px 12px' }}>
                    <p style={{ fontSize:9, opacity:.55, margin:'0 0 1px', textTransform:'uppercase', letterSpacing:'.4px' }}>{label}</p>
                    <p style={{ fontSize:12, fontWeight:700, margin:0 }}>{icon} {val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Live clock bar */}
            <div style={{ textAlign:'center', fontSize:12, color:C.gray[400], letterSpacing:'.3px' }}>
              🕐 {nowStr}
            </div>

            {/* Stat cards */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:12 }}>
              {[
                { icon:BookOpen,    label:'Enrolled',    val:total,             color:C.navy   },
                { icon:PlayCircle,  label:'In Progress', val:inProg,            color:C.orange },
                { icon:CheckCircle, label:'Completed',   val:completed,         color:C.green  },
                { icon:TrendingUp,  label:'Avg Progress',val:`${avgProg}%`,     color:C.navyM  },
                { icon:Flame,       label:'Day Streak',  val:`${streak} 🔥`,   color:C.orange },
                { icon:CreditCard,  label:'Total Paid',  val:fmtMoney(totalPaid),color:C.navy  },
              ].map((s,i) => (
                <Card key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:14 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:`${s.color}12`,
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <s.icon size={17} style={{ color:s.color }}/>
                  </div>
                  <div>
                    <p style={{ fontSize:18, fontWeight:900, color:s.color, margin:0 }}>{s.val}</p>
                    <p style={{ fontSize:11, color:C.gray[400], margin:'1px 0 0' }}>{s.label}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Continue Learning */}
            {inProg > 0 && (
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:12 }}>
                  <h2 style={{ fontWeight:800, fontSize:16, color:C.navy, margin:0 }}>
                    ▶️ Continue Learning
                  </h2>
                  <button onClick={()=>setTab('courses')} style={{ background:'none', border:'none',
                    color:C.navyM, fontSize:13, fontWeight:700, cursor:'pointer' }}>
                    All courses →
                  </button>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:14 }}>
                  {enrollments
                    .filter(e => { const p=clamp(e.progress,0,100); return p>0&&p<100 })
                    .map(e => {
                      const c   = e.courses || {}
                      const pct = clamp(e.progress,0,100)
                      return (
                        <Card key={e.id} style={{ padding:0, overflow:'hidden', cursor:'pointer' }}
                          onClick={()=>navigate(`/test-course-player/${e.course_id}`)}>
                          <div style={{ height:4, background:`linear-gradient(90deg,${C.navy},${C.orange})` }}/>
                          <div style={{ padding:16 }}>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                              <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:0, lineHeight:1.3 }}>{c.title}</h3>
                              <Pill color={C.orange}>In Progress</Pill>
                            </div>
                            <p style={{ fontSize:12, color:C.gray[400], margin:'0 0 10px' }}>{c.duration_weeks}w · {c.level}</p>
                            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                              <span style={{ color:C.gray[500] }}>Progress</span>
                              <span style={{ fontWeight:800, color:C.orange }}>{pct}%</span>
                            </div>
                            <Bar pct={pct} color={C.orange}/>
                            <div style={{ marginTop:12, padding:'9px 0', borderRadius:10,
                              background:`linear-gradient(135deg,${C.navy},${C.navyM})`,
                              color:'white', fontWeight:700, fontSize:13,
                              display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
                              <PlayCircle size={14}/> Continue Learning
                            </div>
                          </div>
                        </Card>
                      )
                    })}
                </div>
              </div>
            )}

            {/* No courses yet */}
            {total === 0 && (
              <Card style={{ textAlign:'center', padding:'40px 24px' }}>
                <div style={{ fontSize:44, marginBottom:12 }}>📚</div>
                <h3 style={{ fontWeight:800, fontSize:17, color:C.navy, marginBottom:8 }}>No courses yet</h3>
                <p style={{ color:C.gray[500], fontSize:14, marginBottom:20 }}>
                  Browse our courses and start learning today for just $7!
                </p>
                <Link to="/courses" style={{ display:'inline-flex', alignItems:'center', gap:7,
                  background:C.orange, color:'white', padding:'11px 24px', borderRadius:10,
                  fontWeight:700, fontSize:14, textDecoration:'none' }}>
                  Browse Courses <ChevronRight size={15}/>
                </Link>
              </Card>
            )}
          </div>
        )}

        {/* ── MY COURSES TAB ──────────────────────────────────────────────── */}
        {tab === 'courses' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:18 }}>
              <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>
                My Courses <span style={{ fontSize:15, color:C.gray[400], fontWeight:600 }}>({total})</span>
              </h2>
              <Link to="/courses" style={{ display:'inline-flex', alignItems:'center', gap:6,
                background:C.orange, color:'white', padding:'8px 16px', borderRadius:10,
                fontWeight:700, fontSize:13, textDecoration:'none' }}>
                + Enroll More
              </Link>
            </div>

            {total === 0 ? (
              <Card style={{ textAlign:'center', padding:'50px 24px' }}>
                <div style={{ fontSize:48, marginBottom:14 }}>📚</div>
                <h3 style={{ fontWeight:800, fontSize:18, color:C.navy, marginBottom:8 }}>No courses enrolled</h3>
                <p style={{ color:C.gray[500], fontSize:14, marginBottom:22 }}>
                  Enroll in a course to start your learning journey.
                </p>
                <Link to="/courses" style={{ display:'inline-flex', alignItems:'center', gap:7,
                  background:`linear-gradient(135deg,${C.navy},${C.orange})`, color:'white',
                  padding:'12px 28px', borderRadius:12, fontWeight:700, fontSize:14, textDecoration:'none' }}>
                  Browse Courses <ChevronRight size={15}/>
                </Link>
              </Card>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {enrollments.map(e => {
                  const c    = e.courses || {}
                  const pct  = clamp(e.progress,0,100)
                  const done = pct >= 100
                  return (
                    <Card key={e.id} style={{ padding:0, overflow:'hidden' }}>
                      <div style={{ height:4, background: done
                        ? `linear-gradient(90deg,${C.green},#00C853)`
                        : pct>0 ? `linear-gradient(90deg,${C.navy},${C.orange})` : C.gray[200] }}/>
                      <div style={{ padding:20, display:'flex', flexWrap:'wrap', gap:16, alignItems:'flex-start' }}>

                        {/* Thumbnail */}
                        <div style={{ width:76, height:76, borderRadius:12, overflow:'hidden', flexShrink:0,
                          background:`${C.navy}08`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          {c.thumbnail_url
                            ? <img src={c.thumbnail_url} alt={c.title} style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                            : <span style={{ fontSize:30 }}>{catEmoji(c.category)}</span>}
                        </div>

                        {/* Content */}
                        <div style={{ flex:1, minWidth:180 }}>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:8, alignItems:'center', marginBottom:6 }}>
                            <h3 style={{ fontWeight:800, fontSize:16, color:C.navy, margin:0 }}>{c.title || '—'}</h3>
                            {done
                              ? <Pill color={C.green}>✓ Completed</Pill>
                              : pct>0 ? <Pill color={C.orange}>In Progress</Pill>
                              : <Pill color={C.gray[500]} bg={C.gray[100]}>Not Started</Pill>}
                          </div>

                          {c.description && (
                            <p style={{ fontSize:13, color:C.gray[500], margin:'0 0 10px', lineHeight:1.5 }}>
                              {c.description.length>100 ? c.description.slice(0,100)+'…' : c.description}
                            </p>
                          )}

                          <div style={{ display:'flex', flexWrap:'wrap', gap:10, fontSize:12,
                            color:C.gray[400], marginBottom:12 }}>
                            {c.duration_weeks && <span>⏱ {c.duration_weeks} weeks</span>}
                            {c.level         && <span>📶 {c.level}</span>}
                            {c.category      && <span>📂 {c.category}</span>}
                            {e.enrolled_at   && <span>📅 {fmtDate(e.enrolled_at)}</span>}
                            {done && e.completed_at && <span style={{ color:C.green }}>🏆 Done {fmtDate(e.completed_at)}</span>}
                          </div>

                          {/* Progress bar */}
                          <div style={{ marginBottom:14 }}>
                            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                              <span style={{ color:C.gray[500] }}>Progress</span>
                              <span style={{ fontWeight:800, color: done?C.green:pct>0?C.orange:C.gray[400] }}>{pct}%</span>
                            </div>
                            <Bar pct={pct} color={done?C.green:C.orange} h={10}/>
                          </div>

                          {/* Buttons */}
                          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                            <Link to={`/test-course-player/${e.course_id}`}
                              style={{ display:'inline-flex', alignItems:'center', gap:6,
                                background: done?C.green:C.navy, color:'white',
                                padding:'9px 18px', borderRadius:10, fontWeight:700,
                                fontSize:13, textDecoration:'none' }}>
                              <PlayCircle size={13}/>
                              {done ? 'Review' : pct>0 ? 'Continue Learning' : 'Start Learning'}
                            </Link>

                            {done && (
                              <Link to={`/certificate/${e.course_id}`}
                                style={{ display:'inline-flex', alignItems:'center', gap:6,
                                  background:`${C.green}12`, color:C.green,
                                  padding:'9px 16px', borderRadius:10, fontWeight:700,
                                  fontSize:13, textDecoration:'none', border:`1px solid ${C.green}25` }}>
                                <Award size={13}/> Certificate
                              </Link>
                            )}

                            <Link to={`/course/${c.slug||e.course_id}`}
                              style={{ display:'inline-flex', alignItems:'center', gap:5,
                                background:C.gray[100], color:C.gray[700],
                                padding:'9px 13px', borderRadius:10, fontWeight:600,
                                fontSize:13, textDecoration:'none' }}>
                              Details <ChevronRight size={13}/>
                            </Link>

                            {/* IQ Test button */}
                            <button onClick={()=>setQuizCourse(c.title||'General')}
                              style={{ display:'inline-flex', alignItems:'center', gap:6,
                                background:`${C.purple}12`, color:C.purple,
                                padding:'9px 13px', borderRadius:10, fontWeight:700,
                                fontSize:13, border:`1px solid ${C.purple}20`, cursor:'pointer' }}>
                              🧠 Test ur iQ
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ── PAYMENTS TAB ─────────────────────────────────────────────────── */}
        {tab === 'payments' && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>Payment History</h2>

            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(190px,1fr))', gap:12 }}>
              <Card style={{ background:`linear-gradient(135deg,${C.navyD},${C.navyM})`, color:'white', border:'none' }}>
                <p style={{ fontSize:10, opacity:.6, margin:'0 0 4px', textTransform:'uppercase', letterSpacing:'.5px' }}>Total Invested</p>
                <p style={{ fontSize:26, fontWeight:900, margin:0, color:C.orangeL }}>{fmtMoney(totalPaid)}</p>
                <p style={{ fontSize:12, opacity:.5, margin:'3px 0 0' }}>{payments.length} transaction{payments.length!==1?'s':''}</p>
              </Card>
              <Card>
                <p style={{ fontSize:10, color:C.gray[400], margin:'0 0 4px', textTransform:'uppercase', letterSpacing:'.5px' }}>Courses Purchased</p>
                <p style={{ fontSize:26, fontWeight:900, margin:0, color:C.navy }}>{total}</p>
                <p style={{ fontSize:12, color:C.gray[400], margin:'3px 0 0' }}>Successfully enrolled</p>
              </Card>
            </div>

            {payments.length === 0 ? (
              <Card style={{ textAlign:'center', padding:'44px 24px' }}>
                <CreditCard size={38} style={{ color:C.gray[200], margin:'0 auto 12px', display:'block' }}/>
                <p style={{ fontWeight:700, fontSize:16, color:C.gray[600], marginBottom:6 }}>No payments yet</p>
                <p style={{ color:C.gray[400], fontSize:14 }}>Your payment history will appear here once you enroll.</p>
              </Card>
            ) : (
              <Card style={{ padding:0, overflow:'hidden' }}>
                <div style={{ padding:'14px 20px', borderBottom:`1px solid ${C.gray[100]}`,
                  fontWeight:800, fontSize:14, color:C.navy }}>All Transactions</div>
                {payments.map((p,i) => {
                  const ok = ['success','paid'].includes((p.status||'').toLowerCase())
                  return (
                    <div key={p.id} style={{ display:'flex', alignItems:'center', gap:12,
                      padding:'13px 20px', flexWrap:'wrap',
                      borderBottom:i<payments.length-1?`1px solid ${C.gray[100]}`:'none',
                      background:i%2===0?'white':C.gray[50] }}>
                      <div style={{ width:40, height:40, borderRadius:10, flexShrink:0,
                        background:`${ok?C.green:C.orange}12`,
                        display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                        {ok?'✅':'⏳'}
                      </div>
                      <div style={{ flex:1, minWidth:120 }}>
                        <p style={{ fontWeight:700, fontSize:14, color:C.gray[900], margin:'0 0 2px' }}>
                          {p.course_title || 'Course payment'}
                        </p>
                        <p style={{ fontSize:12, color:C.gray[400], margin:0 }}>
                          {fmtDate(p.created_at)} at {fmtTime(p.created_at)}
                          {p.reference ? ` · Ref: ${p.reference}` : ''}
                        </p>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <span style={{ fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20,
                          color:ok?C.green:C.orange, background:ok?`${C.green}12`:`${C.orange}12` }}>
                          {ok?'Paid':p.status||'Pending'}
                        </span>
                        <p style={{ fontWeight:900, fontSize:15, color:C.navy, margin:0 }}>{fmtMoney(p.amount)}</p>
                      </div>
                    </div>
                  )
                })}
              </Card>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ──────────────────────────────────────────────────── */}
        {tab === 'profile' && (
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>My Profile</h2>

            {/* Avatar + basic info */}
            <Card>
              <div style={{ display:'flex', alignItems:'flex-start', gap:20, flexWrap:'wrap' }}>

                {/* Avatar upload */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:10, flexShrink:0 }}>
                  <div style={{ width:80, height:80, borderRadius:20, overflow:'hidden', position:'relative',
                    background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'white', fontWeight:900, fontSize:28 }}>
                    {avatarUrl
                      ? <img src={avatarUrl} alt="avatar" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                      : initials(fullName)}
                  </div>

                  <input ref={fileRef} type="file" accept="image/*"
                    onChange={uploadAvatar} style={{ display:'none' }}/>

                  <button onClick={()=>fileRef.current?.click()} disabled={uploadingImg}
                    style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 14px',
                      borderRadius:9, background:C.navy, color:'white', fontWeight:700,
                      fontSize:12, border:'none', cursor:uploadingImg?'wait':'pointer',
                      opacity:uploadingImg?0.7:1 }}>
                    <Camera size={13}/>
                    {uploadingImg ? 'Uploading…' : 'Change Photo'}
                  </button>

                  {imgMsg && (
                    <p style={{ fontSize:12, color: imgMsg.startsWith('✅')?C.green:C.red,
                      margin:0, textAlign:'center' }}>{imgMsg}</p>
                  )}
                  <p style={{ fontSize:11, color:C.gray[400], margin:0, textAlign:'center' }}>Max 2MB · JPG/PNG</p>
                </div>

                {/* Info */}
                <div style={{ flex:1, minWidth:200 }}>
                  <h3 style={{ fontWeight:900, fontSize:18, color:C.navy, margin:'0 0 4px' }}>{fullName}</h3>
                  <p style={{ fontSize:13, color:C.gray[500], margin:'0 0 10px' }}>{email}</p>
                  <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:16 }}>
                    <Pill color={C.navy}>iKPACE Student</Pill>
                    {total>0 && <Pill color={C.green}>{total} Course{total!==1?'s':''}</Pill>}
                    {completed>0 && <Pill color={C.yellow}>🏆 {completed} Completed</Pill>}
                  </div>

                  {/* Info grid */}
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:10 }}>
                    {[
                      { label:'Student ID',   val:shortId, mono:true },
                      { label:'Member Since', val:fmtDate(user?.created_at) },
                      { label:'Last Login',   val:loginAt ? fmtDate(loginAt)+' '+fmtTime(loginAt) : '—' },
                      { label:'Timezone',     val:timezone||'—' },
                    ].map(({ label, val, mono }, i) => (
                      <div key={i} style={{ background:C.gray[50], borderRadius:10, padding:'10px 13px' }}>
                        <p style={{ fontSize:10, color:C.gray[400], margin:'0 0 2px',
                          textTransform:'uppercase', letterSpacing:'.4px' }}>{label}</p>
                        <p style={{ fontSize:13, fontWeight:700, color:C.gray[900], margin:0,
                          fontFamily:mono?'monospace':'inherit' }}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Edit name */}
            <Card>
              <h3 style={{ fontWeight:800, fontSize:15, color:C.navy, marginBottom:14 }}>Edit Display Name</h3>
              <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                <input value={editName} onChange={e=>setEditName(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&saveName()}
                  placeholder="Your full name"
                  style={{ flex:1, minWidth:180, padding:'11px 14px', borderRadius:10,
                    border:`1.5px solid ${C.gray[200]}`, fontSize:14, outline:'none', color:C.gray[900] }}/>
                <button onClick={saveName} disabled={savingName||!editName.trim()}
                  style={{ padding:'11px 22px', borderRadius:10, background:C.navy,
                    color:'white', fontWeight:700, fontSize:14, border:'none',
                    cursor:savingName?'wait':'pointer', opacity:savingName?0.7:1 }}>
                  {savingName ? 'Saving…' : 'Save Name'}
                </button>
              </div>
              {nameMsg && (
                <p style={{ fontSize:13, color:nameMsg.startsWith('✅')?C.green:C.red,
                  margin:'10px 0 0' }}>{nameMsg}</p>
              )}
            </Card>

            {/* Sign out — properly working */}
            <Card style={{ display:'flex', flexWrap:'wrap', alignItems:'center',
              justifyContent:'space-between', gap:12,
              border:`1px solid ${C.red}20`, background:`${C.red}04` }}>
              <div>
                <p style={{ fontWeight:800, fontSize:14, color:C.red, margin:'0 0 3px' }}>Sign Out</p>
                <p style={{ fontSize:13, color:C.gray[500], margin:0 }}>You will be logged out of your iKPACE account.</p>
              </div>
              <button onClick={handleSignOut}
                style={{ display:'inline-flex', alignItems:'center', gap:8,
                  background:C.red, color:'white', padding:'11px 22px',
                  borderRadius:10, fontWeight:700, fontSize:14,
                  border:'none', cursor:'pointer', flexShrink:0 }}>
                <LogOut size={15}/> Sign Out
              </button>
            </Card>
          </div>
        )}

      </div>

      {/* ══ MOBILE BOTTOM NAV ═════════════════════════════════════════════════ */}
      <nav className="dash-bottom-nav" style={{ position:'fixed', bottom:0, left:0, right:0,
        background:'white', borderTop:`1px solid ${C.gray[200]}`,
        display:'flex', justifyContent:'space-around', padding:'8px 0 14px',
        zIndex:20, boxShadow:'0 -2px 12px rgba(0,0,0,0.06)' }}>
        {navItems.map(n => (
          <button key={n.id} onClick={()=>setTab(n.id)} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            background: tab===n.id ? `${C.navy}08` : 'none',
            border:'none', cursor:'pointer', padding:'4px 12px', borderRadius:10 }}>
            <n.icon size={20} style={{ color:tab===n.id?C.orange:C.gray[400] }}/>
            <span style={{ fontSize:10, fontWeight:700, color:tab===n.id?C.navy:C.gray[400] }}>{n.label}</span>
          </button>
        ))}
      </nav>

      {/* ══ IQ QUIZ MODAL ═════════════════════════════════════════════════════ */}
      {quizCourse && <IQQuiz courseTitle={quizCourse} onClose={()=>setQuizCourse(null)}/>}

      {/* ══ STYLES ════════════════════════════════════════════════════════════ */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { padding-bottom: env(safe-area-inset-bottom); }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[200]}; border-radius: 4px; }

        /* Desktop ≥ 700px */
        @media (min-width: 700px) {
          .dash-bottom-nav    { display: none !important; }
          .dash-mobile-menu   { display: none !important; }
          .dash-tab-label     { display: inline !important; }
          .dash-userinfo      { display: block !important; }
        }
        /* Mobile < 700px */
        @media (max-width: 699px) {
          .dash-tab-label     { display: none !important; }
          .dash-userinfo      { display: none !important; }
        }
      `}</style>
    </div>
  )
}
