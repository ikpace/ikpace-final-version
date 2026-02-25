import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Send, MessageCircle, Twitter, 
  Instagram, Linkedin, Youtube, Globe, Facebook, Github,
  Clock, Users, Award, Shield, ChevronRight, ExternalLink,
  Headphones, HelpCircle, BookOpen, FileText, Sparkles,
  CheckCircle, AlertCircle, Copy, Check, Share2, Heart, 
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
      stats: '50k+ followers'
    },
    {
      platform: 'Instagram',
      username: '@ikpacelearning',
      url: 'https://instagram.com/ikpacelearning',
      icon: <Instagram size={20} />,
      color: '#E4405F',
      bgColor: '#E4405F08',
      stats: '25k+ followers'
    },
    {
      platform: 'LinkedIn',
      username: '@ikpacelearning',
      url: 'https://linkedin.com/company/ikpacelearning',
      icon: <Linkedin size={20} />,
      color: '#0A66C2',
      bgColor: '#0A66C208',
      stats: '15k+ connections'
    },
    {
      platform: 'Twitter',
      username: '@ikpace',
      url: 'https://twitter.com/ikpace',
      icon: <Twitter size={20} />,
      color: '#1DA1F2',
      bgColor: '#1DA1F208',
      stats: '30k+ followers'
    },
    {
      platform: 'YouTube',
      username: '@ikpacelearning',
      url: 'https://youtube.com/@ikpacelearning',
      icon: <Youtube size={20} />,
      color: '#FF0000',
      bgColor: '#FF000008',
      stats: '40k+ subscribers'
    },
    {
      platform: 'Facebook',
      username: '@ikpace',
      url: 'https://facebook.com/ikpace',
      icon: <Facebook size={20} />,
      color: '#1877F2',
      bgColor: '#1877F208',
      stats: '20k+ followers'
    }
  ]

  const contactInfo = [
    {
      type: 'General Inquiries',
      email: 'info@ikpace.com',
      icon: <Mail size={24} />,
      description: 'For general questions and information',
      responseTime: 'Within 24 hours',
      color: colors.primary
    },
    {
      type: 'Join Our Team',
      email: 'team@ikpace.com',
      icon: <Users size={24} />,
      description: 'Careers, partnerships, and collaborations',
      responseTime: 'Within 48 hours',
      color: colors.secondary
    },
    {
      type: 'Support',
      email: 'support@ikpace.com',
      icon: <Headphones size={24} />,
      description: 'Technical support and account help',
      responseTime: 'Within 12 hours',
      color: colors.success
    },
    {
      type: 'Partnerships',
      email: 'partners@ikpace.com',
      
      description: 'Collaborate with iKPACE',
      responseTime: 'Within 3 days',
      color: colors.accent
    }
  ]

  const offices = [
    {
      city: 'Lagos, Nigeria',
      address: '123 Tech Hub, VI, Lagos',
      phone: '+234 123 456 7890',
      hours: 'Mon-Fri, 9am - 6pm',
      icon: '🇳🇬'
    },
    {
      city: 'Nairobi, Kenya',
      address: '456 Innovation Center, Nairobi',
      phone: '+254 123 456 789',
      hours: 'Mon-Fri, 9am - 6pm',
      icon: '🇰🇪'
    },
    {
      city: 'Cape Town, SA',
      address: '789 Digital Square, Cape Town',
      phone: '+27 123 456 789',
      hours: 'Mon-Fri, 9am - 6pm',
      icon: '🇿🇦'
    }
  ]

  const faqs = [
    {
      question: 'How quickly do you respond to emails?',
      answer: 'We aim to respond to all inquiries within 24 hours. For urgent matters, please use the contact form and mark it as urgent.'
    },
    {
      question: 'Do you offer student support?',
      answer: 'Yes! Current students can reach out via the student portal for faster support. Our support team is available 24/7 for students.'
    },
    {
      question: 'How can I partner with iKPACE?',
      answer: 'We love partnerships! Please email partners@ikpace.com with your proposal and our team will get back to you.'
    },
    {
      question: 'Are you hiring?',
      answer: 'Yes! Check our Careers page for current openings or send your CV to team@ikpace.com.'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden" style={{ 
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`
      }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ 
            background: 'radial-gradient(circle at 30% 50%, white 0%, transparent 50%)',
            animation: 'pulse 4s ease-in-out infinite'
          }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Let's <span style={{ color: colors.secondary }}>Connect</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Have questions? Want to partner? Looking to join our team? We're here to help you every step of the way.
          </p>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <Clock size={20} className="opacity-80" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={20} className="opacity-80" />
              <span>50k+ Students</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={20} className="opacity-80" />
              <span>Fast Response</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: info.color + '10' }}>
                  <span style={{ color: info.color }}>{info.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.type}</h3>
                <p className="text-sm text-gray-500 mb-3">{info.description}</p>
                <div className="flex items-center justify-between">
                  <a 
                    href={`mailto:${info.email}`}
                    className="text-sm font-medium hover:underline"
                    style={{ color: info.color }}
                  >
                    {info.email}
                  </a>
                  <button 
                    onClick={() => handleCopy(info.email, info.type)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {copied === info.type ? <Check size={16} style={{ color: colors.success }} /> : <Copy size={16} className="text-gray-400" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-3 flex items-center gap-1">
                  <Clock size={12} /> {info.responseTime}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ color: colors.primary }}>Send a Message</h2>
              <p className="text-gray-600 mb-8">We'll get back to you within 24 hours</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="careers">Career / Join Team</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Tell us how we can help..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full relative overflow-hidden group rounded-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent transition-transform group-hover:scale-105" style={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`
                  }}></div>
                  <div className="relative flex items-center justify-center gap-2 py-4 text-white font-semibold">
                    {formStatus === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                        <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>

            {/* Social & Contact Info */}
            <div className="space-y-8">
              {/* Social Links */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>Connect With Us</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl transition-all hover:shadow-md group"
                      style={{ background: social.bgColor }}
                    >
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110" style={{ color: social.color }}>
                        {social.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{social.username}</p>
                        <p className="text-xs text-gray-500">{social.stats}</p>
                      </div>
                      <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Locations */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-6" style={{ color: colors.primary }}>Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                      <span className="text-3xl">{office.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900">{office.city}</h4>
                        <p className="text-sm text-gray-600 mt-1">{office.address}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Phone size={12} />
                            {office.phone}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {office.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" style={{ background: colors.lightGray }}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4" style={{ color: colors.primary }}>
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-12">Quick answers to common questions</p>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronRight 
                    size={20} 
                    className={`transition-transform ${activeFaq === index ? 'rotate-90' : ''}`}
                    style={{ color: colors.secondary }}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter & CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-xl p-12 border border-gray-100">
            <Heart className="mx-auto mb-6" size={48} style={{ color: colors.secondary }} />
            <h2 className="text-3xl font-bold text-gray-900 mb-4" style={{ color: colors.primary }}>
              Join Our Community
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and follow us on social media for updates, tips, and inspiration.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {socialLinks.slice(0, 4).map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: social.bgColor, color: social.color }}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500"
              />
              <button className="px-8 py-3 rounded-xl font-semibold text-white transition-all hover:shadow-lg" style={{ background: colors.primary }}>
                Subscribe
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.626476081!2d3.3218725!3d6.5243793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4cc6473b3c3%3A0x471f1b0b0b0b0b0!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="opacity-80"
        ></iframe>
        
        {/* Map Overlay Stats */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl p-6 flex gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.primary }}>3</div>
            <div className="text-xs text-gray-500">Offices</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.secondary }}>12+</div>
            <div className="text-xs text-gray-500">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold" style={{ color: colors.success }}>24/7</div>
            <div className="text-xs text-gray-500">Support</div>
          </div>
        </div>
      </section>

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