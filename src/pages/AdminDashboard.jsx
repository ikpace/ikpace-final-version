// src/pages/AdminDashboard.jsx
// ─── iKPACE Admin Dashboard ────────────────────────────────────────────────────
// Full admin panel: Overview, Users, Courses, Enrollments, Payments, Analytics
// Connected to Supabase. Requires admin role. Brand colors: navy #1A3D7C + orange #FF7A00
import { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import {
  LayoutDashboard, Users, BookOpen, ClipboardList, CreditCard,
  BarChart3, Settings, LogOut, Bell, Search, ChevronDown,
  TrendingUp, TrendingDown, CheckCircle, AlertCircle, Clock,
  Edit, Trash2, Plus, X, Save, Eye, EyeOff, Download,
  RefreshCw, Filter, ChevronLeft, ChevronRight, Menu,
  UserCheck, DollarSign, GraduationCap, Activity,
  ToggleLeft, ToggleRight, ArrowUpRight, Loader
} from 'lucide-react'

// ── Brand tokens ───────────────────────────────────────────────────────────────
const C = {
  navy:   '#1A3D7C',
  navyD:  '#0F2655',
  navyM:  '#2F5EA8',
  navyL:  '#E8EEF8',
  orange: '#FF7A00',
  orangeL:'#FFF0E5',
  green:  '#008F4C',
  greenL: '#E6F4EE',
  red:    '#DC2626',
  redL:   '#FEF2F2',
  yellow: '#D97706',
  yellowL:'#FFFBEB',
  gray: {
    50:'#F8FAFC', 100:'#F1F5F9', 200:'#E2E8F0',
    300:'#CBD5E1', 400:'#94A3B8', 500:'#64748B',
    600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A'
  }
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const fmt = {
  date: d => d ? new Date(d).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}) : '—',
  time: d => d ? new Date(d).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}) : '',
  money: n => `$${Number(n||0).toFixed(2)}`,
  pct: n => `${Math.min(Math.max(Number(n)||0,0),100)}%`,
  initials: s => s ? s.trim().split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2) : 'U',
  num: n => Number(n||0).toLocaleString(),
}

const statusColor = s => {
  const v = (s||'').toLowerCase()
  if (['success','paid','active','completed'].includes(v)) return { color:C.green, bg:C.greenL }
  if (['pending'].includes(v)) return { color:C.yellow, bg:C.yellowL }
  if (['failed','inactive','refunded'].includes(v)) return { color:C.red, bg:C.redL }
  return { color:C.gray[600], bg:C.gray[100] }
}

// ── Tiny UI atoms ──────────────────────────────────────────────────────────────
const Badge = ({ label }) => {
  const { color, bg } = statusColor(label)
  return <span style={{ fontSize:11, fontWeight:700, color, background:bg, padding:'3px 9px', borderRadius:20 }}>{label}</span>
}

const Btn = ({ children, onClick, variant='primary', size='md', disabled=false, style={} }) => {
  const styles = {
    primary:   { background:`linear-gradient(135deg,${C.navy},${C.navyM})`, color:'white' },
    orange:    { background:C.orange, color:'white' },
    ghost:     { background:'transparent', color:C.gray[600], border:`1px solid ${C.gray[200]}` },
    danger:    { background:C.redL, color:C.red, border:`1px solid ${C.red}25` },
    success:   { background:C.greenL, color:C.green, border:`1px solid ${C.green}25` },
  }
  const pad = size === 'sm' ? '6px 12px' : size === 'lg' ? '12px 24px' : '9px 16px'
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles[variant], padding:pad, borderRadius:10, fontWeight:700,
      fontSize: size==='sm'?12:14, border:'none', cursor:disabled?'not-allowed':'pointer',
      display:'inline-flex', alignItems:'center', gap:6, transition:'all .15s',
      opacity:disabled?0.6:1, whiteSpace:'nowrap', ...style
    }}>{children}</button>
  )
}

const Card = ({ children, style={} }) => (
  <div style={{ background:'white', borderRadius:16, border:`1px solid ${C.gray[200]}`,
    boxShadow:'0 1px 8px rgba(0,0,0,0.04)', padding:20, ...style }}>
    {children}
  </div>
)

const Input = ({ value, onChange, placeholder, type='text', style={} }) => (
  <input type={type} value={value} onChange={e=>onChange(e.target.value)}
    placeholder={placeholder}
    style={{ padding:'9px 13px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
      fontSize:14, outline:'none', color:C.gray[900], background:'white',
      width:'100%', ...style }}/>
)

const Select = ({ value, onChange, children, style={} }) => (
  <select value={value} onChange={e=>onChange(e.target.value)}
    style={{ padding:'9px 13px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
      fontSize:14, outline:'none', color:C.gray[700], background:'white', ...style }}>
    {children}
  </select>
)

const Bar = ({ pct=0, color=C.navy }) => {
  const p = Math.min(Math.max(Number(pct)||0,0),100)
  return (
    <div style={{ height:6, borderRadius:4, background:C.gray[100], overflow:'hidden', minWidth:80 }}>
      <div style={{ height:'100%', width:`${p}%`, background:color, borderRadius:4 }}/>
    </div>
  )
}

// ── Modal wrapper ──────────────────────────────────────────────────────────────
function Modal({ title, onClose, children, width=520 }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:100, background:'rgba(15,22,85,0.55)',
      backdropFilter:'blur(3px)', display:'flex', alignItems:'center',
      justifyContent:'center', padding:16 }}>
      <div style={{ width:'100%', maxWidth:width, background:'white', borderRadius:20,
        boxShadow:'0 24px 60px rgba(0,0,0,0.22)', maxHeight:'90vh',
        display:'flex', flexDirection:'column' }}>
        <div style={{ padding:'18px 20px', borderBottom:`1px solid ${C.gray[100]}`,
          display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h3 style={{ fontWeight:800, fontSize:16, color:C.navy, margin:0 }}>{title}</h3>
          <button onClick={onClose} style={{ background:C.gray[100], border:'none',
            width:32, height:32, borderRadius:8, cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center' }}>
            <X size={16} style={{ color:C.gray[600] }}/>
          </button>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:20 }}>{children}</div>
      </div>
    </div>
  )
}

// ── Sparkline bar chart (pure CSS) ─────────────────────────────────────────────
function Sparkline({ data=[], color=C.navy, height=40 }) {
  const max = Math.max(...data, 1)
  return (
    <div style={{ display:'flex', alignItems:'flex-end', gap:3, height }}>
      {data.map((v,i) => (
        <div key={i} style={{
          flex:1, borderRadius:3, background:color,
          height:`${(v/max)*100}%`, minHeight:2, opacity:0.7+0.3*(v/max),
          transition:'height .4s ease'
        }}/>
      ))}
    </div>
  )
}

// ── Donut chart (SVG) ──────────────────────────────────────────────────────────
function DonutChart({ segments=[], size=120 }) {
  const r = 48, cx = 60, cy = 60, circumference = 2*Math.PI*r
  const total = segments.reduce((s,x)=>s+(x.value||0),0) || 1
  let offset = 0
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={C.gray[100]} strokeWidth={14}/>
      {segments.map((seg,i) => {
        const pct  = seg.value / total
        const dash = pct * circumference
        const el = (
          <circle key={i} cx={cx} cy={cy} r={r} fill="none"
            stroke={seg.color} strokeWidth={14}
            strokeDasharray={`${dash} ${circumference-dash}`}
            strokeDashoffset={-offset+circumference*0.25}
            strokeLinecap="round" style={{ transition:'stroke-dasharray .6s ease' }}/>
        )
        offset += dash
        return el
      })}
      <text x={cx} y={cy+5} textAnchor="middle" fontSize={14} fontWeight={900} fill={C.navy}>
        {total}
      </text>
    </svg>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: OVERVIEW
// ══════════════════════════════════════════════════════════════════════════════
function OverviewSection({ stats, recentUsers, recentPayments, enrollmentTrend, revenueTrend }) {
  const statCards = [
    { label:'Total Users',       value: fmt.num(stats.totalUsers),       icon:Users,          color:C.navy,   trend:'+12%' },
    { label:'Total Enrollments', value: fmt.num(stats.totalEnrollments), icon:ClipboardList,  color:C.orange, trend:'+8%'  },
    { label:'Completed Courses', value: fmt.num(stats.totalCompleted),   icon:GraduationCap,  color:C.green,  trend:'+5%'  },
    { label:'Total Revenue',     value: fmt.money(stats.totalRevenue),   icon:DollarSign,     color:C.navyM,  trend:'+18%' },
  ]
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      {/* Stat cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:16 }}>
        {statCards.map((s,i) => (
          <Card key={i} style={{ position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-15, right:-15, width:70, height:70,
              borderRadius:'50%', background:`${s.color}08` }}/>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
              <div style={{ width:44, height:44, borderRadius:12, background:`${s.color}12`,
                display:'flex', alignItems:'center', justifyContent:'center' }}>
                <s.icon size={20} style={{ color:s.color }}/>
              </div>
              <span style={{ fontSize:12, fontWeight:700, color:C.green, background:C.greenL,
                padding:'3px 8px', borderRadius:20, display:'flex', alignItems:'center', gap:3 }}>
                <TrendingUp size={11}/>{s.trend}
              </span>
            </div>
            <p style={{ fontSize:26, fontWeight:900, color:s.color, margin:'0 0 4px' }}>{s.value}</p>
            <p style={{ fontSize:12, color:C.gray[500], margin:0 }}>{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:0 }}>📈 Enrollment Trend (7 days)</h3>
          </div>
          <Sparkline data={enrollmentTrend} color={C.navy} height={64}/>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <span key={d} style={{ fontSize:10, color:C.gray[400] }}>{d}</span>
            ))}
          </div>
        </Card>
        <Card>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:0 }}>💰 Revenue Trend (7 days)</h3>
          </div>
          <Sparkline data={revenueTrend} color={C.orange} height={64}/>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:6 }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => (
              <span key={d} style={{ fontSize:10, color:C.gray[400] }}>{d}</span>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent activity */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
        {/* Recent users */}
        <Card>
          <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:'0 0 14px' }}>👥 Recent Sign-ups</h3>
          {recentUsers.length === 0
            ? <p style={{ color:C.gray[400], fontSize:13 }}>No recent sign-ups</p>
            : recentUsers.slice(0,5).map((u,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10,
                padding:'8px 0', borderBottom:i<4?`1px solid ${C.gray[100]}`:'none' }}>
                <div style={{ width:34, height:34, borderRadius:10, flexShrink:0,
                  background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  color:'white', fontWeight:800, fontSize:12 }}>
                  {fmt.initials(u.full_name)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontWeight:700, fontSize:13, color:C.gray[900], margin:0, truncate:true }}>{u.full_name||'—'}</p>
                  <p style={{ fontSize:11, color:C.gray[400], margin:0 }}>{u.email}</p>
                </div>
                <span style={{ fontSize:11, color:C.gray[400] }}>{fmt.date(u.created_at)}</span>
              </div>
            ))
          }
        </Card>

        {/* Recent payments */}
        <Card>
          <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, margin:'0 0 14px' }}>💳 Recent Payments</h3>
          {recentPayments.length === 0
            ? <p style={{ color:C.gray[400], fontSize:13 }}>No recent payments</p>
            : recentPayments.slice(0,5).map((p,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10,
                padding:'8px 0', borderBottom:i<4?`1px solid ${C.gray[100]}`:'none' }}>
                <div style={{ width:34, height:34, borderRadius:10, flexShrink:0,
                  background: ['success','paid'].includes((p.status||'').toLowerCase()) ? C.greenL : C.yellowL,
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:16 }}>
                  {['success','paid'].includes((p.status||'').toLowerCase()) ? '✅' : '⏳'}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontWeight:700, fontSize:13, color:C.gray[900], margin:0 }}>{p.course_title||'—'}</p>
                  <p style={{ fontSize:11, color:C.gray[400], margin:0 }}>{p.reference||'—'}</p>
                </div>
                <p style={{ fontWeight:900, fontSize:14, color:C.navy, margin:0 }}>{fmt.money(p.amount)}</p>
              </div>
            ))
          }
        </Card>
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: USERS
// ══════════════════════════════════════════════════════════════════════════════
function UsersSection({ onMsg }) {
  const [users,    setUsers]    = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [editUser, setEditUser] = useState(null)
  const [page,     setPage]     = useState(1)
  const PER_PAGE = 10

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select(`id, full_name, avatar_url, login_streak, updated_at`)
      .order('updated_at', { ascending: false })

    // Get auth users for email + created_at (requires service role in real app)
    // Here we join what we can from enrollments count
    const { data: enrCounts } = await supabase
      .from('enrollments')
      .select('user_id')

    const countMap = {}
    ;(enrCounts||[]).forEach(e => { countMap[e.user_id] = (countMap[e.user_id]||0)+1 })

    const merged = (data||[]).map(u => ({
      ...u,
      email: u.email || '—',
      enrolled_count: countMap[u.id] || 0,
    }))
    setUsers(merged)
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = users.filter(u =>
    !search || (u.full_name||'').toLowerCase().includes(search.toLowerCase()) ||
    (u.email||'').toLowerCase().includes(search.toLowerCase())
  )
  const pages   = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const saveEdit = async () => {
    const { error } = await supabase.from('profiles').update({
      full_name: editUser.full_name,
    }).eq('id', editUser.id)
    if (error) { onMsg('❌ '+error.message, 'error'); return }
    onMsg('✅ User updated!', 'success')
    setEditUser(null); load()
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', alignItems:'center', justifyContent:'space-between' }}>
        <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>
          Users <span style={{ fontSize:14, color:C.gray[400], fontWeight:600 }}>({filtered.length})</span>
        </h2>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ position:'relative' }}>
            <Search size={14} style={{ position:'absolute', left:10, top:10, color:C.gray[400] }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search name or email…"
              style={{ padding:'9px 13px 9px 32px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
                fontSize:13, outline:'none', width:220 }}/>
          </div>
          <Btn variant="ghost" onClick={load} size="sm"><RefreshCw size={13}/> Refresh</Btn>
        </div>
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:32, textAlign:'center' }}>
            <Loader size={24} style={{ color:C.navy, animation:'spin 1s linear infinite' }}/>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 80px',
              padding:'11px 20px', background:C.gray[50], borderBottom:`1px solid ${C.gray[200]}`,
              gap:12 }}>
              {['Name / Email','Courses','Streak','Updated','Actions'].map(h => (
                <p key={h} style={{ fontSize:11, fontWeight:700, color:C.gray[400],
                  textTransform:'uppercase', letterSpacing:'.5px', margin:0 }}>{h}</p>
              ))}
            </div>

            {visible.map((u,i) => (
              <div key={u.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 80px',
                padding:'13px 20px', borderBottom:`1px solid ${C.gray[100]}`,
                background:i%2===0?'white':C.gray[50], gap:12, alignItems:'center' }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
                    background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    color:'white', fontWeight:800, fontSize:12 }}>
                    {fmt.initials(u.full_name)}
                  </div>
                  <div>
                    <p style={{ fontWeight:700, fontSize:13, color:C.gray[900], margin:0 }}>{u.full_name||'—'}</p>
                    <p style={{ fontSize:11, color:C.gray[400], margin:0, fontFamily:'monospace' }}>{u.id?.slice(0,8)}…</p>
                  </div>
                </div>
                <p style={{ margin:0, fontSize:13, fontWeight:700, color:C.navy }}>{u.enrolled_count}</p>
                <p style={{ margin:0, fontSize:13, color:C.gray[600] }}>{u.login_streak||0} 🔥</p>
                <p style={{ margin:0, fontSize:12, color:C.gray[400] }}>{fmt.date(u.updated_at)}</p>
                <Btn variant="ghost" size="sm" onClick={()=>setEditUser({...u})}>
                  <Edit size={13}/> Edit
                </Btn>
              </div>
            ))}

            {/* Pagination */}
            {pages > 1 && (
              <div style={{ padding:'12px 20px', display:'flex', alignItems:'center',
                justifyContent:'space-between', borderTop:`1px solid ${C.gray[100]}` }}>
                <p style={{ fontSize:13, color:C.gray[400], margin:0 }}>
                  Page {page} of {pages} · {filtered.length} users
                </p>
                <div style={{ display:'flex', gap:6 }}>
                  <Btn variant="ghost" size="sm" disabled={page===1} onClick={()=>setPage(p=>p-1)}>
                    <ChevronLeft size={14}/>
                  </Btn>
                  <Btn variant="ghost" size="sm" disabled={page===pages} onClick={()=>setPage(p=>p+1)}>
                    <ChevronRight size={14}/>
                  </Btn>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Edit user modal */}
      {editUser && (
        <Modal title="Edit User" onClose={()=>setEditUser(null)}>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Full Name</label>
              <Input value={editUser.full_name||''} onChange={v=>setEditUser(p=>({...p,full_name:v}))} placeholder="Full name"/>
            </div>
            <div style={{ padding:'12px 14px', borderRadius:10, background:C.gray[50] }}>
              <p style={{ fontSize:12, color:C.gray[500], margin:'0 0 4px' }}>User ID</p>
              <p style={{ fontSize:12, fontFamily:'monospace', color:C.gray[700], margin:0 }}>{editUser.id}</p>
            </div>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:8 }}>
              <Btn variant="ghost" onClick={()=>setEditUser(null)}>Cancel</Btn>
              <Btn onClick={saveEdit}><Save size={14}/> Save Changes</Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: COURSES
// ══════════════════════════════════════════════════════════════════════════════
function CoursesSection({ onMsg }) {
  const [courses,   setCourses]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [modal,     setModal]     = useState(null)   // null | 'add' | course object
  const [form,      setForm]      = useState({})
  const [saving,    setSaving]    = useState(false)
  const [enrCounts, setEnrCounts] = useState({})

  const blank = { title:'', slug:'', description:'', category:'Career', level:'Beginner', duration_weeks:4, price:7, is_active:true }

  const load = useCallback(async () => {
    setLoading(true)
    const [{ data:c }, { data:e }] = await Promise.all([
      supabase.from('courses').select('*').order('created_at',{ascending:false}),
      supabase.from('enrollments').select('course_id'),
    ])
    const counts = {}
    ;(e||[]).forEach(x => { counts[x.course_id] = (counts[x.course_id]||0)+1 })
    setCourses(c||[]); setEnrCounts(counts); setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const openAdd  = () => { setForm(blank); setModal('add') }
  const openEdit = c  => { setForm({...c}); setModal(c) }

  const save = async () => {
    setSaving(true)
    const isNew = modal === 'add'
    const payload = {
      title:          form.title,
      slug:           form.slug || form.title?.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''),
      description:    form.description,
      category:       form.category,
      level:          form.level,
      duration_weeks: Number(form.duration_weeks)||4,
      price:          Number(form.price)||7,
      is_active:      form.is_active !== false,
    }
    const { error } = isNew
      ? await supabase.from('courses').insert(payload)
      : await supabase.from('courses').update(payload).eq('id', form.id)
    setSaving(false)
    if (error) { onMsg('❌ '+error.message,'error'); return }
    onMsg(isNew?'✅ Course added!':'✅ Course updated!','success')
    setModal(null); load()
  }

  const toggleActive = async (c) => {
    const { error } = await supabase.from('courses').update({ is_active:!c.is_active }).eq('id',c.id)
    if (error) { onMsg('❌ '+error.message,'error'); return }
    onMsg(`✅ Course ${c.is_active?'deactivated':'activated'}!`,'success'); load()
  }

  const deleteCourse = async (c) => {
    if (!window.confirm(`Delete "${c.title}"? This cannot be undone.`)) return
    const { error } = await supabase.from('courses').delete().eq('id',c.id)
    if (error) { onMsg('❌ '+error.message,'error'); return }
    onMsg('✅ Course deleted!','success'); load()
  }

  const categories = ['Career','Marketing','Design','Kids','Business','Tech']
  const levels     = ['Beginner','Intermediate','Advanced']

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>
          Courses <span style={{ fontSize:14, color:C.gray[400], fontWeight:600 }}>({courses.length})</span>
        </h2>
        <div style={{ display:'flex', gap:8 }}>
          <Btn variant="ghost" size="sm" onClick={load}><RefreshCw size={13}/> Refresh</Btn>
          <Btn variant="orange" onClick={openAdd}><Plus size={14}/> Add Course</Btn>
        </div>
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:32, textAlign:'center' }}>
            <Loader size={24} style={{ color:C.navy, animation:'spin 1s linear infinite' }}/>
          </div>
        ) : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'2.5fr 1fr 1fr 1fr 80px 100px',
              padding:'11px 20px', background:C.gray[50], borderBottom:`1px solid ${C.gray[200]}`, gap:12 }}>
              {['Title','Category','Level','Students','Status','Actions'].map(h => (
                <p key={h} style={{ fontSize:11, fontWeight:700, color:C.gray[400],
                  textTransform:'uppercase', letterSpacing:'.5px', margin:0 }}>{h}</p>
              ))}
            </div>
            {courses.map((c,i) => (
              <div key={c.id} style={{ display:'grid', gridTemplateColumns:'2.5fr 1fr 1fr 1fr 80px 100px',
                padding:'13px 20px', borderBottom:`1px solid ${C.gray[100]}`,
                background:i%2===0?'white':C.gray[50], gap:12, alignItems:'center' }}>
                <div>
                  <p style={{ fontWeight:700, fontSize:13, color:C.navy, margin:0 }}>{c.title}</p>
                  <p style={{ fontSize:11, color:C.gray[400], margin:'2px 0 0' }}>{c.slug} · ${c.price}</p>
                </div>
                <p style={{ margin:0, fontSize:13, color:C.gray[600] }}>{c.category}</p>
                <p style={{ margin:0, fontSize:13, color:C.gray[600] }}>{c.level}</p>
                <p style={{ margin:0, fontSize:13, fontWeight:700, color:C.navy }}>{enrCounts[c.id]||0}</p>
                <div>
                  <button onClick={()=>toggleActive(c)} style={{ background:'none', border:'none', cursor:'pointer', display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:700, color:c.is_active?C.green:C.gray[400] }}>
                    {c.is_active ? <ToggleRight size={20} style={{ color:C.green }}/> : <ToggleLeft size={20}/>}
                    {c.is_active?'Active':'Off'}
                  </button>
                </div>
                <div style={{ display:'flex', gap:5 }}>
                  <Btn variant="ghost" size="sm" onClick={()=>openEdit(c)}><Edit size={12}/></Btn>
                  <Btn variant="danger" size="sm" onClick={()=>deleteCourse(c)}><Trash2 size={12}/></Btn>
                </div>
              </div>
            ))}
          </>
        )}
      </Card>

      {/* Add/Edit modal */}
      {modal !== null && (
        <Modal title={modal==='add'?'Add Course':'Edit Course'} onClose={()=>setModal(null)}>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {[
              { label:'Title',       key:'title',       type:'text' },
              { label:'Slug (URL)',  key:'slug',        type:'text', placeholder:'auto-generated if empty' },
              { label:'Price ($)',   key:'price',       type:'number' },
              { label:'Duration (weeks)', key:'duration_weeks', type:'number' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>{f.label}</label>
                <Input value={form[f.key]||''} type={f.type||'text'}
                  placeholder={f.placeholder||f.label}
                  onChange={v=>setForm(p=>({...p,[f.key]:v}))}/>
              </div>
            ))}
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Description</label>
              <textarea value={form.description||''} onChange={e=>setForm(p=>({...p,description:e.target.value}))}
                rows={3} placeholder="Course description"
                style={{ width:'100%', padding:'9px 13px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
                  fontSize:14, outline:'none', resize:'vertical', color:C.gray[900] }}/>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Category</label>
                <Select value={form.category||'Career'} onChange={v=>setForm(p=>({...p,category:v}))}>
                  {categories.map(c => <option key={c}>{c}</option>)}
                </Select>
              </div>
              <div>
                <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Level</label>
                <Select value={form.level||'Beginner'} onChange={v=>setForm(p=>({...p,level:v}))}>
                  {levels.map(l => <option key={l}>{l}</option>)}
                </Select>
              </div>
            </div>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer' }}>
              <input type="checkbox" checked={form.is_active!==false}
                onChange={e=>setForm(p=>({...p,is_active:e.target.checked}))}/>
              <span style={{ fontSize:13, fontWeight:600, color:C.gray[700] }}>Active (visible to students)</span>
            </label>
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:8, borderTop:`1px solid ${C.gray[100]}` }}>
              <Btn variant="ghost" onClick={()=>setModal(null)}>Cancel</Btn>
              <Btn onClick={save} disabled={saving}>
                {saving ? <><Loader size={13} style={{ animation:'spin 1s linear infinite' }}/> Saving…</> : <><Save size={14}/> Save Course</>}
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: ENROLLMENTS
// ══════════════════════════════════════════════════════════════════════════════
function EnrollmentsSection({ onMsg }) {
  const [enrollments, setEnrollments] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [search,      setSearch]      = useState('')
  const [progModal,   setProgModal]   = useState(null)
  const [newProg,     setNewProg]     = useState(0)
  const [saving,      setSaving]      = useState(false)
  const [page,        setPage]        = useState(1)
  const PER_PAGE = 12

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('enrollments')
      .select(`id, user_id, course_id, progress, status, enrolled_at, completed_at,
        courses(title)`)
      .order('enrolled_at', { ascending:false })

    // get profile names
    const { data:profiles } = await supabase.from('profiles').select('id,full_name')
    const nameMap = {}
    ;(profiles||[]).forEach(p => { nameMap[p.id] = p.full_name })
    const merged = (data||[]).map(e => ({ ...e, user_name: nameMap[e.user_id] || e.user_id?.slice(0,8) }))
    setEnrollments(merged); setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = enrollments.filter(e =>
    !search ||
    (e.user_name||'').toLowerCase().includes(search.toLowerCase()) ||
    (e.courses?.title||'').toLowerCase().includes(search.toLowerCase())
  )
  const pages   = Math.ceil(filtered.length / PER_PAGE)
  const visible = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const updateProgress = async () => {
    setSaving(true)
    const { error } = await supabase.rpc('update_enrollment_progress', {
      p_user_id:   progModal.user_id,
      p_course_id: progModal.course_id,
      p_progress:  Number(newProg),
    })
    setSaving(false)
    if (error) { onMsg('❌ '+error.message,'error'); return }
    onMsg('✅ Progress updated!','success')
    setProgModal(null); load()
  }

  const pctColor = p => p>=100?C.green:p>0?C.orange:C.gray[300]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>
          Enrollments <span style={{ fontSize:14, color:C.gray[400], fontWeight:600 }}>({filtered.length})</span>
        </h2>
        <div style={{ display:'flex', gap:8 }}>
          <div style={{ position:'relative' }}>
            <Search size={14} style={{ position:'absolute', left:10, top:10, color:C.gray[400] }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search user or course…"
              style={{ padding:'9px 13px 9px 32px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
                fontSize:13, outline:'none', width:210 }}/>
          </div>
          <Btn variant="ghost" size="sm" onClick={load}><RefreshCw size={13}/> Refresh</Btn>
        </div>
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:32, textAlign:'center' }}>
            <Loader size={24} style={{ color:C.navy, animation:'spin 1s linear infinite' }}/>
          </div>
        ) : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'1.5fr 2fr 1.2fr 1fr 1fr 90px',
              padding:'11px 20px', background:C.gray[50], borderBottom:`1px solid ${C.gray[200]}`, gap:12 }}>
              {['Student','Course','Progress','Status','Enrolled','Actions'].map(h => (
                <p key={h} style={{ fontSize:11, fontWeight:700, color:C.gray[400],
                  textTransform:'uppercase', letterSpacing:'.5px', margin:0 }}>{h}</p>
              ))}
            </div>
            {visible.map((e,i) => {
              const pct = Math.min(Math.max(Number(e.progress)||0,0),100)
              return (
                <div key={e.id} style={{ display:'grid', gridTemplateColumns:'1.5fr 2fr 1.2fr 1fr 1fr 90px',
                  padding:'12px 20px', borderBottom:`1px solid ${C.gray[100]}`,
                  background:i%2===0?'white':C.gray[50], gap:12, alignItems:'center' }}>
                  <p style={{ margin:0, fontSize:13, fontWeight:700, color:C.gray[900] }}>{e.user_name}</p>
                  <p style={{ margin:0, fontSize:13, color:C.navy, fontWeight:600 }}>{e.courses?.title||'—'}</p>
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:3 }}>
                      <span style={{ color:C.gray[500] }}>{pct}%</span>
                    </div>
                    <Bar pct={pct} color={pctColor(pct)}/>
                  </div>
                  <Badge label={e.status||'active'}/>
                  <p style={{ margin:0, fontSize:11, color:C.gray[400] }}>{fmt.date(e.enrolled_at)}</p>
                  <Btn variant="ghost" size="sm" onClick={()=>{setProgModal(e);setNewProg(pct)}}>
                    <Edit size={12}/> Progress
                  </Btn>
                </div>
              )
            })}
            {pages>1 && (
              <div style={{ padding:'12px 20px', display:'flex', alignItems:'center',
                justifyContent:'space-between', borderTop:`1px solid ${C.gray[100]}` }}>
                <p style={{ fontSize:13, color:C.gray[400], margin:0 }}>Page {page}/{pages}</p>
                <div style={{ display:'flex', gap:6 }}>
                  <Btn variant="ghost" size="sm" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft size={14}/></Btn>
                  <Btn variant="ghost" size="sm" disabled={page===pages} onClick={()=>setPage(p=>p+1)}><ChevronRight size={14}/></Btn>
                </div>
              </div>
            )}
          </>
        )}
      </Card>

      {/* Update progress modal */}
      {progModal && (
        <Modal title="Update Progress" onClose={()=>setProgModal(null)} width={380}>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div style={{ padding:'12px 14px', borderRadius:10, background:C.gray[50] }}>
              <p style={{ fontSize:12, color:C.gray[500], margin:'0 0 2px' }}>Student</p>
              <p style={{ fontSize:14, fontWeight:700, color:C.navy, margin:0 }}>{progModal.user_name}</p>
              <p style={{ fontSize:12, color:C.gray[500], margin:'6px 0 2px' }}>Course</p>
              <p style={{ fontSize:14, fontWeight:700, color:C.navy, margin:0 }}>{progModal.courses?.title}</p>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:8 }}>
                Progress: <span style={{ color:C.orange }}>{newProg}%</span>
              </label>
              <input type="range" min={0} max={100} value={newProg}
                onChange={e=>setNewProg(Number(e.target.value))}
                style={{ width:'100%', accentColor:C.orange }}/>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:C.gray[400], marginTop:4 }}>
                <span>0%</span><span>50%</span><span>100%</span>
              </div>
            </div>
            <Bar pct={newProg} color={newProg>=100?C.green:C.orange} />
            <div style={{ display:'flex', gap:8, justifyContent:'flex-end', paddingTop:8 }}>
              <Btn variant="ghost" onClick={()=>setProgModal(null)}>Cancel</Btn>
              <Btn onClick={updateProgress} disabled={saving}>
                {saving?<><Loader size={13} style={{ animation:'spin 1s linear infinite' }}/> Updating…</>:<><Save size={14}/> Update</>}
              </Btn>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: PAYMENTS
// ══════════════════════════════════════════════════════════════════════════════
function PaymentsSection({ onMsg }) {
  const [payments, setPayments] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [search,   setSearch]   = useState('')
  const [filter,   setFilter]   = useState('all')
  const [page,     setPage]     = useState(1)
  const PER_PAGE = 12

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('payments')
      .select('*')
      .order('created_at',{ascending:false})
    setPayments(data||[]); setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  const filtered = payments.filter(p => {
    const matchSearch = !search ||
      (p.course_title||'').toLowerCase().includes(search.toLowerCase()) ||
      (p.reference||'').toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter==='all' || (p.status||'').toLowerCase()===filter
    return matchSearch && matchFilter
  })
  const pages   = Math.ceil(filtered.length/PER_PAGE)
  const visible = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE)

  const exportCSV = () => {
    const headers = ['ID','Course','Amount','Status','Reference','Provider','Date']
    const rows = filtered.map(p => [
      p.id, p.course_title, p.amount, p.status, p.reference, p.provider,
      new Date(p.created_at).toISOString()
    ])
    const csv = [headers, ...rows].map(r => r.map(v=>`"${v||''}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type:'text/csv' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = 'ikpace_payments.csv'; a.click()
    URL.revokeObjectURL(url)
    onMsg('✅ CSV exported!','success')
  }

  const totalRev = filtered.filter(p=>['success','paid'].includes((p.status||'').toLowerCase())).reduce((s,p)=>s+Number(p.amount||0),0)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:10 }}>
        <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>
          Payments <span style={{ fontSize:14, color:C.gray[400], fontWeight:600 }}>({filtered.length})</span>
        </h2>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          <div style={{ position:'relative' }}>
            <Search size={14} style={{ position:'absolute', left:10, top:10, color:C.gray[400] }}/>
            <input value={search} onChange={e=>setSearch(e.target.value)}
              placeholder="Search course or ref…"
              style={{ padding:'9px 13px 9px 32px', borderRadius:10, border:`1.5px solid ${C.gray[200]}`,
                fontSize:13, outline:'none', width:200 }}/>
          </div>
          <Select value={filter} onChange={setFilter} style={{ width:130 }}>
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </Select>
          <Btn variant="ghost" size="sm" onClick={load}><RefreshCw size={13}/> Refresh</Btn>
          <Btn variant="success" size="sm" onClick={exportCSV}><Download size={13}/> Export CSV</Btn>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
        {[
          { label:'Filtered Revenue', val:fmt.money(totalRev), color:C.green },
          { label:'Transactions',     val:filtered.length,     color:C.navy  },
          { label:'Successful',       val:filtered.filter(p=>['success','paid'].includes((p.status||'').toLowerCase())).length, color:C.green },
          { label:'Pending',          val:filtered.filter(p=>p.status==='pending').length, color:C.yellow },
        ].map((s,i) => (
          <div key={i} style={{ background:'white', borderRadius:12, border:`1px solid ${C.gray[200]}`,
            padding:'12px 18px', flex:1, minWidth:120 }}>
            <p style={{ fontSize:11, color:C.gray[400], margin:'0 0 3px', textTransform:'uppercase', letterSpacing:'.4px' }}>{s.label}</p>
            <p style={{ fontSize:20, fontWeight:900, color:s.color, margin:0 }}>{s.val}</p>
          </div>
        ))}
      </div>

      <Card style={{ padding:0, overflow:'hidden' }}>
        {loading ? (
          <div style={{ padding:32, textAlign:'center' }}>
            <Loader size={24} style={{ color:C.navy, animation:'spin 1s linear infinite' }}/>
          </div>
        ) : (
          <>
            <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',
              padding:'11px 20px', background:C.gray[50], borderBottom:`1px solid ${C.gray[200]}`, gap:12 }}>
              {['Course','Amount','Status','Reference','Date'].map(h => (
                <p key={h} style={{ fontSize:11, fontWeight:700, color:C.gray[400],
                  textTransform:'uppercase', letterSpacing:'.5px', margin:0 }}>{h}</p>
              ))}
            </div>
            {visible.map((p,i) => (
              <div key={p.id} style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr',
                padding:'12px 20px', borderBottom:`1px solid ${C.gray[100]}`,
                background:i%2===0?'white':C.gray[50], gap:12, alignItems:'center' }}>
                <p style={{ margin:0, fontSize:13, fontWeight:700, color:C.navy }}>{p.course_title||'—'}</p>
                <p style={{ margin:0, fontSize:14, fontWeight:900, color:C.green }}>{fmt.money(p.amount)}</p>
                <Badge label={p.status||'unknown'}/>
                <p style={{ margin:0, fontSize:11, color:C.gray[500], fontFamily:'monospace' }}>{p.reference||'—'}</p>
                <p style={{ margin:0, fontSize:11, color:C.gray[400] }}>{fmt.date(p.created_at)}</p>
              </div>
            ))}
            {pages>1 && (
              <div style={{ padding:'12px 20px', display:'flex', alignItems:'center',
                justifyContent:'space-between', borderTop:`1px solid ${C.gray[100]}` }}>
                <p style={{ fontSize:13, color:C.gray[400], margin:0 }}>Page {page}/{pages} · {filtered.length} records</p>
                <div style={{ display:'flex', gap:6 }}>
                  <Btn variant="ghost" size="sm" disabled={page===1} onClick={()=>setPage(p=>p-1)}><ChevronLeft size={14}/></Btn>
                  <Btn variant="ghost" size="sm" disabled={page===pages} onClick={()=>setPage(p=>p+1)}><ChevronRight size={14}/></Btn>
                </div>
              </div>
            )}
          </>
        )}
      </Card>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: ANALYTICS
// ══════════════════════════════════════════════════════════════════════════════
function AnalyticsSection() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const [
        { data:enr },
        { data:pay },
        { data:courses },
        { data:summary },
      ] = await Promise.all([
        supabase.from('enrollments').select('course_id, progress, status, enrolled_at'),
        supabase.from('payments').select('amount, status, created_at, course_title'),
        supabase.from('courses').select('id, title, category'),
        supabase.from('student_dashboard_summary').select('*'),
      ])

      // Enrollments by course
      const cMap = {}
      ;(courses||[]).forEach(c => { cMap[c.id] = c.title })
      const enrByCourse = {}
      ;(enr||[]).forEach(e => {
        const t = cMap[e.course_id] || 'Unknown'
        enrByCourse[t] = (enrByCourse[t]||0)+1
      })

      // Revenue by course
      const revByCourse = {}
      ;(pay||[]).filter(p=>['success','paid'].includes((p.status||'').toLowerCase())).forEach(p => {
        const t = p.course_title||'Unknown'
        revByCourse[t] = (revByCourse[t]||0)+Number(p.amount||0)
      })

      // Completion rate
      const totalEnr = (enr||[]).length
      const totalDone= (enr||[]).filter(e=>Number(e.progress||0)>=100).length
      const compRate = totalEnr ? Math.round((totalDone/totalEnr)*100) : 0

      // Average progress
      const avgProg = totalEnr ? Math.round((enr||[]).reduce((s,e)=>s+Number(e.progress||0),0)/totalEnr) : 0

      // Total revenue
      const totalRev = (pay||[]).filter(p=>['success','paid'].includes((p.status||'').toLowerCase())).reduce((s,p)=>s+Number(p.amount||0),0)

      setData({ enrByCourse, revByCourse, compRate, avgProg, totalRev,
        totalEnr, totalDone, summaryCount:(summary||[]).length })
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return (
    <div style={{ padding:64, textAlign:'center' }}>
      <Loader size={28} style={{ color:C.navy, animation:'spin 1s linear infinite' }}/>
    </div>
  )
  if (!data) return null

  const courseColors = [C.navy, C.orange, C.green, '#7C3AED', '#D97706', '#0891B2']

  const enrEntries = Object.entries(data.enrByCourse).sort((a,b)=>b[1]-a[1])
  const revEntries = Object.entries(data.revByCourse).sort((a,b)=>b[1]-a[1])
  const enrMax = Math.max(...enrEntries.map(x=>x[1]),1)
  const revMax = Math.max(...revEntries.map(x=>x[1]),1)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>Analytics & Reports</h2>

      {/* Aggregate KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:14 }}>
        {[
          { label:'Total Revenue',       val:fmt.money(data.totalRev), color:C.green,  icon:'💰' },
          { label:'Total Enrollments',   val:fmt.num(data.totalEnr),   color:C.navy,   icon:'📚' },
          { label:'Completions',         val:fmt.num(data.totalDone),  color:C.orange, icon:'🏆' },
          { label:'Completion Rate',     val:`${data.compRate}%`,      color:C.navyM,  icon:'📈' },
          { label:'Avg Progress',        val:`${data.avgProg}%`,       color:C.orange, icon:'⚡' },
        ].map((s,i) => (
          <Card key={i} style={{ textAlign:'center' }}>
            <p style={{ fontSize:28, margin:'0 0 6px' }}>{s.icon}</p>
            <p style={{ fontSize:24, fontWeight:900, color:s.color, margin:'0 0 4px' }}>{s.val}</p>
            <p style={{ fontSize:12, color:C.gray[400], margin:0 }}>{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Enrollments by course */}
      <Card>
        <h3 style={{ fontWeight:800, fontSize:15, color:C.navy, marginBottom:20 }}>📊 Enrollments by Course</h3>
        {enrEntries.length === 0 ? (
          <p style={{ color:C.gray[400], fontSize:13 }}>No enrollment data yet.</p>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {enrEntries.map(([title, count], i) => (
              <div key={title} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <p style={{ width:160, fontSize:13, fontWeight:600, color:C.gray[700], margin:0,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{title}</p>
                <div style={{ flex:1, height:24, borderRadius:8, background:C.gray[100],
                  overflow:'hidden', position:'relative' }}>
                  <div style={{ height:'100%', width:`${(count/enrMax)*100}%`,
                    background:courseColors[i%courseColors.length], borderRadius:8,
                    transition:'width .6s ease', display:'flex', alignItems:'center',
                    justifyContent:'flex-end', paddingRight:8 }}>
                    {(count/enrMax)>0.2 && <span style={{ color:'white', fontSize:11, fontWeight:700 }}>{count}</span>}
                  </div>
                </div>
                <p style={{ width:30, fontSize:13, fontWeight:700,
                  color:courseColors[i%courseColors.length], margin:0, textAlign:'right' }}>{count}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Revenue by course */}
      <Card>
        <h3 style={{ fontWeight:800, fontSize:15, color:C.navy, marginBottom:20 }}>💰 Revenue by Course</h3>
        {revEntries.length === 0 ? (
          <p style={{ color:C.gray[400], fontSize:13 }}>No revenue data yet.</p>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {revEntries.map(([title, amt], i) => (
              <div key={title} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <p style={{ width:160, fontSize:13, fontWeight:600, color:C.gray[700], margin:0,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{title}</p>
                <div style={{ flex:1, height:24, borderRadius:8, background:C.gray[100], overflow:'hidden' }}>
                  <div style={{ height:'100%', width:`${(amt/revMax)*100}%`,
                    background:`linear-gradient(90deg,${C.navy},${C.orange})`, borderRadius:8,
                    transition:'width .6s ease' }}/>
                </div>
                <p style={{ width:60, fontSize:13, fontWeight:700, color:C.green, margin:0, textAlign:'right' }}>
                  {fmt.money(amt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Donut: enrollment by status */}
      <Card>
        <h3 style={{ fontWeight:800, fontSize:15, color:C.navy, marginBottom:16 }}>🍩 Enrollment Status Distribution</h3>
        <div style={{ display:'flex', alignItems:'center', gap:32, flexWrap:'wrap' }}>
          <DonutChart segments={[
            { value:data.totalDone,               color:C.green  },
            { value:data.totalEnr-data.totalDone, color:C.orange },
          ]} size={140}/>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              { label:'Completed', val:data.totalDone,               color:C.green  },
              { label:'In Progress', val:data.totalEnr-data.totalDone, color:C.orange },
            ].map((s,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:12, height:12, borderRadius:4, background:s.color, flexShrink:0 }}/>
                <span style={{ fontSize:13, color:C.gray[600] }}>{s.label}</span>
                <span style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SECTION: SETTINGS
// ══════════════════════════════════════════════════════════════════════════════
function SettingsSection({ adminUser, onMsg }) {
  const [form, setForm]   = useState({ defaultPrice:7, defaultDuration:4, siteName:'iKPACE' })
  const [saved, setSaved] = useState(false)

  const save = () => {
    setSaved(true)
    onMsg('✅ Settings saved!','success')
    setTimeout(()=>setSaved(false),2000)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
      <h2 style={{ fontWeight:900, fontSize:20, color:C.navy, margin:0 }}>Settings</h2>

      {/* Admin info */}
      <Card>
        <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, marginBottom:14 }}>🔐 Admin Account</h3>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:12 }}>
          {[
            { label:'Admin Email', val:adminUser?.email||'—' },
            { label:'Role',        val:'Admin' },
            { label:'User ID',     val:adminUser?.id?.slice(0,16)+'…'||'—', mono:true },
          ].map(({ label, val, mono }, i) => (
            <div key={i} style={{ background:C.gray[50], borderRadius:10, padding:'11px 14px' }}>
              <p style={{ fontSize:11, color:C.gray[400], margin:'0 0 3px', textTransform:'uppercase', letterSpacing:'.4px' }}>{label}</p>
              <p style={{ fontSize:13, fontWeight:700, color:C.gray[900], margin:0, fontFamily:mono?'monospace':'inherit' }}>{val}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Site settings */}
      <Card>
        <h3 style={{ fontWeight:800, fontSize:14, color:C.navy, marginBottom:14 }}>⚙️ Site Configuration</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:12, maxWidth:480 }}>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Site Name</label>
            <Input value={form.siteName} onChange={v=>setForm(p=>({...p,siteName:v}))} placeholder="Site name"/>
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Default Course Price ($)</label>
            <Input value={form.defaultPrice} type="number" onChange={v=>setForm(p=>({...p,defaultPrice:v}))}/>
          </div>
          <div>
            <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:5 }}>Default Duration (weeks)</label>
            <Input value={form.defaultDuration} type="number" onChange={v=>setForm(p=>({...p,defaultDuration:v}))}/>
          </div>
          <Btn onClick={save}><Save size={14}/> {saved?'Saved!':'Save Settings'}</Btn>
        </div>
      </Card>

      {/* Security info */}
      <Card style={{ border:`1px solid ${C.yellow}30`, background:C.yellowL }}>
        <h3 style={{ fontWeight:800, fontSize:14, color:C.yellow, marginBottom:8 }}>⚠️ Security Reminders</h3>
        <ul style={{ margin:0, paddingLeft:18, fontSize:13, color:C.gray[700], lineHeight:1.8 }}>
          <li>Never expose your <code>service_role</code> key on the frontend</li>
          <li>All admin routes should check <code>is_admin</code> flag on the profile</li>
          <li>Enable 2FA on your Supabase account</li>
          <li>Payments should be processed server-side via Paystack webhook</li>
          <li>RLS must be enabled on all tables — already set up in your SQL</li>
        </ul>
      </Card>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ADMIN LOGIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
function AdminLogin({ onLogin }) {
  const [email,   setEmail]   = useState('')
  const [pass,    setPass]    = useState('')
  const [show,    setShow]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [err,     setErr]     = useState('')

  const login = async () => {
    if (!email||!pass) { setErr('Please enter email and password.'); return }
    setLoading(true); setErr('')
    const { data, error } = await supabase.auth.signInWithPassword({ email, password:pass })
    if (error) { setErr(error.message); setLoading(false); return }

    // Check admin flag
    const { data:prof } = await supabase.from('profiles').select('is_admin').eq('id',data.user.id).single()
    if (!prof?.is_admin) {
      await supabase.auth.signOut()
      setErr('Access denied. You do not have admin privileges.')
      setLoading(false); return
    }
    onLogin(data.user)
    setLoading(false)
  }

  return (
    <div style={{ minHeight:'100vh', background:`linear-gradient(135deg,${C.navyD} 0%,${C.navy} 50%,${C.navyM} 100%)`,
      display:'flex', alignItems:'center', justifyContent:'center', padding:20,
      fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ width:'100%', maxWidth:400, background:'white', borderRadius:24,
        boxShadow:'0 32px 80px rgba(0,0,0,0.3)', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'32px 32px 24px', background:`linear-gradient(135deg,${C.navyD},${C.orange})`,
          textAlign:'center' }}>
          <div style={{ width:56, height:56, borderRadius:16, background:'rgba(255,255,255,0.2)',
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'white', fontWeight:900, fontSize:22, margin:'0 auto 14px' }}>iK</div>
          <h1 style={{ color:'white', fontWeight:900, fontSize:22, margin:'0 0 4px' }}>Admin Dashboard</h1>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:13, margin:0 }}>iKPACE · Restricted Access</p>
        </div>

        {/* Form */}
        <div style={{ padding:28 }}>
          {err && (
            <div style={{ padding:'10px 14px', borderRadius:10, background:C.redL,
              border:`1px solid ${C.red}25`, marginBottom:16, display:'flex', alignItems:'center', gap:8 }}>
              <AlertCircle size={15} style={{ color:C.red, flexShrink:0 }}/>
              <p style={{ fontSize:13, color:C.red, margin:0 }}>{err}</p>
            </div>
          )}
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:6 }}>Admin Email</label>
              <Input value={email} onChange={setEmail} type="email" placeholder="admin@ikpace.com"/>
            </div>
            <div>
              <label style={{ fontSize:12, fontWeight:700, color:C.gray[600], display:'block', marginBottom:6 }}>Password</label>
              <div style={{ position:'relative' }}>
                <Input value={pass} onChange={setPass} type={show?'text':'password'} placeholder="••••••••"/>
                <button onClick={()=>setShow(s=>!s)} style={{ position:'absolute', right:12, top:10,
                  background:'none', border:'none', cursor:'pointer', color:C.gray[400] }}>
                  {show?<EyeOff size={16}/>:<Eye size={16}/>}
                </button>
              </div>
            </div>
            <button onClick={login} disabled={loading} onKeyDown={e=>e.key==='Enter'&&login()}
              style={{ padding:'13px', borderRadius:12, background:`linear-gradient(135deg,${C.navy},${C.orange})`,
                color:'white', fontWeight:800, fontSize:15, border:'none', cursor:loading?'wait':'pointer',
                opacity:loading?0.8:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
                marginTop:4 }}>
              {loading ? <><Loader size={16} style={{ animation:'spin 1s linear infinite' }}/> Signing in…</> : 'Sign In →'}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
export default function AdminDashboard() {
  const navigate   = useNavigate()
  const [adminUser, setAdminUser]  = useState(null)
  const [authCheck, setAuthCheck]  = useState(true)
  const [section,   setSection]    = useState('overview')
  const [sideOpen,  setSideOpen]   = useState(true)
  const [toast,     setToast]      = useState(null)
  const [nowStr,    setNowStr]     = useState('')

  // Stats for overview
  const [stats,         setStats]         = useState({ totalUsers:0, totalEnrollments:0, totalCompleted:0, totalRevenue:0 })
  const [recentUsers,   setRecentUsers]   = useState([])
  const [recentPays,    setRecentPays]    = useState([])
  const [enrTrend,      setEnrTrend]      = useState([3,5,2,8,6,4,7])
  const [revTrend,      setRevTrend]      = useState([21,35,14,56,42,28,49])

  // Live clock
  useEffect(() => {
    const tick = () => setNowStr(new Date().toLocaleString('en-GB',{
      weekday:'short', day:'numeric', month:'short',
      hour:'2-digit', minute:'2-digit'
    }))
    tick()
    const iv = setInterval(tick, 60000)
    return () => clearInterval(iv)
  }, [])

  // Check existing session
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data:{ session }}) => {
      if (session?.user) {
        const { data:prof } = await supabase.from('profiles').select('is_admin').eq('id',session.user.id).single()
        if (prof?.is_admin) { setAdminUser(session.user); loadOverviewStats() }
      }
      setAuthCheck(false)
    })
  }, [])

  const loadOverviewStats = async () => {
    const [
      { count:uCount },
      { count:eCount },
      { data:completed },
      { data:revenue },
      { data:ru },
      { data:rp },
    ] = await Promise.all([
      supabase.from('profiles').select('*',{count:'exact',head:true}),
      supabase.from('enrollments').select('*',{count:'exact',head:true}),
      supabase.from('enrollments').select('id').gte('progress',100),
      supabase.from('payments').select('amount').in('status',['success','paid']),
      supabase.from('profiles').select('id,full_name,updated_at').order('updated_at',{ascending:false}).limit(5),
      supabase.from('payments').select('*').order('created_at',{ascending:false}).limit(5),
    ])
    const totalRev = (revenue||[]).reduce((s,p)=>s+Number(p.amount||0),0)
    setStats({ totalUsers:uCount||0, totalEnrollments:eCount||0,
      totalCompleted:(completed||[]).length, totalRevenue:totalRev })
    setRecentUsers(ru||[])
    setRecentPays(rp||[])

    // Build real trend data (last 7 days enrollments)
    const now = new Date()
    const trend = []
    for (let d=6;d>=0;d--) {
      const start = new Date(now); start.setDate(now.getDate()-d); start.setHours(0,0,0,0)
      const end   = new Date(start); end.setHours(23,59,59,999)
      const { count } = await supabase.from('enrollments')
        .select('*',{count:'exact',head:true})
        .gte('enrolled_at',start.toISOString())
        .lte('enrolled_at',end.toISOString())
      trend.push(count||0)
    }
    setEnrTrend(trend)
  }

  const showToast = (msg, type='success') => {
    setToast({ msg, type })
    setTimeout(()=>setToast(null), 3500)
  }

  const handleLogin = (user) => {
    setAdminUser(user)
    loadOverviewStats()
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setAdminUser(null)
  }

  if (authCheck) return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:C.gray[50], fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <Loader size={28} style={{ color:C.navy, animation:'spin 1s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )

  if (!adminUser) return <AdminLogin onLogin={handleLogin}/>

  // Nav items
  const navItems = [
    { id:'overview',    label:'Overview',      icon:LayoutDashboard },
    { id:'users',       label:'Users',         icon:Users           },
    { id:'courses',     label:'Courses',       icon:BookOpen        },
    { id:'enrollments', label:'Enrollments',   icon:ClipboardList   },
    { id:'payments',    label:'Payments',      icon:CreditCard      },
    { id:'analytics',   label:'Analytics',     icon:BarChart3       },
    { id:'settings',    label:'Settings',      icon:Settings        },
  ]

  return (
    <div style={{ minHeight:'100vh', background:C.gray[50],
      fontFamily:"'DM Sans','Segoe UI',sans-serif", display:'flex' }}>

      {/* ══ SIDEBAR ══════════════════════════════════════════════════════════ */}
      <aside style={{
        width: sideOpen ? 220 : 64, flexShrink:0, background:C.navyD,
        display:'flex', flexDirection:'column', transition:'width .25s ease',
        position:'sticky', top:0, height:'100vh', overflow:'hidden', zIndex:20
      }}>
        {/* Logo */}
        <div style={{ padding:'18px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)',
          display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, flexShrink:0,
            background:`linear-gradient(135deg,${C.navy},${C.orange})`,
            display:'flex', alignItems:'center', justifyContent:'center',
            color:'white', fontWeight:900, fontSize:15 }}>iK</div>
          {sideOpen && (
            <div>
              <p style={{ color:'white', fontWeight:900, fontSize:14, margin:0 }}>iKPACE</p>
              <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10, margin:0 }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto' }}>
          {navItems.map(n => (
            <button key={n.id} onClick={()=>setSection(n.id)} style={{
              width:'100%', display:'flex', alignItems:'center', gap:10,
              padding:'10px 10px', borderRadius:10, border:'none', cursor:'pointer',
              marginBottom:2, transition:'all .15s', textAlign:'left',
              background: section===n.id ? `${C.orange}20` : 'transparent',
              borderLeft: section===n.id ? `3px solid ${C.orange}` : '3px solid transparent',
            }}>
              <n.icon size={18} style={{ color:section===n.id?C.orange:'rgba(255,255,255,0.5)', flexShrink:0 }}/>
              {sideOpen && (
                <span style={{ fontSize:13, fontWeight:700, color:section===n.id?'white':'rgba(255,255,255,0.55)',
                  whiteSpace:'nowrap', overflow:'hidden' }}>{n.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Admin user */}
        {sideOpen && (
          <div style={{ padding:'12px 14px', borderTop:'1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              <div style={{ width:30, height:30, borderRadius:8, flexShrink:0,
                background:`linear-gradient(135deg,${C.orange},${C.orangeL})`,
                display:'flex', alignItems:'center', justifyContent:'center',
                color:'white', fontWeight:800, fontSize:11 }}>
                {fmt.initials(adminUser.email)}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ color:'white', fontSize:11, fontWeight:700, margin:0,
                  overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                  {adminUser.email}
                </p>
                <p style={{ color:'rgba(255,255,255,0.4)', fontSize:10, margin:0 }}>Administrator</p>
              </div>
            </div>
            <button onClick={handleSignOut} style={{
              marginTop:10, width:'100%', padding:'7px', borderRadius:8,
              background:'rgba(220,38,38,0.15)', color:'#fca5a5',
              border:'1px solid rgba(220,38,38,0.3)', fontSize:12,
              fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center',
              justifyContent:'center', gap:6 }}>
              <LogOut size={13}/> Sign Out
            </button>
          </div>
        )}
      </aside>

      {/* ══ MAIN AREA ════════════════════════════════════════════════════════ */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>

        {/* Top header */}
        <header style={{ background:'white', borderBottom:`1px solid ${C.gray[200]}`,
          padding:'0 24px', height:58, display:'flex', alignItems:'center',
          justifyContent:'space-between', gap:12, position:'sticky', top:0, zIndex:10,
          boxShadow:'0 1px 6px rgba(0,0,0,0.04)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button onClick={()=>setSideOpen(s=>!s)} style={{ background:'none', border:'none',
              cursor:'pointer', padding:6, borderRadius:8,
              display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Menu size={20} style={{ color:C.gray[600] }}/>
            </button>
            <div>
              <h1 style={{ fontWeight:900, fontSize:16, color:C.navy, margin:0 }}>
                {navItems.find(n=>n.id===section)?.label || 'Dashboard'}
              </h1>
              <p style={{ fontSize:11, color:C.gray[400], margin:0 }}>{nowStr}</p>
            </div>
          </div>

          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ padding:'7px 14px', borderRadius:10,
              background:C.navyL, display:'flex', alignItems:'center', gap:6 }}>
              <Activity size={13} style={{ color:C.navy }}/>
              <span style={{ fontSize:12, fontWeight:700, color:C.navy }}>Live</span>
              <div style={{ width:6, height:6, borderRadius:'50%',
                background:C.green, animation:'pulse 1.5s ease infinite' }}/>
            </div>
            <div style={{ width:34, height:34, borderRadius:10,
              background:`linear-gradient(135deg,${C.navy},${C.orange})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              color:'white', fontWeight:800, fontSize:12 }}>
              {fmt.initials(adminUser.email)}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, padding:'24px', overflowY:'auto' }}>
          {section === 'overview'    && <OverviewSection stats={stats} recentUsers={recentUsers}
            recentPayments={recentPays} enrollmentTrend={enrTrend} revenueTrend={revTrend}/>}
          {section === 'users'       && <UsersSection onMsg={showToast}/>}
          {section === 'courses'     && <CoursesSection onMsg={showToast}/>}
          {section === 'enrollments' && <EnrollmentsSection onMsg={showToast}/>}
          {section === 'payments'    && <PaymentsSection onMsg={showToast}/>}
          {section === 'analytics'   && <AnalyticsSection/>}
          {section === 'settings'    && <SettingsSection adminUser={adminUser} onMsg={showToast}/>}
        </main>
      </div>

      {/* ══ TOAST ════════════════════════════════════════════════════════════ */}
      {toast && (
        <div style={{ position:'fixed', bottom:24, right:24, zIndex:200,
          background:'white', border:`1px solid ${C.gray[200]}`, borderRadius:14,
          padding:'13px 18px', boxShadow:'0 8px 32px rgba(0,0,0,0.15)',
          display:'flex', alignItems:'center', gap:10, animation:'slideUp .3s ease',
          maxWidth:340 }}>
          <span style={{ fontSize:18 }}>{toast.type==='success'?'✅':'❌'}</span>
          <p style={{ fontSize:14, fontWeight:700, color:C.gray[900], margin:0 }}>{toast.msg}</p>
          <button onClick={()=>setToast(null)} style={{ background:'none', border:'none',
            cursor:'pointer', color:C.gray[400], marginLeft:4 }}>
            <X size={14}/>
          </button>
        </div>
      )}

      {/* ══ GLOBAL STYLES ════════════════════════════════════════════════════ */}
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[200]}; border-radius: 4px; }
        @keyframes spin     { to   { transform: rotate(360deg); } }
        @keyframes pulse    { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes slideUp  { from { transform:translateY(12px);opacity:0 } to { transform:translateY(0);opacity:1 } }
      `}</style>
    </div>
  )
}
