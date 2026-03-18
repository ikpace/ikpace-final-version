// src/pages/AboutTeam.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Star, Mail, Linkedin, Twitter, Globe,
  Award, BookOpen, Briefcase, GraduationCap,
  Heart, MessageCircle, Coffee, MapPin, Calendar,
  ChevronRight, Sparkles, Target, Zap, ThumbsUp,
  Medal, Crown, Gem, Rocket, CheckCircle, Quote
} from 'lucide-react';

export default function AboutTeam() {
  // Brand colors
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
    white: "#FFFFFF",
    purple: "#8B5CF6",
    pink: "#EC4899",
    teal: "#14B8A6",
    indigo: "#6366F1"
  };

  // Core Team Members - No Images, Only Icons
  const coreTeam = [
    {
      name: 'Michael Anderson',
      role: 'Founder & CEO',
      title: 'Executive Business Coach',
      bio: 'Former Microsoft executive with 15+ years of experience in business operations and leadership development.',
      longBio: 'Michael spent 10 years at Microsoft leading global operations teams before founding iKPACE. He combines corporate expertise with entrepreneurial spirit to help others build successful careers.',
      icon: <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>MA</div>,
      expertise: ['Executive Leadership', 'Business Strategy', 'Operations', 'Career Development'],
      education: 'MBA, Harvard Business School',
      experience: '15+ years',
      courses: ['Virtual Assistant Professional'],
      students: 32,
      rating: 4.9,
      color: colors.primary,
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'michael@ikpace.com'
      },
      funFact: 'Climbed Mount Kilimanjaro and speaks 4 languages',
      quote: "Success is not about knowing everything, it's about having the courage to learn."
    },
    {
      name: 'Jonathan Chen',
      role: 'Co-Founder & Head of Marketing',
      title: 'Digital Marketing Strategist',
      bio: 'Award-winning marketing director who led campaigns for Fortune 500 companies across Asia and North America.',
      longBio: 'Jonathan has 10 years of experience in digital marketing, having worked with brands like Nike, Samsung, and L\'Oreal. His data-driven approach has generated over $50M in revenue for clients.',
      icon: <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.orangeShade})` }}>JC</div>,
      expertise: ['Digital Strategy', 'Brand Marketing', 'Growth Hacking', 'Analytics'],
      education: 'MSc Marketing, London Business School',
      experience: '10+ years',
      courses: ['Social Media Marketing'],
      students: 28,
      rating: 4.8,
      color: colors.secondary,
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'jonathan@ikpace.com'
      },
      funFact: 'Has visited 45 countries and counting',
      quote: "Marketing is about understanding people, not just selling products."
    },
    {
      name: 'Sofia Martínez',
      role: 'Creative Director',
      title: 'Design & Branding Expert',
      bio: 'Internationally recognized designer with work featured in Vogue and Communication Arts.',
      longBio: 'Sofia has designed for luxury brands across Europe and South America. Her work has been recognized with multiple awards including the Cannes Lions and D&AD Pencils.',
      icon: <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.purple}, ${colors.pink})` }}>SM</div>,
      expertise: ['Brand Identity', 'Art Direction', 'Visual Design', 'Creative Strategy'],
      education: 'BFA, Central Saint Martins, London',
      experience: '9+ years',
      courses: ['Canva & Graphic Design'],
      students: 19,
      rating: 4.7,
      color: colors.purple,
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sofia@ikpace.com'
      },
      funFact: 'Her artwork hangs in galleries in 3 countries',
      quote: "Design is not just how it looks, it's how it works."
    },
    {
      name: 'Alexander Petrov',
      role: 'Kids Education Lead',
      title: 'STEM Education Specialist',
      bio: 'PhD in Educational Technology who developed coding curricula for schools across Europe.',
      longBio: 'Alexander pioneered computer science education programs in 200+ schools. His approach makes complex concepts accessible and fun for young learners.',
      icon: <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.teal}, ${colors.indigo})` }}>AP</div>,
      expertise: ['STEM Education', 'Curriculum Design', 'Child Psychology', 'Game-Based Learning'],
      education: 'PhD, MIT Media Lab',
      experience: '11+ years',
      courses: ['Smart Kids Coding'],
      students: 12,
      rating: 4.9,
      color: colors.teal,
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'alexander@ikpace.com'
      },
      funFact: 'Designed a coding game played by 50,000+ kids worldwide',
      quote: "Every child deserves the chance to understand and create technology."
    },
    {
      name: 'Elena Vasilakis',
      role: 'Freelance Business Coach',
      title: 'Global Freelancing Expert',
      bio: 'Top-rated freelancer on Upwork and Fiverr with $2M+ earned helping others build sustainable online careers.',
      longBio: 'Elena started freelancing while traveling the world. She\'s worked with clients from 60+ countries and now dedicates her time to teaching others how to achieve location independence.',
      icon: <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.success}, ${colors.teal})` }}>EV</div>,
      expertise: ['Freelance Strategy', 'Client Acquisition', 'Remote Work', 'Personal Branding'],
      education: 'BA International Business, University of Amsterdam',
      experience: '8+ years',
      courses: ['Freelancing & Online Income'],
      students: 21,
      rating: 4.8,
      color: colors.success,
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'elena@ikpace.com'
      },
      funFact: 'Has worked remotely from 30 different countries',
      quote: "Freedom is the ability to work from anywhere while building something meaningful."
    },
    {
      name: 'Marcus Williams',
      role: 'AI & Tech Lead',
      title: 'Artificial Intelligence Expert',
      bio: 'Former AI researcher at DeepMind specializing in prompt engineering and LLM applications.',
      longBio: 'Marcus was part of the team that developed groundbreaking AI models at DeepMind. He now focuses on making AI accessible and practical for businesses and creators.',
      icon: <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-bold" style={{ background: `linear-gradient(135deg, ${colors.warning}, ${colors.secondary})` }}>MW</div>,
      expertise: ['Machine Learning', 'Prompt Engineering', 'LLM Applications', 'AI Ethics'],
      education: 'MSc Computer Science, Stanford University',
      experience: '7+ years',
      courses: ['AI Prompt Engineering'],
      students: 18,
      rating: 4.9,
      color: colors.warning,
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'marcus@ikpace.com'
      },
      funFact: 'Published 5 research papers on AI by age 28',
      quote: "AI is not here to replace us, but to augment our capabilities and creativity."
    }
  ];

  // Team stats
  const teamStats = [
    { label: 'Team Members', value: '6', icon: <Users size={24} />, color: colors.primary },
    { label: 'Years Combined Experience', value: '60+', icon: <Briefcase size={24} />, color: colors.secondary },
    { label: 'Courses Created', value: '6', icon: <BookOpen size={24} />, color: colors.success },
    { label: 'Students Taught', value: '130+', icon: <GraduationCap size={24} />, color: colors.purple }
  ];

  // Values
  const teamValues = [
    {
      title: 'Global Excellence',
      description: 'Our team brings world-class expertise from leading institutions and companies.',
      icon: <Globe size={24} />,
      color: colors.primary
    },
    {
      title: 'Practical Wisdom',
      description: 'We teach what we\'ve actually done, with proven results across industries.',
      icon: <Briefcase size={24} />,
      color: colors.secondary
    },
    {
      title: 'Innovation First',
      description: 'We stay at the cutting edge of technology and teaching methodologies.',
      icon: <Sparkles size={24} />,
      color: colors.accent
    },
    {
      title: 'Student Success',
      description: 'Your growth is our mission. We\'re invested in your journey.',
      icon: <Target size={24} />,
      color: colors.success
    }
  ];

  // Fun facts
  const funFacts = [
    { fact: 'Team speaks 12 languages combined', icon: <Globe size={20} />, color: colors.primary },
    { fact: 'Have worked in 30+ countries', icon: <MapPin size={20} />, color: colors.secondary },
    { fact: '500+ years of teaching experience', icon: <Calendar size={20} />, color: colors.success },
    { fact: 'Published 20+ research papers', icon: <BookOpen size={20} />, color: colors.purple },
    { fact: 'Featured in Forbes, TechCrunch, WSJ', icon: <Award size={20} />, color: colors.warning },
    { fact: 'Alumni of Harvard, Stanford, MIT', icon: <GraduationCap size={20} />, color: colors.teal }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Header */}
      <div className="relative overflow-hidden py-16 md:py-20" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm mb-6">
            <Users size={16} />
            <span>Meet the Experts</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
            Our <span style={{ color: colors.secondary }}>Team</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            Meet our global team of industry experts from leading companies and institutions.
            We're dedicated to helping you succeed.
          </p>
        </div>
      </div>

      {/* Team Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamStats.map((stat, index) => (
              <div key={index} className="text-center p-4 md:p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-all border border-gray-100 group">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 transition-transform group-hover:scale-110" style={{ background: stat.color + '15', color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-xl md:text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Team Section - NO IMAGES */}
      <section className="py-12 md:py-16" style={{ background: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Meet the <span style={{ color: colors.secondary }}>Experts</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Global professionals with world-class experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {coreTeam.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 group"
              >
                {/* Icon Header - Instead of Image */}
                <div className="relative h-40 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${member.color}20, ${member.color}05)` }}>
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    {member.icon}
                  </div>
                  <div className="absolute top-3 right-3 bg-white shadow-md px-3 py-1 rounded-full text-xs font-bold" style={{ color: member.color }}>
                    {member.role}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900">{member.name}</h3>
                  </div>
                  
                  <p className="text-xs md:text-sm font-medium mb-2" style={{ color: member.color }}>
                    {member.title}
                  </p>
                  
                  {/* Quote */}
                  <div className="mb-3 p-3 bg-gray-50 rounded-lg border-l-4" style={{ borderLeftColor: member.color }}>
                    <Quote size={14} className="mb-1 opacity-50" />
                    <p className="text-xs italic text-gray-600">{member.quote}</p>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.expertise.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] md:text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-500 mb-3">
                    <div className="flex items-center gap-1">
                      <Users size={12} style={{ color: member.color }} />
                      <span>{member.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-current" />
                      <span>{member.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase size={12} style={{ color: member.color }} />
                      <span>{member.experience}</span>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="flex items-center gap-1 mb-3 text-xs text-gray-500">
                    <GraduationCap size={12} />
                    <span className="truncate">{member.education}</span>
                  </div>

                  {/* Fun Fact */}
                  <div className="mb-3 p-2 bg-gray-50 rounded text-xs text-gray-600 flex items-center gap-2">
                    <Zap size={12} style={{ color: member.color }} />
                    <span className="truncate">{member.funFact}</span>
                  </div>

                  {/* Social Links */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <a href={member.social.linkedin} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Linkedin size={12} style={{ color: member.color }} />
                    </a>
                    <a href={member.social.twitter} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Twitter size={12} style={{ color: member.color }} />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                      <Mail size={12} style={{ color: member.color }} />
                    </a>
                    <Link 
                      to={`/courses?instructor=${member.name}`}
                      className="ml-auto text-xs font-medium hover:underline flex items-center gap-1"
                      style={{ color: member.color }}
                    >
                      View Courses <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Fun <span style={{ color: colors.secondary }}>Facts</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Did you know about our global team?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {funFacts.map((fact, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100 flex items-center gap-3 hover:shadow-md transition">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: fact.color + '15', color: fact.color }}>
                  {fact.icon}
                </div>
                <span className="text-sm text-gray-700">{fact.fact}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-12 md:py-16" style={{ background: colors.lightGray }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our <span style={{ color: colors.primary }}>Values</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              What drives our global team of experts
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {teamValues.map((value, index) => (
              <div key={index} className="p-5 md:p-6 rounded-xl bg-white hover:shadow-md transition-all border border-gray-100 group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mb-3 transition-transform group-hover:scale-110" style={{ background: value.color + '15', color: value.color }}>
                  {value.icon}
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-xs md:text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join the Team CTA */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: colors.primary + '15' }}>
            <Rocket size={28} style={{ color: colors.primary }} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Join the <span style={{ color: colors.secondary }}>iKPACE</span> Team
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 px-4">
            Passionate about teaching? We're always looking for global experts to join our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
            <Link
              to="/contact"
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-full text-white font-medium hover:scale-105 transition-all shadow-md text-sm md:text-base"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              Apply to Teach
            </Link>
            <Link
              to="/community"
              className="px-6 md:px-8 py-2.5 md:py-3 rounded-full font-medium border-2 hover:bg-gray-50 transition-all text-sm md:text-base"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Back to About Link */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          to="/about" 
          className="inline-flex items-center gap-2 text-xs md:text-sm hover:underline"
          style={{ color: colors.primary }}
        >
          ← Back to About iKPACE
        </Link>
      </div>
    </div>
  );
}