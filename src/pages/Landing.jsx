import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Users, Award, Star, CheckCircle, TrendingUp, Clock, Sparkles, Target, Globe, Shield } from "lucide-react";

export default function Landing() {
  const popularCourses = [
    {
      id: "1",
      title: "Digital Marketing Mastery",
      description: "Complete strategy for online marketing success",
      price: 7.00,
      students: "1,247+",
      rating: 4.9,
      duration: "8 weeks",
      badge: "BESTSELLER"
    },
    {
      id: "2",
      title: "AI Content Creation Pro", 
      description: "Master AI tools for automated content creation",
      price: 7.00,
      students: "892+",
      rating: 4.8,
      duration: "6 weeks",
      badge: "TRENDING"
    },
    {
      id: "3",
      title: "Social Media Ads Expert",
      description: "Advanced advertising across all platforms",
      price: 9.00,
      students: "567+",
      rating: 4.7,
      duration: "4 weeks",
      badge: "POPULAR"
    }
  ];

  const features = [
    {
      icon: <BookOpen className="w-10 h-10 text-primary" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Community Support",
      description: "Join 10,000+ learners in our active community"
    },
    {
      icon: <Award className="w-10 h-10 text-primary" />,
      title: "Certification",
      description: "Get certified and boost your career prospects"
    },
    {
      icon: <Clock className="w-10 h-10 text-primary" />,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with lifetime access"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      text: "iKPACE transformed my career. The courses are practical and immediately applicable.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Freelancer",
      text: "Best investment in my education. The community support alone is worth it.",
      rating: 5
    },
    {
      name: "Amina Okafor",
      role: "Business Owner",
      text: "The AI course helped me automate 80% of my content creation. Amazing ROI!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-accent-yellow via-secondary to-primary text-white">
        <div className="max-w-7xl mx-auto px-4 py-3 text-center">
          <p className="font-bold text-lg">
            ?? LIMITED TIME: Get 3 courses for $18 (Save $3!) •{" "}
            <Link to="/pricing" className="underline font-extrabold">
              Claim Offer Now ?
            </Link>
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-dark to-secondary text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=2000')] opacity-10"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Sparkles size={20} />
              <span className="font-medium">Trusted by 10,000+ learners worldwide</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              Master <span className="text-secondary-light">Digital Skills</span>,
              <br />
              <span className="text-accent-yellow">Transform Your Career</span>
            </h1>
            <p className="text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              Join thousands building practical digital skills with AI-powered learning, 
              expert instruction, and a supportive global community.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/courses"
                className="group bg-white text-primary hover:bg-gray-100 font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl flex items-center gap-3"
              >
                Start Learning Now • $7/course
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/pricing"
                className="bg-transparent border-3 border-white text-white hover:bg-white/10 font-bold text-xl px-12 py-5 rounded-full transition-all"
              >
                View All Plans
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-gray-300">Students</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-gray-300">Countries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">4.9?</div>
                <div className="text-gray-300">Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">95%</div>
                <div className="text-gray-300">Completion</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why <span className="text-primary">iKPACE</span> Stands Out
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to succeed in the digital economy
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                <div className="mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-primary text-white px-6 py-2 rounded-full font-bold text-lg">
                MOST POPULAR PROGRAMS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Top-Rated Courses
            </h2>
            <p className="text-2xl text-gray-600">
              Start with any course - they're all beginner-friendly
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {popularCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200">
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-yellow text-gray-900 px-4 py-1 rounded-full font-bold text-sm">
                      {course.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <div className="text-3xl font-bold text-white">${course.price.toFixed(2)}</div>
                    <div className="text-white/90">per course</div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center text-gray-600">
                      <Clock size={18} className="mr-2" />
                      {course.duration}
                    </span>
                    <span className="flex items-center text-amber-600 font-bold">
                      <Star size={18} className="fill-current mr-1" />
                      {course.rating}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{course.title}</h3>
                  <p className="text-gray-600 mb-6">{course.description}</p>
                  <div className="flex items-center justify-between mb-8">
                    <span className="flex items-center text-gray-600">
                      <Users size={18} className="mr-2" />
                      {course.students} students
                    </span>
                  </div>
                  <Link
                    to={`/course/${course.id}`}
                    className="block w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl text-center text-lg transition-colors"
                  >
                    View Course Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/courses"
              className="inline-flex items-center text-2xl font-bold text-primary hover:text-primary-dark group"
            >
              View All Courses
              <ArrowRight size={28} className="ml-4 group-hover:translate-x-3 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Students Say
            </h2>
            <p className="text-2xl opacity-90 max-w-3xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20">
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-current text-accent-yellow mr-1" />
                  ))}
                </div>
                <p className="text-xl mb-8 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-lg">{testimonial.name}</div>
                  <div className="opacity-80">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-12 rounded-3xl border-2 border-primary/20">
            <Target className="w-20 h-20 text-primary mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-2xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Join 10,000+ students who transformed their careers with iKPACE
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/register"
                className="group bg-primary hover:bg-primary-dark text-white font-bold text-xl px-12 py-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3"
              >
                Start Free Trial
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/courses"
                className="bg-white text-primary border-2 border-primary hover:bg-primary/5 font-bold text-xl px-12 py-5 rounded-full transition-all"
              >
                Browse Courses
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <Shield size={20} />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={20} />
                <span>Access from anywhere</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={20} />
                <span>Certificate included</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
