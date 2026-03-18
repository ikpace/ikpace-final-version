// src/pages/Register.jsx
import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { supabase } from "../supabaseClient"
import {
  Mail, Lock, User, AlertCircle, Eye, EyeOff,
  CheckCircle, XCircle, ArrowRight, Shield, Award,
  BookOpen, Users, Sparkles, ChevronRight, Phone,
  Clock, Star, BadgeCheck, Heart, Search,
  Zap, Rocket, Check, ChevronDown
} from "lucide-react"

// ─── Brand tokens ─────────────────────────────────────────────────────────────
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
    50:"#F8FAFC",100:"#F1F5F9",200:"#E2E8F0",
    300:"#CBD5E1",400:"#94A3B8",500:"#64748B",
    600:"#475569",700:"#334155",800:"#1E293B",900:"#0F172A"
  }
}

// ─── iKPACE Logo — uses your actual brand image ──────────────────────────────
// Put your logo image at: src/assets/ikpace-logo.png  (or .jpeg)
// Then import it at the top of this file:
//   import ikpaceLogo from '../assets/ikpace-logo.png'
// And replace the <img src> below with: src={ikpaceLogo}
function IKPACELogo({ width = 120 }) {
  return (
    <div className="flex flex-col items-center" style={{ width }}>
      {/* ── Option A: use your actual image file (recommended) ─────────────
          Uncomment this and comment out Option B once you add the image file:

          <img
            src={ikpaceLogo}
            alt="iKPACE — Learn Smarter"
            style={{ width, height: 'auto', objectFit: 'contain' }}
          />

          ─────────────────────────────────────────────────────────────────── */}

      {/* ── Option B: SVG replica of your brand logo (used until image is added) */}
      <svg width={width} height={width * 1.2} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">
        {/* Rounded navy background */}
        <rect width="200" height="240" rx="24" fill="#1A3D7C"/>

        {/* ── Graduation cap ── */}
        {/* Board (flat top diamond) */}
        <polygon points="100,36 172,62 100,88 28,62" fill="#FF7A00"/>
        {/* Cap body / bowl */}
        <path d="M52,70 L52,106 Q52,132 100,140 Q148,132 148,106 L148,70 Q124,80 100,80 Q76,80 52,70Z" fill="#FF7A00"/>
        {/* Shadow fold on cap */}
        <path d="M52,70 Q76,80 100,80 Q124,80 148,70 Q124,86 100,86 Q76,86 52,70Z" fill="#0F2655" opacity="0.35"/>
        {/* Tassel string */}
        <line x1="172" y1="62" x2="172" y2="100" stroke="#FF7A00" strokeWidth="4" strokeLinecap="round"/>
        {/* Tassel horizontal bar */}
        <line x1="162" y1="100" x2="182" y2="100" stroke="#FF7A00" strokeWidth="3" strokeLinecap="round"/>
        {/* Tassel bob */}
        <circle cx="172" cy="112" r="7" fill="#FF7A00"/>

        {/* ── "iKpace" wordmark ── */}
        <text x="100" y="178"
          textAnchor="middle"
          fontFamily="'Arial Black', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="900"
          fontSize="44"
          fill="white"
          letterSpacing="-1">
          iKpace
        </text>

        {/* ── "LEARN SMARTER" tagline ── */}
        <text x="100" y="210"
          textAnchor="middle"
          fontFamily="'Arial', 'Helvetica Neue', sans-serif"
          fontWeight="700"
          fontSize="13"
          fill="#E6B800"
          letterSpacing="4.5">
          LEARN SMARTER
        </text>
      </svg>
    </div>
  )
}

// ─── All world countries with dial codes ─────────────────────────────────────
const COUNTRIES = [
  {code:"GH",name:"Ghana",              dial:"+233"},{code:"NG",name:"Nigeria",             dial:"+234"},
  {code:"KE",name:"Kenya",              dial:"+254"},{code:"ZA",name:"South Africa",        dial:"+27"},
  {code:"TZ",name:"Tanzania",           dial:"+255"},{code:"UG",name:"Uganda",              dial:"+256"},
  {code:"GH",name:"Ghana",              dial:"+233"},{code:"SN",name:"Senegal",             dial:"+221"},
  {code:"ET",name:"Ethiopia",           dial:"+251"},{code:"CM",name:"Cameroon",            dial:"+237"},
  {code:"CI",name:"Côte d'Ivoire",      dial:"+225"},{code:"RW",name:"Rwanda",              dial:"+250"},
  {code:"AF",name:"Afghanistan",        dial:"+93" },{code:"AL",name:"Albania",             dial:"+355"},
  {code:"DZ",name:"Algeria",            dial:"+213"},{code:"AD",name:"Andorra",             dial:"+376"},
  {code:"AO",name:"Angola",             dial:"+244"},{code:"AR",name:"Argentina",           dial:"+54"},
  {code:"AM",name:"Armenia",            dial:"+374"},{code:"AU",name:"Australia",           dial:"+61"},
  {code:"AT",name:"Austria",            dial:"+43" },{code:"AZ",name:"Azerbaijan",          dial:"+994"},
  {code:"BS",name:"Bahamas",            dial:"+1"  },{code:"BH",name:"Bahrain",             dial:"+973"},
  {code:"BD",name:"Bangladesh",         dial:"+880"},{code:"BE",name:"Belgium",             dial:"+32"},
  {code:"BZ",name:"Belize",             dial:"+501"},{code:"BJ",name:"Benin",               dial:"+229"},
  {code:"BT",name:"Bhutan",             dial:"+975"},{code:"BO",name:"Bolivia",             dial:"+591"},
  {code:"BA",name:"Bosnia",             dial:"+387"},{code:"BW",name:"Botswana",            dial:"+267"},
  {code:"BR",name:"Brazil",             dial:"+55" },{code:"BN",name:"Brunei",              dial:"+673"},
  {code:"BG",name:"Bulgaria",           dial:"+359"},{code:"BF",name:"Burkina Faso",        dial:"+226"},
  {code:"BI",name:"Burundi",            dial:"+257"},{code:"CV",name:"Cabo Verde",          dial:"+238"},
  {code:"KH",name:"Cambodia",           dial:"+855"},{code:"CA",name:"Canada",              dial:"+1"},
  {code:"CF",name:"Cent. African Rep.", dial:"+236"},{code:"TD",name:"Chad",                dial:"+235"},
  {code:"CL",name:"Chile",              dial:"+56" },{code:"CN",name:"China",               dial:"+86"},
  {code:"CO",name:"Colombia",           dial:"+57" },{code:"CG",name:"Congo",               dial:"+242"},
  {code:"CD",name:"Congo DRC",          dial:"+243"},{code:"CR",name:"Costa Rica",          dial:"+506"},
  {code:"HR",name:"Croatia",            dial:"+385"},{code:"CU",name:"Cuba",                dial:"+53"},
  {code:"CY",name:"Cyprus",             dial:"+357"},{code:"CZ",name:"Czech Republic",      dial:"+420"},
  {code:"DK",name:"Denmark",            dial:"+45" },{code:"DJ",name:"Djibouti",            dial:"+253"},
  {code:"DO",name:"Dominican Republic", dial:"+1"  },{code:"EC",name:"Ecuador",             dial:"+593"},
  {code:"EG",name:"Egypt",              dial:"+20" },{code:"SV",name:"El Salvador",         dial:"+503"},
  {code:"GQ",name:"Equatorial Guinea",  dial:"+240"},{code:"ER",name:"Eritrea",             dial:"+291"},
  {code:"EE",name:"Estonia",            dial:"+372"},{code:"SZ",name:"Eswatini",            dial:"+268"},
  {code:"FJ",name:"Fiji",               dial:"+679"},{code:"FI",name:"Finland",             dial:"+358"},
  {code:"FR",name:"France",             dial:"+33" },{code:"GA",name:"Gabon",               dial:"+241"},
  {code:"GM",name:"Gambia",             dial:"+220"},{code:"GE",name:"Georgia",             dial:"+995"},
  {code:"DE",name:"Germany",            dial:"+49" },{code:"GR",name:"Greece",              dial:"+30"},
  {code:"GT",name:"Guatemala",          dial:"+502"},{code:"GN",name:"Guinea",              dial:"+224"},
  {code:"GY",name:"Guyana",             dial:"+592"},{code:"HT",name:"Haiti",               dial:"+509"},
  {code:"HN",name:"Honduras",           dial:"+504"},{code:"HU",name:"Hungary",             dial:"+36"},
  {code:"IS",name:"Iceland",            dial:"+354"},{code:"IN",name:"India",               dial:"+91"},
  {code:"ID",name:"Indonesia",          dial:"+62" },{code:"IR",name:"Iran",                dial:"+98"},
  {code:"IQ",name:"Iraq",               dial:"+964"},{code:"IE",name:"Ireland",             dial:"+353"},
  {code:"IL",name:"Israel",             dial:"+972"},{code:"IT",name:"Italy",               dial:"+39"},
  {code:"JM",name:"Jamaica",            dial:"+1"  },{code:"JP",name:"Japan",               dial:"+81"},
  {code:"JO",name:"Jordan",             dial:"+962"},{code:"KZ",name:"Kazakhstan",          dial:"+7"},
  {code:"KI",name:"Kiribati",           dial:"+686"},{code:"KW",name:"Kuwait",              dial:"+965"},
  {code:"KG",name:"Kyrgyzstan",         dial:"+996"},{code:"LA",name:"Laos",                dial:"+856"},
  {code:"LV",name:"Latvia",             dial:"+371"},{code:"LB",name:"Lebanon",             dial:"+961"},
  {code:"LS",name:"Lesotho",            dial:"+266"},{code:"LR",name:"Liberia",             dial:"+231"},
  {code:"LY",name:"Libya",              dial:"+218"},{code:"LT",name:"Lithuania",           dial:"+370"},
  {code:"LU",name:"Luxembourg",         dial:"+352"},{code:"MG",name:"Madagascar",          dial:"+261"},
  {code:"MW",name:"Malawi",             dial:"+265"},{code:"MY",name:"Malaysia",            dial:"+60"},
  {code:"MV",name:"Maldives",           dial:"+960"},{code:"ML",name:"Mali",                dial:"+223"},
  {code:"MT",name:"Malta",              dial:"+356"},{code:"MR",name:"Mauritania",          dial:"+222"},
  {code:"MU",name:"Mauritius",          dial:"+230"},{code:"MX",name:"Mexico",              dial:"+52"},
  {code:"MD",name:"Moldova",            dial:"+373"},{code:"MC",name:"Monaco",              dial:"+377"},
  {code:"MN",name:"Mongolia",           dial:"+976"},{code:"ME",name:"Montenegro",          dial:"+382"},
  {code:"MA",name:"Morocco",            dial:"+212"},{code:"MZ",name:"Mozambique",          dial:"+258"},
  {code:"MM",name:"Myanmar",            dial:"+95" },{code:"NA",name:"Namibia",             dial:"+264"},
  {code:"NP",name:"Nepal",              dial:"+977"},{code:"NL",name:"Netherlands",         dial:"+31"},
  {code:"NZ",name:"New Zealand",        dial:"+64" },{code:"NI",name:"Nicaragua",           dial:"+505"},
  {code:"NE",name:"Niger",              dial:"+227"},{code:"NO",name:"Norway",              dial:"+47"},
  {code:"OM",name:"Oman",               dial:"+968"},{code:"PK",name:"Pakistan",            dial:"+92"},
  {code:"PA",name:"Panama",             dial:"+507"},{code:"PG",name:"Papua New Guinea",    dial:"+675"},
  {code:"PY",name:"Paraguay",           dial:"+595"},{code:"PE",name:"Peru",                dial:"+51"},
  {code:"PH",name:"Philippines",        dial:"+63" },{code:"PL",name:"Poland",              dial:"+48"},
  {code:"PT",name:"Portugal",           dial:"+351"},{code:"QA",name:"Qatar",               dial:"+974"},
  {code:"RO",name:"Romania",            dial:"+40" },{code:"RU",name:"Russia",              dial:"+7"},
  {code:"SA",name:"Saudi Arabia",       dial:"+966"},{code:"RS",name:"Serbia",              dial:"+381"},
  {code:"SC",name:"Seychelles",         dial:"+248"},{code:"SL",name:"Sierra Leone",        dial:"+232"},
  {code:"SG",name:"Singapore",          dial:"+65" },{code:"SK",name:"Slovakia",            dial:"+421"},
  {code:"SI",name:"Slovenia",           dial:"+386"},{code:"SO",name:"Somalia",             dial:"+252"},
  {code:"SS",name:"South Sudan",        dial:"+211"},{code:"ES",name:"Spain",               dial:"+34"},
  {code:"LK",name:"Sri Lanka",          dial:"+94" },{code:"SD",name:"Sudan",               dial:"+249"},
  {code:"SR",name:"Suriname",           dial:"+597"},{code:"SE",name:"Sweden",              dial:"+46"},
  {code:"CH",name:"Switzerland",        dial:"+41" },{code:"SY",name:"Syria",               dial:"+963"},
  {code:"TW",name:"Taiwan",             dial:"+886"},{code:"TJ",name:"Tajikistan",          dial:"+992"},
  {code:"TH",name:"Thailand",           dial:"+66" },{code:"TL",name:"Timor-Leste",         dial:"+670"},
  {code:"TG",name:"Togo",               dial:"+228"},{code:"TT",name:"Trinidad & Tobago",   dial:"+1"},
  {code:"TN",name:"Tunisia",            dial:"+216"},{code:"TR",name:"Turkey",              dial:"+90"},
  {code:"TM",name:"Turkmenistan",       dial:"+993"},{code:"TV",name:"Tuvalu",              dial:"+688"},
  {code:"UA",name:"Ukraine",            dial:"+380"},{code:"AE",name:"United Arab Emirates",dial:"+971"},
  {code:"GB",name:"United Kingdom",     dial:"+44" },{code:"US",name:"United States",       dial:"+1"},
  {code:"UY",name:"Uruguay",            dial:"+598"},{code:"UZ",name:"Uzbekistan",          dial:"+998"},
  {code:"VE",name:"Venezuela",          dial:"+58" },{code:"VN",name:"Vietnam",             dial:"+84"},
  {code:"YE",name:"Yemen",              dial:"+967"},{code:"ZM",name:"Zambia",              dial:"+260"},
  {code:"ZW",name:"Zimbabwe",           dial:"+263"},
]

// Remove duplicates by code+dial
const UNIQUE_COUNTRIES = COUNTRIES.filter((c, idx, arr) => arr.findIndex(x => x.code===c.code && x.dial===c.dial) === idx)

const flagEmoji = (code) =>
  code.toUpperCase().split('').map(c => String.fromCodePoint(0x1F1E0 - 65 + c.charCodeAt(0))).join('')

// ─── Phone Picker Component ───────────────────────────────────────────────────
function PhonePicker({ digits, onDigitsChange, dialCode, onDialChange, error }) {
  const [open,    setOpen]    = useState(false)
  const [search,  setSearch]  = useState('')
  const dropRef = useRef(null)
  const selected = UNIQUE_COUNTRIES.find(c => c.dial === dialCode) || UNIQUE_COUNTRIES[0]

  useEffect(() => {
    const close = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) { setOpen(false); setSearch('') } }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const filtered = UNIQUE_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.dial.includes(search)
  )

  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color:C.gray[700] }}>
        Phone Number <span style={{ color:C.rose }}>*</span>
      </label>
      <div className="flex gap-2 items-stretch">
        {/* Country code picker */}
        <div className="relative flex-shrink-0" ref={dropRef}>
          <button type="button" onClick={() => setOpen(o=>!o)}
            className="flex items-center gap-1.5 px-2.5 py-3 rounded-xl text-sm border-2 transition-all h-full"
            style={{ border:`2px solid ${error?C.rose:open?C.orange:C.gray[200]}`, background:'white', minWidth:'88px' }}>
            <span className="text-base leading-none">{flagEmoji(selected.code)}</span>
            <span className="text-xs font-bold" style={{ color:C.navy }}>{selected.dial}</span>
            <ChevronDown size={11} style={{ color:C.gray[400] }}/>
          </button>

          {open && (
            <div className="absolute top-full left-0 mt-1 z-50 bg-white rounded-2xl shadow-2xl border overflow-hidden"
              style={{ width:'270px', border:`1px solid ${C.gray[200]}`, maxHeight:'320px' }}>
              <div className="p-2 border-b bg-white sticky top-0" style={{ borderColor:C.gray[100] }}>
                <div className="relative">
                  <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}/>
                  <input autoFocus value={search} onChange={e=>setSearch(e.target.value)}
                    placeholder="Search country…"
                    className="w-full pl-7 pr-3 py-2 rounded-xl text-xs outline-none"
                    style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}`, color:C.gray[800] }}/>
                </div>
              </div>
              <div className="overflow-y-auto" style={{ maxHeight:'240px' }}>
                {filtered.length === 0 ? (
                  <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No results</p>
                ) : filtered.map((c, i) => (
                  <button key={`${c.code}-${i}`} type="button"
                    onClick={() => { onDialChange(c.dial); setOpen(false); setSearch('') }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-left transition hover:bg-gray-50"
                    style={{ background: selected.code===c.code&&selected.dial===c.dial ? `${C.navy}08` : 'transparent' }}>
                    <span className="text-sm flex-shrink-0">{flagEmoji(c.code)}</span>
                    <span className="text-xs flex-1 truncate" style={{ color:C.gray[700] }}>{c.name}</span>
                    <span className="text-xs font-bold flex-shrink-0" style={{ color:C.navy }}>{c.dial}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Number input */}
        <div className="relative flex-1">
          <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:error?C.rose:C.gray[400] }}/>
          <input type="tel" inputMode="numeric" value={digits}
            onChange={e => onDigitsChange(e.target.value.replace(/\D/g,''))}
            placeholder="XXXXXXXXXX"
            className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={{ border:`2px solid ${error?C.rose:C.gray[200]}`, color:C.gray[800], background:'#fff' }}
            onFocus={e => e.target.style.borderColor=C.orange}
            onBlur={e => e.target.style.borderColor=error?C.rose:C.gray[200]}/>
        </div>
      </div>

      {/* Live preview */}
      {digits.length > 3 && !error && (
        <p className="mt-1.5 text-xs font-semibold flex items-center gap-1" style={{ color:C.navy }}>
          <CheckCircle size={11} style={{ color:C.green }}/> Full number: <strong>{dialCode}{digits}</strong>
        </p>
      )}
      {error && <p className="mt-1 text-xs flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={11}/>{error}</p>}
      <p className="mt-1 text-[10px]" style={{ color:C.gray[400] }}>
        We use this to support your learning journey. Never shared or sold.
      </p>
    </div>
  )
}

// ─── Password helpers ─────────────────────────────────────────────────────────
const checkPw = (pw) => ({
  length:    pw.length >= 8,
  number:    /\d/.test(pw),
  uppercase: /[A-Z]/.test(pw),
  lowercase: /[a-z]/.test(pw),
  special:   /[!@#$%^&*(),.?":{}|<>]/.test(pw),
})
const strengthMeta = (n) => {
  if (n===0) return { label:"",       color:C.gray[200], w:"0%"   }
  if (n<=2)  return { label:"Weak",   color:C.rose,      w:"33%"  }
  if (n<=4)  return { label:"Medium", color:C.yellow,    w:"66%"  }
  return           { label:"Strong", color:C.green,     w:"100%" }
}

function StepDot({ num, active, done, label }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
        style={{
          background: done?C.green:active?C.orange:C.gray[200],
          color:      (done||active)?'#fff':C.gray[400],
          boxShadow:  active?`0 0 0 4px ${C.orange}30`:'none'
        }}>
        {done?<Check size={14}/>:num}
      </div>
      <span className="text-[10px] font-medium hidden sm:block" style={{ color:active?C.navy:C.gray[400] }}>{label}</span>
    </div>
  )
}
function PwRule({ ok, label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs">
      {ok?<CheckCircle size={12} style={{ color:C.green }}/>:<XCircle size={12} style={{ color:C.gray[300] }}/>}
      <span style={{ color:ok?C.gray[700]:C.gray[400] }}>{label}</span>
    </div>
  )
}
function Field({ label, icon:Icon, error, req, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-1.5" style={{ color:C.gray[700] }}>
        {label}{req&&<span className="ml-0.5" style={{ color:C.rose }}>*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:error?C.rose:C.gray[400] }}>
          <Icon size={17}/>
        </div>
        {children}
      </div>
      {error&&<p className="mt-1 text-xs flex items-center gap-1" style={{ color:C.rose }}><AlertCircle size={11}/>{error}</p>}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function Register() {
  const navigate = useNavigate()

  const [step,           setStep]           = useState(1)
  const [fullName,       setFullName]       = useState('')
  const [email,          setEmail]          = useState('')
  const [phoneDigits,    setPhoneDigits]    = useState('')
  const [phoneDialCode,  setPhoneDialCode]  = useState('+233') // default Ghana
  const [password,       setPassword]       = useState('')
  const [confirmPw,      setConfirmPw]      = useState('')
  const [agreeTerms,     setAgreeTerms]     = useState(false)
  const [showPw,         setShowPw]         = useState(false)
  const [showCpw,        setShowCpw]        = useState(false)
  const [loading,        setLoading]        = useState(false)
  const [success,        setSuccess]        = useState(false)
  const [globalErr,      setGlobalErr]      = useState('')
  const [fieldErr,       setFieldErr]       = useState({})

  const fullPhone = phoneDialCode + phoneDigits
  const pwChecks  = checkPw(password)
  const pwScore   = Object.values(pwChecks).filter(Boolean).length
  const pwStr     = strengthMeta(pwScore)

  useEffect(() => { setGlobalErr('') }, [fullName, email, phoneDigits, password, confirmPw])

  const validateStep1 = () => {
    const e = {}
    if (!fullName.trim() || fullName.trim().length < 2)       e.fullName = "Enter your full name (min 2 chars)"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))           e.email    = "Enter a valid email address"
    if (!phoneDigits || phoneDigits.length < 5)               e.phone    = "Enter a valid phone number"
    if (phoneDigits && !/^\d+$/.test(phoneDigits))            e.phone    = "Use digits only — no spaces or dashes"
    setFieldErr(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (pwScore < 3)                  e.password = "Choose a stronger password"
    if (password !== confirmPw)       e.confirmPw = "Passwords do not match"
    if (!agreeTerms)                  e.terms    = "You must agree to the terms"
    setFieldErr(e)
    return Object.keys(e).length === 0
  }

  // ── HANDLE NEXT (step 1 → step 2) ────────────────────────────────────────
  const handleNext = (e) => {
    e.preventDefault()
    if (validateStep1()) setStep(2)
  }

  // ── HANDLE SUBMIT — exact working pattern ─────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return

    setLoading(true)
    setGlobalErr('')

    // ── 1. Sign up with Supabase Auth ────────────────────────────────────────
    const { data, error } = await supabase.auth.signUp({
      email:    email.trim().toLowerCase(),
      password: password,
      options: {
        data: { full_name: fullName.trim() }
      }
    })

    if (error) {
      console.error('SignUp Error:', error)
      const msg = error.message || ''
      if (msg.includes('already registered') || msg.includes('already been registered'))
        setGlobalErr('An account with this email already exists. Please sign in instead.')
      else if (msg.includes('invalid email'))
        setGlobalErr('Please enter a valid email address.')
      else if (msg.includes('Password should be'))
        setGlobalErr('Password must be at least 6 characters long.')
      else if (msg.includes('rate limit'))
        setGlobalErr('Too many attempts. Please wait a few minutes and try again.')
      else
        setGlobalErr(msg || 'Registration failed. Please try again.')
      setLoading(false)
      return
    }

    // ── 2. Get the user object ───────────────────────────────────────────────
    const user = data.user

    if (!user) {
      console.error('No user returned from signUp — data was:', data)
      setGlobalErr('Account created but could not retrieve user. Please check your email to confirm, then sign in.')
      setLoading(false)
      return
    }

    // ── 3. Build the full phone number ───────────────────────────────────────
    const phoneFull = phoneDialCode + phoneDigits  // e.g. +233244123456

    // ── 4. Upsert the profile with phone immediately ─────────────────────────
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .upsert([
        {
          id:              user.id,         // must match auth.users.id
          email:           email.trim().toLowerCase(),
          full_name:       fullName.trim(),
          phone:           phoneFull,       // ✅ full number: +233244123456
          phone_number:    phoneDigits,     // digits only:   244123456
          phone_dial_code: phoneDialCode,   // prefix only:   +233
          role:            'student',
          points:          0,
          streak:          0,
          rank:            'Bronze Learner',
          avatar_url:      null,
          updated_at:      new Date().toISOString(),
        }
      ])

    if (profileError) {
      console.error('Profile upsert error:', profileError)
      // Non-fatal — auth account exists, profile save failed
      // Still proceed to success so user is not blocked
    } else {
      console.log('✅ Profile saved successfully:', profileData)
    }

    // ── 5. Done — show success and redirect ──────────────────────────────────
    setSuccess(true)
    setLoading(false)
    setTimeout(() => navigate('/dashboard', { replace: true }), 1800)
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (success) return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy},${C.navyMid})` }}>
      <div className="text-center">
        <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
          style={{ background:`${C.green}30`, border:`3px solid ${C.green}`, animation:'_regPulse 1s infinite' }}>
          <CheckCircle size={44} style={{ color:C.green }}/>
        </div>
        <h2 className="text-3xl font-black text-white mb-2">Welcome aboard! 🎉</h2>
        <p className="text-white/70 mb-1">Account created successfully.</p>
        <p className="text-white/50 text-sm">Taking you to your dashboard…</p>
        <div className="mt-8 w-48 mx-auto h-1.5 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.15)' }}>
          <div className="h-full rounded-full" style={{ background:C.orange, animation:'_regGrow 1.8s linear forwards' }}/>
        </div>
      </div>
      <style>{`
        @keyframes _regPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes _regGrow  { from{width:0%} to{width:100%} }
      `}</style>
    </div>
  )

  // ── Main UI ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4"
      style={{ background:`linear-gradient(135deg,${C.gray[50]},${C.gray[100]})` }}>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">

        {/* ══ LEFT — brand panel ════════════════════════════════════════════ */}
        <aside className="lg:w-5/12 relative overflow-hidden p-8 lg:p-10 flex flex-col"
          style={{ background:`linear-gradient(160deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-10" style={{ background:C.orange }}/>
          <div className="absolute bottom-0 -left-16 w-48 h-48 rounded-full opacity-10" style={{ background:C.yellow }}/>

          {/* iKPACE Logo */}
          <Link to="/" className="relative inline-flex mb-8 justify-start">
            <IKPACELogo width={110}/>
          </Link>

          <div className="relative flex-1">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-1.5 rounded-full text-white text-xs font-semibold mb-5">
              <Sparkles size={13} style={{ color:C.yellow }}/> Join learners worldwide
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
              Start Your<br/><span style={{ color:C.orangeLight }}>Learning</span><br/>Journey Today
            </h1>
            <p className="text-white/70 text-sm leading-relaxed mb-7">
              Expert-led courses, a thriving community, and certificates that employers recognise.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-7">
              {[
                { icon:BookOpen, label:"Expert Courses", sub:"Industry-led"  },
                { icon:Users,    label:"Community",      sub:"130+ learners" },
                { icon:Award,    label:"Certificates",   sub:"Recognised"    },
                { icon:Clock,    label:"Self-Paced",     sub:"Learn anytime" },
              ].map(({ icon:Icon, label, sub }) => (
                <div key={label} className="bg-white/10 backdrop-blur-sm rounded-2xl p-3.5 hover:bg-white/15 transition-all">
                  <Icon size={17} className="mb-2" style={{ color:C.orangeLight }}/>
                  <p className="text-white font-bold text-xs">{label}</p>
                  <p className="text-white/50 text-[10px]">{sub}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-5">
              <div className="flex gap-0.5 mb-2">
                {[...Array(5)].map((_,i)=><Star key={i} size={12} className="fill-current" style={{ color:C.yellow }}/>)}
              </div>
              <p className="text-white/85 text-xs italic leading-relaxed mb-3">
                "iKPACE helped me land my first VA client. The course is practical and the community is amazing."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">SA</div>
                <div>
                  <p className="text-white font-semibold text-xs">Sarah A.</p>
                  <p className="text-white/50 text-[10px]">VA Professional · Ghana</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/60 text-xs">
              <span className="flex items-center gap-1"><Shield size={12}/> Secure</span>
              <span className="flex items-center gap-1"><BadgeCheck size={12}/> Verified</span>
              <span className="flex items-center gap-1"><Heart size={12}/> Trusted</span>
            </div>
          </div>
        </aside>

        {/* ══ RIGHT — form panel ════════════════════════════════════════════ */}
        <section className="lg:w-7/12 p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto">
          <div className="mb-5">
            <h2 className="text-2xl font-black mb-1" style={{ color:C.navy }}>Create your account</h2>
            <p className="text-sm" style={{ color:C.gray[500] }}>
              Already have an account?{" "}
              <Link to="/login" className="font-bold hover:underline" style={{ color:C.orange }}>
                Sign in <ChevronRight size={13} className="inline"/>
              </Link>
            </p>
          </div>

          {/* Steps */}
          <div className="flex items-center gap-3 mb-6">
            <StepDot num={1} label="Your Info"    active={step===1} done={step>1}/>
            <div className="flex-1 h-0.5 rounded-full transition-all duration-500"
              style={{ background:step>1?C.green:C.gray[200] }}/>
            <StepDot num={2} label="Set Password" active={step===2} done={success}/>
          </div>

          {/* Global error */}
          {globalErr && (
            <div className="mb-4 p-4 rounded-2xl flex items-start gap-3"
              style={{ background:`${C.rose}10`, border:`1px solid ${C.rose}30` }}>
              <AlertCircle size={18} style={{ color:C.rose, flexShrink:0, marginTop:1 }}/>
              <div>
                <p className="text-sm font-bold" style={{ color:C.rose }}>Registration failed</p>
                <p className="text-xs mt-0.5" style={{ color:C.rose }}>{globalErr}</p>
              </div>
            </div>
          )}

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <form onSubmit={handleNext} className="flex flex-col gap-4 flex-1">

              {/* Full name */}
              <Field label="Full Name" icon={User} error={fieldErr.fullName} req>
                <input type="text" value={fullName}
                  onChange={e=>{ setFullName(e.target.value); setFieldErr(p=>({...p,fullName:''})) }}
                  placeholder="e.g. Amara Asante"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ border:`2px solid ${fieldErr.fullName?C.rose:C.gray[200]}`, color:C.gray[800], background:'#fff' }}
                  onFocus={e=>e.target.style.borderColor=C.orange}
                  onBlur={e=>e.target.style.borderColor=fieldErr.fullName?C.rose:C.gray[200]}
                  required/>
              </Field>

              {/* Email */}
              <Field label="Email Address" icon={Mail} error={fieldErr.email} req>
                <input type="email" value={email}
                  onChange={e=>{ setEmail(e.target.value); setFieldErr(p=>({...p,email:''})) }}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ border:`2px solid ${fieldErr.email?C.rose:C.gray[200]}`, color:C.gray[800], background:'#fff' }}
                  onFocus={e=>e.target.style.borderColor=C.orange}
                  onBlur={e=>e.target.style.borderColor=fieldErr.email?C.rose:C.gray[200]}
                  required/>
              </Field>

              {/* Phone with country selector */}
              <PhonePicker
                digits={phoneDigits}
                onDigitsChange={v=>{ setPhoneDigits(v); setFieldErr(p=>({...p,phone:''})) }}
                dialCode={phoneDialCode}
                onDialChange={v=>setPhoneDialCode(v)}
                error={fieldErr.phone}
              />

              {/* What you get box */}
              <div className="rounded-2xl p-4" style={{ background:`${C.navy}08`, border:`1px solid ${C.navy}15` }}>
                <p className="text-xs font-bold mb-2.5 flex items-center gap-1.5" style={{ color:C.navy }}>
                  <Zap size={13} style={{ color:C.orange }}/> What you get with iKPACE
                </p>
                <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                  {['Lifetime course access','Completion certificates','Peer study groups','Mentor Q&A sessions','Progress tracking','Mobile learning'].map(item=>(
                    <p key={item} className="text-xs flex items-center gap-1.5" style={{ color:C.gray[600] }}>
                      <CheckCircle size={11} style={{ color:C.green, flexShrink:0 }}/>{item}
                    </p>
                  ))}
                </div>
              </div>

              <button type="submit"
                className="mt-auto w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
                style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})`, boxShadow:`0 4px 20px ${C.navy}30` }}>
                Continue <ArrowRight size={17}/>
              </button>
            </form>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">

              <button type="button" onClick={()=>{ setStep(1); setFieldErr({}) }}
                className="self-start text-xs flex items-center gap-1 hover:underline"
                style={{ color:C.gray[500] }}>← Back to your info</button>

              {/* Password */}
              <Field label="Password" icon={Lock} error={fieldErr.password} req>
                <input type={showPw?'text':'password'} value={password}
                  onChange={e=>{ setPassword(e.target.value); setFieldErr(p=>({...p,password:''})) }}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{ border:`2px solid ${fieldErr.password?C.rose:C.gray[200]}`, color:C.gray[800], background:'#fff' }}
                  onFocus={e=>e.target.style.borderColor=C.orange}
                  onBlur={e=>e.target.style.borderColor=fieldErr.password?C.rose:C.gray[200]}
                  required/>
                <button type="button" onClick={()=>setShowPw(p=>!p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}>
                  {showPw?<EyeOff size={18}/>:<Eye size={18}/>}
                </button>
              </Field>

              {/* Strength */}
              {password.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background:C.gray[200] }}>
                      <div className="h-full rounded-full transition-all" style={{ width:pwStr.w, background:pwStr.color }}/>
                    </div>
                    <span className="text-xs font-bold w-12 text-right" style={{ color:pwStr.color }}>{pwStr.label}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
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
                <input type={showCpw?'text':'password'} value={confirmPw}
                  onChange={e=>{ setConfirmPw(e.target.value); setFieldErr(p=>({...p,confirmPw:''})) }}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border:`2px solid ${fieldErr.confirmPw?C.rose:confirmPw.length>0&&password===confirmPw?C.green:C.gray[200]}`,
                    color:C.gray[800], background:'#fff'
                  }}
                  onFocus={e=>e.target.style.borderColor=C.orange}
                  onBlur={e=>{ if(confirmPw.length>0) e.target.style.borderColor=password===confirmPw?C.green:C.rose; else e.target.style.borderColor=C.gray[200] }}
                  required/>
                <button type="button" onClick={()=>setShowCpw(p=>!p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}>
                  {showCpw?<EyeOff size={18}/>:<Eye size={18}/>}
                </button>
              </Field>

              {confirmPw.length > 0 && (
                <p className="text-xs flex items-center gap-1 -mt-2" style={{ color:password===confirmPw?C.green:C.rose }}>
                  {password===confirmPw?<><CheckCircle size={11}/> Passwords match!</>:<><XCircle size={11}/> Passwords do not match</>}
                </p>
              )}

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <div onClick={()=>setAgreeTerms(p=>!p)}
                    className="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                    style={{ borderColor:fieldErr.terms?C.rose:agreeTerms?C.navy:C.gray[300], background:agreeTerms?C.navy:'transparent' }}>
                    {agreeTerms&&<Check size={12} className="text-white"/>}
                  </div>
                  <span className="text-sm leading-relaxed" style={{ color:C.gray[600] }}>
                    I agree to iKPACE's{' '}
                    <a href="/terms" className="font-semibold hover:underline" style={{ color:C.navy }}>Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="font-semibold hover:underline" style={{ color:C.navy }}>Privacy Policy</a>
                  </span>
                </label>
                {fieldErr.terms&&<p className="mt-1 ml-8 text-xs" style={{ color:C.rose }}>{fieldErr.terms}</p>}
              </div>

              {/* Summary */}
              <div className="rounded-2xl px-4 py-3 flex items-center gap-3"
                style={{ background:`${C.navy}08`, border:`1px solid ${C.navy}15` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                  {fullName.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate" style={{ color:C.navy }}>{fullName}</p>
                  <p className="text-xs truncate" style={{ color:C.gray[500] }}>{email}</p>
                  <p className="text-xs font-semibold" style={{ color:C.green }}>📞 {phoneDialCode}{phoneDigits}</p>
                </div>
                <button type="button" onClick={()=>setStep(1)}
                  className="text-xs font-semibold hover:underline flex-shrink-0" style={{ color:C.orange }}>Edit</button>
              </div>

              {/* Submit */}
              <button type="submit" disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70"
                style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})`, boxShadow:`0 4px 20px ${C.navy}30` }}>
                {loading
                  ? <><div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"/>Creating your account…</>
                  : <><Rocket size={16}/> Create Account &amp; Start Learning</>}
              </button>

              <p className="text-center text-xs" style={{ color:C.gray[400] }}>
                🔒 Your data is encrypted and never shared with third parties.
              </p>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}
