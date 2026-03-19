// src/pages/TestCoursePlayer.jsx
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import {
  Bell, Calendar, Mail, BookOpen, Grid, Award, Users,
  FileText, ChevronDown, ChevronUp, MessageCircle, Download,
  Video, File, Link as LinkIcon, Clock, Star, CheckCircle,
  AlertCircle, Send, Plus, X, Search, Filter, UserCheck,
  Eye, Upload, Paperclip, Reply, ThumbsUp, Share2,
  Bookmark, Settings, LogOut, Home, Menu, Volume2, VolumeX,
  Maximize2, Minimize2, Play, Pause, ExternalLink,
  ChevronLeft, ChevronRight, HelpCircle, Info, AlertTriangle,
  LayoutGrid, ListTodo, Sparkles, Brain, Trophy, Zap, Target,
  BarChart, BarChart3, Flame, BadgeCheck, Rocket, GraduationCap,
  Timer, Flag, Lock, ArrowRight, RefreshCw, Check, Hash,
  MessageSquare, Layers, Globe, StickyNote
} from 'lucide-react';

// ─── Brand design tokens ──────────────────────────────────────────────────────
const C = {
  navy:       '#1A3D7C',
  navyDark:   '#0F2655',
  navyMid:    '#2F5EA8',
  orange:     '#FF7A00',
  orangeLight:'#FF9A3C',
  green:      '#008F4C',
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

// ─── iKPACE Quiz bank — topic-aware questions per lesson keyword ──────────────
const IKPACE_QUIZ_BANK = {
  // Virtual Assistant topics
  'virtual assistant': [
    { question:'What does a Virtual Assistant (VA) primarily do for clients?', options:['Writes code for apps','Handles administrative, communication & scheduling tasks remotely','Designs logos and brand materials','Manages physical office supplies'], correct:1, explanation:'A VA provides remote administrative and support services — email, calendar, communication, research and more.' },
    { question:'Which tool is most commonly used by Virtual Assistants for calendar management?', options:['Adobe Photoshop','Google Calendar','Scratch','Meta Ads Manager'], correct:1, explanation:'Google Calendar is the industry-standard tool for scheduling, reminders, and meeting coordination for VAs.' },
    { question:'What is the best way for a VA to communicate professionally with clients?', options:['Only by phone calls','Using clear, structured emails with proper greeting and sign-off','Sending voice notes only','Using informal slang to seem friendly'], correct:1, explanation:'Professional email communication — clear structure, polite tone, and timely responses — is a core VA skill.' },
    { question:'Which platform do most VAs use to find their first freelance clients?', options:['TikTok','Scratch by MIT','Upwork or Fiverr','Adobe Premiere'], correct:2, explanation:'Upwork and Fiverr are the leading freelance platforms where VAs list services and connect with clients worldwide.' },
    { question:'When a client asks a VA to manage their inbox, what does "Inbox Zero" mean?', options:['Having zero unread messages ever','Processing and organising emails so nothing important is missed or left unhandled','Deleting all emails daily','Never replying to emails'], correct:1, explanation:'Inbox Zero is a productivity method of keeping the inbox clean and processed so priority items are always addressed.' },
  ],
  'email': [
    { question:'What makes a professional email subject line effective?', options:['Very long and detailed','Short, specific, and action-oriented','All uppercase letters','No subject line needed'], correct:1, explanation:'A clear, specific subject line helps the recipient immediately understand the purpose and priority of the email.' },
    { question:'Which salutation is most appropriate for a formal business email?', options:['"Hey there!"','"Dear Mr./Ms. [Name],"','"Yo,"','"To whoever"'], correct:1, explanation:'"Dear [Name]" with the correct title is the standard formal opening for professional email communication.' },
    { question:'What is the ideal length for a professional client email?', options:['As long as possible to show effort','3–5 paragraphs with every detail','Concise — cover only what is necessary, ideally under 200 words','One word answers only'], correct:2, explanation:'Concise, focused emails respect the client\'s time and are more likely to receive a prompt, clear response.' },
    { question:'What should you always do before sending an important client email?', options:['Send it immediately without reading','Proofread for spelling, grammar, and tone','Forward it to a friend first','Print it out'], correct:1, explanation:'Proofreading prevents embarrassing errors and ensures your message communicates exactly what you intend.' },
  ],
  'calendar': [
    { question:'What is a key benefit of using Google Calendar for client management?', options:['It replaces email entirely','It allows shared scheduling, meeting invites, and reminders across time zones','It designs logos automatically','It creates video content'], correct:1, explanation:'Google Calendar\'s sharing and cross-timezone features make it essential for coordinating with international clients.' },
    { question:'When scheduling a meeting across different time zones, what should a VA always confirm?', options:['Only their own local time','The client\'s local time zone and confirm the time in both zones','The weather at the meeting location','Nothing — time zones don\'t matter'], correct:1, explanation:'Always confirm the meeting time in both the VA\'s and client\'s time zones to avoid scheduling mistakes.' },
    { question:'What does "blocking time" mean in calendar management?', options:['Deleting time slots permanently','Reserving specific time slots for focused work or tasks so nothing else gets scheduled there','Ignoring meeting requests','Hiding your calendar from clients'], correct:1, explanation:'Blocking time is a productivity strategy to protect dedicated hours for important work without interruptions.' },
  ],
  // Social Media Marketing topics
  'social media': [
    { question:'What is the primary goal of a social media content strategy?', options:['Post as often as possible regardless of quality','Consistently deliver valuable, relevant content that engages your target audience','Copy competitors\' posts exactly','Only post when you feel like it'], correct:1, explanation:'A content strategy ensures every post serves a purpose — building brand awareness, engagement, or conversions.' },
    { question:'Which metric best measures the effectiveness of a social media campaign?', options:['Number of accounts you follow','Engagement rate (likes, comments, shares relative to reach)','How many times you change your profile picture','Post character count'], correct:1, explanation:'Engagement rate shows how actively your audience interacts with your content — it\'s more meaningful than follower count alone.' },
    { question:'What does "Meta Ads Manager" allow you to do?', options:['Design logos for clients','Create, target, and manage paid ad campaigns on Facebook and Instagram','Code mobile applications','Edit video footage'], correct:1, explanation:'Meta Ads Manager is the central tool for running, optimising, and measuring paid advertising on Facebook and Instagram.' },
    { question:'What is a "content calendar" used for in social media marketing?', options:['Tracking personal daily appointments','Planning and scheduling posts in advance to maintain consistent publishing','Counting the number of followers','Designing post graphics'], correct:1, explanation:'A content calendar lets you plan topics, visuals, and posting times in advance, ensuring consistency and strategic alignment.' },
    { question:'What is "organic reach" on social media?', options:['Reach achieved only through paid ads','The number of people who see your content without any paid promotion','The number of people in your country','People who visit your website directly'], correct:1, explanation:'Organic reach is the audience you reach through non-paid means — quality content, hashtags, and community engagement.' },
  ],
  'hashtag': [
    { question:'What is the main purpose of using hashtags in a social media post?', options:['Make posts look longer','Increase discoverability by categorising content for people searching those topics','Replace captions entirely','Show the date of posting'], correct:1, explanation:'Hashtags categorise your content, making it discoverable to people searching or following those specific topics.' },
    { question:'How many hashtags is generally recommended for an Instagram post?', options:['0 — they look spammy','100+','3–10 highly relevant hashtags','Exactly 30 always'], correct:2, explanation:'Research shows 3–10 highly relevant hashtags outperform stuffing 30, which can look spammy and reduce engagement.' },
  ],
  'ads': [
    { question:'What is "A/B testing" in the context of social media advertising?', options:['Testing two different internet connections','Running two versions of an ad to compare which performs better','Testing ads on two different devices','A type of ad bidding strategy'], correct:1, explanation:'A/B testing (split testing) compares two ad variations to identify which creative, copy, or audience performs better.' },
    { question:'What does "CPM" stand for in digital advertising?', options:['Cost Per Message','Cost Per Mille — the cost per 1,000 impressions','Content Per Month','Clicks Per Minute'], correct:1, explanation:'CPM (Cost Per Mille) measures how much you pay for 1,000 ad impressions — a key metric for brand awareness campaigns.' },
    { question:'Which targeting option in Meta Ads allows you to reach people similar to your existing customers?', options:['Broad audience','Lookalike Audiences','Retargeting only','Location-only targeting'], correct:1, explanation:'Lookalike Audiences use your existing customer data to find new people with similar characteristics and behaviours.' },
  ],
  // Design topics
  'design': [
    { question:'What does "colour theory" help designers do?', options:['Choose random colours','Understand how colours relate, combine, and affect viewer emotion and perception','Make logos bigger','Add more text to designs'], correct:1, explanation:'Colour theory guides designers in creating harmonious, emotionally resonant palettes that support the brand\'s message.' },
    { question:'In Canva, what does the "Brand Kit" feature allow you to do?', options:['Buy a brand name','Save your brand\'s colours, fonts, and logos for consistent use across all designs','Download competitor designs','Automatically create social media posts'], correct:1, explanation:'The Brand Kit stores your brand assets so every design you create stays visually consistent without manual setup.' },
    { question:'What is "white space" (negative space) in graphic design?', options:['Only the colour white in a design','The empty areas around and between elements that improve readability and visual balance','A design mistake to be fixed','Wasted space on a canvas'], correct:1, explanation:'White space gives designs room to breathe, draws attention to key elements, and makes content easier to read.' },
    { question:'Which of the following best describes a "vector" graphic?', options:['A photo taken with a camera','A graphic made of pixels that blurs when enlarged','A mathematical drawing that scales to any size without losing quality','A hand-drawn sketch'], correct:2, explanation:'Vector graphics use mathematical paths, so they can be scaled to any size — from business card to billboard — without pixelation.' },
    { question:'What makes typography effective in branding?', options:['Using as many different fonts as possible','Choosing 1–2 complementary fonts that reflect the brand personality and maintain readability','Making all text the same size','Using decorative fonts for body text'], correct:1, explanation:'Limiting font choices to 1–2 well-paired typefaces creates visual consistency and reinforces brand identity.' },
  ],
  'canva': [
    { question:'What is the "Magic Resize" feature in Canva Pro used for?', options:['Making images blurry','Automatically resizing one design to multiple platform-specific dimensions instantly','Changing brand colours','Removing people from photos'], correct:1, explanation:'Magic Resize converts one design into multiple sizes for different platforms (Instagram, Facebook, LinkedIn) in one click.' },
    { question:'Which Canva feature lets you remove the background from a photo automatically?', options:['Colour Picker','Background Remover tool','Crop tool','Text tool'], correct:1, explanation:'Canva\'s Background Remover (Pro feature) uses AI to cleanly remove photo backgrounds, perfect for product and profile images.' },
    { question:'What file format should you export a Canva logo in for print use?', options:['JPEG only','PNG with transparent background or PDF for print','GIF only','TXT file'], correct:1, explanation:'PNG preserves transparency for digital use, while PDF (Print-quality) ensures sharp, high-resolution output for printing.' },
  ],
  // Kids Coding topics
  'coding': [
    { question:'What is Scratch primarily used for?', options:['Editing photos','Block-based visual coding for creating games, animations, and stories — especially for beginners','Building websites with HTML','Managing spreadsheets'], correct:1, explanation:'Scratch is MIT\'s free block-based platform designed to teach programming logic through visual, drag-and-drop coding.' },
    { question:'In Scratch, what is a "sprite"?', options:['A type of background','A character or object that you can program to move, talk, and interact in your project','A sound effect','A coding error'], correct:1, explanation:'Sprites are the programmable characters and objects in Scratch that you bring to life using code blocks.' },
    { question:'What does a "loop" do in coding?', options:['Stops the program completely','Repeats a set of instructions a specified number of times or until a condition is met','Deletes all code','Plays a sound once'], correct:1, explanation:'Loops are one of the most powerful concepts in coding — they allow actions to repeat without writing the same code many times.' },
    { question:'What is an "event" in Scratch programming?', options:['A party hosted by the coding club','A trigger — like clicking the green flag or pressing a key — that starts a sequence of code blocks','A type of sprite costume','An error in the code'], correct:1, explanation:'Events are triggers that tell Scratch when to start running code — clicking flags, pressing keys, or clicking sprites.' },
    { question:'What is the first step when designing a game in Scratch?', options:['Write all code immediately','Plan your game concept — characters, rules, and win/lose conditions — before building','Pick the most complicated backdrop','Delete all default sprites'], correct:1, explanation:'Planning your game design first (characters, goals, rules) makes the coding process much smoother and more focused.' },
  ],
  // Freelancing topics
  'freelancing': [
    { question:'What is the most important element of a winning Upwork profile?', options:['A very short profile with no details','A compelling, client-focused headline and overview that clearly explains what you do and who you help','A profile photo in formal attire only','Having 100+ jobs already completed'], correct:1, explanation:'Your Upwork headline and overview are the first things clients read — they must clearly communicate your value within seconds.' },
    { question:'What does "niche down" mean in freelancing?', options:['Working in many different fields at once','Specialising in a specific service or industry so you become the go-to expert in that area','Lowering your prices to attract anyone','Only working for local clients'], correct:1, explanation:'Niching down helps you stand out, charge higher rates, and attract ideal clients who specifically need your expertise.' },
    { question:'Which payment method is widely used for international freelance income in Africa?', options:['Only cash in hand','Paystack, PayPal, Payoneer, or Wise for cross-border transfers','Only bank cheques','Only cryptocurrency'], correct:1, explanation:'Services like Payoneer, Wise, and PayPal allow African freelancers to receive international payments efficiently and affordably.' },
    { question:'What is a "proposal" in freelancing?', options:['A legal contract','A personalised cover letter responding to a client\'s job post, explaining why you\'re the best fit','A price list you post publicly','An invoice for completed work'], correct:1, explanation:'A strong proposal is tailored to the specific job, addresses the client\'s problem, and shows relevant experience — not a generic copy-paste.' },
    { question:'What does "client communication" best practice include?', options:['Only communicate when you deliver the final work','Respond promptly, set clear expectations, give progress updates, and confirm all agreements in writing','Never ask clarifying questions','Charge extra for every message sent'], correct:1, explanation:'Proactive, clear communication builds client trust, prevents misunderstandings, and leads to repeat business and referrals.' },
  ],
  // AI / Prompt Engineering topics
  'ai': [
    { question:'What is "prompt engineering"?', options:['Building physical computer hardware','Crafting precise, structured instructions for AI models to produce high-quality, accurate outputs','Teaching AI to draw only','A type of software installation process'], correct:1, explanation:'Prompt engineering is the skill of designing effective AI inputs — specifying role, context, task, and format — to get the best possible outputs.' },
    { question:'Which AI model is developed by Anthropic?', options:['GPT-4','Gemini','Claude','LLaMA'], correct:2, explanation:'Claude is Anthropic\'s AI assistant, known for its strong reasoning, safety focus, and long-context capabilities.' },
    { question:'What does "zero-shot prompting" mean?', options:['Asking AI to generate zero results','Giving the AI a task with no examples — relying purely on its training knowledge to respond','Turning off AI features','A type of AI image generation'], correct:1, explanation:'Zero-shot prompting asks the AI to complete a task without providing any examples, testing its baseline understanding.' },
    { question:'What is the main purpose of the "Role" component in a prompt framework?', options:['To tell the AI your personal name','To set a persona or expertise context so the AI responds from a specific professional perspective','To limit the word count','To choose a language'], correct:1, explanation:'Assigning a role (e.g. "Act as a marketing expert") primes the AI to respond with the knowledge and tone of that expertise.' },
    { question:'Which AI tool is best known for generating high-quality images from text prompts?', options:['Google Sheets','Midjourney and DALL-E','Microsoft Word','Canva Background Remover'], correct:1, explanation:'Midjourney and DALL-E (by OpenAI) are the leading AI image generation tools, creating detailed visuals from text descriptions.' },
  ],
  'prompt': [
    { question:'What are the four core elements of a well-structured AI prompt?', options:['Word count, font, colour, language','Role, Context, Task, and Format','Question, Answer, Score, Grade','Input, Output, Speed, Cost'], correct:1, explanation:'Role (who the AI should be), Context (background info), Task (what to do), and Format (how to respond) make up a complete, effective prompt.' },
    { question:'What is "chain-of-thought" prompting?', options:['Linking multiple AI tools together','Asking the AI to reason step-by-step through a problem before giving its final answer','A way to chain copy-paste tasks','A social media content chain'], correct:1, explanation:'Chain-of-thought prompting instructs the AI to show its reasoning process, leading to more accurate and logical outputs.' },
    { question:'What does "few-shot prompting" involve?', options:['Limiting the AI to a few words','Providing 2–5 examples within the prompt to show the AI the exact format or style you want','Only asking one question','Generating a few images only'], correct:1, explanation:'Few-shot examples guide the AI to match a specific pattern, style, or structure — dramatically improving output quality.' },
  ],
  // Google Workspace
  'google': [
    { question:'What is Google Workspace primarily used for in a professional setting?', options:['Gaming and entertainment','Collaborative productivity tools — Docs, Sheets, Slides, Drive, Gmail, Calendar — for business teams','Graphic design only','Social media management only'], correct:1, explanation:'Google Workspace provides a suite of cloud-based tools that allow teams to collaborate in real time on documents, spreadsheets, and presentations.' },
    { question:'What does "sharing permissions" in Google Drive allow you to do?', options:['Share your password','Control who can view, comment on, or edit your files','Delete files permanently','Download files offline'], correct:1, explanation:'Sharing permissions let you choose exactly who can access your files and at what level — viewer, commenter, or editor.' },
  ],
  'scratch': [
    { question:'What does the "green flag" button do in Scratch?', options:['Stops all scripts','Starts all scripts that are triggered by the "When green flag clicked" event block','Changes the sprite colour','Opens the costume editor'], correct:1, explanation:'The green flag is the main "run" button in Scratch — clicking it triggers all scripts that begin with the "When green flag clicked" block.' },
    { question:'In Scratch, what is a "variable" used for?', options:['A type of sprite outfit','A container that stores a value (like a score or counter) that can change as the program runs','A background image','A sound file'], correct:1, explanation:'Variables store changing data — like a game score, timer countdown, or player name — that the program can read and update.' },
  ],
}

// Fuzzy match lesson to quiz bank topic
function generateIKPACEQuiz(lesson) {
  const title   = (lesson.title   || '').toLowerCase()
  const content = (lesson.lesson_content || lesson.description || '').toLowerCase()
  const combined = title + ' ' + content

  // Find matching topic bank
  const matchedKey = Object.keys(IKPACE_QUIZ_BANK).find(k => combined.includes(k))
  const pool = matchedKey ? IKPACE_QUIZ_BANK[matchedKey] : null

  if (pool && pool.length >= 4) {
    // Shuffle and pick 4
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 4).map((q, i) => ({ ...q, id: i + 1 }))
  }

  // Fallback: generate questions referencing actual lesson title
  return [
    {
      id:1,
      question:`What is the main skill you develop from the lesson "${lesson.title}"?`,
      options:['Advanced theory with no practical use','A practical, job-ready skill you can apply immediately','A decorative academic concept','A skill only useful in exams'],
      correct:1,
      explanation:`"${lesson.title}" is designed to build a practical skill directly applicable to real work situations.`
    },
    {
      id:2,
      question:`After completing "${lesson.title}", what is the best way to reinforce your learning?`,
      options:['Watch the video again without doing anything','Complete the lesson assignment and apply the concepts to a real task','Skip to the next lesson immediately','Share the video link on social media only'],
      correct:1,
      explanation:'Applying what you have learned through the assignment is the most effective way to turn knowledge into a usable skill.'
    },
    {
      id:3,
      question:`Which of the following describes a student who has truly mastered the content in "${lesson.title}"?`,
      options:['They can recite definitions only','They can explain the concept AND demonstrate it with a practical example','They memorised every slide','They watched the lesson three times'],
      correct:1,
      explanation:'True mastery means understanding deeply enough to explain and demonstrate — not just recall.'
    },
    {
      id:4,
      question:'According to the iKPACE learning approach, what should come AFTER watching a lesson video?',
      options:['Close the tab immediately','Read the lesson content, take notes, then complete the assignment','Watch a different course entirely','Skip ahead to the certificate'],
      correct:1,
      explanation:'iKPACE follows: Watch → Read → Note → Practice → Submit. Each step builds on the last to maximise retention.'
    },
  ]
}

// ─── Sub-components ───────────────────────────────────────────────────────────

// Progress ring
function ProgressRing({ pct=0, size=64, stroke=5, color=C.orange }) {
  const r = (size - stroke*2)/2, circ = 2*Math.PI*r
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${color}25`} strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
        strokeWidth={stroke} strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ-(pct/100)*circ}
        style={{transition:'stroke-dashoffset .5s ease'}}/>
    </svg>
  )
}

// Sidebar tool row
function ToolRow({ icon:Icon, label, color, badge, active, onClick, children }) {
  return (
    <div>
      <button onClick={onClick}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
        style={{ background: active ? `${color}08` : 'transparent', borderLeft: active ? `3px solid ${color}` : '3px solid transparent' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${color}15` }}>
            <Icon size={15} style={{ color }}/>
          </div>
          <span className="text-sm font-semibold" style={{ color: active ? color : C.gray[700] }}>{label}</span>
          {badge > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-bold" style={{ background:C.rose }}>{badge}</span>
          )}
        </div>
        {active ? <ChevronUp size={14} style={{ color:C.gray[400] }}/> : <ChevronDown size={14} style={{ color:C.gray[400] }}/>}
      </button>
      {active && (
        <div className="border-t" style={{ borderColor:C.gray[100], background:C.gray[50] }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═════════════════════════════════════════════════════════════════════════════
export default function TestCoursePlayer() {
  const { courseId } = useParams()
  const navigate     = useNavigate()

  // ── Core state ──────────────────────────────────────────────────────────
  const [loading,           setLoading]           = useState(true)
  const [error,             setError]             = useState('')
  const [user,              setUser]              = useState(null)
  const [course,            setCourse]            = useState(null)
  const [lessons,           setLessons]           = useState([])
  const [currentLesson,     setCurrentLesson]     = useState(null)
  const [completedLessons,  setCompletedLessons]  = useState([])
  const [progress,          setProgress]          = useState(0)
  const [activeDropdown,    setActiveDropdown]    = useState(null)
  const [mobileMenuOpen,    setMobileMenuOpen]    = useState(false)
  const [mobileToolsOpen,   setMobileToolsOpen]   = useState(false)
  const [expandedWeeks,     setExpandedWeeks]     = useState({})
  const [activeLessonTab,   setActiveLessonTab]   = useState('content')

  // ── Sidebar data ─────────────────────────────────────────────────────────
  const [announcements,     setAnnouncements]     = useState([])
  const [syllabus,          setSyllabus]          = useState([])
  const [modules,           setModules]           = useState([])
  const [grades,            setGrades]            = useState([])
  const [gradeSummary,      setGradeSummary]      = useState({ average:0, letter:'N/A' })
  const [people,            setPeople]            = useState([])
  const [materials,         setMaterials]         = useState([])
  const [materialFilter,    setMaterialFilter]    = useState('all')
  const [messages,          setMessages]          = useState([])
  const [unreadCount,       setUnreadCount]       = useState(0)
  const [calendarEvents,    setCalendarEvents]    = useState([])
  const [faqs,              setFaqs]              = useState([])
  const [courseResources,   setCourseResources]   = useState([])
  const [expandedFaqs,      setExpandedFaqs]      = useState({})
  const [searchPeople,      setSearchPeople]      = useState('')
  const [selectedMessage,   setSelectedMessage]   = useState(null)

  // ── Lesson content state ─────────────────────────────────────────────────
  const [resources,         setResources]         = useState([])
  const [lessonLinks,       setLessonLinks]       = useState([])
  const [discussions,       setDiscussions]       = useState([])
  const [newDiscussion,     setNewDiscussion]     = useState({ title:'', content:'' })
  const [showDiscussion,    setShowDiscussion]    = useState(false)
  const [assignmentSubmission,setAssignmentSubmission]=useState('')
  const [submission,        setSubmission]        = useState(null)
  const [submitLoading,     setSubmitLoading]     = useState(false)
  const [submitSuccess,     setSubmitSuccess]     = useState(false)

  // ── Notes state ──────────────────────────────────────────────────────────
  const [noteText,          setNoteText]          = useState('')
  const [noteSaved,         setNoteSaved]         = useState(false)

  // ── AI quiz state ─────────────────────────────────────────────────────────
  const [aiQuestions,       setAiQuestions]       = useState([])
  const [quizAnswers,       setQuizAnswers]       = useState({})
  const [quizResults,       setQuizResults]       = useState(null)
  const [quizScore,         setQuizScore]         = useState(0)
  const [quizStarted,       setQuizStarted]       = useState(false)

  // ── Mark complete animation ──────────────────────────────────────────────
  const [justCompleted,     setJustCompleted]     = useState(false)

  // ── Score panel + display settings overlay ────────────────────────────────
  const [showScorePanel,    setShowScorePanel]    = useState(false)
  const [showDisplaySettings, setShowDisplaySettings] = useState(false)
  const [displaySettings,   setDisplaySettings]   = useState({
    showTrackSize: true, showAreaNames: true, extendGridLines: false,
    showLineNames: false, showMiniMap: true, compactLessons: false,
  })
  const [quizHistory,       setQuizHistory]       = useState([])  // all quiz attempts this session
  const [mobileBottomTab,   setMobileBottomTab]   = useState('lessons') // lessons|content|tools|score

  // ── Load ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (courseId) {
      loadCourse()
      loadAnnouncements()
      loadSyllabus()
      loadModules()
      loadMaterials()
      loadMessages()
      loadCalendarEvents()
      loadFaqs()
      loadCourseResources()
    }
  }, [courseId])

  useEffect(() => {
    if (lessons.length > 0) {
      const init = {}
      Array.from(new Set(lessons.map(l => l.order_index))).forEach(w => { init[`w${w}`] = true })
      setExpandedWeeks(init)
    }
  }, [lessons])

  // ── Loaders ───────────────────────────────────────────────────────────────
  const loadCourse = async () => {
    try {
      setLoading(true)
      const { data:{ user }, error:uErr } = await supabase.auth.getUser()
      if (uErr) throw uErr
      if (!user) { navigate(`/login`, { state:{ from:`/test-course-player/${courseId}` } }); return }
      setUser(user)

      const { data:courseData, error:cErr } = await supabase.from('courses').select('*').eq('id', courseId).single()
      if (cErr) throw cErr
      setCourse(courseData)

      const { data:enrollment, error:eErr } = await supabase.from('enrollments').select('*').eq('user_id', user.id).eq('course_id', courseId)
      if (eErr) throw eErr
      if (!enrollment?.length) { setError('You are not enrolled in this course'); setLoading(false); return }

      const { data:lessonsData, error:lErr } = await supabase.from('lessons').select('*').eq('course_id', courseId).order('order_index', { ascending:true })
      if (lErr) throw lErr
      setLessons(lessonsData || [])

      if (lessonsData?.length) {
        const { data:prog } = await supabase.from('student_course_progress').select('last_lesson_id').eq('user_id', user.id).eq('course_id', courseId).maybeSingle()
        const first = prog?.last_lesson_id ? lessonsData.find(l => l.id === prog.last_lesson_id) || lessonsData[0] : lessonsData[0]
        setCurrentLesson(first)
        await loadLessonData(first.id, user)
      }

      const { data:completed } = await supabase.from('lesson_completion').select('lesson_id').eq('user_id', user.id)
      const ids = (completed || []).map(c => c.lesson_id)
      setCompletedLessons(ids)
      if (lessonsData?.length) setProgress(Math.round((ids.length / lessonsData.length) * 100))

      await loadGrades(user.id)
      await loadPeople()
    } catch(err) {
      console.error(err); setError(err.message)
    } finally { setLoading(false) }
  }

  const loadLessonData = async (lessonId, u = user) => {
    if (!lessonId || !u) return
    try {
      const [rRes, sRes, lRes, dRes] = await Promise.all([
        supabase.from('lesson_resources').select('*').eq('lesson_id', lessonId).order('order_index'),
        supabase.from('assignment_submissions').select('*').eq('user_id', u.id).eq('lesson_id', lessonId).maybeSingle(),
        supabase.from('lesson_links').select('*').eq('lesson_id', lessonId).order('order_index'),
        supabase.from('course_discussions').select('*, user:user_id(email)').eq('lesson_id', lessonId).order('created_at', { ascending:false }),
      ])
      setResources(rRes.data || [])
      setSubmission(sRes.data)
      if (sRes.data) setAssignmentSubmission(sRes.data.submission_text || '')
      setLessonLinks(lRes.data || [])
      setDiscussions(dRes.data || [])
    } catch(e) { console.error(e) }
  }

  const loadAnnouncements = async () => {
    const { data } = await supabase.from('course_announcements').select('*').eq('course_id', courseId).order('created_at', { ascending:false })
    setAnnouncements(data || [])
  }
  const loadSyllabus = async () => {
    const { data } = await supabase.from('course_syllabus').select('*').eq('course_id', courseId).order('week_number')
    setSyllabus(data || [])
  }
  const loadModules = async () => {
    const { data:mods } = await supabase.from('course_modules').select('*').eq('course_id', courseId).order('order_index')
    if (mods) {
      const withLessons = await Promise.all(mods.map(async m => {
        const { data:ml } = await supabase.from('module_lessons').select('lesson_id, order_index, lessons(*)').eq('module_id', m.id).order('order_index')
        return { ...m, lessons: (ml || []).map(x => x.lessons) }
      }))
      setModules(withLessons)
    }
  }
  const loadGrades = async (uid) => {
    const { data } = await supabase.from('course_grades').select('*').eq('user_id', uid || user?.id).eq('course_id', courseId).order('created_at', { ascending:false })
    if (data) {
      setGrades(data)
      const total = data.reduce((s,g) => s+(g.score||0), 0)
      const max   = data.reduce((s,g) => s+(g.max_score||100), 0)
      const avg   = max > 0 ? (total/max)*100 : 0
      const letter = avg>=90?'A':avg>=80?'B':avg>=70?'C':avg>=60?'D':avg>0?'F':'N/A'
      setGradeSummary({ average:Math.round(avg), letter })
    }
  }
  const loadPeople = async () => {
    const { data } = await supabase.from('course_people').select('*').eq('course_id', courseId)
    setPeople(data || [])
  }
  const loadMaterials = async () => {
    const { data } = await supabase.from('course_materials').select('*').eq('course_id', courseId).order('order_index')
    setMaterials(data || [])
  }
  const loadMessages = async () => {
    if (!user) return
    const { data } = await supabase.from('course_inbox').select('*, sender:sender_id(email)').eq('course_id', courseId).or(`receiver_id.eq.${user.id},sender_id.eq.${user.id}`).order('created_at', { ascending:false })
    setMessages(data || [])
    setUnreadCount((data || []).filter(m => !m.is_read && m.receiver_id === user.id).length)
  }
  const loadCalendarEvents = async () => {
    const { data } = await supabase.from('course_calendar').select('*').eq('course_id', courseId).order('start_time')
    setCalendarEvents(data || [])
  }
  const loadFaqs = async () => {
    const { data } = await supabase.from('course_faqs').select('*').eq('course_id', courseId).order('order_index')
    setFaqs(data || [])
  }
  const loadCourseResources = async () => {
    const { data } = await supabase.from('course_resources').select('*').eq('course_id', courseId).order('order_index')
    setCourseResources(data || [])
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleLessonChange = async (lesson) => {
    if (!lesson) return
    setCurrentLesson(lesson)
    setActiveLessonTab('content')
    setAssignmentSubmission(''); setSubmission(null)
    setAiQuestions([]); setQuizAnswers({}); setQuizResults(null); setQuizStarted(false)
    setShowDiscussion(false); setJustCompleted(false)
    await loadLessonData(lesson.id)
    await saveProgress(lesson.id)
    setMobileMenuOpen(false)
  }

  const saveProgress = async (lessonId) => {
    if (!user) return
    try {
      const { data:ex } = await supabase.from('student_course_progress').select('*').eq('user_id', user.id).eq('course_id', courseId).maybeSingle()
      const payload = { last_lesson_id:lessonId, last_accessed:new Date().toISOString(), completed_lessons:completedLessons.length, total_lessons:lessons.length }
      if (ex) await supabase.from('student_course_progress').update(payload).eq('id', ex.id)
      else     await supabase.from('student_course_progress').insert([{ user_id:user.id, course_id:courseId, ...payload }])
    } catch(e) { console.error(e) }
  }

  const markAsCompleted = async (lessonId) => {
    if (!user || completedLessons.includes(lessonId)) return
    try {
      await supabase.from('lesson_completion').insert([{ user_id:user.id, lesson_id:lessonId, completed_at:new Date().toISOString() }])
      const next = [...completedLessons, lessonId]
      setCompletedLessons(next)
      setProgress(Math.round((next.length / lessons.length) * 100))
      setJustCompleted(true)
      setTimeout(() => setJustCompleted(false), 3000)
      await saveProgress(currentLesson?.id)
    } catch(e) { console.error(e) }
  }

  const submitAssignment = async () => {
    if (!assignmentSubmission.trim()) return
    setSubmitLoading(true)
    try {
      if (submission) {
        await supabase.from('assignment_submissions').update({ submission_text:assignmentSubmission, status:'submitted', submitted_at:new Date().toISOString() }).eq('id', submission.id)
      } else {
        await supabase.from('assignment_submissions').insert([{ user_id:user.id, lesson_id:currentLesson.id, submission_text:assignmentSubmission, status:'submitted', submitted_at:new Date().toISOString() }])
      }
      setSubmitSuccess(true)
      setTimeout(() => setSubmitSuccess(false), 3000)
      await loadLessonData(currentLesson.id)
    } catch(e) { console.error(e) } finally { setSubmitLoading(false) }
  }

  const addDiscussion = async () => {
    if (!newDiscussion.title || !newDiscussion.content) return
    await supabase.from('course_discussions').insert([{ course_id:courseId, lesson_id:currentLesson?.id, user_id:user.id, title:newDiscussion.title, content:newDiscussion.content }])
    setNewDiscussion({ title:'', content:'' }); setShowDiscussion(false)
    await loadLessonData(currentLesson.id)
  }

  const markAsRead = async (msgId) => {
    await supabase.from('course_inbox').update({ is_read:true }).eq('id', msgId)
    loadMessages()
  }

  const downloadMaterial = (m) => { if (m.file_url) window.open(m.file_url, '_blank') }

  const startAIQuiz = () => {
    if (!currentLesson) return
    const qs = generateIKPACEQuiz(currentLesson)
    setAiQuestions(qs); setQuizAnswers({}); setQuizResults(null); setQuizStarted(true)
    setActiveLessonTab('quiz')
  }

  const submitAIQuiz = async () => {
    let score = 0
    const results = {}
    aiQuestions.forEach((q, i) => {
      const ok = quizAnswers[i] === q.correct
      if (ok) score++
      results[i] = { isCorrect:ok, explanation:q.explanation, correct:q.options[q.correct] }
    })
    setQuizScore(score)
    setQuizResults(results)
    // Track quiz history for score panel
    const pct = Math.round((score / aiQuestions.length) * 100)
    setQuizHistory(prev => [...prev, {
      lessonTitle: currentLesson?.title,
      score, total: aiQuestions.length, pct,
      passed: score >= Math.ceil(aiQuestions.length / 2),
      time: new Date().toLocaleTimeString('en', { hour:'2-digit', minute:'2-digit' })
    }])
    try {
      await supabase.from('quiz_attempts').insert([{ user_id:user.id, lesson_id:currentLesson.id, score:pct, passed:score>=Math.ceil(aiQuestions.length/2), completed_at:new Date().toISOString() }])
    } catch(e) {}
  }

  const saveNote = async () => {
    if (!noteText.trim()) return
    try {
      await supabase.from('notes').upsert({ user_id:user.id, lesson_id:currentLesson.id, content:noteText, updated_at:new Date().toISOString() }, { onConflict:'user_id,lesson_id' })
      setNoteSaved(true); setTimeout(() => setNoteSaved(false), 2500)
    } catch(e) {}
  }

  const toggleDropdown = (name) => setActiveDropdown(p => p === name ? null : name)
  const toggleFaq      = (id)   => setExpandedFaqs(p => ({ ...p, [id]:!p[id] }))

  // Helpers
  const getInitials = (email) => email ? email[0].toUpperCase() : '?'
  const fmtDate     = (d) => d ? new Date(d).toLocaleDateString('en-US', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) : ''
  const allLessons  = lessons
  const weekNums    = [...new Set(lessons.map(l => l.order_index))].sort((a,b) => a-b)

  // ── Loading ──────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:C.gray[50] }}>
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-xl font-black animate-pulse"
          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
        <div className="w-40 h-1.5 rounded-full overflow-hidden mx-auto" style={{ background:C.gray[200] }}>
          <div className="h-full rounded-full animate-pulse" style={{ width:'70%', background:`linear-gradient(90deg,${C.navy},${C.orange})` }}/>
        </div>
        <p className="mt-3 text-sm" style={{ color:C.gray[400] }}>Loading your course…</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background:C.gray[50] }}>
      <div className="max-w-sm w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <AlertCircle size={40} className="mx-auto mb-4" style={{ color:C.rose }}/>
        <h2 className="font-black text-lg mb-2" style={{ color:C.navy }}>Access Error</h2>
        <p className="text-sm mb-6" style={{ color:C.gray[500] }}>{error}</p>
        <button onClick={() => navigate('/dashboard')}
          className="w-full py-3 rounded-xl font-bold text-white" style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
          Go to Dashboard
        </button>
      </div>
    </div>
  )

  // ── Sidebar content renderer ──────────────────────────────────────────────
  const renderSidebarContent = (section) => {
    const box = 'p-4 space-y-2 max-h-72 overflow-y-auto'
    switch(section) {

      case 'modules': return (
        <div className={box}>
          {modules.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No modules yet</p>
            : modules.map(m => (
              <div key={m.id} className="rounded-xl overflow-hidden border" style={{ borderColor:C.gray[200] }}>
                <div className="p-2.5 text-xs font-bold" style={{ background:`${C.navy}08`, color:C.navy }}>
                  Week {m.week_number}: {m.title}
                </div>
                <div className="divide-y" style={{ borderColor:C.gray[100] }}>
                  {m.lessons.map(l => (
                    <button key={l.id} onClick={() => { handleLessonChange(l); setActiveDropdown(null) }}
                      className="w-full flex items-center gap-2 p-2.5 hover:bg-gray-50 text-left transition">
                      {completedLessons.includes(l.id)
                        ? <CheckCircle size={13} style={{ color:C.green, flexShrink:0 }}/>
                        : <Play size={13} style={{ color:C.gray[300], flexShrink:0 }}/>}
                      <span className="text-xs truncate" style={{ color:C.gray[700] }}>{l.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          }
        </div>
      )

      case 'announcements': return (
        <div className={box}>
          {announcements.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No announcements</p>
            : announcements.map(a => (
              <div key={a.id} className="p-3 rounded-xl" style={{
                background: a.priority==='high' ? `${C.rose}08` : `${C.navy}05`,
                borderLeft: `3px solid ${a.priority==='high' ? C.rose : C.navy}`
              }}>
                <p className="text-xs font-bold mb-1" style={{ color: a.priority==='high'?C.rose:C.navy }}>{a.title}</p>
                <p className="text-xs leading-relaxed" style={{ color:C.gray[600] }}>{a.content}</p>
                <p className="text-[10px] mt-1" style={{ color:C.gray[400] }}>{fmtDate(a.created_at)}</p>
              </div>
            ))
          }
        </div>
      )

      case 'syllabus': return (
        <div className={box}>
          {syllabus.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No syllabus available</p>
            : syllabus.map(item => (
              <div key={item.id} className="p-3 rounded-xl" style={{ background:C.gray[50], borderLeft:`3px solid ${C.navyMid}` }}>
                <p className="text-xs font-bold mb-1" style={{ color:C.navy }}>Week {item.week_number}: {item.title}</p>
                <p className="text-xs" style={{ color:C.gray[500] }}>{item.description}</p>
              </div>
            ))
          }
        </div>
      )

      case 'grades': return (
        <div className={box}>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="p-3 rounded-xl text-center" style={{ background:`${C.navy}08` }}>
              <p className="text-xl font-black" style={{ color:C.navy }}>{gradeSummary.average}%</p>
              <p className="text-[10px]" style={{ color:C.gray[400] }}>Average</p>
            </div>
            <div className="p-3 rounded-xl text-center" style={{ background:`${C.green}08` }}>
              <p className="text-xl font-black" style={{ color:C.green }}>{gradeSummary.letter}</p>
              <p className="text-[10px]" style={{ color:C.gray[400] }}>Grade</p>
            </div>
          </div>
          {grades.length === 0
            ? <p className="text-xs text-center py-2" style={{ color:C.gray[400] }}>No grades yet</p>
            : grades.slice(0,6).map(g => (
              <div key={g.id} className="flex justify-between items-center p-2.5 rounded-xl" style={{ background:C.gray[50] }}>
                <span className="text-xs truncate flex-1" style={{ color:C.gray[700] }}>{g.title}</span>
                <span className="text-xs font-black ml-2" style={{ color:C.navy }}>{g.score}/{g.max_score}</span>
              </div>
            ))
          }
        </div>
      )

      case 'people': return (
        <div className={box}>
          <div className="relative mb-2">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color:C.gray[400] }}/>
            <input value={searchPeople} onChange={e => setSearchPeople(e.target.value)}
              placeholder="Search members…"
              className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
              style={{ background:C.gray[100], border:`1px solid ${C.gray[200]}`, color:C.gray[800] }}/>
          </div>
          {people.filter(p => (p.user_id||'').toLowerCase().includes(searchPeople.toLowerCase())).slice(0,8).map(p => (
            <div key={p.id} className="flex items-center gap-2.5 p-2.5 rounded-xl" style={{ background:C.gray[50] }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[10px] font-black" style={{ background:C.navy }}>
                {(p.user_id||'?')[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate" style={{ color:C.gray[700] }}>ID: {(p.user_id||'').slice(0,10)}…</p>
                <p className="text-[10px] capitalize" style={{ color:C.gray[400] }}>{p.role || 'student'}</p>
              </div>
            </div>
          ))}
          {people.length === 0 && <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No members found</p>}
        </div>
      )

      case 'materials': return (
        <div className={box}>
          <div className="flex gap-1.5 mb-2 flex-wrap">
            {['all','pdf','video','link'].map(f => (
              <button key={f} onClick={() => setMaterialFilter(f)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition"
                style={{ background: materialFilter===f ? C.navy : C.gray[100], color: materialFilter===f ? '#fff' : C.gray[500] }}>
                {f.toUpperCase()}
              </button>
            ))}
          </div>
          {(materialFilter==='all' ? materials : materials.filter(m => m.material_type===materialFilter)).slice(0,6).map(m => (
            <div key={m.id} className="flex items-center justify-between p-2.5 rounded-xl" style={{ background:C.gray[50] }}>
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {m.material_type==='pdf'   && <FileText size={13} style={{ color:C.rose, flexShrink:0 }}/>}
                {m.material_type==='video' && <Video    size={13} style={{ color:C.navy, flexShrink:0 }}/>}
                {m.material_type==='link'  && <LinkIcon size={13} style={{ color:C.green,flexShrink:0 }}/>}
                <span className="text-xs truncate" style={{ color:C.gray[700] }}>{m.title}</span>
              </div>
              <button onClick={() => downloadMaterial(m)} className="p-1.5 rounded-lg hover:bg-gray-200 transition flex-shrink-0">
                <Download size={12} style={{ color:C.navy }}/>
              </button>
            </div>
          ))}
          {materials.length === 0 && <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No materials yet</p>}
        </div>
      )

      case 'inbox': return (
        <div className={box}>
          {messages.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>Inbox is empty</p>
            : messages.slice(0,6).map(msg => (
              <button key={msg.id} onClick={() => { setSelectedMessage(msg); if (!msg.is_read && msg.receiver_id===user?.id) markAsRead(msg.id) }}
                className="w-full text-left p-2.5 rounded-xl transition hover:bg-gray-100"
                style={{ background: !msg.is_read && msg.receiver_id===user?.id ? `${C.navy}08` : C.gray[50] }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold truncate flex-1" style={{ color:C.navy }}>{msg.subject}</span>
                  {!msg.is_read && msg.receiver_id===user?.id && <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:C.orange }}/>}
                </div>
                <p className="text-[10px] truncate mt-0.5" style={{ color:C.gray[400] }}>{msg.message}</p>
              </button>
            ))
          }
          {selectedMessage && (
            <div className="mt-2 p-3 rounded-xl border" style={{ borderColor:C.gray[200] }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold" style={{ color:C.navy }}>{selectedMessage.subject}</p>
                <button onClick={() => setSelectedMessage(null)}><X size={13} style={{ color:C.gray[400] }}/></button>
              </div>
              <p className="text-xs" style={{ color:C.gray[600] }}>{selectedMessage.message}</p>
            </div>
          )}
        </div>
      )

      case 'calendar': return (
        <div className={box}>
          {calendarEvents.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No upcoming events</p>
            : calendarEvents.slice(0,5).map(ev => (
              <div key={ev.id} className="p-3 rounded-xl" style={{ background:`${C.navy}05`, borderLeft:`3px solid ${C.navy}` }}>
                <p className="text-xs font-bold" style={{ color:C.navy }}>{ev.title}</p>
                <p className="text-[10px] mt-1" style={{ color:C.gray[400] }}>{fmtDate(ev.start_time)}</p>
                {ev.event_type && <span className="text-[10px] capitalize" style={{ color:C.orange }}>{ev.event_type.replace('_',' ')}</span>}
              </div>
            ))
          }
        </div>
      )

      case 'faqs': return (
        <div className={box}>
          {faqs.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No FAQs yet</p>
            : faqs.map(faq => (
              <div key={faq.id} className="rounded-xl overflow-hidden border" style={{ borderColor:C.gray[200] }}>
                <button onClick={() => toggleFaq(faq.id)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 transition">
                  <span className="text-xs font-semibold pr-2" style={{ color:C.navy }}>{faq.question}</span>
                  {expandedFaqs[faq.id] ? <ChevronUp size={13} style={{ color:C.gray[400], flexShrink:0 }}/> : <ChevronDown size={13} style={{ color:C.gray[400], flexShrink:0 }}/>}
                </button>
                {expandedFaqs[faq.id] && (
                  <div className="px-3 pb-3">
                    <p className="text-xs leading-relaxed" style={{ color:C.gray[600] }}>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      )

      case 'resources': return (
        <div className={box}>
          {courseResources.length === 0
            ? <p className="text-xs text-center py-4" style={{ color:C.gray[400] }}>No resources yet</p>
            : courseResources.map(r => (
              <div key={r.id} className="p-3 rounded-xl" style={{ background:C.gray[50] }}>
                <p className="text-xs font-bold mb-1" style={{ color:C.navy }}>{r.title}</p>
                <p className="text-[10px] mb-1.5" style={{ color:C.gray[500] }}>{r.description}</p>
                {r.url && <a href={r.url} target="_blank" rel="noopener noreferrer"
                  className="text-[10px] font-bold flex items-center gap-1" style={{ color:C.orange }}>
                  View Resource <ExternalLink size={10}/>
                </a>}
              </div>
            ))
          }
        </div>
      )

      default: return null
    }
  }

  // ── Sidebar tool list ─────────────────────────────────────────────────────
  const tools = [
    { id:'modules',       icon:Grid,        label:'Modules',        color:C.navy,   badge:0 },
    { id:'announcements', icon:Bell,        label:'Announcements',  color:C.orange, badge:announcements.length },
    { id:'syllabus',      icon:BookOpen,    label:'Syllabus',       color:C.green,  badge:0 },
    { id:'grades',        icon:Award,       label:'Grades',         color:C.amber,  badge:0 },
    { id:'people',        icon:Users,       label:'People',         color:C.purple, badge:0 },
    { id:'materials',     icon:FileText,    label:'Materials',      color:C.rose,   badge:0 },
    { id:'inbox',         icon:Mail,        label:'Inbox',          color:C.navy,   badge:unreadCount },
    { id:'calendar',      icon:Calendar,    label:'Calendar',       color:C.teal,   badge:0 },
    { id:'faqs',          icon:HelpCircle,  label:'FAQs',           color:C.purple, badge:0 },
    { id:'resources',     icon:LinkIcon,    label:'Resources',      color:C.teal,   badge:0 },
  ]

  // ── Lesson tabs ───────────────────────────────────────────────────────────
  const lessonTabs = [
    { id:'content',    emoji:'📖', label:'Content'    },
    { id:'resources',  emoji:'📥', label:'Resources'  },
    { id:'notes',      emoji:'📝', label:'Notes'      },
    { id:'discussion', emoji:'💬', label:'Discussion' },
    { id:'quiz',       emoji:'🎯', label:'iKPACE Quiz' },
    ...(currentLesson?.assignment ? [{ id:'assignment', emoji:'✍️', label:'Assignment' }] : []),
  ]

  return (
    <div className="min-h-screen flex flex-col" style={{ background:C.gray[50] }}>

      {/* ══ STICKY HEADER ════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-30 bg-white shadow-sm"
        style={{ borderBottom:`1px solid ${C.gray[200]}` }}>
        <div className="flex items-center justify-between px-4 py-3 gap-3">

          {/* Left: mobile menu + title */}
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition flex-shrink-0">
              <Menu size={20} style={{ color:C.navy }}/>
            </button>
            <Link to="/dashboard" className="hidden sm:flex items-center gap-1.5 flex-shrink-0 text-xs font-semibold hover:opacity-70 transition" style={{ color:C.gray[500] }}>
              <ChevronLeft size={14}/> Dashboard
            </Link>
            <div className="min-w-0 flex-1">
              <h1 className="font-black text-sm truncate" style={{ color:C.navy }}>{course?.title}</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background:C.gray[200], maxWidth:'80px' }}>
                  <div className="h-full rounded-full transition-all" style={{ width:`${progress}%`, background:`linear-gradient(90deg,${C.navy},${C.orange})` }}/>
                </div>
                <span className="text-[10px] font-bold" style={{ color:C.orange }}>{progress}%</span>
              </div>
            </div>
          </div>

          {/* Right: AI quiz + score + settings + avatar */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={startAIQuiz}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white transition hover:shadow-lg"
              style={{ background:`linear-gradient(135deg,${C.purple},${C.navyMid})` }}>
              <Brain size={13}/> AI Quiz
            </button>
            {/* Score button */}
            <button onClick={() => setShowScorePanel(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition hover:shadow-md"
              style={{ background:`${C.orange}12`, color:C.orange, border:`1px solid ${C.orange}30` }}>
              <Trophy size={13}/> {progress}%
            </button>
            {/* Display settings */}
            <button onClick={() => setShowDisplaySettings(true)}
              className="hidden sm:flex p-2 rounded-xl hover:bg-gray-100 transition" title="Display Settings">
              <Settings size={16} style={{ color:C.gray[400] }}/>
            </button>
            <button onClick={() => setMobileToolsOpen(true)}
              className="lg:hidden relative p-2 rounded-xl hover:bg-gray-100 transition">
              <LayoutGrid size={20} style={{ color:C.navy }}/>
              {(announcements.length + unreadCount) > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background:C.rose }}/>
              )}
            </button>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
              style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
              {getInitials(user?.email)}
            </div>
          </div>
        </div>

        {/* Progress bar at header bottom */}
        <div className="h-0.5" style={{ background:`linear-gradient(90deg,${C.navy},${C.orange})`, width:`${progress}%`, transition:'width .5s' }}/>
      </header>

      {/* ══ MOBILE LESSONS DRAWER ════════════════════════════════════════════ */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}/>
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl overflow-y-auto flex flex-col">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between" style={{ borderColor:C.gray[200] }}>
              <div>
                <p className="font-black text-sm" style={{ color:C.navy }}>Lessons</p>
                <p className="text-[10px]" style={{ color:C.gray[400] }}>{completedLessons.length}/{lessons.length} completed</p>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={18} style={{ color:C.gray[500] }}/>
              </button>
            </div>
            {/* Progress ring */}
            <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor:C.gray[100] }}>
              <div className="relative">
                <ProgressRing pct={progress} size={52} stroke={4} color={C.orange}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black" style={{ color:C.orange }}>{progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold" style={{ color:C.navy }}>Your Progress</p>
                <p className="text-[10px]" style={{ color:C.gray[400] }}>{lessons.length - completedLessons.length} lessons left</p>
              </div>
            </div>
            <div className="p-3 flex-1">
              {weekNums.map(w => {
                const wLessons = lessons.filter(l => l.order_index === w)
                const allDone  = wLessons.every(l => completedLessons.includes(l.id))
                const open     = expandedWeeks[`w${w}`] !== false
                return (
                  <div key={w} className="mb-2 rounded-2xl overflow-hidden border" style={{ borderColor:C.gray[200] }}>
                    <button onClick={() => setExpandedWeeks(p => ({ ...p, [`w${w}`]:!p[`w${w}`] }))}
                      className="w-full flex items-center justify-between p-3 transition hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-black"
                          style={{ background: allDone ? C.green : `linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                          {allDone ? <Check size={13}/> : w}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-bold" style={{ color:C.navy }}>Week {w}</p>
                          <p className="text-[10px]" style={{ color:C.gray[400] }}>
                            {wLessons.filter(l => completedLessons.includes(l.id)).length}/{wLessons.length} done
                          </p>
                        </div>
                      </div>
                      {open ? <ChevronUp size={14} style={{ color:C.gray[400] }}/> : <ChevronDown size={14} style={{ color:C.gray[400] }}/>}
                    </button>
                    {open && wLessons.map(lesson => (
                      <button key={lesson.id} onClick={() => handleLessonChange(lesson)}
                        className="w-full flex items-center gap-2.5 px-3 py-2.5 border-t text-left transition hover:bg-gray-50"
                        style={{ borderColor:C.gray[100], background: currentLesson?.id===lesson.id ? `${C.navy}08` : 'transparent' }}>
                        {completedLessons.includes(lesson.id)
                          ? <CheckCircle size={14} style={{ color:C.green, flexShrink:0 }}/>
                          : <div className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0" style={{ borderColor:C.gray[300] }}/>}
                        <span className="text-xs truncate font-medium" style={{ color: currentLesson?.id===lesson.id ? C.navy : C.gray[700] }}>
                          {lesson.title}
                        </span>
                        {currentLesson?.id===lesson.id && <div className="w-1.5 h-1.5 rounded-full ml-auto flex-shrink-0" style={{ background:C.orange }}/>}
                      </button>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE TOOLS DRAWER ══════════════════════════════════════════════ */}
      {mobileToolsOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileToolsOpen(false)}/>
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto flex flex-col">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between" style={{ borderColor:C.gray[200] }}>
              <p className="font-black text-sm" style={{ color:C.navy }}>Course Tools</p>
              <button onClick={() => setMobileToolsOpen(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={18} style={{ color:C.gray[500] }}/>
              </button>
            </div>
            <div className="divide-y" style={{ borderColor:C.gray[100] }}>
              {tools.map(t => (
                <ToolRow key={t.id} icon={t.icon} label={t.label} color={t.color} badge={t.badge}
                  active={activeDropdown===t.id}
                  onClick={() => toggleDropdown(t.id)}>
                  {renderSidebarContent(t.id)}
                </ToolRow>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ MAIN 3-COLUMN LAYOUT ════════════════════════════════════════════ */}
      <div className="flex flex-1 max-w-full overflow-hidden">

        {/* ── LEFT SIDEBAR: Lesson List (desktop) ───────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto bg-white border-r"
          style={{ borderColor:C.gray[200] }}>
          {/* Progress summary */}
          <div className="p-4 border-b" style={{ borderColor:C.gray[100] }}>
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <ProgressRing pct={progress} size={52} stroke={4} color={C.orange}/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[10px] font-black" style={{ color:C.orange }}>{progress}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-black" style={{ color:C.navy }}>Course Progress</p>
                <p className="text-[10px]" style={{ color:C.gray[400] }}>{completedLessons.length} of {lessons.length} done</p>
              </div>
            </div>
          </div>

          {/* Lesson list */}
          <div className="flex-1 p-3">
            <p className="text-[10px] font-black uppercase tracking-widest mb-3 px-1" style={{ color:C.gray[400] }}>Lessons</p>
            {weekNums.map(w => {
              const wLessons = lessons.filter(l => l.order_index === w)
              const allDone  = wLessons.every(l => completedLessons.includes(l.id))
              const open     = expandedWeeks[`w${w}`] !== false
              return (
                <div key={w} className="mb-2 rounded-2xl overflow-hidden border" style={{ borderColor:C.gray[200] }}>
                  <button onClick={() => setExpandedWeeks(p => ({ ...p, [`w${w}`]:!p[`w${w}`] }))}
                    className="w-full flex items-center justify-between p-2.5 transition hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px] font-black"
                        style={{ background: allDone ? C.green : `linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                        {allDone ? <Check size={11}/> : w}
                      </div>
                      <div>
                        <p className="text-[11px] font-bold" style={{ color:C.navy }}>Week {w}</p>
                        <p className="text-[9px]" style={{ color:C.gray[400] }}>
                          {wLessons.filter(l=>completedLessons.includes(l.id)).length}/{wLessons.length}
                        </p>
                      </div>
                    </div>
                    {open ? <ChevronUp size={12} style={{ color:C.gray[400] }}/> : <ChevronDown size={12} style={{ color:C.gray[400] }}/>}
                  </button>
                  {open && wLessons.map(lesson => (
                    <button key={lesson.id} onClick={() => handleLessonChange(lesson)}
                      className="w-full flex items-center gap-2 px-2.5 py-2 border-t text-left transition hover:bg-gray-50"
                      style={{ borderColor:C.gray[100], background: currentLesson?.id===lesson.id ? `${C.navy}08` : 'transparent' }}>
                      {completedLessons.includes(lesson.id)
                        ? <CheckCircle size={12} style={{ color:C.green, flexShrink:0 }}/>
                        : <div className="w-3 h-3 rounded-full border-2 flex-shrink-0" style={{ borderColor:C.gray[300] }}/>}
                      <span className="text-[11px] truncate flex-1" style={{ color: currentLesson?.id===lesson.id?C.navy:C.gray[700], fontWeight: currentLesson?.id===lesson.id?700:400 }}>
                        {lesson.title}
                      </span>
                      {currentLesson?.id===lesson.id && <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:C.orange }}/>}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </aside>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 pb-28 lg:pb-6 overflow-y-auto">
          {currentLesson ? (
            <div>
              {/* Lesson header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-3 py-1 rounded-full font-bold text-white" style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                      Week {currentLesson.order_index}
                    </span>
                    {completedLessons.includes(currentLesson.id) && (
                      <span className="text-xs px-3 py-1 rounded-full font-bold text-white flex items-center gap-1" style={{ background:C.green }}>
                        <CheckCircle size={11}/> Completed
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black leading-tight" style={{ color:C.navy }}>{currentLesson.title}</h2>
                </div>
                <button onClick={startAIQuiz}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0 sm:hidden"
                  style={{ background:`linear-gradient(135deg,${C.purple},${C.navyMid})` }}>
                  <Brain size={13}/> Quiz
                </button>
              </div>

              {/* Just completed banner */}
              {justCompleted && (
                <div className="mb-4 p-4 rounded-2xl flex items-center gap-3 text-white"
                  style={{ background:`linear-gradient(135deg,${C.green},${C.teal})` }}>
                  <Trophy size={22}/>
                  <div>
                    <p className="font-black text-sm">Lesson Completed! 🎉</p>
                    <p className="text-xs opacity-80">Great work! Keep going — you're making progress.</p>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="border-b mb-5 overflow-x-auto" style={{ borderColor:C.gray[200] }}>
                <nav className="flex gap-1 min-w-max pb-0">
                  {lessonTabs.map(tab => (
                    <button key={tab.id} onClick={() => setActiveLessonTab(tab.id)}
                      className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all"
                      style={{
                        borderBottomColor: activeLessonTab===tab.id ? C.orange : 'transparent',
                        color: activeLessonTab===tab.id ? C.navy : C.gray[400]
                      }}>
                      <span>{tab.emoji}</span>{tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* ── CONTENT TAB ──────────────────────────────────────────── */}
              {activeLessonTab === 'content' && (
                <div>
                  {/* Video */}
                  {currentLesson.video_url && (
                    <div className="mb-5 rounded-2xl overflow-hidden shadow-lg aspect-video">
                      <iframe src={currentLesson.video_url} title={currentLesson.title}
                        className="w-full h-full" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen/>
                    </div>
                  )}

                  {/* Image — always show if exists (with or without video) */}
                  {currentLesson.image_url && (
                    <div className="mb-5 rounded-2xl overflow-hidden shadow-md border" style={{ borderColor:C.gray[200] }}>
                      <img src={currentLesson.image_url} alt={currentLesson.title}
                        className="w-full object-cover" style={{ maxHeight:'400px' }}
                        onError={e => { e.target.style.display='none' }}/>
                    </div>
                  )}

                  {/* Placeholder: only if neither video nor image */}
                  {!currentLesson.video_url && !currentLesson.image_url && (
                    <div className="mb-5 rounded-2xl flex items-center justify-center h-48"
                      style={{ background:`linear-gradient(135deg,${C.navy}08,${C.navyMid}08)`, border:`1px dashed ${C.gray[300]}` }}>
                      <div className="text-center">
                        <Video size={28} className="mx-auto mb-2" style={{ color:C.gray[300] }}/>
                        <p className="text-sm" style={{ color:C.gray[400] }}>Video or image will appear here once added by instructor</p>
                      </div>
                    </div>
                  )}

                  {/* ── CONTENT LINK — shown as a prominent button when set ── */}
                  {currentLesson.content_link && (
                    <div className="mb-5 rounded-2xl overflow-hidden shadow-md"
                      style={{ border:`2px solid ${C.orange}30`, background:`${C.orange}06` }}>
                      <div className="px-5 py-3 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ background:`${C.orange}15` }}>
                            <ExternalLink size={18} style={{ color:C.orange }}/>
                          </div>
                          <div className="min-w-0">
                            <p className="font-black text-sm" style={{ color:C.navy }}>Lesson Activity Link</p>
                            <p className="text-xs truncate" style={{ color:C.gray[400] }}>{currentLesson.content_link}</p>
                          </div>
                        </div>
                        <a href={currentLesson.content_link} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black text-white hover:opacity-90 hover:shadow-md transition-all flex-shrink-0"
                          style={{ background:`linear-gradient(135deg,${C.orange},${C.amber})` }}>
                          Open Activity <ArrowRight size={14}/>
                        </a>
                      </div>
                      <div className="px-5 pb-3">
                        <p className="text-[11px]" style={{ color:C.gray[400] }}>
                          Click to open this lesson's activity, form, or exercise in a new tab.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Description (short summary) */}
                  {currentLesson.description && (
                    <div className="mb-4 p-4 rounded-2xl flex items-start gap-3"
                      style={{ background:`${C.navy}06`, border:`1px solid ${C.navy}12` }}>
                      <Info size={15} style={{ color:C.navy, flexShrink:0, marginTop:1 }}/>
                      <p className="text-sm leading-relaxed" style={{ color:C.gray[700] }}>{currentLesson.description}</p>
                    </div>
                  )}

                  {/* Lesson content body */}
                  <div className="rounded-2xl p-5 sm:p-6" style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                    {currentLesson.lesson_content ? (
                      <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color:C.gray[700] }}>
                        {currentLesson.lesson_content}
                      </p>
                    ) : (
                      <p className="text-sm text-center py-4" style={{ color:C.gray[400] }}>
                        Lesson content will appear here once added by the instructor.
                      </p>
                    )}
                  </div>

                  {/* Duration badge if set */}
                  {currentLesson.duration_minutes && (
                    <div className="mt-3 flex items-center gap-2">
                      <Clock size={12} style={{ color:C.gray[400] }}/>
                      <span className="text-xs" style={{ color:C.gray[400] }}>Estimated time: {currentLesson.duration_minutes} min</span>
                    </div>
                  )}
                </div>
              )}

              {/* ── RESOURCES TAB ─────────────────────────────────────────── */}
              {activeLessonTab === 'resources' && (
                <div className="space-y-3">
                  {[...resources, ...lessonLinks].length === 0 && (
                    <div className="text-center py-12 rounded-2xl" style={{ background:C.gray[50] }}>
                      <Download size={32} className="mx-auto mb-2" style={{ color:C.gray[300] }}/>
                      <p className="text-sm" style={{ color:C.gray[400] }}>No resources for this lesson yet.</p>
                    </div>
                  )}
                  {resources.map(r => (
                    <div key={r.id} className="bg-white rounded-2xl p-4 flex items-center gap-4" style={{ border:`1px solid ${C.gray[200]}` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${C.navy}10` }}>
                        <FileText size={18} style={{ color:C.navy }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color:C.navy }}>{r.title}</p>
                        <p className="text-xs" style={{ color:C.gray[400] }}>{r.description}</p>
                      </div>
                      <button onClick={() => r.file_url && window.open(r.file_url,'_blank')}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0"
                        style={{ background:C.navy }}>
                        <Download size={12}/> Get
                      </button>
                    </div>
                  ))}
                  {lessonLinks.map(l => (
                    <div key={l.id} className="bg-white rounded-2xl p-4 flex items-center gap-4" style={{ border:`1px solid ${C.gray[200]}` }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background:`${C.green}12` }}>
                        <ExternalLink size={18} style={{ color:C.green }}/>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate" style={{ color:C.navy }}>{l.title}</p>
                        <p className="text-xs" style={{ color:C.gray[400] }}>{l.description}</p>
                      </div>
                      <a href={l.url} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white flex-shrink-0"
                        style={{ background:C.green }}>
                        Visit <ArrowRight size={12}/>
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {/* ── NOTES TAB ─────────────────────────────────────────────── */}
              {activeLessonTab === 'notes' && (
                <div>
                  <div className="bg-white rounded-2xl p-5 mb-4" style={{ border:`1px solid ${C.gray[200]}` }}>
                    <div className="flex items-center gap-2 mb-3">
                      <StickyNote size={16} style={{ color:C.yellow }}/>
                      <p className="font-bold text-sm" style={{ color:C.navy }}>My Notes — Week {currentLesson.order_index}: {currentLesson.title}</p>
                    </div>
                    <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={7}
                      placeholder="Write your notes here… Key concepts, takeaways, questions…"
                      className="w-full rounded-xl p-4 text-sm outline-none resize-none"
                      style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}`, color:C.gray[800] }}/>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-xs" style={{ color:C.gray[400] }}>Your notes are saved per lesson.</p>
                      <button onClick={saveNote}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition"
                        style={{ background: noteSaved ? C.green : C.navy }}>
                        {noteSaved ? <><Check size={12}/> Saved!</> : <><StickyNote size={12}/> Save Notes</>}
                      </button>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background:`${C.yellow}12`, border:`1px solid ${C.yellow}25` }}>
                    <p className="text-xs font-bold mb-1" style={{ color:C.amber }}>💡 Tip</p>
                    <p className="text-xs" style={{ color:C.gray[600] }}>Write notes in your own words. Teaching back what you learned is one of the fastest ways to remember it.</p>
                  </div>
                </div>
              )}

              {/* ── DISCUSSION TAB ────────────────────────────────────────── */}
              {activeLessonTab === 'discussion' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-bold" style={{ color:C.navy }}>{discussions.length} discussion{discussions.length!==1?'s':''}</p>
                    <button onClick={() => setShowDiscussion(s=>!s)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                      style={{ background:C.navy }}>
                      <Plus size={13}/> New Post
                    </button>
                  </div>
                  {showDiscussion && (
                    <div className="bg-white rounded-2xl p-4 mb-4" style={{ border:`1px solid ${C.gray[200]}` }}>
                      <input type="text" placeholder="Post title…" value={newDiscussion.title}
                        onChange={e => setNewDiscussion(p=>({...p,title:e.target.value}))}
                        className="w-full rounded-xl p-3 text-sm mb-2 outline-none"
                        style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}`, color:C.gray[800] }}/>
                      <textarea placeholder="Share your thoughts, questions, or key insights…" rows={3}
                        value={newDiscussion.content} onChange={e => setNewDiscussion(p=>({...p,content:e.target.value}))}
                        className="w-full rounded-xl p-3 text-sm outline-none resize-none mb-3"
                        style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}`, color:C.gray[800] }}/>
                      <div className="flex gap-2">
                        <button onClick={addDiscussion}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white"
                          style={{ background:C.green }}><Send size={12}/> Post</button>
                        <button onClick={() => setShowDiscussion(false)}
                          className="px-4 py-2 rounded-xl text-xs font-bold"
                          style={{ background:C.gray[100], color:C.gray[600] }}>Cancel</button>
                      </div>
                    </div>
                  )}
                  {discussions.length === 0 && !showDiscussion && (
                    <div className="text-center py-12 rounded-2xl" style={{ background:C.gray[50] }}>
                      <MessageSquare size={32} className="mx-auto mb-2" style={{ color:C.gray[300] }}/>
                      <p className="text-sm" style={{ color:C.gray[400] }}>No discussions yet. Start the conversation!</p>
                    </div>
                  )}
                  {discussions.map(d => (
                    <div key={d.id} className="bg-white rounded-2xl p-4 mb-3" style={{ border:`1px solid ${C.gray[200]}` }}>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0" style={{ background:C.navy }}>
                          {getInitials(d.user?.email)}
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm" style={{ color:C.navy }}>{d.title}</p>
                          <p className="text-xs mt-0.5" style={{ color:C.gray[400] }}>{d.user?.email}</p>
                          <p className="text-sm mt-2 leading-relaxed" style={{ color:C.gray[600] }}>{d.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* ── iKPACE QUIZ TAB ──────────────────────────────────────────── */}
              {activeLessonTab === 'quiz' && (
                <div>
                  {/* Start screen */}
                  {!quizStarted && !aiQuestions.length && (
                    <div className="rounded-3xl overflow-hidden shadow-lg">
                      <div className="p-8 text-center text-white relative overflow-hidden"
                        style={{ background:`linear-gradient(145deg,${C.navyDark},${C.navy})` }}>
                        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 bg-white"/>
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10 blur-2xl" style={{ background:C.orange }}/>
                        <div className="relative z-10">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4 shadow-lg"
                            style={{ background:`linear-gradient(135deg,${C.orange},${C.orangeLight})` }}>iK</div>
                          <p className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-50">iKPACE Learning</p>
                          <h3 className="font-black text-2xl mb-2">iKPACE Powered Quiz</h3>
                          <p className="text-white/60 text-sm mb-1">Topic: <span className="text-white font-bold">{currentLesson.title}</span></p>
                          <p className="text-white/40 text-xs">Week {currentLesson.order_index} · 4 Questions · Instant Results</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 p-5 bg-white">
                        {[
                          { emoji:'📚', label:'Topic-specific',  sub:'Matched to this exact lesson' },
                          { emoji:'⚡', label:'Instant results', sub:'See score immediately'          },
                          { emoji:'🏆', label:'Tracked',         sub:'Saved to your record'          },
                        ].map((c,i) => (
                          <div key={i} className="rounded-2xl p-3 text-center" style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                            <span className="text-2xl">{c.emoji}</span>
                            <p className="text-xs font-black mt-1.5" style={{ color:C.navy }}>{c.label}</p>
                            <p className="text-[10px] mt-0.5 leading-tight" style={{ color:C.gray[400] }}>{c.sub}</p>
                          </div>
                        ))}
                      </div>
                      <div className="px-5 pb-5 bg-white">
                        <button onClick={startAIQuiz}
                          className="w-full py-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 hover:shadow-xl transition-all hover:-translate-y-0.5"
                          style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                          <Target size={16}/> Start iKPACE Quiz
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Questions */}
                  {aiQuestions.length > 0 && !quizResults && (
                    <div>
                      {/* Quiz brand header */}
                      <div className="flex items-center justify-between p-4 rounded-2xl mb-5"
                        style={{ background:`linear-gradient(135deg,${C.navy}0d,${C.orange}0a)`, border:`1px solid ${C.navy}18` }}>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-xs"
                            style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>iK</div>
                          <div>
                            <p className="font-black text-sm" style={{ color:C.navy }}>iKPACE Quiz</p>
                            <p className="text-[10px]" style={{ color:C.gray[400] }}>Week {currentLesson.order_index}: {currentLesson.title}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-lg" style={{ color:C.orange }}>
                            {Object.keys(quizAnswers).length}<span className="text-xs text-gray-400 font-normal">/{aiQuestions.length}</span>
                          </p>
                          <p className="text-[10px]" style={{ color:C.gray[400] }}>answered</p>
                        </div>
                      </div>

                      {aiQuestions.map((q, i) => (
                        <div key={q.id} className="bg-white rounded-2xl p-5 mb-4 shadow-sm"
                          style={{ border:`1px solid ${quizAnswers[i]!==undefined ? C.navy+'30' : C.gray[200]}` }}>
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0 shadow-sm"
                              style={{ background: quizAnswers[i]!==undefined ? `linear-gradient(135deg,${C.navy},${C.orange})` : C.gray[300] }}>
                              {i+1}
                            </div>
                            <p className="font-bold text-sm leading-relaxed" style={{ color:C.navy }}>{q.question}</p>
                          </div>
                          <div className="space-y-2 ml-10">
                            {q.options.map((opt, oi) => (
                              <label key={oi}
                                className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                                style={{
                                  background: quizAnswers[i]===oi ? `${C.navy}10` : C.gray[50],
                                  border:`2px solid ${quizAnswers[i]===oi ? C.navy : C.gray[200]}`
                                }}>
                                <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all"
                                  style={{ borderColor: quizAnswers[i]===oi ? C.navy : C.gray[300], background: quizAnswers[i]===oi ? C.navy : 'transparent' }}>
                                  {quizAnswers[i]===oi && <div className="w-2 h-2 rounded-full bg-white"/>}
                                </div>
                                <input type="radio" name={`q${i}`} value={oi}
                                  checked={quizAnswers[i]===oi}
                                  onChange={() => setQuizAnswers(p=>({...p,[i]:oi}))}
                                  className="sr-only"/>
                                <span className="text-sm" style={{ color:C.gray[700] }}>{opt}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}

                      <button onClick={submitAIQuiz}
                        disabled={Object.keys(quizAnswers).length < aiQuestions.length}
                        className="w-full py-4 rounded-2xl font-black text-sm text-white transition-all disabled:opacity-40 flex items-center justify-center gap-2 hover:shadow-xl hover:-translate-y-0.5"
                        style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                        <Trophy size={16}/>
                        Submit iKPACE Quiz — {Object.keys(quizAnswers).length}/{aiQuestions.length} Answered
                      </button>
                    </div>
                  )}

                  {/* Results */}
                  {quizResults && (
                    <div>
                      <div className="rounded-3xl overflow-hidden mb-5 shadow-lg"
                        style={{ background:`linear-gradient(145deg,${C.navyDark},${C.navy})` }}>
                        <div className="p-6 text-center text-white relative overflow-hidden">
                          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full opacity-10 bg-white"/>
                          <div className="relative z-10">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-3">iKPACE Powered Quiz — Result</p>
                            <div className="text-5xl mb-3">{quizScore===aiQuestions.length?'🌟':quizScore>=Math.ceil(aiQuestions.length/2)?'🎉':'📚'}</div>
                            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 border-4"
                              style={{ borderColor: quizScore===aiQuestions.length?C.yellow:quizScore>=Math.ceil(aiQuestions.length/2)?C.green:C.rose }}>
                              <p className="text-xl font-black">{quizScore}/{aiQuestions.length}</p>
                            </div>
                            <p className="font-black text-xl mb-1">{Math.round((quizScore/aiQuestions.length)*100)}%</p>
                            <p className="text-sm font-bold mb-1" style={{ color: quizScore>=Math.ceil(aiQuestions.length/2)?'#86efac':'#fca5a5' }}>
                              {quizScore===aiQuestions.length?'🌟 Perfect Score!':quizScore>=Math.ceil(aiQuestions.length/2)?'✓ Passed — well done!':'✗ Keep reviewing — you\'ll get it!'}
                            </p>
                            <p className="text-[11px] opacity-40">Topic: {currentLesson.title}</p>
                          </div>
                        </div>
                      </div>

                      <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color:C.navy }}>
                        <BookOpen size={14}/> Answer Review
                      </h4>
                      {aiQuestions.map((q, i) => (
                        <div key={q.id} className="rounded-2xl p-4 mb-3 border" style={{
                          background: quizResults[i]?.isCorrect?`${C.green}08`:`${C.rose}08`,
                          borderColor: quizResults[i]?.isCorrect?`${C.green}30`:`${C.rose}30`
                        }}>
                          <div className="flex items-start gap-2 mb-2">
                            {quizResults[i]?.isCorrect
                              ?<CheckCircle size={15} style={{ color:C.green, flexShrink:0, marginTop:1 }}/>
                              :<AlertCircle size={15} style={{ color:C.rose, flexShrink:0, marginTop:1 }}/>}
                            <p className="text-xs font-bold leading-relaxed" style={{ color:C.gray[800] }}>{q.question}</p>
                          </div>
                          {!quizResults[i]?.isCorrect && (
                            <p className="text-[11px] mb-1 ml-5" style={{ color:C.rose }}>
                              ✓ Correct answer: <strong>{quizResults[i]?.correct}</strong>
                            </p>
                          )}
                          <p className="text-[11px] ml-5" style={{ color:C.gray[500] }}>💡 {q.explanation}</p>
                        </div>
                      ))}

                      <button onClick={() => {
                        const qs = generateIKPACEQuiz(currentLesson)
                        setAiQuestions(qs); setQuizAnswers({}); setQuizResults(null)
                      }}
                        className="w-full py-3.5 rounded-2xl font-bold text-sm text-white mt-2 flex items-center justify-center gap-2"
                        style={{ background:`linear-gradient(135deg,${C.navy},${C.orange})` }}>
                        <RefreshCw size={14}/> Try Again with New Questions
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── ASSIGNMENT TAB ────────────────────────────────────────── */}
              {activeLessonTab === 'assignment' && currentLesson.assignment && (
                <div>
                  {/* Assignment header card */}
                  <div className="rounded-3xl overflow-hidden shadow-md mb-5">
                    {/* Colour banner */}
                    <div className="p-5 text-white relative overflow-hidden"
                      style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 bg-white"/>
                      <div className="relative z-10 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">iKPACE Assignment</p>
                          <h3 className="font-black text-lg leading-tight mb-1">
                            Week {currentLesson.order_index} Assignment
                          </h3>
                          <p className="text-white/60 text-xs">Topic: <span className="text-white font-semibold">{currentLesson.title}</span></p>
                        </div>
                        {submission
                          ? <span className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full font-black flex-shrink-0" style={{ background:C.green }}>
                              <Check size={11}/> Submitted
                            </span>
                          : <span className="flex items-center gap-1.5 text-[10px] px-3 py-1.5 rounded-full font-black flex-shrink-0 bg-white/20">
                              Pending
                            </span>
                        }
                      </div>
                    </div>

                    {/* Task instructions */}
                    <div className="bg-white p-5 border-b" style={{ borderColor:C.gray[100] }}>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background:`${C.orange}15` }}>
                          <FileText size={14} style={{ color:C.orange }}/>
                        </div>
                        <p className="font-black text-sm" style={{ color:C.navy }}>Your Task</p>
                      </div>
                      <div className="p-4 rounded-2xl" style={{ background:`${C.orange}08`, border:`1px solid ${C.orange}20` }}>
                        <p className="text-sm leading-relaxed" style={{ color:C.gray[700] }}>{currentLesson.assignment}</p>
                      </div>
                    </div>

                    {/* Step-by-step guide */}
                    <div className="bg-white p-5 border-b" style={{ borderColor:C.gray[100] }}>
                      <p className="font-black text-sm mb-4 flex items-center gap-2" style={{ color:C.navy }}>
                        <Flag size={14} style={{ color:C.navyMid }}/> How to Complete This Assignment
                      </p>
                      <div className="space-y-3">
                        {[
                          { step:1, color:C.navy,   title:'Read the task carefully',        desc:'Re-read the assignment brief above. Make sure you understand exactly what is being asked before you start writing.' },
                          { step:2, color:C.navyMid,title:'Review the lesson content',      desc:'Go back to the Content tab and review the key points from this lesson. Your answer should reflect what you have learned.' },
                          { step:3, color:C.orange, title:'Draft your answer',              desc:'Write your response in the box below. Be clear, use examples where possible, and aim for 2–4 sentences minimum.' },
                          { step:4, color:C.green,  title:'Review and submit',              desc:'Proofread your answer, make sure it answers the question fully, then click Submit Assignment.' },
                        ].map((s) => (
                          <div key={s.step} className="flex items-start gap-3 p-3 rounded-2xl"
                            style={{ background:`${s.color}06`, border:`1px solid ${s.color}18` }}>
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs font-black flex-shrink-0"
                              style={{ background:`linear-gradient(135deg,${s.color},${s.color}cc)` }}>{s.step}</div>
                            <div>
                              <p className="text-xs font-black mb-0.5" style={{ color:s.color }}>{s.title}</p>
                              <p className="text-[11px] leading-relaxed" style={{ color:C.gray[500] }}>{s.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Submission area */}
                    <div className="bg-white p-5">
                      <p className="font-black text-sm mb-2 flex items-center gap-2" style={{ color:C.navy }}>
                        <Send size={13} style={{ color:C.navyMid }}/> Your Submission
                      </p>
                      <p className="text-xs mb-3" style={{ color:C.gray[400] }}>
                        Write your answer below — minimum 2 sentences. Be specific and show you understand the lesson.
                      </p>
                      <textarea value={assignmentSubmission} onChange={e => setAssignmentSubmission(e.target.value)}
                        rows={5} placeholder={`Write your answer for "${currentLesson.title}" here…\n\nTip: Start with a key idea from the lesson, then explain it in your own words.`}
                        className="w-full rounded-2xl p-4 text-sm outline-none resize-none mb-3"
                        style={{ background:C.gray[50], border:`2px solid ${assignmentSubmission.trim() ? C.navy+'40' : C.gray[200]}`, color:C.gray[800] }}/>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs" style={{ color: assignmentSubmission.trim().length > 20 ? C.green : C.gray[400] }}>
                          {assignmentSubmission.trim().length > 0
                            ? `${assignmentSubmission.trim().length} characters ${assignmentSubmission.trim().length > 20 ? '✓' : '— keep going!'}`
                            : 'Start typing your answer above'}
                        </p>
                        <button onClick={submitAssignment}
                          disabled={submitLoading || !assignmentSubmission.trim()}
                          className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-white transition-all disabled:opacity-40 hover:shadow-lg hover:-translate-y-0.5"
                          style={{ background: submitSuccess ? C.green : `linear-gradient(135deg,${C.navy},${C.orange})` }}>
                          {submitLoading
                            ? <><div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"/>Submitting…</>
                            : submitSuccess
                              ? <><Check size={14}/> Submitted!</>
                              : <><Send size={14}/> Submit Assignment</>}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Grade feedback */}
                  {submission?.grade && (
                    <div className="p-5 rounded-2xl" style={{ background:`${C.green}08`, border:`1px solid ${C.green}25` }}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background:`${C.green}15` }}>
                          <Award size={18} style={{ color:C.green }}/>
                        </div>
                        <div>
                          <p className="font-black text-sm" style={{ color:C.green }}>Assignment Graded ✓</p>
                          <p className="text-xs" style={{ color:C.gray[400] }}>Your instructor has reviewed your submission</p>
                        </div>
                      </div>
                      <div className="p-3 rounded-xl mb-2" style={{ background:'white', border:`1px solid ${C.green}20` }}>
                        <p className="text-xs font-bold mb-0.5" style={{ color:C.gray[700] }}>Grade</p>
                        <p className="font-black text-base" style={{ color:C.green }}>{submission.grade}</p>
                      </div>
                      {submission.feedback && (
                        <div className="p-3 rounded-xl" style={{ background:'white', border:`1px solid ${C.green}20` }}>
                          <p className="text-xs font-bold mb-0.5" style={{ color:C.gray[700] }}>Instructor Feedback</p>
                          <p className="text-sm leading-relaxed" style={{ color:C.gray[600] }}>{submission.feedback}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Mark complete button */}
              <div className="mt-6 flex items-center justify-between gap-3">
                {!completedLessons.includes(currentLesson.id) ? (
                  <button onClick={() => markAsCompleted(currentLesson.id)}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    style={{ background:`linear-gradient(135deg,${C.green},${C.teal})` }}>
                    <CheckCircle size={16}/> Mark Week {currentLesson.order_index} as Complete
                  </button>
                ) : (
                  <div className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm text-white"
                    style={{ background:`${C.green}20`, color:C.green }}>
                    <CheckCircle size={16} style={{ color:C.green }}/> Completed ✓
                  </div>
                )}
                {/* Next lesson */}
                {(() => {
                  const idx  = lessons.findIndex(l => l.id === currentLesson.id)
                  const next = idx < lessons.length-1 ? lessons[idx+1] : null
                  return next ? (
                    <button onClick={() => handleLessonChange(next)}
                      className="flex items-center gap-1.5 px-4 py-3 rounded-2xl text-sm font-bold text-white transition-all"
                      style={{ background:C.navy }}>
                      Next <ChevronRight size={14}/>
                    </button>
                  ) : null
                })()}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl" style={{ background:`${C.navy}10` }}>📖</div>
              <p className="font-bold text-sm" style={{ color:C.navy }}>Select a lesson to begin</p>
              <p className="text-xs mt-1" style={{ color:C.gray[400] }}>Choose any lesson from the sidebar to start learning.</p>
            </div>
          )}
        </main>

        {/* ── RIGHT SIDEBAR: Tools (desktop) ────────────────────────────────── */}
        <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 sticky top-[57px] h-[calc(100vh-57px)] overflow-y-auto bg-white border-l"
          style={{ borderColor:C.gray[200] }}>
          <div className="px-4 py-3 border-b" style={{ borderColor:C.gray[100] }}>
            <p className="text-xs font-black uppercase tracking-widest" style={{ color:C.gray[400] }}>Course Tools</p>
          </div>
          <div className="flex-1 divide-y" style={{ borderColor:C.gray[100] }}>
            {tools.map(t => (
              <ToolRow key={t.id} icon={t.icon} label={t.label} color={t.color} badge={t.badge}
                active={activeDropdown===t.id}
                onClick={() => toggleDropdown(t.id)}>
                {renderSidebarContent(t.id)}
              </ToolRow>
            ))}
          </div>
        </aside>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.gray[300]}; border-radius: 4px; }
        @media(max-width:1024px){
          .mobile-pb { padding-bottom: 72px !important; }
        }
      `}</style>

      {/* ══ SCORE PANEL OVERLAY ══════════════════════════════════════════════ */}
      {showScorePanel && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowScorePanel(false)}/>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto z-10">
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b px-5 py-4 flex items-center justify-between z-10"
              style={{ borderColor:C.gray[200] }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background:`${C.orange}15` }}>
                  <Trophy size={17} style={{ color:C.orange }}/>
                </div>
                <div>
                  <p className="font-black text-sm" style={{ color:C.navy }}>My Score & Progress</p>
                  <p className="text-[10px]" style={{ color:C.gray[400] }}>Live updates · {course?.title}</p>
                </div>
              </div>
              <button onClick={() => setShowScorePanel(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={16} style={{ color:C.gray[400] }}/>
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Course progress */}
              <div className="rounded-2xl p-4" style={{ background:`linear-gradient(135deg,${C.navyDark},${C.navy})` }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="font-black text-sm text-white">Course Completion</p>
                  <span className="font-black text-2xl" style={{ color:C.orangeLight }}>{progress}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background:'rgba(255,255,255,0.15)' }}>
                  <div className="h-full rounded-full transition-all duration-700"
                    style={{ width:`${progress}%`, background:`linear-gradient(90deg,${C.orange},${C.orangeLight})` }}/>
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-white/60 text-xs">{completedLessons.length} completed</span>
                  <span className="text-white/60 text-xs">{lessons.length - completedLessons.length} remaining</span>
                </div>
              </div>

              {/* Grade summary */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:'Grade Average', val:`${gradeSummary.average}%`, color:C.navy, icon:<BarChart3 size={16}/> },
                  { label:'Letter Grade', val:gradeSummary.letter, color:C.green, icon:<Award size={16}/> },
                  { label:'Lessons Done', val:`${completedLessons.length}/${lessons.length}`, color:C.orange, icon:<CheckCircle size={16}/> },
                ].map((s,i) => (
                  <div key={i} className="rounded-2xl p-3 text-center" style={{ background:`${s.color}08`, border:`1px solid ${s.color}20` }}>
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ background:`${s.color}15`, color:s.color }}>
                      {s.icon}
                    </div>
                    <p className="font-black text-lg" style={{ color:s.color }}>{s.val}</p>
                    <p className="text-[10px] mt-0.5" style={{ color:C.gray[400] }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Quiz history this session */}
              {quizHistory.length > 0 && (
                <div>
                  <p className="font-black text-sm mb-3 flex items-center gap-2" style={{ color:C.navy }}>
                    <Brain size={14}/> Quiz Scores This Session
                  </p>
                  <div className="space-y-2">
                    {[...quizHistory].reverse().map((h, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-2xl"
                        style={{ background: h.passed ? `${C.green}08` : `${C.rose}08`, border:`1px solid ${h.passed?C.green:C.rose}20` }}>
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0"
                            style={{ background: h.passed ? C.green : C.rose }}>
                            {h.passed ? '✓' : '✗'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold truncate" style={{ color:C.navy }}>{h.lessonTitle}</p>
                            <p className="text-[10px]" style={{ color:C.gray[400] }}>{h.time}</p>
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="font-black text-base" style={{ color: h.passed ? C.green : C.rose }}>{h.pct}%</p>
                          <p className="text-[10px]" style={{ color:C.gray[400] }}>{h.score}/{h.total}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Session average */}
                  <div className="mt-3 p-3 rounded-2xl text-center" style={{ background:`${C.navy}08` }}>
                    <p className="text-xs" style={{ color:C.gray[500] }}>Session Quiz Average</p>
                    <p className="font-black text-xl" style={{ color:C.navy }}>
                      {Math.round(quizHistory.reduce((s,h)=>s+h.pct,0)/quizHistory.length)}%
                    </p>
                  </div>
                </div>
              )}
              {quizHistory.length === 0 && (
                <div className="text-center py-6 rounded-2xl" style={{ background:C.gray[50] }}>
                  <Brain size={28} className="mx-auto mb-2" style={{ color:C.gray[300] }}/>
                  <p className="text-sm" style={{ color:C.gray[400] }}>No quizzes taken yet this session.</p>
                  <p className="text-xs mt-1" style={{ color:C.gray[300] }}>Complete a lesson quiz to see your score here.</p>
                </div>
              )}

              {/* Grade items */}
              {grades.length > 0 && (
                <div>
                  <p className="font-black text-sm mb-3 flex items-center gap-2" style={{ color:C.navy }}>
                    <Award size={14}/> Graded Items
                  </p>
                  <div className="space-y-2">
                    {grades.map(g => (
                      <div key={g.id} className="flex items-center justify-between p-3 rounded-2xl"
                        style={{ background:C.gray[50], border:`1px solid ${C.gray[200]}` }}>
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <div className="w-7 h-7 rounded-xl flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 uppercase"
                            style={{ background:C.amber }}>{(g.grade_type||'A').slice(0,1)}</div>
                          <p className="text-xs font-semibold truncate" style={{ color:C.gray[700] }}>{g.title}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-3">
                          <p className="font-black text-sm" style={{ color:C.navy }}>{g.score}/{g.max_score}</p>
                          {g.max_score > 0 && (
                            <div className="w-16 h-1 rounded-full overflow-hidden mt-1" style={{ background:C.gray[200] }}>
                              <div className="h-full rounded-full" style={{ width:`${(g.score/g.max_score)*100}%`, background:`linear-gradient(90deg,${C.green},${C.teal})` }}/>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ DISPLAY SETTINGS OVERLAY ════════════════════════════════════════ */}
      {showDisplaySettings && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDisplaySettings(false)}/>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm z-10">
            <div className="border-b px-5 py-4 flex items-center justify-between" style={{ borderColor:C.gray[200] }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:`${C.navy}12` }}>
                  <Settings size={14} style={{ color:C.navy }}/>
                </div>
                <p className="font-black text-sm" style={{ color:C.navy }}>Display Settings</p>
              </div>
              <button onClick={() => setShowDisplaySettings(false)} className="p-2 rounded-xl hover:bg-gray-100">
                <X size={14} style={{ color:C.gray[400] }}/>
              </button>
            </div>
            <div className="p-5 space-y-3">
              {[
                { key:'showTrackSize',    label:'Show Track Size',      desc:'Display lesson duration estimates' },
                { key:'showAreaNames',    label:'Show Area Names',      desc:'Show section labels in sidebar'    },
                { key:'extendGridLines', label:'Extend Grid Lines',    desc:'Full-width week dividers'          },
                { key:'showLineNames',   label:'Show Line Names',      desc:'Show week numbers on all lessons'  },
                { key:'showMiniMap',     label:'Show Progress Map',    desc:'Mini progress map in sidebar'      },
                { key:'compactLessons',  label:'Compact Lesson List',  desc:'Smaller lesson rows in sidebar'    },
              ].map(s => (
                <div key={s.key} className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 transition"
                  style={{ border:`1px solid ${C.gray[200]}` }}>
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="text-sm font-bold" style={{ color:C.navy }}>{s.label}</p>
                    <p className="text-[10px]" style={{ color:C.gray[400] }}>{s.desc}</p>
                  </div>
                  <button onClick={() => setDisplaySettings(p => ({ ...p, [s.key]:!p[s.key] }))}
                    className="w-11 h-6 rounded-full transition-all flex-shrink-0 relative"
                    style={{ background: displaySettings[s.key] ? C.green : C.gray[300] }}>
                    <div className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all"
                      style={{ left: displaySettings[s.key] ? '24px' : '2px' }}/>
                  </button>
                </div>
              ))}
              <button onClick={() => setShowDisplaySettings(false)}
                className="w-full py-3 rounded-2xl font-bold text-sm text-white mt-2"
                style={{ background:`linear-gradient(135deg,${C.navy},${C.navyMid})` }}>
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ MOBILE BOTTOM NAVIGATION BAR ════════════════════════════════════ */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t shadow-2xl"
        style={{ borderColor:C.gray[200] }}>
        <div className="grid grid-cols-5 gap-0">
          {[
            { id:'lessons', icon:BookOpen,    label:'Lessons', badge:0 },
            { id:'tools',   icon:LayoutGrid,  label:'Tools',   badge:(announcements.length + unreadCount) > 0 ? announcements.length + unreadCount : 0 },
            { id:'quiz',    icon:Brain,       label:'Quiz',    badge:0 },
            { id:'score',   icon:Trophy,      label:'Score',   badge:0 },
            { id:'settings',icon:Settings,    label:'Settings',badge:0 },
          ].map(tab => (
            <button key={tab.id}
              onClick={() => {
                if (tab.id === 'lessons')  { setMobileMenuOpen(true); setMobileBottomTab('lessons')  }
                if (tab.id === 'tools')    { setMobileToolsOpen(true); setMobileBottomTab('tools')   }
                if (tab.id === 'quiz')     { startAIQuiz(); setMobileBottomTab('quiz')               }
                if (tab.id === 'score')    { setShowScorePanel(true); setMobileBottomTab('score')    }
                if (tab.id === 'settings') { setShowDisplaySettings(true); setMobileBottomTab('settings') }
              }}
              className="relative flex flex-col items-center justify-center py-2.5 px-1 transition-all"
              style={{ color: mobileBottomTab===tab.id ? C.navy : C.gray[400] }}>
              {tab.badge > 0 && (
                <span className="absolute top-1.5 right-3 w-4 h-4 rounded-full text-[9px] font-black text-white flex items-center justify-center"
                  style={{ background:C.rose }}>{tab.badge > 9 ? '9+' : tab.badge}</span>
              )}
              <tab.icon size={20} style={{ marginBottom:2 }}/>
              <span className="text-[10px] font-semibold">{tab.label}</span>
              {mobileBottomTab===tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full" style={{ background:C.navy }}/>
              )}
            </button>
          ))}
        </div>
      </nav>

    </div>
  )
}
