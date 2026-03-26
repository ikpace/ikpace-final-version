// src/pages/Register.jsx
// iKPACE Registration — v2 (Email only)
// ✅ Phone / OTP flow completely removed
// ✅ Email + Password only
// ✅ Referral code extracted from ?ref= URL param
// ✅ Calls supabase.rpc('link_referral') after signup — correct pattern
// ✅ Debug console logs included
// ✅ Auto-login + redirect to dashboard after signup
// ✅ 2-step form: Info → Password
// ✅ Password strength meter
// ✅ Terms checkbox

import { useState, useEffect } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { supabase } from "../supabaseClient"
import { useAuth } from "../contexts/AuthContext"
import {
  Mail, Lock, User, AlertCircle, Eye, EyeOff,
  CheckCircle, XCircle, ArrowRight, Shield, Award,
  BookOpen, Users, Sparkles, ChevronRight,
  Clock, Star, BadgeCheck, Heart,
  Zap, Rocket, Check, Gift
} from "lucide-react"

// ── Brand tokens ──────────────────────────────────────────────────────────────
const C = {
  navy:       "#1A3D7C",
  navyDark:   "#0F2655",
  navyMid:    "#2F5EA8",
  orange:     "#FF7A00",
  orangeLight:"#FF9A3C",
  green:      "#008F4C",
  yellow:     "#E6B800",
  rose:       "#E11D48",
  gray: {
    50:"#F8FAFC", 100:"#F1F5F9", 200:"#E2E8F0",
    300:"#CBD5E1", 400:"#94A3B8", 500:"#64748B",
    600:"#475569", 700:"#334155", 800:"#1E293B", 900:"#0F172A"
  }
}

// ── iKPACE Logo SVG ───────────────────────────────────────────────────────────
function IKPACELogo({ width = 120 }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", width }}>
      <svg width={width} height={width * 1.2} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="240" rx="24" fill="#1A3D7C"/>
        <polygon points="100,36 172,62 100,88 28,62" fill="#FF7A00"/>
        <path d="M52,70 L52,106 Q52,132 100,140 Q148,132 148,106 L148,70 Q124,80 100,80 Q76,80 52,70Z" fill="#FF7A00"/>
        <path d="M52,70 Q76,80 100,80 Q124,80 148,70 Q124,86 100,86 Q76,86 52,70Z" fill="#0F2655" opacity="0.35"/>
        <line x1="172" y1="62" x2="172" y2="100" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round"/>
        <line x1="162" y1="100" x2="182" y2="100" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="172" cy="112" r="7" fill="#FF7A00"/>
        <text x="100" y="178" textAnchor="middle"
          fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
          fontWeight="900" fontSize="44" fill="white" letterSpacing="-1">iKpace</text>
        <text x="100" y="210" textAnchor="middle"
          fontFamily="'Arial','Helvetica Neue',sans-serif"
          fontWeight="700" fontSize="13" fill="#E6B800" letterSpacing="4.5">LEARN SMARTER</text>
      </svg>
    </div>
  )
}

// ── Password helpers ──────────────────────────────────────────────────────────
const checkPw = (pw) => ({
  length:    pw.length >= 8,
  number:    /\d/.test(pw),
  uppercase: /[A-Z]/.test(pw),
  lowercase: /[a-z]/.test(pw),
  special:   /[!@#$%^&*(),.?":{}|<>]/.test(pw),
})
const strengthMeta = (n) => {
  if (n === 0) return { label: "",       color: C.gray[200], w: "0%"   }
  if (n <= 2)  return { label: "Weak",   color: C.rose,      w: "33%"  }
  if (n <= 4)  return { label: "Medium", color: C.yellow,    w: "66%"  }
  return             { label: "Strong", color: C.green,     w: "100%" }
}

// ── Small UI helpers ──────────────────────────────────────────────────────────
function StepDot({ num, active, done, label }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
      <div style={{
        width:32, height:32, borderRadius:"50%",
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:13, fontWeight:700,
        background: done ? C.green : active ? C.orange : C.gray[200],
        color: (done || active) ? "#fff" : C.gray[400],
        boxShadow: active ? `0 0 0 4px ${C.orange}30` : "none",
        transition:"all .3s"
      }}>
        {done ? <Check size={14}/> : num}
      </div>
      <span style={{ fontSize:10, fontWeight:500, color: active ? C.navy : C.gray[400] }}>{label}</span>
    </div>
  )
}

function PwRule({ ok, label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12 }}>
      {ok
        ? <CheckCircle size={12} style={{ color:C.green, flexShrink:0 }}/>
        : <XCircle     size={12} style={{ color:C.gray[300], flexShrink:0 }}/>}
      <span style={{ color: ok ? C.gray[700] : C.gray[400] }}>{label}</span>
    </div>
  )
}

// Styled input wrapper
function Field({ label, icon: Icon, error, req, children }) {
  return (
    <div>
      <label style={{ display:"block", fontSize:14, fontWeight:600,
        marginBottom:6, color:C.gray[700] }}>
        {label}
        {req && <span style={{ color:C.rose, marginLeft:2 }}>*</span>}
      </label>
      <div style={{ position:"relative" }}>
        <div style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)",
          color: error ? C.rose : C.gray[400] }}>
          <Icon size={17}/>
        </div>
        {children}
      </div>
      {error && (
        <p style={{ marginTop:4, fontSize:12, display:"flex", alignItems:"center",
          gap:4, color:C.rose }}>
          <AlertCircle size={11}/>{error}
        </p>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN REGISTER COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function Register() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signUp } = useAuth()

  // ── Form state ────────────────────────────────────────────────────────────
  const [step,       setStep]       = useState(1) // 1 = info, 2 = password
  const [fullName,   setFullName]   = useState('')
  const [email,      setEmail]      = useState('')
  const [password,   setPassword]   = useState('')
  const [confirmPw,  setConfirmPw]  = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [showPw,     setShowPw]     = useState(false)
  const [showCpw,    setShowCpw]    = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [success,    setSuccess]    = useState(false)
  const [globalErr,  setGlobalErr]  = useState('')
  const [fieldErr,   setFieldErr]   = useState({})

  // ── Extract referral code from URL: /register?ref=XXXXX ──────────────────
  // Uses both React Router searchParams and a direct URL parse as backup
  const referralCode = searchParams.get('ref') ||
    new URLSearchParams(window.location.search).get('ref') || ''

  // ── Password analysis ─────────────────────────────────────────────────────
  const pwChecks = checkPw(password)
  const pwScore  = Object.values(pwChecks).filter(Boolean).length
  const pwStr    = strengthMeta(pwScore)

  // Clear global error when user types
  useEffect(() => { setGlobalErr('') }, [fullName, email, password, confirmPw])

  // ── Step 1 validation ─────────────────────────────────────────────────────
  const validateStep1 = () => {
    const e = {}
    if (!fullName.trim() || fullName.trim().length < 2)
      e.fullName = "Enter your full name (min 2 characters)"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email address"
    setFieldErr(e)
    return Object.keys(e).length === 0
  }

  // ── Step 2 validation ─────────────────────────────────────────────────────
  const validateStep2 = () => {
    const e = {}
    if (pwScore < 3)            e.password  = "Choose a stronger password (at least Medium)"
    if (password !== confirmPw) e.confirmPw = "Passwords do not match"
    if (!agreeTerms)            e.terms     = "You must agree to the Terms of Service"
    setFieldErr(e)
    return Object.keys(e).length === 0
  }

  // ── Main submit — Email signup + referral linking ─────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return

    setLoading(true)
    setGlobalErr('')

    try {
      // ── STEP 1: Sign up with Supabase Auth ──────────────────────────────
      // Use supabase.auth.signUp directly (most reliable — avoids wrapper issues)
      const { data, error: signUpErr } = await supabase.auth.signUp({
        email:    email.trim().toLowerCase(),
        password,
        options: {
          data: { full_name: fullName.trim() }  // stored in auth.users metadata
        }
      })

      // Debug logs — check browser console
      console.log('[Register] Referral code from URL:', referralCode || '(none)')
      console.log('[Register] Signup data:', data)
      console.log('[Register] Signup error:', signUpErr)

      if (signUpErr) throw signUpErr
      if (!data.user) throw new Error('Account creation failed. Please try again.')

      const userId = data.user.id
      console.log('[Register] New user ID:', userId)

      // ── STEP 2: Update profiles table with name + generate referral code ─
      // The trigger may have already created the row — we UPDATE it safely
      const prefix = fullName.trim().substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '') || 'IKP'
      const newReferralCode = `${prefix}${Math.floor(Math.random() * 90000 + 10000)}`

      const { error: profileErr } = await supabase
        .from('profiles')
        .update({
          full_name:       fullName.trim(),
          referral_code:   newReferralCode,
          referral_points: 0
        })
        .eq('id', userId)

      if (profileErr) {
        console.warn('[Register] Profile update warning:', profileErr.message)
        // Non-fatal — the trigger may have set referral_code already
      }

      // ── STEP 3: Link referral if ?ref= was in the URL ───────────────────
      // ONLY call this if a referral code exists — never call without one
      if (referralCode) {
        console.log('[Register] Linking referral — code:', referralCode, '| user:', userId)
        try {
          const { data: rpcData, error: rpcErr } = await supabase.rpc('link_referral', {
            p_code:    referralCode,
            p_email:   email.trim().toLowerCase(),
            p_user_id: userId
          })
          console.log('[Register] link_referral result:', rpcData, rpcErr)
          if (rpcErr) console.warn('[Register] Referral RPC warning:', rpcErr.message)
        } catch (refErr) {
          // Non-fatal — don't block registration if referral fails
          console.error('[Register] Referral link failed (non-fatal):', refErr)
        }
      } else {
        console.log('[Register] No referral code — skipping link_referral')
      }

      // ── STEP 4: Show success + redirect ────────────────────────────────
      setSuccess(true)
      setTimeout(() => navigate('/dashboard', { replace: true }), 1800)

    } catch (err) {
      console.error('[Register] Fatal error:', err)
      const msg = err.message || ''

      if (msg.includes('already registered') || msg.includes('already exists')) {
        setGlobalErr('An account with this email already exists. Please sign in instead.')
      } else if (msg.includes('password')) {
        setGlobalErr('Password must be at least 6 characters long.')
      } else if (msg.includes('valid email')) {
        setGlobalErr('Please enter a valid email address.')
      } else {
        setGlobalErr(msg || 'Registration failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Input style helper ────────────────────────────────────────────────────
  const inputStyle = (hasError) => ({
    width: "100%",
    paddingLeft: 40,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 12,
    fontSize: 14,
    outline: "none",
    border: `2px solid ${hasError ? C.rose : C.gray[200]}`,
    color: C.gray[800],
    background: "#fff",
    fontFamily: "inherit",
    transition: "border-color .2s"
  })

  // ── Success screen ────────────────────────────────────────────────────────
  if (success) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: 16,
      background: `linear-gradient(135deg,${C.navyDark},${C.navy},${C.navyMid})`
    }}>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: 96, height: 96, borderRadius: "50%", margin: "0 auto 24px",
          display: "flex", alignItems: "center", justifyContent: "center",
          background: `${C.green}30`, border: `3px solid ${C.green}`,
          animation: "regPulse 1s ease-in-out infinite"
        }}>
          <CheckCircle size={44} style={{ color: C.green }}/>
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: "white", marginBottom: 8 }}>
          Welcome aboard! 🎉
        </h2>
        <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 4, fontSize: 15 }}>
          Account created successfully.
        </p>
        {referralCode && (
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, marginBottom: 4 }}>
            🎁 Referral bonus applied!
          </p>
        )}
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13 }}>
          Taking you to your dashboard…
        </p>
        <div style={{ marginTop: 32, width: 200, margin: "32px auto 0",
          height: 6, borderRadius: 6, background: "rgba(255,255,255,0.15)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 6, background: C.orange,
            animation: "regGrow 1.8s linear forwards" }}/>
        </div>
      </div>
      <style>{`
        @keyframes regPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes regGrow  { from{width:0%} to{width:100%} }
      `}</style>
    </div>
  )

  // ── Main render ───────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "24px 16px",
      background: `linear-gradient(135deg,${C.gray[50]},${C.gray[100]})`
    }}>
      <div style={{
        width: "100%", maxWidth: 960, background: "white",
        borderRadius: 28, boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        overflow: "hidden", display: "flex", flexDirection: "row",
        flexWrap: "wrap"
      }}>

        {/* ── LEFT brand panel ─────────────────────────────────────────── */}
        <aside style={{
          flex: "0 0 42%", minWidth: 280,
          background: `linear-gradient(160deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)`,
          padding: "40px 36px", display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden"
        }}>
          {/* Decorative circles */}
          <div style={{ position:"absolute", top:-64, right:-64, width:220, height:220,
            borderRadius:"50%", background:C.orange, opacity:.08, pointerEvents:"none" }}/>
          <div style={{ position:"absolute", bottom:0, left:-64, width:192, height:192,
            borderRadius:"50%", background:C.yellow, opacity:.08, pointerEvents:"none" }}/>

          {/* Logo */}
          <Link to="/" style={{ display:"inline-flex", marginBottom:32, textDecoration:"none" }}>
            <IKPACELogo width={100}/>
          </Link>

          {/* Headline */}
          <div style={{ position:"relative", flex:1 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8,
              background:"rgba(255,255,255,0.14)", borderRadius:30,
              padding:"6px 14px", marginBottom:18 }}>
              <Sparkles size={13} style={{ color:C.yellow }}/>
              <span style={{ color:"white", fontSize:12, fontWeight:600 }}>Join learners worldwide</span>
            </div>

            <h1 style={{ fontSize:"clamp(24px,3vw,34px)", fontWeight:900, color:"white",
              lineHeight:1.15, marginBottom:16 }}>
              Start Your<br/>
              <span style={{ color:C.orangeLight }}>Learning</span><br/>
              Journey Today
            </h1>
            <p style={{ color:"rgba(255,255,255,0.65)", fontSize:13,
              lineHeight:1.7, marginBottom:28 }}>
              Expert-led courses, a thriving community,<br/>
              and certificates that employers recognise.
            </p>

            {/* Feature grid */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr",
              gap:10, marginBottom:24 }}>
              {[
                { icon:BookOpen, label:"Expert Courses",  sub:"Industry-led"   },
                { icon:Users,    label:"Community",        sub:"130+ learners"  },
                { icon:Award,    label:"Certificates",     sub:"Recognised"     },
                { icon:Clock,    label:"Self-Paced",       sub:"Learn anytime"  },
              ].map(({ icon:Icon, label, sub }) => (
                <div key={label} style={{ background:"rgba(255,255,255,0.1)",
                  borderRadius:16, padding:"14px 12px",
                  transition:"background .2s", cursor:"default" }}>
                  <Icon size={16} style={{ color:C.orangeLight, marginBottom:8 }}/>
                  <p style={{ color:"white", fontWeight:700, fontSize:12, margin:0 }}>{label}</p>
                  <p style={{ color:"rgba(255,255,255,0.45)", fontSize:10, margin:"2px 0 0" }}>{sub}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:18, padding:16, marginBottom:20 }}>
              <div style={{ display:"flex", gap:2, marginBottom:8 }}>
                {[...Array(5)].map((_,i) => (
                  <Star key={i} size={12} fill={C.yellow} style={{ color:C.yellow }}/>
                ))}
              </div>
              <p style={{ color:"rgba(255,255,255,0.82)", fontSize:12, fontStyle:"italic",
                lineHeight:1.6, marginBottom:12 }}>
                "iKPACE helped me land my first VA client. The course is practical and the community is amazing."
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:32, height:32, borderRadius:"50%",
                  background:"rgba(255,255,255,0.2)", display:"flex",
                  alignItems:"center", justifyContent:"center",
                  color:"white", fontSize:11, fontWeight:700 }}>SA</div>
                <div>
                  <p style={{ color:"white", fontWeight:600, fontSize:12, margin:0 }}>Sarah A.</p>
                  <p style={{ color:"rgba(255,255,255,0.45)", fontSize:10, margin:0 }}>VA Professional · Ghana</p>
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div style={{ display:"flex", gap:20, color:"rgba(255,255,255,0.5)", fontSize:12 }}>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Shield size={12}/> Secure</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><BadgeCheck size={12}/> Verified</span>
              <span style={{ display:"flex", alignItems:"center", gap:5 }}><Heart size={12}/> Trusted</span>
            </div>
          </div>
        </aside>

        {/* ── RIGHT form panel ─────────────────────────────────────────── */}
        <section style={{
          flex: "1 1 300px", padding: "36px 32px",
          display: "flex", flexDirection: "column",
          overflowY: "auto", minWidth: 0
        }}>
          {/* Header */}
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: C.navy, margin: "0 0 6px" }}>
              Create your account
            </h2>
            <p style={{ fontSize: 14, color: C.gray[500], margin: 0 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ color: C.orange, fontWeight: 700, textDecoration: "none" }}>
                Sign in <ChevronRight size={13} style={{ display:"inline", verticalAlign:"middle" }}/>
              </Link>
            </p>

            {/* Referral banner — only shown when ?ref= is present */}
            {referralCode && (
              <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 12,
                background: `${C.orange}10`, border: `1px solid ${C.orange}30` }}>
                <p style={{ fontSize: 13, color: C.orange, margin: 0,
                  display: "flex", alignItems: "center", gap: 6 }}>
                  <Gift size={13}/>
                  You were referred! Earn bonus points when you complete your first course 🎁
                </p>
              </div>
            )}
          </div>

          {/* Step indicator */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:24 }}>
            <StepDot num={1} label="Your Info"    active={step===1} done={step>1}/>
            <div style={{ flex:1, height:2, borderRadius:2, background:step>1?C.green:C.gray[200],
              transition:"background .5s" }}/>
            <StepDot num={2} label="Set Password" active={step===2} done={success}/>
          </div>

          {/* Global error */}
          {globalErr && (
            <div style={{ marginBottom:16, padding:"14px 16px", borderRadius:16,
              background:`${C.rose}10`, border:`1px solid ${C.rose}30`,
              display:"flex", alignItems:"flex-start", gap:10 }}>
              <AlertCircle size={18} style={{ color:C.rose, flexShrink:0, marginTop:1 }}/>
              <div>
                <p style={{ fontSize:14, fontWeight:700, color:C.rose, margin:"0 0 2px" }}>Oops!</p>
                <p style={{ fontSize:13, color:C.rose, margin:0 }}>{globalErr}</p>
              </div>
            </div>
          )}

          {/* ── STEP 1: Name + Email ──────────────────────────────────── */}
          {step === 1 && (
            <form
              onSubmit={e => { e.preventDefault(); if (validateStep1()) setStep(2) }}
              style={{ display:"flex", flexDirection:"column", gap:18, flex:1 }}
            >
              {/* Full name */}
              <Field label="Full Name" icon={User} error={fieldErr.fullName} req>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => { setFullName(e.target.value); setFieldErr(p=>({...p,fullName:''})) }}
                  placeholder="e.g. Amara Asante"
                  style={inputStyle(!!fieldErr.fullName)}
                  onFocus={e  => e.target.style.borderColor = C.orange}
                  onBlur={e   => e.target.style.borderColor = fieldErr.fullName ? C.rose : C.gray[200]}
                  required
                />
              </Field>

              {/* Email */}
              <Field label="Email Address" icon={Mail} error={fieldErr.email} req>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setFieldErr(p=>({...p,email:''})) }}
                  placeholder="you@example.com"
                  style={inputStyle(!!fieldErr.email)}
                  onFocus={e  => e.target.style.borderColor = C.orange}
                  onBlur={e   => e.target.style.borderColor = fieldErr.email ? C.rose : C.gray[200]}
                  required
                />
              </Field>

              {/* What you get panel */}
              <div style={{ borderRadius:16, padding:16,
                background:`${C.navy}08`, border:`1px solid ${C.navy}15` }}>
                <p style={{ fontSize:13, fontWeight:700, color:C.navy, margin:"0 0 10px",
                  display:"flex", alignItems:"center", gap:6 }}>
                  <Zap size={13} style={{ color:C.orange }}/> What you get with iKPACE
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 12px" }}>
                  {[
                    "Lifetime course access", "Completion certificates",
                    "Peer study groups",      "Mentor Q&A sessions",
                    "Progress tracking",      "Mobile learning"
                  ].map(item => (
                    <p key={item} style={{ fontSize:12, color:C.gray[600], margin:0,
                      display:"flex", alignItems:"center", gap:6 }}>
                      <CheckCircle size={11} style={{ color:C.green, flexShrink:0 }}/>{item}
                    </p>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                style={{
                  marginTop:"auto", width:"100%", padding:"14px",
                  borderRadius:12, border:"none", cursor:"pointer",
                  fontWeight:700, fontSize:14, color:"white",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                  background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                  boxShadow:`0 4px 20px ${C.navy}30`, fontFamily:"inherit"
                }}>
                Continue <ArrowRight size={17}/>
              </button>
            </form>
          )}

          {/* ── STEP 2: Password ─────────────────────────────────────── */}
          {step === 2 && (
            <form
              onSubmit={handleSubmit}
              style={{ display:"flex", flexDirection:"column", gap:16, flex:1 }}
            >
              {/* Back button */}
              <button
                type="button"
                onClick={() => { setStep(1); setFieldErr({}) }}
                style={{ alignSelf:"flex-start", background:"none", border:"none",
                  cursor:"pointer", fontSize:13, color:C.gray[500],
                  display:"flex", alignItems:"center", gap:4, padding:0, fontFamily:"inherit" }}>
                ← Back to your info
              </button>

              {/* Password field */}
              <Field label="Password" icon={Lock} error={fieldErr.password} req>
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setFieldErr(p=>({...p,password:''})) }}
                  placeholder="Create a strong password"
                  style={{ ...inputStyle(!!fieldErr.password), paddingRight:44 }}
                  onFocus={e  => e.target.style.borderColor = C.orange}
                  onBlur={e   => e.target.style.borderColor = fieldErr.password ? C.rose : C.gray[200]}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(p => !p)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer",
                    color:C.gray[400], padding:0 }}>
                  {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </Field>

              {/* Strength meter */}
              {password.length > 0 && (
                <div style={{ marginTop:-4 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                    <div style={{ flex:1, height:8, borderRadius:8,
                      background:C.gray[200], overflow:"hidden" }}>
                      <div style={{ height:"100%", borderRadius:8,
                        background:pwStr.color, width:pwStr.w, transition:"all .3s" }}/>
                    </div>
                    <span style={{ fontSize:12, fontWeight:700, width:50,
                      textAlign:"right", color:pwStr.color }}>{pwStr.label}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4px 12px" }}>
                    <PwRule ok={pwChecks.length}    label="8+ characters"/>
                    <PwRule ok={pwChecks.number}    label="Contains number"/>
                    <PwRule ok={pwChecks.uppercase} label="Uppercase letter"/>
                    <PwRule ok={pwChecks.lowercase} label="Lowercase letter"/>
                    <PwRule ok={pwChecks.special}   label="Special character"/>
                  </div>
                </div>
              )}

              {/* Confirm password */}
              <Field label="Confirm Password" icon={Lock} error={fieldErr.confirmPw} req>
                <input
                  type={showCpw ? "text" : "password"}
                  value={confirmPw}
                  onChange={e => { setConfirmPw(e.target.value); setFieldErr(p=>({...p,confirmPw:''})) }}
                  placeholder="Repeat your password"
                  style={{
                    ...inputStyle(!!fieldErr.confirmPw),
                    paddingRight: 44,
                    borderColor: confirmPw.length > 0
                      ? (password === confirmPw ? C.green : C.rose)
                      : (fieldErr.confirmPw ? C.rose : C.gray[200])
                  }}
                  onFocus={e => e.target.style.borderColor = C.orange}
                  onBlur={e  => {
                    if (confirmPw.length > 0)
                      e.target.style.borderColor = password === confirmPw ? C.green : C.rose
                    else
                      e.target.style.borderColor = C.gray[200]
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCpw(p => !p)}
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
                    background:"none", border:"none", cursor:"pointer",
                    color:C.gray[400], padding:0 }}>
                  {showCpw ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </Field>

              {/* Match indicator */}
              {confirmPw.length > 0 && (
                <p style={{ fontSize:12, display:"flex", alignItems:"center", gap:5, marginTop:-8,
                  color: password === confirmPw ? C.green : C.rose }}>
                  {password === confirmPw
                    ? <><CheckCircle size={12}/> Passwords match!</>
                    : <><XCircle     size={12}/> Passwords do not match</>}
                </p>
              )}

              {/* Terms checkbox */}
              <div>
                <label style={{ display:"flex", alignItems:"flex-start",
                  gap:10, cursor:"pointer" }}>
                  <div
                    onClick={() => setAgreeTerms(p => !p)}
                    style={{
                      marginTop: 2, width: 20, height: 20, borderRadius: 6,
                      border: `2px solid ${fieldErr.terms ? C.rose : agreeTerms ? C.navy : C.gray[300]}`,
                      background: agreeTerms ? C.navy : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, cursor: "pointer", transition: "all .2s"
                    }}>
                    {agreeTerms && <Check size={12} style={{ color:"white" }}/>}
                  </div>
                  <span style={{ fontSize:14, lineHeight:1.55, color:C.gray[600] }}>
                    I agree to iKPACE's{" "}
                    <a href="/terms" style={{ color:C.navy, fontWeight:600 }}>Terms of Service</a>
                    {" "}and{" "}
                    <a href="/privacy" style={{ color:C.navy, fontWeight:600 }}>Privacy Policy</a>
                  </span>
                </label>
                {fieldErr.terms && (
                  <p style={{ marginTop:4, marginLeft:30, fontSize:12, color:C.rose }}>
                    {fieldErr.terms}
                  </p>
                )}
              </div>

              {/* Summary card */}
              <div style={{ borderRadius:16, padding:"12px 16px",
                background:`${C.navy}08`, border:`1px solid ${C.navy}15`,
                display:"flex", alignItems:"center", gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:12, flexShrink:0,
                  background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"white", fontWeight:900, fontSize:14 }}>
                  {fullName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || '?'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontWeight:700, fontSize:14, color:C.navy, margin:"0 0 2px",
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{fullName}</p>
                  <p style={{ fontSize:12, color:C.gray[500], margin:0,
                    overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{email}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{ background:"none", border:"none", cursor:"pointer",
                    fontSize:12, fontWeight:700, color:C.orange, flexShrink:0, fontFamily:"inherit" }}>
                  Edit
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "14px", borderRadius: 12, border: "none",
                  cursor: loading ? "wait" : "pointer",
                  fontWeight: 700, fontSize: 14, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  background: `linear-gradient(135deg,${C.navy},${C.orange})`,
                  boxShadow: `0 4px 20px ${C.navy}30`,
                  opacity: loading ? 0.75 : 1, fontFamily: "inherit", transition: "opacity .2s"
                }}>
                {loading ? (
                  <>
                    <div style={{ width:18, height:18, borderRadius:"50%",
                      border:"2px solid white", borderTopColor:"transparent",
                      animation:"spin .7s linear infinite" }}/>
                    Creating account…
                  </>
                ) : (
                  <><Rocket size={16}/> Create Account &amp; Start Learning</>
                )}
              </button>

              <p style={{ textAlign:"center", fontSize:12, color:C.gray[400] }}>
                🔒 Your data is encrypted and never shared with third parties.
              </p>
            </form>
          )}

        </section>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @media (max-width: 640px) {
          aside { flex: 0 0 100% !important; }
        }
      `}</style>
    </div>
  )
}
