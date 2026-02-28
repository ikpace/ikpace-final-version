import { useState, useRef, useEffect } from 'react'
import { 
  MessageCircle, X, Send, Bot, User, Minimize2, Sparkles, 
  Zap, Award, Clock, BookOpen, Heart, Star, Shield,
  ChevronRight, CheckCircle, DollarSign, CreditCard,
  Smartphone, Globe, Users, Target, TrendingUp
} from 'lucide-react'

export default function LiveChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: '👋 Hi there! I\'m your iKPACE assistant. I can give you instant, accurate answers about our courses, pricing, certificates, and more. What would you like to know?',
      time: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const messagesEndRef = useRef(null)

  // Brand colors
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    lightGray: "#F3F4F6",
    white: "#FFFFFF",
    darkGray: "#1F2937"
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Complete iKPACE knowledge base with realistic numbers
  const ikpace = {
    name: "iKPACE",
    tagline: "Learn Smarter, Earn Better",
    founded: "2024",
    mission: "To make quality education accessible and affordable for everyone in Africa.",
    stats: {
      students: 247,
      courses: 5,
      instructors: 3,
      rating: 4.8,
      countries: "5"
    },
    courses: [
      {
        id: 'virtual-assistant-pro',
        title: 'Virtual Assistant Professional',
        price: 7,
        duration: '6 weeks',
        level: 'Beginner',
        description: 'Master administrative skills, communication, and client acquisition.',
        instructor: 'Amara Osei',
        enrolled: 32,
        rating: 4.9,
        category: 'Career',
        skills: ['Client Management', 'Email', 'Calendar', 'Social Media'],
        outcome: 'Launch your VA career and land your first client'
      },
      {
        id: 'social-media-marketing',
        title: 'Social Media Marketing',
        price: 7,
        duration: '6 weeks',
        level: 'Beginner',
        description: 'Master content creation, ads, and growth strategies.',
        instructor: 'Kofi Asante',
        enrolled: 28,
        rating: 4.8,
        category: 'Marketing',
        skills: ['Content', 'Ads', 'Analytics', 'Strategy'],
        outcome: 'Run successful social media campaigns'
      },
      {
        id: 'canva-graphic-design',
        title: 'Canva & Graphic Design',
        price: 7,
        duration: '4 weeks',
        level: 'Beginner',
        description: 'Create stunning designs, logos, and branding materials.',
        instructor: 'Esi Darkwah',
        enrolled: 19,
        rating: 4.7,
        category: 'Design',
        skills: ['Logo Design', 'Social Graphics', 'Branding'],
        outcome: 'Build a professional design portfolio'
      },
      {
        id: 'smart-kids-coding',
        title: 'Smart Kids Coding',
        price: 7,
        duration: '4 weeks',
        level: 'Beginner (Ages 6-12)',
        description: 'Fun coding adventures using Scratch.',
        instructor: 'Ms. Akosua',
        enrolled: 12,
        rating: 4.9,
        category: 'Kids',
        skills: ['Scratch', 'Games', 'Animation'],
        outcome: 'Create your own games and animations'
      },
      {
        id: 'freelancing-online-income',
        title: 'Freelancing & Online Income',
        price: 7,
        duration: '4 weeks',
        level: 'Beginner',
        description: 'Start earning online with freelancing skills.',
        instructor: 'Yaa Asantewaa',
        enrolled: 21,
        rating: 4.8,
        category: 'Business',
        skills: ['Upwork', 'Fiverr', 'Client Management', 'Pricing'],
        outcome: 'Get your first paid freelance gig'
      }
    ],
    payment: {
      methods: [
        { name: 'Mobile Money', providers: ['MTN', 'Vodafone', 'AirtelTigo'], icon: Smartphone },
        { name: 'Card Payment', providers: ['Visa', 'Mastercard'], icon: CreditCard },
        { name: 'Bank Transfer', providers: ['All Ghana banks'], icon: DollarSign }
      ],
      currency: 'GHS',
      price: 7,
      usd: 0.58,
      guarantee: '30-day money-back guarantee',
      provider: 'Paystack',
      secure: '256-bit SSL encrypted'
    },
    certificate: {
      included: true,
      type: 'Verified Digital Certificate',
      features: [
        'Unique verification number',
        'Share on LinkedIn',
        'Download as PDF',
        'QR code for instant verification',
        'Lifetime access'
      ]
    },
    support: {
      email: 'info@ikpace.com',
      phone: '+233 (0) 123 456 789',
      hours: '24/7',
      response: 'Within 2 hours',
      live: '8am - 8pm GMT'
    },
    features: [
      'Full lifetime access',
      'Professional certificate',
      '24/7 student support',
      'Downloadable resources',
      'Mobile and TV access',
      '30-day money-back guarantee',
      'Community access',
      'Project-based learning'
    ],
    enrollment: {
      steps: [
        'Create a free account',
        'Browse and select a course',
        'Click "Enroll Now"',
        'Complete payment (GHS 7)',
        'Start learning immediately'
      ],
      requirements: ['Internet connection', 'Basic computer skills', 'Commitment to learn']
    }
  }

  // Improved direct answer mapping with better matching
  const getDirectAnswer = (userMessage) => {
    const msg = userMessage.toLowerCase().trim()

    // ===== GREETINGS =====
    if (msg.match(/^(hi|hello|hey|howdy|greetings|good morning|good afternoon|good evening)/i) || 
        msg.includes('hello') || 
        msg.includes('hi there') || 
        msg === 'hi' || 
        msg === 'hello' || 
        msg === 'hey') {
      return `👋 Hello! Welcome to iKPACE! I'm your virtual assistant. How can I help you today? You can ask me about our courses, pricing, certificates, or anything about our platform.`
    }

    // ===== ABOUT iKPACE =====
    if (msg.includes('about') || msg.includes('who are you') || msg.includes('tell me about ikpace') || msg.includes('what is ikpace')) {
      return `iKPACE is an online learning platform founded in ${ikpace.founded}. Our mission: "${ikpace.mission}" We have ${ikpace.stats.courses} courses, ${ikpace.stats.students} students, and a ${ikpace.stats.rating}/5 rating. All courses are GHS 7.`
    }

    // ===== COURSE LIST =====
    if (msg.includes('what courses') || msg.includes('available courses') || msg.includes('list courses') || msg.includes('show me courses') || msg.includes('what do you offer')) {
      const list = ikpace.courses.map(c => `• ${c.title} - ${c.duration}, ${c.level} (${c.enrolled} students)`).join('\n')
      return `📚 We offer ${ikpace.courses.length} courses:\n\n${list}\n\nEach course is GHS 7. Which one interests you?`
    }

    // ===== SPECIFIC COURSES =====
    if (msg.includes('virtual assistant') || msg.includes('va pro')) {
      const c = ikpace.courses[0]
      return `**${c.title}**\n${c.description}\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Instructor: ${c.instructor}\n• Students: ${c.enrolled}\n• Rating: ${c.rating}/5\n• Skills: ${c.skills.join(', ')}\n• Outcome: ${c.outcome}\n\nPrice: GHS ${c.price}. Enroll now to start your VA career!`
    }

    if (msg.includes('social media') || msg.includes('smm') || msg.includes('marketing')) {
      const c = ikpace.courses[1]
      return `**${c.title}**\n${c.description}\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Instructor: ${c.instructor}\n• Students: ${c.enrolled}\n• Rating: ${c.rating}/5\n• Skills: ${c.skills.join(', ')}\n• Outcome: ${c.outcome}\n\nPrice: GHS ${c.price}. Master social media today!`
    }

    if (msg.includes('canva') || msg.includes('graphic design') || msg.includes('design')) {
      const c = ikpace.courses[2]
      return `**${c.title}**\n${c.description}\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Instructor: ${c.instructor}\n• Students: ${c.enrolled}\n• Rating: ${c.rating}/5\n• Skills: ${c.skills.join(', ')}\n• Outcome: ${c.outcome}\n\nPrice: GHS ${c.price}. Start creating beautiful designs!`
    }

    if (msg.includes('kids') || msg.includes('child') || msg.includes('children') || msg.includes('coding for kids')) {
      const c = ikpace.courses[3]
      return `**${c.title}**\n${c.description}\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Instructor: ${c.instructor}\n• Students: ${c.enrolled}\n• Rating: ${c.rating}/5\n• Skills: ${c.skills.join(', ')}\n• Outcome: ${c.outcome}\n\nPrice: GHS ${c.price}. Perfect for young learners ages 6-12!`
    }

    if (msg.includes('freelance') || msg.includes('freelancing') || msg.includes('online income') || msg.includes('make money')) {
      const c = ikpace.courses[4]
      return `**${c.title}**\n${c.description}\n\n• Duration: ${c.duration}\n• Level: ${c.level}\n• Instructor: ${c.instructor}\n• Students: ${c.enrolled}\n• Rating: ${c.rating}/5\n• Skills: ${c.skills.join(', ')}\n• Outcome: ${c.outcome}\n\nPrice: GHS ${c.price}. Start earning online today!`
    }

    // ===== PRICE =====
    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('fee')) {
      return `💰 All iKPACE courses cost **GHS ${ikpace.payment.price}** (approximately $${ikpace.payment.usd} USD). This includes:\n\n• Full lifetime access\n• Professional certificate\n• All course materials\n• 24/7 support\n• ${ikpace.payment.guarantee}\n\nWe accept ${ikpace.payment.methods.map(m => m.name).join(', ')}.`
    }

    // ===== PAYMENT METHODS =====
    if (msg.includes('pay') || msg.includes('payment') || msg.includes('mobile money') || msg.includes('mtn') || msg.includes('vodafone')) {
      const methods = ikpace.payment.methods.map(m => 
        `• ${m.name}: ${m.providers.join(', ')}`
      ).join('\n')
      return `💳 **Payment Methods:**\n\n${methods}\n\nAll payments are processed securely through ${ikpace.payment.provider} with ${ikpace.payment.secure}. After payment, you get instant access to your course!`
    }

    // ===== CERTIFICATE =====
    if (msg.includes('certificate') || msg.includes('certification') || msg.includes('proof') || msg.includes('verify')) {
      const features = ikpace.certificate.features.map(f => `• ${f}`).join('\n')
      return `🎓 **Yes!** You receive a **${ikpace.certificate.type}** upon completing any course.\n\nFeatures:\n${features}\n\nYour certificate proves your skills to employers and clients.`
    }

    // ===== ENROLLMENT =====
    if (msg.includes('enroll') || msg.includes('how to join') || msg.includes('sign up') || msg.includes('register') || msg.includes('start learning')) {
      const steps = ikpace.enrollment.steps.map((step, i) => `${i+1}. ${step}`).join('\n')
      return `📝 **To enroll in a course:**\n\n${steps}\n\nRequirements: ${ikpace.enrollment.requirements.join(', ')}.\n\nNeed help with any step? Just ask!`
    }

    // ===== DURATION =====
    if (msg.includes('how long') || msg.includes('duration') || msg.includes('time to complete') || msg.includes('finish')) {
      return `⏱️ **Course durations:**\n\n• 4-week courses: Canva, Kids Coding, Freelancing\n• 6-week courses: VA Pro, Social Media\n\nYou learn at your own pace and get **lifetime access** to review materials anytime!`
    }

    // ===== FEATURES =====
    if (msg.includes('feature') || msg.includes('what do i get') || msg.includes('include') || msg.includes('benefits')) {
      const features = ikpace.features.map(f => `• ${f}`).join('\n')
      return `✨ **Every course includes:**\n\n${features}\n\nPlus access to our learning community!`
    }

    // ===== SUPPORT =====
    if (msg.includes('support') || msg.includes('help') || msg.includes('contact') || msg.includes('reach')) {
      return `🆘 **Get help from our team:**\n\n• Email: ${ikpace.support.email}\n• Phone: ${ikpace.support.phone}\n• Live chat: ${ikpace.support.live}\n• Response time: ${ikpace.support.response}\n\nWe're here ${ikpace.support.hours}!`
    }

    // ===== INSTRUCTORS =====
    if (msg.includes('instructor') || msg.includes('teacher') || msg.includes('who teaches')) {
      const instructors = [...new Set(ikpace.courses.map(c => `${c.instructor} (${c.category})`))].join('\n• ')
      return `👨‍🏫 **Our Expert Instructors:**\n\n• ${instructors}\n\nEach instructor has years of industry experience and has helped dozens of students succeed.`
    }

    // ===== REFUND =====
    if (msg.includes('refund') || msg.includes('money back') || msg.includes('guarantee') || msg.includes('satisfied')) {
      return `✅ **${ikpace.payment.guarantee}**\n\nIf you're not satisfied with your course within 30 days of purchase, email ${ikpace.support.email} and we'll process your full refund - no questions asked.`
    }

    // ===== COMMUNITY =====
    if (msg.includes('community') || msg.includes('forum') || msg.includes('discuss') || msg.includes('other students')) {
      return `👥 **Join our growing community!**\n\n• Course discussion forums\n• Student WhatsApp groups\n• Monthly virtual meetups\n\nAccess the community after enrolling in any course.`
    }

    // ===== LOGIN HELP =====
    if (msg.includes('login') || msg.includes('sign in') || msg.includes('can\'t log in') || msg.includes('password')) {
      return `🔐 **Login troubleshooting:**\n\n1. Check your email and password\n2. Use "Forgot Password" to reset\n3. Clear browser cache\n4. Try a different browser\n\nStill stuck? Email ${ikpace.support.email} for immediate help.`
    }

    // ===== ACCOUNT =====
    if (msg.includes('account') || msg.includes('profile') || msg.includes('settings')) {
      return `👤 **Account Management:**\n\n• Create account: Free and takes 2 minutes\n• Update profile: Go to Dashboard > Settings\n• Change password: Use "Forgot Password" link\n• Delete account: Contact support\n\nNeed specific help? Let me know!`
    }

    // ===== ACCESS =====
    if (msg.includes('access') || msg.includes('lifetime') || msg.includes('after course')) {
      return `🔓 **You get lifetime access!**\n\nOnce enrolled, you can access the course forever - even after completion. Review materials anytime, anywhere on mobile, tablet, or TV.`
    }

    // ===== LANGUAGE =====
    if (msg.includes('language') || msg.includes('english')) {
      return `🌍 **Course Languages:**\n\n• All courses are taught in English\n• Community forums in English\n\nMore languages coming soon!`
    }

    // ===== REQUIREMENTS =====
    if (msg.includes('requirement') || msg.includes('need') || msg.includes('prerequisite') || msg.includes('experience')) {
      return `📋 **Requirements:**\n\n• Internet connection\n• Computer or smartphone\n• Basic computer skills\n• No prior experience needed\n• Commitment to learn (2-4 hours/week)`
    }

    // ===== RATING =====
    if (msg.includes('rating') || msg.includes('reviews') || msg.includes('what do students say')) {
      return `⭐ **Student Ratings:**\n\n• Overall: ${ikpace.stats.rating}/5\n• ${ikpace.stats.courses} courses rated\n• Based on ${ikpace.stats.students} student reviews\n\nTop rated: Kids Coding (4.9), VA Pro (4.9)`
    }

    // ===== COUNTRIES =====
    if (msg.includes('country') || msg.includes('ghana') || msg.includes('nigeria') || msg.includes('africa')) {
      return `🌍 **Available in ${ikpace.stats.countries} countries:**\n\n• Ghana\n• Nigeria\n• Kenya\n• South Africa\n\nPayment in GHS. International students can pay via card.`
    }

    // ===== THANK YOU =====
    if (msg.includes('thank')) {
      return `You're welcome! 😊 I'm always here to help. Is there anything else you'd like to know about iKPACE?`
    }

    // ===== GOODBYE =====
    if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you')) {
      return `👋 Goodbye! Feel free to come back anytime. Happy learning with iKPACE!`
    }

    // ===== DEFAULT =====
    return `I can help with specific questions about:\n\n• Courses (VA, Social Media, Canva, Kids Coding, Freelancing)\n• Pricing (GHS 7)\n• Payment methods\n• Certificates\n• Enrollment steps\n• Support\n\nWhat would you like to know?`
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputMessage,
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsTyping(true)
    setShowSuggestions(false)

    // Get direct answer
    const answer = getDirectAnswer(inputMessage)

    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: answer,
        time: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 800)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    'Hello',
    'What courses do you offer?',
    'How much do courses cost?',
    'Do I get a certificate?',
    'How do I enroll?',
    'What payment methods?',
    'Tell me about iKPACE',
    'Contact support'
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-50 flex items-center justify-center group"
        style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
        aria-label="Open chat support"
      >
        <MessageCircle size={24} className="text-white sm:w-7 sm:h-7 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white animate-pulse" style={{ background: colors.success }}></span>
      </button>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 sm:bottom-6 sm:right-6 sm:left-auto z-50 sm:w-80 md:w-96">
      <div className={`bg-white rounded-t-xl sm:rounded-2xl shadow-2xl overflow-hidden transition-all mx-4 sm:mx-0 ${isMinimized ? 'h-16' : 'h-[550px] sm:h-[600px]'} flex flex-col`}>
        {/* Header */}
        <div className="p-3 sm:p-4 flex items-center justify-between" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
          <div className="flex items-center min-w-0 flex-1">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0" style={{ background: colors.secondary }}>
              <Bot size={18} className="text-white sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-bold text-sm sm:text-base truncate">iKPACE Assistant</h3>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 flex-shrink-0" style={{ background: colors.success }}></span>
                <p className="text-white/80 text-xs truncate">Online • Instant answers</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Minimize chat"
            >
              <Minimize2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4" style={{ background: colors.lightGray }}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[85%] sm:max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'ml-1 sm:ml-2' : 'mr-1 sm:mr-2'
                    }`} style={{ background: message.type === 'user' ? colors.primary : colors.secondary }}>
                      {message.type === 'user' ? (
                        <User size={14} className="text-white sm:w-4 sm:h-4" />
                      ) : (
                        <Bot size={14} className="text-white sm:w-4 sm:h-4" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className={`rounded-2xl px-3 sm:px-4 py-2 sm:py-3 whitespace-pre-line break-words ${
                        message.type === 'user'
                          ? 'rounded-tr-none text-white'
                          : 'rounded-tl-none text-gray-800'
                      }`} style={{ 
                        background: message.type === 'user' 
                          ? `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                          : colors.white 
                      }}>
                        <p className="text-xs sm:text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-1 sm:px-2">
                        {message.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center mr-1 sm:mr-2 flex-shrink-0" style={{ background: colors.secondary }}>
                      <Bot size={14} className="text-white sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 sm:py-3 shadow-sm">
                      <div className="flex space-x-1.5 sm:space-x-2">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" style={{ background: colors.primary, animationDelay: '0s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" style={{ background: colors.primary, animationDelay: '0.1s' }}></div>
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full animate-bounce" style={{ background: colors.primary, animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {showSuggestions && messages.length === 1 && (
              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-white border-t border-gray-200">
                <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
                  <Sparkles size={12} className="sm:w-3.5 sm:h-3.5" style={{ color: colors.secondary }} />
                  <p className="text-xs font-medium" style={{ color: colors.primary }}>Quick answers:</p>
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs px-2 sm:px-3 py-2 sm:py-2 rounded-lg hover:opacity-80 transition-colors text-left border truncate min-h-[44px] sm:min-h-0"
                      style={{ 
                        background: colors.primary + '08',
                        color: colors.darkGray,
                        borderColor: colors.primary + '20'
                      }}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 px-3 sm:px-4 py-3 sm:py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:border-transparent text-sm"
                  style={{ focusRing: colors.primary }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})` }}
                  aria-label="Send message"
                >
                  <Send size={16} className="text-white sm:w-4 sm:h-4" />
                </button>
              </div>
              <div className="flex items-center justify-center gap-1 sm:gap-2 mt-2 sm:mt-2">
                <Bot size={10} className="sm:w-3 sm:h-3" style={{ color: colors.primary }} />
                <p className="text-xs text-gray-500">Instant answers • 24/7 support</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}