// src/pages/Dashboard.jsx
// iKPACE Student Dashboard — v10
// ✅ Good morning/greeting REMOVED — replaced with clean welcome + quick stats
// ✅ Referral / Affiliate panel added as new tab
// ✅ Simple, clean design — no clutter
// ✅ All Supabase calls preserved (profiles, enrollments, payments, referrals)
// ✅ Avatar upload, name edit, sign out all intact
// ✅ Mobile responsive — bottom nav + hamburger drawer

import { useEffect, useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'
import {
  BookOpen, CreditCard, LogOut, PlayCircle, CheckCircle,
  AlertCircle, ChevronRight, Award, User, BarChart3,
  RefreshCw, Flame, Send, X, TrendingUp, Camera,
  Menu, Home, Share2, Copy, Check, Gift, Users, Star,
  Zap, Trophy
} from 'lucide-react'

// ── Brand ─────────────────────────────────────────────────────────────────────
const C = {
  navy:'#1A3D7C', navyD:'#0F2655', navyM:'#2F5EA8',
  orange:'#FF7A00', orangeL:'#FF9A3C',
  green:'#008F4C', red:'#DC2626', yellow:'#F59E0B', purple:'#7C3AED',
  teal:'#0D9488',
  gray:{ 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',300:'#CBD5E1',
         400:'#94A3B8',500:'#64748B',600:'#475569',700:'#334155',900:'#0F172A' }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmtDate  = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'
const fmtTime  = d => d ? new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : ''
const fmtMoney = n => `$${Number(n||0).toFixed(2)}`
const initials = s => s ? s.trim().split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) : 'U'
const firstName= s => s ? s.trim().split(' ')[0] : 'Learner'
const clamp    = (v,a,b) => Math.min(Math.max(Number(v)||0,a),b)

// ── Referral tiers ────────────────────────────────────────────────────────────
const TIERS = [
  { name:'Starter',    min:0,  max:2,  reward:'50 pts',            color:C.gray[500], icon:'🌱' },
  { name:'Connector',  min:3,  max:5,  reward:'10% discount',      color:C.teal,      icon:'🔗' },
  { name:'Ambassador', min:6,  max:10, reward:'Free course',        color:C.navy,      icon:'🎓' },
  { name:'Champion',   min:11, max:20, reward:'GHS 10 airtime',    color:C.orange,    icon:'🏆' },
  { name:'Legend',     min:21, max:999,reward:'VIP + monthly gift',color:C.purple,    icon:'👑' },
]
const getTier = (completed) => {
  return TIERS.find(t => completed >= t.min && completed <= t.max) || TIERS[0]
}
const getNextTier = (completed) => {
  const idx = TIERS.findIndex(t => completed >= t.min && completed <= t.max)
  return idx < TIERS.length - 1 ? TIERS[idx + 1] : null
}

// ── iKPACE Logo ───────────────────────────────────────────────────────────────
function IkpaceLogo({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <rect width="120" height="120" rx="24" fill="#0F2655"/>
      <polygon points="60,22 94,36 60,50 26,36" fill="#FF7A00"/>
      <path d="M38,42 L38,62 Q38,76 60,80 Q82,76 82,62 L82,42 Q71,50 60,50 Q49,50 38,42Z" fill="#FF7A00"/>
      <path d="M38,42 Q49,50 60,50 Q71,50 82,42 Q71,54 60,55 Q49,54 38,42Z" fill="#0F2655" opacity="0.3"/>
      <line x1="94" y1="36" x2="94" y2="58" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round"/>
      <line x1="88" y1="58" x2="100" y2="58" stroke="#FF7A00" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="94" cy="64" r="4" fill="#FF7A00"/>
      <text x="60" y="99" textAnchor="middle" fontFamily="Arial Black,Arial,sans-serif" fontWeight="900" fontSize="22" fill="white" letterSpacing="-0.5">iKpace</text>
    </svg>
  )
}

// ── UI atoms ──────────────────────────────────────────────────────────────────
const Card = ({ children, style={}, onClick }) => (
  <div onClick={onClick} style={{
    background:'white', borderRadius:16,
    border:`1px solid ${C.gray[200]}`,
    boxShadow:'0 1px 8px rgba(0,0,0,0.05)',
    padding:20, ...style
  }}>
    {children}
  </div>
)

const Pill = ({ children, color, bg }) => (
  <span style={{
    fontSize:11, fontWeight:700, color,
    background:bg||`${color}15`,
    padding:'3px 10px', borderRadius:20, display:'inline-block'
  }}>{children}</span>
)

const Bar = ({ pct=0, color=C.navy, h=8 }) => {
  const p = clamp(pct,0,100)
  return (
    <div style={{ height:h, borderRadius:h, background:C.gray[100], overflow:'hidden' }}>
      <div style={{ height:'100%', width:`${p}%`, background:color, borderRadius:h,
        transition:'width .6s ease', minWidth:p>0?4:0 }}/>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// AFFILIATE PANEL COMPONENT
// Uses the EXACT pattern that is proven to work:
//   1. supabase.auth.getUser() to get real session
//   2. .eq('referrer_id', user.id) with JS value — never auth.uid() in SQL
//   3. Calculate all stats in JS from the returned array
// ═════════════════════════════════════════════════════════════════════════════
function AffiliatePanel({ user: propUser, profile: propProfile }) {
  const [referralCode,   setReferralCode]   = useState('')
  const [referralPoints, setReferralPoints] = useState(0)
  const [referrals,      setReferrals]      = useState([])
  const [leaderboard,    setLeaderboard]    = useState([])
  const [loading,        setLoading]        = useState(true)
  const [fetchError,     setFetchError]     = useState(null)
  const [copied,         setCopied]         = useState(false)
  const [copyType,       setCopyType]       = useState('')
  const [activeTab,      setActiveTab]      = useState('overview')
  const [currentUid,     setCurrentUid]     = useState(null)

  const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://ikpace.com'

  // ── Run on mount — wait for auth session then fetch everything ────────────
  useEffect(() => {
    loadAll()
  }, [])

  const loadAll = async () => {
    setLoading(true)
    setFetchError(null)

    try {
      // ── STEP 1: Get the real authenticated user ──────────────────────────
      // This is the ONLY reliable way — never trust props or context timing
      const { data: userData, error: userErr } = await supabase.auth.getUser()
      const user = userData?.user

      console.log('👤 Logged in user:', user)
      console.log('❗ Auth error:', userErr)

      if (userErr || !user) {
        throw new Error('No active session. Please log in again.')
      }

      const uid = user.id
      setCurrentUid(uid)
      console.log('🔑 Using UID for query:', uid)

      // ── STEP 2: Get ALL referrals for this user ──────────────────────────
      // .eq('referrer_id', uid) passes the real UUID from JS — 100% reliable
      const { data: allReferrals, error: refErr } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', uid)

      console.log('📊 Referrals fetched:', allReferrals)
      console.log('❗ Referrals error:', refErr)

      const refList = allReferrals || []
      setReferrals(refList)

      // ── STEP 3: Calculate stats in JS — no SQL aggregation needed ────────
      const total     = refList.length
      const pending   = refList.filter(r => r.status === 'pending').length
      const completed = refList.filter(r => r.status === 'completed').length
      const points    = refList
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + (Number(r.points_awarded) || 0), 0)

      console.log('✅ Stats calculated:', { total, pending, completed, points })

      // ── STEP 4: Get referral_code and points from profiles ────────────────
      const { data: prof, error: profErr } = await supabase
        .from('profiles')
        .select('referral_code, referral_points')
        .eq('id', uid)
        .single()

      console.log('👤 Profile data:', prof)
      console.log('❗ Profile error:', profErr)

      if (prof) {
        setReferralCode(prof.referral_code || '')
        // Use profile points if set by trigger, otherwise use JS-calculated sum
        setReferralPoints(prof.referral_points > 0 ? prof.referral_points : points)
      }

      // ── STEP 5: Leaderboard ───────────────────────────────────────────────
      const { data: lb } = await supabase
        .from('profiles')
        .select('referral_code, referral_points, full_name')
        .order('referral_points', { ascending: false })
        .limit(10)

      setLeaderboard(lb || [])

    } catch (err) {
      console.error('[AffiliatePanel] Fatal error:', err)
      setFetchError(err.message || 'Failed to load referral data.')
    } finally {
      setLoading(false)
    }
  }

  // ── Stats derived from referrals state (recalculated on every render) ─────
  const totalRefs    = referrals.length
  const pending      = referrals.filter(r => r.status === 'pending').length
  const completed    = referrals.filter(r => r.status === 'completed').length
  const pointsEarned = referralPoints > 0
    ? referralPoints
    : referrals
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + (Number(r.points_awarded) || 0), 0)

  const tier         = getTier(completed)
  const nextTier     = getNextTier(completed)
  const tierProgress = nextTier
    ? Math.round(((completed - tier.min) / (nextTier.min - tier.min)) * 100)
    : 100

  const referralLink = referralCode
    ? `${BASE_URL}/register?ref=${referralCode}`
    : ''

  // ── Copy helpers ──────────────────────────────────────────────────────────
  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setCopyType(type)
      setTimeout(() => { setCopied(false); setCopyType('') }, 2000)
    } catch {
      // fallback
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setCopyType(type)
      setTimeout(() => { setCopied(false); setCopyType('') }, 2000)
    }
  }

  // ── Share ─────────────────────────────────────────────────────────────────
  const shareWhatsApp = () => {
    const msg = `🎓 Join iKPACE and start learning! Use my referral link to sign up:\n${referralLink}\n\nCode: ${referralCode}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }
  const shareEmail = () => {
    const sub = 'Join me on iKPACE!'
    const body = `Hi,\n\nI'm learning on iKPACE and I think you'd love it too!\n\nSign up using my referral link:\n${referralLink}\n\nOr use my code: ${referralCode}\n\nSee you inside! 🎓`
    window.open(`mailto:?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`, '_blank')
  }
  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join iKPACE!',
          text: `Use my referral link to join iKPACE: ${referralLink}`,
          url: referralLink
        })
      } catch (_) {}
    } else {
      copyToClipboard(referralLink, 'link')
    }
  }

  const statusColor  = s => s === 'completed' ? C.green : s === 'pending' ? C.orange : C.gray[400]
  const statusLabel  = s => s === 'completed' ? '✅ Completed' : s === 'pending' ? '⏳ Pending' : s || 'Unknown'

  if (loading) return (
    <div style={{ textAlign:'center', padding:'48px 20px' }}>
      <div style={{ display:'flex', gap:6, justifyContent:'center' }}>
        {[0,1,2].map(i=><div key={i} style={{ width:8,height:8,borderRadius:'50%',
          background:C.orange,opacity:.3,animation:`dot .9s ${i*.25}s ease-in-out infinite` }}/>)}
      </div>
      <p style={{ color:C.gray[400], fontSize:13, marginTop:12 }}>Loading your referrals…</p>
      <style>{`@keyframes dot{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}`}</style>
    </div>
  )

  if (fetchError) return (
    <Card style={{ textAlign:'center', padding:'40px 20px', border:`1px solid ${C.red}20` }}>
      <AlertCircle size={36} style={{ color:C.red, margin:'0 auto 12px', display:'block' }}/>
      <p style={{ fontWeight:700, fontSize:15, color:C.red, marginBottom:6 }}>Could not load referrals</p>
      <p style={{ color:C.gray[500], fontSize:13, marginBottom:18 }}>{fetchError}</p>
      <button onClick={loadAll}
        style={{ display:'inline-flex', alignItems:'center', gap:7, padding:'10px 22px',
          borderRadius:10, background:C.navy, color:'white', fontWeight:700, fontSize:13,
          border:'none', cursor:'pointer' }}>
        <RefreshCw size={14}/> Try Again
      </button>
    </Card>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

      {/* ── Header ── */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <div>
          <h2 style={{ fontWeight:900, fontSize:19, color:C.navy, margin:'0 0 3px' }}>
            Referral Program 🎁
          </h2>
          <p style={{ fontSize:13, color:C.gray[400], margin:0 }}>
            Share your link, earn rewards for every friend who joins
          </p>
        </div>
        <button onClick={loadAll}
          style={{ background:C.gray[100], border:`1px solid ${C.gray[200]}`, borderRadius:9,
            padding:'7px 13px', fontSize:13, fontWeight:700, color:C.gray[600], cursor:'pointer',
            display:'flex', alignItems:'center', gap:5 }}>
          <RefreshCw size={13}/> Refresh
        </button>
      </div>

      {/* ── Stats row — shows real counts from referrals table ── */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:10 }}>
        {[
          { icon:Users,      label:'Total Refs',  val:totalRefs,   color:C.navy,   desc:'All referrals'        },
          { icon:CheckCircle,label:'Completed',   val:completed,   color:C.green,  desc:'Paid & active'        },
          { icon:AlertCircle,label:'Pending',     val:pending,     color:C.orange, desc:'Awaiting payment'     },
          { icon:Star,       label:'Points',      val:pointsEarned,color:C.purple, desc:'Total pts earned'     },
        ].map((s,i) => (
          <Card key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:14 }}>
            <div style={{ width:36, height:36, borderRadius:9, background:`${s.color}12`,
              display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <s.icon size={16} style={{ color:s.color }}/>
            </div>
            <div>
              <p style={{ fontSize:22, fontWeight:900, color:s.color, margin:0, lineHeight:1 }}>{s.val}</p>
              <p style={{ fontSize:10, color:C.gray[400], margin:'2px 0 0' }}>{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* ── Tier card ── */}
      <Card style={{ background:`linear-gradient(135deg,${C.navyD},${C.navyM})`, color:'white', border:'none' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12, marginBottom:14 }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <div style={{ fontSize:36, lineHeight:1 }}>{tier.icon}</div>
            <div>
              <p style={{ fontSize:11, opacity:.55, margin:'0 0 2px', textTransform:'uppercase', letterSpacing:'.5px' }}>Current Tier</p>
              <p style={{ fontSize:22, fontWeight:900, margin:0 }}>{tier.name}</p>
              <p style={{ fontSize:12, opacity:.7, margin:'2px 0 0' }}>Reward: {tier.reward}</p>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ fontSize:11, opacity:.55, margin:'0 0 2px', textTransform:'uppercase', letterSpacing:'.5px' }}>Points</p>
            <p style={{ fontSize:28, fontWeight:900, margin:0, color:C.orangeL }}>{pointsEarned}</p>
          </div>
        </div>
        {nextTier ? (
          <>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6, opacity:.8 }}>
              <span>{completed} completed</span>
              <span>{nextTier.min} needed for {nextTier.icon} {nextTier.name}</span>
            </div>
            <div style={{ height:8, borderRadius:8, background:'rgba(255,255,255,0.15)', overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${tierProgress}%`, borderRadius:8,
                background:`linear-gradient(90deg,${C.orangeL},${C.orange})`,
                transition:'width .6s ease', minWidth:tierProgress>0?6:0 }}/>
            </div>
            <p style={{ fontSize:11, opacity:.55, margin:'6px 0 0', textAlign:'right' }}>
              {nextTier.min - completed} more referral{nextTier.min - completed !== 1 ? 's' : ''} to unlock {nextTier.name}
            </p>
          </>
        ) : (
          <p style={{ fontSize:13, opacity:.7, margin:'4px 0 0', textAlign:'center' }}>
            🎉 You've reached the highest tier — Legend!
          </p>
        )}
      </Card>

      {/* ── Referral link card ── */}
      <Card>
        <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:'0 0 14px' }}>
          Your Referral Link
        </h3>

        {/* Link display */}
        <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:200, background:C.gray[50], borderRadius:10,
            border:`1.5px solid ${C.gray[200]}`, padding:'10px 14px', fontSize:13,
            color:C.gray[600], overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap',
            fontFamily:'monospace' }}>
            {referralLink || 'Loading your link…'}
          </div>
          <button onClick={() => copyToClipboard(referralLink, 'link')}
            disabled={!referralLink}
            style={{ display:'inline-flex', alignItems:'center', gap:6,
              padding:'10px 16px', borderRadius:10, border:'none', cursor:'pointer',
              background: copied && copyType==='link' ? C.green : C.navy,
              color:'white', fontWeight:700, fontSize:13, transition:'background .2s', flexShrink:0 }}>
            {copied && copyType==='link'
              ? <><Check size={14}/> Copied!</>
              : <><Copy size={14}/> Copy Link</>}
          </button>
        </div>

        {/* Code display */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16 }}>
          <div style={{ flex:1, background:C.gray[50], borderRadius:10,
            border:`1.5px solid ${C.gray[200]}`, padding:'8px 14px', fontSize:14,
            fontWeight:900, color:C.navy, letterSpacing:'2px', fontFamily:'monospace' }}>
            {referralCode || '—'}
          </div>
          <button onClick={() => copyToClipboard(referralCode, 'code')}
            disabled={!referralCode}
            style={{ display:'inline-flex', alignItems:'center', gap:6,
              padding:'8px 14px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
              cursor:'pointer', background:'white', fontWeight:700, fontSize:12,
              color: copied && copyType==='code' ? C.green : C.gray[600], flexShrink:0 }}>
            {copied && copyType==='code'
              ? <><Check size={13}/> Copied!</>
              : <><Copy size={13}/> Copy Code</>}
          </button>
        </div>

        {/* Share buttons */}
        <div>
          <p style={{ fontSize:12, fontWeight:700, color:C.gray[500], margin:'0 0 9px',
            textTransform:'uppercase', letterSpacing:'.5px' }}>Share Via</p>
          <div style={{ display:'flex', gap:9, flexWrap:'wrap' }}>
            <button onClick={shareWhatsApp}
              style={{ display:'inline-flex', alignItems:'center', gap:7,
                padding:'9px 16px', borderRadius:10, border:'none', cursor:'pointer',
                background:'#25D366', color:'white', fontWeight:700, fontSize:13 }}>
              💬 WhatsApp
            </button>
            <button onClick={shareEmail}
              style={{ display:'inline-flex', alignItems:'center', gap:7,
                padding:'9px 16px', borderRadius:10, border:'none', cursor:'pointer',
                background:C.gray[100], color:C.gray[700], fontWeight:700, fontSize:13,
                border:`1px solid ${C.gray[200]}` }}>
              ✉️ Email
            </button>
            <button onClick={shareNative}
              style={{ display:'inline-flex', alignItems:'center', gap:7,
                padding:'9px 16px', borderRadius:10, border:'none', cursor:'pointer',
                background:C.navy, color:'white', fontWeight:700, fontSize:13 }}>
              <Share2 size={13}/> Share
            </button>
          </div>
        </div>
      </Card>

      {/* ── Sub tabs: History | Tiers | Leaderboard ── */}
      <div style={{ display:'flex', gap:6, overflowX:'auto' }}>
        {[
          { id:'overview',    label:'Reward Tiers' },
          { id:'history',     label:`History (${totalRefs})` },
          { id:'leaderboard', label:'Leaderboard' },
        ].map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            style={{ padding:'8px 16px', borderRadius:20, border:'none', cursor:'pointer',
              fontWeight:700, fontSize:13, whiteSpace:'nowrap',
              background: activeTab===t.id ? C.navy : C.gray[100],
              color: activeTab===t.id ? 'white' : C.gray[600],
              transition:'all .15s' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Reward Tiers ── */}
      {activeTab === 'overview' && (
        <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
          {TIERS.map((t, i) => {
            const isCurrent = tier.name === t.name
            const isDone    = completed > t.max
            return (
              <div key={i} style={{
                display:'flex', alignItems:'center', gap:14,
                padding:'13px 16px', borderRadius:12,
                border:`1.5px solid ${isCurrent ? t.color : C.gray[200]}`,
                background: isCurrent ? `${t.color}08` : isDone ? `${C.green}05` : 'white',
                transition:'all .2s'
              }}>
                <div style={{ fontSize:22, flexShrink:0 }}>{t.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:7, flexWrap:'wrap' }}>
                    <p style={{ fontWeight:800, fontSize:14, color:isCurrent ? t.color : C.gray[700], margin:0 }}>{t.name}</p>
                    {isCurrent && <Pill color={t.color}>Current</Pill>}
                    {isDone    && <Pill color={C.green}>✓ Unlocked</Pill>}
                  </div>
                  <p style={{ fontSize:12, color:C.gray[400], margin:'2px 0 0' }}>
                    {t.min === t.max ? `${t.min} referrals` : `${t.min}–${t.max === 999 ? '21+' : t.max} completed referrals`}
                  </p>
                </div>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ fontSize:13, fontWeight:800, color: isCurrent ? t.color : C.gray[500], margin:0 }}>
                    {t.reward}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Referral History ── */}
      {activeTab === 'history' && (
        referrals.length === 0 ? (
          <Card style={{ textAlign:'center', padding:'40px 20px' }}>
            <div style={{ fontSize:42, marginBottom:10 }}>🔗</div>
            <h3 style={{ fontWeight:800, fontSize:16, color:C.navy, marginBottom:6 }}>No referrals yet</h3>
            <p style={{ color:C.gray[500], fontSize:14 }}>Share your link above to start earning rewards!</p>
          </Card>
        ) : (
          <Card style={{ padding:0, overflow:'hidden' }}>
            {/* Table header */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto auto', gap:8,
              padding:'11px 16px', background:C.gray[50],
              borderBottom:`1px solid ${C.gray[100]}`, fontSize:11,
              fontWeight:700, color:C.gray[400], textTransform:'uppercase', letterSpacing:'.4px' }}>
              <span>Friend / Email</span>
              <span style={{ textAlign:'center', minWidth:80 }}>Status</span>
              <span style={{ textAlign:'center', minWidth:50 }}>Pts</span>
              <span style={{ textAlign:'right',  minWidth:80 }}>Date</span>
            </div>
            {referrals.map((r, i) => (
              <div key={r.id} style={{
                display:'grid', gridTemplateColumns:'1fr auto auto auto', gap:8,
                padding:'12px 16px', alignItems:'center',
                borderBottom: i < referrals.length - 1 ? `1px solid ${C.gray[100]}` : 'none',
                background: i % 2 === 0 ? 'white' : C.gray[50]
              }}>
                <div style={{ minWidth:0 }}>
                  <p style={{ fontWeight:700, fontSize:13, color:C.gray[900], margin:'0 0 1px',
                    overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                    {r.referred_email || 'Unknown'}
                  </p>
                  {r.reward_type && (
                    <p style={{ fontSize:11, color:C.gray[400], margin:0 }}>Reward: {r.reward_type}</p>
                  )}
                </div>
                <span style={{
                  fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:20,
                  color:statusColor(r.status), background:`${statusColor(r.status)}15`,
                  textAlign:'center', whiteSpace:'nowrap'
                }}>
                  {statusLabel(r.status)}
                </span>
                <span style={{ textAlign:'center', fontSize:12, fontWeight:800,
                  color: r.status === 'completed' ? C.purple : C.gray[300] }}>
                  {r.status === 'completed' ? `+${r.points_awarded || 50}` : '—'}
                </span>
                <div style={{ textAlign:'right', flexShrink:0 }}>
                  <p style={{ fontSize:11, color:C.gray[500], margin:'0 0 1px', whiteSpace:'nowrap' }}>
                    {fmtDate(r.created_at)}
                  </p>
                  {r.completed_at && (
                    <p style={{ fontSize:10, color:C.green, margin:0, whiteSpace:'nowrap' }}>
                      ✓ {fmtDate(r.completed_at)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </Card>
        )
      )}

      {/* ── Leaderboard ── */}
      {activeTab === 'leaderboard' && (
        leaderboard.length === 0 ? (
          <Card style={{ textAlign:'center', padding:'40px 20px' }}>
            <Trophy size={40} style={{ color:C.gray[200], display:'block', margin:'0 auto 12px' }}/>
            <p style={{ fontWeight:700, color:C.gray[500] }}>Leaderboard coming soon!</p>
          </Card>
        ) : (
          <Card style={{ padding:0, overflow:'hidden' }}>
            <div style={{ padding:'13px 18px', borderBottom:`1px solid ${C.gray[100]}`,
              fontWeight:800, fontSize:13, color:C.navy, display:'flex', alignItems:'center', gap:8 }}>
              <Trophy size={16} style={{ color:C.orange }}/> Top Referrers
            </div>
            {leaderboard.map((lb, i) => {
              const isMe = lb.referral_code === referralCode
              const medals = ['🥇','🥈','🥉']
              return (
                <div key={i} style={{
                  display:'flex', alignItems:'center', gap:13,
                  padding:'12px 18px',
                  borderBottom: i < leaderboard.length - 1 ? `1px solid ${C.gray[100]}` : 'none',
                  background: isMe ? `${C.navy}06` : i % 2 === 0 ? 'white' : C.gray[50]
                }}>
                  <span style={{ fontSize:18, flexShrink:0, width:24 }}>
                    {i < 3 ? medals[i] : `${i+1}.`}
                  </span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontWeight:700, fontSize:13, color: isMe ? C.navy : C.gray[700],
                      margin:'0 0 1px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                      {lb.full_name || lb.referral_code || 'Anonymous'}
                      {isMe && <span style={{ fontSize:10, fontWeight:700, color:C.orange,
                        background:`${C.orange}15`, padding:'1px 7px', borderRadius:20, marginLeft:7 }}>You</span>}
                    </p>
                    <p style={{ fontSize:11, color:C.gray[400], margin:0, fontFamily:'monospace' }}>
                      Code: {lb.referral_code}
                    </p>
                  </div>
                  <div style={{ textAlign:'right', flexShrink:0 }}>
                    <p style={{ fontWeight:900, fontSize:16, color: i===0?C.orange:C.navy, margin:0, lineHeight:1 }}>
                      {lb.referral_points ?? 0}
                    </p>
                    <p style={{ fontSize:10, color:C.gray[400], margin:'2px 0 0' }}>pts</p>
                  </div>
                </div>
              )
            })}
          </Card>
        )
      )}

      {/* ── How it works ── */}
      <Card style={{ background:`${C.navy}04`, border:`1px solid ${C.navy}15` }}>
        <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:'0 0 14px' }}>How It Works</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:11 }}>
          {[
            { step:'1', text:'Share your referral link or code with friends' },
            { step:'2', text:'They sign up at iKPACE using your link' },
            { step:'3', text:'When they complete a payment → status turns Completed' },
            { step:'4', text:'Points are added automatically. Earn rewards!' },
          ].map((h, i) => (
            <div key={i} style={{ display:'flex', gap:11, alignItems:'flex-start' }}>
              <div style={{ width:26, height:26, borderRadius:'50%', background:C.navy,
                color:'white', fontWeight:900, fontSize:12, flexShrink:0,
                display:'flex', alignItems:'center', justifyContent:'center' }}>{h.step}</div>
              <p style={{ fontSize:13, color:C.gray[600], margin:'3px 0 0', lineHeight:1.5 }}>{h.text}</p>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// IQ QUIZ (preserved unchanged)
// ═════════════════════════════════════════════════════════════════════════════
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
}
const DEFAULT_Q = [
  { q:'What does HTML stand for?', opts:['HyperText Markup Language','High Tech Modern Language','Home Tool Markup Language','Hyper Transfer Main Link'], ans:0, exp:'HTML (HyperText Markup Language) is the standard language for creating web pages.' },
  { q:'Which of these is a good study habit?', opts:['Studying for 10 hours straight','Taking regular short breaks','Skipping sleep','Avoiding notes'], ans:1, exp:'Regular breaks (like the Pomodoro technique) improve focus and long-term retention.' },
  { q:'What is the best way to retain new information?', opts:['Read once and move on','Teach it to someone else','Memorise by repetition only','Avoid practice'], ans:1, exp:'The "Feynman Technique" — teaching a concept to someone else — is one of the best ways to master it.' },
]

function IQQuiz({ courseTitle, onClose }) {
  const questions = IQ_QUESTIONS[courseTitle] || DEFAULT_Q
  const [idx,setIdx]       = useState(0)
  const [chosen,setChosen] = useState(null)
  const [score,setScore]   = useState(0)
  const [done,setDone]     = useState(false)
  const [showExp,setShowExp] = useState(false)
  const q     = questions[idx]
  const choose = i => { if (chosen!==null) return; setChosen(i); setShowExp(true); if (i===q.ans) setScore(s=>s+1) }
  const next   = () => { if (idx<questions.length-1) { setIdx(i=>i+1); setChosen(null); setShowExp(false) } else setDone(true) }
  const restart= () => { setIdx(0); setChosen(null); setScore(0); setDone(false); setShowExp(false) }
  const pct    = Math.round((score/questions.length)*100)
  const grade  = pct>=80 ? {label:'Excellent! 🏆',color:C.green} : pct>=60 ? {label:'Good job! 👍',color:C.orange} : {label:'Keep learning! 📚',color:C.navy}
  return (
    <div style={{ position:'fixed',inset:0,zIndex:50,background:'rgba(15,22,85,0.65)',backdropFilter:'blur(4px)',
      display:'flex',alignItems:'center',justifyContent:'center',padding:16 }}>
      <div style={{ width:'100%',maxWidth:500,background:'white',borderRadius:24,overflow:'hidden',
        boxShadow:'0 24px 60px rgba(0,0,0,0.3)',maxHeight:'92vh',display:'flex',flexDirection:'column' }}>
        <div style={{ padding:'16px 20px',background:`linear-gradient(135deg,${C.navyD},${C.navy})`,
          display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <div style={{ display:'flex',alignItems:'center',gap:10 }}>
            <div style={{ width:34,height:34,borderRadius:10,background:'rgba(255,255,255,0.15)',
              display:'flex',alignItems:'center',justifyContent:'center',fontSize:17 }}>🧠</div>
            <div>
              <p style={{ color:'white',fontWeight:900,fontSize:14,margin:0 }}>iKPACE Test ur iQ</p>
              <p style={{ color:'rgba(255,255,255,0.55)',fontSize:11,margin:0 }}>{courseTitle}</p>
            </div>
          </div>
          <button onClick={onClose} style={{ background:'rgba(255,255,255,0.15)',border:'none',
            width:30,height:30,borderRadius:8,cursor:'pointer',color:'white',
            display:'flex',alignItems:'center',justifyContent:'center' }}><X size={15}/></button>
        </div>
        <div style={{ flex:1,overflowY:'auto',padding:22 }}>
          {!done ? (
            <>
              <div style={{ display:'flex',justifyContent:'space-between',marginBottom:12 }}>
                <span style={{ fontSize:12,color:C.gray[400],fontWeight:600 }}>Question {idx+1}/{questions.length}</span>
                <span style={{ fontSize:12,fontWeight:800,color:C.orange }}>Score: {score}/{idx+(chosen!==null?1:0)}</span>
              </div>
              <Bar pct={((idx+(chosen!==null?1:0))/questions.length)*100} color={C.orange} h={5}/>
              <p style={{ fontSize:16,fontWeight:800,color:C.navy,margin:'18px 0 14px',lineHeight:1.4 }}>{q.q}</p>
              <div style={{ display:'flex',flexDirection:'column',gap:9 }}>
                {q.opts.map((opt,i) => {
                  let bg=C.gray[50],border=C.gray[200],col=C.gray[700]
                  if (chosen!==null) {
                    if (i===q.ans) { bg=`${C.green}12`;border=C.green;col=C.green }
                    else if (i===chosen&&i!==q.ans) { bg=`${C.red}10`;border=C.red;col=C.red }
                  }
                  return (
                    <button key={i} onClick={()=>choose(i)} disabled={chosen!==null}
                      style={{ width:'100%',textAlign:'left',padding:'12px 14px',borderRadius:11,
                        background:bg,border:`2px solid ${border}`,color:col,fontSize:14,fontWeight:600,
                        cursor:chosen===null?'pointer':'default',display:'flex',alignItems:'center',gap:10 }}>
                      <span style={{ width:22,height:22,borderRadius:'50%',flexShrink:0,
                        background:chosen===null?C.gray[200]:i===q.ans?C.green:i===chosen?C.red:C.gray[200],
                        display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:900,color:'white' }}>
                        {String.fromCharCode(65+i)}
                      </span>
                      {opt}
                      {chosen!==null&&i===q.ans&&<span style={{ marginLeft:'auto' }}>✓</span>}
                      {chosen!==null&&i===chosen&&i!==q.ans&&<span style={{ marginLeft:'auto' }}>✗</span>}
                    </button>
                  )
                })}
              </div>
              {showExp && (
                <div style={{ marginTop:12,padding:'11px 13px',borderRadius:11,
                  background:chosen===q.ans?`${C.green}10`:`${C.orange}10`,
                  border:`1px solid ${chosen===q.ans?C.green:C.orange}30` }}>
                  <p style={{ fontSize:13,color:C.gray[700],margin:0,lineHeight:1.55 }}>
                    <strong>💡</strong> {q.exp}
                  </p>
                </div>
              )}
              {chosen!==null && (
                <button onClick={next} style={{ marginTop:14,width:'100%',padding:'11px',borderRadius:11,
                  background:`linear-gradient(135deg,${C.navy},${C.navyM})`,color:'white',
                  fontWeight:800,fontSize:14,border:'none',cursor:'pointer' }}>
                  {idx<questions.length-1?'Next Question →':'See Results 🏆'}
                </button>
              )}
            </>
          ) : (
            <div style={{ textAlign:'center',padding:'8px 0' }}>
              <div style={{ fontSize:52,marginBottom:10 }}>{pct>=80?'🏆':pct>=60?'🎯':'📚'}</div>
              <h2 style={{ fontWeight:900,fontSize:22,color:grade.color,marginBottom:6 }}>{grade.label}</h2>
              <p style={{ fontSize:15,color:C.gray[500],marginBottom:18 }}>
                You scored <strong style={{ color:C.navy,fontSize:20 }}>{score}/{questions.length}</strong>
              </p>
              <div style={{ width:90,height:90,borderRadius:'50%',margin:'0 auto 20px',
                background:`conic-gradient(${grade.color} ${pct*3.6}deg, ${C.gray[100]} 0deg)`,
                display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 0 0 7px white inset' }}>
                <span style={{ fontSize:20,fontWeight:900,color:grade.color }}>{pct}%</span>
              </div>
              <div style={{ display:'flex',gap:9,justifyContent:'center',flexWrap:'wrap' }}>
                <button onClick={restart} style={{ padding:'10px 20px',borderRadius:11,background:C.navy,color:'white',fontWeight:700,fontSize:13,border:'none',cursor:'pointer' }}>Try Again 🔄</button>
                <button onClick={onClose} style={{ padding:'10px 20px',borderRadius:11,background:C.gray[100],color:C.gray[700],fontWeight:700,fontSize:13,border:'none',cursor:'pointer' }}>Close</button>
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
  const { user, signOut, getUserProfile, getUserEnrollments, getUserPayments, getReferralStats } = useAuth()
  const navigate = useNavigate()

  // ── All real data from Supabase ───────────────────────────────────────────
  const [loading,      setLoading]      = useState(true)
  const [error,        setError]        = useState(null)
  const [fullName,     setFullName]     = useState('')
  const [email,        setEmail]        = useState('')
  const [avatarUrl,    setAvatarUrl]    = useState('')
  const [loginAt,      setLoginAt]      = useState(null)
  const [enrollments,  setEnrollments]  = useState([])
  const [payments,     setPayments]     = useState([])
  const [profile,      setProfile]      = useState(null)
  const [referralData, setReferralData] = useState({ total:0, pending:0, completed:0, points:0 })
  const [tab,          setTab]          = useState('home')
  const [menuOpen,     setMenuOpen]     = useState(false)
  const [quizCourse,   setQuizCourse]   = useState(null)
  const [editName,     setEditName]     = useState('')
  const [savingName,   setSavingName]   = useState(false)
  const [nameMsg,      setNameMsg]      = useState('')
  const [uploadingImg, setUploadingImg] = useState(false)
  const [imgMsg,       setImgMsg]       = useState('')
  const fileRef = useRef(null)

  useEffect(() => {
    fetchAll()
  }, [])

  // ── fetchAll — uses supabase.auth.getUser() directly, never trusts props ──
  const fetchAll = async () => {
    setLoading(true)
    setError(null)
    try {
      // ── 1. Get the real authenticated user ─────────────────────────────
      const { data: authData, error: authErr } = await supabase.auth.getUser()
      const authUser = authData?.user

      console.log('👤 Dashboard user:', authUser)
      console.log('❗ Auth error:', authErr)

      if (authErr || !authUser) {
        navigate('/login')
        return
      }

      const uid = authUser.id
      setEmail(authUser.email || '')
      setLoginAt(authUser.last_sign_in_at || authUser.created_at)
      console.log('🔑 Fetching all data for uid:', uid)

      // ── 2. Profile — name, avatar, referral code ────────────────────────
      // Try AuthContext helper first, fall back to direct supabase call
      let prof = null
      try {
        if (typeof getUserProfile === 'function') {
          prof = await getUserProfile(uid)
          console.log('👤 Profile (from AuthContext):', prof)
        }
      } catch (_) {}

      if (!prof) {
        const { data: profData } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, referral_code, referral_points')
          .eq('id', uid)
          .single()
        prof = profData
        console.log('👤 Profile (direct fetch):', prof)
      }

      setProfile(prof)
      const name = prof?.full_name || authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Learner'
      setFullName(name)
      setEditName(name)
      setAvatarUrl(prof?.avatar_url || '')

      // ── 3. Enrollments — courses user is enrolled in ────────────────────
      let enrList = []
      try {
        if (typeof getUserEnrollments === 'function') {
          enrList = await getUserEnrollments(uid) || []
          console.log('📚 Enrollments (from AuthContext):', enrList)
        }
      } catch (_) {}

      if (!enrList.length) {
        const { data: enrData, error: enrErr } = await supabase
          .from('enrollments')
          .select(`id, course_id, status, progress, enrolled_at, completed_at,
            courses(id, title, slug, description, thumbnail_url, category, level, duration_weeks, price)`)
          .eq('user_id', uid)
          .order('enrolled_at', { ascending: false })
        console.log('📚 Enrollments (direct fetch):', enrData, enrErr)
        enrList = enrData || []
      }
      setEnrollments(enrList)

      // ── 4. Payments — all payments by this user ─────────────────────────
      let payList = []
      try {
        if (typeof getUserPayments === 'function') {
          payList = await getUserPayments(uid) || []
          console.log('💳 Payments (from AuthContext):', payList)
        }
      } catch (_) {}

      if (!payList.length) {
        const { data: payData } = await supabase
          .from('payments')
          .select('id, course_id, course_title, amount, status, reference, created_at')
          .eq('user_id', uid)
          .order('created_at', { ascending: false })
        console.log('💳 Payments (direct fetch):', payData)
        payList = payData || []
      }
      setPayments(payList)

      // ── 5. Referral stats — from referrals table by referrer_id ─────────
      // Always fetch directly — this is the proven working pattern
      let refList = []
      try {
        if (typeof getReferralStats === 'function') {
          const stats = await getReferralStats(uid)
          console.log('🎁 Referral stats (from AuthContext):', stats)
          if (stats) {
            setReferralData(stats)
            // skip direct fetch if AuthContext returned data
            return
          }
        }
      } catch (_) {}

      // Direct fetch — proven to work
      const { data: allRefs, error: refErr } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', uid)

      console.log('📊 Referrals (direct fetch):', allRefs)
      console.log('❗ Referrals error:', refErr)

      refList = allRefs || []

      const refTotal     = refList.length
      const refPending   = refList.filter(r => r.status === 'pending').length
      const refCompleted = refList.filter(r => r.status === 'completed').length
      const refPoints    = refList
        .filter(r => r.status === 'completed')
        .reduce((sum, r) => sum + (Number(r.points_awarded) || 0), 0)

      console.log('✅ Referral stats calculated:', { refTotal, refPending, refCompleted, refPoints })

      // Use profile.referral_points if trigger has updated it, else JS sum
      const finalPoints = (prof?.referral_points > 0) ? prof.referral_points : refPoints

      setReferralData({
        total:     refTotal,
        pending:   refPending,
        completed: refCompleted,
        points:    finalPoints
      })

    } catch (err) {
      console.error('❌ Dashboard fetchAll error:', err)
      setError(err.message || 'Could not load dashboard.')
    } finally {
      setLoading(false)
    }
  }

  const saveName = async () => {
    if (!editName.trim()) return
    setSavingName(true); setNameMsg('')
    try {
      const { data: existing } = await supabase.from('profiles').select('id').eq('id', user.id).single()
      const { error } = existing
        ? await supabase.from('profiles').update({ full_name: editName.trim() }).eq('id', user.id)
        : await supabase.from('profiles').insert({ id: user.id, full_name: editName.trim() })
      if (error) throw error
      setFullName(editName.trim())
      setNameMsg('✅ Name updated!')
    } catch (e) { setNameMsg('❌ ' + (e.message || 'Failed to save.')) }
    setSavingName(false)
    setTimeout(() => setNameMsg(''), 3500)
  }

  const uploadAvatar = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { setImgMsg('❌ Image too large (max 2MB)'); return }
    const allowed = ['image/jpeg','image/png','image/webp','image/gif']
    if (!allowed.includes(file.type)) { setImgMsg('❌ Please use JPG, PNG or WebP'); return }
    setUploadingImg(true); setImgMsg('⏳ Uploading…')
    try {
      const userId = user.id
      const ext    = file.name.split('.').pop().toLowerCase().replace('jpg','jpeg') || 'png'
      const path   = `avatars/${userId}.${ext}`
      const { error: upErr } = await supabase.storage.from('avatars').upload(path, file, { upsert: true, contentType: file.type })
      if (upErr) throw upErr
      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)
      const { data: existing } = await supabase.from('profiles').select('id').eq('id', userId).single()
      const { error: dbErr } = existing
        ? await supabase.from('profiles').update({ avatar_url: publicUrl }).eq('id', userId)
        : await supabase.from('profiles').insert({ id: userId, avatar_url: publicUrl })
      if (dbErr) throw dbErr
      setAvatarUrl(publicUrl + '?t=' + Date.now())
      setImgMsg('✅ Photo updated!')
    } catch (err) {
      setImgMsg('❌ ' + (err.message || 'Upload failed.'))
    }
    setUploadingImg(false)
    setTimeout(() => setImgMsg(''), 4000)
  }

  const handleSignOut = async () => {
    try { await signOut() } catch (_) {}
    navigate('/')
  }

  // ── Computed from real fetched data ──────────────────────────────────────
  const total     = enrollments.length
  const completed = enrollments.filter(e => clamp(e.progress,0,100) >= 100).length
  const inProg    = enrollments.filter(e => { const p=clamp(e.progress,0,100); return p>0&&p<100 }).length
  const avgProg   = total ? Math.round(enrollments.reduce((s,e)=>s+clamp(e.progress,0,100),0)/total) : 0
  const totalPaid = payments.filter(p=>['success','paid'].includes((p.status||'').toLowerCase())).reduce((s,p)=>s+Number(p.amount||0),0)
  const shortId   = profile?.id?.slice(0,8).toUpperCase() || email.slice(0,8).toUpperCase() || '—'
  // Use referralData fetched directly from referrals table
  const refPoints = profile?.referral_points > 0 ? profile.referral_points : referralData.points

  // Image helpers
  const COURSE_IMGS = {
    'virtual-assistant-pro':    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format&fit=crop',
    'social-media-marketing':   'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80&auto=format&fit=crop',
    'canva-graphic-design':     'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&q=80&auto=format&fit=crop',
    'smart-kids-coding':        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&auto=format&fit=crop',
    'freelancing-online-income':'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop',
    'ai-prompt-engineering':    'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop',
  }
  const CAT_IMGS = {
    Tech:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop',
    Marketing:'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80&auto=format&fit=crop',
    Design:'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&q=80&auto=format&fit=crop',
    Kids:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80&auto=format&fit=crop',
    Business:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80&auto=format&fit=crop',
    Career:'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80&auto=format&fit=crop',
  }
  const getCourseImg = c => {
    if (!c) return COURSE_IMGS['virtual-assistant-pro']
    const u = c.thumbnail_url
    if (u && u.startsWith('http') && !u.includes('placeholder')) return u
    return COURSE_IMGS[c.slug] || CAT_IMGS[c.category] || COURSE_IMGS['virtual-assistant-pro']
  }

  const navItems = [
    { id:'home',     label:'Home',       icon:Home       },
    { id:'courses',  label:'Courses',    icon:BookOpen   },
    { id:'referral', label:'Referrals',  icon:Gift       },
    { id:'payments', label:'Payments',   icon:CreditCard },
    { id:'profile',  label:'Profile',    icon:User       },
  ]

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', background:C.navyD,
      fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <IkpaceLogo size={90}/>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:13, marginTop:18, letterSpacing:'.5px' }}>
        LEARN SMARTER
      </p>
      <div style={{ display:'flex', gap:6, marginTop:20 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:8, height:8, borderRadius:'50%', background:C.orange,
            opacity:0.3, animation:`dot .9s ${i*.25}s ease-in-out infinite` }}/>
        ))}
      </div>
      <style>{`@keyframes dot{0%,100%{opacity:.3;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}`}</style>
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
  return (
    <div style={{ minHeight:'100vh', background:C.gray[50],
      fontFamily:"'DM Sans','Segoe UI',sans-serif", color:C.gray[900] }}>

      {/* ── SUB NAV ─────────────────────────────────────────────────────── */}
      <div style={{ background:'white', borderBottom:`1px solid ${C.gray[200]}`,
        position:'sticky', top:0, zIndex:30, boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth:1120, margin:'0 auto', padding:'0 16px',
          height:52, display:'flex', alignItems:'center', gap:6 }}>
          <nav style={{ display:'flex', gap:2, flex:1, overflowX:'auto' }}>
            {navItems.map(n => (
              <button key={n.id} onClick={()=>setTab(n.id)} style={{
                display:'flex', alignItems:'center', gap:5, padding:'7px 12px',
                borderRadius:10, border:'none', cursor:'pointer', fontSize:13,
                fontWeight:700, transition:'all .15s', whiteSpace:'nowrap',
                background: tab===n.id ? `${C.navy}12` : 'transparent',
                color: tab===n.id ? C.navy : C.gray[500],
                borderBottom: tab===n.id ? `2px solid ${C.orange}` : '2px solid transparent'
              }}>
                <n.icon size={15}/>
                <span className="dtab-label">{n.label}</span>
                {n.id==='courses' && total>0 &&
                  <span style={{ background:C.orange, color:'white', fontSize:10,
                    fontWeight:800, borderRadius:20, padding:'1px 6px', lineHeight:1.4 }}>{total}</span>}
              </button>
            ))}
          </nav>
          <div style={{ display:'flex', alignItems:'center', gap:8, flexShrink:0 }}>
            <div style={{ width:34, height:34, borderRadius:10, overflow:'hidden', flexShrink:0,
              background:`linear-gradient(135deg,${C.navy},${C.orange})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'white', fontWeight:900, fontSize:12 }}>
              {avatarUrl
                ? <img src={avatarUrl} alt="me" style={{ width:'100%', height:'100%', objectFit:'cover' }}
                    onError={ev=>{ev.target.style.display='none'}}/>
                : initials(fullName)}
            </div>
            <button className="dmenu-btn" onClick={()=>setMenuOpen(true)} style={{
              background:'none', border:`1.5px solid ${C.gray[200]}`, borderRadius:9,
              width:34, height:34, display:'flex', alignItems:'center',
              justifyContent:'center', cursor:'pointer' }}>
              <Menu size={16} style={{ color:C.navy }}/>
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE DRAWER ─────────────────────────────────────────────── */}
      {menuOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:40 }} onClick={()=>setMenuOpen(false)}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.45)' }}/>
          <div style={{ position:'absolute', left:0, top:0, bottom:0, width:248,
            background:'white', boxShadow:'4px 0 24px rgba(0,0,0,0.14)' }}
            onClick={e=>e.stopPropagation()}>
            <div style={{ padding:'20px 16px 14px',
              background:`linear-gradient(135deg,${C.navyD},${C.navyM})` }}>
              <div style={{ width:48, height:48, borderRadius:13, overflow:'hidden', marginBottom:10,
                background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'white', fontWeight:900, fontSize:17 }}>
                {avatarUrl
                  ? <img src={avatarUrl} style={{ width:'100%', height:'100%', objectFit:'cover' }}
                      onError={ev=>{ev.target.style.display='none'}}/>
                  : initials(fullName)}
              </div>
              <p style={{ color:'white', fontWeight:900, fontSize:15, margin:'0 0 2px' }}>{fullName}</p>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:11, margin:0 }}>{email}</p>
            </div>
            <div style={{ padding:10 }}>
              {navItems.map(n => (
                <button key={n.id} onClick={()=>{setTab(n.id);setMenuOpen(false)}} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:11,
                  padding:'11px 13px', borderRadius:11, border:'none', cursor:'pointer',
                  background: tab===n.id ? `${C.navy}10` : 'transparent',
                  color: tab===n.id ? C.navy : C.gray[600],
                  fontSize:14, fontWeight:700, marginBottom:1 }}>
                  <n.icon size={16}/>{n.label}
                </button>
              ))}
              <div style={{ borderTop:`1px solid ${C.gray[100]}`, marginTop:10, paddingTop:10 }}>
                <button onClick={handleSignOut} style={{
                  width:'100%', display:'flex', alignItems:'center', gap:11,
                  padding:'11px 13px', borderRadius:11, border:'none', cursor:'pointer',
                  background:`${C.red}08`, color:C.red, fontSize:14, fontWeight:700 }}>
                  <LogOut size={16}/> Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── PAGE BODY ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth:1120, margin:'0 auto', padding:'20px 16px 80px' }}>

        {/* ── HOME TAB ──────────────────────────────────────────────── */}
        {tab === 'home' && (
          <div style={{ display:'flex', flexDirection:'column', gap:18 }}>

            {/* ── Clean welcome banner (NO greeting) ── */}
            <div style={{ borderRadius:18, padding:'22px 20px', color:'white', position:'relative',
              overflow:'hidden',
              background:`linear-gradient(135deg,${C.navyD} 0%,${C.navyM} 100%)` }}>
              <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160,
                borderRadius:'50%', background:'rgba(255,122,0,0.1)', pointerEvents:'none' }}/>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between',
                flexWrap:'wrap', gap:12, position:'relative' }}>
                <div>
                  <p style={{ fontSize:12, opacity:.55, margin:'0 0 3px',
                    textTransform:'uppercase', letterSpacing:'.5px' }}>Welcome back</p>
                  <h1 style={{ fontSize:'clamp(19px,5vw,26px)', fontWeight:900, margin:'0 0 5px', lineHeight:1.2 }}>
                    {firstName(fullName)} 👋
                  </h1>
                  <p style={{ fontSize:13, opacity:.6, margin:0 }}>
                    {total > 0
                      ? `Enrolled in ${total} course${total!==1?'s':''}${inProg>0?` · ${inProg} in progress`:''}`
                      : 'Start your learning journey today!'}
                  </p>
                </div>
                <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
                  <div style={{ background:'rgba(255,255,255,0.13)', borderRadius:9, padding:'8px 13px' }}>
                    <p style={{ fontSize:9, opacity:.5, margin:'0 0 1px', textTransform:'uppercase', letterSpacing:'.4px' }}>Student ID</p>
                    <p style={{ fontSize:12, fontWeight:700, margin:0, fontFamily:'monospace' }}>{shortId}</p>
                  </div>
                  <div style={{ background:'rgba(255,255,255,0.13)', borderRadius:9, padding:'8px 13px' }}>
                    <p style={{ fontSize:9, opacity:.5, margin:'0 0 1px', textTransform:'uppercase', letterSpacing:'.4px' }}>Last Login</p>
                    <p style={{ fontSize:12, fontWeight:700, margin:0 }}>{loginAt ? fmtDate(loginAt) : '—'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Stats ── */}
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:10 }}>
              {[
                { icon:BookOpen,    label:'Enrolled',    val:total,              color:C.navy   },
                { icon:PlayCircle,  label:'In Progress', val:inProg,             color:C.orange },
                { icon:CheckCircle, label:'Completed',   val:completed,          color:C.green  },
                { icon:TrendingUp,  label:'Avg Progress',val:`${avgProg}%`,      color:C.navyM  },
                { icon:CreditCard,  label:'Total Paid',  val:fmtMoney(totalPaid),color:C.navy   },
                { icon:Gift,        label:'Ref. Points', val:refPoints,          color:C.purple },
              ].map((s,i) => (
                <Card key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:13,
                  cursor: s.label==='Ref. Points' ? 'pointer' : 'default' }}
                  onClick={ s.label==='Ref. Points' ? ()=>setTab('referral') : undefined }>
                  <div style={{ width:38, height:38, borderRadius:10, background:`${s.color}12`,
                    display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <s.icon size={16} style={{ color:s.color }}/>
                  </div>
                  <div style={{ minWidth:0 }}>
                    <p style={{ fontSize:17, fontWeight:900, color:s.color, margin:0, lineHeight:1 }}>{s.val}</p>
                    <p style={{ fontSize:10, color:C.gray[400], margin:'2px 0 0', whiteSpace:'nowrap' }}>{s.label}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* ── Referral quick card on home — shows real counts ── */}
            {(profile?.referral_code || referralData.total > 0) && (
              <Card style={{ background:`linear-gradient(135deg,${C.purple}08,${C.navy}05)`,
                border:`1px solid ${C.purple}20`, padding:'16px 18px' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <div style={{ width:42, height:42, borderRadius:11, background:`${C.purple}12`,
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                      🎁
                    </div>
                    <div>
                      <p style={{ fontWeight:800, fontSize:14, color:C.navy, margin:'0 0 4px' }}>
                        Refer &amp; Earn Rewards
                      </p>
                      <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                        {profile?.referral_code && (
                          <span style={{ fontSize:12, color:C.gray[500] }}>
                            Code: <strong style={{ fontFamily:'monospace', color:C.purple, letterSpacing:'1px' }}>{profile.referral_code}</strong>
                          </span>
                        )}
                        <span style={{ fontSize:12, color:C.gray[500] }}>
                          {referralData.total} referral{referralData.total!==1?'s':''}
                        </span>
                        <span style={{ fontSize:12, color:C.green, fontWeight:700 }}>
                          {refPoints} pts
                        </span>
                      </div>
                    </div>
                  </div>
                  <button onClick={()=>setTab('referral')}
                    style={{ display:'inline-flex', alignItems:'center', gap:6,
                      padding:'9px 16px', borderRadius:10, border:'none', cursor:'pointer',
                      background:C.purple, color:'white', fontWeight:700, fontSize:13, flexShrink:0 }}>
                    <Gift size={13}/> View Referrals
                  </button>
                </div>
              </Card>
            )}

            {/* ── Continue Learning ── */}
            {inProg > 0 && (
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:10 }}>
                  <h2 style={{ fontWeight:800, fontSize:15, color:C.navy, margin:0 }}>▶️ Continue Learning</h2>
                  <button onClick={()=>setTab('courses')} style={{ background:'none', border:'none',
                    color:C.navyM, fontSize:13, fontWeight:700, cursor:'pointer' }}>All →</button>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:12 }}>
                  {enrollments.filter(e=>{ const p=clamp(e.progress,0,100); return p>0&&p<100 }).map(e => {
                    const c = e.courses || {}
                    const pct = clamp(e.progress,0,100)
                    return (
                      <Card key={e.id} style={{ padding:0, overflow:'hidden', cursor:'pointer' }}
                        onClick={()=>navigate(`/test-course-player/${e.course_id}`)}>
                        <div style={{ height:100, overflow:'hidden', position:'relative' }}>
                          <img src={getCourseImg(c)} alt={c.title||'Course'}
                            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                            onError={ev=>{ ev.target.src=CAT_IMGS[c.category]||COURSE_IMGS['virtual-assistant-pro'] }}/>
                          <div style={{ position:'absolute', inset:0,
                            background:'linear-gradient(to bottom,transparent 30%,rgba(26,61,124,0.75))' }}/>
                          <div style={{ position:'absolute', bottom:8, left:10 }}>
                            <Pill color={C.orange}>In Progress</Pill>
                          </div>
                        </div>
                        <div style={{ padding:13 }}>
                          <h3 style={{ fontWeight:800, fontSize:13, color:C.navy, margin:'0 0 4px', lineHeight:1.3 }}>{c.title}</h3>
                          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                            <span style={{ color:C.gray[500] }}>Progress</span>
                            <span style={{ fontWeight:800, color:C.orange }}>{pct}%</span>
                          </div>
                          <Bar pct={pct} color={C.orange} h={7}/>
                          <div style={{ marginTop:10, padding:'8px 0', borderRadius:9,
                            background:`linear-gradient(135deg,${C.navy},${C.navyM})`,
                            color:'white', fontWeight:700, fontSize:12,
                            display:'flex', alignItems:'center', justifyContent:'center', gap:5 }}>
                            <PlayCircle size={13}/> Continue
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )}

            {total === 0 && (
              <Card style={{ textAlign:'center', padding:'36px 20px' }}>
                <div style={{ fontSize:42, marginBottom:10 }}>📚</div>
                <h3 style={{ fontWeight:800, fontSize:16, color:C.navy, marginBottom:6 }}>No courses yet</h3>
                <p style={{ color:C.gray[500], fontSize:14, marginBottom:18 }}>Browse our courses and start learning today!</p>
                <Link to="/courses" style={{ display:'inline-flex', alignItems:'center', gap:6,
                  background:C.orange, color:'white', padding:'10px 22px', borderRadius:10,
                  fontWeight:700, fontSize:14, textDecoration:'none' }}>
                  Browse Courses <ChevronRight size={14}/>
                </Link>
              </Card>
            )}
          </div>
        )}

        {/* ── COURSES TAB ─────────────────────────────────────────────── */}
        {tab === 'courses' && (
          <div>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
              marginBottom:16, flexWrap:'wrap', gap:10 }}>
              <h2 style={{ fontWeight:900, fontSize:19, color:C.navy, margin:0 }}>
                My Courses <span style={{ fontSize:14, color:C.gray[400], fontWeight:600 }}>({total})</span>
              </h2>
              <Link to="/courses" style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:C.orange, color:'white', padding:'8px 14px', borderRadius:10,
                fontWeight:700, fontSize:13, textDecoration:'none' }}>+ Enroll More</Link>
            </div>
            {total === 0 ? (
              <Card style={{ textAlign:'center', padding:'46px 20px' }}>
                <div style={{ fontSize:46, marginBottom:12 }}>📚</div>
                <h3 style={{ fontWeight:800, fontSize:17, color:C.navy, marginBottom:7 }}>No courses enrolled</h3>
                <Link to="/courses" style={{ display:'inline-flex', alignItems:'center', gap:6,
                  background:`linear-gradient(135deg,${C.navy},${C.orange})`, color:'white',
                  padding:'11px 26px', borderRadius:11, fontWeight:700, fontSize:14, textDecoration:'none' }}>
                  Browse Courses <ChevronRight size={14}/>
                </Link>
              </Card>
            ) : (
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {enrollments.map(e => {
                  const c   = e.courses || {}
                  const pct = clamp(e.progress,0,100)
                  const done= pct >= 100
                  return (
                    <Card key={e.id} style={{ padding:0, overflow:'hidden' }}>
                      <div style={{ height:4, background: done
                        ? `linear-gradient(90deg,${C.green},#00C853)`
                        : pct>0 ? `linear-gradient(90deg,${C.navy},${C.orange})` : C.gray[200] }}/>
                      <div style={{ padding:16, display:'flex', flexWrap:'wrap', gap:14, alignItems:'flex-start' }}>
                        <div style={{ width:74, height:74, borderRadius:12, overflow:'hidden', flexShrink:0 }}>
                          <img src={getCourseImg(c)} alt={c.title||'Course'}
                            style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                            onError={ev=>{ ev.target.src=CAT_IMGS[c.category]||COURSE_IMGS['virtual-assistant-pro'] }}/>
                        </div>
                        <div style={{ flex:1, minWidth:180 }}>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:6 }}>
                            <Pill color={done?C.green:pct>0?C.orange:C.gray[400]}>
                              {done?'✅ Completed':pct>0?`${pct}% Progress`:'Not Started'}
                            </Pill>
                            {c.category && <Pill color={C.navyM}>{c.category}</Pill>}
                          </div>
                          <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:'0 0 3px', lineHeight:1.3 }}>{c.title||'Untitled'}</h3>
                          <p style={{ fontSize:11, color:C.gray[400], margin:'0 0 9px' }}>
                            {c.duration_weeks&&`${c.duration_weeks}w`}{c.level&&` · ${c.level}`}
                            {e.enrolled_at&&` · Enrolled ${fmtDate(e.enrolled_at)}`}
                          </p>
                          <Bar pct={pct} color={done?C.green:C.orange} h={9}/>
                          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginTop:12 }}>
                            <Link to={`/test-course-player/${e.course_id}`}
                              style={{ display:'inline-flex', alignItems:'center', gap:5,
                                background:done?C.green:C.navy, color:'white',
                                padding:'8px 16px', borderRadius:9, fontWeight:700, fontSize:13, textDecoration:'none' }}>
                              <PlayCircle size={13}/>{done?'Review':pct>0?'Continue':'Start'}
                            </Link>
                            {done && (
                              <Link to={`/certificate/${e.course_id}`}
                                style={{ display:'inline-flex', alignItems:'center', gap:5,
                                  background:`${C.green}12`, color:C.green,
                                  padding:'8px 14px', borderRadius:9, fontWeight:700, fontSize:13,
                                  textDecoration:'none', border:`1px solid ${C.green}25` }}>
                                <Award size={13}/> Certificate
                              </Link>
                            )}
                            <button onClick={()=>setQuizCourse(c.title||'General')}
                              style={{ display:'inline-flex', alignItems:'center', gap:5,
                                background:`${C.purple}12`, color:C.purple,
                                padding:'8px 12px', borderRadius:9, fontWeight:700, fontSize:13,
                                border:`1px solid ${C.purple}20`, cursor:'pointer' }}>
                              🧠 Test iQ
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

        {/* ── REFERRAL TAB ─────────────────────────────────────────────── */}
        {tab === 'referral' && (
          <AffiliatePanel user={user} profile={profile} />
        )}

        {/* ── PAYMENTS TAB ─────────────────────────────────────────────── */}
        {tab === 'payments' && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <h2 style={{ fontWeight:900, fontSize:19, color:C.navy, margin:0 }}>Payment History</h2>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:12 }}>
              <Card style={{ background:`linear-gradient(135deg,${C.navyD},${C.navyM})`, color:'white', border:'none', padding:16 }}>
                <p style={{ fontSize:10, opacity:.6, margin:'0 0 3px', textTransform:'uppercase', letterSpacing:'.5px' }}>Total Invested</p>
                <p style={{ fontSize:24, fontWeight:900, margin:0, color:C.orangeL }}>{fmtMoney(totalPaid)}</p>
                <p style={{ fontSize:12, opacity:.5, margin:'3px 0 0' }}>{payments.length} transaction{payments.length!==1?'s':''}</p>
              </Card>
              <Card style={{ padding:16 }}>
                <p style={{ fontSize:10, color:C.gray[400], margin:'0 0 3px', textTransform:'uppercase', letterSpacing:'.5px' }}>Courses</p>
                <p style={{ fontSize:24, fontWeight:900, margin:0, color:C.navy }}>{total}</p>
                <p style={{ fontSize:12, color:C.gray[400], margin:'3px 0 0' }}>Enrolled</p>
              </Card>
            </div>
            {payments.length === 0 ? (
              <Card style={{ textAlign:'center', padding:'40px 20px' }}>
                <CreditCard size={36} style={{ color:C.gray[200], margin:'0 auto 10px', display:'block' }}/>
                <p style={{ fontWeight:700, fontSize:15, color:C.gray[600] }}>No payments yet</p>
              </Card>
            ) : (
              <Card style={{ padding:0, overflow:'hidden' }}>
                <div style={{ padding:'13px 18px', borderBottom:`1px solid ${C.gray[100]}`,
                  fontWeight:800, fontSize:13, color:C.navy }}>All Transactions</div>
                {payments.map((p,i) => {
                  const ok = ['success','paid'].includes((p.status||'').toLowerCase())
                  return (
                    <div key={p.id} style={{ display:'flex', alignItems:'center', gap:12, flexWrap:'wrap',
                      padding:'12px 18px', borderBottom:i<payments.length-1?`1px solid ${C.gray[100]}`:'none',
                      background:i%2===0?'white':C.gray[50] }}>
                      <div style={{ width:38, height:38, borderRadius:10, flexShrink:0,
                        background:`${ok?C.green:C.orange}12`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:17 }}>
                        {ok?'✅':'⏳'}
                      </div>
                      <div style={{ flex:1, minWidth:100 }}>
                        <p style={{ fontWeight:700, fontSize:13, color:C.gray[900], margin:'0 0 1px' }}>{p.course_title||'Course payment'}</p>
                        <p style={{ fontSize:11, color:C.gray[400], margin:0 }}>
                          {fmtDate(p.created_at)}{p.reference?` · ${p.reference}`:''}
                        </p>
                      </div>
                      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                        <span style={{ fontSize:11, fontWeight:700, padding:'2px 9px', borderRadius:20,
                          color:ok?C.green:C.orange, background:ok?`${C.green}12`:`${C.orange}12` }}>
                          {ok?'Paid':p.status||'Pending'}
                        </span>
                        <p style={{ fontWeight:900, fontSize:14, color:C.navy, margin:0 }}>{fmtMoney(p.amount)}</p>
                      </div>
                    </div>
                  )
                })}
              </Card>
            )}
          </div>
        )}

        {/* ── PROFILE TAB ─────────────────────────────────────────────── */}
        {tab === 'profile' && (
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <h2 style={{ fontWeight:900, fontSize:19, color:C.navy, margin:0 }}>My Profile</h2>
            <Card>
              <div style={{ display:'flex', alignItems:'flex-start', gap:18, flexWrap:'wrap' }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:9, flexShrink:0 }}>
                  <div style={{ width:78, height:78, borderRadius:19, overflow:'hidden', position:'relative',
                    background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'white', fontWeight:900, fontSize:26 }}>
                    {avatarUrl
                      ? <img src={avatarUrl} alt="avatar"
                          style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
                          onError={ev=>{ev.target.style.display='none'}}/>
                      : initials(fullName)}
                  </div>
                  <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp"
                    onChange={uploadAvatar} style={{ display:'none' }}/>
                  <button onClick={()=>fileRef.current?.click()} disabled={uploadingImg}
                    style={{ display:'inline-flex', alignItems:'center', gap:5, padding:'7px 13px',
                      borderRadius:9, background:C.navy, color:'white', fontWeight:700,
                      fontSize:12, border:'none', cursor:uploadingImg?'wait':'pointer',
                      opacity:uploadingImg?0.7:1 }}>
                    <Camera size={13}/>
                    {uploadingImg ? 'Uploading…' : 'Change Photo'}
                  </button>
                  {imgMsg && <p style={{ fontSize:12, color:imgMsg.startsWith('✅')?C.green:imgMsg.startsWith('⏳')?C.orange:C.red,
                    margin:0, textAlign:'center', maxWidth:120 }}>{imgMsg}</p>}
                </div>
                <div style={{ flex:1, minWidth:180 }}>
                  <h3 style={{ fontWeight:900, fontSize:17, color:C.navy, margin:'0 0 3px' }}>{fullName}</h3>
                  <p style={{ fontSize:13, color:C.gray[500], margin:'0 0 9px' }}>{email}</p>
                  <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:14 }}>
                    <Pill color={C.navy}>iKPACE Student</Pill>
                    {total>0 && <Pill color={C.green}>{total} Course{total!==1?'s':''}</Pill>}
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:9 }}>
                    {[
                      { label:'Student ID',    val:shortId, mono:true },
                      { label:'Member Since',  val:fmtDate(loginAt) },
                      { label:'Referral Code', val:profile?.referral_code||'—', mono:true },
                      { label:'Ref. Points',   val:refPoints },
                      { label:'Total Refs',    val:referralData.total },
                      { label:'Completed Refs',val:referralData.completed },
                    ].map(({ label, val, mono }, i) => (
                      <div key={i} style={{ background:C.gray[50], borderRadius:10, padding:'9px 12px' }}>
                        <p style={{ fontSize:10, color:C.gray[400], margin:'0 0 2px', textTransform:'uppercase', letterSpacing:'.4px' }}>{label}</p>
                        <p style={{ fontSize:13, fontWeight:700, color:C.gray[900], margin:0, fontFamily:mono?'monospace':'inherit' }}>{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, marginBottom:12 }}>Edit Display Name</h3>
              <div style={{ display:'flex', gap:9, flexWrap:'wrap' }}>
                <input value={editName} onChange={e=>setEditName(e.target.value)}
                  onKeyDown={e=>e.key==='Enter'&&saveName()}
                  placeholder="Your full name"
                  style={{ flex:1, minWidth:160, padding:'10px 13px', borderRadius:10,
                    border:`1.5px solid ${C.gray[200]}`, fontSize:14, outline:'none', color:C.gray[900] }}/>
                <button onClick={saveName} disabled={savingName||!editName.trim()}
                  style={{ padding:'10px 20px', borderRadius:10, background:C.navy, color:'white',
                    fontWeight:700, fontSize:14, border:'none', cursor:savingName?'wait':'pointer', opacity:savingName?0.7:1 }}>
                  {savingName ? 'Saving…' : 'Save'}
                </button>
              </div>
              {nameMsg && <p style={{ fontSize:13, color:nameMsg.startsWith('✅')?C.green:C.red, margin:'9px 0 0' }}>{nameMsg}</p>}
            </Card>

            <Card style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:10,
              border:`1px solid ${C.red}20`, background:`${C.red}04` }}>
              <div>
                <p style={{ fontWeight:800, fontSize:14, color:C.red, margin:'0 0 2px' }}>Sign Out</p>
                <p style={{ fontSize:13, color:C.gray[500], margin:0 }}>You will be logged out of your iKPACE account.</p>
              </div>
              <button onClick={handleSignOut} style={{ display:'inline-flex', alignItems:'center', gap:7,
                background:C.red, color:'white', padding:'10px 20px', borderRadius:10,
                fontWeight:700, fontSize:14, border:'none', cursor:'pointer', flexShrink:0 }}>
                <LogOut size={15}/> Sign Out
              </button>
            </Card>
          </div>
        )}

      </div>

      {/* ── MOBILE BOTTOM NAV ────────────────────────────────────────── */}
      <nav className="dbottom-nav" style={{ position:'fixed', bottom:0, left:0, right:0,
        background:'white', borderTop:`1px solid ${C.gray[200]}`,
        display:'flex', justifyContent:'space-around', padding:'6px 0 12px',
        zIndex:20, boxShadow:'0 -2px 10px rgba(0,0,0,0.05)' }}>
        {navItems.map(n => (
          <button key={n.id} onClick={()=>setTab(n.id)} style={{
            display:'flex', flexDirection:'column', alignItems:'center', gap:2,
            background:tab===n.id?`${C.navy}08`:'none', border:'none',
            cursor:'pointer', padding:'4px 10px', borderRadius:10, flex:1 }}>
            <n.icon size={19} style={{ color:tab===n.id?C.orange:C.gray[400] }}/>
            <span style={{ fontSize:9, fontWeight:700, color:tab===n.id?C.navy:C.gray[400] }}>{n.label}</span>
          </button>
        ))}
      </nav>

      {/* ── IQ QUIZ MODAL ─────────────────────────────────────────────── */}
      {quizCourse && <IQQuiz courseTitle={quizCourse} onClose={()=>setQuizCourse(null)}/>}

      {/* ── GLOBAL STYLES ─────────────────────────────────────────────── */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { padding-bottom: env(safe-area-inset-bottom); -webkit-text-size-adjust: 100%; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[200]}; border-radius: 4px; }
        nav::-webkit-scrollbar { display: none; }
        @media (min-width: 640px) {
          .dbottom-nav { display: none !important; }
          .dmenu-btn   { display: none !important; }
          .dtab-label  { display: inline !important; }
        }
        @media (max-width: 639px) {
          .dtab-label  { display: none !important; }
        }
      `}</style>
    </div>
  )
}
