// src/pages/CourseLessonManager.jsx
import { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";
import {
  BookOpen, Bell, FileText, Users, Award, Calendar,
  HelpCircle, Link as LinkIcon, Grid, Plus, Trash2, Edit3,
  Check, X, ChevronDown, ChevronUp, Image, Video, Upload,
  AlertCircle, CheckCircle, Menu, Layers, Settings,
  Eye, Save, RefreshCw, Search, Filter, MoreVertical,
  GraduationCap, ArrowLeft, ExternalLink, Download,
  Clock, Flag, Zap, Sparkles, Hash, Star
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
    600:'#475569', 700:'#334155', 800:'#1E293B', 900:'#0F172A'
  }
}

// ─── Reusable styled components ───────────────────────────────────────────────
const Input = ({ label, onFocus, onBlur, style: extraStyle, ...props }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      {label && <label className="block text-xs font-bold mb-1" style={{ color:C.gray[600] }}>{label}</label>}
      <input {...props}
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{ background:C.gray[50], border:`1.5px solid ${focused?C.navy:C.gray[200]}`, color:C.gray[800], ...extraStyle }}
        onFocus={e => { setFocused(true); onFocus?.(e) }}
        onBlur={e => { setFocused(false); onBlur?.(e) }}
      />
    </div>
  )
}

const Textarea = ({ label, rows=3, onFocus, onBlur, style: extraStyle, ...props }) => {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      {label && <label className="block text-xs font-bold mb-1" style={{ color:C.gray[600] }}>{label}</label>}
      <textarea rows={rows} {...props}
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
        style={{ background:C.gray[50], border:`1.5px solid ${focused?C.navy:C.gray[200]}`, color:C.gray[800], ...extraStyle }}
        onFocus={e => { setFocused(true); onFocus?.(e) }}
        onBlur={e => { setFocused(false); onBlur?.(e) }}
      />
    </div>
  )
}

const Select = ({ label, children, ...props }) => (
  <div>
    {label && <label className="block text-xs font-bold mb-1" style={{ color:C.gray[600] }}>{label}</label>}
    <select {...props}
      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none appearance-none cursor-pointer"
      style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}>
      {children}
    </select>
  </div>
)

const Btn = ({ variant='primary', children, className='', ...props }) => {
  const styles = {
    primary:  { background:`linear-gradient(135deg,${C.navy},${C.navyMid})`, color:'#fff' },
    orange:   { background:`linear-gradient(135deg,${C.orange},${C.orangeL})`, color:'#fff' },
    green:    { background:`linear-gradient(135deg,${C.green},${C.teal})`, color:'#fff' },
    danger:   { background:`linear-gradient(135deg,${C.rose},#F87171)`, color:'#fff' },
    ghost:    { background:C.gray[100], color:C.gray[600] },
    outline:  { background:'transparent', color:C.navy, border:`1.5px solid ${C.navy}` },
  }
  return (
    <button {...props}
      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-90 hover:-translate-y-0.5 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      style={styles[variant]}>
      {children}
    </button>
  )
}

// ─── Image/Video picker sub-component ────────────────────────────────────────
function MediaPicker({ videoUrl, setVideoUrl, imageUrl, setImageUrl, mediaType, setMediaType }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [uploadMsg, setUploadMsg] = useState('')
  const [uploadPct, setUploadPct] = useState(0)

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadMsg('❌ Please select an image file (PNG, JPG, GIF, WEBP)')
      return
    }
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadMsg('❌ Image must be under 5MB')
      return
    }
    setUploading(true); setUploadMsg('Uploading…'); setUploadPct(0)
    try {
      const ext   = file.name.split('.').pop().toLowerCase()
      const fname = `lesson-images/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      // Try upload — bucket must exist in Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('course-media')
        .upload(fname, file, { upsert: true, contentType: file.type })

      if (uploadError) {
        // Provide helpful error message
        if (uploadError.message?.includes('Bucket not found') || uploadError.statusCode === 404) {
          setUploadMsg('❌ Storage bucket "course-media" not found. Please create it in your Supabase dashboard → Storage → New Bucket → name it "course-media" and set it to Public.')
        } else if (uploadError.message?.includes('policy') || uploadError.statusCode === 403) {
          setUploadMsg('❌ Permission denied. Make sure the "course-media" bucket has public upload policies enabled in Supabase → Storage → Policies.')
        } else {
          setUploadMsg('❌ Upload failed: ' + uploadError.message)
        }
        setUploading(false)
        return
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('course-media')
        .getPublicUrl(fname)

      setImageUrl(publicUrl)
      setUploadMsg('✓ Image uploaded successfully!')
      setUploadPct(100)
    } catch (err) {
      console.error('Image upload error:', err)
      setUploadMsg('❌ Unexpected error: ' + (err.message || 'Please try again'))
    } finally {
      setUploading(false)
      // Reset file input so same file can be re-uploaded if needed
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor:C.gray[200] }}>
      {/* Type toggle */}
      <div className="flex border-b" style={{ borderColor:C.gray[200] }}>
        {[
          { id:'video', icon:Video,  label:'Video URL' },
          { id:'image', icon:Image,  label:'Image Upload' },
          { id:'both',  icon:Layers, label:'Both' },
        ].map(t => (
          <button key={t.id} onClick={() => setMediaType(t.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold transition-all"
            style={{ background: mediaType===t.id ? C.navy : 'white', color: mediaType===t.id ? '#fff' : C.gray[500] }}>
            <t.icon size={13}/>{t.label}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-3 bg-white">
        {/* Video input */}
        {(mediaType === 'video' || mediaType === 'both') && (
          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color:C.gray[600] }}>
              Video URL (YouTube embed or direct)
            </label>
            <div className="flex gap-2">
              <input value={videoUrl} onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://www.youtube.com/embed/..."
                className="flex-1 px-3 py-2.5 rounded-xl text-xs outline-none"
                style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}/>
              {videoUrl && (
                <button onClick={() => setVideoUrl('')} className="p-2 rounded-xl" style={{ background:C.gray[100] }}>
                  <X size={14} style={{ color:C.gray[500] }}/>
                </button>
              )}
            </div>
            {videoUrl && (
              <div className="mt-2 rounded-xl overflow-hidden" style={{ aspectRatio:'16/9', background:C.gray[100] }}>
                <iframe src={videoUrl} className="w-full h-full" frameBorder="0" allowFullScreen title="preview"/>
              </div>
            )}
          </div>
        )}

        {/* Image upload */}
        {(mediaType === 'image' || mediaType === 'both') && (
          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color:C.gray[600] }}>
              Lesson Image — Upload from computer or paste URL
            </label>

            {/* Upload setup tip */}
            <div className="mb-2 p-2.5 rounded-xl text-[10px]" style={{ background:`${C.navy}08`, color:C.gray[500] }}>
              💡 <strong>Supabase setup required:</strong> Go to Supabase dashboard → Storage → create a bucket named <code className="font-mono bg-gray-100 px-1 rounded">course-media</code> and set it to <strong>Public</strong>.
            </div>

            {/* Upload area */}
            <div
              onClick={() => !uploading && fileRef.current?.click()}
              className="rounded-xl border-2 border-dashed p-5 text-center cursor-pointer transition-all mb-2"
              style={{ borderColor: uploading ? C.orange : C.navyMid, background: uploading ? `${C.orange}08` : 'white' }}>
              {uploading ? (
                <>
                  <RefreshCw size={22} className="mx-auto mb-2 animate-spin" style={{ color:C.orange }}/>
                  <p className="text-xs font-bold" style={{ color:C.orange }}>Uploading image…</p>
                  <div className="mt-2 h-1.5 rounded-full overflow-hidden" style={{ background:C.gray[200] }}>
                    <div className="h-full rounded-full transition-all" style={{ width:`${uploadPct}%`, background:`linear-gradient(90deg,${C.orange},${C.orangeL})` }}/>
                  </div>
                </>
              ) : (
                <>
                  <Upload size={22} className="mx-auto mb-2" style={{ color:C.navyMid }}/>
                  <p className="text-xs font-semibold" style={{ color:C.navyMid }}>Click to upload image</p>
                  <p className="text-[10px] mt-0.5" style={{ color:C.gray[400] }}>PNG, JPG, GIF, WEBP · max 5MB</p>
                </>
              )}
              <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/gif,image/webp" className="hidden" onChange={handleImageUpload} disabled={uploading}/>
            </div>

            {/* Upload status message */}
            {uploadMsg && (
              <div className="mb-2 p-2.5 rounded-xl text-xs font-semibold leading-relaxed"
                style={{ background: uploadMsg.startsWith('✓') ? `${C.green}10` : `${C.rose}10`,
                         color: uploadMsg.startsWith('✓') ? C.green : C.rose,
                         border: `1px solid ${uploadMsg.startsWith('✓') ? C.green+'30' : C.rose+'30'}` }}>
                {uploadMsg}
              </div>
            )}

            {/* Or paste URL */}
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px flex-1" style={{ background:C.gray[200] }}/>
              <span className="text-[10px] font-semibold" style={{ color:C.gray[400] }}>OR PASTE URL</span>
              <div className="h-px flex-1" style={{ background:C.gray[200] }}/>
            </div>
            <div className="flex gap-2">
              <input value={imageUrl} onChange={e => { setImageUrl(e.target.value); setUploadMsg('') }}
                placeholder="https://example.com/image.jpg"
                className="flex-1 px-3 py-2 rounded-xl text-xs outline-none"
                style={{ background:C.gray[50], border:`1.5px solid ${C.gray[200]}`, color:C.gray[800] }}/>
              {imageUrl && (
                <button onClick={() => { setImageUrl(''); setUploadMsg('') }} className="p-2 rounded-xl" style={{ background:C.gray[100] }}>
                  <X size={13} style={{ color:C.gray[500] }}/>
                </button>
              )}
            </div>

            {/* Image preview */}
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border" style={{ borderColor:C.gray[200] }}>
                <img src={imageUrl} alt="lesson preview" className="w-full object-cover max-h-48"
                  onError={e => { e.target.style.display='none'; setUploadMsg('❌ Could not load image. Check the URL is a valid, publicly accessible image.') }}
                  onLoad={() => uploadMsg.includes('load') && setUploadMsg('')}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Edit modal ───────────────────────────────────────────────────────────────
function EditModal({ title, onClose, onSave, saving, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto z-10">
        <div className="sticky top-0 bg-white border-b px-5 py-4 flex items-center justify-between rounded-t-3xl z-10"
          style={{ borderColor:C.gray[200] }}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}15` }}>
              <Edit3 size={15} style={{ color:C.navy }}/>
            </div>
            <p className="font-black text-sm" style={{ color:C.navy }}>{title}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-gray-100">
            <X size={16} style={{ color:C.gray[500] }}/>
          </button>
        </div>
        <div className="p-5">{children}</div>
        <div className="sticky bottom-0 bg-white border-t px-5 py-4 flex gap-3 rounded-b-3xl"
          style={{ borderColor:C.gray[100] }}>
          <Btn variant="ghost" onClick={onClose} className="flex-1">Cancel</Btn>
          <Btn variant="primary" onClick={onSave} disabled={saving} className="flex-1">
            {saving ? <><RefreshCw size={13} className="animate-spin"/>Saving…</> : <><Save size={13}/>Save Changes</>}
          </Btn>
        </div>
      </div>
    </div>
  )
}

// ─── Toast notification ───────────────────────────────────────────────────────
function Toast({ msg, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3500); return () => clearTimeout(t) }, [onClose])
  if (!msg.text) return null
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-white text-sm font-bold transition-all"
      style={{ background: msg.type==='success' ? `linear-gradient(135deg,${C.green},${C.teal})` : `linear-gradient(135deg,${C.rose},#F87171)` }}>
      {msg.type==='success' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
      {msg.text}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function CourseLessonManager() {
  const [courses,          setCourses]          = useState([])
  const [selectedCourseId, setSelectedCourseId] = useState('')
  const [selectedCourse,   setSelectedCourse]   = useState(null)
  const [activeTab,        setActiveTab]        = useState('lessons')
  const [loading,          setLoading]          = useState(false)
  const [saving,           setSaving]           = useState(false)
  const [msg,              setMsg]              = useState({ type:'', text:'' })
  const [mobileMenuOpen,   setMobileMenuOpen]   = useState(false)
  const [editItem,         setEditItem]         = useState(null)   // { section, data }
  const [editForm,         setEditForm]         = useState({})
  const [searchQ,          setSearchQ]          = useState('')

  // ── Data ──────────────────────────────────────────────────────────────────
  const [lessons,        setLessons]        = useState([])
  const [announcements,  setAnnouncements]  = useState([])
  const [syllabus,       setSyllabus]       = useState([])
  const [modules,        setModules]        = useState([])
  const [grades,         setGrades]         = useState([])
  const [people,         setPeople]         = useState([])
  const [materials,      setMaterials]      = useState([])
  const [events,         setEvents]         = useState([])
  const [faqs,           setFaqs]           = useState([])
  const [courseResources,setCourseResources]= useState([])

  // ── Lesson form ───────────────────────────────────────────────────────────
  const [lTitle,     setLTitle]     = useState('')
  const [lContent,   setLContent]   = useState('')
  const [lAssign,    setLAssign]    = useState('')
  const [lVideo,     setLVideo]     = useState('')
  const [lImage,     setLImage]     = useState('')
  const [lMediaType, setLMediaType] = useState('video')
  const [lOrder,     setLOrder]     = useState('1')

  // ── Announcement form ─────────────────────────────────────────────────────
  const [aTitle, setATitle] = useState(''); const [aContent, setAContent] = useState(''); const [aPriority, setAPriority] = useState('normal')

  // ── Syllabus form ─────────────────────────────────────────────────────────
  const [sTitle, setSTitle] = useState(''); const [sDesc, setSDesc] = useState(''); const [sWeek, setSWeek] = useState('1'); const [sObjectives, setSObjectives] = useState('')

  // ── Module form ───────────────────────────────────────────────────────────
  const [mTitle, setMTitle] = useState(''); const [mDesc, setMDesc] = useState(''); const [mWeek, setMWeek] = useState('1'); const [mOrder, setMOrder] = useState('1')

  // ── Grade form ────────────────────────────────────────────────────────────
  const [gTitle, setGTitle] = useState(''); const [gType, setGType] = useState('assignment'); const [gMax, setGMax] = useState('100'); const [gWeight, setGWeight] = useState('1'); const [gDue, setGDue] = useState('')

  // ── People form ───────────────────────────────────────────────────────────
  const [pEmail, setPEmail] = useState(''); const [pRole, setPRole] = useState('student')

  // ── Material form ─────────────────────────────────────────────────────────
  const [matTitle, setMatTitle] = useState(''); const [matDesc, setMatDesc] = useState(''); const [matUrl, setMatUrl] = useState(''); const [matType, setMatType] = useState('pdf'); const [matSize, setMatSize] = useState(''); const [matReq, setMatReq] = useState(false)

  // ── Calendar form ─────────────────────────────────────────────────────────
  const [evTitle, setEvTitle] = useState(''); const [evDesc, setEvDesc] = useState(''); const [evType, setEvType] = useState('live_class'); const [evStart, setEvStart] = useState(''); const [evEnd, setEvEnd] = useState(''); const [evLoc, setEvLoc] = useState(''); const [evLink, setEvLink] = useState('')

  // ── FAQ form ──────────────────────────────────────────────────────────────
  const [fQuestion, setFQuestion] = useState(''); const [fAnswer, setFAnswer] = useState(''); const [fOrder, setFOrder] = useState('1')

  // ── Resource form ─────────────────────────────────────────────────────────
  const [rTitle, setRTitle] = useState(''); const [rDesc, setRDesc] = useState(''); const [rUrl, setRUrl] = useState(''); const [rType, setRType] = useState('link')

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => { fetchCourses() }, [])
  useEffect(() => {
    if (selectedCourseId) {
      fetchAll(selectedCourseId)
      fetchCourseDetails(selectedCourseId)
    }
  }, [selectedCourseId])

  const toast = (type, text) => setMsg({ type, text })
  const fetchAll = (id) => {
    fetchLessons(id); fetchAnnouncements(id); fetchSyllabus(id); fetchModules(id)
    fetchGrades(id); fetchPeople(id); fetchMaterials(id); fetchCalendarEvents(id)
    fetchFaqs(id); fetchCourseResources(id)
  }

  // ── Fetchers ──────────────────────────────────────────────────────────────
  const fetchCourses         = async () => { const { data } = await supabase.from('courses').select('id,title').order('title'); setCourses(data||[]) }
  const fetchCourseDetails   = async (id) => { const { data } = await supabase.from('courses').select('*').eq('id',id).single(); setSelectedCourse(data) }
  const fetchLessons         = async (id) => { const { data } = await supabase.from('lessons').select('*').eq('course_id',id).order('order_index'); setLessons(data||[]) }
  const fetchAnnouncements   = async (id) => { const { data } = await supabase.from('course_announcements').select('*').eq('course_id',id).order('created_at',{ascending:false}); setAnnouncements(data||[]) }
  const fetchSyllabus        = async (id) => { const { data } = await supabase.from('course_syllabus').select('*').eq('course_id',id).order('week_number'); setSyllabus(data||[]) }
  const fetchModules         = async (id) => { const { data } = await supabase.from('course_modules').select('*').eq('course_id',id).order('order_index'); setModules(data||[]) }
  const fetchGrades          = async (id) => { const { data } = await supabase.from('course_grades').select('*').eq('course_id',id); setGrades(data||[]) }
  const fetchPeople          = async (id) => { const { data } = await supabase.from('course_people').select('*').eq('course_id',id); setPeople(data||[]) }
  const fetchMaterials       = async (id) => { const { data } = await supabase.from('course_materials').select('*').eq('course_id',id); setMaterials(data||[]) }
  const fetchCalendarEvents  = async (id) => { const { data } = await supabase.from('course_calendar').select('*').eq('course_id',id); setEvents(data||[]) }
  const fetchFaqs            = async (id) => { const { data } = await supabase.from('course_faqs').select('*').eq('course_id',id).order('order_index'); setFaqs(data||[]) }
  const fetchCourseResources = async (id) => { const { data } = await supabase.from('course_resources').select('*').eq('course_id',id).order('order_index'); setCourseResources(data||[]) }

  // ── Delete helper ─────────────────────────────────────────────────────────
  const del = async (table, id, refetch, label='item') => {
    if (!window.confirm(`Delete this ${label}?`)) return
    setLoading(true)
    const { error } = await supabase.from(table).delete().eq('id', id)
    if (error) toast('error', '❌ ' + error.message)
    else { toast('success', `✅ ${label} deleted!`); refetch(selectedCourseId) }
    setLoading(false)
  }

  // ── Edit open ─────────────────────────────────────────────────────────────
  const openEdit = (section, data) => { setEditItem({ section, data }); setEditForm({ ...data }) }
  const closeEdit = () => { setEditItem(null); setEditForm({}) }

  // ── Save edit — strips read-only DB fields before update ─────────────────
  const saveEdit = async () => {
    if (!editItem) return
    setSaving(true)

    const { section, data } = editItem

    // Fields that should NEVER be sent to update() — Supabase will reject them
    const STRIP_FIELDS = ['id', 'created_at', 'updated_at', 'course_id', 'user_id']

    // Build a clean payload with only the editable fields
    const cleanPayload = Object.fromEntries(
      Object.entries(editForm).filter(([k]) => !STRIP_FIELDS.includes(k))
    )

    const tableMap = {
      lesson:       ['lessons',              fetchLessons],
      announcement: ['course_announcements', fetchAnnouncements],
      syllabus:     ['course_syllabus',      fetchSyllabus],
      module:       ['course_modules',       fetchModules],
      grade:        ['course_grades',        fetchGrades],
      material:     ['course_materials',     fetchMaterials],
      event:        ['course_calendar',      fetchCalendarEvents],
      faq:          ['course_faqs',          fetchFaqs],
      resource:     ['course_resources',     fetchCourseResources],
    }

    const [table, refetch] = tableMap[section] || []
    if (!table) { setSaving(false); return }

    console.log(`[saveEdit] table=${table} id=${data.id}`, cleanPayload)

    const { error } = await supabase
      .from(table)
      .update(cleanPayload)
      .eq('id', data.id)

    if (error) {
      console.error('[saveEdit] Supabase error:', error)
      toast('error', '❌ Save failed: ' + error.message)
    } else {
      toast('success', '✅ Updated successfully!')
      refetch(selectedCourseId)
      closeEdit()
    }
    setSaving(false)
  }

  // ── Add lesson ────────────────────────────────────────────────────────────
  const addLesson = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('lessons').insert([{
      course_id:       selectedCourseId,
      title:           lTitle,
      lesson_content:  lContent,
      assignment:      lAssign,
      video_url:       lVideo || null,
      
      order_index:     parseInt(lOrder)
    }])
    if (error) toast('error', '❌ ' + error.message)
    else {
      toast('success', '✅ Lesson added!')
      setLTitle(''); setLContent(''); setLAssign(''); setLVideo(''); setLImage(''); setLOrder((lessons.length+2).toString())
      fetchLessons(selectedCourseId)
    }
    setLoading(false)
  }

  // ── Add announcement ──────────────────────────────────────────────────────
  const addAnnouncement = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_announcements').insert([{ course_id:selectedCourseId, title:aTitle, content:aContent, priority:aPriority }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Announcement added!'); setATitle(''); setAContent(''); setAPriority('normal'); fetchAnnouncements(selectedCourseId) }
    setLoading(false)
  }

  // ── Add syllabus ──────────────────────────────────────────────────────────
  const addSyllabus = async (e) => {
    e.preventDefault(); setLoading(true)
    const objectives = sObjectives.split('\n').filter(o => o.trim())
    const { error } = await supabase.from('course_syllabus').insert([{ course_id:selectedCourseId, title:sTitle, description:sDesc, week_number:parseInt(sWeek), learning_objectives:objectives }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Syllabus week added!'); setSTitle(''); setSDesc(''); setSWeek('1'); setSObjectives(''); fetchSyllabus(selectedCourseId) }
    setLoading(false)
  }

  // ── Add module ────────────────────────────────────────────────────────────
  const addModule = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_modules').insert([{ course_id:selectedCourseId, title:mTitle, description:mDesc, week_number:parseInt(mWeek), order_index:parseInt(mOrder) }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Module added!'); setMTitle(''); setMDesc(''); setMWeek('1'); setMOrder('1'); fetchModules(selectedCourseId) }
    setLoading(false)
  }

  // ── Add grade ─────────────────────────────────────────────────────────────
  const addGrade = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_grades').insert([{ course_id:selectedCourseId, title:gTitle, grade_type:gType, max_score:parseInt(gMax), weight:parseFloat(gWeight), due_date:gDue||null }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Grade added!'); setGTitle(''); setGType('assignment'); setGMax('100'); setGWeight('1'); setGDue(''); fetchGrades(selectedCourseId) }
    setLoading(false)
  }

  // ── Add person ────────────────────────────────────────────────────────────
  const addPerson = async (e) => {
    e.preventDefault()
    if (!pEmail) return toast('error','Email required')
    setLoading(true)
    const { data:ud } = await supabase.from('users').select('id').eq('email',pEmail).single()
    if (!ud) { toast('error','User not found'); setLoading(false); return }
    const { error } = await supabase.from('course_people').insert([{ course_id:selectedCourseId, user_id:ud.id, role:pRole }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Person added!'); setPEmail(''); setPRole('student'); fetchPeople(selectedCourseId) }
    setLoading(false)
  }

  // ── Add material ──────────────────────────────────────────────────────────
  const addMaterial = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_materials').insert([{ course_id:selectedCourseId, title:matTitle, description:matDesc, material_type:matType, file_url:matUrl, file_size:matSize, is_required:matReq }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Material added!'); setMatTitle(''); setMatDesc(''); setMatUrl(''); setMatType('pdf'); setMatSize(''); setMatReq(false); fetchMaterials(selectedCourseId) }
    setLoading(false)
  }

  // ── Add event ─────────────────────────────────────────────────────────────
  const addEvent = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_calendar').insert([{ course_id:selectedCourseId, title:evTitle, description:evDesc, event_type:evType, start_time:evStart, end_time:evEnd||null, location:evLoc||null, meeting_link:evLink||null }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Event added!'); setEvTitle(''); setEvDesc(''); setEvType('live_class'); setEvStart(''); setEvEnd(''); setEvLoc(''); setEvLink(''); fetchCalendarEvents(selectedCourseId) }
    setLoading(false)
  }

  // ── Add FAQ ───────────────────────────────────────────────────────────────
  const addFaq = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_faqs').insert([{ course_id:selectedCourseId, question:fQuestion, answer:fAnswer, order_index:parseInt(fOrder) }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ FAQ added!'); setFQuestion(''); setFAnswer(''); setFOrder((faqs.length+2).toString()); fetchFaqs(selectedCourseId) }
    setLoading(false)
  }

  // ── Add resource ──────────────────────────────────────────────────────────
  const addResource = async (e) => {
    e.preventDefault(); setLoading(true)
    const { error } = await supabase.from('course_resources').insert([{ course_id:selectedCourseId, title:rTitle, description:rDesc, url:rUrl, type:rType }])
    if (error) toast('error','❌ '+error.message)
    else { toast('success','✅ Resource added!'); setRTitle(''); setRDesc(''); setRUrl(''); setRType('link'); fetchCourseResources(selectedCourseId) }
    setLoading(false)
  }

  // ── Tab config ────────────────────────────────────────────────────────────
  const tabs = [
    { id:'lessons',       label:'Lessons',       emoji:'📚', count:lessons.length,        color:C.navy   },
    { id:'announcements', label:'Announcements',  emoji:'📢', count:announcements.length,  color:C.orange },
    { id:'syllabus',      label:'Syllabus',       emoji:'📋', count:syllabus.length,       color:C.green  },
    { id:'modules',       label:'Modules',        emoji:'📦', count:modules.length,        color:C.navyMid},
    { id:'grades',        label:'Grades',         emoji:'🏆', count:grades.length,         color:C.amber  },
    { id:'people',        label:'People',         emoji:'👥', count:people.length,         color:C.purple },
    { id:'materials',     label:'Materials',      emoji:'📁', count:materials.length,      color:C.rose   },
    { id:'calendar',      label:'Calendar',       emoji:'📅', count:events.length,         color:C.teal   },
    { id:'faqs',          label:'FAQs',           emoji:'❓', count:faqs.length,           color:C.navyMid},
    { id:'resources',     label:'Resources',      emoji:'🔗', count:courseResources.length,color:C.green  },
  ]

  // ── Item card ─────────────────────────────────────────────────────────────
  const ItemCard = ({ children, onEdit, onDelete, label }) => (
    <div className="bg-white rounded-2xl p-4 border hover:shadow-md transition-all group" style={{ borderColor:C.gray[200] }}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">{children}</div>
        <div className="flex gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:-translate-y-0.5" style={{ background:`${C.navy}12`, color:C.navy }}>
            <Edit3 size={13}/>
          </button>
          <button onClick={onDelete} className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:-translate-y-0.5" style={{ background:`${C.rose}12`, color:C.rose }}>
            <Trash2 size={13}/>
          </button>
        </div>
      </div>
    </div>
  )

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background:C.gray[50] }}>
      <Toast msg={msg} onClose={() => setMsg({ type:'', text:'' })}/>

      {/* ── EDIT MODAL ───────────────────────────────────────────────────── */}
      {editItem && (
        <EditModal title={`Edit ${editItem.section}`} onClose={closeEdit} onSave={saveEdit} saving={saving}>
          {editItem.section === 'lesson' && (
            <div className="space-y-3">
              <Input label="Lesson Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Week Number" type="number" value={editForm.order_index||''} onChange={e => setEditForm(p=>({...p,order_index:parseInt(e.target.value)}))}/>
              </div>
              <Textarea label="Lesson Content" rows={5} value={editForm.lesson_content||''} onChange={e => setEditForm(p=>({...p,lesson_content:e.target.value}))}/>
              <Textarea label="Assignment Instructions" rows={3} value={editForm.assignment||''} onChange={e => setEditForm(p=>({...p,assignment:e.target.value}))}/>
              <Input label="Video URL (YouTube embed)" value={editForm.video_url||''} onChange={e => setEditForm(p=>({...p,video_url:e.target.value}))}/>
              <Input label="Image URL" value={editForm.image_url||''} onChange={e => setEditForm(p=>({...p,image_url:e.target.value}))}/>
              {editForm.video_url && (
                <div className="rounded-xl overflow-hidden" style={{ aspectRatio:'16/9' }}>
                  <iframe src={editForm.video_url} className="w-full h-full" frameBorder="0" allowFullScreen title="preview"/>
                </div>
              )}
              {editForm.image_url && !editForm.video_url && (
                <img src={editForm.image_url} alt="preview" className="w-full rounded-xl object-cover max-h-40"/>
              )}
            </div>
          )}
          {editItem.section === 'announcement' && (
            <div className="space-y-3">
              <Input label="Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <Textarea label="Content *" rows={4} value={editForm.content||''} onChange={e => setEditForm(p=>({...p,content:e.target.value}))}/>
              <Select label="Priority" value={editForm.priority||'normal'} onChange={e => setEditForm(p=>({...p,priority:e.target.value}))}>
                <option value="low">Low</option><option value="normal">Normal</option><option value="high">High</option>
              </Select>
            </div>
          )}
          {editItem.section === 'syllabus' && (
            <div className="space-y-3">
              <Input label="Week Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <Input label="Week Number" type="number" value={editForm.week_number||''} onChange={e => setEditForm(p=>({...p,week_number:parseInt(e.target.value)}))}/>
              <Textarea label="Description" rows={3} value={editForm.description||''} onChange={e => setEditForm(p=>({...p,description:e.target.value}))}/>
            </div>
          )}
          {editItem.section === 'module' && (
            <div className="space-y-3">
              <Input label="Module Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Week #" type="number" value={editForm.week_number||''} onChange={e => setEditForm(p=>({...p,week_number:parseInt(e.target.value)}))}/>
                <Input label="Order" type="number" value={editForm.order_index||''} onChange={e => setEditForm(p=>({...p,order_index:parseInt(e.target.value)}))}/>
              </div>
              <Textarea label="Description" rows={3} value={editForm.description||''} onChange={e => setEditForm(p=>({...p,description:e.target.value}))}/>
            </div>
          )}
          {editItem.section === 'grade' && (
            <div className="space-y-3">
              <Input label="Grade Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <Select label="Type" value={editForm.grade_type||'assignment'} onChange={e => setEditForm(p=>({...p,grade_type:e.target.value}))}>
                <option value="assignment">Assignment</option><option value="quiz">Quiz</option><option value="final">Final</option>
              </Select>
              <div className="grid grid-cols-2 gap-3">
                <Input label="Max Score" type="number" value={editForm.max_score||''} onChange={e => setEditForm(p=>({...p,max_score:parseInt(e.target.value)}))}/>
                <Input label="Weight" type="number" step="0.1" value={editForm.weight||''} onChange={e => setEditForm(p=>({...p,weight:parseFloat(e.target.value)}))}/>
              </div>
            </div>
          )}
          {editItem.section === 'material' && (
            <div className="space-y-3">
              <Input label="Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <Select label="Type" value={editForm.material_type||'pdf'} onChange={e => setEditForm(p=>({...p,material_type:e.target.value}))}>
                <option value="pdf">PDF</option><option value="video">Video</option><option value="link">Link</option><option value="audio">Audio</option>
              </Select>
              <Input label="File URL *" value={editForm.file_url||''} onChange={e => setEditForm(p=>({...p,file_url:e.target.value}))}/>
              <Textarea label="Description" rows={2} value={editForm.description||''} onChange={e => setEditForm(p=>({...p,description:e.target.value}))}/>
            </div>
          )}
          {editItem.section === 'event' && (
            <div className="space-y-3">
              <Input label="Event Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <Select label="Event Type" value={editForm.event_type||'live_class'} onChange={e => setEditForm(p=>({...p,event_type:e.target.value}))}>
                <option value="live_class">Live Class</option><option value="assignment_due">Assignment Due</option><option value="quiz">Quiz</option><option value="deadline">Deadline</option>
              </Select>
              <Input label="Start Time" type="datetime-local" value={editForm.start_time?.slice(0,16)||''} onChange={e => setEditForm(p=>({...p,start_time:e.target.value}))}/>
              <Input label="Meeting Link" value={editForm.meeting_link||''} onChange={e => setEditForm(p=>({...p,meeting_link:e.target.value}))}/>
            </div>
          )}
          {editItem.section === 'faq' && (
            <div className="space-y-3">
              <Input label="Question *" value={editForm.question||''} onChange={e => setEditForm(p=>({...p,question:e.target.value}))}/>
              <Textarea label="Answer *" rows={4} value={editForm.answer||''} onChange={e => setEditForm(p=>({...p,answer:e.target.value}))}/>
              <Input label="Order" type="number" value={editForm.order_index||''} onChange={e => setEditForm(p=>({...p,order_index:parseInt(e.target.value)}))}/>
            </div>
          )}
          {editItem.section === 'resource' && (
            <div className="space-y-3">
              <Input label="Title *" value={editForm.title||''} onChange={e => setEditForm(p=>({...p,title:e.target.value}))}/>
              <Input label="URL *" value={editForm.url||''} onChange={e => setEditForm(p=>({...p,url:e.target.value}))}/>
              <Select label="Type" value={editForm.type||'link'} onChange={e => setEditForm(p=>({...p,type:e.target.value}))}>
                <option value="link">Link</option><option value="article">Article</option><option value="video">Video</option><option value="tool">Tool</option>
              </Select>
              <Textarea label="Description" rows={2} value={editForm.description||''} onChange={e => setEditForm(p=>({...p,description:e.target.value}))}/>
            </div>
          )}
        </EditModal>
      )}

      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 bg-white border-b px-4 sm:px-6 py-4"
        style={{ borderColor:C.gray[200], boxShadow:`0 1px 0 ${C.gray[100]}` }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-base"
              style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
            <div>
              <p className="font-black text-sm" style={{ color:C.navy }}>Course Manager</p>
              <p className="text-[10px]" style={{ color:C.gray[400] }}>iKPACE Admin Dashboard</p>
            </div>
          </div>
          {selectedCourse && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-2xl"
              style={{ background:`${C.navy}08`, border:`1px solid ${C.navy}18` }}>
              <GraduationCap size={15} style={{ color:C.navy }}/>
              <p className="text-xs font-bold truncate max-w-[200px]" style={{ color:C.navy }}>{selectedCourse.title}</p>
            </div>
          )}
          <div className="flex items-center gap-2">
            <button onClick={() => selectedCourseId && fetchAll(selectedCourseId)}
              className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition">
              <RefreshCw size={15} style={{ color:C.gray[500] }}/>
            </button>
            <button className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center hover:bg-gray-100 transition"
              onClick={() => setMobileMenuOpen(o=>!o)}>
              <Menu size={18} style={{ color:C.navy }}/>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {/* ── COURSE SELECTOR ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm" style={{ border:`1px solid ${C.gray[200]}` }}>
          <label className="block text-xs font-black uppercase tracking-widest mb-3" style={{ color:C.gray[400] }}>
            Select Course to Manage
          </label>
          <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl text-sm font-semibold outline-none appearance-none cursor-pointer"
            style={{ background:C.gray[50], border:`2px solid ${selectedCourseId?C.navy:C.gray[200]}`, color:selectedCourseId?C.navy:C.gray[400] }}>
            <option value="">— Choose a course —</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
          {selectedCourse && (
            <div className="mt-3 flex flex-wrap gap-3">
              {tabs.map(t => (
                <div key={t.id} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                  style={{ background:`${t.color}10`, color:t.color }}>
                  <span>{t.emoji}</span>{t.count} {t.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {selectedCourseId && (
          <div className="flex gap-5">

            {/* ── SIDEBAR TABS (desktop) ───────────────────────────────────── */}
            <aside className="hidden lg:flex flex-col w-52 flex-shrink-0">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm sticky top-[77px]"
                style={{ border:`1px solid ${C.gray[200]}` }}>
                <div className="px-4 py-3 border-b" style={{ borderColor:C.gray[100] }}>
                  <p className="text-[10px] font-black uppercase tracking-widest" style={{ color:C.gray[400] }}>Sections</p>
                </div>
                <nav className="py-2">
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => setActiveTab(t.id)}
                      className="w-full flex items-center justify-between px-4 py-2.5 transition-all group"
                      style={{ background: activeTab===t.id ? `${t.color}10` : 'transparent',
                               borderLeft: `3px solid ${activeTab===t.id ? t.color : 'transparent'}` }}>
                      <span className="flex items-center gap-2 text-xs font-semibold"
                        style={{ color: activeTab===t.id ? t.color : C.gray[600] }}>
                        <span>{t.emoji}</span>{t.label}
                      </span>
                      {t.count > 0 && (
                        <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                          style={{ background:`${t.color}20`, color:t.color }}>{t.count}</span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* ── MOBILE TAB DROPDOWN ─────────────────────────────────────── */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-30 lg:hidden">
                <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)}/>
                <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-2xl overflow-y-auto">
                  <div className="p-4 border-b flex items-center justify-between" style={{ borderColor:C.gray[200] }}>
                    <p className="font-black text-sm" style={{ color:C.navy }}>Sections</p>
                    <button onClick={() => setMobileMenuOpen(false)}><X size={16}/></button>
                  </div>
                  {tabs.map(t => (
                    <button key={t.id} onClick={() => { setActiveTab(t.id); setMobileMenuOpen(false) }}
                      className="w-full flex items-center justify-between px-5 py-3 border-b text-left"
                      style={{ borderColor:C.gray[100], background: activeTab===t.id ? `${t.color}10` : 'transparent' }}>
                      <span className="flex items-center gap-2 text-sm font-semibold" style={{ color: activeTab===t.id?t.color:C.gray[700] }}>
                        <span>{t.emoji}</span>{t.label}
                      </span>
                      <span className="text-xs font-black px-2 py-0.5 rounded-full" style={{ background:`${t.color}20`, color:t.color }}>{t.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
            <main className="flex-1 min-w-0">

              {/* Mobile tab button */}
              <button className="lg:hidden w-full mb-4 flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm text-white"
                style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}
                onClick={() => setMobileMenuOpen(true)}>
                <span>
                  {tabs.find(t=>t.id===activeTab)?.emoji} {tabs.find(t=>t.id===activeTab)?.label}
                </span>
                <ChevronDown size={16}/>
              </button>

              {/* ════ LESSONS TAB ════════════════════════════════════════════ */}
              {activeTab === 'lessons' && (
                <div className="space-y-5">
                  {/* Add form */}
                  <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${C.gray[200]}` }}>
                    <div className="px-5 py-4 border-b flex items-center gap-3" style={{ borderColor:C.gray[100], background:`${C.navy}04` }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}15` }}>
                        <Plus size={15} style={{ color:C.navy }}/>
                      </div>
                      <p className="font-black text-sm" style={{ color:C.navy }}>Add New Lesson</p>
                    </div>
                    <form onSubmit={addLesson} className="p-5 space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <Input label="Lesson Title *" value={lTitle} onChange={e=>setLTitle(e.target.value)} placeholder="e.g. Introduction to Virtual Assistance" required/>
                        </div>
                        <Input label="Week Number *" type="number" value={lOrder} onChange={e=>setLOrder(e.target.value)} min="1" required/>
                      </div>
                      <Textarea label="Lesson Content" rows={4} value={lContent} onChange={e=>setLContent(e.target.value)} placeholder="Detailed lesson content students will read alongside the video or image…"/>
                      <Textarea label="Assignment Instructions" rows={3} value={lAssign} onChange={e=>setLAssign(e.target.value)} placeholder="e.g. Write a professional email introducing yourself to a potential client…"/>
                      {/* Media picker */}
                      <div>
                        <label className="block text-xs font-bold mb-2" style={{ color:C.gray[600] }}>
                          📽️ Lesson Media — Video, Image, or Both
                        </label>
                        <MediaPicker
                          videoUrl={lVideo} setVideoUrl={setLVideo}
                          imageUrl={lImage} setImageUrl={setLImage}
                          mediaType={lMediaType} setMediaType={setLMediaType}
                        />
                      </div>
                      <Btn type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                        {loading ? <><RefreshCw size={13} className="animate-spin"/>Adding…</> : <><Plus size={13}/>Add Lesson</>}
                      </Btn>
                    </form>
                  </div>

                  {/* List */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="font-black text-sm" style={{ color:C.navy }}>{lessons.length} Lessons</p>
                    </div>
                    <div className="space-y-3">
                      {lessons.map(l => (
                        <ItemCard key={l.id}
                          onEdit={() => openEdit('lesson', l)}
                          onDelete={() => del('lessons', l.id, fetchLessons, 'lesson')}>
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                              style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>{l.order_index}</div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm" style={{ color:C.navy }}>{l.title}</p>
                              <p className="text-xs mt-0.5 truncate" style={{ color:C.gray[400] }}>
                                {l.lesson_content?.substring(0,80)}…
                              </p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {l.video_url && <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background:`${C.navy}10`, color:C.navy }}><Video size={10}/>Video</span>}
                                {l.image_url && <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background:`${C.green}10`, color:C.green }}><Image size={10}/>Image</span>}
                                {l.assignment && <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background:`${C.orange}10`, color:C.orange }}><FileText size={10}/>Assignment</span>}
                              </div>
                            </div>
                          </div>
                        </ItemCard>
                      ))}
                      {lessons.length===0 && <EmptyState emoji="📚" text="No lessons yet — add your first lesson above."/>}
                    </div>
                  </div>
                </div>
              )}

              {/* ════ ANNOUNCEMENTS TAB ══════════════════════════════════════ */}
              {activeTab === 'announcements' && (
                <SectionLayout title="Announcements" emoji="📢" color={C.orange}
                  form={(
                    <form onSubmit={addAnnouncement} className="space-y-3">
                      <Input label="Title *" value={aTitle} onChange={e=>setATitle(e.target.value)} placeholder="Announcement title" required/>
                      <Textarea label="Content *" rows={3} value={aContent} onChange={e=>setAContent(e.target.value)} placeholder="What do you want students to know?" required/>
                      <Select label="Priority" value={aPriority} onChange={e=>setAPriority(e.target.value)}>
                        <option value="low">🟢 Low</option>
                        <option value="normal">🔵 Normal</option>
                        <option value="high">🔴 High Priority</option>
                      </Select>
                      <Btn type="submit" variant="orange" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Post Announcement
                      </Btn>
                    </form>
                  )}>
                  {announcements.map(a => (
                    <ItemCard key={a.id} onEdit={() => openEdit('announcement', a)} onDelete={() => del('course_announcements',a.id,fetchAnnouncements,'announcement')}>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-8 rounded-full flex-shrink-0 mt-1" style={{ background: a.priority==='high'?C.rose:a.priority==='normal'?C.navy:C.green }}/>
                        <div>
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{a.title}</p>
                          <p className="text-xs mt-0.5" style={{ color:C.gray[500] }}>{a.content}</p>
                          <p className="text-[10px] mt-1" style={{ color:C.gray[300] }}>{new Date(a.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {announcements.length===0 && <EmptyState emoji="📢" text="No announcements yet."/>}
                </SectionLayout>
              )}

              {/* ════ SYLLABUS TAB ════════════════════════════════════════════ */}
              {activeTab === 'syllabus' && (
                <SectionLayout title="Course Syllabus" emoji="📋" color={C.green}
                  form={(
                    <form onSubmit={addSyllabus} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <Input label="Week Title *" value={sTitle} onChange={e=>setSTitle(e.target.value)} placeholder="e.g. Introduction to VA Work" required/>
                        </div>
                        <Input label="Week #" type="number" value={sWeek} onChange={e=>setSWeek(e.target.value)} min="1" required/>
                      </div>
                      <Textarea label="Description" rows={2} value={sDesc} onChange={e=>setSDesc(e.target.value)} placeholder="What will students learn this week?"/>
                      <Textarea label="Learning Objectives (one per line)" rows={3} value={sObjectives} onChange={e=>setSObjectives(e.target.value)} placeholder={"Understand client communication basics\nSet up Google Calendar\nDraft a professional email"}/>
                      <Btn type="submit" variant="green" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Week
                      </Btn>
                    </form>
                  )}>
                  {syllabus.map(s => (
                    <ItemCard key={s.id} onEdit={() => openEdit('syllabus', s)} onDelete={() => del('course_syllabus',s.id,fetchSyllabus,'syllabus week')}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background:C.green }}>W{s.week_number}</div>
                        <div>
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{s.title}</p>
                          <p className="text-xs mt-0.5" style={{ color:C.gray[500] }}>{s.description}</p>
                          {s.learning_objectives?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {s.learning_objectives.slice(0,3).map((o,i) => (
                                <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background:`${C.green}12`, color:C.green }}>✓ {o}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {syllabus.length===0 && <EmptyState emoji="📋" text="No syllabus weeks added yet."/>}
                </SectionLayout>
              )}

              {/* ════ MODULES TAB ═════════════════════════════════════════════ */}
              {activeTab === 'modules' && (
                <SectionLayout title="Course Modules" emoji="📦" color={C.navyMid}
                  form={(
                    <form onSubmit={addModule} className="space-y-3">
                      <Input label="Module Title *" value={mTitle} onChange={e=>setMTitle(e.target.value)} placeholder="e.g. Communication Mastery" required/>
                      <div className="grid grid-cols-2 gap-3">
                        <Input label="Week #" type="number" value={mWeek} onChange={e=>setMWeek(e.target.value)} min="1" required/>
                        <Input label="Order" type="number" value={mOrder} onChange={e=>setMOrder(e.target.value)} min="1" required/>
                      </div>
                      <Textarea label="Description" rows={2} value={mDesc} onChange={e=>setMDesc(e.target.value)} placeholder="Module overview…"/>
                      <Btn type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Module
                      </Btn>
                    </form>
                  )}>
                  {modules.map(m => (
                    <ItemCard key={m.id} onEdit={() => openEdit('module', m)} onDelete={() => del('course_modules',m.id,fetchModules,'module')}>
                      <p className="font-bold text-sm" style={{ color:C.navy }}>Week {m.week_number}: {m.title}</p>
                      <p className="text-xs mt-0.5" style={{ color:C.gray[500] }}>{m.description}</p>
                    </ItemCard>
                  ))}
                  {modules.length===0 && <EmptyState emoji="📦" text="No modules added yet."/>}
                </SectionLayout>
              )}

              {/* ════ GRADES TAB ══════════════════════════════════════════════ */}
              {activeTab === 'grades' && (
                <SectionLayout title="Grade Items" emoji="🏆" color={C.amber}
                  form={(
                    <form onSubmit={addGrade} className="space-y-3">
                      <Input label="Grade Title *" value={gTitle} onChange={e=>setGTitle(e.target.value)} placeholder="e.g. Week 3 Quiz" required/>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <Select label="Type" value={gType} onChange={e=>setGType(e.target.value)}>
                          <option value="assignment">Assignment</option><option value="quiz">Quiz</option><option value="final">Final</option>
                        </Select>
                        <Input label="Max Score" type="number" value={gMax} onChange={e=>setGMax(e.target.value)} min="1" required/>
                        <Input label="Weight" type="number" step="0.1" value={gWeight} onChange={e=>setGWeight(e.target.value)} min="0"/>
                      </div>
                      <Input label="Due Date (optional)" type="datetime-local" value={gDue} onChange={e=>setGDue(e.target.value)}/>
                      <Btn type="submit" variant="orange" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Grade Item
                      </Btn>
                    </form>
                  )}>
                  {grades.map(g => (
                    <ItemCard key={g.id} onEdit={() => openEdit('grade', g)} onDelete={() => del('course_grades',g.id,fetchGrades,'grade')}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 uppercase" style={{ background:C.amber }}>{g.grade_type?.slice(0,3)}</div>
                        <div>
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{g.title}</p>
                          <p className="text-xs" style={{ color:C.gray[400] }}>Max: {g.max_score} pts · Weight: {g.weight} {g.due_date && `· Due: ${new Date(g.due_date).toLocaleDateString()}`}</p>
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {grades.length===0 && <EmptyState emoji="🏆" text="No grade items added yet."/>}
                </SectionLayout>
              )}

              {/* ════ PEOPLE TAB ══════════════════════════════════════════════ */}
              {activeTab === 'people' && (
                <SectionLayout title="Course People" emoji="👥" color={C.purple}
                  form={(
                    <form onSubmit={addPerson} className="space-y-3">
                      <Input label="Email Address *" type="email" value={pEmail} onChange={e=>setPEmail(e.target.value)} placeholder="student@example.com" required/>
                      <Select label="Role" value={pRole} onChange={e=>setPRole(e.target.value)}>
                        <option value="student">Student</option><option value="ta">Teaching Assistant</option><option value="instructor">Instructor</option>
                      </Select>
                      <Btn type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Person
                      </Btn>
                    </form>
                  )}>
                  {people.map(p => (
                    <ItemCard key={p.id} onEdit={() => {}} onDelete={() => del('course_people',p.id,fetchPeople,'person')}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0" style={{ background:C.purple }}>
                          {(p.user_id||'?')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{p.email||`ID: ${(p.user_id||'').slice(0,10)}…`}</p>
                          <span className="text-[10px] px-2 py-0.5 rounded-full capitalize font-semibold" style={{ background:`${C.purple}12`, color:C.purple }}>{p.role}</span>
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {people.length===0 && <EmptyState emoji="👥" text="No people added yet."/>}
                </SectionLayout>
              )}

              {/* ════ MATERIALS TAB ═══════════════════════════════════════════ */}
              {activeTab === 'materials' && (
                <SectionLayout title="Course Materials" emoji="📁" color={C.rose}
                  form={(
                    <form onSubmit={addMaterial} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Title *" value={matTitle} onChange={e=>setMatTitle(e.target.value)} placeholder="e.g. VA Toolkit PDF" required/>
                        <Select label="Type" value={matType} onChange={e=>setMatType(e.target.value)}>
                          <option value="pdf">📄 PDF</option><option value="video">🎬 Video</option><option value="link">🔗 Link</option><option value="audio">🎵 Audio</option><option value="image">🖼️ Image</option>
                        </Select>
                      </div>
                      <Input label="File URL *" value={matUrl} onChange={e=>setMatUrl(e.target.value)} placeholder="https://…" required/>
                      <Textarea label="Description" rows={2} value={matDesc} onChange={e=>setMatDesc(e.target.value)} placeholder="What is this material for?"/>
                      <div className="flex items-center gap-4">
                        <Input label="File Size" value={matSize} onChange={e=>setMatSize(e.target.value)} placeholder="e.g. 2.4 MB" style={{ width:'auto' }}/>
                        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer mt-5" style={{ color:C.gray[600] }}>
                          <input type="checkbox" checked={matReq} onChange={e=>setMatReq(e.target.checked)} className="rounded"/>
                          Required Material
                        </label>
                      </div>
                      <Btn type="submit" variant="danger" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Material
                      </Btn>
                    </form>
                  )}>
                  {materials.map(m => (
                    <ItemCard key={m.id} onEdit={() => openEdit('material', m)} onDelete={() => del('course_materials',m.id,fetchMaterials,'material')}>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background:`${C.rose}12` }}>
                          {m.material_type==='pdf'?'📄':m.material_type==='video'?'🎬':m.material_type==='audio'?'🎵':'🔗'}
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{m.title}</p>
                          <p className="text-xs" style={{ color:C.gray[400] }}>{m.description} {m.file_size && `· ${m.file_size}`}</p>
                          {m.is_required && <span className="text-[10px] font-bold" style={{ color:C.rose }}>★ Required</span>}
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {materials.length===0 && <EmptyState emoji="📁" text="No materials uploaded yet."/>}
                </SectionLayout>
              )}

              {/* ════ CALENDAR TAB ════════════════════════════════════════════ */}
              {activeTab === 'calendar' && (
                <SectionLayout title="Course Calendar" emoji="📅" color={C.teal}
                  form={(
                    <form onSubmit={addEvent} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Event Title *" value={evTitle} onChange={e=>setEvTitle(e.target.value)} placeholder="e.g. Live Q&A Session" required/>
                        <Select label="Event Type" value={evType} onChange={e=>setEvType(e.target.value)}>
                          <option value="live_class">🔴 Live Class</option><option value="assignment_due">📝 Assignment Due</option><option value="quiz">🎯 Quiz</option><option value="office_hours">💬 Office Hours</option><option value="deadline">⏰ Deadline</option>
                        </Select>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Start Time *" type="datetime-local" value={evStart} onChange={e=>setEvStart(e.target.value)} required/>
                        <Input label="End Time" type="datetime-local" value={evEnd} onChange={e=>setEvEnd(e.target.value)}/>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Location" value={evLoc} onChange={e=>setEvLoc(e.target.value)} placeholder="e.g. Zoom / Google Meet"/>
                        <Input label="Meeting Link" value={evLink} onChange={e=>setEvLink(e.target.value)} placeholder="https://meet.google.com/…"/>
                      </div>
                      <Textarea label="Description" rows={2} value={evDesc} onChange={e=>setEvDesc(e.target.value)} placeholder="Event details…"/>
                      <Btn type="submit" variant="green" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Event
                      </Btn>
                    </form>
                  )}>
                  {events.sort((a,b) => new Date(a.start_time)-new Date(b.start_time)).map(ev => (
                    <ItemCard key={ev.id} onEdit={() => openEdit('event', ev)} onDelete={() => del('course_calendar',ev.id,fetchCalendarEvents,'event')}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                          style={{ background: ev.event_type==='live_class'?C.rose:ev.event_type==='assignment_due'?C.orange:C.teal }}>
                          {ev.event_type==='live_class'?'🔴':ev.event_type==='quiz'?'🎯':'📅'}
                        </div>
                        <div>
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{ev.title}</p>
                          <p className="text-xs" style={{ color:C.gray[400] }}>{new Date(ev.start_time).toLocaleDateString('en-US',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'})}</p>
                          {ev.meeting_link && <a href={ev.meeting_link} target="_blank" rel="noopener noreferrer" className="text-[10px] font-semibold flex items-center gap-1 mt-0.5" style={{ color:C.teal }}><ExternalLink size={9}/>Join Link</a>}
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {events.length===0 && <EmptyState emoji="📅" text="No events scheduled yet."/>}
                </SectionLayout>
              )}

              {/* ════ FAQS TAB ════════════════════════════════════════════════ */}
              {activeTab === 'faqs' && (
                <SectionLayout title="Frequently Asked Questions" emoji="❓" color={C.navyMid}
                  form={(
                    <form onSubmit={addFaq} className="space-y-3">
                      <Input label="Question *" value={fQuestion} onChange={e=>setFQuestion(e.target.value)} placeholder="e.g. How do I submit my assignment?" required/>
                      <Textarea label="Answer *" rows={3} value={fAnswer} onChange={e=>setFAnswer(e.target.value)} placeholder="Detailed answer that will help students…" required/>
                      <Input label="Display Order" type="number" value={fOrder} onChange={e=>setFOrder(e.target.value)} min="1"/>
                      <Btn type="submit" variant="primary" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add FAQ
                      </Btn>
                    </form>
                  )}>
                  {faqs.map(f => (
                    <ItemCard key={f.id} onEdit={() => openEdit('faq', f)} onDelete={() => del('course_faqs',f.id,fetchFaqs,'FAQ')}>
                      <p className="font-bold text-sm" style={{ color:C.navy }}>Q: {f.question}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color:C.gray[500] }}>A: {f.answer}</p>
                    </ItemCard>
                  ))}
                  {faqs.length===0 && <EmptyState emoji="❓" text="No FAQs added yet."/>}
                </SectionLayout>
              )}

              {/* ════ RESOURCES TAB ═══════════════════════════════════════════ */}
              {activeTab === 'resources' && (
                <SectionLayout title="Course Resources" emoji="🔗" color={C.green}
                  form={(
                    <form onSubmit={addResource} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Resource Title *" value={rTitle} onChange={e=>setRTitle(e.target.value)} placeholder="e.g. Canva Free Templates" required/>
                        <Select label="Type" value={rType} onChange={e=>setRType(e.target.value)}>
                          <option value="link">🔗 Link</option><option value="article">📰 Article</option><option value="video">🎬 Video</option><option value="tool">🛠️ Tool</option>
                        </Select>
                      </div>
                      <Input label="URL *" value={rUrl} onChange={e=>setRUrl(e.target.value)} placeholder="https://…" required/>
                      <Textarea label="Description" rows={2} value={rDesc} onChange={e=>setRDesc(e.target.value)} placeholder="What is this resource for?"/>
                      <Btn type="submit" variant="green" disabled={loading} className="w-full sm:w-auto">
                        <Plus size={13}/> Add Resource
                      </Btn>
                    </form>
                  )}>
                  {courseResources.map(r => (
                    <ItemCard key={r.id} onEdit={() => openEdit('resource', r)} onDelete={() => del('course_resources',r.id,fetchCourseResources,'resource')}>
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background:`${C.green}12` }}>
                          {r.type==='article'?'📰':r.type==='video'?'🎬':r.type==='tool'?'🛠️':'🔗'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{r.title}</p>
                          <p className="text-xs mt-0.5" style={{ color:C.gray[400] }}>{r.description}</p>
                          <a href={r.url} target="_blank" rel="noopener noreferrer"
                            className="text-[10px] font-semibold flex items-center gap-1 mt-1 truncate" style={{ color:C.green }}>
                            <ExternalLink size={9}/>{r.url}
                          </a>
                        </div>
                      </div>
                    </ItemCard>
                  ))}
                  {courseResources.length===0 && <EmptyState emoji="🔗" text="No resources added yet."/>}
                </SectionLayout>
              )}
            </main>
          </div>
        )}

        {/* No course selected */}
        {!selectedCourseId && (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-2xl font-black"
              style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
            <h2 className="font-black text-xl mb-2" style={{ color:C.navy }}>Select a Course</h2>
            <p className="text-sm" style={{ color:C.gray[400] }}>Choose a course from the dropdown above to start managing its content.</p>
          </div>
        )}
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
      `}</style>
    </div>
  )
}

// ─── Layout wrapper for each tab section ─────────────────────────────────────
function SectionLayout({ title, emoji, color, form, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="space-y-5">
      {/* Add form card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${C.gray[200]}` }}>
        <button onClick={() => setOpen(o=>!o)}
          className="w-full flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor:C.gray[100], background:`${color}04` }}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${color}18` }}>
              <Plus size={15} style={{ color }}/>
            </div>
            <p className="font-black text-sm" style={{ color:C.navy }}>Add {title.split(' ')[0]}</p>
          </div>
          {open ? <ChevronUp size={15} style={{ color:C.gray[400] }}/> : <ChevronDown size={15} style={{ color:C.gray[400] }}/>}
        </button>
        {open && <div className="p-5">{form}</div>}
      </div>
      {/* List */}
      <div>
        <div className="space-y-3">{children}</div>
      </div>
    </div>
  )
}

function EmptyState({ emoji, text }) {
  return (
    <div className="text-center py-12 rounded-2xl" style={{ background:'white', border:`1px dashed ${C.gray[200]}` }}>
      <span className="text-4xl">{emoji}</span>
      <p className="text-sm mt-2" style={{ color:C.gray[400] }}>{text}</p>
    </div>
  )
}
