import { Link } from 'react-router-dom';
import { 
  Users, Target, Award, Briefcase, ChevronRight, Mail, Heart, Globe, BookOpen,
  Rocket, Sparkles, Star, Zap, Coffee, Gift, Shield, CheckCircle, TrendingUp,
  MessageCircle, Calendar, MapPin, Phone, Facebook, Twitter, Linkedin, Instagram,
  PlayCircle, Download, ThumbsUp, Crown, Medal, Gem
} from 'lucide-react';
import { useState } from 'react';

export default function About() {
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    purple: "#7329ce",
    teal: "#20C997",
    lightGray: "#F3F4F6",
    dark: "#1F2937"
  };

  // Realistic stats for a growing platform
  const stats = [
    { number: "6", label: "Premium Courses", icon: <BookOpen size={24} />, color: colors.primary },
    { number: "6", label: "Expert Instructors", icon: <Users size={24} />, color: colors.secondary },
    { number: "130+", label: "Active Students", icon: <Users size={24} />, color: colors.accent },
    { number: "15+", label: "Countries", icon: <Globe size={24} />, color: colors.success },
    { number: "4.8", label: "Avg Rating", icon: <Star size={24} />, color: colors.warning },
    { number: "36+", label: "Years Experience", icon: <Award size={24} />, color: colors.purple }
  ];

  // Main about sections
  const sections = [
    {
      path: "/about/mission",
      title: "Our Mission",
      description: "Learn about our purpose and what drives us",
      icon: <Target className="w-8 h-8" />,
      color: colors.primary,
      longDesc: "To empower learners with practical digital skills that transform careers and lives.",
      cta: "Read Our Mission"
    },
    {
      path: "/about/team",
      title: "Our Team",
      description: "Meet the experts behind iKPACE",
      icon: <Users className="w-8 h-8" />,
      color: colors.secondary,
      longDesc: "Global industry professionals dedicated to your success.",
      cta: "Meet the Team"
    },
    {
      path: "/about/success-stories",
      title: "Success Stories",
      description: "Read how our students transformed their careers",
      icon: <Award className="w-8 h-8" />,
      color: colors.accent,
      longDesc: "Real achievements from 130+ graduates worldwide.",
      cta: "Read Stories"
    },
    {
      path: "/about/careers",
      title: "Careers",
      description: "Join our growing team",
      icon: <Briefcase className="w-8 h-8" />,
      color: colors.success,
      longDesc: "Help us shape the future of education.",
      cta: "View Openings"
    }
  ];

  // Core values
  const values = [
    {
      title: "Learner-First",
      description: "Every decision we make starts with how it helps our students succeed.",
      icon: <Heart className="w-6 h-6" />,
      color: colors.primary
    },
    {
      title: "Global Community",
      description: "Connect with learners and instructors from around the world.",
      icon: <Globe className="w-6 h-6" />,
      color: colors.secondary
    },
    {
      title: "Practical Skills",
      description: "Real projects, real results. Learn skills you can use immediately.",
      icon: <Target className="w-6 h-6" />,
      color: colors.accent
    },
    {
      title: "Affordable Excellence",
      description: "Quality education at just $7 — no hidden fees, no subscriptions.",
      icon: <Zap className="w-6 h-6" />,
      color: colors.success
    },
    {
      title: "Lifetime Access",
      description: "Learn at your own pace with permanent access to all materials.",
      icon: <Gift className="w-6 h-6" />,
      color: colors.purple
    },
    {
      title: "30-Day Guarantee",
      description: "Not satisfied? Full refund within 30 days, no questions asked.",
      icon: <Shield className="w-6 h-6" />,
      color: colors.teal
    }
  ];

  // Milestones
  const milestones = [
    {
      year: "2024",
      title: "iKPACE Founded",
      description: "Started with a mission to make quality education accessible to all.",
      icon: <Rocket size={20} />,
      color: colors.primary
    },
    {
      year: "2024",
      title: "First 6 Courses Launched",
      description: "Launched our initial curriculum covering in-demand skills.",
      icon: <BookOpen size={20} />,
      color: colors.secondary
    },
    {
      year: "2025",
      title: "130+ Students",
      description: "Reached our first 130 students across 15+ countries.",
      icon: <Users size={20} />,
      color: colors.accent
    },
    {
      year: "2025",
      title: "Community Launch",
      description: "Launched our community platform for students to connect.",
      icon: <MessageCircle size={20} />,
      color: colors.success
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Elena Rossi",
      location: "Milan, Italy",
      text: "The freelancing course gave me the roadmap I needed. Within 4 months, I replaced my full-time income.",
      rating: 5,
      course: "Freelancing & Online Income",
      image: "👩🏻"
    },
    {
      name: "James Chen",
      location: "Singapore",
      text: "Applied the marketing strategies to my family's business and doubled our engagement in 2 months.",
      rating: 5,
      course: "Social Media Marketing",
      image: "👨🏻"
    },
    {
      name: "Sofia Laurent",
      location: "Barcelona, Spain",
      text: "The Canva course helped me start a freelance design business. Now I work with 8 regular clients.",
      rating: 5,
      course: "Canva & Graphic Design",
      image: "👩🏻"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <Sparkles size={16} />
            Welcome to iKPACE
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Empowering{' '}
            <span style={{ color: colors.secondary }}>Learners</span>{' '}
            Worldwide
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            We're on a mission to make quality digital skills education accessible, affordable, 
            and practical for everyone. Join 130+ students already learning with us.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Explore Courses
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all">
                <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>{stat.number}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: colors.primary + '10', color: colors.primary }}>
                OUR STORY
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                From an Idea to a{' '}
                <span style={{ color: colors.secondary }}>Growing Community</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                iKPACE was born from a simple observation: quality education is often too expensive and inaccessible. 
                We believed there had to be a better way — courses taught by real experts, priced affordably, 
                and focused on practical skills that actually help people build careers.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Today, we're a growing community of 130+ students across 15+ countries, learning skills 
                that transform their lives — all for just $7 per course. No subscriptions, no hidden fees, 
                just quality education.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: colors.secondary + '20' }}>
                  🎯
                </div>
                <div>
                  <div className="font-bold text-gray-900">Our Goal for 2025</div>
                  <p className="text-gray-600">Empower 500 students with life-changing skills</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20 blur-2xl" style={{ background: colors.primary }}></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: colors.secondary }}></div>
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Students learning together"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              WHAT WE BELIEVE IN
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span style={{ color: colors.secondary }}>Core Values</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do at iKPACE
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: value.color + '15', color: value.color }}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Sections Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learn More <span style={{ color: colors.secondary }}>About Us</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our mission, meet the team, read success stories, and explore career opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {sections.map((section, index) => (
              <Link
                key={index}
                to={section.path}
                className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all group border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl" style={{ background: section.color + '15', color: section.color }}>
                    {section.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover" style={{ color: section.color }}>
                      {section.title}
                    </h3>
                    <p className="text-gray-600 mb-3">{section.description}</p>
                    <p className="text-sm text-gray-500 mb-4">{section.longDesc}</p>
                    <span className="inline-flex items-center text-sm font-semibold" style={{ color: section.color }}>
                      {section.cta} <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.accent + '10', color: colors.accent }}>
              OUR JOURNEY
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The <span style={{ color: colors.accent }}>iKPACE</span> Story
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From humble beginnings to a growing global community
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg" style={{ background: milestone.color }}>
                      {milestone.icon}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <span className="text-sm font-bold px-3 py-1 rounded-full mb-3 inline-block" style={{ background: milestone.color + '15', color: milestone.color }}>
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.success + '10', color: colors.success }}>
              STUDENT LOVE
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our <span style={{ color: colors.success }}>Students Say</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real feedback from our growing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{testimonial.image}</span>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                    <div className="text-xs mt-1" style={{ color: colors.primary }}>{testimonial.course}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose iKPACE */}
      <section className="py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: colors.secondary + '10', color: colors.secondary }}>
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The <span style={{ color: colors.secondary }}>iKPACE</span> Advantage
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.primary + '15' }}>
                    <CheckCircle size={16} style={{ color: colors.primary }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Quality Education at $7</h4>
                    <p className="text-gray-600">Professional courses at a fraction of the usual cost.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.secondary + '15' }}>
                    <CheckCircle size={16} style={{ color: colors.secondary }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Expert Instructors</h4>
                    <p className="text-gray-600">Learn from industry professionals with real experience.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.accent + '15' }}>
                    <CheckCircle size={16} style={{ color: colors.accent }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Lifetime Access</h4>
                    <p className="text-gray-600">Learn at your own pace, forever.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.success + '15' }}>
                    <CheckCircle size={16} style={{ color: colors.success }} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">30-Day Guarantee</h4>
                    <p className="text-gray-600">Not satisfied? Full refund, no questions asked.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Student success"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: colors.success + '15', color: colors.success }}>
                    <ThumbsUp size={14} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Student Satisfaction</div>
                    <div className="font-bold text-gray-900">94%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="max-w-4xl mx-auto text-center">
          <Rocket size={48} className="mx-auto mb-4 text-white/90" />
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join 130+ students who have already transformed their careers with our practical courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              Browse All Courses
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Join Community Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Contact Info */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">iKPACE</h3>
              <p className="text-gray-400 text-sm">
                Empowering learners with practical, affordable digital skills education.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2"><Mail size={14} /> hello@ikpace.com</li>
                <li className="flex items-center gap-2"><Phone size={14} /> +233 123 456 789</li>
                <li className="flex items-center gap-2"><MapPin size={14} /> Accra, Ghana</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 iKPACE. All rights reserved. Every course just $7.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}