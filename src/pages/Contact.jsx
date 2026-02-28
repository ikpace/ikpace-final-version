import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Twitter, 
  Instagram, Linkedin, Youtube, Globe, Facebook, Github,
  Clock, Users, Award, Shield, ChevronRight, ExternalLink,
  Headphones, HelpCircle, BookOpen, FileText, Sparkles,
  CheckCircle, AlertCircle, Copy, Check, Share2, Heart,
  MessageSquare, ThumbsUp, Briefcase, Map
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState(null)
  const [copied, setCopied] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)

  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    dark: "#1F2937",
    lightGray: "#F3F4F6",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C",
    white: "#FFFFFF"
  }

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setFormStatus('sending')
    setTimeout(() => {
      setFormStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setFormStatus(null), 3000)
    }, 1500)
  }

  const socialLinks = [
    {
      platform: 'TikTok',
      username: '@ikpace',
      url: 'https://tiktok.com/@ikpace',
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
      </svg>,
      color: '#000000',
      bgColor: '#00000008',
      followers: '500+'
    },
    {
      platform: 'Instagram',
      username: '@ikpacelearning',
      url: 'https://instagram.com/ikpacelearning',
      icon: <Instagram size={20} />,
      color: '#E4405F',
      bgColor: '#E4405F08',
      followers: '250+'
    },
    {
      platform: 'LinkedIn',
      username: '@ikpacelearning',
      url: 'https://linkedin.com/company/ikpacelearning',
      icon: <Linkedin size={20} />,
      color: '#0A66C2',
      bgColor: '#0A66C208',
      followers: '150+'
    },
    {
      platform: 'Twitter',
      username: '@ikpace',
      url: 'https://twitter.com/ikpace',
      icon: <Twitter size={20} />,
      color: '#1DA1F2',
      bgColor: '#1DA1F208',
      followers: '300+'
    },
    {
      platform: 'YouTube',
      username: '@ikpacelearning',
      url: 'https://youtube.com/@ikpacelearning',
      icon: <Youtube size={20} />,
      color: '#FF0000',
      bgColor: '#FF000008',
      followers: '100+'
    },
    {
      platform: 'Facebook',
      username: '@ikpace',
      url: 'https://facebook.com/ikpace',
      icon: <Facebook size={20} />,
      color: '#1877F2',
      bgColor: '#1877F208',
      followers: '200+'
    }
  ]

  const contactInfo = [
    {
      type: 'General Inquiries',
      email: 'hello@ikpace.com',
      icon: <Mail size={24} />,
      description: 'For general questions and information',
      responseTime: 'Within 24 hours',
      color: colors.primary
    },
    {
      type: 'Join Our Team',
      email: 'team@ikpace.com',
      icon: <Users size={24} />,
      description: 'Careers and opportunities',
      responseTime: 'Within 48 hours',
      color: colors.secondary
    },
    {
      type: 'Student Support',
      email: 'support@ikpace.com',
      icon: <Headphones size={24} />,
      description: 'Technical support for students',
      responseTime: 'Within 12 hours',
      color: colors.success
    },
    {
      type: 'Partnerships',
      email: 'partners@ikpace.com',
      icon: <Briefcase size={24} />,
      description: 'Collaborate with iKPACE',
      responseTime: 'Within 3 days',
      color: colors.accent
    }
  ]

  // Global team feature - replaced office location
  const globalTeam = [
    {
      region: 'Africa',
      countries: 'Ghana, Nigeria, Kenya, South Africa',
      team: '8+ team members',
      icon: '🌍',
      color: colors.primary
    },
    {
      region: 'Europe',
      countries: 'UK, Germany, Spain',
      team: '4+ team members',
      icon: '🇪🇺',
      color: colors.secondary
    },
    {
      region: 'North America',
      countries: 'USA, Canada',
      team: '3+ team members',
      icon: '🌎',
      color: colors.accent
    },
    {
      region: 'Asia',
      countries: 'India, Singapore',
      team: '2+ team members',
      icon: '🌏',
      color: colors.success
    }
  ]

  const faqs = [
    {
      question: 'How quickly do you respond to emails?',
      answer: 'We aim to respond to all inquiries within 24 hours. Our support team is dedicated to helping you as quickly as possible.'
    },
    {
      question: 'Do you offer student support?',
      answer: 'Yes! Current students can reach out to support@ikpace.com for assistance. We typically respond within 12 hours.'
    },
    {
      question: 'How can I partner with iKPACE?',
      answer: 'We love partnerships! Please email partners@ikpace.com with your proposal and our team will get back to you within 3 days.'
    },
    {
      question: 'Are you hiring?',
      answer: 'Yes! Check our Careers page for current openings or send your CV to team@ikpace.com.'
    },
    {
      question: 'Where is iKPACE located?',
      answer: 'We are a fully remote global team with members across Africa, Europe, North America, and Asia. We believe in working from anywhere and supporting our global community.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden px-4" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            background: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 md:mb-6">
            Let's <span style={{ color: colors.secondary }}>Connect</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto mb-8 md:mb-12 px-4">
            Have questions? Want to partner? Looking to join our team? We're here to help you every step of the way.
          </p>
          
          {/* Quick Stats - Honest numbers */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-white">
            <div className="flex items-center gap-2">
              <Clock size={18} className="opacity-80" />
              <span className="text-sm sm:text-base">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="opacity-80" />
              <span className="text-sm sm:text-base">130+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={18} className="opacity-80" />
              <span className="text-sm sm:text-base">Fast Response</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe size={18} className="opacity-80" />
              <span className="text-sm sm:text-base">Global Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 md:py-16 bg-white px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 -mt-16 md:-mt-20">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl md:rounded-2xl shadow-lg p-5 md:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-3 md:mb-4" style={{ background: info.color + '10' }}>
                  <span style={{ color: info.color }}>{info.icon}</span>
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 md:mb-2">{info.type}</h3>
                <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{info.description}</p>
                <div className="flex items-center justify-between">
                  <a 
                    href={`mailto:${info.email}`}
                    className="text-xs md:text-sm font-medium hover:underline truncate max-w-[140px] md:max-w-[180px]"
                    style={{ color: info.color }}
                  >
                    {info.email}
                  </a>
                  <button 
                    onClick={() => handleCopy(info.email, info.type)}
                    className="p-1.5 md:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                  >
                    {copied === info.type ? <Check size={14} style={{ color: colors.success }} /> : <Copy size={14} className="text-gray-400" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-2 md:mt-3 flex items-center gap-1">
                  <Clock size={10} /> {info.responseTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>Send a Message</h2>
              <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">We'll get back to you within 24 hours</p>

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Your Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-sm"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-sm"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Student Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="careers">Career / Join Team</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="4"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 transition-colors text-sm"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full relative overflow-hidden group rounded-lg md:rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-105" style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                  }}></div>
                  <div className="relative flex items-center justify-center gap-2 py-3 md:py-4 text-white font-semibold text-sm md:text-base">
                    {formStatus === 'sending' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send Message</span>
                        <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>

            {/* Social & Global Team Info */}
            <div className="space-y-6 md:space-y-8">
              {/* Social Links */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6" style={{ color: colors.primary }}>Connect With Us</h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-3 md:p-4 rounded-lg md:rounded-xl transition-all hover:shadow-md group"
                      style={{ background: social.bgColor }}
                    >
                      <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ color: social.color }}>
                        {social.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-gray-900 truncate">{social.username}</p>
                        <p className="text-xs text-gray-500">{social.followers} followers</p>
                      </div>
                      <ExternalLink size={12} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Global Team Feature - Replaced office location */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6" style={{ color: colors.primary }}>🌍 Our Global Team</h3>
                <p className="text-sm text-gray-600 mb-6">
                  We're a fully remote team spread across the world, bringing diverse perspectives to everything we do.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {globalTeam.map((region, index) => (
                    <div key={index} className="p-4 rounded-xl bg-gray-50">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{region.icon}</span>
                        <h4 className="font-bold text-gray-900 text-sm" style={{ color: region.color }}>{region.region}</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{region.countries}</p>
                      <p className="text-xs font-medium" style={{ color: region.color }}>{region.team}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl" style={{ background: colors.primary + '08' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={16} style={{ color: colors.primary }} />
                    <span className="text-sm font-bold text-gray-900">20+ Team Members</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Working across 4 continents to bring you the best learning experience.
                  </p>
                </div>
              </div>

              {/* Quick Response Guarantee */}
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: colors.success + '10', color: colors.success }}>
                    <ThumbsUp size={20} />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm md:text-base">Quick Response Guarantee</h4>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  We respond to all inquiries within 24 hours. Most emails get a reply within 2-3 hours during business hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-2" style={{ color: colors.primary }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center text-sm md:text-base text-gray-600 mb-8 md:mb-12">Quick answers to common questions</p>

          <div className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg md:rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm md:text-base">{faq.question}</span>
                  <ChevronRight 
                    size={16} 
                    className={`transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-90' : ''}`}
                    style={{ color: colors.secondary }}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-4 md:px-6 pb-3 md:pb-4 text-xs md:text-sm text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-lg p-6 md:p-12 border border-gray-100">
            <Heart className="mx-auto mb-4 md:mb-6" size={36} style={{ color: colors.secondary }} />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4" style={{ color: colors.primary }}>
              Join Our Community
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for updates, tips, and inspiration.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              {socialLinks.slice(0, 4).map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: social.bgColor, color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 md:px-6 py-2 md:py-3 border-2 border-gray-200 rounded-lg md:rounded-xl focus:outline-none focus:border-orange-500 text-sm"
              />
              <button className="px-6 md:px-8 py-2 md:py-3 rounded-lg md:rounded-xl font-semibold text-white transition-all hover:shadow-lg text-sm" style={{ background: colors.primary }}>
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* World Map Visualization - Replaced map section */}
      <section className="py-12 md:py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>
              Where in the World?
            </h2>
            <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
              Our team works remotely from 15+ countries across 4 continents
            </p>
          </div>
          
          <div className="relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex justify-center">
              <Globe size={120} className="opacity-20" style={{ color: colors.primary }} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 w-full">
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: colors.primary }}>🌍</div>
                  <div className="text-xs text-gray-600">Africa</div>
                  <div className="text-xs font-bold">8+</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: colors.secondary }}>🇪🇺</div>
                  <div className="text-xs text-gray-600">Europe</div>
                  <div className="text-xs font-bold">4+</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: colors.accent }}>🌎</div>
                  <div className="text-xs text-gray-600">N. America</div>
                  <div className="text-xs font-bold">3+</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold" style={{ color: colors.success }}>🌏</div>
                  <div className="text-xs text-gray-600">Asia</div>
                  <div className="text-xs font-bold">2+</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <span className="inline-block px-4 py-2 rounded-full text-sm" style={{ background: colors.primary + '10', color: colors.primary }}>
              🌍 Fully Remote • 20+ Team Members Worldwide
            </span>
          </div>
        </div>
      </section>

      {/* Back to Home Link */}
      <div className="container mx-auto px-4 py-6 md:py-8">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm hover:underline"
          style={{ color: colors.primary }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </div>
  )
}