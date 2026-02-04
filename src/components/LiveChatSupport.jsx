import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot, User, Minimize2 } from 'lucide-react'

export default function LiveChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! I\'m your iKPACE AI assistant. How can I help you today?',
      time: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    // Course-related queries
    if (lowerMessage.includes('course') || lowerMessage.includes('learn')) {
      return 'We offer 9 beginner-friendly courses including IT Fundamentals, Data Analysis, Cybersecurity, Virtual Assistant, Content Creation, Graphic Design, AI Animation, Freelancing, and Digital Entrepreneurship. Each course costs $7/month. Would you like to know more about a specific course?'
    }

    // Payment queries
    if (lowerMessage.includes('pay') || lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return 'All our courses are priced at $7 per month. We accept card payments and mobile money through our secure Paystack integration. You get instant access after payment!'
    }

    // Certificate queries
    if (lowerMessage.includes('certificate')) {
      return 'Yes! You\'ll receive a verified certificate upon completing any course. Certificates include a unique verification number and can be downloaded as PDF or shared on LinkedIn.'
    }

    // Progress tracking
    if (lowerMessage.includes('progress') || lowerMessage.includes('track')) {
      return 'Our platform tracks your learning progress in real-time! You can see your learning streak, hours studied, course completion percentage, and skill level progression from your dashboard.'
    }

    // Technical support
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('problem')) {
      return 'I\'m here to help! You can reach our support team at info@ikpace.com or describe your issue here. Common issues include login problems, payment verification, or course access - which one can I help you with?'
    }

    // Login/Register
    if (lowerMessage.includes('login') || lowerMessage.includes('sign in') || lowerMessage.includes('register')) {
      return 'To access courses, you need to create an account or login. Click on "Get Started" or "Login" in the navigation bar. If you\'re having trouble logging in, please check your email and password, or try resetting your password.'
    }

    // Duration
    if (lowerMessage.includes('how long') || lowerMessage.includes('duration')) {
      return 'Our courses range from 4 to 6 weeks depending on the subject. You can learn at your own pace, and courses remain accessible after completion for lifetime review!'
    }

    // Enrollment
    if (lowerMessage.includes('enroll') || lowerMessage.includes('join') || lowerMessage.includes('start')) {
      return 'To enroll in a course: 1) Create an account or login 2) Browse our courses 3) Click on a course you like 4) Click "Enroll Now" and complete payment 5) Start learning immediately!'
    }

    // Community
    if (lowerMessage.includes('community') || lowerMessage.includes('forum') || lowerMessage.includes('discuss')) {
      return 'We have an active community forum where students connect, share experiences, and help each other! You can access it from the Community tab after logging in. Join discussions, ask questions, and network with fellow learners.'
    }

    // AI features
    if (lowerMessage.includes('ai') || lowerMessage.includes('recommendation')) {
      return 'Our AI-powered platform provides personalized learning recommendations, practice questions, and adaptive learning paths based on your progress and learning style. The AI assistant is available inside each course to help explain concepts!'
    }

    // Default response
    return 'That\'s a great question! I can help you with information about our courses, pricing, certificates, enrollment process, or technical support. What would you like to know more about?'
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

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'bot',
        text: getAIResponse(inputMessage),
        time: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickQuestions = [
    'How much do courses cost?',
    'How do I enroll?',
    'Do I get a certificate?',
    'What courses are available?'
  ]

  const handleQuickQuestion = (question) => {
    setInputMessage(question)
    setTimeout(() => handleSendMessage(), 100)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-secondary to-accent-yellow rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-50 flex items-center justify-center group"
        aria-label="Open chat support"
      >
        <MessageCircle size={28} className="text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent-green rounded-full border-2 border-white animate-pulse"></span>
      </button>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all ${isMinimized ? 'w-80' : 'w-96'}`}>
      <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden transition-all ${isMinimized ? 'h-16' : 'h-[600px]'} flex flex-col`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center mr-3">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold">iKPACE AI Support</h3>
              <p className="text-white/80 text-xs">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Minimize chat"
            >
              <Minimize2 size={18} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === 'user' ? 'bg-primary ml-2' : 'bg-secondary mr-2'
                    }`}>
                      {message.type === 'user' ? (
                        <User size={18} className="text-white" />
                      ) : (
                        <Bot size={18} className="text-white" />
                      )}
                    </div>
                    <div>
                      <div className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-white text-gray-800 rounded-tl-none shadow-sm'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {message.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center mr-2">
                      <Bot size={18} className="text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 bg-white border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="w-10 h-10 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Send message"
                >
                  <Send size={18} className="text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by iKPACE AI
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
