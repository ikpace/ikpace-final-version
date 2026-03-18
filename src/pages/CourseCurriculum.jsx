// src/pages/CourseCurriculum.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import {
  BookOpen, Clock, ChevronDown, ChevronUp, CheckCircle,
  Award, Users, Calendar, ArrowLeft, Lock, PlayCircle,
  Star, Target, Sparkles, Rocket, GraduationCap, Lightbulb,
  FileText, MessageCircle, Download, Shield, ExternalLink,
  Menu, X, Video, AlertCircle, Loader, Maximize2, Minimize2,
  ThumbsUp, MessageSquare, Share2, Bookmark, Play, Pause,
  Volume2, VolumeX, Settings, Grid, List, RefreshCw,
  Wifi, WifiOff, BarChart3, Zap, Brain, Globe, Flag,
  TrendingUp, CheckSquare, Bell, Heart, Coffee, Layers,
  Monitor, Smartphone, Trophy, BadgeCheck, Hash, Timer,
  ChevronRight, ChevronLeft, MoreHorizontal, Eye, Send,
  Headphones, Check
} from 'lucide-react';

// ─── Brand Design System ──────────────────────────────────────────────────────
const C = {
  navy:       '#1A3D7C',
  navyDark:   '#0F2655',
  navyMid:    '#2F5EA8',
  orange:     '#FF7A00',
  orangeLight:'#FF9A3C',
  green:      '#008F4C',
  greenLight: '#00B85F',
  yellow:     '#E6B800',
  teal:       '#0D9488',
  purple:     '#7C3AED',
  rose:       '#E11D48',
  amber:      '#D97706',
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A'
  }
}

// ─── Course ID mapping ────────────────────────────────────────────────────────
const courseIdMapping = {
  'virtual-assistant-pro':       '3dfbeb9d-7145-402a-a23c-f5c3b01129e5',
  'social-media-marketing':      '920eb05d-ad83-4300-85cc-80be6d1790d3',
  'canva-graphic-design':        '8af52752-9007-4140-8150-f807b43bab07',
  'smart-kids-coding':           'c0869a5a-fa9a-4cdd-a280-4040ee13a9f3',
  'freelancing-online-income':   'fdeee92d-5ddb-4ada-84d9-d2ed3eb0a1a7',
  'ai-prompt-engineering':       'ai-prompt-001'
}

// ─── Course visual themes ─────────────────────────────────────────────────────
const courseThemes = {
  'virtual-assistant-pro': {
    gradient:  `linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 60%, #4A6FA5 100%)`,
    accent:    C.navy,
    glow:      C.navyMid,
    emoji:     '💼',
    badge:     'Business',
    badgeColor:C.navy,
    shape:     '◆',
  },
  'social-media-marketing': {
    gradient:  `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeLight} 60%, #FFB347 100%)`,
    accent:    C.orange,
    glow:      C.orangeLight,
    emoji:     '📱',
    badge:     'Marketing',
    badgeColor:C.orange,
    shape:     '●',
  },
  'canva-graphic-design': {
    gradient:  `linear-gradient(135deg, ${C.green} 0%, ${C.teal} 60%, #20B2AA 100%)`,
    accent:    C.green,
    glow:      C.teal,
    emoji:     '🎨',
    badge:     'Design',
    badgeColor:C.green,
    shape:     '■',
  },
  'smart-kids-coding': {
    gradient:  `linear-gradient(135deg, ${C.purple} 0%, #9B59B6 60%, #C39BD3 100%)`,
    accent:    C.purple,
    glow:      '#9B59B6',
    emoji:     '🚀',
    badge:     'Kids',
    badgeColor:C.purple,
    shape:     '▲',
  },
  'freelancing-online-income': {
    gradient:  `linear-gradient(135deg, ${C.amber} 0%, #F0A500 60%, ${C.yellow} 100%)`,
    accent:    C.amber,
    glow:      '#F0A500',
    emoji:     '💰',
    badge:     'Business',
    badgeColor:C.amber,
    shape:     '★',
  },
  'ai-prompt-engineering': {
    gradient:  `linear-gradient(135deg, #06B6D4 0%, ${C.purple} 60%, #8B5CF6 100%)`,
    accent:    '#06B6D4',
    glow:      C.purple,
    emoji:     '🤖',
    badge:     'AI & Tech',
    badgeColor:'#06B6D4',
    shape:     '◉',
  },
}

// ─── Full curriculum data (corrected weeks) ───────────────────────────────────
const curriculumData = {

  // ══════════════════════════════════════════════════════════════════════════
  // VIRTUAL ASSISTANT PRO — 8 WEEKS
  // ══════════════════════════════════════════════════════════════════════════
  'virtual-assistant-pro': {
    title:       'Virtual Assistant Professional',
    subtitle:    'Launch your remote VA career in 8 weeks',
    description: 'This comprehensive 8-week program covers everything you need to become a professional virtual assistant. From communication mastery to client acquisition, business setup, and scaling your income remotely.',
    duration:    '8 Weeks',
    format:      '2–3 classes per week · Self-paced',
    totalLessons:24,
    students:    127,
    rating:      4.8,
    skills:      ['Email Management','Calendar Mastery','Client Communication','Google Workspace','Social Media Assistance','Project Management','Client Acquisition','Business Setup'],
    outcomes:    ['Land your first VA client in 8 weeks','Build a professional digital portfolio','Set your own rates with confidence','Work remotely from anywhere in the world'],
    weeks: [
      {
        title:  'Week 1: Introduction to Virtual Assistance',
        icon:   '📋',
        topics: ['What is a Virtual Assistant?','Types of VA services','Work ethics & professionalism','Setting up your home office'],
        lessons: [
          { id:'va-w1l1', title:'What is a Virtual Assistant?',        type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/XH5p46lV1tg' },
          { id:'va-w1l2', title:'Types of VA Services',                type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/1VQ_3sBZEm0' },
          { id:'va-w1l3', title:'Work Ethics & Professionalism',       type:'video',     duration:'12 min', content_url:'https://www.youtube.com/embed/9fPzLB2MVEY' },
          { id:'va-w1l4', title:'Setting Up Your Home Office',         type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample1a' },
        ]
      },
      {
        title:  'Week 2: Communication & Email Management',
        icon:   '📧',
        topics: ['Professional email writing','Inbox zero techniques','Email templates','Follow-up strategies'],
        lessons: [
          { id:'va-w2l1', title:'Professional Email Writing',          type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample2a' },
          { id:'va-w2l2', title:'Inbox Zero Techniques',               type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample2b' },
          { id:'va-w2l3', title:'Writing Email Templates',             type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample2c' },
          { id:'va-w2l4', title:'Email Practice Assignment',           type:'assignment',duration:'30 min' },
        ]
      },
      {
        title:  'Week 3: Calendar & Scheduling Mastery',
        icon:   '📅',
        topics: ['Google Calendar management','Scheduling meetings','Time zone management','Calendly & booking tools'],
        lessons: [
          { id:'va-w3l1', title:'Google Calendar Mastery',             type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample3a' },
          { id:'va-w3l2', title:'Time Zone Management',                type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample3b' },
          { id:'va-w3l3', title:'Calendly & Booking Tools',            type:'video',     duration:'22 min', isLive:true, liveDate:'2026-04-07T15:00:00', content_url:'https://www.youtube.com/embed/sample3c' },
        ]
      },
      {
        title:  'Week 4: Administrative Tools & Google Workspace',
        icon:   '🛠️',
        topics: ['Google Docs, Sheets, Slides','File management systems','Document organization','Cloud storage & sharing'],
        lessons: [
          { id:'va-w4l1', title:'Google Workspace Overview',           type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample4a' },
          { id:'va-w4l2', title:'Google Docs & Sheets for VAs',        type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample4b' },
          { id:'va-w4l3', title:'Cloud Storage & File Sharing',        type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample4c' },
          { id:'va-w4l4', title:'Admin Tools Practice',                type:'assignment',duration:'45 min' },
        ]
      },
      {
        title:  'Week 5: Social Media Assistance',
        icon:   '📱',
        topics: ['Content scheduling tools','Basic engagement management','Buffer & Hootsuite','Reporting basics'],
        lessons: [
          { id:'va-w5l1', title:'Content Scheduling Tools',            type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample5a' },
          { id:'va-w5l2', title:'Engagement Management',               type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample5b' },
          { id:'va-w5l3', title:'Buffer & Hootsuite Tutorial',          type:'video',     duration:'28 min', isLive:true, liveDate:'2026-04-14T16:00:00', content_url:'https://www.youtube.com/embed/sample5c' },
        ]
      },
      {
        title:  'Week 6: Project Management & Client Communication',
        icon:   '🤝',
        topics: ['Trello, Asana, Notion basics','Project management fundamentals','Client onboarding process','Communication templates'],
        lessons: [
          { id:'va-w6l1', title:'Project Management Tools Overview',   type:'video',     duration:'32 min', content_url:'https://www.youtube.com/embed/sample6a' },
          { id:'va-w6l2', title:'Client Onboarding Process',           type:'video',     duration:'24 min', content_url:'https://www.youtube.com/embed/sample6b' },
          { id:'va-w6l3', title:'Communication Templates',             type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample6c' },
          { id:'va-w6l4', title:'Client Communication Assignment',     type:'assignment',duration:'40 min' },
        ]
      },
      {
        title:  'Week 7: Client Acquisition & Pricing',
        icon:   '💼',
        topics: ['Creating a CV & portfolio','Freelance platforms (Upwork, Fiverr)','Pricing your VA services','Negotiation basics'],
        lessons: [
          { id:'va-w7l1', title:'Creating a Winning VA Portfolio',     type:'video',     duration:'35 min', content_url:'https://www.youtube.com/embed/sample7a' },
          { id:'va-w7l2', title:'Upwork & Fiverr for VAs',             type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample7b' },
          { id:'va-w7l3', title:'Pricing Your Services',               type:'video',     duration:'22 min', isLive:true, liveDate:'2026-04-21T15:00:00', content_url:'https://www.youtube.com/embed/sample7c' },
          { id:'va-w7l4', title:'Negotiation Basics',                  type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample7d' },
        ]
      },
      {
        title:  'Week 8: Final Project & Certification',
        icon:   '🎓',
        topics: ['Build complete VA portfolio','Mock client task submission','Business setup checklist','Certification ceremony'],
        lessons: [
          { id:'va-w8l1', title:'Building Your VA Portfolio',          type:'video',     duration:'40 min', content_url:'https://www.youtube.com/embed/sample8a' },
          { id:'va-w8l2', title:'Mock Client Task',                    type:'assignment',duration:'60 min' },
          { id:'va-w8l3', title:'VA Business Setup Checklist',         type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample8b' },
          { id:'va-w8l4', title:'Certification & Next Steps',          type:'video',     duration:'15 min', isLive:true, liveDate:'2026-04-28T15:00:00', content_url:'https://www.youtube.com/embed/sample8c' },
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SOCIAL MEDIA MARKETING — 8 WEEKS
  // ══════════════════════════════════════════════════════════════════════════
  'social-media-marketing': {
    title:       'Social Media Marketing',
    subtitle:    'Master social media strategy, ads & analytics in 8 weeks',
    description: 'An 8-week deep dive into modern social media marketing — from content strategy to paid advertising, influencer partnerships, analytics reporting, and full campaign management for brands.',
    duration:    '8 Weeks',
    format:      'Self-paced with live sessions',
    totalLessons:24,
    students:    89,
    rating:      4.9,
    skills:      ['Content Strategy','Facebook & Instagram Ads','Analytics & Reporting','Brand Building','Community Management','Influencer Marketing','SEO for Social','Campaign Management'],
    outcomes:    ['Run profitable social media ad campaigns','Grow any brand\'s following organically','Create a content calendar that converts','Land clients as a social media manager'],
    weeks: [
      {
        title:  'Week 1: Social Media Foundations',
        icon:   '🌐',
        topics: ['Platforms overview (Instagram, Facebook, TikTok, LinkedIn)','Understanding the algorithm','Setting up business accounts','Social media vocabulary'],
        lessons: [
          { id:'sm-w1l1', title:'Social Media Platforms Deep Dive',   type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_sm1a' },
          { id:'sm-w1l2', title:'Understanding Algorithms',           type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_sm1b' },
          { id:'sm-w1l3', title:'Setting Up Business Profiles',       type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_sm1c' },
          { id:'sm-w1l4', title:'Account Setup Assignment',           type:'assignment',duration:'30 min' },
        ]
      },
      {
        title:  'Week 2: Audience Research & Targeting',
        icon:   '🎯',
        topics: ['Defining your target audience','Competitor analysis','Creating buyer personas','Market research tools'],
        lessons: [
          { id:'sm-w2l1', title:'Defining Your Target Audience',      type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_sm2a' },
          { id:'sm-w2l2', title:'Competitor Analysis Techniques',     type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_sm2b' },
          { id:'sm-w2l3', title:'Creating Buyer Personas',            type:'video',     duration:'18 min', isLive:true, liveDate:'2026-04-08T14:00:00', content_url:'https://www.youtube.com/embed/sample_sm2c' },
        ]
      },
      {
        title:  'Week 3: Content Creation Strategy',
        icon:   '✍️',
        topics: ['Content pillars & planning','Writing viral captions','Hashtag strategy','Content batching & scheduling'],
        lessons: [
          { id:'sm-w3l1', title:'Content Pillars & Planning',         type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_sm3a' },
          { id:'sm-w3l2', title:'Writing Captions That Convert',      type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_sm3b' },
          { id:'sm-w3l3', title:'Hashtag Strategy Masterclass',       type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample_sm3c' },
          { id:'sm-w3l4', title:'Content Calendar Assignment',        type:'assignment',duration:'45 min' },
        ]
      },
      {
        title:  'Week 4: Visual Branding & Design',
        icon:   '🏷️',
        topics: ['Personal & brand identity','Colour psychology','Creating visual consistency','Canva for social media'],
        lessons: [
          { id:'sm-w4l1', title:'Building a Visual Brand Identity',   type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_sm4a' },
          { id:'sm-w4l2', title:'Colour Psychology in Marketing',     type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_sm4b' },
          { id:'sm-w4l3', title:'Canva for Social Media',             type:'video',     duration:'24 min', isLive:true, liveDate:'2026-04-15T14:00:00', content_url:'https://www.youtube.com/embed/sample_sm4c' },
        ]
      },
      {
        title:  'Week 5: Paid Advertising (Meta Ads)',
        icon:   '📣',
        topics: ['Facebook & Instagram Ads Manager','Campaign objectives & structure','Ad creative & copywriting','Budgeting & bidding strategies'],
        lessons: [
          { id:'sm-w5l1', title:'Intro to Meta Ads Manager',          type:'video',     duration:'35 min', content_url:'https://www.youtube.com/embed/sample_sm5a' },
          { id:'sm-w5l2', title:'Campaign Structure Explained',       type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_sm5b' },
          { id:'sm-w5l3', title:'Writing High-Converting Ad Copy',    type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_sm5c' },
          { id:'sm-w5l4', title:'Ad Campaign Launch Assignment',      type:'assignment',duration:'60 min' },
        ]
      },
      {
        title:  'Week 6: Community Management & Influencers',
        icon:   '🤝',
        topics: ['Community engagement tactics','Handling negative comments','Influencer identification','Outreach & collaboration deals'],
        lessons: [
          { id:'sm-w6l1', title:'Community Management Tactics',       type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_sm6a' },
          { id:'sm-w6l2', title:'Influencer Marketing Strategy',      type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_sm6b' },
          { id:'sm-w6l3', title:'Outreach Templates & Scripts',       type:'video',     duration:'18 min', isLive:true, liveDate:'2026-04-22T15:30:00', content_url:'https://www.youtube.com/embed/sample_sm6c' },
        ]
      },
      {
        title:  'Week 7: Analytics, Insights & Reporting',
        icon:   '📊',
        topics: ['Reading social media analytics','KPIs that matter','Creating client reports','A/B testing strategies'],
        lessons: [
          { id:'sm-w7l1', title:'Social Media Analytics Masterclass', type:'video',     duration:'32 min', content_url:'https://www.youtube.com/embed/sample_sm7a' },
          { id:'sm-w7l2', title:'KPIs for Social Media Managers',     type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_sm7b' },
          { id:'sm-w7l3', title:'Creating Client Reports',            type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_sm7c' },
          { id:'sm-w7l4', title:'Analytics Report Assignment',        type:'assignment',duration:'45 min' },
        ]
      },
      {
        title:  'Week 8: Full Campaign Project & Certification',
        icon:   '🚀',
        topics: ['Create a 30-day campaign plan','Present strategy to group','Portfolio submission','Certification'],
        lessons: [
          { id:'sm-w8l1', title:'Building a Full Campaign Plan',      type:'video',     duration:'40 min', content_url:'https://www.youtube.com/embed/sample_sm8a' },
          { id:'sm-w8l2', title:'Campaign Presentation',              type:'assignment',duration:'60 min', isLive:true, liveDate:'2026-04-29T16:00:00' },
          { id:'sm-w8l3', title:'Certification & Career Next Steps',  type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_sm8b' },
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // CANVA & GRAPHIC DESIGN — 8 WEEKS
  // ══════════════════════════════════════════════════════════════════════════
  'canva-graphic-design': {
    title:       'Canva & Graphic Design',
    subtitle:    'Create stunning visuals & build your design portfolio in 8 weeks',
    description: 'Master design fundamentals, Canva Pro, branding projects, print design, social media kits, and portfolio building across 8 practical weeks of hands-on design workshops.',
    duration:    '8 Weeks',
    format:      'Hands-on design workshops',
    totalLessons:24,
    students:    156,
    rating:      4.8,
    skills:      ['Color Theory','Typography','Logo Design','Branding Identity','Canva Pro','Social Media Design','Print Design','Portfolio Building'],
    outcomes:    ['Design a complete brand identity from scratch','Create professional social media kits','Build a portfolio of 10+ real projects','Offer graphic design services as a freelancer'],
    weeks: [
      {
        title:  'Week 1: Design Fundamentals',
        icon:   '🎨',
        topics: ['Principles of design','Colour theory & psychology','Typography basics','White space & composition'],
        lessons: [
          { id:'cd-w1l1', title:'Principles of Great Design',         type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_cd1a' },
          { id:'cd-w1l2', title:'Colour Theory for Designers',        type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_cd1b' },
          { id:'cd-w1l3', title:'Typography Fundamentals',            type:'video',     duration:'20 min', isLive:true, liveDate:'2026-04-06T13:00:00', content_url:'https://www.youtube.com/embed/sample_cd1c' },
          { id:'cd-w1l4', title:'Design Mood Board Assignment',       type:'assignment',duration:'30 min' },
        ]
      },
      {
        title:  'Week 2: Canva Foundations',
        icon:   '✨',
        topics: ['Canva interface overview','Templates & customisation','Text, shapes & images','Background removal & effects'],
        lessons: [
          { id:'cd-w2l1', title:'Canva Interface & Tools Tour',       type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_cd2a' },
          { id:'cd-w2l2', title:'Working with Templates',             type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_cd2b' },
          { id:'cd-w2l3', title:'Background Removal Techniques',      type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_cd2c' },
          { id:'cd-w2l4', title:'First Canva Design Assignment',      type:'assignment',duration:'40 min' },
        ]
      },
      {
        title:  'Week 3: Canva Pro Mastery',
        icon:   '⚡',
        topics: ['Brand Kit setup','Magic Resize feature','Canva Pro exclusive tools','Exporting for different platforms'],
        lessons: [
          { id:'cd-w3l1', title:'Setting Up Your Brand Kit',          type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_cd3a' },
          { id:'cd-w3l2', title:'Magic Resize & Bulk Create',         type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample_cd3b' },
          { id:'cd-w3l3', title:'Advanced Canva Pro Tools',           type:'video',     duration:'25 min', isLive:true, liveDate:'2026-04-13T13:00:00', content_url:'https://www.youtube.com/embed/sample_cd3c' },
        ]
      },
      {
        title:  'Week 4: Branding & Logo Design',
        icon:   '🏢',
        topics: ['Logo design principles','Creating a brand identity','Colour palettes & style guides','Logo variations & files'],
        lessons: [
          { id:'cd-w4l1', title:'Logo Design Principles',             type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_cd4a' },
          { id:'cd-w4l2', title:'Building a Brand Identity',          type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_cd4b' },
          { id:'cd-w4l3', title:'Creating a Style Guide',             type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_cd4c' },
          { id:'cd-w4l4', title:'Logo Design Project',                type:'assignment',duration:'60 min' },
        ]
      },
      {
        title:  'Week 5: Social Media Design',
        icon:   '📱',
        topics: ['Instagram posts & stories','Facebook banners','LinkedIn & Twitter graphics','Carousel & Reel covers'],
        lessons: [
          { id:'cd-w5l1', title:'Instagram Design System',            type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_cd5a' },
          { id:'cd-w5l2', title:'Story & Reel Cover Design',          type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_cd5b' },
          { id:'cd-w5l3', title:'Social Media Kit Creation',          type:'video',     duration:'28 min', isLive:true, liveDate:'2026-04-20T15:00:00', content_url:'https://www.youtube.com/embed/sample_cd5c' },
          { id:'cd-w5l4', title:'Social Media Kit Assignment',        type:'assignment',duration:'50 min' },
        ]
      },
      {
        title:  'Week 6: Print & Marketing Materials',
        icon:   '🖨️',
        topics: ['Flyers & posters','Business card design','Banners & event graphics','Print-ready file export'],
        lessons: [
          { id:'cd-w6l1', title:'Flyer & Poster Design',              type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_cd6a' },
          { id:'cd-w6l2', title:'Business Card Design',               type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_cd6b' },
          { id:'cd-w6l3', title:'Print-Ready Export Settings',        type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_cd6c' },
          { id:'cd-w6l4', title:'Marketing Materials Assignment',     type:'assignment',duration:'45 min' },
        ]
      },
      {
        title:  'Week 7: Presentations & Proposals',
        icon:   '📊',
        topics: ['Pitch deck design','Proposal templates','Data visualisation','Animation & transitions'],
        lessons: [
          { id:'cd-w7l1', title:'Designing Pitch Decks',              type:'video',     duration:'32 min', content_url:'https://www.youtube.com/embed/sample_cd7a' },
          { id:'cd-w7l2', title:'Data Visualisation & Infographics',  type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_cd7b' },
          { id:'cd-w7l3', title:'Canva Animations & Transitions',     type:'video',     duration:'18 min', isLive:true, liveDate:'2026-04-27T14:00:00', content_url:'https://www.youtube.com/embed/sample_cd7c' },
        ]
      },
      {
        title:  'Week 8: Portfolio & Freelancing Launch',
        icon:   '📁',
        topics: ['Curating your design portfolio','Setting up on Fiverr & Behance','Pricing your design services','Final branding project'],
        lessons: [
          { id:'cd-w8l1', title:'Building Your Design Portfolio',     type:'video',     duration:'35 min', content_url:'https://www.youtube.com/embed/sample_cd8a' },
          { id:'cd-w8l2', title:'Fiverr & Behance Setup',             type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_cd8b' },
          { id:'cd-w8l3', title:'Final Branding Project',             type:'assignment',duration:'90 min', isLive:true, liveDate:'2026-05-04T14:00:00' },
          { id:'cd-w8l4', title:'Certification & Career Launch',      type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_cd8c' },
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SMART KIDS CODING — 4 WEEKS
  // ══════════════════════════════════════════════════════════════════════════
  'smart-kids-coding': {
    title:       'Smart Kids Coding',
    subtitle:    'Fun coding adventures for ages 6–12',
    description: 'Introduce children ages 6–12 to coding through Scratch! Build animations, interactive stories, and their very own games in a fun, guided 4-week program designed for young minds.',
    duration:    '4 Weeks',
    format:      'Interactive kids program · Parent-supported',
    totalLessons:16,
    students:    67,
    rating:      4.9,
    skills:      ['Block Coding','Scratch Programming','Animations','Storytelling','Game Design','Problem Solving','Logical Thinking','Creativity'],
    outcomes:    ['Build and share their first video game','Create animated stories in Scratch','Understand the basics of computer logic','Develop confidence in STEM'],
    weeks: [
      {
        title:  'Week 1: Hello, Coding!',
        icon:   '💻',
        topics: ['What is a computer program?','Introduction to Scratch','Moving sprites','Your first animation'],
        lessons: [
          { id:'kc-w1l1', title:'What is Coding? (Kids Edition)',     type:'video',     duration:'12 min', content_url:'https://www.youtube.com/embed/sample_kc1a' },
          { id:'kc-w1l2', title:'Getting Started with Scratch',       type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample_kc1b' },
          { id:'kc-w1l3', title:'Moving Your First Sprite',           type:'video',     duration:'15 min', isLive:true, liveDate:'2026-04-05T10:00:00', content_url:'https://www.youtube.com/embed/sample_kc1c' },
          { id:'kc-w1l4', title:'My First Animation!',                type:'assignment',duration:'20 min' },
        ]
      },
      {
        title:  'Week 2: Loops, Events & Animations',
        icon:   '🎬',
        topics: ['Loops & repeat blocks','Event triggers','Backdrops & scenes','Build an animated story'],
        lessons: [
          { id:'kc-w2l1', title:'Understanding Loops',                type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_kc2a' },
          { id:'kc-w2l2', title:'Event Triggers & When Blocks',       type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample_kc2b' },
          { id:'kc-w2l3', title:'Adding Backdrops & Scenes',          type:'video',     duration:'14 min', content_url:'https://www.youtube.com/embed/sample_kc2c' },
          { id:'kc-w2l4', title:'Build an Animated Story',            type:'assignment',duration:'25 min', isLive:true, liveDate:'2026-04-12T10:00:00' },
        ]
      },
      {
        title:  'Week 3: Game Design Fun',
        icon:   '🎮',
        topics: ['Characters & controls','Collision detection','Simple scoring system','Levels & challenges'],
        lessons: [
          { id:'kc-w3l1', title:'Game Characters & Controls',         type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample_kc3a' },
          { id:'kc-w3l2', title:'Collision & Scoring System',         type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_kc3b' },
          { id:'kc-w3l3', title:'Adding Levels to Your Game',         type:'video',     duration:'16 min', content_url:'https://www.youtube.com/embed/sample_kc3c' },
          { id:'kc-w3l4', title:'Game Build Practice',                type:'assignment',duration:'30 min' },
        ]
      },
      {
        title:  'Week 4: My Game Showcase 🏆',
        icon:   '🏆',
        topics: ['Finishing your game','Adding sounds & music','Sharing your project','Certificate celebration'],
        lessons: [
          { id:'kc-w4l1', title:'Finishing & Polishing Your Game',    type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_kc4a' },
          { id:'kc-w4l2', title:'Adding Sounds & Music',              type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_kc4b' },
          { id:'kc-w4l3', title:'Game Showcase Presentation',         type:'assignment',duration:'30 min', isLive:true, liveDate:'2026-04-19T10:00:00' },
          { id:'kc-w4l4', title:'Certification & Next Coding Steps',  type:'video',     duration:'12 min', content_url:'https://www.youtube.com/embed/sample_kc4c' },
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // FREELANCING & ONLINE INCOME — 4 WEEKS
  // ══════════════════════════════════════════════════════════════════════════
  'freelancing-online-income': {
    title:       'Freelancing & Online Income',
    subtitle:    'Start earning online in 4 focused weeks',
    description: 'Launch your freelancing career from scratch. Create winning profiles, find your first clients, set profitable pricing, and build a sustainable remote business in just 4 action-packed weeks.',
    duration:    '4 Weeks',
    format:      'Practical business training · Mentored',
    totalLessons:16,
    students:    203,
    rating:      4.8,
    skills:      ['Profile Creation','Proposal Writing','Client Finding','Pricing Strategy','Payment Setup','Client Communication','Business Systems','Scaling Income'],
    outcomes:    ['Land your first freelance client within 30 days','Set up a professional Upwork/Fiverr profile','Price your services with confidence','Build a system for recurring income'],
    weeks: [
      {
        title:  'Week 1: Freelancing Foundations',
        icon:   '🌟',
        topics: ['What is freelancing in 2025?','Top in-demand skills','Choosing your niche','Freelancing mindset'],
        lessons: [
          { id:'fl-w1l1', title:'What is Freelancing in 2025?',       type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_fl1a' },
          { id:'fl-w1l2', title:'Top In-Demand Freelancing Skills',   type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_fl1b' },
          { id:'fl-w1l3', title:'Choosing Your Profitable Niche',     type:'video',     duration:'18 min', isLive:true, liveDate:'2026-04-07T16:00:00', content_url:'https://www.youtube.com/embed/sample_fl1c' },
          { id:'fl-w1l4', title:'Niche Selection Assignment',         type:'assignment',duration:'25 min' },
        ]
      },
      {
        title:  'Week 2: Building Your Online Presence',
        icon:   '👤',
        topics: ['Creating a winning Upwork profile','Fiverr gig creation','Portfolio building','Writing proposals that win'],
        lessons: [
          { id:'fl-w2l1', title:'Upwork Profile Masterclass',         type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_fl2a' },
          { id:'fl-w2l2', title:'Creating Fiverr Gigs That Sell',     type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_fl2b' },
          { id:'fl-w2l3', title:'Writing Winning Proposals',          type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_fl2c' },
          { id:'fl-w2l4', title:'Profile Build Assignment',           type:'assignment',duration:'60 min' },
        ]
      },
      {
        title:  'Week 3: Finding Clients & Getting Paid',
        icon:   '🤝',
        topics: ['Where to find clients','Pricing strategies (hourly vs fixed)','Discovery call scripts','Payment methods for Africa & worldwide'],
        lessons: [
          { id:'fl-w3l1', title:'Where to Find Your First Client',    type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_fl3a' },
          { id:'fl-w3l2', title:'Pricing Strategies That Work',       type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_fl3b' },
          { id:'fl-w3l3', title:'Discovery Call Scripts & Tips',      type:'video',     duration:'20 min', isLive:true, liveDate:'2026-04-14T16:00:00', content_url:'https://www.youtube.com/embed/sample_fl3c' },
          { id:'fl-w3l4', title:'Payment Methods Setup',              type:'video',     duration:'18 min', content_url:'https://www.youtube.com/embed/sample_fl3d' },
        ]
      },
      {
        title:  'Week 4: Business Systems & Scaling',
        icon:   '🏗️',
        topics: ['Client management tools','Building long-term client relationships','Scaling from part-time to full-time','Final profile review & certification'],
        lessons: [
          { id:'fl-w4l1', title:'Client Management Systems',          type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_fl4a' },
          { id:'fl-w4l2', title:'Building Long-Term Client Relationships', type:'video', duration:'20 min', content_url:'https://www.youtube.com/embed/sample_fl4b' },
          { id:'fl-w4l3', title:'Scaling Your Freelance Income',      type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_fl4c' },
          { id:'fl-w4l4', title:'Final Profile Review & Certification', type:'assignment', duration:'45 min', isLive:true, liveDate:'2026-04-21T16:00:00' },
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════
  // AI PROMPT ENGINEERING — 8 WEEKS (NEW)
  // ══════════════════════════════════════════════════════════════════════════
  'ai-prompt-engineering': {
    title:       'AI Prompt Engineering Masterclass',
    subtitle:    'Master AI tools and become a sought-after prompt engineer in 8 weeks',
    description: 'The most in-demand skill of 2025. Learn to craft powerful prompts for ChatGPT, Claude, Midjourney & more. Build AI-powered workflows, automate tasks, and monetise your AI expertise in just 8 weeks.',
    duration:    '8 Weeks',
    format:      'Practical AI workshops · Live demos',
    totalLessons:24,
    students:    45,
    rating:      5.0,
    skills:      ['ChatGPT Mastery','Claude & Gemini','Midjourney & DALL-E','Prompt Frameworks','AI Automation','Content Generation','AI for Business','Monetising AI Skills'],
    outcomes:    ['Write prompts that generate professional-quality outputs','Automate repetitive business tasks with AI','Build AI-powered content workflows','Offer AI consulting services to businesses'],
    weeks: [
      {
        title:  'Week 1: Introduction to AI & Large Language Models',
        icon:   '🤖',
        topics: ['What are LLMs & how they work','ChatGPT, Claude, Gemini overview','Setting up your AI toolkit','Prompt basics & first exercises'],
        lessons: [
          { id:'ai-w1l1', title:'How AI Large Language Models Work',  type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_ai1a' },
          { id:'ai-w1l2', title:'Tour: ChatGPT, Claude & Gemini',     type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_ai1b' },
          { id:'ai-w1l3', title:'Your First 10 Prompts',              type:'video',     duration:'20 min', isLive:true, liveDate:'2026-04-06T17:00:00', content_url:'https://www.youtube.com/embed/sample_ai1c' },
          { id:'ai-w1l4', title:'Prompt Basics Assignment',           type:'assignment',duration:'30 min' },
        ]
      },
      {
        title:  'Week 2: Prompt Engineering Fundamentals',
        icon:   '⚙️',
        topics: ['Anatomy of a great prompt','Role, context, task & format','Zero-shot vs few-shot prompting','Chain-of-thought techniques'],
        lessons: [
          { id:'ai-w2l1', title:'Anatomy of a Perfect Prompt',        type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_ai2a' },
          { id:'ai-w2l2', title:'Zero-Shot & Few-Shot Prompting',     type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_ai2b' },
          { id:'ai-w2l3', title:'Chain-of-Thought Techniques',        type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_ai2c' },
          { id:'ai-w2l4', title:'Prompt Engineering Practice',        type:'assignment',duration:'45 min' },
        ]
      },
      {
        title:  'Week 3: AI for Content Creation',
        icon:   '✍️',
        topics: ['Generating blog posts & articles','Social media content at scale','Email & copywriting prompts','Editing & refining AI output'],
        lessons: [
          { id:'ai-w3l1', title:'AI Blog Writing Masterclass',        type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_ai3a' },
          { id:'ai-w3l2', title:'Social Media Content at Scale',      type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_ai3b' },
          { id:'ai-w3l3', title:'AI Email & Copywriting',             type:'video',     duration:'22 min', isLive:true, liveDate:'2026-04-13T17:00:00', content_url:'https://www.youtube.com/embed/sample_ai3c' },
          { id:'ai-w3l4', title:'Content Creation Project',           type:'assignment',duration:'50 min' },
        ]
      },
      {
        title:  'Week 4: AI Image Generation (Midjourney & DALL-E)',
        icon:   '🎨',
        topics: ['Midjourney prompt structure','DALL-E 3 techniques','Style & composition control','Creating commercial-quality images'],
        lessons: [
          { id:'ai-w4l1', title:'Midjourney Prompt Masterclass',      type:'video',     duration:'35 min', content_url:'https://www.youtube.com/embed/sample_ai4a' },
          { id:'ai-w4l2', title:'DALL-E 3 for Business',              type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_ai4b' },
          { id:'ai-w4l3', title:'Style & Composition Control',        type:'video',     duration:'22 min', content_url:'https://www.youtube.com/embed/sample_ai4c' },
          { id:'ai-w4l4', title:'AI Image Portfolio Project',         type:'assignment',duration:'60 min' },
        ]
      },
      {
        title:  'Week 5: AI for Business & Productivity',
        icon:   '💼',
        topics: ['AI for data analysis','Meeting summaries & reports','Customer service chatbots','AI-powered research'],
        lessons: [
          { id:'ai-w5l1', title:'AI for Data Analysis',               type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_ai5a' },
          { id:'ai-w5l2', title:'Automated Reports & Summaries',      type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_ai5b' },
          { id:'ai-w5l3', title:'Building Customer Service Prompts',  type:'video',     duration:'22 min', isLive:true, liveDate:'2026-04-20T17:00:00', content_url:'https://www.youtube.com/embed/sample_ai5c' },
          { id:'ai-w5l4', title:'Business AI Workflow Assignment',    type:'assignment',duration:'45 min' },
        ]
      },
      {
        title:  'Week 6: AI Automation Workflows',
        icon:   '⚡',
        topics: ['Zapier + AI automation','Make.com AI integrations','Building prompt pipelines','N8N & no-code AI tools'],
        lessons: [
          { id:'ai-w6l1', title:'Zapier + ChatGPT Automations',       type:'video',     duration:'35 min', content_url:'https://www.youtube.com/embed/sample_ai6a' },
          { id:'ai-w6l2', title:'Make.com AI Workflows',              type:'video',     duration:'30 min', content_url:'https://www.youtube.com/embed/sample_ai6b' },
          { id:'ai-w6l3', title:'Building AI Prompt Pipelines',       type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_ai6c' },
          { id:'ai-w6l4', title:'Automation Build Assignment',        type:'assignment',duration:'60 min' },
        ]
      },
      {
        title:  'Week 7: Monetising Your AI Skills',
        icon:   '💰',
        topics: ['Selling prompt packs on Gumroad','AI consulting services','Prompt engineering jobs & platforms','Building an AI service business'],
        lessons: [
          { id:'ai-w7l1', title:'Selling AI Prompts Online',          type:'video',     duration:'28 min', content_url:'https://www.youtube.com/embed/sample_ai7a' },
          { id:'ai-w7l2', title:'AI Consulting: How to Get Clients',  type:'video',     duration:'25 min', content_url:'https://www.youtube.com/embed/sample_ai7b' },
          { id:'ai-w7l3', title:'Building an AI Service Business',    type:'video',     duration:'22 min', isLive:true, liveDate:'2026-04-27T17:00:00', content_url:'https://www.youtube.com/embed/sample_ai7c' },
          { id:'ai-w7l4', title:'Monetisation Strategy Assignment',   type:'assignment',duration:'40 min' },
        ]
      },
      {
        title:  'Week 8: Final AI Project & Certification',
        icon:   '🎓',
        topics: ['Build a complete AI workflow solution','Present your AI project','Prompt portfolio submission','Certification & community launch'],
        lessons: [
          { id:'ai-w8l1', title:'Building Your AI Showcase Project',  type:'video',     duration:'40 min', content_url:'https://www.youtube.com/embed/sample_ai8a' },
          { id:'ai-w8l2', title:'AI Workflow Final Project',          type:'assignment',duration:'90 min', isLive:true, liveDate:'2026-05-04T17:00:00' },
          { id:'ai-w8l3', title:'Portfolio Review & Feedback',        type:'video',     duration:'20 min', content_url:'https://www.youtube.com/embed/sample_ai8b' },
          { id:'ai-w8l4', title:'Certification & AI Community Launch',type:'video',     duration:'15 min', content_url:'https://www.youtube.com/embed/sample_ai8c' },
        ]
      }
    ]
  }
}

// ─── Progress ring ────────────────────────────────────────────────────────────
function ProgressRing({ pct = 0, size = 80, stroke = 6, color }) {
  const r = (size - stroke * 2) / 2
  const circ = 2 * Math.PI * r
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color || 'rgba(255,255,255,0.9)'}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ - (pct/100)*circ}
        style={{ transition: 'stroke-dashoffset .6s ease' }}/>
    </svg>
  )
}

// ─── 3D Course Hero Illustration ──────────────────────────────────────────────
function CourseHeroArt({ slug, theme }) {
  const illustrations = {
    'virtual-assistant-pro': (
      <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.25)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)"/>
          </linearGradient>
          <filter id="sh1"><feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="rgba(0,0,0,0.25)"/></filter>
        </defs>
        {/* Laptop body */}
        <rect x="30" y="60" width="140" height="90" rx="8" fill="url(#lap)" filter="url(#sh1)"/>
        <rect x="30" y="60" width="140" height="90" rx="8" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        {/* Screen */}
        <rect x="40" y="68" width="120" height="70" rx="4" fill="rgba(255,255,255,0.12)"/>
        {/* Screen content lines */}
        <rect x="50" y="80" width="60" height="5" rx="2" fill="rgba(255,255,255,0.5)"/>
        <rect x="50" y="90" width="80" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
        <rect x="50" y="98" width="70" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
        <rect x="50" y="106" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.3)"/>
        {/* Envelope icon */}
        <rect x="120" y="78" width="28" height="20" rx="3" fill={C.orange} fillOpacity=".8"/>
        <polyline points="120,78 134,90 148,78" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5"/>
        {/* Keyboard */}
        <rect x="35" y="152" width="130" height="8" rx="4" fill="rgba(255,255,255,0.2)"/>
        {/* Calendar floating card */}
        <rect x="130" y="40" width="45" height="40" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        <rect x="130" y="40" width="45" height="12" rx="6" fill="rgba(255,255,255,0.3)"/>
        <text x="152" y="51" fontSize="7" textAnchor="middle" fill="white" fontWeight="bold">APRIL</text>
        <text x="145" y="68" fontSize="10" fill="white" fontWeight="bold">15</text>
        {/* Chat bubble */}
        <rect x="15" y="45" width="38" height="22" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <rect x="19" y="50" width="22" height="2.5" rx="1" fill="rgba(255,255,255,0.6)"/>
        <rect x="19" y="55" width="28" height="2.5" rx="1" fill="rgba(255,255,255,0.4)"/>
        <rect x="19" y="60" width="18" height="2.5" rx="1" fill="rgba(255,255,255,0.4)"/>
        <polygon points="18,67 25,67 21,73" fill="rgba(255,255,255,0.2)"/>
      </svg>
    ),
    'social-media-marketing': (
      <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ph" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)"/>
          </linearGradient>
          <filter id="sh2"><feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="rgba(0,0,0,0.3)"/></filter>
        </defs>
        {/* Phone */}
        <rect x="65" y="20" width="70" height="130" rx="12" fill="url(#ph)" filter="url(#sh2)"/>
        <rect x="65" y="20" width="70" height="130" rx="12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
        <rect x="72" y="32" width="56" height="90" rx="4" fill="rgba(255,255,255,0.12)"/>
        {/* Notch */}
        <rect x="88" y="24" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.3)"/>
        {/* Instagram-style post */}
        <rect x="74" y="34" width="52" height="40" rx="3" fill="rgba(255,255,255,0.2)"/>
        <circle cx="100" cy="54" r="12" fill="rgba(255,122,0,0.5)"/>
        <text x="100" y="59" fontSize="12" textAnchor="middle" fill="white">❤️</text>
        {/* Like/Comment row */}
        <rect x="74" y="78" width="14" height="4" rx="2" fill="rgba(255,255,255,0.5)"/>
        <rect x="92" y="78" width="14" height="4" rx="2" fill="rgba(255,255,255,0.35)"/>
        {/* Stats bars */}
        <rect x="74" y="88" width="52" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
        <rect x="74" y="88" width="38" height="3" rx="1.5" fill="rgba(255,255,255,0.6)"/>
        <rect x="74" y="95" width="52" height="3" rx="1.5" fill="rgba(255,255,255,0.2)"/>
        <rect x="74" y="95" width="25" height="3" rx="1.5" fill="rgba(255,255,255,0.6)"/>
        {/* Floating metric cards */}
        <rect x="10" y="50" width="50" height="28" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <text x="35" y="62" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,0.7)">Reach</text>
        <text x="35" y="73" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">12.4K</text>
        <rect x="140" y="50" width="50" height="28" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <text x="165" y="62" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,0.7)">Likes</text>
        <text x="165" y="73" fontSize="10" textAnchor="middle" fill="white" fontWeight="bold">8.9K</text>
        {/* Chart */}
        <polyline points="15,160 35,145 55,150 75,135 95,140 115,125 135,130 155,115 175,120" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    'canva-graphic-design': (
      <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="sh3"><feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="rgba(0,0,0,0.2)"/></filter>
        </defs>
        {/* Canvas board */}
        <rect x="30" y="25" width="130" height="110" rx="8" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" filter="url(#sh3)"/>
        {/* Color swatches */}
        <circle cx="50" cy="50" r="10" fill="#FF7A00" fillOpacity=".8"/>
        <circle cx="74" cy="50" r="10" fill="#1A3D7C" fillOpacity=".8"/>
        <circle cx="98" cy="50" r="10" fill="#008F4C" fillOpacity=".8"/>
        <circle cx="122" cy="50" r="10" fill="#E6B800" fillOpacity=".8"/>
        {/* Design grid */}
        <rect x="38" y="68" width="50" height="50" rx="5" fill="rgba(255,255,255,0.2)"/>
        <rect x="95" y="68" width="58" height="22" rx="5" fill="rgba(255,255,255,0.2)"/>
        <rect x="95" y="96" width="28" height="22" rx="5" fill="rgba(255,122,0,0.4)"/>
        <rect x="125" y="96" width="28" height="22" rx="5" fill="rgba(255,255,255,0.15)"/>
        {/* Image placeholder */}
        <circle cx="63" cy="93" r="15" fill="rgba(255,122,0,0.35)"/>
        <text x="63" y="98" fontSize="14" textAnchor="middle" fill="white">🎨</text>
        {/* Pen tool floating */}
        <rect x="140" y="15" width="35" height="22" rx="6" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        <text x="157" y="27" fontSize="14" textAnchor="middle">✏️</text>
        {/* Typography lines */}
        <rect x="38" y="125" width="80" height="5" rx="2.5" fill="rgba(255,255,255,0.6)"/>
        <rect x="38" y="134" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.35)"/>
      </svg>
    ),
    'smart-kids-coding': (
      <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Code blocks */}
        <rect x="15" y="30" width="75" height="30" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
        <text x="27" y="48" fontSize="9" fill="rgba(255,255,255,0.8)" fontFamily="monospace">if score &gt; 10:</text>
        <rect x="15" y="68" width="75" height="20" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <text x="27" y="81" fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="monospace">  win = True</text>
        <rect x="15" y="96" width="90" height="20" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
        <text x="27" y="109" fontSize="9" fill="rgba(255,255,255,0.7)" fontFamily="monospace">repeat 10 times:</text>
        {/* Scratch-style blocks */}
        <rect x="105" y="30" width="80" height="25" rx="8" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.5)" strokeWidth="1"/>
        <text x="145" y="47" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">🚀 Move 10 steps</text>
        <rect x="105" y="63" width="80" height="25" rx="8" fill="rgba(255,122,0,0.5)" stroke="rgba(255,200,0,0.5)" strokeWidth="1"/>
        <text x="145" y="80" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">🔄 Repeat 10×</text>
        <rect x="105" y="96" width="80" height="25" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
        <text x="145" y="113" fontSize="8" textAnchor="middle" fill="white" fontWeight="bold">🔊 Play sound</text>
        {/* Game character */}
        <circle cx="100" cy="148" r="18" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <text x="100" y="155" fontSize="18" textAnchor="middle">👾</text>
        {/* Stars */}
        <text x="40" y="152" fontSize="16">⭐</text>
        <text x="160" y="150" fontSize="14">⭐</text>
        <text x="70" y="170" fontSize="12">⭐</text>
      </svg>
    ),
    'freelancing-online-income': (
      <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="sh5"><feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="rgba(0,0,0,0.2)"/></filter>
        </defs>
        {/* Upward chart */}
        <polyline points="20,150 50,120 80,130 110,90 140,100 170,60" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="3" strokeLinecap="round"/>
        <circle cx="170" cy="60" r="5" fill="white"/>
        <circle cx="110" cy="90" r="4" fill="rgba(255,255,255,0.7)"/>
        <circle cx="50" cy="120" r="4" fill="rgba(255,255,255,0.7)"/>
        {/* Dollar cards */}
        <rect x="20" y="25" width="55" height="45" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" filter="url(#sh5)"/>
        <text x="47" y="53" fontSize="22" textAnchor="middle">💵</text>
        <rect x="85" y="15" width="55" height="45" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
        <text x="112" y="43" fontSize="22" textAnchor="middle">💻</text>
        <rect x="142" y="25" width="45" height="45" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2"/>
        <text x="164" y="53" fontSize="18" textAnchor="middle">🌍</text>
        {/* Income badge */}
        <rect x="55" y="105" width="90" height="35" rx="10" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <text x="100" y="119" fontSize="8" textAnchor="middle" fill="rgba(255,255,255,0.8)">Monthly Income</text>
        <text x="100" y="133" fontSize="13" textAnchor="middle" fill="white" fontWeight="bold">$1,500 – $5,000</text>
      </svg>
    ),
    'ai-prompt-engineering': (
      <svg viewBox="0 0 200 180" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="aiGlow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="rgba(139,92,246,0.4)"/>
            <stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        {/* Glow center */}
        <circle cx="100" cy="90" r="60" fill="url(#aiGlow)"/>
        {/* Brain/network nodes */}
        <circle cx="100" cy="90" r="22" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
        <text x="100" y="98" fontSize="20" textAnchor="middle">🤖</text>
        {/* Connection lines */}
        {[
          [100,90,40,30],[100,90,160,30],[100,90,20,90],[100,90,180,90],
          [100,90,40,155],[100,90,160,155],[100,90,100,15],[100,90,100,165]
        ].map(([x1,y1,x2,y2],i)=>(
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="3,3"/>
        ))}
        {/* Satellite nodes */}
        {[
          {cx:40,cy:30,l:'ChatGPT'},{cx:160,cy:30,l:'Claude'},{cx:20,cy:90,l:'DALL-E'},
          {cx:180,cy:90,l:'Gemini'},{cx:40,cy:155,l:'Zapier'},{cx:160,cy:155,l:'Make'}
        ].map((n,i)=>(
          <g key={i}>
            <circle cx={n.cx} cy={n.cy} r="14" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>
            <text x={n.cx} y={n.cy+4} fontSize="6" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontWeight="bold">{n.l}</text>
          </g>
        ))}
        {/* Prompt text */}
        <rect x="55" y="160" width="90" height="12" rx="3" fill="rgba(255,255,255,0.15)"/>
        <text x="100" y="170" fontSize="7" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontFamily="monospace">Act as an expert...</text>
      </svg>
    ),
  }
  return illustrations[slug] || illustrations['virtual-assistant-pro']
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function CourseCurriculum() {
  const { slug }          = useParams()
  const navigate          = useNavigate()
  const location          = useLocation()
  const { user, profile } = useAuth()

  const course  = curriculumData[slug]
  const theme   = courseThemes[slug] || courseThemes['virtual-assistant-pro']
  const courseId= courseIdMapping[slug]

  // ── State ────────────────────────────────────────────────────────────────
  const [openWeeks,        setOpenWeeks]        = useState({ 0:true })
  const [completedLessons, setCompletedLessons] = useState([])
  const [bookmarked,       setBookmarked]       = useState([])
  const [notes,            setNotes]            = useState({})
  const [viewMode,         setViewMode]         = useState('list')
  const [showPlayer,       setShowPlayer]       = useState(false)
  const [currentVideo,     setCurrentVideo]     = useState(null)
  const [currentNote,      setCurrentNote]      = useState('')
  const [noteSaved,        setNoteSaved]        = useState(false)
  const [mobileMenu,       setMobileMenu]       = useState(false)
  const [activePanel,      setActivePanel]      = useState('curriculum')
  const [loading,          setLoading]          = useState(false)
  const [isOnline,         setIsOnline]         = useState(navigator.onLine)
  const [animateIn,        setAnimateIn]        = useState(false)
  const [activeInfoTab,    setActiveInfoTab]    = useState('about')
  const [showAllWeeks,     setShowAllWeeks]     = useState(false)

  // ── Effects ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!slug || !course) { navigate('/courses'); return }
    setTimeout(() => setAnimateIn(true), 80)
  }, [slug])

  useEffect(() => {
    const on  = () => setIsOnline(true)
    const off = () => setIsOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  useEffect(() => {
    if (!user || !courseId) return
    const load = async () => {
      try {
        const [{ data:prog }, { data:bms }, { data:ns }] = await Promise.all([
          supabase.from('lesson_completion').select('lesson_id').eq('user_id', user.id),
          supabase.from('bookmarks').select('lesson_id').eq('user_id', user.id),
          supabase.from('notes').select('lesson_id,content').eq('user_id', user.id),
        ])
        if (prog) setCompletedLessons(prog.map(p => p.lesson_id))
        if (bms)  setBookmarked(bms.map(b => b.lesson_id))
        if (ns)   { const m = {}; ns.forEach(n => { m[n.lesson_id] = n.content }); setNotes(m) }
      } catch (e) { console.error(e) }
    }
    load()
  }, [user, courseId])

  // ── Computed ──────────────────────────────────────────────────────────────
  if (!course) return null
  const allLessons = course.weeks.flatMap(w => w.lessons)
  const progress   = allLessons.length ? Math.round((completedLessons.length / allLessons.length) * 100) : 0
  const liveLessons = allLessons.filter(l => l.isLive && l.liveDate && new Date(l.liveDate) > new Date())
  const nextLive   = liveLessons.sort((a,b) => new Date(a.liveDate)-new Date(b.liveDate))[0]
  const weeksToShow = showAllWeeks ? course.weeks : course.weeks.slice(0, 4)

  // ── Actions ───────────────────────────────────────────────────────────────
  const toggleWeek  = i  => setOpenWeeks(p => ({ ...p, [i]: !p[i] }))
  const expandAll   = () => { const a={}; course.weeks.forEach((_,i)=>{a[i]=true}); setOpenWeeks(a) }
  const collapseAll = () => setOpenWeeks({})

  const markComplete = async (id) => {
    if (!user) { navigate('/login', { state:{ from:`/course-curriculum/${slug}` } }); return }
    setCompletedLessons(p => p.includes(id) ? p.filter(x=>x!==id) : [...p, id])
    try {
      if (completedLessons.includes(id)) {
        await supabase.from('lesson_completion').delete().eq('user_id', user.id).eq('lesson_id', id)
      } else {
        await supabase.from('lesson_completion').insert({ user_id: user.id, lesson_id: id, completed_at: new Date().toISOString() })
      }
    } catch(e) { console.error(e) }
  }

  const toggleBookmark = async (id) => {
    if (!user) { navigate('/login'); return }
    const was = bookmarked.includes(id)
    setBookmarked(p => was ? p.filter(x=>x!==id) : [...p, id])
    try {
      if (was) await supabase.from('bookmarks').delete().eq('user_id', user.id).eq('lesson_id', id)
      else     await supabase.from('bookmarks').insert({ user_id: user.id, lesson_id: id })
    } catch(e) { console.error(e) }
  }

  const saveNote = async (id) => {
    if (!user) return
    try {
      await supabase.from('notes').upsert({ user_id: user.id, lesson_id: id, content: currentNote, updated_at: new Date().toISOString() }, { onConflict:'user_id,lesson_id' })
      setNotes(p => ({ ...p, [id]: currentNote }))
      setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2000)
    } catch(e) { console.error(e) }
  }

  const openLesson = (lesson) => {
    if (lesson.type === 'assignment') return
    setCurrentVideo(lesson)
    setCurrentNote(notes[lesson.id] || '')
    setShowPlayer(true)
  }

  const handleContinue = () => {
    if (!user) { navigate('/login', { state:{ from:`/course-curriculum/${slug}` } }); return }
    navigate(`/test-course-player/${courseId}`)
  }

  const formatLiveDate = (d) => {
    const diff = new Date(d) - new Date()
    if (diff < 0) return 'Live Now 🔴'
    const days  = Math.floor(diff / 864e5)
    const hours = Math.floor((diff % 864e5) / 36e5)
    if (days  > 0) return `In ${days}d ${hours}h`
    if (hours > 0) return `In ${hours}h`
    return 'Starting soon'
  }

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: C.gray[50] }}>

      {/* ── OFFLINE BANNER ─────────────────────────────────────────────── */}
      {!isOnline && (
        <div className="sticky top-0 z-50 px-4 py-2.5 flex items-center gap-2 text-sm font-medium"
          style={{ background: '#FEF3C7', borderBottom: `1px solid ${C.yellow}` }}>
          <WifiOff size={15} style={{ color: C.amber }} />
          <span style={{ color: C.amber }}>You're offline — some features may be unavailable</span>
        </div>
      )}

      {/* ── MOBILE HEADER ──────────────────────────────────────────────── */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-white shadow-sm"
        style={{ borderBottom: `1px solid ${C.gray[200]}` }}>
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-gray-100">
          <ArrowLeft size={20} style={{ color: C.gray[600] }} />
        </button>
        <p className="font-bold text-sm truncate max-w-[160px]" style={{ color: C.navy }}>{course.title}</p>
        <button onClick={() => setMobileMenu(o=>!o)} className="p-2 rounded-xl hover:bg-gray-100">
          {mobileMenu ? <X size={20}/> : <Menu size={20}/>}
        </button>
      </div>

      {/* ── MOBILE SLIDE MENU ──────────────────────────────────────────── */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileMenu(false)}/>
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto">
            <div className="p-4 flex justify-between items-center border-b" style={{ borderColor: C.gray[200] }}>
              <p className="font-black" style={{ color: C.navy }}>Menu</p>
              <button onClick={() => setMobileMenu(false)}><X size={18}/></button>
            </div>
            <div className="p-4 space-y-2">
              {[
                { to:'/dashboard',  icon:BookOpen,      label:'Dashboard'      },
                { to:'/community',  icon:Users,         label:'Community'      },
                { to:'/courses',    icon:GraduationCap, label:'Browse Courses' },
                { to:'/support',    icon:MessageCircle, label:'Support'        },
              ].map((item,i) => (
                <Link key={i} to={item.to} onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-3 p-3 rounded-xl transition"
                  style={{ background: C.gray[50] }}>
                  <item.icon size={17} style={{ color: theme.accent }}/>
                  <span className="text-sm font-medium" style={{ color: C.gray[700] }}>{item.label}</span>
                </Link>
              ))}
            </div>
            {/* Mobile progress */}
            <div className="mx-4 p-4 rounded-2xl" style={{ background: theme.gradient }}>
              <p className="text-white font-bold text-sm mb-2">Your Progress</p>
              <div className="h-2 rounded-full bg-white/20 overflow-hidden mb-1">
                <div className="h-full rounded-full bg-white/80" style={{ width:`${progress}%`, transition:'width .5s' }}/>
              </div>
              <p className="text-white/70 text-xs">{completedLessons.length}/{allLessons.length} lessons done</p>
            </div>
          </div>
        </div>
      )}

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: theme.gradient, minHeight: '340px' }}>
        {/* 3D decorative shapes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-10 bg-white"/>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-10 bg-white"/>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 rounded-2xl opacity-5 bg-white rotate-12"/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-16">
          {/* Desktop back button */}
          <button onClick={() => navigate(-1)}
            className="hidden lg:flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-all group text-sm">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
            Back to Courses
          </button>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Info */}
            <div className={`transition-all duration-600 ${animateIn?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-3xl">{theme.emoji}</span>
                <span className="px-3 py-1 rounded-full text-xs font-bold text-white bg-white/20 backdrop-blur-sm">
                  {course.duration} Program
                </span>
                {nextLive && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold text-white animate-pulse" style={{ background: C.rose }}>
                    🔴 Live Coming Up
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2">
                {course.title}
              </h1>
              <p className="text-white/80 text-base mb-4">{course.subtitle}</p>
              <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-lg">{course.description}</p>

              {/* Stats strip */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon:Calendar,   v:course.duration    },
                  { icon:BookOpen,   v:`${course.weeks.length} Weeks` },
                  { icon:Target,     v:`${allLessons.length} Lessons` },
                  { icon:Users,      v:`${course.students} Students` },
                  { icon:Star,       v:`${course.rating}★` },
                ].map((s,i) => (
                  <div key={i} className="flex items-center gap-1.5 text-white/90 text-xs font-semibold">
                    <s.icon size={13} className="opacity-70"/>
                    <span>{s.v}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleContinue}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
                  style={{ background:'#fff', color:theme.accent }}>
                  <PlayCircle size={16}/>
                  {completedLessons.length > 0 ? 'Continue Learning' : 'Start Learning'}
                </button>
                <Link to="/dashboard"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm border-2 border-white/40 text-white hover:bg-white/10 transition-all">
                  <BarChart3 size={16}/> Dashboard
                </Link>
              </div>
            </div>

            {/* Right: 3D art */}
            <div className={`hidden lg:flex justify-center items-center transition-all duration-600 delay-200 ${animateIn?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
              <div className="relative w-80 h-72">
                {/* Glow effect */}
                <div className="absolute inset-4 rounded-3xl opacity-30 blur-2xl"
                  style={{ background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)` }}/>
                {/* Progress ring overlay */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="relative w-20 h-20">
                    <ProgressRing pct={progress} size={80} stroke={6}/>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-white font-black text-lg leading-none">{progress}%</span>
                      <span className="text-white/60 text-[9px]">done</span>
                    </div>
                  </div>
                </div>
                {/* Art card */}
                <div className="w-full h-full rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden shadow-2xl p-4">
                  <CourseHeroArt slug={slug} theme={theme}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SKILLS STRIP ───────────────────────────────────────────────── */}
      <div className="bg-white border-b overflow-x-auto" style={{ borderColor: C.gray[200] }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 flex-nowrap">
          <span className="text-xs font-bold whitespace-nowrap flex-shrink-0" style={{ color: C.gray[400] }}>Skills you'll gain:</span>
          {course.skills.map((s, i) => (
            <span key={i} className="text-xs px-3 py-1 rounded-full font-semibold whitespace-nowrap flex-shrink-0"
              style={{ background: `${theme.accent}12`, color: theme.accent, border: `1px solid ${theme.accent}25` }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN BODY ──────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ══════════════════════════════════════════════════════════════
              LEFT MAIN CONTENT
          ══════════════════════════════════════════════════════════════ */}
          <div className="flex-1 min-w-0">

            {/* INFO TABS */}
            <div className="flex gap-1 mb-5 overflow-x-auto pb-1">
              {[
                { id:'curriculum', label:'📚 Curriculum' },
                { id:'about',      label:'ℹ️ About'       },
                { id:'outcomes',   label:'🎯 Outcomes'    },
                { id:'resources',  label:'📁 Resources'   },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveInfoTab(tab.id)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0"
                  style={{
                    background: activeInfoTab === tab.id ? theme.accent : 'white',
                    color:      activeInfoTab === tab.id ? '#fff' : C.gray[600],
                    border:     `1px solid ${activeInfoTab === tab.id ? theme.accent : C.gray[200]}`,
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* ── ABOUT TAB ─────────────────────────────────────────────── */}
            {activeInfoTab === 'about' && (
              <div className="space-y-4 mb-5">
                <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
                  <h2 className="font-black text-base mb-3" style={{ color: C.navy }}>About This Course</h2>
                  <p className="text-sm leading-relaxed" style={{ color: C.gray[600] }}>{course.description}</p>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { icon:Calendar,   label:'Duration',  v:course.duration        },
                      { icon:Clock,      label:'Format',    v:course.format          },
                      { icon:Users,      label:'Students',  v:`${course.students}+`  },
                      { icon:Star,       label:'Rating',    v:`${course.rating}/5.0` },
                    ].map((s,i) => (
                      <div key={i} className="p-3 rounded-xl text-center" style={{ background: C.gray[50] }}>
                        <s.icon size={18} className="mx-auto mb-1" style={{ color: theme.accent }}/>
                        <p className="font-black text-sm" style={{ color: C.navy }}>{s.v}</p>
                        <p className="text-[10px]" style={{ color: C.gray[400] }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── OUTCOMES TAB ──────────────────────────────────────────── */}
            {activeInfoTab === 'outcomes' && (
              <div className="bg-white rounded-2xl p-5 shadow-sm mb-5" style={{ border:`1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Trophy size={16} style={{ color: C.yellow }}/>What You'll Achieve
                </h2>
                <div className="space-y-3">
                  {course.outcomes.map((o, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background:`${theme.accent}08`, border:`1px solid ${theme.accent}18` }}>
                      <CheckCircle size={16} style={{ color: theme.accent, flexShrink:0, marginTop:1 }}/>
                      <span className="text-sm" style={{ color: C.gray[700] }}>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── RESOURCES TAB ─────────────────────────────────────────── */}
            {activeInfoTab === 'resources' && (
              <div className="bg-white rounded-2xl p-5 shadow-sm mb-5" style={{ border:`1px solid ${C.gray[200]}` }}>
                <h2 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: C.navy }}>
                  <Download size={16} style={{ color: C.navyMid }}/>Course Resources
                </h2>
                <div className="space-y-3">
                  {['Course Workbook PDF','Lesson Notes Pack','Templates Bundle','Resource Links Doc'].map((r,i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl"
                      style={{ background: C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                      <div className="flex items-center gap-3">
                        <FileText size={16} style={{ color: theme.accent }}/>
                        <span className="text-sm font-medium" style={{ color: C.gray[700] }}>{r}</span>
                      </div>
                      <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                        style={{ background: theme.accent }}>
                        <Download size={11}/>Get
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── CURRICULUM TAB ────────────────────────────────────────── */}
            {activeInfoTab === 'curriculum' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-black text-base flex items-center gap-2" style={{ color: C.navy }}>
                      <BookOpen size={16} style={{ color: theme.accent }}/>Course Curriculum
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: C.gray[400] }}>
                      {course.weeks.length} weeks · {allLessons.length} lessons · {course.format}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex bg-gray-100 rounded-xl p-1 gap-1">
                      <button onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-lg transition ${viewMode==='list'?'bg-white shadow':''}`}>
                        <List size={14} style={{ color: viewMode==='list'?theme.accent:C.gray[400] }}/>
                      </button>
                      <button onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-lg transition ${viewMode==='grid'?'bg-white shadow':''}`}>
                        <Grid size={14} style={{ color: viewMode==='grid'?theme.accent:C.gray[400] }}/>
                      </button>
                    </div>
                    <button onClick={expandAll}
                      className="px-2 py-1 text-xs font-medium rounded-lg" style={{ background: C.gray[100], color: C.gray[600] }}>
                      Expand All
                    </button>
                    <button onClick={collapseAll}
                      className="px-2 py-1 text-xs font-medium rounded-lg" style={{ background: C.gray[100], color: C.gray[600] }}>
                      Collapse
                    </button>
                  </div>
                </div>

                {/* Week cards */}
                <div className="space-y-3">
                  {weeksToShow.map((week, wi) => (
                    <div key={wi} className={`bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-500 hover:shadow-md ${animateIn?'opacity-100 translate-y-0':'opacity-0 translate-y-4'}`}
                      style={{ border:`1px solid ${C.gray[200]}`, transitionDelay:`${wi*60+200}ms` }}>

                      {/* Week header */}
                      <button onClick={() => toggleWeek(wi)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                            style={{ background:`${theme.accent}15` }}>
                            {week.icon}
                          </div>
                          <div className="text-left min-w-0">
                            <p className="font-bold text-sm truncate" style={{ color: C.navy }}>{week.title}</p>
                            <div className="flex items-center gap-3 mt-0.5">
                              <span className="text-[10px]" style={{ color: C.gray[400] }}>
                                {week.lessons.length} lessons
                              </span>
                              <span className="text-[10px]" style={{ color: C.gray[300] }}>·</span>
                              <span className="text-[10px]" style={{ color: C.gray[400] }}>
                                {week.lessons.filter(l => completedLessons.includes(l.id)).length}/{week.lessons.length} done
                              </span>
                              {week.lessons.some(l => l.isLive) && (
                                <span className="text-[10px] font-bold animate-pulse" style={{ color: C.rose }}>🔴 Live</span>
                              )}
                            </div>
                          </div>
                        </div>
                        {/* Mini progress */}
                        <div className="hidden sm:flex items-center gap-3 mr-3">
                          <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: C.gray[200] }}>
                            <div className="h-full rounded-full" style={{
                              width:`${week.lessons.length ? (week.lessons.filter(l=>completedLessons.includes(l.id)).length/week.lessons.length)*100 : 0}%`,
                              background: theme.gradient,
                              transition:'width .4s'
                            }}/>
                          </div>
                        </div>
                        {openWeeks[wi] ? <ChevronUp size={16} style={{ color: C.gray[400] }}/> : <ChevronDown size={16} style={{ color: C.gray[400] }}/>}
                      </button>

                      {/* Week body */}
                      <div className={`transition-all duration-300 overflow-hidden ${openWeeks[wi]?'max-h-[2000px] opacity-100':'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 border-t" style={{ borderColor: C.gray[100] }}>
                          {/* Topic chips */}
                          <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                            {week.topics.map((t, ti) => (
                              <span key={ti} className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                style={{ background:`${theme.accent}10`, color:theme.accent }}>
                                {t}
                              </span>
                            ))}
                          </div>

                          {/* Lessons */}
                          {viewMode === 'list' ? (
                            <div className="space-y-2">
                              {week.lessons.map((lesson, li) => {
                                const done = completedLessons.includes(lesson.id)
                                const bm   = bookmarked.includes(lesson.id)
                                return (
                                  <div key={li}
                                    className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all hover:shadow-sm group"
                                    style={{ background: done ? `${C.green}08` : C.gray[50], border:`1px solid ${done?C.green+'25':C.gray[200]}` }}
                                    onClick={() => openLesson(lesson)}>
                                    {/* Complete toggle */}
                                    <button onClick={e => { e.stopPropagation(); markComplete(lesson.id) }}
                                      className="flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all"
                                      style={{ borderColor: done?C.green:C.gray[300], background: done?C.green:'transparent' }}>
                                      {done && <Check size={12} className="text-white"/>}
                                    </button>
                                    {/* Type icon */}
                                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                                      style={{ background:`${theme.accent}15` }}>
                                      {lesson.type === 'assignment'
                                        ? <FileText size={14} style={{ color: theme.accent }}/>
                                        : <PlayCircle size={14} style={{ color: theme.accent }}/>}
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-xs font-semibold truncate ${done?'line-through opacity-60':''}`}
                                        style={{ color: C.gray[800] }}>{lesson.title}</p>
                                      <div className="flex items-center gap-2 mt-0.5">
                                        <span className="text-[10px]" style={{ color: C.gray[400] }}>{lesson.duration}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded-full"
                                          style={{ background:`${theme.accent}12`, color:theme.accent }}>
                                          {lesson.type === 'assignment' ? '📝 Task' : '▶ Video'}
                                        </span>
                                        {lesson.isLive && (
                                          <span className="text-[10px] font-bold animate-pulse" style={{ color: C.rose }}>
                                            🔴 {lesson.liveDate ? formatLiveDate(lesson.liveDate) : 'Live'}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    {/* Bookmark */}
                                    <button onClick={e => { e.stopPropagation(); toggleBookmark(lesson.id) }}
                                      className="p-1.5 rounded-lg hover:bg-gray-200 transition flex-shrink-0">
                                      <Bookmark size={13} style={{ color: bm?C.yellow:C.gray[300], fill: bm?C.yellow:'none' }}/>
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                              {week.lessons.map((lesson, li) => {
                                const done = completedLessons.includes(lesson.id)
                                return (
                                  <div key={li} onClick={() => openLesson(lesson)}
                                    className="p-3 rounded-xl cursor-pointer hover:shadow-md transition-all"
                                    style={{ background: done?`${C.green}08`:C.gray[50], border:`1px solid ${done?C.green+'25':C.gray[200]}` }}>
                                    <div className="flex items-start gap-2">
                                      <button onClick={e => { e.stopPropagation(); markComplete(lesson.id) }}
                                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                                        style={{ borderColor: done?C.green:C.gray[300], background: done?C.green:'transparent' }}>
                                        {done && <Check size={9} className="text-white"/>}
                                      </button>
                                      <div className="flex-1 min-w-0">
                                        <p className={`text-xs font-semibold truncate ${done?'opacity-60 line-through':''}`}
                                          style={{ color: C.gray[800] }}>{lesson.title}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                          <span className="text-[10px]" style={{ color: C.gray[400] }}>{lesson.duration}</span>
                                          {lesson.isLive && <span className="text-[10px] text-red-500 animate-pulse">🔴</span>}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show more toggle */}
                {course.weeks.length > 4 && (
                  <button onClick={() => setShowAllWeeks(s=>!s)}
                    className="w-full mt-4 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all"
                    style={{ background: 'white', border:`2px solid ${C.gray[200]}`, color: C.navy }}>
                    {showAllWeeks
                      ? <><ChevronUp size={16}/> Show fewer weeks</>
                      : <><ChevronDown size={16}/> Show all {course.weeks.length} weeks</>}
                  </button>
                )}
              </div>
            )}

            {/* ── COMPLETION BANNER ──────────────────────────────────────── */}
            <div className="mt-6 rounded-3xl p-6 text-center text-white overflow-hidden relative"
              style={{ background: theme.gradient }}>
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-10 bg-white"/>
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full opacity-10 bg-white"/>
              <div className="relative z-10">
                <Award size={40} className="mx-auto mb-3 text-white/90"/>
                <h3 className="text-xl font-black mb-2">🎉 Congratulations on Enrolling!</h3>
                <p className="text-white/80 text-sm mb-4">
                  Complete all {course.weeks.length} weeks to earn your iKPACE certificate
                </p>
                <div className="flex justify-center gap-3 flex-wrap">
                  {[
                    { v:course.weeks.length, l:'Weeks'    },
                    { v:allLessons.length,    l:'Lessons'  },
                    { v:`${course.rating}★`,  l:'Rating'   },
                    { v:'1',                   l:'Certificate'},
                  ].map((s,i) => (
                    <div key={i} className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                      <p className="font-black text-lg">{s.v}</p>
                      <p className="text-xs text-white/70">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════
              RIGHT SIDEBAR
          ══════════════════════════════════════════════════════════════ */}
          <div className="lg:w-72 flex-shrink-0 space-y-4">

            {/* Start Learning CTA */}
            <div className="rounded-2xl overflow-hidden shadow-lg sticky top-4"
              style={{ border:`2px solid ${theme.accent}40` }}>
              <div className="p-5" style={{ background:`linear-gradient(135deg,${theme.accent}08,${theme.glow}08)` }}>
                {/* Progress ring */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <div className="relative w-16 h-16">
                      <ProgressRing pct={progress} size={64} stroke={5} color={theme.accent}/>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-black text-sm leading-none" style={{ color: theme.accent }}>{progress}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-black text-sm" style={{ color: C.navy }}>Your Progress</p>
                    <p className="text-xs" style={{ color: C.gray[500] }}>
                      {completedLessons.length} of {allLessons.length} lessons done
                    </p>
                  </div>
                </div>

                <button onClick={handleContinue}
                  className="w-full py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all hover:scale-[1.02] active:scale-95 shadow-md mb-2"
                  style={{ background: theme.gradient }}>
                  <PlayCircle size={16}/>
                  {completedLessons.length > 0 ? 'Continue Learning' : 'Start First Lesson'}
                </button>
                <p className="text-[10px] text-center" style={{ color: C.gray[400] }}>
                  {allLessons.length - completedLessons.length} lessons remaining · {course.duration}
                </p>
              </div>
            </div>

            {/* Live sessions */}
            {liveLessons.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                  <Calendar size={14} style={{ color: C.rose }}/>Live Sessions
                </h3>
                <div className="space-y-2">
                  {liveLessons.slice(0,3).map((l, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl"
                      style={{ background:`${C.rose}08`, border:`1px solid ${C.rose}20` }}>
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background:`${C.rose}15` }}>
                        <Video size={12} style={{ color: C.rose }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold truncate" style={{ color: C.gray[800] }}>{l.title}</p>
                        <p className="text-[10px] font-bold mt-0.5" style={{ color: C.rose }}>{formatLiveDate(l.liveDate)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookmarks */}
            {bookmarked.length > 0 && (
              <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                  <Bookmark size={14} style={{ color: C.yellow, fill: C.yellow }}/>Bookmarked
                </h3>
                <div className="space-y-2">
                  {bookmarked.slice(0,4).map((id, i) => {
                    const l = allLessons.find(x => x.id === id)
                    return l ? (
                      <div key={i} onClick={() => openLesson(l)}
                        className="flex items-center gap-2 p-2 rounded-xl cursor-pointer hover:bg-gray-50 transition">
                        <PlayCircle size={13} style={{ color: theme.accent, flexShrink:0 }}/>
                        <span className="text-xs truncate" style={{ color: C.gray[700] }}>{l.title}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            )}

            {/* Quick links */}
            <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: C.navy }}>Quick Links</h3>
              <div className="space-y-2">
                {[
                  { to:'/dashboard',  icon:BarChart3,      label:'My Dashboard',    color:C.navy   },
                  { to:'/community',  icon:Users,          label:'Community',        color:C.teal   },
                  { to:'/courses',    icon:GraduationCap,  label:'Browse Courses',   color:C.navyMid},
                  { to:'/support',    icon:Headphones,     label:'Get Support',      color:C.orange },
                ].map((l, i) => (
                  <Link key={i} to={l.to}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:shadow-sm transition-all"
                    style={{ background:`${l.color}08`, border:`1px solid ${l.color}15` }}>
                    <l.icon size={15} style={{ color: l.color }}/>
                    <span className="text-xs font-semibold" style={{ color: l.color }}>{l.label}</span>
                    <ChevronRight size={12} style={{ color: C.gray[300], marginLeft:'auto' }}/>
                  </Link>
                ))}
              </div>
            </div>

            {/* Course includes */}
            <div className="bg-white rounded-2xl p-4 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                <Sparkles size={14} style={{ color: C.yellow }}/>Course Includes
              </h3>
              <div className="space-y-2">
                {[
                  { icon:'📹', text:`${allLessons.filter(l=>l.type==='video').length} video lessons` },
                  { icon:'📝', text:`${allLessons.filter(l=>l.type==='assignment').length} assignments` },
                  { icon:'🔴', text:`${allLessons.filter(l=>l.isLive).length} live sessions`            },
                  { icon:'📁', text:'Downloadable resources'                                             },
                  { icon:'🏆', text:'Certificate of completion'                                          },
                  { icon:'♾️', text:'Lifetime access'                                                    },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <span className="text-base">{item.icon}</span>
                    <span className="text-xs" style={{ color: C.gray[600] }}>{item.text}</span>
                    <Check size={12} style={{ color: C.green, marginLeft:'auto', flexShrink:0 }}/>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          VIDEO PLAYER MODAL
      ════════════════════════════════════════════════════════════════════ */}
      {showPlayer && currentVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden bg-gray-900">

            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-900">
              <div>
                <p className="text-white font-bold text-sm">{currentVideo.title}</p>
                <p className="text-white/50 text-xs">{currentVideo.duration}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleBookmark(currentVideo.id)}
                  className="p-2 rounded-lg hover:bg-white/10 transition">
                  <Bookmark size={16} style={{ color: bookmarked.includes(currentVideo.id)?C.yellow:'white', fill:bookmarked.includes(currentVideo.id)?C.yellow:'none' }}/>
                </button>
                <button onClick={() => setShowPlayer(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition">
                  <X size={16} className="text-white"/>
                </button>
              </div>
            </div>

            {/* Player */}
            <div className="aspect-video bg-black">
              {currentVideo.content_url ? (
                <iframe src={currentVideo.content_url} className="w-full h-full" allowFullScreen title={currentVideo.title}/>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <PlayCircle size={48} className="text-white/30 mb-3"/>
                  <p className="text-white/50 text-sm">Video lesson</p>
                  <p className="text-white/30 text-xs mt-1">{currentVideo.title}</p>
                </div>
              )}
            </div>

            {/* Footer controls */}
            <div className="bg-gray-900 p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex gap-3">
                  <button className="text-white/60 hover:text-white transition"><Play size={18}/></button>
                  <button className="text-white/60 hover:text-white transition"><Volume2 size={18}/></button>
                </div>
                <button onClick={() => markComplete(currentVideo.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
                  style={{ background: completedLessons.includes(currentVideo.id) ? C.green : theme.accent }}>
                  <CheckCircle size={13}/>
                  {completedLessons.includes(currentVideo.id) ? 'Completed ✓' : 'Mark Complete'}
                </button>
              </div>

              {/* Notes */}
              <div className="border-t pt-3" style={{ borderColor: C.gray[800] }}>
                <p className="text-xs font-semibold text-white/60 mb-2">📝 Notes for this lesson</p>
                <textarea value={currentNote} onChange={e => setCurrentNote(e.target.value)} rows={3}
                  placeholder="Take notes while watching…"
                  className="w-full rounded-xl p-3 text-xs outline-none resize-none"
                  style={{ background: C.gray[800], border:`1px solid ${C.gray[700]}`, color: 'white' }}/>
                <button onClick={() => saveNote(currentVideo.id)}
                  className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition"
                  style={{ background: noteSaved ? C.green : theme.accent }}>
                  {noteSaved ? '✓ Saved!' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
      `}</style>
    </div>
  )
}