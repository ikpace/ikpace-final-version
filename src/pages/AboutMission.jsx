import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target, Heart, Users, Award, Globe, Zap, Sparkles,
  Rocket, BookOpen, CheckCircle, Star, ArrowRight,
  Briefcase, GraduationCap, Lightbulb, TrendingUp,
  Shield, Coffee, MessageCircle, Phone, Mail,
  Facebook, Twitter, Linkedin, Instagram, Youtube,
  MapPin, Clock, DollarSign, ThumbsUp, Medal,
  Crown, Gem, Flame, Gift, Coffee as CoffeeIcon
} from 'lucide-react';

export default function AboutMission() {
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
    white: "#FFFFFF"
  };

  // Company stats - honest numbers
  const stats = [
    { label: 'Students', value: '130+', icon: <Users size={24} />, color: colors.primary },
    { label: 'Courses', value: '6', icon: <BookOpen size={24} />, color: colors.secondary },
    { label: 'Instructors', value: '6', icon: <GraduationCap size={24} />, color: colors.accent },
    { label: 'Countries', value: '5', icon: <Globe size={24} />, color: colors.success }
  ];

  // Core values
  const values = [
    {
      title: 'Accessibility',
      description: 'Quality education should be affordable and accessible to everyone. All our courses are just $7.',
      icon: <Heart size={32} />,
      color: colors.primary
    },
    {
      title: 'Practical Skills',
      description: 'We focus on real-world, hands-on skills that you can immediately apply to your career or business.',
      icon: <Briefcase size={32} />,
      color: colors.secondary
    },
    {
      title: 'Community',
      description: 'Learning is better together. Join a supportive community of learners and instructors.',
      icon: <Users size={32} />,
      color: colors.accent
    },
    {
      title: 'Excellence',
      description: 'We maintain high standards in our curriculum to ensure you get the best learning experience.',
      icon: <Award size={32} />,
      color: colors.success
    },
    {
      title: 'Innovation',
      description: 'We continuously update our courses to keep pace with industry trends and technology.',
      icon: <Lightbulb size={32} />,
      color: colors.blueShade
    },
    {
      title: 'Integrity',
      description: 'We are transparent about our pricing, curriculum, and what you can expect to achieve.',
      icon: <Shield size={32} />,
      color: colors.orangeShade
    }
  ];

  // Team members
  const team = [
    {
      name: 'Amara Osei',
      role: 'Founder & VA Expert',
      bio: 'Virtual Assistant professional with 8+ years of experience helping businesses streamline operations.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: '👩🏾'
    },
    {
      name: 'Kofi Asante',
      role: 'Digital Marketing Lead',
      bio: 'Digital marketing strategist who has helped 50+ brands grow their social media presence.',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: '👨🏾'
    },
    {
      name: 'Esi Darkwah',
      role: 'Design Director',
      bio: 'Creative designer passionate about helping others express their ideas through visual design.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: '👩🏾'
    },
    {
      name: 'Kwame Asare',
      role: 'Kids Education Lead',
      bio: 'Educator specializing in making coding fun and accessible for young learners.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
      icon: '👨🏾'
    }
  ];

  // Milestones
  const milestones = [
    {
      year: '2024',
      title: 'iKPACE Founded',
      description: 'Started with a mission to make quality education accessible to all.',
      icon: <Rocket size={20} />
    },
    {
      year: '2024',
      title: 'First 6 Courses Launched',
      description: 'Launched our initial curriculum covering VA, marketing, design, and more.',
      icon: <BookOpen size={20} />
    },
    {
      year: '2025',
      title: '130+ Students',
      description: 'Reached our first 130 students across 5 countries.',
      icon: <Users size={20} />
    },
    {
      year: '2025',
      title: 'Community Launch',
      description: 'Launched our community platform for students to connect and learn together.',
      icon: <MessageCircle size={20} />
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: 'Fatima Abdi',
      role: 'VA Course Graduate',
      text: 'iKPACE transformed my career. Within a month of completing the VA course, I landed two clients!',
      rating: 5,
      image: '👩🏾'
    },
    {
      name: 'Yaw Boateng',
      role: 'Marketing Student',
      text: 'The practical approach to learning made all the difference. I started applying what I learned immediately.',
      rating: 5,
      image: '👨🏾'
    },
    {
      name: 'Abena Serwaa',
      role: 'Design Course Graduate',
      text: 'Now I design all my own graphics. The Canva course was worth every penny!',
      rating: 5,
      image: '👩🏾'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6">
            <Sparkles size={16} />
            Welcome to iKPACE
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Empowering{' '}
            <span style={{ color: colors.secondary }}>Dreams</span>
            <br />Through Education
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            We believe that quality education should be accessible to everyone. 
            Our mission is to provide practical, affordable skills that transform careers.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-full transition-all hover:scale-105 shadow-lg flex items-center gap-2"
            >
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: stat.color + '15', color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: colors.primary + '10', color: colors.primary }}>
                OUR MISSION
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Making Quality Education{' '}
                <span style={{ color: colors.secondary }}>Accessible</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At iKPACE, we believe that the ability to learn and grow should not be limited by your budget or location. 
                We created a platform where anyone can gain practical, job-ready skills for just $7 per course.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Our focus is on teaching skills that matter — virtual assistance, social media marketing, design, 
                coding for kids, freelancing, and AI — all taught by industry professionals who are passionate about teaching.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: colors.secondary + '20' }}>
                  🎯
                </div>
                <div>
                  <div className="font-bold text-gray-900">Our Goal</div>
                  <p className="text-gray-600">Empower 1,000 students by end of 2025</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20 blur-2xl" style={{ background: colors.primary }}></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: colors.secondary }}></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">Our Promise</h3>
                    <p className="text-gray-600">Honest pricing, no hidden fees</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: colors.primary }}></div>
                    <span className="text-gray-700">Every course just $7</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: colors.secondary }}></div>
                    <span className="text-gray-700">Lifetime access to course materials</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: colors.success }}></div>
                    <span className="text-gray-700">30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: colors.accent }}></div>
                    <span className="text-gray-700">Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ background: colors.orangeShade }}></div>
                    <span className="text-gray-700">Community support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
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
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white hover:shadow-xl transition-all border border-gray-100"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" style={{ background: value.color + '15', color: value.color }}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-16" style={{ background: colors.lightGray }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.secondary + '10', color: colors.secondary }}>
              OUR STORY
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The <span style={{ color: colors.primary }}>iKPACE</span> Journey
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From an idea to a growing community of learners
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary via-secondary to-accent hidden md:block"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="md:w-1/2"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ background: colors.primary }}>
                      {milestone.icon}
                    </div>
                  </div>
                  <div className="md:w-1/2">
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all">
                      <span className="text-sm font-bold px-3 py-1 rounded-full mb-3 inline-block" style={{ background: colors.primary + '10', color: colors.primary }}>
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

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              MEET THE TEAM
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Passionate <span style={{ color: colors.secondary }}>Educators</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry professionals dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-center mb-2" style={{ color: colors.secondary }}>{member.role}</p>
                <p className="text-sm text-gray-600 text-center">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4 bg-white/20 backdrop-blur-sm text-white">
              STUDENT STORIES
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our <span style={{ color: colors.secondary }}>Students Say</span>
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Real feedback from our growing community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-white/90 mb-6">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{testimonial.image}</span>
                  <div>
                    <div className="font-bold">{testimonial.name}</div>
                    <div className="text-sm text-white/70">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose iKPACE */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: colors.primary + '10', color: colors.primary }}>
                WHY US
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                The <span style={{ color: colors.secondary }}>iKPACE</span> Advantage
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.primary + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.primary }}>1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Affordable Excellence</h4>
                    <p className="text-gray-600">Quality courses at just $7 — no hidden fees, no subscriptions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.secondary + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.secondary }}>2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Practical Focus</h4>
                    <p className="text-gray-600">Learn skills you can apply immediately to your career or business.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.success + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.success }}>3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Supportive Community</h4>
                    <p className="text-gray-600">Connect with instructors and fellow learners on your journey.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: colors.accent + '15' }}>
                    <span className="text-sm font-bold" style={{ color: colors.accent }}>4</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Risk-Free Learning</h4>
                    <p className="text-gray-600">30-day money-back guarantee on every course.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Students learning together"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <ThumbsUp size={14} className="text-orange-600" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Satisfaction</div>
                    <div className="font-bold text-gray-900">94%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16" style={{ background: colors.lightGray }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Rocket size={48} className="mx-auto mb-4" style={{ color: colors.primary }} />
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your <span style={{ color: colors.secondary }}>Journey?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join 130+ students who are already learning practical skills for just $7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-4 rounded-full text-white font-bold hover:scale-105 transition-all shadow-lg"
              style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
            >
              Browse All Courses
            </Link>
            <Link
              to="/community"
              className="px-8 py-4 rounded-full font-bold border-2 hover:bg-white transition-all"
              style={{ borderColor: colors.primary, color: colors.primary }}
            >
              Join Community Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer/Contact Info */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
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