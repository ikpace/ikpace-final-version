import { Link } from 'react-router-dom';
import { 
  Heart, Medal, Crown, Code, Briefcase, ArrowRight,
  Users, Star, Award, Target, Zap, Sparkles, Rocket,
  GraduationCap, Calendar, MapPin, MessageCircle, Coffee,
  CheckCircle, DollarSign, Globe, BookOpen, PlayCircle,
  ThumbsUp, Shield, Gift, TrendingUp, Lightbulb,
  Facebook, Twitter, Linkedin, Instagram, Clock
} from 'lucide-react';

export default function WomenInTech() {
  const colors = {
    primary: "#1A3D7C",
    secondary: "#FF7A00",
    accent: "#2F5EA8",
    success: "#008F4C",
    warning: "#E6B800",
    purple: "#7329ce",
    pink: "#E83E8C",
    teal: "#20C997",
    lightGray: "#F3F4F6",
    dark: "#1F2937",
    blueShade: "#4A6FA5",
    orangeShade: "#FF9A3C"
  };

  const programs = [
    {
      title: "Women in Tech Scholarship",
      description: "50% tuition support for women in technology",
      icon: <Medal className="w-8 h-8" />,
      link: "/course/women-tech-scholarship",
      color: colors.primary
    },
    {
      title: "Return to Work Program",
      description: "For professionals returning after career breaks",
      icon: <Crown className="w-8 h-8" />,
      link: "/course/return-to-work",
      color: colors.accent
    },
    {
      title: "Tech Leadership",
      description: "Executive skills development program",
      icon: <Briefcase className="w-8 h-8" />,
      link: "/course/tech-leadership",
      color: colors.primary
    },
    {
      title: "Coding for Beginners",
      description: "Start your coding journey - Free!",
      icon: <Code className="w-8 h-8" />,
      link: "/course/coding-beginners",
      color: colors.secondary
    },
    {
      title: "Women Entrepreneurs",
      description: "Build your startup with our workshop program",
      icon: <Heart className="w-8 h-8" />,
      link: "/course/tech-entrepreneurship",
      color: colors.success
    }
  ];

  const stats = [
    { number: "76+", label: "Women Supported", icon: <Users size={24} />, color: colors.primary },
    { number: "15+", label: "Mentors", icon: <Star size={24} />, color: colors.secondary },
    { number: "85%", label: "Job Placement", icon: <Briefcase size={24} />, color: colors.success },
    { number: "5", label: "Programs", icon: <BookOpen size={24} />, color: colors.accent },
    { number: "5", label: "Countries", icon: <Globe size={24} />, color: colors.blueShade },
    { number: "$50K+", label: "Scholarships", icon: <DollarSign size={24} />, color: colors.orangeShade }
  ];

  const events = [
    {
      title: "Women in Tech Networking",
      date: "April 15, 2025",
      time: "5:00 PM GMT",
      format: "Virtual",
      icon: <Users size={16} />,
      link: "/community",
      color: colors.primary
    },
    {
      title: "Resume Workshop",
      date: "April 22, 2025",
      time: "3:00 PM GMT",
      format: "Virtual",
      icon: <Briefcase size={16} />,
      link: "/community",
      color: colors.secondary
    },
    {
      title: "Mentorship Circle",
      date: "April 29, 2025",
      time: "4:00 PM GMT",
      format: "Virtual",
      icon: <MessageCircle size={16} />,
      link: "/community",
      color: colors.accent
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
            Empowering Women in Technology
          </span>
          
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
            Women in{' '}
            <span style={{ color: colors.secondary }}>Tech</span>
          </h1>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Programs designed to empower women at every stage of their tech journey
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="#programs"
              className="px-8 py-3 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg"
              style={{ background: colors.secondary }}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Programs
            </Link>
            <Link
              to="/community"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Join Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-gray-50 hover:shadow-lg transition-all">
                <div className="w-12 h-12 mx-auto mb-2 flex items-center justify-center" style={{ color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="text-xl font-bold mb-1" style={{ color: stat.color }}>{stat.number}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-6" style={{ background: colors.primary + '15', color: colors.primary }}>
                OUR MISSION
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Closing the{' '}
                <span style={{ color: colors.secondary }}>Gender Gap</span> in Tech
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We believe that technology should be built by diverse perspectives. 
                Our Women in Tech initiative is dedicated to creating pathways for women 
                to enter, thrive, and lead in the technology industry.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Through scholarships, mentorship, and specialized programs, we're building 
                a community of women supporting women in tech.
              </p>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: colors.secondary + '20' }}>
                  🎯
                </div>
                <div>
                  <div className="font-bold text-gray-900">Our 2025 Goal</div>
                  <p className="text-gray-600">Support 200 women in tech</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20 blur-2xl" style={{ background: colors.primary }}></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-full opacity-20 blur-2xl" style={{ background: colors.secondary }}></div>
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Women in tech"
                className="relative rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.primary + '10', color: colors.primary }}>
              OUR PROGRAMS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Designed for Every{' '}
              <span style={{ color: colors.secondary }}>Stage</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're just starting out or ready to lead, we have a program for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <Link
                key={index}
                to={program.link}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all group border border-gray-100"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" 
                     style={{ background: program.color + '15', color: program.color }}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF7A00] transition-colors">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: program.color }}>
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4" style={{ background: colors.lightGray }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-bold mb-4" style={{ background: colors.accent + '10', color: colors.accent }}>
              UPCOMING EVENTS
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join Our{' '}
              <span style={{ color: colors.accent }}>Community</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect, learn, and grow with our regular events
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Link
                key={index}
                to={event.link}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: event.color + '15', color: event.color }}>
                    {event.icon}
                  </div>
                  <h3 className="font-bold text-gray-900">{event.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                  <Calendar size={14} /> {event.date}
                </p>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-2">
                  <Clock size={14} /> {event.time} • {event.format}
                </p>
                <span className="text-sm font-semibold" style={{ color: event.color }}>
                  Register Now →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Join Our{' '}
              <span style={{ color: colors.secondary }}>Community?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.primary + '15', color: colors.primary }}>
                <Users size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Supportive Network</h3>
              <p className="text-sm text-gray-600">Connect with women at all stages</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.secondary + '15', color: colors.secondary }}>
                <Target size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Skill Building</h3>
              <p className="text-sm text-gray-600">Practical, career-focused programs</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.accent + '15', color: colors.accent }}>
                <Briefcase size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Job Opportunities</h3>
              <p className="text-sm text-gray-600">Connect with partner employers</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-xl shadow-md">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" style={{ background: colors.success + '15', color: colors.success }}>
                <Gift size={24} />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Scholarships</h3>
              <p className="text-sm text-gray-600">Financial support available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}>
        <div className="max-w-4xl mx-auto text-center">
          <Rocket size={48} className="mx-auto mb-4 text-white/90" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Join our community and take the next step in your tech career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="px-8 py-3 bg-white font-bold rounded-full hover:scale-105 transition-all shadow-lg"
              style={{ color: colors.primary }}
            >
              Browse All Courses
            </Link>
            <Link
              to="/community"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full hover:bg-white/30 transition-all border border-white/30"
            >
              Join Community Free
            </Link>
          </div>
        </div>
      </section>

      {/* Back to About Link */}
      <div className="container mx-auto px-4 py-8">
        <Link 
          to="/about" 
          className="inline-flex items-center gap-2 text-sm hover:underline"
          style={{ color: colors.primary }}
        >
          ← Back to About iKPACE
        </Link>
      </div>
    </div>
  );
}