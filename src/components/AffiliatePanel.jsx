// src/components/AffiliatePanel.jsx
// ─── iKPACE Affiliate & Referral Panel ───────────────────────────────────────
// • Generates/fetches unique referral code per user
// • Share via WhatsApp, Email, or Copy link
// • Connects to Supabase: referral_codes + referrals + referral_rewards
// • Leaderboard, history, rewards, prevent self-referral
//
// ─── ONE-TIME SUPABASE SQL (run once in SQL Editor) ──────────────────────────
// CREATE TABLE IF NOT EXISTS referral_codes (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
//   code VARCHAR(20) UNIQUE NOT NULL,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE TABLE IF NOT EXISTS referrals (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   referrer_id UUID NOT NULL,
//   referred_id UUID,
//   referred_email TEXT,
//   status VARCHAR(20) DEFAULT 'pending',
//   reward_given BOOLEAN DEFAULT FALSE,
//   points_awarded INTEGER DEFAULT 0,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// CREATE TABLE IF NOT EXISTS referral_rewards (
//   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
//   user_id UUID NOT NULL,
//   type VARCHAR(50), -- 'points','discount','free_course','airtime'
//   value TEXT,
//   description TEXT,
//   claimed BOOLEAN DEFAULT FALSE,
//   created_at TIMESTAMPTZ DEFAULT NOW()
// );
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../supabaseClient'
import {
  Copy, Check, Share2, Users, Gift, Trophy, Star,
  ChevronRight, RefreshCw, ExternalLink, Award,
  TrendingUp, Zap, Crown, Medal, MessageCircle, Mail
} from 'lucide-react'

// ─── Brand ────────────────────────────────────────────────────────────────────
const C = {
  navy:'#1A3D7C', navyD:'#0F2655', navyM:'#2F5EA8',
  orange:'#FF7A00', orangeL:'#FF9A3C',
  green:'#008F4C', teal:'#0D9488', purple:'#7C3AED',
  yellow:'#E6B800', amber:'#D97706',
  gray:{ 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',
         400:'#94A3B8',500:'#64748B',600:'#475569',700:'#334155',900:'#0F172A' }
}

// ─── Reward tiers ─────────────────────────────────────────────────────────────
const REWARD_TIERS = [
  { min:1,  max:2,  label:'Starter',       emoji:'🌱', color:C.gray[500], reward:'5 bonus pts each referral'      },
  { min:3,  max:5,  label:'Connector',     emoji:'⭐', color:C.teal,      reward:'10 pts + discount code'         },
  { min:6,  max:10, label:'Ambassador',    emoji:'🔥', color:C.orange,    reward:'Free course unlock at 10 refs'  },
  { min:11, max:20, label:'Champion',      emoji:'👑', color:C.purple,    reward:'Airtime bonus + priority badge' },
  { min:21, max:999,label:'iKPACE Legend', emoji:'🏆', color:C.yellow,    reward:'VIP perks + monthly reward'     },
]
const getTier = n => REWARD_TIERS.find(t => n >= t.min && n <= t.max) || REWARD_TIERS[0]

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmtDate = d => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—'
const genCode = uid => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const seed = uid.replace(/-/g,'').slice(0,8)
  let code = 'IKP'
  for (let i=0; i<5; i++) code += chars[parseInt(seed[i]||'0',16) % chars.length]
  return code
}

// ─── Small atoms ──────────────────────────────────────────────────────────────
const StatBox = ({ emoji, value, label, color, sub }) => (
  <div style={{ background:'white', borderRadius:14, padding:'14px 16px',
    border:`1px solid ${C.gray[200]}`, flex:1, minWidth:100 }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
      <div style={{ width:36,height:36,borderRadius:10,background:`${color}12`,
        display:'flex',alignItems:'center',justifyContent:'center',fontSize:18 }}>{emoji}</div>
      <span style={{ fontSize:22,fontWeight:900,color }}>{value}</span>
    </div>
    <p style={{ fontSize:11,fontWeight:700,color:C.gray[600],margin:'0 0 1px' }}>{label}</p>
    {sub && <p style={{ fontSize:10,color:C.gray[400],margin:0 }}>{sub}</p>}
  </div>
)

// ═════════════════════════════════════════════════════════════════════════════
export default function AffiliatePanel({ userId, userEmail }) {
  const [code,        setCode]        = useState('')
  const [loading,     setLoading]     = useState(true)
  const [refreshing,  setRefreshing]  = useState(false)
  const [copied,      setCopied]      = useState(false)
  const [referrals,   setReferrals]   = useState([])
  const [rewards,     setRewards]     = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [activeTab,   setActiveTab]   = useState('overview')
  const [dbError,     setDbError]     = useState(false)

  const referralLink = code ? `${window.location.origin}/register?ref=${code}` : ''
  const total        = referrals.length
  const completed    = referrals.filter(r => r.status === 'completed' || r.referred_id).length
  const pending      = total - completed
  const totalPoints  = referrals.reduce((s,r) => s + (r.points_awarded||0), 0)
  const tier         = getTier(completed)

  // ── Load or create referral code ─────────────────────────────────────────
  const loadData = useCallback(async () => {
    if (!userId) {
      setLoading(false)
      return
    }
    
    setRefreshing(true)
    setDbError(false)
    
    try {
      // 1. Get or create referral code
      const { data: codeRow, error: codeErr } = await supabase
        .from('referral_codes')
        .select('code')
        .eq('user_id', userId)
        .maybeSingle() // Use maybeSingle instead of single to avoid 406 error

      if (codeErr) {
        console.error('Error fetching referral code:', codeErr)
        setDbError(true)
      } else if (codeRow) {
        setCode(codeRow.code)
      } else {
        // Create new referral code
        const newCode = genCode(userId)
        const { data: inserted, error: insertErr } = await supabase
          .from('referral_codes')
          .insert({ user_id: userId, code: newCode })
          .select('code')
          .maybeSingle()
          
        if (insertErr) {
          console.error('Error creating referral code:', insertErr)
          setDbError(true)
        } else {
          setCode(inserted?.code || newCode)
        }
      }

      // 2. Load referrals for this user
      const { data: refData, error: refErr } = await supabase
        .from('referrals')
        .select('*')
        .eq('referrer_id', userId)
        .order('created_at', { ascending: false })
        
      if (refErr) {
        console.error('Error fetching referrals:', refErr)
      } else {
        setReferrals(refData || [])
      }

      // 3. Load rewards
      const { data: rwData, error: rwErr } = await supabase
        .from('referral_rewards')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        
      if (rwErr) {
        console.error('Error fetching rewards:', rwErr)
      } else {
        setRewards(rwData || [])
      }

      // 4. Leaderboard (top 10 referrers)
      const { data: lbData, error: lbErr } = await supabase
        .from('referral_codes')
        .select(`
          code,
          user_id,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .limit(10)
        
      if (lbErr) {
        console.error('Error fetching leaderboard:', lbErr)
        setLeaderboard([])
      } else if (lbData && lbData.length > 0) {
        // Count referrals per user
        const counts = await Promise.all(
          lbData.map(async row => {
            try {
              const { count, error: countError } = await supabase
                .from('referrals')
                .select('id', { count: 'exact', head: true })
                .eq('referrer_id', row.user_id)
                
              if (countError) {
                console.error('Error counting referrals:', countError)
                return { ...row, count: 0 }
              }
              
              return { 
                ...row, 
                count: count || 0,
                profiles: Array.isArray(row.profiles) ? row.profiles[0] : row.profiles
              }
            } catch (err) {
              console.error('Error in count promise:', err)
              return { ...row, count: 0, profiles: null }
            }
          })
        )
        setLeaderboard(counts.sort((a,b) => b.count - a.count).slice(0,10))
      } else {
        setLeaderboard([])
      }
    } catch(e) {
      console.error('AffiliatePanel load error:', e)
      setDbError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [userId])

  useEffect(() => { 
    loadData() 
  }, [loadData])

  // ── Share actions ─────────────────────────────────────────────────────────
  const doCopy = async () => {
    if (!referralLink) return
    try {
      await navigator.clipboard.writeText(referralLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch (err) {
      console.error('Copy failed:', err)
    }
  }

  const shareWhatsApp = () => {
    if (!referralLink) return
    const msg = encodeURIComponent(
      `🎓 Hey! Join iKPACE — Ghana's most affordable online tech school.\n\nGet professional skills for just $7 per course 🔥\n\nUse my referral link to sign up:\n${referralLink}\n\nCourses: VA Pro, Social Media, Canva Design, AI, Coding for Kids & Freelancing 💼`
    )
    window.open(`https://wa.me/?text=${msg}`, '_blank')
  }

  const shareEmail = () => {
    if (!referralLink) return
    const subject = encodeURIComponent('Join iKPACE — Learn Digital Skills for $7!')
    const body = encodeURIComponent(
      `Hi!\n\nI've been learning on iKPACE — an amazing online tech school with courses starting at just $7.\n\nThey offer:\n✅ Virtual Assistant Pro\n✅ Social Media Marketing\n✅ Canva & Graphic Design\n✅ AI Prompt Engineering\n✅ Smart Kids Coding\n✅ Freelancing & Online Income\n\nAll courses come with a certificate. Click my referral link to sign up:\n${referralLink}\n\nSee you on the platform! 🎓`
    )
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const shareNative = () => {
    if (!referralLink) return
    if (navigator.share) {
      navigator.share({
        title: 'Join iKPACE – Learn Digital Skills',
        text: 'Get professional courses for just $7 with my referral link!',
        url: referralLink
      }).catch(err => {
        console.error('Share failed:', err)
        doCopy()
      })
    } else {
      doCopy()
    }
  }

  const tabs = [
    { id:'overview',  label:'Overview',  emoji:'📊' },
    { id:'history',   label:'History',   emoji:'📋' },
    { id:'rewards',   label:'Rewards',   emoji:'🎁' },
    { id:'leaderboard',label:'Rank',     emoji:'🏆' },
  ]

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ padding:32, textAlign:'center', background:'white',
      borderRadius:16, border:`1px solid ${C.gray[200]}` }}>
      <RefreshCw size={22} style={{ color:C.orange, animation:'spin 1s linear infinite', display:'block', margin:'0 auto 10px' }}/>
      <p style={{ color:C.gray[400], fontSize:13, margin:0 }}>Loading affiliate data…</p>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:14, fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── HEADER BANNER ──────────────────────────────────────────────── */}
      <div style={{ borderRadius:18, overflow:'hidden', position:'relative',
        background:`linear-gradient(135deg, ${C.navyD} 0%, ${C.navyM} 60%, ${C.teal} 100%)` }}>
        <div style={{ position:'absolute', top:-30, right:-30, width:130, height:130, borderRadius:'50%', background:'rgba(255,122,0,0.15)' }}/>
        <div style={{ position:'absolute', bottom:-20, left:-20, width:90, height:90, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }}/>
        <div style={{ padding:'22px 20px 18px', position:'relative', zIndex:1 }}>
          <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
            <div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.12)',
                borderRadius:20, padding:'4px 12px', marginBottom:10 }}>
                <Share2 size={13} style={{ color:C.orangeL }}/>
                <span style={{ color:'white', fontSize:11, fontWeight:700, letterSpacing:'.4px' }}>AFFILIATE PROGRAM</span>
              </div>
              <h2 style={{ color:'white', fontWeight:900, fontSize:'clamp(16px,4vw,20px)', margin:'0 0 5px', lineHeight:1.25 }}>
                Share iKPACE, <span style={{ color:C.orangeL }}>Earn Rewards</span>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:12, margin:0, maxWidth:380, lineHeight:1.5 }}>
                Every friend you refer earns you points, discounts, and bonuses. No limits.
              </p>
            </div>
            {/* Tier badge */}
            <div style={{ background:'rgba(255,255,255,0.12)', borderRadius:14, padding:'10px 14px', textAlign:'center', minWidth:90 }}>
              <div style={{ fontSize:26, lineHeight:1 }}>{tier.emoji}</div>
              <p style={{ color:'white', fontSize:10, fontWeight:800, margin:'4px 0 0', textTransform:'uppercase', letterSpacing:'.5px' }}>{tier.label}</p>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:9, margin:'2px 0 0' }}>{completed} referral{completed!==1?'s':''}</p>
            </div>
          </div>

          {/* Progress to next tier */}
          {tier !== REWARD_TIERS[REWARD_TIERS.length-1] && (
            <div style={{ marginTop:14 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:5 }}>
                <span style={{ color:'rgba(255,255,255,0.55)', fontSize:10, fontWeight:600 }}>
                  {tier.label} → {REWARD_TIERS[REWARD_TIERS.indexOf(tier)+1]?.label}
                </span>
                <span style={{ color:C.orangeL, fontSize:10, fontWeight:800 }}>
                  {completed}/{tier.max} referrals
                </span>
              </div>
              <div style={{ height:5, borderRadius:5, background:'rgba(255,255,255,0.15)' }}>
                <div style={{ height:'100%', borderRadius:5,
                  width:`${Math.min((completed/tier.max)*100,100)}%`,
                  background:`linear-gradient(90deg,${C.orange},${C.orangeL})`,
                  transition:'width .6s ease' }}/>
              </div>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10, margin:'5px 0 0' }}>
                🎁 Unlock: {tier.reward}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ── REFERRAL LINK CARD ───────────────────────────────────────────── */}
      <div style={{ background:'white', borderRadius:16, padding:'18px 16px',
        border:`1px solid ${C.gray[200]}`, boxShadow:'0 1px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12 }}>
          <div style={{ width:34,height:34,borderRadius:10,background:`${C.navy}10`,
            display:'flex',alignItems:'center',justifyContent:'center' }}>
            <ExternalLink size={15} style={{ color:C.navy }}/>
          </div>
          <div>
            <p style={{ fontSize:13,fontWeight:800,color:C.navy,margin:0 }}>Your Referral Link</p>
            <p style={{ fontSize:11,color:C.gray[400],margin:0 }}>Share this — you earn 50 pts when someone joins</p>
          </div>
          {dbError && (
            <span style={{ marginLeft:'auto', fontSize:10, color:C.amber,
              background:`${C.amber}15`, padding:'3px 9px', borderRadius:20, fontWeight:700 }}>
              Tables not set up yet
            </span>
          )}
        </div>

        {/* Link display */}
        <div style={{ display:'flex', gap:7, marginBottom:12, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:180, background:C.gray[50], border:`1.5px solid ${C.gray[200]}`,
            borderRadius:10, padding:'10px 12px', display:'flex', alignItems:'center', gap:8, overflow:'hidden' }}>
            <span style={{ fontSize:11, color:C.navy, fontWeight:700, letterSpacing:.2, whiteSpace:'nowrap' }}>
              🔗
            </span>
            <span style={{ fontSize:11, color:C.gray[600], fontFamily:'monospace', overflow:'hidden',
              textOverflow:'ellipsis', whiteSpace:'nowrap', flex:1 }}>
              {referralLink || 'Generating your link…'}
            </span>
          </div>
          <button onClick={doCopy} disabled={!code}
            style={{ padding:'10px 16px', borderRadius:10, border:'none', cursor:code?'pointer':'not-allowed',
              background:copied?C.green:C.navy, color:'white', fontWeight:700, fontSize:12,
              display:'flex',alignItems:'center',gap:5, flexShrink:0, transition:'background .2s' }}>
            {copied ? <><Check size={13}/> Copied!</> : <><Copy size={13}/> Copy</>}
          </button>
        </div>

        {/* Your code badge */}
        {code && (
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:14,
            padding:'8px 12px', background:`${C.orange}08`, borderRadius:10,
            border:`1px solid ${C.orange}20` }}>
            <span style={{ fontSize:11, color:C.gray[500] }}>Your code:</span>
            <span style={{ fontFamily:'monospace', fontWeight:900, fontSize:15, color:C.orange,
              letterSpacing:2 }}>{code}</span>
            <span style={{ fontSize:10, color:C.gray[400], marginLeft:'auto' }}>
              Case-insensitive
            </span>
          </div>
        )}

        {/* Share buttons */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          <button onClick={shareWhatsApp}
            style={{ padding:'11px 6px', borderRadius:11, border:'none', cursor:'pointer',
              background:'#25D366', color:'white', fontWeight:700, fontSize:12,
              display:'flex',flexDirection:'column',alignItems:'center',gap:4, transition:'opacity .15s' }}
            onMouseEnter={e=>e.target.style.opacity='.85'} onMouseLeave={e=>e.target.style.opacity='1'}>
            {/* WhatsApp icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </button>

          <button onClick={shareEmail}
            style={{ padding:'11px 6px', borderRadius:11, border:'none', cursor:'pointer',
              background:C.navyM, color:'white', fontWeight:700, fontSize:12,
              display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}>
            <Mail size={18}/>
            Email
          </button>

          <button onClick={shareNative}
            style={{ padding:'11px 6px', borderRadius:11, border:'none', cursor:'pointer',
              background:`linear-gradient(135deg,${C.orange},${C.orangeL})`,
              color:'white', fontWeight:700, fontSize:12,
              display:'flex',flexDirection:'column',alignItems:'center',gap:4 }}>
            <Share2 size={18}/>
            More
          </button>
        </div>
      </div>

      {/* ── STATS ROW ────────────────────────────────────────────────────── */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
        <StatBox emoji="👥" value={total}        label="Total Referred"  color={C.navy}   sub="All time"/>
        <StatBox emoji="✅" value={completed}     label="Joined"         color={C.green}  sub="Completed signup"/>
        <StatBox emoji="⏳" value={pending}       label="Pending"        color={C.amber}  sub="Signed up"/>
        <StatBox emoji="⚡" value={totalPoints}   label="Points Earned"  color={C.orange} sub="From referrals"/>
      </div>

      {/* ── TABS ─────────────────────────────────────────────────────────── */}
      <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.gray[200]}`,
        overflow:'hidden', boxShadow:'0 1px 8px rgba(0,0,0,0.04)' }}>

        {/* Tab strip */}
        <div style={{ display:'flex', overflowX:'auto', borderBottom:`1px solid ${C.gray[100]}`,
          padding:'0 4px' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ padding:'12px 14px', background:'none', border:'none', cursor:'pointer',
                fontWeight:700, fontSize:12, whiteSpace:'nowrap', flexShrink:0, transition:'all .15s',
                borderBottom:`2px solid ${activeTab===t.id?C.orange:'transparent'}`,
                color:activeTab===t.id?C.navy:C.gray[400] }}>
              {t.emoji} {t.label}
            </button>
          ))}
          <button onClick={loadData} disabled={refreshing}
            style={{ marginLeft:'auto', padding:'12px 14px', background:'none', border:'none',
              cursor:'pointer', color:C.gray[400], display:'flex', alignItems:'center', gap:4, flexShrink:0 }}>
            <RefreshCw size={13} style={{ animation:refreshing?'spin 1s linear infinite':'none' }}/>
            <span style={{ fontSize:11 }}>Refresh</span>
          </button>
        </div>

        <div style={{ padding:16 }}>

          {/* ── OVERVIEW ──────────────────────────────────────────────── */}
          {activeTab === 'overview' && (
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              {/* How it works */}
              <div>
                <p style={{ fontSize:12,fontWeight:800,color:C.navy,margin:'0 0 10px',
                  textTransform:'uppercase',letterSpacing:'.5px' }}>How It Works</p>
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  {[
                    { step:1, icon:'🔗', text:'Share your unique referral link with friends and family'          },
                    { step:2, icon:'📝', text:'They sign up using your link or referral code'                   },
                    { step:3, icon:'⚡', text:'You earn 50 points instantly when they complete registration'     },
                    { step:4, icon:'🎁', text:'Unlock bigger rewards as you hit referral milestones'            },
                  ].map(s => (
                    <div key={s.step} style={{ display:'flex', alignItems:'flex-start', gap:10,
                      padding:'9px 11px', background:C.gray[50], borderRadius:11 }}>
                      <div style={{ width:24,height:24,borderRadius:8,
                        background:`linear-gradient(135deg,${C.navy},${C.navyM})`,
                        display:'flex',alignItems:'center',justifyContent:'center',
                        flexShrink:0,color:'white',fontSize:10,fontWeight:900 }}>{s.step}</div>
                      <span style={{ fontSize:12, color:C.gray[700], lineHeight:1.5 }}>{s.icon} {s.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tier roadmap */}
              <div>
                <p style={{ fontSize:12,fontWeight:800,color:C.navy,margin:'0 0 10px',
                  textTransform:'uppercase',letterSpacing:'.5px' }}>Reward Tiers</p>
                <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                  {REWARD_TIERS.map((t, i) => {
                    const isCurrent = tier.label === t.label
                    const isUnlocked = completed >= t.min
                    return (
                      <div key={i} style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
                        borderRadius:11, transition:'all .2s',
                        border:`2px solid ${isCurrent?t.color:isUnlocked?`${t.color}30`:C.gray[200]}`,
                        background:isCurrent?`${t.color}08`:isUnlocked?`${t.color}04`:'white',
                        opacity:isUnlocked?1:0.55 }}>
                        <span style={{ fontSize:20, flexShrink:0 }}>{t.emoji}</span>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                            <span style={{ fontSize:12,fontWeight:800,color:isCurrent?t.color:C.gray[700] }}>{t.label}</span>
                            {isCurrent && (
                              <span style={{ fontSize:9,fontWeight:900,padding:'2px 7px',borderRadius:20,
                                background:t.color,color:'white' }}>YOU ARE HERE</span>
                            )}
                            {isUnlocked && !isCurrent && <span style={{ fontSize:9,color:C.green }}>✓ Unlocked</span>}
                          </div>
                          <p style={{ fontSize:10,color:C.gray[400],margin:'1px 0 0' }}>
                            {t.min}-{t.max === 999 ? '∞' : t.max} referrals · {t.reward}
                          </p>
                        </div>
                        {isUnlocked && <Zap size={14} style={{ color:t.color, flexShrink:0 }}/>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ── HISTORY ─────────────────────────────────────────────── */}
          {activeTab === 'history' && (
            <div>
              {referrals.length === 0 ? (
                <div style={{ textAlign:'center', padding:'28px 16px' }}>
                  <div style={{ fontSize:38, marginBottom:10 }}>📭</div>
                  <p style={{ fontWeight:700, fontSize:14, color:C.navy, marginBottom:5 }}>No referrals yet</p>
                  <p style={{ color:C.gray[400], fontSize:13, marginBottom:14 }}>
                    Share your link to see your referrals here.
                  </p>
                  <button onClick={doCopy}
                    style={{ display:'inline-flex',alignItems:'center',gap:6,
                      background:C.orange,color:'white',padding:'9px 18px',
                      borderRadius:10,fontWeight:700,fontSize:13,border:'none',cursor:'pointer' }}>
                    <Copy size={13}/> Copy My Link
                  </button>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr auto auto',
                    padding:'7px 10px', gap:8, background:C.gray[50], borderRadius:9,
                    marginBottom:6, fontSize:10, fontWeight:700, color:C.gray[400],
                    textTransform:'uppercase', letterSpacing:'.4px' }}>
                    <span>Email</span><span>Status</span><span>Points</span>
                  </div>
                  {referrals.map((r, i) => {
                    const joined = r.status === 'completed' || !!r.referred_id
                    return (
                      <div key={r.id} style={{ display:'grid', gridTemplateColumns:'1fr auto auto',
                        padding:'9px 10px', gap:8, alignItems:'center',
                        borderBottom:i<referrals.length-1?`1px solid ${C.gray[100]}`:'none',
                        background:i%2===0?'white':C.gray[50], borderRadius:i===0?'9px 9px 0 0':i===referrals.length-1?'0 0 9px 9px':'0' }}>
                        <div>
                          <p style={{ fontSize:12,fontWeight:600,color:C.gray[700],margin:'0 0 1px' }}>
                            {r.referred_email ? r.referred_email.replace(/(.{3}).+(@.+)/, '$1***$2') : '—'}
                          </p>
                          <p style={{ fontSize:10,color:C.gray[400],margin:0 }}>{fmtDate(r.created_at)}</p>
                        </div>
                        <span style={{ fontSize:10,fontWeight:700,padding:'3px 9px',borderRadius:20,
                          color:joined?C.green:C.amber,
                          background:joined?`${C.green}12`:`${C.amber}12` }}>
                          {joined?'✅ Joined':'⏳ Pending'}
                        </span>
                        <span style={{ fontSize:12,fontWeight:800,color:C.orange,textAlign:'right' }}>
                          +{r.points_awarded||50}
                        </span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* ── REWARDS ──────────────────────────────────────────────── */}
          {activeTab === 'rewards' && (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {/* Points summary */}
              <div style={{ background:`linear-gradient(135deg,${C.navyD},${C.navyM})`,
                borderRadius:14, padding:'16px 14px', color:'white' }}>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <div>
                    <p style={{ fontSize:10,opacity:.6,margin:'0 0 3px',textTransform:'uppercase',letterSpacing:'.5px' }}>
                      Total Points Earned
                    </p>
                    <p style={{ fontSize:28,fontWeight:900,margin:0,color:C.orangeL }}>{totalPoints}</p>
                    <p style={{ fontSize:11,opacity:.5,margin:'3px 0 0' }}>From {completed} successful referral{completed!==1?'s':''}</p>
                  </div>
                  <div style={{ fontSize:38 }}>{tier.emoji}</div>
                </div>
              </div>

              {/* Available rewards */}
              <p style={{ fontSize:12,fontWeight:800,color:C.navy,margin:0,
                textTransform:'uppercase',letterSpacing:'.5px' }}>Available Rewards</p>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {[
                  { emoji:'⚡', title:'50 Points Per Referral', desc:'Earned automatically when a friend joins', available:true, type:'points' },
                  { emoji:'🎟️', title:'10% Discount Code',     desc:'Unlock at 3+ referrals', available:completed>=3, type:'discount', value:'IKPREF10' },
                  { emoji:'🎓', title:'Free Course Unlock',     desc:'Unlock at 10+ referrals', available:completed>=10, type:'free_course' },
                  { emoji:'📱', title:'Airtime Bonus',          desc:'Unlock at 15+ referrals — GHS 10 airtime', available:completed>=15, type:'airtime' },
                  { emoji:'👑', title:'VIP Ambassador Badge',   desc:'Unlock at 21+ referrals — special profile badge', available:completed>=21, type:'vip' },
                ].map((r, i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:11, padding:'11px 13px',
                    borderRadius:11, border:`1px solid ${r.available?C.orange+'30':C.gray[200]}`,
                    background:r.available?`${C.orange}06`:'white', opacity:r.available?1:0.6 }}>
                    <div style={{ width:38,height:38,borderRadius:10,fontSize:20,
                      background:r.available?`${C.orange}12`:C.gray[100],
                      display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      {r.emoji}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:13,fontWeight:800,color:r.available?C.navy:C.gray[500],margin:'0 0 1px' }}>{r.title}</p>
                      <p style={{ fontSize:11,color:C.gray[400],margin:0 }}>{r.desc}</p>
                      {r.type==='discount' && r.available && r.value && (
                        <span style={{ fontSize:11,fontWeight:900,fontFamily:'monospace',color:C.orange,
                          background:`${C.orange}15`,padding:'1px 8px',borderRadius:6,marginTop:4,display:'inline-block' }}>
                          {r.value}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize:11,fontWeight:700,flexShrink:0,
                      color:r.available?C.green:C.gray[400] }}>
                      {r.available ? '✅ Active' : '🔒 Locked'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rewards from DB */}
              {rewards.length > 0 && (
                <>
                  <p style={{ fontSize:12,fontWeight:800,color:C.navy,margin:'4px 0 0',
                    textTransform:'uppercase',letterSpacing:'.5px' }}>Earned Rewards</p>
                  {rewards.map(rw => (
                    <div key={rw.id} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 13px',
                      borderRadius:11, background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                      <span style={{ fontSize:18 }}>{rw.type==='points'?'⚡':rw.type==='discount'?'🎟️':rw.type==='free_course'?'🎓':'🎁'}</span>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:12,fontWeight:700,color:C.gray[800],margin:'0 0 1px' }}>{rw.description||rw.type}</p>
                        <p style={{ fontSize:10,color:C.gray[400],margin:0 }}>{fmtDate(rw.created_at)}</p>
                      </div>
                      <span style={{ fontSize:10,fontWeight:700,color:rw.claimed?C.green:C.orange }}>
                        {rw.claimed?'Claimed':'Active'}
                      </span>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* ── LEADERBOARD ──────────────────────────────────────────── */}
          {activeTab === 'leaderboard' && (
            <div>
              <p style={{ fontSize:11,color:C.gray[400],margin:'0 0 12px',lineHeight:1.5 }}>
                Top referrers this month. Names are anonymized for privacy.
              </p>
              {leaderboard.length === 0 ? (
                <div style={{ textAlign:'center', padding:'24px 16px' }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>🏆</div>
                  <p style={{ color:C.gray[400], fontSize:13 }}>No leaderboard data yet. Be the first!</p>
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
                  {leaderboard.map((row, i) => {
                    const isMe = row.user_id === userId
                    const medals = ['🥇','🥈','🥉']
                    const name = row.profiles?.full_name || `User ${row.code}`
                    const displayName = isMe ? `${name.split(' ')[0]} (You)` : name.split(' ')[0] + ' ' + (name.split(' ')[1]?.[0]||'') + '.'
                    return (
                      <div key={row.user_id} style={{ display:'flex', alignItems:'center', gap:10, padding:'9px 12px',
                        borderRadius:11, border:`2px solid ${isMe?C.orange:i<3?`${C.yellow}40`:C.gray[200]}`,
                        background:isMe?`${C.orange}07`:i<3?`${C.yellow}05`:'white' }}>
                        <span style={{ fontSize:20, flexShrink:0, width:26, textAlign:'center' }}>
                          {medals[i] || `${i+1}`}
                        </span>
                        <div style={{ width:32,height:32,borderRadius:9,
                          background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                          display:'flex',alignItems:'center',justifyContent:'center',
                          color:'white',fontWeight:900,fontSize:12,flexShrink:0,overflow:'hidden' }}>
                          {row.profiles?.avatar_url
                            ? <img src={row.profiles.avatar_url} style={{ width:'100%',height:'100%',objectFit:'cover' }} alt="avatar"/>
                            : displayName[0].toUpperCase()}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ fontSize:12,fontWeight:isMe?900:700,
                            color:isMe?C.orange:C.gray[800],margin:'0 0 1px' }}>{displayName}</p>
                          <p style={{ fontSize:10,color:C.gray[400],margin:0 }}>
                            {getTier(row.count).emoji} {getTier(row.count).label}
                          </p>
                        </div>
                        <div style={{ textAlign:'right', flexShrink:0 }}>
                          <p style={{ fontSize:14,fontWeight:900,color:isMe?C.orange:C.navy,margin:'0 0 1px' }}>{row.count}</p>
                          <p style={{ fontSize:10,color:C.gray[400],margin:0 }}>refs</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* ── DB SETUP NOTICE ────────────────────────────────────────────── */}
      {dbError && (
        <div style={{ padding:'12px 14px', borderRadius:12, background:`${C.amber}10`,
          border:`1px solid ${C.amber}30` }}>
          <p style={{ fontSize:12,fontWeight:700,color:C.amber,margin:'0 0 4px' }}>
            ⚠️ Referral Tables Not Found
          </p>
          <p style={{ fontSize:11,color:C.gray[500],margin:0,lineHeight:1.55 }}>
            Run the SQL in the component comments in your Supabase SQL Editor to enable real-time referral tracking.
            Share buttons still work — referrals will track once tables are set up.
          </p>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}