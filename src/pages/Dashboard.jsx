// src/pages/Dashboard.jsx
// ─── iKPACE Advanced Student Dashboard ───────────────────────────────────────
import { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../supabaseClient'

import {
  BookOpen, Award, Clock, Flame, Bell, CheckCircle, ChevronRight,
  Star, Users, Activity, LogOut, PlayCircle, CreditCard, Download,
  Search, Menu, X, TrendingUp, Zap, Sun, Moon, Copy, Check,
  AlertCircle, MessageCircle, Timer, BarChart3, Sparkles,
  Home, Trophy, GraduationCap, Shield, Wallet, BadgeCheck,
  Headphones, Bookmark, FolderOpen, Heart, Video, Target,
  Flag, LayoutDashboard, Sunrise, Sunset, Coffee, CheckSquare,
  Square, StickyNote, Plus, Pause, Play, RotateCcw, StopCircle,
  Lock, BrainCircuit, ClipboardCheck, CalendarDays, MessageSquare,
  Settings, User, Mail, Rocket, ArrowRight, ChevronDown, ChevronUp,
  PieChart, Archive
} from 'lucide-react'

// ─── Brand Design System ──────────────────────────────────────────────────────
const C = {
  navy:        '#1A3D7C',
  navyDark:    '#0F2655',
  navyMid:     '#2F5EA8',
  orange:      '#FF7A00',
  orangeLight: '#FF9A3C',
  green:       '#008F4C',
  yellow:      '#E6B800',
  teal:        '#0D9488',
  purple:      '#7C3AED',
  rose:        '#E11D48',
  amber:       '#D97706',
  gray: {
    50:'#F8FAFC',100:'#F1F5F9',200:'#E2E8F0',
    300:'#CBD5E1',400:'#94A3B8',500:'#64748B',
    600:'#475569',700:'#334155',800:'#1E293B',900:'#0F172A'
  }
}

// ─── Pomodoro Timer ───────────────────────────────────────────────────────────
function PomodoroTimer() {
  const MODES  = { focus:25*60, short:5*60, long:15*60 }
  const LABELS = { focus:'🎯 Focus', short:'☕ Break', long:'🌿 Long' }
  const [mode, setMode]       = useState('focus')
  const [secs, setSecs]       = useState(MODES.focus)
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSecs(s => {
          if (s <= 1) {
            clearInterval(ref.current)
            setRunning(false)
            if (mode === 'focus') setSessions(p => p + 1)
            return 0
          }
          return s - 1
        })
      }, 1000)
    } else clearInterval(ref.current)
    return () => clearInterval(ref.current)
  }, [running, mode])

  const switchMode = m => { setMode(m); setSecs(MODES[m]); setRunning(false) }
  const mm = String(Math.floor(secs / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const pct = ((MODES[mode] - secs) / MODES[mode]) * 100
  const R = 52, circ = 2 * Math.PI * R
  const modeClr = mode === 'focus' ? C.orange : mode === 'short' ? C.green : C.navyMid

  return (
    <div className="rounded-2xl p-5 text-white h-full" style={{ background: `linear-gradient(145deg,${C.navyDark},${C.navy})` }}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Timer size={15} style={{ color: C.orange }} />Study Timer
        </h3>
        <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{sessions} sessions</span>
      </div>
      <div className="flex gap-1 mb-4">
        {Object.keys(MODES).map(m => (
          <button key={m} onClick={() => switchMode(m)}
            className="flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-all"
            style={{ background: mode === m ? modeClr : 'rgba(255,255,255,0.1)', color: mode === m ? '#fff' : 'rgba(255,255,255,0.5)' }}>
            {LABELS[m]}
          </button>
        ))}
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
            <circle cx="60" cy="60" r={R} fill="none" stroke={modeClr} strokeWidth="7"
              strokeLinecap="round" strokeDasharray={circ}
              strokeDashoffset={circ - (pct / 100) * circ}
              style={{ transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black font-mono">{mm}:{ss}</span>
            <span className="text-[10px] opacity-50 capitalize">{mode}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button onClick={() => { setSecs(MODES[mode]); setRunning(false) }}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
          <RotateCcw size={14} />
        </button>
        <button onClick={() => setRunning(r => !r)}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg"
          style={{ background: running ? C.rose : modeClr }}>
          {running ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button onClick={() => { setRunning(false); setSecs(0) }}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
          <StopCircle size={14} />
        </button>
      </div>
    </div>
  )
}

// ─── Streak Calendar ──────────────────────────────────────────────────────────
function StreakCalendar({ streak = 7, dm }) {
  const today = new Date()
  const days  = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() - (13 - i))
    return { date: d, active: i >= (14 - streak) }
  })
  return (
    <div className="rounded-2xl p-4 h-full" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: C.navy }}>
          <Flame size={14} style={{ color: C.orange }} />Learning Streak
        </h3>
        <span className="text-xs font-black px-2.5 py-0.5 rounded-full text-white" style={{ background: C.orange }}>{streak} 🔥</span>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-1.5">
        {days.map((d, i) => <div key={i} className="text-center text-[9px] font-semibold" style={{ color: C.gray[400] }}>{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {last14.map((day, i) => (
          <div key={i} className="aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all"
            style={{
              background: day.date.toDateString() === today.toDateString() ? C.orange : day.active ? C.green : dm.subtle,
              color: (day.active || day.date.toDateString() === today.toDateString()) ? '#fff' : C.gray[400],
              transform: day.date.toDateString() === today.toDateString() ? 'scale(1.15)' : 'scale(1)',
              boxShadow: day.date.toDateString() === today.toDateString() ? `0 2px 8px ${C.orange}50` : ''
            }}>
            {day.date.getDate()}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-3 text-[10px]" style={{ color: C.gray[400] }}>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded inline-block" style={{ background: C.green }} />Active</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded inline-block" style={{ background: C.orange }} />Today</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded inline-block" style={{ background: dm.subtle }} />Missed</span>
      </div>
    </div>
  )
}

// ─── Weekly Bar Chart ─────────────────────────────────────────────────────────
function WeeklyChart({ dm }) {
  const data = [
    { d: 'Mon', h: 1.5 }, { d: 'Tue', h: 3.0 }, { d: 'Wed', h: 2.0 },
    { d: 'Thu', h: 4.0 }, { d: 'Fri', h: 2.5 }, { d: 'Sat', h: 1.0 }, { d: 'Sun', h: 3.5 }
  ]
  const max = Math.max(...data.map(x => x.h))
  const todayIdx = (new Date().getDay() + 6) % 7
  return (
    <div className="rounded-2xl p-4 h-full" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: C.navy }}>
          <BarChart3 size={14} style={{ color: C.navyMid }} />Weekly Activity
        </h3>
        <span className="text-xs" style={{ color: C.gray[400] }}>Hours</span>
      </div>
      <div className="flex items-end gap-1.5 h-20 mb-1">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group cursor-default relative">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap px-1 py-0.5 rounded"
              style={{ background: C.navy, color: '#fff' }}>{d.h}h</div>
            <div className="w-full rounded-t-lg transition-all"
              style={{
                height: `${(d.h / max) * 76}px`, minHeight: '4px',
                background: i === todayIdx ? `linear-gradient(180deg,${C.orange},${C.orangeLight})` : `${C.navy}30`,
                boxShadow: i === todayIdx ? `0 2px 8px ${C.orange}50` : ''
              }} />
            <span className="text-[9px]" style={{ color: i === todayIdx ? C.orange : C.gray[400] }}>{d.d}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span style={{ color: C.gray[400] }}>Total: <strong style={{ color: C.navy }}>17.5h</strong></span>
        <span style={{ color: C.green }}>↑ 23% vs last week</span>
      </div>
    </div>
  )
}

// ─── Skill Progress ───────────────────────────────────────────────────────────
function SkillsPanel({ dm }) {
  const skills = [
    { name: 'Business Strategy', pct: 72, color: C.navy,   icon: '💼' },
    { name: 'Digital Marketing', pct: 58, color: C.orange, icon: '📣' },
    { name: 'UI/UX Design',      pct: 44, color: C.purple, icon: '🎨' },
    { name: 'Data Analysis',     pct: 35, color: C.teal,   icon: '📊' },
    { name: 'Communication',     pct: 85, color: C.green,  icon: '💬' },
  ]
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: C.navy }}>
        <BrainCircuit size={14} style={{ color: C.navyMid }} />Skill Progress
      </h3>
      <div className="space-y-3">
        {skills.map((s, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium flex items-center gap-1.5" style={{ color: dm.heading }}>
                <span>{s.icon}</span>{s.name}
              </span>
              <span className="text-xs font-black" style={{ color: s.color }}>{s.pct}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: dm.subtle }}>
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color, transition: 'width .6s ease' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Daily Challenge ──────────────────────────────────────────────────────────
function DailyChallenge() {
  const [ans, setAns] = useState(null)
  const q = {
    q: 'What is the #1 skill of a top Virtual Assistant?',
    opts: ['Technical expertise', 'Clear communication', 'Speed typing', 'Social media'],
    correct: 1, xp: 50
  }
  return (
    <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(145deg,${C.navy},${C.navyMid})` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2">
          <Zap size={14} style={{ color: C.yellow }} />Daily Challenge
        </h3>
        <span className="text-[10px] bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full font-black">+{q.xp} XP</span>
      </div>
      <p className="text-xs mb-3 opacity-90 leading-relaxed">{q.q}</p>
      <div className="space-y-1.5">
        {q.opts.map((o, i) => (
          <button key={i} onClick={() => !ans && setAns(i)} disabled={!!ans}
            className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-medium transition-all"
            style={{
              background: ans === null ? 'rgba(255,255,255,0.1)'
                : i === q.correct ? `${C.green}cc`
                : ans === i && i !== q.correct ? `${C.rose}99`
                : 'rgba(255,255,255,0.05)',
              border: `1px solid ${ans !== null && i === q.correct ? C.green : 'rgba(255,255,255,0.1)'}`
            }}>
            <span className="inline-flex w-4 h-4 rounded-full items-center justify-center mr-2 text-[9px] bg-white/15">
              {String.fromCharCode(65 + i)}
            </span>
            {o}
            {ans !== null && i === q.correct && <CheckCircle size={11} className="inline ml-2 text-green-300" />}
          </button>
        ))}
      </div>
      {ans !== null && (
        <p className="mt-2 text-[11px] text-center font-semibold"
          style={{ color: ans === q.correct ? '#86efac' : '#fca5a5' }}>
          {ans === q.correct ? '🎉 Correct! +50 XP earned!' : '❌ Not quite. The answer is B.'}
        </p>
      )}
    </div>
  )
}

// ─── Assignment Tracker ───────────────────────────────────────────────────────
function AssignmentTracker({ dm }) {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Write client onboarding email', course: 'VA Pro',      due: '2 days',  priority: 'high',   done: false },
    { id: 2, title: 'Complete Quiz: Module 3',        course: 'VA Pro',      due: '4 days',  priority: 'medium', done: false },
    { id: 3, title: 'Design social media calendar',   course: 'Marketing',   due: '1 week',  priority: 'low',    done: true  },
    { id: 4, title: 'Submit final project draft',     course: 'VA Pro',      due: 'Tomorrow',priority: 'high',   done: false },
  ])
  const pc = { high: C.rose, medium: C.amber, low: C.green }
  const toggle = id => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t))
  const pending = tasks.filter(t => !t.done).length
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: C.navy }}>
          <ClipboardCheck size={14} style={{ color: C.navyMid }} />Assignments
        </h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full text-white font-bold"
          style={{ background: pending > 0 ? C.rose : C.green }}>{pending} pending</span>
      </div>
      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t.id} onClick={() => toggle(t.id)}
            className="flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all"
            style={{
              background: t.done ? dm.subtle : `${pc[t.priority]}10`,
              opacity: t.done ? .6 : 1,
              border: `1px solid ${t.done ? dm.border : pc[t.priority] + '25'}`
            }}>
            <div className="mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all"
              style={{ borderColor: t.done ? C.green : pc[t.priority], background: t.done ? C.green : 'transparent' }}>
              {t.done && <Check size={9} className="text-white" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate" style={{ color: dm.heading, textDecoration: t.done ? 'line-through' : 'none' }}>{t.title}</p>
              <div className="flex gap-2 mt-0.5">
                <span className="text-[10px]" style={{ color: C.gray[400] }}>{t.course}</span>
                <span className="text-[10px] font-semibold" style={{ color: pc[t.priority] }}>Due: {t.due}</span>
              </div>
            </div>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold flex-shrink-0 capitalize"
              style={{ background: `${pc[t.priority]}20`, color: pc[t.priority] }}>{t.priority}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Quick Notes ──────────────────────────────────────────────────────────────
function QuickNotes({ dm }) {
  const cols = ['#FFF9C4', '#C8E6C9', '#BBDEFB', '#F8BBD0', '#E1BEE7']
  const [notes, setNotes] = useState([
    { id: 1, text: 'Review Module 3 before Friday',       color: cols[0], done: false },
    { id: 2, text: 'Practice VA email templates daily',    color: cols[1], done: false },
    { id: 3, text: 'Watch bonus lecture on client mgmt',   color: cols[2], done: true  },
  ])
  const [val, setVal] = useState('')
  const add = () => {
    if (!val.trim()) return
    setNotes(p => [...p, { id: Date.now(), text: val.trim(), color: cols[p.length % cols.length], done: false }])
    setVal('')
  }
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
        <StickyNote size={14} style={{ color: C.yellow }} />Quick Notes
      </h3>
      <div className="flex gap-2 mb-3">
        <input value={val} onChange={e => setVal(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()}
          placeholder="Add a note…"
          className="flex-1 text-xs px-3 py-2 rounded-xl border outline-none"
          style={{ background: dm.subtle, border: `1px solid ${dm.border}`, color: dm.heading }} />
        <button onClick={add} className="w-8 h-8 rounded-xl flex items-center justify-center text-white flex-shrink-0"
          style={{ background: C.navy }}>
          <Plus size={14} />
        </button>
      </div>
      <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
        {notes.map(n => (
          <div key={n.id} className="flex items-start gap-2 p-2.5 rounded-xl"
            style={{ background: n.color + 'bb' }}>
            <button onClick={() => setNotes(p => p.map(x => x.id === n.id ? { ...x, done: !x.done } : x))} className="mt-0.5 flex-shrink-0">
              {n.done ? <CheckSquare size={13} style={{ color: C.green }} /> : <Square size={13} style={{ color: C.gray[400] }} />}
            </button>
            <span className="flex-1 text-xs leading-relaxed"
              style={{ color: C.gray[800], textDecoration: n.done ? 'line-through' : 'none', opacity: n.done ? .6 : 1 }}>
              {n.text}
            </span>
            <button onClick={() => setNotes(p => p.filter(x => x.id !== n.id))}>
              <X size={11} style={{ color: C.gray[400] }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Upcoming Schedule ────────────────────────────────────────────────────────
function UpcomingSchedule({ dm }) {
  const events = [
    { time: 'Today 3:00 PM',  title: 'Live Q&A: VA Tools',    course: 'VA Pro',          type: 'live',     color: C.orange },
    { time: 'Tomorrow 10 AM', title: 'Module 4 Deadline',      course: 'Digital Mktg',    type: 'deadline', color: C.rose   },
    { time: 'Wed 2:00 PM',    title: 'Peer Study Group',       course: 'UI/UX Design',    type: 'group',    color: C.teal   },
    { time: 'Fri 11:00 AM',   title: 'Certificate Exam',       course: 'VA Pro',          type: 'exam',     color: C.purple },
  ]
  const icons = { live: '🔴', deadline: '⏰', group: '👥', exam: '📝' }
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
        <CalendarDays size={14} style={{ color: C.navyMid }} />Upcoming
      </h3>
      <div className="space-y-2">
        {events.map((ev, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl"
            style={{ background: `${ev.color}0d`, border: `1px solid ${ev.color}22` }}>
            <span className="text-sm mt-0.5">{icons[ev.type]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate" style={{ color: dm.heading }}>{ev.title}</p>
              <p className="text-[10px] truncate" style={{ color: C.gray[400] }}>{ev.course}</p>
            </div>
            <span className="text-[10px] font-semibold whitespace-nowrap" style={{ color: ev.color }}>{ev.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Mentor Messages ──────────────────────────────────────────────────────────
function MentorMessages({ dm }) {
  const msgs = [
    { from: 'Prof. Ama',  avatar: 'PA', msg: "Great work on your last assignment! 💪", time: '10m', unread: true,  color: C.orange },
    { from: 'Course Bot', avatar: '🤖', msg: "You're 45% through Module 3. 2 lessons!", time: '1h',  unread: true,  color: C.navyMid },
    { from: 'Kwame B.',   avatar: 'KB', msg: "Join our study group this Thursday?",      time: '3h',  unread: false, color: C.teal   },
  ]
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-sm flex items-center gap-2" style={{ color: C.navy }}>
          <MessageSquare size={14} style={{ color: C.navyMid }} />Messages
        </h3>
        <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">2 new</span>
      </div>
      <div className="space-y-2">
        {msgs.map((m, i) => (
          <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all hover:opacity-80"
            style={{ background: m.unread ? `${m.color}10` : 'transparent', border: `1px solid ${m.unread ? m.color + '25' : 'transparent'}` }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
              style={{ background: m.color }}>{m.avatar}</div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between">
                <span className="text-xs font-bold truncate" style={{ color: dm.heading }}>{m.from}</span>
                <span className="text-[10px]" style={{ color: C.gray[400] }}>{m.time}</span>
              </div>
              <p className="text-[11px] truncate" style={{ color: C.gray[500] }}>{m.msg}</p>
            </div>
            {m.unread && <div className="w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0" style={{ background: m.color }} />}
          </div>
        ))}
      </div>
      <button className="mt-3 w-full py-2 rounded-xl text-xs font-bold text-white" style={{ background: C.navy }}>
        View All Messages
      </button>
    </div>
  )
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────
function Leaderboard({ dm, myName }) {
  const board = [
    { rank: 1, name: 'Amara K.',     pts: 4250, badge: '🥇', you: false },
    { rank: 2, name: 'Samuel O.',    pts: 3890, badge: '🥈', you: false },
    { rank: 3, name: 'Fatima A.',    pts: 3540, badge: '🥉', you: false },
    { rank: 4, name: myName || 'You',pts: 1250, badge: '⭐', you: true  },
    { rank: 5, name: 'Kwame B.',     pts: 980,  badge: null,  you: false },
  ]
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
        <Trophy size={14} style={{ color: C.yellow }} />Leaderboard
      </h3>
      <div className="space-y-1.5">
        {board.map(p => (
          <div key={p.rank} className="flex items-center gap-2.5 p-2 rounded-xl transition-all"
            style={{ background: p.you ? `${C.navy}12` : 'transparent', border: `1px solid ${p.you ? C.navy + '25' : 'transparent'}` }}>
            <span className="text-xs w-4 text-center font-bold" style={{ color: C.gray[400] }}>{p.rank}</span>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
              style={{ background: p.you ? C.navy : C.gray[400] }}>
              {p.you ? '👤' : p.name.split(' ').map(n => n[0]).join('')}
            </div>
            <span className="flex-1 text-xs font-medium truncate" style={{ color: p.you ? C.navy : dm.text }}>
              {p.name}{p.you && <span className="text-[10px] opacity-50 ml-1">(You)</span>}
            </span>
            <span className="text-xs font-black" style={{ color: p.you ? C.orange : C.gray[400] }}>{p.pts.toLocaleString()}</span>
            {p.badge && <span className="text-sm">{p.badge}</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Resource Library ─────────────────────────────────────────────────────────
function ResourceLibrary({ dm }) {
  const res = [
    { title: 'VA Toolkit PDF',    type: 'PDF', size: '2.4 MB', icon: '📄', color: C.rose   },
    { title: 'Email Templates',   type: 'ZIP', size: '1.1 MB', icon: '📦', color: C.orange },
    { title: 'Marketing Guide',   type: 'PDF', size: '3.8 MB', icon: '📋', color: C.navy   },
    { title: 'Design Assets',     type: 'ZIP', size: '15 MB',  icon: '🎨', color: C.purple },
  ]
  return (
    <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
      <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
        <FolderOpen size={14} style={{ color: C.navyMid }} />Resource Library
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {res.map((r, i) => (
          <div key={i} className="p-3 rounded-xl cursor-pointer hover:shadow-md transition-all"
            style={{ background: dm.subtle, border: `1px solid ${dm.border}` }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-xl">{r.icon}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded font-black text-white" style={{ background: r.color }}>{r.type}</span>
            </div>
            <p className="text-xs font-bold mb-0.5 truncate" style={{ color: dm.heading }}>{r.title}</p>
            <p className="text-[10px] mb-2" style={{ color: C.gray[400] }}>{r.size}</p>
            <button className="w-full flex items-center justify-center gap-1 py-1 rounded-lg text-[10px] font-bold text-white"
              style={{ background: r.color }}>
              <Download size={9} />Download
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
export default function Dashboard() {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()

  // ── User ──────────────────────────────────────────────────────────────────
  const [studentId,  setStudentId]  = useState('')
  const [fullName,   setFullName]   = useState('')
  const [email,      setEmail]      = useState('')
  const [joinDate,   setJoinDate]   = useState('')

  // ── Courses ───────────────────────────────────────────────────────────────
  const [enrolledCourses,    setEnrolledCourses]    = useState([])
  const [inProgressCourses,  setInProgressCourses]  = useState([])
  const [completedCourses,   setCompletedCourses]   = useState([])
  const [courseProgress,     setCourseProgress]     = useState({})
  const [recentActivity,     setRecentActivity]     = useState([])
  const [recommendedCourses, setRecommendedCourses] = useState([])

  // ── Payments ──────────────────────────────────────────────────────────────
  const [payments,   setPayments]   = useState([])
  const [totalSpent, setTotalSpent] = useState(0)
  const [lastPayment,setLastPayment]= useState(null)

  // ── Stats ─────────────────────────────────────────────────────────────────
  const [achievements,       setAchievements]       = useState([])
  const [streak,             setStreak]             = useState(7)
  const [totalLearningTime,  setTotalLearningTime]  = useState(42)
  const [points,             setPoints]             = useState(1250)
  const [rank,               setRank]               = useState('Silver Learner')
  const [lessonsCompleted,   setLessonsCompleted]   = useState(24)
  const [quizAverage,        setQuizAverage]        = useState(85)
  const [quizzesTaken,       setQuizzesTaken]       = useState(12)
  const [certificatesEarned, setCertificatesEarned] = useState(2)

  // ── Milestones ────────────────────────────────────────────────────────────
  const [milestones] = useState([
    { id:1, title:'Showcase Skills',  progress:100, completed:true,  icon:'🎯', message:'All tasks completed! 🎉', type:'project' },
    { id:2, title:'Knowledge Check',  progress:100, completed:true,  icon:'📝', message:'All questions answered! 🎉', type:'quiz' },
    { id:3, title:'Next Module',      progress:45,  completed:false, icon:'📚', message:"Keep going! You're making progress", type:'module' },
  ])

  // ── Goals ─────────────────────────────────────────────────────────────────
  const [goals] = useState([
    { id:1, title:'Complete 5 courses', target:5,  current:3, progress:60 },
    { id:2, title:'30-day streak',       target:30, current:7, progress:23 },
    { id:3, title:'Earn 3 certificates', target:3,  current:2, progress:66 },
  ])

  // ── Notifications ─────────────────────────────────────────────────────────
  const [notifications, setNotifications] = useState([])
  const [unreadCount,   setUnreadCount]   = useState(3)

  // ── Saved items ───────────────────────────────────────────────────────────
  const [savedItems] = useState([
    { id:1, title:'AI Prompt Engineering', course_id:'rec1', created_at: new Date().toISOString() },
    { id:2, title:'UX Design Course',       course_id:'rec2', created_at: new Date().toISOString() },
  ])

  // ── UI ────────────────────────────────────────────────────────────────────
  const [loading,         setLoading]         = useState(true)
  const [error,           setError]           = useState(null)
  const [darkMode,        setDarkMode]        = useState(false)
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false)
  const [notifOpen,       setNotifOpen]       = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [copied,          setCopied]          = useState(false)
  const [activeTab,       setActiveTab]       = useState('overview')
  const [searchOpen,      setSearchOpen]      = useState(false)
  const [searchQ,         setSearchQ]         = useState('')
  const [greeting,        setGreeting]        = useState('Good day')
  const [greetingEmoji,   setGreetingEmoji]   = useState('👋')
  const [currentSlide,    setCurrentSlide]    = useState(0)
  const slideInterval = useRef(null)

  // ── Dark mode tokens ──────────────────────────────────────────────────────
  const dm = darkMode
    ? { bg:C.gray[900], card:C.gray[800], border:C.gray[700], text:C.gray[300], heading:C.gray[100], subtle:C.gray[700] }
    : { bg:C.gray[50],  card:'#ffffff',   border:C.gray[200], text:C.gray[500], heading:C.gray[900], subtle:C.gray[100] }

  // ── Greeting ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const h = new Date().getHours()
    if (h < 6)       { setGreeting('Night Owl');      setGreetingEmoji('🌙') }
    else if (h < 12) { setGreeting('Good Morning');   setGreetingEmoji('☀️') }
    else if (h < 17) { setGreeting('Good Afternoon'); setGreetingEmoji('🌤️') }
    else if (h < 20) { setGreeting('Good Evening');   setGreetingEmoji('🌅') }
    else             { setGreeting('Evening');         setGreetingEmoji('🌙') }
  }, [])

  // ── Carousel auto-play ────────────────────────────────────────────────────
  useEffect(() => {
    if (recommendedCourses.length > 1) {
      slideInterval.current = setInterval(() =>
        setCurrentSlide(p => (p + 1) % recommendedCourses.length), 5000)
    }
    return () => clearInterval(slideInterval.current)
  }, [recommendedCourses.length])

  // ── Data fetch ────────────────────────────────────────────────────────────
  useEffect(() => { user ? fetchAllUserData() : setupMock() }, [user])

  const setupMock = () => {
    setStudentId('GUEST1234'); setEmail('guest@example.com')
    setFullName('Guest Learner'); setJoinDate(new Date().toLocaleDateString())
    setInProgressCourses([
      { id:'mock1', course_id:'3dfbeb9d-7145-402a-a23c-f5c3b01129e5', progress:45,
        courses:{ title:'Virtual Assistant Pro', description:'Learn to become a professional VA',
          thumbnail_url:'', duration_weeks:6, level:'Beginner', category:'Business' } },
      { id:'mock2', course_id:'mock-2', progress:30,
        courses:{ title:'Digital Marketing Mastery', description:'Social media, SEO & content',
          thumbnail_url:'', duration_weeks:8, level:'Beginner', category:'Marketing' } },
    ])
    setEnrolledCourses([{ id:'mock1' }, { id:'mock2' }])
    setCompletedCourses([{ id:'comp1', courses:{ title:'Intro to Freelancing' }, progress:100 }])
    setRecommendedCourses([
      { id:'rec1', title:'AI Prompt Engineering',    slug:'ai-prompt-engineering', duration_weeks:6, level:'Intermediate', category:'AI & Tech' },
      { id:'rec2', title:'Canva Design Pro',          slug:'canva-design',          duration_weeks:4, level:'Beginner',      category:'Design'    },
      { id:'rec3', title:'Copywriting Secrets',       slug:'copywriting',           duration_weeks:5, level:'Beginner',      category:'Writing'   },
    ])
    setPayments([
      { id:'pay1', course_title:'Virtual Assistant Pro',   amount:70, created_at:new Date().toISOString(),               status:'success' },
      { id:'pay2', course_title:'Digital Marketing',        amount:85, created_at:new Date(Date.now()-7*864e5).toISOString(), status:'success' },
      { id:'pay3', course_title:'Canva Design',             amount:65, created_at:new Date(Date.now()-14*864e5).toISOString(),status:'success' },
    ])
    setTotalSpent(220)
    setLastPayment({ course_title:'Virtual Assistant Pro', amount:70 })
    setAchievements([
      { id:1, title:'Quick Starter',   description:'Completed first lesson',      icon:'🚀', unlocked:true                },
      { id:2, title:'Quiz Master',     description:'Score 90%+ on 3 quizzes',     icon:'🧠', unlocked:false, progress:66  },
      { id:3, title:'Streak Warrior',  description:'7-day learning streak',        icon:'🔥', unlocked:true                },
      { id:4, title:'Social Butterfly',description:'Join a study group',           icon:'🦋', unlocked:false, progress:0   },
    ])
    setNotifications([
      { id:1, icon:'🎉', text:'You earned the Quick Starter badge!',     time:'2h ago', unread:true  },
      { id:2, icon:'📹', text:'New lesson added to VA Pro',              time:'5h ago', unread:true  },
      { id:3, icon:'💬', text:'Prof. Ama replied to your question',      time:'1d ago',  unread:false },
      { id:4, icon:'🏆', text:"You're in the top 10 this week!",         time:'2d ago',  unread:false },
    ])
    setUnreadCount(2)
    setRecentActivity([
      { id:1, description:'Completed lesson 3 of Virtual Assistant course', time:'2 hours ago', type:'lesson'   },
      { id:2, description:'Scored 85% on quiz',                              time:'yesterday',   type:'quiz'     },
      { id:3, description:'Downloaded VA Toolkit PDF',                        time:'2 days ago',  type:'resource' },
    ])
    setLoading(false)
  }

  const fetchAllUserData = async () => {
    try {
      setLoading(true); setError(null)
      setStudentId(user.id.slice(0, 8).toUpperCase())
      setEmail(user.email)
      setJoinDate(new Date(user.created_at).toLocaleDateString())
      setFullName(profile?.full_name || user.email?.split('@')[0] || 'Learner')

      // Enrollments
      try {
        const { data: enrollments, error: eErr } = await supabase
          .from('enrollments')
          .select(`*, courses(id,title,slug,thumbnail_url,description,category,level,duration_weeks,price)`)
          .eq('user_id', user.id).eq('status', 'active').order('enrolled_at', { ascending: false })
        if (eErr) throw eErr
        const seen = new Set(), unique = []
        enrollments?.forEach(e => { if (!seen.has(e.course_id)) { seen.add(e.course_id); unique.push(e) } })
        setEnrolledCourses(unique)
        const prog = {}; unique.forEach(e => { prog[e.course_id] = { percentage: 45 } })
        setCourseProgress(prog)
        setInProgressCourses(unique.map(e => ({ ...e, progress: 45 })))
      } catch { /* mock already set */ }

      // Payments
      try {
        const { data: pays } = await supabase.from('payments').select('*')
          .eq('user_id', user.id).eq('status', 'success').order('created_at', { ascending: false })
        if (pays?.length) {
          setPayments(pays)
          setTotalSpent(pays.reduce((s, p) => s + (p.amount || 0), 0))
          setLastPayment(pays[0])
        }
      } catch { /* ignore */ }

      setupMock()
    } catch (err) {
      setError(err.message)
      setupMock()
    } finally {
      setLoading(false)
    }
  }

  // ── Utilities ─────────────────────────────────────────────────────────────
  const getInitials   = () => fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : email?.charAt(0).toUpperCase() || 'U'
  const getFirstName  = () => fullName ? fullName.split(' ')[0] : email?.split('@')[0] || 'Learner'
  const copyId        = () => { navigator.clipboard.writeText(studentId); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const formatCurrency= n  => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
  const formatDate    = d  => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const handleSignOut = async () => { await signOut(); navigate('/') }

  // ── Nav items ─────────────────────────────────────────────────────────────
  const navItems = [
    { id: 'overview',     label: 'Overview',     icon: LayoutDashboard },
    { id: 'courses',      label: 'My Courses',   icon: BookOpen        },
    { id: 'analytics',    label: 'Analytics',    icon: BarChart3       },
    { id: 'achievements', label: 'Achievements', icon: Trophy          },
    { id: 'payments',     label: 'Payments',     icon: CreditCard      },
    { id: 'goals',        label: 'Goals',        icon: Target          },
    { id: 'certificates', label: 'Certificates', icon: BadgeCheck      },
    { id: 'community',    label: 'Community',    icon: Users           },
    { id: 'resources',    label: 'Resources',    icon: FolderOpen      },
    { id: 'support',      label: 'Support',      icon: Headphones      },
  ]

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: dm.bg }}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-black animate-pulse"
          style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
        <div className="w-40 h-1 rounded-full overflow-hidden mx-auto" style={{ background: C.gray[200] }}>
          <div className="h-full rounded-full animate-pulse" style={{ width: '60%', background: `linear-gradient(90deg,${C.navy},${C.orange})` }} />
        </div>
        <p className="mt-3 text-xs" style={{ color: C.gray[400] }}>Loading your dashboard…</p>
      </div>
    </div>
  )

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: dm.bg }}>
      <div className="max-w-sm w-full p-6 rounded-2xl shadow-xl text-center" style={{ background: dm.card }}>
        <AlertCircle size={40} className="mx-auto mb-3 text-red-500" />
        <h2 className="font-bold text-lg mb-2" style={{ color: dm.heading }}>Something went wrong</h2>
        <p className="text-sm mb-5" style={{ color: dm.text }}>{error}</p>
        <button onClick={() => window.location.reload()} className="w-full py-2.5 rounded-xl text-white font-bold" style={{ background: C.navy }}>
          Try Again
        </button>
      </div>
    </div>
  )

  // ── Tab renderer ─────────────────────────────────────────────────────────
  const renderTab = () => {
    switch (activeTab) {

      // ════ OVERVIEW ═══════════════════════════════════════════════════════
      case 'overview': return (
        <div className="space-y-5">
          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label:'Enrolled',  value:enrolledCourses.length,    icon:BookOpen,    color:C.navy,   bg:`${C.navy}12`    },
              { label:'Completed', value:completedCourses.length,   icon:CheckCircle, color:C.green,  bg:`${C.green}12`   },
              { label:'Hours',     value:totalLearningTime,          icon:Clock,       color:C.navyMid,bg:`${C.navyMid}12` },
              { label:'Points',    value:points.toLocaleString(),    icon:Zap,         color:C.orange, bg:`${C.orange}12`  },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: s.bg }}>
                  <s.icon size={17} style={{ color: s.color }} />
                </div>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
                <p className="text-[11px]" style={{ color: dm.text }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Timer + Challenge */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <PomodoroTimer />
            <DailyChallenge />
          </div>

          {/* Continue learning */}
          {inProgressCourses.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-sm flex items-center gap-2" style={{ color: C.navy }}>
                  <PlayCircle size={15} style={{ color: C.orange }} />Continue Learning
                </h2>
                <button className="text-xs font-semibold" style={{ color: C.navyMid }}
                  onClick={() => setActiveTab('courses')}>View all →</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {inProgressCourses.slice(0, 3).map(e => {
                  const pct = courseProgress[e.course_id]?.percentage || e.progress || 45
                  return (
                    <Link key={e.id} to={`/test-course-player/${e.course_id}`}
                      className="rounded-2xl p-4 block hover:shadow-lg transition-all group"
                      style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                          style={{ background: `${C.orange}15` }}>📚</div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full text-white font-bold"
                          style={{ background: C.navyMid }}>{e.courses?.level || 'Beginner'}</span>
                      </div>
                      <h3 className="font-bold text-sm mb-1 group-hover:underline" style={{ color: C.navy }}>{e.courses?.title}</h3>
                      <p className="text-xs mb-3" style={{ color: dm.text }}>{e.courses?.duration_weeks}w · {e.courses?.category}</p>
                      <div className="h-1.5 rounded-full overflow-hidden mb-1" style={{ background: dm.subtle }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${C.navy},${C.orange})` }} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[10px]" style={{ color: dm.text }}>Progress</span>
                        <span className="text-xs font-black" style={{ color: C.orange }}>{pct}%</span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Milestones */}
          <div>
            <h2 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
              <Flag size={14} style={{ color: C.orange }} />Immediate Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {milestones.map(m => (
                <div key={m.id} className="rounded-2xl p-4"
                  style={{ background: dm.card, border: `2px solid ${m.completed ? C.green + '35' : C.orange + '35'}` }}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{m.icon}</span>
                    <h3 className="font-bold text-sm" style={{ color: m.completed ? C.green : C.orange }}>{m.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: dm.subtle }}>
                      <div className="h-full rounded-full" style={{ width: `${m.progress}%`, background: m.completed ? C.green : C.orange }} />
                    </div>
                    <span className="text-xs font-black" style={{ color: m.completed ? C.green : C.orange }}>{m.progress}%</span>
                  </div>
                  <p className="text-[11px]" style={{ color: dm.text }}>{m.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity + Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <WeeklyChart dm={dm} />
            <UpcomingSchedule dm={dm} />
          </div>

          {/* Assignments + Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AssignmentTracker dm={dm} />
            <QuickNotes dm={dm} />
          </div>

          {/* Skills + Messages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <SkillsPanel dm={dm} />
            <MentorMessages dm={dm} />
          </div>

          {/* Streak calendar */}
          <StreakCalendar streak={streak} dm={dm} />

          {/* Recommended carousel */}
          {recommendedCourses.length > 0 && (
            <div>
              <h2 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                <Sparkles size={14} style={{ color: C.yellow }} />Recommended for You
              </h2>
              <div className="relative overflow-hidden rounded-2xl">
                <div className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {recommendedCourses.map(c => (
                    <div key={c.id} className="w-full flex-shrink-0 p-4 rounded-2xl"
                      style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                          style={{ background: `${C.navy}12` }}>
                          {c.category === 'AI & Tech' ? '🤖' : c.category === 'Design' ? '🎨' : c.category === 'Marketing' ? '📣' : '📚'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm mb-0.5" style={{ color: C.navy }}>{c.title}</h3>
                          <p className="text-xs mb-2" style={{ color: dm.text }}>{c.duration_weeks}w · {c.level} · {c.category}</p>
                          <Link to={`/course/${c.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl text-white"
                            style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>
                            Enroll Now <ChevronRight size={12} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-1.5 mt-3">
                  {recommendedCourses.map((_, i) => (
                    <button key={i} onClick={() => setCurrentSlide(i)}
                      className="rounded-full transition-all"
                      style={{ width: currentSlide === i ? '20px' : '6px', height: '6px', background: currentSlide === i ? C.orange : C.gray[300] }} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recent activity */}
          {recentActivity.length > 0 && (
            <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
              <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                <Activity size={14} style={{ color: C.navyMid }} />Recent Activity
              </h3>
              <div className="space-y-2">
                {recentActivity.map(a => (
                  <div key={a.id} className="flex items-center gap-3 p-2.5 rounded-xl" style={{ background: dm.subtle }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-sm"
                      style={{ background: `${C.orange}15` }}>
                      {a.type === 'lesson' ? '📖' : a.type === 'quiz' ? '✍️' : '📥'}
                    </div>
                    <span className="flex-1 text-xs" style={{ color: dm.heading }}>{a.description}</span>
                    <span className="text-[10px] flex-shrink-0" style={{ color: C.gray[400] }}>{a.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )

      // ════ MY COURSES ═════════════════════════════════════════════════════
      case 'courses': return (
        <div className="space-y-5">
          <div>
            <h2 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
              <PlayCircle size={14} style={{ color: C.orange }} />In Progress ({inProgressCourses.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {inProgressCourses.map(e => {
                const pct = courseProgress[e.course_id]?.percentage || e.progress || 45
                return (
                  <Link key={e.id} to={`/test-course-player/${e.course_id}`}
                    className="rounded-2xl p-4 block hover:shadow-lg transition-all"
                    style={{ background: dm.card, border: `2px solid ${C.orange}18` }}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-2xl">📖</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-white"
                        style={{ background: C.navyMid }}>{e.courses?.level}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-1" style={{ color: C.navy }}>{e.courses?.title}</h3>
                    <p className="text-xs mb-3" style={{ color: dm.text }}>{e.courses?.description}</p>
                    <div className="h-2 rounded-full overflow-hidden mb-1" style={{ background: dm.subtle }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${C.navy},${C.orange})` }} />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px]" style={{ color: dm.text }}>{e.courses?.duration_weeks} weeks</span>
                      <span className="text-sm font-black" style={{ color: C.orange }}>{pct}%</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          {completedCourses.length > 0 && (
            <div>
              <h2 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
                <CheckCircle size={14} style={{ color: C.green }} />Completed ({completedCourses.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {completedCourses.map(e => (
                  <div key={e.id} className="rounded-2xl p-4 flex items-center gap-3"
                    style={{ background: dm.card, border: `2px solid ${C.green}25` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${C.green}15` }}>
                      <CheckCircle size={20} style={{ color: C.green }} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: C.navy }}>{e.courses?.title}</h3>
                      <p className="text-xs" style={{ color: C.green }}>✓ Completed · Certificate available</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <h2 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
              <Sparkles size={14} style={{ color: C.yellow }} />Explore More Courses
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {recommendedCourses.map(c => (
                <Link key={c.id} to={`/course/${c.slug}`}
                  className="rounded-2xl p-4 hover:shadow-lg transition-all block"
                  style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3"
                    style={{ background: `${C.navy}10` }}>
                    {c.category === 'AI & Tech' ? '🤖' : c.category === 'Design' ? '🎨' : '📣'}
                  </div>
                  <h3 className="font-bold text-sm mb-1" style={{ color: C.navy }}>{c.title}</h3>
                  <p className="text-xs mb-3" style={{ color: dm.text }}>{c.duration_weeks}w · {c.level}</p>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-xl text-white inline-block"
                    style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>Enroll Now</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )

      // ════ ANALYTICS ══════════════════════════════════════════════════════
      case 'analytics': return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label:'Total Hours',  value:totalLearningTime, suffix:'h', color:C.navy   },
              { label:'Lessons Done', value:lessonsCompleted,  suffix:'',  color:C.green  },
              { label:'Quiz Avg',     value:quizAverage,       suffix:'%', color:C.orange },
              { label:'Quizzes',      value:quizzesTaken,      suffix:'',  color:C.purple },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl p-4 text-center" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}{s.suffix}</p>
                <p className="text-xs mt-1" style={{ color: dm.text }}>{s.label}</p>
              </div>
            ))}
          </div>
          <WeeklyChart dm={dm} />
          <SkillsPanel dm={dm} />
          <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: C.navy }}>📊 Course Breakdown</h3>
            {inProgressCourses.map(e => {
              const pct = courseProgress[e.course_id]?.percentage || e.progress || 45
              return (
                <div key={e.id} className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium truncate" style={{ color: dm.heading, maxWidth: '70%' }}>{e.courses?.title}</span>
                    <span className="font-black" style={{ color: C.orange }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: dm.subtle }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: `linear-gradient(90deg,${C.navy},${C.orange})` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: C.navy }}>🏆 Rank Progress</h3>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: `${C.yellow}20` }}>🥈</div>
              <div className="flex-1">
                <p className="font-black text-base" style={{ color: C.navy }}>{rank}</p>
                <p className="text-xs" style={{ color: dm.text }}>{points.toLocaleString()} / 2,000 XP to Gold</p>
                <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: dm.subtle }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.min((points / 2000) * 100, 100)}%`, background: `linear-gradient(90deg,${C.yellow},${C.orange})` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )

      // ════ ACHIEVEMENTS ════════════════════════════════════════════════════
      case 'achievements': return (
        <div className="space-y-4">
          <div className="rounded-2xl p-5 text-white text-center"
            style={{ background: `linear-gradient(145deg,${C.navyDark},${C.navy})` }}>
            <Trophy size={36} className="mx-auto mb-2" style={{ color: C.yellow }} />
            <p className="text-3xl font-black">{achievements.filter(a => a.unlocked).length}</p>
            <p className="text-sm opacity-70">Achievements Unlocked</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {achievements.map(a => (
              <div key={a.id} className="rounded-2xl p-4 flex items-center gap-3 transition-all"
                style={{
                  background: a.unlocked ? `linear-gradient(135deg,${C.navy}08,${C.orange}08)` : dm.card,
                  border: `2px solid ${a.unlocked ? C.orange + '35' : dm.border}`,
                  opacity: a.unlocked ? 1 : .65
                }}>
                <span className="text-3xl">{a.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: a.unlocked ? C.navy : dm.text }}>{a.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: dm.text }}>{a.description}</p>
                  {!a.unlocked && a.progress !== undefined && (
                    <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background: dm.subtle }}>
                      <div className="h-full rounded-full" style={{ width: `${a.progress}%`, background: C.orange }} />
                    </div>
                  )}
                </div>
                {a.unlocked ? <BadgeCheck size={20} style={{ color: C.green }} /> : <Lock size={15} style={{ color: C.gray[300] }} />}
              </div>
            ))}
          </div>
          <Leaderboard dm={dm} myName={getFirstName()} />
        </div>
      )

      // ════ PAYMENTS ════════════════════════════════════════════════════════
      case 'payments': return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg,${C.navyDark},${C.navy})` }}>
              <Wallet size={18} className="mb-2 opacity-70" />
              <p className="text-2xl font-black">{formatCurrency(totalSpent)}</p>
              <p className="text-xs opacity-60">Total Invested</p>
            </div>
            <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg,${C.green},${C.teal})` }}>
              <BookOpen size={18} className="mb-2 opacity-70" />
              <p className="text-2xl font-black">{payments.length}</p>
              <p className="text-xs opacity-60">Courses Bought</p>
            </div>
          </div>
          <h3 className="font-bold text-sm" style={{ color: C.navy }}>Payment History</h3>
          {payments.map(p => (
            <div key={p.id} className="rounded-2xl p-4 flex items-center gap-3"
              style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${C.green}12` }}>💳</div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate" style={{ color: dm.heading }}>{p.course_title}</p>
                <p className="text-xs" style={{ color: dm.text }}>{formatDate(p.created_at)}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-sm" style={{ color: C.green }}>{formatCurrency(p.amount)}</p>
                <span className="text-[9px] px-2 py-0.5 rounded-full text-white" style={{ background: C.green }}>Paid</span>
              </div>
            </div>
          ))}
        </div>
      )

      // ════ GOALS ═══════════════════════════════════════════════════════════
      case 'goals': return (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg,${C.orange},${C.amber})` }}>
            <Target size={22} className="mb-2" />
            <p className="font-bold">Your Learning Goals</p>
            <p className="text-xs opacity-70 mt-1">Every step counts. Keep going!</p>
          </div>
          {goals.map(g => (
            <div key={g.id} className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold text-sm" style={{ color: dm.heading }}>{g.title}</p>
                  <p className="text-xs" style={{ color: dm.text }}>{g.current} of {g.target} completed</p>
                </div>
                <span className="text-sm font-black" style={{ color: g.progress >= 100 ? C.green : C.orange }}>{g.progress}%</span>
              </div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: dm.subtle }}>
                <div className="h-full rounded-full transition-all"
                  style={{ width: `${g.progress}%`, background: g.progress >= 100 ? `linear-gradient(90deg,${C.green},${C.teal})` : `linear-gradient(90deg,${C.orange},${C.amber})` }} />
              </div>
            </div>
          ))}
        </div>
      )

      // ════ CERTIFICATES ════════════════════════════════════════════════════
      case 'certificates': return (
        <div className="space-y-4">
          <div className="rounded-2xl p-6 text-white text-center"
            style={{ background: `linear-gradient(145deg,${C.navyDark},${C.navy},${C.navyMid})` }}>
            <Award size={44} className="mx-auto mb-3" style={{ color: C.yellow }} />
            <p className="text-4xl font-black">{certificatesEarned}</p>
            <p className="opacity-70 text-sm mt-1">Certificates Earned</p>
          </div>
          {completedCourses.length > 0 ? completedCourses.map(e => (
            <div key={e.id} className="rounded-2xl p-4 border-2 flex items-center gap-4"
              style={{ background: dm.card, borderColor: `${C.yellow}35` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg,${C.yellow},${C.orange})` }}>
                <Award size={22} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: dm.heading }}>{e.courses?.title}</p>
                <p className="text-xs" style={{ color: C.green }}>Certificate available</p>
              </div>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-white"
                style={{ background: C.navy }}>
                <Download size={11} />Download
              </button>
            </div>
          )) : (
            <div className="rounded-2xl p-8 text-center" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
              <GraduationCap size={36} className="mx-auto mb-3" style={{ color: C.gray[300] }} />
              <p className="font-bold text-sm" style={{ color: dm.text }}>No certificates yet</p>
              <p className="text-xs mt-1" style={{ color: C.gray[400] }}>Complete a course to earn your first!</p>
            </div>
          )}
        </div>
      )

      // ════ COMMUNITY ═══════════════════════════════════════════════════════
      case 'community': return (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg,${C.teal},${C.navyMid})` }}>
            <Users size={22} className="mb-2" />
            <p className="font-bold">Community Hub</p>
            <p className="text-xs opacity-70">Connect, collaborate &amp; grow together</p>
          </div>
          <Leaderboard dm={dm} myName={getFirstName()} />
          <MentorMessages dm={dm} />
          <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: C.navy }}>
              <Users size={13} />Study Groups
            </h3>
            {[
              { name:'VA Masters Circle',        members:24, joined:true  },
              { name:'Digital Marketing Squad',  members:18, joined:false },
              { name:'Design Enthusiasts',       members:31, joined:false },
            ].map((g, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl mb-2" style={{ background: dm.subtle }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ background: C.navy }}>{g.name[0]}</div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: dm.heading }}>{g.name}</p>
                    <p className="text-[10px]" style={{ color: dm.text }}>{g.members} members</p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1 rounded-xl font-bold text-white"
                  style={{ background: g.joined ? C.green : C.navy }}>{g.joined ? 'Joined' : 'Join'}</button>
              </div>
            ))}
          </div>
        </div>
      )

      // ════ RESOURCES ═══════════════════════════════════════════════════════
      case 'resources': return (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
            <FolderOpen size={22} className="mb-2" />
            <p className="font-bold">Resource Library</p>
            <p className="text-xs opacity-70">All your course materials in one place</p>
          </div>
          <ResourceLibrary dm={dm} />
          <AssignmentTracker dm={dm} />
          <QuickNotes dm={dm} />
        </div>
      )

      // ════ SUPPORT ═════════════════════════════════════════════════════════
      case 'support': return (
        <div className="space-y-4">
          <div className="rounded-2xl p-4 text-white" style={{ background: `linear-gradient(135deg,${C.orange},${C.amber})` }}>
            <Headphones size={22} className="mb-2" />
            <p className="font-bold">Support Center</p>
            <p className="text-xs opacity-70">We're here to help you succeed</p>
          </div>
          {[
            { icon:MessageCircle, label:'Live Chat Support', desc:'Chat with us now',           color:C.teal   },
            { icon:Mail,          label:'Email Support',     desc:'support@ikpace.com',          color:C.navy   },
            { icon:BookOpen,      label:'Help Center / FAQ', desc:'Browse common questions',     color:C.green  },
            { icon:Video,         label:'Video Tutorials',   desc:'Step-by-step how-to guides',  color:C.purple },
          ].map((s, i) => (
            <div key={i} className="rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all"
              style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${s.color}12` }}>
                <s.icon size={19} style={{ color: s.color }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm" style={{ color: dm.heading }}>{s.label}</p>
                <p className="text-xs" style={{ color: dm.text }}>{s.desc}</p>
              </div>
              <ChevronRight size={15} style={{ color: C.gray[400] }} />
            </div>
          ))}
          <div className="rounded-2xl p-4" style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
            <h3 className="font-bold text-sm mb-3" style={{ color: C.navy }}>Submit a Ticket</h3>
            <input placeholder="Subject" className="w-full rounded-xl p-3 text-xs outline-none mb-3"
              style={{ background: dm.subtle, border: `1px solid ${dm.border}`, color: dm.heading }} />
            <textarea placeholder="Describe your issue…" rows={3}
              className="w-full rounded-xl p-3 text-xs outline-none resize-none mb-3"
              style={{ background: dm.subtle, border: `1px solid ${dm.border}`, color: dm.heading }} />
            <button className="w-full py-2.5 rounded-xl text-sm font-bold text-white"
              style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>Send Ticket</button>
          </div>
        </div>
      )

      default: return null
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen font-sans" style={{ background: dm.bg, color: dm.heading }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 px-4 py-3 flex items-center gap-3"
        style={{ background: darkMode ? `${C.gray[900]}f2` : `#fffffff2`, borderBottom: `1px solid ${dm.border}`, backdropFilter: 'blur(12px)' }}>

        <button className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition flex-shrink-0"
          onClick={() => setMobileMenuOpen(true)}>
          <Menu size={20} style={{ color: C.navy }} />
        </button>

        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-base shadow"
            style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
          <span className="font-black text-lg hidden sm:block" style={{ color: C.navy }}>iKPACE</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl flex-1 max-w-xs mx-2"
          style={{ background: dm.subtle, border: `1px solid ${dm.border}` }}>
          <Search size={13} style={{ color: C.gray[400] }} />
          <input placeholder="Search courses, lessons…" value={searchQ} onChange={e => setSearchQ(e.target.value)}
            className="bg-transparent text-xs outline-none flex-1" style={{ color: dm.heading }} />
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <button className="md:hidden p-2 rounded-xl" onClick={() => setSearchOpen(s => !s)}>
            <Search size={18} style={{ color: C.gray[500] }} />
          </button>
          <button onClick={() => setDarkMode(d => !d)} className="p-2 rounded-xl hover:bg-gray-100 transition">
            {darkMode ? <Sun size={18} style={{ color: C.yellow }} /> : <Moon size={18} style={{ color: C.gray[500] }} />}
          </button>
          <div className="relative">
            <button onClick={() => setNotifOpen(o => !o)} className="relative p-2 rounded-xl hover:bg-gray-100 transition">
              <Bell size={18} style={{ color: C.gray[500] }} />
              {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white" style={{ background: C.rose }} />}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden z-50"
                style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: dm.border }}>
                  <h3 className="font-bold text-sm" style={{ color: C.navy }}>Notifications</h3>
                  <button onClick={() => setNotifOpen(false)}><X size={15} style={{ color: C.gray[400] }} /></button>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="px-4 py-3 flex items-start gap-3 transition"
                      style={{ background: n.unread ? `${C.navy}05` : 'transparent', borderBottom: `1px solid ${dm.border}` }}>
                      <span className="text-base">{n.icon}</span>
                      <div className="flex-1">
                        <p className="text-xs" style={{ color: dm.heading }}>{n.text}</p>
                        <p className="text-[10px] mt-0.5" style={{ color: C.gray[400] }}>{n.time}</p>
                      </div>
                      {n.unread && <div className="w-2 h-2 rounded-full mt-1" style={{ background: C.orange }} />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button onClick={() => setProfileMenuOpen(o => !o)}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow"
                style={{ background: `linear-gradient(135deg,${C.navy},${C.orange})` }}>{getInitials()}</div>
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl shadow-2xl overflow-hidden z-50"
                style={{ background: dm.card, border: `1px solid ${dm.border}` }}>
                <div className="p-4 border-b" style={{ borderColor: dm.border }}>
                  <p className="font-bold text-sm truncate" style={{ color: dm.heading }}>{fullName}</p>
                  <p className="text-xs truncate" style={{ color: dm.text }}>{email}</p>
                </div>
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm transition"
                  style={{ color: dm.text }} onClick={() => setProfileMenuOpen(false)}>
                  <User size={14} />Profile Settings
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-sm transition"
                  style={{ color: dm.text }} onClick={() => setProfileMenuOpen(false)}>
                  <Settings size={14} />Settings
                </Link>
                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-500 transition">
                  <LogOut size={14} />Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile search */}
      {searchOpen && (
        <div className="md:hidden px-4 py-2 border-b" style={{ background: dm.card, borderColor: dm.border }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: dm.subtle, border: `1px solid ${dm.border}` }}>
            <Search size={13} style={{ color: C.gray[400] }} />
            <input autoFocus placeholder="Search…" value={searchQ} onChange={e => setSearchQ(e.target.value)}
              className="bg-transparent text-xs outline-none flex-1" style={{ color: dm.heading }} />
            <button onClick={() => setSearchOpen(false)}><X size={13} style={{ color: C.gray[400] }} /></button>
          </div>
        </div>
      )}

      {/* ── MOBILE OVERLAY MENU ─────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 overflow-y-auto shadow-2xl" style={{ background: dm.card }}>
            <div className="p-5 text-white relative" style={{ background: `linear-gradient(145deg,${C.navyDark},${C.orange})` }}>
              <button className="absolute top-4 right-4" onClick={() => setMobileMenuOpen(false)}>
                <X size={19} className="text-white/70" />
              </button>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg mb-3 bg-white/20">{getInitials()}</div>
              <p className="font-black text-base">{fullName}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] opacity-70">{rank}</span>
                <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{points.toLocaleString()} pts</span>
              </div>
            </div>
            <div className="p-3">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false) }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl mb-1 transition-all"
                  style={{ background: activeTab === item.id ? `${C.navy}10` : 'transparent' }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: activeTab === item.id ? C.navy : dm.subtle }}>
                    <item.icon size={16} style={{ color: activeTab === item.id ? '#fff' : C.gray[500] }} />
                  </div>
                  <span className="text-sm font-medium" style={{ color: activeTab === item.id ? C.navy : dm.text }}>{item.label}</span>
                  {activeTab === item.id && <ChevronRight size={13} className="ml-auto" style={{ color: C.navy }} />}
                </button>
              ))}
              <div className="mt-3 pt-3" style={{ borderTop: `1px solid ${dm.border}` }}>
                <button onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition">
                  <LogOut size={16} /><span className="text-sm font-medium">Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BODY ────────────────────────────────────────────────────────────── */}
      <div className="flex">

        {/* LEFT SIDEBAR (desktop) */}
        <aside className="hidden lg:flex flex-col w-60 flex-shrink-0 sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto"
          style={{ background: dm.card, borderRight: `1px solid ${dm.border}` }}>

          {/* User card */}
          <div className="m-3 rounded-2xl p-4 text-white" style={{ background: `linear-gradient(145deg,${C.navyDark},${C.orange})` }}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">{getInitials()}</div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-sm truncate">{getFirstName()}</p>
                <p className="text-[10px] opacity-70 truncate">{rank}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px]">
              <span className="opacity-60">ID: {studentId}</span>
              <button onClick={copyId} className="p-1 bg-white/20 rounded-lg hover:bg-white/30">
                {copied ? <Check size={10} /> : <Copy size={10} />}
              </button>
            </div>
            <div className="mt-2 h-1 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white/60" style={{ width: `${Math.min((points / 2000) * 100, 100)}%` }} />
            </div>
            <p className="text-[9px] opacity-50 mt-1">{points} / 2,000 XP to next rank</p>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 py-2">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveTab(item.id)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-0.5 transition-all"
                style={{ background: activeTab === item.id ? `${C.navy}10` : 'transparent' }}>
                <item.icon size={16} style={{ color: activeTab === item.id ? C.orange : C.gray[400] }} />
                <span className="text-sm font-medium" style={{ color: activeTab === item.id ? C.navy : dm.text }}>{item.label}</span>
                {activeTab === item.id && <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: C.orange }} />}
              </button>
            ))}
          </nav>

          {/* Streak widget */}
          <div className="mx-3 p-3 rounded-2xl flex items-center gap-3"
            style={{ background: `${C.orange}10`, border: `1px solid ${C.orange}20` }}>
            <Flame size={18} style={{ color: C.orange }} />
            <div>
              <p className="font-black text-base" style={{ color: C.orange }}>{streak} days</p>
              <p className="text-[10px]" style={{ color: dm.text }}>Current streak 🔥</p>
            </div>
          </div>

          {/* Today's progress */}
          <div className="mx-3 my-3 p-3 rounded-2xl" style={{ background: dm.subtle, border: `1px solid ${dm.border}` }}>
            <p className="font-bold text-xs mb-2" style={{ color: C.navy }}>Today's Progress</p>
            {[
              { label:'Daily Goal', value:`${Math.round(totalLearningTime / 7)}/4 hrs`, pct: Math.min((totalLearningTime / 7 / 4) * 100, 100), color: C.navy   },
              { label:'Streak',     value:`${streak} days`,                              pct: (streak / 30) * 100,                                 color: C.orange },
            ].map((p, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-[10px] mb-1" style={{ color: dm.text }}>
                  <span>{p.label}</span>
                  <span className="font-bold" style={{ color: p.color }}>{p.value}</span>
                </div>
                <div className="h-1 rounded-full overflow-hidden" style={{ background: dm.border }}>
                  <div className="h-full rounded-full" style={{ width: `${p.pct}%`, background: p.color }} />
                </div>
              </div>
            ))}
          </div>

          <button onClick={handleSignOut}
            className="mx-3 mb-3 flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-500 transition">
            <LogOut size={15} /><span className="text-sm font-medium">Sign Out</span>
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0 pb-24 lg:pb-8">

          {/* Hero banner */}
          <div className="m-4 rounded-2xl p-5 text-white overflow-hidden relative"
            style={{ background: `linear-gradient(145deg,${C.navyDark} 0%,${C.navy} 55%,${C.navyMid} 100%)` }}>
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full opacity-10" style={{ background: C.orange }} />
            <div className="absolute -bottom-6 right-20 w-24 h-24 rounded-full opacity-10" style={{ background: C.yellow }} />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center font-black text-lg border-2 border-white/30">
                  {getInitials()}
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-0.5">{greetingEmoji} {greeting}, {getFirstName()}!</p>
                  <h1 className="text-xl font-black leading-tight">Your Learning Dashboard</h1>
                  <p className="text-[11px] opacity-50 mt-0.5">{joinDate ? `Member since ${joinDate}` : 'Welcome to iKPACE'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <p className="text-xl font-black" style={{ color: C.yellow }}>{streak}</p>
                  <p className="text-[10px] opacity-60">Day Streak</p>
                </div>
                <div className="text-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm">
                  <p className="text-xl font-black" style={{ color: C.orangeLight }}>{points.toLocaleString()}</p>
                  <p className="text-[10px] opacity-60">XP Points</p>
                </div>
                <div className="text-center px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm cursor-pointer" onClick={copyId}>
                  <p className="text-sm font-black">{studentId}</p>
                  <p className="text-[10px] opacity-60">{copied ? 'Copied!' : 'Student ID'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tab content */}
          <div className="px-4">{renderTab()}</div>
        </main>
      </div>

      {/* ── BOTTOM NAV (mobile) ─────────────────────────────────────────────── */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around px-1 py-2 shadow-2xl"
        style={{ background: dm.card, borderTop: `1px solid ${dm.border}` }}>
        {[
          { id:'overview',     icon:Home,     label:'Home'      },
          { id:'courses',      icon:BookOpen, label:'Courses'   },
          { id:'analytics',    icon:BarChart3,label:'Stats'     },
          { id:'community',    icon:Users,    label:'Community' },
          { id:'achievements', icon:Trophy,   label:'Rewards'   },
        ].map(item => (
          <button key={item.id} onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all"
            style={{ background: activeTab === item.id ? `${C.navy}10` : 'transparent' }}>
            <item.icon size={20} style={{ color: activeTab === item.id ? C.orange : C.gray[400] }} />
            <span className="text-[10px] font-semibold" style={{ color: activeTab === item.id ? C.navy : C.gray[400] }}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
      `}</style>
    </div>
  )
}
