// src/components/LiveChatSupport.jsx
import { useState, useRef, useEffect } from 'react'
import {
  MessageCircle, X, Send, Bot, User, Minimize2, Maximize2,
  Sparkles, Zap, Award, Clock, BookOpen, Heart, Star, Shield,
  ChevronRight, CheckCircle, CreditCard, Smartphone, Globe,
  Users, Target, TrendingUp, RefreshCw, Phone, Mail,
  Brain, Palette, Megaphone, Briefcase, Code, Rocket,
  BadgeCheck, Download, PlayCircle, Lock, ThumbsUp, Info
} from 'lucide-react'

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
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 800:'#1E293B'
  }
}

// ─── iKPACE Full Knowledge Base ───────────────────────────────────────────────
const KB = {
  platform: {
    name:      'iKPACE',
    tagline:   'Learn Smarter, Earn Better',
    founded:   '2024',
    mission:   'To make quality, career-focused education accessible and affordable across Africa.',
    website:   'www.ikpace.com',
    location:  'Accra, Ghana',
    students:  130,
    countries: ['Ghana', 'Nigeria', 'Kenya', 'South Africa', 'Tanzania', 'Uganda'],
    rating:    4.9,
  },

  courses: [
    {
      id:       'virtual-assistant-pro',
      title:    'Virtual Assistant Professional',
      emoji:    '💼',
      price:    7,
      duration: '8 Weeks',
      lessons:  24,
      projects: 3,
      level:    'Beginner',
      instructor:'Amara Osei',
      students: 32,
      rating:   4.9,
      category: 'Career',
      link:     '/course/virtual-assistant-pro',
      checkout: '/checkout/virtual-assistant-pro',
      skills:   ['Client Management', 'Email Mastery', 'Calendar Scheduling', 'Remote Work Tools', 'Client Acquisition'],
      outcomes: ['Land your first VA client in 8 weeks', 'Build a professional portfolio', 'Work remotely for international clients'],
      desc:     'Master client management, email, calendars & remote work tools. Land your first VA client in 8 weeks.',
      forWho:   'Anyone who wants to work remotely or build a freelance admin career.',
    },
    {
      id:       'social-media-marketing',
      title:    'Social Media Marketing',
      emoji:    '📱',
      price:    7,
      duration: '8 Weeks',
      lessons:  28,
      projects: 4,
      level:    'Beginner',
      instructor:'Kofi Asante',
      students: 28,
      rating:   4.8,
      category: 'Marketing',
      link:     '/course/social-media-marketing',
      checkout: '/checkout/social-media-marketing',
      skills:   ['Meta Ads Manager', 'Content Strategy', 'Analytics & Reporting', 'Community Management', 'Hashtag Strategy'],
      outcomes: ['Run profitable ad campaigns', 'Grow brands organically', 'Land social media clients'],
      desc:     'Build brands, run Meta Ads, master analytics & grow any social account organically from scratch.',
      forWho:   'Entrepreneurs, marketers, or anyone wanting to earn from social media.',
    },
    {
      id:       'canva-graphic-design',
      title:    'Canva & Graphic Design',
      emoji:    '🎨',
      price:    7,
      duration: '8 Weeks',
      lessons:  20,
      projects: 5,
      level:    'Beginner',
      instructor:'Esi Darkwah',
      students: 19,
      rating:   4.7,
      category: 'Design',
      link:     '/course/canva-graphic-design',
      checkout: '/checkout/canva-graphic-design',
      skills:   ['Logo Design', 'Brand Identity', 'Social Media Kits', 'Presentation Design', 'Colour Theory'],
      outcomes: ['Design a full brand from scratch', 'Offer design services as freelancer', 'Build a 10+ project portfolio'],
      desc:     'Design logos, brand identities, social kits & print materials. Build a portfolio of 10+ projects.',
      forWho:   'Beginners who want to offer design services or create content visually.',
    },
    {
      id:       'smart-kids-coding',
      title:    'Smart Kids Coding',
      emoji:    '🚀',
      price:    7,
      duration: '4 Weeks',
      lessons:  16,
      projects: 4,
      level:    'Beginner (Ages 6–12)',
      instructor:'Ms. Akosua',
      students: 12,
      rating:   4.9,
      category: 'Kids',
      link:     '/course/smart-kids-coding',
      checkout: '/checkout/smart-kids-coding',
      skills:   ['Scratch Programming', 'Game Design', 'Animations', 'Logic Building', 'Creative Storytelling'],
      outcomes: ['Build their first video game', 'Create animated stories', 'Develop coding confidence'],
      desc:     'Introduce ages 6–12 to coding through Scratch. Build animations, stories, and games.',
      forWho:   'Children aged 6–12. Perfect for parents who want to introduce their kids to technology.',
    },
    {
      id:       'freelancing-online-income',
      title:    'Freelancing & Online Income',
      emoji:    '💰',
      price:    7,
      duration: '4 Weeks',
      lessons:  22,
      projects: 3,
      level:    'Beginner',
      instructor:'Yaa Asantewaa',
      students: 21,
      rating:   4.8,
      category: 'Business',
      link:     '/course/freelancing-online-income',
      checkout: '/checkout/freelancing-online-income',
      skills:   ['Upwork & Fiverr Setup', 'Client Acquisition', 'Pricing Strategy', 'Portfolio Building', 'Contracts & Proposals'],
      outcomes: ['Land first client in 30 days', 'Set profitable rates', 'Build recurring income streams'],
      desc:     'Set up Upwork/Fiverr profiles, find clients, price your services & build recurring income.',
      forWho:   'Anyone who wants to earn money online with no job or minimal experience.',
    },
    {
      id:       'ai-prompt-engineering',
      title:    'AI Prompt Engineering',
      emoji:    '🤖',
      price:    7,
      duration: '8 Weeks',
      lessons:  24,
      projects: 4,
      level:    'Intermediate',
      instructor:'Nana Addo',
      students: 18,
      rating:   5.0,
      category: 'Tech',
      link:     '/course/ai-prompt-engineering',
      checkout: '/checkout/ai-prompt-engineering',
      skills:   ['ChatGPT & Claude', 'Midjourney / DALL-E', 'AI Automation', 'Prompt Frameworks', 'Sell AI Services'],
      outcomes: ['Write expert-level prompts', 'Automate business tasks', 'Sell AI services to clients'],
      desc:     'Master ChatGPT, Claude, Midjourney & AI automation. Monetise your AI expertise in 8 weeks.',
      forWho:   'Anyone curious about AI who wants to use it professionally or sell AI services.',
    },
  ],

  pricing: {
    perCourse:  7,         // USD
    currency:   'USD',
    bundleDeal: { count:3, price:15, saves:6 },
    promoCode:  'WELCOME10',
    promoOff:   '10%',
    payment:    ['MTN Mobile Money', 'Vodafone Cash', 'AirtelTigo', 'Visa', 'Mastercard', 'Bank Transfer'],
    processor:  'Paystack (PCI DSS Level 1)',
    secure:     '256-bit SSL Encrypted',
  },

  whatYouGet: [
    'HD video lessons',
    'Downloadable resources & templates',
    'Practical assignments with feedback',
    'iKPACE certificate of completion',
    'Lifetime access — never expires',
    'Community forum & peer discussions',
    'Mobile-friendly — study on any device',
    'Dedicated student support throughout',
  ],

  certificate: {
    type:    'iKPACE Certificate of Completion',
    features:['Unique verification number', 'Share on LinkedIn', 'Download as PDF', 'QR code verification', 'Lifetime validity'],
    desc:    'Proves your skills to employers, clients, and partners.',
  },

  support: {
    email:    'info@ikpace.com',
    phone:    '+233 (0) 123 456 789',
    hours:    'Mon–Sat, 8am–8pm GMT',
    response: 'Within 2–4 hours',
    live:     'Available in chat 8am–8pm GMT',
  },

  enrollment: [
    'Create a free iKPACE account',
    'Browse courses and pick yours',
    'Click "Enroll Now" or "Checkout"',
    'Pay $7 securely via Paystack',
    'Access starts immediately after payment',
  ],
}

// ─── AI response engine ───────────────────────────────────────────────────────
function getAIResponse(raw) {
  const msg = raw.toLowerCase().trim()

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|yo)\b/.test(msg) || msg === 'hi' || msg === 'hello') {
    return `👋 Hello! Welcome to **iKPACE** — Learn Smarter, Earn Better.\n\nI'm your AI assistant and I can answer questions about:\n• Our 6 courses ($7 each)\n• Pricing & payment methods\n• Certificates\n• How to enroll\n• Technical support\n\nWhat would you like to know?`
  }

  // About iKPACE
  if (/about|what is ikpace|who are you|tell me about/.test(msg)) {
    return `🎓 **About iKPACE**\n\niKPACE is an Africa-focused online learning platform founded in ${KB.platform.founded} and based in Accra, Ghana.\n\n**Mission:** ${KB.platform.mission}\n\n📊 **By the numbers:**\n• ${KB.platform.students}+ students enrolled\n• 6 professional courses\n• $7 per course\n• ${KB.platform.rating}/5 average rating\n• Available in ${KB.platform.countries.length} countries\n\nEvery course includes a certificate, lifetime access, and student support.`
  }

  // All courses
  if (/what courses|list courses|show courses|courses available|what do you offer|all courses/.test(msg)) {
    const list = KB.courses.map(c => `${c.emoji} **${c.title}** — ${c.duration} | $${c.price} | ⭐${c.rating}`).join('\n')
    return `📚 **Our 6 Courses — All $7:**\n\n${list}\n\nEvery course includes a certificate, lifetime access, and student support. Which one interests you?`
  }

  // AI / Prompt Engineering
  if (/ai prompt|prompt engineering|chatgpt|claude|midjourney|artificial intelligence|ai course/.test(msg)) {
    const c = KB.courses.find(x => x.id === 'ai-prompt-engineering')
    return `${c.emoji} **${c.title}**\n\n${c.desc}\n\n⭐ **Rating:** ${c.rating}/5 | 👥 ${c.students} students\n📅 **Duration:** ${c.duration} (${c.lessons} lessons, ${c.projects} projects)\n👩‍🏫 **Instructor:** ${c.instructor}\n🎯 **Level:** ${c.level}\n\n**Skills you'll gain:**\n${c.skills.map(s=>`• ${s}`).join('\n')}\n\n**After this course you'll:**\n${c.outcomes.map(o=>`✅ ${o}`).join('\n')}\n\n**Perfect for:** ${c.forWho}\n\n💰 **Price: $${c.price}** — Enroll at ikpace.com`
  }

  // Virtual Assistant
  if (/virtual assistant|va pro|va course/.test(msg)) {
    const c = KB.courses.find(x => x.id === 'virtual-assistant-pro')
    return `${c.emoji} **${c.title}**\n\n${c.desc}\n\n⭐ **Rating:** ${c.rating}/5 | 👥 ${c.students} students\n📅 **Duration:** ${c.duration} (${c.lessons} lessons, ${c.projects} projects)\n👩‍🏫 **Instructor:** ${c.instructor}\n🎯 **Level:** ${c.level}\n\n**Skills you'll gain:**\n${c.skills.map(s=>`• ${s}`).join('\n')}\n\n**After this course you'll:**\n${c.outcomes.map(o=>`✅ ${o}`).join('\n')}\n\n**Perfect for:** ${c.forWho}\n\n💰 **Price: $${c.price}** — Enroll at ikpace.com`
  }

  // Social Media Marketing
  if (/social media|smm|marketing|meta ads|facebook ads/.test(msg)) {
    const c = KB.courses.find(x => x.id === 'social-media-marketing')
    return `${c.emoji} **${c.title}**\n\n${c.desc}\n\n⭐ **Rating:** ${c.rating}/5 | 👥 ${c.students} students\n📅 **Duration:** ${c.duration} (${c.lessons} lessons, ${c.projects} projects)\n👩‍🏫 **Instructor:** ${c.instructor}\n🎯 **Level:** ${c.level}\n\n**Skills you'll gain:**\n${c.skills.map(s=>`• ${s}`).join('\n')}\n\n**After this course you'll:**\n${c.outcomes.map(o=>`✅ ${o}`).join('\n')}\n\n**Perfect for:** ${c.forWho}\n\n💰 **Price: $${c.price}` }

  // Canva / Graphic Design
  if (/canva|graphic design|design course|logo design/.test(msg)) {
    const c = KB.courses.find(x => x.id === 'canva-graphic-design')
    return `${c.emoji} **${c.title}**\n\n${c.desc}\n\n⭐ **Rating:** ${c.rating}/5 | 👥 ${c.students} students\n📅 **Duration:** ${c.duration} (${c.lessons} lessons, ${c.projects} projects)\n👩‍🏫 **Instructor:** ${c.instructor}\n\n**Skills you'll gain:**\n${c.skills.map(s=>`• ${s}`).join('\n')}\n\n**After this course you'll:**\n${c.outcomes.map(o=>`✅ ${o}`).join('\n')}\n\n**Perfect for:** ${c.forWho}\n\n💰 **Price: $${c.price}**`
  }

  // Kids Coding
  if (/kids|child|children|scratch|coding for kids|ages|young/.test(msg)) {
    const c = KB.courses.find(x => x.id === 'smart-kids-coding')
    return `${c.emoji} **${c.title}**\n\n${c.desc}\n\n⭐ **Rating:** ${c.rating}/5 | 👥 ${c.students} students\n📅 **Duration:** ${c.duration} (${c.lessons} lessons)\n👩‍🏫 **Instructor:** ${c.instructor}\n🎯 **Level:** ${c.level}\n\n**Skills kids will learn:**\n${c.skills.map(s=>`• ${s}`).join('\n')}\n\n**After this course they'll:**\n${c.outcomes.map(o=>`✅ ${o}`).join('\n')}\n\n**Perfect for:** ${c.forWho}\n\n💰 **Price: $${c.price}**`
  }

  // Freelancing
  if (/freelanc|upwork|fiverr|online income|make money online|earn online/.test(msg)) {
    const c = KB.courses.find(x => x.id === 'freelancing-online-income')
    return `${c.emoji} **${c.title}**\n\n${c.desc}\n\n⭐ **Rating:** ${c.rating}/5 | 👥 ${c.students} students\n📅 **Duration:** ${c.duration} (${c.lessons} lessons, ${c.projects} projects)\n👩‍🏫 **Instructor:** ${c.instructor}\n\n**Skills you'll gain:**\n${c.skills.map(s=>`• ${s}`).join('\n')}\n\n**After this course you'll:**\n${c.outcomes.map(o=>`✅ ${o}`).join('\n')}\n\n**Perfect for:** ${c.forWho}\n\n💰 **Price: $${c.price}**`
  }

  // Price / Cost
  if (/price|cost|how much|fee|cheap|afford|expensive/.test(msg)) {
    return `💰 **iKPACE Pricing**\n\nAll courses are **$7 USD** each.\n\n🎁 **Bundle Deal:** 3 courses for just **$15** (save $6)\n\n✅ **Every $7 course includes:**\n${KB.whatYouGet.map(f=>`• ${f}`).join('\n')}\n\n🏷️ **Promo code:** \`${KB.pricing.promoCode}\` for ${KB.pricing.promoOff} off your first course!\n\n${KB.pricing.payment.map(m=>`• ${m}`).join('\n')}`
  }

  // Payment
  if (/pay|payment|mobile money|mtn|vodafone|airtel|visa|mastercard|bank transfer|paystack/.test(msg)) {
    return `💳 **Payment Methods:**\n\n${KB.pricing.payment.map(m=>`• ${m}`).join('\n')}\n\nAll payments processed by **${KB.pricing.processor}** — ${KB.pricing.secure}.\n\n⚡ **Access is instant** after payment confirmation. No waiting!\n\n💵 All prices in USD ($7 per course). Paystack auto-converts to your local currency.`
  }

  // Certificate
  if (/certificate|certification|credential|proof|verify|badge/.test(msg)) {
    return `🎓 **iKPACE Certificate of Completion**\n\nYes! You receive a recognised certificate after completing any course.\n\n**Certificate features:**\n${KB.certificate.features.map(f=>`✅ ${f}`).join('\n')}\n\n**${KB.certificate.desc}**\n\nYou can add it to your LinkedIn profile, CV, or share it with clients.`
  }

  // What's included / features
  if (/include|feature|what do i get|what's in|benefit|get with/.test(msg)) {
    return `✨ **Everything Included in Every Course ($7):**\n\n${KB.whatYouGet.map(f=>`✅ ${f}`).join('\n')}\n\n🎁 **Bundle Deal:** Get 3 courses for $15 (save $6)\n\nAll this for just $7 — enroll at ikpace.com`
  }

  // Enrollment / How to start
  if (/enroll|how to join|sign up|register|start|how to buy|how to get|how do i/.test(msg)) {
    return `📝 **How to Enroll — 5 Easy Steps:**\n\n${KB.enrollment.map((s,i)=>`${i+1}. ${s}`).join('\n')}\n\n💡 **Pro tip:** Use promo code \`${KB.pricing.promoCode}\` at checkout for ${KB.pricing.promoOff} off!\n\nNeed help? Email ${KB.support.email}`
  }

  // Duration / time
  if (/how long|duration|time to complete|weeks|days|hours/.test(msg)) {
    return `⏱️ **Course Durations:**\n\n• 4-Week courses:\n  🎨 Canva & Graphic Design\n  🚀 Smart Kids Coding\n  💰 Freelancing & Online Income\n\n• 8-Week courses:\n  💼 Virtual Assistant Professional\n  📱 Social Media Marketing\n  🤖 AI Prompt Engineering\n\n📱 **All courses are self-paced.** Study in your own time — 2–4 hours per week is enough. Lifetime access means no rush!`
  }

  // Support / Contact
  if (/support|help|contact|reach|email|phone|issue|problem|stuck/.test(msg)) {
    return `🆘 **Get Help from iKPACE:**\n\n📧 **Email:** ${KB.support.email}\n📞 **Phone:** ${KB.support.phone}\n💬 **Live chat:** Right here! ${KB.support.live}\n⏱️ **Response time:** ${KB.support.response}\n\n**Common issues I can help with:**\n• Course access problems\n• Payment questions\n• Login/account issues\n• Certificate requests\n• Course content questions\n\nJust describe your issue and I'll help!`
  }

  // Instructors / teachers
  if (/instructor|teacher|who teaches|teach|mentor|coach/.test(msg)) {
    return `👨‍🏫 **iKPACE Expert Instructors:**\n\n${KB.courses.map(c=>`${c.emoji} **${c.instructor}** — ${c.title}`).join('\n')}\n\nAll instructors are working professionals with real industry experience. They've designed each course around practical skills that get you employed or earning quickly.`
  }

  // Login / password issues
  if (/login|log in|sign in|password|can't access|forgot password|reset/.test(msg)) {
    return `🔐 **Login Troubleshooting:**\n\n1. Double-check your email and password\n2. Click "Forgot Password" to reset via email\n3. Check your spam folder for the reset email\n4. Clear browser cache and try again\n5. Try a different browser (Chrome recommended)\n\nStill stuck? Email **${KB.support.email}** and we'll sort it within ${KB.support.response}.`
  }

  // Refund / guarantee
  if (/refund|money back|guarantee|unhappy|not satisfied|cancel/.test(msg)) {
    return `✅ **Our Commitment to You:**\n\nWe work hard to ensure every student gets value from their course. If you experience any issues accessing your course or have technical problems, contact our support team.\n\n📧 **Email:** ${KB.support.email}\n⏱️ **Response:** ${KB.support.response}\n\nWe're here to make sure your learning experience is excellent.`
  }

  // Community
  if (/community|forum|discuss|group|whatsapp|other students|peer/.test(msg)) {
    return `👥 **iKPACE Community:**\n\n• Discussion forums inside each course\n• Ask questions, share progress, get feedback\n• Connect with peers from across Africa\n• Monthly live Q&A sessions\n• Graduate network & job opportunities\n\nCommunity access is included with every course enrollment — no extra cost!`
  }

  // Countries / availability
  if (/country|countries|ghana|nigeria|kenya|africa|available in|international|where/.test(msg)) {
    return `🌍 **iKPACE is Available in ${KB.platform.countries.length} Countries:**\n\n${KB.platform.countries.map(c=>`• ${c}`).join('\n')}\n\n💳 **International students** can pay by Visa or Mastercard — Paystack handles the currency conversion automatically.\n\n📱 All courses are online — study from anywhere with internet access.`
  }

  // Bundle deal
  if (/bundle|3 courses|deal|multiple courses|discount|save/.test(msg)) {
    return `🎁 **iKPACE Bundle Deal:**\n\n✅ **3 courses for just $15** (normally $21)\n💰 **You save $6!**\n\nPick any 3 from our 6 courses:\n${KB.courses.map(c=>`${c.emoji} ${c.title}`).join('\n')}\n\nContact us at **${KB.support.email}** to claim the bundle deal.\n\nOr use promo code \`${KB.pricing.promoCode}\` for ${KB.pricing.promoOff} off a single course!`
  }

  // Promo code
  if (/promo|coupon|code|discount|offer|deal/.test(msg)) {
    return `🏷️ **Current Promo Code:**\n\n**\`${KB.pricing.promoCode}\`** — ${KB.pricing.promoOff} off your first course!\n\nJust enter the code at checkout. Your discounted price will be applied automatically.\n\n🎁 **Bundle Deal:** 3 courses for $15 (save $6) — contact ${KB.support.email} to claim.`
  }

  // Lifetime access
  if (/lifetime|expire|forever|always|how long access/.test(msg)) {
    return `♾️ **Lifetime Access — Yours Forever!**\n\nOnce you enroll in any iKPACE course:\n\n✅ Access the course forever — no expiry date\n✅ Download all resources & templates\n✅ Revisit any lesson anytime\n✅ Get any future content updates\n✅ Study on phone, tablet, laptop, or TV\n\nYou pay once and keep the knowledge for life.`
  }

  // Mobile / device
  if (/mobile|phone|tablet|laptop|device|app|ios|android/.test(msg)) {
    return `📱 **Study on Any Device:**\n\n✅ Phone (iOS & Android)\n✅ Tablet\n✅ Laptop / Desktop\n✅ Smart TV\n\niKPACE is fully mobile-optimised. No app download needed — just visit the website and log in. Your progress syncs across all devices automatically.`
  }

  // Requirements
  if (/require|need|prerequisite|experience|beginner|no experience/.test(msg)) {
    return `📋 **Course Requirements:**\n\n✅ Internet connection (mobile data is fine)\n✅ A phone, tablet, or laptop\n✅ Basic ability to use a smartphone\n✅ **No prior experience needed** for most courses\n✅ 2–4 hours per week commitment\n\nAll our courses start from absolute beginner level. If you can send a WhatsApp, you can start learning with iKPACE!`
  }

  // Compare courses / which one
  if (/which course|best course|recommend|what should i|suited for me|right for me|compare/.test(msg)) {
    return `🤔 **Which Course is Right for You?**\n\n💼 **VA Pro** — Want to work remotely for international clients?\n📱 **Social Media** — Want to grow brands & run ads?\n🎨 **Canva Design** — Want to create visuals & offer design services?\n🚀 **Kids Coding** — Have a child aged 6–12 to inspire?\n💰 **Freelancing** — Want to earn money online from home?\n🤖 **AI Prompting** — Want to master AI tools & sell AI services?\n\nAll cost $7. Tell me more about your goal and I'll give a specific recommendation!`
  }

  // Thank you
  if (/thank|thanks|appreciate/.test(msg)) {
    return `😊 You're very welcome! Happy to help.\n\nIs there anything else you'd like to know about iKPACE? I'm here 24/7!\n\n📧 ${KB.support.email}\n🌐 ikpace.com`
  }

  // Goodbye
  if (/bye|goodbye|see you|later|exit/.test(msg)) {
    return `👋 Goodbye! Thanks for chatting with iKPACE.\n\nRemember — all courses are $7 and your certificate is included!\n\nCome back anytime. Happy learning! 🎓`
  }

  // Numbers / stats
  if (/how many|students|rating|stat/.test(msg)) {
    return `📊 **iKPACE Stats:**\n\n👥 ${KB.platform.students}+ students enrolled\n⭐ ${KB.platform.rating}/5 average rating\n📚 6 professional courses\n🌍 ${KB.platform.countries.length} countries\n💰 $7 per course\n🎓 100% certificate included\n\nWe're growing every week!`
  }

  // Default
  return `I can help you with:\n\n📚 **Courses** — Ask about any of our 6 courses\n💰 **Pricing** — All courses are $7\n💳 **Payment** — MoMo, card, bank transfer\n🎓 **Certificates** — Yes, included free\n📝 **Enrollment** — How to sign up\n🆘 **Support** — Get human help\n🌍 **Availability** — Countries & devices\n🏷️ **Deals** — Bundle & promo codes\n\nWhat would you like to know?`
}

// ─── Quick question chips ─────────────────────────────────────────────────────
const QUICK_CHIPS = [
  { label:'💰 Pricing',          q:'How much do courses cost?' },
  { label:'📚 All Courses',      q:'What courses do you offer?' },
  { label:'🎓 Certificate',      q:'Do I get a certificate?' },
  { label:'📝 How to Enroll',    q:'How do I enroll in a course?' },
  { label:'💳 Payment Methods',  q:'What payment methods do you accept?' },
  { label:'🤖 AI Course',        q:'Tell me about the AI Prompt Engineering course' },
  { label:'💼 VA Course',        q:'Tell me about Virtual Assistant Professional' },
  { label:'♾️ Lifetime Access',  q:'Do I get lifetime access?' },
  { label:'🌍 Countries',        q:'Which countries can use iKPACE?' },
  { label:'🏷️ Promo Code',       q:'Is there a discount or promo code?' },
]

// ─── Message bubble ───────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isBot = msg.type === 'bot'
  const time  = msg.time.toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit' })

  // Render **bold** markers
  const renderText = (text) =>
    text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      return (
        <p key={i} className={i>0?'mt-1':''}>
          {parts.map((p, j) =>
            p.startsWith('**') && p.endsWith('**')
              ? <strong key={j}>{p.slice(2,-2)}</strong>
              : p
          )}
        </p>
      )
    })

  return (
    <div className={`flex gap-2 ${isBot?'justify-start':'justify-end'}`}>
      {isBot && (
        <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
          <Bot size={14} className="text-white"/>
        </div>
      )}

      <div className={`max-w-[82%] ${isBot?'':'order-first'}`}>
        <div className={`px-4 py-3 rounded-3xl text-xs leading-relaxed shadow-sm ${
          isBot
            ? 'rounded-tl-lg text-gray-800 bg-white'
            : 'rounded-tr-lg text-white'
        }`}
          style={isBot ? { border:`1px solid ${C.gray[200]}` } : { background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
          {renderText(msg.text)}
        </div>
        <p className={`text-[10px] mt-1 px-1 ${isBot?'text-left':'text-right'}`} style={{ color:C.gray[400] }}>{time}</p>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
          style={{ background:`linear-gradient(135deg,${C.orange},${C.orangeL})` }}>
          <User size={14} className="text-white"/>
        </div>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
export default function LiveChatSupport() {
  const [open,        setOpen]        = useState(false)
  const [minimized,   setMinimized]   = useState(false)
  const [messages,    setMessages]    = useState([{
    id:1, type:'bot', time:new Date(),
    text:`👋 Hi there! I'm your **iKPACE AI Assistant**.\n\nI can give you instant, accurate answers about our courses, pricing, certificates, enrollment, and more.\n\nAll 6 courses are just **$7** — certificate included! What would you like to know?`,
  }])
  const [input,       setInput]       = useState('')
  const [typing,      setTyping]      = useState(false)
  const [showChips,   setShowChips]   = useState(true)
  const [unread,      setUnread]      = useState(0)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages, typing])
  useEffect(() => { if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 200) } }, [open])

  const send = (text) => {
    const q = text || input
    if (!q.trim()) return
    setInput('')
    setShowChips(false)
    setMessages(p => [...p, { id:Date.now(), type:'user', time:new Date(), text:q }])
    setTyping(true)
    setTimeout(() => {
      const answer = getAIResponse(q)
      setMessages(p => [...p, { id:Date.now()+1, type:'bot', time:new Date(), text:answer }])
      setTyping(false)
      if (!open) setUnread(u => u+1)
    }, 700 + Math.random()*500)
  }

  const onKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }

  // Floating button
  if (!open) return (
    <button onClick={() => setOpen(true)}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-50 flex items-center justify-center group"
      style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}
      aria-label="Open iKPACE chat support">
      <MessageCircle size={24} className="text-white group-hover:scale-110 transition-transform"/>
      {unread > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">
          {unread}
        </span>
      )}
      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white animate-pulse" style={{ background:C.green }}/>
    </button>
  )

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto z-50 sm:w-[360px] md:w-[400px]"
      style={{ fontFamily:'system-ui,sans-serif' }}>
      <div className={`bg-white sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
        minimized ? 'h-[68px]' : 'h-[100dvh] sm:h-[600px] max-h-[100dvh] sm:max-h-[620px]'
      }`}
        style={{ borderTop:`3px solid ${C.orange}`, border:`1px solid ${C.gray[200]}` }}>

        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3.5"
          style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy})` }}>
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md"
              style={{ background:`linear-gradient(135deg,${C.orange},${C.orangeL})` }}>
              <Bot size={18} className="text-white"/>
            </div>
            <div className="min-w-0">
              <p className="text-white font-black text-sm leading-tight">iKPACE AI Assistant</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ background:C.green }}/>
                <span className="text-white/70 text-[11px] font-medium">Online · Instant answers · 24/7</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button onClick={() => setMinimized(m=>!m)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label={minimized?'Expand':'Minimize'}>
              {minimized ? <Maximize2 size={15}/> : <Minimize2 size={15}/>}
            </button>
            <button onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Close chat">
              <X size={15}/>
            </button>
          </div>
        </div>

        {!minimized && (
          <>
            {/* ── INFO BAR ────────────────────────────────────────────────── */}
            <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 border-b"
              style={{ background:`${C.navy}06`, borderColor:C.gray[100] }}>
              <div className="flex items-center gap-3 text-[10px] font-semibold" style={{ color:C.gray[500] }}>
                <span className="flex items-center gap-1"><BookOpen size={10}/> 6 Courses</span>
                <span className="flex items-center gap-1"><Star size={10}/> 4.9 Rating</span>
                <span className="flex items-center gap-1"><Users size={10}/> 130+ Students</span>
              </div>
              <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-white"
                style={{ background:`linear-gradient(135deg,${C.orange},${C.orangeL})` }}>
                All $7
              </span>
            </div>

            {/* ── MESSAGES ────────────────────────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background:C.gray[50] }}>
              {messages.map(m => <Bubble key={m.id} msg={m}/>)}

              {/* Typing indicator */}
              {typing && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                    <Bot size={14} className="text-white"/>
                  </div>
                  <div className="px-4 py-3 rounded-3xl rounded-tl-lg bg-white shadow-sm flex items-center gap-1.5"
                    style={{ border:`1px solid ${C.gray[200]}` }}>
                    {[0,0.15,0.3].map((d,i) => (
                      <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                        style={{ background:C.navy, animationDelay:`${d}s` }}/>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef}/>
            </div>

            {/* ── QUICK CHIPS ─────────────────────────────────────────────── */}
            {showChips && messages.length === 1 && (
              <div className="flex-shrink-0 px-4 py-3 border-t bg-white" style={{ borderColor:C.gray[100] }}>
                <p className="text-[11px] font-black uppercase tracking-wider mb-2.5" style={{ color:C.gray[400] }}>
                  Quick questions
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                  {QUICK_CHIPS.map((c,i) => (
                    <button key={i} onClick={() => send(c.q)}
                      className="text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm hover:-translate-y-0.5 whitespace-nowrap"
                      style={{ borderColor:`${C.navy}20`, color:C.navy, background:`${C.navy}06` }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── INPUT BAR ───────────────────────────────────────────────── */}
            <div className="flex-shrink-0 px-4 py-3 bg-white border-t" style={{ borderColor:C.gray[100] }}>
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={onKey}
                    placeholder="Ask me anything about iKPACE…"
                    className="w-full pl-4 pr-4 py-3 rounded-2xl text-xs outline-none transition-all"
                    style={{
                      background: C.gray[50],
                      border: `2px solid ${C.gray[200]}`,
                      color: C.gray[800],
                    }}
                    onFocus={e => e.target.style.borderColor = C.navy}
                    onBlur={e => e.target.style.borderColor = C.gray[200]}
                  />
                </div>
                <button onClick={() => send()}
                  disabled={!input.trim()}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex-shrink-0"
                  style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}
                  aria-label="Send message">
                  <Send size={15} className="text-white"/>
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[10px] flex items-center gap-1" style={{ color:C.gray[400] }}>
                  <Lock size={9}/> Powered by iKPACE AI
                </span>
                <button onClick={() => { setMessages([messages[0]]); setShowChips(true) }}
                  className="text-[10px] flex items-center gap-1 hover:underline" style={{ color:C.gray[400] }}>
                  <RefreshCw size={9}/> New chat
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
