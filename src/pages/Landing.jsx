// src/pages/Landing.jsx
// NOTE: Navbar and Footer are rendered by your App/Layout component.
//       This file contains ONLY the page body — no duplicate header or footer.
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight, BookOpen, Users, Award, Star, CheckCircle,
  Clock, Globe, Shield, Zap, Gift, Rocket, Heart,
  ChevronRight, Flame, Bell, Send, RefreshCw,
  ChevronLeft, Plus, Minus, Mail, MapPin,
  Headphones, HelpCircle, Facebook, Twitter,
  Linkedin, Instagram
} from "lucide-react";

// ─── Brand tokens ──────────────────────────────────────────────────────────────
const C = {
  navy:        '#1A3D7C',
  navyDark:    '#0F2655',
  navyMid:     '#2F5EA8',
  orange:      '#FF7A00',
  orangeLight: '#FF9A3C',
  green:       '#008F4C',
  yellow:      '#E6B800',
  teal:        '#0D9488',
  amber:       '#D97706',
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A'
  }
};

// ─── All course data (your original data, untouched) ──────────────────────────
const courses = [
  {
    id: 'virtual-assistant-pro',
    title: 'Virtual Assistant Pro',
    description: 'Master client management, email, calendars & remote work tools. Land your first VA client.',
    duration: '8 Weeks', students: 32, rating: 4.9, price: 7,
    category: 'Career', level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop&q=80',
    features: ['Email Management', 'Calendar Mastery', 'Client Acquisition'],
    emoji: '💼',
  },
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    description: 'Build brands, run Meta Ads, master analytics & grow any account organically.',
    duration: '8 Weeks', students: 28, rating: 4.8, price: 7,
    category: 'Marketing', level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&auto=format&fit=crop&q=80',
    features: ['Meta Ads', 'Content Strategy', 'Analytics'],
    emoji: '📱',
  },
  {
    id: 'canva-graphic-design',
    title: 'Canva & Graphic Design',
    description: 'Design logos, brand identities, social kits & print materials. Build a real portfolio.',
    duration: '8 Weeks', students: 19, rating: 4.7, price: 7,
    category: 'Design', level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=600&auto=format&fit=crop&q=80',
    features: ['Logo Design', 'Brand Identity', 'Social Kits'],
    emoji: '🎨',
  },
  {
    id: 'smart-kids-coding',
    title: 'Smart Kids Coding',
    description: 'Introduce ages 6–12 to coding with Scratch. Build animations, stories & their own games.',
    duration: '4 Weeks', students: 12, rating: 4.9, price: 7,
    category: 'Kids', level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80',
    features: ['Scratch Coding', 'Game Design', 'Animation'],
    emoji: '🚀',
  },
  {
    id: 'freelancing-online-income',
    title: 'Freelancing & Online Income',
    description: 'Set up your Upwork/Fiverr profile, find clients, price your services & earn online.',
    duration: '4 Weeks', students: 21, rating: 4.8, price: 7,
    category: 'Business', level: 'Beginner',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=80',
    features: ['Upwork & Fiverr', 'Client Acquisition', 'Pricing Strategy'],
    emoji: '💰',
  },
  {
    id: 'ai-prompt-engineering',
    title: 'AI Prompt Engineering',
    description: 'Master ChatGPT, Midjourney & AI automation. Monetise your AI skills today.',
    duration: '8 Weeks', students: 18, rating: 4.9, price: 7,
    category: 'Tech', level: 'Intermediate',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80',
    features: ['ChatGPT & Claude', 'Midjourney', 'AI Automation'],
    emoji: '🤖',
  },
];

const categories = ['All', 'Career', 'Marketing', 'Design', 'Kids', 'Business', 'Tech'];

// ─── Hero slides (your original data) ─────────────────────────────────────────
const heroSlides = [
  {
    badge:   "🔥 Africa's Most Affordable Learning Platform",
    line1:   'Learn Skills That',
    line2:   'Pay The Bills',
    sub:     'Professional courses starting at just $7. Real skills, real results, real income.',
    cta:     { label: 'Start Learning Today', to: '/register' },
    ctaAlt:  { label: 'Browse Courses', to: '/courses' },
    image:   'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1400&auto=format&fit=crop&q=80',
    stats:   [{ n: '130+', l: 'Students' }, { n: '4.8★', l: 'Rating' }, { n: '6', l: 'Courses' }],
  },
  {
    badge:   '💼 Most Popular Course',
    line1:   'Become a Certified',
    line2:   'Virtual Assistant',
    sub:     'Work remotely for international clients. Complete the 8-week program and land your first client.',
    cta:     { label: 'Join VA Pro', to: '/course/virtual-assistant-pro' },
    ctaAlt:  { label: 'See Curriculum', to: '/course-curriculum/virtual-assistant-pro' },
    image:   'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1400&auto=format&fit=crop&q=80',
    stats:   [{ n: '32', l: 'Enrolled' }, { n: '8', l: 'Weeks' }, { n: '$7', l: 'Only' }],
  },
  {
    badge:   '🤖 New — Most In-Demand Skill 2025',
    line1:   'Master AI Prompt',
    line2:   'Engineering',
    sub:     'Learn ChatGPT, Claude, Midjourney & automation tools. Monetise your AI expertise.',
    cta:     { label: 'Enroll in AI Course', to: '/course/ai-prompt-engineering' },
    ctaAlt:  { label: 'Learn More', to: '/course-curriculum/ai-prompt-engineering' },
    image:   'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1400&auto=format&fit=crop&q=80',
    stats:   [{ n: '18', l: 'Enrolled' }, { n: '8', l: 'Weeks' }, { n: '4.9★', l: 'Rating' }],
  },
];

// ─── Testimonials (your original data) ────────────────────────────────────────
const testimonials = [
  { name: 'Sarah Johnson',   role: 'VA Student',          text: "The VA course gave me the confidence to start freelancing. I'm now working with my first client from the UK!", rating: 5, avatar: 'SJ', color: C.navy,    course: 'Virtual Assistant Pro' },
  { name: 'Michael Kwame',   role: 'Freelancing Student', text: "I set up my Upwork profile on week 2 and got my first $50 gig before the course even ended. Highly recommend!", rating: 5, avatar: 'MK', color: C.orange,  course: 'Freelancing & Online Income' },
  { name: 'Amina Okafor',    role: 'AI Course Student',   text: "The AI course helped me understand tools I was afraid to touch before. Now I create AI content for clients daily.", rating: 5, avatar: 'AO', color: C.green,   course: 'AI Prompt Engineering' },
  { name: 'James Wilson',    role: 'Design Student',      text: "I designed my church's entire brand kit after week 4. The Canva course is so practical and easy to follow.", rating: 5, avatar: 'JW', color: C.teal,    course: 'Canva & Graphic Design' },
  { name: 'Patience Mensah', role: 'Kids Coding Parent',  text: "My son (8) built his first Scratch game in week 2. He now asks to do coding every evening. Best investment!", rating: 5, avatar: 'PM', color: C.amber,   course: 'Smart Kids Coding' },
  { name: 'Ama Asante',      role: 'SMM Student',         text: "I ran my first Facebook ad campaign on week 5 and got 200 new followers for my client. The results were real!", rating: 5, avatar: 'AA', color: C.navyMid, course: 'Social Media Marketing' },
];

// ─── FAQs (your original data) ────────────────────────────────────────────────
const faqs = [
  { q: 'How much do courses cost?',           a: 'All iKPACE courses are priced at just $7 per course — making professional education accessible to everyone.' },
  { q: 'Do I need experience to start?',       a: 'No prior experience needed. Everything is designed for beginners from the very foundations.' },
  { q: 'Are courses self-paced or scheduled?', a: 'Most courses are self-paced so you can learn on your own schedule, with optional live sessions included.' },
  { q: 'What do I get when I enroll?',         a: 'Lifetime access to all video lessons, downloadable resources, assignments, community access, and a certificate.' },
  { q: 'Is there a certificate?',              a: 'Yes! Every iKPACE course comes with a certificate of completion once you finish all modules and assignments.' },
  { q: 'How do I pay?',                        a: 'We accept Paystack (card, mobile money, bank transfer) and other local payment methods across Africa.' },
  { q: 'Do you offer scholarships?',           a: 'Yes! We offer a Women in Tech scholarship with 50% tuition support for eligible female applicants.' },
];

// ─── How it works ──────────────────────────────────────────────────────────────
const howItWorks = [
  { step: 1, icon: '🎯', title: 'Pick Your Course',  desc: 'Choose from 6 career-focused courses designed for the African workforce.' },
  { step: 2, icon: '💳', title: 'Enroll for $7',     desc: 'Secure your spot with our affordable payment via Paystack or mobile money.' },
  { step: 3, icon: '📚', title: 'Start Learning',    desc: 'Access all video lessons, resources and assignments. Learn at your own pace.' },
  { step: 4, icon: '🏆', title: 'Get Certified',     desc: 'Complete the course, earn your certificate, and launch your new career.' },
];

// ─── Small reusable FAQ item ───────────────────────────────────────────────────
function FAQItem({ q, a, open, toggle }) {
  return (
    <div style={{ border: `1px solid ${C.gray[200]}`, borderRadius: 14, overflow: 'hidden', marginBottom: 8 }}>
      <button onClick={toggle} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 18px', background: open ? `${C.navy}06` : 'white', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 14, color: C.navy, lineHeight: 1.4 }}>{q}</span>
        <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: open ? C.navy : C.gray[100] }}>
          {open ? <Minus size={12} color="white" /> : <Plus size={12} color={C.gray[500]} />}
        </div>
      </button>
      {open && (
        <div style={{ padding: '0 18px 15px' }}>
          <p style={{ fontSize: 13, color: C.gray[500], lineHeight: 1.7, margin: 0 }}>{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Landing() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCat,  setSelectedCat]  = useState('All');
  const [savedCourses, setSavedCourses] = useState([]);
  const [openFaq,      setOpenFaq]      = useState(null);
  const [emailVal,     setEmailVal]     = useState('');
  const [subscribed,   setSubscribed]   = useState(false);
  const [countdown,    setCountdown]    = useState({ d: 2, h: 14, m: 30, s: 45 });

  const filtered = selectedCat === 'All' ? courses : courses.filter(c => c.category === selectedCat);
  const dupT     = [...testimonials, ...testimonials, ...testimonials];

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(p => {
        if (p.s > 0) return { ...p, s: p.s - 1 };
        if (p.m > 0) return { ...p, m: p.m - 1, s: 59 };
        if (p.h > 0) return { ...p, h: p.h - 1, m: 59, s: 59 };
        if (p.d > 0) return { ...p, d: p.d - 1, h: 23, m: 59, s: 59 };
        return p;
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // Hero auto-slide
  useEffect(() => {
    const iv = setInterval(() => setCurrentSlide(p => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(iv);
  }, []);

  // SEO
  useEffect(() => {
    document.title = 'iKPACE – Learn Smarter Online | Tech School & Digital Skills Courses';
  }, []);

  const toggleSave = (id) => setSavedCourses(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);
  const padZ = n => String(n).padStart(2, '0');

  // ─── inline style shorthands ────────────────────────────────────────────────
  const sectionPad = { padding: '56px 24px' };
  const maxW       = { maxWidth: 1200, margin: '0 auto' };
  const maxWNarrow = { maxWidth: 760, margin: '0 auto' };
  const pill       = (bg, color) => ({ display: 'inline-block', background: bg, color, padding: '5px 14px', borderRadius: 30, fontSize: 12, fontWeight: 700, marginBottom: 12 });

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: 'white', overflowX: 'hidden' }}>

      {/* ════════════════════════════════════════════════════════════════
          1. PROMO BANNER — scrolling text
      ════════════════════════════════════════════════════════════════ */}
      <div style={{ background: `linear-gradient(90deg,${C.navyDark},${C.navyMid})`, padding: '10px 0', overflow: 'hidden' }}>
        <div style={{ display: 'inline-flex', animation: 'marquee 32s linear infinite', width: 'max-content', alignItems: 'center', gap: 0 }}>
          {[...Array(4)].map((_, rep) => (
            <span key={rep} style={{ display: 'inline-flex', alignItems: 'center', gap: 20, color: 'white', fontSize: 13, fontWeight: 600, paddingRight: 48, whiteSpace: 'nowrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Zap size={12} color={C.yellow} /> All courses $7 only</span>
              <span style={{ color: C.yellow }}>★</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Award size={12} color={C.green} /> Certificate on completion</span>
              <span style={{ color: C.yellow }}>★</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Globe size={12} color="#67E8F9" /> Learn from anywhere in Africa</span>
              <span style={{ color: C.yellow }}>★</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><Flame size={12} color="#FCA5A5" /> New: AI Prompt Engineering now live</span>
              <span style={{ color: C.yellow }}>★</span>
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          2. HERO SLIDER
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '78vh', overflow: 'hidden' }}>
        {heroSlides.map((slide, i) => (
          <div key={i} style={{ position: 'absolute', inset: 0, opacity: i === currentSlide ? 1 : 0, transition: 'opacity 0.9s ease', zIndex: i === currentSlide ? 1 : 0 }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(110deg, ${C.navyDark}F2 0%, ${C.navy}CC 45%, ${C.navyMid}80 70%, transparent 100%)` }} />
          </div>
        ))}

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, ...maxW, padding: 'clamp(72px,10vw,110px) 24px clamp(56px,8vw,90px)', display: 'flex', alignItems: 'center', minHeight: '78vh' }}>
          {heroSlides.map((slide, i) => (
            <div key={i} style={{ display: i === currentSlide ? 'block' : 'none', maxWidth: 620 }}>
              <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(6px)', color: 'white', padding: '5px 16px', borderRadius: 30, fontSize: 13, fontWeight: 700, marginBottom: 18, border: '1px solid rgba(255,255,255,0.2)' }}>
                {slide.badge}
              </div>
              <h1 style={{ color: 'white', fontSize: 'clamp(30px,5.5vw,56px)', fontWeight: 900, lineHeight: 1.1, marginBottom: 14 }}>
                {slide.line1}<br />
                <span style={{ color: C.orangeLight }}>{slide.line2}</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'clamp(14px,2vw,17px)', lineHeight: 1.65, marginBottom: 26, maxWidth: 500 }}>{slide.sub}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 32 }}>
                <Link to={slide.cta.to} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `linear-gradient(135deg,${C.orange},${C.orangeLight})`, color: 'white', padding: '12px 26px', borderRadius: 12, fontWeight: 800, fontSize: 14, textDecoration: 'none', boxShadow: '0 4px 18px rgba(255,122,0,0.38)' }}>
                  {slide.cta.label} <ArrowRight size={15} />
                </Link>
                <Link to={slide.ctaAlt.to} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.13)', backdropFilter: 'blur(8px)', color: 'white', padding: '12px 26px', borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: 'none', border: '1.5px solid rgba(255,255,255,0.28)' }}>
                  {slide.ctaAlt.label}
                </Link>
              </div>
              <div style={{ display: 'flex', gap: 28 }}>
                {slide.stats.map((s, si) => (
                  <div key={si}>
                    <p style={{ color: 'white', fontSize: 22, fontWeight: 900, margin: 0 }}>{s.n}</p>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, margin: 0 }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Prev / Next arrows */}
        {[['left', () => setCurrentSlide(p => (p - 1 + heroSlides.length) % heroSlides.length), <ChevronLeft size={19} />],
          ['right', () => setCurrentSlide(p => (p + 1) % heroSlides.length), <ChevronRight size={19} />]
        ].map(([side, fn, icon]) => (
          <button key={side} onClick={fn} style={{ position: 'absolute', [side]: 14, top: '50%', transform: 'translateY(-50%)', zIndex: 3, width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.16)', border: '1px solid rgba(255,255,255,0.22)', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {icon}
          </button>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 3, display: 'flex', gap: 8 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: i === currentSlide ? 26 : 8, height: 8, borderRadius: 4, background: i === currentSlide ? C.orange : 'rgba(255,255,255,0.38)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. COURSES — immediately after hero so users see them first
          Image size for your artwork: 600 × 380 px (16:10, JPG/PNG)
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'white', ...sectionPad }}>
        <div style={maxW}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={pill(`${C.orange}15`, C.orange)}>🎓 OUR COURSES</span>
            <h2 style={{ color: C.navy, fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, marginBottom: 8 }}>
              Start Learning Any <span style={{ color: C.orange }}>Skill Today</span>
            </h2>
            <p style={{ color: C.gray[500], fontSize: 15, marginBottom: 24 }}>
              All courses just <strong style={{ color: C.navy }}>$7</strong> · Beginner-friendly · Certificate included
            </p>

            {/* Category filter — active = navy, inactive = white */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setSelectedCat(cat)} style={{ padding: '8px 18px', borderRadius: 30, fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s', background: selectedCat === cat ? C.navy : 'white', color: selectedCat === cat ? 'white' : C.gray[600], border: `1.5px solid ${selectedCat === cat ? C.navy : C.gray[200]}`, boxShadow: selectedCat === cat ? `0 3px 12px ${C.navy}25` : 'none' }}>
                  {cat === 'All' ? '🎯 All Courses' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px,1fr))', gap: 22 }}>
            {filtered.map(course => (
              <div key={course.id}
                style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.07)', border: `1px solid ${C.gray[200]}`, display: 'flex', flexDirection: 'column', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 14px rgba(0,0,0,0.07)'; }}>

                {/* Image — artwork size: 600 × 380 px */}
                <div style={{ position: 'relative', width: '100%', height: 196, overflow: 'hidden', background: C.gray[100], flexShrink: 0 }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <span style={{ position: 'absolute', top: 11, left: 11, background: C.navy, color: 'white', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{course.category}</span>
                  <span style={{ position: 'absolute', top: 11, right: 44, background: 'rgba(255,255,255,0.92)', color: C.gray[700], padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{course.level}</span>
                  <button onClick={() => toggleSave(course.id)} style={{ position: 'absolute', top: 8, right: 10, background: 'rgba(255,255,255,0.92)', border: 'none', width: 30, height: 30, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 1px 6px rgba(0,0,0,0.1)' }}>
                    <Heart size={13} style={{ color: savedCourses.includes(course.id) ? '#EF4444' : C.gray[400], fill: savedCourses.includes(course.id) ? '#EF4444' : 'none' }} />
                  </button>
                  <div style={{ position: 'absolute', bottom: 10, left: 11, width: 34, height: 34, borderRadius: 10, background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>{course.emoji}</div>
                </div>

                {/* Card body */}
                <div style={{ padding: '16px 17px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 800, fontSize: 15, color: C.navy, lineHeight: 1.3, marginBottom: 6 }}>{course.title}</h3>
                  <p style={{ color: C.gray[500], fontSize: 13, lineHeight: 1.55, marginBottom: 11, flex: 1 }}>{course.description}</p>

                  {/* Features */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
                    {course.features.map((f, i) => (
                      <span key={i} style={{ background: `${C.navy}0d`, color: C.navy, padding: '3px 9px', borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{f}</span>
                    ))}
                  </div>

                  {/* Stats row */}
                  <div style={{ display: 'flex', gap: 12, marginBottom: 14, color: C.gray[400], fontSize: 12 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Clock size={11} /> {course.duration}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Users size={11} /> {course.students}+ students</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Star size={11} style={{ color: C.yellow, fill: C.yellow }} /> {course.rating}</span>
                  </div>

                  {/* Price + CTA — ALL "View Details" buttons are the SAME orange color */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTop: `1px solid ${C.gray[100]}` }}>
                    <div>
                      <span style={{ fontSize: 24, fontWeight: 900, color: C.navy }}>${course.price}</span>
                      <span style={{ fontSize: 11, color: C.gray[400], marginLeft: 4 }}></span>
                    </div>
                    <Link to={`/course/${course.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: C.orange, color: 'white', padding: '9px 18px', borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: 'none', boxShadow: `0 3px 10px ${C.orange}35` }}>
                      View Details <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View all */}
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: C.navy, color: 'white', padding: '12px 28px', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', boxShadow: `0 4px 16px ${C.navy}28` }}>
              Browse All Courses <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. WHY iKPACE
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.gray[50], ...sectionPad }}>
        <div style={maxW}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={pill(`${C.navy}12`, C.navy)}>⭐ WHY CHOOSE iKPACE</span>
            <h2 style={{ color: C.navy, fontSize: 'clamp(22px,4vw,34px)', fontWeight: 900, marginBottom: 10 }}>
              Everything You Need to <span style={{ color: C.orange }}>Succeed</span>
            </h2>
            <p style={{ color: C.gray[500], fontSize: 15, maxWidth: 500, margin: '0 auto' }}>
              We don't just teach skills. We prepare you for real careers and real income.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px,1fr))', gap: 16 }}>
            {[
              { icon: BookOpen,  color: C.navy,   title: 'Expert-Led Content',      desc: 'Courses built by industry professionals with up-to-date, real-world curriculum.' },
              { icon: Award,     color: C.orange, title: 'Certificates That Count',  desc: 'Earn a recognised iKPACE certificate on completion. Add it to your CV instantly.' },
              { icon: Users,     color: C.green,  title: 'Active Community',         desc: 'Join 130+ learners. Study groups, peer support, and mentor Q&As included.' },
              { icon: Clock,     color: C.teal,   title: 'Fully Self-Paced',         desc: 'No deadlines. No stress. Learn at your own speed from any device, anywhere.' },
              { icon: Shield,    color: C.navy,   title: 'Secure Payments',          desc: 'Powered by Paystack — card, mobile money, and bank transfer all accepted.' },
              { icon: Globe,     color: C.amber,  title: 'Learn From Anywhere',      desc: 'Fully mobile-friendly. Works on phone, tablet, or desktop — even on slow connections.' },
            ].map((f, i) => (
              <div key={i} style={{ background: 'white', borderRadius: 14, padding: '20px 18px', border: `1px solid ${C.gray[200]}`, display: 'flex', alignItems: 'flex-start', gap: 13 }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: `${f.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.icon size={19} style={{ color: f.color }} />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 14, color: C.navy, marginBottom: 4 }}>{f.title}</p>
                  <p style={{ fontSize: 13, color: C.gray[500], lineHeight: 1.55 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. COUNTDOWN DEAL BANNER
      ════════════════════════════════════════════════════════════════ */}
      <div style={{ background: `linear-gradient(135deg,${C.orange},${C.amber})`, padding: '18px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Flame size={22} color="white" />
            <div>
              <p style={{ color: 'white', fontWeight: 800, fontSize: 15, margin: 0 }}>🎁 Bundle Deal — 3 Courses for $15</p>
              <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13, margin: 0 }}>Save $6 when you enrol in 3 courses. Limited slots available.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {[{ v: padZ(countdown.d), l: 'Days' }, { v: padZ(countdown.h), l: 'Hours' }, { v: padZ(countdown.m), l: 'Mins' }, { v: padZ(countdown.s), l: 'Secs' }].map((t, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.2)', borderRadius: 9, padding: '7px 11px', textAlign: 'center', minWidth: 48 }}>
                <p style={{ color: 'white', fontSize: 18, fontWeight: 900, margin: 0, fontVariantNumeric: 'tabular-nums' }}>{t.v}</p>
                <p style={{ color: 'rgba(255,255,255,0.68)', fontSize: 10, margin: 0 }}>{t.l}</p>
              </div>
            ))}
            <Link to="/pricing" style={{ background: 'white', color: C.orange, padding: '9px 18px', borderRadius: 10, fontWeight: 800, fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              Claim <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          6. HOW IT WORKS
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'white', ...sectionPad }}>
        <div style={maxWNarrow}>
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <span style={pill(`${C.green}12`, C.green)}>🗺️ HOW IT WORKS</span>
            <h2 style={{ color: C.navy, fontSize: 'clamp(22px,4vw,32px)', fontWeight: 900 }}>
              From Signup to <span style={{ color: C.orange }}>Certified</span> in 4 Steps
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px,1fr))', gap: 18 }}>
            {howItWorks.map((step, i) => (
              <div key={i} style={{ background: C.gray[50], borderRadius: 14, padding: '24px 16px', textAlign: 'center', border: `1px solid ${C.gray[200]}`, position: 'relative' }}>
                <div style={{ position: 'absolute', top: -11, left: '50%', transform: 'translateX(-50%)', width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg,${C.navy},${C.orange})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 11, fontWeight: 900 }}>
                  {step.step}
                </div>
                <div style={{ fontSize: 34, marginTop: 8, marginBottom: 10 }}>{step.icon}</div>
                <p style={{ fontWeight: 800, fontSize: 13, color: C.navy, marginBottom: 6 }}>{step.title}</p>
                <p style={{ fontSize: 12, color: C.gray[500], lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: `linear-gradient(135deg,${C.orange},${C.orangeLight})`, color: 'white', padding: '12px 28px', borderRadius: 12, fontWeight: 800, fontSize: 14, textDecoration: 'none', boxShadow: `0 4px 16px ${C.orange}38` }}>
              <Rocket size={15} /> Get Started for $7
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          7. TESTIMONIALS — infinite marquee scroll
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg,${C.navyDark},${C.navy})`, padding: '56px 0', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', marginBottom: 32, padding: '0 24px' }}>
          <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.14)', color: 'white', padding: '5px 14px', borderRadius: 30, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>
            💬 STUDENT STORIES
          </span>
          <h2 style={{ color: 'white', fontSize: 'clamp(20px,4vw,30px)', fontWeight: 900, marginBottom: 5 }}>Real Feedback from Real Students</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Honest testimonials — no filters.</p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 72, background: `linear-gradient(90deg,${C.navyDark},transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 72, background: `linear-gradient(-90deg,${C.navy},transparent)`, zIndex: 2, pointerEvents: 'none' }} />
          <div style={{ display: 'inline-flex', gap: 16, animation: 'marquee-slow 50s linear infinite', width: 'max-content' }}>
            {dupT.map((t, i) => (
              <div key={i} style={{ width: 290, flexShrink: 0, background: 'rgba(255,255,255,0.09)', borderRadius: 14, padding: '18px', border: '1px solid rgba(255,255,255,0.11)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: 11, flexShrink: 0 }}>{t.avatar}</div>
                  <div>
                    <p style={{ color: 'white', fontWeight: 700, fontSize: 13, margin: 0 }}>{t.name}</p>
                    <p style={{ color: 'rgba(255,255,255,0.48)', fontSize: 11, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 2, marginBottom: 9 }}>
                  {[...Array(t.rating)].map((_, ri) => <Star key={ri} size={11} style={{ color: C.yellow, fill: C.yellow }} />)}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.84)', fontSize: 13, lineHeight: 1.6, marginBottom: 9 }}>{t.text}</p>
                <span style={{ display: 'inline-block', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.56)', padding: '2px 9px', borderRadius: 20, fontSize: 11 }}>📚 {t.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          8. FAQ
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: 'white', ...sectionPad }}>
        <div style={maxWNarrow}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <span style={pill(`${C.teal}12`, C.teal)}>❓ QUESTIONS & ANSWERS</span>
            <h2 style={{ color: C.navy, fontSize: 'clamp(20px,4vw,30px)', fontWeight: 900 }}>
              Got Questions? <span style={{ color: C.orange }}>We've Got Answers.</span>
            </h2>
          </div>
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} open={openFaq === i} toggle={() => setOpenFaq(openFaq === i ? null : i)} />
          ))}
          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: C.gray[400] }}>
            Still have questions?{' '}
            <Link to="/support" style={{ color: C.navy, fontWeight: 700 }}>Contact Support →</Link>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          9. NEWSLETTER
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: `linear-gradient(135deg,${C.orange},${C.amber})`, padding: '48px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <Bell size={30} color="white" style={{ marginBottom: 10 }} />
          <h2 style={{ color: 'white', fontSize: 'clamp(18px,3.5vw,26px)', fontWeight: 900, marginBottom: 8 }}>Stay in the Loop</h2>
          <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 14, marginBottom: 22 }}>New courses, live sessions, scholarships & free resources — no spam.</p>
          {!subscribed ? (
            <form onSubmit={e => { e.preventDefault(); if (emailVal.trim()) { setSubscribed(true); setEmailVal(''); } }} style={{ display: 'flex', gap: 9, maxWidth: 420, margin: '0 auto', flexWrap: 'wrap' }}>
              <input type="email" value={emailVal} onChange={e => setEmailVal(e.target.value)} placeholder="Enter your email address" required style={{ flex: 1, minWidth: 190, padding: '11px 15px', borderRadius: 10, border: 'none', fontSize: 13, outline: 'none', color: C.gray[800] }} />
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 20px', borderRadius: 10, background: C.navy, color: 'white', fontWeight: 800, fontSize: 13, border: 'none', cursor: 'pointer' }}>
                <Send size={13} /> Subscribe
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '13px 22px', maxWidth: 380, margin: '0 auto' }}>
              <CheckCircle size={18} color="white" />
              <p style={{ color: 'white', fontWeight: 700, margin: 0, fontSize: 14 }}>You're subscribed! 🎉</p>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          10. FINAL CTA
      ════════════════════════════════════════════════════════════════ */}
      <section style={{ background: C.gray[50], padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 540, margin: '0 auto' }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: `${C.navy}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, margin: '0 auto 18px' }}>🎓</div>
          <h2 style={{ color: C.navy, fontSize: 'clamp(24px,4.5vw,40px)', fontWeight: 900, lineHeight: 1.15, marginBottom: 12 }}>
            Your New Career Starts<br /><span style={{ color: C.orange }}>for Just $7</span>
          </h2>
          <p style={{ color: C.gray[500], fontSize: 15, lineHeight: 1.65, marginBottom: 26 }}>
            Join 130+ learners across Africa building marketable skills, earning certificates, and launching careers.
          </p>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: C.navy, color: 'white', padding: '13px 26px', borderRadius: 12, fontWeight: 800, fontSize: 14, textDecoration: 'none', boxShadow: `0 4px 16px ${C.navy}28` }}>
              <Rocket size={15} /> Start Learning Today <ArrowRight size={15} />
            </Link>
            <Link to="/courses" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: 'white', color: C.navy, padding: '13px 26px', borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: 'none', border: `2px solid ${C.navy}` }}>
              Browse Courses
            </Link>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 14 }}>
            {[{ icon: Shield, text: 'Secure Paystack Payment' }, { icon: RefreshCw, text: 'No hidden fees' }, { icon: Award, text: 'Certificate included' }, { icon: Globe, text: 'Learn from anywhere' }].map(({ icon: Icon, text }, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: C.gray[400] }}>
                <Icon size={12} style={{ color: C.green }} />{text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          FOOTER
          (Only here if Landing.jsx manages its own footer.
           If your App.jsx already renders a <Footer/>, DELETE this.)
      ════════════════════════════════════════════════════════════════ */}
      
        

      {/* ─── Animations ──────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-slow {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
        @media (max-width: 480px) {
          section { padding-left: 14px !important; padding-right: 14px !important; }
        }
      `}</style>
    </div>
  );
}
