// src/pages/Checkout.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Lock, Shield, CheckCircle, Award, ChevronRight,
  Clock, Users, Star, Mail, Phone, User, CreditCard,
  Smartphone, Building, BadgeCheck, BookOpen, ArrowLeft,
  Gift, Sparkles, Download, Globe, Heart, MessageCircle,
  Copy, Check, AlertCircle, ShoppingBag, Zap, Rocket,
  PlayCircle, RefreshCw, X, ChevronDown, ChevronUp,
  Brain, Palette, Megaphone, Briefcase, Code
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:     '#1A3D7C', navyDark:'#0F2655', navyMid:'#2F5EA8',
  orange:   '#FF7A00', orangeL:'#FF9A3C',
  green:    '#008F4C', yellow:'#E6B800', teal:'#0D9488',
  purple:   '#7C3AED', rose:'#E11D48', amber:'#D97706',
  gray:{ 50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',300:'#CBD5E1',
         400:'#94A3B8',500:'#64748B',600:'#475569',700:'#334155',800:'#1E293B' }
}

// ─── Course data with curated images ─────────────────────────────────────────
const COURSE_DATA = {
  'virtual-assistant-pro': {
    title:'Virtual Assistant Professional',
    description:'Master client management, email, calendars & remote work tools. Land your first VA client in 8 weeks.',
    duration:'8 Weeks', students:32, rating:4.9, level:'Beginner', instructor:'Amara Osei',
    category:'Career', emoji:'💼', color:C.navy,
    gradient:`linear-gradient(135deg,${C.navyDark},${C.navyMid})`,
    image:'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&auto=format&fit=crop&q=80',
    features:['Client Management','Email Mastery','Calendar Scheduling','Remote Work Tools','Client Acquisition'],
    outcomes:['Land your first VA client in 8 weeks','Build a professional portfolio','Work remotely for international clients'],
    lessons:24, projects:3,
  },
  'social-media-marketing': {
    title:'Social Media Marketing',
    description:'Build brands, run Meta Ads, master analytics & grow any social account organically from scratch.',
    duration:'8 Weeks', students:28, rating:4.8, level:'Beginner', instructor:'Kofi Asante',
    category:'Marketing', emoji:'📱', color:C.orange,
    gradient:`linear-gradient(135deg,${C.orange},${C.amber})`,
    image:'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&auto=format&fit=crop&q=80',
    features:['Meta Ads Manager','Content Strategy','Analytics & Reporting','Community Management','Hashtag Strategy'],
    outcomes:['Run profitable ad campaigns','Grow brands organically','Land social media clients'],
    lessons:28, projects:4,
  },
  'canva-graphic-design': {
    title:'Canva & Graphic Design',
    description:'Design logos, brand identities, social kits & print materials. Build a portfolio of 10+ projects.',
    duration:'8 Weeks', students:19, rating:4.7, level:'Beginner', instructor:'Esi Darkwah',
    category:'Design', emoji:'🎨', color:C.green,
    gradient:`linear-gradient(135deg,${C.green},${C.teal})`,
    image:'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&auto=format&fit=crop&q=80',
    features:['Logo Design','Brand Identity','Social Media Kits','Presentation Design','Colour Theory'],
    outcomes:['Design a full brand from scratch','Offer design services as freelancer','Build a design portfolio'],
    lessons:20, projects:5,
  },
  'smart-kids-coding': {
    title:'Smart Kids Coding',
    description:'Introduce ages 6–12 to coding through Scratch. Build animations, stories, and games.',
    duration:'4 Weeks', students:12, rating:4.9, level:'Beginner', instructor:'Ms. Akosua',
    category:'Kids', emoji:'🚀', color:C.purple,
    gradient:`linear-gradient(135deg,${C.purple},#9B59B6)`,
    image:'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    features:['Scratch Programming','Game Design','Animation','Logic Building','Creative Storytelling'],
    outcomes:['Build their first video game','Create animated stories','Develop coding confidence'],
    lessons:16, projects:4,
  },
  'freelancing-online-income': {
    title:'Freelancing & Online Income',
    description:'Set up Upwork/Fiverr profiles, find clients, price your services & build recurring income.',
    duration:'4 Weeks', students:21, rating:4.8, level:'Beginner', instructor:'Yaa Asantewaa',
    category:'Business', emoji:'💰', color:C.amber,
    gradient:`linear-gradient(135deg,${C.amber},${C.yellow})`,
    image:'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=80',
    features:['Upwork & Fiverr Setup','Client Acquisition','Pricing Strategy','Portfolio Building','Contracts'],
    outcomes:['Land first client in 30 days','Set profitable rates','Build recurring income'],
    lessons:22, projects:3,
  },
  'ai-prompt-engineering': {
    title:'AI Prompt Engineering',
    description:'Master ChatGPT, Claude, Midjourney & AI automation. Monetise your AI expertise in 8 weeks.',
    duration:'8 Weeks', students:18, rating:5.0, level:'Intermediate', instructor:'Nana Addo',
    category:'Tech', emoji:'🤖', color:'#06B6D4',
    gradient:`linear-gradient(135deg,#06B6D4,${C.purple})`,
    image:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=80',
    features:['ChatGPT & Claude','Midjourney / DALL-E','AI Automation','Prompt Frameworks','Sell AI Services'],
    outcomes:['Write expert-level prompts','Automate business tasks','Sell AI services to clients'],
    lessons:24, projects:4,
  },
}

// ─── Price constants ──────────────────────────────────────────────────────────
const FIXED_PRICE_USD = 7   // Base price in USD — all courses cost $7

const RELATED = [
  { id:'virtual-assistant-pro',     emoji:'💼', title:'Virtual Assistant Pro',      duration:'8 Weeks' },
  { id:'social-media-marketing',    emoji:'📱', title:'Social Media Marketing',     duration:'8 Weeks' },
  { id:'canva-graphic-design',      emoji:'🎨', title:'Canva & Graphic Design',     duration:'8 Weeks' },
  { id:'freelancing-online-income', emoji:'💰', title:'Freelancing & Online Income',duration:'4 Weeks' },
  { id:'smart-kids-coding',         emoji:'🚀', title:'Smart Kids Coding',          duration:'4 Weeks' },
  { id:'ai-prompt-engineering',     emoji:'🤖', title:'AI Prompt Engineering',      duration:'8 Weeks' },
]

const TESTIMONIALS = [
  { name:'Sarah Mensah',  role:'VA Graduate',      text:'The course exceeded my expectations. I started freelancing within weeks of finishing!', rating:5, init:'SM', color:C.navy   },
  { name:'Kwame Asante',  role:'Current Student',  text:'Excellent content and great instructor support. The assignments are very practical.',   rating:5, init:'KA', color:C.orange },
  { name:'Abena Osei',    role:'Canva Graduate',   text:'Worth every cedi. The practical skills I gained are immediately applicable.',          rating:5, init:'AO', color:C.green  },
]

// ─── Format USD price ─────────────────────────────────────────────────────────
const fmtUSD = (p) => `$${p.toFixed(2)}`

// ─── Currency conversion hook ─────────────────────────────────────────────────
// Uses TIMEZONE (reliable) to detect country → currency, then fetches live rates
function useCurrencyConversion(usdAmount) {
  const [localAmount,   setLocalAmount]   = useState(null)
  const [localCurrency, setLocalCurrency] = useState(null)
  const [rateStatus,    setRateStatus]    = useState('loading') // 'loading'|'ready'|'error'

  useEffect(() => {
    // ── Step 1: Detect currency via TIMEZONE (far more reliable than navigator.language) ──
    // navigator.language often returns 'en-US' even for Ghana/Nigeria users
    const detectCurrencyByTimezone = () => {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''

      // Timezone → currency map (covers Africa + major global zones)
      const tzMap = {
        // 🌍 Africa
        'Africa/Accra':        'GHS', // Ghana
        'Africa/Lagos':        'NGN', // Nigeria
        'Africa/Nairobi':      'KES', // Kenya
        'Africa/Johannesburg': 'ZAR', // South Africa
        'Africa/Kampala':      'UGX', // Uganda
        'Africa/Dar_es_Salaam':'TZS', // Tanzania
        'Africa/Kigali':       'RWF', // Rwanda
        'Africa/Addis_Ababa':  'ETB', // Ethiopia
        'Africa/Dakar':        'XOF', // Senegal
        'Africa/Abidjan':      'XOF', // Côte d'Ivoire
        'Africa/Douala':       'XAF', // Cameroon
        'Africa/Cairo':        'EGP', // Egypt
        'Africa/Casablanca':   'MAD', // Morocco
        'Africa/Tunis':        'TND', // Tunisia
        'Africa/Luanda':       'AOA', // Angola
        'Africa/Harare':       'ZWL', // Zimbabwe
        'Africa/Lusaka':       'ZMW', // Zambia
        'Africa/Nairobi':      'KES', // Kenya (duplicate intentional)
        'Africa/Maputo':       'MZN', // Mozambique
        'Africa/Banjul':       'GMD', // Gambia
        'Africa/Freetown':     'SLL', // Sierra Leone
        'Africa/Conakry':      'GNF', // Guinea
        'Africa/Bamako':       'XOF', // Mali
        // 🌍 Middle East
        'Asia/Dubai':          'AED',
        'Asia/Riyadh':         'SAR',
        'Asia/Kuwait':         'KWD',
        'Asia/Qatar':          'QAR',
        // 🌏 Asia
        'Asia/Kolkata':        'INR',
        'Asia/Shanghai':       'CNY',
        'Asia/Tokyo':          'JPY',
        'Asia/Singapore':      'SGD',
        'Asia/Karachi':        'PKR',
        // 🌍 Europe
        'Europe/London':       'GBP',
        'Europe/Paris':        'EUR',
        'Europe/Berlin':       'EUR',
        'Europe/Amsterdam':    'EUR',
        'Europe/Madrid':       'EUR',
        'Europe/Rome':         'EUR',
        // 🌎 Americas
        'America/New_York':    'USD',
        'America/Chicago':     'USD',
        'America/Los_Angeles': 'USD',
        'America/Toronto':     'CAD',
        'America/Vancouver':   'CAD',
        'America/Sao_Paulo':   'BRL',
        // 🌏 Oceania
        'Australia/Sydney':    'AUD',
        'Pacific/Auckland':    'NZD',
      }

      // Direct match
      if (tzMap[tz]) return tzMap[tz]

      // Partial match (e.g. 'Africa/Accra' matches 'Africa/')
      const prefix = tz.split('/')[0]
      if (prefix === 'Africa') return 'GHS' // default African timezone to GHS
      if (prefix === 'Europe') return 'EUR'
      if (prefix === 'America') return 'USD'
      if (prefix === 'Australia') return 'AUD'
      if (prefix === 'Asia') return 'INR'

      // Final fallback: try navigator.language country code
      try {
        const locale = navigator.language || 'en-US'
        const langMap = {
          'gh':'GHS','ng':'NGN','ke':'KES','za':'ZAR','ug':'UGX','tz':'TZS',
          'gb':'GBP','de':'EUR','fr':'EUR','us':'USD','ca':'CAD','au':'AUD',
          'in':'INR','ae':'AED','sa':'SAR','eg':'EGP','sn':'XOF','cm':'XAF',
        }
        const cc = locale.split('-')[1]?.toLowerCase() || ''
        return langMap[cc] || 'GHS' // default to GHS (main target market)
      } catch { return 'GHS' }
    }

    // ── Step 2: Fetch live rate and convert ────────────────────────────────────
    const fetchAndConvert = async () => {
      const currency = detectCurrencyByTimezone()
      setLocalCurrency(currency)

      try {
        const res  = await fetch('https://api.exchangerate-api.com/v4/latest/USD')
        if (!res.ok) throw new Error('Rate fetch failed')
        const data = await res.json()
        const rate = data.rates?.[currency]
        if (!rate) throw new Error(`No rate for ${currency}`)
        setLocalAmount(parseFloat((usdAmount * rate).toFixed(2)))
        setRateStatus('ready')
      } catch (err) {
        console.warn('Currency conversion failed:', err.message)
        // Fallback: show known approximate GHS rate so user always sees a local price
        const fallbackRates = { GHS:12.5, NGN:1500, KES:130, ZAR:18, UGX:3700, TZS:2600,
                                 GBP:0.79, EUR:0.92, INR:83, AED:3.67, CAD:1.36, AUD:1.52 }
        const fallbackRate = fallbackRates[currency]
        if (fallbackRate) {
          setLocalAmount(parseFloat((usdAmount * fallbackRate).toFixed(2)))
          setRateStatus('fallback') // mark as estimate
        } else {
          setRateStatus('error')
        }
      }
    }

    fetchAndConvert()
  }, [usdAmount])

  return { localAmount, localCurrency, rateStatus }
}

// ─── Input component ──────────────────────────────────────────────────────────
function FormInput({ label, req, icon:Icon, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold mb-1.5" style={{ color:C.gray[600] }}>
        {label}{req && <span className="ml-0.5" style={{ color:C.rose }}>*</span>}
      </label>
      <div className="relative">
        {Icon && <div className="absolute left-3 top-1/2 -translate-y-1/2"><Icon size={15} style={{ color:C.gray[400] }}/></div>}
        {children}
      </div>
      {error && <p className="mt-1 text-[11px] flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={10}/>{error}</p>}
    </div>
  )
}

function Input({ icon, ...props }) {
  const [focused, setFocused] = useState(false)
  return (
    <FormInput label={props.label} req={props.req} icon={icon} error={props.error}>
      <input {...props} label={undefined} req={undefined} error={undefined}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        className={`w-full ${icon?'pl-9':'pl-3'} pr-4 py-3 rounded-xl text-base outline-none transition-all`}
        style={{ background:C.gray[50], border:`2px solid ${focused?C.navy:C.gray[200]}`, color:C.gray[800] }}/>
    </FormInput>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function Checkout() {
  const { courseId } = useParams()
  const navigate     = useNavigate()
  const { user }     = useAuth()

  const [loading,       setLoading]       = useState(true)
  const [course,        setCourse]        = useState(null)
  const [copied,        setCopied]        = useState(false)
  const [promoCode,     setPromoCode]     = useState('')
  const [promoApplied,  setPromoApplied]  = useState(false)
  const [promoError,    setPromoError]    = useState('')
  const [discount,      setDiscount]      = useState(0)
  const [openFaq,       setOpenFaq]       = useState(null)
  const [formErrors,    setFormErrors]    = useState({})
  const [formData, setFormData] = useState({
    fullName:      user?.user_metadata?.full_name || '',
    email:         user?.email || '',
    phone:         '',
    country:       'Ghana',
    paymentMethod: 'mobile_money',
  })

  useEffect(() => {
    const cd = COURSE_DATA[courseId]
    if (cd) {
      setCourse({ ...cd, id:courseId, price:FIXED_PRICE_USD })
    } else {
      navigate('/courses')
    }
    setLoading(false)
  }, [courseId, navigate])

  // ── USD total after discount ───────────────────────────────────────────────
  const totalUSD = () => {
    const sub = FIXED_PRICE_USD
    return parseFloat((sub - sub * discount).toFixed(2))
  }

  // ── Live currency conversion (auto-detects user's local currency) ──────────
  const { localAmount, localCurrency, rateStatus } = useCurrencyConversion(totalUSD())

  // Format local currency using Intl if available
  const fmtLocal = (amount, currency) => {
    if (!amount || !currency) return null
    try {
      return new Intl.NumberFormat(navigator.language || 'en', {
        style:    'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount)
    } catch {
      return `${currency} ${amount.toFixed(2)}`
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]:value }))
    setFormErrors(p => ({ ...p, [name]:'' }))
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText('WELCOME10')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleApplyPromo = () => {
    setPromoError('')
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setDiscount(0.1); setPromoApplied(true)
    } else {
      setPromoError('Invalid promo code. Try WELCOME10')
    }
  }

  const validateForm = () => {
    const errs = {}
    if (!formData.fullName.trim())  errs.fullName = 'Full name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Enter a valid email'
    if (!formData.phone.trim() || formData.phone.trim().length < 9) errs.phone = 'Enter a valid phone number'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleCheckout = () => {
    if (!validateForm()) return
    if (!window.PaystackPop) { alert('Payment system not loaded. Please refresh.'); return }

    // Paystack processes in GHS. Use the live-converted GHS amount if available,
    // otherwise fall back to a fixed USD→GHS estimate.
    const ghsRate   = (localCurrency === 'GHS' && localAmount && (rateStatus === 'ready' || rateStatus === 'fallback'))
      ? (localAmount / totalUSD())    // exact live or fallback rate
      : 12.5                          // safe fallback (approx USD→GHS)
    const amountGHS = Math.round(totalUSD() * ghsRate * 100) // Paystack uses pesewas

    const handler = window.PaystackPop.setup({
      key:      import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email:    formData.email,
      amount:   amountGHS,
      currency: 'GHS',
      callback: (response) => savePayment(response),
      onClose:  () => console.log('Payment popup closed'),
    })
    handler.openIframe()
  }

  const savePayment = async (response) => {
    if (!user) { navigate('/login'); return }
    try {
      await supabase.from('payments').insert([{
        user_id: user.id, user_email: formData.email, full_name: formData.fullName,
        phone: formData.phone, course_id: course.id, course_title: course.title,
        amount: totalUSD(), discount: discount * 100, promo_code: promoApplied ? promoCode : null,
        reference: response.reference, status: 'success',
        payment_method: formData.paymentMethod, currency: 'USD',
        created_at: new Date().toISOString(),
      }])
      await supabase.from('enrollments').insert([{
        user_id: user.id, course_id: course.id, user_email: formData.email,
        user_name: formData.fullName, amount: totalUSD(),
        payment_reference: response.reference, status: 'active',
        enrolled_at: new Date().toISOString(), progress_percentage: 0,
      }])
      navigate('/payment-success', { state: { course, userDetails:formData, amount:totalUSD(), enrollmentId:response.reference } })
    } catch(e) {
      console.error(e)
      alert('Payment saved but enrollment error. Reference: ' + response.reference)
    }
  }

  const faqs = [
    { q:'When do I get access after payment?',           a:'Immediately after your Paystack payment is confirmed — usually within seconds. You will be redirected to your dashboard to start learning.' },
    { q:'What payment methods are accepted?',             a:'We accept all major payment methods via Paystack: MTN MoMo, Vodafone Cash, AirtelTigo, Visa, Mastercard, and bank transfer.' },
    { q:'Is my payment information secure?',              a:'Yes. All payments are processed by Paystack, which is PCI DSS Level 1 compliant — the highest level of payment security available.' },
    { q:'Do I get a certificate when I finish?',          a:'Yes! You will receive a recognised iKPACE certificate when you complete all lessons and submit your final assignment.' },
    { q:'Can I study at my own pace?',                    a:'Absolutely. All courses are fully self-paced. Once enrolled, you can learn on your schedule — pause, rewind, and revisit any lesson as many times as you need.' },
    { q:'What if I have questions during the course?',   a:'Our student support team and community forum are available to help. You can post questions in the discussion board or contact our support team directly.' },
  ]

  const relatedCourses = RELATED.filter(r => r.id !== courseId).slice(0, 3)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:C.gray[50] }}>
      <div className="text-center px-4 w-full max-w-xs mx-auto">
        <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white font-black animate-pulse"
          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
        <div className="w-full max-w-[200px] h-1.5 rounded-full overflow-hidden mx-auto" style={{ background:C.gray[200] }}>
          <div className="h-full rounded-full animate-pulse" style={{ width:'70%', background:`linear-gradient(90deg,${C.navy},${C.orange})` }}/>
        </div>
        <p className="mt-3 text-sm" style={{ color:C.gray[400] }}>Loading checkout…</p>
      </div>
    </div>
  )

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background:C.gray[50] }}>
      <div className="text-center p-6 w-full max-w-sm mx-auto">
        <BookOpen size={48} className="mx-auto mb-4" style={{ color:C.gray[300] }}/>
        <h2 className="font-black text-lg mb-2" style={{ color:C.navy }}>Course Not Found</h2>
        <Link to="/courses" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white mt-4"
          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
          <BookOpen size={14}/> Browse Courses
        </Link>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background:C.gray[50] }}>

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <div className="py-2.5 text-white text-center text-xs font-semibold px-2"
        style={{ background:`linear-gradient(90deg,${C.navyDark},${C.navyMid},${C.navy})` }}>
        <span className="flex items-center justify-center gap-2 flex-wrap">
          <span className="flex items-center gap-1 whitespace-nowrap"><Shield size={12}/> Paystack</span>
          <span className="hidden xs:inline text-white/30">|</span>
          <span className="flex items-center gap-1 whitespace-nowrap"><Lock size={12}/> SSL</span>
          <span className="hidden xs:inline text-white/30">|</span>
          <span className="flex items-center gap-1 whitespace-nowrap"><BadgeCheck size={12}/> 130+ Students</span>
        </span>
      </div>

      {/* ── CHECKOUT HEADER ───────────────────────────────────────────────── */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10" style={{ borderColor:C.gray[200] }}>
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Back */}
            <Link to={`/course/${courseId}`}
              className="flex items-center gap-1 text-sm font-semibold hover:opacity-70 transition-opacity flex-shrink-0"
              style={{ color:C.gray[500] }}>
              <ArrowLeft size={16}/> 
              <span className="hidden xs:inline">Back</span>
            </Link>

            {/* Step breadcrumb - simplified for mobile */}
            <div className="flex items-center gap-1 text-xs font-semibold overflow-x-auto pb-1 max-w-[60%] sm:max-w-none">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] flex-shrink-0"
                style={{ background:C.green }}><Check size={11}/></span>
              <span className="hidden sm:inline flex-shrink-0" style={{ color:C.green }}>Course</span>
              <ChevronRight size={12} style={{ color:C.gray[300] }} className="flex-shrink-0"/>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                style={{ background:C.orange }}>2</span>
              <span className="hidden sm:inline flex-shrink-0" style={{ color:C.navy }}>Details</span>
              <ChevronRight size={12} style={{ color:C.gray[300] }} className="flex-shrink-0 hidden sm:block"/>
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black flex-shrink-0 sm:flex"
                style={{ background:C.gray[200], color:C.gray[400] }}>3</span>
              <span className="hidden sm:inline flex-shrink-0" style={{ color:C.gray[400] }}>Payment</span>
            </div>

            {/* Paystack secure badge */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Shield size={14} style={{ color:C.green }}/>
              <span className="text-xs font-semibold hidden sm:inline" style={{ color:C.gray[500] }}>Secure</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 lg:py-10">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-9">

          {/* ══ LEFT COLUMN ═══════════════════════════════════════════════ */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            {/* ── COURSE PREVIEW CARD ───────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              {/* Course image banner */}
              <div className="relative h-40 xs:h-48 sm:h-56 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{ background:`${course.gradient.replace('linear-gradient','linear-gradient').split(',')[0]}, transparent)`.replace('(135deg', '(180deg') || `${course.color}88`}}/>
                <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.1) 50%,transparent 100%)' }}/>
                {/* Overlaid info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 text-white">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2 flex-wrap">
                    <span className="text-xl sm:text-2xl">{course.emoji}</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-black bg-white/20 border border-white/20">{course.category}</span>
                    <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full font-black bg-white/20 border border-white/20">{course.level}</span>
                  </div>
                  <h2 className="font-black text-base sm:text-xl lg:text-2xl leading-tight pr-4">{course.title}</h2>
                </div>
              </div>

              {/* Course meta */}
              <div className="p-4 sm:p-5">
                <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4" style={{ color:C.gray[500] }}>{course.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {[
                    { icon:Clock,  value:course.duration,             label:'Duration'   },
                    { icon:Users,  value:`${course.students}+`,label:'Students' },
                    { icon:Star,   value:`${course.rating}`,    label:'Rating'    },
                    { icon:PlayCircle, value:`${course.lessons}`, label:'Lessons'},
                  ].map((s,i) => (
                    <div key={i} className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-xl text-[10px] sm:text-xs font-semibold"
                      style={{ background:`${course.color}10`, color:course.color }}>
                      <s.icon size={10} className="sm:w-3 sm:h-3"/>{s.value}
                    </div>
                  ))}
                </div>

                {/* Feature chips */}
                <div className="flex flex-wrap gap-1 sm:gap-1.5">
                  {course.features.map((f,i) => (
                    <span key={i} className="flex items-center gap-1 text-[10px] sm:text-[11px] px-2 py-1 rounded-full font-semibold"
                      style={{ background:C.gray[100], color:C.gray[600] }}>
                      <CheckCircle size={8} className="sm:w-2 sm:h-2" style={{ color:C.green }}/>{f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* ── STUDENT INFORMATION FORM ──────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h2 className="font-black text-base sm:text-lg mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}15` }}>
                  <User size={14} className="sm:w-4 sm:h-4" style={{ color:C.navy }}/>
                </div>
                Your Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Full name */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold mb-1" style={{ color:C.gray[600] }}>
                    Full Name <span style={{ color:C.rose }}>*</span>
                  </label>
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}/>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                      placeholder="Amara Asante"
                      className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base outline-none transition-all"
                      style={{ background:C.gray[50], border:`2px solid ${formErrors.fullName?C.rose:C.gray[200]}`, color:C.gray[800] }}
                      onFocus={e=>e.target.style.borderColor=C.navy}
                      onBlur={e=>e.target.style.borderColor=formErrors.fullName?C.rose:C.gray[200]}/>
                  </div>
                  {formErrors.fullName && <p className="mt-1 text-[10px] flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={8}/>{formErrors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold mb-1" style={{ color:C.gray[600] }}>
                    Email Address <span style={{ color:C.rose }}>*</span>
                  </label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}/>
                    <input type="email" name="email" value={formData.email} onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full pl-9 pr-3 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base outline-none transition-all"
                      style={{ background:C.gray[50], border:`2px solid ${formErrors.email?C.rose:C.gray[200]}`, color:C.gray[800] }}
                      onFocus={e=>e.target.style.borderColor=C.navy}
                      onBlur={e=>e.target.style.borderColor=formErrors.email?C.rose:C.gray[200]}/>
                  </div>
                  {formErrors.email && <p className="mt-1 text-[10px] flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={8}/>{formErrors.email}</p>}
                </div>

                {/* Phone */}
                <div className="sm:col-span-1">
                  <label className="block text-[11px] sm:text-xs font-bold mb-1" style={{ color:C.gray[600] }}>
                    Phone Number <span style={{ color:C.rose }}>*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-2 sm:px-3 rounded-l-xl border-y-2 border-l-2 bg-white flex-shrink-0"
                      style={{ borderColor:formErrors.phone?C.rose:C.gray[200] }}>
                      <span className="text-[11px] sm:text-xs font-bold whitespace-nowrap" style={{ color:C.navy }}>🇬🇭 +233</span>
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                      placeholder="244 123 456"
                      className="flex-1 min-w-0 px-3 py-2.5 sm:py-3 rounded-r-xl text-sm sm:text-base outline-none transition-all"
                      style={{ background:C.gray[50], border:`2px solid ${formErrors.phone?C.rose:C.gray[200]}`, borderLeft:'none', color:C.gray[800] }}
                      onFocus={e=>e.target.style.borderColor=C.navy}
                      onBlur={e=>e.target.style.borderColor=formErrors.phone?C.rose:C.gray[200]}/>
                  </div>
                  {formErrors.phone && <p className="mt-1 text-[10px] flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={8}/>{formErrors.phone}</p>}
                </div>

                {/* Country */}
                <div>
                  <label className="block text-[11px] sm:text-xs font-bold mb-1" style={{ color:C.gray[600] }}>Country</label>
                  <div className="relative">
                    <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}/>
                    <select name="country" value={formData.country} onChange={handleChange}
                      className="w-full pl-9 pr-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base outline-none appearance-none cursor-pointer"
                      style={{ background:C.gray[50], border:`2px solid ${C.gray[200]}`, color:C.gray[800] }}>
                      {['Ghana','Nigeria','Kenya','South Africa','Tanzania','Uganda','Senegal','Other'].map(c=><option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* ── PAYMENT METHOD ────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h2 className="font-black text-base sm:text-lg mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.orange}15` }}>
                  <CreditCard size={14} className="sm:w-4 sm:h-4" style={{ color:C.orange }}/>
                </div>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                {[
                  { id:'mobile_money', icon:Smartphone, label:'Mobile Money', desc:'MTN, Vodafone, AirtelTigo', popular:true },
                  { id:'card',         icon:CreditCard, label:'Debit / Credit Card', desc:'Visa, Mastercard', popular:false },
                  { id:'bank',         icon:Building,   label:'Bank Transfer',       desc:'Direct bank deposit', popular:false },
                ].map(m => (
                  <button key={m.id} type="button"
                    onClick={() => setFormData(p=>({ ...p, paymentMethod:m.id }))}
                    className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl flex items-start gap-2 sm:gap-3 text-left transition-all"
                    style={{
                      border:`2px solid ${formData.paymentMethod===m.id?C.navy:C.gray[200]}`,
                      background: formData.paymentMethod===m.id ? `${C.navy}08` : 'white'
                    }}>
                    {m.popular && (
                      <span className="absolute -top-2 left-3 text-[8px] sm:text-[9px] px-1.5 sm:px-2 py-0.5 rounded-full font-black text-white whitespace-nowrap" style={{ background:C.green }}>Popular</span>
                    )}
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: formData.paymentMethod===m.id?`${C.navy}15`:C.gray[100] }}>
                      <m.icon size={15} className="sm:w-4 sm:h-4" style={{ color: formData.paymentMethod===m.id?C.navy:C.gray[400] }}/>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-bold truncate" style={{ color: formData.paymentMethod===m.id?C.navy:C.gray[700] }}>{m.label}</p>
                      <p className="text-[9px] sm:text-[11px] truncate" style={{ color:C.gray[400] }}>{m.desc}</p>
                    </div>
                    {formData.paymentMethod===m.id && (
                      <div className="absolute top-2 right-2 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center"
                        style={{ background:C.navy }}>
                        <Check size={9} className="sm:w-3 sm:h-3 text-white"/>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Paystack logo */}
              <div className="mt-3 sm:mt-4 flex items-start gap-2 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl" style={{ background:C.gray[50] }}>
                <Shield size={12} className="sm:w-3 sm:h-3 mt-0.5 flex-shrink-0" style={{ color:C.green }}/>
                <p className="text-[10px] sm:text-xs leading-relaxed" style={{ color:C.gray[500] }}>
                  All payments are processed securely by <strong style={{ color:C.navy }}>Paystack</strong> — Ghana's most trusted payment platform.
                </p>
              </div>
            </div>

            {/* ── PROMO CODE ────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-black text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.orange}15` }}>
                  <Gift size={14} className="sm:w-4 sm:h-4" style={{ color:C.orange }}/>
                </div>
                Have a Promo Code?
              </h3>

              <div className="flex gap-2">
                <input type="text" value={promoCode} onChange={e=>setPromoCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 min-w-0 px-3 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base outline-none transition-all"
                  style={{ background:C.gray[50], border:`2px solid ${C.gray[200]}`, color:C.gray[800] }}
                  disabled={promoApplied}
                  onFocus={e=>e.target.style.borderColor=C.navy}
                  onBlur={e=>e.target.style.borderColor=C.gray[200]}/>
                <button onClick={handleApplyPromo} disabled={promoApplied}
                  className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all border-2 disabled:opacity-40 whitespace-nowrap"
                  style={{ borderColor:C.navy, color:C.navy }}>
                  Apply
                </button>
              </div>

              {promoError && <p className="mt-2 text-[10px] sm:text-xs flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={10}/>{promoError}</p>}

              <div className="mt-2 sm:mt-3 flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] sm:text-xs" style={{ color:C.gray[500] }}>
                  Try: <span className="font-mono font-black px-1.5 py-0.5 rounded-lg" style={{ background:C.navy+'12', color:C.navy }}>WELCOME10</span>
                </span>
                <button onClick={handleCopyCode} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                  {copied ? <Check size={11} style={{ color:C.green }}/> : <Copy size={11} style={{ color:C.gray[400] }}/>}
                </button>
              </div>

              {promoApplied && (
                <div className="mt-3 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl flex items-center gap-2"
                  style={{ background:`${C.green}10`, border:`1px solid ${C.green}30` }}>
                  <CheckCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" style={{ color:C.green }}/>
                  <span className="text-xs sm:text-sm font-semibold" style={{ color:C.green }}>
                    🎉 10% off! Save {fmtUSD(FIXED_PRICE_USD * 0.1)}
                  </span>
                </div>
              )}
            </div>

            {/* ── LEARNING OUTCOMES ─────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-black text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.green}15` }}>
                  <Award size={14} className="sm:w-4 sm:h-4" style={{ color:C.green }}/>
                </div>
                What You'll Learn
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {course.outcomes.map((o,i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl" style={{ background:`${C.green}08` }}>
                    <CheckCircle size={12} className="sm:w-3 sm:h-3 flex-shrink-0 mt-0.5" style={{ color:C.green }}/>
                    <span className="text-xs sm:text-sm font-medium leading-tight" style={{ color:C.gray[700] }}>{o}</span>
                  </div>
                ))}
                <div className="flex items-start gap-2 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl" style={{ background:`${C.green}08` }}>
                  <Award size={12} className="sm:w-3 sm:h-3 flex-shrink-0 mt-0.5" style={{ color:C.green }}/>
                  <span className="text-xs sm:text-sm font-medium leading-tight" style={{ color:C.gray[700] }}>iKPACE certificate</span>
                </div>
              </div>
            </div>

            {/* ── TESTIMONIALS ──────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-black text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}15` }}>
                  <MessageCircle size={14} className="sm:w-4 sm:h-4" style={{ color:C.navy }}/>
                </div>
                What Students Say
              </h3>
              <div className="space-y-2 sm:space-y-3">
                {TESTIMONIALS.map((t,i) => (
                  <div key={i} className="flex gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl sm:rounded-2xl" style={{ background:C.gray[50] }}>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-white text-[10px] sm:text-xs font-black flex-shrink-0"
                      style={{ background:t.color }}>{t.init}</div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm truncate" style={{ color:C.navy }}>{t.name}</span>
                        <span className="text-[9px] sm:text-[11px] flex-shrink-0" style={{ color:C.gray[400] }}>· {t.role}</span>
                      </div>
                      <p className="text-[11px] sm:text-xs leading-relaxed mb-1" style={{ color:C.gray[600] }}>"{t.text}"</p>
                      <div className="flex gap-0.5">
                        {[...Array(t.rating)].map((_,i)=><Star key={i} size={10} className="sm:w-3 sm:h-3 fill-current" style={{ color:C.yellow }}/>)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── FAQ ───────────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-black text-sm sm:text-base mb-3 sm:mb-4" style={{ color:C.navy }}>Frequently Asked Questions</h3>
              <div className="space-y-2">
                {faqs.map((faq,i) => (
                  <div key={i} className="rounded-xl sm:rounded-2xl overflow-hidden" style={{ border:`1px solid ${C.gray[200]}` }}>
                    <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                      className="w-full flex items-center justify-between p-3 sm:p-4 text-left hover:bg-gray-50 transition gap-2">
                      <span className="text-xs sm:text-sm font-semibold" style={{ color:C.navy }}>{faq.q}</span>
                      {openFaq===i ? <ChevronUp size={14} className="sm:w-4 sm:h-4 flex-shrink-0" style={{ color:C.gray[400] }}/> : <ChevronDown size={14} className="sm:w-4 sm:h-4 flex-shrink-0" style={{ color:C.gray[400] }}/>}
                    </button>
                    {openFaq===i && (
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                        <p className="text-[11px] sm:text-xs leading-relaxed" style={{ color:C.gray[500] }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ══ RIGHT COLUMN — Order summary (sticky) ═════════════════════ */}
          <div className="space-y-4 sm:space-y-5">

            {/* ── ORDER SUMMARY ─────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl overflow-hidden lg:sticky lg:top-24"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              {/* Course mini banner */}
              <div className="relative h-20 sm:h-24 md:h-28 overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0" style={{ background:'linear-gradient(to right,rgba(0,0,0,0.6),rgba(0,0,0,0.2))' }}/>
                <div className="absolute inset-0 flex items-center p-3 gap-2">
                  <span className="text-2xl sm:text-3xl">{course.emoji}</span>
                  <div className="text-white min-w-0 flex-1">
                    <p className="font-black text-xs sm:text-sm leading-tight truncate">{course.title}</p>
                    <p className="text-[9px] sm:text-[11px] opacity-70 truncate">{course.duration} · {course.level}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                {/* Price breakdown */}
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b" style={{ borderColor:C.gray[100] }}>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span style={{ color:C.gray[600] }}>Course price</span>
                    <span className="font-semibold" style={{ color:C.gray[800] }}>{fmtUSD(FIXED_PRICE_USD)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span style={{ color:C.green }}>Promo (10%)</span>
                      <span className="font-semibold" style={{ color:C.green }}>- {fmtUSD(FIXED_PRICE_USD * discount)}</span>
                    </div>
                  )}
                </div>

                {/* USD total */}
                <div className="flex justify-between items-baseline mb-2 sm:mb-3">
                  <span className="font-black text-sm sm:text-base" style={{ color:C.navy }}>Total</span>
                  <div className="text-right">
                    <span className="font-black text-xl sm:text-2xl md:text-3xl" style={{ color:C.navy }}>{fmtUSD(totalUSD())}</span>
                    <p className="text-[8px] sm:text-[10px]" style={{ color:C.gray[400] }}>USD</p>
                  </div>
                </div>

                {/* ── LOCAL CURRENCY — big visible badge ────────────────── */}
                <div className="rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-5"
                  style={{ border:`2px solid ${C.orange}30`, background:`${C.orange}06` }}>

                  {/* Loading state */}
                  {rateStatus === 'loading' && (
                    <div className="flex items-center justify-center gap-2 p-3 sm:p-4">
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-t-transparent animate-spin flex-shrink-0"
                        style={{ borderColor:`${C.orange}40`, borderTopColor:C.orange }}/>
                      <span className="text-[10px] sm:text-xs font-semibold" style={{ color:C.gray[500] }}>
                        Detecting currency…
                      </span>
                    </div>
                  )}

                  {/* Ready or fallback — show local price prominently */}
                  {(rateStatus === 'ready' || rateStatus === 'fallback') && localAmount && localCurrency && (
                    <div>
                      {/* Header strip */}
                      <div className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between border-b"
                        style={{ borderColor:`${C.orange}20`, background:`${C.orange}10` }}>
                        <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider"
                          style={{ color:C.orange }}>
                          🌍 Your Local Price
                        </span>
                        <span className="text-[8px] sm:text-[10px] font-semibold" style={{ color:C.gray[400] }}>
                          {rateStatus === 'fallback' ? 'Est.' : 'Live'}
                        </span>
                      </div>

                      {/* Big local price */}
                      <div className="px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between">
                        <div>
                          <div className="font-black text-lg sm:text-xl md:text-2xl" style={{ color:C.navy }}>
                            {fmtLocal(localAmount, localCurrency)}
                          </div>
                          <div className="text-[8px] sm:text-[10px] mt-0.5" style={{ color:C.gray[400] }}>
                            ≈ {fmtUSD(totalUSD())} USD
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-white whitespace-nowrap"
                            style={{ background:`linear-gradient(135deg,${C.orange},${C.amber})` }}>
                            {localCurrency}
                          </div>
                        </div>
                      </div>

                      {/* Disclaimer */}
                      <div className="px-3 sm:px-4 pb-2 sm:pb-3">
                        <p className="text-[8px] sm:text-[10px] leading-relaxed" style={{ color:C.gray[400] }}>
                          {rateStatus === 'fallback'
                            ? '⚠ Using estimated rate'
                            : '✓ Approximate price in local currency'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error — still show GHS fallback so user isn't confused */}
                  {rateStatus === 'error' && (
                    <div className="p-3 sm:p-4 text-center">
                      <p className="text-xs sm:text-sm font-semibold mb-1" style={{ color:C.gray[600] }}>
                        {fmtUSD(totalUSD())} USD
                      </p>
                      <p className="text-[9px] sm:text-[10px]" style={{ color:C.gray[400] }}>
                        Paystack will show local price
                      </p>
                    </div>
                  )}
                </div>

                {/* CTA button */}
                <button onClick={handleCheckout}
                  className="w-full py-3 sm:py-4 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm text-white flex items-center justify-center gap-1.5 sm:gap-2 hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-xl shadow-lg group"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                  <Lock size={13} className="sm:w-4 sm:h-4"/> Complete Enrollment
                  <ChevronRight size={13} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform"/>
                </button>

                {/* Security row */}
                <div className="flex justify-around mt-3 sm:mt-4 pt-3 sm:pt-4 border-t" style={{ borderColor:C.gray[100] }}>
                  {[
                    { icon:Shield,    label:'Secure',    color:C.green  },
                    { icon:Lock,      label:'Encrypted', color:C.navy   },
                    { icon:BadgeCheck,label:'Paystack',  color:C.orange },
                  ].map((s,i) => (
                    <div key={i} className="flex flex-col items-center gap-0.5 sm:gap-1">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-lg sm:rounded-xl flex items-center justify-center" style={{ background:`${s.color}12` }}>
                        <s.icon size={11} className="sm:w-3 sm:h-3 md:w-4 md:h-4" style={{ color:s.color }}/>
                      </div>
                      <span className="text-[8px] sm:text-[10px] font-semibold" style={{ color:C.gray[500] }}>{s.label}</span>
                    </div>
                  ))}
                </div>

                {/* Student trust badge */}
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center" style={{ background:`${C.navy}08`, border:`1px solid ${C.navy}15` }}>
                  <p className="text-[11px] sm:text-xs font-bold" style={{ color:C.navy }}>🎓 Join 130+ Learners</p>
                  <p className="text-[9px] sm:text-[11px] mt-0.5" style={{ color:C.gray[500] }}>Certificate awarded upon completion</p>
                </div>
              </div>
            </div>

            {/* ── WHAT'S INCLUDED ───────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-black text-xs sm:text-sm mb-3" style={{ color:C.navy }}>This Course Includes</h3>
              <div className="space-y-2">
                {[
                  { icon:PlayCircle,    color:C.navy,   text:`${course.lessons} video lessons`            },
                  { icon:Download,      color:C.orange, text:'Downloadable resources & templates'         },
                  { icon:Globe,         color:C.green,  text:'Lifetime access on any device'              },
                  { icon:Award,         color:C.amber,  text:'iKPACE certificate'           },
                  { icon:MessageCircle, color:C.purple, text:'Community & peer discussion'         },
                  { icon:BadgeCheck,    color:C.navy,   text:'Dedicated student support'       },
                ].map((f,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:`${f.color}12` }}>
                      <f.icon size={11} className="sm:w-3 sm:h-3" style={{ color:f.color }}/>
                    </div>
                    <span className="text-[11px] sm:text-xs font-medium truncate" style={{ color:C.gray[700] }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RELATED COURSES ───────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-black text-xs sm:text-sm mb-3" style={{ color:C.navy }}>Also Available for $7</h3>
              <div className="space-y-1.5 sm:space-y-2">
                {relatedCourses.map(r => (
                  <Link key={r.id} to={`/checkout/${r.id}`}
                    className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:shadow-md transition-all group"
                    style={{ background:C.gray[50] }}>
                    <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-base sm:text-lg md:text-xl flex-shrink-0" style={{ background:'white' }}>{r.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] sm:text-xs font-bold truncate group-hover:text-orange-500 transition-colors" style={{ color:C.navy }}>{r.title}</p>
                      <p className="text-[9px] sm:text-[10px]" style={{ color:C.gray[400] }}>{r.duration}</p>
                    </div>
                    <ChevronRight size={11} className="sm:w-3 sm:h-3 flex-shrink-0" style={{ color:C.gray[300] }}/>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── NEED HELP ─────────────────────────────────────────────── */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h4 className="font-black text-xs sm:text-sm mb-2" style={{ color:C.navy }}>Need Help?</h4>
              <p className="text-[11px] sm:text-xs mb-2 sm:mb-3" style={{ color:C.gray[400] }}>Our team is ready to assist you.</p>
              <div className="space-y-1.5 sm:space-y-2">
                <Link to="/support"
                  className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:shadow-sm transition-all"
                  style={{ background:C.gray[50] }}>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center" style={{ background:`${C.navy}12` }}>
                    <MessageCircle size={11} className="sm:w-3 sm:h-3" style={{ color:C.navy }}/>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold" style={{ color:C.gray[700] }}>Help Center</span>
                </Link>
                <Link to="/contact"
                  className="flex items-center gap-2 p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:shadow-sm transition-all"
                  style={{ background:C.gray[50] }}>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center" style={{ background:`${C.orange}12` }}>
                    <Mail size={11} className="sm:w-3 sm:h-3" style={{ color:C.orange }}/>
                  </div>
                  <span className="text-[11px] sm:text-xs font-semibold" style={{ color:C.gray[700] }}>Contact Support</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 sm:mt-10 text-center">
          <Link to={`/course/${courseId}`}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold hover:underline"
            style={{ color:C.gray[500] }}>
            <ArrowLeft size={12} className="sm:w-3 sm:h-3"/> Back to Course Details
          </Link>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          -webkit-tap-highlight-color: transparent;
        }
        
        html, body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        
        /* Mobile-first responsive breakpoints */
        @media (max-width: 480px) {
          input, select, button {
            font-size: 16px !important; /* Prevents zoom on iOS */
          }
          
          .grid {
            margin-left: 0;
            margin-right: 0;
          }
        }
        
        /* Custom breakpoint for extra small devices */
        @media (min-width: 480px) {
          .xs\\:inline {
            display: inline;
          }
          .xs\\:hidden {
            display: none;
          }
        }
        
        /* Touch-friendly improvements */
        button, a, input, select {
          min-height: 44px; /* Better touch targets */
        }
        
        /* Prevent content overflow */
        img, svg, video, canvas, audio, iframe, embed, object {
          max-width: 100%;
          height: auto;
        }
        
        /* Smooth scrolling */
        .overflow-x-auto {
          -webkit-overflow-scrolling: touch;
        }
        
        /* Better sticky behavior on mobile */
        .sticky {
          position: -webkit-sticky;
          position: sticky;
        }
        
        /* Responsive font sizes */
        @media (max-width: 640px) {
          h2 {
            font-size: 1.25rem !important;
          }
          h3 {
            font-size: 1rem !important;
          }
          .text-lg {
            font-size: 1.125rem !important;
          }
        }
      `}</style>
    </div>
  )
}