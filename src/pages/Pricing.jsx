// src/pages/Pricing.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Check, Star, Zap, Shield, Users, Target, Gift, 
  Award, Clock, TrendingUp, Sparkles, Rocket, Crown,
  BadgeCheck, Heart, MessageCircle, BookOpen,
  Globe, Lock, Medal, ThumbsUp,
  ChevronRight, PlayCircle, Video, Download, Headphones,
  Briefcase, Code, Palette, Megaphone,
  Brain, ArrowRight, ChevronDown, ChevronUp, X, Phone
} from "lucide-react";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  navy:     '#1A3D7C',
  navyDark: '#0F2655',
  navyMid:  '#2F5EA8',
  orange:   '#FF7A00',
  orangeL:  '#FF9A3C',
  green:    '#008F4C',
  yellow:   '#E6B800',
  teal:     '#0D9488',
  purple:   '#7C3AED',
  rose:     '#E11D48',
  amber:    '#D97706',
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 800:'#1E293B'
  }
}

// ─── Course images (Unsplash) ─────────────────────────────────────────────────
const COURSE_IMAGES = {
  'virtual-assistant-pro':     'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=500&auto=format&fit=crop&q=80',
  'social-media-marketing':    'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&auto=format&fit=crop&q=80',
  'canva-graphic-design':      'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=500&auto=format&fit=crop&q=80',
  'smart-kids-coding':         'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80',
  'freelancing-online-income': 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=80',
  'ai-prompt-engineering':     'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=500&auto=format&fit=crop&q=80',
}

const COURSE_GRADIENTS = {
  'virtual-assistant-pro':     `linear-gradient(135deg,${C.navyDark},${C.navyMid})`,
  'social-media-marketing':    `linear-gradient(135deg,${C.orange},${C.amber})`,
  'canva-graphic-design':      `linear-gradient(135deg,${C.green},${C.teal})`,
  'smart-kids-coding':         `linear-gradient(135deg,${C.purple},#9B59B6)`,
  'freelancing-online-income': `linear-gradient(135deg,${C.amber},${C.yellow})`,
  'ai-prompt-engineering':     `linear-gradient(135deg,#06B6D4,${C.purple})`,
}

export default function Pricing() {
  const navigate = useNavigate();
  const [coupon,        setCoupon]        = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  const [couponDiscount,setCouponDiscount]= useState(0);
  const [activeFaq,     setActiveFaq]     = useState(null);
  const [showReferral,  setShowReferral]  = useState(false);
  const [showPromo,     setShowPromo]     = useState(true);

  const BASE_PRICE = 7; // USD

  const applyCoupon = () => {
    const c = coupon.toLowerCase();
    const codes = { ikpace20:20, student50:50, ambassador:30, earlybird:25 };
    if (codes[c]) {
      setAppliedCoupon(true);
      setCouponDiscount(codes[c]);
    } else {
      alert("Invalid code. Try: IKPACE20, STUDENT50, AMBASSADOR or EARLYBIRD");
    }
  };

  const finalPrice = appliedCoupon
    ? Math.round(BASE_PRICE * (1 - couponDiscount / 100))
    : BASE_PRICE;

  const stats = [
    { number:"130+", label:"Happy Students",  color:C.navy,   icon:<Users size={20}/> },
    { number:"4.9",  label:"Average Rating",  color:C.orange, icon:<Star size={20}/>  },
    { number:"6",    label:"Courses Available",color:C.green,  icon:<BookOpen size={20}/> },
    { number:"100%", label:"Certificate Included",color:C.amber,icon:<Award size={20}/> },
  ];

  const included = [
    { icon:<Video size={18}/>,       color:C.navy,   text:"HD Video Lessons"              },
    { icon:<Download size={18}/>,    color:C.orange, text:"Downloadable Resources"        },
    { icon:<Award size={18}/>,       color:C.green,  text:"Certificate of Completion"     },
    { icon:<Globe size={18}/>,       color:C.teal,   text:"Lifetime Access — Never Expires"},
    { icon:<Target size={18}/>,      color:C.purple, text:"Practical Assignments"         },
    { icon:<MessageCircle size={18}/>,color:C.amber, text:"Community Forum Access"        },
    { icon:<Phone size={18}/>,       color:C.navy,   text:"Mobile-Friendly Learning"      },
    { icon:<Shield size={18}/>,      color:C.green,  text:"Dedicated Student Support"     },
  ];

  const courses = [
    { id:"virtual-assistant-pro",     name:"Virtual Assistant Pro",      icon:<Briefcase size={18}/>,  color:C.navy,   tag:"Popular",  duration:"8 Wks" },
    { id:"social-media-marketing",    name:"Social Media Marketing",     icon:<Megaphone size={18}/>,  color:C.orange, tag:"In Demand",duration:"8 Wks" },
    { id:"canva-graphic-design",      name:"Canva & Graphic Design",     icon:<Palette size={18}/>,    color:C.green,  tag:"Creative", duration:"8 Wks" },
    { id:"smart-kids-coding",         name:"Smart Kids Coding",          icon:<Code size={18}/>,       color:C.purple, tag:"Ages 6-12",duration:"4 Wks" },
    { id:"freelancing-online-income", name:"Freelancing & Online Income",icon:<TrendingUp size={18}/>, color:C.amber,  tag:"High Demand",duration:"4 Wks"},
    { id:"ai-prompt-engineering",     name:"AI Prompt Engineering",      icon:<Brain size={18}/>,      color:"#06B6D4",tag:"🆕 New",   duration:"8 Wks" },
  ];

  const testimonials = [
    { name:"Sarah Mensah",  role:"VA Graduate",         text:"I got my first client 3 weeks after finishing. Changed my income completely.", rating:5, init:"SM", color:C.navy   },
    { name:"Kwame Asante",  role:"Freelancing Student", text:"Great value. Practical and straight to the point. Worth every pesewa.",       rating:5, init:"KA", color:C.orange },
    { name:"Abena Osei",    role:"Canva Graduate",      text:"I now design for 4 businesses. The skills I got here are immediately marketable.", rating:5, init:"AO", color:C.green },
    { name:"Kofi Darko",    role:"SMM Graduate",        text:"Running ads for 2 clients already. The Meta Ads module alone was worth it.",   rating:5, init:"KD", color:C.purple },
  ];

  const faqs = [
    { q:"When do I get access after payment?",   a:"Immediately. Access is activated within seconds of your Paystack payment confirmation. You can start learning right away." },
    { q:"Do I get a certificate?",               a:"Yes! Every course includes a recognised iKPACE certificate when you complete all lessons and submit your final assignment." },
    { q:"What payment methods are accepted?",    a:"We accept MTN MoMo, Vodafone Cash, AirtelTigo, Visa, Mastercard, and bank transfer — all via Paystack." },
    { q:"Is my payment secure?",                 a:"100%. All payments go through Paystack, which is PCI DSS Level 1 compliant — the highest payment security standard in Africa." },
    { q:"Can I study on my phone?",              a:"Yes. All courses are fully mobile-optimised. Study on any phone, tablet, or laptop at any time." },
    { q:"Can I enrol in multiple courses?",      a:"Absolutely. Enrol in as many courses as you like. Our bundle deal gives you 3 courses for $15, saving you $6." },
    { q:"Do I need any prior experience?",       a:"No. All courses start from beginner level with clear step-by-step guidance. No experience required." },
    { q:"How long is the course access?",        a:"Lifetime. Once you enrol, the course and all its materials are yours forever — including any future updates." },
  ];

  const toggleFaq = (i) => setActiveFaq(activeFaq === i ? null : i);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background:C.gray[50] }}>

      {/* ── Promo strip ──────────────────────────────────────────────────── */}
      {showPromo && (
        <div className="relative py-2.5 px-10 text-white text-center text-xs font-bold"
          style={{ background:`linear-gradient(90deg,${C.navyDark},${C.navyMid},${C.orange})` }}>
          🔥 Launch Offer: All courses $7 each · Certificate included · 130+ students enrolled
          <button onClick={() => setShowPromo(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
            <X size={14}/>
          </button>
        </div>
      )}

      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5">
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Link to="/" className="hover:underline font-medium" style={{ color:C.navy }}>Home</Link>
          <ChevronRight size={12}/>
          <span className="font-semibold" style={{ color:C.gray[700] }}>Pricing</span>
        </div>
      </div>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-14 sm:py-20"
        style={{ background:`linear-gradient(155deg,${C.navyDark} 0%,${C.navy} 50%,${C.navyMid} 100%)` }}>
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.08]" style={{ background:C.orange }}/>
        <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full opacity-[0.07]" style={{ background:C.yellow }}/>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-bold mb-5 border border-white/20">
            <Sparkles size={13} style={{ color:C.yellow }}/> Simple, honest pricing — no hidden fees
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight mb-5">
            Invest in <span style={{ color:C.orangeL }}>Your Future</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Join <strong className="text-white">130+ students</strong> who started their learning journey.
            Every course is just <strong className="text-white">$7 USD</strong> — lifetime access included.
          </p>

          {/* Big price pill */}
          <div className="inline-flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl px-10 py-6 mb-10">
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Per Course</p>
            <div className="flex items-start gap-1">
              <span className="text-white text-lg font-black mt-3">$</span>
              <span className="text-white font-black" style={{ fontSize:'68px', lineHeight:1 }}>7</span>
            </div>
            <p className="text-white/50 text-xs mt-1">VAT inclusive · No subscription</p>
          </div>

          {/* Stat pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {[
              { emoji:'👥', label:'130+ Students Enrolled'  },
              { emoji:'⭐', label:'4.9 Average Rating'       },
              { emoji:'🏆', label:'Certificate on Completion'},
              { emoji:'♾️', label:'Lifetime Course Access'   },
            ].map((p,i) => (
              <div key={i} className="flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl">
                <span className="text-sm">{p.emoji}</span>
                <span className="text-white text-[11px] font-semibold">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS GRID ══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 mb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((s,i) => (
            <div key={i} className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg text-center hover:shadow-xl transition-all"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center mx-auto mb-3"
                style={{ background:`${s.color}12`, color:s.color }}>
                {s.icon}
              </div>
              <p className="font-black text-xl sm:text-2xl mb-0.5" style={{ color:s.color }}>{s.number}</p>
              <p className="text-[11px]" style={{ color:C.gray[400] }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SINGLE PLAN CARD ════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ border:`1px solid ${C.gray[200]}` }}>
          <div className="h-2" style={{ background:`linear-gradient(90deg,${C.navy},${C.orange},${C.green})` }}/>
          <div className="p-6 sm:p-10">
            <div className="grid lg:grid-cols-2 gap-10">
              {/* Left — plan details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white"
                    style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                    <Crown size={22}/>
                  </div>
                  <div>
                    <h2 className="font-black text-xl" style={{ color:C.navy }}>iKPACE Course Access</h2>
                    <p className="text-sm" style={{ color:C.gray[400] }}>Everything you need — one price</p>
                  </div>
                </div>

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-black text-5xl" style={{ color:C.navy }}>
                    ${finalPrice}
                  </span>
                  <span className="text-sm font-semibold" style={{ color:C.gray[400] }}>per course</span>
                </div>
                {appliedCoupon && (
                  <p className="text-sm font-bold mb-1" style={{ color:C.green }}>
                    ✅ {couponDiscount}% discount applied — you save ${BASE_PRICE - finalPrice}!
                  </p>
                )}
                <p className="text-sm mb-7" style={{ color:C.gray[400] }}>One-time · No subscription · No renewal fees</p>

                <ul className="space-y-3 mb-8">
                  {included.map((it,i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background:`${it.color}12`, color:it.color }}>
                        {it.icon}
                      </div>
                      <span className="text-sm font-medium" style={{ color:C.gray[700] }}>{it.text}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/courses"
                  className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-black text-base text-white hover:opacity-90 hover:-translate-y-0.5 hover:shadow-xl transition-all shadow-lg"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                  <Rocket size={17}/> Browse All Courses <ArrowRight size={16}/>
                </Link>
                <p className="text-center text-xs mt-3 flex items-center justify-center gap-1.5" style={{ color:C.gray[400] }}>
                  <Shield size={11} style={{ color:C.green }}/> Secured by Paystack · 256-bit SSL Encrypted
                </p>
              </div>

              {/* Right — course image grid */}
              <div>
                <p className="text-xs font-black uppercase tracking-wider mb-4" style={{ color:C.gray[400] }}>
                  Choose from 6 Courses — All $7
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {courses.map(c => (
                    <Link key={c.id} to={`/checkout/${c.id}`}
                      className="group relative rounded-2xl overflow-hidden h-28 flex flex-col justify-end hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      style={{ border:`1px solid ${C.gray[200]}` }}>
                      <img src={COURSE_IMAGES[c.id]} alt={c.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"/>
                      <div className="absolute inset-0 opacity-70" style={{ background:COURSE_GRADIENTS[c.id] }}/>
                      <div className="relative z-10 p-3">
                        <p className="text-white font-black text-xs leading-tight">{c.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/70 text-[10px]">{c.duration}</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-white/20 text-white font-bold">{c.tag}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <p className="text-[11px] text-center mt-3" style={{ color:C.gray[400] }}>
                  Click any course to enroll · $7 each
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ COUPON SECTION ══════════════════════════════════════════════════ */}
      <section className="max-w-lg mx-auto px-4 sm:px-6 mb-14">
        <div className="bg-white rounded-3xl p-6 shadow-lg" style={{ border:`1px solid ${C.gray[200]}` }}>
          <h3 className="font-black text-lg text-center mb-1" style={{ color:C.navy }}>
            🎁 Have a Promo Code?
          </h3>
          <p className="text-xs text-center mb-5" style={{ color:C.gray[400] }}>Enter your code below to unlock a special discount</p>

          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter coupon code e.g. IKPACE20"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              disabled={appliedCoupon}
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{ background:C.gray[50], border:`2px solid ${C.gray[200]}`, color:C.gray[800] }}
              onFocus={e => e.target.style.borderColor = C.navy}
              onBlur={e => e.target.style.borderColor = C.gray[200]}
            />
            <button onClick={applyCoupon} disabled={appliedCoupon}
              className="px-5 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-50"
              style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
              Apply
            </button>
          </div>

          {appliedCoupon && (
            <div className="mb-4 p-3 rounded-2xl flex items-center gap-2"
              style={{ background:`${C.green}10`, border:`1px solid ${C.green}30` }}>
              <Check size={15} style={{ color:C.green }}/>
              <span className="text-sm font-bold" style={{ color:C.green }}>
                {couponDiscount}% off applied! New price: ${finalPrice}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { code:'IKPACE20',  off:'20% off', color:C.navy   },
              { code:'STUDENT50', off:'50% off', color:C.orange },
              { code:'AMBASSADOR',off:'30% off', color:C.green  },
              { code:'EARLYBIRD', off:'25% off', color:C.purple },
            ].map((cd,i) => (
              <button key={i} onClick={() => setCoupon(cd.code)}
                className="text-center p-2.5 rounded-xl border-2 hover:shadow-md transition-all"
                style={{ borderColor:`${cd.color}25`, background:`${cd.color}08` }}>
                <p className="text-[10px] font-black font-mono" style={{ color:cd.color }}>{cd.code}</p>
                <p className="text-[9px] mt-0.5" style={{ color:C.gray[400] }}>{cd.off}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ══ BUNDLE DEAL ═════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
        <div className="relative rounded-3xl overflow-hidden p-6 sm:p-10 text-white"
          style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy},${C.orange})` }}>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full opacity-15 bg-white"/>
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="text-4xl">🎁</div>
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 bg-white/20 border border-white/20 px-3 py-1 rounded-full text-xs font-black mb-3">
                <Zap size={11} style={{ color:C.yellow }}/> BUNDLE & SAVE
              </div>
              <h3 className="font-black text-2xl sm:text-3xl mb-2">3 Courses for $15</h3>
              <p className="text-white/75 text-sm mb-3">Choose any 3 courses — save $6. Build multiple income streams at once.</p>
              <div className="flex flex-wrap gap-2">
                {['$21 → $15','Save $6','3 Certificates'].map((b,i) => (
                  <span key={i} className="text-xs px-3 py-1.5 rounded-xl bg-white/15 border border-white/20 font-semibold">{b}</span>
                ))}
              </div>
            </div>
            <Link to="/contact"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm bg-white hover:shadow-xl transition-all hover:-translate-y-0.5 flex-shrink-0"
              style={{ color:C.navy }}>
              Claim Bundle <ArrowRight size={14}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHAT'S INCLUDED ═════════════════════════════════════════════════ */}
      <section className="py-12 mb-8" style={{ background:C.gray[100] }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-black text-2xl sm:text-3xl text-center mb-3" style={{ color:C.navy }}>
            ✅ Included in <span style={{ color:C.orange }}>Every Course</span>
          </h2>
          <p className="text-sm text-center mb-10 max-w-xl mx-auto" style={{ color:C.gray[400] }}>
            One price. Everything you need to learn, practice, and get certified.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {included.map((f,i) => (
              <div key={i} className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all"
                style={{ border:`1px solid ${C.gray[200]}` }}>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background:`${f.color}12`, color:f.color }}>
                  {f.icon}
                </div>
                <p className="font-black text-sm" style={{ color:C.navy }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ALL 6 COURSES ═══════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
        <h2 className="font-black text-2xl sm:text-3xl text-center mb-3" style={{ color:C.navy }}>
          All Courses — <span style={{ color:C.orange }}>$7 Each</span>
        </h2>
        <p className="text-sm text-center mb-10 max-w-xl mx-auto" style={{ color:C.gray[400] }}>
          Every course includes a certificate, lifetime access, and student support.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map(c => (
            <div key={c.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group"
              style={{ border:`1px solid ${C.gray[200]}` }}>
              <div className="relative h-40 overflow-hidden">
                <img src={COURSE_IMAGES[c.id]} alt={c.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                <div className="absolute inset-0 opacity-60" style={{ background:COURSE_GRADIENTS[c.id] }}/>
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-black px-2 py-1 rounded-full text-white bg-white/20 border border-white/30">{c.tag}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0">
                    {c.icon}
                  </div>
                  <div className="text-white">
                    <p className="font-black text-xs leading-tight">{c.name}</p>
                    <p className="text-[10px] opacity-70">{c.duration}</p>
                  </div>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <span className="font-black text-xl" style={{ color:C.navy }}>${finalPrice}</span>
                  <p className="text-[10px]" style={{ color:C.gray[400] }}>lifetime access</p>
                </div>
                <Link to={`/checkout/${c.id}`}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-white hover:opacity-90 transition-all"
                  style={{ background:COURSE_GRADIENTS[c.id] }}>
                  Enroll <ArrowRight size={11}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section className="py-12 mb-8" style={{ background:C.gray[100] }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-black text-2xl sm:text-3xl text-center mb-3" style={{ color:C.navy }}>
            What Our Students Say
          </h2>
          <div className="flex items-center justify-center gap-1 mb-10">
            {[...Array(5)].map((_,i) => <Star key={i} size={14} className="fill-current" style={{ color:C.yellow }}/>)}
            <span className="font-black text-sm ml-2" style={{ color:C.navy }}>4.9</span>
            <span className="text-sm ml-1" style={{ color:C.gray[400] }}>from 130+ students</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {testimonials.map((t,i) => (
              <div key={i} className="bg-white rounded-2xl p-5 hover:shadow-lg transition-all"
                style={{ border:`1px solid ${C.gray[200]}` }}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_,j) => <Star key={j} size={12} className="fill-current" style={{ color:C.yellow }}/>)}
                </div>
                <p className="text-sm leading-relaxed italic mb-4" style={{ color:C.gray[600] }}>"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                    style={{ background:t.color }}>{t.init}</div>
                  <div>
                    <p className="font-black text-sm" style={{ color:C.navy }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color:C.gray[400] }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ REFERRAL PROGRAM ════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-14">
        <div className="rounded-3xl p-6 sm:p-10 text-center"
          style={{ background:`linear-gradient(135deg,${C.navy}0D,${C.orange}0D)`, border:`1px solid ${C.gray[200]}` }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background:`${C.navy}15` }}>
            <Gift size={24} style={{ color:C.navy }}/>
          </div>
          <h3 className="font-black text-xl sm:text-2xl mb-2" style={{ color:C.navy }}>Refer & Earn</h3>
          <p className="text-sm sm:text-base mb-5 max-w-xl mx-auto" style={{ color:C.gray[500] }}>
            Share iKPACE with friends and earn <strong>20% commission</strong> on every sale. Your friend gets 10% off too!
          </p>
          <button onClick={() => setShowReferral(!showReferral)}
            className="px-7 py-3 rounded-2xl font-black text-sm text-white transition-all hover:opacity-90 hover:shadow-lg"
            style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
            {showReferral ? 'Hide Details' : 'Learn How It Works'}
          </button>

          {showReferral && (
            <div className="mt-5 grid sm:grid-cols-3 gap-4 text-left">
              {[
                { step:'1', title:'Share Your Link', desc:'Get your unique referral link from your dashboard after registering.' },
                { step:'2', title:'Friend Enrolls',  desc:'Your friend uses your link and enrolls in any iKPACE course.' },
                { step:'3', title:'Both Earn',        desc:'You get 20% commission. Your friend gets 10% off their course.' },
              ].map((s,i) => (
                <div key={i} className="bg-white rounded-2xl p-4" style={{ border:`1px solid ${C.gray[200]}` }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm mb-3"
                    style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>{s.step}</div>
                  <p className="font-black text-sm mb-1" style={{ color:C.navy }}>{s.title}</p>
                  <p className="text-xs" style={{ color:C.gray[500] }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ FAQ ═════════════════════════════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 mb-14">
        <h2 className="font-black text-2xl sm:text-3xl text-center mb-3" style={{ color:C.navy }}>
          Frequently Asked <span style={{ color:C.orange }}>Questions</span>
        </h2>
        <p className="text-sm text-center mb-10" style={{ color:C.gray[400] }}>Got questions? We have answers.</p>
        <div className="space-y-3">
          {faqs.map((faq,i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden transition-all"
              style={{ border:`1.5px solid ${activeFaq===i ? C.navy : C.gray[200]}` }}>
              <button onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-gray-50 transition">
                <span className="text-sm font-bold pr-4" style={{ color:C.navy }}>{faq.q}</span>
                <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                  style={{ background:activeFaq===i ? C.navy : C.gray[100] }}>
                  {activeFaq===i
                    ? <ChevronUp size={14} style={{ color:'white' }}/>
                    : <ChevronDown size={14} style={{ color:C.gray[400] }}/>}
                </div>
              </button>
              {activeFaq===i && (
                <div className="px-5 pb-5 border-t" style={{ borderColor:C.gray[100] }}>
                  <p className="text-sm leading-relaxed pt-3" style={{ color:C.gray[500] }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ══ FINAL CTA ═══════════════════════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative rounded-3xl overflow-hidden text-white text-center p-8 sm:p-14"
          style={{ background:`linear-gradient(145deg,${C.navyDark},${C.navy},${C.orange})` }}>
          <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full opacity-15 bg-white"/>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full text-xs font-black mb-5">
              <Sparkles size={12} style={{ color:C.yellow }}/> Start your journey today
            </div>
            <h2 className="font-black text-3xl sm:text-4xl mb-3 leading-tight">
              Still Have Questions?
            </h2>
            <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm sm:text-base">
              Our team is here to help you pick the right course and start learning today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/contact"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-sm bg-white hover:shadow-2xl hover:-translate-y-0.5 transition-all"
                style={{ color:C.navy }}>
                Contact Us
              </Link>
              <Link to="/courses"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm text-white border-2 border-white/30 hover:bg-white/10 transition-all">
                Browse Courses <ArrowRight size={15}/>
              </Link>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-5 mt-8 text-xs text-white/50">
              <span className="flex items-center gap-1"><Shield size={11}/> Secured by Paystack</span>
              <span className="flex items-center gap-1"><Lock size={11}/> 256-bit Encrypted</span>
              <span className="flex items-center gap-1"><BadgeCheck size={11}/> Certificate Included</span>
              <span className="flex items-center gap-1"><Globe size={11}/> Lifetime Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <div className="pb-10 text-center">
        <Link to="/" className="text-xs hover:underline inline-flex items-center gap-1" style={{ color:C.navy }}>
          ← Back to Home
        </Link>
      </div>

      <style>{`
        * { box-sizing: border-box }
        @media (max-width: 640px) { input, select, button { font-size: 16px !important } }
        .scrollbar-hide::-webkit-scrollbar { display: none }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none }
      `}</style>
    </div>
  );
}
