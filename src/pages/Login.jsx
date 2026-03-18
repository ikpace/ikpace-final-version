// src/pages/Login.jsx
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import {
  Mail, Lock, AlertCircle, Eye, EyeOff,
  Shield, Sparkles, BookOpen, Users, Award, ChevronRight,
  Star, Clock, BadgeCheck, Heart, CheckCircle,
  Rocket, RefreshCw, Check
} from 'lucide-react'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:       '#1A3D7C',
  navyDark:   '#0F2655',
  navyMid:    '#2F5EA8',
  orange:     '#FF7A00',
  orangeLight:'#FF9A3C',
  green:      '#008F4C',
  yellow:     '#E6B800',
  rose:       '#E11D48',
  gray: {
    50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',
    300:'#CBD5E1',400:'#94A3B8',500:'#64748B',
    600:'#475569',700:'#334155',800:'#1E293B',900:'#0F172A'
  }
}

const ADMIN_EMAILS = [
  'newadmin@ikpace.com',
  'test@ikpace.com',
  'kendevdash@gmail.com',
  'testadmin@test.com',
]

// ─── iKPACE Brand Logo ────────────────────────────────────────────────────────
// SVG replica of your uploaded brand image:
// Navy rounded card · Orange graduation cap with tassel · White iKpace · Yellow LEARN SMARTER
// To use your actual image file instead:
//   1. Copy your logo to src/assets/ikpace-logo.png
//   2. import ikpaceLogo from '../assets/ikpace-logo.png'
//   3. Replace the SVG below with: <img src={ikpaceLogo} width={width} alt="iKPACE" style={{ height:'auto' }}/>
function IKPACELogo({ width = 100 }) {
  return (
    <svg
      width={width}
      height={Math.round(width * 1.22)}
      viewBox="0 0 200 244"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="iKPACE — Learn Smarter"
      role="img"
    >
      {/* Navy rounded background card */}
      <rect width="200" height="244" rx="22" fill={C.navyDark}/>

      {/* ── Graduation cap ─────────────────────────────────────────────── */}
      {/* Flat diamond board — top face of the mortarboard */}
      <polygon points="100,28  176,58  100,88  24,58" fill={C.orange}/>

      {/* Cap body / bowl hanging below the board */}
      <path
        d="M46,66 L46,107 Q46,136 100,145 Q154,136 154,107 L154,66
           Q128,79 100,79 Q72,79 46,66Z"
        fill={C.orange}
      />

      {/* Shadow fold on the cap rim */}
      <path
        d="M46,66 Q72,79 100,79 Q128,79 154,66
           Q128,90 100,91 Q72,90 46,66Z"
        fill={C.navyDark}
        opacity="0.30"
      />

      {/* Tassel — vertical string */}
      <line x1="176" y1="58" x2="176" y2="104" stroke={C.orange} strokeWidth="4.5" strokeLinecap="round"/>
      {/* Tassel — small horizontal bar */}
      <line x1="164" y1="104" x2="188" y2="104" stroke={C.orange} strokeWidth="3.5" strokeLinecap="round"/>
      {/* Tassel — round bob at bottom */}
      <circle cx="176" cy="116" r="7" fill={C.orange}/>

      {/* ── "iKpace" wordmark ─────────────────────────────────────────── */}
      <text
        x="100" y="182"
        textAnchor="middle"
        fontFamily="'Arial Black','Helvetica Neue',Arial,sans-serif"
        fontWeight="900"
        fontSize="46"
        fill="white"
        letterSpacing="-1"
      >iKpace</text>

      {/* ── "LEARN SMARTER" tagline ───────────────────────────────────── */}
      <text
        x="100" y="215"
        textAnchor="middle"
        fontFamily="'Arial','Helvetica Neue',Arial,sans-serif"
        fontWeight="700"
        fontSize="13"
        fill={C.yellow}
        letterSpacing="4.5"
      >LEARN SMARTER</text>
    </svg>
  )
}

// ─── Floating label input ─────────────────────────────────────────────────────
function FloatInput({ id, type='text', label, value, onChange,
  icon:Icon, rightSlot, error, autoComplete }) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0
  return (
    <div>
      <div className="relative">
        {/* Icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: error ? C.rose : focused ? C.orange : C.gray[400] }}>
          <Icon size={18}/>
        </div>
        {/* Input */}
        <input
          id={id} type={type} value={value} onChange={onChange}
          autoComplete={autoComplete}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" " required
          className="peer w-full pt-5 pb-2 pl-10 pr-11 rounded-2xl text-sm outline-none transition-all duration-200"
          style={{
            background: error ? `${C.rose}08` : focused ? `${C.navy}05` : C.gray[50],
            border: `2px solid ${error ? C.rose : focused ? C.orange : C.gray[200]}`,
            color: C.gray[800],
            boxShadow: focused ? `0 0 0 3px ${error ? C.rose : C.orange}18` : 'none'
          }}
        />
        {/* Floating label */}
        <label htmlFor={id}
          className="absolute left-10 transition-all duration-200 pointer-events-none select-none"
          style={{
            top:           active ? '6px' : '50%',
            transform:     active ? 'none' : 'translateY(-50%)',
            fontSize:      active ? '10px' : '13px',
            fontWeight:    active ? '600' : '400',
            color:         error ? C.rose : focused ? C.orange : C.gray[400],
            letterSpacing: active ? '0.04em' : '0',
            textTransform: active ? 'uppercase' : 'none'
          }}>
          {label}
        </label>
        {rightSlot && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 ml-1 text-xs flex items-center gap-1" style={{ color:C.rose }}>
          <AlertCircle size={11}/>{error}
        </p>
      )}
    </div>
  )
}

// ─── Stat pill ────────────────────────────────────────────────────────────────
function StatPill({ value, label }) {
  return (
    <div className="text-center px-3 py-2 rounded-2xl bg-white/10 backdrop-blur-sm">
      <p className="text-lg font-black text-white">{value}</p>
      <p className="text-[10px] text-white/60">{label}</p>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function Login() {
  const { signIn } = useAuth()
  const navigate   = useNavigate()
  const location   = useLocation()

  const from            = location.state?.from?.pathname || '/dashboard'
  const registrationMsg = location.state?.message || ''

  // Form state
  const [email,       setEmail]       = useState('')
  const [password,    setPassword]    = useState('')
  const [rememberMe,  setRememberMe]  = useState(false)
  const [showPw,      setShowPw]      = useState(false)

  // Feedback
  const [loading,     setLoading]     = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [error,       setError]       = useState('')
  const [fieldErrors, setFieldErrors] = useState({})
  const [attempts,    setAttempts]    = useState(0)
  const [cooldown,    setCooldown]    = useState(0)
  const cooldownRef = useRef(null)

  // Pre-fill remembered email
  useEffect(() => {
    const saved = localStorage.getItem('rememberedEmail')
    if (saved) { setEmail(saved); setRememberMe(true) }
  }, [])

  // Cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setTimeout(() => setCooldown(c => c - 1), 1000)
    }
    return () => clearTimeout(cooldownRef.current)
  }, [cooldown])

  // Clear errors on input change
  useEffect(() => { setError(''); setFieldErrors({}) }, [email, password])

  // ── Validation ─────────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {}
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email    = 'Please enter a valid email address'
    if (password.length < 6)
      errs.password = 'Password must be at least 6 characters'
    setFieldErrors(errs)
    return Object.keys(errs).length === 0
  }

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (cooldown > 0 || !validate()) return

    setLoading(true)
    setError('')

    try {
      // 1. Sign in via AuthContext
      const user = await signIn(email.trim().toLowerCase(), password.trim())
      if (!user?.id) throw new Error('Login succeeded but user data is missing. Please try again.')

      // 2. Remember email
      if (rememberMe) localStorage.setItem('rememberedEmail', email.trim())
      else            localStorage.removeItem('rememberedEmail')

      // 3. Admin fast-path
      if (ADMIN_EMAILS.includes(user.email)) {
        await supabase.from('profiles').upsert(
          { id: user.id, email: user.email, role: 'admin' },
          { onConflict: 'id' }
        )
        setSuccess(true)
        setTimeout(() => navigate('/teacher', { replace: true }), 1600)
        return
      }

      // 4. Fetch role from profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .maybeSingle()

      const role = profile?.role || 'student'

      // 5. Create profile row if missing (old users)
      if (!profile) {
        await supabase.from('profiles').insert([{
          id:    user.id,
          email: user.email,
          role:  'student'
        }])
      }

      // 6. Redirect
      setSuccess(true)
      const dest = (role === 'admin' || role === 'instructor')
        ? '/teacher'
        : (from !== '/' ? from : '/dashboard')
      setTimeout(() => navigate(dest, { replace: true }), 1600)

    } catch (err) {
      console.error('Login error:', err)
      setAttempts(a => a + 1)

      const msg = err?.message || ''
      if (msg.includes('Invalid login') || msg.includes('invalid_credentials') || msg.includes('Invalid email or password'))
        setError('Incorrect email or password. Please check and try again.')
      else if (msg.includes('Email not confirmed'))
        setError('Please verify your email before signing in. Check your inbox.')
      else if (msg.includes('Too many requests'))
        setError('Too many attempts. Please wait a moment before trying again.')
      else
        setError(msg || 'Sign in failed. Please try again.')

      // Progressive cooldown: 3+ failures
      if (attempts >= 2) setCooldown(Math.min(30, (attempts - 1) * 10))
    } finally {
      setLoading(false)
    }
  }

  // ── Success screen ─────────────────────────────────────────────────────────
  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy} 55%,${C.navyMid})` }}>
      <div className="text-center">
        <div className="flex justify-center mb-5">
          <IKPACELogo width={80}/>
        </div>
        <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background:`${C.green}25`, border:`3px solid ${C.green}`, animation:'_lgPop .4s ease' }}>
          <CheckCircle size={38} style={{ color:C.green }}/>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Welcome back! 👋</h2>
        <p className="text-white/60 text-sm">Taking you to your dashboard…</p>
        <div className="mt-7 w-48 mx-auto h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.15)' }}>
          <div className="h-full rounded-full" style={{ background:C.orange, animation:'_lgGrow 1.6s linear forwards' }}/>
        </div>
      </div>
      <style>{`
        @keyframes _lgPop  { 0%{transform:scale(.5);opacity:0} 70%{transform:scale(1.1)} 100%{transform:scale(1);opacity:1} }
        @keyframes _lgGrow { from{width:0} to{width:100%} }
      `}</style>
    </div>
  )

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4"
      style={{ background:`linear-gradient(150deg,${C.gray[50]} 0%,${C.gray[100]} 100%)` }}>

      <div className="w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row bg-white">

        {/* ══ LEFT PANEL — brand ════════════════════════════════════════════ */}
        <aside className="lg:w-5/12 relative overflow-hidden p-7 lg:p-10 flex flex-col"
          style={{ background:`linear-gradient(160deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>

          {/* Blobs */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.07]" style={{ background:C.orange }}/>
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-[0.07]" style={{ background:C.yellow }}/>
          <div className="absolute top-1/2 right-8 w-24 h-24 rounded-full opacity-[0.04]" style={{ background:'#fff' }}/>

          {/* ── iKPACE Logo ── */}
          <Link to="/" className="relative inline-flex mb-8 justify-start">
            <IKPACELogo width={100}/>
          </Link>

          <div className="relative flex-1 flex flex-col">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-semibold mb-5 self-start">
              <span style={{ fontSize:'13px' }}>✨</span> Welcome back, learner!
            </div>

            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
              Continue Your<br/>
              <span style={{ color:C.orangeLight }}>Learning</span><br/>
              Journey
            </h1>
            <p className="text-white/65 text-sm leading-relaxed mb-7">
              Pick up right where you left off. Your progress, certificates, and community are waiting.
            </p>

            {/* Stats */}
            <div className="flex gap-2 mb-7 flex-wrap">
              <StatPill value="130+"  label="Students"/>
              <StatPill value="6"     label="Courses"/>
              <StatPill value="94%"   label="Success"/>
            </div>

            {/* Benefit grid */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon:BookOpen, label:'Expert Courses', sub:'Industry-led'  },
                { icon:Users,    label:'Community',      sub:'130+ learners' },
                { icon:Award,    label:'Certificates',   sub:'Recognised'    },
                { icon:Clock,    label:'Self-Paced',     sub:'Learn anytime' },
              ].map(({ icon:Icon, label, sub }) => (
                <div key={label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 hover:bg-white/15 transition-all">
                  <Icon size={16} className="mb-1.5" style={{ color:C.orangeLight }}/>
                  <p className="text-white font-bold text-xs">{label}</p>
                  <p className="text-white/50 text-[10px]">{sub}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-auto">
              <div className="flex gap-0.5 mb-2.5">
                {[...Array(5)].map((_,i)=><Star key={i} size={12} className="fill-current" style={{ color:C.yellow }}/>)}
              </div>
              <p className="text-white/85 text-xs italic leading-relaxed mb-3">
                "iKPACE transformed my career. The structured path and community support made all the difference."
              </p>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  SA
                </div>
                <div>
                  <p className="text-white font-semibold text-xs">Sarah Adebayo</p>
                  <p className="text-white/50 text-[10px]">VA Professional · Ghana</p>
                </div>
              </div>
            </div>

            {/* Trust */}
            <div className="mt-5 flex items-center gap-4 text-white/55 text-xs">
              <span className="flex items-center gap-1"><Shield size={12}/> Secure</span>
              <span className="flex items-center gap-1"><BadgeCheck size={12}/> Encrypted</span>
              <span className="flex items-center gap-1"><Heart size={12}/> Trusted</span>
            </div>
          </div>
        </aside>

        {/* ══ RIGHT PANEL — form ════════════════════════════════════════════ */}
        <section className="lg:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">

            {/* Mobile-only logo */}
            <div className="flex justify-center mb-6 lg:hidden">
              <IKPACELogo width={80}/>
            </div>

            {/* Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-black mb-1" style={{ color:C.navy }}>Sign in to iKPACE</h2>
              <p className="text-sm" style={{ color:C.gray[500] }}>
                New here?{' '}
                <Link to="/register" className="font-bold hover:underline" style={{ color:C.orange }}>
                  Create a free account <ChevronRight size={13} className="inline"/>
                </Link>
              </p>
            </div>

            {/* Registration success banner */}
            {registrationMsg && (
              <div className="mb-5 p-4 rounded-2xl flex items-start gap-3"
                style={{ background:`${C.green}10`, border:`1px solid ${C.green}30` }}>
                <CheckCircle size={18} style={{ color:C.green, flexShrink:0 }}/>
                <p className="text-sm" style={{ color:C.green }}>{registrationMsg}</p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mb-5 p-4 rounded-2xl flex items-start gap-3"
                style={{ background:`${C.rose}10`, border:`1px solid ${C.rose}25` }}
                role="alert">
                <AlertCircle size={18} style={{ color:C.rose, flexShrink:0, marginTop:1 }}/>
                <div>
                  <p className="text-sm font-bold" style={{ color:C.rose }}>Sign in failed</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color:C.rose }}>{error}</p>
                </div>
              </div>
            )}

            {/* Cooldown */}
            {cooldown > 0 && (
              <div className="mb-5 p-3 rounded-2xl flex items-center gap-3"
                style={{ background:`${C.yellow}15`, border:`1px solid ${C.yellow}40` }}>
                <RefreshCw size={14} style={{ color:C.yellow }}/>
                <p className="text-xs font-semibold" style={{ color:C.gray[700] }}>
                  Too many attempts — wait <strong>{cooldown}s</strong> before trying again.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              <FloatInput
                id="email" type="email" label="Email Address"
                value={email} onChange={e => setEmail(e.target.value)}
                icon={Mail} error={fieldErrors.email} autoComplete="email"
              />

              <FloatInput
                id="password" type={showPw ? 'text' : 'password'} label="Password"
                value={password} onChange={e => setPassword(e.target.value)}
                icon={Lock} error={fieldErrors.password} autoComplete="current-password"
                rightSlot={
                  <button type="button" onClick={() => setShowPw(p => !p)}
                    style={{ color:C.gray[400] }}>
                    {showPw ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                }
              />

              {/* Remember me + Forgot */}
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <div onClick={() => setRememberMe(p => !p)}
                    className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                    style={{
                      borderColor: rememberMe ? C.navy : C.gray[300],
                      background:  rememberMe ? C.navy : 'transparent'
                    }}>
                    {rememberMe && <Check size={12} className="text-white"/>}
                  </div>
                  <span className="text-sm select-none" style={{ color:C.gray[600] }}>Remember me</span>
                </label>
                <Link to="/forgot-password"
                  className="text-sm font-semibold hover:underline" style={{ color:C.navy }}>
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button type="submit"
                disabled={loading || cooldown > 0}
                className="w-full py-4 rounded-2xl font-bold text-sm text-white flex items-center justify-center gap-2.5 transition-all active:scale-95 disabled:opacity-60"
                style={{
                  background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                  boxShadow:`0 6px 24px ${C.navy}35`,
                  cursor:(loading||cooldown>0)?'not-allowed':'pointer'
                }}>
                {loading
                  ? <><div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"/>Signing you in…</>
                  : cooldown > 0
                    ? <><RefreshCw size={16}/> Wait {cooldown}s</>
                    : <><Rocket size={16}/> Sign In to iKPACE</>
                }
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor:C.gray[200] }}/>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 text-xs font-medium bg-white" style={{ color:C.gray[400] }}>or continue with</span>
              </div>
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {[
                { label:'Google',   icon:'🌐' },
                { label:'LinkedIn', icon:'💼' },
              ].map(s => (
                <button key={s.label}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-all hover:shadow-md active:scale-95"
                  style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[700] }}
                  onClick={() => console.log(`Social: ${s.label}`)}>
                  <span>{s.icon}</span>{s.label}
                </button>
              ))}
            </div>

            {/* Trust row */}
            <div className="rounded-2xl p-4" style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { icon:Shield, label:'Secure Login'  },
                  { icon:Users,  label:'130+ Students' },
                  { icon:Award,  label:'Certified'     },
                ].map(({ icon:Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}10` }}>
                      <Icon size={14} style={{ color:C.navy }}/>
                    </div>
                    <span className="text-[10px] font-medium" style={{ color:C.gray[500] }}>{label}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs" style={{ color:C.gray[400] }}>
                <span className="font-bold" style={{ color:C.navy }}>94%</span> of our students complete their courses
              </p>
            </div>

            {/* Perks */}
            <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1">
              {['No hidden fees','Cancel anytime','Lifetime access'].map(t => (
                <span key={t} className="flex items-center gap-1 text-[11px]" style={{ color:C.gray[400] }}>
                  <CheckCircle size={10} style={{ color:C.green }}/>{t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
